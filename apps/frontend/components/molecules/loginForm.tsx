import {
  Text,
  TextInput,
  StyleSheet,
  View,
  KeyboardAvoidingView,
} from "react-native";
import { Button } from "../button";
import { SafeAreaView } from "../safeAreaView";
import { Radius } from "../../const/radius";
import { Spacing } from "../../const/spacing";
import { Color } from "../../const/color";
import { Dispatch, SetStateAction } from "react";

interface LoginFormProps {
  setStrategy: Dispatch<SetStateAction<"login" | "register">>;
}

export const LoginForm = ({ setStrategy }: LoginFormProps) => {
  return (
    <SafeAreaView>
      <KeyboardAvoidingView behavior="height" style={{ flex: 1 }}>
        <View style={styles.container}>
          <View style={styles.titleContainer}>
            <Text style={styles.title}>Login to medilens</Text>
          </View>
          <View style={styles.form}>
            <TextInput placeholder="Email" style={styles.textInput} />
            <TextInput
              placeholder="Password"
              secureTextEntry
              style={styles.textInput}
            />
            <View style={styles.formControls}>
              <Button onPress={() => {}} text="Login" />
              <Button
                onPress={() => {
                  setStrategy("register");
                }}
                text="Register"
                variant="secondary"
              />
            </View>
          </View>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: Spacing.SM,
    justifyContent: "center",
    height: "100%",
  },
  textInput: {
    borderRadius: Radius.XS,
    paddingHorizontal: Spacing.MD,
    paddingVertical: 16,
    backgroundColor: Color.CONTRAST_1,
  },
  form: {
    gap: Spacing.SM,
  },

  formControls: {
    marginTop: Spacing.MD,
    gap: Spacing.SM,
  },

  title: {
    fontWeight: "bold",
    fontSize: 24,
  },

  titleContainer: {
    marginBottom: Spacing.MD,
  },
});
