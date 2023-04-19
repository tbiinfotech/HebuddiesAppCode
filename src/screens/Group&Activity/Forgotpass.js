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
import { useTranslation, withTranslation, Trans } from 'react-i18next';
import '../translation/i18n'
import axios from "axios";
import constants from "../constants/constants";
import AsyncStorage from "@react-native-async-storage/async-storage";

const Forgotpass = ({ navigation }) => {
  const {t, i18n} = useTranslation();
  const [email, setEmail] = useState("");
  const [loader, setLoader] = useState("");
  const [emailvalidation, setEmailvalidation] = useState("");
  const [emailvalidation1, setEmailvalidation1] = useState("");
  const forgot_password = async () => {
    var langg=await AsyncStorage.getItem("language")
    const strongRegex = new RegExp(
      "^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$"
    );
    const strongRegex1 = new RegExp(
      "^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])(?=.{8,})"
    );
    const regx = "[a-zA-Z]";

    if (email == "") {
      setEmailvalidation(true);
    } else if (email == "") {
      setEmailvalidation1(true);
    } else {
      var formdata = new FormData();
      formdata.append("email", email);

      setLoader(true);

      axios({
        method: "post",
        url: constants.BASE_URL + "api/forgot_password",
        data: formdata,
        headers: {  'X-localization': langg, },
      })
        .then(async (response) => {
          if (response.data.status == true) {
            alert(response.data.message);
            setLoader(false);
            navigation.navigate("verifypassword", {
              emails: response.data.email,
            });
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
          {t("Forgot password")}
        </Text>
        <TouchableOpacity>
          <Image style={styles.IconDesign} />
        </TouchableOpacity>
      </View>

      <View
        style={{
          height: hp(6),
          width: wp(85),
          flexDirection: "row",
          alignItems: "center",
          borderRadius: 25,
          padding: wp(2),
          marginTop: 40,
          backgroundColor: "white",
          borderColor: "#DFE3A3",
          borderWidth: 1,
          marginLeft: 20,
        }}
      >
        <TextInput
          placeholder={t("Enter email")}
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
          onChangeText={(text) => setEmail(text)}
        />
      </View>
      {emailvalidation == true && (
        <Text
          style={{
            paddingTop: 10,
            color: "red",
            fontSize: 14,
            alignItems: "flex-start",
            width: wp(70),
            height: hp(5),
            marginLeft: 30,
            fontFamily: "Axiforma-Medium",
          }}
        >
          Please enter email{" "}
        </Text>
      )}

      {emailvalidation1 == true && (
        <Text
          style={{
            paddingTop: 10,
            color: "red",
            fontSize: 14,
            width: wp(70),
            height: hp(5),
            marginLeft: 30,
            fontFamily: "Axiforma-Medium",
          }}
        >
          please enter correct email
        </Text>
      )}

      <TouchableOpacity
        style={{
          backgroundColor: "#008080",
          width: wp(35),
          justifyContent: "center",
          alignSelf: "center",
          height: hp(6),
          borderRadius: 50,
          marginTop: 80,
        }}
        onPress={() => forgot_password()}
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
            
            {t("Next")}
          </Text>
        )}
      </TouchableOpacity>
    </ImageBackground>
  );
};
const full_app =  withTranslation()(Forgotpass)
export default full_app;

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
