import {
  ImageBackground,
  View,
  StyleSheet,
  KeyboardAvoidingView,
} from "react-native";

import { UserInput } from "../project/components/input-area/user-name-input";
import { EnterButton } from "../project/components/buttons/enter-button";
import { LocationButton } from "../project/components/buttons/location-button";

const LoginScreen = () => {
  return (
    <KeyboardAvoidingView
      style={estilos.keyboardAvoidingView}
      behavior="padding"
    >
      <ImageBackground
        source={require("../assets/Gemini_Generated_Image_l7xwetl7xwetl7xw.png")}
        style={estilos.background}
        imageStyle={estilos.image}
      >
        <View style={estilos.View}>
          <View>
            <UserInput />
          </View>
          <View>
            <EnterButton />
            <LocationButton />
          </View>
        </View>
      </ImageBackground>
    </KeyboardAvoidingView>
  );
};

const estilos = StyleSheet.create({
  keyboardAvoidingView: {
    flex: 1,
  },
  View: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "column",

    gap: 30,
  },
  background: {
    flex: 1,
  },
  image: {
    resizeMode: "cover",
  },
});

export default LoginScreen;
