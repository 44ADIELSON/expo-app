import React, { useState } from "react";
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
import { TextInput, HelperText } from "react-native-paper";
import { Logo } from "../components/layout/Logo";
import { RegisterActionButton } from "../components/buttons/RegisterActionButton";
import { validateEmail, validatePassword } from "../utils/validators";
import { createUserWithEmailAndPassword, updateProfile } from 'firebase/auth';
import { auth } from '../firebaseConfig';
import { ActivityIndicator } from 'react-native';
import { useRouter } from 'expo-router';

const RegisterScreen = () => {
  const [email, setEmail] = useState("");
  const [confirmEmail, setConfirmEmail] = useState("");
  const [password, setPassword] = useState("");
  const [hidePassword, setHidePassword] = useState(true);

  // Estados de Erro
  const [emailError, setEmailError] = useState<string | null>(null);
  const [confirmEmailError, setConfirmEmailError] = useState<string | null>(
    null,
  );
  const [passwordError, setPasswordError] = useState<string | null>(null);

  const handleRegister = () => {
    // Resetar erros
    setEmailError(null);
    setConfirmEmailError(null);
    setPasswordError(null);

    const emailValidationError = validateEmail(email);
    const passwordValidationError = validatePassword(password);
    let hasError = false;

    if (emailValidationError) {
      setEmailError(emailValidationError);
      hasError = true;
    }

    if (email.trim().toLowerCase() !== confirmEmail.trim().toLowerCase()) {
      setConfirmEmailError("Os e-mails não coincidem. Verifique a digitação.");
      hasError = true;
    }

    if (passwordValidationError) {
      setPasswordError(passwordValidationError);
      hasError = true;
    }

    if (!hasError) {
      setLoading(true);
      (async () => {
        try {
          const cred = await createUserWithEmailAndPassword(auth, email.trim().toLowerCase(), password);
          await updateProfile(cred.user, { displayName: email.split('@')[0] });
          router.push('/HomePage');
        } catch (e: any) {
          if (e.code === 'auth/email-already-in-use') setEmailError('E-mail já cadastrado');
          else setPasswordError('Erro ao criar conta');
        } finally {
          setLoading(false);
        }
      })();
    }
  };

  const router = useRouter();
  const [loading, setLoading] = useState(false);

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
            <Text style={styles.title}>Crie sua conta</Text>
          </View>

          <View style={styles.corpo}>
            <View style={styles.formGroup}>
              {/* Input de E-mail */}
              <View style={styles.inputContainer}>
                <TextInput
                  mode="outlined"
                  label="Endereço de e-mail"
                  placeholder="Ex: email@exemplo.com"
                  value={email}
                  onChangeText={(text) => {
                    setEmail(text.replace(/\s/g, ""));
                    setEmailError(null);
                  }}
                  keyboardType="email-address"
                  autoCapitalize="none"
                  autoCorrect={false}
                  error={!!emailError}
                  style={styles.input}
                  outlineStyle={styles.inputOutline}
                  textColor="#000"
                  activeOutlineColor="#6200ee"
                />
                <HelperText
                  type="error"
                  visible={!!emailError}
                  style={styles.helperText}
                >
                  {emailError}
                </HelperText>
              </View>

              {/* Confirmar E-mail */}
              <View style={styles.inputContainer}>
                <TextInput
                  mode="outlined"
                  label="Confirme seu e-mail"
                  value={confirmEmail}
                  onChangeText={(text) => {
                    setConfirmEmail(text.replace(/\s/g, ""));
                    setConfirmEmailError(null);
                  }}
                  keyboardType="email-address"
                  autoCapitalize="none"
                  autoCorrect={false}
                  error={!!confirmEmailError}
                  style={styles.input}
                  outlineStyle={styles.inputOutline}
                  textColor="#000"
                  activeOutlineColor="#6200ee"
                />
                <HelperText
                  type="error"
                  visible={!!confirmEmailError}
                  style={styles.helperText}
                >
                  {confirmEmailError}
                </HelperText>
              </View>

              {/* Input de Senha */}
              <View style={styles.inputContainer}>
                <TextInput
                  mode="outlined"
                  label="Digite sua senha"
                  value={password}
                  onChangeText={(text) => {
                    setPassword(text);
                    setPasswordError(null);
                  }}
                  secureTextEntry={hidePassword}
                  autoCapitalize="none"
                  autoCorrect={false}
                  textContentType="password"
                  error={!!passwordError}
                  style={styles.input}
                  outlineStyle={styles.inputOutline}
                  textColor="#000"
                  activeOutlineColor="#6200ee"
                  right={
                    <TextInput.Icon
                      icon={hidePassword ? "eye" : "eye-off"}
                      onPress={() => setHidePassword(!hidePassword)}
                    />
                  }
                />
                <HelperText
                  type="error"
                  visible={!!passwordError}
                  style={styles.helperText}
                >
                  {passwordError}
                </HelperText>
              </View>

              {/* Botão de Submissão */}
              <RegisterActionButton onPress={handleRegister} loading={loading} />
            </View>
          </View>
        </ScrollView>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#EFEEEA",
  },
  scrollContainer: {
    justifyContent: "center",
    paddingHorizontal: 24,
    paddingTop: 40,
    paddingBottom: 24,
    alignItems: "center",
  },
  topo: {
    alignItems: "center",
    marginBottom: 40,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#242440",
    marginTop: 20,
  },
  corpo: {
    width: "100%",
  },
  formGroup: {
    alignItems: "center",
    gap: 8,
  },
  inputContainer: {
    width: "100%",
    alignItems: "center",
  },
  input: {
    width: 330,
    backgroundColor: "#ffffff",
    fontSize: 16,
    elevation: 2,
  },
  inputOutline: {
    borderRadius: 15,
    borderWidth: 1,
  },
  helperText: {
    width: 330,
    paddingHorizontal: 5,
    fontSize: 12,
  },
});

export default RegisterScreen;
