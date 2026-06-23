# Jest — Informações e Guia Rápido

## Objetivo
Fornecer um framework de testes unitários e de integração para JavaScript/TypeScript. No contexto React Native/Expo, o Jest é usado para executar testes de componentes, utilitários e lógica de negócio com mocks e snapshots.

## Quando usar
- Testes unitários de funções e utilitários.
- Testes de componentes isolados (com renderizadores como React Test Renderer ou React Native Testing Library).
- Snapshots para UI estática.

## Requisitos
- Node.js (versão compatível com seu projeto)
- Para Expo: recomenda-se `jest-expo` para compatibilidade com presets da Expo.

## Pacotes recomendados
- `jest`
- `jest-expo` (quando usar Expo)
- `babel-jest` (transpilar via Babel)
- `@types/jest` (TypeScript)
- `react-test-renderer` (opcional)

## Instalação (exemplo)
```bash
npm install --save-dev jest jest-expo babel-jest @types/jest react-test-renderer
```

## Configuração mínima (exemplo `package.json`)
```json
"jest": {
  "preset": "jest-expo",
  "testEnvironment": "node",
  "transformIgnorePatterns": ["node_modules/(?!(react-native|@react-native|expo|react-navigation)/)" ]
}
```

Ou criar `jest.config.js`:
```js
module.exports = {
  preset: 'jest-expo',
  testEnvironment: 'node'
};
```

## Exemplo básico de teste (com React Native Testing Library)
```ts
import React from 'react';
import { render } from '@testing-library/react-native';
import WelcomePage from '../app/WelcomePage';

test('WelcomePage rendeiza título', () => {
  const { getByText } = render(<WelcomePage />);
  expect(getByText('Bem-vindo')).toBeTruthy();
});
```

## Comandos úteis
- `npm test` — executa o Jest
- `npm test -- --watch` — modo watch

## Boas práticas
- Mantenha testes pequenos e determinísticos.
- Use mocks para APIs externas e timers (`jest.useFakeTimers()` quando necessário).
- Evite snapshots grandes — prefira asserções direcionadas.

## Links úteis
- https://jestjs.io/
