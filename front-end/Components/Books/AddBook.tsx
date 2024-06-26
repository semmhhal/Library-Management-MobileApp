import React, { useContext, useState } from "react";
import {
  Text,
  StyleSheet,
  TextInput,
  ScrollView,
  Pressable,
} from "react-native";
import GlobalContext from "../../Constants/context";
import axios from "axios";
import { Picker } from "@react-native-picker/picker";
import { SafeAreaView } from "react-native-safe-area-context";
export default function AddBook({ navigation }: any) {
  const { books, setBooks, authors, publishers } = useContext(GlobalContext);
  const [newBook, setnewBooks] = useState({
    title: "",
    genre: "",
    category: "",
    authorIDs: [],
    publisherId: "",
  });

  async function AddBook() {
    try {
      const response = await axios.post("http://localhost:5001/books", newBook);
      if (response.status === 201) {
        setBooks([...books, response.data]);
        navigation.goBack();
      }
    } catch (error) {
      console.log("An Error has occured adding Book ");
    }
  }

  const handleAuthorSelection = (authorId) => {
    setnewBooks((prevState) => {
      const { authorIDs } = prevState;
      if (authorIDs.includes(authorId)) {
        // Remove authorId if it's already selected
        return {
          ...prevState,
          authorIDs: authorIDs.filter((id) => id !== authorId),
        };
      } else {
        // Add authorId if it's not selected
        return { ...prevState, authorIDs: [...authorIDs, authorId] };
      }
    });
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
        <TextInput
          style={styles.input}
          placeholder="Title"
          value={newBook.title}
          onChangeText={(text: string) =>
            setnewBooks({ ...newBook, title: text })
          }
        />
        <TextInput
          style={styles.input}
          placeholder="Genre"
          value={newBook.genre}
          onChangeText={(text: string) =>
            setnewBooks({ ...newBook, genre: text })
          }
        />
        <TextInput
          style={styles.input}
          placeholder="Category"
          value={newBook.category}
          onChangeText={(text: string) =>
            setnewBooks({ ...newBook, category: text })
          }
        />
        <Text style={{ fontSize: 20 }}>Pick an Author</Text>
        {authors.map((author) => (
          <Pressable
            key={author.id}
            onPress={() => handleAuthorSelection(author.id)}
            style={[
              styles.authorOption,
              newBook.authorIDs.includes(author.id) && styles.selectedAuthor,
            ]}
          >
            <Text>{author.name}</Text>
          </Pressable>
        ))}

        <Text style={{ fontSize: "20" }}>Pick the Publisher</Text>
        <Picker
          selectedValue={newBook.publisherId}
          onValueChange={(itemValue: string) =>
            setnewBooks({ ...newBook, publisherId: itemValue })
          }
        >
          {publishers.map((publisher) => (
            <Picker.Item
              label={publisher.name}
              value={publisher.id}
              key={publisher.id}
            />
          ))}
        </Picker>
        <Pressable style={styles.submitButton} onPress={AddBook}>
          <Text style={styles.submitButtonText}>Submit Book</Text>
        </Pressable>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    paddingTop: 20,
  },
  input: {
    padding: 10,
    marginVertical: 10,
    marginHorizontal: 20,
    borderColor: "black",
    borderWidth: 1,
    borderRadius: 3,
    fontSize: 15,
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
  authorOption: {
    padding: 10,
    borderWidth: 1,
    borderColor: "gray",
    marginVertical: 5,
  },
  selectedAuthor: {
    backgroundColor: "#d3d3d3",
  },
});
