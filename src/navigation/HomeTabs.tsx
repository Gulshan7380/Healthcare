import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Icon from 'react-native-vector-icons/Ionicons';
import MaterialIcon from 'react-native-vector-icons/MaterialCommunityIcons';
import { Theme } from '../constants/theme';
import { NearbyPharmacyTab } from '../screens/home/NearbyPharmacyTab';
import { ReminderTab } from '../screens/home/ReminderTab';

const Tab = createBottomTabNavigator();

const HomeIcon = ({ color, size }: { color: string; size: number }) => (
  <Icon name="home" size={size} color={color} />
);

const ReminderIcon = ({ color, size }: { color: string; size: number }) => (
  <MaterialIcon name="message-processing" size={size} color={color} />
);

export const HomeTabs: React.FC = () => {
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: Theme.colors.primary,
        tabBarInactiveTintColor: Theme.colors.gray,
        tabBarShowLabel: false,
        tabBarStyle: {
          backgroundColor: Theme.colors.lightGray,
          height: 70,
          paddingBottom: 10,
          borderTopStartRadius: 15,
          borderTopEndRadius: 15,
        },
      }}
    >
      <Tab.Screen
        name="NearbyPharmacy"
        component={NearbyPharmacyTab}
        options={{
          tabBarIcon: HomeIcon,
        }}
      />
      <Tab.Screen
        name="Reminder"
        component={ReminderTab}
        options={{
          tabBarIcon: ReminderIcon,
        }}
      />
    </Tab.Navigator>
  );
};
