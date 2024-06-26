import React, { useContext } from "react";
import {
  View,
  Text,
  ScrollView,
  SafeAreaView,
  StyleSheet,
  TouchableHighlight,
  Alert,
} from "react-native";
import Ipublishers from "../../types/IPublishers";
import GlobalContext from "../../Constants/context";
import { useNavigation } from "@react-navigation/native";
import axios from "axios";

interface publisherProp {
  data: Ipublishers;
  index: number;
}
export default function Publisher({ data, index }: publisherProp) {
  const { publishers, setPublishers } = useContext(GlobalContext);
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
                `http://localhost:5001/publishers/${data.id}`
              );
              if (response.status === 200) {
                const updatedData = publishers.filter((x) => x.id !== data.id);
                setPublishers(updatedData);

                Alert.alert("Success", "Publisher deleted successfully");
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

  const gotoEdit = () => {
    navigation.navigate("Edit Publisher", data);
  };
  return (
    <SafeAreaView>
      <ScrollView
        style={{ backgroundColor: index % 2 === 0 ? "white" : "#F3F3F7" }}
      >
        <View style={styles.course}>
          <Text style={(styles.faculty, { fontSize: 25 })}>{data.name}</Text>
          <Text style={(styles.faculty, { fontSize: 14 })}>{data.email}</Text>
          <Text style={(styles.faculty, { fontSize: 14 })}>{data.phone}</Text>
          <Text style={(styles.faculty, { fontSize: 14 })}>{data.address}</Text>
        </View>
        <View style={styles.edges}>
          <TouchableHighlight
            style={styles.button}
            underlayColor="#5398DC"
            onPress={onDelete}
          >
            <Text style={styles.buttonText}>Delete</Text>
          </TouchableHighlight>
          <TouchableHighlight style={styles.button} underlayColor="#5398DC">
            <Text style={styles.buttonText} onPress={gotoEdit}>
              Edit
            </Text>
          </TouchableHighlight>
        </View>
      </ScrollView>
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
