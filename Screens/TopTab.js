import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import Home from './Home';

const Tab = createMaterialTopTabNavigator();

export default function TopTab() {
  return (
    <Tab.Navigator>
      <Tab.Screen name="Recommend" component={Home} />
      <Tab.Screen name="Subscribed" component={Home} />
    </Tab.Navigator>
  );
}