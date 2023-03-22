import { Provider } from "react-redux";
import { createStore } from "redux";
import { StatusBar } from "expo-status-bar";
import {
  StyleSheet,
  Text,
  View,
  FlatList,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import * as React from "react";
import * as Clipboard from "expo-clipboard";
import AntDesign from "react-native-vector-icons/AntDesign";
import * as Font from "expo-font";

const iconCopy = <AntDesign name="copy1" color="white" size={26} />;

const initialState = { copiedText: "" };

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case "SET_COPIED_TEXT":
      return { ...state, copiedText: action.payload };
    default:
      return state;
  }
};

const store = createStore(reducer);

export const Detail = ({ route }) => {
  const category = route.params?.category || "";
  const URL = "https://api.api-ninjas.com/v1/quotes?category=" + category;
  const api = "/0RKpn+Y98+7IEN2wl574A==xbtMEoEGG670twEI";
  const [data, setData] = React.useState([]);
  const [isLoading, setIsLoading] = React.useState(true);
  const copiedText = store.getState().copiedText;

  React.useEffect(() => {
    setIsLoading(true);

    fetch(URL, {
      method: "GET",
      headers: { "X-Api-Key": api },
    })
      .then((response) => {
        if (response.status === 502) {
          alert("Internal Server Error..., Please Choose Another Category!");
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

  const copyToClipboard = async (quote) => {
    await Clipboard.setStringAsync(quote);
    store.dispatch({ type: "SET_COPIED_TEXT", payload: quote });
    alert("Quote copy Success!");
  };

  const [fontLoaded, setFontLoaded] = React.useState(false);

  React.useEffect(() => {
    const loadFont = async () => {
      await Font.loadAsync({
        "monday-feelings": require("../assets/fonts/MondayFeelings.ttf"),
      });
      setFontLoaded(true);
    };
    loadFont();
  }, []);

  if (!fontLoaded) {
    return null;
  }

  if (isLoading) {
    return (
      <View style={styles.container}>
        <Text>Wait A Moment...</Text>
        <Text>We Are Looking The Best For You</Text>
      </View>
    );
  } else if (data.length === 0) {
    return (
      <View style={styles.container}>
        <Text>Category Is Null!</Text>
      </View>
    );
  }

  const renderCard = ({ item }) => {
    return (
      <View style={styles.card}>
        <ScrollView
          contentContainerStyle={{ flexGrow: 1, marginTop: 5 }}
          keyboardShouldPersistTaps="handled"
        >
          <Text style={{ ...styles.quote, fontFamily: "monday-feelings" }}>
            "{item.quote}"
          </Text>
          <Text style={styles.author}>Author : {item.author}</Text>
          <Text style={styles.category}>Category : {item.category}</Text>
          <TouchableOpacity
            style={styles.copy}
            onPress={() =>
              copyToClipboard(
                item.quote +
                  "These quotes are made by someone special, viz " +
                  item.author
              )
            }
          >
            {iconCopy}
          </TouchableOpacity>
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
  copy: {
    backgroundColor: "#609966",
    alignSelf: "flex-end",
    padding: 5,
    borderRadius: 5,
  },
  container: {
    flex: 1,
    backgroundColor: "#EDF1D6",
    justifyContent: "center",
    alignItems: "center",
  },
  card: {
    backgroundColor: "#9DC08B",
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
    fontFamily: "monday-feelings",
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
