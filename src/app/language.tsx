import { useRouter } from "expo-router";
import { SymbolView } from "expo-symbols";
import { useMemo, useState } from "react";
import {
  Dimensions,
  Image,
  Pressable,
  ScrollView,
  Text,
  TextInput,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import { LanguageCard } from "@/components/LanguageCard";
import { images } from "@/constants/images";
import { getPopularLanguages, languages } from "@/data/languages";
import { colors } from "@/theme";

const SCREEN_WIDTH = Dimensions.get("window").width;
const EARTH_SIZE = SCREEN_WIDTH * 0.95;

export default function LanguageScreen() {
  const router = useRouter();
  const [query, setQuery] = useState("");
  const [selectedId, setSelectedId] = useState<string | null>(
    languages[0]?.id ?? null,
  );

  const filteredLanguages = useMemo(() => {
    const normalized = query.trim().toLowerCase();
    const source = normalized ? languages : getPopularLanguages();

    if (!normalized) {
      return source;
    }

    return source.filter(
      (language) =>
        language.name.toLowerCase().includes(normalized) ||
        language.nativeName.toLowerCase().includes(normalized),
    );
  }, [query]);

  const canConfirm = selectedId !== null;

  const handleConfirm = () => {
    if (!canConfirm) {
      return;
    }

    if (router.canGoBack()) {
      router.back();
      return;
    }

    router.replace("/");
  };

  return (
    <View style={{ flex: 1, backgroundColor: colors.neutrals.background }}>
      {/* Earth sits at the physical bottom of the screen, behind content */}
      <View
        pointerEvents="none"
        style={{
          position: "absolute",
          left: (SCREEN_WIDTH - EARTH_SIZE) / 2,
          bottom: -EARTH_SIZE * 0.28,
          width: EARTH_SIZE,
          height: EARTH_SIZE,
          zIndex: 0,
        }}
      >
        <Image
          source={images.earth}
          style={{ width: EARTH_SIZE, height: EARTH_SIZE }}
          resizeMode="contain"
        />
      </View>

      <SafeAreaView style={{ flex: 1 }} edges={["top", "left", "right"]}>
        <View className="flex-1 bg-transparent" style={{ zIndex: 1 }}>
          {/* Header */}
          <View className="relative flex-row items-center justify-center px-4 pb-2 pt-1">
            <Pressable
              accessibilityRole="button"
              accessibilityLabel="Go back"
              onPress={() => {
                if (router.canGoBack()) {
                  router.back();
                  return;
                }
                router.replace("/");
              }}
              hitSlop={12}
              className="absolute left-4 z-10 size-10 items-center justify-center"
              style={({ pressed }) => (pressed ? { opacity: 0.6 } : undefined)}
            >
              <SymbolView
                name="chevron.left"
                tintColor={colors.neutrals.textPrimary}
                size={22}
                weight="semibold"
              />
            </Pressable>

            <Text className="font-poppins-bold text-[18px] text-text-primary">
              Choose a language
            </Text>
          </View>

          {/* Search */}
          <View className="mx-5 mt-3 flex-row items-center rounded-full border border-border bg-surface px-4 py-3">
            <SymbolView
              name="magnifyingglass"
              tintColor={colors.neutrals.textSecondary}
              size={18}
              weight="medium"
            />
            <TextInput
              value={query}
              onChangeText={setQuery}
              placeholder="Search languages"
              placeholderTextColor={colors.neutrals.textSecondary}
              autoCapitalize="none"
              autoCorrect={false}
              style={{
                flex: 1,
                marginLeft: 10,
                padding: 0,
                fontFamily: "Poppins-Regular",
                fontSize: 15,
                color: colors.neutrals.textPrimary,
              }}
            />
          </View>

          <ScrollView
            className="flex-1"
            showsVerticalScrollIndicator={false}
            contentContainerStyle={{
              paddingHorizontal: 20,
              paddingTop: 24,
              paddingBottom: 40,
            }}
            keyboardShouldPersistTaps="handled"
            style={{ zIndex: 1 }}
          >
            <Text className="font-poppins-bold text-[18px] text-text-primary">
              Popular
            </Text>

            <View className="mt-3 gap-1">
              {filteredLanguages.map((language) => (
                <LanguageCard
                  key={language.id}
                  language={language}
                  selected={language.id === selectedId}
                  onPress={() => setSelectedId(language.id)}
                />
              ))}

              {filteredLanguages.length === 0 ? (
                <Text className="body-medium py-6 text-center text-text-secondary">
                  No languages match your search.
                </Text>
              ) : null}
            </View>

            {/* Confirmation — same spot after the list; above the earth */}
            <Pressable
              accessibilityRole="button"
              accessibilityLabel="Confirm language"
              accessibilityState={{ disabled: !canConfirm }}
              disabled={!canConfirm}
              onPress={handleConfirm}
              className={
                canConfirm
                  ? "mt-5 min-h-14 items-center justify-center rounded-full bg-lingua-purple px-6"
                  : "mt-5 min-h-14 items-center justify-center rounded-full bg-border px-6"
              }
              style={({ pressed }) => [
                { zIndex: 2, elevation: 4 },
                pressed && canConfirm ? { opacity: 0.9 } : null,
              ]}
            >
              <Text className="font-poppins-semibold text-center text-base text-white">
                Continue
              </Text>
            </Pressable>
          </ScrollView>
        </View>
      </SafeAreaView>
    </View>
  );
}
