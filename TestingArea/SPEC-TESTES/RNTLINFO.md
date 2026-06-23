# React Native Testing Library — Guia Prático

## Objetivo
Fornecer utilitários para renderizar componentes React Native em testes e interagir com eles de forma acessível, focando no comportamento do usuário em vez da implementação interna.

## Quando usar
- Testes de componentes (UI) e interação.
- Verificar callbacks, navegação, e efeitos visuais baseados em props/estado.

## Requisitos
- `@testing-library/react-native`
- Matchers opcionais: `@testing-library/jest-native`
- Jest já configurado no projeto

## Instalação
```bash
npm install --save-dev @testing-library/react-native @testing-library/jest-native
```

## Configuração (exemplo `setupTests.js`)
```js
import '@testing-library/jest-native/extend-expect';
// mocks globais, timers, navigation mocks podem ser colocados aqui
```

Adicione o arquivo de setup no `jest.config.js`:
```js
module.exports = {
  preset: 'jest-expo',
  setupFilesAfterEnv: ['<rootDir>/setupTests.js']
};
```

## APIs principais
- `render(component)` -> retorna queries (`getByText`, `queryByTestId`, etc.)
- `fireEvent` -> simular taps, mudanças de texto
- `waitFor` / `findBy` -> para interações assíncronas

## Exemplo de teste
```ts
import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import NewUserButton from '../components/buttons/NewUserButton';

test('chama onPress ao ser pressionado', () => {
  const onPress = jest.fn();
  const { getByText } = render(<NewUserButton onPress={onPress}>Criar</NewUserButton>);
  fireEvent.press(getByText('Criar'));
  expect(onPress).toHaveBeenCalled();
});
```

## Boas práticas
- Use `findBy`/`waitFor` quando componentes disparem efeitos assíncronos.
- Prefira queries que imitam o usuário (`getByRole`, `getByText`) em vez de `testID` quando possível.
- Limpe mocks entre testes (`jest.clearAllMocks()`).

## Links úteis
- https://testing-library.com/docs/react-native-testing-library/intro
