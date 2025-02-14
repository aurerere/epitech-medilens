import {
  Pressable,
  View,
  Text,
  StyleSheet,
  ActivityIndicator,
} from "react-native";
import { Spacing } from "../const/spacing";
import { Color } from "../const/color";
import { Radius } from "../const/radius";

interface ButtonProps {
  busy?: boolean;
  onPress: () => void;
  text: string;
  variant?: "primary" | "secondary";
  disabled?: boolean;
}

export const Button = ({
  busy,
  onPress,
  text,
  variant = "primary",
  disabled,
}: ButtonProps) => {
  return (
    <Pressable onPress={onPress} disabled={busy || disabled}>
      <View style={[styles.container, styles[variant]]}>
        <Text
          style={[
            styles.text,
            styles[variant],
            busy ? { opacity: 0 } : undefined,
            disabled ? { opacity: 0.5 } : undefined,
          ]}
        >
          {text}
        </Text>
        {busy && (
          <ActivityIndicator
            style={styles.activityIndicator}
            size="small"
            color={variant === "primary" ? Color.BACKGROUND : Color.PRIMARY}
            animating={busy}
          />
        )}
      </View>
    </Pressable>
  );
};

export const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    justifyContent: "center",
    padding: Spacing.MD,
    borderRadius: Radius.XS,
  },
  activityIndicator: {
    position: "absolute",
  },
  text: {
    fontWeight: "bold",
  },
  primary: {
    color: Color.BACKGROUND,
    backgroundColor: Color.PRIMARY,
  },
  secondary: {
    color: Color.PRIMARY,
    backgroundColor: Color.CONTRAST_1,
  },
});
