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
        {categoryData.map((obj, index) => {
          return (
            <View className="items-center py-3" key={index}>
              <View style={styles.buttonContainer}>
                <TouchableOpacity
                  style={[styles.button, { width: buttonWidth }]}
                  onPress={() =>
                    navigation.navigate("Detail", { category: obj.category })
                  }
                >
                  <Text style={styles.buttonText}>{obj.category}</Text>
                </TouchableOpacity>
                {categoryData[index + 1] && (
                  <TouchableOpacity
                    style={[styles.button, { width: buttonWidth }]}
                    onPress={() =>
                      navigation.navigate("Detail", {
                        category: categoryData[index + 1].category,
                      })
                    }
                  >
                    <Text style={styles.buttonText}>
                      {categoryData[index + 1].category}
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
