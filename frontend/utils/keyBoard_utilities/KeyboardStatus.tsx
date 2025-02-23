import { useState, useEffect } from "react";
import { Keyboard } from "react-native";

const useKeyboardStatus = () => {
  const [isKeyboardActive, setIsKeyboardActive] = useState(false);

  useEffect(() => {
    const showSubscription = Keyboard.addListener("keyboardDidShow", () => {
      setIsKeyboardActive(true);
    });

    const hideSubscription = Keyboard.addListener("keyboardDidHide", () => {
      setIsKeyboardActive(false);
    });

    return () => {
      showSubscription.remove();
      hideSubscription.remove();
    };
  }, []);

  return isKeyboardActive;
};

export default useKeyboardStatus;
