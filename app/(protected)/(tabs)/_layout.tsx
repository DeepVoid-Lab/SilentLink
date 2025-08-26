import { Ionicons } from '@expo/vector-icons';
import React from "react";
import { Tabs } from 'expo-router';
import { Platform } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

export default function TabLayout() {
  const insets = useSafeAreaInsets();
  
  return (
    <Tabs 
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: '#6366f1', // Modern indigo
        tabBarInactiveTintColor: '#9ca3af', // Subtle gray
        tabBarStyle: {
          backgroundColor: '#ffffff',
          borderTopWidth: 0,
          elevation: 20, // Android shadow
          shadowColor: '#000', // iOS shadow
          shadowOffset: {
            width: 0,
            height: -4,
          },
          shadowOpacity: 0.1,
          shadowRadius: 12,
          height: (Platform.OS === 'ios' ? 80 : 60) + insets.bottom,
          paddingTop: 8,
          paddingBottom: Math.max(insets.bottom, 12),
          paddingLeft: insets.left,
          paddingRight: insets.right,
        },
        tabBarLabelStyle: {
          fontSize: 12,
          fontWeight: '600',
          marginTop: 4,
        },
        tabBarIconStyle: {
          marginTop: 4,
        },
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: 'Home',
          tabBarIcon: ({ color, focused }) => (
            <Ionicons 
              size={24} 
              name={focused ? "home" : "home-outline"} 
              color={color} 
            />
          )
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          title: 'Profile',
          tabBarIcon: ({ color, focused }) => (
            <Ionicons 
              size={24} 
              name={focused ? "person" : "person-outline"} 
              color={color} 
            />
          )
        }}
      />
    </Tabs>
  );
}