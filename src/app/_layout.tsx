// app/_layout.tsx
import { Stack } from 'expo-router';

export default function Layout() {
  return (
    <Stack screenOptions={{ headerShown: false }}>
      {/* Mendaftarkan file index sebagai halaman pertama yang dibuka */}
      <Stack.Screen name="index" />
      {/* Mendaftarkan file di dalam folder Screens */}
      <Stack.Screen name="Screens/home" />
      <Stack.Screen name="Screens/Detail" />
    </Stack>
  );
}
