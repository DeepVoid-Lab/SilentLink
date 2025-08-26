import { AuthProvider } from "@/utils/authContext";
import { Stack } from "expo-router";

export default function RooLayout() {
  return (
    <AuthProvider>
      <Stack>
        <Stack.Screen
          name="(protected)"
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="signin"
          options={{
            headerShown: false,
          }}
        />
      </Stack>
    </AuthProvider>
  );
}
