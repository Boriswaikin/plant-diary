import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import { Platform, StatusBar } from 'react-native';
import Home from './Home';

const Tab = createMaterialTopTabNavigator();

export default function TopTab() {
  return (
    <Tab.Navigator style={Platform.OS==='android'&&{marginTop: StatusBar.currentHeight}}>
      <Tab.Screen name="Recommend" component={Home} initialParams={{recommend:true}} />
      <Tab.Screen name="Subscribed" component={Home} initialParams={{recommend:false}}/>
    </Tab.Navigator>
  );
}