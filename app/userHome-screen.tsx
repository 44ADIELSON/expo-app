import { ImageBackground, View, StyleSheet, Text, Image, FlatList } from "react-native";

import SelecaoPerfil from "../project/components/user-area/mock/user-selection";

const UserHome = () => {
  return (
    <ImageBackground
      source={require("../assets/Gemini_Generated_Image_l7xwetl7xwetl7xw.png")}
      style={estilos.background}
      imageStyle={estilos.image}
    >
      <View style={estilos.View}>
        <SelecaoPerfil/>
      </View>

      
    </ImageBackground>
  );
};

const estilos = StyleSheet.create({
  View: {
    flex: 1,
    alignItems: "center",
    flexDirection: "row",
  },
  Text: {
    fontSize: 20,
    fontWeight: "bold",
    color: "white",
  },
  background: {
    flex: 1,
    flexDirection: "row",
    width: "100%",
    height: "100%",
  },
  image: {
    resizeMode: "cover",
  },
  profileImage: {
    width: 100,
    height: 100,
    borderRadius: 60,
  },
});

export default UserHome;
