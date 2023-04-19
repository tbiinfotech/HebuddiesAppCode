import React, { useState, useEffect, useCallback } from "react";
import {
  SafeAreaView,
  StyleSheet,
  Text,
  View,
  ImageBackground,
  ScrollView,
  Image,
  TouchableOpacity,
  FlatList,
  ActivityIndicator,
} from "react-native";
import * as Progress from "react-native-progress";
import { svg } from "react-native-svg";
import Modal from "react-native-modal";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import constants from "../constants/constants";
import firestore from "@react-native-firebase/firestore";
import OneSignal from "react-native-onesignal";
import { useTranslation, withTranslation, Trans } from 'react-i18next';
import '../translation/i18n'
import { useIsFocused } from "@react-navigation/native";
import { Menu, MenuItem, MenuDivider } from "react-native-material-menu";
import {appUpgradeVersionCheck} from 'app-upgrade-react-native-sdk'

const Match = ({
  navigation,
  route,
  percentage1,
  height,
  backgroundColor, 
  completedColor,
}) => {
 
   // OneSignal Initialization
//   OneSignal.setAppId("82ec25ac-40d4-4919-a966-518db135946f");
   OneSignal.setAppId("2cbe75b6-e10b-4f37-b2ef-f1b573c93c6a");


  //  promptForPushNotificationsWithUserResponse will show the native iOS or Android notification permission prompt.
  //  We recommend removing the following code and instead using an In-App Message to prompt for notification permission (See step 8)
   OneSignal.promptForPushNotificationsWithUserResponse();
 
  //  Method for handling notifications received while app in foreground
   OneSignal.setNotificationWillShowInForegroundHandler(
     (notificationReceivedEvent) => {
      //  console.log(
      //    "OneSignal: notification will show in foreground:",
      //    notificationReceivedEvent
      //  );
       let notification = notificationReceivedEvent.getNotification();
      //  console.log("notification: ", notification);
       const data = notification.additionalData;
      //  console.log("additionalData: ", data);
       // Complete with null means don't show a notification.
       notificationReceivedEvent.complete(notification);
     }
   );
 
  //  Method for handling notifications opened
   OneSignal.setNotificationOpenedHandler((notification) => {
    //  console.log("OneSignal: notification opened:", notification);
   });
  
  const getDeviceId = async () => {
     
   const data= await OneSignal.getDeviceState()


}
const isFocused = useIsFocused();
const[languagess,setLanguages]=useState("")
useEffect(() => {
  // var langg=await AsyncStorage.getItem("langugae")
  // alert(langg)
   languages()
  
  MatchGroup();
}, [isFocused]);
  React.useEffect(() => {
    const unsubscribe = navigation.addListener("focus", () => {
      // MatchGroup();
      group_details();
     
      // appUpgrade()
    });
    return unsubscribe;
  }, [useCallback]);
  const languages=async()=>{
    var langg=await AsyncStorage.getItem("langugae")
  
    changeLanguage(langg)
    
  }
  const goToInvitationCode = async () => {
 
    navigation.navigate("InvitationCode");
  };
  const {t, i18n} = useTranslation();
  const [parentname, setParentName] = useState("");
  const [gender, setGender] = useState("");
  const [birthdate, setBirthdate] = useState("");
  const [emailaddress, setEmailaddress] = useState("");
  const [postalcode1, setPopstalcode1] = useState("");
  const [relation, setRelation] = useState("");
  const [childname, setChildname] = useState("");
  const [childname1, setChildname1] = useState("");
  const [childname2, setChildname2] = useState("");
  const [childbirthdate, setChildbirthdate] = useState("");
  const [childbirthdate1, setChildbirthdate1] = useState("");
  const [childbirthdate2, setChildbirthdate2] = useState("");
  const [getPercentage1, setPercentage1] = useState(percentage);
  const [getheight, setHeight] = useState(height);
  const [getBackgroundColor, setBackgroundColor] = useState(backgroundColor);
  const [getCompletedColor, setCompletedColor] = useState(completedColor);
  const [isVisible, setisVisible] = useState(false);
  const [isVisible1, setisVisible1] = useState(false);
  const [isVisible2, setisVisible2] = useState(false);
  const [isVisible3, setisVisible3] = useState(false);
  const [grp_title, setGrp_title] = useState("");
  const [grp_agee, setGrp_age] = useState("");
  const [grp_theme, setGrp_theme] = useState("");
  const [grp_location, setGrp_location] = useState("");
  const [grpcomposition, setgrpcomposition] = useState("");
  const [familycomposition, setfamilycomposition] = useState("");
  const [grp_title1, setGrp_title1] = useState("");
  const [grp_agee1, setGrp_age1] = useState("");
  const [grp_theme1, setGrp_theme1] = useState("");
  const [grp_location1, setGrp_location1] = useState("");
  const [grpcomposition1, setgrpcomposition1] = useState("");
  const [familycomposition1, setfamilycomposition1] = useState("");
  const [family_style, setFamily_style] = useState("");
  const [grp_description, setGrp_desription] = useState("");
  const [grp_image, setGrp_image] = useState("");
  const [data1, setData1] = useState([]);
  const [id, setId] = useState([]);
  const [groupDetail, setGroupDetail] = useState({});
  const [loader, setLoader] = useState(true);
  const [percentage, setPercentage] = useState([]);
  const [visible, setvisible] = useState("");
  const [showUpdateP, setShowUpdateP] = useState(false);
  const [UserToken, setUserToken] = useState("");
  const[showpercentage,setShowpercentage]=useState("")
  const[gendernew,setGenderNew]=useState("")
  const[name,setName]=useState("")
  const [infovisible, setinfovisible] = useState(false);
  const hideMenu = () => setinfovisible(false);
  const toggleModal = () => {
    setisVisible(!isVisible);
  };
  const toggleModal1 = () => {
    setisVisible1(!isVisible1);
  };
  const toggleModal2 = () => {
    setisVisible2(!isVisible2);
  };
  const toggleModal3 = () => {
    setisVisible3(!isVisible3);
  };
  useEffect(()=>{getData1(),personalinfo(),getData()},
  [])
  const getData = async () => {
    var data = await AsyncStorage.getItem("DATAA");
  
    };
  const getData1 = async () => {
   var newpredata=await AsyncStorage.getItem("P_DETAIL")
// console.log("gffhfhddddfhhff",newpredata)
  
  };
  const personalinfo = async () => {
    var langg=await AsyncStorage.getItem("langugae")
    var token = await AsyncStorage.getItem("token");
  

    var config = {
      method: "get",
  
      url: constants.BASE_URL + "api/profile/personal/info",
      headers: {
        Authorization: "Bearer " + JSON.parse(token),
        'X-localization':langg, 
      },
    };

    axios(config)
      .then(async (response) => {
        // console.log("4344342243223", JSON.stringify(response.data.data));
        // console.log("stringify12232332", JSON.stringify(response));
        await AsyncStorage.setItem("PROFILENAME",JSON.stringify(response.data.data.name))
        // console.log("ffggghfuewq",JSON.stringify(response.data.data.name))
        if (response.data.status==true) {
// await AsyncStorage.setItem("PROFILENAME",response.data.data.name)
// await AsyncStorage.setItem("PROFILEDOB",response.data.data.birth_date)
await AsyncStorage.setItem("DATAA",JSON.stringify(response.data.data))
await AsyncStorage.setItem("GENDER",response.data.data.gender)
await AsyncStorage.setItem("P_NAMES",JSON.stringify(response.data.data.name))
// console.log("hjthlkjityty",JSON.stringify(response.data.data.name))


//  alert(response.data.data.gender)
setGenderNew(response.data.data.gender)

                    if (response.data.data.gender ==!"") {
                     
                      setGenderNew(response.data.data.gender)
                      
                      
                    }
                  }
                    
                    
      })
      .catch(function (error) {
        // console.log(error);
      });
  };
  const appUpgrade=async()=>{
    const xApiKey = "MTMwNGU5ZmEtOWM3NC00NzkyLTlkZWYtODQ0NWNiNDA2MzU3";
    const appInfo = {
      appId: 'com.heybuddies.app' ,
      appName: 'Hey buddies',
      appVersion: '1.0', 
      platform: 'ios',
      environment: 'development', 
    };
    const alertConfig = {
      title: 'Please Update',
      updateButtonTitle: 'Update Now',
      laterButtonTitle: 'Later',
      onDismissCallback: () => { console.log('Dismiss') },
      onLaterCallback: () => { console.log('Later') }
    };
  
    appUpgradeVersionCheck(appInfo, xApiKey, alertConfig);
  
  }
  const MatchGroup = async () => {
    
    var langg =await AsyncStorage.getItem("langugae")

    var token = await AsyncStorage.getItem("token");
    setUserToken(JSON.parse(token));

    var axios = require("axios");
    setLoader(true);
    var config = {
      method: "get",
      url: constants.BASE_URL + "api/groups/lists",
      headers: {
        Authorization: "Bearer " + JSON.parse(token),
        'X-localization': langg,
      },
    };

    axios(config)
      .then(async (response) => {
        // console.log(
        //   "poipiooiooiopipop9999099-9-9---",
        //   response.data
        // );
        if (response.data.status) {
          setPercentage(response.data.data[0].match_percentage)
          setShowpercentage(response.data.data[0].percentage)
        }else if(!response.data.status){
          setShowUpdateP(true);
        }      
        setData1(response.data?.data);
        setLoader(false);
      })
      .catch(function (error) {
        // console.log(error);
        setLoader(false);
      });
  };
  const Onsubmit = async() => {
    const data1 = await AsyncStorage.getItem("P_DETAIL");
    // console.log("gtt5t5trr",data1)
    var Name1 = parentname.replace(/\s/g, "");
    var Email1 = emailaddress.replace(/\s/g, "");
    var Gender1 = gender;
    var Dateofbirth = birthdate;
    var postal = postalcode1;
    var Relation1 = relation;
    var CHILD = childname;
    var CHILD1 = childname1;
    var CHILD2 = childname2;
    var CHILDBIRTH = childbirthdate;
    var CHILDBIRTH1 = childbirthdate1;
    var CHILDBIRTH2 = childbirthdate2;

    var Profiledetail = {
      parent_name: Name1,
      email_address: Email1,
      genders: Gender1,
      birth_date: Dateofbirth,
      postalcode: postal,
      relations: Relation1,
      childnames: CHILD,
      childnames1: CHILD1,
      childnames2: CHILD2,
      childbirthdates: CHILDBIRTH,
      childbirthdates1: CHILDBIRTH1,
      childbirthdates2: CHILDBIRTH2,
    };
    await AsyncStorage.setItem("P_DETAIL", JSON.stringify(Profiledetail));
    // console.log("eeeeeeeWWWWWW",JSON.stringify(Profiledetail))
    var data = await AsyncStorage.getItem("DATAA");
    // console.log("ghjhgkhuitrtr",data)
    var genderr=await AsyncStorage.getItem("GENDER")

    // console.log("ddeedddqqde2",genderr)
  
    //  navigation.navigate("CompleteProfileStep2",{"NEWDATAA":data})
     navigation.reset({
      index: 0,
      routes: [
          // {
          //     name: "CompleteProfileStep2",
          //      params:{"NEWDATAA":data},
          // },
          {
            name: "CompleteProfileStep",
             params:{"NEWDATAA":data},
        },
      ],
  })
  }
  const [currentLanguage,setLanguage] =useState('en');
  
  const changeLanguage = async lang => {
 
    var langg=await AsyncStorage.getItem("langugae")
    if(langg=="en"){
      // changeLanguage("en")
      setLanguage("en")
    }
    if(langg=="da"){
      // changeLanguage("da")
      setLanguage("da")
    }
    console.log("klljijijiij"
    )
    i18n
      .changeLanguage(lang)
     
      // .then( async() => setLanguage(lang))
      .then(async () => {
        await AsyncStorage.setItem("langugae",lang) 
        // alert(lang)
        setLanguage(lang) 
    })
      .catch(err => console.log(err));
  }; 
  const  JoinGroup = async (data) => {
    var langg =await AsyncStorage.getItem("langugae")
    var token = await AsyncStorage.getItem("token");
    var axios = require("axios");
    var FormData = require("form-data");
    var data = new FormData();
    data.append("group_id", groupDetail.id);

    var config = {
      method: "post",
      
      url: constants.BASE_URL + "api/group/join",
      headers: {
        Authorization: "Bearer " + JSON.parse(token),
        'X-localization': langg,
      },
      data: data,
    };

    axios(config)
      .then(async function (response) {
      //  console.log("wdnfdeflnlllllnwqdqw",response.data)
        if (response.data.status == true) {

          alert(response.data.message)
          
            .catch((error) => {
              // console.log("error",error)
            });
         
        } 
     
        else{
          alert(response.data.message)
        }
      })
      .catch(function (error) {
        console.log(error);
      });
  };
  const group_details = async (group_ID) => {
    var langg =await AsyncStorage.getItem("langugae")
    var token = await AsyncStorage.getItem("token");
    var axios = require("axios");
    var FormData = require("form-data");
    var data = new FormData();
    data.append("group_id", group_ID);

    var config = {
      method: "post",
      url: constants.BASE_URL + "api/group/detail",
      headers: {
        Authorization: "Bearer " + JSON.parse(token),
        'X-localization': langg,
      },
      data: data,
    };
    axios(config)
      .then(async (response) => {
        setGrp_theme1(response.data.data.group_theme);
        setGrp_title1(response.data.data.group_title);
        setGrp_age1(response.data.data.age_group);
        setGrp_location1(response.data.data.group_zipcode);
        setGrp_desription(response.data.data.group_composition);
        setfamilycomposition1(response.data.data.family_composition);
        setFamily_style(response.data.data.family_style);
        setGrp_image(response.data.data.group_image);
        
      })
      .catch(function (error) {
      });
  };

 
  return (
    <View style={Explorestyles.Main}>
      <ImageBackground
        style={Explorestyles.ImageBackground}
        source={require("../../asset/Splash.png")}
      >
        {showUpdateP && (
          <View style={Explorestyles.View1}>
            <View style={Explorestyles.view2}>
              <TouchableOpacity
                activeOpacity={1}

              >
              </TouchableOpacity>
              <Text style={Explorestyles.text1}>{t("Match")}</Text>
              <TouchableOpacity
                onPress={() => navigation.navigate("Notification1")}
              >
                <Image
                  style={Explorestyles.img3}
                  resizeMode="contain"
                  source={require("../../asset/Notification.png")}
                />
              </TouchableOpacity>
            </View>
            <ScrollView>
            <Image
              style={{
                height: 200,
                width: 200,
                marginTop: 80,
                alignSelf: "center",
              }}
              resizeMode="contain"
              source={require("../../asset/filterimage.png")}
            />
            <View style={Explorestyles.view3}>
              <Text
                style={{
                  color: "grey",
                  fontSize: 16,
                  alignItems: "center",
                  textAlign: "center",
                  marginTop: "0%",
                  lineHeight: 25,
                  fontFamily: "Axiforma-Regular",
                  width: 350,
                }}
              >
                {t("Currently there are no matching groups in your area - if you're up for it, go back and change your prefrences and the algorithm will search for new, cool groups")}
              </Text>
            </View>
            <TouchableOpacity
              style={{
                backgroundColor: "#008080",
                justifyContent: "center",
                alignSelf: "center",
                borderRadius: 50,
                width: 200,
                height: 50,
                marginTop: 20,
              }}
              onPress={() =>
                Onsubmit()
              }
            >
              <Text
                style={{
                  alignSelf: "center",
                  color: "white",
                  fontSize: 16,
                  fontFamily: "Axiforma-Bold",
                  textAlign: "center",
                }}
              >
                {t("Change prefrences")}
              </Text>
            </TouchableOpacity>
            </ScrollView>
          </View>
        )}
        {!showUpdateP && (
          <View style={Explorestyles.View1}>
            <View style={Explorestyles.view2}>
              <TouchableOpacity >
                <Image style={Explorestyles.img3} resizeMode="contain" />
              </TouchableOpacity>
              <Text style={Explorestyles.text1}>{t("Match")}</Text>
              <TouchableOpacity
                onPress={() => navigation.navigate("Notification1")}
              >
                <Image
                  style={Explorestyles.img3}
                  resizeMode="contain"
                  source={require("../../asset/Notification.png")}
                />
              </TouchableOpacity>
            </View>
            <View style={Explorestyles.view3}>
              <Text style={Explorestyles.text2}>
                {t("Please choose one of the groups")}
              </Text>
            </View>
            <ScrollView alwaysBounceHorizontal={false} horizontal={false} >
              <View style={Explorestyles.view4}>
                {loader == true ? (
                  <ActivityIndicator size="large" color="#008080" />
                ) : (
                  <FlatList
                  bounces={false}
                    data={data1}
                    renderItem={({ item }) => {
                      var percentage=(item.percentage)
                  
                       
                      return (
                        <View style={{   flex: 1,
                          backgroundColor: "white",
                          width:'95%',
                          borderRadius: 10,
                          padding:15,
                          marginTop: 15,
                          alignSelf:'center'}}>
                          <View style={{ alignItems: "center",flexDirection: "row",}}>
                          
                              <Image
                             style={{height: 62,
                              width: 62,
                              borderRadius: 100,}}
                              source={{ uri: item.image }}
                            />                           
                            
                            <View style={{marginLeft: 20}}>
                              <View style={{marginLeft: 20,width:'80%',}}>
                              <Text style={{fontSize: 18,fontFamily: "Axiforma-Bold",color: "grey",}}>
                                {item.title}
                              </Text>
                              </View>
                              <View style={{ flexDirection: "row",alignItems: "center",marginTop: 10,}}>
                                <Image
                                  style={{  height: 17, width: 15,}}
                                  resizeMode="contain"
                                  source={require("../../asset/chill.png")}
                                />
                                <Text style={{ color: "#737373", fontSize: 16,marginLeft: 10,fontFamily: "Axiforma-Regular",}}>
                                  {item.group_theme}
                                </Text>
                              </View>
                              <View style={{  flexDirection: "row",alignItems: "center", marginTop: 10,}}>
      
                                <Image
                                  style={{ height: 17,width: 15}}
                                  resizeMode="contain"
                                  source={require("../../asset/Location.png")}
                                />
                                <Text style={{color: "#737373",fontSize: 16,marginLeft: 10,fontFamily: "Axiforma-Regular",width:'80%'}}>
                                  {item.zipcodes}
                                </Text>
                              </View>
                              <View style={{flexDirection: "row",alignItems: "center", marginTop: 10}}>
                                <Image
                                  style={{height: 17,width: 15}}
                                  resizeMode="contain"
                                  source={require("../../asset/Profile(2).png")}
                                />
                                <Text style={{color: "#737373",fontSize: 16,marginLeft: 10,fontFamily: "Axiforma-Regular",}}>
                                  {item.txt4}
                                </Text>
                                <Text style={{color: "#737373",fontSize: 16,marginLeft: 10,fontFamily: "Axiforma-Regular",}}>
                                  {item.age_group}
                                </Text>
                              </View>
                            </View>
                          </View>
                          <View style={Explorestyles.view9}>
                            <View>
                              <Text style={Explorestyles.text5}>{t("Matching")} {" "+percentage+" %"}</Text>

                              <View>
                             
                                <Progress.Bar
                                  progress={item.match_percentage}
                                  width={170}
                                  height={15}
                                  color="#008080"
                                  borderRadius={20}
                                  showsText={true}
                                />
                              </View>
                            </View>
                            <View style={Explorestyles.view10}>
                              <TouchableOpacity
                                onPress={() => {
                                  toggleModal2(item), setGroupDetail(item);
                                }}
                              
                                style={Explorestyles.button}
                              >
                                <Text style={Explorestyles.buttontxt}>
                                  {t("See group")}
                                </Text>
                              </TouchableOpacity>
                            </View>
                          </View>
                        </View>
                      );
                    }}
                  />
                )}
              </View>
            </ScrollView>
          </View>
        )}

        {isVisible1 == true && (
          <Modal
            isVisible={true}
            onBackdropPress={() => {
              setisVisible1(!isVisible1);
            }}
          >
            <View
              style={{
                backgroundColor: "white",
                width: 326,
                alignSelf: "center",
                borderRadius: 16,
                padding: 20,
              }}
            >
              <TouchableOpacity
                onPress={() => setisVisible1(false)}
                style={Explorestyles.modalview1}
              >
                <Image
                  style={Explorestyles.crossimg}
                  resizeMode="contain"
                  source={require("../../asset/cross.png")}
                />
              </TouchableOpacity>
              <View style={Explorestyles.modalview2}>
                <Image
                  resizeMode="contain"
                  style={Explorestyles.modalimg}
                  source={require("../../asset/Ciricle(2).png")}
                />
                <Text style={Explorestyles.modaltxt}>
                  You have to purchase a subscription plan to join more than 2
                  groups
                </Text>
                <Text style={Explorestyles.modaltxt1}>
                  Lorem Ipsum is simply dummy text of the printing and
                  typesetting industry. Lorem Ipsum has been the indust
                </Text>

                <TouchableOpacity
                  onPress={() => {
                    navigation.navigate("Plans"), setisVisible1(false);
                  }}
                  style={Explorestyles.modalbutton}
                >
                  <Text style={Explorestyles.buttontxt}>Continue</Text>
                </TouchableOpacity>
              </View>
            </View>
          </Modal>
        )}
        {isVisible2 == true && (
          <Modal
            isVisible={true}
            onBackdropPress={() => {
              setisVisible2(!isVisible2);
            }}
            style={{ height: "65%" }}
          >
            <View
              style={{
                backgroundColor: "white",
                width: 326,
                alignSelf: "center",
                borderRadius: 16,
                padding: 20,
                marginBottom: 20,
                height: "65%",
              }}
            >
              <TouchableOpacity
                onPress={() => setisVisible2(false)}
                style={Explorestyles.modalview1}
              >
                <Image
                  style={Explorestyles.crossimg}
                  resizeMode="contain"
                  source={require("../../asset/cross.png")}
                />
              </TouchableOpacity>
              <View
                style={{ alignItems: "center", width: "100%", height: "80%" }}
              >
                <ScrollView>
                  <Image
                    resizeMode="cover"
                    style={{
                      height: 90,
                      width: 90,
                      alignSelf: "center",
                      borderRadius: 45,
                    }}
                    source={{ uri: groupDetail.image }}
                  />
                  <Text style={Explorestyles.modaltxt}>{t("Group details")}</Text>

                  <View style={Explorestyles.modalview4}>
                    <View style={Explorestyles.modalview3}>
                      <View style={Explorestyles.modalview4}>
                        <View style={{flexDirection: "row", width: "88%"}}>
                          <Image
                            style={{
                              height: 17,
                              width: 17,
                              marginTop: 10,
                              marginLeft: 0,
                            }}
                            resizeMode="contain"
                            source={require("../../asset/Location.png")}
                          />
                          <Text
                            style={{
                              color: "#008080",
                              fontFamily: "Axiforma-Regular",
                              fontSize: 14,
                              marginRight: 50,
                              marginTop: 10,
                              marginLeft: 10,
                            }}
                          >
                            {groupDetail.zipcodes}
                          </Text>
                        </View>
                      </View>
                      <View style={{flexDirection: "row",width:'85%',
    marginTop: 0,marginRight:0}}>
                          <Image
                            style={{
                              height: 17,
                              width: 17,
                              marginTop: 10,
                              marginLeft: 0,
                            }}
                            resizeMode="contain"
                            source={require("../../asset/chill.png")}
                          />
                          <Text
                            style={{
                              color: "#008080",
                              fontFamily: "Axiforma-Regular",
                              fontSize: 14,
                              marginRight: 50,
                              marginTop: 10,
                              marginLeft: 5,
                            }}
                          >
                             {groupDetail.group_theme}
                          </Text>
                        </View>
                      <View style={{ flexDirection: "row", width: "92%" }}>
                        <Image
                          style={{
                            height: 17,
                            width: 17,
                            marginTop: 10,
                            marginLeft: 6,
                          }}
                          resizeMode="contain"
                          source={require("../../asset/Profile(2).png")}
                        />
                        <Text
                          style={{
                            color: "#008080",
                            fontFamily: "Axiforma-Regular",
                            fontSize: 14,
                            marginRight: 90,
                            marginTop: 10,
                            marginLeft: 10,
                            maxWidth: 100,
                          }}
                        >
                          {t("Age group")}
                        </Text>
                        <Text
                          style={{
                            color: "#008080",
                            fontFamily: "Axiforma-Regular",
                            fontSize: 14,
                            marginTop: 10,
                            marginLeft: -20,
                           
                          }}
                        >
                          {groupDetail.age_group}{" "}
                        </Text>
                      </View>
                      <View style={{ flexDirection: "row", width: "92%" }}>
                        <Image
                          style={{
                            height: 17,
                            width: 17,
                            marginTop: 10,
                            marginLeft: 6,
                          }}
                          resizeMode="contain"
                          source={require("../../asset/Profile(2).png")}
                        />
                        <Text
                          style={{
                            color: "#008080",
                            fontFamily: "Axiforma-Regular",
                            fontSize: 14,
                            marginRight: 90,
                            marginTop: 10,
                            marginLeft: 10,
                            maxWidth: 100,
                          }}
                        >
                          {t("Members")}
                        </Text>
                        <Text
                          style={{
                            color: "#008080",
                            fontFamily: "Axiforma-Regular",
                            fontSize: 14,
                            marginTop: 10,
                            marginLeft: 10,
                            maxWidth: 30,
                          }}
                        >
                          {groupDetail.members}{" "}
                        </Text>
                      </View>
                      <View style={{ flexDirection: "row",width:'98%' }}>
                        <Image
                          style={{
                            height: 17,
                            width: 17,
                            marginTop: 10,
                            tintColor: "#008080",
                            marginLeft: 15,
                          }}
                          resizeMode="contain"
                          source={require("../../asset/3-User.png")}
                        />
                        <View style={{ width: 150}}>
                          <Text
                            style={{
                              color: "#008080",
                              fontFamily: "Axiforma-Regular",
                              fontSize: 14,
                              marginRight: 10,
                              marginTop: 10,
                              marginLeft: 10,
                            }}
                          >
                            {t("Group composition")}
                          </Text>
                        </View>
                        <View style={{}}>
                        <Text
                          style={{
                            color: "#008080",
                            fontFamily: "Axiforma-Regular",
                            fontSize: 14,
                            marginTop: 10,
                            marginLeft: 10,
                            maxWidth: 90,
                            lineHeight:17,
                         
                          }}
                        >
                          {groupDetail.group_composition}
                        </Text>
                        </View>
                    
                      </View>
                      <View style={{ flexDirection: "row", width: "100%" }}>
                        <Image
                          style={{
                            height: 17,
                            width: 17,
                            marginTop: 10,
                            tintColor: "#008080",
                            marginLeft: 17,
                          }}
                          resizeMode="contain"
                          source={require("../../asset/icons8-full-family-30.png")}
                        />
                        <View style={{ width: 150 }}>
                          <Text
                            style={{
                              color: "#008080",
                              fontFamily: "Axiforma-Regular",
                              fontSize: 14,
                              marginRight: 10,
                              marginTop: 10,
                              marginLeft: 10,
                            }}
                          >
                            {t("Family composition")}
                          </Text>
                        </View>
                        <Text
                          style={{
                            color: "#008080",
                            fontFamily: "Axiforma-Regular",
                            fontSize: 14,
                            marginTop: 10,
                            marginLeft: 10,
                            maxWidth: 80,
                            lineHeight:17,
                          }}
                        >
                          {groupDetail.family_composition}
                        </Text>
                      </View>
                      <View style={{ flexDirection: "row",width:'90%' }}>
                        <Image
                          style={{
                            height: 17,
                            width: 17,
                            marginTop: 10,
                            tintColor: "#008080",
                            marginLeft: 0,
                          }}
                          resizeMode="contain"
                          source={require("../../asset/icons8-full-family-30.png")}
                        />
                        <View style={{ width: 170 }}>
                          <Text
                            style={{
                              color: "#008080",
                              fontFamily: "Axiforma-Regular",
                              fontSize: 14,
                              marginRight: 10,
                              marginTop: 10,
                              marginLeft: 10,
                            }}
                          >
                            {t("Family style")}
                          </Text>
                        </View>

                        <Text
                       style={{
                        color: "#008080",
                        fontFamily: "Axiforma-Regular",
                        fontSize: 14,
                        marginTop: 10,
                        marginLeft: -10,
                        maxWidth: 80,
                        lineHeight:17,
                       }}
                        >
                          {groupDetail.family_style}
                        </Text>
                      </View>
                      <View style={{ flexDirection: "row",width:'97%' }}>
                        <Image
                          style={{
                            height: 17,
                            width: 17,
                            marginTop: 10,
                            marginLeft: 13,
                          }}
                          resizeMode="contain"
                          source={require("../../asset/hand.png")}
                        />
                        <Text
                          style={{
                            color: "grey",
                            fontFamily: "Axiforma-Regular",
                            fontSize: 14,
                            marginRight: 10,
                            marginTop: 10,
                            marginLeft: 10,
                          }}
                        >
                          {t("Kids with special needs")}
                        </Text>
                        <Text
                          style={{
                            color: "#008080",
                            fontFamily: "Axiforma-Regular",
                            fontSize: 14,
                            marginRight: 10,
                            marginTop: 10,
                            marginLeft: 0,
                          }}
                        >
                         {groupDetail.kids_with_special_needs}
                        </Text>
                      

                      </View>
                      <View style={{width:"98%" ,flexDirection:'row' }}>  
                        <Image
                          style={{
                            height: 17,
                            width: 17,
                            marginTop: 10,
                            marginLeft: 13,
                          }}
                          resizeMode="contain"
                          source={require("../../asset/homecare.png")}
                        />
                       <Text
                          style={{
                            color: "grey",
                            fontFamily: "Axiforma-Regular",
                            fontSize: 14,
                            marginRight: 10,
                            marginTop: 10,
                            marginLeft: 10,
                          }}
                        >
                          {t("Home care")}
                        </Text>
                        <Text
                          style={{
                            color: "#008080",
                            fontFamily: "Axiforma-Regular",
                            fontSize: 14,
                            marginRight: 10,
                            marginTop: 10,
                            marginLeft: 5,
                          }}
                        >
                        {groupDetail.home_care}
                        </Text>
                        </View>
                      <View style={{ flexDirection: "row" }}>
                        {groupDetail.preferred_language=="danish"&&
                        <Image
                          style={{ height: 19, width: 19, marginTop: 10 }}
                          resizeMode="contain"
                          source={require("../../asset/denmark.png")}
                        />
                        }
                         {groupDetail.preferred_language=="english"&&
                        <Image
                          style={{
                            height: 19,
                            width: 19,
                            marginTop: 10,
                            marginLeft: 10,
                          }}
                          resizeMode="contain"
                          source={require("../../asset/kingdomflag.png")}
                        />
}
                      </View>
                    </View>
                  </View>
                </ScrollView>
              </View>
              {!groupDetail.group_joined&&

  <TouchableOpacity
                onPress={() => {
                  setisVisible2(false), JoinGroup();
                }}
                style={{
                  height: 50,
                  width: 170,
                  backgroundColor: "#008080",
                  borderRadius: 120,
                  alignItems: "center",
                  justifyContent: "center",
                  marginBottom: 0,
                  alignItems: "center",
                  marginLeft: 60,
                  marginTop: 10,
                }}
              >
                <Text style={Explorestyles.buttontxt}>{t("Join Group")}</Text>
              </TouchableOpacity>
              }
            </View>
          </Modal>
        )}
        {isVisible3 == true && (
          <Modal
            isVisible={true}
            onBackdropPress={() => {
              setisVisible3(!isVisible3);
            }}
          >
            <View style={Explorestyles.notificationmodalview}>
              <TouchableOpacity
                onPress={() => setisVisible3(false)}
                style={Explorestyles.modalview1}
              >
                <Image
                  style={Explorestyles.crossimg}
                  resizeMode="contain"
                  source={require("../../asset/cross.png")}
                />
              </TouchableOpacity>
              <View style={Explorestyles.modalview2}>
                <Image
                  resizeMode="contain"
                  style={Explorestyles.modalimg}
                  source={require("../../asset/ic-Chill.png")}
                />
                <Text style={Explorestyles.modaltxt}>
                  Welcome to group
                  {"\n"}The high five jumpers
                </Text>
                <Text style={Explorestyles.modaltxt1}>You are all in</Text>
                <View style={Explorestyles.modalview3}>
                  <View style={Explorestyles.modalview4}>
                    <View style={Explorestyles.view8}>
                      <Image
                        style={Explorestyles.img5}
                        resizeMode="contain"
                        source={require("../../asset/Location.png")}
                      />
                      <Text style={Explorestyles.text4}>TOK OEO</Text>
                    </View>
                    <View style={Explorestyles.modalview8}>
                      <Image
                        style={Explorestyles.img5}
                        resizeMode="contain"
                        source={require("../../asset/chill.png")}
                      />
                      <Text style={Explorestyles.text4}>Chill </Text>
                    </View>
                  </View>

                  <View style={Explorestyles.modalview9}>
                    <Image
                      style={Explorestyles.img5}
                      resizeMode="contain"
                      source={require("../../asset/Profile(2).png")}
                    />
                    <Text style={Explorestyles.text4}>Age group: 2 years</Text>
                  </View>
                </View>
              </View>
            </View>
          </Modal>
        )}
       
        <View style={{flexDirection:'row',height:'13%',width:'100%',backgroundColor:'#F9FBDB',marginTop:30}}>
<TouchableOpacity  style={{backgroundColor:'#008080',height:40,width:180,borderRadius: 25,
            shadowOpacity: 0.5,marginLeft:5}}   onPress={() => {
              navigation.navigate("CreateGroup");
            }} >
<Text style={{  fontSize: 14,
              fontFamily: "Axiforma-Bold",
              color: "white",textAlign:"center",paddingTop:12.5,alignSelf:'center'}}>{t("Start new group")}</Text>
</TouchableOpacity>
<TouchableOpacity  style={{backgroundColor:'#008080',height:40,width:180,borderRadius: 25,marginLeft:7,
            shadowOpacity: 0.5,}}   onPress={() => goToInvitationCode()} >
<Text style={{  fontSize: 14,
              fontFamily: "Axiforma-Bold",
              color: "white",textAlign:"center",paddingTop:5}}>{t("Join group with invitation code")}</Text>
</TouchableOpacity>
        </View>
   
        <TouchableOpacity
          style={{
            flexDirection: "row",
            justifyContent: "center",
            alignSelf: "center",
            alignItems: "center",
            position: "absolute",
            bottom: 10,
          }}
          onPress={() => setinfovisible(true)}
       
        >
          <Image
            style={{ height: 22, width: 22, resizeMode: "contain",marginTop:7 }}
            source={require("../../../Images/Info.png")}
          />
          <Text
            style={{
              fontSize: 14,
              color: "grey",
              marginLeft: 10,
              textAlign: "center",
              fontFamily: "Axiforma-LightItalic",
              marginTop:10
            }}
          >
            {t("Tap to see info for adding or joining groups")}
          </Text>
        </TouchableOpacity>
        {infovisible && (
                 <Modal
                            isVisible={infovisible}
                            style={{   
                            }}
                          
                          >
                            <TouchableOpacity
                              onPress={() => setinfovisible(false)}
                              style={{
                                alignItems: "flex-end",
                                marginRight: -10,
                                marginTop:"70%",
                               
                              }}
                            >
                              <Image
                                source={require("../../asset/cros1.png")}
                                style={{ resizeMode: "contain", height: 35, width: 35 }}
                              />
                            </TouchableOpacity>
                            <ScrollView>
                            <View
                              style={{
                                backgroundColor: "#F9FBDB",
                                borderRadius: 20,
                                marginBottom:20,
                                minHeight: 200,
                                 alignItems: "center",
                                padding: 14,
                                justifyContent: "space-evenly",
                              }}
                            >
                              
                             
                            
                              <View style={{width:'85%'}}>
                              <Text
                                style={{
                                  color: "#008080",
                                  fontSize: 16,
                                  textAlign: "left",
                                  marginVertical: 10,
                                  fontWeight: "bold",
                                
                                }}
                              >
                              {t("If you start your own group you'll have the choice to make it public so that the algorithm can match you with parents with similar interests and preferences; or you can make the group private so that it's open for the people you invite via email only. Either way, other parents will not be able to see your personal information until they have joined your group.")}
                              </Text>
                              </View>
                   
                              
                             
                            
                            </View>
                            </ScrollView>
                          </Modal>
            )}
      </ImageBackground>
    </View>
  );
}
const full_app =  withTranslation()(Match)
export default full_app;
const Explorestyles = StyleSheet.create({
  Main: {
    flex: 1,
  },
  ImageBackground: {
    height: "100%",
    width: "100%",
  },
  View1: {
    flex:1,
  },
  view2: {
    backgroundColor: "#008080",
    width: "100%",
    padding: 10,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingTop: 55,
  },
  
  text1: {
    color: "#F9FBDB",
    fontSize: 24,
    fontFamily: "Axiforma-Bold",
  },
  view3: {
    padding: 20,
    marginTop: 10,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  text2: {
    color: "#737373",
    fontSize: 16,
    fontFamily: "Axiforma-Regular",
  },
  img3: {
    width: 25,
    height: 25,
    tintColor: "#F9FBDB",
  },
  view4: {
    paddingLeft: 0,
    paddingRight: 0,
    width: "100%",
    height:'100%',
    alignItems: "center",
    alignSelf:'center'
  },
  view5: {
    flex: 1,
    backgroundColor: "white",
    borderRadius: 10,
    padding: 15,
    marginTop: 15,

  },
  view6: {
    alignItems: "center",

    flexDirection: "row",
  },
  img4: {
    height: 100,
    width: 100,
    borderRadius:120,resizeMode:"contain",
  },
  
  view8: {
    flexDirection: "row",
    marginTop: 10,
  },
  img5: {
    height: 17,
    width: 17,
  },
  text4: {
    color: "#008080",
    fontSize: 16,
    fontFamily: "Axiforma-Regular",
  },
  text5: {
    fontSize: 15,
    fontWeight: "400",
    marginBottom: 10,
    fontFamily: "Axiforma-Regular",
    color: "grey",
  },
  view9: {
    flexDirection: "row",
    alignItems: "center",
    width: "90%",
    justifyContent: "space-between",
  },
  button: {
    height: 40,
    width: 120,
    backgroundColor: "#008080",
    borderRadius: 120,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 20,
    marginRight: 10,
    marginStart: 20,
  },
  buttontxt: {
    color: "white",
    fontSize: 16,
    fontFamily: "Axiforma-SemiBold",
  },
  modalview: {
    backgroundColor: "white",
    width: 326,
    alignSelf: "center",
    borderRadius: 16,
    padding: 20,
  },
  newmodalview: {
    backgroundColor: "white",
    width: 326,
    alignSelf: "center",
    borderRadius: 16,
    padding: 20,
    marginBottom: 20,
  },
  modalview1: {
    width: "100%",
    alignItems: "flex-end",
  },
  crossimg: {
    height: 25,
    width: 25,
  },
  modalview2: {
    alignItems: "center",
    width: "100%",
  },
  modalview3: {
    alignItems: "center",
    width: "100%",
  },

  modalimg: {
    height: 90,
    width: 95,
  },
  modaltxt: {
    fontSize: 24,

    textAlign: "center",
    lineHeight: 25,
    color: "grey",
    marginTop: 14,
    fontFamily: "Axiforma-Bold",
  },
  modaltxt1: {
    fontSize: 17,
    fontFamily: "Axiforma-Regular",
    textAlign: "center",
    color: "#737373",
    marginTop: 5,
    lineHeight: 25,
  },
  modaltxt2: {
    fontSize: 17,
    fontFamily: "Axiforma-Regular",
    textAlign: "center",
    color: "#737373",
    marginTop: 10,
    lineHeight: 25,
  },
  modalview4: {
    flexDirection: "row",
    paddingTop: 10,
  },
  modalview8: {
    flexDirection: "row",
    alignItems: "flex-start",
    marginLeft: 55,
  },
  modalview9: {
    flexDirection: "row",
    paddingTop: 15,
  },
  modalbutton: {
    height: 56,
    width: 170,
    backgroundColor: "#008080",
    borderRadius: 120,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 10,
    marginBottom: 5,
  },
  view7: {
    marginLeft: 20,
  },
  modalview: {
    backgroundColor: "white",
    width: 326,
    borderRadius: 16,
    padding: 20,
    marginBottom: 350,
    marginTop: 100,
    marginLeft: 35,
  },
  crossimg: {
    height: 25,
    width: 25,
  },
  modalview2: {
    alignItems: "center",
    width: "100%",
  },
  modaltxt: {
    fontSize: 24,

    textAlign: "center",
    lineHeight: 25,
    color: "grey",
    marginTop: 17,
    fontFamily: "Axiforma-Bold",
  },
  modaltxt1: {
    fontSize: 17,
    fontFamily: "Axiforma-Regular",
    textAlign: "center",
    color: "#737373",
    marginTop: 5,
    lineHeight: 25,
  },
  text3: {
    fontSize: 18,
    fontFamily: "Axiforma-Bold",
    color: "grey",
    width:'80%'
  },
  view8: {
    flexDirection: "row",
    marginTop: 10,
  },
  img5: {
    height: 17,
    width: 15,
  },
  text4: {
    color: "#008080",
    fontSize: 16,
    marginLeft: 10,
    fontFamily: "Axiforma-Regular",
  },
 
  view9: {
    flexDirection: "row",
    alignItems: "center",
    width: "90%",
    justifyContent: "space-between",
  },
  button: {
    height: 40,
    width: 120,
    backgroundColor: "#008080",
    borderRadius: 120,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 20,
    marginRight: 10,
    marginStart: 20,
  },
  buttontxt: {
    color: "white",
    fontSize: 16,
    fontFamily: "Axiforma-SemiBold",
  },
  notificationmodalview: {
    backgroundColor: "white",
    width: 326,
    borderRadius: 16,
    padding: 20,
    marginBottom: 350,
    marginTop: 120,
    marginLeft: 35,
  },
  modalview1: {
    width: "100%",
    alignItems: "flex-end",
  },
  crossimg: {
    height: 25,
    width: 25,
  },
  modalview2: {
    alignItems: "center",
    width: "100%",
  },

  modalimg: {
    height: 92,
    width: 99,
  },
  modaltxt: {
    fontSize: 24,

    textAlign: "center",
    lineHeight: 25,
    color: "grey",
    marginTop: 17,
    fontFamily: "Axiforma-Bold",
  },
  modaltxt1: {
    fontSize: 17,
    fontFamily: "Axiforma-Regular",
    textAlign: "center",
    color: "#737373",
    marginTop: 5,
    lineHeight: 25,
  },
  modalview4: {
    flexDirection: "row",
    paddingTop: 10,
  },
 
  modalview9: {
    flexDirection: "row",
    alignItems: "flex-start",
    paddingTop: 15,
  },
  modalbutton: {
    height: 58,
    width: 170,
    backgroundColor: "#008080",
    borderRadius: 120,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 40,
    marginBottom: 10,
  },
});
