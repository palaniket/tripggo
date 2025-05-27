"use client"


import { collection, getDocs, query, QuerySnapshot, where } from 'firebase/firestore';
import React, { useEffect, useState } from 'react'

import { db } from '@/service/firebaseConfig';
import UserTripCardItem from './components/UserTripCardItem'
import { useRouter } from 'next/navigation';
import { useUser } from '@clerk/nextjs';
import Image from 'next/image';
const Mytrips = () => {
const { user, isSignedIn, isLoaded } = useUser();
 const [tripdata,settripdata]=useState([]);
    const navigation=useRouter();
    
     useEffect(() => {
  if (isLoaded) {
    GetUserTrips();
  }
}, [isLoaded]);


    /**
     * 
     * @returns
     */

   

     
  const GetUserTrips = async () => {
    if (!isSignedIn) {
      navigation.push('/');
      return;
    }

    const email = user?.emailAddresses?.[0]?.emailAddress;
    if (!email) {
      // console.error("Email is undefined.");
      navigation.push('/');
    }

    try {
      const q = query(collection(db, 'AITrips'), where('userEmail', '==', email));
      const querySnapshot = await getDocs(q);
      const trips = [];
      querySnapshot.forEach((doc) => {
        trips.push(doc.data());
      });
      settripdata(trips); // set all at once
      // console.log("Trips fetched:", trips);
    } catch (err) {
      // console.error("Error fetching trips:", err);
    }
    // console.log(tripdata)
  }
  


  
    
  return (
    <div className='sm:px-10 md:px-32 lg:px-56 xl:px-72 px-5 mt-20 '>
      <h2 className='font-bold text-3xl '>my trips</h2>
      <div className=' grid grid-cols-2 md:grid-cols-3 gap-6 mt-10 mb-20'>
        {tripdata.length>0?tripdata.map((trip,index)=>(
          <UserTripCardItem trip={trip} key={index} />
        ))
        :
        [1,2,3,4,5,6].map((item,index)=>(
          <div className='animate-pulse bg-gray-200 h-[220px] w-full object-cover rounded-xl ' key={index}>
          </div>
        ))
    
    }
      </div>
    </div>
  )
}

export default Mytrips;