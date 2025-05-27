import axios from "axios"

const Base_URL='https://places.googleapis.com/v1/places:searchText'
const config={
    headers:{
        'Content-Type':'application/json',
        'X-Goog-Api-Key':process.env.NEXT_PUBLIC_PLACE_API,
        'X-Goog-FieldMask':[
            'places.photos',
            'places.displayName',
            'places.id'
        ]
    }
}
export const GetplaceDetails=(data)=>axios.post(Base_URL,data,config)
export  const PHOTO_REF_URL="https://places.googleapis.com/v1/{Name}/media?maxHeightPx=1000&maxWidthPx=1000&key="+process.env.NEXT_PUBLIC_PLACE_API