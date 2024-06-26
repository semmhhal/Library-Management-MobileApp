import React from "react";
import { Text } from "react-native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import BookList from "./BookList";
import AddBook from "./AddBook";
import EditBooks from "./EditBooks";
import BorrowBooks from "./BorrowBooks";
import ReturnBooks from "./ReturnBooks";

const { Navigator, Screen } = createNativeStackNavigator();

export default function Homebooks() {
  return (
    <Navigator>
      <Screen
        name="Books"
        component={BookList}
        options={{ headerShown: false }}
      />

      <Screen name="Add Book" component={AddBook} />
      <Screen name="Edit Book" component={EditBooks} />
      <Screen name="Borrow Book" component={BorrowBooks} />
      <Screen name="Return Book" component={ReturnBooks} />
    </Navigator>
  );
}
