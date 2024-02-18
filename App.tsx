import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import HomeScreen from './screens/HomeScreen';
import CampaignDetail from './screens/CampaignDetail';

const Tab = createBottomTabNavigator();

const App = () => {
  return (
    <NavigationContainer >
      <Tab.Navigator 
        screenOptions={{ headerShown: false, tabBarShowLabel: false, tabBarStyle:{display: 'none'}}}>
        <Tab.Screen
          name="Home"
          component={HomeScreen}
        />
         <Tab.Screen
          name="CampaignDetail"
          component={CampaignDetail}
          options={({ route }) => ({ title: route?.params?.SeoName })} 
        />
        {/* Add more screens here if needed */}
      </Tab.Navigator>
    </NavigationContainer>
  );
};

export default App;
