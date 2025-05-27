"use client"


import React from 'react'
import { useEffect, useState } from 'react'
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { MapPin, BusFront } from 'lucide-react'
import { GetplaceDetails, PHOTO_REF_URL } from '@/service/GlobalApi';
import Image from 'next/image'
import Link from 'next/link'
const Activites = ({ activity,name }) => {
    useEffect(()=>{
          activity&&Getphotoapi()
      
        },[activity])
        // console.log("activiy",activity);
        // console.log("name",name)
  
        const [photourl,setPhotourl]=useState()
          const Getphotoapi=async()=>{
            const data={
              textQuery:activity.placeName+","+name
            }
               const result=await GetplaceDetails(data).then(resp=>{
                // console.log(resp.data.places[0].photos[3].name);
                const url=PHOTO_REF_URL.replace('{Name}',resp.data.places[0].photos[0].name)
                // console.log(url)
                setPhotourl(url)
        
               })
          }
    return (
        <div>
            <Link href={process.env.NEXT_PUBLIC_GOOGLE_LINK + activity.
                placeName} target='_blank'>
                <Card className="overflow-hidden">
                    <div className="relative h-48">
                        <Image
                            src={photourl || "/trip.svg"}
                            alt={activity.placeName}
                            fill
                            className="object-cover"
                        />
                    </div>
                    <CardContent className="p-4">
                        <h4 className="font-semibold">{activity.
                            placeName
                        }</h4>
                        <p className="mt-2 text-sm text-muted-foreground">📣{activity.placeDetail
                        }</p>
                        <p className="mt-2 text-sm text-muted-foreground "> 🚌{activity.timeTravel
                        } Travel to reach there</p>
                    </CardContent>
                </Card>
            </Link>
        </div>
    )
}

export default Activites
