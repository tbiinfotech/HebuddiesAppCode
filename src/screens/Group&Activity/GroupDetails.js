

import React, { useState, useEffect } from "react";
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
  Linking
} from "react-native";
import DatePicker from "react-native-date-picker";
import { useIsFocused } from "@react-navigation/native";
import ReadMore from "@fawazahmed/react-native-read-more";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import { useTranslation, withTranslation, Trans } from 'react-i18next';
import '../translation/i18n'
import constants from "../constants/constants";
import Modal from "react-native-modal";
import firestore from '@react-native-firebase/firestore';
const GroupDetails = ({ navigation, route }) => {
  const isFocused = useIsFocused();
  const [groupDetail, setGroupDetail] = useState({});
  const [grpid, setgrpid] = useState("");
  const [userId, setUserId] = useState("");
  const [Grp_typee, setGrp_typee] = useState("");
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [groupArray,setGroupArray]=useState([])
  const [dateString,setdateString]=useState("")
  const [groupImage,setGroupImage]=useState('')
  const [groupName,setGroupName]=useState('')
  const[member,setMembers]=useState("")
  

  useEffect(() => {
    var currentDate = new Date();
    setSelectedDate(currentDate);
    var IDD = route.params.Groupp_id;
    setgrpid(IDD);
    group_details();
    fetchActivities(IDD);
    setCount()
    getActivity()
  }, [isFocused]);

  const [selected, setselected] = useState(false);
  const [visible, setvisible] = useState(true);
  const [visible1, setvisible1] = useState(false);
  const [visible2, setvisible2] = useState(true);
  const [visible3, setvisible3] = useState(false);
  const [date, setDate] = useState(new Date());
  const [open, setOpen] = useState(false);
  const [time, settime] = useState(new Date());
  const [open1, setOpen1] = useState(false);
  const [grp_title1, setGrp_title1] = useState("");
  const [grp_image, setGrp_Image] = useState("");
  const [grp_Id, setGrp_Id] = useState("");
  const [grp_agee1, setGrp_age1] = useState("");
  const [grp_theme1, setGrp_theme1] = useState("");
  const [grp_location1, setGrp_location1] = useState("");
  const [grpcomposition1, setgrpcomposition1] = useState("");
  const [familycomposition1, setfamilycomposition1] = useState("");
const[firebaseid,setFirebaseid]=useState("")
  const [grp_description, setGrp_desription] = useState("");
  const [grp_member, setGrp_member] = useState("");
  const [members, setmembers] = useState([]);
  const [datesarr, setdatesarr] = useState([]);
  const [loader, setLoader] = useState(true);
  const [createdBy, setCreatedBy] = useState(0);
  const [firebaseGroupId, setFirebaseGroupId] = useState('');
  const [userID, setUserID] = useState();
  const [userToken, setUserToken] = useState("");
  const [activityList, setActivityList] = useState([]);
  const [activityList1, setActivityList1] = useState([]);
  const [activitycount, setActivitycount] = useState([])
  const [activitydetails, setActivitydetails] = useState(false);
  const[isvisibles,setIsvisibles]=useState("");
  const [userName, setUserName] = useState("");
  const[idd,setIDD]=useState([])
  const [suggestionList, setSuggestionList] = useState([]);
  const [badge, setBadge] = useState("")
  
  const { t, i18n } = useTranslation();
  const toggleModal = () => {
    setIsvisibles(!isvisibles);
  };
  const group_details = async () => {
    var token = await AsyncStorage.getItem("token");
    var userID = await AsyncStorage.getItem("user_id");
    setUserToken(token);
    setUserID(userID);
    var axios = require("axios");
    var FormData = require("form-data");
    var data = new FormData();
    data.append("group_id", route.params.Groupp_id);
   
    setLoader(true);
    var config = {
      method: "post",
     
      url: constants.BASE_URL + "api/group/detail",
      headers: {
        "Content-Type": "multipart/form-data",
        Authorization: "Bearer " + JSON.parse(token),
      },
      data: data,
    };

    axios(config)
      .then(async (response) => {
 
        setGrp_theme1(response.data.data.group_theme);
        setGrp_title1(response.data.data.group_title);
        setGrp_Image(response.data.data.group_image);
        setGrp_Id(response.data.data.group_id);
        setGrp_age1(response.data.data.age_group);
        setGrp_location1(response.data.data.group_zipcode);
        setGrp_desription(response.data.data.group_description);
        setmembers(response.data.data.members);
        setGrp_member(response.data.data.member_count);
        setCreatedBy(response.data.data.created_by);
        setFirebaseGroupId(response.data.data.firebase_id)
        setGrp_typee(response.data.data.group_type)
        await AsyncStorage.setItem(
          "GROUPs_IDD",
          JSON.stringify(response.data.data.group_id)
        );
        await AsyncStorage.setItem(
          "GROUPs_zipcode",
          response.data.data.group_setting_zipcode !== null?response.data.data.group_setting_zipcode:response.data.data.group_zipcode
        );
        // alert(response.data.data.group_setting_zipcode)
        setLoader(false);
      })
      .catch(function (error) {
        // console.log(error);
        setLoader(false);
      });
  };
  function hasOneDigit(val) {
    var newVlaue = 0;
    var valu = String(Math.abs(val)).charAt(0) == val;
    if (valu) {
      newVlaue = "0" + val;
    } else {
      newVlaue = val;
    }
    return newVlaue;
  }
  const getActivity = async () => {
    var langg =await AsyncStorage.getItem("langugae")
    var token = await AsyncStorage.getItem("token");
    var axios = require("axios");
    var data = new FormData();
    data.append("date", selectedDate.toLocaleDateString());
    var config = {
      method: "post",
      url: constants.BASE_URL + "api/activity/date/lists",
      headers: {
        Authorization: "Bearer " + JSON.parse(token),
        'X-localization': langg,
      },
      data: data,
    };

    axios(config)
      .then(async (response) =>{
   
      
        setActivityList1(response.data.data)
      
        if(response.data.status==true){
         
        }
        
      })
      .catch(function (error) {
        // console.log(error);
       
        setActivityLoader(false);
      });
  };
  const goToInvite = async () => {
    navigation.navigate("Invite", {
      CreatedBy: createdBy,
      CurrentUserId: userID,
      userIdd: userID,
      userToken: userToken,
      GROUP_NAME: grp_title1,
      GROUP_IMAGE: grp_image,
      GROUP_ID: grp_Id,
      GROUPTYPE: Grp_typee
    });

  };
  const setCount = async () => {
    await AsyncStorage.setItem("BadgeCount", "1")
    setBadge("1")
  }
 

  const Data1 = [
    {
      id: 1,
      img: require("../../asset/Ellipse46.png"),
      txt: "Sofiane benamar",
    },
    {
      id: 2,
      img: require("../../asset/Ellipse46.png"),
      txt: "Ayman digbeu",
    },
    {
      id: 3,
      img: require("../../asset/Ellipse46.png"),
      txt: "Junior ndolo",
    },
    {
      id: 4,
      img: require("../../asset/Ellipse46.png"),
      txt: "Ahmed ndiaye",
    },
    {
      id: 5,
      img: require("../../asset/Ellipse46.png"),
      txt: "Rayan jouani",
    },
    {
      id: 6,
      img: require("../../asset/Ellipse46.png"),
      txt: "Lucas derlot",
    },
  ];

  const Data2 = [
    {
      id: 1,
      text: "Go to sam’s cafe",
      text2: "15 july, 2022",
      text3: "1:00 Pm - 4:45 Pm",
      image: require("../../asset/Calendar(2).png"),
      image1: require("../../asset/TimeCircle.png"),
    },
    {
      id: 1,
      text: "Go to sam’s cafe",
      text2: "15 july, 2022",
      text3: "1:00 Pm - 4:45 Pm",
      image: require("../../asset/Calendar(2).png"),
      image1: require("../../asset/TimeCircle.png"),
    },
    {
      id: 1,
      text: "Go to sam’s cafe",
      text2: "15 july, 2022",
      text3: "1:00 Pm - 4:45 Pm",
      image: require("../../asset/Calendar(2).png"),
      image1: require("../../asset/TimeCircle.png"),
    },
    {
      id: 1,
      text: "Go to sam’s cafe",
      text2: "15 july, 2022",
      text3: "1:00 Pm - 4:45 Pm",
      image: require("../../asset/Calendar(2).png"),
      image1: require("../../asset/TimeCircle.png"),
    },
  ];
  function monthName (date) {
   
    const mlist = [
      "Jan",
      "Feb",
      "March",
      "April",
      "May",
      "Jun",
      "Jul",
      "Aug",
      "Sept",
      "Oct",
      "Nov",
      "Dec",
    ];
    return mlist[date.getMonth()];
  };
  const fetchActivities = async (id) => {

    var token = await AsyncStorage.getItem("token");
    var TOKEN = JSON.parse(token);
    
    var axios = require("axios");
    var data = new FormData();
    data.append("group_id", id);
   

    var config = {
      method: "post",
     
      url: constants.BASE_URL + "api/activity/group_activity_lists",
      headers: {
        "Content-Type": "multipart/form-data",
        Authorization: "Bearer " + TOKEN,
      },
      data: data,
    };
    axios(config)
      .then(function (response) {       
        setActivityList(response.data.data)
        setFirebaseid(response.data.firebase_id)

      })
      .catch(function (error) {
        // console.log(error);
      });
  
  };

 
  async function fetchData(){
        
    var userId  = await AsyncStorage.getItem('user_id')
      const subscriber = firestore()
    .collection('groups')
    .onSnapshot(querySnapshot => {
      
        var Arr=[]
        querySnapshot.docs.map((item,index)=>{
            
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
             
            
         
            
           setTimeout(() => {
              setLoader(false)
           }, 1000);
           
        });
      
        return () => subscriber();
  }
  return (
    <View style={groupdetailstyle.Main}>
      <ImageBackground
        style={groupdetailstyle.ImageBackground}
        source={require("../../asset/Splash.png")}
      >
        <View style={groupdetailstyle.view2}>
          <TouchableOpacity onPress={() => navigation.navigate("MyGroups")}>
            <Image
              style={groupdetailstyle.img3}
              resizeMode="contain"
              source={require("../../asset/Arrow-Left.png")}
            />
          </TouchableOpacity>

          <Text style={groupdetailstyle.text1}>{t("Group details")}</Text>
          <TouchableOpacity
            onPress={() =>
              navigation.reset({
                index: 0,
                routes: [
                  {
                    name: "GroupSetting",
                    params: {
                      CreatedBy: createdBy,
                      FirebaseGroupId: firebaseGroupId,
                      CurrentUserId: userID,
                      userIdd: userID,
                      userToken: userToken,
                      GROUP_NAME: grp_title1,
                      GROUP_IMAGE: grp_image,
                      GROUP_ID: grp_Id,
                    },
                  },
                ],
              })
            }
          >
           
            <Image
              style={groupdetailstyle.img3}
              resizeMode="contain"
              source={require("../../asset/Setting.png")}
            />
          </TouchableOpacity>
        </View>
        {loader ? (
          <ActivityIndicator
            animating={true}
            size={"large"}
            color={"#008080"}
            style={{ marginTop: 20 }}
          />
        ) : (
          <View style={groupdetailstyle.View1}>
            <ScrollView>
              <Text style={groupdetailstyle.text2}>{grp_title1}</Text>

              <View style={groupdetailstyle.view7}>
                <View style={groupdetailstyle.view8}>
                  <Image
                    style={groupdetailstyle.img5}
                    resizeMode="contain"
                    source={require("../../asset/chill.png")}
                  />
                  <Text style={groupdetailstyle.text4}>{grp_theme1}</Text>
                </View>

              </View>
              <View style={{
                paddingTop: 6,
                flexDirection: "row",
                marginStart: 20,
              }}>
                <Image
                  style={groupdetailstyle.img5}
                  resizeMode="contain"
                  source={require("../../asset/Location.png")}
                />
                <Text style={groupdetailstyle.text4}>{grp_location1} </Text>
              </View>
              <View style={groupdetailstyle.view10}>
                <Image
                  style={groupdetailstyle.img5}
                  resizeMode="contain"
                  source={require("../../asset/Profile(2).png")}
                />
                <Text style={groupdetailstyle.text4}>{t("Age group")}:</Text>
                <Text style={groupdetailstyle.text4}>{grp_agee1}</Text>
              </View>
              <View>
                <ReadMore
                  numberOfLines={3}
                  style={groupdetailstyle.text7}
                  seeMoreText="Read More"
                  seeLessText="Read less"
                  seeLessStyle={{
                    fontSize: 16,
                    color: "#008080",
                    fontFamily: "Axiforma-SemiBold",
                    marginRight: 20,
                  }}
                  seeMoreStyle={{
                    fontSize: 16,
                    color: "#008080",
                    fontFamily: "Axiforma-SemiBold",
                    marginRight: 30,
                  }}
                >
                  {grp_description}
                </ReadMore>
              </View>
              {Grp_typee !== "public" &&
                <View style={{ flexDirection: 'row', alignItems: 'center', alignSelf: 'center', flex: 3 }}>
                  <View style={{ flex: 1 }}>
                    {/* {Grp_typee!=="public"&& */}
                    <TouchableOpacity
                      style={{ alignSelf: 'center', marginLeft: 30 }}
                      onPress={() => goToInvite()}
                    >
                      <Image
                        style={{
                          height: 52,
                          width: 52,
                        }}
                        resizeMode="contain"
                        source={require("../../asset/invite_group.png")}
                      />
                      <Text style={{
                        fontSize: 18,
                        fontFamily: "Axiforma-Bold",
                        color: "grey", marginTop: 5
                      }}>{t("Invite")}</Text>
                    </TouchableOpacity>
                    {/* } */}
                  </View>

                  <View style={{ flex: 1 }}>
                    <TouchableOpacity
                      style={{ alignSelf: 'center', marginLeft: 10 }}
                      onPress={() =>{            
                         navigation.navigate("MessageScreen",{"Id":firebaseGroupId})
                      }}>
                      <Image
                        style={groupdetailstyle.img7}
                        resizeMode="contain"
                        source={require("../../asset/Frame5.png")}
                      />
                      <Text style={{
                        fontSize: 18,
                        fontFamily: "Axiforma-Bold",
                        color: "grey", marginLeft: 7
                      }}>{t("Chat")}</Text>
                    </TouchableOpacity>
                  </View>
                  <View style={{ flex: 1, }}>
                    <TouchableOpacity
                      style={{ alignSelf: 'center', marginBottom: -20 }}
                      onPress={() =>
                        navigation.navigate("CreateAnActivity", {
                          GROUP_ID: grpid,
                        })
                      }
                    >
                      <Image
                        style={{
                          height: 58,
                          width: 58,
                        }}
                        resizeMode="contain"
                        source={require("../../asset/Frame3(2).png")}
                      />
                      <Text style={{
                        fontSize: 18,
                        fontFamily: "Axiforma-Bold",
                        color: "grey", marginLeft: 0

                      }}>{t("Schedule activity")}</Text>

                    </TouchableOpacity>
                  </View>
                </View>
              }
              {Grp_typee == "public" &&
                <View style={{ flexDirection: 'row', alignItems: 'center', alignSelf: 'center', }}>


                  <View >
                    <TouchableOpacity
                      style={{ alignSelf: 'center', marginLeft: 70 }}
                      onPress={() =>{
                                      
                        navigation.navigate("MessageScreen",{"Id":firebaseGroupId})
                      }}
                    >
                      <Image
                        style={groupdetailstyle.img7}
                        resizeMode="contain"
                        source={require("../../asset/Frame5.png")}
                      />
                      <Text style={{
                        fontSize: 18,
                        fontFamily: "Axiforma-Bold",
                        color: "grey", marginLeft: 7
                      }}>{t("Chat")}</Text>
                    </TouchableOpacity>
                  </View>
                  <View>
                    <TouchableOpacity
                      style={{ alignSelf: 'center', marginBottom: 0, marginLeft: 40 }}
                      onPress={() =>
                        navigation.navigate("CreateAnActivity", {
                          GROUP_ID: grpid,
                        })
                      }
                    >
                      <Image
                        style={{
                          height: 58,
                          width: 58,
                        }}
                        resizeMode="contain"
                        source={require("../../asset/Frame3(2).png")}
                      />
                      <Text style={{
                        fontSize: 18,
                        fontFamily: "Axiforma-Bold",
                        color: "grey", marginLeft: 0

                      }}>{t("Schedule activity")}</Text>

                    </TouchableOpacity>
                  </View>
                </View>
              }
              <View
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                  justifyContent: "space-between",
                  backgroundColor: "white",
                  marginTop: 25,
                  paddingVertical: 26,
                  paddingStart: 36,
                  paddingEnd: 59,
                }}
              >
                <TouchableOpacity
                  onPress={() => {
                    setvisible(true),
                      setvisible1(false),
                      setvisible2(true),
                      setvisible3(false);
                  }}
                >
                  {visible2 == true ? (
                    <View style={{ flexDirection: "row" }}>
                      <Text
                        style={{
                          fontSize: 18,
                          fontFamily: "Axiforma-Bold",
                          color: "#008080",
                        }}
                      >
                        {t("Members ")}{"  "}
                      </Text>
                      <Text
                        style={{
                          fontSize: 18,
                          fontFamily: "Axiforma-Bold",
                          color: "#008080",
                        }}
                      >
                        ({grp_member})
                      </Text>
                    </View>
                  ) : (
                    <View style={{ flexDirection: "row" }}>
                      <Text
                        style={{
                          fontSize: 18,
                          fontFamily: "Axiforma-Bold",
                          color: "#737373",
                        }}
                      >
                        {t("Members ")}{"  "}
                      </Text>
                      <Text
                        style={{
                          fontSize: 18,
                          fontFamily: "Axiforma-Bold",
                          color: "#737373",
                        }}
                      >
                        ({grp_member})
                      </Text>
                    </View>
                  )}
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={() => {
                    setvisible1(true),
                      setvisible(false),
                      setvisible2(false),
                      setvisible3(true);
                  }}
                >
                  {visible3 == true ? (
                    <Text
                      style={{
                        fontSize: 18,
                        fontFamily: "Axiforma-Bold",
                        color: "#008080",
                      }}
                    >
                      {t("Activities")}
                    </Text>
                  ) : (
                    <Text
                      style={{
                        fontSize: 18,
                        fontFamily: "Axiforma-Bold",
                        color: "#737373",
                      }}
                    >
                      {t("Activities")}
                    </Text>
                  )}
                </TouchableOpacity>
              </View>
              {visible2 == true && (
                <View
                  style={{ width: 190, borderWidth: 2, borderColor: "#008080" }}
                ></View>
              )}
              {visible3 == true && (
                <View
                  style={{
                    width: 190,
                    borderWidth: 2,
                    borderColor: "#008080",
                    alignSelf: "flex-end",
                  }}
                ></View>
              )}
              {visible == true && (
                <View style={{ flex: 1, paddingBottom: 25 }}>
                  {loader == true ? (
                    <ActivityIndicator size="large" color="#008080" />
                  ) : (
                    <FlatList
                      data={members}

                      renderItem={({ item }) => {

                        return (
                          <View
                            style={{
                              flexDirection: "row",
                              alignItems: "center",
                              marginTop: 30,
                              paddingHorizontal: 15,
                              width: "90%",
                            }}

                          >
                            <View
                              style={{
                                height: 34,
                                width: 34,
                                backgroundColor: "white",
                                borderRadius: 17,
                              }}
                            >
                              <Image
                                style={{ width: 34, height: 34, borderRadius: 18, resizeMode: 'cover' }}

                                source={{ uri: item.image }}
                              />
                            </View>

                            <Text
                              style={{
                                fontSize: 16,
                                fontFamily: "Axiforma-Regular",
                                marginLeft: 15,
                                color: "grey",
                              }}
                            >
                              {item.name}
                            </Text>
                          </View>
                        );
                      }}
                    />
                  )}
                </View>
              )}
              {visible1 == true && (
                <View style={groupdetailstyle.view4}>
                  {activityList.length > 0 &&
                    <FlatList
                      data={activityList}
                      renderItem={({ item, index}) => {
                        
                        var date = new Date(item.created_at).getDate();
                        var month = new Date(item.created_at).getMonth() + 1;
                        var year = new Date(item.created_at).getFullYear();
                        const FinalDate = hasOneDigit(date) + "-" + monthName(new Date(item.created_at)) + "-" + year;

                        var date1 = new Date(item.final_timeslots).getDate();
                        var month1 = new Date(item.final_timeslots).getMonth() + 1;
                        var year1 = new Date(item.final_timeslots).getFullYear();
                        const FinalSelectedDate = hasOneDigit(date1) + "-" + monthName(new Date(item.final_timeslots)) + "-" + year1;
               
                        
                        var date = new Date(item.created_at)
                        return (

                          <View style={groupdetailstyle.view5} >
                            <TouchableOpacity   >
                              <View style={{ flex: 1, width: '100%', }}>
                                <View style={{ flexDirection: 'row', flex: 0.7 }}>
                                  <View style={{ width: "85%" }}>
                                    <Text
                                      style={{
                                        color: "grey",
                                        fontSize: 18,
                                        fontFamily: "Axiforma-Bold",
                                      }}
                                    >
                                      {item.activity}
                                    </Text>
                                  </View>
                                  {(item.poll_status != true && item.final_activity != true) && (
     <View style={{ flexDirection: "row", flex: 0.3, }}>

     <Text style={{ textAlign: "center", alignItems: 'flex-end', fontSize: 25, color: "red", fontFamily: "Axiforma-Regular", marginTop: 0, marginLeft: 0 }}>
       !
     </Text>
   </View>
                                  )}
                                 
                                   {!item.in_progress &&

<View style={{ flexDirection: "row", marginLeft: -4 }}>

  <Image
    source={require("../../asset/tickicon.png")}
    style={{ height: 25, width: 25, marginBottom: 10,tintColor:'green' }}
  />

  
</View>
}

                                </View>
                                <TouchableOpacity
                                  onPress={() => setOpen(true)}
                                  style={{
                                    flexDirection: "row",
                                    alignItems: "center",
                                    marginTop: 6,
                                  }}
                                >
                                  <Image
                                    source={require("../../asset/Calendar.png")}
                                    style={{ height: 15.83, width: 15.83 }}
                                  />
                                  {!item.final_activity ?
 <Text
 style={{
   fontFamily: "Axiforma-Regular",
   color: "#737373",
   fontSize: 16,
   marginStart: 6,
   marginVertical: 6
 }}
>
 {FinalDate}
</Text>
:
<Text
 style={{
   fontFamily: "Axiforma-Regular",
   color: "#737373",
   fontSize: 16,
   marginStart: 6,
   marginVertical: 6
 }}
>
 {FinalSelectedDate}
</Text>
                                  }
                                 

                                </TouchableOpacity>
                                {item.in_progress &&
                                  <View style={{ flexDirection: "row", marginLeft: -4 }}>
                                    <Image
                                      source={require("../../asset/VoteP.png")}
                                      style={{ height: 25, width: 25, tintColor: 'red' }}
                                    />

                                    <Text style={{ textAlign: "center", marginLeft: 0, fontSize: 16, color: "red", marginTop: 5 }}>
                                      Voting in Progress...
                                    </Text>
                                  </View>
                                }
                                 <TouchableOpacity
                                  style={{
                                    justifyContent: "flex-end",
                                    alignItems: "flex-end",
                                    flexDirection: 'row'
                                  }}
                                >

                                  <Text
                                    style={{
                                      color: "#008080",
                                      fontSize: 16,
                                      fontFamily: "Axiforma-SemiBold",
                                      marginRight: 130,
                                      marginTop: 5,
                                    }}
                                    onPress={() =>{
                                      
                                      navigation.navigate("MessageScreen",{"Id":firebaseGroupId})
                                    }}
                                  >
                                    {t("View chat")}
                                  </Text>
                                  
                                  {!item.final_activity && 
                                   <Text
                                   style={{
                                     color: "#008080",
                                     fontSize: 16,
                                     fontFamily: "Axiforma-SemiBold",
                                   }}
                                   onPress={() =>
                                     navigation.navigate("PollActivity", {
                                       DATA: item,
                                       GROUP_ID: grpid,
                                       USER_ID: userID
                                     })
                                   }
                                 >
                                   {t("View Details")}
                                 </Text>
                                  }
                                    {item.final_activity &&
                                   <Text
                                   style={{
                                     color: "#008080",
                                     fontSize: 16,
                                     fontFamily: "Axiforma-SemiBold",
                                   }}
                                   onPress={() =>
                                     {toggleModal(),setGroupDetail(item), setdateString(FinalSelectedDate)}
                                  }
                                  
                                 >
                                   {t("View Details")}
                                 </Text>
                                
                                  }
                                 

                                </TouchableOpacity>

                              </View>
                            </TouchableOpacity>
                            {isvisibles==true &&
                            <Modal
                            isVisible={isvisibles}
                            style={{
                              flex: 0.6,
                              
                            }}
                          
                          >
                            <TouchableOpacity
                              onPress={() => setIsvisibles(false)}
                              style={{
                                alignItems: "flex-end",
                                marginRight: -10,
                                marginTop:50
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
                                padding: 14,
                                justifyContent: "space-evenly",
                              }}
                            >
                              <Text
                                style={{
                                  color: "#008080",
                                  fontSize: 20,
                                  textAlign: "center",
                                  marginVertical: 10,
                                  fontWeight: "bold",
                                  marginLeft: 10,
                                }}
                              >
                                {t("Activity details")}
                              </Text>
                              <View style={{flexDirection:'row',width:'85%'}}>
                  
                             
                              <Text
                                style={{
                                  color: "#008080",
                                  fontSize: 16,
                                  textAlign: "left",
                                  marginVertical: 10,
                                  fontWeight: "bold",
                                  marginLeft: 2,
                                }}
                              >
                           {t("Name")}
                              </Text>
                              <Text
                                style={{
                                  color: "#008080",
                                  fontSize: 16,
                                  textAlign: "left",
                                  marginVertical: 10,
                                  fontWeight: "bold",
                                  marginLeft: 35,
                                }}
                              >
                              {groupDetail.activity}
                              </Text>
                              </View>
                              <View style={{flexDirection:'row',width:'85%'}}>
                              <Text
                                style={{
                                  color: "#008080",
                                  fontSize: 16,
                                  textAlign: "left",
                                  marginVertical: 10,
                                  fontWeight: "bold",
                                
                                }}
                              >
                               {t("Zone")}
                              </Text>
                              <Text
                                style={{
                                  color: "#008080",
                                  fontSize: 16,
                                  textAlign: "left",
                                  marginVertical: 10,
                                  fontWeight: "bold",
                                  marginLeft: 45,
                                }}
                              >
                               {groupDetail.final_zone}
                              </Text>
                             

                              </View>
                                <View style={{flexDirection:'row',width:'70%'}}>
                              <Text
                                style={{
                                  color: "#008080",
                                  fontSize: 16,
                                  textAlign: "left",
                                  marginVertical: 10,
                                  fontWeight: "bold",
                              
                                }}
                              >
                             {t("Time slots")}
                              </Text>
                              <Text
                                style={{
                                  color: "#008080",
                                  fontSize: 16,
                                  textAlign: "left",
                                  marginVertical: 10,
                                  fontWeight: "bold",
                                  marginLeft: 7,
                                }}
                              >
                                {dateString}
                                  
                                
                              </Text>
                             
                            
                              </View>
                             
                          
                              
                           
                             
                             
                            
                            </View>
                            </ScrollView>
                          </Modal>
                            }
                            
                          </View>
                        );
                      }}
                    />
                  }

                </View>
              )}
            </ScrollView>
          </View>
        )}
      </ImageBackground>
    </View>
  );
};
const full_app = withTranslation()(GroupDetails)
export default full_app;
const groupdetailstyle = StyleSheet.create({
  Main: {
    flex: 1,
  },
  ImageBackground: {
    height: "100%",
    width: "100%",
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
    color: "grey",
    fontSize: 24,
    fontFamily: "Axiforma-Bold",
    marginTop: 20,
    marginStart: 20,
  },
  img3: {
    width: 27,
    height: 27,
    tintColor: "#F9FBDB",
  },
  view4: {
    padding: 15,
    flex: 1,
  },
  view5: {
    width: "100%",
    backgroundColor: "white",
    borderRadius: 10,
    padding: 15,
    marginTop: 15,
  },
  view6: {
    width: "100%",
    flexDirection: "row",
  },
  img4: {
    height: 62.9,
    width: 68,
  },
  text3: {
    fontSize: 18,
    fontWeight: "700",
    color: "black",
  },
  view8: {
    flexDirection: "row",
    alignItems: "center",
  },
  img5: {
    height: 17,
    width: 15,
  },
  text4: {
    color: "#737373",
    fontSize: 16,
    marginLeft: 5,
    fontFamily: "Axiforma-Regular",
  },
  text5: {
    fontSize: 16,
    fontWeight: "600",
    textAlign: "right",
    color: "#008080",
  },
  view9: {
    width: "100%",
  },
  button: {
    height: 49,
    width: 177,
    backgroundColor: "#008080",
    borderRadius: 120,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 20,
  },
  buttontxt: {
    color: "white",
    fontSize: 16,
    fontWeight: "600",
  },
  modalview: {
    backgroundColor: "white",
    width: "100%",
    borderRadius: 16,
    padding: 20,
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
    fontWeight: "700",
    textAlign: "center",
    lineHeight: 25,
    color: "black",
  },
  modaltxt1: {
    fontSize: 17,
    fontWeight: "400",
    textAlign: "center",
    color: "#737373",
    marginTop: 5,
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
    width: 177,
    backgroundColor: "#008080",
    borderRadius: 120,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 20,
  },
  view7: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    width: "75%",
    marginStart: 20,
    marginTop: 4,
  },
  view10: {
    paddingTop: 6,
    flexDirection: "row",
    marginStart: 20,
  },
  view11: {
    alignItems: "center",
    paddingHorizontal: 20,
    paddingTop: 25,
    flexDirection: "row",
    alignItems: "center",
  },
  text7: {
    fontSize: 16,
    fontFamily: "Axiforma-Regular",
    marginTop: 25,
    marginHorizontal: 20,
    lineHeight: 29,
    color: "grey",
  },
  view12: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",

    marginHorizontal: 70,
    paddingTop: 30,
  },
  view13: {
    alignItems: "center",
  },
  text8: {
    fontSize: 18,
    fontFamily: "Axiforma-Bold",
    color: "grey",
  },
  textt: {
    fontSize: 18,
    fontFamily: "Axiforma-Bold",
    color: "grey",
    paddingLeft: 20,
  },

  img7: {
    height: 58,
    width: 58,
  },
});