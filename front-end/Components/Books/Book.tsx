import React, { useContext, useState, useEffect } from "react";
import {
  ScrollView,
  View,
  StyleSheet,
  Text,
  TouchableHighlight,
  Alert,
  SafeAreaView,
} from "react-native";
import Ibooks from "../../types/IBooks";
import Icatalogs from "../../types/Icatalogs";
import GlobalContext from "../../Constants/context";
import axios from "axios";
import { useNavigation } from "@react-navigation/native";

interface BookProps {
  data: Ibooks;
  index: number;
}

export default function Book({ data, index }: BookProps) {
  const navigation = useNavigation();
  const { books, setBooks, catalogs } = useContext(GlobalContext);
  const [currentCatalog, setCurrentCatalog] = useState<Icatalogs[]>([]);

  useEffect(() => {
    findCatalogs();
  }, [catalogs]);

  async function onDelete() {
    Alert.alert(
      "Confirmation",
      "Do you want to delete this book?",
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
                `http://localhost:5001/books/${data.id}`
              );
              if (response.status === 200) {
                const updatedBooks = books.filter((x) => x.id !== data.id);
                setBooks(updatedBooks);
                Alert.alert("Success", "Book deleted successfully");
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

  const findCatalogs = () => {
    const arr = catalogs.filter((x) => x.bookId === data.id);
    setCurrentCatalog(arr);
  };

  const navigatetoEdit = () => {
    navigation.navigate("Edit Book", data);
  };

  const navigatetoborrowbook = () => {
    navigation.navigate("Borrow Book", data);
  };
  const navigatetoreturn = () => {
    navigation.navigate("Return Book", data);
  };
  return (
    <SafeAreaView
      style={{ backgroundColor: index % 2 === 0 ? "white" : "#F3F3F7" }}
    >
      <View style={styles.course}>
        <Text style={{ fontSize: 20 }}>{data.title}</Text>
        <Text style={{ fontSize: 15 }}>
          {data.genre} - {data.category}
        </Text>
        {currentCatalog.length > 0 ? (
          currentCatalog.map((catalog) => (
            <View key={catalog.id} style={styles.catalogInfo}>
              <Text style={styles.faculty}>
                Available Copies: {catalog.availableCopies}
              </Text>
            </View>
          ))
        ) : (
          <Text style={styles.faculty}>No catalog data available</Text>
        )}
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
          onPress={navigatetoEdit}
        >
          <Text style={styles.buttonText}>Edit</Text>
        </TouchableHighlight>
        <TouchableHighlight
          style={styles.button}
          underlayColor="#5398DC"
          onPress={navigatetoborrowbook}
        >
          <Text style={styles.buttonText}>Borrow Book</Text>
        </TouchableHighlight>
        <TouchableHighlight
          style={styles.button}
          underlayColor="#5398DC"
          onPress={navigatetoreturn}
        >
          <Text style={styles.buttonText}>Return Book</Text>
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
  catalogInfo: {
    marginVertical: 5,
  },
  button: {
    borderWidth: 1,
    borderColor: "#0066CC",
    borderRadius: 14,
    paddingHorizontal: 10,
    paddingVertical: 3,
    backgroundColor: "#fff",
    marginVertical: 5,
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
