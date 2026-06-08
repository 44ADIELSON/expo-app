# Especificação Técnica e Funcional: Pop-up 'Esqueceu a Senha'

# Objetivo

- **Exibir um Pop-up sobre a tela solicitando confirmação para a redefinição de senha**
- **O pop-up deve ser simples, seguro e focar em reduzir a frustração do usuário**

## 0. Ferramentas e Tecnologias

- **React Native** (Framework base)
- **React Native Paper** ou Biblioteca de componentes uteis.
- **Expo Router** (Roteamento e navegação)
- **TypeScript** (Tipagem estática)
- **Firebase** (Futura integração de autenticação e banco de dados)

## 0.1 Regras de Segurança e Negócio (Critérios de Aceitação)

Para que a funcionalidade seja considerada concluída, as seguintes regras devem ser estritamente cumpridas:

- **Prevenção contra Enumeração:** O sistema nunca deve retornar um erro específico informando "E-mail não encontrado" ou "Usuário inexistente". O feedback de sucesso deve ser sempre genérico (ex: "Se o e-mail existir em nossa base...") para proteger a privacidade dos usuários e evitar ataques de descoberta de contas.

- **Sanitização de Input:** Assim como aplicado na tela de registro (RegisterScreen), o input do pop-up deve remover ativamente quaisquer espaços em branco digitados pelo usuário e forçar a formatação para letras minúsculas (lowercase) automaticamente antes da validação ou envio.

## 1. Experiência do Usuário (UX)

### 1.0 Comportamento de Teclado
- **Comportamento de Teclado:** A experiência do usuário deve incluir um comportamento adequado utilizando o KeyboardAvoidingView. É obrigatório envolver o conteúdo do modal em um componente de gerenciamento de teclado (como o ScrollView aliado ao KeyboardAvoidingView) para evitar sobreposição dos inputs e botões pelo teclado nativo, especialmente em telas menores.

- **Acessibilidade (A11y):** O botão de fechar ("X") no pop-up deve ter um hitSlop (área de toque expandida) mínimo de { top: 10, bottom: 10, left: 10, right: 10 } para atingir a meta de 44x44 pixels recomendada pelas diretrizes de acessibilidade.

- **Garantir que o foco do leitor de tela (VoiceOver/TalkBack) seja movido imediatamente para o conteúdo do pop-up assim que ele for aberto.**

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

## 2. Estrutura do Componente e Visibilidade

- **Base do Componente:** Utilizar obrigatoriamente o <Modal> do React Native Paper (integrado ao <Portal>) como base do componente para garantir sobreposição correta sobre a tela de Login.

- **Controle de Visibilidade:** O estado que controla se o pop-up está aberto ou fechado deve ser gerenciado localmente dentro de LoginScreen utilizando um hook simples de estado (ex: const [isForgotPasswordVisible, setForgotPasswordVisible] = useState(false)). O modal deve ser fechável ao clicar fora de sua área útil (comportamento dismissable).

## 3. Estados da Interface (UI States)

O pop-up deve gerenciar e refletir claramente os seguintes estados de interface para o usuário:

- **Estado Inicial:**

- **Estado de Carregamento (Loading):**

- **Estado de Erro:** Caso o e-mail seja inválido no formato, reutilizar o padrão do componente HelperText em vermelho, exibindo a mensagem de erro logo abaixo do input (validação feita por Regex local).

Estado de Sucesso (Mock):Ao passar pela validação, substituir o input por uma mensagem de confirmação em texto (Exemplo: "Se o e-mail existir em nossa base, você receberá um link em breve.") e mudar o texto do botão principal de ação para "Fechar".

  - **Nota: Como a parte de banco de dados (Firebase) ainda não foi adicionada ao projeto, este estado deve ser simulado (mock) após 1 a 2 segundos de carregamento para testes de interface.**

---

**Últimos Ajustes Implementados**

- **Componente (adicionado):** [components/popups/ForgotPasswordModal.tsx](components/popups/ForgotPasswordModal.tsx) — Modal implementado com `Portal`/`Modal` do `react-native-paper`, `KeyboardAvoidingView` + `ScrollView`, borda `borderRadius: 15`, sanitização em tempo real (remove espaços e força lowercase), validação local por regex, mock de envio (1.5s) e foco automático no input ao abrir.

- **Botão (refatorado):** [components/buttons/ForgotPasswordButton.tsx](components/buttons/ForgotPasswordButton.tsx) — agora aceita `onPress` para abrir o modal; mantive o `Link` como fallback para navegação estática.

- **Integração:** [app/CredentialsPage.tsx](app/CredentialsPage.tsx) — adicionado estado `isForgotVisible` e renderização de `ForgotPasswordModal`; o `ForgotPasswordButton` é chamado com `onPress` para abrir o pop-up.

- **Provider (corrigido):** [app/_layout.tsx](app/_layout.tsx) — envolvi a árvore de navegação com `Provider` do `react-native-paper` (necessário para `Portal`/`Modal`).

- **Estética e consistência:** os botões do modal foram refatorados para usar `Pressable` com estilos consistentes (`backgroundColor: #242440`, `color: #f3f3ff`, `borderRadius: 15`, altura mínima e letterSpacing), e é exibido um `ActivityIndicator` durante o estado de loading.

- **Acessibilidade & Segurança:** o botão de fechar "X" possui `hitSlop` mínimo `{ top: 10, bottom: 10, left: 10, right: 10 }`; o feedback permanece genérico para prevenção de enumeração de contas.

- **Assunções tomadas:** o envio de reset permanece em mock (sem integração Firebase); a alteração do `ForgotPasswordButton` para `onPress` foi aplicada conforme aprovado; mantive cores e tipografia do design existente.

- **Como testar rapidamente:**
  - Rode o app (`npm start`) e abra a tela de login.
  - Toque em "Esqueceu a senha"; o modal deve abrir com foco no input.
  - Insira um e-mail malformado → HelperText de erro deve aparecer.
  - Insira um e-mail válido → botão mostra loading por ~1.5s e então exibe a mensagem genérica de sucesso; botão principal muda para "Fechar".

Se quiser que eu abra um branch/PR com essas mudanças, eu crio e envio. Caso contrário, posso ajustar textos ou tempos do mock conforme preferir.

