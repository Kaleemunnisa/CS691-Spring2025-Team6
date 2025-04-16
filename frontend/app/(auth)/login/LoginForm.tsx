// app/auth/login/loginform.tsx
import { useState } from "react";
import {
  View,
  TextInput,
  Button,
  Text,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import { useRouter } from "expo-router"; // Import the router
import { signIn } from "@/services/firebase/firebaseAuth";
import { primaryBtnColor } from "../colors";
import { useGoogleSignIn } from "@/services/firebase/googleAuth";

const LoginForm = () => {
  const router = useRouter();
  // const [email, setEmail] = useState("satyanandan846@gmail.com"); //tourist
  // const [password, setPassword] = useState("Satya@143");
  const [email, setEmail] = useState("srinu@gmail.com"); //tourist
  const [password, setPassword] = useState("Srinu@143");
  // const [email, setEmail] = useState("famousfish@gmail.com"); //business
  // const [password, setPassword] = useState("FamousFish@143");
  // const [email, setEmail] = useState("riyaz@gmail.com"); //business
  // const [password, setPassword] = useState("DesiVada@143");

  // const [email, setEmail] = useState("praveen@gmail.com"); //guide
  // const [password, setPassword] = useState("PondiGuide@143");

  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleLogin = async () => {
    signIn(email, password, setLoading, setError, router);
  };

  const handleSignUp = () => {
    router.navigate("/(auth)/signup");
  };

  // const { initiateSignIn, googleAuthLoading } = useGoogleSignIn();

  return (
    <View style={styles.formContainer}>
      {error && <Text style={styles.error}>{error}</Text>}
      <TextInput
        placeholderTextColor="rgba(255,255,255,0.7)"
        style={[styles.input, { textTransform: "lowercase" }]}
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
        autoCapitalize="none"
        keyboardType="email-address"
        selectionColor={"white"}
      />
      <TextInput
        placeholderTextColor="rgba(255,255,255,0.7)"
        style={styles.input}
        placeholder="Password"
        secureTextEntry
        value={password}
        onChangeText={setPassword}
        selectionColor={"white"}
      />
      <View>
        <View style={styles.loginINbtn}>
          <Button
            title={loading ? "Logging in..." : "Login"}
            onPress={handleLogin}
            disabled={loading}
            color={"white"}
          />
        </View>
        {/* Google Sign-In Button */}
        {/* <TouchableOpacity
          style={styles.googleButton}
          onPress={initiateSignIn}
          disabled={loading}
        >
          <Text style={styles.googleText}>Sign in with Google</Text>
        </TouchableOpacity> */}
        <View style={styles.signupCtn}>
          {/* Tagline */}
          <Text style={styles.tagLine}>Join our travel family today!</Text>

          {/* Sign Up Button */}
          <TouchableOpacity onPress={handleSignUp}>
            <Text style={styles.signUpText}>Sign Up</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  googleButton: {
    backgroundColor: "#DB4437",
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
    alignItems: "center",
    marginTop: 15,
  },
  googleText: {
    color: "white",
    fontSize: 16,
    fontWeight: "bold",
  },

  signupCtn: {
    marginTop: 20,
    flexDirection: "row", // Align elements side by side
    alignItems: "center", // Keep them vertically centered
    justifyContent: "center", // Adjust spacing
    gap: 10, // Space between text and button
  },
  tagLine: {
    fontSize: 16, // Ensure the text size matches the button text
    fontWeight: "bold",
    color: "#BCCCDC", // Adjust color to match the theme
  },
  // signUpButton: {
  //   backgroundColor: "#007BFF",
  //   paddingVertical: 8,
  //   paddingHorizontal: 16,
  //   borderRadius: 8,
  // },
  signUpText: {
    fontSize: 16, // Ensure same text size as tagline
    fontWeight: "bold",
    color: "#82C0D0",
  },
  loginINbtn: {
    backgroundColor: primaryBtnColor,
    maxWidth: 200, // or any value you prefer
    alignSelf: "center",
    width: "100%", // Ensures it respects maxWidth
    // height:60
    borderRadius: 10,
  },
  formContainer: {
    marginTop: 20,
    // backgroundColor:'red',
    paddingBottom: 30,
  },
  input: {
    height: 45, // Slightly taller input for better UX
    borderColor: "#82C0D0",
    borderWidth: 2,
    marginBottom: 16,
    paddingLeft: 10, // More padding for readability
    borderRadius: 5,
    color: "white", // Ensures input text is white
    // backgroundColor: "#333", // Optional: Dark background for contrast
    fontSize: 16, // Increases text size
  },
  error: {
    color: "red",
    textAlign: "center",
    marginBottom: 10,
  },
});

export default LoginForm;

// ios client id 608284775680-biutu0f7n1ho0ipjn4ctssekoclirbff.apps.googleusercontent.com
// andriod client id 608284775680-4mr6s3j3v303okir98aru2h2u5nd7bg2.apps.googleusercontent.com
// web client id 608284775680-ofta4b1hi2p1lggef8bm7u0l9psd37bt.apps.googleusercontent.com
