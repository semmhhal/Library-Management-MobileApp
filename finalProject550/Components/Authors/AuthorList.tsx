import React, { useContext, useEffect, useState } from "react";
import {
  SafeAreaView,
  Text,
  StyleSheet,
  Platform,
  TextInput,
  Pressable,
} from "react-native";
import AuthorHeader from "../Header/AuthorHeader";
import GlobalContext from "../../Constants/context";
import Iauthors from "../../types/Iauthors";
import { FlatList } from "react-native";
import Author from "./Author";
export default function AuthorList({ navigation }: any) {
  const { authors } = useContext(GlobalContext);
  const [displayAuthors, setDisplayAuthors] = useState<Iauthors[]>(authors);
  const [search, setSearch] = useState("");

  const onSearch = (text: string) => {
    const arr = authors.filter((x) =>
      x.name.toLowerCase().includes(text.toLowerCase())
    );
    setDisplayAuthors(arr);
    setSearch(text);
  };

  useEffect(() => {
    setDisplayAuthors(authors);
  }, [authors]);

  const gotoAddAuthor = () => {
    navigation.navigate("Add Authors");
  };
  return (
    <SafeAreaView style={styles.container}>
      <AuthorHeader />
      <TextInput
        style={styles.input}
        value={search}
        onChangeText={onSearch}
        placeholder="Live Search"
      />
      <Pressable style={styles.submitButton} onPress={gotoAddAuthor}>
        <Text style={styles.submitButtonText}>Add New Author</Text>
      </Pressable>
      <FlatList
        data={displayAuthors}
        renderItem={({ item, index }) => <Author data={item} index={index} />}
        keyExtractor={(item) => item.email}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFFFFF",
    paddingTop: Platform.OS === "ios" ? 50 : 0,
    paddingBottom: 200,
  },
  input: {
    padding: 10,
    paddingHorizontal: 20,
    fontSize: 16,
    color: "#444",
    borderBottomWidth: 1,
    borderColor: "#ddd",
    backgroundColor: "#F5F5F5",
  },
  submitButton: {
    paddingVertical: 10,
    paddingHorizontal: 20,
    backgroundColor: "#0066cc",
    borderRadius: 4,
    marginVertical: 10,
    marginHorizontal: 20,
  },
  submitButtonText: {
    fontSize: 18,
    color: "#ffffff",
    textAlign: "center",
  },
});
