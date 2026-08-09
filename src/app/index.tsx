import { useClerk, useUser } from "@clerk/expo";
import { Pressable, Text, View } from "react-native";

export default function Index() {
  const { user } = useUser();
  const { signOut } = useClerk();

  return (
    <View className="flex-1 items-center justify-center gap-4 bg-background px-6">
      <Text className="h1 text-lingua-purple">Lingua</Text>
      <Text className="body-large text-center text-text-secondary">
        {user?.primaryEmailAddress?.emailAddress
          ? `Signed in as ${user.primaryEmailAddress.emailAddress}`
          : "You're signed in"}
      </Text>
      <Pressable
        accessibilityRole="button"
        accessibilityLabel="Sign out"
        onPress={() => signOut()}
        className="min-h-12 items-center justify-center rounded-2xl border border-border px-6"
        style={({ pressed }) => (pressed ? { opacity: 0.85 } : undefined)}
      >
        <Text className="font-poppins-medium text-[15px] text-text-primary">
          Sign out
        </Text>
      </Pressable>
    </View>
  );
}
