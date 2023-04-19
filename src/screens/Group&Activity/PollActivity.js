import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  ImageBackground,
  TextInput,
  ScrollView,
  StyleSheet,
  ActivityIndicator,
  Linking
} from "react-native";
import Checkbox from "expo-checkbox";
import axios from "axios";
import CheckBox from "@react-native-community/checkbox";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import DraggableFlatList from "react-native-draggable-flatlist";
import Modal from "react-native-modal";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useTranslation, withTranslation, Trans } from "react-i18next";
import "../translation/i18n";
import constants from "../constants/constants";
import { set } from "react-native-reanimated";
const exampleData = [
  {
    order: 1,
    label: "Go to sams cafe",
  },
  {
    order: 2,
    label: "Go to John davids playground",
  },
  {
    order: 3,
    label: "Go to inox cinema ",
  },
];

const PollActivity = ({ navigation, route }) => {
  const { GROUP_ID, DATA, USER_ID } = route.params;
  // console.log("DSAA", DATA);
  const [toggleCheckBox, setToggleCheckBox] = useState(false);
  const [isChecked, setisChecked] = useState(false);
  const [isChecked1, setisChecked1] = useState(false);
  const [isChecked2, setisChecked2] = useState(false);
  const [check, setCheck] = useState(false);
  const [tick, setTick] = useState(false);
  const [vissible, setVissble] = useState(false);
  const [saw1, setSaw1] = useState(false);
  const [number, setNumber] = useState(false);
  const [number1, setNumber1] = useState("2");
  const [number2, setNumber2] = useState("3");
  const [priorityText, setPriorityText] = useState("");
  const [userName, setUserName] = useState("");
  const [userID, setUserID] = useState("");
  const [priorityModal, setPriorityModal] = useState(false);
  const [data, setData] = useState(exampleData);
  const [myPriority, setMypriority] = useState(false);
  const [showRadio, setShowRadio] = useState("false");
  const [showactivity, setShowactivity] = useState("false");
  const [suggestionList, setSuggestionList] = useState([]);
  const [timeSlots, setTimeSlots] = useState([])
  const [isPolled,setIsPolled]=useState(false)
  const[loader,setLoader]=useState("")
  const [groupDetail, setGroupDetail] = useState({});
  const [activitydetails, setActivitydetails] = useState(false);

const[GROUPtitle,settitle]=useState("")

  const [activityVotes, setActivityVotes] = useState([])
  const [timeVotes, setTimeVotes] = useState([])


  const { t, i18n } = useTranslation();
  useEffect(() => {
    // setMypriority(DATA.new_activity);
    // setShowRadio(DATA.meet);
    // setSuggestionList(DATA.activity);
    getActivityDetail()

  }, []);
  const getActivityDetail = async () => {
    var token = await AsyncStorage.getItem("token")

    var data = new FormData();
    setLoader(true)
    data.append('activity_id', DATA.activity_id);


    var config = {
      method: 'post',
      url: constants.BASE_URL + "api/activity/detail",
      
      headers: {
        'Authorization': 'Bearer ' + JSON.parse(token),

      },
      data: data
    };

    axios(config)
      .then(function (response) {
        if (response.data) {
        console.log("gggfgfjhchgcjsj",JSON.stringify(response.data.data))
          setSuggestionList(response.data.data[0].activity_votes)
          
          setIsPolled(response.data.data[0].is_polled)
          // setSuggestionList(response.data.data[0].activity)
          setTimeSlots(response.data.data[0].time_votes)
          // console.log("TIMESLOTSSSSS",response.data.data[0].time_votes)
          setMypriority(response.data.data[0].new_activity)
          setShowRadio(response.data.data[0].meet)
          setLoader(false)
          // setTimeVotes(response.data.data[0].time_votes)
         



          console.log("ACTIVascascsadadasdasdasdasdascascascITY_DETASSS", JSON.stringify(response.data));
        }
      })
      .catch(function (error) {
        console.log(error);
        setLoader(false)
      });

  }
  const ActivityDetail= async()=>{
    var token = await AsyncStorage.getItem("token");
var idd=await AsyncStorage.getItem("ACTIVITYIDD");
    var data = new FormData();
    setLoader(true)
    data.append('activity_id', idd);
    
    var config = {
      method: 'post',
      url: constants.BASE_URL + "api/activity/poll_activity/detail",
      
      headers: {
        'Authorization': 'Bearer ' + JSON.parse(token),

      },
      data: data
    };

    axios(config)
      .then(async (response)=> {
        if (response.data) {
        // console.log("hjhjhjhk",JSON.stringify(response.data.data))
          setLoader(false)
     
         settitle(response.data.data.id)
         alert(response.data.data.id)
        //  console.log("ftudyrtert",response.data.data)

          // console.log("yuyturtert", JSON.stringify(response.data));
        }
      })
      .catch(function (error) {
        // console.log(error);
        setLoader(false)
      });

  }
  const getSuggestions = async () => {
    var axios = require("axios");
    var FormData = require("form-data");
    var data = new FormData();

    var token = await AsyncStorage.getItem("token");
    setLoader(true)
     data.append("group_id", GROUP_ID);
     

    var config = {
      method: "post",
      url: constants.BASE_URL + "api/activity/suggestion",
      headers: {
        Authorization: "Bearer " + JSON.parse(token),
      },
      data: data,
    };

    axios(config)
      .then(async (response) =>{
        await AsyncStorage.setItem("ACTIVITYIDD",JSON.stringify(response.data.data[0].id))
  
        // console.log("uyyuyuy",response.data)
        setSuggestionList(response.data.data);
        setUserName(response.data.name);
     setActivity(response.data.data)
 setLoader(false)
        setUserID(response.data.user_id);
        // console.log(response.data.data);
      })
      .catch(function (error) {
        // console.log(error);
        setLoader(false)
      });
  };
  const renderItem = ({ item, index, drag, isActive }) => {
    // console.log("item", item)
    return (
      <TouchableOpacity
      onPress={() => {setActivitydetails(!activitydetails),setGroupDetail(item)}}
        style={{
          height: 70,
          width: "100%",
          backgroundColor: isActive ? "white" : item.backgroundColor,
          // alignItems: "center",
          // justifyContent: "center",
          paddingHorizontal: 10,
          marginVertical: 10,
          borderWidth: 1,
          borderColor: "#008080",
          borderRadius: 8,
        }}
    
        onLongPress={drag}
      >
        <View
          style={{
            flex: 1,
            backgroundColor: isActive ? "white" : item.backgroundColor,
            alignItems: "center",
            // justifyContent: "center",
            flexDirection: "row",
          }}
        >
          <View style={{ flex: 0.1 }}>
            <Text
              style={{
                color: "grey",
                fontSize: 18,
                fontFamily: "Axiforma-Bold",
                marginRight: 20,
                textAlign: "left",
              }}
            >
              {index + 1}
            </Text>
          </View>
          <View style={{ flex: 0.8 }}>
            <Text
              style={{
                color: "grey",
                fontSize: 18,
                fontFamily: "Axiforma-Bold",
                marginRight: 20,
                textAlign: "left",
              }}
            >
              {item.activity_name}
            </Text>

          </View>
          <View style={{ flex: 0.1, flexDirection: "row", alignItems: "center", justifyContent: "space-between", paddingRight: 10 }}>
            {/* <Text style={{
              color: "grey",
              fontSize: 18,
              fontFamily: "Axiforma-Bold",
              marginRight: 2,
              textAlign: "left",
            }}>{item.vote_count == 0 ? "" : (item.vote_count)}</Text> */}
            {DATA.created_by !== USER_ID && !isPolled &&
            <Image
            source={require("../../asset/Drag.png")}
            style={{
              height: 30,
              width: 30,
              resizeMode: "contain",
              alignSelf: "flex-end",
            }}
          />
            }
          </View>
        </View>
      </TouchableOpacity>
    );
  };
  const onSave = () => {
    if (priorityText == "") {
      alert("Please add priority");
    } else {
      var obj = {
        id: 1,
        activity_name: priorityText,
        vote_count: 0
      };
      setMypriority(true);
      suggestionList.unshift(obj);
      setPriorityModal(false);
    }
  };
  const onNext = () => {
    // return false
    // console.log("SUGGETIONLIST=-=-=-=-=-=-=-=-=-=-", suggestionList);
    var arr = [];
    for (let i = 0; i < suggestionList.length; i++) {
      // console.log("TITIL:E", suggestionList[i].activity_name);
      arr.push(suggestionList[i].activity_name);
    }
    // console.log("hgujfgjghghj=-=-=-=-=-=->>>>>>>>>>>", timeSlots)
    navigation.navigate("PollActivitySubmit", {
      ACTIVITY_ARR: arr,
      GROUP_ID: GROUP_ID,
      DATA: DATA,
      meet: showRadio,
      new_activity: myPriority,
      userID: USER_ID,
      TIME_SLOTS: timeSlots,
      IS_POLL:isPolled
    })

  
  }
  const placeCheck = () => {
    setShowRadio(true);
    var title = "Meet at " + userName + "'s place";
    // var obj = {
    //   title: "Meet at " + userName + "'s place",
    //   id: 1,
    // };
    var ob={
      "activity_name":"Meet at " + userName + "'s place",
      "vote_count":0
      }
    suggestionList.unshift(ob);
  };
  return (
    <ImageBackground
      source={require("../../../Images/background.png")}
      style={styles.Container}
    >
      <View style={styles.ViewStyle}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Image
            source={require("../../../Images/Arrow-Left.png")}
            style={styles.IconStyle}
          />
        </TouchableOpacity>
        <Text style={styles.headerText}>{t("Poll activity")}</Text>
      </View>
      <KeyboardAwareScrollView keyboardShouldPersistTaps="handled">
        <Text style={styles.TextStyle}>{t("Priority")}</Text>
       
        <Text style={styles.textDesign}>
          {(DATA.created_by !== USER_ID) ?
            t("Priorise this list of activities for your next group meetup") :
            t("Selected list of activities for your next group meetup")


          }
        </Text>
        <Text style={styles.textDesign1}>
          {(DATA.created_by !== USER_ID) &&
            t("Press and hold until activity turns white and then you can drag and drop")


          }
        </Text>

        <ScrollView style={{ flex: 1 }}>
          <View
            pointerEvents={(DATA.created_by !== USER_ID && !isPolled)? "auto" : "none"}
            style={{
              // flexDirection: "row",
              // alignItems: "center",
              // marginStart: 20,
              marginTop: 20,
              paddingHorizontal: 16,
            }}
          >
             { loader== true ? (
                <ActivityIndicator size="large" color="#008080"  style={{marginTop:40}}/>
              ) : (
            <DraggableFlatList

              style={{
                fontFamily: "Axiforma-Bold",
                fontSize: 18,
                color: "grey",
                // marginLeft: 10,
              }}
              enable={false}
              scrollEnabled={false}
              data={suggestionList}
              renderItem={renderItem}
              keyExtractor={(item, index) => index.toString()}
              onDragEnd={({ data }) => setSuggestionList(data)}
            />
              )}
           
            {/* {(!myPriority && DATA.created_by !== USER_ID && !isPolled) && (
              <TouchableOpacity
                onPress={() => setPriorityModal(!priorityModal)}
               

                style={{
                  height: 70,
                  width: "100%",
                  backgroundColor: "#008080",
                  alignItems: "center",
                  justifyContent: "center",
                  paddingHorizontal: 10,
                  alignSelf: "center",

                  marginVertical: 10,
                  borderWidth: 1,
                  borderColor: "#008080",
                  borderRadius: 8,
                  flexDirection: "row",
                }}
              >
             
                <Text
                  style={{
                    color: "white",
                    fontFamily: "Axiforma-Medium",
                    fontSize: 16,
                    flex: 0.9,
                  }}
                >
                  {t("Add new activity")}
                </Text>
                <Image
                  style={{ height: 60, width: 60 }}
                  source={require("../../asset/Plus1.png")}
                />
              </TouchableOpacity>
            )} */}
          </View>
        </ScrollView>

      

        {/* {(!showRadio && DATA.created_by !== USER_ID && !isPolled) && (
          <View style={{ flexDirection: "row", marginTop: 20 }}>
            <View style={{ flex: 0.1, marginStart: 20 }} />
            <Text
              style={{
                color: "grey",
                fontSize: 18,
                fontFamily: "Axiforma-Regular",
                flex: 0.9,
              }}
            >
              {t("Can we meet at your place?")}
            </Text>
          </View>
        )} */}

        {/* {(!showRadio && DATA.created_by !== USER_ID && !isPolled ) && (
          <View style={{ flexDirection: "row", marginTop: 10 }}>
            <View style={{ flex: 0.1 }} />
            <View style={{ flex: 0.9, flexDirection: "row" }}>
              <View style={{ flexDirection: "row", marginStart: 20 }}>
                <TouchableOpacity
                  style={{
                    backgroundColor: vissible ? "#008080" : "#fff",
                    height: 22,
                    width: 22,
                    borderRadius: 50,
                    borderWidth: 1,
                    borderColor: "#DFE3A3",
                  }}
                  onPress={() => {
                    setVissble(true), setSaw1(false);
                    placeCheck();
                    // setShowRadio(true);
                  }}
                ></TouchableOpacity>
                <Text
                  style={{
                    color: "#737373",
                    fontSize: 16,
                    fontFamily: "Axiforma-Regular",
                    marginStart: 8,
                  }}
                >
                  {t("Yes")}
                </Text>
              </View>

              <View style={{ flexDirection: "row", marginStart: 44 }}>
                <TouchableOpacity
                  style={{
                    backgroundColor: saw1 ? "#008080" : "#fff",
                    height: 22,
                    width: 22,
                    borderRadius: 50,
                    borderWidth: 1,
                    borderColor: "#DFE3A3",
                  }}
                  onPress={() => {
                    setVissble(false), setSaw1(true);
                    setShowRadio(true);
                  }}
                ></TouchableOpacity>
                <Text
                  style={{
                    color: "#737373",
                    fontSize: 16,
                    fontFamily: "Axiforma-Regular",
                    marginStart: 8,
                  }}
                >
                  {t("No")}
                </Text>
              </View>
            </View>
          </View>
        )} */}

        <TouchableOpacity style={styles.ButtonStyle} onPress={() => onNext()}>
          <Text style={styles.ButtonText}>{t("Next")}</Text>
        </TouchableOpacity>
        <Modal
          isVisible={priorityModal}
          style={{
            // backgroundColor:"red",
            flex: 0.6,
          }}
        // onBackdropPress={() => {
        //   setisVisible(!isVisible);
        // }}
        >
          <TouchableOpacity
            onPress={() => setPriorityModal(false)}
            style={{
              // marginTop: 10,
              alignItems: "flex-end",
              marginRight: -10,
            }}
          >
            <Image
              source={require("../../asset/cros1.png")}
              style={{ resizeMode: "contain", height: 35, width: 35 }}
            />
          </TouchableOpacity>
          <View
            style={{
              backgroundColor: "#F9FBDB",
              borderRadius: 20,
              minHeight: 200,
              //  alignItems: "center",
              padding: 14,
              justifyContent: "space-evenly",
              // shadowOpacity:0.5,shadowRadius:0.5
            }}
          >
            {/* <View> */}
            <Text
              style={{
                color: "#008080",
                fontSize: 16,
                textAlign: "left",
                marginVertical: 10,
                fontWeight: "bold",
                marginLeft: 10,
              }}
            >
              Add your activity
            </Text>
            <View style={{ backgroundColor: "white", padding: 8 }}>
              <TextInput
                style={{
                  backgroundColor: "#fff",
                  maxHeight: 100,
                  color: "grey",
                  borderRadius: 6,
                  // paddingHorizontal: 20,

                  // alignSelf: "flex-start",
                  height: 50,
                  width: 300,
                }}
                placeholder="Tap to enter"
                placeholderTextColor="grey"
                multiline
                onChangeText={(text) => {
                  setPriorityText(text);
                }}
              />
            </View>
            <TouchableOpacity
              onPress={() => onSave()}
              style={{
                backgroundColor: "#008080",
                justifyContent: "center",
                alignItems: "center",
                height: 52,
                marginHorizontal: 5,
                borderRadius: 50,
                marginHorizontal: 10,
                width: 120,
                alignSelf: "center",
                marginTop: 15,
              }}
            >
              <Text style={{ color: "white", fontSize: 16 }}>{t("Save")}</Text>
            </TouchableOpacity>
          </View>
          {/* </View> */}
        </Modal>


        <Modal
          isVisible={activitydetails}
          style={{
            flex: 0.6,
            
          }}
        
        >
          <TouchableOpacity
            onPress={() => setActivitydetails(false)}
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
{groupDetail.activity_name}
            </Text>
            {console.log("vvvvvbbb",groupDetail.title)}
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
             {t("Address")}
            </Text>
            <Text
              style={{
                color: "#008080",
                fontSize: 16,
                textAlign: "left",
                marginVertical: 10,
                fontWeight: "bold",
                marginLeft: 20,
              }}
            >
             {groupDetail.address}
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
           {t("Message")}
            </Text>
            <Text
              style={{
                color: "#008080",
                fontSize: 16,
                textAlign: "left",
                marginVertical: 10,
                fontWeight: "bold",
                marginLeft: 13,
              }}
            >
             {groupDetail.message}
            </Text>
            </View>
      
            {/* {
              groupDetail.website!==undefined&& */}
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
           {t("Website")}
            </Text>
            
            <Text style={{
                color: "#008080",
                fontSize: 16,
                textAlign: "left",
                marginVertical: 10,
                fontWeight: "bold",
                alignItems:'center',
                marginLeft: 20,
                alignSelf:'center'
              }}
              onPress={() => {
                Linking.openURL(groupDetail.link);
              }}>link
                </Text>
                </View>
            {/* } */}
          </View>
          </ScrollView>

        </Modal>
      </KeyboardAwareScrollView>
    </ImageBackground>
  );
};
const full_app = withTranslation()(PollActivity)
export default full_app;
// export default PollActivity;

const styles = StyleSheet.create({
  Container: {
    flex: 1,
  },

  ViewStyle: {
    backgroundColor: "#008080",
    paddingStart: 17,
    flexDirection: "row",
    alignItems: "center",
    paddingTop: 52,
    paddingBottom: 21,
  },

  IconStyle: {
    height: 27,
    width: 27,
    tintColor: "#F9FBDB",
  },

  headerText: {
    fontSize: 24,
    fontFamily: "Axiforma-Bold",
    color: "#F9FBDB",
    marginStart: 70,
  },

  TextStyle: {
    color: "grey",
    fontSize: 18,
    fontFamily: "Axiforma-SemiBold",
    marginStart: 20,
    marginTop: 30,
    marginBottom: 10
  },

  textDesign: {
    color: "#737373",
    fontSize: 12,
    marginStart: 20,
    fontFamily: "Axiforma-Regular",
  },
  textDesign1: {
    color: "#737373",
    fontSize: 12,
    marginStart: 20,
    fontFamily: "Axiforma-Regular",
    marginTop:10
  },

  ButtonStyle: {
    backgroundColor: "#008080",
    paddingVertical: 14,
    paddingHorizontal: 40,
    borderRadius: 50,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 20,
    alignSelf: "flex-end",
    marginEnd: 20,
    marginBottom: 50,
  },

  ButtonText: { color: "#fff", fontSize: 18, fontFamily: "Axiforma-Bold" },
});