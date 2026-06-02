import {
  View,
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  TouchableWithoutFeedback,
  Keyboard,
} from "react-native";

import { UserInput } from "../components/inputs/UserInput";
import { EnterButton } from "../components/buttons/EnterButton";
import { Logo } from "../components/layout/Logo";
import { ForgotPasswordButton } from '../components/buttons/ForgotPasswordButton'
import { NewUserButton } from '../components/buttons/NewUserButton'

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
            <Logo iconColor="#000000" textColor="#000000" />
          </View>

          <View style={styles.corpo}>
            <View style={styles.formGroup}>
              <UserInput />
              <ForgotPasswordButton />
              <EnterButton />
              <NewUserButton />
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
    marginBottom: 185,             
  },
  corpo: {
    gap: 24,                     
  },
  formGroup: {
    alignItems: 'center',

    gap: 16,                     
  },
});

export default LoginScreen;