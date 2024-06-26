import React from "react";
import { Text } from "react-native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import AuthorList from "./AuthorList";
import AddAuthors from "./AddAuthors";
import EditAuthors from "./EditAuthors";
const { Navigator, Screen } = createNativeStackNavigator();
export default function HomeAuthors() {
  return (
    <Navigator>
      <Screen
        name="Author List"
        component={AuthorList}
        options={{ headerShown: false }}
      />
      <Screen name="Add Authors" component={AddAuthors} />
      <Screen name="Edit Authors" component={EditAuthors} />
    </Navigator>
  );
}
