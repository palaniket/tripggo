// export const AI_PROMPT="Generate Travel plan for Location: {location}, for {totalDays} Days for {traveler}  with a {budget} budget,give me hotel options list with HotelName,Hotel address, Price, hotel image url, geo coordinates, rating, description and suggest itinerary with placeName, placeDetail, place Image url, Geo Coordinates, ticket pricing, Time travel each of the location for {totalDays} days  with each day plan(activities) with best time to visit(time duration) each location in the JSON format.Keep the format same in every response."
export const AI_PROMPT=`
Generate a travel plan in strict json format using the schema defined below. 
Do not change property names, hierarchy, or format. Fill in the values based on:

Location: {location}  
Total Days: {totalDays}  
Traveler: {traveler}  
Budget: {budget}

Use this exact JSON structure (strict field names and types):

{
  "location": "string",
  "totalDays": 0,
  "traveler": "string",
  "budget": "string",
  "hotels": [
    {
      "hotelName": "string",
      "hotelAddress": "string",
      "pricePerNight": "string",
      "imageUrl": "string",
      "geoCoordinates": {
        "lat": 0.0,
        "lng": 0.0
      },
      "rating": 0.0,
      "description": "string"
    }
  ],
  "itinerary": [
    {
      "day": 0,
      "activities": [
        {
          "placeName": "string",
          "placeDetail": "string",
          "imageUrl": "string",
          "geoCoordinates": {
            "lat": 0.0,
            "lng": 0.0
          },
          "ticketPrice": "string",
          "travelTimeMinutes": 0,
          "bestTimeToVisit": "string"
        }
      ]
    }
  ]
}

Make sure:
- The field names must exactly match those in the schema.
- No comments, no extra text, no markdown.
- Return only valid, parsable JSON.

Now generate the travel plan.

`
