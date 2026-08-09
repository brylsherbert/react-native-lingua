import { Link } from "expo-router";
import { Text, View } from "react-native";

export default function Index() {
  return (
    <View className="flex-1 items-center justify-center gap-4 bg-background px-6">
      <Text className="h1 text-lingua-purple">Lingua</Text>
      <Link href="/onboarding" className="body-large text-lingua-purple underline">
        Open onboarding
      </Link>
    </View>
  );
}
