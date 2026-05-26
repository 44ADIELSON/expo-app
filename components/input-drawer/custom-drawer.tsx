import { View, Text, StyleSheet, Image } from "react-native";

import { ImageSourcePropType } from "react-native";

interface TypeCustomDrawer {
  BColor?: string;
  ImageWay?: ImageSourcePropType;
  textInformation?: string;
  timeInformation?: string;
  durationInformation?: string;
}

export const CustomDrawer = ({
  BColor,
  ImageWay,
  textInformation,
  timeInformation,
  durationInformation,
}: TypeCustomDrawer) => {
  return (
    <View style={[styles.View, { backgroundColor: BColor }]}>
      <Image
        /*source={require("../../assets/custom-drawer-sunrise.png")}*/
        source={ImageWay}
        style={styles.image}
      />
      <Text style={styles.Text}>{textInformation}</Text>
      <Text style={styles.Text}>{timeInformation}</Text>
      <Text style={styles.text}>Tempo até: {durationInformation}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  View: {
    flexDirection: "column",
    alignItems: "center",
    justifyContent: 'center',
    borderRadius: 20,
    padding: 10,

    width: 160,
    height: 190
  },
  image: {
    resizeMode: "cover",
    width: 50,
    height: 50,
  },
  Text: {
    fontFamily: "System",
    fontSize: 20,
    fontWeight: 700,
    color: "#f5f5f5",
  },
  text: {
    fontSize: 15,
    fontWeight: 300,
    color: "#f5f5f5",
  },
});
