import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import  Header  from "../components/Header";
import HomeScreen from '../lostfound/screens/HomeScreen';
import LostScreen from '../lostfound/screens/LostScreen';
import ProfileScreen from '../auth/screens/ProfileScreen';
import FoundScreen from '../lostfound/screens/FoundScreen';

const Tab = createBottomTabNavigator();

export default function TabNavigator() {
  return (
    <Tab.Navigator screenOptions={{ header: () => <Header />, headerShown: false }}>
      <Tab.Screen name="Home" component={HomeScreen} />
      <Tab.Screen name="Lost" component={LostScreen} />
      <Tab.Screen name="Found" component={FoundScreen} />
      <Tab.Screen name="Profile" component={ProfileScreen} />
    </Tab.Navigator>
  );
}
