import { createMaterialBottomTabNavigator } from "@react-navigation/material-bottom-tabs";
import Home from "../pages/home";
import Profile from "../pages/profile";
import AntDesign from "react-native-vector-icons/AntDesign";
import { Detail } from "../pages/detail";

const Tab = createMaterialBottomTabNavigator();

export default function MyTabs() {
  return (
    <Tab.Navigator
      initialRouteName="Home"
      activeColor="#40513B"
      inactiveColor="#FFFFFF"
      barStyle={{ backgroundColor: "#609966", height: 70 }}
      screenOptions={({ route }) => ({
        tabBarIcon: ({ color }) => {
          let iconName;
          if (route.name === "Home") {
            iconName = "home";
          } else if (route.name === "Profile") {
            iconName = "user";
          } else if (route.name === "Detail") {
            iconName = "book";
          }
          return <AntDesign name={iconName} color={color} size={26} />;
        },
      })}
    >
      <Tab.Screen name="Home" component={Home} />
      <Tab.Screen name="Detail" component={Detail} />
      <Tab.Screen name="Profile" component={Profile} />
    </Tab.Navigator>
  );
}
