import { StatusBar } from "expo-status-bar";
import { StyleSheet, Alert } from "react-native";
import axios from "axios";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import HomeBooks from "./Components/Books/Homebooks";
import HomeAuthors from "./Components/Authors/HomeAuthors";
import HomeMembers from "./Components/Members/HomeMembers";
import { useEffect, useState } from "react";
import GlobalContext from "./Constants/context";
import Login from "./Components/Users/Login";
import Ibooks from "./types/IBooks";
import Iauthors from "./types/IAuthors";
import Imembers from "./types/IMembers";
import Ipublishers from "./types/IPublishers";
import Itransactions from "./types/ITransactions";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { LOCAL_STORAGE } from "./Constants/LocalSorage";
import Icatalogs from "./types/Icatalogs";
import HomePublishers from "./Components/publishers/HomePublishers";
const { Navigator, Screen } = createBottomTabNavigator();

interface loginProps {
  setLoggedin: (loggedin: boolean) => void;
}
function AppContent({ setLoggedin }: loginProps) {
  const [books, setBooks] = useState<Ibooks[]>([]);
  const [authors, setAuthors] = useState<Iauthors[]>([]);
  const [members, setMembers] = useState<Imembers[]>([]);
  const [publishers, setPublishers] = useState<Ipublishers[]>([]);
  const [transactions, setTransactions] = useState<Itransactions[]>([]);
  const [catalogs, setCatalogs] = useState<Icatalogs[]>([]);

  useEffect(() => {
    async function loadBookData() {
      try {
        const response = await axios.get("http://localhost:5001/books");
        if (response.status === 200) {
          setBooks(response.data);
        }
      } catch (error) {
        Alert.alert("An Error has occured loading data");
      }
    }
    loadBookData();
  }, []);

  useEffect(() => {
    async function loadAuthorData() {
      try {
        const response = await axios.get("http://localhost:5001/authors");
        if (response.status === 200) setAuthors(response.data);
      } catch (error) {
        Alert.alert("An Error has occured loading data");
      }
    }
    loadAuthorData();
  }, []);

  useEffect(() => {
    async function loadMemberData() {
      try {
        const response = await axios.get("http://localhost:5001/members");
        if (response.status === 200) {
          setMembers(response.data);
        }
      } catch (error) {
        Alert.alert("An Error has occured loading data");
      }
    }
    loadMemberData();
  }, []);

  useEffect(() => {
    async function loadPublisherData() {
      try {
        const response = await axios.get("http://localhost:5001/publishers");
        if (response.status === 200) {
          setPublishers(response.data);
        }
      } catch (error) {
        Alert.alert("An Error has occured loading data");
      }
    }
    loadPublisherData();
  }, []);

  useEffect(() => {
    async function loadTransactionData() {
      try {
        const response = await axios.get("http://localhost:5001/transactions");
        if (response.status === 200) {
          setTransactions(response.data);
        }
      } catch (error) {
        Alert.alert("An Error has occured loading data");
      }
    }
    loadTransactionData();
  }, []);

  useEffect(() => {
    async function loadCatalogData() {
      try {
        const response = await axios.get("http://localhost:5001/catalogs");
        if (response.status === 200) {
          setCatalogs(response.data);
        }
      } catch (error) {
        Alert.alert("An Error has occured loading data");
      }
    }
    loadCatalogData();
  }, []);
  return (
    <GlobalContext.Provider
      value={{
        books,
        setBooks,
        authors,
        setAuthors,
        members,
        setMembers,
        publishers,
        setPublishers,
        transactions,
        setTransactions,
        setLoggedin,
        catalogs,
        setCatalogs,
      }}
    >
      <NavigationContainer>
        <Navigator>
          <Screen
            name="Kairos Library"
            component={HomeBooks}
            options={{
              tabBarIcon: ({ color }) => (
                <MaterialCommunityIcons name="book" color={color} size={26} />
              ),
            }}
          />
          <Screen
            name="Authors"
            component={HomeAuthors}
            options={{
              tabBarIcon: ({ color }) => (
                <MaterialCommunityIcons name="pen" color={color} size={26} />
              ),
            }}
          />
          <Screen
            name="Members"
            component={HomeMembers}
            options={{
              tabBarIcon: ({ color }) => (
                <MaterialCommunityIcons
                  name="account"
                  color={color}
                  size={26}
                />
              ),
            }}
          />
          <Screen
            name="Publishers"
            component={HomePublishers}
            options={{
              tabBarIcon: ({ color }) => (
                <MaterialCommunityIcons
                  name="printer"
                  color={color}
                  size={26}
                />
              ),
            }}
          />
        </Navigator>
      </NavigationContainer>
    </GlobalContext.Provider>
  );
}

export default function App() {
  const [loggedin, setLoggedin] = useState(false);

  useEffect(() => {
    const checkLogin = async () => {
      const loginState = await AsyncStorage.getItem(LOCAL_STORAGE);
      if (loginState) {
        const { loggedin } = JSON.parse(loginState);
        if (loggedin) {
          setLoggedin(true);
        }
      }
    };
    checkLogin();
  }, []);

  if (!loggedin) {
    return <Login setLoggedin={setLoggedin} />;
  }

  return <AppContent setLoggedin={setLoggedin} />;
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
