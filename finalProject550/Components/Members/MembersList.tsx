import React, { useContext, useEffect, useState } from "react";
import {
  SafeAreaView,
  Platform,
  TextInput,
  StyleSheet,
  FlatList,
  Pressable,
  Text,
} from "react-native";
import GlobalContext from "../../Constants/context";
import MemberHeader from "../Header/MemberHeader";
import Member from "./Member";
export default function MembersList({ navigation }: any) {
  const { members } = useContext(GlobalContext);
  const [displayMembers, setdisplayMembers] = useState(members);
  const [search, setSearch] = useState("");

  const onSearch = (text: string) => {
    const arr = members.filter((x) =>
      x.firstname.toLowerCase().includes(text.toLowerCase())
    );
    setdisplayMembers(arr);
    setSearch(text);
  };

  useEffect(() => {
    setdisplayMembers(members);
  }, [members]);

  const gotoAddmember = () => {
    navigation.navigate("Add Members");
  };
  return (
    <SafeAreaView style={styles.container}>
      <MemberHeader />
      <TextInput
        style={styles.input}
        value={search}
        onChangeText={onSearch}
        placeholder="Live Search"
      />
      <Pressable style={styles.submitButton} onPress={gotoAddmember}>
        <Text style={styles.submitButtonText}>Add New Member</Text>
      </Pressable>
      <FlatList
        data={displayMembers}
        renderItem={({ item, index }) => <Member data={item} index={index} />}
        keyExtractor={(item) => item.email}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFFFFF",
    paddingTop: Platform.OS === "ios" ? 50 : 0,
    paddingBottom: 200,
  },
  input: {
    padding: 10,
    paddingHorizontal: 20,
    fontSize: 16,
    color: "#444",
    borderBottomWidth: 1,
    borderColor: "#ddd",
    backgroundColor: "#F5F5F5",
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
