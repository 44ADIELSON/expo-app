# Especificação Técnica e Funcional: Pop-up 'Esqueceu a Senha'

# Objetivo

- **Exibir um Pop-up sobre a tela solicitando confirmação para a redefinição de senha**
- **O pop-up deve ser simples, seguro e focar em reduzir a frustração do usuário**

## 2. Ferramentas e Tecnologias

- **React Native** (Framework base)
- **React Native Paper** ou Biblioteca de componentes uteis.
- **Expo Router** (Roteamento e navegação)
- **TypeScript** (Tipagem estática)
- **Firebase** (Futura integração de autenticação e banco de dados)

## 1. Experiência do Usuário (UX)

- **Campo único:** Solicite apenas o e-mail ou o nome de usuário cadastrado.
  - _Nota de Implementação:_ Como o Firebase será integrado futuramente, implemente apenas a validação em memória local. Componente Oco (_mock_).
- **Botão fechar:** Inclua um "X" visível e permita fechar o pop-up clicando fora dele.
- **Botão de ação claro:** Use textos diretos no botão principal, como "Enviar Link de Recuperação".
- **Link de retorno:** Adicione um botão "Voltar para o Login" caso o usuário lembre a senha de última hora
- \*\*Não implementar novidades em cores nem fontes. Seguir regra de borderRadius: 15 para o pop-up

### 1.1 Referência de design, cores de botões, componentes e telas no projeto

- **EnterButton**

import { View, Text, StyleSheet, Pressable } from "react-native";
import { useRouter } from "expo-router";

export const EnterButton = () => {
const router = useRouter();

return (
<View>
<Pressable
style={estilos.EnterButton}
onPress={() => router.navigate("/HomePage")} >
<Text style={estilos.EnterButtonText}>Entrar</Text>
</Pressable>
</View>
);
};

const estilos = StyleSheet.create({
EnterButton: {
alignItems: "center",
justifyContent: "center",

    minWidth: 330,
    height: 50,

    borderRadius: 15,
    elevation: 2,

    padding: 10,
    marginBottom: 20,

    //  Equivalente iOS
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 1, // 1px vertical
    },
    shadowOpacity: 0.25, // rgba(0,0,0,0.25)
    shadowRadius: 1, // 1px blur

    backgroundColor: "#242440",

    fontFamily: "System",

},
EnterButtonText: {
color: "#f3f3ff",
fontSize: 20,
fontWeight: "bold",
letterSpacing: 5
},
});

- **ExploreButton:**

import {
View,
Text,
StyleSheet,
TouchableOpacity,
} from "react-native";
import {useRouter} from "expo-router";

export const ExploreButton = () => {
const router = useRouter();

return (
<View style={estilos.View}>
<TouchableOpacity
onPress={() => router.navigate("./CredentialsPage")}
style={estilos.ExploreButton}
activeOpacity={0.7} >
<Text style={estilos.ExploreButtonText}>Explorar</Text>
</TouchableOpacity>
</View>
);
};

const estilos = StyleSheet.create({
View: {
width: "85%",
alignItems: 'center'
},
ExploreButton: {
alignItems: "center",
justifyContent: "center",
marginBottom: 20,
paddingVertical: 12,
paddingHorizontal: 24,
minWidth: 330,

    borderRadius: 15,

    boxShadow: "0px 4px 4px rgba(0, 0, 0, 0.25)",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.25,
    shadowRadius: 1,
    elevation: 1,

    backgroundColor: "#242440",

},
ExploreButtonText: {
color: "#f3f3ff",
fontSize: 20,
fontWeight: "bold",
fontFamily: "System",
letterSpacing: 5
},
});

- **Tela do Login:**

import {
View,
StyleSheet,
KeyboardAvoidingView,
Platform,
ScrollView,
TouchableWithoutFeedback,
Keyboard,
} from "react-native";

import { UserInput } from "../components/inputs/UserInput";
import { EnterButton } from "../components/buttons/EnterButton";
import { Logo } from "../components/layout/Logo";
import { ForgotPasswordButton } from '../components/buttons/ForgotPasswordButton'
import { NewUserButton } from '../components/buttons/NewUserButton'

const LoginScreen = () => {
const color = 'black';

return (
<KeyboardAvoidingView
style={styles.container}
behavior={Platform.OS === "ios" ? "padding" : "height"} >
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
              <UserInput />
              <ForgotPasswordButton />
              <EnterButton />
              <NewUserButton />
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

### 1.1 Referência de inputs utilizados

- **Input utilizado na tela de cadastro**

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
      // Futura integração com Firebase Auth:
      // createUserWithEmailAndPassword(auth, email.trim(), password)
      console.log("Validação concluída com sucesso. Submetendo dados...");
      alert("Cadastro realizado com sucesso (Mock)!");
    }

};

return (
<KeyboardAvoidingView
style={styles.container}
behavior={Platform.OS === "ios" ? "padding" : "height"} >
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
                    setEmail(text.replace(/\s/g, "")); // Sanitização em tempo real de espaços
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
              <RegisterActionButton onPress={handleRegister} />
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