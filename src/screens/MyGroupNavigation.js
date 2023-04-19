import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import MyGroups from "./Group&Activity/MyGroups";
import GroupDetails from "./Group&Activity/GroupDetails";
import GroupSetting from "./Group&Activity/GroupSetting";
import ActivityDetail1 from "./Group&Activity/ActivityDetail1";
import ActivityDetail from "./Group&Activity/ActivityDetail";
import Notifications from "./Group&Activity/Notification";
import ScheduleAnActivity1 from "./Group&Activity/ScheduleAnActivity";
import CreateAnActivity from "./Group&Activity/CreateAnActivity";
import ScheduleAnActivity from "./Group&Activity/ScheduleAnActivity";
import PollActivity from './Group&Activity/PollActivity'
import PollActivitySubmit from './Group&Activity/PollActivitySubmit'

const Stack = createStackNavigator();
const MyGroupNavigation = () => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="MyGroups" component={MyGroups} />
      <Stack.Screen name="GroupDetails" component={GroupDetails} />
      <Stack.Screen name="GroupSetting" component={GroupSetting} />
      <Stack.Screen name="ActivityDetail" component={ActivityDetail} />
      <Stack.Screen
        name="ScheduleAnActivity1"
        component={ScheduleAnActivity1}
      />
      <Stack.Screen name="CreateAnActivity" component={CreateAnActivity} />
      <Stack.Screen name="ScheduleAnActivity" component={ScheduleAnActivity} />
      <Stack.Screen name="PollActivitySubmit" component={PollActivitySubmit} />
      <Stack.Screen name="PollActivity" component={PollActivity} />
    </Stack.Navigator>
  );
};
export default MyGroupNavigation;