import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import Home from './Home';

const Tab = createMaterialTopTabNavigator();

export default function TopTab() {
  return (
    <Tab.Navigator>
      <Tab.Screen name="Recommend" component={Home} initialParams={{recommend:true}} />
      <Tab.Screen name="Subscribed" component={Home} initialParams={{recommend:false}}/>
    </Tab.Navigator>
  );
}