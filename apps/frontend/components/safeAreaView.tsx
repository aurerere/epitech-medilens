import { useSafeAreaInsets } from "react-native-safe-area-context";
import { ReactNode } from "react";
import { View } from "react-native";

interface SafeAreaViewProps {
  children: ReactNode;
}

export const SafeAreaView = ({ children }: SafeAreaViewProps) => {
  const safeAreaInsets = useSafeAreaInsets();

  return (
    <View
      style={{
        width: "100%",
        height: "100%",
        paddingTop: safeAreaInsets.top,
        paddingBottom: safeAreaInsets.bottom,
      }}
    >
      {children}
    </View>
  );
};
