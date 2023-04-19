import React, { useState, useEffect, useCallback } from "react";
import {
  ImageBackground,
  TextInput,
  SafeAreaView,
  StyleSheet,
  Text,
  View,
  Image,
  ActivityIndicator,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import { useTranslation, withTranslation, Trans } from 'react-i18next';
import '../translation/i18n'
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import axios from "axios";
import constants from "../constants/constants";
import AsyncStorage from "@react-native-async-storage/async-storage";
import {
  GoogleSignin,
  GoogleSigninButton,
  statusCodes,
} from "@react-native-google-signin/google-signin";
import DeviceInfo from 'react-native-device-info';
import {
  LoginManager,
  GraphRequest,
  GraphRequestManager,
  AccessToken,
} from "react-native-fbsdk";
import { Value } from "react-native-reanimated";
var passwordTest =
  "Password must be at least 8 characters, 1 uppercase, 1 lowercase, 1 number, and 1 special character";
const CreateAccount = ({ navigation }) => {
  const {t, i18n} = useTranslation();
  const [secureEntry, setsecureEntry] = useState(true);
  const [password, setpassword] = useState("");
  const [secureEntry1, setsecureEntry1] = useState(true);
  const [password1, setpassword1] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [passwords, setPasswords] = useState("");
  const [phone, setPhone] = useState("");
  const [Confirm_password, setConfirmPassword] = useState("");
  const [passwordval, setpasswordval] = useState("");
  const [passowrdvalidation, setpasswordvalidation] = useState("");
  const [confirmpassval, setconfirmpassval] = useState("");
  const [confirmpasswordval, setconfirmpasswordval] = useState("");
  const [nameval, setNameval] = useState("");
  const [emailval, setEmailval] = useState("");
  const [emailvalidation, setEmailvalidation] = useState("");
  const [phoneval, setphoneval] = useState("");
  const [loader, setLoader] = useState("");
  const [passwordlength, setpasswordlength] = useState("");
  const [isDisabled, setIsDisabled] = useState(false);
  const [passwordStrong, setPasswordStrong] = useState(false);
  const [deviceID,setDeviceID]=useState("")
  const getdeviceId = async() => {
      const data= await OneSignal.getDeviceState()
      
      setDeviceID(data.userId)

    
    
  };
  function validate_password(password) {
    setpassword(password);
 let check = /(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.{8,})/;
    

    if (password.match(check)) {
      setIsDisabled(false);
      passwordTest = "";
    } else {
      setIsDisabled(true);
      passwordTest =
        t("Password must be at least 8 characters, 1 uppercase, 1 lowercase, 1 number, and 1 special character");
    }
  }

  const [user, setUser] = useState("");
  const getMyID=async()=>{
    const ID=await AsyncStorage.getItem("DEVICE_ID")
    var III=ID.replace(/['"]+/g, '')

    setDeviceID(III)

  }
  useEffect(() => {
    getMyID()
    // getdeviceId()
    GoogleSignin.configure({
      webClientId:
        "523535053264-9ncm3g8okuh6bgu6lmq3tbslf0n3sul4.apps.googleusercontent.com",
      offlineAccess: true, // if you want to access Google API on behalf of the user FROM YOUR SERVER
      forceCodeForRefreshToken: true, // [Android] related to `serverAuthCode`, read the docs link below *.
      iosClientId:
        "523535053264-9ncm3g8okuh6bgu6lmq3tbslf0n3sul4.apps.googleusercontent.com", // [iOS] optional, if you want to specify the client ID of type iOS (otherwise, it is taken from GoogleService-Info.plist)
    });
    isSignedIn();
    signOut();
  }, [useCallback]);
  const signIn = async () => {
    try {
      await GoogleSignin.hasPlayServices();
      const userInfo = await GoogleSignin.signIn();

      GoogleSign(userInfo.user.id);

      await AsyncStorage.setItem("email", JSON.stringify(userInfo.user.email));
      await AsyncStorage.setItem("Name", JSON.stringify(userInfo.user.name));

      await AsyncStorage.setItem("Image", userInfo.user.photo);


      setUser(userInfo);
    } catch (error) {
      if (error.code === statusCodes.SIGN_IN_CANCELLED) {

      } else if (error.code === statusCodes.IN_PROGRESS) {
      } else if (error.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE) {
      } else {

      }
    }
  };

  const isSignedIn = async () => {
    const isSignedIn = await GoogleSignin.isSignedIn();
    if (!!isSignedIn) {
      getCurrentUserInfo();
    } else {
      // console.log('Please Login')
    }
  };
  const getCurrentUserInfo = async () => {
    try {
      const userInfo = await GoogleSignin.signInSilently();
      setUser(userInfo);
    } catch (error) {
      if (error.code === statusCodes.SIGN_IN_REQUIRED) {

      } 
    }
  };
  const signOut = async () => {
    try {
      await GoogleSignin.revokeAccess();
      await GoogleSignin.signOut();
      setUser({}); // Remember to remove the user from your app's state as well
    } catch (error) {
      // console.error(error);
    }
  };
  const GoogleSign = async (id) => {
    var langg =await AsyncStorage.getItem("langugae")
    var name = await AsyncStorage.getItem("Name");
    var username = name.replace(/^"(.*)"$/, "$1");
    var email = await AsyncStorage.getItem("email");
    var useremail = email.replace(/^"(.*)"$/, "$1");
    var img = await AsyncStorage.getItem("Image");
    var formdata = new FormData();
    formdata.append("social_id", id);
    formdata.append("type", "google");
    formdata.append("name", username);
    formdata.append("email", useremail);
    formdata.append("image", img);
    formdata.append("device_id", deviceID);

    setLoader(true);
    axios({
      method: "post",
      url: constants.BASE_URL + "api/social/login",
      data: formdata,
      headers: { 'X-localization': langg,  },
    })
      .then(async (response) => {
        setLoader(false);
        if (response.data.status == true) {
          await AsyncStorage.setItem(
            "token",
            JSON.stringify(response.data.token)
          );
          if (!response.data.data.profile_complete) {
            navigation.navigate("CompleteProfile");
          } else {
            navigation.navigate("MyTabs");
          }
        }

      })
      .catch(function (response) {
        setLoader(false);
      });
  };

  const Facebooksign = async (userID) => {
    var langg =await AsyncStorage.getItem("langugae")
    var name = await AsyncStorage.getItem("Name");
    var FBname = name.replace(/^"(.*)"$/, "$1");
    var emailss = await AsyncStorage.getItem("email");
    var FBemail = emailss.replace(/^"(.*)"$/, "$1");

    var img = await AsyncStorage.getItem("Image");
    var formdata = new FormData();
    formdata.append("social_id", userID);
    formdata.append("type", "facebook");
    formdata.append("name", FBname);
    formdata.append("email", FBemail);
    formdata.append("image", img);
    formdata.append("device_id", deviceID);
    setLoader(true);
    axios({
      method: "post",
      url: constants.BASE_URL + "api/social/login",
      data: formdata,
      // headers: {  'X-localization':langg,  },
    })
      .then(async (response) => {

        setLoader(false);
        if (response.data.status == true) {
          await AsyncStorage.setItem(
            "token",
            JSON.stringify(response.data.token)
          );
          await AsyncStorage.setItem(
            "Name",
            JSON.stringify(response.data.data.name)
          );
          if (!response.data.data.profile_complete) {
            navigation.navigate("CompleteProfile");
          } else {
            navigation.navigate("MyTabs");
          }

        }

      })
      .catch(function (response) {
        setLoader(false);
        //handle error
      });
  };
  const getResponseInfo = (error, result) => {
    if (error) {

      alert("Error fetching data: " + error.toString());
    } else {

    }
  };
  const toLoginFb = () => {
    LoginManager.logInWithPermissions(["public_profile",'email']).then(
      function (result) {
        if (result.isCancelled) {

        } else {

          AccessToken.getCurrentAccessToken().then((data) => {

            const processRequest = new GraphRequest(
              "/me?fields=name,picture.type(large)",
              null,
              getResponseInfo(),
              
              initUser(data.accessToken),
              Facebooksign(data.userID),
              profilepicture(data.accessToken)
            );

          });

        }
      },
      function (error) {
      }
    );
  };
  const initUser = async (token) => {
    
    fetch(
      "https://graph.facebook.com/v2.5/me?fields=email,name,friends&access_token=" +
        token
    )
      .then((response) => response.json())
      .then(async (json) => {

        await AsyncStorage.setItem("email", json.email);
        // console.log("uyuytyeeeetrtrtr",json.email)
        await AsyncStorage.setItem("Name", json.name);
        
      })
      .catch(() => {
        // console.log("iuououo")
        // reject("ERROR GETTING DATA FROM FACEBOOK");
      });
  };
  const profilepicture = async (accessToken) => {
    try {
      const graphRequest = new GraphRequest(
        "/me",
        {
          accessToken: accessToken,
          parameters: {
            fields: {
              string: "picture.type(large)",
            },
          },
        },
        async (error, result) => {
          if (error) {
          } else {
            await AsyncStorage.setItem("Image", result.picture.data.url);

          }
        }
      );

      new GraphRequestManager().addRequest(graphRequest).start();
    } catch (error) {
    }
  };
  const Register = async () => {
    var langg =await AsyncStorage.getItem("langugae")
    await AsyncStorage.removeItem("token");
    var email12 = email.replace(/\s/g, "");
    var password1 = password.replace(/\s/g, "");
    var phone1 = phone.replace(/\s/g, "");
    var pass = Confirm_password.replace(/\s/g, "");
    var name12 = name.replace(/\s/g, "");

    const strongRegex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w\w+)+$/;
    const strongRegex1 = new RegExp(
      /(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.{8,})/
    );
    const regx = "[a-zA-Z]";
    // if (
    //   name == "" ||
    //   password == "" ||
    //   Confirm_password == "" ||
    //   email == "" ||
    //   phone == ""
    // ) {
    //   alert("Please fill all the required feilds");
    // } 
    if(name == ""){
      alert("Please enter your name")
    }
    else if( email == ""){
      alert("Please enter email")
    }
    else if (!strongRegex.test(email)) {
      alert("Please enter valid email");
    }
    else if( phone == ""){
      alert("Please enter phone number")
    }
    else if (phone.length < 8) {
      alert("Please enter valid phone number");
    }
    else if( password == ""){
      alert("Please enter password")
    }
    else if (password.length < 8) {
      alert("Password should be atleast character");
    } 
    else if (!strongRegex1.test(password)) {
      alert("Please enter correct password")
    }
    else if( Confirm_password == ""){
      alert("Please enter your confirm_password")
    }
    else if (Confirm_password != password) {
      alert("Password does not meet requirements");
    }
    // else if (!strongRegex.test(email)) {
    //   alert("Please enter valid email");
    // } else if (phone.length < 8) {
    //   alert("Please enter valid phone number");
    // } else if (password.length < 8) {
    //   alert("Your password must be at least 8 characters");
    // } else if (!strongRegex1.test(password)) {
    //   alert("Please enter correct password")
    // } else if (Confirm_password != password) {
    //   alert("Password mismatched");
    // } 
    else {
      if (passwordTest == "") {
        setIsDisabled(true);
        var formdata = new FormData();
        formdata.append("name", name12.replace(/^"(.*)"$/, "$1"));
        formdata.append("email", email12.replace(/^"(.*)"$/, "$1"));
        formdata.append("password", password1);
        formdata.append("phone", phone1);
        formdata.append("device_id", deviceID);
        formdata.append("confirm_password", pass), setLoader(true);
        // console.log("REFHHUGIOGHIOGHiogiogio",formdata)
        axios({
          method: "post",
          url: constants.BASE_URL + "api/register",
        
          data: formdata,
          headers: {  'X-localization': langg,},
        })
        
          .then(async (response) => {
            if (response.data.status == true) {
              setIsDisabled(false);
              setLoader(false);

              await AsyncStorage.setItem(
                "token",
                JSON.stringify(response.data.token)
              );
              // console.log("hffghffg",response.data.token)
              await AsyncStorage.setItem("email", response.data.data[0].email);
              await AsyncStorage.setItem("Name", response.data.data[0].name);
              await AsyncStorage.setItem(
                "user_id",
                JSON.stringify(response.data.data[0].id)
              );
              navigation.navigate("CompleteProfile");
            } else {
              setIsDisabled(false);
              setLoader(false);
              alert(response.data.message);
            }
          })
          .catch(function (error) {
            setIsDisabled(false);
            setLoader(false);
          });
      }
    }
  };

  return (
    <View style={Style.MainContainer}>
      <ImageBackground
        style={Style.ImageBackground}
        source={require("../../asset/Splash.png")}
      >
        
        <View>
          <View style={{ height: 250 }}>
            <ImageBackground
              resizeMode="stretch"
              style={Style.ImageBackground1}
              source={require("../../asset/Top.png")}
            >
              <View style={{ flexDirection: "row" }}>
                <TouchableOpacity
                  onPress={() => navigation.navigate("Login")}
                  style={Style.backBtn}
                >
                  <Image
                    style={Style.img}
                    source={require("../../asset/back-button.png")}
                  />
                </TouchableOpacity>
              </View>
              <View style={Style.View1}>
                <Text style={Style.Text}> {t("Create account")} </Text>
              </View>
            </ImageBackground>
          </View>
          <KeyboardAwareScrollView
            showsVerticalScrollIndicator={false}
            style={{ marginTop: 30, height: "90%" }}
          >
            <View style={Style.View2}>
              <View style={Style.TextFieldView}>
                <TextInput
                  placeholderTextColor="grey"
                  underlineColor="transparent"
                  style={Style.textInput}
                  placeholder={t("Your name")}
                  onChangeText={(text) => {
                    setName(text.trim());
                  }}
                />
                <Image
                  source={require("../../asset/Profile.png")}
                  style={Style.imgIcon}
                />
              </View>

              <View style={Style.TextFieldView1}>
                <TextInput
                  placeholderTextColor="grey"
                  underlineColor="transparent"
                  style={Style.textInput}
                  placeholder={t("Email address")}
                  onChangeText={(text) => {
                    setEmail(text);
                  }}
                />
                <Image
                  source={require("../../asset/Message.png")}
                  style={Style.imgIcon}
                />
              </View>

              <View style={Style.TextFieldView1}>
                <TextInput
                  placeholderTextColor="grey"
                  underlineColor="transparent"
                  style={Style.textInput}
                  maxLength={8}
                  keyboardType="number-pad"
                  placeholder={t("Phone number")}
                  onChangeText={(text) => {
                    setPhone(text);
                  }}
                />
                <Image
                  source={require("../../asset/Call.png")}
                  style={Style.imgIcon}
                />
              </View>

              <View style={Style.TextFieldView1}>
                <TextInput
                  placeholderTextColor="grey"
                  underlineColor="transparent"
                  style={Style.textInput}
                  placeholder={t("Enter password")}
                  secureTextEntry={secureEntry}
                  onChangeText={(password) => {
                    validate_password(password);
                  }}
                 
                />
                {secureEntry == true ? (
                  <TouchableOpacity
                    style={{
                      backgroundColor: "transparent",
                      flex: 1,
                      justifyContent: "center",
                      alignItems: "center",
                    }}
                    onPress={() => setsecureEntry(false)}
                  >
                    <Image
                      source={require("../../asset/Lock.png")}
                      style={Style.imgIcon}
                    />
                  </TouchableOpacity>
                ) : (
                  <TouchableOpacity
                    style={{
                      backgroundColor: "transparent",
                      flex: 1,
                      justifyContent: "center",
                      alignItems: "center",
                    }}
                    onPress={() => setsecureEntry(true)}
                  >
                    <Image
                      source={require("../../asset/unlock.png")}
                      style={Style.unlockicon}
                    />
                  </TouchableOpacity>
                )}
              </View>

              {password !== "" && passwordTest !== "" && (
                <Text
                  style={{
                    fontFamily: "Axiforma-Medium",
                    fontSize: 13,
                    color: "grey",
                    textAlign: "left",
                    alignItems: "flex-start",
                    alignSelf: "flex-start",
                    marginLeft: 30,
                    marginTop: 10,
                  }}
                >
                  {passwordTest}
                </Text>
              )}

              <View style={Style.TextFieldView1}>
                <TextInput
                  placeholderTextColor="grey"
                  underlineColor="transparent"
                  style={Style.textInput}
                  placeholder={t("Confirm password")}
                  secureTextEntry={secureEntry1}
                  onChangeText={(text) => {
                    if (text !== "") {
                      setConfirmPassword(text);
                    }
                  }}
                />
                {secureEntry1 == true ? (
                  <TouchableOpacity
                    style={{
                      backgroundColor: "transparent",
                      flex: 1,
                      justifyContent: "center",
                      alignItems: "center",
                    }}
                    onPress={() => setsecureEntry1(false)}
                  >
                    <Image
                      source={require("../../asset/Lock.png")}
                      style={Style.imgIcon}
                    />
                  </TouchableOpacity>
                ) : (
                  <TouchableOpacity
                    style={{
                      backgroundColor: "transparent",
                      flex: 1,
                      justifyContent: "center",
                      alignItems: "center",
                    }}
                    onPress={() => setsecureEntry1(true)}
                  >
                    <Image
                      source={require("../../asset/unlock.png")}
                      style={Style.unlockicon}
                    />
                  </TouchableOpacity>
                )}
              </View>
             
            </View>

            <TouchableOpacity
              style={Style.register}
              disabled={isDisabled}
              onPress={() => {
                Register();
              }}
            >
              {loader == true ? (
                <ActivityIndicator size="small" color="white" />
              ) : (
                <Text style={Style.registerText}> {t("Register")} </Text>
              )}
            </TouchableOpacity>

            <View style={Style.iconsView}>
              {/* <TouchableOpacity onPress={() => toLoginFb()}>
                <Image
                  resizeMode="contain"
                  style={Style.imgIcon1}
                  source={require("../../asset/image2.png")}
                />
              </TouchableOpacity> */}

              {/* <TouchableOpacity onPress={() => signIn()}>
                <Image
                  resizeMode="contain"
                  style={Style.imgIcon2}
                  source={require("../../asset/Or.png")}
                />
              </TouchableOpacity> */}
            </View>

            <View style={Style.View3}>
              <Text style={{ fontSize: 16,
    color: "grey",
    alignSelf: "center",
    fontFamily: "Axiforma-Regular",marginTop:20}}>{t("Already have an account?")} </Text>
              <TouchableOpacity onPress={() => navigation.navigate("Login")}>
                <Text style={{fontSize: 16,
    color: "#008080",
    alignSelf: "center",
    fontFamily: "Axiforma-Regular",marginTop:20}}>{t("Login")}</Text>
              </TouchableOpacity>
            </View>
          </KeyboardAwareScrollView>
        </View>
      </ImageBackground>
    </View>
  );
};
const full_app =  withTranslation()(CreateAccount)
export default full_app;
// export default CreateAccount;
const Style = StyleSheet.create({
  MainContainer: {
    flex: 1,
    backgroundColor: "#F9FBDB",
  },
  ImageBackground: {
    flex: 1,
    height: "100%",
    width: "100%",
    backgroundColor: "#F9FBDB",
  },
  text: {
    fontSize: 16,
    color: "grey",
    alignSelf: "center",
    fontFamily: "Axiforma-Regular",
  },
  text2: {
    fontSize: 16,
    color: "#008080",
    alignSelf: "center",
    fontFamily: "Axiforma-Medium",
  },
  imgIcon: {
    resizeMode: "contain",
    height: hp(2.5),
    width: wp(10),
  },
  imgIcon1: {
    height: hp(15),
    width: wp(15),
  },
  imgIcon2: {
    height: hp(15),
    width: wp(15),
    marginLeft: 25,
  },
  Text: {
    fontSize: 26,
    color: "#F9FBDB",
    fontFamily: "Axiforma-Bold",
  },
  ImageBackground1: {
    width: "100%",
    height: "100%",
  },
  View1: {
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: "33%",
  },
  View2: {
    alignItems: "center",
    justifyContent: "center",
    padding: 20,
  },
  View3: {
    alignItems: "center",
    marginTop: 10,
    justifyContent: "center",
    bottom: 20,
    flexDirection: "row",
    marginBottom: 250,
  },

  iconsView: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 25,
    justifyContent: "center",
    borderColor: "White",
  },

  TextFieldView: {
    paddingLeft: "7%",
    height: hp(7),
    width: wp(85),
    flexDirection: "row",
    alignItems: "center",
    borderRadius: 25,
    padding: wp(2),
    backgroundColor: "white",
    shadowColor: "#171717",
    shadowOffset: { width: 2, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 3,
    elevation: 10,
  },
  TextFieldView1: {
    paddingLeft: "7%",
    height: hp(7),
    width: wp(85),
    flexDirection: "row",
    alignItems: "center",
    borderRadius: 25,
    padding: wp(2),
    marginTop: hp(2),
    backgroundColor: "white",
    shadowColor: "#171717",
    shadowOffset: { width: 2, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 3,
    elevation: 10,
  },
  textInput: {
    fontFamily: "Axiforma-Medium",
    backgroundColor: "white",
    fontSize: 13,
    width: wp(65),
    height: hp(6),
    color: "#737373",
  },

  img: {
    marginLeft: 40,
    width: 27,
    height: 27,
    marginTop: 30,
    resizeMode: "contain",
    tintColor: "#F9FBDB",
  },
  backBtn: {
    height: hp(6),
    width: wp(10),
    justifyContent: "center",
    alignItems: "center",
    marginTop: 10,
  },
  register: {
    backgroundColor: "#008080",
    width: wp(85),
    justifyContent: "center",
    alignSelf: "center",
    height: hp(6),
    borderRadius: 50,
    marginTop: "4%",
  },
  registerText: {
    alignSelf: "center",
    color: "white",
    fontSize: 16,
    fontFamily: "Axiforma-Regular",
  },
  unlockicon: {
    resizeMode: "contain",
    height: hp(2.5),
    width: wp(10),
    tintColor: "#008080",
  },
});