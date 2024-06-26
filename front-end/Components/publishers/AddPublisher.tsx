import React, { useContext, useState } from "react";
import { Alert, Pressable, Text, TextInput, StyleSheet } from "react-native";
import GlobalContext from "../../Constants/context";
import axios from "axios";
import { SafeAreaView } from "react-native-safe-area-context";

export default function AddPublisher({ navigation }: any) {
  const { publishers, setPublishers } = useContext(GlobalContext);
  const [newPublisher, setNewPublisher] = useState({
    name: "",
    phone: "",
    email: "",
    address: "",
  });

  const AddPub = async () => {
    try {
      const response = await axios.post(
        "http://localhost:5001/publishers",
        newPublisher
      );
      if (response.status === 201) {
        setPublishers([...publishers, response.data]);
        navigation.goBack();
      }
    } catch (error) {
      Alert.alert("An error occured adding publisher");
    }
  };
  return (
    <SafeAreaView style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder="Enter name"
        value={newPublisher.name}
        onChangeText={(text) =>
          setNewPublisher({ ...newPublisher, name: text })
        }
      />
      <TextInput
        style={styles.input}
        placeholder="Enter email"
        value={newPublisher.email}
        onChangeText={(text) =>
          setNewPublisher({ ...newPublisher, email: text })
        }
      />
      <TextInput
        style={styles.input}
        placeholder="Enter phone"
        value={newPublisher.phone}
        onChangeText={(text) =>
          setNewPublisher({ ...newPublisher, phone: text })
        }
      />
      <TextInput
        style={styles.input}
        placeholder="Enter address"
        value={newPublisher.address}
        onChangeText={(text) =>
          setNewPublisher({ ...newPublisher, address: text })
        }
      />
      <Pressable style={styles.submitButton} onPress={AddPub}>
        <Text style={styles.submitButtonText}>Add Publisher</Text>
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
