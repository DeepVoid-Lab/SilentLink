import ChatScreen from "@/components/ChatScreen";
import { Link } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";

export default function GroupChat() {
  return (
    <SafeAreaView>
      <Link href="/">Go Home</Link>
      <ChatScreen />
    </SafeAreaView>
  );
}
