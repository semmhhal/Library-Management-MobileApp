import axios from "axios";
import React, { useContext, useState } from "react";
import {
  Text,
  View,
  TextInput,
  Pressable,
  StyleSheet,
  Alert,
} from "react-native";
import GlobalContext from "../../Constants/context";
export default function AddAuthors({ navigation }: any) {
  const { authors, setAuthors } = useContext(GlobalContext);
  const [newAuthor, setNewAuthor] = useState({
    name: "",
    phone: "",
    email: "",
  });

  async function AddAuthor() {
    try {
      const duplicate = authors.some(
        (author) => author.name.toLowerCase() === newAuthor.name.toLowerCase()
      );

      if (duplicate) {
        Alert.alert("Error", "Author already exists");
        return;
      }
      const response = await axios.post(
        "http://localhost:5001/authors",
        newAuthor
      );
      if (response.status === 201) {
        setAuthors([...authors, response.data]);
        navigation.goBack();
      }
    } catch (error) {
      console.log("An Error has occured");
    }
  }
  return (
    <View>
      <TextInput
        style={styles.input}
        placeholder="Name"
        value={newAuthor.name}
        onChangeText={(text: string) =>
          setNewAuthor({ ...newAuthor, name: text })
        }
      />
      <TextInput
        style={styles.input}
        placeholder="Phone"
        value={newAuthor.phone}
        onChangeText={(text: string) =>
          setNewAuthor({ ...newAuthor, phone: text })
        }
      />
      <TextInput
        style={styles.input}
        placeholder="Email"
        autoCapitalize="none"
        value={newAuthor.email}
        onChangeText={(text: string) =>
          setNewAuthor({ ...newAuthor, email: text })
        }
      />
      <Pressable style={styles.submitButton} onPress={AddAuthor}>
        <Text style={styles.submitButtonText}>Add Author</Text>
      </Pressable>
    </View>
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
});
