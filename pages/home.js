import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  ScrollView,
  StatusBar,
  Dimensions,
} from "react-native";
import * as React from "react";
import { obj } from "../database";

const Home = ({ navigation }) => {
  let categoryData = obj;

  const windowWidth = Dimensions.get("window").width;
  const buttonWidth = (windowWidth - 40) / 2 - 10; // 40 is total horizontal margin, 10 is space between buttons

  return (
    <View
      className="flex-1 pt-4 pb-3"
      style={{
        flex: 1,
        paddingTop: StatusBar.currentHeight,
        backgroundColor: "white",
      }}
    >
      <Text style={styles.title}>
        qoutes.id aims to provide motivation, inspiration, reminders, and much
        more please select a category below
      </Text>
      <ScrollView
        contentContainerStyle={{ flexGrow: 1, marginTop: 5 }}
        keyboardShouldPersistTaps="handled"
      >
        {categoryData.map((data, index) => {
          return (
            <View className="items-center py-3" key={index}>
              <View style={styles.buttonContainer}>
                {categoryData[index * 2] && (
                  <TouchableOpacity
                    style={[styles.button, { width: buttonWidth }]}
                    onPress={() => {
                      console.log(categoryData[index * 2].category);
                      navigation.navigate("Detail", {
                        category: categoryData[index * 2].category,
                      });
                    }}
                  >
                    <Text style={styles.buttonText}>
                      {categoryData[index * 2].category}
                    </Text>
                  </TouchableOpacity>
                )}
                {categoryData[index * 2 + 1] && (
                  <TouchableOpacity
                    style={[styles.button, { width: buttonWidth }]}
                    onPress={() => {
                      console.log(categoryData[index * 2 + 1].category);
                      navigation.navigate("Detail", {
                        category: categoryData[index * 2 + 1].category,
                      });
                    }}
                  >
                    <Text style={styles.buttonText}>
                      {categoryData[index * 2 + 1].category}
                    </Text>
                  </TouchableOpacity>
                )}
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
  title: {
    fontSize: 20,
    fontWeight: "bold",
    textAlign: "center",
    marginVertical: 20,
  },
  buttonContainer: {
    flex: 1,
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
