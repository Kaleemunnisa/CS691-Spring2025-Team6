export interface Location {
  name: string;
  lat?: number;
  lng?: number;
}

export interface Event {
  name: string;
  dateTime: string;
  venue: string;
  city: string;
  state: string;
  image: string;
  category: string;
}

export interface Post {
  imageUrls: string[]; // Images uploaded to Cloudinary
  taggedUsers: string[]; // UIDs or usernames
  description: string;
  location: Location | null;
  events: Event[];
}
