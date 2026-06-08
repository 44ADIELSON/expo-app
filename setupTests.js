import '@testing-library/jest-native/extend-expect';

// Use fake timers por padrão (ajuste se precisar de timers reais)
jest.useFakeTimers();

// Mocks comuns para React Native native modules
jest.mock('react-native-reanimated', () => require('react-native-reanimated/mock'));
jest.mock('react-native/Libraries/Animated/NativeAnimatedHelper');

// Mock global fetch para testes que usam network
global.fetch = global.fetch || jest.fn(() => Promise.resolve({ json: () => ({}) }));

// Limpa mocks automaticamente entre testes
afterEach(() => {
  jest.clearAllMocks();
});
