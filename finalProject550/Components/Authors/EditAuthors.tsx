import React, { useContext, useState } from "react";
import { Text, StyleSheet, TextInput, View, Pressable } from "react-native";
import GlobalContext from "../../Constants/context";
import axios from "axios";
import { Alert } from "react-native";

export default function EditAuthors({ navigation, route }: any) {
  const { authors, setAuthors } = useContext(GlobalContext);
  const data = route.params;
  const [updatedAuthor, setUpdatedAuthor] = useState(data);

  const updateAuth = async () => {
    try {
      const response = await axios.put(
        `http://localhost:5001/authors/${updatedAuthor.id}`,
        updatedAuthor
      );
      if (response.status === 200) {
        const index = authors.findIndex((x) => x.id === updatedAuthor.id);
        if (index !== -1) {
          const arr = [...authors];
          arr[index] = response.data;
          setAuthors(arr);
          navigation.goBack();
        }
      }
    } catch (error) {
      Alert.alert("Error has occured");
    }
  };
  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder="Name"
        value={updatedAuthor.name}
        onChangeText={(text: string) =>
          setUpdatedAuthor({ ...updatedAuthor, name: text })
        }
      />
      <TextInput
        style={styles.input}
        placeholder="Phone"
        value={updatedAuthor.phone}
        onChangeText={(text: string) =>
          setUpdatedAuthor({ ...updatedAuthor, phone: text })
        }
      />
      <TextInput
        style={styles.input}
        placeholder="Email"
        autoCapitalize="none"
        value={updatedAuthor.email}
        onChangeText={(text: string) =>
          setUpdatedAuthor({ ...updatedAuthor, email: text })
        }
      />
      <Pressable style={styles.submitButton} onPress={updateAuth}>
        <Text style={styles.submitButtonText}>Edit Author</Text>
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
