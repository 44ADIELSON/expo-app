# HomePage

Descrição:
- Tela principal do aplicativo após o usuário fazer login.

O que faz:
- Mostra informações do usuário e opções principais do app.
- Permite navegar para outras telas ou ações (explorar, sair, etc.).

Principais funções e o que fazem:
- `handleLogout()`: encerra sessão do usuário (chama `signOut` ou função equivalente) e navega para a tela de login.
- `handleExplore()`: navega para a área de exploração ou conteúdo relevante.
- `requestLocationPermissions()`: solicita permissão de localização e obtém coordenadas quando necessário.
- `loadUserData()`: busca dados do usuário e atualiza o estado da tela.

Hooks e estados usados:
- `useState` para `user`, `loading`, `location` e outros estados locais.
- `useEffect` para carregar dados ao montar a tela e reagir a mudanças.

Componentes usados e papel:
- `ExitButton`: botão que chama `handleLogout()`.
- `ExploreButton`: botão que chama `handleExplore()`.
- `NewDateComponent`: exibe datas ou horários importantes.
- `CustomDrawer`: menu lateral personalizado para navegação e opções.
- `LocationButton`: solicita permissão de localização e mostra status.

Integrações comuns:
- Permissões de localização (expo-location) e APIs de geocodificação (ex.: `reverseGeocodeAsync`).
- Serviços em tempo real ou polling para atualizar conteúdo.

Observações:
- Preparar a interface para falhas de permissão e mostrar estados apropriados.

Exemplos de código:


Trechos reais do arquivo `app/HomePage.tsx` (trechos selecionados):

1) `useEffect` que solicita permissão e busca endereço:

```ts
useEffect(() => {
	// busca coordenadas e endereço ao montar a tela
	async function fetchAddressData() {
		try {
			setLoading(true);

			// solicita permissão de localização ao usuário
			let { status } = await Location.requestForegroundPermissionsAsync();
			if (status !== "granted") {
				setErrorMsg("A permissão para acessar a localização foi negada.");
				return;
			}

			// obtém posição atual
			let currentLocation = await Location.getCurrentPositionAsync({});

			// salva coordenadas no estado para uso em outros componentes
			setCoords({
				latitude: currentLocation.coords.latitude,
				longitude: currentLocation.coords.longitude,
			});

			// converte coordenadas para endereço humano
			let addresses = await Location.reverseGeocodeAsync({
				latitude: currentLocation.coords.latitude,
				longitude: currentLocation.coords.longitude,
			});

			if (addresses && addresses.length > 0) {
				setAddress(`${addresses[0].subregion}, ${addresses[0].region},${addresses[0].country}`);
			} else {
				setAddress("Endereço não encontrado.");
			}
		} catch (error) {
			// grava erro para mostrar ao usuário e loga para depuração
			setErrorMsg("Erro ao buscar localização.");
			console.error(error);
		} finally {
			setLoading(false);
		}
	}

	fetchAddressData();
}, []);
```

2) Uso dos `CustomDrawer` no JSX (como são instanciados):

```tsx
<CustomDrawer
	bgImage={require("../assets/bg-card.png")}
	ImageWay={require("../assets/custom-drawer-sunrise.png")}
	textInformation="Nascer do Sol"
	latitude={coords?.latitude}
	longitude={coords?.longitude}
/>

<CustomDrawer
	BColor="#242440"
	ImageWay={require("../assets/custom-drawer-sunset.png")}
	textInformation="Pôr do Sol"
	latitude={coords?.latitude}
	longitude={coords?.longitude}
/>
```
Exemplo de `handleLogout()` com Firebase:

```ts
import { signOut } from 'firebase/auth';
import { auth } from '../firebaseConfig';

async function handleLogout(navigation, setLoading, setError) {
	setLoading(true);
	try {
		await signOut(auth);
		navigation.replace('Login');
	} catch (err) {
		setError('Não foi possível sair no momento.');
	} finally {
		setLoading(false);
	}
}
```

Exemplo de `requestLocationPermissions()` usando expo-location:

```ts
import * as Location from 'expo-location';

async function requestLocationPermissions(setLocation, setError) {
	const { status } = await Location.requestForegroundPermissionsAsync();
	if (status !== 'granted') {
		setError('Permissão de localização negada.');
		return;
	}
	const loc = await Location.getCurrentPositionAsync({});
	setLocation(loc.coords);
}
```
