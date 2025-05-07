import "dotenv/config";
export default () => ({
  expo: {
    name: "frontend",
    slug: "frontend",
    version: "1.0.0",
    extra: {
      geoAPIFY_Key: process.env.GEOAPIFY_KEY,
      ticketMasterAPI_Key: process.env.TICKETMASTER_API_KEY,
      firebase: {
        apiKey: process.env.FIREBASE_API_KEY,
        authDomain: process.env.FIREBASE_AUTH_DOMAIN,
        projectId: process.env.FIREBASE_PROJECT_ID,
        storageBucket: process.env.FIREBASE_STORAGE_BUCKET,
        messagingSenderId: process.env.FIREBASE_MESSAGING_SENDER_ID,
        appId: process.env.FIREBASE_APP_ID,
      },
      backend: {
        recommend_api: process.env.RECOMMEND_API_URL,
      },
    },
  },
});
