import {
  View,
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  TouchableWithoutFeedback,
  Keyboard,
  Text,
} from "react-native";

import React, { useEffect, useState, useRef } from "react";
import { UserInput } from "../components/inputs/UserInput";
import { EnterButton } from "../components/buttons/EnterButton";
import { Logo } from "../components/layout/Logo";
import { ForgotPasswordButton } from "../components/buttons/ForgotPasswordButton";
import { NewUserButton } from "../components/buttons/NewUserButton";
import ForgotPasswordModal from "../components/popups/ForgotPasswordModal";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useRouter } from "expo-router";
import {
  EMAIL_REGEX,
  MAX_EMAIL_LENGTH,
  ATTEMPT_LIMIT,
  COOLDOWN_MS,
  STORAGE_KEYS,
} from "../utils/authConfig";

const LoginScreen = () => {
  const router = useRouter();
  const [isForgotVisible, setForgotVisible] = useState(false);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [emailError, setEmailError] = useState("");
  const [generalError, setGeneralError] = useState("");

  const [attempts, setAttempts] = useState(0);
  const [lockedUntil, setLockedUntil] = useState<number | null>(null);
  const lockTimerRef = useRef<number | null>(null);

  useEffect(() => {
    // load persisted attempts/lock
    (async () => {
      try {
        const attemptsRaw = await AsyncStorage.getItem(STORAGE_KEYS.ATTEMPTS);
        const lockRaw = await AsyncStorage.getItem(STORAGE_KEYS.LOCK_UNTIL);
        if (attemptsRaw) setAttempts(Number(attemptsRaw));
        if (lockRaw) {
          const until = Number(lockRaw);
          if (!isNaN(until) && until > Date.now()) setLockedUntil(until);
        }
      } catch (e) {
        // ignore
      }
    })();

    return () => {
      if (lockTimerRef.current) clearInterval(lockTimerRef.current);
    };
  }, []);

  useEffect(() => {
    if (lockedUntil && lockedUntil > Date.now()) {
      // start countdown updater
      lockTimerRef.current = setInterval(() => {
        if (!lockedUntil) return;
        if (Date.now() >= lockedUntil) {
          setLockedUntil(null);
          setAttempts(0);
          AsyncStorage.removeItem(STORAGE_KEYS.LOCK_UNTIL);
          AsyncStorage.removeItem(STORAGE_KEYS.ATTEMPTS);
          if (lockTimerRef.current) clearInterval(lockTimerRef.current);
        } else {
          // force update
          setLockedUntil((prev) => (prev ? prev : null));
        }
      }, 1000) as unknown as number;
    }
  }, [lockedUntil]);

  const sanitizeEmail = (value: string) => {
    try {
      return value.normalize("NFC").trim();
    } catch (e) {
      return value.trim();
    }
  };

  const validateEmail = (value: string) => {
    if (!value) return "";
    if (value.length > MAX_EMAIL_LENGTH) return "E-mail muito longo";
    const ok = EMAIL_REGEX.test(value);
    return ok ? "" : "E-mail inválido";
  };

  const persistAttempts = async (count: number) => {
    try {
      await AsyncStorage.setItem(STORAGE_KEYS.ATTEMPTS, String(count));
    } catch (e) {}
  };

  const persistLock = async (until: number | null) => {
    try {
      if (until) await AsyncStorage.setItem(STORAGE_KEYS.LOCK_UNTIL, String(until));
      else await AsyncStorage.removeItem(STORAGE_KEYS.LOCK_UNTIL);
    } catch (e) {}
  };

  const handleFailedAttempt = async () => {
    const next = attempts + 1;
    setAttempts(next);
    await persistAttempts(next);
    if (next >= ATTEMPT_LIMIT) {
      const until = Date.now() + COOLDOWN_MS;
      setLockedUntil(until);
      await persistLock(until);
      setGeneralError("Muitas tentativas. Tente novamente em 5 minutos ou recupere sua senha.");
    } else {
      setGeneralError(`Usuário ou senha incorretos. Você tem ${ATTEMPT_LIMIT - next} tentativas restantes.`);
    }
  };

  const handleSubmit = async () => {
    setGeneralError("");
    if (lockedUntil && lockedUntil > Date.now()) return;

    const sanitizedEmail = sanitizeEmail(email);
    const emailErr = validateEmail(sanitizedEmail.toLowerCase());
    setEmailError(emailErr);

    if (!sanitizedEmail || emailErr) {
      await handleFailedAttempt();
      return;
    }

    if (!password) {
      await handleFailedAttempt();
      return;
    }

    // NOTE: Aqui deveria haver chamada ao servidor para autenticação.
    // Como exemplo, consideramos sucesso caso email e senha não vazios e email válido.
    // Ao sucesso, resetar contador e navegar.
    await AsyncStorage.removeItem(STORAGE_KEYS.ATTEMPTS);
    await AsyncStorage.removeItem(STORAGE_KEYS.LOCK_UNTIL);
    setAttempts(0);
    setLockedUntil(null);
    router.push("/HomePage");
  };

  const remainingMs = lockedUntil ? Math.max(0, lockedUntil - Date.now()) : 0;
  const remainingMin = Math.ceil(remainingMs / 1000);

  const isLocked = !!(lockedUntil && lockedUntil > Date.now());

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
    >
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <ScrollView
          contentContainerStyle={styles.scrollContainer}
          keyboardShouldPersistTaps="handled"
          showsVerticalScrollIndicator={false}
        >
          <View style={styles.topo}>
            <Logo iconColor="#000000" textColor="#000000" />
          </View>

          <View style={styles.corpo}>
            <View style={styles.formGroup}>
              <UserInput
                label="Endereço de e-mail"
                placeholder="Ex: email@exemplo.com"
                value={email}
                onChangeText={(t) => setEmail(t)}
                keyboardType="email-address"
                error={!!emailError}
                onSubmitEditing={handleSubmit}
                returnKeyType="next"
                disabled={isLocked}
              />

              <UserInput
                label="Digite sua senha"
                placeholder="Senha"
                value={password}
                onChangeText={(t) => setPassword(t)}
                secureTextEntry
                error={false}
                onSubmitEditing={handleSubmit}
                returnKeyType="done"
              />

              {generalError ? <Text style={{ color: "#b00020" }}>{generalError}</Text> : null}
              {isLocked ? (
                <Text style={{ color: "#b00020" }}>
                  Você está bloqueado. Tente novamente em {Math.ceil(remainingMs / 1000)} segundos.
                </Text>
              ) : null}

              <ForgotPasswordButton onPress={() => setForgotVisible(true)} />
              <EnterButton onPress={handleSubmit} disabled={isLocked || !email || !password || !!emailError} />
              <NewUserButton />
            </View>
          </View>
        </ScrollView>
      </TouchableWithoutFeedback>
      <ForgotPasswordModal visible={isForgotVisible} onDismiss={() => setForgotVisible(false)} />
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#EFEEEA",
  },
  scrollContainer: {
    justifyContent: "flex-start", 
    paddingHorizontal: 24,
    paddingBottom: 24,
    alignItems: 'center',   
  },
  topo: {
    alignItems: "center",
    marginBottom: 185,             
  },
  corpo: {
    gap: 24,                     
  },
  formGroup: {
    alignItems: 'center',

    gap: 16,                     
  },
});

export default LoginScreen;