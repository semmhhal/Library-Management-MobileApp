import React, { useContext } from "react";
import {
  View,
  TouchableHighlight,
  Text,
  StyleSheet,
  Alert,
  SafeAreaView,
} from "react-native";
import Imembers from "../../types/IMembers";
import GlobalContext from "../../Constants/context";
import axios from "axios";
import { useNavigation } from "@react-navigation/native";

interface memberProps {
  data: Imembers;
  index: number;
}
export default function Member({ data, index }: memberProps) {
  const { members, setMembers } = useContext(GlobalContext);
  const navigation = useNavigation();
  async function onDelete() {
    Alert.alert(
      "Confirmation",
      "Do you want to delete this course?",
      [
        {
          text: "Cancel",
          style: "cancel",
        },
        {
          text: "Delete",
          onPress: async () => {
            try {
              const response = await axios.delete(
                `http://localhost:5001/members/${data.id}`
              );
              if (response.status === 200) {
                const updatedData = members.filter((x) => x.id !== data.id);
                setMembers(updatedData);
                Alert.alert("Success", "Member deleted successfully");
              }
            } catch (error) {
              console.log("Error deleting data");
            }
          },
        },
      ],
      { cancelable: false }
    );
  }

  const gotoeditmember = () => {
    navigation.navigate("Edit Members", data);
  };
  return (
    <SafeAreaView
      style={{ backgroundColor: index % 2 === 0 ? "white" : "#F3F3F7" }}
    >
      <View style={styles.course}>
        <Text style={(styles.faculty, { fontSize: 20 })}>
          {data.firstname} {data.lastname}
        </Text>
        <Text style={(styles.faculty, { fontSize: 15 })}>{data.email}</Text>
        <Text style={(styles.faculty, { fontSize: 15 })}>{data.phone}</Text>
        <Text style={(styles.faculty, { fontSize: 15 })}>{data.address}</Text>
      </View>

      <View style={styles.edges}>
        <TouchableHighlight
          style={styles.button}
          underlayColor="#5398DC"
          onPress={onDelete}
        >
          <Text style={styles.buttonText}>Delete</Text>
        </TouchableHighlight>
        <TouchableHighlight
          style={styles.button}
          underlayColor="#5398DC"
          onPress={gotoeditmember}
        >
          <Text style={styles.buttonText}>Edit</Text>
        </TouchableHighlight>
      </View>
    </SafeAreaView>
  );
}
const styles = StyleSheet.create({
  row: {
    flexDirection: "row",
    padding: 20,
    borderBottomWidth: 1,
    borderColor: "#ddd",
  },
  edges: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    padding: 5,
    minWidth: 50,
  },
  course: {
    flexDirection: "column",
    flex: 8,
  },
  faculty: {
    color: "grey",
  },
  button: {
    borderWidth: 1,
    borderColor: "#0066CC",
    borderRadius: 14,
    paddingHorizontal: 10,
    paddingVertical: 3,
    backgroundColor: "#fff",
  },
  buttonText: {
    color: "#0066CC",
    fontSize: 12,
    textAlign: "center",
  },
  info: {
    marginHorizontal: 40,
    marginVertical: 10,
    padding: 10,
    backgroundColor: "#fff",
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 4,
  },
});
