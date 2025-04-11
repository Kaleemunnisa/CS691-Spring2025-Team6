export interface Location {
  name: string;
  lat?: number;
  lng?: number;
}

export interface Event {
  id: string;
  name: string;
  dateTime: string;
  venue: string;
  city: string;
  state: string;
  image: string;
  category: string;
}

export interface Post {
  id: string; // Unique ID for the post
  imageUrls: string[]; // Images uploaded to Cloudinary
  taggedUsers: string[]; // UIDs or usernames
  description: string;
  location: Location | null;
}
