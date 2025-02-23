import axios from "axios";
// import { useState } from "react";

// import allEventsData from "../(tabs)/(home)/data/eventsData";
import { TICKETMASTER_API_KEY } from "./ApiKeys";

export const fetchEvents = async (
  city: any,
  stateCode: any,
  countryCode: any,
  setLoading: any,
  // setCountry: any,
  setCityEvents: any,
  setOtherEvents: any
) => {
  if (!city) return;
  setLoading(true);

  try {
    // Step 1: Fetch events for the detected country (including music, sports, etc.)
    const eventRes = await axios.get(
      `https://app.ticketmaster.com/discovery/v2/events.json`,
      {
        params: {
          countryCode: countryCode, // Use the detected country code if needed
          stateCode: stateCode,
          apikey: TICKETMASTER_API_KEY,
          city: city, // Filter by the entered city
          size: 30, // Fetch more events to ensure variety
        },
      }
    );
    const allEvents = eventRes.data._embedded?.events || [];

    // Step 2: Parse and sort events by date and time
    const parseDateTime = (dateString: any, timeString: any) => {
      return new Date(`${dateString}T${timeString}`).getTime();
    };

    const sortedEvents = allEvents.sort(
      (
        a: { dates: { start: { localDate: any; localTime: any } } },
        b: { dates: { start: { localDate: any; localTime: any } } }
      ) => {
        const aDateTime = parseDateTime(
          a.dates.start.localDate,
          a.dates.start.localTime || "00:00"
        );
        const bDateTime = parseDateTime(
          b.dates.start.localDate,
          b.dates.start.localTime || "00:00"
        );
        return aDateTime - bDateTime;
      }
    );

    // Step 3: Separate events into city-specific and other events
    const citySpecificEvents:
      | ((prevState: never[]) => never[])
      | {
          name: any;
          dateTime: string;
          venue: any;
          city: any;
          state: any;
          image: any;
          category: any;
        }[] = [];
    const otherEventsByGenre: any = {};

    sortedEvents.forEach(
      (event: {
        _embedded: {
          venues: {
            [x: string]: any;
            state: { name: any };
          }[];
        };
        name: any;
        dates: { start: { localDate: string; localTime: string } };
        images: { url: any }[];
        classifications: { segment: { name: any } }[];
      }) => {
        const eventCity =
          event._embedded?.venues?.[0]?.city?.name || "Unknown City";
        const eventData = {
          name: event.name,
          dateTime:
            event.dates?.start?.localDate +
              " " +
              event.dates?.start?.localTime || "Date & Time Unavailable",
          venue: event._embedded?.venues?.[0]?.name || "Venue Not Available",
          city: eventCity,
          state: event._embedded?.venues?.[0]?.state?.name || "Unknown State",
          image: event.images?.[0]?.url || null,
          category: event.classifications?.[0]?.segment?.name || "Event", // Add event category
        };

        if (eventCity.toLowerCase() === city.toLowerCase()) {
          citySpecificEvents.push(eventData);
        } else {
          const genre = eventData.category;
          if (!otherEventsByGenre[genre]) {
            otherEventsByGenre[genre] = [];
          }
          otherEventsByGenre[genre].push(eventData);
        }
      }
    );

    // Step 4: If no events in "You Might Like", fetch events from neighboring states
    if (Object.keys(otherEventsByGenre).length === 0) {
      const fallbackEventRes = await axios.get(
        `https://app.ticketmaster.com/discovery/v2/events.json`,
        {
          params: {
            countryCode: countryCode,
            stateCode: stateCode,
            apikey: TICKETMASTER_API_KEY,
            size: 5, // Fetch 5 fallback events
          },
        }
      );
      const fallbackEvents = fallbackEventRes.data._embedded?.events || [];

      fallbackEvents.forEach(
        (event: {
          name: any;
          dates: { start: { localDate: string; localTime: string } };
          _embedded: { venues: any[] };
          images: { url: any }[];
          classifications: { segment: { name: any } }[];
        }) => {
          const eventData = {
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
          };
          const genre = eventData.category;
          if (!otherEventsByGenre[genre]) {
            otherEventsByGenre[genre] = [];
          }
          otherEventsByGenre[genre].push(eventData);
        }
      );
    }

    //Step 5: Update state
    setCityEvents(citySpecificEvents);
    console.log("city specific events: ->>>", citySpecificEvents);
    // console.log(cityEvents);
    setOtherEvents(otherEventsByGenre);
    // setCityEvents(allEventsData());
  } catch (error) {
    console.error("Error fetching events:", error);
  }
  //   console.log(cityEvents.length);
  setLoading(false);
};
