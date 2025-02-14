import { useNavigation } from "@react-navigation/native";
import {
  CameraView,
  useCameraPermissions,
  CameraCapturedPicture,
} from "expo-camera";
import { useCallback, useRef, useState } from "react";
import { ActivityIndicator } from "react-native";
import { Button } from "../components/button";
import { View, Image } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { Spacing } from "../const/spacing";

export const NewConversationScreen = () => {
  const [isSendButtonBusy, setIsSendButtonBusy] = useState(false);
  const [capturedPicture, setCapturedPicture] =
    useState<CameraCapturedPicture | null>(null);

  const navigation = useNavigation<any>();

  const safeAreaInsets = useSafeAreaInsets();

  const navigateToConversation = useCallback(() => {
    navigation.goBack();
    setTimeout(() => {
      navigation.navigate("Conversation");
    }, 0);
  }, []);

  const cameraRef = useRef<CameraView>(null);

  const handleSend = async () => {
    setIsSendButtonBusy(true);
    const value = await cameraRef.current?.takePictureAsync();
    if (!value) {
      setIsSendButtonBusy(false);
      return;
    }
    setCapturedPicture(value);
  };

  const [permission, requestPermission] = useCameraPermissions();

  if (!permission) {
    return <ActivityIndicator />;
  }

  if (!permission.granted) {
    requestPermission();
    return <ActivityIndicator />;
  }

  return (
    <View style={{ height: "100%" }}>
      {capturedPicture ? (
        <Image source={{ uri: capturedPicture.uri }} style={{ flex: 1 }} />
      ) : (
        <CameraView
          style={[{ flex: 1 }, isSendButtonBusy ? { opacity: 0.5 } : undefined]}
          facing="back"
          animateShutter
          ref={cameraRef}
        />
      )}

      <View
        style={{
          position: "absolute",
          bottom: safeAreaInsets.bottom,
          width: "100%",
          paddingHorizontal: Spacing.LG,
        }}
      >
        <Button onPress={handleSend} text="Send" busy={isSendButtonBusy} />
      </View>
    </View>
  );
};
