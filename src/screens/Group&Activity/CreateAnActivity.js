import React, { useEffect, useState, } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  ImageBackground,
  TextInput,
  ScrollView,
  StyleSheet,
  Linking,
  ActivityIndicator,
  Vibration
} from "react-native";
import Checkbox from "expo-checkbox";
import CheckBox from "@react-native-community/checkbox";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import DraggableFlatList from "react-native-draggable-flatlist";
import Modal from "react-native-modal";
import constants from "../constants/constants";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useTranslation, withTranslation, Trans } from 'react-i18next';
import '../translation/i18n'
import Hyperlink from 'react-native-hyperlink'
import { GraphRequest } from "react-native-fbsdk";
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

const CreateAnActivity = ({ navigation, route }) => {
   const { GROUP_ID } = route.params;

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
  const [showRadio, setShowRadio] = useState(false);
  const [suggestionList, setSuggestionList] = useState([]);
  const [activitydetails, setActivitydetails] = useState(false);
  const[activityname,setActivityname]=useState("")
  const[activityaddres,setActivityaddress]=useState("")
  const [groupDetail, setGroupDetail] = useState({});
  const[grptheme,setGrptheme]=useState([])
const[activity,setActivity]=useState([])
const[loader,setLoader]=useState("")
const[Zipcodes,setZipCodes]=useState("")
  const {t, i18n} = useTranslation();
  useEffect(() => {
     getSuggestions();
  }, []);
  const getSuggestions = async () => {
    var axios = require("axios");
    var FormData = require("form-data");
    var data = new FormData();
    var langg = await AsyncStorage.getItem("langugae")
    var token = await AsyncStorage.getItem("token");
    setLoader(true)
     data.append("group_id", GROUP_ID);
    var config = {
      method: "post",
      url: constants.BASE_URL + "api/activity/suggestion",
      headers: {
        Authorization: "Bearer " + JSON.parse(token),
        'X-localization': langg,
      },
      data: data,
    };

    axios(config)
      .then(async (response) =>{
        // console.log("gghhguttuut8688787",response.data)
        await AsyncStorage.setItem("ACTIVITYIDD",JSON.stringify(response.data.data[0].id))
  
        console.log("hjhjhjhiii",response.data)
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
    return (
      <TouchableOpacity
      onPress={() => {setActivitydetails(!activitydetails), setGroupDetail(item),setGrptheme(item.themes),setZipCodes()}}
        style={{
          height: 70,
          width: "100%",
          backgroundColor: isActive ? "white" : item.backgroundColor,
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
              {item.title}
            </Text>
          </View>
        
          <View style={{ flex: 0.1 }}>
            <Image
              source={require("../../asset/Drag.png")}
              style={{
                height: 30,
                width: 30,
                resizeMode: "contain",
                alignSelf: "flex-end",
              }}
            />
          </View>
        </View>
      </TouchableOpacity>
    );
  };
  const onSave = () => {
    if (priorityText == "") {
      alert(t("Please add priority"));
    } else {
      var obj = {
        id: 1,
        title: priorityText,
      };
      setMypriority(true);
      suggestionList.unshift(obj);
      setPriorityModal(false);
    }
  };
  const onNext = () => {
    // console.log("SUGGETIONLIST", suggestionList);
    var arr = [];
    for (let i = 0; i < suggestionList.length; i++) {
      // console.log("TITIL:E", suggestionList[i].title);
      arr.push(suggestionList[i].title);
    }
    navigation.navigate("ScheduleAnActivity", {
      ACTIVITY_ARR: arr,
      GROUP_ID: GROUP_ID,
      meet:showRadio,
      new_activity:myPriority
    });
  };
  const placeCheck = () => {
    setShowRadio(true);
    var obj = {
      title: "Meet at " + userName + "'s place",
      id: 1,
    };
    suggestionList.unshift(obj);
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
        <Text style={styles.headerText}>{t("Create an activity")}</Text>
      </View>
      <KeyboardAwareScrollView keyboardShouldPersistTaps="handled">
        <Text style={styles.TextStyle}>{t("Priority")}</Text>
        <Text style={styles.textDesign}>
          {t("Priorise this list of activities for your next group meetup")}
        </Text>
        <Text style={styles.textDesign1}>
          {t("Press and hold until activity turns white and then you can drag and drop")}
        </Text>
        <ScrollView style={{ flex: 1 }}>
          <View
            style={{
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
              }}
              data={suggestionList}
              renderItem={renderItem}
              keyExtractor={(item, index) => index.toString()}
              onDragEnd={({ data }) => setSuggestionList(data)}
              
            />
              )}
           
      
            {!myPriority && (
          <TouchableOpacity
            onPress={() => setPriorityModal(!priorityModal)}
            style={{
              height: 70,
              width: "100%",
              backgroundColor:"#008080",
               alignItems: "center",
               justifyContent: "center",
              paddingHorizontal: 10,
              alignSelf:"center",
              marginVertical: 10,
              borderWidth: 1,
              borderColor: "#008080",
              borderRadius: 8,
              flexDirection:"row"
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
        )}
          </View>
        </ScrollView>
        {!showRadio && (
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
        )}

        {!showRadio && (
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
        )}

        <TouchableOpacity style={styles.ButtonStyle} onPress={() => onNext()}>
          <Text style={styles.ButtonText}>{t("Next")}</Text>
        </TouchableOpacity>
        <Modal
          isVisible={priorityModal}
          style={{
            flex: 0.6,
          }}
        >
          <TouchableOpacity
            onPress={() => setPriorityModal(false)}
            style={{
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
              padding: 14,
              justifyContent: "space-evenly",
            }}
          >
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
              {t("Add your activity")}
            </Text>
            <View style={{ backgroundColor: "white", padding: 8 }}>
              <TextInput
                style={{
                  backgroundColor: "#fff",
                  maxHeight: 100,
                  color: "grey",
                  borderRadius: 6,
                  
                  height: 50,
                  width: 300,
                }}
                placeholder={t("Tap to enter")}
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
              }}>
              <Text style={{ color: "white", fontSize: 16 }}>{t("Save")}</Text>
            </TouchableOpacity>
          </View>
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
            {groupDetail.title}
            </Text>
            </View>
            {/* <View style={{flexDirection:'row',width:'85%'}}>
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
         {t("Zip code")}
            </Text>
            <Text
              style={{
                color: "#008080",
                fontSize: 16,
                textAlign: "left",
                marginVertical: 10,
                fontWeight: "bold",
                marginLeft: 15,
              }}
            >
            {groupDetail.zipcode}
            </Text>
            </View> */}
            {/* {
              groupDetail.discount!=null&&

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
         {t("Discount")}
            </Text>
            <Text
              style={{
                color: "#008080",
                fontSize: 16,
                textAlign: "left",
                marginVertical: 10,
                fontWeight: "bold",
                marginLeft: 15,
              }}
            >
            {groupDetail.discount}
            </Text>
            </View>
            } */}
            
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
{t("Theme")}
</Text>
<Text
  style={{
    color: "#008080",
    fontSize: 16,
    textAlign: "left",
    marginVertical: 10,
    fontWeight: "bold",
    marginLeft: 22,
   
  }}
>{groupDetail.themes}


</Text>
<Image source={{uri:grptheme}} style={{height:30,width:30,tintColor:'#008080',marginLeft:20}}/>
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
                marginLeft: 15,
              }}
            >
             {groupDetail.address}
            </Text>
            </View>
            {
              groupDetail.description!=null&&
            <View style={{flexDirection:'row',width:'70%'}}>
            <Text
              style={{
                color: "#008080",
                fontSize: 16,
                textAlign: "left",
                marginVertical: 10,
                fontWeight: "bold",
                width:70
            
              }}
            >
           {t("Description")}
            </Text>
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
              {groupDetail.description}
            </Text>
            </View>
}
      
            {
              groupDetail.website!==undefined&&
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
                Linking.openURL(groupDetail.website);
              }}>{t("link")}
                </Text>
                </View>
            }
          </View>
          </ScrollView>

        </Modal>
      </KeyboardAwareScrollView>
    </ImageBackground>
  );
};
export default CreateAnActivity;

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
    marginStart: 51,
  },

  TextStyle: {
    color: "grey",
    fontSize: 18,
    fontFamily: "Axiforma-SemiBold",
    marginStart: 20,
    marginTop: 30,
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