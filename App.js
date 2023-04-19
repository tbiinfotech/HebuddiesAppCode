import React, { LogBox, useState, useEffect } from "react";
import { View, Text, Platform } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Image, StatusBar } from "react-native";
import Splash from "./src/screens/Splash&Onboarding /Splash";
import SwiperScreen from "./src/screens/Splash&Onboarding /Swiper";
import Welcome9 from "./src/screens/Splash&Onboarding /Welcome9";
import MYGroups from "./src/screens/Group&Activity/MyGroups";
import Activity from "./src/screens/Group&Activity/Activity";
import Chat from "./src/screens/Group&Activity/Chat";
import Profile from "./src/screens/Group&Activity/Profile";
import Plans from "./src/screens/Group&Activity/Plans";
import ActivityDetail from "./src/screens/Group&Activity/ActivityDetail";
import MessageScreen from "./src/screens/Group&Activity/MessageScreen";
import Login from "./src/screens/Login&SignUp/Login";
import CreateAccount from "./src/screens/Login&SignUp/CreateAccount";
import CompleteProfile from "./src/screens/Login&SignUp/CompleteProfile";
import CompleteProfileStep2 from "./src/screens/Login&SignUp/CompleteProfileStep2";
import CompleteProfileStep3 from "./src/screens/Login&SignUp/CompleteProfileStep3";
import PersonalInformation from "./src/screens/Group&Activity/PersonalInformation";
import ChildrenInformation from "./src/screens/Group&Activity/ChildrenInformation";
import ChildInformation1 from "./src/screens/Group&Activity/ChildrenInformation1";
import ChangePassword from "./src/screens/Group&Activity/ChangePassword";
import CreateAnActivity from "./src/screens/Group&Activity/CreateAnActivity";
import ScheduleAnActivity from "./src/screens/Group&Activity/ScheduleAnActivity";
import SelectTimeSlot from "./src/screens/Group&Activity/SelectTimeSlot";
import ActivityDetail1 from "./src/screens/Group&Activity/ActivityDetail1";
import Match from "./src/screens/Group&Activity/Match";
import ExploreMatch from "./src/screens/Group&Activity/ExploreMatch";
import MyGroupNavigation from "./src/screens/MyGroupNavigation";
import Activitynavigation from "./src/screens/Activitynavigation";
import ProfileNavigation from "./src/screens/ProfileNavigation";
import PlansNavigation from "./src/screens/PlansNavigation";
import Notification1 from "./src/screens/Group&Activity/Notification";
import Forgotpassword from "./src/screens/Group&Activity/Forgotpass";
import verifypassword from "./src/screens/Group&Activity/Verifypassword";
import Updatepassword from "./src/screens/Group&Activity/Updatepassword";
import Matchprefrence from "./src/screens/Group&Activity/Matchprefrence";
import Contactadmin from "./src/screens/Group&Activity/Contactadmin";
import CompleteProfileStep from "./src/screens/Login&SignUp/Complete_profile2";
import CreateGroup from "./src/screens/Group&Activity/CreateGroup";
import Invite from "./src/screens/Group&Activity/Invite";
import PollActivity from './src/screens/Group&Activity/PollActivity'
import InvitationCode from "./src/screens/Group&Activity/InvitationCode";
import Pushnotification from "./src/screens/Group&Activity/Pushnotification";
import AsyncStorage from "@react-native-async-storage/async-storage";
import NetInfo from "@react-native-community/netinfo";

// LogBox.ignoreLogs(['Warning: ...']); // Ignore log notification by message
// LogBox.ignoreAllLogs();//Ignore all log notifications

import OfflineNotice from "./src/screens/OfflineNotice";
import { useIsFocused } from "@react-navigation/native";
import './src/screens/translation/i18n'
import OneSignal from "react-native-onesignal";
import { useTranslation, withTranslation, Trans } from 'react-i18next';
const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();
var isLoggedIn = null;
var NetConnected = true;
var count = "?"
export default function App() {
  //  const isFocused = useIsFocused();
  const [logged, setLogged] = useState("");
  const [isNetConnected, setIsNetConnected] = useState(true);
  const [netInfo, setNetInfo] = useState('');
  const unsubscribe = NetInfo.addEventListener((state) => {
    // console.log("Connection type", state.type);
    // console.log("Is connected?", state.isConnected);
    NetConnected == state.isConnected;
    // setIsNetConnected(state.isConnected)
  });
  unsubscribe()
  useEffect(() => {
    getdeviceId()
    // getCount()
    getNetInfo()
  }, [])
  const getNetInfo = () => {
    // To get the network state once
    NetInfo.fetch().then((state) => {
      // alert(
      //   `Connection type: ${state.type}
      //   Is connected?: ${state.isConnected}
      //   IP Address: ${state.details.ipAddress}`,
      // );
    });
  };
  const getdeviceId = async () => {


   // OneSignal.setAppId("82ec25ac-40d4-4919-a966-518db135946f");
    OneSignal.setAppId("2cbe75b6-e10b-4f37-b2ef-f1b573c93c6a");

    // let externalUserId = '123456789'; // You will supply the external user id to the OneSignal SDK
    // OneSignal.setExternalUserId(externalUserId);


    OneSignal.promptForPushNotificationsWithUserResponse();

    //Method for handling notifications received while app in foreground
    OneSignal.setNotificationWillShowInForegroundHandler(
      (notificationReceivedEvent) => {
        // console.log(
        //   "OneSignal: notification will show in foreground:",
        //   notificationReceivedEvent
        // );
        let notification = notificationReceivedEvent.getNotification();
        // console.log("notification: ", notification);
        const data = notification.additionalData;
        // console.log("additionalData: ", data);
        // Complete with null means don't show a notification.
        notificationReceivedEvent.complete(notification);
      }
    );

    //Method for handling notifications opened
    OneSignal.setNotificationOpenedHandler((notification) => {
      // console.log("OneSignal: notification opened:", notification);
    });
    const deviceState = await OneSignal.getDeviceState()
    await AsyncStorage.setItem("DEVICE_ID", JSON.stringify(deviceState.userId))
    


  };
  const getCount = async () => {
    const data = await AsyncStorage.getItem("BadgeCount")
    count=JSON.parse(data)
   
  }

  return (
    <NavigationContainer>
      <StatusBar backgroundColor={"grey"} />
      {!NetConnected &&
        <OfflineNotice />
      }
      <MyStack />
    </NavigationContainer>
  );
}

const MyStack = () => {
  const [logged, setLogged] = useState("");

  return (
    <Stack.Navigator
      initialRouteName={"Splash"}
      screenOptions={{ headerShown: false, gestureEnabled: false }}
    >
      <Stack.Screen name="Splash" component={Splash} />
      <Stack.Screen name="SwiperScreen" component={SwiperScreen} />
      <Stack.Screen name="Welcome9" component={Welcome9} />
      <Stack.Screen name="Login" component={Login} />
      <Stack.Screen name="Forgotpassword" component={Forgotpassword} />
      <Stack.Screen name="verifypassword" component={verifypassword} />
      <Stack.Screen name="InvitationCode" component={InvitationCode} />
      <Stack.Screen name="Updatepassword" component={Updatepassword} />
      <Stack.Screen name="ChangePassword" component={ChangePassword} />
      <Stack.Screen name="Matchprefrence" component={Matchprefrence} />
      <Stack.Screen name="CreateAccount" component={CreateAccount} />
      <Stack.Screen name="Contactadmin" component={Contactadmin} />
      <Stack.Screen name="CompleteProfile" component={CompleteProfile} />
      <Stack.Screen name="PollActivity" component={PollActivity} />
      <Stack.Screen
        name="CompleteProfileStep2"
        component={CompleteProfileStep2}
      />
      <Stack.Screen
        name="CompleteProfileStep3"
        component={CompleteProfileStep3}
      />
      <Stack.Screen
        name="CompleteProfileStep"
        component={CompleteProfileStep}
      />
      <Stack.Screen name="MessageScreen" component={MessageScreen} />
      <Stack.Screen name="Notification1" component={Notification1} />
      <Stack.Screen name="MyTabs" component={MyTabs} />
      <Stack.Screen name="CreateGroup" component={CreateGroup} />
  
      <Stack.Screen name="Invite" component={Invite} />
      <Stack.Screen name="MYGroups" component={MYGroups} />
      <Stack.Screen name="ActivityDetail" component={ActivityDetail} />
      <Stack.Screen name="Chat" component={Chat} />
      <Stack.Screen name="Profile" component={Profile} />

      <Stack.Screen name="ExploreMatch" component={ExploreMatch} />
    </Stack.Navigator>
  );
};

const MyTabs = () => {
  const { t, i18n } = useTranslation();
  return (
    <Tab.Navigator

      screenOptions={{

        headerShown: false,
        tabBarStyle: {
          backgroundColor: "#F9FBDB",
          height: Platform.OS == "ios" ? 70 : 70,
        },
      }}
    >
      <Tab.Screen
        options={{
          tabBarIcon: ({ tintColor, focused, color })  => (
      
            <Image
              resizeMode="contain"
              style={{
                height: 20,
                width: 20,
                tintColor: focused ? "#008080" : "#909090",
                marginTop: 8,
              }}
              source={require("./src/asset/Vector(5).png")}
            />
          ),
          tabBarLabel: ({ focused, color }) => (
            <Text
              style={{
                color: focused ? "#008080" : "#909090",
                fontFamily: "Axiforma-Medium",
                marginBottom: 0,
                fontSize: 14,
                marginTop: 5,
              }}
            >
              {t("Match")}
            </Text>
            
          ),
        }}
        name="PlansNavigation"
        component={PlansNavigation}
      />
      
      <Tab.Screen

        options={{
          tabBarIcon: ({ tintColor, focused, color }) => (
            <Image
              resizeMode="contain"
              style={{
                marginTop: 25,
                height: 20,
                width: 20,
                tintColor: focused ? "#008080" : "#909090",
                marginLeft:0
              }}
              source={require("./src/asset/3-User.png")}
            />
          ),
          tabBarLabel: ({ focused, color }) => (
            <Text
              style={{
                // width:'75%',
                color: focused ? "#008080" : "#909090",
                fontFamily: "Axiforma-Medium",
                marginBottom: 0,
                fontSize: 14,
                marginTop: 15,
                marginLeft:0
              }}
            >
              {t("My Groups")}
            </Text>
          ),
        }}
        name="MyGroupNavigation"
        component={MyGroupNavigation}
      />
      <Tab.Screen
        options={{
          // tabBarBadge:count,
          tabBarIcon: ({ tintColor, focused, color }) => (
            <Image
              resizeMode="contain"
              style={{
                marginTop: 8,
                height: 20,
                width: 20,
                marginLeft:10,
                tintColor: focused ? "#008080" : "#909090",
              }}
              source={require("./src/asset/Calendar.png")}
            />
          ),
          
          tabBarLabel: ({ focused, color }) => (
            <Text
              style={{
                marginTop: 5,
                color: focused ? "#008080" : "#909090",
                fontFamily: "Axiforma-Medium",
                marginBottom: 0,
                fontSize: 14,
                marginRight:-10
              }}
            >
              {t("Activity")}
            </Text>
          ),
        }}
        name="Activitynavigation"
        component={Activitynavigation}
      />
      <Tab.Screen
        options={{
          tabBarIcon: ({ tintColor, focused, color }) => (
            <Image
              resizeMode="contain"
              style={{
                marginTop: 8,
                height: 20,
                width: 20,
                tintColor: focused ? "#008080" : "#909090",
              }}
              source={require("./src/asset/Chat.png")}
            />
          ),
          tabBarLabel: ({ focused, color }) => (
            <Text
              style={{
                marginTop: 5,
                color: focused ? "#008080" : "#909090",
                fontFamily: "Axiforma-Medium",
                marginBottom: 0,
                fontSize: 14,
              }}
            >
              {t("Chat")}
            </Text>
          ),
        }}
        name="Chat"
        component={Chat}
      />
      <Tab.Screen
        options={{
          tabBarIcon: ({ tintColor, focused, color }) => (
            <Image
              resizeMode="contain"
              style={{
                marginTop: 8,
                height: 20,
                width: 20,
                tintColor: focused ? "#008080" : "#909090",
                marginRight: 5,
              }}
              source={require("./src/asset/Profile.png")}
            />
          ),
          tabBarLabel: ({ focused, color }) => (
            <Text
              style={{
                marginTop: 5,
                color: focused ? "#008080" : "#909090",
                fontFamily: "Axiforma-Medium",
                marginBottom: 0,
                fontSize: 14,
              }}
            >
              {t("Profile")}
            </Text>
          ),
        }}
        name="ProfileNavigation"
        component={ProfileNavigation}
      />
    </Tab.Navigator>
  );
};