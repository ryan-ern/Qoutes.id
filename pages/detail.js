import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View, FlatList } from "react-native";
import * as React from "react";
// import { Home } from "./home";

export const Detail = ({ route }) => {
  const { category } = route;
  const URL = "https://api.api-ninjas.com/v1/quotes=" + category;
  const api = "/0RKpn+Y98+7IEN2wl574A==xbtMEoEGG670twEI";
  const [data, setData] = React.useState([]);

  React.useEffect(() => {
    fetch(URL, {
      method: "GET",
      headers: { "X-Api-Key": api },
    })
      .then((response) => response.json())
      .then((data) => {
        setData(data);
        console.log(data);
      })
      .catch((error) => {
        alert("Error -> " + JSON.stringify(error));
        console.error(error);
      });
  }, []);

  const renderCard = ({ item }) => {
    return (
      <View style={styles.card}>
        <Text style={styles.quote}>"{item.quote}"</Text>
        <Text style={styles.author}>Author : {item.author}</Text>
        <Text style={styles.category}>Category : {item.category}</Text>
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <FlatList
        contentContainerStyle={styles.flatListContent}
        horizontal={true}
        data={data}
        renderItem={renderCard}
        keyExtractor={(item) => item}
        showsHorizontalScrollIndicator={false}
      />
      <StatusBar style="auto" />
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
  card: {
    backgroundColor: "#fff",
    borderRadius: 10,
    padding: 20,
    margin: 10,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.23,
    shadowRadius: 2.62,
    elevation: 4,
  },
  quote: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 10,
  },
  author: {
    fontSize: 16,
    fontWeight: "500",
    marginBottom: 5,
  },
  category: {
    fontSize: 14,
    fontStyle: "italic",
  },
  flatListContent: {
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
  },
});
