import { useRouter } from "expo-router";
import { SymbolView } from "expo-symbols";
import { Image, Pressable, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import { images } from "@/constants/images";
import { colors } from "@/theme";

const SPEECH_BUBBLES = [
  {
    id: "hello",
    label: "Hello!",
    className:
      "absolute left-1 top-6 z-10 rounded-3xl bg-[#E8F1FF] px-5 py-2.5",
    textClassName: "font-poppins-semibold text-[15px] text-text-primary",
  },
  {
    id: "hola",
    label: "¡Hola!",
    className:
      "absolute right-0 top-14 z-10 rounded-3xl bg-[#EDE7FF] px-5 py-2.5",
    textClassName: "font-poppins-semibold text-[15px] text-lingua-purple",
  },
  {
    id: "nihao",
    label: "你好!",
    className:
      "absolute right-[-4px] top-[46%] z-10 rounded-3xl bg-[#FFE8DF] px-5 py-2.5",
    textClassName: "font-poppins-semibold text-[15px] text-[#FF6B4A]",
  },
] as const;

export default function OnboardingScreen() {
  const router = useRouter();

  return (
    <SafeAreaView
      style={{ flex: 1, backgroundColor: colors.neutrals.background }}
    >
      <View className="flex-1 bg-background px-6 pt-3">
        {/* Brand header — logo larger than wordmark, centered */}
        <View className="items-center">
          <View className="flex-row items-center gap-2.5">
            <Image
              source={images.mascotLogo}
              className="size-13"
              resizeMode="contain"
            />
            <Text className="font-poppins-bold text-[20px] text-text-primary">
              lingua
            </Text>
          </View>
        </View>

        {/* Headline + subtitle — left-aligned to match design */}
        <View className="mt-10 pr-4">
          <Text className="font-poppins-bold text-[34px] leading-[1.15] text-text-primary">
            Your AI language{"\n"}
            <Text className="text-lingua-purple">teacher.</Text>
          </Text>
          <Text className="body-large mt-3 text-text-secondary">
            Real conversations, personalized lessons, anytime, anywhere.
          </Text>
        </View>

        {/* Mascot + speech bubbles */}
        <View className="mt-2 flex-1 items-center justify-center">
          <View className="relative aspect-square w-full items-center justify-center">
            {SPEECH_BUBBLES.map((bubble) => (
              <View key={bubble.id} className={bubble.className}>
                <Text className={bubble.textClassName}>{bubble.label}</Text>
              </View>
            ))}
            <Image
              source={images.mascotWelcome}
              className="h-[96%] w-[96%]"
              resizeMode="contain"
            />
          </View>
        </View>

        {/* CTA — StyleSheet/style only for pressed state (AGENTS exception) */}
        <View className="pb-4 pt-2">
          <Pressable
            accessibilityRole="button"
            accessibilityLabel="Get Started"
            onPress={() => router.push("/sign-up")}
            className="min-h-14 items-center justify-center rounded-2xl bg-lingua-purple px-6"
            style={({ pressed }) => (pressed ? { opacity: 0.9 } : undefined)}
          >
            <Text className="font-poppins-semibold text-center text-base text-white">
              Get Started
            </Text>
            <View className="absolute right-5">
              <SymbolView
                name="chevron.right"
                tintColor={colors.neutrals.background}
                size={18}
                weight="semibold"
              />
            </View>
          </Pressable>
        </View>
      </View>
    </SafeAreaView>
  );
}
