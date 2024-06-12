import React, { useContext, useState } from "react";
import { SafeAreaView, Text, Pressable, StyleSheet, Alert } from "react-native";
import GlobalContext from "../../Constants/context";
import { Picker } from "@react-native-picker/picker";
import axios from "axios";
import Itransactions from "../../types/ITransactions";
import { formatDate, today, twoWeeksLater } from "../../Constants/Date";

export default function BorrowBooks({ navigation, route }: any) {
  const data = route.params;
  const { transactions, setTransactions, members, catalogs, setCatalogs } =
    useContext(GlobalContext);

  const [newTransaction, setNewTransaction] = useState({
    bookId: data.id,
    memberId: "",
    borrowedDate: formatDate(today),
    returnedDate: "",
  });

  const handleMemberChange = (memberId: string) => {
    setNewTransaction((prevState) => ({ ...prevState, memberId }));
  };

  async function addTransaction() {
    try {
      const response = await axios.post(
        "http://localhost:5001/transactions",
        newTransaction
      );

      if (response.status === 201) {
        setTransactions([...transactions, response.data]);
        const catalog = catalogs.find(
          (cat) => cat.bookId === newTransaction.bookId
        );
        if (!catalog) {
          Alert.alert("Catalog entry not found for this book");
          return;
        }

        if (catalog.availableCopies <= 0) {
          Alert.alert("No available copies to borrow");
          return;
        }
        if (catalog && catalog.availableCopies > 0) {
          const updatedCatalog = {
            ...catalog,
            availableCopies: catalog.availableCopies - 1,
          };
          const catalogRes = await axios.put(
            `http://localhost:5001/catalogs/${catalog.id}`,
            updatedCatalog
          );
          if (catalogRes.status === 200) {
            const updatedCatalogs = catalogs.map((cat) =>
              cat.id === catalog.id ? updatedCatalog : cat
            );
            setCatalogs(updatedCatalogs);
          }
        }

        Alert.alert("Book borrowed successfully");
        navigation.goBack();
      } else {
        Alert.alert("An error occurred");
      }
    } catch (error) {
      Alert.alert("An error has occurred");
    }
  }

  return (
    <SafeAreaView>
      <Picker
        selectedValue={newTransaction.memberId}
        onValueChange={handleMemberChange}
      >
        <Picker.Item label="Select a member" value="" />
        {members.map((member) => (
          <Picker.Item
            label={`${member.firstname} ${member.lastname}`}
            value={member.id}
            key={member.id}
          />
        ))}
      </Picker>
      <Pressable style={style.submitButton} onPress={addTransaction}>
        <Text style={style.submitButtonText}>Borrow Book</Text>
      </Pressable>
    </SafeAreaView>
  );
}

const style = StyleSheet.create({
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
