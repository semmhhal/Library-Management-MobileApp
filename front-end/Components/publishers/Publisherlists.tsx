import React, { useContext, useEffect, useState } from "react";
import {
  SafeAreaView,
  StyleSheet,
  Platform,
  TextInput,
  Text,
  Pressable,
  FlatList,
} from "react-native";
import GlobalContext from "../../Constants/context";
import PublisherHeader from "../Header/PublisherHeader";
import Publisher from "./Publisher";

export default function Publisherlist({ navigation }: any) {
  const { publishers } = useContext(GlobalContext);
  const [displaypublishers, setDisplayPublishers] = useState(publishers);
  const [search, setSearch] = useState("");

  const onSearch = (text: string) => {
    const arr = publishers.filter((x) =>
      x.name.toLowerCase().includes(text.toLowerCase())
    );
    setDisplayPublishers(arr);

    setSearch(text);
  };

  useEffect(() => {
    setDisplayPublishers(publishers);
  }, [publishers]);

  const gotoAddmember = () => {
    navigation.navigate("Add Publisher");
  };
  return (
    <SafeAreaView style={styles.container}>
      <PublisherHeader />
      <TextInput
        style={styles.input}
        value={search}
        onChangeText={(text: string) => onSearch(text)}
        placeholder="Live Search"
      />
      <Pressable style={styles.submitButton} onPress={gotoAddmember}>
        <Text style={styles.submitButtonText}>Add New Publisher</Text>
      </Pressable>
      <FlatList
        data={displaypublishers}
        renderItem={({ item, index }) => (
          <Publisher data={item} index={index} />
        )}
        keyExtractor={(item) => item.name}
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
