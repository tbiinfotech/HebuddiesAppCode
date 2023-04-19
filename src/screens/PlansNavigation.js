import React from 'react'
import { createStackNavigator } from '@react-navigation/stack'
import Match from './Group&Activity/Match'
import Plans from './Group&Activity/Plans'
// import Matchprefrence from './Group&Activity/Matchprefrence'
import Matchpreference from './Group&Activity/Matchprefrence'
const Stack = createStackNavigator()
const PlansNavigation=()=>{
    return(
        <Stack.Navigator screenOptions={{ headerShown: false }}>
            <Stack.Screen name='Match' component={Match} />
            <Stack.Screen name='Matchprefrence' component={Matchpreference} />
            <Stack.Screen name='Plans' component={Plans}/>
        </Stack.Navigator>
    )
}
export default PlansNavigation