import React, { useState } from "react";
import { useRouter } from "expo-router";
import UserTypeSelectionScreen from "./UserTypeSelectionScreen";
// import SignupForm from "./SignupForm";

const SignupIndex = () => {
  const [selectedUserType, setSelectedUserType] = useState<string | null>(null);
  const router = useRouter();

  const handleSelection = (userType: string) => {
    console.log(userType);
    setSelectedUserType(userType); // Set selected user type
    router.push({
      pathname: "/(auth)/signup/SignupForm",
      params: { userType: userType },
    });
  };

  return <UserTypeSelectionScreen onSelect={handleSelection} />;
};

export default SignupIndex;
