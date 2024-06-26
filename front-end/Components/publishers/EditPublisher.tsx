import axios from "axios";
import React, { useContext, useState } from "react";
import {
  Alert,
  Text,
  StyleSheet,
  TextInput,
  Pressable,
  SafeAreaView,
} from "react-native";
import GlobalContext from "../../Constants/context";

export default function EditPublisher({ navigation, route }: any) {
  const { publishers, setPublishers } = useContext(GlobalContext);
  const data = route.params;
  const [updatedPub, setUpdatedPub] = useState(data);

  const updatePublisher = async () => {
    try {
      const response = await axios.put(
        `http://localhost:5001/publishers/${updatedPub.id}`,
        updatedPub
      );
      if (response.status === 200) {
        const index = publishers.findIndex((x) => x.id === updatedPub.id);
        if (index !== -1) {
          const arr = [...publishers];
          arr[index] = response.data;
          setPublishers(arr);
          navigation.goBack();
        }
      }
    } catch (error) {
      Alert.alert("An error has occured");
    }
  };
  return (
    <SafeAreaView style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder="Edit name"
        value={updatedPub.name}
        onChangeText={(text: string) =>
          setUpdatedPub({ ...updatedPub, name: text })
        }
      />
      <TextInput
        style={styles.input}
        placeholder="Edit email"
        value={updatedPub.email}
        onChangeText={(text: string) =>
          setUpdatedPub({ ...updatedPub, email: text })
        }
      />
      <TextInput
        style={styles.input}
        placeholder="Edit phone"
        value={updatedPub.phone}
        onChangeText={(text: string) =>
          setUpdatedPub({ ...updatedPub, phone: text })
        }
      />
      <TextInput
        style={styles.input}
        placeholder="Edit Address"
        value={updatedPub.address}
        onChangeText={(text: string) =>
          setUpdatedPub({ ...updatedPub, address: text })
        }
      />
      <Pressable style={styles.submitButton} onPress={updatePublisher}>
        <Text style={styles.submitButtonText}>Edit Publisher</Text>
      </Pressable>
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
