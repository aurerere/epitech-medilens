import { createStackNavigator } from "@react-navigation/stack";
import { ConversationListScreen } from "../screens/conversationListScreen";
import { ConversationScreen } from "../screens/conversationScreen";
import { NewConversationScreen } from "../screens/newConversationScreen";

const RootStack = createStackNavigator();

export const RootContainer = () => {
  return (
    <RootStack.Navigator>
      <RootStack.Group>
        <RootStack.Screen
          name="ConversationList"
          component={ConversationListScreen}
          options={{ headerShown: false }}
        />
        <RootStack.Screen
          name="Conversation"
          component={ConversationScreen}
          options={{ headerShown: false }}
        />
      </RootStack.Group>
      <RootStack.Group screenOptions={{ presentation: "modal" }}>
        <RootStack.Screen
          name="NewConversation"
          component={NewConversationScreen}
          options={{
            headerShown: false,
          }}
        />
      </RootStack.Group>
    </RootStack.Navigator>
  );
};
