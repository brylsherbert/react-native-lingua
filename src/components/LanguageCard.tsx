import { SymbolView } from "expo-symbols";
import { Image, Pressable, Text, View } from "react-native";

import { colors } from "@/theme";
import type { Language } from "@/types/learning";

type LanguageCardProps = {
  language: Language;
  selected: boolean;
  onPress: () => void;
};

export function LanguageCard({
  language,
  selected,
  onPress,
}: LanguageCardProps) {
  return (
    <Pressable
      accessibilityRole="button"
      accessibilityState={{ selected }}
      accessibilityLabel={`${language.name}, ${language.learnersLabel}`}
      onPress={onPress}
      className={
        selected
          ? "flex-row items-center rounded-2xl border border-lingua-purple bg-[#F3EEFF] px-4 py-3.5"
          : "flex-row items-center rounded-2xl bg-background px-4 py-3.5"
      }
      style={({ pressed }) => (pressed ? { opacity: 0.9 } : undefined)}
    >
      <View className="size-12 overflow-hidden rounded-full">
        <Image
          source={{ uri: language.flagEmoji }}
          className="size-12"
          resizeMode="cover"
        />
      </View>

      <View className="ml-3.5 flex-1">
        <Text className="font-poppins-semibold text-[16px] text-text-primary">
          {language.name}
        </Text>
        <Text className="body-small mt-0.5 text-text-secondary">
          {language.learnersLabel}
        </Text>
      </View>

      {selected ? (
        <View className="size-7 items-center justify-center rounded-full bg-lingua-purple">
          <SymbolView
            name="checkmark"
            tintColor={colors.neutrals.background}
            size={14}
            weight="bold"
          />
        </View>
      ) : (
        <SymbolView
          name="chevron.right"
          tintColor={colors.neutrals.border}
          size={16}
          weight="semibold"
        />
      )}
    </Pressable>
  );
}
