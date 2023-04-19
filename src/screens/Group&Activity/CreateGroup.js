
import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  ImageBackground,
  TextInput,
  ScrollView,
  StyleSheet,
  ActivityIndicator,
} from "react-native";
import Checkbox from "expo-checkbox";
import AsyncStorage from "@react-native-async-storage/async-storage";
import firestore from '@react-native-firebase/firestore';
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import DraggableFlatList from "react-native-draggable-flatlist";
import UUIDGenerator from 'react-native-uuid-generator';
import { useIsFocused } from "@react-navigation/native";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import { Dropdown, MultiSelect } from "react-native-element-dropdown";
import ImagePicker from "react-native-image-crop-picker";
import Modal from "react-native-modal";
import constants from "../constants/constants";
import { useTranslation, withTranslation, Trans } from 'react-i18next';
import '../translation/i18n'
import { t } from "i18next";

const data = [
  { label1: t("Male"), value: t("Male") },
  { label1: t("Female"), value: t("Female") },
  { label1: t("Other"), value: t("Other") },
];

const groupThemeList = [
  { label: t("chill"), "value": t("chill") },
  { label: t("active"), "value": t("active") },
  { label: t("culture"), "value": t("culture") },
];

// const ageList = [
//   { label: t("0-6 months"), value: "0-6 months" },
//   { label: t("7-12 months"), value: "7-12 months" },
//   { label: t("1 year"), value: "1" },
//   { label: t("2 years"), value: "2" },
//   { label: t("3 years"), value: "3" },
//   { label: t("4 years"), value: "4" },
//   { label: t("5 years"), value: "5" },
// ];
const groupCompositionList1 = [
  { label: t("other_moms"), value: t("other_moms") },
  { label: t("other_dads"), value: t("other_dads") },
  { label: t("mixed_gender_group"), value: t("mixed_gender_group") },
];
const groupCompositionList11 = [
  { label: t("other_dads"), value: t("other_dads") },
  { label: t("mixed_gender_group"), value: t("mixed_gender_group") },
];
const groupCompositionList12 = [
  { label: t("other_moms"), value: t("other_moms") },
  { label: t("mixed_gender_group"), value: t("mixed_gender_group") },
];


const familyCompositionList1 = [
  {
    label: t("other_first_time_parents"), value: t("other_first_time_parents"),
  },
  {
    label: t("other_more_time_parents"), value: t("other_more_time_parents"),

  },
  {
    label: t("other_twin_or_triplet_parents"),
    value: t("other_twin_or_triplet_parents"),
  },
  {
    label: t("mixed_group"), value: t("mixed_group"),
    Api: "mixed_group"
  },
];

const familyStyleList1 = [
  { label: t("two_parent_home"), value: t("two_parent_home") },
  { label: t("one_parent_home"), value: t("one_parent_home") },
  { label: t("solo_parent"), value: t("solo_parent") },
  { label: t("rainbow_family"), value: t("rainbow_family") },
  { label: t("others"), value: t("others") },
];
const familyStructureList = [
  { label: "Other Singleton Parents", value: "Other Singleton Parents" },
  { label: "Other Twins", value: "Other Twins" },
  { label: "Triplets", value: "riplets" },
  { label: "Multiple Parents", value: "Multiple Parents" },
  { label: "Mixed Group", value: "Others" },
];

const CreateGroup = ({ navigation }) => {
  const [groupUuid, setGroupUuid] = useState('')
  const [toggleCheckBox, setToggleCheckBox] = useState(false);
  const [isChecked, setisChecked] = useState(false);
  const [isChecked1, setisChecked1] = useState(false);
  const [isChecked2, setisChecked2] = useState(false);
  const [check, setCheck] = useState(false);
  const [tick, setTick] = useState(false);
  const [vissible, setVissble] = useState(false);
  const [isVisible, setisVisible] = useState(false);
  const [saw1, setSaw1] = useState(false);
  const [number, setNumber] = useState(false);
  const [number1, setNumber1] = useState("2");
  const [number2, setNumber2] = useState("3");
  const [myImage, setMyImage] = useState("");
  const [value1, setValue1] = useState(false);
  const [loader, setLoader] = useState("");
  const [zipcode, setZipcode] = useState([]);
  const [zipCodeList, setZipCodeList] = useState([]);
  const [infovisible, setinfovisible] = useState(false);
  const [infovisible1, setinfovisible1] = useState(false);
  const [selected, setSelected] = useState([]);
  const isFocused = useIsFocused();
  const [groupName, setGroupName] = useState("");
  const [groupTheme, setGroupTheme] = useState([]);
  const [NewgroupTheme, setNewGroupTheme] = useState([]);
  const [age, setAge] = useState("");
  const [groupcomposition, setGroupComposition] = useState([]);
  const [familycomposition, setfamilycomposition] = useState([]);
  const [familyStyle, setFamilyStyle] = useState([]);
  const [familyStructure, setFamilyStructure] = useState([]);
  const [kidsNeed, setKidNeed] = useState("");
  const [preferredlanguage, setPreferredLanguage] = useState([]);
  const [homeCare, setHomeCare] = useState("");
  const [address, setAddress] = useState("");
  const [description, setDescription] = useState("");
  const [grp_composition, setGrp_Composition] = useState([]);
  const [kidsVissiblecheck, setKidsVissiblecheck] = useState(false);
  const [kidsVissiblecheck1, setKidsVissiblecheck1] = useState(false);
  const [homeCarecheck, setHomecarecheck] = useState(false);
  const [isDanish, setIsDanish] = useState(false);
  const [isEnglish, setIsEnglish] = useState(false);
  const [userToken, setToken] = useState(null);
  const [loader1, setLoader1] = useState("");
  const [familycompositions, setFamilycomposition] = useState([])
  const [newZipCode, setNewZipCode] = useState([])
  const [preZipCode, setPreZipCode] = useState([])
  const [gender, setGender] = useState("")
  const [prifilledtheme, setPrifilledTheme] = useState([])
  const [prifilledgroupcom, setPrifilledGroupCom] = useState([])
  const [prifilledFamilycom, setPrifilledFamilyCom] = useState([])
  const [prifilledFamilyStyle, setPrifilledFamilyStyle] = useState([])
  const[ageList,setAgeList]=useState([])
  const { t, i18n } = useTranslation();
  const toggleModal2 = () => {
    setisVisible(!isVisible);
  };
  const openGallery = () => {
    ImagePicker.openPicker({
      width: 300,
      height: 400,
      cropping: true,
    }).then((image) => {
      setMyImage(image.path);
      setisVisible(false);
    });
  };
  const OpenCamera = () => {
    ImagePicker.openCamera({
      width: 300,
      height: 400,
      cropping: true,
    }).then((image) => {
      setMyImage(image.path);
      setisVisible(false);
    });
  };
  // console.log("dedede=-=---=-=-=", NewgroupTheme)
  useEffect(() => {
    UUIDGenerator.getRandomUUID().then((uuid) => {
      // console.log("12121212121212",uuid);
      setGroupUuid(uuid)
    });
    getZipCodeList();
    getDetails1()
    getprifilledarray()
    getUserPrefrence()
  }, [isFocused]);

  const PrefilledData = async () => {
    var kidss = await AsyncStorage.getItem("DATAAKIDS")
    var homess = await AsyncStorage.getItem("DATAAHOMECARE")
    var languages = await AsyncStorage.getItem("DATAALANG")
    var THEMEs = await AsyncStorage.getItem("DATAGRP_THEME")

    setGroupTheme(THEMEs)
    setPreferredLanguage(languages)
    setHomeCare(homess)
    setKidNeed(kidss)
    var cDATA = JSON.parse(kidss);
    var c2DATA = JSON.parse(homess)
    var c3DATA = JSON.parse(languages)
    var c4DATA = JSON.parse(THEMEs)

    if (cDATA == "Yes") {
      setKidsVissiblecheck(true);
    }
    else if (cDATA == "Ja") {
      setKidsVissiblecheck(true);
    }
    else if (cDATA == "No") {
      setKidsVissiblecheck(false);
    }
    else if (cDATA == "Nej") {
      setKidsVissiblecheck(false);
    }
    if (c2DATA == "Yes") {
      setHomecarecheck(true);
    }

    else if (c2DATA == "Ja") {
      setHomecarecheck(true);
    }
    else if (c2DATA == "No") {
      setHomecarecheck(false);
    }
    else if (c2DATA == "Nej") {
      setHomecarecheck(false);
    }
    if (c3DATA == "english") {
      setIsEnglish(true);
    }
    else if (c3DATA == "engelsk") {
      setIsEnglish(true);
    }
    else if (c3DATA == "danish") {
      setIsDanish(true);
    }

    else if (c3DATA == "dansk") {
      setIsDanish(true);
    }

  }


  const getUserPrefrence = async () => {

    var langg = await AsyncStorage.getItem("langugae")
    var token = await AsyncStorage.getItem("token");
 
    setToken(token);
    var axios = require('axios');

    var config = {
      method: 'get',
      url: constants.BASE_URL + "api/group/user_preference",
      headers: {
        Authorization: "Bearer " + JSON.parse(token),
        "X-localization": langg==null?"da":langg,
      },
    };

    axios(config)
      .then(async (response) => {
        // console.log("jhhhjhjhhjhjhjjjh", JSON.stringify(response.data));
        //GROUP THEME
        var ar = response.data.data.group_theme
        var newArr = []
        for (let i = 0; i < ar.length; i++) {
          newArr.push(ar[i].id)
        }
        setNewGroupTheme(newArr)

        //GROUP_COMPO
        var arG = response.data.data.group_composition
        // console.log("GROUP__COMPOPPP",arG)
        var newArrG = []
        for (let i = 0; i < arG.length; i++) {
          newArrG.push(arG[i].id)
        }
        setGrp_Composition(newArrG)


        //ZIP CODES
        // var arZ = response.data.data.zip_codes
        // var newArrZ = []
        // for (let i = 0; i < arZ.length; i++) {
        //   newArrZ.push(arZ[i].id)
        // }
        // setNewZipCode(newArrZ)
        //FAMILY COMPOSISTION
        var arFC = response.data.data.family_composition
        var newArrFC = []
        for (let i = 0; i < arFC.length; i++) {
          newArrFC.push(arFC[i].id)
        }
        setFamilycomposition(newArrFC)
       //FAMILY STYLE
        var arFS = response.data.data.family_style
        var newArrFS = []
        for (let i = 0; i < arFS.length; i++) {
          newArrFS.push(arFS[i].id)
        }
        setFamilyStyle(newArrFS)

        // var grp_com = response.data.data.group_composition.split(",")
        // setGrp_Composition(grp_com)
        var zipArr = response.data.data.zip_codes.split(",")
        setNewZipCode(zipArr)
       
        //  setNewZipCode(response.data.data.zip_codes)

       

        // var fam_com = response.data.data.family_composition.split(",")
        // setFamilycomposition(fam_com)

      


        // var fam_sty = response.data.data.family_style.split(",")
        // setFamilyStyle(fam_sty)


      

        await AsyncStorage.setItem("DATAA", JSON.stringify(response.data.data))
        await AsyncStorage.setItem("DATAAKIDS", JSON.stringify(response.data.data.kids_with_special_needs))
        await AsyncStorage.setItem("DATAAHOMECARE", JSON.stringify(response.data.data.home_care))
        await AsyncStorage.setItem("DATAALANG", JSON.stringify(response.data.data.preferred_language))
        await AsyncStorage.setItem("DATAGRP_THEME", JSON.stringify(response.data.data.group_theme))
        // setGroupTheme(response.data.data.group_theme)


        setAge(response.data.data.age_group)
       
        // setFamilyStyle(response.data.data.family_style)
        setKidNeed(response.data.data.kids_with_special_needs)
        setPreferredLanguage(response.data.data.preferred_language)
        setHomeCare(response.data.data.home_care)
        setGender(response.data.data.gender)
        
        
        // alert(response.data.data.age_group)
        // console.log("fgdgfjsfhjdfs", response.data.data.zip_codes)
        PrefilledData()
      })
      .catch(function (error) {
        // console.log(error);
      });

  }
  const getprifilledarray = async () => {
    var langg = await AsyncStorage.getItem("langugae")
    var token = await AsyncStorage.getItem("token");
    setToken(token);
    var axios = require('axios');

    var config = {
      method: 'get',
      url: constants.BASE_URL + "api/groups/preferrence_value",
      headers: {
        Authorization: "Bearer " + JSON.parse(token),
        "X-localization": langg==null?"da":langg,
      },
    };

    axios(config)
      .then(async (response) => {
        // console.log("PRIFFLLEEDDDDATATATTA", JSON.stringify(response.data.data));
        if (response.data.status == true) {
          setPrifilledTheme(response.data.data.theme)
          setPrifilledGroupCom(response.data.data.group_composition)
          setPrifilledFamilyStyle(response.data.data.family_style)
          setPrifilledFamilyCom(response.data.data.family_composition)
          setAgeList(response.data.data.age_group)
          // console.log("yiyiy89989898989", response.data.data.group_composition)
        }

      })
      .catch(function (error) {
        // console.log(error);
      });

  }

  const getZipCodeList = async () => {
    var token = await AsyncStorage.getItem("token");
    setToken(token);
    var axios = require("axios");

    var config = {
      method: "get",
      url: constants.BASE_URL + "api/zipcodes",
      headers: {
        Authorization: "Bearer " + JSON.parse(token),
      },
    };

    axios(config)
      .then(function (response) {
        // console.log("767768888569599", JSON.stringify(response.data.data));
        setZipCodeList(response.data.data);
      })
      .catch(function (error) {
        // console.log(error);
      });
  };

  const getDetails1 = async () => {
    var cDATA = await AsyncStorage.getItem("DATAA")
    // console.log("hhhhhddh", cDATA)
  };
  const convertString = (str) => {
    var str1 = str.replace(/-/g, " ");
    var str2 = str1.replace(/ /g, "_")
    var str3 = str2.toLowerCase()
    var str4 = JSON.stringify(str3)
    return str4.replace(/(^"|"$)/g, '')
  };


  const createpublicgroup = async () => {
    var langg = await AsyncStorage.getItem("langugae")
    var preferedLang = "";
    if (isDanish && isEnglish) {
      preferedLang = "english,danish";
    } else {
      if (isDanish) {
        preferedLang = "danish";
      } else if (isEnglish) {
        preferedLang = "english";
      }
    }
    var kidsNeed = "";
    if (kidsVissiblecheck) {
      kidsNeed = "yes"
    }
    else if (!kidsVissiblecheck) {
      kidsNeed = "no"
    }
    var homecare = "";
    if (homeCarecheck) {
      homecare = "yes"
    }
    else if (!homeCarecheck) {
      homecare = "no"
    }


    if (groupName == "") {
      alert(t("Please add group name"));
    }
    else if (NewgroupTheme.length == 0) {
      alert(t("Please select group theme"));
    }
    else if (age == "") {
      alert(t("Please select age"));
    } else if (newZipCode == "") {
      alert(t("Please select zipcode"));
    }
    else if (grp_composition.length == 0) {
      alert(t("Please select group composition"));
    }
    else if (familycompositions.length == 0) {
      alert("Please select family composition");
    }
    else if (familyStyle.length == 0) {
      alert(t("Please select family style"));
    }
    else if (kidsNeed == "") {
      alert(t("Please select kids special needs"));
    }
    else if (preferedLang.length == 0) {
      alert(t("Please select prefered language"));
    }
    else if (homeCare == "") {
      alert(t("Please select home care"));
    }
    else {
      var FamilyStyleArray = familyStyle
      var FAMILY_STYLE_ARRAY = FamilyStyleArray.filter(function (item) {
        return (parseInt(item) == item);
      });
      var GroupcompositionArray = grp_composition

      var GROUP_COMPOSITION_ARRAY = GroupcompositionArray.filter(function (item) {
        return (parseInt(item) == item);
      });

      var GroupthemeArray = NewgroupTheme

      var GROUP_THEME_ARRAY = GroupthemeArray.filter(function (item) {
        return (parseInt(item) == item);
      });

      var famComArray = familycompositions
      var FAMILY_COMPOSITION_ARRAY = famComArray.filter(function (item) {
        return (parseInt(item) == item);
      });

//       console.log("preeeewdqddddwdqwdeeeee", FAMILY_COMPOSITION_ARRAY.toString())
// return false
      setLoader1(true);
      if (myImage !== "") {
        let filename = myImage.split("/").pop();
        let match = /\.(\w+)$/.exec(filename);
        // let fileType = match ? `${match[1]}` : `image`;
        let fileType = filename.split(".").pop();
        var obj = {
          uri: myImage,
          name: filename,
          type: `image/${fileType}`,
        };
      }

      var axios = require("axios");
      var FormData = require("form-data");
      var data = new FormData();
      data.append("image", myImage == "" ? "" : obj);
      data.append("name", groupName);
      data.append("theme", GROUP_THEME_ARRAY.toString());
      data.append("age", age);
      data.append("zipcode", newZipCode);
      data.append(
        "group_composition",
        GROUP_COMPOSITION_ARRAY.toString()
      );

      data.append(
        "family_composition", FAMILY_COMPOSITION_ARRAY.toString())


      data.append("family_style", FAMILY_STYLE_ARRAY.toString());
      data.append("kids_with_special_needs", kidsNeed.toString().replace("_", / /g, "_"));
      data.append("preferred_language", preferedLang.toString().replace("_", / /g, "_"));
      data.append("home_care", homecare.toString().replace("_", / /g, "_"));


      var config = {
        method: "post",
        url: constants.BASE_URL + "api/group/create_public",
        headers: {
          Authorization: "Bearer " + JSON.parse(userToken),
          'X-localization': langg, 
        },
        data: data,
      };

      axios(config)
        .then(function (response) {
          setLoader1(false);
          // console.log("RESSSSSPPPPPPPpp", JSON.stringify(response.data));
          var data = response.data;
          if (data.status) {
            alert(t("Group Created"));
            // createFirebaseGroup(response.data.data)
            navigation.navigate("Match");
          }
          else {
            alert(response.data.message)
          }

        })
        .catch(function (error) {
          setLoader1(false);
          // console.log(error);
        });
    }
  };


  const onSelectLanguage = async (data, type) => { };
  const createGroup = async () => {
    // console.log("FINAL_BNNNNARRAY", finalArray.toString())
    var langg = await AsyncStorage.getItem("langugae")
    var preferedLang = "";
    if (isDanish && isEnglish) {
      preferedLang = "english,danish";
    } else {
      if (isDanish) {
        preferedLang = "danish";
      } else if (isEnglish) {
        preferedLang = "english";
      }

    }
    var kidsNeed = "";
    if (kidsVissiblecheck) {
      kidsNeed = "yes"
    }
    else if (!kidsVissiblecheck) {
      kidsNeed = "no"
    }
    var homecare = "";
    if (homeCarecheck) {
      homecare = "yes"
    }
    else if (!homeCarecheck) {
      homecare = "no"
    }
    if (groupName == "") {
      alert(t("Please add group name"));
    } else if (groupTheme.length == 0) {
      alert(t("Please select group theme"));
    } else if (age == "") {
      alert(t("Please select age"));
    } else if (newZipCode == "") {
      alert(t("Please select zipcode"));
    } else if (grp_composition.length == 0) {
      alert(t("Please select group composition"));
    } else if (familycompositions.length == 0) {
      alert(t("Please select family composition"));
    } else if (familyStyle.length == 0) {
      alert(t("Please select family style"));
    } else if (kidsNeed == "") {
      alert(t("Please select kids special needs"));
    } else if (preferedLang.length == 0) {
      alert(t("Please select prefered language"));
    }
    else if (homeCare == "") {
      alert(t("Please select home care"));

    }

    else {
      

      var FamilyStyleArray = familyStyle
      var FAMILY_STYLE_ARRAY = FamilyStyleArray.filter(function (item) {
        return (parseInt(item) == item);
      });
      var GroupcompositionArray = grp_composition

      var GROUP_COMPOSITION_ARRAY = GroupcompositionArray.filter(function (item) {
        return (parseInt(item) == item);
      });

      var GroupthemeArray = NewgroupTheme

      var GROUP_THEME_ARRAY = GroupthemeArray.filter(function (item) {
        return (parseInt(item) == item);
      });

      var famComArray = familycompositions
      var FAMILY_COMPOSITION_ARRAY = famComArray.filter(function (item) {
        return (parseInt(item) == item);
      });



      setLoader(true);
      if (myImage !== "") {
        let filename = myImage.split("/").pop();
        let match = /\.(\w+)$/.exec(filename);
        // let fileType = match ? `${match[1]}` : `image`;
        let fileType = filename.split(".").pop();
        var obj = {
          uri: myImage,
          name: filename,
          type: `image/${fileType}`,
        };
      }
      var axios = require("axios");
      var FormData = require("form-data");
      var data = new FormData();
      data.append("image", myImage == "" ? "" : obj);
      data.append("name", groupName);
      data.append("theme", GROUP_THEME_ARRAY.toString());
      data.append("age", age);
      data.append("zipcode", newZipCode);
      data.append(
        "group_composition",
        GROUP_COMPOSITION_ARRAY.toString()
      );

      data.append(
        "family_composition", FAMILY_COMPOSITION_ARRAY.toString())


      data.append("family_style", FAMILY_STYLE_ARRAY.toString());
      data.append("kids_with_special_needs", kidsNeed.toString().replace("_", / /g, "_"));
      data.append("preferred_language", preferedLang.toString().replace("_", / /g, "_"));
      data.append("home_care", homecare.toString().replace("_", / /g, "_"));

      // console.log("NEWformdatatatatat", data);
      var config = {
        method: "post",
        url: constants.BASE_URL + "api/group/create",
        headers: {
          Authorization: "Bearer " + JSON.parse(userToken),
          'X-localization': langg,
        },
        data: data,
      };

      axios(config)
        .then(function (response) {
          setLoader(false);
          var data = response.data;
          // console.log("9009990908088", response.data)
          if (data.status) {
            alert(t("Group Created"));
            navigation.navigate("MyGroupNavigation");

          }
          else {
            alert(response.data.message)
          }

        })
        .catch(function (error) {
          setLoader(false);
        });
    }
  };

  const createFirebaseGroup = async (data) => {
    // console.log("groupUugroupUuidid", groupUuid)
    var date = new Date();
    var year = date.getFullYear();
    var month = date.getMonth();
    var day = date.getDate();
    var created_at = year + "-" + month + "-" + day
    var name = await AsyncStorage.getItem("Name")
    var userId = await AsyncStorage.getItem("user_id")

    var Obj = {
      "created_at": created_at,
      "group_name": data.name,
      "group_photo": data.image,
      "firebaseGroupId": groupUuid,
      "users": [
        {
          "name": JSON.parse(name),
          "userId": userId
        }
      ]
    }
    // console.log("rererererererererlkajSLKJLKJLK", Obj)
    firestore()
      .collection('groups')
      .doc(groupUuid)
      .set(Obj)
      .then(() => {
        // console.log('User added!3232323');
      })
      .catch(error => {
        // console.log("errorerererere434343", error)
      })
  }

  return (
    <View style={styles.Container}>

      <View style={styles.view2}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Image
            style={styles.img3}
            resizeMode="contain"
            source={require("../../../Images/Arrow-Left.png")}
          />
        </TouchableOpacity>
        <Text style={styles.text1}>{t("Create Group")}</Text>
        <TouchableOpacity
          onPress={() => navigation.navigate("Notification1")}
        ></TouchableOpacity>

      </View>
      <View style={{ flex: 0.9, backgroundColor: "white" }}>
        <ImageBackground
          style={styles.ImageBackground}
          source={require("../../../src/asset/Splash.png")}
        >
          <KeyboardAwareScrollView style={{ flex: 1 }}>
            {myImage ? (
              <View style={styles.ImageView}>
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

                  <Image
                    source={{ uri: myImage }}
                    style={styles.ImageProfile}
                  />
                </View>
                <TouchableOpacity
                  onPress={toggleModal2}
                  style={styles.IconButton}
                >
                  <Image
                    source={require("../../../Images/edit.png")}
                    style={styles.ProfileEdit}
                  />
                </TouchableOpacity>
              </View>
            ) : (
              <View style={styles.ImageView}>
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
                  <Image
                    source={require("../../../src/asset/dummyimage.png")}
                    style={styles.ImageProfile}
                  />
                </View>
                <TouchableOpacity
                  onPress={toggleModal2}
                  style={styles.IconButton}
                >
                  <Image
                    source={require("../../../Images/edit.png")}
                    style={styles.ProfileEdit}
                  />
                </TouchableOpacity>
              </View>
            )}

            <View
              style={{
                marginTop: 20,
                justifyContent: "space-evenly",
                alignItems: "center",
              }}
            >
              <View style={styles.TextFieldView}>
                <TextInput
                  placeholderTextColor="grey"
                  underlineColor="transparent"
                  maxLength={20}
                  style={styles.textInput}
                  placeholder={t("Enter group name")}
                  //  value={groupName}
                  onChangeText={(text) => {
                    setGroupName(text);
                  }}
                />
              </View>

              <MultiSelect
                style={styles.dropdown1}
                placeholderStyle={styles.placeholderStyle}
                selectedTextStyle={styles.selectedTextStyle}
                inputSearchStyle={styles.inputSearchStyle}
                itemContainerStyle={{ backgroundColor: "", marginTop: 5 }}
                containerStyle={{ backgroundColor: "white", borderRadius: 20 }}
                iconStyle={styles.iconStyle}
                itemTextStyle={{ color: "grey" }}
                data={prifilledtheme}
                labelField="name"
                valueField="id"
                placeholder={t("Group Theme")}
                value={NewgroupTheme}
                onChange={(item) => {
               
                  setGroupTheme(item);
                  setNewGroupTheme(item)

                }}

                selectedStyle={styles.selectedStyle2}
              />
              <Dropdown
                style={[styles.dropdown]}
                data={ageList}
                textStyle={{ color: "red" }}
                maxHeight={300}
                labelField="name"
                valueField="name"
                maxSelect={3}
                placeholder={t("Age")}
                containerStyle={{ borderRadius: 20 }}
                selectedTextStyle={{ color: "grey" }}
                itemTextStyle={{ color: "grey" }}
                placeholderStyle={{
                  fontFamily: "Axiforma-Regular",
                  fontSize: 13,
                  color: "grey",
                }}
                value={age}
                onChange={(item) => {
                  setAge(item.value);

                }}
              />

              <View style={styles.container}>
                <MultiSelect
                  style={styles.dropdown1}
                  placeholderStyle={styles.placeholderStyle}
                  selectedTextStyle={styles.selectedTextStyle}
                  inputSearchStyle={styles.inputSearchStyle1}
                  itemContainerStyle={{ backgroundColor: "", marginTop: 5 }}
                  containerStyle={{ backgroundColor: "white", borderRadius: 20 }}
                  iconStyle={styles.iconStyle}
                  itemTextStyle={{ color: "grey" }}

                  data={zipCodeList}
                  labelField="zipcode"
                  valueField="zipcode"
                  placeholder={t("Zip code")}
                  value={newZipCode}
                  search
                  searchPlaceholder={t("Search here")}
                  onChange={(item) => {
                    
                    setSelected(item);
                    setZipcode(item);
                    setNewZipCode(item)
                  }}
                  selectedStyle={styles.selectedStyle5}
                />
              </View>
              <MultiSelect
                style={styles.dropdown1}
                placeholderStyle={styles.placeholderStyle}
                selectedTextStyle={styles.selectedTextStyle}
                inputSearchStyle={styles.inputSearchStyle}
                itemContainerStyle={{ backgroundColor: "", marginTop: 5 }}
                containerStyle={{ backgroundColor: "white", borderRadius: 20 }}
                iconStyle={styles.iconStyle}
                itemTextStyle={{ color: "grey" }}
                data={prifilledgroupcom}
                // data={gender == "other" ? prifilledgroupcom : gender == "male" ? prifilledgroupcom : prifilledgroupcom}
                labelField="name"
                valueField="id"
                placeholder={t("Group composition")}
                value={grp_composition}
                onChange={(item) => {
                  setGroupComposition(item);
                  setGrp_Composition(item)
                }}
                selectedStyle={styles.selectedStyle4}
              />

              <MultiSelect
                style={styles.dropdown1}
                placeholderStyle={styles.placeholderStyle}
                selectedTextStyle={styles.selectedTextStyle}
                inputSearchStyle={styles.inputSearchStyle}
                itemContainerStyle={{ backgroundColor: "", marginTop: 5 }}
                containerStyle={{ backgroundColor: "white", borderRadius: 20 }}
                iconStyle={styles.iconStyle}
                itemTextStyle={{ color: "grey" }}
                data={prifilledFamilycom}
                labelField="name"
                valueField="id"
                placeholder={t("Family composition")}
                value={familycompositions}
                onChange={(item) => {
                  setfamilycomposition(item);
                  setFamilycomposition(item)

                }}
                selectedStyle={styles.selectedStyle3}
              />
              <MultiSelect
                style={styles.dropdown1}
                placeholderStyle={styles.placeholderStyle}
                selectedTextStyle={styles.selectedTextStyle}
                inputSearchStyle={styles.inputSearchStyle}
                itemContainerStyle={{ backgroundColor: "", marginTop: 5 }}
                containerStyle={{ backgroundColor: "white", borderRadius: 20 }}
                iconStyle={styles.iconStyle}
                itemTextStyle={{ color: "grey" }}
                data={prifilledFamilyStyle}
                labelField="name"
                valueField="id"
                placeholder={t("Family style")}
                value={familyStyle}
                onChange={(item) => {
                  setFamilyStyle(item);

                }}
                selectedStyle={styles.selectedStyle3}
              />

              <View
                style={{
                  width: "85%",
                  justifyContent: "space-evenly",
                  marginVertical: 10,
                  height: 80,
                  borderWidth: 1,
                  borderColor: "#DFE3A3",
                  paddingHorizontal: 15,
                  borderRadius: 15,
                  backgroundColor: "white",
                }}
              >
                <Text
                  style={{
                    fontFamily: "Axiforma-Medium",
                    fontSize: 16,
                    color: "grey",
                  }}
                >
                  {t("Kid's with Special Needs")}
                </Text>
                <View style={{ flexDirection: "row", marginTop: 5 }}>
                  <View
                    style={{
                      flexDirection: "row",
                      justifyContent: "center",
                      alignItems: "center",
                    }}
                  >
                    <TouchableOpacity
                      style={{
                        backgroundColor: kidsVissiblecheck ? "#008080" : "#fff",
                        height: 22,
                        width: 22,
                        borderRadius: 50,
                        borderWidth: 1,
                        borderColor: "#DFE3A3",
                      }}
                      onPress={() => {
                        setKidNeed("Yes");
                        setKidsVissiblecheck(true);
                      }}
                    ></TouchableOpacity>
                    <Text
                      style={{
                        color: "#737373",
                        fontSize: 16,
                        fontFamily: "Axiforma-Regular",
                        marginStart: 8,
                      }}
                    >
                      {t("Yes")}
                    </Text>
                  </View>

                  <View
                    style={{
                      flexDirection: "row",
                      marginStart: 44,
                      justifyContent: "center",
                      alignItems: "center",
                    }}
                  >
                    <TouchableOpacity
                      style={{
                        backgroundColor: !kidsVissiblecheck
                          ? "#008080"
                          : "#fff",
                        height: 22,
                        width: 22,
                        borderRadius: 50,
                        borderWidth: 1,
                        borderColor: "#DFE3A3",
                      }}
                      onPress={() => {

                        setKidsVissiblecheck(false);
                        setKidNeed("No");
                      }}
                    ></TouchableOpacity>
                    <Text
                      style={{
                        color: "#737373",
                        fontSize: 16,
                        fontFamily: "Axiforma-Regular",
                        marginStart: 8,
                      }}
                    >
                      {t("No")}
                    </Text>
                  </View>
                </View>
              </View>
              <View
                style={{
                  width: "85%",
                  justifyContent: "space-evenly",
                  marginVertical: 12,
                  height: 80,
                  borderWidth: 1,
                  borderColor: "#DFE3A3",
                  paddingHorizontal: 15,
                  borderRadius: 15,
                  backgroundColor: "white",
                }}
              >
                <Text
                  style={{
                    fontFamily: "Axiforma-Medium",
                    fontSize: 16,
                    color: "grey",
                  }}
                >
                  {t("Prefered Language")}
                </Text>
                <View style={{ flexDirection: "row", marginTop: 5 }}>
                  <View
                    style={{
                      flexDirection: "row",

                      justifyContent: "center",
                      alignItems: "center",
                    }}
                  >
                    <Checkbox
                      style={styles.Check1}
                      value={isDanish}
                      onValueChange={() => { setIsDanish(true), setIsEnglish(false) }}
                      color={isDanish ? "#008080" : undefined}
                    />
                    <Text
                      style={{
                        color: "#737373",
                        fontSize: 16,
                        fontFamily: "Axiforma-Regular",
                        marginStart: 8,
                      }}
                    >
                      {t("Danish")}
                    </Text>
                  </View>

                  <View
                    style={{
                      flexDirection: "row",
                      marginStart: 44,
                      justifyContent: "center",
                      alignItems: "center",
                    }}
                  >
                    <Checkbox
                      style={styles.Check1}
                      value={isEnglish}
                      onValueChange={() => { setIsEnglish(true), setIsDanish(false) }}
                      color={isEnglish ? "#008080" : undefined}
                    />
                    <Text
                      style={{
                        color: "#737373",
                        fontSize: 16,
                        fontFamily: "Axiforma-Regular",
                        marginStart: 8,
                      }}
                    >
                      {t("English")}
                    </Text>
                  </View>
                </View>
              </View>
              <View
                style={{
                  width: "85%",
                  justifyContent: "space-evenly",
                  marginVertical: 12,
                  height: 80,
                  borderWidth: 1,
                  borderColor: "#DFE3A3",
                  paddingHorizontal: 15,
                  borderRadius: 15,
                  backgroundColor: "white",
                }}
              >
                <Text
                  style={{
                    fontFamily: "Axiforma-Medium",
                    fontSize: 16,
                    color: "grey",
                  }}
                >
                  {t("Home care")}
                </Text>
                <View style={{ flexDirection: "row", marginTop: 5 }}>
                  <View
                    style={{
                      flexDirection: "row",

                      justifyContent: "center",
                      alignItems: "center",
                    }}
                  >
                    <TouchableOpacity
                      style={{
                        backgroundColor: homeCarecheck ? "#008080" : "#fff",
                        height: 22,
                        width: 22,
                        borderRadius: 50,
                        borderWidth: 1,
                        borderColor: "#DFE3A3",
                      }}
                      onPress={() => {
                        setHomecarecheck(true);
                        setHomeCare("Yes");

                      }}
                    ></TouchableOpacity>
                    <Text
                      style={{
                        color: "#737373",
                        fontSize: 16,
                        fontFamily: "Axiforma-Regular",
                        marginStart: 8,
                      }}
                    >
                      {t("Yes")}
                    </Text>
                  </View>

                  <View
                    style={{
                      flexDirection: "row",
                      marginStart: 44,
                      justifyContent: "center",
                      alignItems: "center",
                    }}
                  >
                    <TouchableOpacity
                      style={{
                        backgroundColor: !homeCarecheck ? "#008080" : "#fff",
                        height: 22,
                        width: 22,
                        borderRadius: 50,
                        borderWidth: 1,
                        borderColor: "#DFE3A3",
                      }}
                      onPress={() => {

                        setHomecarecheck(false);
                        setHomeCare("No");
                      }}
                    ></TouchableOpacity>
                    <Text
                      style={{
                        color: "#737373",
                        fontSize: 16,
                        fontFamily: "Axiforma-Regular",
                        marginStart: 8,
                      }}
                    >
                      {t("No")}
                    </Text>
                  </View>
                </View>
              </View>
            </View>

            <View style={{ flexDirection: 'row', marginBottom: 20, justifyContent: 'space-between', width: '95%' }}>
              <View style={{
                backgroundColor: '#008080', height: 40, width: 185, borderRadius: 25, marginLeft: 5,
                shadowOpacity: 0.5, flexDirection: 'row'
              }}>
                <TouchableOpacity style={{ marginTop: 0, alignItems: 'center', alignSelf: 'center', marginLeft: 0 }}
                  onPress={() => setinfovisible(true)}>
                  <Image
                    style={{ height: 17, width: 17, resizeMode: "contain", marginTop: 0, alignItems: 'center', alignSelf: 'center', marginLeft: 4 }}
                    source={require("../../../Images/Info.png")}

                  />
                </TouchableOpacity>
                <TouchableOpacity onPress={() => createpublicgroup()}>

                  {loader1 == true ? (
                    <ActivityIndicator size="small" color="white" style={{ alignItems: 'center', alignSelf: 'center', paddingTop: 8, paddingLeft: 70 }} />
                  ) : (
                    <Text style={{
                      fontSize: 14,
                      fontFamily: "Axiforma-Bold",
                      color: "white", textAlign: "center", paddingTop: 15, alignItems: 'center', alignSelf: 'center', marginLeft: 0
                    }}>{t("Create public group")} </Text>
                  )}
                </TouchableOpacity>
              </View>
              <View style={{
                backgroundColor: '#008080', height: 40, width: 180, borderRadius: 25, marginLeft: 3,
                shadowOpacity: 0.5, flexDirection: 'row'
              }}>
                <TouchableOpacity style={{ marginTop: 0, alignItems: 'center', alignSelf: 'center', marginLeft: 0 }}
                  onPress={() => setinfovisible1(true)}>
                  <Image
                    style={{ height: 17, width: 17, resizeMode: "contain", marginTop: 0, alignItems: 'center', alignSelf: 'center', marginLeft: 7 }}
                    source={require("../../../Images/Info.png")}

                  />
                </TouchableOpacity>
                <TouchableOpacity onPress={() => createGroup()}>

                  {loader == true ? (
                    <ActivityIndicator size="small" color="white" style={{ alignItems: 'center', alignSelf: 'center', paddingTop: 8, paddingLeft: 70 }} />
                  ) : (
                    <Text style={{
                      fontSize: 14,
                      fontFamily: "Axiforma-Bold",
                      color: "white", textAlign: "center", paddingTop: 15, alignItems: 'center', alignSelf: 'center', marginLeft: 0
                    }}>{t("Create private group")} </Text>
                  )}
                </TouchableOpacity>
              </View>

              {/* <TouchableOpacity
              style={{backgroundColor:'#008080',height:40,width:180,borderRadius: 25,
              shadowOpacity: 0.5,marginLeft:0,marginRight:10}}
              onPress={() => createGroup()}
            >
              {loader == true ? (
                <ActivityIndicator size="small" color="white" style={{alignItems:'center',alignSelf:'center',paddingTop:8}} />
              ) : (
                <Text style={{fontSize: 14,
                  fontFamily: "Axiforma-Bold",
                  color: "white",textAlign:"center",paddingTop:12,alignItems:'center',alignSelf:'center'}}>{t("Create private group")} </Text>
              )}
            </TouchableOpacity> */}
            </View>




          </KeyboardAwareScrollView>
        </ImageBackground>
      </View>

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
                  style={{ height: 22, width: 20, tintColor: "white" }}
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
      {infovisible && (
        <Modal
          isVisible={infovisible}
          style={{
          }}

        >
          <TouchableOpacity
            onPress={() => setinfovisible(false)}
            style={{
              alignItems: "flex-end",
              marginRight: -10,
              marginTop: "70%",

            }}
          >
            <Image
              source={require("../../asset/cros1.png")}
              style={{ resizeMode: "contain", height: 35, width: 35 }}
            />
          </TouchableOpacity>
          <ScrollView>
            <View
              style={{
                backgroundColor: "#F9FBDB",
                borderRadius: 20,
                marginBottom: 50,
                // alignSelf:'center',
                minHeight: 200,
                alignItems: "center",
                padding: 14,
                justifyContent: "space-evenly",
              }}
            >



              <View style={{ width: '85%' }}>
                <Text
                  style={{
                    color: "#008080",
                    fontSize: 16,
                    textAlign: "left",
                    marginVertical: 10,
                    fontWeight: "bold",

                  }}
                >
                  {t("You are the first person in your area with these preferences, please click below to initiate a new group - Other users will be able to see your group preferences but not your personal information until they are part of the group")}
                </Text>
                <Text
                  style={{
                    color: "#008080",
                    fontSize: 16,
                    textAlign: "left",
                    marginVertical: 10,
                    fontWeight: "bold",

                  }}
                >
                  {t("After the group is created: The algorithm is working hard on assigning members to your group, soon you will be up and running and you will hear more within the coming week")}
                </Text>
              </View>




            </View>
          </ScrollView>
        </Modal>
      )}
      {infovisible1 && (
        <Modal
          isVisible={infovisible1}
          style={{
          }}

        >
          <TouchableOpacity
            onPress={() => setinfovisible1(false)}
            style={{
              alignItems: "flex-end",
              marginRight: -10,
              marginTop: "70%",

            }}
          >
            <Image
              source={require("../../asset/cros1.png")}
              style={{ resizeMode: "contain", height: 35, width: 35 }}
            />
          </TouchableOpacity>
          <ScrollView>
            <View
              style={{
                backgroundColor: "#F9FBDB",
                borderRadius: 20,
                marginBottom: 20,
                minHeight: 200,
                alignItems: "center",
                padding: 14,
                justifyContent: "space-evenly",
              }}
            >



              <View style={{ width: '85%' }}>
                <Text
                  style={{
                    color: "#008080",
                    fontSize: 16,
                    textAlign: "left",
                    marginVertical: 10,
                    fontWeight: "bold",

                  }}
                >
                  {t("Here you can create your own group and afterwards invite your best buddies via e-mail. Other users will not be able to see this group")}
                </Text>
                <Text
                  style={{
                    color: "#008080",
                    fontSize: 16,
                    textAlign: "left",
                    marginVertical: 10,
                    fontWeight: "bold",

                  }}
                >
                  {t("After the group is created: Please find your new group under My groups and inivite button in order to invite your best buddies via e-mail.")}
                </Text>
              </View>




            </View>
          </ScrollView>
        </Modal>
      )}
    </View>
  );
};
const full_app = withTranslation()(CreateGroup)
export default full_app;

const styles = StyleSheet.create({
  Container: {
    flex: 1,
  },
  Check1: {
    backgroundColor: "white",
    borderWidth: 2,
    borderColor: "#DEDEDE",
    height: 18,
    width: 18,
  },
  ImageBackground: {
    flex: 1,
    height: "100%",
    width: "100%",
  },
  login: {
    backgroundColor: "#008080",
    width: wp(85),
    justifyContent: "center",
    alignSelf: "center",
    height: hp(6),
    borderRadius: 15,
    margin: 25,
  },
  selectedStyle: {
    borderRadius: 12,
  },
  loginText: {
    alignSelf: "center",
    color: "white",
    fontSize: 16,
    fontFamily: "Axiforma-Bold",
  },
  dropdown: {
    marginVertical: 12,
    alignSelf: "center",
    borderColor: "#DFE3A3",
    borderWidth: 1,
    height: hp(6),
    width: wp(85),
    borderRadius: 15,
    paddingLeft: "5%",
    paddingEnd: "7%",
    backgroundColor: "white",
  },
  ImageView: { marginTop: 37, alignSelf: "center" },
  img2: {
    alignSelf: "center",
    width: 110,
    height: 110,
    borderRadius: 110 / 2,
    borderColor: "#F9FBDB",
  },
  TextFieldView: {
    paddingLeft: "5%",
    height: hp(6),
    width: wp(85),
    flexDirection: "row",
    alignSelf: "center",
    alignItems: "center",
    borderRadius: 15,
    padding: wp(2),
    backgroundColor: "white",
    borderColor: "#DFE3A3",
    borderWidth: 1,
    marginVertical: 12,

  },
  TextFieldViewDesc: {
    paddingLeft: "5%",
    height: hp(12),
    width: wp(85),
    flexDirection: "row",
    alignSelf: "center",
    alignItems: "flex-start",
    borderRadius: 15,
    padding: wp(2),
    backgroundColor: "white",
    borderColor: "#DFE3A3",
    borderWidth: 1,
    marginVertical: 12,
  },
  dropdown1: {
    height: hp(6),
    width: wp(85),
    backgroundColor: "white",
    borderRadius: 15,
    padding: 20,
    margin: 12,
    shadowColor: "red",

    borderWidth: 1,
    borderColor: "#DFE3A3",
    alignSelf: "center",
    shadowOffset: {},
  },
  placeholderStyle: {
    fontSize: 13,
    color: "grey",
    fontFamily: "Axiforma-Regular",
  },
  selectedTextStyle: {
    fontSize: 14,
    color: "white",
  },
  iconStyle: {
    width: 20,
    height: 20,
    color: "white",
  },
  inputSearchStyle: {
    height: 40,
    fontSize: 16,
    backgroundColor: "#008080",
  },
  inputSearchStyle1: {
    height: 40,
    fontSize: 16,
    backgroundColor: "white",
  },
  icon: {
    marginRight: 5,
  },
  item: {
    padding: 17,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  selectedStyle: {
    width: 100,
    height: 35,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 25,
    backgroundColor: "#008080",
    shadowColor: "#000",
    marginTop: 7,
    marginLeft: 7,
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderColor: "#008080",
    borderWidth: 1,
    marginLeft: 15,
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.2,
    shadowRadius: 1.41,

    elevation: 2,
  },
  textSelectedStyle: {
    marginRight: 5,
    fontSize: 16,
    color: "white",
  },
  iconStyle: {
    width: 20,
    height: 20,
    color: "white",
  },
  inputSearchStyle: {
    height: 40,
    fontSize: 16,
    backgroundColor: "#008080",
  },
  icon: {
    marginRight: 5,
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
    width: wp(72),
    height: hp(5),
    color: "#737373",
  },
  textInputDesc: {
    fontFamily: "Axiforma-Medium",
    backgroundColor: "white",
    fontSize: 13,
    width: wp(72),
    height: "100%",
    color: "#737373",
  },
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
  ViewStyle: {
    backgroundColor: "#008080",
    paddingStart: 17,
    flexDirection: "row",
    alignItems: "center",
    paddingTop: 52,
    paddingBottom: 21,
  },
  view2: {
    backgroundColor: "#008080",
    width: "100%",
    padding: 10,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-end",
    flex: 0.1,
    paddingBottom: 20,
  },
  text1: {
    color: "#F9FBDB",
    fontSize: 22,
    fontFamily: "Axiforma-Bold",
  },
  img3: {
    width: 25,
    height: 25,
    tintColor: "#F9FBDB",
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
    marginStart: 51,
  },

  TextStyle: {
    color: "grey",
    fontSize: 18,
    fontFamily: "Axiforma-SemiBold",
    marginStart: 20,
    marginTop: 30,
  },

  textDesign: {
    color: "#737373",
    fontSize: 12,
    marginStart: 20,
    fontFamily: "Axiforma-Regular",
  },
  ButtonStyle: {
    backgroundColor: "#008080",
    paddingVertical: 14,
    paddingHorizontal: 40,
    borderRadius: 50,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 20,
    alignSelf: "flex-end",
    marginEnd: 20,
    marginBottom: 50,
  },
  selectedStyle2: {
    width: 120,
    height: 35,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    alignSelf: "center",
    borderRadius: 25,
    backgroundColor: "#008080",
    shadowColor: "#000",
    marginTop: 7,
    marginLeft: 7,
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderColor: "#008080",
    borderWidth: 1,
    marginLeft: 40,

    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.2,
    shadowRadius: 1.41,

    elevation: 2,
  },
  selectedStyle3: {
    width: 120,
    height: 35,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    alignSelf: "center",
    borderRadius: 25,
    backgroundColor: "#008080",
    shadowColor: "#000",
    marginTop: 7,
    marginLeft: 7,
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderColor: "#008080",
    borderWidth: 1,
    marginLeft: 40,

    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.2,
    shadowRadius: 1.41,
    elevation: 2,
  },
  selectedStyle3: {
    width: 130,
    height: 35,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    alignSelf: "center",
    borderRadius: 25,
    backgroundColor: "#008080",
    shadowColor: "#000",
    marginTop: 7,
    marginLeft: 7,
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderColor: "#008080",
    borderWidth: 1,
    marginLeft: 35,

    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.2,
    shadowRadius: 1.41,
    elevation: 2,
  },
  selectedStyle4: {
    width: 130,
    height: 35,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    alignSelf: "center",
    borderRadius: 25,
    backgroundColor: "#008080",
    shadowColor: "#000",
    marginTop: 7,
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderColor: "#008080",
    borderWidth: 1,
    marginLeft: 40,

    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.2,
    shadowRadius: 1.41,

    elevation: 2,
  },
  selectedStyle5: {
    width: 130,
    height: 35,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    alignSelf: "center",
    borderRadius: 25,
    backgroundColor: "#008080",
    shadowColor: "#000",
    marginTop: 7,
    marginLeft: 7,
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderColor: "#008080",
    borderWidth: 1,
    marginLeft: 30,

    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.2,
    shadowRadius: 1.41,

    elevation: 2,
  },

  ButtonText: { color: "#fff", fontSize: 18, fontFamily: "Axiforma-Bold" },
});