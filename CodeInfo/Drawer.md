# Drawer

Descrição:
- Componente que contém o conteúdo do menu lateral (itens, perfil, links).

O que faz:
- Lista opções de navegação do aplicativo.
- Exibe dados do usuário (nome, e-mail) e ações rápidas.
- Pode incluir controles como alternar tema, sair e configurações.

Props e o que representam:
- `items`: array com objetos `{ label, icon, route, action }` usados para renderizar cada linha do menu.
- `onSelect(item)`: callback chamado quando o usuário escolhe um item.
- `user`: dados do usuário para exibir no cabeçalho.

Funções internas comuns e o que fazem:
- `renderItem(item)`: formata e retorna o componente visual do item (ícone + label).
- `onSelectItem(item)`: trata o clique, pode chamar `item.action` ou `onSelect(item)` para navegação.
- `renderFooter()`: seção com ações como `logout` ou `toggleTheme`.

Componentes usados e papel:
- Listas (`FlatList` ou `ScrollView`) para mostrar itens.
- `Switch` para opções como alternar tema.
- Botões para ações rápidas (sair, perfil, etc.).

Observações:
- Delegar lógica de negócio (logout, navegação) para hooks/serviços externos; o `Drawer` deve focar apenas na renderização e UX.

Exemplos de código:

Exemplo de `renderItem` e `onSelectItem`:

```tsx
function renderItem({ item }) {
	return (
		<Pressable onPress={() => onSelectItem(item)}>
			<Icon name={item.icon} />
			<Text>{item.label}</Text>
		</Pressable>
	);
}

function onSelectItem(item) {
	if (item.action) return item.action();
	if (item.route) navigation.navigate(item.route);
}
```

Exemplo de `renderFooter()` com logout e toggle de tema:

```tsx
function renderFooter() {
	return (
		<View>
			<Button onPress={handleLogout}>Sair</Button>
			<Switch value={isDark} onValueChange={toggleTheme} />
		</View>
	);
}
```

Trechos reais do arquivo `components/input-drawer/Drawer.tsx` (trechos selecionados):

1) Função que busca dados de nascer/pôr do sol (`fetchSunTimes`):

```ts
const fetchSunTimes = async () => {
	// consulta a API open-meteo para obter sunrise/sunset e códigos de tempo
	try {
		setLoading(true);
		const url = new URL('/v1/forecast', 'https://api.open-meteo.com');
		url.searchParams.set('latitude', String(latitude));
		url.searchParams.set('longitude', String(longitude));
		url.searchParams.set('daily', 'sunrise,sunset,weathercode');
		url.searchParams.set('timezone', 'auto');
		url.searchParams.set('forecast_days', '7');

		const res = await fetch(url.href);
		const dados = await res.json();

		const NascerArray = dados?.daily?.sunrise ?? [];
		const PorArray = dados?.daily?.sunset ?? [];
		const rawWCodes = dados?.daily?.weathercode ?? [];

		// aqui o componente converte os arrays ISO em datas locais e extrai ícones
		// a lógica mapeia `weathercode` para ícones e popula `iconsForDays`
	} catch (error) {
		console.log('Erro fetchSunTimes:', error);
	} finally {
		setLoading(false);
	}
};
```

2) Trecho do JSX que renderiza os dias e ícones (linha de dias):

```tsx
<ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.daysRow}>
	{days.map((d, i) => (
		// cada dia é um botão que seleciona o dia para exibir horário e ícone
		<TouchableOpacity key={d} style={[styles.dayItem, i === selectedDay ? styles.dayItemSelected : null]} onPress={() => setSelectedDay(i)} activeOpacity={0.8}>
			<Text style={[styles.dayLabel, i === selectedDay ? styles.dayLabelSelected : null]}>{d}</Text>
			{/* utiliza ícone mapeado de `iconsForDays` ou um fallback */}
			<MaterialCommunityIcons name={(iconsForDays && iconsForDays[i]) ? iconsForDays[i] as any : dayIcons[i] as any} size={18} color={i === selectedDay ? '#FFFFFF' : 'rgba(255,255,255,0.6)'} />
		</TouchableOpacity>
	))}
</ScrollView>
```
