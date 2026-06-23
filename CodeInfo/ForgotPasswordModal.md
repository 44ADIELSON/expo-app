# ForgotPasswordModal

Descrição:
- Modal (caixa flutuante) usado para recuperar a senha do usuário.

O que faz:
- Recebe um e-mail ou nome de usuário e envia um link de recuperação.
- Valida formato do e-mail antes de enviar.
- Mostra estados: carregando, erro e sucesso.

Props principais:
- `visible` (boolean): controla se o modal está visível.
- `onDismiss` (função): callback para fechar o modal.

Funções internas importantes e o que fazem:
- `sanitize(text)`: remove espaços e normaliza o e-mail (ex.: remove espaços e converte para minúsculas).
- `validateFormat(value)`: valida basicamente se o texto segue um formato de e-mail aceitável; retorna mensagem de erro ou null.
- `handleSubmit()`: função assíncrona que chama `sendPasswordResetEmail(auth, email)` (Firebase) para solicitar o envio do link; trata `loading`, `success` e `error`.
- `handleClose()`: fecha o modal chamando `onDismiss()`.

Estados principais:
- `email`: valor do campo de entrada.
- `error`: string com mensagem de erro quando ocorrer validação ou falha.
- `loading`: boolean enquanto a solicitação está em progresso.
- `success`: boolean que indica que a solicitação foi enviada com sucesso.

Integrações e dependências:
- Usa `sendPasswordResetEmail` do SDK do Firebase (`firebase/auth`).
- Usa componentes do `react-native-paper` (`Modal`, `TextInput`, `HelperText`).

Observações:
- Mensagens de erro são propositalmente genéricas para não confirmar se uma conta existe.
- `inputRef` é usado para focar automaticamente o campo quando o modal abre.

Exemplos de código:

Trecho de `handleSubmit()` (simplificado):

```ts
import { sendPasswordResetEmail } from 'firebase/auth';
import { auth } from '../../firebaseConfig';

async function handleSubmit(email, setLoading, setError, setSuccess) {
	setError(null);
	setLoading(true);
	try {
		await sendPasswordResetEmail(auth, email);
		setSuccess(true);
	} catch (err) {
		setError('Erro ao enviar o e-mail. Tente novamente mais tarde.');
	} finally {
		setLoading(false);
	}
}
```

Exemplo de `sanitize()`:

```ts
function sanitize(text: string) {
	return text.replace(/\s/g, '').toLowerCase();
}
```

Trechos reais do arquivo `components/popups/ForgotPasswordModal.tsx` (trechos selecionados):

1) `useEffect` que zera estados e foca o input quando o modal abre:

```ts
useEffect(() => {
	// quando o modal abre, foca o input e reseta estados internos
	if (visible) {
		setTimeout(() => inputRef.current?.focus?.(), 120); // pequeno delay para garantir render
		setError(null);
		setLoading(false);
		setSuccess(false);
	} else {
		// ao fechar, limpa o campo e estados
		setEmail("");
		setError(null);
		setLoading(false);
		setSuccess(false);
	}
}, [visible]);
```

2) Trecho do JSX mostrando o `TextInput` e botão de envio:

```tsx
<TextInput
	ref={inputRef}
	mode="outlined"
	label="E-mail ou nome de usuário"
	placeholder="Ex: email@exemplo.com"
	value={email}
	onChangeText={(t) => { setEmail(sanitize(t)); setError(null); }} // sanitiza e limpa erro ao digitar
	keyboardType="email-address"
	autoCapitalize="none"
	autoCorrect={false}
	error={!!error}
	style={styles.input}
	outlineStyle={styles.inputOutline}
	textColor="#000"
	activeOutlineColor="#6200ee"
/>

<Pressable onPress={handleSubmit} disabled={loading}>
	{/* mostra indicador de carregamento enquanto `handleSubmit` está em progresso */}
	{loading ? <ActivityIndicator color="#f3f3ff" /> : <Text>Enviar Link de Recuperação</Text>}
</Pressable>
```
