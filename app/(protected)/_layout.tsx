import { useAuthContext } from "@/utils/authContext";
import { Redirect, Stack } from "expo-router";


export default function RootLayout() {
  const authState = useAuthContext() 
    
  if(!authState.isReady){
      return null;
  }
  if(!authState.isLogdin){
    
      return <Redirect href="/signin" />;
  }
    
  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen name="chatPages" options={{ headerShown: true }} />
    </Stack>
  );
}
