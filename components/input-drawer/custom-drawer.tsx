import { View, Text, StyleSheet, Image, ImageBackground } from "react-native";

import { ImageSourcePropType } from "react-native";

interface TypeCustomDrawer {
  BColor?: string;
  ImageWay?: ImageSourcePropType;
  textInformation?: string;
  timeInformation?: string;
  durationInformation?: string;
  bgImage?: ImageSourcePropType;
}

export const CustomDrawer = ({
  BColor,
  ImageWay,
  textInformation,
  timeInformation,
  durationInformation,
  bgImage,
}: TypeCustomDrawer) => {
  return (
    <ImageBackground
      source={bgImage}
      style={styles.bgImage}
      resizeMode="cover"
      imageStyle={styles.bgImageInternal}
    >
      <View style={[styles.View, { backgroundColor: BColor }]}>
        <Image source={ImageWay} style={styles.image} />
        <Text style={styles.Text}>{textInformation}</Text>
        <Text style={styles.Text}>{timeInformation}</Text>
        <Text style={styles.text}>Tempo até: {durationInformation}</Text>
      </View>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  View: {
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 20,
    padding: 10,

    width: 160,
    height: 150,
  },
  image: {
    resizeMode: "cover",
    width: 70,
    height: 70,
  },
  Text: {
    fontFamily: "System",
    fontSize: 17,
    fontWeight: 700,
    color: "#f5f5f5",
  },
  text: {
    fontSize: 11,
    fontWeight: 300,
    color: "#f5f5f5",
  },
  bgImage: {
    alignItems: "center",
    width: 160,
    height: 150,
  },
  bgImageInternal: {
    borderRadius: 20,
  },
});
