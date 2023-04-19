import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  TextInput,
  Image,
  ImageBackground,
  ScrollView,
  StyleSheet,
  ActivityIndicator,
} from "react-native";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import DatePicker from "react-native-date-picker";
import { Dropdown } from "react-native-element-dropdown";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import constants from "../constants/constants";
import { useTranslation, withTranslation, Trans } from 'react-i18next';
import '../translation/i18n'
import moment from "moment";

const PersonalInformation = ({ navigation, route }) => {
  const { USER_TOKEN } = route.params;
  const [date, setDate] = useState(new Date());
  const [open, setOpen] = useState(false);
  const [dob, setdob] = useState("");
  const [open1, setOpen1] = useState(false);
  const [value, setValue] = useState(null);
  const [value2, setValue2] = useState(null);
  const [isFocus2, setIsFocus2] = useState(false);
  const [value1, setValue1] = useState(null);
  const [isFocus, setIsFocus] = useState(false);
  const [isFocus1, setIsFocus1] = useState(false);
  const [names, setNames] = useState("");
  const [name, setName] = useState("");
  const [gender, setGender] = useState("");
  const [birthday, setBirthday] = useState("");
  const [emailaddress, setEmailaddress] = useState("");
  const [postalcode, setPostalcode] = useState("");
  const [relation, setRelation] = useState("");
  const [name1, setName1] = useState("");
  const [gender1, setGender1] = useState("");
  const [birthdayg, setBirthdayg] = useState("");
  const [emailaddress1, setEmailaddress1] = useState("");
  const [postalcode1, setPostalcode1] = useState("");
  const [relation1, setRelation1] = useState("");
  const [image, setImage] = useState();
  const [login, setLogin] = useState("");
  const [zipcodeList, setZipCodeList] = useState([]);
  const [updateLoader, setUpdateLoader] = useState(false);
  const[dob1,setDob1]=useState("")
  const {t, i18n} = useTranslation();
  const data = [
    { label: t("male"), value: t("male") },
    { label: t("female"), value: t("female")},
    { label: t("other"), value: t("other") },
  ];

  const data1 = [
    { label1: t("Other"), value1: t("Other") },
    { label1: t("Rainbow"), value1: t("Rainbow") },
    { label1: t("Single"), value1: t("Single") },
    { label1: t("Partnered"), value1: t("Partnered") },
  ];
  const data2 = [
    { label: "1003", value: "1003" },
    { label: "1002", value: "1002" },
    { label: "1004", value: "1004" },
  ];

  const personalinfo = async () => {
    var langg=await AsyncStorage.getItem("langugae")
    var token = await AsyncStorage.getItem("token");

    var config = {
      method: "get",
      url: constants.BASE_URL + "api/profile/personal/info",
      headers: {
        Authorization: "Bearer " + JSON.parse(token),
        'X-localization': langg, 
      },
    };

    axios(config)
      .then(async (response) => {

// console.log("dataaaa",response.data)
        setName1(response.data.data.name);

        setEmailaddress(response.data.data.email);
        setBirthday(response.data.data.dob);
        setPostalcode1(response.data.data.postal);
        setRelation1(response.data.data.relationship);
        setGender1(response.data.data.gender);
      
        await AsyncStorage.setItem("logged", "true");
      })
      .catch(function (error) {
        // console.log(error);
      });
  };
  const updatepersonalinfo = async () => {
    var langg=await AsyncStorage.getItem("langugae")
    setUpdateLoader(true);
    var dateess=moment(birthday).format('DD/MM/YYYY')

    var axios = require("axios");
    var FormData = require("form-data");
    var data = new FormData();
    data.append("name", name1);
    data.append("gender", gender1);
    data.append("dob", dateess);
    data.append("postal", postalcode1);
    data.append("relationship", relation1);
    // console.log("hjkhkhk", data);
    var config = {
      method: "post",
      url: constants.BASE_URL + "api/profile/personal/info/update",
      headers: {
        Authorization: "Bearer " + USER_TOKEN,
        'X-localization': langg, 
      },
      data: data,
    };

    axios(config)
      .then(function (response) {
        setUpdateLoader(false);
        if (response.data.status == true) {
          alert(response.data.message);
          setName1(name1);
          setdob(dob);
          setEmailaddress(emailaddress);
          setGender1(gender);
         
          navigation.navigate("Profile");
        } else {
          alert(response.data.message);
        }
      })
      .catch(function (error) {
        setUpdateLoader(false);
        // console.log(error);
      });
  };
  const username2 = async () => {
    var logged = await AsyncStorage.getItem("logged");
    setLogin(logged);

  };
  React.useEffect(() => {
    const unsubscribe = navigation.addListener("focus", () => {
      personalinfo();
      username2();
      Zip_code();
    });
  });
  const Zip_code = async () => {
    var requestOptions = {
      method: "GET",
      headers: new Headers({
        Authorization: `Bearer ${USER_TOKEN}`,
      }),
      redirect: "follow",
    };
    fetch(constants.BASE_URL+"api/zipcodes", requestOptions)
      .then((response) => response.text())
      .then((result) => {
        // console.log(result);
        var data = JSON.parse(result);
        setZipCodeList(data.data);
      })
      .catch((error) => console.log("error", error));
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
          {t("Personal Information")}
        </Text>
        <TouchableOpacity>
          <Image style={styles.IconDesign} />
        </TouchableOpacity>
      </View>

      <KeyboardAwareScrollView>
        <Text
          style={{
            fontSize: 14,
            fontFamily: "Axiforma-Regular",
            color: "#737373",
            marginStart: 20,
            marginTop: 40,
          }}
        >
          {t("Name")}
        </Text>
        {login == "true" ? (
          <TextInput
            placeholder="James carry"
            value={name1}
            style={styles.inputStyle}
            onChangeText={(text) => setName1(text)}
          />
        ) : (
          <TextInput placeholder="James carry" style={styles.inputStyle} />
        )}

        <Text style={styles.textStyle}>{t("Gender")}</Text>

        <View style={{ marginHorizontal: 20, marginTop: 8 }}>
          <Dropdown
            style={{
              width: "100%",
              borderRadius: 25,
              borderColor: "#DFE3A3",
              backgroundColor: "white",
              paddingHorizontal: 10,
              height: hp(6),
              borderWidth: 1,
            }}
            data={data}
            textStyle={{ color: "red" }}
            maxHeight={300}
            labelField="label"
            valueField="value"
            maxSelect={3}
            placeholder={gender1}
            containerStyle={{ borderRadius: 5 }}
            selectedTextStyle={{ color: "grey" }}
            itemTextStyle={{ color: "grey" }}
            placeholderStyle={{
              fontFamily: "Axiforma-Regular",
              fontSize: 13,
              color: "grey",
            }}
            value={gender1}
            onFocus={() => setIsFocus(true)}
            onBlur={() => setIsFocus(false)}
            onChange={(item) => {
              // setValue3(item.value1);
              setIsFocus(false);
              setGender1(item.value);
            }}
          />
        </View>

        <Text style={styles.textStyle}>{t("Date of birth")}</Text>
       
{/* 
        <TextInput
          placeholder="31 May, 1990"
          value={birthday}
          editable={false}
          style={styles.inputStyle}
          onChangeText={(text) => setBirthday(text)}
        /> */}

<TouchableOpacity onPress={() => setOpen(true)}>
   <View
     style={{
       paddingLeft: "7%",
       height: hp(6),
       width: wp(90),
       flexDirection: "row",
       alignItems: "center",
       borderRadius: 25,
       padding: wp(2),
       backgroundColor: "white",
       borderColor: "#DFE3A3",
       borderWidth: 1,
       justifyContent: "space-between",
       paddingHorizontal:20,
       marginHorizontal:20
     }}
   >
     {dob1 == "" ? (
       <Text
         style={{
           fontFamily: "Axiforma-Regular",
           color: "#737373",
           fontSize: 13,
         }}
       >
         {birthday}
       </Text>
     ) : (
       <Text
         style={{
           fontFamily: "Axiforma-Regular",
           color: "#737373",
           fontSize: 13,
         }}
       >
        {moment(dob1).format('DD/MM/YYYY')}
        
       </Text>
     )}
     <TouchableOpacity onPress={()=>setOpen(true)} >
       <Image
         source={require("../../asset/Calendar.png")}
         style={{resizeMode: "contain",
         height: hp(2.5),
         width: wp(10),}}
       />
     <DatePicker
       modal
       open={open}
       date={date}
       title="Birthday"
       placeholder="Birthday"
       // minimumDate={}
       format="MM/DD/YYYY"
       maximumDate={new Date()}
       value={birthday}
       onConfirm={(date) => {
         setOpen(false);
         setDob1(date);
         setBirthday(date.toLocaleDateString());
       }}
       onCancel={() => {
         setOpen(false);
       }}
       mode={"date"}
     />
      </TouchableOpacity>
   </View>
 </TouchableOpacity>

{/* <TouchableOpacity onPress={() => setOpen(true)}>
   <View
     style={{
       paddingLeft: "7%",
       height: hp(6),
       width: wp(90),
       flexDirection: "row",
       alignItems: "center",
       borderRadius: 25,
       padding: wp(2),
       backgroundColor: "white",
       borderColor: "#DFE3A3",
       borderWidth: 1,
       justifyContent: "space-between",
       paddingHorizontal:20,
       marginHorizontal:20
     }}
   >
     {dob1 == "" ? (
       <Text
         style={{
           fontFamily: "Axiforma-Regular",
           color: "#737373",
           fontSize: 13,
         }}
       >
         {birthday}
       </Text>
     ) : (
       <Text
         style={{
           fontFamily: "Axiforma-Regular",
           color: "#737373",
           fontSize: 13,
         }}
       >
         {dob1 == "" ? "" : dob1.toLocaleDateString()}
       </Text>
     )}
     <TouchableOpacity onPress={()=>setOpen(true)} >
       <Image
         source={require("../../asset/Calendar.png")}
         style={{resizeMode: "contain",
         height: hp(2.5),
         width: wp(10),}}
       />
     <DatePicker
       modal
       open={open}
       date={date}
       title="Birthday"
       placeholder="Birthday"
       // minimumDate={}
       format="MM/DD/YYYY"
       maximumDate={new Date()}
       value={birthday}
       onConfirm={(date) => {
         setOpen(false);
         setDob1(date);
         setBirthday(date.toLocaleDateString());
       }}
       onCancel={() => {
         setOpen(false);
       }}
       mode={"date"}
     />
      </TouchableOpacity>
   </View>
 </TouchableOpacity> */}

        <Text style={styles.textStyle}>{t("Email address")}</Text>
        {login == "true" ? (
          <TextInput
            placeholder="Jamescarry@email.com"
            value={emailaddress}
            editable={false}
            style={styles.inputStyle}
            onChangeText={(text) => setEmailaddress(text)}
          />
        ) : (
          <TextInput
            placeholder="Jamescarry@email.com"
            editable={false}
            style={styles.inputStyle}
          />
        )}


        <Text style={styles.textStyle}>{t("Postal Code")}</Text>

        <View style={{ marginHorizontal: 20, marginTop: 8 }}>
          <Dropdown
            data={zipcodeList}
            maxHeight={300}
            labelField="zipcode"
            valueField="zipcode"
            style={{
              width: "100%",
              borderRadius: 25,
              borderColor: "#DFE3A3",
              backgroundColor: "white",
              paddingHorizontal: 10,
              height: hp(6),
              borderWidth: 1,
            }}
            placeholder={postalcode1}
            itemTextStyle={{ color: "grey" }}
            placeholderStyle={{ fontSize: 15, color: "#7D7D7D" }}
            selectedTextStyle={{ color: "grey" }}
            containerStyle={{ borderRadius: 0 }}
            value={postalcode1}
            search
            searchPlaceholder={t("Search here")}
            inputSearchStyle={{color:'grey'}}
            onFocus={() => setIsFocus2(true)}
            onBlur={() => setIsFocus2(false)}
            onChange={(item) => {
              setIsFocus2(false);
              setPostalcode1(item.zipcode);
            }}
          />

        </View>

        <Text style={styles.textStyle}>{t("Relation status")}</Text>

        <View style={{ marginHorizontal: 20, marginTop: 8 }}>
          <Dropdown
            data={data1}
            style={{
              width: "100%",
              borderRadius: 25,
              borderColor: "#DFE3A3",
              backgroundColor: "white",
              paddingHorizontal: 10,
              height: hp(6),
              borderWidth: 1,
            }}
            maxHeight={300}
            labelField="label1"
            valueField="value1"
            placeholder={relation1}
            containerStyle={{ borderRadius: 5 }}
            itemTextStyle={{ color: "grey" }}
            placeholderStyle={{
              fontFamily: "Axiforma-Regular",
              fontSize: 13,
              color: "grey",
            }}
            selectedTextStyle={{ color: "grey" }}
            value={relation1}
            onFocus={() => setIsFocus1(true)}
            onBlur={() => setIsFocus1(false)}
            onChange={(item) => {
              // setValue1(item.value1);
              setIsFocus1(false);
              setRelation1(item.value1);
            }}
          />

        </View>
      </KeyboardAwareScrollView>
      <TouchableOpacity
        style={{
          width: 180,
          height: 50,
          backgroundColor: "#008080",
          alignSelf: "center",
          alignItems: "center",
          borderRadius: 25,
          marginBottom: 20,
          marginTop: 10,justifyContent:"center"
        }}
        onPress={() => updatepersonalinfo()}
      >
        {updateLoader == true ? (
          
          <ActivityIndicator 
          color={"white"}
          size={"small"}
          animating={updateLoader} />
        ) : (
          <Text
            style={{
              fontSize: 16,
              color: "white",
              textAlign: "center",
              fontFamily: "Axiforma-Bold",
            }}
          >
            {t("Update Profile")}
          </Text>
        )}
      </TouchableOpacity>
    </ImageBackground>
  );
};
const full_app =  withTranslation()(PersonalInformation)
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
  imgIcon: {
    resizeMode: "contain",
    height: hp(2.5),
    width: wp(10),
  },
  IconStyle: {
    height: 27,
    width: 27,
    tintColor: "#F9FBDB",
  },

  textStyle: {
    fontSize: 14,
    fontFamily: "Axiforma-Regular",
    color: "#737373",
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
});
