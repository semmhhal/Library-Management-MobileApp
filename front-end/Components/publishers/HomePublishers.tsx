import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Publisherlist from "./Publisherlists";
import AddPublisher from "./AddPublisher";
import EditPublisher from "./EditPublisher";
const { Navigator, Screen } = createNativeStackNavigator();

export default function HomePublishers() {
  return (
    <Navigator>
      <Screen
        name="Publisher List"
        component={Publisherlist}
        options={{ headerShown: false }}
      />
      <Screen name="Add Publisher" component={AddPublisher} />
      <Screen name="Edit Publisher" component={EditPublisher} />
    </Navigator>
  );
}
