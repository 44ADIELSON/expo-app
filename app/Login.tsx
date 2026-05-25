import {
  ImageBackground,
  View,
  Text,
  StyleSheet,
  KeyboardAvoidingView,
} from "react-native";

import { UserInput } from "../components/input-area/user-name-input";
import { EnterButton } from "../components/buttons/enter-button";
import { ContinueWithGoogle } from "../components/buttons/google-button";
import { LogoCreate } from "../components/LogoTipo";
import {DivisorContainer} from '../components/divisor-container'

const LoginScreen = () => {
  return (
    <KeyboardAvoidingView
      style={styles.keyboardAvoidingView}
      behavior="padding"
    >
      <View style={styles.View}>
        <View style={styles.Topo}>
          <LogoCreate />
        </View>

        <View style={styles.Corpo}>
          <View style={styles.Header}>
            <ContinueWithGoogle />
          </View>

          <DivisorContainer />

          <View style={styles.UserPoint}>
            <UserInput />
            <EnterButton />
          </View>
        </View>
      </View>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  keyboardAvoidingView: {
    flex: 1,
  },
  Topo: {
    marginTop: 10,
    marginBottom: 100,
  },
  View: {
    flex: 1,
    alignItems: "center",
    justifyContent: "flex-start",
    flexDirection: "column",

    backgroundColor: "#EFEEEA",
  },
  UserPoint: {
    gap: 20,
  },
  Corpo: {
    flexDirection: "column",
    justifyContent: "space-between",
  },
  Header: {
    marginBottom: 50,
  }
});

export default LoginScreen;
