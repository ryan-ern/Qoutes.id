import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Linking,
  ScrollView,
  StatusBar,
} from "react-native";
import * as React from "react";
import Detail from "./detail";
import { obj } from "../database";

const Home = () => {
  let storingLink = obj;
  // const [link, setLink] = React.useState("");

  return (
    <View className="flex-1 pt-4 pb-3">
      <ScrollView
        contentContainerStyle={{ flexGrow: 1 }}
        keyboardShouldPersistTaps="handled"
      >
        {storingLink.map((obj) => {
          return (
            <View className="items-center py-3">
              <View className="flex-row justify-around items-center bg-violet-200 w-10/12 rounded-xl">
                <TouchableOpacity onPress={() => Linking.openURL(obj.category)}>
                  <Detail linked={obj.category} />
                </TouchableOpacity>
              </View>
            </View>
          );
        })}
      </ScrollView>
      <StatusBar style="dark" />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    justifyContent: "center",
    alignItems: "center",
  },
});

export default Home;
