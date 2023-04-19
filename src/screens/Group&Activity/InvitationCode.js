import React, { useState, useEffect } from "react";
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
  TextInput,
  ActivityIndicator
} from "react-native";
import DatePicker from "react-native-date-picker";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { useTranslation, withTranslation, Trans } from 'react-i18next';
import '../translation/i18n'
import constants from "../constants/constants";

const InvitationCode = ({ navigation, route }) => {
  const [selected, setselected] = useState(false);
  const [visible, setvisible] = useState(true);
  const [loader, setLoader] = useState(false);
  const [invitationCode, setInvitationCode] = useState("");
  const[grp_id,setgrpid]=useState("")
  const {t, i18n} = useTranslation();
  // useEffect(() => {
  //   var IDD = route.params.Groupp_id;
  //   setgrpid(IDD);
  // }, []);
  const redeemCode = async () => {
    var langg=await AsyncStorage.getItem("language")
    var token = await AsyncStorage.getItem("token");
    if (invitationCode == "") {
      alert(t("Enter Invitation Code "));
    } else {
      setLoader(true);
      var axios = require("axios");
      var data = new FormData();
      data.append("code", invitationCode);
      var config = {
        method: "post",
        // url: "https://development.brstdev.com:5076/api/group/join/group_invite",
        url: constants.BASE_URL + "api/group/join/group_invite",
        headers: {
          Authorization: "Bearer " + JSON.parse(token),
          'X-localization':langg, 
          data: data,
        },
        data: data,
      };

      axios(config)
        .then(function (response) {
          // console.log("hgghghhghokkkkkk",response.data)
          setLoader(false);
          if (response.data.status) {
            alert(response.data.message)
            navigation.navigate("MyGroupNavigation")
          }
          else{
            alert(response.data.message)
          }
          // console.log(JSON.stringify(response.data));
        })
        .catch(function (error) {
          setLoader(false);
          // console.log(error);
        });
    }
  };

  return (
    <View style={groupdetailstyle.Main}>
      <ImageBackground
        style={groupdetailstyle.ImageBackground}
        source={require("../../asset/Splash.png")}
      >
        <KeyboardAwareScrollView style={groupdetailstyle.View1}>
          <View style={groupdetailstyle.view2}>
            <TouchableOpacity onPress={() => navigation.goBack()}>
              <Image
                style={groupdetailstyle.img3}
                resizeMode="contain"
                source={require("../../asset/Arrow-Left.png")}
              />
            </TouchableOpacity>

            <Text style={groupdetailstyle.text1}>{t("Verify Invitation Code")}</Text>
            <TouchableOpacity
       
            >
           
            </TouchableOpacity>
          </View>

          <View
            style={{
              flex: 1,
              paddingVertical: 20,
              padding: 40,

              alignItems: "center",
            }}
          >
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
                marginTop: 70,
              }}
            >
                <Image
                
                style={{height:160,width:160}}
                source={require("../../../Images/Logo.png")}/>
            </View>
            <View style={groupdetailstyle.TextFieldView}>
              <TextInput
                placeholderTextColor="grey"
                underlineColor="transparent"
                style={groupdetailstyle.textInput}
                placeholder={t("Enter Invitation Code")}
                value={invitationCode}
                onChangeText={(text) => {
                  setInvitationCode(text);
                }}

              />
            </View>
            <TouchableOpacity
              style={groupdetailstyle.login}
              onPress={() => redeemCode()}
            >
              {loader == true ? (
                <ActivityIndicator size="small" color="white" />
              ) : (
                <Text style={groupdetailstyle.loginText}>{t("Redeem")}</Text>
              )}
            </TouchableOpacity>
          </View>
        </KeyboardAwareScrollView>
      </ImageBackground>
    </View>
  );
};
const full_app =  withTranslation()(InvitationCode)
export default full_app;
// export default InvitationCode;
const groupdetailstyle = StyleSheet.create({
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
  ImageProfile: {
    height: 136,
    width: 136,
    borderWidth: 1,
    borderColor: "grey",
    borderRadius: 136 / 2,
  },
  loginText: {
    alignSelf: "center",
    color: "white",
    fontSize: 16,
    fontFamily: "Axiforma-Bold",
  },
  login: {
    backgroundColor: "#008080",
    width: wp(85),
    justifyContent: "center",

    height: hp(6),
    borderRadius: 15,
    margin: 25,
 
  },
  TextFieldView: {
 
    height: hp(6),
    width: wp(85),
  
    alignSelf: "center",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 15,
    padding: wp(2),
    backgroundColor: "white",
    borderColor: "#DFE3A3",
    borderWidth: 1,
    marginVertical: 12,
    marginTop:50
  },
  view2: {
    backgroundColor: "#008080",
    width: "100%",
    padding: 10,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingTop: 47,
  },
  textInput: {
    fontFamily: "Axiforma-Medium",
    backgroundColor: "white",
    fontSize: 13,
    width: wp(72),
    height: hp(5),
    color: "#737373",
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
    color: "grey",
    fontSize: 24,
    fontFamily: "Axiforma-Bold",
    marginTop: 20,
    marginStart: 20,
  },
  img3: {
    width: 27,
    height: 27,
    tintColor: "#F9FBDB",
  },
  view4: {
    padding: 15,
    flex: 1,
  },
  view5: {
    width: "100%",
    backgroundColor: "white",
    borderRadius: 10,
    padding: 15,
    marginTop: 15,
  },
  view6: {
    width: "100%",
    flexDirection: "row",
  },
  img4: {
    height: 62.9,
    width: 68,
  },
  text3: {
    fontSize: 18,
    fontWeight: "700",
    color: "black",
  },
  view8: {
    flexDirection: "row",
    alignItems: "center",
  },
  img5: {
    height: 17,
    width: 15,
  },
  text4: {
    color: "#737373",
    fontSize: 16,
    marginLeft: 5,
    fontFamily: "Axiforma-Regular",
  },
  text5: {
    fontSize: 16,
    fontWeight: "600",
    textAlign: "right",
    color: "#008080",
  },
  view9: {
    width: "100%",
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
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    width: "75%",
    marginStart: 20,
    marginTop: 4,
  },
  view10: {
    paddingTop: 6,
    flexDirection: "row",
    marginStart: 20,
  },
  view11: {
    alignItems: "center",
    paddingHorizontal: 20,
    paddingTop: 25,
    flexDirection: "row",
    alignItems: "center",
  },
  text7: {
    fontSize: 16,
    fontFamily: "Axiforma-Regular",
    marginTop: 25,
    marginHorizontal: 20,
    lineHeight: 29,
    color: "grey",
  },
  view12: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",

    marginHorizontal: 70,
    paddingTop: 30,
  },
  view13: {
    alignItems: "center",
  },
  text8: {
    fontSize: 18,
    fontFamily: "Axiforma-Bold",
    color: "grey",
  },
  textt: {
    fontSize: 18,
    fontFamily: "Axiforma-Bold",
    color: "grey",
    paddingLeft: 20,
  },

  img7: {
    height: 58,
    width: 58,
  },
});
