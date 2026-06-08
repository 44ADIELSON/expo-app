# Especificação Técnica e Funcional: Tela de Cadastro de Usuário

## 1. Objetivo
* **Permitir que o um novo usuário crie uma nova conta. 

---

### 1.1 Contexto
 * **Usuario estava na tela do login e clicou em um presseble que direcionou ele para a tela de cadastro.**



## 2. Ferramentas e Tecnologias
* **React Native** (Framework base)
* **TypeScript** (Tipagem estática)
* **React Native Paper** (Biblioteca de componentes de UI)
* **Firebase** (Futura integração de autenticação e banco de dados)
* **Expo Router** (Roteamento e navegação)

---

## 3. Critérios de Aceitação

### 3.1. Input de E-mail

#### Formato e Validação Básica
* **Caracteres obrigatórios:** O e-mail deve conter obrigatoriamente um símbolo de arroba (`@`) e um ponto (`.`) após o arroba.
* **Domínio válido:** O domínio (ex: `.com`, `.com.br`, `.edu`) deve ter pelo menos dois caracteres após o último ponto.
* **Espaços em branco:** O sistema deve sanitizar ou rejeitar e-mails que contenham espaços em branco.
* **Caracteres especiais:** Permitir apenas letras (`a-z`), números (`0-9`) e caracteres específicos como ponto (`.`), hífen (`-`) e underline (`_`). Caracteres acentuados ou símbolos especiais devem ser bloqueados.
* **Sensibilidade a maiúsculas/minúsculas:** O sistema deve ser *case-insensitive* (ex: `Exemplo@email.com` e `exemplo@email.com` devem ser tratados como o mesmo endereço).
* **Acessibilidade e Usabilidade de Teclado:** 
    * **Usar a ferramenta do "react-native" KeyboardAvoidingView**
    * **Usar TouchableWithoutFeedback**
    * **Ao clicar no input o teclado deve empurrar a tela para o centro**

#### Regras de Prevenção de Erros e UX
* **Campos vazios:** O campo de e-mail não pode ficar em branco ao tentar submeter.
* **Tamanho máximo:** Definir um limite de caracteres entre 254 e 320 caracteres (conforme padrão internacional RFC 5322).
* **Feedback visual (React Native Paper):** O componente `TextInput` deve alternar para o estado de erro (`error={true}`) alterando sua cor para vermelho/cor de alerta caso existam inconsistências.
* **Confirmação de e-mail (Não Funcional / Mock):** Para evitar erros de digitação, deve existir um campo de "Confirmar E-mail". O sistema deve validar se o texto digitado no segundo campo é idêntico ao primeiro.
    * *Nota de Implementação:* Como o Firebase será integrado futuramente, implemente apenas a validação em memória local. Componente Oco (*mock*).

### 3.2. Input de Senha

#### Critérios de Força da Senha
* **Tamanho mínimo:** Deve conter pelo menos 8 caracteres.
* **Tamanho máximo:** Deve aceitar até 64 caracteres (permitindo *passphrases*).
* **Variedade de caracteres:** Deve exigir pelo menos três dos seguintes quatro grupos:
    * Letras maiúsculas (`A-Z`)
    * Letras minúsculas (`a-z`)
    * Números (`0-9`)
    * Caracteres especiais (ex: `@`, `#`, `$`, `%`, `*`, `!`, `?`)

#### Critérios para Rejeição de Senhas Fracas
O sistema deve recusar explicitamente combinações comuns e sequenciais:
* Sequências numéricas simples (ex: `123456`, `123456789`, `1234`)
* Sequências de teclado (ex: `qwerty`, `asdfgh`, `zxcvbn`)
* Repetições do mesmo caractere (ex: `000000`, `111111`)
* Palavras óbvias (ex: `password`, `senha`, `admin`, `root`)

---

## 4. Segurança e Privacidade
* **Verificação de duplicidade (Não Funcional / Mock):** O sistema deve verificar simuladamente se o e-mail já foi cadastrado. Caso sim, exibir a mensagem: *"Este e-mail já possui cadastro. Recupere sua senha aqui"*. (Implementar comportamento como componente oco para futura integração com Firebase Auth).
* **Domínios descartáveis:** O sistema deve possuir uma lista ou validação básica para bloquear domínios temporários conhecidos (ex: `mailinator.com`, `tempmail.com`) para mitigar spam.

---

## 5. Mensagens de Erro (UX)
* **Feedback claro:** As mensagens de erro devem ser descritivas e autoexplicativas, apontando a resolução.
    * *Exemplo ruim:* "E-mail inválido".
    * *Exemplo ideal:* "O e-mail deve conter um caractere '@' e um domínio válido (ex: .com)".

---

## 6. Referências de Código e Estilo

### 6.1. Estrutura de Layout Base (Exemplo da Tela de Login)
* **A tela de cadastro deve seguir uma estrutura arquitetural de layout semelhante à tela de login fornecida abaixo:**

import React from "react";
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
import { ForgotPasswordButton } from '../components/buttons/ForgotPasswordButton';
import { NewUserButton } from '../components/buttons/NewUserButton';

const LoginScreen = () => {
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

### 6.2. Botões de Ação (Estilos de Referência)
* **Botão Explorar**

import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { useRouter } from "expo-router";

export const ExploreButton = () => {
  const router = useRouter();

  return (
    <View style={styles.viewContainer}>
      <TouchableOpacity
        onPress={() => router.navigate("./CredentialsPage")}
        style={styles.exploreButton}
        activeOpacity={0.7}
      >
        <Text style={styles.exploreButtonText}>Explorar</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  viewContainer: {
    width: "85%",
    alignItems: 'center'
  },
  exploreButton: {
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 20,
    paddingVertical: 12,
    paddingHorizontal: 24,
    minWidth: 330,
    borderRadius: 15,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 4,
    backgroundColor: "#242440",
  },
  exploreButtonText: {
    color: "#f3f3ff",
    fontSize: 20,
    fontWeight: "bold",
    fontFamily: "System",
    letterSpacing: 5
  },
});

* **Botão Entrar / Enviar:**

import React from "react";
import { View, Text, StyleSheet, Pressable } from "react-native";
import { useRouter } from "expo-router";

export const EnterButton = () => {
  const router = useRouter();

  return (
    <View>
      <Pressable
        style={styles.enterButton}
        onPress={() => router.navigate("/HomePage")}
      >
        <Text style={styles.enterButtonText}>Entrar</Text>
      </Pressable>
    </View>
  );
};

const styles = StyleSheet.create({
  enterButton: {
    alignItems: "center",
    justifyContent: "center",
    minWidth: 330,
    height: 50,
    borderRadius: 15,
    elevation: 2,
    padding: 10,
    marginBottom: 20,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.25,
    shadowRadius: 1,
    backgroundColor: "#242440",
  },
  enterButtonText: {
    color: "#f3f3ff",
    fontSize: 20,
    fontWeight: "bold",
    letterSpacing: 5
  },
});

### 6.3. Componente de Inputs Utilizando React Native Paper

import React, { useState } from "react";
import { View, StyleSheet } from "react-native";
import { TextInput } from "react-native-paper";

export const UserInput = () => {
  const [ocultarSenha, setOcultarSenha] = useState(true);

  return (
    <View style={styles.viewAll}>
      <TextInput
        mode="outlined"
        label="Endereço de e-mail"
        placeholder="Ex: email@exemplo.com"
        style={styles.input}
        outlineStyle={styles.inputOutline}
        textColor="#000"
        activeOutlineColor="#6200ee"
      />

      <TextInput
        mode="outlined"
        label="Digite sua senha"
        secureTextEntry={ocultarSenha}
        autoCapitalize="none"
        autoCorrect={false}
        textContentType="password"
        style={styles.input}
        outlineStyle={styles.inputOutline}
        textColor="#000"
        activeOutlineColor="#6200ee"
        right={
          <TextInput.Icon
            icon={ocultarSenha ? "eye" : "eye-off"}
            onPress={() => setOcultarSenha(!ocultarSenha)}
          />
        }
      />
    </View>
  );
};

const styles = StyleSheet.create({
  viewAll: {
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    gap: 30,
    padding: 10,
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
});

export default UserInput;