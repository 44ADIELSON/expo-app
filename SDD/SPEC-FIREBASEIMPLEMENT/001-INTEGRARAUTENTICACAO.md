# Integração Banco de Dados

# Objetivo

- Modificar componentes existentes para receberem, agirem com e manusearem informações relacionadas ao firebase
- Remover a API randomuser usada para exibir onde deveria ser o usuario
  - Ao remover a integração, o espaço ocupado pelo uso atual do componente <UserSelection /> - <UserCard/> com a API, deve ser substituido pela resposta do Banco de Dados e exibido no lugar

- Criar uma conta baseada em senha
- Conectar um usuário com endereço de e-mail e senha
- Recuperar uma senha

# 0. Ferramentas e Tecnologias

- **React Native** (Framework base)
- **React Native Paper**
- **Expo Router** (Roteamento e navegação)
- **TypeScript** (Tipagem estática)
- **Firebase**

# 0.1. Referencias e componentes relacionados

- **Referencia Externa:** 
    - https://firebase.google.com/docs/auth/web/password-auth?hl=pt-br#web

- **Referencia interna:** 
    firebaseConfig.js -> /home/aluno/Postman/files/expo-app/firebaseConfig.js

- **Páginas:**

CredentialsPage

- /home/aluno/Postman/files/expo-app/app/CredentialsPage.tsx

# CredentialsPage 1

- Os inpust devem receber um e-mail e senha que existam no banco de dados
- O botão <EnterButton/> deve disparar sobre criterios de informações preenchidas corretas e válidas do banco de dados.

## CredentialsPage 1.1

- Adicionar um pop-up para mensagens de erro caso o e-mail;
- Adicionar um pop-up login ok baseado no pop-up de ForgotPasswordModal -> /home/aluno/Postman/files/expo-app/components/popups/ForgotPasswordModal.tsx

## UserRegistrationPage

- /home/aluno/Postman/files/expo-app/app/UserRegistrationPage.tsx

- Os dados preenchidos para e-mail e senha devem enviar as informações para o firebase
- O pop-up atual deve seguir o padrão de ForgotPasswordModal -> /home/aluno/Postman/files/expo-app/components/popups/ForgotPasswordModal.tsx
- Com credenciais criadas deve redirecionar para página HomePage -> /home/aluno/Postman/files/expo-app/app/HomePage.tsx

## HomePage

- /home/aluno/Postman/files/expo-app/app/HomePage.tsx

- Deve substituir o uso atual da API do RandomUser para um login sucess do usuario.

- **Botões e dispardores de ações**

### EnterButton
- /home/aluno/Postman/files/expo-app/components/buttons/EnterButton.tsx
 - Mudar o clique para um botão react-native paper com loading ao clicar e mudar para carregando enquanto a informação é verificada
- O disparo deve verificar a veracidade dos dados no firebase
 - Erro:
    Exibir um pop-up baseado em ForgotPasswordModal -> /home/aluno/Postman/files/expo-app/components/popups/ForgotPasswordModal.tsx com uma saida que não facilite o vazamento de informações
- Sucess: 
    Chama o pop-up com login sucess e redireciona para a página HomePage -> /home/aluno/Postman/files/expo-app/app/HomePage.tsx

### ExitButton
- /home/aluno/Postman/files/expo-app/components/buttons/ExitButton.tsx
- Faz o logout e redireciona para a página CredentialsPage -> /home/aluno/Postman/files/expo-app/app/CredentialsPage.tsx

### ForgotPasswordButton
- /home/aluno/Postman/files/expo-app/components/buttons/ForgotPasswordButton.tsx
- Deve enviar um e-mail de recuperação para o e-mail informado no input. 
 - Erro: se não existir no banco ou incorreto
    - Não facilitar o vazamento de informações
- Sucess: 
    - Mantém o pop-up para o sucesso


### RegisterActionButton
- /home/aluno/Postman/files/expo-app/components/buttons/RegisterActionButton.tsx
- Deve, se as informações coicidirem com as necessidade da aplicação, criar um novo usuário no banco de dados. 
- Verificar se o e-mail já existe no banco: 
    - erro: já existe
        - Retornar um pop-up básico informando  a existencia do uma conta com esse endereço
        - sucess: 
                - Ajusta o pop-up atual para seguir o padrão de de ForgotPasswordModal -> /home/aluno/Postman/files/expo-app/components/popups/ForgotPasswordModal.tsx

## Revisão: inconsistências, lacunas e soluções propostas

Durante a auditoria do código e da spec foram identificadas inconsistências, lacunas e riscos. Abaixo estão as soluções propostas e trechos de código concisos para orientar a implementação.

### Problemas principais detectados
- `firebaseConfig.js` inicializa o app e atualmente exporta `auth`, porém recomenda-se também exportar `app` e `db` (Firestore) para facilitar integrações e testes.
- Fluxos de autenticação em `CredentialsPage.tsx` e `UserRegistrationPage.tsx` estão mockados (console/alert) — não usam `firebase/auth`.
- `UserSelection` utiliza `randomuser.me` em vez de dados do usuário autenticado.
- Botões (`EnterButton`, `RegisterActionButton`) não suportam `loading` e feedback durante requisições.
- `ExitButton` não executa `signOut(auth)`; apenas navega para trás.
- Mensagens de recuperação de senha e erros não seguem padrão seguro (não detalhar se conta existe).

### Recomendações de alto nível
- Exportar `auth` em `firebaseConfig.js` e usar os métodos oficiais do SDK: `signInWithEmailAndPassword`, `createUserWithEmailAndPassword`, `sendPasswordResetEmail`, `signOut`, `updateProfile`.
- Mover credenciais sensíveis para variáveis de ambiente (usar `expo-constants` ou `.env`) e não commitar segredos.
- Substituir `randomuser.me` por dados do usuário obtidos via `auth.currentUser` ou `Firestore` (coleção `users`).
- Padronizar mensagens: em operações que possam revelar existência de conta, sempre retornar mensagens genéricas (ex.: "Se o e-mail existir... você receberá um link").
- Adicionar estados `loading` nos botões e desabilitar inputs durante requisições.
- Mapear e tratar códigos de erro do Firebase para UX adequada (ex.: `auth/too-many-requests`, `auth/email-already-in-use`).

### Trechos de código sugeridos (concisos)

-- `firebaseConfig.js` — exemplo atual / recomendado (exporta `auth`, opcionalmente `app` e `db`):

```js
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore"; // opcional

const firebaseConfig = { /* ... */ };

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app); // export opcional para Firestore
export default app;
```

- `CredentialsPage.tsx` — login com Firebase (exemplo conciso):

```ts
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../../firebaseConfig';

const handleSubmit = async () => {
    setLoading(true);
    try {
        const cred = await signInWithEmailAndPassword(auth, sanitizedEmail, password);
        // reset attempts, persist sessão, navegar
        router.push('/HomePage');
    } catch (e: any) {
        // mapear e.code para mensagens genéricas
        setGeneralError('E-mail ou senha inválidos');
        await handleFailedAttempt();
    } finally {
        setLoading(false);
    }
};
```

- `ForgotPasswordModal.tsx` — envio de reset (conciso):

```ts
import { sendPasswordResetEmail } from 'firebase/auth';
import { auth } from '../../firebaseConfig';

const handleSubmit = async () => {
    setLoading(true);
    try {
        await sendPasswordResetEmail(auth, sanitizedEmail);
        setSuccess(true);
    } catch (e) {
        setError('Erro ao enviar o e-mail. Tente novamente mais tarde.');
    } finally {
        setLoading(false);
    }
};
```

- `UserRegistrationPage.tsx` — criação de usuário (conciso):

```ts
import { createUserWithEmailAndPassword, updateProfile } from 'firebase/auth';
import { auth } from '../../firebaseConfig';

const handleRegister = async () => {
    setLoading(true);
    try {
        const cred = await createUserWithEmailAndPassword(auth, email.trim(), password);
        await updateProfile(cred.user, { displayName: nome });
        // opcional: criar documento no Firestore em `users/{uid}`
        router.push('/HomePage');
    } catch (e: any) {
        if (e.code === 'auth/email-already-in-use') setEmailError('E-mail já cadastrado');
        else setGeneralError('Erro ao criar conta');
    } finally { setLoading(false); }
};
```

- `ExitButton.tsx` — logout (conciso):

```ts
import { signOut } from 'firebase/auth';
import { auth } from '../../firebaseConfig';

const handleExit = async () => {
    await signOut(auth);
    router.replace('/CredentialsPage');
};
```

- `UserSelection` — usar usuário autenticado (conciso):

```ts
import { auth } from '../../firebaseConfig';
const user = auth.currentUser;
// se precisar de mais dados: buscar `users/{user.uid}` no Firestore
```

- `EnterButton` / `RegisterActionButton` — adicionar prop `loading` e mostrar `ActivityIndicator` quando true.

### Observações finais e próximos passos
- Implementar as integrações acima em ordem de prioridade: exportar `auth`, login real, recuperação de senha, registro, logout e substituição do `randomuser.me`.
- Revisar regras de segurança do Firestore e adicionar testes automatizados para fluxos críticos (login/registro/recuperação).

Se desejar, posso aplicar os patches sugeridos nos arquivos agora (implementando `auth` export e as mudanças nas páginas), ou gerar PRs com as mudanças. Indique se quer que eu execute as alterações no código.
