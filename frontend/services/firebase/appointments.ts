import {
  getFirestore,
  doc,
  updateDoc,
  arrayUnion,
  setDoc,
  getDoc,
} from "firebase/firestore";
// import { getAuth } from "firebase/auth";
import { Appointment, UserAppointments } from "@/types/types";
import { db, auth } from "@/config/firebaseConfig";

// const db = getFirestore();
// const auth = getAuth();

export const saveAppointment = async (
  appointment: Appointment,
  businessId: string
) => {
  const user = auth.currentUser;
  if (!user) throw new Error("User not authenticated");

  // Save to business document (appointments array field)
  const businessRef = doc(db, "businesses", businessId);
  await updateDoc(businessRef, {
    appointments: arrayUnion(appointment),
  });

  // Save to flat 'appointments' collection using bookingId
  const globalAppointmentRef = doc(db, "appointments", appointment.bookingId);
  await setDoc(globalAppointmentRef, appointment);
};

/**
 * Fetches the user's appointments with business details (profile, name, email).
 * @param auth The Firebase Auth instance
 * @returns {Promise<UserAppointments>} The user's appointments with business details.
 */
export const getUserAppointments = async (): Promise<UserAppointments> => {
  const user = auth.currentUser; // Get the current authenticated user

  if (!user) {
    throw new Error("User is not authenticated");
  }

  try {
    // Fetch the user's appointments document
    const userRef = doc(db, "appointments", user.uid);
    const userSnap = await getDoc(userRef);

    if (userSnap.exists()) {
      const userData = userSnap.data();
      const appointments = userData.appointments || {}; // Get appointments or empty object

      // Fetch business details for each appointment
      const appointmentsWithBusinessDetails: UserAppointments = {};

      for (const appointmentId in appointments) {
        const appointment = appointments[appointmentId];

        // Fetch the business details using the businessId from the appointment
        const businessRef = doc(db, "businesses", appointment.businessId);
        const businessSnap = await getDoc(businessRef);

        if (businessSnap.exists()) {
          const businessData = businessSnap.data();

          // Attach the business details to the appointment
          appointmentsWithBusinessDetails[appointmentId] = {
            ...appointment,
            business: {
              businessId: businessData.id,
              businessName: businessData.name,
              businessEmail: businessData.email,
              businessProfile: businessData.profilePicture || null, // Profile picture (nullable)
            },
          };
        }
      }
      console.log(appointmentsWithBusinessDetails);
      return appointmentsWithBusinessDetails;
    } else {
      return {}; // Return an empty object if no appointments are found
    }
  } catch (error) {
    console.error("Error fetching user appointments:", error);
    throw new Error("Failed to fetch appointments");
  }
};
