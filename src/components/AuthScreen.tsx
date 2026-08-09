import { useSignIn, useSignUp } from "@clerk/expo";
import { useSSO } from "@clerk/expo/experimental";
import type { OAuthStrategy } from "@clerk/expo/types";
import { useRouter, type Href } from "expo-router";
import { SymbolView } from "expo-symbols";
import { useState } from "react";
import {
  Image,
  KeyboardAvoidingView,
  Platform,
  Pressable,
  ScrollView,
  Text,
  TextInput,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import { VerificationModal } from "@/components/VerificationModal";
import { SocialButton, type SocialProvider } from "@/components/SocialButton";
import { images } from "@/constants/images";
import { colors } from "@/theme";

type AuthMode = "sign-up" | "sign-in";

type AuthScreenProps = {
  mode: AuthMode;
};

const COPY = {
  "sign-up": {
    title: "Create your account",
    subtitle: "Start your language journey today ✨",
    submitLabel: "Sign Up",
    footerPrompt: "Already have an account?",
    footerAction: "Log in",
    footerHref: "/sign-in" as const,
  },
  "sign-in": {
    title: "Welcome back",
    subtitle: "Continue your language journey ✨",
    submitLabel: "Sign In",
    footerPrompt: "Don't have an account?",
    footerAction: "Sign up",
    footerHref: "/sign-up" as const,
  },
} as const;

const SOCIAL_PROVIDERS: {
  id: SocialProvider;
  label: string;
  strategy: OAuthStrategy;
}[] = [
  {
    id: "google",
    label: "Continue with Google",
    strategy: "oauth_google",
  },
  {
    id: "facebook",
    label: "Continue with Facebook",
    strategy: "oauth_facebook",
  },
  {
    id: "apple",
    label: "Continue with Apple",
    strategy: "oauth_apple",
  },
];

function getErrorMessage(error: unknown, fallback: string) {
  if (
    error &&
    typeof error === "object" &&
    "message" in error &&
    typeof error.message === "string" &&
    error.message.length > 0
  ) {
    return error.message;
  }

  return fallback;
}

function AuthField({
  label,
  value,
  onChangeText,
  placeholder,
  secureTextEntry,
  showPasswordToggle,
  passwordVisible,
  onTogglePassword,
  keyboardType,
  autoCapitalize,
  textContentType,
  autoComplete,
}: {
  label: string;
  value: string;
  onChangeText: (text: string) => void;
  placeholder: string;
  secureTextEntry?: boolean;
  showPasswordToggle?: boolean;
  passwordVisible?: boolean;
  onTogglePassword?: () => void;
  keyboardType?: "email-address" | "default";
  autoCapitalize?: "none" | "sentences";
  textContentType?: "emailAddress" | "password";
  autoComplete?: "email" | "password";
}) {
  return (
    <View className="min-h-16 justify-center rounded-2xl border border-border px-4 py-2.5">
      <Text className="caption text-text-secondary">{label}</Text>
      <View className="mt-0.5 flex-row items-center">
        <TextInput
          value={value}
          onChangeText={onChangeText}
          placeholder={placeholder}
          placeholderTextColor={colors.neutrals.textSecondary}
          secureTextEntry={secureTextEntry}
          keyboardType={keyboardType}
          autoCapitalize={autoCapitalize}
          autoCorrect={false}
          textContentType={textContentType}
          autoComplete={autoComplete}
          style={{
            flex: 1,
            padding: 0,
            margin: 0,
            fontFamily: "Poppins-Medium",
            fontSize: 15,
            color: colors.neutrals.textPrimary,
          }}
        />
        {showPasswordToggle ? (
          <Pressable
            accessibilityRole="button"
            accessibilityLabel={
              passwordVisible ? "Hide password" : "Show password"
            }
            onPress={onTogglePassword}
            hitSlop={8}
            style={({ pressed }) => (pressed ? { opacity: 0.6 } : undefined)}
          >
            <SymbolView
              name={passwordVisible ? "eye.slash" : "eye"}
              tintColor={colors.neutrals.textSecondary}
              size={20}
              weight="regular"
            />
          </Pressable>
        ) : null}
      </View>
    </View>
  );
}

export function AuthScreen({ mode }: AuthScreenProps) {
  const router = useRouter();
  const copy = COPY[mode];
  const { signUp, errors: signUpErrors, fetchStatus: signUpStatus } =
    useSignUp();
  const { signIn, errors: signInErrors, fetchStatus: signInStatus } =
    useSignIn();
  const { startSSOFlow } = useSSO();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [verificationVisible, setVerificationVisible] = useState(false);
  const [formError, setFormError] = useState<string | null>(null);
  const [verificationError, setVerificationError] = useState<string | null>(
    null,
  );
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isVerifying, setIsVerifying] = useState(false);
  const [isSocialLoading, setIsSocialLoading] = useState(false);

  const isBusy =
    isSubmitting ||
    isVerifying ||
    isSocialLoading ||
    signUpStatus === "fetching" ||
    signInStatus === "fetching";

  const navigateAfterAuth = ({
    session,
    decorateUrl,
  }: {
    session?: { currentTask?: unknown } | null;
    decorateUrl: (url: string) => string;
  }) => {
    if (session?.currentTask) {
      return;
    }

    const url = decorateUrl("/");
    if (url.startsWith("http")) {
      // Expo web fallback
      router.replace("/" as Href);
      return;
    }

    router.replace(url as Href);
  };

  const handleSignUp = async () => {
    setFormError(null);

    const trimmedEmail = email.trim();
    if (!trimmedEmail || !password) {
      setFormError("Enter your email and password to continue.");
      return;
    }

    setIsSubmitting(true);
    try {
      const { error } = await signUp.password({
        emailAddress: trimmedEmail,
        password,
      });

      if (error) {
        setFormError(
          getErrorMessage(error, "Unable to create your account. Try again."),
        );
        return;
      }

      const { error: sendError } = await signUp.verifications.sendEmailCode();
      if (sendError) {
        setFormError(
          getErrorMessage(
            sendError,
            "Unable to send a verification code. Try again.",
          ),
        );
        return;
      }

      setVerificationError(null);
      setVerificationVisible(true);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleSignIn = async () => {
    setFormError(null);

    const trimmedEmail = email.trim();
    if (!trimmedEmail) {
      setFormError("Enter your email to continue.");
      return;
    }

    setIsSubmitting(true);
    try {
      const { error } = await signIn.emailCode.sendCode({
        emailAddress: trimmedEmail,
      });

      if (error) {
        setFormError(
          getErrorMessage(error, "Unable to send a sign-in code. Try again."),
        );
        return;
      }

      setVerificationError(null);
      setVerificationVisible(true);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleSubmit = () => {
    if (isBusy) {
      return;
    }

    if (mode === "sign-up") {
      void handleSignUp();
      return;
    }

    void handleSignIn();
  };

  const handleVerify = async (code: string) => {
    setVerificationError(null);
    setIsVerifying(true);

    try {
      if (mode === "sign-up") {
        const { error } = await signUp.verifications.verifyEmailCode({ code });
        if (error) {
          setVerificationError(
            getErrorMessage(error, "Invalid verification code. Try again."),
          );
          return;
        }

        if (signUp.status === "complete") {
          const { error: finalizeError } = await signUp.finalize({
            navigate: navigateAfterAuth,
          });

          if (finalizeError) {
            setVerificationError(
              getErrorMessage(
                finalizeError,
                "Verification succeeded, but sign-up could not finish.",
              ),
            );
          }
        } else {
          setVerificationError("Sign-up is not complete yet. Try again.");
        }
        return;
      }

      const { error } = await signIn.emailCode.verifyCode({ code });
      if (error) {
        setVerificationError(
          getErrorMessage(error, "Invalid verification code. Try again."),
        );
        return;
      }

      if (signIn.status === "complete") {
        const { error: finalizeError } = await signIn.finalize({
          navigate: navigateAfterAuth,
        });

        if (finalizeError) {
          setVerificationError(
            getErrorMessage(
              finalizeError,
              "Verification succeeded, but sign-in could not finish.",
            ),
          );
        }
      } else {
        setVerificationError("Sign-in is not complete yet. Try again.");
      }
    } finally {
      setIsVerifying(false);
    }
  };

  const handleResend = async () => {
    setVerificationError(null);

    if (mode === "sign-up") {
      const { error } = await signUp.verifications.sendEmailCode();
      if (error) {
        setVerificationError(
          getErrorMessage(error, "Unable to resend the code. Try again."),
        );
      }
      return;
    }

    const { error } = await signIn.emailCode.sendCode();
    if (error) {
      setVerificationError(
        getErrorMessage(error, "Unable to resend the code. Try again."),
      );
    }
  };

  const handleSocial = async (strategy: OAuthStrategy) => {
    if (isBusy) {
      return;
    }

    setFormError(null);
    setIsSocialLoading(true);

    try {
      const { createdSessionId, signUp: ssoSignUp } = await startSSOFlow({
        strategy,
      });

      if (createdSessionId) {
        router.replace("/");
        return;
      }

      if (ssoSignUp?.status === "missing_requirements") {
        setFormError(
          "Your social account needs a few more details in the Clerk Dashboard before continuing.",
        );
      }
    } catch (error) {
      setFormError(
        getErrorMessage(error, "Social sign-in failed. Try again."),
      );
    } finally {
      setIsSocialLoading(false);
    }
  };

  const fieldError =
    mode === "sign-up"
      ? signUpErrors.fields.emailAddress?.message ||
        signUpErrors.fields.password?.message
      : signInErrors.fields.identifier?.message ||
        signInErrors.fields.code?.message;

  return (
    <SafeAreaView
      style={{ flex: 1, backgroundColor: colors.neutrals.background }}
    >
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={{ flex: 1 }}
      >
        <ScrollView
          keyboardShouldPersistTaps="handled"
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{ flexGrow: 1, paddingHorizontal: 24 }}
        >
          <Pressable
            accessibilityRole="button"
            accessibilityLabel="Go back"
            onPress={() => router.back()}
            hitSlop={12}
            className="mt-1 h-10 w-10 items-start justify-center"
            style={({ pressed }) => (pressed ? { opacity: 0.6 } : undefined)}
          >
            <SymbolView
              name="chevron.left"
              tintColor={colors.neutrals.textPrimary}
              size={22}
              weight="semibold"
            />
          </Pressable>

          <View className="mt-2 items-center">
            <Text className="font-poppins-bold text-center text-[28px] text-text-primary">
              {copy.title}
            </Text>
            <Text className="body-medium mt-2 text-center text-text-secondary">
              {copy.subtitle}
            </Text>

            <View className="relative mt-5 h-36 w-44 items-center justify-center">
              <Text className="absolute left-2 top-2 text-lg text-[#FF8A00]">
                ✦
              </Text>
              <Text className="absolute right-3 top-6 text-base text-[#4D8BFF]">
                ✦
              </Text>
              <Text className="absolute bottom-8 left-4 text-sm text-[#FF8A00]">
                ✦
              </Text>
              <Image
                source={images.mascotAuth}
                className="h-32 w-32"
                resizeMode="contain"
              />
            </View>
          </View>

          <View className="mt-2 gap-3">
            <AuthField
              label="Email"
              value={email}
              onChangeText={setEmail}
              placeholder="alex@gmail.com"
              keyboardType="email-address"
              autoCapitalize="none"
              textContentType="emailAddress"
              autoComplete="email"
            />

            {mode === "sign-up" ? (
              <AuthField
                label="Password"
                value={password}
                onChangeText={setPassword}
                placeholder="••••••••"
                secureTextEntry={!passwordVisible}
                showPasswordToggle
                passwordVisible={passwordVisible}
                onTogglePassword={() => setPasswordVisible((prev) => !prev)}
                textContentType="password"
                autoComplete="password"
              />
            ) : null}

            {formError || fieldError ? (
              <Text className="body-small text-center text-[#E5484D]">
                {formError || fieldError}
              </Text>
            ) : null}

            <Pressable
              accessibilityRole="button"
              accessibilityLabel={copy.submitLabel}
              onPress={handleSubmit}
              disabled={isBusy}
              className="min-h-14 items-center justify-center rounded-2xl bg-lingua-purple px-6"
              style={({ pressed }) =>
                pressed || isBusy ? { opacity: 0.75 } : undefined
              }
            >
              <Text className="font-poppins-semibold text-center text-base text-white">
                {isSubmitting ? "Please wait…" : copy.submitLabel}
              </Text>
            </Pressable>
          </View>

          <View className="mt-6 flex-row items-center gap-3">
            <View className="h-px flex-1 bg-border" />
            <Text className="body-small text-text-secondary">
              or continue with
            </Text>
            <View className="h-px flex-1 bg-border" />
          </View>

          <View className="mt-4 gap-3">
            {SOCIAL_PROVIDERS.map((provider) => (
              <SocialButton
                key={provider.id}
                provider={provider.id}
                label={provider.label}
                onPress={() => void handleSocial(provider.strategy)}
              />
            ))}
          </View>

          {/* Required for Clerk bot protection on sign-up (web); skipped on iOS/Android Native API */}
          <View nativeID="clerk-captcha" />

          <View className="mt-auto flex-row items-center justify-center gap-1 pb-4 pt-8">
            <Text className="body-medium text-text-secondary">
              {copy.footerPrompt}
            </Text>
            <Pressable
              accessibilityRole="link"
              accessibilityLabel={copy.footerAction}
              onPress={() => router.push(copy.footerHref)}
              style={({ pressed }) => (pressed ? { opacity: 0.7 } : undefined)}
            >
              <Text className="font-poppins-semibold text-[14px] text-lingua-purple">
                {copy.footerAction}
              </Text>
            </Pressable>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>

      <VerificationModal
        visible={verificationVisible}
        email={email.trim()}
        error={verificationError}
        isVerifying={isVerifying}
        onClose={() => {
          setVerificationVisible(false);
          setVerificationError(null);
        }}
        onVerify={handleVerify}
        onResend={handleResend}
      />
    </SafeAreaView>
  );
}
