import {
  collection,
  doc,
  getDocs,
  setDoc,
  getDoc,
  arrayRemove,
  arrayUnion,
  serverTimestamp,
} from "firebase/firestore";
import { db, auth } from "@/config/firebaseConfig"; // Import db and auth from your config
import { Event, Post } from "@/types/types"; // Your Event interface

/**
 * Saves a user-created event to an array field in the user's document (e.g., user_created_events/<uid>).
 * Event ID format: <last 5 chars of UID>-<event number>
 */
export const saveUserCreatedEvent = async (
  eventData: Omit<Event, "id">
): Promise<Event> => {
  const user = auth.currentUser;
  if (!user) throw new Error("No user is currently authenticated.");

  const userId = user.uid;
  const uidSuffix = userId.slice(-5);
  const userEventsRef = doc(db, "user_created_events", userId);

  // Get the current number of events to generate ID
  const userDocSnap = await getDoc(userEventsRef);
  const currentEvents = userDocSnap.exists()
    ? (userDocSnap.data().events as Event[]) || []
    : [];

  const eventNumber = currentEvents.length + 1;
  const eventId = `${uidSuffix}-${String(eventNumber).padStart(3, "0")}`;

  const fullEvent: Event = {
    ...eventData,
    id: eventId,
  };

  await setDoc(
    userEventsRef,
    {
      events: arrayUnion(fullEvent),
      updatedAt: serverTimestamp(),
    },
    { merge: true }
  );

  return fullEvent;
};

/**
 * Retrieves all events created by the current user.
 */
export const getUserCreatedEvents = async (): Promise<Event[]> => {
  const user = auth.currentUser;
  if (!user) throw new Error("No user is currently authenticated.");

  const userId = user.uid;
  const userEventsRef = doc(db, "user_created_events", userId);

  const docSnap = await getDoc(userEventsRef);
  if (!docSnap.exists()) return [];

  return (docSnap.data().events as Event[]) || [];
};

/**
 * Deletes a specific event created by the current user based on event ID.
 */
export const deleteUserCreatedEvent = async (
  eventId: string
): Promise<void> => {
  const user = auth.currentUser;
  if (!user) throw new Error("No user is currently authenticated.");

  const userId = user.uid;
  const userEventsRef = doc(db, "user_events", userId);
  const docSnap = await getDoc(userEventsRef);

  if (!docSnap.exists()) return;

  const currentEvents = (docSnap.data().events as Event[]) || [];
  const updatedEvents = currentEvents.filter((event) => event.id !== eventId);

  await setDoc(
    userEventsRef,
    {
      events: updatedEvents,
      updatedAt: serverTimestamp(),
    },
    { merge: true }
  );
};

/**
 * Updates a specific event document under the current user's collection by event ID.
 *
 * @param eventId The ID of the event to update
 * @param updatedFields An object with the fields to update (partial Event)
 */
export const updateUserCreatedEvent = async (
  eventId: string,
  updatedFields: Partial<Event>
): Promise<void> => {
  const user = auth.currentUser;
  if (!user) throw new Error("No user is currently authenticated.");

  const userId = user.uid;
  const eventDocRef = doc(db, "user_events", userId, "events", eventId);

  await setDoc(
    eventDocRef,
    {
      ...updatedFields,
      updatedAt: serverTimestamp(),
    },
    { merge: true }
  );
};
