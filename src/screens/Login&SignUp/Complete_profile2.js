import React, { useRef, useState, useEffect } from "react";
import {
  TextInput,
  TouchableOpacity,
  ImageBackground,
  SafeAreaView,
  StyleSheet,
  Text,
  View,
  Image,
  ActivityIndicator,
} from "react-native";
import { useTranslation, withTranslation, Trans } from "react-i18next";
import "../translation/i18n";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import Modal from "react-native-modal";
import { Menu, MenuItem, MenuDivider } from "react-native-material-menu";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useIsFocused } from "@react-navigation/native";
import { waitForDebugger } from "inspector";
import constants from "../constants/constants";
import { Console } from "console";
import axios from "axios";
const CompleteProfileStep2 = ({ navigation, route }) => {
  const { t, i18n } = useTranslation();
  const isFocused = useIsFocused();
  const [visible, setvisible] = useState(false);
  const [visible1, setvisible1] = useState(false);
  const [visible2, setvisible2] = useState(false);
  const [infovisible, setinfovisible] = useState(false);
  const [infovisible1, setinfovisible1] = useState(false);
  const [infovisible2, setinfovisible2] = useState(false);
  const [isModalVisible, setModalVisible] = useState(false);
  const [isModalVisible1, setModalVisible1] = useState(false);
  const [userToken, setUserToken] = useState("");
  const[data,setData]=useState({})
  const[grp_theme,setGrp_theme]=useState("")
const[complete_profile,setComplete_Profile]=useState("")
  const toggleModal = () => {
    setModalVisible(!isModalVisible);
  };
  const toggleModal1 = () => {
    setModalVisible1(!isModalVisible1);
  };
  useEffect(() => {
    getpreviousdata()
    getUserPrefrence()
    onSaveUserPrefrence()
    newdata()
    completeprofile()
    
  }, [isFocused]);
  const getpreviousdata=async()=>{
    var datas = await AsyncStorage.getItem("P_DETAIL")

    // console.log("p8yp8hhhh",datas)
  }
  const completeprofile=async()=>{
    var completeprofile=await AsyncStorage.getItem("COMPLETEPROFILES")
    setComplete_Profile(completeprofile)
   
  }
 const newdata=async()=>{
  var newwdata = route.params.NEWDATAA
  
 
// console.log("jgjhgoit909",newwdata)
 }

  const getUserPrefrence = async () => {
    var token = await AsyncStorage.getItem("token");
    var axios = require('axios');

var config = {
  method: 'get',
  url: constants.BASE_URL + "api/group/user_complete_preference",
  headers: {
    Authorization: "Bearer " + JSON.parse(token),
  },
};
axios(config)
.then(async (response)=> {
  // console.log("hhjhjhjhjhjhuuuuyyuu",JSON.stringify(response.data));
  await AsyncStorage.setItem("DATAA",JSON.stringify(response.data.data))
  await AsyncStorage.setItem("GROUP_THEMEE",JSON.stringify(response.data.data.group_theme))
  getData()

})
.catch(function (error) {
  // console.log(error);
});

  }
 

  const onSaveUserPrefrence = async () => {
    var token = await AsyncStorage.getItem("token");
    var axios = require('axios');

var config = {
  method: 'get',
  url: constants.BASE_URL + "api/profile/preference",
  headers: {
    Authorization: "Bearer " + JSON.parse(token),
  },
};
axios(config)
.then(async (response)=> {
  // console.log("fgsgfgfgf",JSON.stringify(response.data));
  await AsyncStorage.setItem("DATAA",JSON.stringify(response.data.data))
  await AsyncStorage.setItem("GROUP_THEMEE",JSON.stringify(response.data.data.group_theme))
  getData()
})
.catch(function (error) {
  // console.log(error);
});
  }
  const getData1 = async () => {
    const data = await AsyncStorage.getItem("P_DETAIL");
    // console.log("juyuhggfhgffdgfdgRyy",data)
    var Theme=await AsyncStorage.getItem("GROUP_THEMEE")
    var C2Theme=JSON.parse(Theme)
    var c2DTA = await AsyncStorage.getItem("C2_DETAIL");
    var c2DATA= JSON.parse(c2DTA)
    if (C2Theme !== "") {
      if (C2Theme == "chill") {
        setvisible(true);
      } else if (C2Theme == "active") {
        setvisible1(true);
      } else if (C2Theme == "culture") {
        setvisible2(true);
      } else if (C2Theme == "chill,active") {
        setvisible(true), setvisible1(true);
      } else if (C2Theme == "chill,culture") {
        setvisible(true), setvisible2(true);
      } else if (C2Theme == "active,culture") {
        setvisible2(true);
        setvisible1(true);
      } else if (C2Theme =="chill,active,culture") {
        setvisible(true), setvisible1(true), setvisible2(true);
      }
    }
  };

  const getData = async () => {
    const data = await AsyncStorage.getItem("P_DETAIL");
    // console.log("ddddfdffffffdf",data)
    var Theme=await AsyncStorage.getItem("GROUP_THEMEE")
    var C2Theme=JSON.parse(Theme)
    var c2DTA = await AsyncStorage.getItem("C2_DETAIL");
    var c2DATA= JSON.parse(c2DTA)
   
    if (C2Theme !== "") {
      if (C2Theme == "chill") {
        setvisible(true);
      } else if (C2Theme == "active") {
        setvisible1(true);
      } else if (C2Theme == "culture") {
        setvisible2(true);
      } else if (C2Theme == "chill,active") {
        setvisible(true), setvisible1(true);
      } else if (C2Theme == "chill,culture") {
        setvisible(true), setvisible2(true);
      } else if (C2Theme == "culture,chill") {
        setvisible2(true), setvisible(true);
      }
      
      else if (C2Theme == "active,culture") {
        setvisible2(true);
        setvisible1(true);
      } 
      else if (C2Theme == "culture,active") {
        setvisible2(true);
        setvisible1(true);
      } else if (C2Theme =="chill,active,culture") {
        setvisible(true), setvisible1(true), setvisible2(true);
      }
    }
  };
  useEffect(() => {
    getToken();
  }, []);
  const getToken = async () => {
    var token = await AsyncStorage.getItem("token");
    setUserToken(JSON.parse(token));
  };

  const newyy = () => {
    if (visible == true) {
      setvisible(false);
    }
    if (visible == false) {
      setvisible(true);
    }
  };
  const newyy1 = () => {
    if (visible1 == true) {
      setvisible1(false);
    }
    if (visible1 == false) {
      setvisible1(true);
    }
  };
  const newyy2 = () => {
    if (visible2 == true) {
      setvisible2(false);
    }
    if (visible2 == false) {
      setvisible2(true);
    }
  };
  const visibleinfo = () => {
    if (infovisible == true) {
      setinfovisible(false);
      setinfovisible1(false);
      setinfovisible2(false);
    }
    if (infovisible == false) {
      setinfovisible(true);
      setinfovisible1(false);
      setinfovisible2(false);
    }
  };
  const visibleinfo1 = () => {
    if (infovisible1 == true) {
      setinfovisible1(false);
      setinfovisible(false);
      setinfovisible2(false);
    }
    if (infovisible1 == false) {
      setinfovisible1(true);
      setinfovisible(false);
      setinfovisible2(false);
    }
  };
  const visibleinfo2 = () => {
    if (infovisible2 == true) {
      setinfovisible2(false);
      setinfovisible(false);
      setinfovisible1(false);
    }
    if (infovisible2 == false) {
      setinfovisible2(true);
      setinfovisible(false);
      setinfovisible1(false);
    }
  };
  const hideMenu = () => setinfovisible(false);
  const hideMenu1 = () => setinfovisible1(false);
  const hideMenu2 = () => setinfovisible2(false);
  const showMenu = () => setinfovisible(true);

  const Onsubmit = async () => {
   var dtt = await AsyncStorage.getItem("P_DETAIL");

    var grp_id=await AsyncStorage.getItem("Group_userid")
        // console.log("hiiiiiiiii",grp_id)
    var grouptheme = "";
    if (visible == true) {
      grouptheme = "chill";
    }
    if (visible1 == true) {
      grouptheme = "active";
    }
    if (visible2 == true) {
      grouptheme = "culture";
    }
    if (visible2 && visible) {
      grouptheme = "culture" + "," + "chill";
    }
    if (visible2 && visible1) {
      grouptheme = "culture" + "," + "active";
    }
    if (visible && visible1) {
      grouptheme = "chill" + "," + "active";
    }
    if (visible && visible1 && visible2) {
      grouptheme = "chill" + "," + "active" + "," + "culture";
    }
    if (visible == "" && visible1 == "" && visible2 == "") {
      alert(t("Please choose atleast one group theme"));
    } else {
      navigation.navigate("CompleteProfileStep3", {
        GROUPTHEME1: grouptheme,
       DETAILS: JSON.parse(dtt),
        // DETAILS:newwdata,
        GROUPUSERID:JSON.parse(grp_id),
       
      });
      
    }
  };
  const Onsave = async () => {
    var dtt = await AsyncStorage.getItem("P_DETAIL");
 
     var grp_id=await AsyncStorage.getItem("Group_userid")
         // console.log("hiiiiiiiii",grp_id)
        //  console.log("hjhbnfg111ffffttt1rrrhfhd",dtt)
         var data123=JSON.parse(dtt)
         var pname=data123.parent_name
         var dobb=data123.birth_date
         var genders1=data123.genders
         var postalcodess=data123.postalcode
         var relationships=data123.relations
         var childsname1=data123.childnames
         var child1DOB=data123.childbirthdates
         var childsname2=data123.childnames1
         var childDOB2=data123.childbirthdates1
         var childsname3=data123.childnames2
         var childDOB3=data123.childbirthdates1
     var grouptheme = "";
     if (visible == true) {
       grouptheme = "chill";
     }
     if (visible1 == true) {
       grouptheme = "active";
     }
     if (visible2 == true) {
       grouptheme = "culture";
     }
     if (visible2 && visible) {
       grouptheme = "culture" + "," + "chill";
     }
     if (visible2 && visible1) {
       grouptheme = "culture" + "," + "active";
     }
     if (visible && visible1) {
       grouptheme = "chill" + "," + "active";
     }
     if (visible && visible1 && visible2) {
       grouptheme = "chill" + "," + "active" + "," + "culture";
     }
     if (visible == "" && visible1 == "" && visible2 == "") {
       alert(t("Please choose atleast one group theme"));
     } else {

      var token = await AsyncStorage.getItem("token");
      var USERID = await AsyncStorage.getItem("user_id");
          
          var data = new FormData();
          data.append("name",pname)
            data.append("gender",genders1);
            data.append("dob",dobb);
            data.append("postal", postalcodess);
            data.append("relationship", relationships);
          data.append("group_theme",grouptheme);
          data.append("children[0][name]", childsname1);
          data.append("children[0][dob]", child1DOB);
          data.append("children[1][name]",childsname2);
          data.append("children[1][dob]",childDOB2);
          data.append("children[2][name]", childsname3);
          data.append("children[2][dob]",childDOB3);
          data.append("page_no", 2);
          //  console.log("mnmnnjhuyuuyyttyytt",data)
           
          var config = {
            method: "post",
            url: constants.BASE_URL + "api/profile/save_for_later",
            headers: {
              Authorization: "Bearer " + JSON.parse(token),
            },
            data: data,
          };
      
          axios(config)
            .then(async (response) => {
              // console.log("hghglslsloeoeooeoo", response.data);
                 navigation.navigate("MyTabs"
                //  , {
                //   GROUPTHEME1: grouptheme,
                //  DETAILS: JSON.parse(dtt),
                //   // DETAILS:newwdata,
                //   GROUPUSERID:JSON.parse(grp_id),
                 
                // }
                 
    
       );
            })
            .catch(function (error) {
           
              // console.log("YESSSS", error);
            });
     }
   };
  
  return (
    <View style={Style.MainContainer}>
      <ImageBackground
        style={Style.ImageBackground}
        source={require("../../../src/asset/Splash.png")}
      >
        <View>
          <View style={{ height: 250 }}>
            <ImageBackground
              resizeMode="stretch"
              style={Style.ImageBackground1}
              source={require("../../../src/asset/Ellipse-bg.png")}
            >
              <View>
                <View style={{ flex: 0.2, flexDirection: "row" }}>
                <TouchableOpacity
                    onPress={() => navigation.navigate("MyTabs")}
                    // onPress={() => navigation.goBack()}
                    style={Style.backBtn}
                  >
                    <Image
                      style={Style.imgBack}
                      source={require("../../../src/asset/back-button.png")}
                    />
            
                  </TouchableOpacity>
                  {/* {
                    complete_profile!=="false" ?
                    <TouchableOpacity
                    onPress={() => navigation.navigate("MyTabs")}
                    style={Style.backBtn}
                  >
                    <Image
                      style={Style.imgBack}
                      source={require("../../../src/asset/back-button.png")}
                    />
            
                  </TouchableOpacity>
                    :
                      <TouchableOpacity
                    onPress={() => navigation.goBack()}
                    style={Style.backBtn}
                  >
                    <Image
                      style={Style.imgBack}
                      source={require("../../../src/asset/back-button.png")}
                    />
                    
                  </TouchableOpacity> 
                    

                  }
                 */}
                
                
                  
                </View>
                <View style={Style.View1}>
                  <Text style={Style.TextProfile}>
                    {" "}
                    {t("Complete profile")}{" "}
                  </Text>
                  <Image
                    style={Style.img1}
                    source={require("../../asset/Steps(1).png")}
                  />
                </View>
              </View>
            </ImageBackground>
          </View>
          <KeyboardAwareScrollView style={{ marginTop: 30 }}>
            <View style={Style.View3}>
              <Text style={Style.set}>Set group preferences</Text>
              <Text style={Style.set2}>
                {t(
                  "Here you will be able to select your preferences for how the group should be composed"
                )}
              </Text>
              <Text style={Style.set3}>
                {t("Select theme for group activities - choose at least one")}
              </Text>
            </View>
            <View style={Style.View4}>
              <View style={Style.View5}>
                <View style={Style.View8}>
                  <View style={Style.View9}>
                    <View style={{ flexDirection: "row" }}>
                      <TouchableOpacity
                        onPress={() => newyy()}
                        style={[
                          Style.View7,
                          {
                            borderColor: visible == true ? "#008080" : "white",
                          },
                        ]}
                      >
                        <Image
                          source={require("../../asset/Chill-img.png")}
                          style={Style.img2}
                        ></Image>
                        <Text style={{ color: "grey" }}>{t("Chill")}</Text>
                      </TouchableOpacity>
                      {visible && (
                        <Image
                          source={require("../../asset/Checked.png")}
                          style={Style.img4}
                        ></Image>
                      )}
                    </View>
                  </View>
                  <TouchableOpacity onPress={() => visibleinfo()}>
                    <Image
                      source={require("../../asset/Info.png")}
                      style={Style.img3}
                    ></Image>
                  </TouchableOpacity>
                </View>
                <View style={Style.View8}>
                  <View style={Style.View9}>
                    <View style={{ flexDirection: "row" }}>
                      <TouchableOpacity
                        onPress={() => newyy1()}
                        style={[
                          Style.View7,
                          {
                            borderColor: visible1 == true ? "#008080" : "white",
                          },
                        ]}
                      >
                        <Image
                          source={require("../../asset/active-icon.png")}
                          style={Style.img2}
                        ></Image>
                        <Text style={{ color: "grey" }}>{t("Active")}</Text>
                      </TouchableOpacity>
                      {visible1 && (
                        <Image
                          source={require("../../asset/Checked.png")}
                          style={Style.img4}
                        ></Image>
                      )}
                    </View>
                  </View>

                  <TouchableOpacity
                    onPress={() => visibleinfo1()}
                    style={{ height: "25%", width: "25%", alignSelf: "center" }}
                  >
                    <Image
                      source={require("../../asset/Info.png")}
                      style={Style.img}
                    ></Image>
                  </TouchableOpacity>
                </View>
                <View style={Style.View8}>
                  <View style={Style.View9}>
                    <View style={{ flexDirection: "row" }}>
                      <TouchableOpacity
                        onPress={() => newyy2()}
                        style={[
                          Style.View7,
                          {
                            borderColor: visible2 == true ? "#008080" : "white",
                          },
                        ]}
                      >
                        <Image
                          source={require("../../asset/map_museum.png")}
                          style={Style.img2}
                        ></Image>
                        <Text style={{ color: "grey" }}>{t("Culture")}</Text>
                      </TouchableOpacity>
                      {visible2 && (
                        <Image
                          source={require("../../asset/Checked.png")}
                          style={Style.img4}
                        ></Image>
                      )}
                    </View>
                  </View>
                  <TouchableOpacity onPress={() => visibleinfo2()}>
                    <Image
                      source={require("../../asset/Info.png")}
                      style={Style.img3}
                    ></Image>
                  </TouchableOpacity>
                </View>
              </View>
            </View>

            {infovisible && (
              <View
                style={{
                  backgroundColor: "#EDEDED",
                  paddingHorizontal: 10,
                  marginHorizontal: 30,
                  justifyContent: "space-between",
                  alignItems: "center",
                  marginTop: 32,
                  borderRadius: 10,
                  paddingVertical: 10,
                }}
              >
                <Menu
                  visible={infovisible}
                  anchor={
                    <Text
                      style={{
                        fontSize: 12,
                        color: "black",
                        justifyContent: "space-between",
                        alignItems: "center",
                      }}
                    >
                      if you prefer activities such as going to cafées or meet
                      in private, chilling and talking - simply enjoying each
                      other’s company{" "}
                    </Text>
                  }
                  onRequestClose={hideMenu}
                ></Menu>
              </View>
            )}
            {
              infovisible1 && (
                <View
                  style={{
                    backgroundColor: "#EDEDED",
                    paddingHorizontal: 10,
                    marginHorizontal: 30,
                    justifyContent: "space-between",
                    alignItems: "center",
                    marginTop: 32,
                    borderRadius: 10,
                    paddingVertical: 10,
                  }}
                >
                  <Menu
                    visible={infovisible1}
                    anchor={
                      <Text
                        style={{
                          fontSize: 12,
                          color: "black",
                          justifyContent: "space-between",
                          alignItems: "center",
                        }}
                      >
                        if you prefer activities with a bit more action,such as
                        going to playgrounds, go for a run, meet at the soccer
                        field or beyond{" "}
                      </Text>
                    }
                    onRequestClose={hideMenu1}
                  ></Menu>
                </View>
              )
            }
            {
              infovisible2 && (
                <View
                  style={{
                    backgroundColor: "#EDEDED",
                    paddingHorizontal: 10,
                    marginHorizontal: 30,
                    justifyContent: "space-between",
                    alignItems: "center",
                    marginTop: 32,
                    borderRadius: 10,
                    paddingVertical: 10,
                  }}
                >
                  <Menu
                    visible={infovisible2}
                    anchor={
                      <Text
                        style={{
                          fontSize: 12,
                          color: "black",
                          justifyContent: "space-between",
                          alignItems: "center",
                        }}
                      >
                        if you prefer activities that will stimulate both you
                        and your kid(s), for example going to an interactive
                        museum, form a book club or meet at the library{" "}
                      </Text>
                    }
                    onRequestClose={hideMenu2}
                  ></Menu>
                </View>
              )
            }

            <View style={Style.View10}>
              <TouchableOpacity
                style={{ marginLeft: "10%" }}
                onPress={toggleModal}
              >
                <Text style={{ fontSize: 18, color: "grey" }}>
                  {t("Save for later")}
                </Text>
              </TouchableOpacity>
              <TouchableOpacity style={Style.View12} onPress={() => Onsubmit()}>
                <Text style={Style.text3}> {t("Next")} </Text>
              </TouchableOpacity>
            </View>
            {isModalVisible == true && (
              <Modal isVisible={isModalVisible}>
                <View
                  style={{
                    justifyContent: "center",
                    backgroundColor: "white",
                    borderRadius: 15,
                    shadowColor: "#737373",
                    marginHorizontal: 20,
                    shadowOffset: { width: 2, height: 4 },
                    shadowOpacity: 0.3,
                    shadowRadius: 3,
                    elevation: 10,
                  }}
                >
                  <View
                    style={{
                      backgroundColor: "white",
                      paddingTop: 15,
                      borderRadius: 15,
                      paddingBottom: "15%",
                      marginHorizontal: 15,
                      alignItems: "center",
                    }}
                  >
                    <TouchableOpacity
                      onPress={toggleModal}
                      style={Style.View11}
                    >
                      <Image
                        style={{ height: hp(3), width: hp(3) }}
                        resizeMode="contain"
                        source={require("../../asset/cross.png")}
                      />
                    </TouchableOpacity>
                    <TouchableOpacity
                      onPress={toggleModal}
                      style={{ alignItems: "center" }}
                    >
                      <Image
                        style={{ height: hp(15), width: hp(15) }}
                        resizeMode="contain"
                        source={require("../../asset/Ciricle.png")}
                      />
                    </TouchableOpacity>

                    <View style={{ alignItems: "center", marginTop: 5 }}>
                      <Text
                        style={{
                          fontSize: 26,
                          fontFamily: "Axiforma-Bold",
                          color: "grey",
                          lineHeight: 30,
                        }}
                      >
                      {t("Your data has been saved until you return, please be aware that until your profile has been created, you will not be able to join any groups")}
                      </Text>
                    </View>
                    <View style={{ marginTop: 30, flexDirection: "row" }}>
                      <TouchableOpacity
                        style={Style.NoBtn}
                        onPress={toggleModal}
                      >
                        <Text
                          style={{
                            alignSelf: "center",
                            color: "white",
                            fontSize: 16,
                            fontFamily: "Axiforma-Bold",
                          }}
                        >
                          {" "}
                          {t("No")}
                        </Text>
                      </TouchableOpacity>
                      <TouchableOpacity
                        style={Style.YesBtn}
                        onPress={() => {
                          //  saveforlater(),
                           toggleModal(false),Onsave()
                            }}
                      >
                        <Text
                          style={{
                            alignSelf: "center",
                            color: "white",
                            fontSize: 16,
                            fontFamily: "Axiforma-Bold",
                          }}
                        >
                          {" "}
                          {t("Yes")}{" "}
                        </Text>
                      </TouchableOpacity>
                    </View>
                  </View>
                </View>
              </Modal>
            )}
          </KeyboardAwareScrollView>
        </View>
      </ImageBackground>
    </View>
  );
};
const full_app = withTranslation()(CompleteProfileStep2);
export default full_app;
const Style = StyleSheet.create({
  MainContainer: {
    flex: 1,
  },

  set: {
    fontSize: 16,
    color: "#008080",
    alignelf: "flex-Start",
    fontFamily: "Axiforma-SemiBold",
  },
  View12: {
    backgroundColor: "#008080",
    width: wp(40),
    marginLeft: "10%",
    justifyContent: "center",
    height: hp(6),
    borderRadius: 50,
    marginTop: 10,
  },
  set2: {
    fontSize: 12,
    color: "#737373",
    alignSelf: "flex-start",
    fontFamily: "Axiforma-Regular",
    marginTop: 5,
    lineHeight: 17,
  },
  set3: {
    fontSize: 14,
    color: "#737373",
    alignSelf: "flex-start",
    marginTop: 20,
    fontFamily: "Axiforma-Medium",
    lineHeight: 18,
  },
  modaltext1: {
    alignSelf: "center",
    fontSize: 18,
    fontWeight: "400",
    color: "black",
    alignSelf: "center",
  },
  modaltext: {
    fontSize: 26,
    fontFamily: "Axiforma-Bold",
    color: "black",
    lineHeight: 30,
  },
  imgBack: {
    marginLeft: 40,
    width: 27,
    height: 27,
    marginTop: 30,
    resizeMode: "contain",
    tintColor: "#F9FBDB",
  },
  text3: {
    alignSelf: "center",
    color: "white",
    fontSize: 14,
    fontFamily: "Axiforma-Bold",
  },
  View11: {
    marginLeft: "10%",
  },

  image: {
    resizeMode: "contain",
    height: hp(10),
    width: wp(10),
  },

  View9: {
    backgroundColor: "white",
    height: 100,
    width: 95,
    marginLeft: 20,
    borderRadius: 5,
    alignItems: "center",
    justifyContent: "center",
  },
  View10: {
    flexDirection: "row",
    alignItems: "center",
    paddingLeft: 25,
    paddingEnd: 25,
    marginTop: 40,
    paddingBottom: 50,
  },

  View8: {
    alignItems: "center",
  },

  ImageBackground: {
    flex: 1,
    backgroundColor: "#F9FBDB",
  },
  YesBtn: {
    backgroundColor: "#008080",
    width: wp(32),
    justifyContent: "center",
    height: hp(7),
    marginLeft: 15,
    borderRadius: 50,
  },
  NoBtn: {
    backgroundColor: "#A6A6A6",
    width: wp(32),
    justifyContent: "center",
    height: hp(7),
    paddingHorizontal: 10,
    borderRadius: 50,
  },
  text1: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#008080",
  },

  img1: {
    alignSelf: "center",
    marginLeft: 10,
    marginTop: "5%",
    width: "50%",
    height: "40%",
    resizeMode: "contain",
  },
  img: {
    resizeMode: "contain",
    marginTop: 10,
    height: 20,
    width: 20,
    marginLeft: 15,
  },
  img4: {
    resizeMode: "contain",
    marginTop: -5,
    marginLeft: -15,
    height: 20,
    width: 20,
    borderRadius: 20 / 2,
  },
  img3: {
    resizeMode: "contain",
    marginTop: 10,
    height: 20,
    width: 20,
    marginLeft: 15,
  },
  img2: {
    resizeMode: "contain",
    height: 50,
  },

  text: {
    fontSize: hp(2),
    color: "grey",
    alignSelf: "center",
  },
  text2: {
    fontSize: 14,
    fontFamily: "Axiforma-Regular",
    color: "grey",
  },
  text22: {
    fontSize: 18,
    fontFamily: "Axiforma-Regular",
    color: "grey",
  },

  TextProfile: {
    fontSize: 26,
    color: "#F9FBDB",
    fontFamily: "Axiforma-Bold",
  },
  ImageBackground1: {
    width: "100%",
    height: "100%",
    flex: 1,
  },
  backBtn: {
    height: hp(6),
    width: wp(10),
    justifyContent: "center",
    alignItems: "center",
    marginTop: 10,
  },
  View1: {
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: "20%",
  },
  View2: {
    marginTop: "15%",
    alignItems: "center",
    justifyContent: "center",
    padding: 20,
  },
  View3: {
    paddingLeft: 25,
    paddingEnd: 25,
  },
  View4: {
    marginLeft: 5,
    marginTop: 10,
    height: hp(18),
  },
  View5: {
    alignItems: "center",
    flexDirection: "row",
    marginTop: 10,
  },
  View6: {
    alignItems: "center",
  },
  View7: {
    backgroundColor: "white",
    height: 100,
    width: 100,
    borderRadius: 5,
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 3,
  },
  iconsView: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 25,
    justifyContent: "center",
    borderColor: "White",
  },
});
