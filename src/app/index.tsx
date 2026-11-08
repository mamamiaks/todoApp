// app/index.tsx
import { Redirect } from 'expo-router';

export default function AppStart() {
  // Otomatis mengalihkan tampilan ke folder Screens/home saat aplikasi dibuka
  return <Redirect href="/Screens/home" />;
}
