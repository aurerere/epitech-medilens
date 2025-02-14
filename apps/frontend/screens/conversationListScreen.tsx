import { SafeAreaView } from "../components/safeAreaView";
import { Text } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { Button } from "../components/button";

export const ConversationListScreen = () => {
  const navigation = useNavigation<any>();
  return (
    <SafeAreaView>
      <Text>ConversationListScreen</Text>
      <Button
        onPress={() => {
          navigation.navigate("NewConversation");
        }}
        text="New Conversation"
      />
    </SafeAreaView>
  );
};
