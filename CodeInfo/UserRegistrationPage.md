# UserRegistrationPage

Descrição:
- Tela para criar uma nova conta de usuário no aplicativo.

O que faz:
- Recebe dados do usuário (nome, e-mail, senha e outros campos necessários).
- Valida campos localmente antes de enviar.
- Envia os dados para criar a conta (via Firebase ou API).

Principais funções e o que fazem:
- `validateFields()`: valida nome, e-mail, senha e confirma senha; retorna mensagens de erro.
- `checkPasswordStrength()`: verifica força da senha e sugere melhorias.
- `handleRegister()`: envia os dados para o serviço de cadastro (ex.: `createUserWithEmailAndPassword`) e trata respostas/erros.

Hooks e estados usados:
- `useState` para controlar `name`, `email`, `password`, `confirmPassword`, `error` e `loading`.
- `useEffect` para limpar mensagens e reagir a mudanças nos campos.

Componentes usados e papel:
- `UserInput`: campos de entrada reutilizáveis para cada dado do usuário.
- `RegisterActionButton`: botão que dispara `handleRegister()`.
- `HelperText`: mostra feedback de validação e erros de servidor.

Integrações comuns:
- Chamadas ao Firebase (`createUserWithEmailAndPassword`) ou API própria.
- Possível envio de dados adicionais para perfil (nome, avatar) após criar a conta.

Observações:
- Tratar erros específicos (e.g., e-mail já em uso) e apresentar mensagens claras.

Exemplos de código:

Exemplo de `handleRegister()` usando Firebase:

```ts
import { createUserWithEmailAndPassword, updateProfile } from 'firebase/auth';
import { auth } from '../firebaseConfig';

async function handleRegister(name, email, password, setLoading, setError) {
	setLoading(true);
	try {
		const userCred = await createUserWithEmailAndPassword(auth, email, password);
		await updateProfile(userCred.user, { displayName: name });
		// usuário criado e perfil atualizado
	} catch (err: any) {
		if (err.code === 'auth/email-already-in-use') {
			setError('E-mail já cadastrado.');
		} else {
			setError('Erro ao cadastrar. Tente novamente.');
		}
	} finally {
		setLoading(false);
	}
}
```

Exemplo simples de validação de senhas:

```ts
function validatePasswords(password, confirmPassword) {
	if (password.length < 6) return 'Senha deve ter ao menos 6 caracteres.';
	if (password !== confirmPassword) return 'As senhas não coincidem.';
	return null;
}
```

Trechos reais do arquivo `app/UserRegistrationPage.tsx` (trechos selecionados):

1) Função de tratamento do registro (`handleRegister`):

```ts
const handleRegister = () => {
	// resetar erros antes de validar
	setEmailError(null);
	setConfirmEmailError(null);
	setPasswordError(null);

	// validações locais
	const emailValidationError = validateEmail(email);
	const passwordValidationError = validatePassword(password);
	let hasError = false;

	if (emailValidationError) {
		setEmailError(emailValidationError); // exibe erro de e-mail
		hasError = true;
	}

	// verifica se e-mail e confirmação coincidem
	if (email.trim().toLowerCase() !== confirmEmail.trim().toLowerCase()) {
		setConfirmEmailError("Os e-mails não coincidem. Verifique a digitação.");
		hasError = true;
	}

	if (passwordValidationError) {
		setPasswordError(passwordValidationError); // exibe erro de senha
		hasError = true;
	}

	if (!hasError) {
		// só prossegue se não houver erros locais
		setLoading(true);
		(async () => {
			try {
				// cria usuário no Firebase e atualiza displayName com parte do e-mail
				const cred = await createUserWithEmailAndPassword(auth, email.trim().toLowerCase(), password);
				await updateProfile(cred.user, { displayName: email.split('@')[0] });
				router.push('/HomePage');
			} catch (e: any) {
				// mapeia erro conhecido e exibe mensagem adequada
				if (e.code === 'auth/email-already-in-use') setEmailError('E-mail já cadastrado');
				else setPasswordError('Erro ao criar conta');
			} finally {
				setLoading(false);
			}
		})();
	}
};
```

2) Trecho de inputs (como aparecem no JSX):

```tsx
<TextInput
	mode="outlined"
	label="Endereço de e-mail"
	placeholder="Ex: email@exemplo.com"
	value={email}
	onChangeText={(text) => { setEmail(text.replace(/\s/g, "")); setEmailError(null); }}
	keyboardType="email-address"
	autoCapitalize="none"
	autoCorrect={false}
	error={!!emailError} // mostra borda/ajuste visual quando há erro
	style={styles.input}
	outlineStyle={styles.inputOutline}
	textColor="#000"
	activeOutlineColor="#6200ee"
	/* remove espaços ao digitar e limpa erro associado automaticamente */
/>
```
