"use client"


import React from 'react'
import { useRouter } from 'next/navigation'
import { useEffect } from 'react'
import { useUser } from '@clerk/nextjs'
import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import GooglePlacesAutocomplete from 'react-google-places-autocomplete'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import {
  MapPin,
  Calendar,
  DollarSign,
  Users,
  Compass,
  Wallet,
  CreditCard,
  Crown,
  User,
  UserPlus,
  UsersRound,
} from "lucide-react"
import { useMemo } from 'react'
import { AI_PROMPT, SelectBudgetOptions, selectTravelList } from '../constants/options';
import { chatSession } from '@/service/AImodel';
import { db } from '@/service/firebaseConfig';
import { doc, setDoc } from "firebase/firestore";
import { Loader } from 'lucide-react'
import { Progress } from '@/components/ui/progress'

const CreateTrips = () => {
  
  const { user, isSignedIn } = useUser()
    // console.log( typeof( user?.emailAddresses?.[0]?.emailAddress))
  const [formData, setformData] = useState([])
   const [email,setEmail]=useState(null)
   const router=useRouter()
  useEffect(() => {
    if (isSignedIn === false) {
      router.push('/sign-in')
    }
    else{
      setEmail(user?.emailAddresses?.[0]?.emailAddress)
    }
  }, [isSignedIn])
  // console.log(isSignedIn)

  // console.log(user)
  const [selectedBudget, setSelectedBudget] = useState("")
  const [selectedPeople, setSelectedPeople] = useState("")
  const [places, setPlaces] = useState('')
 const [loading,setloading]=useState(false)

  const handleInput = (name, value) => {
    setformData({
      ...formData,
      [name]: value
    })
    // console.log(name)
    // console.log(value)

  }

  const budgetOptions = [
    {
      id: "cheap",
      title: "Cheap",
      price: "$500 - $1,500",
      description: "Budget-friendly options with great value",
      icon: <Wallet className="w-6 h-6" />,
      color: "from-green-500 to-emerald-600",
    },
    {
      id: "moderate",
      title: "Moderate",
      price: "$1,500 - $3,000",
      description: "Comfortable travel with good amenities",
      icon: <CreditCard className="w-6 h-6" />,
      color: "from-blue-500 to-cyan-600",
    },
    {
      id: "luxury",
      title: "Luxury",
      price: "$3,000+",
      description: "Premium experiences and top-tier service",
      icon: <Crown className="w-6 h-6" />,
      color: "from-purple-500 to-pink-600",
    },
  ]

  const peopleOptions = [
    {
      id: "solo",
      title: "Solo Traveler",
      count: "1 person",
      description: "Perfect for self-discovery adventures",
      icon: <User className="w-6 h-6" />,
    },
    {
      id: "couple",
      title: "Couple",
      count: "2 people",
      description: "Romantic getaways and shared experiences",
      icon: <UserPlus className="w-6 h-6" />,
    },
    {
      id: "small-group",
      title: "Family/Friends",
      count: "3-4 people",
      description: "Friends and family adventures",
      icon: <Users className="w-6 h-6" />,
    },
    {
      id: "large-group",
      title: "Group Tour",
      count: "5+ people",
      description: "Group tours and celebrations",
      icon: <UsersRound className="w-6 h-6" />,
    },
  ]


  const particles = useMemo(() => (
    [...Array(6)].map((_, i) => ({
      left: `${Math.random() * 100}%`,
      top: `${Math.random() * 100}%`,
      animationDelay: `${Math.random() * 3}s`,
      animationDuration: `${2 + Math.random() * 2}s`,
      key: i
    }))
  ), []);


  const handlesubmit =async (e) => {
    e.preventDefault();
    // console.log(formData);
    
    // Here you can handle the form submission, e.g., send data to an API or save it in a database
    // For now, we'll just log the formData to the console
    if (Object.keys(formData).length === 0) {
      alert("Please fill out all fields before submitting.");

      return;
    }
    setloading(true)
    if(formData?.location && formData.noOfDays && formData.budget && formData.traveler){
      // router.push('/trip')
      // alert("iternary created successfully")
      const FINAL_PROMPT = AI_PROMPT.replace("{location}", formData?.location?.label).replace("{totalDays}", formData?.noOfDays).replace("{traveler}", formData?.traveler).replace("{budget}", formData?.budget).replace("{totalDays}", formData?.noOfDays)
    // console.log(FINAL_PROMPT)
    const result = await chatSession.sendMessage(FINAL_PROMPT);
     saveAiTrip(result?.response.text());
    // console.log(result);
    setloading(false)
    }
    else{
      setloading(false)
      alert("Please fill out all fields before submitting.");
      return;
    }
   
  }
   const saveAiTrip = async (TripData) => {
    // console.log(typeof (TripData))
    const docId = Date.now().toString()
   
    await setDoc(doc(db, "AITrips", docId), {
      userSelection: formData,
      tripdata: TripData,
      userEmail: email,
      id: docId
    });
    // console.log("Tripdata",TripData)
    // console.log("email",email)
    // console.log("docId",docId)
   
   
   router.push('/view-trip/'+docId)
  alert("Trip created successfully")

  }
  




  return (
    <div className="min-h-screen bg-gradient-to-br from-sky-100 via-teal-50 to-emerald-100 relative overflow-hidden mt-4">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {/* Floating Orbs */}
        <div className="absolute top-20 left-10 w-32 h-32 bg-sky-300 rounded-full opacity-30 blur-xl animate-pulse"></div>
        <div
          className="absolute top-40 right-20 w-48 h-48 bg-teal-300 rounded-full opacity-25 blur-xl animate-bounce"
          style={{ animationDuration: "3s" }}
        ></div>
        <div
          className="absolute bottom-20 left-1/4 w-40 h-40 bg-emerald-300 rounded-full opacity-20 blur-xl animate-pulse"
          style={{ animationDelay: "1s" }}
        ></div>
        <div
          className="absolute top-1/2 right-1/3 w-24 h-24 bg-cyan-300 rounded-full opacity-25 blur-lg animate-bounce"
          style={{ animationDuration: "4s", animationDelay: "2s" }}
        ></div>

        {/* Moving Gradient Lines */}
        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-sky-400 to-transparent opacity-50 animate-pulse"></div>
        <div
          className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-emerald-400 to-transparent opacity-50 animate-pulse"
          style={{ animationDelay: "1.5s" }}
        ></div>

        {/* Floating Particles */}
        {[...Array(6)].map((_, i) => (
          <div
            key={i}
            className={`absolute w-2 h-2 bg-sky-400 rounded-full opacity-40 animate-ping`}
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 3}s`,
              animationDuration: `${2 + Math.random() * 2}s`,
            }}
          ></div>
        ))}

        {/* {particles.map(({ key, ...style }) => (
  <div
    key={key}
    className="absolute w-2 h-2 bg-sky-400 rounded-full opacity-40 animate-ping"
    style={style}
  />
))} */}

      </div>

      {/* Header */}
      <header className="bg-white/90 backdrop-blur-md border-b relative z-10">
        {/* <div className="container flex items-center justify-between h-16 px-4 mx-auto">
          <div className="flex items-center gap-2">
            <Compass className="w-6 h-6 text-teal-600" />
            <span className="text-xl font-bold">TripWise</span>
          </div>
        </div> */}
      </header>

      <div className="container relative px-4 py-12 mx-auto z-10">
        <div className="max-w-4xl mx-auto">
          {/* Page Header */}
          <div className="mb-8 text-center">
            <h1 className="text-4xl font-bold tracking-tight text-gray-900 md:text-5xl">Travel Preferences</h1>
            <p className="mt-4 text-lg text-gray-600">
              Tell us about your dream trip and we'll create the perfect itinerary for you
            </p>
          </div>

          {/* Form Card */}
          <Card className="overflow-hidden shadow-xl bg-white/95 backdrop-blur-sm border-0">
            <CardHeader className="bg-gradient-to-r from-teal-600 to-blue-600 text-white">
              <CardTitle className="text-2xl font-semibold text-center">Plan Your Perfect Trip</CardTitle>
            </CardHeader>
            <CardContent className="p-8">
              <form className="space-y-10">
                {/* Destination */}
                <div className="space-y-3">
                  <div className="flex items-center gap-2">
                    <MapPin className="w-5 h-5 text-teal-600" />
                    <Label htmlFor="destination" className="text-lg font-medium text-gray-700">
                      Name of the Destination
                    </Label>
                  </div>
                  {/* <Input
                    id="destination"
                    type="text"
                    placeholder="e.g., Paris, Tokyo, Bali..."
                    className="h-12 text-lg border-2 border-gray-200 focus:border-teal-500 focus:ring-teal-500"
                  /> */}
                  <GooglePlacesAutocomplete
                    apiKey={process.env.NEXT_PUBLIC_PLACE_API}
                    // apiKey='AIzaSyDa7rpzIcu51FW-BUNXg2WmR4eB6pSA6lA'
                    selectProps={{
                      places,
                      onChange: (v) => { setPlaces(v); handleInput('location', v) }

                    }}
                  />
                  <p className="text-sm text-gray-500">Enter the city, country, or region you'd like to visit</p>
                </div>

                {/* Number of Days */}
                <div className="space-y-3">
                  <div className="flex items-center gap-2">
                    <Calendar className="w-5 h-5 text-teal-600" />
                    <Label htmlFor="days" className="text-lg font-medium text-gray-700">
                      Number of Days
                    </Label>
                  </div>
                  <Select onValueChange={(value)=>{handleInput('noOfDays',value)}} >
                    <SelectTrigger className="h-12 text-lg border-2 border-gray-200 focus:border-teal-500">
                      <SelectValue placeholder="Select duration" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="1-3">1-3 days (Weekend getaway)</SelectItem>
                      <SelectItem value="4-7">4-7 days (Short vacation)</SelectItem>
                      <SelectItem value="8-14">8-14 days (Extended trip)</SelectItem>
                      <SelectItem value="15-21">15-21 days (Long vacation)</SelectItem>
                      <SelectItem value="22+">22+ days (Extended travel)</SelectItem>
                    </SelectContent>
                  </Select>
                  <p className="text-sm text-gray-500">How long would you like your trip to be?</p>
                </div>

                {/* Budget Range - Card Selection */}
                <div className="space-y-4">
                  <div className="flex items-center gap-2">
                    <DollarSign className="w-5 h-5 text-teal-600" />
                    <Label className="text-lg font-medium text-gray-700">Budget Range</Label>
                  </div>
                  <div className="grid gap-4 md:grid-cols-3">
                    {budgetOptions.map((option) => (
                      <Card
                        key={option.id}
                        className={`cursor-pointer transition-all duration-300 hover:shadow-lg transform hover:scale-105 ${selectedBudget === option.id ? "ring-2 ring-teal-500 shadow-lg scale-105" : "hover:shadow-md"
                          }`}
                        onClick={() => {setSelectedBudget(option.id);handleInput('budget',option.price)}}
                      >
                        <CardContent className="p-6 text-center">
                          <div
                            className={`w-12 h-12 mx-auto mb-3 rounded-full bg-gradient-to-r ${option.color} flex items-center justify-center text-white`}
                          >
                            {option.icon}
                          </div>
                          <h3 className="text-lg font-semibold mb-1">{option.title}</h3>
                          <p className="text-teal-600 font-medium mb-2">{option.price}</p>
                          <p className="text-sm text-gray-600">{option.description}</p>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                  <p className="text-sm text-gray-500">
                    Total budget for the entire trip including flights, accommodation, and activities
                  </p>
                </div>

                {/* Number of People - Card Selection */}
                <div className="space-y-4">
                  <div className="flex items-center gap-2">
                    <Users className="w-5 h-5 text-teal-600" />
                    <Label className="text-lg font-medium text-gray-700">Number of People</Label>
                  </div>
                  <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
                    {peopleOptions.map((option) => (
                      <Card
                        key={option.id}
                        className={`cursor-pointer transition-all duration-300 hover:shadow-lg transform hover:scale-105 ${selectedPeople === option.id ? "ring-2 ring-teal-500 shadow-lg scale-105" : "hover:shadow-md"
                          }`}
                        onClick={() =>{ setSelectedPeople(option.id);handleInput('traveler', option.count)}}
                      >
                        <CardContent className="p-6 text-center">
                          <div className="w-12 h-12 mx-auto mb-3 rounded-full bg-gradient-to-r from-teal-500 to-blue-600 flex items-center justify-center text-white">
                            {option.icon}
                          </div>
                          <h3 className="text-lg font-semibold mb-1">{option.title}</h3>
                          <p className="text-teal-600 font-medium mb-2">{option.count}</p>
                          <p className="text-sm text-gray-600">{option.description}</p>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                  <p className="text-sm text-gray-500">How many people will be traveling together?</p>
                </div>

                {/* Submit Button */}
                <div className="pt-6">
                 {loading===false ?( <Button
                    type="submit"
                    className="w-full h-14 text-lg font-semibold bg-gradient-to-r from-teal-600 to-blue-600 hover:from-teal-700 hover:to-blue-700 transform transition-all duration-200 hover:scale-[1.02] shadow-lg"
                    onClick={handlesubmit}
                  >
                    Create My Itinerary
                  </Button>):(<Button
                    type="submit"
                    className="w-full h-14 text-lg font-semibold bg-gradient-to-r from-teal-600 to-blue-600 hover:from-teal-700 hover:to-blue-700 transform transition-all duration-200 hover:scale-[1.02] shadow-lg"
                   disabled={true}
                  >
                    <Loader/>
                  </Button>)}
                </div>
              </form>
            </CardContent>
          </Card>

          {/* Additional Info */}
          <div className="mt-8 text-center">
            <p className="text-gray-600">Don't worry, you can always modify these preferences later!</p>
          </div>

          {/* Features Preview */}
          <div className="grid gap-6 mt-12 md:grid-cols-3">
            <div className="p-6 text-center bg-white/90 backdrop-blur-sm rounded-lg shadow-md hover:shadow-lg transition-all duration-300 transform hover:scale-105">
              <div className="flex items-center justify-center w-12 h-12 mx-auto mb-4 rounded-full bg-teal-100">
                <MapPin className="w-6 h-6 text-teal-600" />
              </div>
              <h3 className="mb-2 font-semibold">Personalized Routes</h3>
              <p className="text-sm text-gray-600">Get custom itineraries based on your preferences and interests</p>
            </div>
            <div className="p-6 text-center bg-white/90 backdrop-blur-sm rounded-lg shadow-md hover:shadow-lg transition-all duration-300 transform hover:scale-105">
              <div className="flex items-center justify-center w-12 h-12 mx-auto mb-4 rounded-full bg-blue-100">
                <Calendar className="w-6 h-6 text-blue-600" />
              </div>
              <h3 className="mb-2 font-semibold">Smart Scheduling</h3>
              <p className="text-sm text-gray-600">Optimized daily schedules that maximize your time and experiences</p>
            </div>
            <div className="p-6 text-center bg-white/90 backdrop-blur-sm rounded-lg shadow-md hover:shadow-lg transition-all duration-300 transform hover:scale-105">
              <div className="flex items-center justify-center w-12 h-12 mx-auto mb-4 rounded-full bg-purple-100">
                <DollarSign className="w-6 h-6 text-purple-600" />
              </div>
              <h3 className="mb-2 font-semibold">Budget Optimization</h3>
              <p className="text-sm text-gray-600">Stay within budget while getting the most value from your trip</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default CreateTrips
