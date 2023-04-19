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
import Modal from "react-native-modal";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import constants from "../constants/constants";
import { useIsFocused } from "@react-navigation/native";
import { useTranslation, withTranslation, Trans } from 'react-i18next';
import '../translation/i18n'
const MyGroups = ({ navigation ,route}) => {
  const [genderNew, setGenderNew] = useState("");
  const[data,setdata]=useState("")
  const isFocused = useIsFocused();
  useEffect(()=>{getData1()  
    personalinfo()
  },[isFocused])
  const getData1 = async () => {
  var data = await AsyncStorage.getItem("DATAA");
//  console.log("tutuyutu223233",data)

  };

  React.useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      groupjoined();
   
    });

    // Return the function to unsubscribe from the event so it gets removed on unmount
    return unsubscribe;
  }, [navigation]);
  const personalinfo = async () => {
    var langg=await AsyncStorage.getItem("langugae")
    var token = await AsyncStorage.getItem("token");

    var config = {
      method: "get",
      //  url: 'https://development.brstdev.com:5076/api/profile/personal/info',
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
        if (response.data.status==true) {
await AsyncStorage.setItem("GENDER",response.data.data.gender)
await AsyncStorage.setItem("DATAA",JSON.stringify(response.data.data))

setGenderNew(response.data.data.gender)

                  // const data = await AsyncStorage.getItem("P_DETAIL");
                  // console.log("66))89888---=8798909",data)
                  // var data123=JSON.parse()  
                  // var gender=data123.genders
                
             
                  // if (response.data.data.gender !== "") {
                    if (response.data.data.gender ==!"") {
                     
                    // if(cDATA == null){
                      // setGenderNew(response.data.data.gender.toLowerCase())
                      setGenderNew(response.data.data.gender)
                      alert(response.data.data.gender)
                      
                    }
                  }
                    
                    
      })
      .catch(function (error) {
        // console.log(error);
      });
  };



        

  const {t, i18n} = useTranslation();
  const [isVisible3, setisVisible3] = useState(false);
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
  const [groupdata, setGroupData] = useState([]);
  const [loader, setLoader] = useState(true);
  const [joinGroupModal, setJoinGroupModal] = useState(false);
  const [idd, setIdd] = useState();
  const toggleModal3 = () => {
    setisVisible3(!isVisible3);
  };

  const Onsubmit = async() => {
    const data1 = await AsyncStorage.getItem("P_DETAIL");
    // console.log("iuiouou5555",data1)
    setJoinGroupModal(false)
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
    var genderr=await AsyncStorage.getItem("GENDER")
    // console.log("iuiuiuiuidata",data) CompleteProfileStep
  
    //  navigation.navigate("CompleteProfileStep2",{genderr})
    navigation.navigate("CompleteProfileStep",{genderr})
  }
  const groupjoined = async () => {
    var langg =await AsyncStorage.getItem("langugae")
    var token = await AsyncStorage.getItem("token");
  
    var axios = require("axios");
    setLoader(true);
    var config = {
      method: "get",
      url: constants.BASE_URL + "api/groups/groups_joined",
      headers: {
        Authorization: "Bearer " + JSON.parse(token),
        'X-localization': langg,
      },
    };
    axios(config)
      .then(function (response) {
        if (response.data.status == true) {
          setGroupData(response.data.data);
         
          setLoader(false);
        } else {
          alert(response.data.message)
          setLoader(false);
        }


       
      })
      .catch(function (error) {
        // console.log(error);
        setLoader(false);
      });
  };
  const Data1 = [
,
   
  ];
  const goToInvitationCode = async () => {
    setJoinGroupModal(false)
    navigation.navigate("InvitationCode");
  };
  return (
    <View style={mygroupsstyles.Main}>
      <ImageBackground
        style={mygroupsstyles.ImageBackground}
        source={require("../../asset/Splash.png")}
      >
        <View style={mygroupsstyles.View1}>
          <View style={mygroupsstyles.view2}>
            <TouchableOpacity
              activeOpacity={1}
            >
           
            </TouchableOpacity>
            <Text style={mygroupsstyles.text1}>{t("My Groups")}</Text>
            <TouchableOpacity
              onPress={() => navigation.navigate("Notification1")}
            >

              <Image
                style={mygroupsstyles.img3}
                resizeMode="contain"
                source={require("../../asset/Notification.png")}
              />
            </TouchableOpacity>
          </View>

          <ScrollView>
            <View style={mygroupsstyles.view4}>
              {loader == true ? (
                <ActivityIndicator size="large" color="#008080" />
              ) : (
                <FlatList
                  data={groupdata}
                  renderItem={({ item }) => {
                    return (
                      <View style={mygroupsstyles.view5}>
                        <View style={mygroupsstyles.view6}>
                          <Image
                            style={mygroupsstyles.img4}
                          
                            source={{ uri: item.image }}
                          />

                          <View style={mygroupsstyles.view7}>
                            <Text style={mygroupsstyles.text3}>
                              {item.name}
                            </Text>
                            <View style={mygroupsstyles.view8}>
                              <Image
                                style={mygroupsstyles.img5}
                                resizeMode="contain"
                                source={require("../../asset/chill.png")}
                              />
                              <Text style={mygroupsstyles.text4}>
                                {item.theme}
                              </Text>
                            </View>
                            <View style={mygroupsstyles.view8}>
                              <Image
                                style={mygroupsstyles.img5}
                                resizeMode="contain"
                                source={require("../../asset/Profile(2).png")}
                              />
                              <Text style={mygroupsstyles.text4}>
                                {item.age}
                              </Text>
                            </View>
                            <View style={{ flexDirection: "row",
    alignItems: "center",
    marginTop: 10,width:'82%'}}>
                              <Image
                                style={mygroupsstyles.img5}
                                resizeMode="contain"
                                source={require("../../asset/Location.png")}
                              />
                              <Text style={{color: "#737373",fontSize: 16,marginLeft: 10,fontFamily: "Axiforma-Regular",width:'80%'}}>
                                {item.zipcode}
                              </Text>
                            </View>
                          </View>
                        </View>
                        <TouchableOpacity
                          onPress={() =>
                            navigation.navigate("GroupDetails", {
                              Groupp_id: item.id,
                              Groupp_type:item.group_type

                            })
                          }
                         
                          style={mygroupsstyles.view9}
                        >
                          
                          <Text style={mygroupsstyles.text5}>{t("View Details")}</Text>
                        </TouchableOpacity>
                      </View>
                    );
                  }}
                />
              )}
            </View>
          </ScrollView>
            <TouchableOpacity
  
             onPress={() => Onsubmit()}
              style={{
                backgroundColor: "#008080",
                width: 250,
                height: 50,
                marginHorizontal: 80,
                paddingVertical: 15,
                borderRadius: 50,
                justifyContent: "center",
                alignItems: "center",
                marginTop: 15,
                marginBottom: 8,
                alignSelf: "center",
              }}
            >
              <Text
                style={{
                  color: "#fff",
                  fontSize: 16,
                  fontFamily: "Axiforma-Bold",
                }}
              >
                {t("Join additional group")}
              </Text>
            </TouchableOpacity>

        </View>
        {isVisible3 == true && (
          <Modal
            isVisible={true}
            onBackdropPress={() => {
              setisVisible3(!isVisible3);
            }}
          >
            <View style={mygroupsstyles.notificationmodalview}>
              <TouchableOpacity
                onPress={() => setisVisible3(false)}
                style={mygroupsstyles.modalview1}
              >
                <Image
                  style={mygroupsstyles.crossimg}
                  resizeMode="contain"
                  source={require("../../asset/cross.png")}
                />
              </TouchableOpacity>
              <View style={mygroupsstyles.modalview2}>
                <Image
                  resizeMode="contain"
                  style={mygroupsstyles.modalimg}
                  source={require("../../asset/ic-Chill.png")}
                />
                <Text style={mygroupsstyles.modaltxt}>
                  Welcome to group
                  {"\n"}The high five jumpers
                </Text>
                <Text style={mygroupsstyles.modaltxt1}>You are all in</Text>
                <View style={mygroupsstyles.modalview3}>
                  <View style={mygroupsstyles.modalview4}>
                    <View style={mygroupsstyles.view8}>
                      <Image
                        style={mygroupsstyles.img5}
                        resizeMode="contain"
                        source={require("../../asset/Location.png")}
                      />
                      <Text style={mygroupsstyles.text4}>TOK OEO</Text>
                    </View>
                    <View style={mygroupsstyles.modalview8}>
                      <Image
                        style={mygroupsstyles.img5}
                        resizeMode="contain"
                        source={require("../../asset/chill.png")}
                      />
                      <Text style={mygroupsstyles.text4}>Chill </Text>
                    </View>
                  </View>

                  <View style={mygroupsstyles.modalview9}>
                    <Image
                      style={mygroupsstyles.img5}
                      resizeMode="contain"
                      source={require("../../asset/Profile(2).png")}
                    />
                    <Text style={mygroupsstyles.text4}>Age group: 2 years</Text>
                  </View>
                </View>
              </View>
            </View>
          </Modal>
        )}
        <Modal
          isVisible={joinGroupModal}
          onBackdropPress={() => {
            setJoinGroupModal(!joinGroupModal);
          }}
        >
          <View style={mygroupsstyles.notificationmodalview2}>
            <TouchableOpacity
              onPress={() => setJoinGroupModal(false)}
              style={mygroupsstyles.modalview1}
            >
              <Image
                style={mygroupsstyles.crossimg}
                resizeMode="contain"
                source={require("../../asset/cross.png")}
              />
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => Onsubmit()}
              style={{
                backgroundColor: "#008080",
                width: 210,
                height: 50,
                marginHorizontal: 80,
                paddingVertical: 15,
                borderRadius: 50,
                justifyContent: "center",
                alignItems: "center",
                marginTop: 15,
                marginBottom: 8,
                alignSelf: "center",
              }}
            >
              <Text
                style={{
                  color: "#fff",
                  fontSize: 16,
                  fontFamily: "Axiforma-Bold",
                }}
              >
                {t("Join additional group")}
              </Text>
            </TouchableOpacity>
            <Text
              style={{
                textAlign: "center",
                color: "grey",
                fontFamily: "Axiforma-Bold",
                fontSize: 16,
              }}
            >
              or
            </Text>
            <TouchableOpacity
              onPress={() => goToInvitationCode()}
              style={{
                backgroundColor: "#008080",
                width: 300,
                height: 50,
                marginHorizontal: 80,
                paddingVertical: 15,
                borderRadius: 50,
                justifyContent: "center",
                alignItems: "center",
                marginTop: 15,
                marginBottom: 8,
                alignSelf: "center",
              }}
            >
              <Text
                style={{
                  color: "#fff",
                  fontSize: 16,
                  fontFamily: "Axiforma-Bold",
                }}
              >
                {t("Join group with invitation Code")}
              </Text>
            </TouchableOpacity>
          </View>
        </Modal>
      </ImageBackground>
    </View>
  );
};
const full_app =  withTranslation()(MyGroups)
export default full_app;

const mygroupsstyles = StyleSheet.create({
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
    fontWeight: "400",
  },
  img3: {
    width: 27,
    height: 27,
    tintColor: "#F9FBDB",
  },
  view4: {
    padding: 15,
    width: "100%",
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
    height: 62,
    width: 62,
    borderRadius: 100,
  },
  text3: {
    fontSize: 18,
    fontFamily: "Axiforma-Bold",
    color: "grey",
  },
  view8: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 10,
  },
  img5: {
    height: 17,
    width: 15,
  },
  text4: {
    color: "#737373",
    fontSize: 16,
    marginLeft: 10,
    fontFamily: "Axiforma-Regular",
  },
  text5: {
    fontSize: 16,
    fontFamily: "Axiforma-SemiBold",
    textAlign: "right",
    color: "#008080",
  },
  view9: {
    width: "100%",
    marginVertical: 10,
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
    marginLeft: 20,
  },
  IconStyle: {
    height: 27,
    width: 27,
    tintColor: "#F9FBDB",
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
  modalview2: {
    alignItems: "center",
    width: "100%",
  },
  modalview3: {
    alignItems: "center",
    width: "100%",
  },
  modalview1: {
    width: "100%",
    alignItems: "flex-end",
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
    alignItems: "center",
    marginLeft: 15,
  },
  modalview9: {
    flexDirection: "row",
    alignItems: "center",
    paddingTop: 15,
  },
  modalbutton: {
    height: 56,
    width: 170,
    backgroundColor: "#008080",
    borderRadius: 120,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 15,
    marginBottom: 5,
  },
  view7: {
    marginLeft: 20,
  },
  notificationmodalview: {
    backgroundColor: "white",
    width: 326,
    borderRadius: 16,
    padding: 20,
    marginBottom: 350,
    marginTop: 120,
    marginLeft: 25,
  },
  notificationmodalview2: {
    backgroundColor: "white",
    width: 350,
    borderRadius: 16,
    padding: 20,
    marginBottom: 350,
    marginTop: 200,
    alignSelf: "center",
  },
});
