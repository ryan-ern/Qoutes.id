import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View, ScrollView } from "react-native";

export default function Profile() {
  return (
    <View style={styles.container}>
      <Text>Hello There!</Text>
      <Text>My Name is Ryan Ernanda</Text>
      <Text>And currently I am studying informatics engineering</Text>
      <Text>My Student Identification Number is 120140154</Text>
      <Text>and this application is still under development</Text>
      <Text>i hope you like it</Text>
      <StatusBar style="dark" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#EDF1D6",
    alignItems: "center",
    justifyContent: "center",
  },
});
