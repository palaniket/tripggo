"use client"
import Image from "next/image"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Users, DollarSign, CalendarDays, MapPin } from "lucide-react"

import { GetplaceDetails, PHOTO_REF_URL } from '@/service/GlobalApi';
import { useParams } from "next/navigation"
import { useEffect, useState } from "react"
import { db } from "../../../service/firebaseConfig"
import { doc, getDoc } from "firebase/firestore"
import HotelCarditem from "../components/HotelCarditem"
import Activites from "../components/Activites"



export default function ViewTrip() {
  const { tripId } = useParams();
  const [trip, setTrip] = useState();
  const [tridata, setTripdata] = useState(null)



  useEffect(() => {
    tripId && getTripinfo();
  }, [tripId])

  const getTripinfo = async () => {
    const docRef = doc(db, 'AITrips', tripId);
    const docsnap = await getDoc(docRef);

    if (docsnap.exists()) {
      // console.log(docsnap.data());
      setTrip(docsnap.data())
      setTripdata(JSON.parse(docsnap.data()?.tripdata))
      // console.log(JSON.parse(docsnap.data()?.tripdata))
    }
    else {
      toast('there is no such documnet exists')
    }
  }
  useEffect(() => {
    trip && Getphotoapi()

  }, [trip])

  const [photourl, setPhotourl] = useState('/bali.jpg')
  const Getphotoapi = async () => {
    const data = {
      textQuery: trip?.userSelection?.location?.label,
    }
    // console.log("data",data);
    const result = await GetplaceDetails(data).then(resp => {
      // console.log(resp.data.places[0].photos[0]);
      const url = PHOTO_REF_URL.replace('{Name}', resp.data.places[0].photos[0].name)
      // console.log(url)
      setPhotourl(url)

    })
    // console.log(photourl)
  }
  //  const tripdata=JSON.parse(trip?.tripdata)
  let data = trip?.tripdata;
  // console.log(trip?.userSelection?.location?.label)
  // console.log(JSON.parse(tridata))
  // console.log("tripdata", tridata)
  return (
    <main className="min-h-screen bg-white">
      {/* Hero Image */}
      <div className="relative w-full h-[40vh] md:h-[60vh]">
        <Image
          src={photourl}
          alt="Beautiful destination view"
          fill
          className="object-cover"
          priority
        />
      </div>

      {/* Trip Information */}
      <div className="container px-4 mx-auto -mt-16 sm:-mt-24">
        <div className="relative p-6 bg-white rounded-lg shadow-lg">
          <h1 className="text-3xl font-bold tracking-tight md:text-4xl">{trip?.userSelection?.location?.label} Adventure Trip</h1>

          <div className="flex flex-wrap gap-4 mt-3">
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <Users className="w-4 h-4" />
              <span>{tridata?.traveler}</span>
            </div>
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              {/* <DollarSign className="w-4 h-4" /> */}
              <span>{tridata?.budget}</span>
            </div>
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <CalendarDays className="w-4 h-4" />
              <span>{tridata?.totalDays}</span>
            </div>
          </div>

          {/* Hotels Section */}
          <section className="mt-10">
            <h2 className="text-2xl font-semibold">Hotels</h2>
            <div className="grid gap-6 mt-4 md:grid-cols-2 lg:grid-cols-3">
              {tridata?.hotels?.map((hotel, index) => (
                <HotelCarditem key={index} hotel={hotel} />
              ))}
            </div>
          </section>

          {/* Day-wise Activities */}
          <section className="mt-10 mb-10">
            <h2 className="text-2xl font-semibold">Day-wise Activities</h2>
            <div className="mt-4 space-y-8">
              {tridata?.itinerary.map((day, index) => (


 
                <div key={index}>
                  {Array.isArray(day.activities) && day.activities.length > 0 && (
                    <>
                      <h3 className="mb-4 text-xl font-medium">{day.day}</h3>
                      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                        {day.activities.map((activity, actIndex) => (
                          <Activites
                            key={actIndex}
                            activity={activity}
                            name={trip?.userSelection?.location?.label}
                          />
                        ))}
                      </div>
                    </>
                  )}
                </div>
              ))}
            </div>
          </section>
        </div>
      </div>
    </main>
  )
}

// // Sample data
// const hotels = [
//   {
//     name: "Luxury Beach Resort",
//     location: "Kuta Beach",
//     image: "/placeholder.svg?height=300&width=500",
//     nights: 3,
//   },
//   {
//     name: "Mountain View Villa",
//     location: "Ubud",
//     image: "/placeholder.svg?height=300&width=500",
//     nights: 2,
//   },
//   {
//     name: "Riverside Bungalows",
//     location: "Tegallalang",
//     image: "/placeholder.svg?height=300&width=500",
//     nights: 1,
//   },
// ]

// const activities = [
//   {
//     day: 1,
//     activities: [
//       {
//         title: "Beach Welcome Party",
//         description: "Enjoy a welcome dinner and party at Kuta Beach with traditional Balinese performances.",
//         image: "/placeholder.svg?height=300&width=500",
//       },
//       {
//         title: "Surfing Lessons",
//         description: "Take beginner-friendly surfing lessons with professional instructors.",
//         image: "/placeholder.svg?height=300&width=500",
//       },
//       {
//         title: "Sunset Cocktails",
//         description: "Relax with sunset cocktails at a beachfront bar.",
//         image: "/placeholder.svg?height=300&width=500",
//       },
//     ],
//   },
//   {
//     day: 2,
//     activities: [
//       {
//         title: "Temple Tour",
//         description: "Visit the sacred Uluwatu Temple perched on a cliff with stunning ocean views.",
//         image: "/placeholder.svg?height=300&width=500",
//       },
//       {
//         title: "Traditional Market",
//         description: "Explore local crafts and souvenirs at the traditional market.",
//         image: "/placeholder.svg?height=300&width=500",
//       },
//       {
//         title: "Seafood Dinner",
//         description: "Enjoy fresh seafood dinner at Jimbaran Bay.",
//         image: "/placeholder.svg?height=300&width=500",
//       },
//     ],
//   },
//   {
//     day: 3,
//     activities: [
//       {
//         title: "Rice Terrace Hike",
//         description: "Hike through the stunning Tegallalang Rice Terraces with a local guide.",
//         image: "/placeholder.svg?height=300&width=500",
//       },
//       {
//         title: "Cooking Class",
//         description: "Learn to prepare traditional Balinese dishes in a hands-on cooking class.",
//         image: "/placeholder.svg?height=300&width=500",
//       },
//       {
//         title: "Spa Treatment",
//         description: "Relax with a traditional Balinese massage and spa treatment.",
//         image: "/placeholder.svg?height=300&width=500",
//       },
//     ],
//   },
// ]


