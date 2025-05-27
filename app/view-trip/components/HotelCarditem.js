"use client"


import React from 'react'
import { useEffect, useState } from 'react'
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { MapPin } from 'lucide-react'
import { GetplaceDetails, PHOTO_REF_URL } from '@/service/GlobalApi';
import Image from 'next/image'
import Link from 'next/link'

const HotelCarditem = ({ hotel }) => {
    useEffect(() => {
        hotel && Getphotoapi()

    }, [hotel])

    const [photourl, setPhotourl] = useState()
    const Getphotoapi = async () => {
        const data = {
            textQuery: hotel?.hotelName
        }
        const result = await GetplaceDetails(data).then(resp => {
            // console.log(resp.data.places[0].photos[3].name);
            const url = PHOTO_REF_URL.replace('{Name}', resp.data.places[0].photos[3].name)
            // console.log(url)
            setPhotourl(url)

        })
    }
    return (
        <div>
            <Link href={process.env.NEXT_PUBLIC_GOOGLE_LINK + hotel.hotelName + ','+ hotel.hotelAddress} target='_blank'>
            <Card className="overflow-hidden">
                <div className="relative h-48">
                    <Image src={photourl || "/trip.jpg"} alt={hotel.hotelName} fill className="object-cover" />
                </div>
                <CardContent className="p-4">
                    <div className="flex items-start justify-between">
                        <div>
                            <h3 className="font-semibold">{hotel.hotelName}</h3>
                            <div className="flex items-center mt-1 text-sm text-muted-foreground">
                                <MapPin className="w-3 h-3 mr-1" />
                                {hotel.hotelAddress}
                            </div>
                        </div>
                        <Badge variant="outline">{hotel.priceRange
                        } nights</Badge>
                    </div>
                </CardContent>
            </Card>
        </Link>
    </div >
  )
}

export default HotelCarditem
