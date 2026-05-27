import { View, Text, StyleSheet } from "react-native";

interface TypeNewDateComponent {
  label?: string; // Exemplo de propriedade opcional
}

export const NewDateComponent = ({}: TypeNewDateComponent) => {
  const obterDataFormatada = () => {
    try {
      const agora = new Date();

      const formatoCompleto: Intl.DateTimeFormatOptions = {
        weekday: "long",
        day: "numeric",
        month: "long",
        year: "numeric",
      };

      return agora.toLocaleDateString("pt-BR", formatoCompleto);
    } catch (error) {
      console.log("Solicitação Inválida", error);
      return "Erro ao carregar data";
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.textoData}>{obterDataFormatada()}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 16,
    alignItems: "center",
    justifyContent: "center",
  },
  textoData: {
    fontSize: 12,
    color: "#f5f5f5",
    fontWeight: "300",
  },
});
