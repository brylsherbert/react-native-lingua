import FontAwesome5 from "@expo/vector-icons/FontAwesome5";
import { Pressable, Text } from "react-native";

import { colors } from "@/theme";

export type SocialProvider = "google" | "facebook" | "apple";

type SocialButtonProps = {
  provider: SocialProvider;
  label: string;
  onPress?: () => void;
};

const PROVIDER_ICONS: Record<
  SocialProvider,
  { name: "google" | "facebook" | "apple"; color: string }
> = {
  google: { name: "google", color: "#EA4335" },
  facebook: { name: "facebook", color: "#1877F2" },
  apple: { name: "apple", color: colors.neutrals.textPrimary },
};

export function SocialButton({ provider, label, onPress }: SocialButtonProps) {
  const icon = PROVIDER_ICONS[provider];

  return (
    <Pressable
      accessibilityRole="button"
      accessibilityLabel={label}
      onPress={onPress}
      className="relative min-h-13 items-center justify-center rounded-2xl border border-border bg-background px-4"
      style={({ pressed }) => (pressed ? { opacity: 0.85 } : undefined)}
    >
      <FontAwesome5
        name={icon.name}
        brand
        size={18}
        color={icon.color}
        style={{ position: "absolute", left: 16 }}
      />
      <Text className="font-poppins-medium text-center text-[15px] text-text-primary">
        {label}
      </Text>
    </Pressable>
  );
}
