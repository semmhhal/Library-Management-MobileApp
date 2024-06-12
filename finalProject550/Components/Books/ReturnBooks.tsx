import React, { useContext, useState } from "react";
import { SafeAreaView, Text, Pressable, StyleSheet, Alert } from "react-native";
import axios from "axios";
import Itransactions from "../../types/ITransactions";
import { Picker } from "@react-native-picker/picker";
import GlobalContext from "../../Constants/context";
import { formatDate, today, twoWeeksBefore } from "../../Constants/Date";

export default function ReturnBooks({ navigation, route }: any) {
  const data = route.params;
  const { transactions, setTransactions, members, catalogs, setCatalogs } =
    useContext(GlobalContext);
  const [selectMember, setselectMember] = useState("");

  const [newTransaction, setNewTransaction] = useState({
    bookId: data.id,
    memberId: "",
    borrowedDate: "",
    returnedDate: formatDate(today),
  });

  const handleMemberChange = (memberId: string) => {
    const existingTransaction = transactions.find((transaction) => {
      return (
        transaction.memberId === memberId &&
        transaction.bookId === data.id &&
        transaction.returnedDate === ""
      );
    });
    if (existingTransaction) {
      setNewTransaction((prevState) => ({
        ...prevState,
        memberId: memberId,
        borrowedDate: existingTransaction.borrowedDate,
      }));
    } else {
      setNewTransaction((prevState) => ({
        ...prevState,
        memberId: memberId,
        borrowedDate: formatDate(twoWeeksBefore),
      }));
    }
  };
  const hasMemberBorrowedBook = (memberId: string, bookId: string) => {
    return transactions.some(
      (transaction) =>
        transaction.memberId === memberId &&
        transaction.bookId === bookId &&
        !transaction.returnedDate
    );
  };
  async function Return_Books() {
    if (
      !hasMemberBorrowedBook(newTransaction.memberId, newTransaction.bookId)
    ) {
      Alert.alert("The selected member has not borrowed this book.");
      return;
    }
    try {
      const response = await axios.post(
        "http://localhost:5001/transactions",
        newTransaction
      );
      if (response.status === 201) {
        setTransactions([...transactions, response.data]);
        const catalog = catalogs.find(
          (x) => x.bookId === newTransaction.bookId
        );
        if (catalog) {
          const updatedCat = {
            ...catalog,
            availableCopies: catalog.availableCopies + 1,
          };
          const catalogResponse = await axios.put(
            `http://localhost:5001/catalogs/${catalog.id}`,
            updatedCat
          );
          if (catalogResponse.status === 200) {
            const updatedCatalogs = catalogs.map((cat) =>
              cat.id === catalog.id ? updatedCat : cat
            );
            setCatalogs(updatedCatalogs);
          }
        }
        Alert.alert("Book returned successfully");
        navigation.goBack();
      }
    } catch (error) {
      Alert.alert("An error has occured");
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
      <Pressable style={style.submitButton} onPress={Return_Books}>
        <Text style={style.submitButtonText}>Return Book</Text>
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
