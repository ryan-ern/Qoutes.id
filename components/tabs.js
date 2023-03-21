import { createMaterialBottomTabNavigator } from "@react-navigation/material-bottom-tabs";
import Home from "../pages/home";
import Profile from "../pages/profile";
import AntDesign from "react-native-vector-icons/AntDesign";

const Tab = createMaterialBottomTabNavigator();

export default function MyTabs() {
  return (
    <Tab.Navigator
      initialRouteName="Home"
      activeColor="#379392"
      inactiveColor="#17301C"
      barStyle={{ backgroundColor: "#744FC6", height: 70 }}
    >
      <Tab.Screen
        name="Home"
        component={Home}
        options={{
          tabBarIcon: ({ color }) => (
            <AntDesign name="home" color={color} size={26} />
          ),
        }}
      />

      <Tab.Screen
        name="Profile"
        component={Profile}
        options={{
          tabBarIcon: ({ color }) => (
            <AntDesign name="profile" color={color} size={26} />
          ),
        }}
      />
    </Tab.Navigator>
  );
}
