import { Tabs } from 'expo-router';
import React from 'react';

import Icones from '../../components/ui/IconesComponent';

export default function TabLayout() {
  const size = 24
  const inactive = "#64748b"
  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarStyle: tabBarStyle,
        tabBarShowLabel: false,
      }

      }>
      <Tabs.Screen
        name="index"
        options={{
          title: 'Home',
          tabBarIcon: ({ color, focused }) => {
            if (focused) return <Icones name='home_select' />
            return <Icones name='home' />
          }
        }}
      />
      <Tabs.Screen
        name="explore"
        options={{
          title: 'Explore',
          tabBarIcon: ({ color, focused }) => {
            if (focused) return <Icones name='search_select' />
            return <Icones name="search" />
          }
        }}
      />
      <Tabs.Screen
        name="note"
        options={{
          headerShown: false,
          tabBarIcon: ({ color, focused }) => {
            if (focused) return <Icones name='note_select' />
            return <Icones name='note' />
          }
        }}
      />
      <Tabs.Screen
        name="setting"
        options={{
          headerShown: false,
          tabBarIcon: ({ color, focused }) => {
            if (focused) return <Icones name='setting_select' />
            return <Icones name='setting' />
          }
        }}
      />
    </Tabs>
  );
}


const tabBarStyle = {
  height: 60,
  backgroundColor: '#ffffff',
  borderTopWidth: 1,
  borderTopColor: '#efefef',
  paddingBottom: 5,
  paddingTop: 5,
  shadowColor: '#000',
  shadowOffset: {
    width: 0,
    height: 0,
  },
  shadowOpacity: 0.1,
  shadowRadius: 2,
  elevation: 0,
};
