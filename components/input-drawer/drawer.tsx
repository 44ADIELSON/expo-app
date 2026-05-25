import React from "react";
import { View, Text, Image, StyleSheet } from "react-native";

import FontAwesome5 from "@expo/vector-icons/FontAwesome5";
import Feather from "@expo/vector-icons/Feather";

export const VisibilityCard = () => {
  return (
    <View>
      <View style={styles.cardContainer}>
        {/* Bloco Superior */}
        <View style={styles.topBlock}>
          <Text style={styles.visibleTime}>[VISIBLE TIME]</Text>
        </View>

        {/* Bloco Intermediário */}
        <View style={styles.middleBlock}>
          <Text style={styles.sunRowText}>Nascer do Sol amanhã: [TIME]</Text>
          <Text style={styles.sunRowText}>Por do sol hoje: [TIME]</Text>
        </View>

        {/* Bloco Inferior */}
        <View style={styles.bottomBlock}>
          {/* Linha 1 */}
          <View style={styles.metricRow}>
            <View style={styles.metricLeftGroup}>
              {/* Substitua pelo seu componente de ícone ou Image */}
              <FontAwesome5
                name="cloud"
                size={18}
                color="white"
                style={styles.icon}
              />
              <Text style={styles.metricLabel}>Coberta de Nuvens</Text>
            </View>
            <Text style={styles.metricValue}>[%]</Text>
          </View>

          {/* Linha 2 */}
          <View style={styles.metricRow}>
            <View style={styles.metricLeftGroup}>
              <Feather
                name="wind"
                size={18}
                color="white"
                style={styles.icon}
              />
              <Text style={styles.metricLabel}>Qualidade do Ar</Text>
            </View>
            <Text style={styles.metricValue}>[goog]</Text>
          </View>

          {/* Linha 3 */}
          <View style={styles.metricRow}>
            <View style={styles.metricLeftGroup}>
              <FontAwesome5
                name="cloud-showers-heavy"
                size={18}
                color="white"
                style={styles.icon}
              />
              <Text style={styles.metricLabel}>Previsão de Chuva</Text>
            </View>
            <Text style={styles.metricValue}>[%]</Text>
          </View>
        </View>
      </View>
    </View>
  );
};

export const styles = StyleSheet.create({
  cardContainer: {
    fontFamily: "System",
    width: "100%",

    backgroundColor: "rgba(44, 36, 32, 0.75)",
    borderRadius: 24,
    paddingHorizontal: 24,
    paddingVertical: 32,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 5,
  },

  topBlock: {
    alignItems: "center",
  },

  visibleTime: {
    color: "#FFFFFF",
    fontSize: 26,
    fontWeight: "bold",
    letterSpacing: 1,
    textAlign: "center",
  },

  middleBlock: {
    alignItems: "flex-start",
  },
  sunRowText: {
    color: "#E0E0E0",
    fontSize: 18,
    marginVertical: 6,
  },

  bottomBlock: {
    width: "100%",
  },
  metricRow: {
    flexDirection: "row",
    alignItems: "flex-start",
    justifyContent: "space-between",
  },
  metricLeftGroup: {
    flexDirection: "row",
    alignItems: "center",
  },
  icon: {
    width: 24,
    height: 24,
    marginRight: 16,
    tintColor: "#FFFFFF",
  },
  metricLabel: {
    color: "#FFFFFF",
    fontSize: 18,
    fontWeight: "400",
  },
  metricValue: {
    color: "#FFFFFF",
    fontSize: 18,
    fontWeight: "500",
  },
});
