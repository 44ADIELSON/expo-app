# Melhorar Input de <UserInput /> em <CredentialsPage> e formatar <EnterButton> em <CredentialsPage>

<UserInput/>: 
/home/aluno/Postman/files/expo-app/components/inputs/UserInput.tsx

<CredentialsPage>:
/home/aluno/Postman/files/expo-app/app/CredentialsPage.tsx

<EnterButton>:
/home/aluno/Postman/files/expo-app/components/buttons/EnterButton.tsx

# Objetivo
- Adequar os inputs, padronizar o tratamento da entrada de dados por caixas de textos e modificar <EnterButton> para impedir o disparo do enter para os criterios definidos. 

- Complexidade: Critérios mais flexíveis para o usuário. Ele não precisa digitar os requisitos de uma senha forte novamente, apenas a senha correta que ele já cadastrou.

- Validação: Deve ser tolerante a erros comuns, como espaços em branco acidentais antes ou depois do e-mail.

- Segurança: Proteção contra ataques (ex: bloqueio temporário após várias tentativas incorretas)

**Resolução / Decisões tomadas**

- Usar 254 caracteres como limite máximo para o endereço de e-mail (conforme RFC). Não usar 320.
- Sanitização para e-mail: `trim()` + `toLowerCase()` + normalização `NFC`. Guardar o valor original apenas quando necessário para exibição.
- Senha: NÃO aplicar `trim()` por padrão (p.ex. a senha pode começar/terminar em espaço por intenção). Se optar por tolerância, documentar e oferecer opção explícita.
- Bloqueio após tentativas: 5 tentativas inválidas → bloqueio por 5 minutos (cooldown). Contador persistente no cliente via `AsyncStorage` e lógica de bloqueio também no servidor (obrigatório).
- `EnterButton` deve ficar desabilitado quando qualquer campo obrigatório estiver vazio ou inválido; `onSubmitEditing` dos `TextInput` só deve disparar submit se validação local passar.

**Use o <TextInput> de <UserRegistrationPage> como referencia, mas  lembre-se que uma entrada de login não precisa ter exatamente os mesmos criterios para e-mail/senha  

# 1. Ferramentas e Tecnologias
- **React Native** (Framework base)
- **TypeScript** (Tipagem estática)
- **React Native Paper** (Biblioteca de componentes de UI)

---

## 2. Critérios de Aceitação
    
## 2.1. Input de E-mail

- Formato e Validação Básica

- **Caracteres obrigatórios:** O e-mail deve conter obrigatoriamente um símbolo de arroba (`@`) e um ponto (`.`) após o arroba.
- **Domínio válido:** O domínio (ex: `.com`, `.com.br`, `.edu`) deve ter pelo menos dois caracteres após o último ponto.
- **Espaços em branco:** O input deve sanitizar e-mails que contenham espaços em branco.
- **Caracteres especiais:** Permitir apenas letras (`a-z`), números (`0-9`) e caracteres específicos como ponto (`.`), hífen (`-`) e underline (`_`). 
- Caracteres acentuados ou símbolos especiais devem ser bloqueados.
- **Sensibilidade a maiúsculas/minúsculas:** O sistema deve ser *case-insensitive* (ex: `Exemplo@email.com` e `exemplo@email.com` devem ser tratados como o mesmo endereço).

### Especificação técnica de validação de e-mail

- Limite máximo: 254 caracteres (endereços maiores são inválidos).
- Normalização: aplicar `String.prototype.normalize('NFC')` e `trim()` antes da validação; usar `toLowerCase()` apenas para comparação/lookup, não para armazenar a senha.
- Regex recomendada (suficiente para UX sem engessar IDN complexos):

```
/^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/
```

- Permitir `+` (plus-addressing) e pontos no local-part; bloquear caracteres Unicode/acentuados no local-part para manter compatibilidade conforme critério do produto (documentar se for necessário suportar IDN/punycode).

### Validação de senha (login)

- Não aplicar `trim()` por padrão; tratar espaços como parte válida da senha.
- `secureTextEntry` habilitado e `textContentType="password"` configurado.
- No fluxo de login, validar apenas presença (não emular os critérios de criação de senha). Aceitar a senha correta mesmo que não satisfaça os requisitos de criação.

- **Acessibilidade e Usabilidade de Teclado:** 
    - **Usar a ferramenta do "react-native" KeyboardAvoidingView**
    - **Usar TouchableWithoutFeedback**
    - **Ao clicar no input o teclado deve empurrar a tela para o centro**

---

### 3. Regras de Prevenção de Erros e UX

- **Campos vazios:** O campo de e-mail não pode ficar em branco ao tentar submeter.
- **Tamanho máximo:** Definir um limite de caracteres entre 254 e 320 caracteres (conforme padrão internacional RFC 5322).
- **Feedback visual (React Native Paper):** O componente `TextInput` deve alternar para o estado de erro (`error={true}`) alterando sua cor para vermelho/cor de alerta caso existam inconsistências.

---

#### 4. Criterios para impedir o disparo do enter <EnterButton>

- **Não aceitar o campo senha em branco**
- **Não aceitar o campo e-mail em branco**

- Somar uma quantidade de tentativas de disparos com erros de e-mail e senha armazenando o valor em uma variavel ou estado até o valor 5. O Input de e-mail e senha devem deixar de receber textos ou alguma ferramenta nativa do react-native/expo/ ou metodo que torne possível que o usuario seja impedido de continuar tentando. 

### Política de tentativas e bloqueio (detalhada)

- Contador local: incrementar em cada tentativa de login falhada (e-mail inválido ou senha incorreta).
- Limite: 5 tentativas inválidas consecutivas.
- Ação: ao atingir 5 tentativas, desabilitar os campos e o botão por 5 minutos; mostrar contador regressivo (UI) e mensagem clara.
- Persistência: salvar timestamp e contador em `AsyncStorage` para manter o bloqueio após reinício do app.
- Server-side: obrigar implementação de rate-limiting / lockout no back-end. Bloqueio apenas no cliente é insuficiente contra ataques.
- Reset do contador: após um login bem-sucedido ou após expirar o cooldown.

### UX e mensagens

- Mensagens de erro genéricas para não vazar informação sensível: ex.: `Usuário ou senha incorretos.`
- Indicar número de tentativas restantes: `Você tem 2 tentativas restantes antes do bloqueio.`
- Ao bloquear: `Muitas tentativas. Tente novamente em 5 minutos ou recupere sua senha.`

### Acessibilidade

- Garantir `accessibilityLabel` e anotações ARIA equivalentes para mensagens de erro.
- Anunciar bloqueio e mensagens de erro via leitor de tela.

### Segurança e Observabilidade

- Não confiar somente no client-side; registrar e limitar tentativas no servidor por IP/conta.
- Registrar eventos (falhas de login, bloqueios) para monitoramento.

### Testes mínimos a incluir na spec

- Validação de e-mail: aceitar `user.name+tag@example.com`; rejeitar `user@@example.com` e entradas com acentuação quando proibidas.
- Tamanho: rejeitar e-mails com >254 chars.
- Sanitização: `  ExEmplo@Email.COM  ` → comparado como `exemplo@email.com`.
- Enter/Submit: Enter não submete se campos inválidos; submete quando válidos.
- Bloqueio: após 5 falhas, campos desabilitados, cooldown 5 minutos e persistência após reinício.

### Configurabilidade

- Valores (tentativas, duração do bloqueio, regex) devem ser constantes configuráveis no código para facilitar ajustes sem alterar lógica.

---

Seções adicionadas: especificação de regex, regra de 254 chars, normalização, política de bloqueio com persistência e recomendações de servidor, mensagens UX, acessibilidade e casos de teste mínimos.
