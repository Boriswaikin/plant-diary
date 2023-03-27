import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import { useEffect } from 'react';
import Follow from './Follow';

const Tab = createMaterialTopTabNavigator();

export default function FollowTab({ navigation, route }) {
    useEffect(()=>{
        navigation.setOptions({
            title: route.params.name,
        })
    },[])
    return (
        <Tab.Navigator>
        <Tab.Screen name="Follower" component={Follow} initialParams={{ followState: true, id:route.params.id }} />
        <Tab.Screen name="Following" component={Follow} initialParams={{ followState: false, id:route.params.id }} />
        </Tab.Navigator>
    );
}