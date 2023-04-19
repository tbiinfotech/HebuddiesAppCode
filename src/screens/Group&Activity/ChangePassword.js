import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ImageBackground,
  Image,
  StyleSheet,
  ActivityIndicator,
} from "react-native";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import axios from "axios";
import constants from "../constants/constants";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useTranslation, withTranslation, Trans } from 'react-i18next';
import '../translation/i18n'
import { err } from "react-native-svg/lib/typescript/xml";

var passwordTest =
  "Password must be 8 characters, 1 uppercase, 1 lowercase, 1 number, and 1 special character";
const ChangePassword = ({ navigation }) => {
  const { t, i18n } = useTranslation();
  const [isDisabled, setIsDisabled] = useState(false);
  function validate_password(newpass) {
    setNewpass(newpass);
    let check =/(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.{8,})/;
    if (newpass.match(check)) {
    
 setIsDisabled(false)
      passwordTest = "";
    } else {
     setIsDisabled(false)
       passwordTest =
        t("Password must be 8 characters, 1 uppercase, 1 lowercase, 1 number, and 1 special character");
    }
  }
  const [secureEntry, setsecureEntry] = useState(true);
  const [secureEntry1, setsecureEntry1] = useState(true);
  const [secureEntry2, setsecureEntry2] = useState(true);
  const [currentpassword, setCurrentpassword] = useState("");
  const [newpassword, setNewPassword] = useState("");
  const [confirmpassword, setConfirmpassword] = useState("");
  const [currentpass, setCurrentpass] = useState("");
  const [newpass, setNewpass] = useState("");
  const [confirmpass, setconfirmpass] = useState("");
  const [loader, setLoader] = useState("");



  const passwordchange = async () => {
    const strongRegex1 = new RegExp(
      /(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.{8,})/
    );
    if (currentpass == "" ) {
      alert(t("Please fill Current password"));
    } 
    else if (!strongRegex1.test(currentpass)) {
      alert(t("Please enter correct password"))
    }
    else if(newpass == ""){
      alert(t("Please fill New password"))

    }
    else if(confirmpass == ""){
      alert(t("Please fill Confirm password"))

    }
    else if (newpass.length < 8) {
      alert(t("Your password must be at least 8 characters"));
    }
    else if (!strongRegex1.test(newpass)) {
      alert(t("Password does not meet requirements"))
    }
    else if (newpass != confirmpass) {
      alert(t("Your Password is not matched"));
    }
    else {
      var langg =await AsyncStorage.getItem("langugae")
      const token = await AsyncStorage.getItem("token");
     var tokens=JSON.parse(token)
      var formdata = new FormData();
      formdata.append("current_password", currentpass);
      formdata.append("new_password", newpass);
      formdata.append("confirm_password", confirmpass);

      
      setLoader(true);
  
      axios({
        method: "post",
        url: constants.BASE_URL + "api/profile/password",
        data: formdata,
        headers: {    'Authorization': 'Bearer '+JSON.parse(token) ,
        'X-localization': langg,
       },
    })
    .then(async (response) => {
           

           if (response.data.status == true) {
               setLoader(false)
               alert(response.data.message)
               navigation.navigate("Profile")
             
           }else{
               alert(response.data.message)
               setLoader(false)
           }
       
                 
        })
        .catch(function (response) {
            setLoader(false)
          
        });
      
    }
  };

  return (
    <ImageBackground
      source={require("../../../Images/background.png")}
      style={styles.Container}
      resizeMode="stretch"
    >
      <View style={styles.ViewStyle}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Image
            source={require("../../../Images/Arrow-Left.png")}
            style={styles.IconStyle}
          />
        </TouchableOpacity>
        <Text
          style={{
            fontSize: 24,
            fontFamily: "Axiforma-Bold",
            color: "#F9FBDB",
          }}
        >
          {t("Change Password")}
        </Text>
        <TouchableOpacity>
          <Image style={styles.IconDesign} />
        </TouchableOpacity>
      </View>
   
      <Text style={styles.textDesign}>{t("Current Password")}</Text>
      <View
        style={{
          height: hp(6),
          width: wp(85),
          flexDirection: "row",
          alignItems: "center",
          borderRadius: 25,
          padding: wp(2),
          marginTop: 10,
          backgroundColor: "white",
          borderColor: "#DFE3A3",
          borderWidth: 1,
          marginLeft: 20,
        }}
      >
        <TextInput
          placeholderTextColor="grey"
          underlineColor="transparent"
          style={{
            paddingHorizontal: 10,
            borderRadius: 50,
            fontFamily: "Axiforma-Medium",
            backgroundColor: "white",
            fontSize: 13,
            width: wp(65),
            height: hp(5),
            color: "#737373",
          }}
          secureTextEntry={secureEntry}
          onChangeText={(currentpass) => {
            setCurrentpassword(currentpass), setCurrentpass(currentpass);
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
              style={{ resizeMode: "contain", height: hp(2.5), width: wp(10) }}
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
              style={{
                resizeMode: "contain",
                height: hp(2.5),
                width: wp(10),
                tintColor: "#008080",
              }}
            />
          </TouchableOpacity>
        )}
      </View>


      <Text style={styles.textStyle}>{t("New Password")}</Text>
      <View
        style={{
          height: hp(6),
          width: wp(85),
          flexDirection: "row",
          alignItems: "center",
          borderRadius: 25,
          padding: wp(2),
          marginTop: 10,
          backgroundColor: "white",
          borderColor: "#DFE3A3",
          borderWidth: 1,
          marginLeft: 20,
        }}
      >
        <TextInput
          placeholderTextColor="grey"
          underlineColor="transparent"
          style={{
            paddingHorizontal: 10,
            borderRadius: 50,
            fontFamily: "Axiforma-Medium",
            backgroundColor: "white",
            fontSize: 13,
            width: wp(65),
            height: hp(5),
            color: "#737373",
          }}
          secureTextEntry={secureEntry1}
          onChangeText={(newpass) => {
            // setNewPassword(newpass), setNewpass(newpass);
            validate_password(newpass);
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
              style={{ resizeMode: "contain", height: hp(2.5), width: wp(10) }}
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
              style={{
                resizeMode: "contain",
                height: hp(2.5),
                width: wp(10),
                tintColor: "#008080",
              }}
            />
          </TouchableOpacity>
        )}
      </View>
      {(newpass !== "" && passwordTest !== "") && (
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
             


      <Text style={styles.textStyle}>{t("Confirm Password")}</Text>
      <View
        style={{
          height: hp(6),
          width: wp(85),
          flexDirection: "row",
          alignItems: "center",
          borderRadius: 25,
          padding: wp(2),
          marginTop: 10,
          backgroundColor: "white",
          borderColor: "#DFE3A3",
          borderWidth: 1,
          marginLeft: 18,
        }}
      >
        <TextInput
          placeholderTextColor="grey"
          underlineColor="transparent"
          style={{
            paddingHorizontal: 10,
            borderRadius: 50,
            fontFamily: "Axiforma-Medium",
            backgroundColor: "white",
            fontSize: 13,
            width: wp(65),
            height: hp(5),
            color: "#737373",
          }}
          secureTextEntry={secureEntry2}
          onChangeText={(confirmpass) => {
            setConfirmpassword(confirmpass), setconfirmpass(confirmpass);
          }}
        />
        {secureEntry2 == true ? (
          <TouchableOpacity
            style={{
              backgroundColor: "transparent",
              flex: 1,
              justifyContent: "center",
              alignItems: "center",
            }}
            onPress={() => setsecureEntry2(false)}
          >
            <Image
              source={require("../../asset/Lock.png")}
              style={{ resizeMode: "contain", height: hp(2.5), width: wp(10) }}
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
            onPress={() => setsecureEntry2(true)}
          >
            <Image
              source={require("../../asset/unlock.png")}
              style={{
                resizeMode: "contain",
                height: hp(2.5),
                width: wp(10),
                tintColor: "#008080",
              }}
            />
          </TouchableOpacity>
        )}
      </View>
      <TouchableOpacity
        style={{
          backgroundColor: "#008080",
          width: wp(45),
          justifyContent: "center",
          alignSelf: "center",
          height: hp(6),
          borderRadius: 50,
          marginTop: 40,
        }}
        disabled={isDisabled}
        onPress={() => passwordchange()}
      >
        {loader == true ? (
          <ActivityIndicator size="small" color="white" />
        ) : (
          <Text
            style={{
              alignSelf: "center",
              color: "white",
              fontSize: 16,
              fontFamily: "Axiforma-Bold",
            }}
          >
           {t("Confirm changes")}
          </Text>
        )}
      </TouchableOpacity>
    </ImageBackground>
  );
};
const full_app =  withTranslation()(ChangePassword)
export default full_app;
// export default ChangePassword;

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
    justifyContent: "space-between",
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
    marginEnd: 96,
  },

  textDesign: {
    color: "#737373",
    fontFamily: "Axiforma-Regular",
    fontSize: 14,
    marginStart: 20,
    marginTop: 40,
  },

  textStyle: {
    color: "#737373",
    fontFamily: "Axiforma-Regular",
    fontSize: 14,
    marginStart: 20,
    marginTop: 20,
  },

  inputStyle: {
    backgroundColor: "#fff",
    borderWidth: 1,
    borderColor: "#DFE3A3",
    fontSize: 14,
    fontFamily: "Axiforma-Regular",
    color: "#737373",
    paddingHorizontal: 20,
    marginHorizontal: 20,
    borderRadius: 50,
    marginTop: 8,
    backgroundColor: "white",
    fontSize: 13,
    width: wp(90),
    height: hp(6),
  },
});
