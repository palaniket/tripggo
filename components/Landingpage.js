"use client"

import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { MapPin, Calendar, Users, Compass, Star, PlaneTakeoff, Hotel, Utensils,Menu } from "lucide-react"
import { SignedIn,SignInButton, SignUpButton,SignedOut, UserButton } from "@clerk/nextjs"
import { useState } from "react"


export default function LandingPage() {
    const [Open,setOpen]=useState(false);
    const handleopen=()=>{
       if(Open===true){
        setOpen(false)
       }
       else{
        setOpen(true)
       }
      //  console.log(Open)
    }
  return (
    <div className="min-h-screen bg-white">
      {/* Navigation */}
      

      {/* Hero Section */}
      <section className="relative pt-16">
        <div className="absolute inset-0 z-0 overflow-hidden">
          <Image
            src="/trip.jpg"
            alt="Beautiful travel destination"
            fill
            className="object-cover opacity-20"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-b from-teal-600/30 to-white"></div>
        </div>

        <div className="container relative z-10 px-4 pt-20 pb-24 mx-auto text-center md:pt-32 md:pb-40">
          <h1 className="text-4xl font-bold tracking-tight md:text-6xl">
            Plan Your Dream Trip <span className="text-teal-600">Effortlessly</span>
          </h1>
          <p className="max-w-2xl mx-auto mt-6 text-lg text-gray-600">
            Create personalized travel itineraries, discover hidden gems, and organize your perfect getaway with our
            all-in-one trip planning platform.
          </p>
          <div className="flex flex-col items-center justify-center gap-4 mt-10 sm:flex-row">
            <Link href={"/CreateTrips"}>
            <Button size="lg" className="bg-teal-600 hover:bg-teal-700">
              Start Planning
            </Button>
            </Link>
            <Button size="lg" variant="outline">
              Watch Demo
            </Button>
          </div>

          <div className="relative mt-16 overflow-hidden rounded-lg shadow-xl md:mt-24">
            <Image
              src="/trip.jpg"
              alt="TripWise App Dashboard"
              width={1280}
              height={720}
              className="w-full h-auto rounded-lg transform transition-transform hover:scale-[1.02] duration-700"
            />
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-gray-50">
        <div className="container px-4 mx-auto">
          <div className="max-w-3xl mx-auto mb-16 text-center">
            <h2 className="text-3xl font-bold md:text-4xl">Everything You Need For Perfect Trips</h2>
            <p className="mt-4 text-gray-600">
              Our comprehensive tools make planning your next adventure simple and enjoyable.
            </p>
          </div>

          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {features.map((feature, index) => (
              <Card key={index} className="overflow-hidden transition-all hover:shadow-lg">
                <CardContent className="p-6">
                  <div className="flex items-center justify-center w-12 h-12 mb-4 rounded-full bg-teal-100">
                    {feature.icon}
                  </div>
                  <h3 className="mb-2 text-xl font-semibold">{feature.title}</h3>
                  <p className="text-gray-600">{feature.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-20">
        <div className="container px-4 mx-auto">
          <div className="max-w-3xl mx-auto mb-16 text-center">
            <h2 className="text-3xl font-bold md:text-4xl">How TripWise Works</h2>
            <p className="mt-4 text-gray-600">Plan your perfect trip in just three simple steps</p>
          </div>

          <div className="grid gap-8 md:grid-cols-3">
            {steps.map((step, index) => (
              <div key={index} className="relative text-center">
                <div className="flex items-center justify-center w-16 h-16 mx-auto mb-4 text-2xl font-bold text-white rounded-full bg-teal-600">
                  {index + 1}
                </div>
                {index < steps.length - 1 && (
                  <div className="absolute top-8 left-[60%] w-full h-0.5 bg-teal-200 hidden md:block"></div>
                )}
                <h3 className="mb-2 text-xl font-semibold">{step.title}</h3>
                <p className="text-gray-600">{step.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Destinations Showcase */}
      <section className="py-20 bg-gray-50">
        <div className="container px-4 mx-auto">
          <div className="max-w-3xl mx-auto mb-16 text-center">
            <h2 className="text-3xl font-bold md:text-4xl">Popular Destinations</h2>
            <p className="mt-4 text-gray-600">Discover trending locations loved by our community</p>
          </div>

          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
            {destinations.map((destination, index) => (
              <div key={index} className="relative overflow-hidden transition-all rounded-lg group hover:shadow-xl">
                <div className="relative h-64">
                  <Image
                    src={destination.image || "/placeholder.svg"}
                    alt={destination.name}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent"></div>
                </div>
                <div className="absolute bottom-0 left-0 right-0 p-4 text-white">
                  <h3 className="text-lg font-semibold">{destination.name}</h3>
                  <div className="flex items-center mt-1">
                    <MapPin className="w-4 h-4 mr-1" />
                    <span className="text-sm">{destination.location}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials
      <section className="py-20">
        <div className="container px-4 mx-auto">
          <div className="max-w-3xl mx-auto mb-16 text-center">
            <h2 className="text-3xl font-bold md:text-4xl">What Our Travelers Say</h2>
            <p className="mt-4 text-gray-600">Real experiences from our community of travelers</p>
          </div>

          <div className="grid gap-8 md:grid-cols-3">
            {testimonials.map((testimonial, index) => (
              <Card key={index} className="overflow-hidden">
                <CardContent className="p-6">
                  <div className="flex mb-4">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className={`w-5 h-5 ${
                          i < testimonial.rating ? "text-yellow-400 fill-yellow-400" : "text-gray-300"
                        }`}
                      />
                    ))}
                  </div>
                  <p className="mb-4 italic text-gray-600">"{testimonial.text}"</p>
                  <div className="flex items-center">
                    <div className="relative w-10 h-10 mr-3 overflow-hidden rounded-full">
                      <Image
                        src={testimonial.avatar || "/placeholder.svg"}
                        alt={testimonial.name}
                        fill
                        className="object-cover"
                      />
                    </div>
                    <div>
                      <p className="font-semibold">{testimonial.name}</p>
                      <p className="text-sm text-gray-600">{testimonial.trip}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section> */}

      {/* CTA Section */}
      <section className="py-20 text-white bg-teal-600">
        <div className="container px-4 mx-auto text-center">
          <h2 className="text-3xl font-bold md:text-4xl">Ready to Plan Your Next Adventure?</h2>
          <p className="max-w-2xl mx-auto mt-4">
            Join thousands of travelers who have discovered the easiest way to plan unforgettable trips.
          </p>
          <Link href={'/CreateTrips'}>
          <Button size="lg" className="mt-8 bg-white text-teal-600 hover:bg-gray-100">
            Get Started — It's Free
          </Button>
          </Link>
        </div>
      </section>

      {/* Footer */}
     
    </div>
  )
}

// Sample data
const features = [
  {
    title: "Smart Itinerary Builder",
    description: "Create detailed day-by-day travel plans with our intuitive drag-and-drop interface.",
    icon: <Calendar className="w-6 h-6 text-teal-600" />,
  },
  {
    title: "Destination Discovery",
    description: "Explore curated recommendations and hidden gems for any destination worldwide.",
    icon: <MapPin className="w-6 h-6 text-teal-600" />,
  },
  {
    title: "Group Planning",
    description: "Collaborate with friends and family to plan the perfect group getaway.",
    icon: <Users className="w-6 h-6 text-teal-600" />,
  },
  {
    title: "Flight Tracking",
    description: "Find the best deals on flights and keep track of price changes in real-time.",
    icon: <PlaneTakeoff className="w-6 h-6 text-teal-600" />,
  },
  {
    title: "Accommodation Finder",
    description: "Discover and book hotels, vacation rentals, and unique stays at the best prices.",
    icon: <Hotel className="w-6 h-6 text-teal-600" />,
  },
  {
    title: "Restaurant Reservations",
    description: "Find top-rated restaurants and secure reservations directly through our platform.",
    icon: <Utensils className="w-6 h-6 text-teal-600" />,
  },
]

const steps = [
  {
    title: "Choose Your Destination",
    description: "Select from popular destinations or search for your dream location.",
  },
  {
    title: "Customize Your Itinerary",
    description: "Add activities, accommodations, and transportation to your personalized plan.",
  },
  {
    title: "Enjoy Your Trip",
    description: "Access your itinerary offline, get real-time updates, and share memories.",
  },
]

const destinations = [
  {
    name: "Bali, Indonesia",
    location: "Southeast Asia",
    image: "/bali.jpg",
  },
  {
    name: "Santorini, Greece",
    location: "Mediterranean",
    image: "/greece.jpg",
  },
  {
    name: "Kyoto, Japan",
    location: "East Asia",
    image: "/kyoto.jpg",
  },
  {
    name: "Machu Picchu, Peru",
    location: "South America",
    image: "/peru.jpg",
  },
]

const testimonials = [
  {
    name: "Sarah Johnson",
    avatar: "/images/avatar-1.png",
    rating: 5,
    text: "TripWise made planning our honeymoon so easy! We discovered amazing places we wouldn't have found otherwise.",
    trip: "2-week Europe Tour",
  },
  {
    name: "Michael Chen",
    avatar: "/images/avatar-2.png",
    rating: 5,
    text: "As a frequent traveler, I've tried many planning tools. TripWise is by far the most intuitive and comprehensive.",
    trip: "Japan Adventure",
  },
  {
    name: "Elena Rodriguez",
    avatar: "/images/avatar-3.png",
    rating: 4,
    text: "The group planning feature was a lifesaver for our family reunion trip. Everyone could contribute their ideas!",
    trip: "Family Trip to Mexico",
  },
]
