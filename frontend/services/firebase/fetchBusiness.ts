import { getDocs, collection } from "firebase/firestore";
import { db } from "@/config/firebaseConfig";

type Loca = {
  city: string;
  country: string;
  countryCode: string;
  lat: string;
  lon: string;
  placeID: string;
  state: string;
  stateCode: string;
};

type BusinessData = {
  id?: string;
  profilePicture: string | null;
  name: string;
  email: string;
  userName: string;
  password: string;
  confirmPassword: string;
  businessType: string;
  location: Loca;
  images: any[];
};

export const fetchBusinesses = async (): Promise<BusinessData[]> => {
  const snapshot = await getDocs(collection(db, "businesses"));
  const businesses: BusinessData[] = [];

  snapshot.forEach((doc) => {
    const data = doc.data() as BusinessData;
    businesses.push({
      ...data,
      id: doc.id, // Add the Firestore document ID
    });
  });

  console.log(businesses);
  return businesses;
};

const dummyPlaceGeoapify = {
  geometry: {
    coordinates: [-74.09972498877285, 40.68647655035566],
    type: "Point",
  },
  properties: {
    address_line1: "Hudson Lanes",
    address_line2:
      "1 Garfield Avenue, Jersey City, NJ 07305, United States of America",
    categories: ["building", "entertainment", "entertainment.bowling_alley"],
    city: "Jersey City",
    country: "United States",
    country_code: "us",
    county: "Hudson County",
    datasource: {
      attribution: "© OpenStreetMap contributors",
      license: "Open Database License",
      raw: [Object],
      sourcename: "openstreetmap",
      url: "https://www.openstreetmap.org/copyright",
    },
    details: [],
    formatted:
      "Hudson Lanes, 1 Garfield Avenue, Jersey City, NJ 07305, United States of America",
    housenumber: "1",
    iso3166_2: "US-NJ",
    lat: 40.68647655,
    lon: -74.09972498877285,
    name: "Hudson Lanes",
    place_id:
      "51e557ebe4618652c059cd9fae76de574440f00102f901a7a9ab1f0000000092030c487564736f6e204c616e6573",
    postcode: "07305",
    state: "New Jersey",
    state_code: "NJ",
    street: "Garfield Avenue",
  },
  type: "Feature",
};
