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
import { useTranslation, withTranslation, Trans } from 'react-i18next';
import '../translation/i18n'
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import axios from "axios";
import constants from "../constants/constants";
import AsyncStorage from "@react-native-async-storage/async-storage";
var passwordTest =
  "Password must be  at least 8 characters, 1 uppercase, 1 lowercase, 1 number, and 1 special character";
const Updatepassword = ({ navigation, route }) => {
  const {t, i18n} = useTranslation();
  const [secureEntry, setsecureEntry] = useState(true);
  const [secureEntry1, setsecureEntry1] = useState(true);
  const [secureEntry2, setsecureEntry2] = useState(true);
  const [password, setpassword] = useState(true);
  const [passwordText, setpasswordText] = useState("");
  const [cpassword1, setcpassword1] = useState(true);
  const [newpassword, setNewPassword] = useState("");
  const [confirmpassword, setConfirmpassword] = useState("");
  const [email, setEmail] = useState("");
  const [loader, setLoader] = useState("");
  const [isDisabled, setIsDisabled] = useState(false);
  function validate_password(password) {
    setpasswordText(password);
    let check = /(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.{8,})/;
    if (password.match(check)) {
      setIsDisabled(false);
      passwordTest = "";
  
    } else {
      setIsDisabled(true);
      passwordTest =
        "Password must be 8 characters, 1 uppercase, 1 lowercase, 1 number, and 1 special character";
    }
  }
  const Updatepass = async () => { 
    var langg= await AsyncStorage.getItem("langugae")
    var formdata = new FormData();
    formdata.append("email", route.params.email);
    formdata.append("password", passwordText);
    formdata.append("confirm_password", cpassword1);
    setLoader(true);

    axios({
      method: "post",
      url: constants.BASE_URL + "api/update_password",
      data: formdata,
      headers: {'X-localization':langg },
    })
      .then(async (response) => {
      
        if (response.data.status == true) {
          setLoader(false);
          alert(response.data.message);
          navigation.navigate("Login");
        } else {
          alert(response.data.message);
          setLoader(false);
        }
      })
      .catch(function (response) {
        setLoader(false);
      });
  };

  return (
    <ImageBackground
      source={require("../../../Images/background.png")}
      style={styles.Container}
      resizeMode="stretch"
    >
      <View style={styles.ViewStyle}>
        <TouchableOpacity onPress={() => navigation.navigate("verifypassword")}>
          <Image style={styles.IconStyle} />
        </TouchableOpacity>
        <Text
          style={{
            fontSize: 24,
            fontFamily: "Axiforma-Bold",
            color: "#F9FBDB",
          }}
        >
          {t("Update password")}
        </Text>
        <TouchableOpacity>
          <Image style={styles.IconDesign} />
        </TouchableOpacity>
      </View>

      <Text style={styles.textDesign}>{t("New password")}</Text>
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
          onChangeText={(password) => {
            validate_password(password);
            setpassword(password);
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
      {passwordText !== "" && passwordTest !== "" && (
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
      <Text style={styles.textStyle}>{t("Confirm New password")}</Text>
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
          onChangeText={(cpassword1) => {
            setConfirmpassword(cpassword1), setcpassword1(cpassword1);
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

      <TouchableOpacity
      disabled={isDisabled}
        style={{
          backgroundColor: "#008080",
          width: wp(50),
          justifyContent: "center",
          alignSelf: "center",
          height: hp(6),
          borderRadius: 50,
          marginTop: 40,
        }}
        onPress={() => Updatepass()}
      >
        {loader == true ? (
          <ActivityIndicator size="small" color="white" />
        ) : (
          <Text
            style={{
              alignSelf: "center",
              color: "white",
              fontSize: 18,
              fontFamily: "Axiforma-Bold",
            }}
          >
            
            {t("Update password")}
          </Text>
        )}
      </TouchableOpacity>
    </ImageBackground>
  );
};
const full_app =  withTranslation()(Updatepassword)
export default full_app;
// export default Updatepassword;

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
