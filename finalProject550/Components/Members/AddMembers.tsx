import React, { useContext, useState } from "react";
import {
  Pressable,
  Text,
  View,
  StyleSheet,
  Alert,
  TextInput,
} from "react-native";
import GlobalContext from "../../Constants/context";
import axios from "axios";

import Imembers from "../../types/IMembers";

export default function AddMembers({ navigation }: any) {
  const { members, setMembers } = useContext(GlobalContext);
  const [newmember, setnewMember] = useState({
    residentID: "",
    firstname: "",
    lastname: "",
    address: "",
    phone: "",
    email: "",
  });

  async function AddMembers() {
    try {
      const uniqueResidentId: string =
        "s" + Math.floor(1000 + Math.random() * 9000);
      const newmembersID: Imembers = {
        ...newmember,
        residentID: uniqueResidentId,
      };
      const duplicate = members.some(
        (member) => member.residentID === uniqueResidentId
      );
      if (duplicate) {
        Alert.alert("Error: Duplicate member ID");
        return;
      }
      const response = await axios.post(
        "http://localhost:5001/members",
        newmembersID
      );
      if (response.status === 201) {
        setMembers([...members, response.data]);
        navigation.goBack();
      }
    } catch (error) {
      console.log("An error has occured");
    }
  }
  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder="First name"
        value={newmember.firstname}
        onChangeText={(text: string) =>
          setnewMember({ ...newmember, firstname: text })
        }
      />
      <TextInput
        style={styles.input}
        placeholder="Last name"
        value={newmember.lastname}
        onChangeText={(text: string) =>
          setnewMember({ ...newmember, lastname: text })
        }
      />
      <TextInput
        style={styles.input}
        placeholder="Address"
        value={newmember.address}
        onChangeText={(text: string) =>
          setnewMember({ ...newmember, address: text })
        }
      />
      <TextInput
        style={styles.input}
        placeholder="Phone"
        value={newmember.phone}
        onChangeText={(text: string) =>
          setnewMember({ ...newmember, phone: text })
        }
      />
      <TextInput
        style={styles.input}
        placeholder="Email"
        value={newmember.email}
        autoCapitalize="none"
        onChangeText={(text: string) =>
          setnewMember({ ...newmember, email: text })
        }
      />
      <Pressable onPress={AddMembers} style={styles.submitButton}>
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
