import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Linking,
  ScrollView,
  StatusBar,
  Button,
  Dimensions,
} from "react-native";
import * as React from "react";
import { obj } from "../database";

const Home = ({ navigation }) => {
  let categoryData = obj;

  const windowWidth = Dimensions.get("window").width;
  const buttonWidth = (windowWidth - 40) / 2 - 10; // 40 is total horizontal margin, 10 is space between buttons

  return (
    <View className="flex-1 pt-4 pb-3">
      <ScrollView
        contentContainerStyle={{ flexGrow: 1 }}
        keyboardShouldPersistTaps="handled"
      >
        {categoryData.map((data, index) => {
          const firstButtonData = categoryData[index * 2];
          const secondButtonData = categoryData[index * 2 + 1];
          console.log("firstButtonData", firstButtonData);
          console.log("secondButtonData", secondButtonData);
          return (
            <View className="items-center py-3" key={index}>
              <View style={styles.buttonContainer}>
                {firstButtonData && (
                  <TouchableOpacity
                    style={[styles.button, { width: buttonWidth }]}
                    onPress={() => {
                      console.log(firstButtonData.category);
                      navigation.navigate("Detail", {
                        category: firstButtonData.category,
                      });
                    }}
                  >
                    <Text style={styles.buttonText}>
                      {firstButtonData.category}
                    </Text>
                  </TouchableOpacity>
                )}
                {secondButtonData && (
                  <TouchableOpacity
                    style={[styles.button, { width: buttonWidth }]}
                    onPress={() => {
                      console.log(secondButtonData.category);
                      navigation.navigate("Detail", {
                        category: secondButtonData.category,
                      });
                    }}
                  >
                    <Text style={styles.buttonText}>
                      {secondButtonData.category}
                    </Text>
                  </TouchableOpacity>
                )}
              </View>
            </View>
          );
        })}
      </ScrollView>
      <StatusBar style="white" />
    </View>
  );
};

const styles = StyleSheet.create({
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginHorizontal: 20,
    marginVertical: 5,
  },
  button: {
    backgroundColor: "purple",
    borderRadius: 10,
    paddingVertical: 15,
    alignItems: "center",
  },
  buttonText: {
    color: "white",
    fontWeight: "bold",
    fontSize: 16,
  },
});

export default Home;
