import React from "react";
import { View, Image, StyleSheet, Platform } from "react-native";

import HeaderStyles from "../../styles/HeaderStyles";

function AuthorHeader() {
  return (
    <View
      style={
        (Platform.OS === "ios" ? HeaderStyles.ios : HeaderStyles.android,
        { justifyContent: "center", alignItems: "center" })
      }
    >
      <Image style={styles.image} source={require("../images/author.jpeg")} />
    </View>
  );
}

const styles = StyleSheet.create({
  image: {
    width: 150,
    height: 150,
  },
  text: {
    fontSize: 23,
    padding: 20,
  },
});
export default AuthorHeader;
