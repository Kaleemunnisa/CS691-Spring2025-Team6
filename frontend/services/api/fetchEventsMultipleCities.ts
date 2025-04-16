import axios from "axios";
import { TICKETMASTER_API_KEY } from "@/services/api/ApiKeys";

async function fetchEventsWithCoordinatesAndCity(
  previousSearchRecords: {
    cityName: string;
    latitude: number;
    longitude: number;
  }[]
) {
  try {
    // Create an array of promises to fetch events for each city using coordinates

    const eventRequests = previousSearchRecords.map((record) =>
      axios.get(`https://app.ticketmaster.com/discovery/v2/events.json`, {
        params: {
          apikey: TICKETMASTER_API_KEY,
          // Use latitude and longitude to get events for the city
          latlong: `${record.latitude},${record.longitude}`, // Combine lat, long for event fetching
          size: 6, // Limit the number of events per city (adjust size as needed)
        },
      })
    );

    // Execute all API calls concurrently
    const responses = await Promise.all(eventRequests);

    // Extract and merge event data with only the required fields
    let allEvents: any[] = [];
    responses.forEach((response) => {
      if (response.data?._embedded?.events) {
        const filteredEvents = response.data._embedded.events.map(
          (event: any) => ({
            id: event.id,
            name: event.name,
            dateTime:
              event.dates?.start?.localDate +
                " " +
                event.dates?.start?.localTime || "Date & Time Unavailable",
            venue: event._embedded?.venues?.[0]?.name || "Venue Not Available",
            city: event._embedded?.venues?.[0]?.city?.name || "Unknown City",
            state: event._embedded?.venues?.[0]?.state?.name || "Unknown State",
            image: event.images?.[0]?.url || null,
            category: event.classifications?.[0]?.segment?.name || "Event",
          })
        );
        allEvents = [...allEvents, ...filteredEvents];
      }
    });

    console.log("Filtered Events:", allEvents);
    return allEvents;
  } catch (error) {
    // console.log("Error fetching events:", error);
    return [];
  }
}

export default fetchEventsWithCoordinatesAndCity;
