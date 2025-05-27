"use client"

import { GetplaceDetails, PHOTO_REF_URL } from '@/service/GlobalApi'
import React, { useEffect, useState } from 'react'
import Link from 'next/link'
import { User } from 'lucide-react'

const UserTripCardItem = ({ trip }) => {

 

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

  return (
    <Link href={`/view-trip/${trip?.id}`}>
  <div className="hover:scale-105 transition-all">
    <img
      src={photourl}
      alt="Beautiful destination view"
      fill
      className="rounded-xl object-cover w-full h-[220px]"
    />
    <div>
      <h2 className="font-bold text-gray-800 text-lg">
        {trip?.userSelection?.location?.label}
      </h2>
      <h2 className="text-sm text-gray-500">
        {trip?.userSelection.noOfDays} Days with {trip?.userSelection.budget} Budget
      </h2>
    </div>
  </div>
</Link>

  )
}

export default UserTripCardItem
