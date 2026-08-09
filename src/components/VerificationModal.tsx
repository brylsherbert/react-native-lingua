import { useEffect, useRef, useState } from "react";
import {
  ActivityIndicator,
  KeyboardAvoidingView,
  Modal,
  Platform,
  Pressable,
  Text,
  TextInput,
  View,
} from "react-native";

import { colors } from "@/theme";

const CODE_LENGTH = 6;

type VerificationModalProps = {
  visible: boolean;
  email: string;
  error?: string | null;
  isVerifying?: boolean;
  onClose: () => void;
  onVerify: (code: string) => Promise<void>;
  onResend?: () => Promise<void>;
};

export function VerificationModal({
  visible,
  email,
  error,
  isVerifying = false,
  onClose,
  onVerify,
  onResend,
}: VerificationModalProps) {
  const inputRef = useRef<TextInput>(null);
  const [code, setCode] = useState("");
  const [isResending, setIsResending] = useState(false);
  const verifyingRef = useRef(false);

  useEffect(() => {
    if (!visible) {
      setCode("");
      verifyingRef.current = false;
      return;
    }

    const timer = setTimeout(() => {
      inputRef.current?.focus();
    }, 350);

    return () => clearTimeout(timer);
  }, [visible]);

  const submitCode = async (digits: string) => {
    if (digits.length !== CODE_LENGTH || verifyingRef.current || isVerifying) {
      return;
    }

    verifyingRef.current = true;
    try {
      await onVerify(digits);
    } finally {
      verifyingRef.current = false;
    }
  };

  const handleChangeCode = (value: string) => {
    const digits = value.replace(/\D/g, "").slice(0, CODE_LENGTH);
    setCode(digits);

    if (digits.length === CODE_LENGTH) {
      void submitCode(digits);
    }
  };

  const handleResend = async () => {
    if (!onResend || isResending || isVerifying) {
      return;
    }

    setIsResending(true);
    try {
      await onResend();
      setCode("");
      inputRef.current?.focus();
    } finally {
      setIsResending(false);
    }
  };

  return (
    <Modal
      visible={visible}
      transparent
      animationType="fade"
      onRequestClose={onClose}
    >
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={{
          flex: 1,
          justifyContent: "center",
          backgroundColor: "rgba(13, 19, 43, 0.45)",
          paddingHorizontal: 24,
        }}
      >
        <Pressable
          accessibilityRole="button"
          accessibilityLabel="Dismiss verification"
          onPress={onClose}
          style={{ position: "absolute", top: 0, right: 0, bottom: 0, left: 0 }}
        />

        <View className="rounded-3xl bg-background px-5 pb-6 pt-5">
          <Text className="font-poppins-bold text-center text-[22px] text-text-primary">
            Check your email
          </Text>
          <Text className="body-medium mt-2 text-center text-text-secondary">
            We sent a 6-digit verification code to{" "}
            <Text className="font-poppins-medium text-text-primary">
              {email || "your email"}
            </Text>
            . Enter it below to continue.
          </Text>

          <Pressable
            accessibilityRole="button"
            accessibilityLabel="Enter verification code"
            onPress={() => inputRef.current?.focus()}
            className="mt-6 flex-row justify-between gap-2"
          >
            {Array.from({ length: CODE_LENGTH }).map((_, index) => {
              const digit = code[index] ?? "";
              const isActive = index === code.length;

              return (
                <View
                  key={index}
                  className={`h-12 flex-1 items-center justify-center rounded-xl border ${
                    isActive ? "border-lingua-purple" : "border-border"
                  } bg-surface`}
                >
                  <Text className="font-poppins-semibold text-xl text-text-primary">
                    {digit}
                  </Text>
                </View>
              );
            })}
          </Pressable>

          <TextInput
            ref={inputRef}
            value={code}
            onChangeText={handleChangeCode}
            keyboardType="number-pad"
            textContentType="oneTimeCode"
            autoComplete="one-time-code"
            maxLength={CODE_LENGTH}
            caretHidden
            editable={!isVerifying}
            style={{
              position: "absolute",
              opacity: 0.01,
              height: 1,
              width: 1,
            }}
          />

          {isVerifying ? (
            <View className="mt-4 items-center">
              <ActivityIndicator color={colors.primary.purple} />
            </View>
          ) : null}

          {error ? (
            <Text className="body-small mt-3 text-center text-[#E5484D]">
              {error}
            </Text>
          ) : null}

          {onResend ? (
            <Pressable
              accessibilityRole="button"
              accessibilityLabel="Resend verification code"
              onPress={() => void handleResend()}
              disabled={isResending || isVerifying}
              className="mt-4 items-center py-2"
              style={({ pressed }) =>
                pressed || isResending || isVerifying
                  ? { opacity: 0.5 }
                  : undefined
              }
            >
              <Text className="font-poppins-medium text-sm text-lingua-purple">
                {isResending ? "Sending…" : "Resend code"}
              </Text>
            </Pressable>
          ) : null}

          <Pressable
            accessibilityRole="button"
            accessibilityLabel="Close"
            onPress={onClose}
            className="mt-2 items-center py-2"
            style={({ pressed }) => (pressed ? { opacity: 0.7 } : undefined)}
          >
            <Text className="font-poppins-medium text-sm text-text-secondary">
              Cancel
            </Text>
          </Pressable>
        </View>
      </KeyboardAvoidingView>
    </Modal>
  );
}
