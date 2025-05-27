"use client"


import React, { useState } from 'react'
import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { MapPin, Calendar, Users, Compass, Star, PlaneTakeoff, Hotel, Utensils,Menu } from "lucide-react"
import { SignedIn,SignInButton, SignUpButton,SignedOut, UserButton } from "@clerk/nextjs"

const Header = () => {
    const [Open,setOpen]=useState(false);
    // console.log(Open)
    const handleopen=()=>{
        setOpen(!Open);
    }
    return (
        <div>
            <header className="fixed top-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-md border-b">
                <div className="container flex items-center justify-between h-16 px-4 mx-auto">
                    <Link href={'/'}>
                    <div className="flex items-center gap-2">
                        <Compass className="w-6 h-6 text-teal-600" />
                        <span className="text-xl font-bold">TrippGo</span>
                    </div>
                    </Link>
                    <div className="flex items-center gap-4">
                        {/* <Link href="#" className="text-sm font-medium hover:text-teal-600 transition-colors">
              Features
            </Link> */}
                        {/* <Link href="#" className="text-sm font-medium hover:text-teal-600 transition-colors">
              How It Works
            </Link> */}
                        {/* <Link href="#" className="text-sm font-medium hover:text-teal-600 transition-colors">
              Testimonials */}
                        {/* </Link> */}

                        <SignedOut>
                            <div className="flex flex-row gap-2">

                                <div className="bg-teal-600 hover:bg-teal-700 p-2 rounded-lg text-center text-white" ><SignInButton /></div>
                                <div className="bg-teal-600 hover:bg-teal-700 p-2 rounded-lg text-center text-white" ><SignUpButton /></div>
                            </div>
                        </SignedOut>
                        <SignedIn>
                            <div className=" hidden md:flex md:flex-row md:gap-2 lg:flex lg:flex-row lg:gap-2 ">

                               <Link href={"/CreateTrips"}> <Button className="bg-teal-600 hover:bg-teal-700" >Create-Trips</Button></Link>
                              <Link href={"/my-trips"}>  <Button className="bg-teal-600 hover:bg-teal-700" >My-Trips</Button></Link>
                                <UserButton />
                            </div>
                            <div className="md:hidden lg:hidden flex flex-col ">
                                <div>

                                <Menu onClick={handleopen}/>
                                </div>
                                {Open===true && (
                                    <div className="flex flex-col gap-2 absolute top-10 bg-white shadow-md p-4 rounded-md z-50 left-[55%]">
                                        <Button className="bg-teal-600 hover:bg-teal-700" onClick>
                                            Create Trips
                                        </Button>
                                        <Button className="bg-teal-600 hover:bg-teal-700" >
                                            View Trips
                                        </Button>
                                        <UserButton />
                                    </div>
                                )}
                            </div>
                        </SignedIn>
                    </div>
                </div>
            </header>
        </div>
    )
}

export default Header
