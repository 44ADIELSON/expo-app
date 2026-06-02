import {Image, View, StyleSheet } from "react-native";

import { ExploreButton } from "../components/buttons/ExploreButton";

const WellScreen = () => {
  return (
    <View style={styles.background}>
      <View style={styles.View}>
        <Image
          source={require("../assets/LOGO-TYPE-WELL-TAMANHO.png")}
          style={styles.image}
        />
        <ExploreButton />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  View: {
    flex: 1,
    gap: 100,

    alignItems: "center",
    justifyContent: "center",

    backgroundColor: "#EFEEEA",
  },
  background: {
    alignItems: "center",
  },
  image: {
    resizeMode: "cover",
    width: 350,
    height: 350,
  },
});

export default WellScreen;
