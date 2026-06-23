# CredentialsPage

Descrição:
- Tela de login onde o usuário insere e-mail/usuário e senha para entrar no app.

O que faz:
- Mostra campos de entrada para e-mail/usuário e senha.
- Valida formato básico antes de enviar.
- Chama a ação de login quando o usuário pressiona o botão de entrar.

Principais funções e o que fazem:
- `handleLogin()`: coleta os valores, valida (ex.: não vazio, formato do e-mail) e chama o serviço de autenticação (Firebase ou API).
- `validateInputs()`: valida campos localmente e retorna mensagens de erro.
- `onForgotPassword()`: abre o `ForgotPasswordModal`.
- `onNewUser()`: navega para a `UserRegistrationPage`.

Hooks e estados usados:
- `useState` para controlar `email`, `password`, `error` e `loading`.
- `useEffect` para efeitos colaterais (ex.: limpar erros quando o usuário altera campos).

Componentes usados e papel:
- `UserInput`: campo reutilizável para texto; usado para `email` e `password`.
- `EnterButton`: botão que dispara `handleLogin()`.
- `ForgotPasswordButton`: botão que chama `onForgotPassword()`.
- `NewUserButton`: link/ação que chama `onNewUser()`.
- `HelperText`: exibe mensagens de validação/erro.

Observações:
- A chamada real de login (ex.: `signInWithEmailAndPassword`) deve ficar em um serviço separado ou hook.
- Mensagens de erro exibidas devem ser genéricas e amigáveis ao usuário.

Exemplos de código:

Exemplo de `handleLogin()` usando Firebase:

```ts
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../firebaseConfig';

async function handleLogin(email: string, password: string, setLoading, setError) {
	setLoading(true);
	try {
		const cred = await signInWithEmailAndPassword(auth, email, password);
		// cred.user contém dados do usuário
	} catch (err) {
		setError('Não foi possível entrar. Verifique suas credenciais.');
	} finally {
		setLoading(false);
	}
}
```

Exemplo de `validateInputs()` simples:

```ts
function validateInputs(email: string, password: string) {
	if (!email || !password) return 'E-mail e senha são obrigatórios.';
	const emailRegex = /^[^@\s]+@[^@\s]+\.[^@\s]+$/;

Trechos reais do arquivo `app/CredentialsPage.tsx` (trechos selecionados):

1) Função de submissão (autenticação e bloqueio de tentativas):

```ts
const handleSubmit = async () => {
	// limpar erro geral antes de começar
	setGeneralError("");

	// se o usuário está bloqueado por muitas tentativas, aborta
	if (lockedUntil && lockedUntil > Date.now()) return;

	// normaliza e valida o e-mail
	const sanitizedEmail = sanitizeEmail(email);
	const emailErr = validateEmail(sanitizedEmail.toLowerCase());
	setEmailError(emailErr);

	// se tiver erro no e-mail ou estiver vazio, registra tentativa falha e sai
	if (!sanitizedEmail || emailErr) {
		await handleFailedAttempt();
		return;
	}

	// exige senha preenchida
	if (!password) {
		await handleFailedAttempt();
		return;
	}

	// inicia estado de carregamento e tenta autenticar via Firebase
	setLoading(true);
	try {
		await signInWithEmailAndPassword(auth, sanitizedEmail.toLowerCase(), password);
		// ao autenticar com sucesso, limpa armazenamento de tentativas e navega
		await AsyncStorage.removeItem(STORAGE_KEYS.ATTEMPTS);
		await AsyncStorage.removeItem(STORAGE_KEYS.LOCK_UNTIL);
		setAttempts(0);
		setLockedUntil(null);
		router.push("/HomePage");
	} catch (e: any) {
		// não expor detalhes do erro para o usuário, apenas mensagem genérica
		setGeneralError('E-mail ou senha inválidos');
		await handleFailedAttempt();
	} finally {
		setLoading(false);
	}
};
```

2) Uso dos inputs e botões (como aparecem no JSX):

```tsx
<UserInput
	label="Endereço de e-mail"
	placeholder="Ex: email@exemplo.com"
	value={email}
	onChangeText={(t) => setEmail(t)}
	keyboardType="email-address"
	error={!!emailError}
	onSubmitEditing={handleSubmit} // quando o usuário pressiona 'enter' no teclado
	returnKeyType="next"
	disabled={isLocked} // desabilita enquanto bloqueado por tentativas
/>

{/* Botão principal que chama handleSubmit; mostra loading quando em progresso */}
<EnterButton onPress={handleSubmit} disabled={isLocked || !email || !password || !!emailError} loading={loading} />

{/* Abre modal de recuperação de senha */}
<ForgotPasswordModal visible={isForgotVisible} onDismiss={() => setForgotVisible(false)} />
```
	if (!emailRegex.test(email)) return 'Formato de e-mail inválido.';
	return null;
}
```
