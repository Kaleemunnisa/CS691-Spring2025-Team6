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

export interface PostDisplay {
  postId: string;
  imageUrls: string[]; // Images uploaded to Cloudinary
  taggedUsers: string[]; // UIDs or usernames
  description: string;
  location: Location | null;
  createdAt: string; // Timestamp of when the post was created
  userId: string; // User ID of the post creator
  userName: string; // User name of the post creator
  userImage: string; // Profile image of the post creator
  likes?: number; // Number of likes on the post
  comments?: number; // Number of comments on the post
  shares?: number; // Number of shares of the post
}
export type Location_ = {
  city: string;
  country: string;
  countryCode: string;
  lat: string;
  lon: string;
  placeID: string;
  state: string;
  stateCode: string;
};
export type BusinessData = {
  id?: string;
  profilePicture: string | null;
  name: string;
  email: string;
  userName: string;
  password: string;
  confirmPassword: string;
  businessType: string;
  location: Location_;
  images: any[];
};

export type Appointment = {
  bookingId: string;
  bookingName: string;
  dateTime: string; // ISO string
  count: number;
  userId: string;
};

export type BusinessDetails = {
  businessId: string;
  businessName: string;
  businessEmail: string;
  businessProfile: string | null; // Business profile picture URL (nullable)
};

export type UserAppointment = {
  bookingId: string;
  bookingName: string;
  dateTime: string; // ISO date string
  count: number; // Number of people
  business: BusinessDetails; // Business details
};

export type UserAppointments = {
  [appointmentId: string]: UserAppointment;
};
