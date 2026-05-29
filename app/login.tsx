import {
  View,
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  TouchableWithoutFeedback,
  Keyboard,
} from "react-native";

import { UserInput } from "../components/input-area/user-name-input";
import { EnterButton } from "../components/buttons/enter-button";
import { ContinueWithGoogle } from "../components/buttons/google-button";
import { LogoCreate } from "../components/LogoTipo";
import { DivisorContainer } from "../components/divisor-container";


const LoginScreen = () => {
  const color = 'black';

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
    >
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <ScrollView
          contentContainerStyle={styles.scrollContainer}
          keyboardShouldPersistTaps="handled"
          showsVerticalScrollIndicator={false}
        >
          <View style={styles.topo}>
            <LogoCreate iconColor="#000000" textColor="#000000" />
          </View>

          <View style={styles.corpo}>
            <ContinueWithGoogle />

            <DivisorContainer />

            <View style={styles.formGroup}>
              <UserInput />
              <EnterButton />
            </View>
          </View>
        </ScrollView>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#EFEEEA",
  },
  scrollContainer: {
    justifyContent: "flex-start", 
    paddingHorizontal: 24,
    paddingBottom: 24,
    alignItems: 'center',   
  },
  topo: {
    alignItems: "center",
    marginBottom: 90,             
  },
  corpo: {
    gap: 24,                     
  },
  formGroup: {
    gap: 16,                     
  },
});

export default LoginScreen;