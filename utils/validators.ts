export const validateEmail = (email: string): string | null => {
  if (!email || email.trim() === "") {
    return "O campo de e-mail não pode ficar em branco.";
  }

  // Remove espaços em branco indesejados (sanitização)
  const sanitizedEmail = email.trim();

  if (sanitizedEmail.length < 5 || sanitizedEmail.length > 320) {
    return "O e-mail deve ter entre 5 e 320 caracteres.";
  }

  // Regex para formato válido: letras/números/._- + @ + domínio + . + extensão(>=2 chars)
  const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  if (!emailRegex.test(sanitizedEmail)) {
    return "O e-mail deve conter um caractere '@' e um domínio válido (ex: .com).";
  }

  // Bloqueio de domínios descartáveis
  const domain = sanitizedEmail.split("@")[1].toLowerCase();
  const blockedDomains = ["mailinator.com", "tempmail.com", "10minutemail.com"];
  if (blockedDomains.includes(domain)) {
    return "Domínios de e-mail temporários não são permitidos para cadastro.";
  }

  // Mock de verificação de duplicidade (futura integração Firebase)
  const mockExistingEmails = ["teste@teste.com", "admin@domain.com"];
  if (mockExistingEmails.includes(sanitizedEmail.toLowerCase())) {
    return "Este e-mail já possui cadastro. Recupere sua senha aqui.";
  }

  return null;
};

export const validatePassword = (password: string): string | null => {
  if (!password) {
    return "O campo de senha não pode ficar em branco.";
  }

  if (password.length < 8 || password.length > 64) {
    return "A senha deve conter entre 8 e 64 caracteres.";
  }

  // Rejeição de senhas fracas ou sequenciais
  const weakPasswords = [
    "123456", "123456789", "1234", "qwerty", "asdfgh", 
    "zxcvbn", "password", "senha", "admin", "root"
  ];
  if (weakPasswords.includes(password.toLowerCase())) {
    return "A senha escolhida é muito fraca ou comum. Escolha uma combinação mais segura.";
  }

  // Rejeição de repetições (ex: 000000, 111111, aaaaaa)
  const allSameCharsRegex = /^(.)\1+$/;
  if (allSameCharsRegex.test(password)) {
    return "A senha não pode ser formada por caracteres repetidos.";
  }

  // Verificação de variedade de caracteres (Exige 3 de 4 grupos)
  let groupsMatched = 0;
  if (/[A-Z]/.test(password)) groupsMatched++;
  if (/[a-z]/.test(password)) groupsMatched++;
  if (/[0-9]/.test(password)) groupsMatched++;
  if (/[^A-Za-z0-9]/.test(password)) groupsMatched++; // Caracteres especiais

  if (groupsMatched < 3) {
    return "A senha deve conter pelo menos 3 dos seguintes: letras maiúsculas, minúsculas, números e caracteres especiais.";
  }

  return null;
};