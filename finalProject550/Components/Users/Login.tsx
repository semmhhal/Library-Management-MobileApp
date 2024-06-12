import axios from "axios";
import { useState } from "react";
import {
  Alert,
  StyleSheet,
  Pressable,
  TextInput,
  SafeAreaView,
  Text,
} from "react-native";
import LoginHeader from "../Header/LoginHeader";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { LOCAL_STORAGE } from "../../Constants/LocalSorage";

interface loginProps {
  setLoggedin: (loggedin: boolean) => void;
}
export default function Login({ setLoggedin }: loginProps) {
  const [email, setEmail] = useState("");

  const onLogin = async () => {
    try {
      if (email.trim() === "") {
        return Alert.alert("Please Enter email");
      }
      const response = await axios.get(
        `http://localhost:5001/users?email=${email}`
      );
      if (response.status === 200 && response.data.length > 0) {
        AsyncStorage.setItem(LOCAL_STORAGE, JSON.stringify({ loggedin: true }));
        setLoggedin(true);
      } else {
        Alert.alert("Invalid email. Please try again.");
      }
    } catch (error) {
      Alert.alert("Oops couldnt log in please try again");
    }
  };
  return (
    <SafeAreaView style={style.container}>
      <Text style={style.heading}>Welcome to Kairos Library</Text>
      <LoginHeader />
      <TextInput
        style={style.input}
        placeholder="Email"
        value={email}
        onChangeText={(text: string) => setEmail(text)}
        autoCapitalize="none"
      />
      <Pressable style={style.submitButton} onPress={onLogin}>
        <Text style={style.submitButtonText}>Log in</Text>
      </Pressable>
    </SafeAreaView>
  );
}

const style = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    paddingTop: 40,
    justifyContent: "center",
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
  heading: {
    fontSize: 30,
    justifyContent: "center",
    textAlign: "center",
    fontWeight: "200",
  },
});
