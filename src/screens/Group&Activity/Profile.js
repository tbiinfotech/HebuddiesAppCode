


import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  Image,
  ImageBackground,
  TouchableOpacity,
  TextInput,
  ScrollView,
  StyleSheet,
  Alert,
} from "react-native";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import { useIsFocused } from "@react-navigation/native";
import ToggleSwitch from "toggle-switch-react-native";
import { Dropdown } from "react-native-element-dropdown";
import ImagePicker from "react-native-image-crop-picker";
import Modal from "react-native-modal";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import constants from "../constants/constants";
import { useTranslation, withTranslation, Trans } from 'react-i18next';
import '../translation/i18n'
import { color } from "react-native-reanimated";

const ProfileScreen = ({ navigation }) => {
  const isFocused = useIsFocused();
  const [on, seton] = useState(false);
  const [on1, seton1] = useState(true);
  const [on2, seton2] = useState(true);
  const [on3, seton3] = useState(true);
  const [isVisible, setisVisible] = useState(false);

  const [visible3, setvisible3] = useState(false);
  const [isFocus, setIsFocus] = useState(false);
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState(null);
  const [value1, setValue1] = useState(null);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [image, setImage] = useState("");

  const [gender, setGender] = useState("");
  const [birthday, setBirthday] = useState("");
  const [emailaddress, setEmailaddress] = useState("");
  const [postalcode, setPostalcode] = useState("");
  const [relation, setRelation] = useState("");
  const [name1, setName1] = useState("");
  const [gender1, setGender1] = useState("");
  const [emailaddress1, setEmailaddress1] = useState("");
  const [postalcode1, setPostalcode1] = useState("");
  const [relation1, setRelation1] = useState("");
  const [disableLogout, setDisableLogout] = useState(false);
  const [login, setLogin] = useState("");
  const [userToken, setUserToken] = useState("");
  const [deleteModal, setDeleteModal] = useState(false);
  const[show,setshow]=useState("")
  const[show1,setshow1]=useState("")
  const {t, i18n} = useTranslation();
  const [currentLanguage,setLanguage] =useState();
  const [changelang,setChangeLang] =useState("Danish");
  const data = [
    { label1: t("Once"), value1: t("Once") },
    { label1: t("Always"), value1: t("Always") },
  ];
  const data1 = [
    { label: 'English', value: 'English'},
    { label: 'Danish', value: 'Danish'}
  ];
  const langgg=async()=>{
    var aa=await AsyncStorage.getItem("langugae")
   
    if(aa==null){
      setChangeLang("Danish")
    }
    else if(aa=="da"){
      setChangeLang("Danish")
    }
    else if(aa=="en"){
      setChangeLang("English")
    }
    
  }
  
  const changeLanguage = async lang => {
    console.log("fdfdffdggg")
    i18n
      .changeLanguage(lang)
      .then( async() => setLanguage(lang))
      await AsyncStorage.setItem("langugae",lang)
  
      // setLanguage(langugae)
      // alert(lang)
      .catch(err => console.log(err));
  }; 


  const _logout = async () => {
    
    Alert.alert(
      t("Alert"),
     t("Do you want to logout "),
      [
        {
          text: t("Cancel"),
          onPress: () => {
            setDisableLogout(false);
          },
          style: "cancel",
        },
        {
          text: t("OK"),
          onPress: () => {
            setTimeout(() => {
              AsyncStorage.removeItem("logged");
              AsyncStorage.removeItem("user_id");
              AsyncStorage.removeItem("isLogged");
              AsyncStorage.removeItem("token");
              AsyncStorage.removeItem("P_DETAIL");
              AsyncStorage.removeItem("C2_DETAIL");
              AsyncStorage.removeItem("C3_DETAIL");
              AsyncStorage.removeItem("email");
              AsyncStorage.removeItem("Name");
              AsyncStorage.removeItem("Image");
              AsyncStorage.removeItem("GROUP_THEMEE")
              AsyncStorage.removeItem("GROUP_COMPOSITION")
              AsyncStorage.removeItem("FAMILY_COMPOSITION")
              AsyncStorage.removeItem("FAMILY_STYLE")
              AsyncStorage.removeItem("KIDS_OF_SPECIAL_NEEDS")
              AsyncStorage.removeItem("LANGG")
              AsyncStorage.removeItem("HOMECARE")
        

            
              navigation.reset({
                index: 0,
                routes: [
                  {
                    name: "Login",
                  },
                ],
              });
            }, 700);
          },
        },
      ],
      { cancelable: false }
    );
  };
  const delete_Account = async () => {
    setDeleteModal(false);
    var token = await AsyncStorage.getItem("token");
    setUserToken(JSON.parse(token));
    // console.log("TOKEN", JSON.parse(token));
    var config = {
      method: "post",
      url: constants.BASE_URL + "api/profile/account/delete",
      headers: {
        Authorization: "Bearer " + JSON.parse(token),
      },
    };

    axios(config)
      .then(async (response) => {
        await AsyncStorage.setItem("logged", "false");
        alert("Account Deleted");
        setTimeout(() => {
          AsyncStorage.removeItem("logged");
          AsyncStorage.removeItem("user_id");
          AsyncStorage.removeItem("isLogged");
          AsyncStorage.removeItem("token");

          navigation.reset({
            index: 0,
            routes: [
              {
                name: "Login",
              },
            ],
          });
        }, 100);
      })
      .catch(function (error) {
        // console.log(error);
      });
  };
  const personalinfo = async () => {
    var langg=await AsyncStorage.getItem("languagae")
    var token = await AsyncStorage.getItem("token");
    setUserToken(JSON.parse(token));
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
        // console.log("gjgjghg1111", JSON.stringify(response.data.data));
        setName1(response.data.data.name);
        setEmailaddress(response.data.data.email);
        setBirthday(response.data.data.dob);
        setPostalcode1(response.data.data.postal);
        setRelation1(response.data.data.relationship);
        setGender1(response.data.data.gender);
        setImage(response.data.data.image);
        await AsyncStorage.setItem("logged", "true");
      })
      .catch(function (error) {
        // console.log(error);
      });
  };
  const uploadimage = async (image) => {
    var token = await AsyncStorage.getItem("token");
    let filename = image.split("/").pop();
    let match = /\.(\w+)$/.exec(filename);
    let fileType = filename.split(".").pop();
    var obj = {
      uri: image,
      name: filename,
      type: `image/${fileType}`,
    };

    var axios = require("axios");
    var FormData = require("form-data");

    var formdata = new FormData();
    formdata.append("image", obj);
    // console.log("newformdata", JSON.stringify(formdata));

    var config = {
      method: "post",
      url: constants.BASE_URL + "api/profile/image/update",
      headers: {
        Authorization: "Bearer " + JSON.parse(token),
        "Content-Type": "multipart/form-data",
      },
      data: formdata,
    };

    axios(config)
      .then(async (response) => {
        setImage(response.data.data);
        await AsyncStorage.setItem("Image", response.data.data);
        // console.log("newprofileimage", response.data.data);
      })
      .catch(function (error) {
      });
  };
const getdetails=async()=>{
var names=await AsyncStorage.getItem("Name")
var nameeeeee=names.replace(/['"]+/g, '')
setName1(nameeeeee)
var emails=await AsyncStorage.getItem("email")
var emaillls=emails.replace(/['"]+/g, '')
setEmailaddress(emaillls)
}
  useEffect(() => {
    langgg()
    personalinfo();
    getData()
    getdetails()
  }, [isFocused]);
  const getData = async () => {
    const data = await AsyncStorage.getItem("P_DETAIL");
    // console.log("YESS-0-0-", data)
  }
  const toggleModal2 = () => {
    setisVisible(!isVisible);
  };
  const openGallery = () => {
    ImagePicker.openPicker({
      width: 300,
      height: 400,
      cropping: true,
    }).then((image) => {
      setisVisible(false);
      uploadimage(image.path);
      setImage(image.path);

    });
  };
  const OpenCamera = () => {
    ImagePicker.openCamera({
      width: 300,
      height: 400,
      cropping: true,
    }).then((image) => {
      setisVisible(false);
      uploadimage(image.path);
      setImage(image.path);
    });
  };

  const Toggle_Switch1 = () => {
    if (1 == true) {
      seton1(false);
    }
    if (on1 == false) {
      seton1(true);
    }
  };

  const Toggle_Switch2 = () => {
    if (1 == true) {
      seton2(false);
    }
    if (on2 == false) {
      seton2(true);
    }
  };

  const Toggle_Switch3 = () => {
    if (1 == true) {
      seton3(false);
    }
    if (on3 == false) {
      seton3(true);
    }
  };
  const ondropdownchange=async(value)=>{

    if (value== "Danish") {
        setChangeLang("Danish")
       
    }
    else if(value== "English"){
      setChangeLang("English")
    }
          }

  return (
    <ImageBackground
      source={require("../../../Images/background.png")}
      style={Profilestyles.Container}
      resizeMode="stretch"
    >
      <View style={Profilestyles.view2}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Image
            style={Profilestyles.img3}
            resizeMode="contain"
            source={require("../../../Images/Arrow-Left.png")}
          />
        </TouchableOpacity>
        <Text style={Profilestyles.text1}>{t("Profile")}</Text>
        <TouchableOpacity onPress={() => navigation.navigate("Notification1")}>

          <Image
            style={Profilestyles.img3}
            resizeMode="contain"
            source={require("../../asset/Notification.png")}
          />
        </TouchableOpacity>
      </View>
      <ScrollView>

        <View style={Profilestyles.ImageView}>
          <View
            style={{
              borderColor: "#F9FBDB",
              borderWidth: 10,
              height: 130,
              width: 130,
              borderRadius: 130 / 2,
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Image source={{ uri: image }} style={Profilestyles.ImageProfile} />
          </View>
          <TouchableOpacity
            onPress={toggleModal2}
            style={Profilestyles.IconButton}
          >
            <Image
              source={require("../../../Images/edit.png")}
              style={Profilestyles.ProfileEdit}
            />
          </TouchableOpacity>
        </View>

        <Text style={Profilestyles.TextStyle}>{name1}</Text>

        <Text style={Profilestyles.emailText}>{emailaddress}</Text>

        <TouchableOpacity
          style={{
            paddingVertical: 31,
            borderWidth: 1,
            marginTop: 31,
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-between",
            paddingHorizontal: 18.5,
            borderColor: "#DFE3A3",
          }}
          onPress={() =>
            navigation.navigate("PersonalInformation", {
              USER_TOKEN: userToken,
            })
          }
        >
          <View style={{ flexDirection: "row", alignItems: "center" }}>
            <Image
              source={require("../../../Images/Profile_Icon.png")}
              style={{ height: 19.17, width: 15.33 }}
            />
            <Text style={Profilestyles.TextButton}>{t("Personal Information")}</Text>
          </View>

          <Image
            source={require("../../../Images/next.png")}
            style={Profilestyles.NextIcon}
          />
        </TouchableOpacity>

        <TouchableOpacity
          style={Profilestyles.ButtonStyle}
          onPress={() => navigation.navigate("ChildrenInformation")}
        >
          <View style={{ flexDirection: "row", alignItems: "center" }}>
            <Image
              source={require("../../../Images/personIcon.png")}
              style={{ height: 24, width: 19.38 }}
            />
            <Text style={Profilestyles.TextButton}>{t("Children Information")}</Text>
          </View>

          <Image
            source={require("../../../Images/next.png")}
            style={Profilestyles.NextIcon}
          />
        </TouchableOpacity>

        <TouchableOpacity
          style={Profilestyles.ButtonStyle}
          onPress={() => navigation.navigate("Contactadmin")}
        >
          <View style={{ flexDirection: "row", alignItems: "center" }}>
            <Image
              source={require("../../../Images/msg.png")}
              style={{ height: 18, width: 20 }}
            />
            <Text style={Profilestyles.TextButton}>{t("Contact Admin")}</Text>
          </View>

          <Image
            source={require("../../../Images/next.png")}
            style={Profilestyles.NextIcon}
          />
        </TouchableOpacity>

        <TouchableOpacity
          style={Profilestyles.ButtonStyle}
          onPress={() => navigation.navigate("ChangePassword")}
        >
          <View style={{ flexDirection: "row", alignItems: "center" }}>
            <Image
              source={require("../../../Images/lock-icon.png")}
              style={{ height: 19, width: 19 }}
            />
            <Text style={Profilestyles.TextButton}>{t("Change Password")}</Text>
          </View>

          <Image
            source={require("../../../Images/next.png")}
            style={Profilestyles.NextIcon}
          />
        </TouchableOpacity>
        
       
        <TouchableOpacity
          style={Profilestyles.ButtonStyle}
          onPress={() => navigation.navigate("Pushnotification")}
        >
          <View style={{ flexDirection: "row", alignItems: "center" }}>
            <Image
              source={require("../../../Images/msg.png")}
              style={{ height: 19, width: 19 }}
            />
            <Text style={Profilestyles.TextButton}>{t("Push notification")}</Text>
          </View>

          <Image
            source={require("../../../Images/next.png")}
            style={Profilestyles.NextIcon}
          />
        </TouchableOpacity>
        <View style={Profilestyles.viewDesign}>
          <Text style={Profilestyles.TextButton}>{t("Change Language")}</Text>
     
              <Dropdown
                 style={{
                  width: 110,
                  borderRadius: 25,
                  borderColor: "#DFE3A3",
                  backgroundColor: "white",
                  paddingHorizontal: 10,
                  color:'grey'
                }}
          data={data1}
          maxHeight={300}
          labelField={t("label")}
          valueField={t("value")}
          placeholder={changelang==null?"Danish":changelang}
          placeholderStyle={{color:'grey'}}
selectedTextStyle={{ color: "grey" }}
itemTextStyle={{ color: "grey" }} 
          value={changelang}
          onFocus={() => setIsFocus(true)}
          onBlur={() =>  setIsFocus(false)}
          onChange={item => {
            setValue(item.value);
            setIsFocus(false);
            ondropdownchange(item.value)
            changeLanguage(item.value)
            if(item.value=="Danish"){
              changeLanguage("da")
            }
            if(item.value=="English"){
              changeLanguage("en")
              // setLanguage("en")
            }
          }}
   
          />
          
    
      
        </View>

        <View style={Profilestyles.viewDesign}>
          <Text style={Profilestyles.TextButton}>{t("Allow app notifications")}</Text>
          <ToggleSwitch
            isOn={on2}
            onColor="#008080"
            offColor="#EDEDED"
            size="medium"
            onToggle={() => Toggle_Switch2()}
          />
        </View>

        <View style={Profilestyles.viewDesign}>
          <Text style={Profilestyles.TextButton}>{t("Receive newsletters, good offers & marketing materials")}</Text>
          
          
          <ToggleSwitch
            isOn={on3}
            onColor="#008080"
            offColor="#EDEDED"
            size="medium"
            onToggle={() => Toggle_Switch3()}
            style={{ flex: 0.1, marginEnd: 20 }}
          />
        </View>

        <View style={Profilestyles.viewDesign}>
          <Text style={Profilestyles.TextButton}>
            {t("Allow use of geo-tracking")}
          </Text>

          <View style={{ width: 116 }}>
            <Dropdown
              style={{
                width: 110,
                borderRadius: 25,
                borderColor: "#DFE3A3",
                backgroundColor: "white",
                paddingHorizontal: 10,
              }}
              data={data}
              maxHeight={200}
              labelField={t("label1")}
              valueField={t("value1")}
              placeholder={t("Once")}
              containerStyle={{ borderRadius: 5 }}
              itemTextStyle={{ color: "grey" }} 
              placeholderStyle={{
                fontFamily: "Axiforma-Regular",
                fontSize: 13,
                color: "grey",
              }}
              selectedTextStyle={{ color: "grey" }}
              value={value}
              onFocus={() => setIsFocus(true)}
              onBlur={() => setIsFocus(false)}
              onChange={(item) => {
                setValue(item.value1);
                setIsFocus(false);
                
              }}
            />
          </View>
        </View>
        <View style={Profilestyles.viewDesign}>
        <TouchableOpacity
          disabled={disableLogout}
          onPress={() => {
            _logout(), setDisableLogout(true);
          }}
          style={{
            flexDirection: "row",
            paddingVertical: 0,
            paddingStart: 19.5,
          }}
        >

          <Image
            source={require("../../../Images/Logout.png")}
            style={{
              tintColor: "#008080",
              height: 18.13,
              width: 18.62,
              alignSelf: "center",
            }}
          />
          <Text
            style={{
              color: "#737373",
              fontSize: 18,
              fontFamily: "Axiforma-Regular",
              marginStart: 8,
            }}
          >
            {t("Logout")}
          </Text>
        </TouchableOpacity>
        </View>
        <View style={{ height: 0.3,width:100 }}></View>
        <TouchableOpacity
          onPress={() => {
            setDeleteModal(true);
          }}
          style={{
            flexDirection: "row",
            paddingVertical: 30,
            paddingStart: 32.5,
          }}
        >
          <Image
            // source={require("../../../Images/Logout.png")}
            source={require("../../asset/delete.png")}
            style={{
              tintColor: "#008080",
              height: 18.13,
              width: 18.62,
              alignSelf: "center",
            }}
          />
          <Text
            style={{
              color: "#737373",
              fontSize: 18,
              fontFamily: "Axiforma-Regular",
              marginStart: 8,
            }}
          >
            {t("Delete Account")}
          </Text>
        </TouchableOpacity>
        {isVisible == true && (
          <Modal
            isVisible={true}
            onBackdropPress={() => {
              setisVisible(!isVisible);
            }}
          >
            <View
              style={{
                backgroundColor: "white",
                borderRadius: 20,
                paddingBottom: 10,
                marginHorizontal: 20,
              }}
            >
              <TouchableOpacity
                onPress={() => setisVisible(false)}
                style={{
                  marginTop: 10,
                  alignItems: "flex-end",
                  marginRight: 25,
                }}
              >
                <Image
                  source={require("../../asset/cross.png")}
                  style={{ resizeMode: "contain", height: 35, width: 35 }}
                />
              </TouchableOpacity>
              <View
                style={{
                  height: 100,
                  width: "100%",
                  flexDirection: "row",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <TouchableOpacity
                  onPress={() => OpenCamera()}
                  style={{
                    backgroundColor: "#008080",
                    justifyContent: "center",
                    alignItems: "center",
                    height: 52,
                    borderRadius: 50,
                    width: 120,
                    marginHorizontal: 10,
                    flexDirection: "row",
                  }}
                >
                  <Image
                    source={require("../../asset/camera-icon.png")}
                    style={{ height: 22, width: 35, tintColor: "white" }}
                  />
                  <Text style={{ color: "white", fontSize: 16 }}>Camera</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={() => openGallery()}
                  style={{
                    backgroundColor: "#008080",
                    justifyContent: "center",
                    alignItems: "center",
                    height: 52,
                    marginHorizontal: 5,
                    borderRadius: 50,
                    marginHorizontal: 10,
                    width: 120,
                    flexDirection: "row",
                  }}
                >
                  <Image
                    resizeMode="contain"
                    source={require("../../asset/gallery.png")}
                    style={{ height: 22, width: 35, tintColor: "white" }}
                  />
                  <Text style={{ color: "white", fontSize: 16 }}>Gallery</Text>
                </TouchableOpacity>
              </View>
            </View>
          </Modal>
        )}

        {visible3 == true && (
          <Modal
            isVisible={true}
            onBackdropPress={() => {
              setvisible3(!visible3);
            }}
          >
            <View style={Profilestyles.notificationmodalview}>
              <TouchableOpacity
                onPress={() => setvisible3(false)}
                style={Profilestyles.modalview1}
              >
                <Image
                  style={Profilestyles.crossimg}
                  resizeMode="contain"
                  source={require("../../asset/cross.png")}
                />
              </TouchableOpacity>
              <View style={Profilestyles.modalview2}>
                <Image
                  resizeMode="contain"
                  style={Profilestyles.modalimg}
                  source={require("../../asset/ic-Chill.png")}
                />
                <Text style={Profilestyles.modaltxt}>
                  Welcome to group
                  {"\n"}The high five jumpers
                </Text>
                <Text style={Profilestyles.modaltxt1}>You are all in</Text>
                <View style={Profilestyles.modalview3}>
                  <View style={Profilestyles.modalview4}>
                    <View style={Profilestyles.view8}>
                      <Image
                        style={Profilestyles.img5}
                        resizeMode="contain"
                        source={require("../../asset/Location.png")}
                      />
                      <Text style={Profilestyles.text4}>TOK OEO</Text>
                    </View>
                    <View style={Profilestyles.modalview8}>
                      <Image
                        style={Profilestyles.img5}
                        resizeMode="contain"
                        source={require("../../asset/chill.png")}
                      />
                      <Text style={Profilestyles.text4}>Chill </Text>
                    </View>
                  </View>

                  <View style={Profilestyles.modalview9}>
                    <Image
                      style={Profilestyles.img5}
                      resizeMode="contain"
                      source={require("../../asset/Profile(2).png")}
                    />
                    <Text style={Profilestyles.text4}>Age group: 2 years</Text>
                  </View>
                </View>
              </View>
            </View>
          </Modal>
        )}
        <Modal
          isVisible={deleteModal}
          onBackdropPress={() => {
            setvisible3(!deleteModal);
          }}
        >
          <View style={Profilestyles.deleteModalView}>
            <Text style={{ textAlign: "center",color:'grey' }}>
              {t("Are you sure you want to delete your account?")}
            </Text>
            <View
              style={{ flexDirection: "row", justifyContent: "space-evenly" }}
            >
              <TouchableOpacity
                style={Profilestyles.login}
                onPress={() => {
                  setDeleteModal(false);
                }}
              >
                <Text style={Profilestyles.loginText}> {t("Cancel")}</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={Profilestyles.login}
                onPress={() => delete_Account()}
              >
                <Text style={Profilestyles.loginText}> {t("Yes")}</Text>
              </TouchableOpacity>
            </View>
          </View>
        </Modal>
      </ScrollView>
    </ImageBackground>
  );
};
const full_app =  withTranslation()(ProfileScreen)
export default full_app;

const Profilestyles = StyleSheet.create({
  Container: {
    flex: 1,
  },

  IconStyle: {
    height: 27,
    width: 27,
    tintColor: "#F9FBDB",
  },
  dropdown: {
    alignSelf: "center",
    borderColor: "#DFE3A3",
    borderWidth: 1,
    height: hp(6),
    width: wp(85),
    borderRadius: 25,
    paddingLeft: "8%",
    paddingEnd: "7%",
    backgroundColor: "white",
  },
  IconDesign: {
    height: 25,
    width: 25,
    tintColor: "#F9FBDB",
  },

  ViewStyle: {
    backgroundColor: "#008080",
    justifyContent: "space-between",
    flexDirection: "row",
    alignItems: "center",
    paddingTop: 52,
    paddingBottom: 21,
    paddingHorizontal: 17,
  },

  TextStyle: {
    color: "grey",
    fontFamily: "Axiforma-Bold",
    fontSize: 24,
    textAlign: "center",
    marginTop: 14,
  },

  ImageView: { marginTop: 37, alignSelf: "center" },

  ImageProfile: {
    height: 136,
    width: 136,
    borderWidth: 1,
    borderColor: "grey",
    borderRadius: 136 / 2,
  },

  ProfileEdit: { height: 34, width: 34 },

  IconButton: {
    position: "absolute",
    alignSelf: "flex-end",
    marginTop: 10,
    marginEnd: 10,
  },

  emailText: {
    color: "#737373",
    fontSize: 14,
    fontFamily: "Axiforma-Regular",
    textAlign: "center",
  },

  ButtonStyle: {
    paddingVertical: 31,
    borderWidth: 1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 18.5,
    borderColor: "#DFE3A3",
    borderTopWidth: 0,
  },

  NextIcon: { height: 12.47, width: 7.18 },

  TextButton: {
    color: "#737373",
    fontSize: 16,
    fontFamily: "Axiforma-Regular",
    marginStart: 11,
    marginEnd: 50,
    flex: 0.9,
  },

  viewDesign: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingVertical: 30,
    paddingHorizontal: 15,
    borderWidth: 1,
    borderTopWidth: 0,
    borderColor: "#DFE3A3",
    alignItems: "center",
  },
  img2: {
    alignSelf: "center",
    width: 110,
    height: 110,
    borderRadius: 110 / 2,
    borderColor: "#F9FBDB",
  },
  view2: {
    backgroundColor: "#008080",
    width: "100%",
    padding: 10,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingTop: 40,
  },
  text1: {
    color: "#F9FBDB",
    fontSize: 24,
    fontFamily: "Axiforma-Bold",
  },
  img3: {
    width: 25,
    height: 25,
    tintColor: "#F9FBDB",
  },
  modalview: {
    backgroundColor: "white",
    width: 326,
    borderRadius: 16,
    padding: 20,
    alignSelf: "center",
    marginLeft: 50,
  },

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
    paddingLeft: 15,
    paddingRight: 15,
    width: "100%",
    alignItems: "center",
    marginBottom: 20,
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
    height: 62.9,
    width: 68,
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
    borderRadius: 16,
    padding: 20,
    marginBottom: 350,
    marginLeft: 50,
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
    marginTop: 40,
    marginBottom: 33,
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
    marginLeft: 35,
  },
  deleteModalView: {
    backgroundColor: "white",
    width: 326,
    borderRadius: 16,
    padding: 20,
    alignSelf: "center",
  },
  login: {
    backgroundColor: "#008080",
    width: wp(30),
    justifyContent: "center",
    alignSelf: "center",
    height: hp(6),
    borderRadius: 25,
    margin: 25,
  },
  selectedStyle: {
    borderRadius: 12,
  },
  loginText: {
    alignSelf: "center",
    color: "white",
    fontSize: 16,
  },
});