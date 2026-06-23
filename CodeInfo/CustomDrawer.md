# CustomDrawer

Descrição:
- Componente que renderiza o menu lateral personalizado do app.

O que faz:
- Envolve a UI do drawer e fornece itens de navegação.
- Exibe informações do usuário (nome, e-mail, avatar) e atalhos.
- Gera eventos de navegação quando o usuário seleciona uma opção.

Props principais e o que fazem:
- `navigation`/`onNavigate`: objeto/callback para acionar a navegação.
- `user`: objeto com dados do usuário exibidos no topo do drawer.
- `items`: array de itens de menu (label, icon, route) para renderizar.

Funções internas típicas:
- `renderHeader()`: monta a seção do usuário com avatar e nome.
- `renderItem(item)`: retorna o elemento visual para cada item do menu.
- `handleNavigation(route)`: fecha o drawer e chama a navegação para a rota selecionada.
- `handleLogout()`: chamada que executa logout e redireciona para a tela de entrada.

Componentes usados e papel:
- `Drawer` (ou `Drawer.Content`): estrutura de menu padrão.
- Avatares, `Text` e botões para ações rápidas (sair, configurações).

Observações:
- A lógica de logout e de obtenção dos dados do usuário deve estar em serviços/hooks externos; o `CustomDrawer` apenas chama essas funções.
- Deve ser acessível e suportar diferentes tamanhos de tela.

Exemplos de código:

Exemplo de `renderItem` e `handleNavigation` (esqueleto):

```tsx
function renderItem(item, navigation) {
	return (
		<Pressable onPress={() => handleNavigation(item.route, navigation)}>
			<Text>{item.label}</Text>
		</Pressable>
	);
}

function handleNavigation(route, navigation) {
	navigation.closeDrawer?.();
	navigation.navigate(route);
}
```

Exemplo de `renderHeader()` mostrando dados do usuário:

```tsx
function renderHeader(user) {
	return (
		<View>
			<Image source={{ uri: user.avatar }} style={{ width: 48, height: 48 }} />
			<Text>{user.displayName}</Text>
			<Text>{user.email}</Text>
		</View>
	);
}
```

Trechos reais do arquivo `components/input-drawer/CustomDrawer.tsx` (trechos selecionados):

1) `useEffect` que busca horários de nascer/por do sol via API:

```ts
useEffect(() => {
	// busca dados de nascer/pôr do sol quando coordenadas mudam
	const fetchTimes = async () => {
		if (latitude == null || longitude == null) return; // precisa de coordenadas
		try {
			setLoadingTime(true);
			const url = new URL('/v1/forecast', 'https://api.open-meteo.com');
			url.searchParams.set('latitude', String(latitude));
			url.searchParams.set('longitude', String(longitude));
			url.searchParams.set('daily', 'sunrise,sunset');
			url.searchParams.set('timezone', 'auto');
			url.searchParams.set('forecast_days', '7');

			const res = await fetch(url.href);
			const dados = await res.json();

			const NascerArray = dados?.daily?.sunrise ?? [];
			const PorArray = dados?.daily?.sunset ?? [];

			// aqui o componente parseia as datas ISO retornadas pela API
			// e calcula o próximo nascer/pôr e a duração até ele
		} catch (err) {
			console.log('Erro ao buscar sunrise/sunset:', err);
		} finally {
			setLoadingTime(false);
		}
	};

	fetchTimes();
}, [latitude, longitude]);
```

2) Trecho do JSX retornado (imagem, texto e tempo calculado):

```tsx
<ImageBackground source={bgImage} style={styles.bgImage} resizeMode="cover" imageStyle={styles.bgImageInternal}>
	<View style={[styles.View, { backgroundColor: BColor }]}> 
		{/* imagem representativa (sol/nascer/pôr) */}
		<Image source={ImageWay} style={styles.image} />
		{/* título/descrição do card */}
		<Text style={styles.Text}>{textInformation}</Text>
		{/* mostra loader enquanto busca horários, senão mostra horário calculado */}
		{loadingTime ? (
			<ActivityIndicator size="small" color="#ffffff" />
		) : (
			<Text style={styles.Text}>{displayedTime}</Text>
		)}
		{/* exibe duração calculada até o evento */}
		<Text style={styles.text}>Tempo até: {displayedDuration}</Text>
	</View>
</ImageBackground>
```
