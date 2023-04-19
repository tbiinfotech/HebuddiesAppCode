import React from 'react'
import { createStackNavigator } from '@react-navigation/stack'
import MyGroups from './Group&Activity/MyGroups'
import GroupDetails from './Group&Activity/GroupDetails'
import GroupSetting from './Group&Activity/GroupSetting'
import ActivityCalendar from './Group&Activity/Activity'
import CreateAnActivity from './Group&Activity/CreateAnActivity'
import ScheduleAnActivity from './Group&Activity/ScheduleAnActivity'
import SelectTimeSlot from './Group&Activity/SelectTimeSlot'
import ActivityDetails from './Group&Activity/ActivityDetail'
import ActivityDetail1 from './Group&Activity/ActivityDetail1'
import Activity from './Group&Activity/Activity'
import ActivityDetail from './Group&Activity/ActivityDetail'


const Stack = createStackNavigator()
const Activitynavigation=()=>{
    return(
        <Stack.Navigator screenOptions={{ headerShown: false }}>
            <Stack.Screen name='Activity' component={Activity} />
            <Stack.Screen name="CreateAnActivity" component={CreateAnActivity} />
            <Stack.Screen name="ScheduleAnActivity" component={ScheduleAnActivity} />
            <Stack.Screen name="SelectTimeSlot" component={SelectTimeSlot} />
            <Stack.Screen name="ActivityDetail" component={ActivityDetail} />
            <Stack.Screen name="ActivityDetail1" component={ActivityDetail1} />
     

        </Stack.Navigator>
    )
}
export default Activitynavigation