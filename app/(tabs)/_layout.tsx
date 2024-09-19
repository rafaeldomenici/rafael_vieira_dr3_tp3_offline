import { Tabs, Redirect } from 'expo-router';
import React from 'react';

import { TabBarIcon } from '@/components/navigation/TabBarIcon';


import { useSession } from '../ctx';
import { Text } from 'react-native';

export default function TabLayout() {
  const {session, isLoading} = useSession();

  if(isLoading) {
    return <Text>Carregando...</Text>
  }
  if(!session) {
    return <Redirect href="/login" />
  }
  
  


  return (
    <Tabs
      screenOptions={{
        
        headerShown: false,
      }}>
      <Tabs.Screen
        name="index"
        options={{
          title: 'Home',
          tabBarIcon: ({ color, focused }) => (
            <TabBarIcon name={focused ? 'home' : 'home-outline'} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="dashboard"
        options={{
          title: 'Dashboard',
          tabBarIcon: ({ color, focused }) => (
            <TabBarIcon name={focused ? 'analytics' : 'analytics-outline'} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          title: 'Profile',
          tabBarIcon: ({ color, focused }) => (
            <TabBarIcon name={focused ? 'people' : 'people-outline'} color={color} />
          ),
        }}
      />
    </Tabs>
  );
}
