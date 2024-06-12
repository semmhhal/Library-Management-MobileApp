import React, { useContext, useState } from "react";
import {
  Text,
  Alert,
  StyleSheet,
  View,
  TextInput,
  Pressable,
  SafeAreaView,
} from "react-native";
import GlobalContext from "../../Constants/context";
import axios from "axios";

export default function EditMembers({ navigation, route }: any) {
  const { members, setMembers } = useContext(GlobalContext);
  const data = route.params;
  const [updatedmembers, setUpdatedMembers] = useState(data);

  const updateMembers = async () => {
    try {
      const response = await axios.put(
        `http://localhost:5001/members/${updatedmembers.id}`,
        updatedmembers
      );
      if (response.status === 200) {
        const index = members.findIndex((x) => x.id === updatedmembers.id);
        if (index !== -1) {
          const arr = [...members];
          arr[index] = response.data;
          setMembers(arr);
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
        placeholder="First name"
        value={updatedmembers.firstname}
        onChangeText={(text: string) =>
          setUpdatedMembers({ ...updatedmembers, firstname: text })
        }
      />
      <TextInput
        style={styles.input}
        placeholder="Last name"
        value={updatedmembers.lastname}
        onChangeText={(text: string) =>
          setUpdatedMembers({ ...updatedmembers, lastname: text })
        }
      />
      <TextInput
        style={styles.input}
        placeholder="Address"
        value={updatedmembers.address}
        onChangeText={(text: string) =>
          setUpdatedMembers({ ...updatedmembers, address: text })
        }
      />
      <TextInput
        style={styles.input}
        placeholder="Phone"
        value={updatedmembers.phone}
        onChangeText={(text: string) =>
          setUpdatedMembers({ ...updatedmembers, phone: text })
        }
      />
      <TextInput
        style={styles.input}
        placeholder="Email"
        value={updatedmembers.email}
        autoCapitalize="none"
        onChangeText={(text: string) =>
          setUpdatedMembers({ ...updatedmembers, email: text })
        }
      />
      <Pressable onPress={updateMembers} style={styles.submitButton}>
        <Text style={styles.submitButtonText}>Add Member</Text>
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
