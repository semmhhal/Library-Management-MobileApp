import React, { useContext, useState } from "react";
import Iauthors from "../../types/Iauthors";
import {
  View,
  Text,
  TouchableHighlight,
  ScrollView,
  StyleSheet,
  Alert,
} from "react-native";
import axios from "axios";
import GlobalContext from "../../Constants/context";
import { useNavigation } from "@react-navigation/native";
import { SafeAreaView } from "react-native-safe-area-context";
interface AuthorProps {
  data: Iauthors;
  index: number;
}
export default function Author({ data, index }: AuthorProps) {
  const navigation = useNavigation();
  const { authors, setAuthors } = useContext(GlobalContext);

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
                `http://localhost:5001/authors/${data.id}`
              );
              if (response.status === 200) {
                const updatedData = authors.filter((x) => x.id !== data.id);
                setAuthors(updatedData);
                Alert.alert("Success", "Author deleted successfully");
              } else {
                Alert.alert("Error", "Failed to delete the author");
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

  const gotoEditAuthor = () => {
    navigation.navigate("Edit Authors", data);
  };
  return (
    <ScrollView
      style={{ backgroundColor: index % 2 === 0 ? "white" : "#F3F3F7" }}
    >
      <View style={styles.course}>
        <Text style={(styles.faculty, { fontSize: 20 })}>{data.name}</Text>
        <Text style={(styles.faculty, { fontSize: 15 })}>{data.email}</Text>
        <Text style={(styles.faculty, { fontSize: 15 })}>{data.phone}</Text>
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
          onPress={gotoEditAuthor}
        >
          <Text style={styles.buttonText}>Edit</Text>
        </TouchableHighlight>
      </View>
    </ScrollView>
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
