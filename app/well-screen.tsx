import { ImageBackground, View, StyleSheet } from "react-native";

import { ExploreButton } from "../project/components/buttons/explore-button";
import {ContinueWithGoogle} from '../project/components/buttons/google-button'

const WellScreen = () => {
  return (
    <ImageBackground
      source={require("../assets/Gemini_Generated_Image_l7xwetl7xwetl7xw.png")}
      style={estilos.background}
      imageStyle={estilos.image}
    >
      <View style={estilos.View}>
        <ExploreButton />

        <ContinueWithGoogle />
      </View>
    </ImageBackground>
  );
};

const estilos = StyleSheet.create({
  View: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  background: {
    flex: 1,
    width: "100%",
    height: "100%",
  },
  image: {
    resizeMode: "cover",
  },
});

export default WellScreen;
