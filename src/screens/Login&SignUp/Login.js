import React, { useEffect, useState, useCallback } from "react";
import {
  ImageBackground,
  TextInput,
  SafeAreaView,
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  ActivityIndicator,
  Platform,
} from "react-native";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import axios from "axios";
import { useTranslation, withTranslation, Trans } from 'react-i18next';
import '../translation/i18n'
import constants from "../constants/constants";
import AsyncStorage from "@react-native-async-storage/async-storage";
import {
  GoogleSignin,
  GoogleSigninButton,
  statusCodes,
} from "@react-native-google-signin/google-signin";
import {
  LoginManager,
  GraphRequest,
  GraphRequestManager,
  AccessToken,
} from "react-native-fbsdk";
import OneSignal from "react-native-onesignal";
import DeviceInfo from 'react-native-device-info';
import NetInfo from "@react-native-community/netinfo";

import {
  AppleButton,
  appleAuth,
} from "@invertase/react-native-apple-authentication";
const Login = ({ navigation }) => {
  const [netInfo, setNetInfo] = useState('');



  const {t, i18n} = useTranslation();
  const [secureEntry, setsecureEntry] = useState(true);
  const [password, setpassword] = useState("");
  const [password1, setpassword1] = useState("");
  const [email, setEmail] = useState("");
  const [email1, setEmail1] = useState("");
  const [loader, setLoader] = useState("");
  const [loaderApple, setLoaderApple] = useState(false);
  const [user, setUser] = useState({});
  const [deviceID,setDeviceID]=useState(null)



  const getdeviceId = async () => {

    //OneSignal.setAppId("82ec25ac-40d4-4919-a966-518db135946f");
    OneSignal.setAppId("2cbe75b6-e10b-4f37-b2ef-f1b573c93c6a");

    OneSignal.promptForPushNotificationsWithUserResponse();
    OneSignal.setNotificationWillShowInForegroundHandler(
      (notificationReceivedEvent) => {
        let notification = notificationReceivedEvent.getNotification();
        const data = notification.additionalData;
        notificationReceivedEvent.complete(notification);
      }
    );

    OneSignal.setNotificationOpenedHandler((notification) => {
    });
    const deviceState = await OneSignal.getDeviceState()    
    await AsyncStorage.setItem("DEVICE_ID", JSON.stringify(deviceState.userId))
    setDeviceID(deviceState.userId);
   
    console.log("hhjhjggg",deviceState.userId)
  };

  // const onIds=(device)=>{
  //   alert(device)
  // }
  useEffect(() => {
    // Check_internet()
    getMyID()
    //  getdeviceId()
    GoogleSignin.configure({
      webClientId:
        "523535053264-9ncm3g8okuh6bgu6lmq3tbslf0n3sul4.apps.googleusercontent.com",
      offlineAccess: true, // if you want to access Google API on behalf of the user FROM YOUR SERVER
      forceCodeForRefreshToken: true, // [Android] related to `serverAuthCode`, read the docs link below *.
      iosClientId:
        "523535053264-9ncm3g8okuh6bgu6lmq3tbslf0n3sul4.apps.googleusercontent.com", // [iOS] optional, if you want to specify the client ID of type iOS (otherwise, it is taken from GoogleService-Info.plist)
    });
    isSignedIn();
  }, []);

  const Check_internet=()=>{
  
      // To get current network connection status
      NetInfo.isConnected.fetch().then((connectionInfo) => {
        setNetInfo(connectionInfo)
      })
      // Whenever connection status changes below event fires
      NetInfo.isConnected.addEventListener('connectionChange', onChange)
  
      // Our event cleanup function
      return () => {
        NetInfo.isConnected.removeEventListener('connectionChange', onChange)
    // returns current network connection status 
   
  }
  }
  const user1 = async () => {
    var loginemail = await AsyncStorage.getItem("email");
    var useremail = loginemail.replace(/\s/g, "");
    setEmail1(useremail);
    var password = await AsyncStorage.getItem("Password");
    var userPassword = password.replace(/\s/g, "");
    setpassword1(userPassword);
  };
const getMyID=async()=>{
  const ID=await AsyncStorage.getItem("DEVICE_ID")
  var III=ID.replace(/['"]+/g, '')
  setDeviceID(III)
}
  const signIn = async () => {
    try {
      await GoogleSignin.hasPlayServices();
      const userInfo = await GoogleSignin.signIn();

      GoogleSign(userInfo.user.id);
      await AsyncStorage.setItem("email", JSON.stringify(userInfo.user.email));
      await AsyncStorage.setItem("G_Name", JSON.stringify(userInfo.user.name));
      await AsyncStorage.setItem("Image", userInfo.user.photo);

      setUser(userInfo);
    } catch (error) {
      if (error.code === statusCodes.SIGN_IN_CANCELLED) {
        // console.log('User Cancelled the Login Flow');
      } else if (error.code === statusCodes.IN_PROGRESS) {
        // console.log('Signing In');
      } else if (error.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE) {
        // console.log('Play Services Not Available or Outdated');
      } else {
        // console.log('Some Other Error Happened');
      }
    }
  };
  const isSignedIn = async () => {
    const isSignedIn = await GoogleSignin.isSignedIn();
    if (!isSignedIn) {
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
      } else {
      }
    }
  };
  const signOut = async () => {
    try {
      await GoogleSignin.revokeAccess();
      await GoogleSignin.signOut();
      setUser({}); // Remember to remove the user from your app's state as well
    } catch (error) {}
  };
  const appleLogin = async () => {
    // console.log("ioououou",appleAuth.Scope.EMAIL)
    // performs login request
    const authRes = await appleAuth.performRequest({
      requestedOperation: appleAuth.Operation.LOGIN,
      // Note: it appears putting FULL_NAME first is important, see issue #293
      requestedScopes: [appleAuth.Scope.FULL_NAME, appleAuth.Scope.EMAIL],
    
    });

    Applesignin(authRes.authorizationCode,authRes.email,authRes.fullName.givenName)
  };
  const GoogleSign = async (id) => {
    var langg =await AsyncStorage.getItem("langugae")
    var username=await AsyncStorage.getItem("G_Name")
   
    // var username = name.replace(/['"]+/g, '');
    var email = await AsyncStorage.getItem("email");
    var useremail = email.replace(/^"(.*)"$/, "$1");
    var img = await AsyncStorage.getItem("Image");
    var formdata = new FormData();
    formdata.append("social_id", id);
    formdata.append("type", "google");
    formdata.append("name", JSON.parse(username));
    formdata.append("email", useremail);
    formdata.append("image", img);
    formdata.append("device_id", deviceID);
// console.log("newwt2222223333",formdata)
    setLoader(true);
    axios({
      method: "post",
      url: constants.BASE_URL + "api/social/login",
      data: formdata,
      headers: { 'X-localization': langg,  },
    })
      .then(async (response) => {
        setLoader(false);
        // console.log("kjjkj",response.data)
        if (response.data.status == true) {
          await AsyncStorage.setItem(
            "token",
            JSON.stringify(response.data.token)
          );
          await AsyncStorage.setItem(
            "user_id",
            JSON.stringify(response.data.data.user_id)
          );
          if (response.data.data.profile_complete==true) {
            navigation.navigate("MyTabs");
           
          } else {
            navigation.navigate("CompleteProfile");
          }
        }

      })
      .catch(function (response) {
        setLoader(false);
      });
  };
  const Applesignin = async (id,email,applename) => {
    var langg =await AsyncStorage.getItem("langugae")
    var formdata = new FormData();
    formdata.append("social_id", id);
    formdata.append("type", "apple");
    formdata.append("device_id", deviceID);
   
   if(email!==null){
    formdata.append("email", email);
   }
   if(applename!==null){
    formdata.append("name", applename);
   }
// console.log("aplesigninformdataatatatt",formdata)

    setLoader(true); 
    axios({
      method: "post",
      url: constants.BASE_URL + "api/social/login",

      data: formdata,
      headers: { 'X-localization': langg, },
    })
      .then(async (response) => {
        
        // console.log("newwwaplleeesigninresponse",response.data)
        setLoader(false);
        if (response.data.status == true) {
          await AsyncStorage.setItem(
            "token",
            JSON.stringify(response.data.token)
          );
          alert(response.data.data.profile_complete)
          if (!response.data.data.profile_complete) {
            navigation.navigate("CompleteProfile");
          } else {
            navigation.navigate("MyTabs");
          }
        } else {
          setLoader(false);
        }
      })
      .catch(function (response) {
        // console.log("iuouuo",response)
        setLoader(false);
      });
  };

  // signOut();
  useEffect(() => {
    fetchData();
    user1();
  }, [useCallback]);

  async function fetchData() {
    var login = await AsyncStorage.getItem("logged");
    if (login == "true") {
      navigation.navigate("MyTabs");
    }
  }

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
    } catch (error) {}
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

  const Facebooksign = async (userID) => {
    var langg =await AsyncStorage.getItem("langugae")
    var name = await AsyncStorage.getItem("Name");
  var FBname=name.replace(/\s/g, '')
    var emailss = await AsyncStorage.getItem("email");
    var FBemail = emailss.replace(/\s/g, '');

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

  const Loginapp = async () => {
    var langg =await AsyncStorage.getItem("langugae")
    const strongRegex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w\w+)+$/;
    const strongRegex1 = new RegExp(
      "^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])(?=.{8,})"
    );
    const regx = "[a-zA-Z]";

    if (password1 == "" && email1 == "") {
      alert("Please fill all the required feild");
    }
     else {
      var formdata = new FormData();
      formdata.append("username", email1);
      formdata.append("password", password1);
      formdata.append("device_id", deviceID);
      setLoader(true);

      axios({
        method: "post",
        url: constants.BASE_URL + "api/login",
        data: formdata,
        headers: {    'X-localization': langg,  },
      })
        .then(async (response) => {
          console.log("gyyttrrtrt",response.data)
          if (response.data.status == true) {
            // console.log("LOFONODNIODNIOND", response.data);
            setLoader(false);
            await AsyncStorage.setItem("COMPLETEPROFILES",JSON.stringify(response.data.data[0].profile_complete))
            await AsyncStorage.setItem(
              "token",
              JSON.stringify(response.data.token)
            );
            await AsyncStorage.setItem(
              "user_id",
              JSON.stringify(response.data.data[0].id)
            );

            await AsyncStorage.setItem(
              "Name",
              JSON.stringify(response.data.data[0].name)
            );
            await AsyncStorage.setItem(
              "email",
              JSON.stringify(response.data.data[0].email)
            );
            await AsyncStorage.setItem(
              "Password",
              JSON.stringify(response.data.data[0].password)
            );

            if (response.data.data[0].profile_complete) {
              await AsyncStorage.setItem("logged", "true");
              navigation.navigate("MyTabs", { Screen: "MyGroupNavigation" });
            } else {
              navigation.navigate("CompleteProfile");
              setLoader(false);
            }
          } else {
            alert(response.data.message);
            setLoader(false);
          }
        })
        .catch(function (response) {
          setLoader(false);
        });
    }
  };

  return (
    <View style={Style.MainContainer}>
      <ImageBackground
        style={Style.ImageBackground}
        source={require("../../asset/Splash.png")}
      >
        <View style={{ height: 250 }}>
          <ImageBackground
            resizeMode="stretch"
            style={Style.ImageBackground1}
            source={require("../../asset/Top.png")}
          >
            <TouchableOpacity onPress={() => navigation.goBack()}>
              <Image style={Style.img3} resizeMode="contain" />
            </TouchableOpacity>
            <View style={Style.View1}>
              <Text style={Style.TextWlcm}>{t("Welcome")} </Text>
              <Text style={Style.TextContinue}>
                {" "}
                {t("Please sign in to continue")}
              </Text>
            </View>
          </ImageBackground>
        </View>
        <KeyboardAwareScrollView style={{ marginTop: 30 }}>
          <View style={Style.View2}>
            <View style={Style.TextFieldView}>
              <TextInput
                placeholderTextColor="grey"
                underlineColor="transparent"
                style={Style.textInput}
                placeholder={t("Enter email")}
                value={email1}
                onChangeText={(text) => {
                  setEmail1(text);
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
                placeholder={t("Enter password")}
                secureTextEntry={secureEntry}
                value={password1}
                onChangeText={(password1) => {
                  setpassword(password1), setpassword1(password1);
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
          </View>
          <View style={Style.View3}>
            <TouchableOpacity
              style={{}}
              onPress={() => navigation.navigate("Forgotpassword")}
            >
              <Text style={Style.textForgot}>{t("Forgot password?")}</Text>
            </TouchableOpacity>
          </View>
          <TouchableOpacity style={Style.login} onPress={() => Loginapp()}>
            {loader == true ? (
              <ActivityIndicator size="small" color="white" />
            ) : (
              <Text style={Style.loginText}> {t("Login")} </Text>
            )}
          </TouchableOpacity>
        
          {/* {Platform.OS == "ios" && (
            <TouchableOpacity style={Style.apple} onPress={() => appleLogin()}>
              {loaderApple == true ? (
                <ActivityIndicator size="small" color="white" />
              ) : (
                <View
                  style={{
                    flexDirection: "row",
                    alignItems: "center",
                    height: 50,
                    justifyContent: "center",
                    alignContent: "center",
                  }}
                >
                  <Image
                    style={{ resizeMode: "contain", height: 20, width: 20 }}
                    source={require("../../../Images/apple.png")}
                  />
                  <Text style={Style.appleText}> {t("Sign in with Apple")} </Text>
                </View>
              )}
            </TouchableOpacity>
          )} */}

          {/* <View style={Style.View4}>
            <View style={Style.View5}></View>
            <View style={{ alignItems: "center" }}>
              <Text style={Style.orText}>{t("OR")}</Text>
            </View>

            <View style={Style.View6}></View>
          </View> */}
{/* 
          <View style={Style.iconsView}>
            <TouchableOpacity onPress={() => toLoginFb()}>
              <Image
                resizeMode="contain"
                style={Style.imgIcon1}
                source={require("../../asset/fb-icon.png")}
              />
            </TouchableOpacity>

            {!user.idToken ? (
              <TouchableOpacity onPress={() => signIn()}>
                <Image
                  resizeMode="contain"
                  style={Style.imgIcon2}
                  source={require("../../asset/google-icon.png")}
                />
              </TouchableOpacity>
            ) : (
              <TouchableOpacity onPress={signOut}>
                <Text>{t("Logout")}</Text>
              </TouchableOpacity>
            )}
          </View> */}

          <View style={Style.View7}>
            <Text style={Style.text}>{t("Don't have an account?")} </Text>
            <TouchableOpacity
              onPress={() => navigation.navigate("CreateAccount")}
            >
              <Text style={Style.text2}>{t("Register")}</Text>
            </TouchableOpacity>
          </View>
        </KeyboardAwareScrollView>
      </ImageBackground>
    </View>
  );
};
const full_app =  withTranslation()(Login)
export default full_app;
// export default Login;
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
    fontSize: 15,
    color: "grey",
    alignSelf: "center",
    fontFamily: "Axiforma-Regular",
  },
  text2: {
    fontSize: 15,
    color: "#008080",
    alignSelf: "center",
    fontFamily: "Axiforma-Regular",
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
  TextWlcm: {
    fontSize: 26,
    color: "#F9FBDB",
    fontFamily: "Axiforma-SemiBold",
  },
  ImageBackground1: {
    width: "100%",
    height: "100%",
  },
  View1: {
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: 110,
  },
  View2: {
    alignItems: "center",
    justifyContent: "center",
    padding: 20,
  },
  View3: {
    alignItems: "flex-end",
    paddingRight: 25,
    justifyContent: "flex-end",
  },
  View4: {
    marginTop: 25,
    flexDirection: "row",
    alignItems: "flex-start",
    justifyContent: "center",
  },
  View5: {
    width: 150,
    borderTopWidth: 1,
    marginTop: 18,
    marginRight: 5,
    borderColor: "#DFE3A3",
  },
  View6: {
    marginBottom: 10,
    marginLeft: 5,
    width: 150,
    borderTopWidth: 1,
    borderColor: "#DFE3A3",
    alignSelf: "flex-end",
  },
  View7: {
    alignItems: "center",
    justifyContent: "center",
    paddingBottom: "10%",
    flexDirection: "row",
    marginTop:20
  },
  iconsView: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 25,
    justifyContent: "center",
    borderColor: "White",
  },
  TextContinue: {
    fontSize: 14,
    color: "#FFFFFF",
    fontFamily: "Axiforma-Light",
    marginTop: 10,
  },
  TextFieldView: {
    paddingLeft: "7%",
    height: hp(6),
    width: wp(85),
    flexDirection: "row",
    alignItems: "center",
    borderRadius: 25,
    padding: wp(2),
    backgroundColor: "white",
    borderColor: "#DFE3A3",
    borderWidth: 1,
  },

  TextFieldView1: {
    paddingLeft: "7%",
    height: hp(6),
    width: wp(85),
    flexDirection: "row",
    alignItems: "center",
    borderRadius: 25,
    padding: wp(2),
    marginTop: hp(3),
    backgroundColor: "white",
    borderColor: "#DFE3A3",
    borderWidth: 1,
  },
  textInput: {
    fontFamily: "Axiforma-Medium",
    backgroundColor: "white",
    fontSize: 13,
    width: wp(65),
    height: hp(5),
    color: "#737373",
  },

  textForgot: {
    fontSize: hp(1.7),
    color: "#008080",
    fontFamily: "Axiforma-Medium",
  },
  login: {
    backgroundColor: "#008080",
    width: wp(85),
    justifyContent: "center",
    alignSelf: "center",
    height: hp(6),
    borderRadius: 50,
    marginTop: 40,
  },
  apple: {
    backgroundColor: "black",
    width: wp(85),
    justifyContent: "center",
    alignSelf: "center",
    height: hp(6),
    borderRadius: 50,
    marginTop: 40,
  },
  loginText: {
    color: "white",
    fontSize: 16,
    fontFamily: "Axiforma-Bold",
    textAlign: "center",
  },
  appleText: {
    fontFamily: "Axiforma-Medium",
    color: "white",
    fontSize: 16,
    textAlign: "center",
    marginTop: 5,
  },
  orText: {
    fontSize: hp(2),
    marginTop: 8,
    color: "#008080",
    alignSelf: "center",
    fontFamily: "Axiforma-Medium",
  },
  unlockicon: {
    resizeMode: "contain",
    height: hp(2.5),
    width: wp(10),
    tintColor: "#008080",
  },
  img3: {
    resizeMode: "contain",
    marginTop: 25,
    height: 30,
    width: 30,
    marginLeft: 18,
    tintColor: "#F9FBDB",
  },
});