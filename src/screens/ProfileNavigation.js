import React from 'react'
import { createStackNavigator } from '@react-navigation/stack'
import ProfileScreen from './Group&Activity/Profile'
import PersonalInformation from './Group&Activity/PersonalInformation'
import ChildInformation1 from './Group&Activity/ChildrenInformation1'
import ChildrenInformation from './Group&Activity/ChildrenInformation'
import ChangePassword from './Group&Activity/ChangePassword'
import ChildInformation2 from './Group&Activity/Childinformation2'
import ChildrenInformation3 from './Group&Activity/ChildInformation3'
import ChildrenInformation4 from './Group&Activity/ChildrenInformation4'
import Pushnotification from './Group&Activity/Pushnotification'

const Stack = createStackNavigator()
const ProfileNavigation=()=>{
    return(
        <Stack.Navigator screenOptions={{ headerShown: false }}>
            <Stack.Screen name='Profile' component={ProfileScreen} />
            <Stack.Screen name="PersonalInformation" component={PersonalInformation} />
      <Stack.Screen name="ChildrenInformation1" component={ChildInformation1} />
      <Stack.Screen name="ChildrenInformation" component={ChildrenInformation} />
      <Stack.Screen name="ChildInformation2" component={ChildInformation2} />
      <Stack.Screen name="ChildrenInformation3" component={ChildrenInformation3} />
      <Stack.Screen name="ChildrenInformation4" component={ChildrenInformation4} />
      <Stack.Screen name="ChangePassword" component={ChangePassword} />
      <Stack.Screen name="Pushnotification" component={Pushnotification} />
    

        </Stack.Navigator>
    )
}
export default ProfileNavigation