import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View, FlatList, ScrollView } from "react-native";
import * as React from "react";

export const Detail = ({ route }) => {
  const category = route.params?.category || ""; // gunakan optional chaining (?.) dan nullish coalescing (||) operator
  const URL = "https://api.api-ninjas.com/v1/quotes?category=" + category;
  const api = "/0RKpn+Y98+7IEN2wl574A==xbtMEoEGG670twEI";
  const [data, setData] = React.useState([]);
  const [isLoading, setIsLoading] = React.useState(true);

  React.useEffect(() => {
    setIsLoading(true);

    fetch(URL, {
      method: "GET",
      headers: { "X-Api-Key": api },
    })
      .then((response) => {
        if (response.status === 502) {
          alert("Terjadi kesalahan pada server");
        }
        return response.json();
      })
      .then((data) => {
        setData(data);
        console.log(data);
      })
      .catch((error) => {
        alert("Error: " + error.message);
        console.error(error);
      })
      .finally(() => setIsLoading(false));
  }, [category]);

  if (isLoading) {
    return (
      <View style={styles.container}>
        <Text>Tunggu sebentar...</Text>
      </View>
    );
  } else if (data.length === 0) {
    return (
      <View style={styles.container}>
        <Text>Kategori masih kosong.</Text>
      </View>
    );
  }

  const renderCard = ({ item }) => {
    return (
      <View className="flex-1 pt-4 pb-3" style={styles.card}>
        <ScrollView
          contentContainerStyle={{ flexGrow: 1, marginTop: 5 }}
          keyboardShouldPersistTaps="handled"
        >
          <Text style={styles.quote}>
            "{item.quote}"{item.message}
          </Text>
          <Text style={styles.author}>Author : {item.author}</Text>
          <Text style={styles.category}>Category : {item.category}</Text>
        </ScrollView>
      </View>
    );
  };

  return (
    <View style={styles.container} className="flex-1 pt-4 pb-3">
      <ScrollView
        contentContainerStyle={{ flexGrow: 1, marginTop: 5 }}
        keyboardShouldPersistTaps="handled"
      >
        <FlatList
          contentContainerStyle={styles.flatListContent}
          horizontal={true}
          data={data}
          renderItem={renderCard}
          keyExtractor={(item) => item}
          showsHorizontalScrollIndicator={false}
        />
        <StatusBar style="dark" />
      </ScrollView>
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
