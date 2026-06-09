# 1. Descrição do Projeto

- Apresentação resumida do sistema desenvolvido:

- Objetivo do projeto:

  Usuário deve:

       - Ser capaz de ver a previsão do tempo para os próximos 7 dias;
       - Ser notificado sobre a previsão do dia seguinte em uma notificação do sistema;
       - Ser notificado pelo sistema quando a manhã tiver visibilidade de min 10km e a cobertura de nuvens entre 30% e 70% para considera-la uma manhã de um nascer do sol  visivel;
       - Ser notificado pelo sistema quando o entardecer tiver visibilidade de min 10km e a cobertura de nuvens entre 30% e 70% para considera-la uma tarde para considera-la um pôr do sol  visivel;
       - Ser notificado pelo sistema quando
       - Ver a previsão dos próximos 7 dias e dos últimos 7 dias passados  sobre a visibilidade para o nascer do so;
       - Ver a previsão dos próximos 7 dias e dos últimos 7 dias passados  sobre a visibilidade para o pôr do sol.
       - Ao pressionar um dia especifico dentro do raio dos 7 dias antes e 7 dias depois, deve poder ver a estimativa da hora do nascer do sol para os casos dos 7 dias futuros e quando foi o horário do evento nos 7 dias passados.
       - Ao pressionar um dia especifico dentro do raio dos 7 dias antes e 7 dias depois,deve poder ver a estimativa da hora do pôr do sol para os casos dos 7 dias futuros e quando foi o horário do evento nos 7 dias passados.
       - Quanto tempo faltam para o próximo pôr/nascer do sol e ser notificado;
       - Ter um tela para definir quanto tempo antes do evente quer ser notificado;

  - Público-alvo:

  - Entusiastas da fotografia;
  - Entusiastas da natureza;

# 2. Requisitos Funcionais

Requisitos funcionais definidos para o projeto.

- **RF01:** O sistema deve permitir ao usuário visualizar a previsão do tempo para os próximos 7 dias, incluindo dados de visibilidade, cobertura de nuvens e horários estimados de nascer e pôr do sol.
- **RF02:** O sistema deve enviar uma notificação diária com a previsão do dia seguinte.
- **RF03:** O sistema deve notificar o usuário quando, no período da manhã, a visibilidade for maior ou igual a 10 km e a cobertura de nuvens estiver entre 30% e 70%, indicando possibilidade de nascer do sol visível.
- **RF04:** O sistema deve notificar o usuário quando, no período do entardecer, a visibilidade for maior ou igual a 10 km e a cobertura de nuvens estiver entre 30% e 70%, indicando possibilidade de pôr do sol visível.
- **RF05:** O sistema deve exibir o tempo restante para o próximo nascer ou pôr do sol em destaque na interface.
- **RF06:** O sistema deve permitir visualizar, para cada dia, a previsão dos próximos 7 dias e o histórico dos últimos 7 dias sobre a visibilidade do nascer do sol.
- **RF07:** O sistema deve permitir visualizar, para cada dia, a previsão dos próximos 7 dias e o histórico dos últimos 7 dias sobre a visibilidade do pôr do sol.
- **RF08:** Ao selecionar um dia no intervalo de -7 a +7 dias, o usuário deve ver a hora estimada do nascer do sol (para dias futuros) ou o horário registrado (para dias passados).
- **RF09:** Ao selecionar um dia no intervalo de -7 a +7 dias, o usuário deve ver a hora estimada do pôr do sol (para dias futuros) ou o horário registrado (para dias passados).
- **RF10:** O usuário deve poder configurar notificações específicas para o próximo evento (nascer/pôr do sol) e ativar/desativar alertas.
- **RF11:** O sistema deve disponibilizar uma tela de configurações onde o usuário define quanto tempo antes do evento deseja ser notificado (por exemplo: 5, 10, 30 minutos).

# 3. Requisitos Não Funcionais

Requisitos não funcionais considerados no desenvolvimento

- **RNF01:** O sistema deve consulta a API OpenMeteo e trazer as variáveis referentes em tempo <= 5s e não depender de outras chamadas.
- **RNF02:** A tela de Home do usuario deve carregar imediatamente ao entrar, mas a renderização com as informações devem seguir o mesmo criterio de tempo das consultas de API.
- **RNF03:** O sistema deve notificar o usuário em todos os casos, solicitados e notificações padrões, em 90% dos casos.
- **RNF04:** O sistema deve exibir informações com a mesma porcentagem de confiabilidade dos icones que identificam as mudanças climáticas
  const mapCodeToIcon = (code: number) => {
  if (code === 0) return 'weather-sunny';
  if (code === 1 || code === 2) return 'weather-partly-cloudy';
  if (code === 3) return 'weather-cloudy';
  if (code >= 45 && code <= 48) return 'weather-fog';
  if (code >= 51 && code <= 57) return 'weather-rainy';
  if (code >= 61 && code <= 67) return 'weather-rainy';
  if (code >= 71 && code <= 77) return 'weather-snowy';
  if (code >= 80 && code <= 82) return 'weather-pouring';
  if (code >= 95 && code <= 99) return 'weather-lightning-rainy';
  return 'weather-cloudy';
  };
  - **RNF05:** O sistema deve corresponder em 80% das as escalas, que são baseadas no Samsung Galaxy A03 Core (tela de 6,5 polegadas)
  - **RNF06:** As entradas de texto do projeto devem exibir o erro com <HelperText> exatamente ao ocorrer 

# 4. Tecnologias Utilizadas

Descrição das tecnologias adotadas no projeto, incluindo:

- Linguagens de programação;
- Frameworks;
- Banco de dados;
- Ferramentas e bibliotecas relevantes

- **Linguagens:** TypeScript (configurado com `strict` via `tsconfig.json`) e JavaScript (ESNext para scripts e bibliotecas).
- **Frameworks / Runtime:** Expo (SDK ~54) e React Native (0.81.5) com React 19 — aplicação estruturada como aplicativo móvel cross-platform.
- **UI / Componentes:** `react-native-paper` (componentes UI e `HelperText`), `@expo/vector-icons`, `react-native-linear-gradient`.
- **Navegação / Roteamento:** `expo-router` (navegação baseada em arquivos/rotas do Expo).
- **Localização / Device:** `expo-location`, `expo-device` (coleta de localização e informações do dispositivo).
- **Animação / Gestos:** `react-native-reanimated`, `react-native-gesture-handler` (animações e gestos de alto desempenho).
- **Compatibilidade / utilitários:** `react-native-safe-area-context`, `react-native-screens`, `react-native-url-polyfill`.
- **APIs externas:** consumo de API meteorológica (documentado como `OpenMeteo` no projeto) para previsões, visibilidade e códigos climáticos.
- **Persistência / cache (observado / recomendado):** o projeto contém lógica de cache/offline descrita nos RNFs; embora não haja dependência explícita de armazenamento no `package.json`, recomenda-se o uso de armazenamento local apropriado (ex.: `AsyncStorage`/`SecureStore`) conforme necessidade de segurança.

# 6. Avaliação dos Requisitos (Tabela)

Exemplo:

Requisito                   Status                                                          Observações

- **RF01:**                 Atendido Implementado parcialmente
- **RF02:**                 Atendido Implementado com sucesso
- **RF03:**                 Não implementado                                                Limitação de tempo para desenvolvimento

* Todos os requisitos inicialmente planejados devem ser apresentados,
  independentemente de terem sido implementados ou não - A tabela deve incluir uma coluna de observações para justificar a implementação ou não de cada requisito, especialmente para os que não foram implementados.
