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
} from "react-native";
import * as Progress from "react-native-progress";
import { svg } from "react-native-svg";
import Modal from "react-native-modal";

const Matchpreference = ({ navigation, route }) => {
  var DETAILS = route.params.DETAILS1;
  // console.log("hkkh",DETAILS)
  const [parentname, setParentName] = useState("");
  const [gender, setGender] = useState("");
  const [birthdate, setBirthdate] = useState(new Date());
  const [emailaddress, setEmailaddress] = useState("");
  const [postalcode1, setPopstalcode1] = useState("");
  const [relation, setRelation] = useState("");
  const [childname, setChildname] = useState("");
  const [childname1, setChildname1] = useState("");
  const [childname2, setChildname2] = useState("");
  const [childbirthdate, setChildbirthdate] = useState(new Date());
  const [childbirthdate1, setChildbirthdate1] = useState(new Date());
  const [childbirthdate2, setChildbirthdate2] = useState(new Date());

  const Onsubmit = () => {
    var Name1 = parentname.replace(/\s/g, "");
    var Gender1 = gender;
    var Dateofbirth = birthdate.toLocaleDateString();
    var postal = postalcode1;
    var Relation1 = relation;
    var CHILD = childname;
    var CHILD1 = childname1;
    var CHILD2 = childname2;
    var CHILDBIRTH = childbirthdate.toLocaleDateString();
    var CHILDBIRTH1 = childbirthdate1.toLocaleDateString();
    var CHILDBIRTH2 = childbirthdate2.toLocaleDateString();

    var Profiledetail = {
      parent_name: Name1,
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
    // console.log("ProfiledetailProfiledetail",Profiledetail)
    navigation.navigate("CompleteProfileStep2", { DETAILS: DETAILS });
  };
  return (
    <View style={Explorestyles.Main}>
      <ImageBackground
        style={Explorestyles.ImageBackground}
        source={require("../../asset/Splash.png")}
      >
        <View style={Explorestyles.View1}>
          <View style={Explorestyles.view2}>
            <TouchableOpacity
              activeOpacity={1}
               onPress={() => navigation.goBack()}
            >
              <Image
                style={Explorestyles.img3}
                resizeMode="contain"
                source={require("../../../Images/Arrow-Left.png")}
              />
            </TouchableOpacity>
            <Text style={Explorestyles.text1}>Match</Text>
            <TouchableOpacity
              onPress={() => navigation.navigate("Notification1")}
            >
              <Image
                style={Explorestyles.img3}
                resizeMode="contain"
                source={require("../../asset/Notification.png")}
              />
            </TouchableOpacity>
          </View>
          <Image
            style={{
              height: 200,
              width: 200,
              marginTop: 80,
              alignSelf: "center",
            }}
            resizeMode="contain"
            source={require("../../asset/filterimage.png")}
          />
          <View style={Explorestyles.view3}>
            <Text
              style={{
                color: "grey",
                fontSize: 16,
                alignItems: "center",
                textAlign: "center",
                marginTop: "0%",
                lineHeight: 25,
                fontFamily: "Axiforma-Regular",
                width: 350,
              }}
            >
              Currently there are no matching groups in your area - if you're up
              for it, go back and change your prefrences and the algorithm will
              search for new, cool groups{" "}
            </Text>
          </View>
          <TouchableOpacity
            style={{
              backgroundColor: "#008080",
              justifyContent: "center",
              alignSelf: "center",
              borderRadius: 50,
              width: 200,
              height: 50,
              marginTop: 20,
            }}
            onPress={() => Onsubmit()}
          >
            <Text
              style={{
                alignSelf: "center",
                color: "white",
                fontSize: 16,
                fontFamily: "Axiforma-Bold",
                textAlign: "center",
              }}
            >
              Update prefrences
            </Text>
          </TouchableOpacity>
        </View>
      </ImageBackground>
    </View>
  );
};

export default Matchpreference;
const Explorestyles = StyleSheet.create({
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
    marginTop: 10,
  },
  img5: {
    height: 17,
    width: 17,
  },
  text4: {
    color: "#008080",
    fontSize: 16,
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
    alignSelf: "center",
    borderRadius: 16,
    padding: 20,
  },
  newmodalview: {
    backgroundColor: "white",
    width: 326,
    alignSelf: "center",
    borderRadius: 16,
    padding: 20,
    marginBottom: 50,
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
  modalview3: {
    alignItems: "center",
    width: "100%",
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
    alignItems: "flex-start",
    marginLeft: 25,
  },
  modalview9: {
    flexDirection: "row",
    paddingTop: 15,
  },
  modalbutton: {
    height: 56,
    width: 170,
    backgroundColor: "#008080",
    borderRadius: 120,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 10,
    marginBottom: 5,
  },
  view7: {
    marginLeft: 20,
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
  crossimg: {
    height: 25,
    width: 25,
  },
  modalview2: {
    alignItems: "center",
    width: "100%",
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
    marginTop: 10,
  },
  img5: {
    height: 17,
    width: 15,
  },
  text4: {
    color: "#008080",
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
  notificationmodalview: {
    backgroundColor: "white",
    width: 326,
    borderRadius: 16,
    padding: 20,
    marginBottom: 350,
    marginTop: 120,
    marginLeft: 35,
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
    marginLeft: 50,
  },
  modalview9: {
    flexDirection: "row",
    alignItems: "flex-start",
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
    marginBottom: 10,
  },
  view7: {
    marginLeft: 20,
  },
});
