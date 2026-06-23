# Detox — Testes E2E para React Native

## Objetivo
Executar testes end-to-end (E2E) automatizados em dispositivos/emuladores reais para validar fluxos completos da aplicação (login, navegação, interações complexas).

## Quando usar
- Verificar fluxos críticos que envolvem múltiplas telas e integração com o sistema.
- Testar comportamento em emuladores/real devices (performance, layout, navegação).

## Requisitos (resumido)
- Node.js
- Java JDK + Android SDK (para Android)
- Xcode (para iOS; não aplicável em Linux sem Mac)
- Emulador Android configurado ou dispositivo conectado
- `detox-cli` e `detox`

## Observação sobre Expo
Detox funciona melhor em apps React Native "bare". Para projetos Expo gerenciados:
- Use `expo-dev-client` + EAS Build para gerar um build específico com suporte ao Detox.
- Alternativa: eject (expo prebuild) para usar Detox de modo padrão.

## Instalação básica
```bash
npm install --save-dev detox detox-cli
# Instalar globalmente a CLI se preferir
npx detox -v
```

## Configuração (exemplo `package.json`)
```json
"detox": {
  "configurations": {
    "android.emu.debug": {
      "type": "android.emulator",
      "binaryPath": "android/app/build/outputs/apk/debug/app-debug.apk",
      "build": "cd android && ./gradlew assembleDebug assembleAndroidTest -DtestBuildType=debug && cd ..",
      "device": { "avdName": "Pixel_API_30" }
    }
  }
}
```

## Exemplo de teste Detox (Jest)
```js
describe('Fluxo de autenticação', () => {
  beforeAll(async () => {
    await device.launchApp();
  });

  it('faz login com sucesso', async () => {
    await element(by.id('emailInput')).typeText('user@example.com');
    await element(by.id('passwordInput')).typeText('senha123');
    await element(by.id('loginButton')).tap();
    await expect(element(by.text('Home'))).toBeVisible();
  });
});
```

## Comandos úteis
- `npx detox build -c android.emu.debug` — compilar app de teste
- `npx detox test -c android.emu.debug` — executar testes

## CI e dicas
- Configure um emulador headless no CI (Android). Use imagens do Android SDK compatíveis.
- Limpe estados entre testes (`device.reloadReactNative()` quando necessário).

## Links úteis
- https://wix.github.io/Detox/
