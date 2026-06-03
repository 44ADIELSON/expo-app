import React, { useEffect, useRef, useState } from "react";
import {
  View,
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  Pressable,
  Text,
  ActivityIndicator,
} from "react-native";
import { Portal, Modal, TextInput, HelperText } from "react-native-paper";

type Props = {
  visible: boolean;
  onDismiss: () => void;
};

const ForgotPasswordModal: React.FC<Props> = ({ visible, onDismiss }) => {
  const [email, setEmail] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const inputRef = useRef<any>(null);

  useEffect(() => {
    if (visible) {
      // Focar o input quando o modal abrir
      setTimeout(() => inputRef.current?.focus?.(), 120);
      setError(null);
      setLoading(false);
      setSuccess(false);
    } else {
      setEmail("");
      setError(null);
      setLoading(false);
      setSuccess(false);
    }
  }, [visible]);

  const sanitize = (text: string) => text.replace(/\s/g, "").toLowerCase();

  const validateFormat = (value: string): string | null => {
    if (!value || value.trim() === "")
      return "O campo de e-mail não pode ficar em branco.";
    const sanitized = value.trim();
    const regex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    if (!regex.test(sanitized))
      return "O e-mail deve conter um caractere '@' e um domínio válido (ex: .com).";
    return null;
  };

  const handleSubmit = () => {
    setError(null);
    const sanitized = sanitize(email);
    const v = validateFormat(sanitized);
    if (v) {
      setError(v);
      return;
    }

    setLoading(true);
    // Mock: simula requisição e não revela existência de conta
    setTimeout(() => {
      setLoading(false);
      setSuccess(true);
    }, 1500);
  };

  const handleClose = () => {
    onDismiss();
  };

  return (
    <Portal>
      <Modal
        visible={visible}
        onDismiss={handleClose}
        contentContainerStyle={styles.container}
        dismissable
      >
        <KeyboardAvoidingView
          behavior={Platform.OS === "ios" ? "padding" : "height"}
        >
          <ScrollView
            contentContainerStyle={styles.content}
            keyboardShouldPersistTaps="handled"
          >
            <View style={styles.header}>
              <Text style={styles.title}>Recuperar senha</Text>
              <Pressable
                onPress={handleClose}
                hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
              >
                <Text style={styles.closeText}>X</Text>
              </Pressable>
            </View>

            {!success ? (
              <>
                <TextInput
                  ref={inputRef}
                  mode="outlined"
                  label="E-mail ou nome de usuário"
                  placeholder="Ex: email@exemplo.com"
                  value={email}
                  onChangeText={(t) => {
                    setEmail(sanitize(t));
                    setError(null);
                  }}
                  keyboardType="email-address"
                  autoCapitalize="none"
                  autoCorrect={false}
                  error={!!error}
                  style={styles.input}
                  outlineStyle={styles.inputOutline}
                  textColor="#000"
                  activeOutlineColor="#6200ee"
                />

                <HelperText
                  type="error"
                  visible={!!error}
                  style={styles.helperText}
                >
                  {error}
                </HelperText>

                <Pressable
                  style={({ pressed }) => [
                    styles.primaryButton,
                    pressed && { opacity: 0.8 },
                  ]}
                  onPress={handleSubmit}
                  disabled={loading}
                >
                  {loading ? (
                    <ActivityIndicator color="#f3f3ff" />
                  ) : (
                      <Text style={styles.primaryButtonText}>
                        Enviar Link de Recuperação
                      </Text>
                  )}
                </Pressable>

                <Pressable
                  onPress={handleClose}
                  hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
                >
                  <Text style={styles.secondaryText}>Voltar para o Login</Text>
                </Pressable>
              </>
            ) : (
              <>
                <Text style={styles.successText}>
                  Se o e-mail existir em nossa base, você receberá um link em
                  breve.
                </Text>
                <Pressable
                  style={({ pressed }) => [
                    styles.primaryButton,
                    pressed && { opacity: 0.8 },
                  ]}
                  onPress={handleClose}
                >
                  <Text style={styles.primaryButtonText}>Fechar</Text>
                </Pressable>
              </>
            )}
          </ScrollView>
        </KeyboardAvoidingView>
      </Modal>
    </Portal>
  );
};

export default ForgotPasswordModal;

const styles = StyleSheet.create({
  container: {
    alignSelf: "center",
    backgroundColor: "#ffffff",
    padding: 20,
    borderRadius: 15,
    width: 340,
    marginHorizontal: 16,
  },
  content: {
    alignItems: "center",
  },
  header: {
    width: "100%",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 12,
  },
  title: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#242440",
  },
  closeText: {
    fontSize: 18,
    color: "#242440",
  },
  input: {
    width: 300,
    backgroundColor: "#ffffff",
    fontSize: 16,
    elevation: 2,
    marginBottom: 6,
  },
  inputOutline: {
    borderRadius: 15,
    borderWidth: 1,
  },
  helperText: {
    width: 330,
    paddingHorizontal: 5,
    fontSize: 12,
    marginBottom: 6,
  },
  actionButton: {
    width: 330,
    borderRadius: 15,
    backgroundColor: "#242440",
    marginBottom: 8,
  },
  actionButtonContent: {
    height: 50,
    justifyContent: "center",
  },
  secondaryButton: {
    width: 330,
  },
  primaryButton: {
    alignItems: "center",
    justifyContent: "center",
    minWidth: 300,
    height: 50,
    borderRadius: 15,
    elevation: 2,
    padding: 10,
    marginBottom: 20,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.25,
    shadowRadius: 1,
    backgroundColor: "#242440",
  },
  primaryButtonText: {
    color: "#f3f3ff",
    fontSize: 16,
    fontWeight: "bold",
  },
  secondaryText: {
    color: "#242440",
    fontSize: 16,
    marginTop: 8,
  },
  successText: {
    width: 300,
    textAlign: "center",
    marginBottom: 16,
    color: "#242440",
    fontSize: 16,
  },
});
