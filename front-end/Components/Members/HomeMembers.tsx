import React from "react";

import { createNativeStackNavigator } from "@react-navigation/native-stack";
import MembersList from "./MembersList";

import EditMembers from "./EditMembers";
import AddMembers from "./AddMembers";
const { Navigator, Screen } = createNativeStackNavigator();
export default function HomeMembers() {
  return (
    <Navigator>
      <Screen
        name="Members List"
        component={MembersList}
        options={{ headerShown: false }}
      />
      <Screen name="Add Members" component={AddMembers} />
      <Screen name="Edit Members" component={EditMembers} />
    </Navigator>
  );
}
