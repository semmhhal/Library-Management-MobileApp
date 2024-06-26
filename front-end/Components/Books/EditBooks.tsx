import React, { useContext, useState } from "react";
import {
  Text,
  StyleSheet,
  View,
  TextInput,
  Pressable,
  ScrollView,
  Alert,
} from "react-native";
import GlobalContext from "../../Constants/context";
import axios from "axios";
import { Picker } from "@react-native-picker/picker";
import Iauthors from "../../types/IAuthors";
import Ibooks from "../../types/IBooks";
import { SafeAreaView } from "react-native-safe-area-context";

export default function EditBooks({ navigation, route }: any) {
  const { books, setBooks, authors, publishers } = useContext(GlobalContext);
  const data = route.params;
  const [updated, setUpdated] = useState({
    ...data,
    authorIDs: data.authorIDs || [],
    publisherId: data.publisherId || "",
  });

  const updateBooks = async () => {
    try {
      const response = await axios.put(
        `http://localhost:5001/books/${updated.id}`,
        updated // Include updated data in the request body
      );
      if (response.status === 200) {
        const index = books.findIndex((x) => x.id === updated.id);
        if (index !== -1) {
          const arr = [...books];
          arr[index] = response.data;
          setBooks(arr);
          navigation.goBack();
        }
      }
    } catch (error) {
      Alert.alert("Error has occured");
    }
  };

  const handleAuthorSelection = (authorId: string) => {
    setUpdated((prevState: Ibooks) => {
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
    <ScrollView style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder="Title"
        value={updated.title}
        onChangeText={(text: string) => setUpdated({ ...updated, title: text })}
      />
      <TextInput
        style={styles.input}
        placeholder="Genre"
        value={updated.genre}
        onChangeText={(text: string) => setUpdated({ ...updated, genre: text })}
      />
      <TextInput
        style={styles.input}
        placeholder="Category"
        value={updated.category}
        onChangeText={(text: string) =>
          setUpdated({ ...updated, category: text })
        }
      />

      <Text style={{ fontSize: 20 }}>Pick an Author</Text>
      {authors.map((author) => (
        <Pressable
          key={author.id}
          onPress={() => handleAuthorSelection(author.id!)}
          style={[
            styles.authorOption,
            updated.authorIDs.includes(author.id) && styles.selectedAuthor,
          ]}
        >
          <Text>{author.name}</Text>
        </Pressable>
      ))}

      <Text style={{ fontSize: 20 }}>Pick the Publisher</Text>
      <Picker
        selectedValue={updated.publisherId}
        onValueChange={(itemValue: string) =>
          setUpdated({ ...updated, publisherId: itemValue })
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

      <Pressable style={styles.submitButton} onPress={updateBooks}>
        <Text style={styles.submitButtonText}>Submit Book</Text>
      </Pressable>
    </ScrollView>
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
