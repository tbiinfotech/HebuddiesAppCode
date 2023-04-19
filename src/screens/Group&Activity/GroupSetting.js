import React, { useState, useEffect, useCallback } from "react";
import {
  SafeAreaView,
  StyleSheet,
  View,
  ImageBackground,
  Image,
  Text,
  FlatList,
  TouchableOpacity,
  ScrollView,
  TextInput,
  Alert
} from "react-native";
import { useTranslation, withTranslation, Trans } from 'react-i18next';
import firestore from '@react-native-firebase/firestore';
import '../translation/i18n'
import Checkbox from "expo-checkbox";
import Modal from "react-native-modal";
import { Dropdown, MultiSelect } from "react-native-element-dropdown";
import DropDownPicker from "react-native-dropdown-picker";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { Menu, MenuItem, MenuDivider } from "react-native-material-menu";
import AsyncStorage from "@react-native-async-storage/async-storage";
import ToggleSwitch from "toggle-switch-react-native";
import constants from "../constants/constants";
import axios from "axios";
import { useIsFocused } from "@react-navigation/native";
const GroupSetting = ({ navigation, route }) => {
  const {
    CreatedBy,
    CurrentUserId,
    userID,
    userToken,
    GROUP_ID,
    GROUP_IMAGE,
    GROUP_NAME,
    GROUP_TYPE

  } = route.params;
 
  // console.log("lk;k;",GROUP_TYPE)
  // console.log("090099",GROUP_NAME,GROUP_ID,userID)
  const isFocused = useIsFocused();
  const [value1, setValue1] = useState(null);
  const [isChecked, setisChecked] = useState(true);
  const [isChecked1, setisChecked1] = useState(false);
  const [isVisible, setisVisible] = useState(false);
  const [isVisible1, setisVisible1] = useState(false);
  const [infoVisible, setinfoVisible] = useState(false);
  const [infoVisible1, setinfoVisible1] = useState(false);
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState(null);
  const [reason, setReason] = useState("");
  const [reason1, setReason1] = useState("");
  const [isFocus, setIsFocus] = useState(false);
  const [Zipcode, setZIP_code] = useState([]);
  const [value2, setValue2] = useState(null);
  const [isFocus2, setIsFocus2] = useState(false);
  const [on, seton] = useState(true);
  const[slider,setSlider]=useState(false)
  const [on1, seton1] = useState(false);
  const [selected, setSelected] = useState([]);
  const[member_count,setMember_count]=useState("")
  const [userId,setUserId]=useState('')
  const [firebaseid,setFirebaseid]=useState('')
  const[preZipcode,setPreZipcode]=useState([])
  const[leavegroup ,setreasonleavegroup]=useState("")
  const {t, i18n} = useTranslation();
  const data = [
    { label: "1002", value: "1002" },
    { label: "1003", value: "1003" },
    { label: "1004", value: "1004" },
  ];
  const Toggle_Switch = (sldd) => {
    if(sldd){
      setSlider(false)
      checkgroups(sldd); 
    } 
   
else
      {
        groupfull_notification(sldd)
    }

     
    
    setTimeout(function(){
      //alert(slider)
      // if (slider) {
      //   alert(slider)
      //   // checkgroups(); 
      // }
      // else{
      //   alert(slider)
      //   // groupfulsl_notification()
      // } 
    }, 300)
    
  };


  useEffect(() => {
    getzipcode()
    Zip_code();
    groupfull();
    getgroupnotification()
    getUserPrefrence()
  

  }, [isFocused]);
const getzipcode=async()=>{
  var zip=await AsyncStorage.getItem("GROUPs_zipcode")
  var zipArr = zip.split(",")
  // alert(zip)
  setPreZipcode(zipArr)
}
  const getgroupnotification=async()=>{
    var token = await AsyncStorage.getItem("token");
    var gId = await AsyncStorage.getItem("GROUPs_IDD");
    var FormData = require('form-data');
    var data = new FormData();
    data.append('group_id', gId);

    var config = {
      method: 'post',
      url:  constants.BASE_URL + "api/group/group_full_notification_get",
      headers: {
        Authorization: "Bearer " + JSON.parse(token),
      },
      data: data,
    };
    
    axios(config)
    .then(async (response)=> {
      // console.log("utut68686897979",JSON.stringify(response.data));
  
      await AsyncStorage.setItem("status",JSON.stringify(response.data.data))
      setSlider(response.data.data);
      setMember_count(response.data.membersCount)
      setFirebaseid(response.data.firebase_id)
      if(response.data.membersCount==6){
        setSlider(false)
    
      }
     
     

    })
    .catch(function (error) {
      // console.log(error);
    });
    
  }
  async function fetchData1(){
        
    var userId  = await AsyncStorage.getItem('user_id')
      const subscriber = firestore()
    .collection('groups')
    .onSnapshot(querySnapshot => {
      // console.log("dsddddsdsquerySnapshotdsdsds",querySnapshot)
        var Arr=[]
        querySnapshot.docs.map((item,index)=>{
              // console.log("item++++++++++++++++++",item)
          if(item.data().users!=[]){
              
              item.data().users.map((item1,index1)=>{
                 
                  if(item1.userId==userId){
                  
                          var lastMsg='';
                          var lastmsgTime=''  
                          var senderName=''
                      if(item.data()?.messages){
                            
                            var length=item.data().messages.length
                        
                                var lastMsg=item.data().messages[0].dataText;
                                var lastmsgTime = item.data().messages[0].time;
                                var senderName = item.data().messages[0].name;
                          
                              //  console.log(">>>>>>324233>>>ddffdfdf>>>>>>>>>", lastmsgTime)
                              //   console.log("AAAAAAAAAAAA",lastMsg)
                              
                          }
                     
                          var obj={
                              "groupName":item.data().group_name,
                              "groupImage":item.data().group_photo,
                               "Id":item.data().firebaseGroupId,
                               "lastMsg":lastMsg,
                               "time":lastmsgTime,
                               "senderName":senderName
                          }
                      Arr.push(obj)
                  }
                  
               
              })
          }
          
           })
           
              setGroupArray(Arr)
              // console.log("32323232323232",Arr)
               loader1='false';
         
            
           setTimeout(() => {
              setLoader(false)
           }, 1000);
           
        });
      
        return () => subscriber();
  }
  const checkgroups = async (slddd) => {
    
    Alert.alert(
      t("Alert"),
     t("Please make sure to check in with your group before making this change"),
      [
        {
          text: t("OK"),
          onPress: () => {
          navigation.navigate("Chat",{"ID":firebaseid})
          },
          style: "OK",
        },
        {
          text: t("Already checked"),
          onPress: () => {
           groupfull_notification(slddd)
          },
        },
      ],
    );
  };
  const items = [
    {
      label: t("I am too busy to prioritise this group"),
      value: t("I am too busy to prioritise this group"),
    },
    {
      label:t("I have moved to another area"),
      value: t("I have moved to another area"),
    },
    {
      label: t("The group atmosphere was not a match for me"),
      value: t("The group atmosphere was not a match for me"),
    },
    { label: t("Other"), value: t("Other") },
  ];
  const [show, setshow] = useState(false);
  const [show1, setShow1] = useState(false);
  const visibleinfo = () => {
    if (infoVisible == true) {
      setinfoVisible(false);
      setinfoVisible1(false);
    }
    if (infoVisible == false) {
      setinfoVisible(true);
      setinfoVisible1(false);
    }
  };
  const visibleinfo1 = () => {
    if (infoVisible1 == true) {
      setinfoVisible1(false);
      setinfoVisible(false);
    }
    if (infoVisible1 == false) {
      setinfoVisible1(true);
      setinfoVisible(false);
    }
  };
  const hideMenu = () => setinfoVisible(false);
  const hideMenu1 = () => setinfoVisible1(false);

  async function fetchData(){
    var userId  = await AsyncStorage.getItem('user_id')
    setUserId(userId)

   
}
  const toggleModal = () => {
    setisVisible(!isVisible);
  };

  const toggleModal1 = () => {
    setisVisible1(!isVisible1);
  };

  const ondropdownchange = (value) => {
    if (value == "Other") {
      setshow(true);
    }
    else if (value == "Andet") {
      setshow(true);
    }
     else {
      setshow(false);
    }
  };

  const getUserPrefrence = async () => {
    var langg =await AsyncStorage.getItem("langugae")
    var token = await AsyncStorage.getItem("token");
 
    var axios = require('axios');

var config = {
  method: 'get',
  url: constants.BASE_URL + "api/group/user_preference",
  headers: {
    Authorization: "Bearer " + JSON.parse(token),
    "X-localization": langg==null?"da":langg,
  },
};
axios(config)
.then(async (response)=> {
  // console.log("hjjjkklllkjhh",response.data);
  if(response.data.status==true){

  // var zipArr=response.data.data.zip_codes.split(",")
  // setPreZipcode(zipArr)
  setGrpage(response.data.data.age_group)
  setValue1(response.data.data.age_group)
  getDetails1()
}
else{

}
  
})
.catch(function (error) {
  // console.log(error);
});

  }
 
  const updateZipCode=async()=>{
  
    var token = await AsyncStorage.getItem("token");
    var gId = await AsyncStorage.getItem("GROUPs_IDD");
    var data = new FormData();
    data.append('group_id', gId);
    data.append('zipcode', selected.toString());

// console.log("8867890p0-]oiuyiyiy",data)
var config = {
  method: 'post',
  // url: 'https://development.brstdev.com:5076/api/groups/add_zipcode',
  url: constants.BASE_URL + "api/groups/add_zipcode",
  headers: { 
    'Authorization': 'Bearer '+ JSON.parse(token), 
   
  },
  data : data
};

axios(config)
.then(function (response) {
  // console.log("uyiyyiyirrrry",JSON.stringify(response.data));
  if(response.data.status==true){

  }
  
})
.catch(function (error) {
  // console.log(error);
});

  }
  const Zip_code = async () => {
    var token = await AsyncStorage.getItem("token");
    var axios = require("axios");

    var config = {
      method: "get",
      // url: "https://development.brstdev.com:5076/api/zipcodes",
      url: constants.BASE_URL + "api/zipcodes",

      headers: {
        Authorization: "Bearer " + JSON.parse(token),
      },
    };

    axios(config)
      .then(async (response)=>{
        // console.log("ZIPCODE", JSON.stringify(response.data));
        setZIP_code(response.data.data);
        await AsyncStorage.setItem("ZIPCODES",JSON.stringify(response.data.data[0].zipcode))
        // console.log("2232223232",JSON.stringify(response.data.data))
        
      })
      .catch(function (error) {
        // console.log(error);
      });
  };
  const groupfull = async () => {
    var token = await AsyncStorage.getItem("token");
    var langg =await AsyncStorage.getItem("langugae")
    var gId = await AsyncStorage.getItem("GROUPs_IDD");
    var axios = require("axios");

    var FormData = require("form-data");
    var data = new FormData();
    data.append("group_id", gId);
    var config = {
      method: "post",
      url: constants.BASE_URL + "api/group/group_is_full",
      headers: {
        Authorization: "Bearer " + JSON.parse(token),
        "X-localization": langg==null?"da":langg,
      },
      data: data,
    };
    axios(config)
      .then(function (response) {
        if(response.data.data==6){
        seton(false)
        }
      
        else{
          alert(t("Group is full"))
        }
      })
      .catch(function (error) {
        // console.log(error);
      });
  };

  const groupfull_notification = async (slid_value) => {
    
    var token = await AsyncStorage.getItem("token");
    var gId = await AsyncStorage.getItem("GROUPs_IDD");
    var statuss=await AsyncStorage.getItem("status")
    var axios = require("axios");

    var FormData = require("form-data");
    var data = new FormData();

    data.append("group_is_full",  slid_value==true?1:0);
    data.append("group_id",  gId);
    // console.log("hjvmnbmn≤", data);

    var config = {
      method: "post",
      url: constants.BASE_URL + "api/group/group_full_notification",
      headers: {
        Authorization: "Bearer " + JSON.parse(token),
      },
      data: data,
    };
    axios(config)
      .then(function (response) {
        // console.log("terewtfrytf",response.data)
        setSlider(response.data.group_is_full);
        if(response.data.group_is_full=="1"){
          setSlider(true)
        }
     
        else{
          
          setSlider(false)
        }
       
        // console.log("ldfjgl", JSON.stringify(response.data));
      })
      .catch(function (error) {
        // console.log(error);
      });
  };



  const Leavegroup = async () => {
    
    if(reason1 ==""){
    
      alert(t("Please select any reason"))
    }else{

  
    var gId = await AsyncStorage.getItem("GROUPs_IDD");
    var langg =await AsyncStorage.getItem("langugae")
    var token = await AsyncStorage.getItem("token");
    var axios = require("axios");
    var FormData = require("form-data");
    var data = new FormData();
    data.append("group_id", gId);
    data.append("reason", reason1);
// console.log("njhhhkllf7686689",data)
    var config = {
      method: "post",
      url: constants.BASE_URL + "api/group/leave",

      headers: {
        Authorization: "Bearer " + JSON.parse(token),
        "X-localization": langg==null?"da":langg,
      },
      data: data,
    };

    axios(config)
      .then(function (response) {
        if (response.data.status == true) {
          alert(t("Group left successful."));
          setisVisible(false)
          navigation.navigate("MyGroups");

        } else {
          alert(response.data.message);
        }
      })
      .catch(function (error) {
        // console.log(error);
      });
    }
  };

  const leaveGroupFromFirebase=async()=>{
    var det=await firestore()
    .collection('groups')
    .doc(route.params.FirebaseGroupId)
    .get();
    var data = det.data();
    var users1 = det.data().users;
    data.users.map((item,index)=>{
      // console.log('2122646545655654512121',item);
      if(route.params.userIdd==item.userId){
          // console.log('hhjghjfghjgjhghjag');
          users1.splice(index,1)
      }
    })
    // console.log("users1ffdfdfdf",users1);
    data.users=users1;
    // console.log("users1f443323243334fdfdfdf",data);
    await firestore()
    .collection('groups')
    .doc(route.params.FirebaseGroupId)
    .set(data)
    .then(() => {
      // console.log("user removed2222 from firebase")
    })
    .catch(error=>{
      // console.log("user error222 removed from firebase",error)
    })
  }
  const Feedback = async () => {

    if(reason==""){
      alert(t("Please add your feedback"))
    }else{

    var langg =await AsyncStorage.getItem("langugae")
    var gId = await AsyncStorage.getItem("GROUPs_IDD");
    var token = await AsyncStorage.getItem("token");
    var axios = require("axios");
    var FormData = require("form-data");
    var data = new FormData();
    data.append("group_id", gId);
    data.append("feedback", reason);

    var config = {
      method: "post",
      url: constants.BASE_URL + "api/group/feedback",

      headers: {
        Authorization: "Bearer " + JSON.parse(token),
        "X-localization": langg==null?"da":langg,
      },
      data: data,
    };

    axios(config)
      .then(function (response) {

        if (response.data.status == true) {
          alert(t("Your feedback is submitted succesfully."));
          setisVisible1(false)
        } else {
          alert(response.data.message);
        }
      })
      .catch(function (error) {
        console.log(error);
      });
    }
  };
  const goToInvite = async () => {
    navigation.navigate("Invite", {
      GROUP_NAME: GROUP_NAME,
      GROUP_ID: GROUP_ID,
      GROUP_IMAGE: GROUP_IMAGE,
      USER_ID: userID,
      USER_TOKEN: userToken,
    });
   
  };
  return (
    <View style={plansstyle.main}>
      <ImageBackground
        style={plansstyle.ImageBackground}
        source={require("../../asset/Splash.png")}
      >
        <View style={plansstyle.View1}>
          <View style={plansstyle.view2}>
            <TouchableOpacity onPress={() => navigation.navigate("GroupDetails",{"Groupp_id":GROUP_ID})}>
              <Image
                style={plansstyle.img3}
                resizeMode="contain"
                source={require("../../asset/Arrow-Left.png")}
              />
            </TouchableOpacity>

            <Text style={plansstyle.text1}>{t("Group settings")}</Text>
            <Image style={plansstyle.img3} resizeMode="contain" />
          </View>
          <View style={plansstyle.view3}>
            <TouchableOpacity style={plansstyle.view4}>
              <Image
                style={plansstyle.img4}
                source={require("../../asset/Location.png")}
              />
              <View style={{ width: 275, height: 60 }}>
                <Text style={plansstyle.text2}>
                  {t("If you check this box the app will also propose activities in other zip codes")}
                </Text>

                <View
                  style={{
                    flexDirection: "row",
                    alignItems: "flex-start",
                    marginTop: -38,
                    marginLeft: 85,
                  }}
                >
                 
                </View>
                <View
                  style={{ flexDirection: "row", alignItems: "center" }}
                ></View>
              </View>
            </TouchableOpacity>

            <View style={plansstyle.view5}>
              <Checkbox
                style={{
                  marginRight: 13,
                  backgroundColor: "#fff",
                  borderWidth: 0.3,
                }}
                value={isChecked}
                onValueChange={setisChecked}
                color={isChecked ? "#008080" : undefined}
              />
            </View>
          </View>
          <View style={plansstyle.dropDownView}>
            {isChecked==true&&
              <View style={plansstyle.container}>
              <MultiSelect
                style={{
                  alignSelf: "center",
                  borderColor: "#DFE3A3",
                  borderWidth: 1,
                  height: hp(7),
                  width: wp(85),
                  borderRadius: 25,
                  paddingLeft: "8%",
                  paddingEnd: "7%",
                  backgroundColor: "white",
                  marginBottom: 10,
                }}
                placeholderStyle={plansstyle.placeholderStyle}
                selectedTextStyle={plansstyle.selectedTextStyle}
                inputSearchStyle={plansstyle.inputSearchStyle}
                containerStyle={{ backgroundColor: "#F9FBDB" }}
                iconStyle={plansstyle.iconStyle}
                data={Zipcode}
                labelField="zipcode"
                valueField="zipcode"
                placeholder={t("Zip code")}
                value={preZipcode}
                search
                searchPlaceholder={t("Search here")}
                onBlur={() => {
                  updateZipCode();
                }}
                onChange={(item) => {
                  setSelected(item);
                  setPreZipcode(item)                  
                }}
                selectedStyle={plansstyle.selectedStyle}
              />
            </View>
            }
            
          </View>
          {infoVisible && (
            <View
              style={{
                backgroundColor: "#EDEDED",
                paddingHorizontal: 10,
                marginHorizontal: 20,
                justifyContent: "space-between",
                alignItems: "center",
                marginTop: 100,
                borderRadius: 10,
                paddingVertical: 10,
                position: "absolute",
                width: 285,
              }}
            >
              <Menu
                visible={infoVisible}
                anchor={
                  <Text
                    style={{
                      fontSize: 12,
                      color: "grey",
                      justifyContent: "space-between",
                      alignItems: "center",
                    }}
                  >
                    if you prefer activities such as going to cafées or meet in
                    private, chilling and talking - simply enjoying each other’s
                    company{" "}
                  </Text>
                }
                onRequestClose={hideMenu}
              ></Menu>
            </View>
          )}
          <View style={plansstyle.view6}></View>
          <View style={{ flexDirection: "row", width: 285, height: 75 }}>
            <Image
              resizeMode="contain"
              style={{ width: 20, height: 20, marginTop: 18, marginLeft: 20 }}
              source={require("../../asset/Group43.png")}
            />
            <Text
              style={{
                color: "#737373",
                fontSize: 16,
                fontFamily: "Axiforma-Regular",
                marginLeft: 10,
                paddingTop: 20,
              }}
            >
              {t("Group is full/add group member")}
            </Text>

            <ToggleSwitch
              style={{ marginTop: 15, marginLeft: 3}}
              isOn={slider}
              onColor="#008080"
              offColor="#EDEDED"
              size="medium"
              onToggle={(slider) => {
                // alert(slider)
                setSlider(slider);
                Toggle_Switch(slider);
              }}
            />
          </View>
          <View style={plansstyle.view6}></View>
          {/* <View style={{ flexDirection: "row", width: 145, height: 75 }}>
            <Image
              resizeMode="contain"
              style={{ width: 20, height: 20, marginTop: 18, marginLeft: 20 }}
              source={require("../../asset/Group43.png")}
            />
            <Text
              style={{
                color: "#737373",
                fontSize: 16,
                fontFamily: "Axiforma-Regular",
                marginLeft: 5,
                paddingTop: 20,
              }}
            >
              {t("Allow member(s) to join the group")}
            </Text>

            <ToggleSwitch
              style={{ marginTop: 25, marginLeft: 3}}
              isOn={slider}
              onColor="#008080"
              offColor="#EDEDED"
              size="medium"
              onToggle={(slider) => {
                // alert(slider)
                setSlider(slider);
                Toggle_Switch(slider);
              }}
            />
             <Text
              style={{
                color: "#737373",
                fontSize: 16,
                fontFamily: "Axiforma-Regular",
                marginLeft: 5,
                paddingTop: 20,
              }}
            >
              {t("Close group/the group is full")}
            </Text>
          </View> */}
          {infoVisible1 && (
            <View
              style={{
                backgroundColor: "#EDEDED",
                paddingHorizontal: 10,
                justifyContent: "space-between",
                alignItems: "center",
                marginTop: 260,
                borderRadius: 10,
                paddingVertical: 10,
                position: "absolute",
                width: 295,
                height: 70,
                marginHorizontal: 20,
              }}
            >
              <Menu
                visible={infoVisible1}
                anchor={
                  <Text
                    style={{
                      fontSize: 12,
                      color: "grey",
                      justifyContent: "space-between",
                      alignItems: "center",
                    }}
                  >
                    Please indicate if the group is open to add new members or
                    if the group has just the right amount of members{" "}
                  </Text>
                }
                onRequestClose={hideMenu1}
              ></Menu>
            </View>
          )}
          <View style={plansstyle.view6}></View>

          <View style={plansstyle.view3}>
            <TouchableOpacity
              style={plansstyle.feedbackview}
              onPress={() => {
                toggleModal1();
              }}
            >
              <Image
                resizeMode="contain"
                style={plansstyle.img5}
                source={require("../../asset/Message.png")}
              />
              <Text style={plansstyle.feedback}>{t("Feedback")}</Text>
            </TouchableOpacity>
          </View>
          <View style={plansstyle.view6}></View>

          {CreatedBy == CurrentUserId && <View style={plansstyle.view6}></View>}
          <View style={plansstyle.view3}>
            <TouchableOpacity
              onPress={() => {
                toggleModal(), setshow(false);
              }}
              style={plansstyle.leavegroup}
            >
              <Image
                resizeMode="contain"
                style={plansstyle.leaveicon}
                source={require("../../asset/Logout.png")}
              />
              <Text style={plansstyle.text5}>{t("Leave group")}</Text>
            </TouchableOpacity>
            <View style={plansstyle.view5}></View>
          </View>
          <View style={plansstyle.view6}></View>
          {isVisible == true && (
            <Modal
           
              isVisible={true}
              onBackdropPress={() => {
                setisVisible(!isVisible);
              }}
            >
                <KeyboardAwareScrollView>
              <View style={{backgroundColor: "white", width: "100%",borderRadius: 16,padding: 20, marginTop: 50,alignSelf: "center"}}>
              
                {/* <ScrollView> */}
                  <TouchableOpacity
                    onPress={() => setisVisible(false)}
                    style={plansstyle.modalview1}
                  >
                    <Image
                      style={plansstyle.crossimg}
                      resizeMode="contain"
                      source={require("../../asset/cross.png")}
                    />
                  </TouchableOpacity>
                  <View style={plansstyle.modalview2}>
                    <Image
                      resizeMode="contain"
                      style={plansstyle.modalimg}
                      source={require("../../asset/Ciricle(3).png")}
                    />
                    <Text style={plansstyle.modaltxt}>
                      {t("We’re sad to see you go, please spend a few minutes telling us and your group why")}
                    </Text>
                  </View>
                  <Text style={plansstyle.modaltxt1}>{t("Select reason")}</Text>

                  <View style={plansstyle.view7}>
                    <Dropdown
                      data={items}
                      style={{
                        width: "100%",
                        borderRadius: 10,
                        borderColor: "#DFE3A3",
                        backgroundColor: "white",
                        paddingHorizontal: 10,
                        borderWidth: 1,
                      }}
                      maxHeight={200}
                      labelField="label"
                      valueField="value"
                      placeholder={t("Enter reason")}
                      containerStyle={{ borderRadius: 5 }}
                      selectedTextStyle={{ color: "grey" }}
                      placeholderStyle={{
                        fontFamily: "Axiforma-Regular",
                        fontSize: 13,
                        color: "grey",
                      }}
                      value={value}
                      onFocus={() => setIsFocus(true)}
                      onBlur={() => setIsFocus(false)}
                      onChange={(item) => {
                        setValue(item.value);
                        setIsFocus(false);
                        ondropdownchange(item.value);
                        setReason1(item.value);
                      }}
                    />
                  </View>

                  {show && (
                    <TextInput
                      style={{
                        backgroundColor: "white",
                        height: 38,
                        width: "100%",
                        borderRadius: 10,
                        borderWidth: 1,
                        paddingLeft: 10,
                        borderColor: "#DFE3A3",
                      }}
                      placeholder={t("Other")}
                      placeholderTextColor={"grey"}
                      multiline={true}
                      onChangeText={(text) => setReason1(text)}
                    />
                  )}
                  <TouchableOpacity
                    onPress={() => {
                      Leavegroup();
                    }}
                    style={[
                      {
                        marginTop: open ? 50 : 0,
                        height: 58,
                        width: 170,
                        backgroundColor: "#008080",
                        borderRadius: 120,
                        alignItems: "center",
                        justifyContent: "center",
                        marginTop: open ? 50 : 20,
                        alignSelf: "center",
                        marginBottom: 50,
                      },
                    ]}
                  >
                    <Text style={plansstyle.buttontxt}>{t("Submit")}</Text>
                  </TouchableOpacity>
             
              </View>
              </KeyboardAwareScrollView>
            </Modal>
          )}
          {isVisible1 == true && (
            <Modal
              isVisible={true}
              onBackdropPress={() => {
                setisVisible(!isVisible);
              }}
            >
              <View
                style={{
                  backgroundColor: "white",
                  width: "100%",
                  borderRadius: 16,
                  padding: 20,
                  marginTop: 0,
                  alignSelf: "center",
                }}
              >
                  <TouchableOpacity
                    onPress={() => setisVisible1(false)}
                    style={plansstyle.modalview1}
                  >
                    <Image
                      style={plansstyle.crossimg}
                      resizeMode="contain"
                      source={require("../../asset/cross.png")}
                    />
                  </TouchableOpacity>
                  <Text
                    style={{
                      fontSize: 24,
                      textAlign: "center",
                      fontFamily: "Axiforma-Bold",
                      color: "grey",
                      marginTop: 0,
                      alignItems: "center",
                    }}
                  >
                    {t("Feedback")}
                  </Text>
                  <View style={plansstyle.modalview2}>
                    <TextInput
                      style={{
                        backgroundColor: "white",
                        height: 45,
                        width: "100%",
                        borderRadius: 10,
                        borderWidth: 1,
                        paddingLeft: 10,
                        borderColor: "#DFE3A3",
                        marginTop: 20,
                        paddingTop:15
                        
                      }}
                      multiline={true}
                      placeholder= {t("Other")}
                      placeholderTextColor={"grey"}
                      onChangeText={(text) => setReason(text)}
                    />
                  </View>
                  <TouchableOpacity
                    style={[
                      {
                        marginTop: open ? 50 : 0,
                        height: 58,
                        width: 170,
                        backgroundColor: "#008080",
                        borderRadius: 120,
                        alignItems: "center",
                        justifyContent: "center",
                        marginTop: open ? 50 : 30,
                        alignSelf: "center",
                        marginBottom: 30,
                      },
                    ]}
                    onPress={() => {
                      Feedback();
                    }}
                  >
                    <Text style={plansstyle.buttontxt}>{t("Submit")}</Text>
                  </TouchableOpacity>
              </View>
            </Modal>
          )}
        </View>
      </ImageBackground>
    </View>
  );
};
const full_app =  withTranslation()(GroupSetting)
export default full_app;
const plansstyle = StyleSheet.create({
  main: {
    flex: 1,
  },
  ImageBackground: {
    height: "100%",
    width: "100%",
  },
  view5: {
    width: "100%",
  
    borderRadius: 10,
    padding: 15,
    marginTop: 15,
  },
  View1: {
    flex: 1,
  },
  view2: {
    backgroundColor: "#008080",
    width: "100%",
    padding: 10,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingTop: 47,
  },
  img3: {
    width: 27,
    height: 27,
    tintColor: "#F9FBDB",
  },
  text1: {
    color: "#F9FBDB",
    fontSize: 24,
    fontFamily: "Axiforma-Bold",
  },
  view3: {
    paddingVertical: 20,
    paddingStart: 20,
    marginTop: 0,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  text2: {
    color: "#737373",
    fontSize: 16,
    fontFamily: "Axiforma-Regular",
    marginLeft: 10,
    paddingTop: 10,
  },
  feedback: {
    color: "#737373",
    fontSize: 16,
    fontFamily: "Axiforma-Regular",
    marginLeft: 10,
  },
  img4: {
    width: 20,
    height: 20,
    marginTop: 10,
  },
  img5: {
    width: 20,
    height: 20,
  },
  leaveicon: {
    width: 20,
    height: 20,
  },
  view4: {
    flexDirection: "row",
  },
  feedbackview: {
    flexDirection: "row",
    alignItems: "center",
  },
  leavegroup: {
    flexDirection: "row",
    alignItems: "center",
  },
  view6: {
    borderWidth: 0.5,
    borderColor: "#DFE3A3",
    width: "100%",
  },

  text5: {
    color: "#FE7272",
    fontSize: 16,
    fontFamily: "Axiforma-Regular",
    marginLeft: 13.33,
  },
  modalview: {
    backgroundColor: "white",
    width: "100%",
    borderRadius: 16,
    padding: 20,
    marginTop: 0,
    alignSelf: "center",
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
    fontSize: 18,
    fontFamily: "Axiforma-Bold",
    textAlign: "center",
    lineHeight: 28,
    color: "grey",
    marginTop: 19,
  },
  modaltxt1: {
    fontSize: 17,
    fontFamily: "Axiforma-Medium",
    color: "#737373",
    marginTop: 22,
    lineHeight: 25,
  },
  modalview4: {
    flexDirection: "row",
    paddingTop: 15,
  },
  modalview8: {
    flexDirection: "row",
    alignItems: "center",
    marginLeft: 15,
  },
  modalview9: {
    flexDirection: "row",
    alignItems: "center",
    paddingTop: 15,
  },
  modalbutton: {
    height: 58,
    width: 170,
    backgroundColor: "#008080",
    borderRadius: 120,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 30,
    alignSelf: "center",
    marginBottom: 50,
  },
  buttontxt: {
    color: "white",
    fontSize: 16,
    fontFamily: "Axiforma-Bold",
  },
  view7: {
    paddingTop: 20,
    paddingBottom: 25,
  },
  container: {},
  dropdown1: {
    height: hp(6),
    width: wp(85),
    backgroundColor: "white",
    borderRadius: 25,
    padding: 20,
    shadowColor: "red",
    marginRight: 30,
    borderWidth: 1,
    borderColor: "#DFE3A3",

    shadowOffset: {},
  },
  placeholderStyle: {
    fontSize: 13,
    color: "grey",
    fontFamily: "Axiforma-Regular",
  },
  selectedTextStyle: {
    fontSize: 14,
    color: "white",
  },
  iconStyle: {
    width: 20,
    height: 20,
    color: "white",
  },
  inputSearchStyle: {
    height: 40,
    fontSize: 16,
    backgroundColor: "white",
  },
  icon: {
    marginRight: 5,
  },
  item: {
    padding: 17,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  selectedStyle: {
    width: 100,
    height: 35,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 25,
    backgroundColor: "#008080",
    shadowColor: "#000",
    marginTop: 7,
    marginLeft: 25,
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderColor: "#008080",
    borderWidth: 1,
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.2,
    shadowRadius: 1.41,

    elevation: 2,
  },
  textSelectedStyle: {
    marginRight: 5,
    fontSize: 16,
    color: "white",
  },
});