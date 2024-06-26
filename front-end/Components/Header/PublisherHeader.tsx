import React from "react";
import { View, Image, StyleSheet, Platform } from "react-native";

import HeaderStyles from "../../styles/HeaderStyles";

function PublisherHeader() {
  return (
    <View
      style={
        (Platform.OS === "ios" ? HeaderStyles.ios : HeaderStyles.android,
        { justifyContent: "center", alignItems: "center" })
      }
    >
      <Image style={styles.image} source={require("../images/Printer.webp")} />
    </View>
  );
}

const styles = StyleSheet.create({
  image: {
    width: 100,
    height: 100,
  },
  text: {
    fontSize: 23,
    padding: 20,
  },
});
export default PublisherHeader;
