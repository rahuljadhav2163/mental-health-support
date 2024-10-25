import { Stack } from "expo-router";

export default function RootLayout() {
  return (
    <Stack>
      <Stack.Screen name="index"
      options={{ headerShown: false }}
      />
      <Stack.Screen name="profile"
      options={{ headerShown: false }}
      />
      <Stack.Screen name="home"
      options={{ headerShown: false }}
      />
       <Stack.Screen name="help"
      options={{ headerShown: false }}
      />
      <Stack.Screen name="login"
      options={{ headerShown: true }}
      />
      <Stack.Screen name="signup"
      options={{ headerShown: true }}
      />
      <Stack.Screen name="moodtracker"
      options={{ headerShown: true }}
      />
      <Stack.Screen name="settings"
      options={{ headerShown: true }}
      />
       <Stack.Screen name="appointment"
      options={{ headerShown: true }}
      />
    </Stack>
  );
}