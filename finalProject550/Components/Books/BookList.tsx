import React, { useContext, useEffect, useState } from "react";
import {
  SafeAreaView,
  StyleSheet,
  View,
  Platform,
  TextInput,
  FlatList,
  Pressable,
  Text,
  ScrollView,
  Button,
} from "react-native";
import { Picker } from "@react-native-picker/picker";
import BookHeader from "../Header/BookHeader";
import GlobalContext from "../../Constants/context";
import Ibooks from "../../types/IBooks";
import Book from "./Book";
export default function BookList({ navigation }: any) {
  const { books, setLoggedin } = useContext(GlobalContext);
  const [displayBooks, setDisplayBooks] = useState<Ibooks[]>(books);
  const [search, setSearch] = useState("");

  const [category, setCategory] = useState("");
  const [genre, setGenre] = useState("");
  const [viewMode, setViewMode] = useState("list"); // 'list' or 'grid'

  // Extract unique categories and genres
  const categories = [...new Set(books.map((book) => book.category))];
  const genres = [...new Set(books.map((book) => book.genre))];

  const filterBooks = () => {
    let filteredBooks = books;

    if (category) {
      filteredBooks = filteredBooks.filter(
        (book) => book.category === category
      );
    }
    if (genre) {
      filteredBooks = filteredBooks.filter((book) => book.genre === genre);
    }

    setDisplayBooks(filteredBooks);
  };

  useEffect(() => {
    filterBooks();
  }, [category, genre, books]);

  const renderBookItem = ({ item, index }) => (
    <View style={viewMode === "grid" ? styles.gridItem : styles.listItem}>
      <Book data={item} index={index} />
    </View>
  );
  const onSearch = (text: string) => {
    const arr = books.filter((x) =>
      x.title.toLowerCase().includes(text.trim().toLowerCase())
    );
    setDisplayBooks(arr);
    setSearch(text);
  };

  useEffect(() => {
    setDisplayBooks(books);
  }, [books]);

  const gotoAddBook = () => {
    navigation.navigate("Add Book");
  };

  const onLogout = () => {
    try {
      setLoggedin(false);
    } catch (error) {
      console.log("error");
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
        <BookHeader />
        <TextInput
          style={styles.input}
          placeholder="Live Search by Title"
          value={search}
          onChangeText={onSearch}
        />
        <Picker
          selectedValue={category}
          onValueChange={(itemValue) => setCategory(itemValue)}
          style={styles.picker1}
        >
          <Picker.Item label="All Categories" value="" />
          {categories.map((cat) => (
            <Picker.Item key={cat} label={cat} value={cat} />
          ))}
        </Picker>
        <Picker
          selectedValue={genre}
          onValueChange={(itemValue) => setGenre(itemValue)}
          style={styles.picker2}
        >
          <Picker.Item label="All Genres" value="" />
          {genres.map((gen) => (
            <Picker.Item key={gen} label={gen} value={gen} />
          ))}
        </Picker>
      </ScrollView>
      <Pressable style={styles.submitButton} onPress={gotoAddBook}>
        <Text style={styles.submitButtonText}>Add New Book</Text>
      </Pressable>
      <View style={styles.buttonContainer}>
        <Button title="List View" onPress={() => setViewMode("list")} />
        <Button title="Grid View" onPress={() => setViewMode("grid")} />
      </View>
      <FlatList
        data={displayBooks}
        renderItem={renderBookItem}
        keyExtractor={(item) => item.title}
        key={viewMode === "grid" ? 1 : 0} // Re-render the list when view mode changes
        numColumns={viewMode === "grid" ? 2 : 1}
      />
      <Pressable style={styles.logoutButton} onPress={onLogout}>
        <Text style={styles.submitButtonText}>Log Out</Text>
      </Pressable>
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
  picker1: {
    height: 160,
    marginTop: 0,
    paddingTop: 0,
  },
  picker2: {
    height: 190,
  },
  filterText: {
    paddingTop: 20,
    fontSize: 14,
    color: "#444",
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
    paddingVertical: 1,
    paddingHorizontal: 20,
    backgroundColor: "#0066cc",
    borderRadius: 4,
    marginVertical: 10,
    marginHorizontal: 20,
  },
  logoutButton: {
    paddingHorizontal: 10,
    backgroundColor: "red",
    borderRadius: 4,
    marginVertical: 10,
    marginHorizontal: 20,
  },
  submitButtonText: {
    fontSize: 18,
    color: "#ffffff",
    textAlign: "center",
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 20,
  },
  listItem: {
    marginBottom: 10,
  },
  gridItem: {
    flex: 1,
    margin: 5,
    maxWidth: "48%",
  },
});
