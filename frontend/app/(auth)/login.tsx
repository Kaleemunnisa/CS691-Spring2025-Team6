import { Text, View, StyleSheet } from 'react-native';
import { useRouter } from 'expo-router';
const login = () => {
    const router = useRouter();
    const handleClick = () =>{
        
    }
  return (
    <View>
        <Text onPress={handleClick}>Hello Login</Text>
    </View>
  )
}

export default login
