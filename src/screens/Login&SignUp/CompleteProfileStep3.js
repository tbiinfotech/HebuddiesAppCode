
import React, { useRef, useState, useEffect } from "react";
import {
  TextInput,
  TouchableOpacity,
  ImageBackground,
  SafeAreaView,
  StyleSheet,
  Text,
  View,
  Image,
  ActivityIndicator,
} from "react-native";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import { useTranslation, withTranslation, Trans } from "react-i18next";
import "../translation/i18n";
import DropDownPicker from "react-native-dropdown-picker";
import Checkbox from "expo-checkbox";
import { Dropdown, MultiSelect } from "react-native-element-dropdown";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import constants from "../constants/constants";
import AntDesign from "react-native-vector-icons/AntDesign";
import Modal from "react-native-modal";
import { useIsFocused } from "@react-navigation/native";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";

import { ScrollView } from "react-native-gesture-handler";
import { ThemeProvider } from "react-native-paper";
import { color } from "react-native-reanimated";
const CompleteProfileStep3 = ({ navigation, route }) => {
  var GROUP_DETAILS = route.params.GROUPUSERID
  const [search, setSearch] = useState('');
  const isFocused = useIsFocused();
  const { t, i18n } = useTranslation();
  const [isChecked, setisChecked] = useState(false);
  const [isChecked1, setisChecked1] = useState(false);
  const [isChecked2, setisChecked2] = useState(false);
  const [isChecked3, setisChecked3] = useState(false);
  const [isChecked4, setisChecked4] = useState(false);
  const [isChecked5, setisChecked5] = useState(false);
  const [isChecked6, setisChecked6] = useState(false);
  const [isChecked7, setisChecked7] = useState(false);
  const [isChecked8, setisChecked8] = useState(false);
  const [isChecked9, setisChecked9] = useState(false);
  const [isChecked10, setisChecked10] = useState(false);
  const [isChecked11, setisChecked11] = useState(false);
  const [isChecked12, setisChecked12] = useState(false);
  const [isChecked13, setisChecked13] = useState(false);
  const [isChecked14, setisChecked14] = useState(false);
  const [isChecked15, setisChecked15] = useState(false);
  const [isChecked16, setisChecked16] = useState(false);
  const [isChecked17, setisChecked17] = useState(false);
  const [isChecked18, setisChecked18] = useState(false);
  const [isChecked19, setisChecked19] = useState(false);
  const [isChecked20, setisChecked20] = useState(false);
  const [isChecked21, setisChecked21] = useState(false);
  const [gcomposition, setGcomposition] = useState(false);
  const [fcomposition, setFcomposition] = useState(false);
  const [isDanish, setIsDanish] = useState(false);
  const [isEnglish, setIsEnglish] = useState(false);
  const [Famstyle, setFamstyle] = useState(false);
  const [needs, setNeeds] = useState(false);
  const [language, setLanguage] = useState(false);
  const [homecare, setHomecare] = useState(false);
  const [age, setAge] = useState("");
  const [age_grp, setAge_Grp] = useState("");
  const [zipcode, setZipcode] = useState(false);
  const [loader, setLoader] = useState(false);
  const [selected, setSelected] = useState([]);
  const [isModalVisible, setModalVisible] = useState(false);
  const [isModalVisible1, setModalVisible1] = useState(false);
  const [grp_theme, setGrouptheme] = useState();
  const [grp_location, setGroupLocation] = useState("");
  const [grpage, setGrpage] = useState("");
  const [matchgroup, setMatchGroup] = useState([]);
  const [Zipcode, setZIP_code] = useState([]);
  const [gender, setGender] = useState("");
  const [DETAILS, setDETAILS] = useState({});
  const [genderNew, setGenderNew] = useState("");
  const [savetype, setSavetype] = useState("");
  const [prelang, setPreLAng] = useState("")
  const [filteredDataSource, setFilteredDataSource] = useState([]);
  const [preZipCode, setPreZipcode] = useState([])
  const [namees, setNamees] = useState("")
  const [profileloader, setProfileloader] = useState(false)
  const [ageList, setAgeList] = useState([])
  const [ageList1, setAgeList1] = useState([])
  const [complete_profile, setComplete_profile] = useState("")

  const toggleModal = () => {
    setModalVisible(!isModalVisible);
  };
  const getfirstpagedata = async () => {
    var detailss = route.params.DETAILS
    setDETAILS(detailss)

  }
  const toggleModal1 = () => {
    setModalVisible1(!isModalVisible1);
  };
  const [items1, setItems1] = useState([
    { label: "144523", value: "144523" },
    { label: "140253", value: "140253" },
    { label: "140456", value: "140456" },
  ]);

  const [value1, setValue1] = useState(null);
  const [isFocus1, setIsFocus1] = useState(false);

  const [date, setDate] = useState(new Date());

  // const data1 = [
  //   { label: "0-6 months", value: "0-6 months" },
  //   { label: "7-12 months", value: "7-12 months" },
  //   { label: "1 year", value: "1" },
  //   { label: "2 years", value: "2" },
  //   { label: "3 years", value: "3" },
  //   { label: "4 years", value: "4" },
  //   { label: "5 years", value: "5" },
  // ];


  const getpreviousdata = async () => {
    const data = await AsyncStorage.getItem("P_DETAIL");
    // console.log("nbnnbnbnbnmm",data)
  }
  const newdata = async () => {
    var newwdata = route.params.NEWDATAA
    // console.log("jgjuuu777767hgoit909",newwdata)
  }
  useEffect(() => {
    getprifilledarray()
    getUserPrefrence()
    Zip_code();
    // getpreviousdata()
    personalinfo()
    Fetchdata()
    getfirstpagedata()
    // newdata()
    getuseragee()
  }, [isFocused]);
  const getprifilledarray = async () => {
    var langg = await AsyncStorage.getItem("langugae")
    var token = await AsyncStorage.getItem("token");

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

        console.log("ghghggjjgjfguu", JSON.stringify(response.data.data));
        // if (response.data.status == true) {

        setAgeList(response.data.data.age_group)
        console.log("ghghghguuu", response.data.data.age_group)
        // console.log("yiyiy89989898989", response.data.data.group_composition)
        // }

      })
      .catch(function (error) {
        console.log("jfgdjkgdjsfgg", error);
      });

  }
  const getuseragee = async () => {
    var langg = await AsyncStorage.getItem("langugae")
    var token = await AsyncStorage.getItem("token");

    var axios = require('axios');

    var config = {
      method: 'get',
      url: constants.BASE_URL + "api/age_group_preference",
      headers: {
        // Authorization: "Bearer " + JSON.parse(token),
        "X-localization": langg==null?"da":langg,
      },
    };

    axios(config)
      .then(async (response) => {

        console.log("ghghggjjgjfguu", JSON.stringify(response.data.data));
        // if (response.data.status == true) {
          setComplete_profile(response.data.complete_profile)
          
        setAgeList1(response.data.data.age_group)
        console.log("ghghghguuu", response.data.data.age_group)
        // console.log("yiyiy89989898989", response.data.data.group_composition)
        // }

      })
      .catch(function (error) {
        console.log("jfgdjkgdjsfgg", error);
      });

  }
  const Fetchdata = async () => {

    var langg = await AsyncStorage.getItem("langugae");
    var token = await AsyncStorage.getItem("token");
    setProfileloader(true)
    var config = {
      method: 'get',
      url: constants.BASE_URL + "api/profile/preference",
      headers: {
        Authorization: "Bearer " + JSON.parse(token),
        "X-localization": langg==null?"da":langg,
      },
    };

    axios(config)
      .then(async (response) => {
        // console.log("hjjjkklllkjhh",response.data);
        // if(response.data.status==false){
        setProfileloader(false)
        getData1()
        await AsyncStorage.setItem("DATAA3", JSON.stringify(response.data.data))
        await AsyncStorage.setItem("FAMILY_COMPOSITION", JSON.stringify(response.data.data.family_composition))
        await AsyncStorage.setItem("GROUP_COMPOSITION", JSON.stringify(response.data.data.group_composition))
        await AsyncStorage.setItem("FAMILY_STYLE", JSON.stringify(response.data.data.family_style))
        await AsyncStorage.setItem("KIDS_OF_SPECIAL_NEEDS", JSON.stringify(response.data.data.kids_with_special_needs))
        await AsyncStorage.setItem("LANGG", JSON.stringify(response.data.data.preferred_language))
        await AsyncStorage.setItem("HOMECARE", JSON.stringify(response.data.data.home_care))
        await AsyncStorage.setItem("AGE_GROUP", JSON.stringify(response.data.data.age_group))
        // console.log("dfghfgfgh",JSON.stringify(response.data.data.age_group))
        // setGrpage(response.data.data.age_group)
        var zipArr = response.data.data.zipcodes.split(",")
        setPreZipcode(zipArr)

      })
      .catch(function (error) {
        // console.log(error);
        setProfileloader(false)
      });

  }

  const getData1 = async () => {

    var Group_composition = await AsyncStorage.getItem("GROUP_COMPOSITION")
    var family_Composition = await AsyncStorage.getItem("FAMILY_COMPOSITION")
    var family_stylee = await AsyncStorage.getItem("FAMILY_STYLE")
    var KIDS = await AsyncStorage.getItem("KIDS_OF_SPECIAL_NEEDS")
    var PREFFEREDLANG = await AsyncStorage.getItem("LANGG")
    var homecare = await AsyncStorage.getItem("HOMECARE")
    var cDATA = JSON.parse(Group_composition);
    var c2DATA = JSON.parse(family_Composition);
    var c3DATA = JSON.parse(family_stylee);
    var c4DATA = JSON.parse(KIDS);
    var c5DATA = JSON.parse(PREFFEREDLANG);
    var c6DATA = JSON.parse(homecare);
    if (cDATA !== null) {
      var str = cDATA;

      if (str !== "") {
        var strArray = str.split(",");
        if (strArray.includes("other_moms")) {
          setisChecked(true)
        } if (strArray.includes("other_dads")) {
          setisChecked1(true)
        } if (strArray.includes("mixed_gender_group")) {
          setisChecked2(true)
        }
      }
      var strf = c2DATA;
      if (strf !== "") {
        var strArrayf = strf.split(",");
        // console.log("CHECKKK=-=-=-=-=-=-=FAMILYYYYYYYYYYYY",strArrayf)
        if (strArrayf.includes("other_first_time_parents")) {
          setisChecked8(true)
        } if (strArrayf.includes("other_more_time_parents")) {
          setisChecked9(true)
        } if (strArrayf.includes("other_twin_or_triplet_parents")) {
          setisChecked4(true)
        }
        if (strArrayf.includes("mixed_group")) {
          setisChecked10(true)
        }
      }


      var strfs = c3DATA;
      if (strfs !== "") {
        var strArrayfS = strfs.split(",");
        // console.log("CHECKKK=-=-=-=-=-=-=",strArray)
        if (strArrayfS.includes("two_parent_home")) {
          setisChecked11(true)
        } if (strArrayfS.includes("one_parent_home")) {
          setisChecked12(true)
        } if (strArrayfS.includes("solo_parent")) {
          setisChecked13(true)
        }
        if (strArrayfS.includes("rainbow_family")) {
          setisChecked21(true)
        }
        if (strArrayfS.includes("others")) {
          setisChecked20(true)
        }
      }
      if (c4DATA == "Yes") {
        setisChecked14(true);
        setisChecked15(false);

      }
      else if (c4DATA == "Ja") {
        setisChecked14(true);

      }
      else if (c4DATA == "No") {
        setisChecked15(true);
        setisChecked14(false);
      }
      else if (c4DATA == "Nej") {
        setisChecked15(true);

      }

      if (c5DATA == "English") {
        setIsEnglish(true);
      }
      // else if (c5DATA == "engelsk") {
      //   setIsEnglish(true);
      // }
      else if (c5DATA == "Danish") {
        setIsDanish(true);
      }
      // else if (c5DATA =="Danish") {
      //   setIsDanish(true);
      // }
      if (c6DATA == "Yes") {
        setisChecked18(true)
      }
      // else if (c6DATA == "Yes") {
      //   setisChecked18(true)
      // } 
      // else if (c6DATA == "No") {
      //   setisChecked19(true)
      // }
      else if (c6DATA == "No") {
        setisChecked19(true)
      }
    }
  };

  const getUserPrefrence = async () => {

    var langg = await AsyncStorage.getItem("langugae")
    var token = await AsyncStorage.getItem("token");

    var axios = require('axios');
    setProfileloader(true)
    var config = {
      method: 'get',
      url: constants.BASE_URL + "api/group/user_complete_preference",
      headers: {
        Authorization: "Bearer " + JSON.parse(token),
        'X-localization': langg==null?"da":langg,
      },
    };
    axios(config)
      .then(async (response) => {
         console.log("fhfj987321fuyyy",response.data);
        if (response.data.status == true) {
          setProfileloader(false)
          await AsyncStorage.setItem("DATAA3", JSON.stringify(response.data.data))
          await AsyncStorage.setItem("FAMILY_COMPOSITION", JSON.stringify(response.data.data.family_composition))
          await AsyncStorage.setItem("GROUP_COMPOSITION", JSON.stringify(response.data.data.group_composition))
          await AsyncStorage.setItem("FAMILY_STYLE", JSON.stringify(response.data.data.family_style))
          await AsyncStorage.setItem("KIDS_OF_SPECIAL_NEEDS", JSON.stringify(response.data.data.kids_with_special_needs))
          await AsyncStorage.setItem("LANGG", JSON.stringify(response.data.data.preferred_language))
          await AsyncStorage.setItem("HOMECARE", JSON.stringify(response.data.data.home_care))
          await AsyncStorage.setItem("AGE_GROUP", JSON.stringify(response.data.data.age_group))
          // console.log("dfghfgfgh",JSON.stringify(response.data.data.age_group))

          var zipArr = response.data.data.zip_codes.split(",")
          setPreZipcode(zipArr)
          setGrpage(response.data.data.age_group)
          // +alert()

          setValue1(response.data.data.age_group)
          getDetails1()
        }
        else {
          setProfileloader(false)
        }

      })
      .catch(function (error) {
        // console.log(error);
        setProfileloader(false)
      });

  }

  const personalinfo = async () => {

    var langg = await AsyncStorage.getItem("langugae");

    var token = await AsyncStorage.getItem("token");
    var dtt3 = await AsyncStorage.getItem("C3_DETAIL");

    var cDATA = JSON.parse(dtt3);

    var config = {
      method: "get",
      url: constants.BASE_URL + "api/profile/personal/info",
      headers: {
        Authorization: "Bearer " + JSON.parse(token),
        "X-localization": langg==null?"da":langg,
      },
    };

    axios(config)
      .then(async (response) => {
        // console.log("hjjfgjhpppfgjg",response.data)

        if (response.data.status) {
          const data = await AsyncStorage.getItem("P_DETAIL");
          // console.log("hjhbnfg11jjjjj1ttt1rrrhfhd",data)
          var data123 = JSON.parse(data)

          var gender = data123.genders
          var p_name = data123.parent_name

          // setNamees(p_name)


          if (gender !== "") {
            setGenderNew(gender.toLowerCase())


          }
          else {
            setGenderNew(response.data.data.gender)
            setNamees(response.data.data.name)
          }
        }
      })

      .catch(function (error) {
        // console.log(error);
      });
  };

  const getDetails1 = async () => {
    var dtt = await AsyncStorage.getItem("P_DETAIL");
    var dtt3 = await AsyncStorage.getItem("C3_DETAIL");
    var Group_composition = await AsyncStorage.getItem("GROUP_COMPOSITION")
    var family_Composition = await AsyncStorage.getItem("FAMILY_COMPOSITION")
    var family_stylee = await AsyncStorage.getItem("FAMILY_STYLE")
    var KIDS = await AsyncStorage.getItem("KIDS_OF_SPECIAL_NEEDS")
    var PREFFEREDLANG = await AsyncStorage.getItem("LANGG")
    var homecare = await AsyncStorage.getItem("HOMECARE")
    var cDATA = JSON.parse(Group_composition);
    var c2DATA = JSON.parse(family_Composition);
    var c3DATA = JSON.parse(family_stylee);
    var c4DATA = JSON.parse(KIDS);
    var c5DATA = JSON.parse(PREFFEREDLANG);
    var c6DATA = JSON.parse(homecare);
  console.log("ghfhfhfjf",c3DATA)
    if (cDATA !== null) {
      var str = cDATA;

      if (str !== "") {
        var strArray = str.split(",");
        // console.log("CHECKKK=-=-=-=-=-=-=",strArray)
        if (strArray.includes("other_moms")) {
          setisChecked(true)
        } 
        if (strArray.includes("Andre_modre")) {
          setisChecked(true)
        } 
        if (strArray.includes("other_dads")) {
          setisChecked1(true)
        } 
        if (strArray.includes("other_dads")) {
          setisChecked1(true)
        } 
        if (strArray.includes("mixed_gender_group")) {
          setisChecked2(true)
        }
        if (strArray.includes("blandet_gruppe")) {
          setisChecked2(true)
        }
      }


      var strf = c2DATA;

      if (strf !== "") {
        var strArrayf = strf.split(",");
        // console.log("CHECKKK=-=-=-=-=-=-=FAMILYYYYYYYYYYYY",strArrayf)
        if (strArrayf.includes("other_first_time_parents")) {
          setisChecked8(true)
        } 
        if (strArrayf.includes("Andre_førstegangsforældre")) {
          setisChecked8(true)
        }
        if (strArrayf.includes("other_more_time_parents")) {
          setisChecked9(true)
        } 
        if (strArrayf.includes("flergangsforældre")) {
          setisChecked9(true)
        }if (strArrayf.includes("other_twin_or_triplet_parents")) {

          setisChecked4(true)
        }
        if (strArrayf.includes("Andre tvillinge-eller trillingforældre")) {

          setisChecked4(true)
        }
        if (strArrayf.includes("mixed_group")) {
          setisChecked10(true)
        }
        if (strArrayf.includes("blandet_gruppe")) {
          setisChecked10(true)
        }
      }


      var strfs = c3DATA;
      if (strfs !== "") {
        var strArrayfS = strfs.split(",");
        // console.log("CHECKKK=-=-=-=-=-=-=",strArray)
        if (strArrayfS.includes("two_parent_home")) {
          setisChecked11(true)
        } 
        if (strArrayfS.includes("Hjem_med_to_forældre")) {
          setisChecked11(true)
        }
        if (strArrayfS.includes("one_parent_home")) {
          setisChecked12(true)
        }
        if (strArrayfS.includes("Hjem_med_én_forælder")) {
          setisChecked12(true)
        } if (strArrayfS.includes("solo_parent")) {
          setisChecked13(true)
        }
        
        if (strArrayfS.includes("soloforælder")) {
          setisChecked13(true)
        }
        if (strArrayfS.includes("rainbow_family")) {
          setisChecked21(true)
        }
        if (strArrayfS.includes("regnbuefamilie")) {
          setisChecked21(true)
        }
        if (strArrayfS.includes("others")) {
          setisChecked20(true)
        }
        if (strArrayfS.includes("andre")) {
          setisChecked20(true)
        }
      }
      if (c4DATA == "Yes") {
        setisChecked14(true);
        setisChecked15(false);

      }
      else if (c4DATA == "Ja") {
        setisChecked14(true);

      }
      else if (c4DATA == "No") {
        setisChecked15(true);
        setisChecked14(false);
      }
      else if (c4DATA == "Nej") {
        setisChecked15(true);

      }

      if (c5DATA == "English") {
        setIsEnglish(true);
        setIsDanish(false);
      }
      else if (c5DATA == "engelsk") {
        setIsEnglish(true);
        setIsDanish(false);
      }
      else if (c5DATA == "Danish") {
        setIsDanish(true);
        setIsEnglish(false);
      }
      else if (c5DATA == "dansk") {
        setIsDanish(true);
        setIsEnglish(false);
      }
      if (c6DATA == "Yes") {
        setisChecked18(true)
        setisChecked19(false)
      }
      else if (c6DATA == "Ja") {
        setisChecked18(true)
        setisChecked19(false)
      }
      else if (c6DATA == "No") {
        setisChecked19(true)
        setisChecked18(false)
      }
      else if (c6DATA == "Nej") {
        setisChecked19(true)
        setisChecked18(false)
      }
    }

  };

  const Zip_code = async () => {
    var token = await AsyncStorage.getItem("token");
    var axios = require("axios");

    var config = {
      method: "get",
      // url: "https://development.brstdev.com:5076/api/zipcodes",
      url: constants.BASE_URL + "api/zipcodes",
      headers: {
        Authorization: "Bearer " + JSON.parse(token),
      },
    };
    axios(config)
      .then(function (response) {
        setZIP_code(response.data.data);
        // console.log("hfhffgchvbn",response.data.data)
      })
      .catch(function (error) { });
  };
  const Onsubmit = async () => {
    var THEME = route.params.GROUPTHEME1;
    // var THEMES=THEME.toString().replace("_", / /g, "_");
    const data1 = await AsyncStorage.getItem("P_DETAIL");
    var NEW_DETAILS = route.params.DETAILS

    // console.log("newwwfgfgfghdhdfh",NEW_DETAILS)
    // console.log("gfgfgfhdhdhdyery",data1)
    var data123 = JSON.parse(data1)
    var pname = data123.parent_name
    setNamees(pname)
    var dobb = data123.birth_date
    var postalcodess = data123.postalcode
    var relationships = data123.relations
    var childsname1 = data123.childnames
    var child1DOB = data123.childbirthdates
    var childsname2 = data123.childnames1
    var childDOB2 = data123.childbirthdates1
    var childsname3 = data123.childnames2
    var childDOB3 = data123.childbirthdates1
    var aa = "";
    if (isChecked == true) {
      aa = "other_moms";
    }
    if (isChecked1 == true) {
      aa = "other_dads";
    }
    if (isChecked2 == true) {
      aa = "mixed_gender_group";
    }
    if (isChecked && isChecked1) {
      aa = "other_moms" + "," + "other_dads";
    }
    if (isChecked1 && isChecked2) {
      aa = "other_dads" + "," + "mixed_gender_group";
    }
    if (isChecked && isChecked2) {
      aa = "other_moms" + "," + "mixed_gender_group";
    }
    if (isChecked && isChecked1 && isChecked2) {
      aa = "other_moms" + "," + "other_dads" + "," + "mixed_gender_group";
    }
    var bb = "";
    if (isChecked8 == true) {
      var bb = "other_first_time_parents";
    }
    if (isChecked9 == true) {
      bb = "other_more_time_parents";
    }
    if (isChecked4 == true) {
      bb = "other_twin_or_triplet_parents";
    }
    if (isChecked10 == true) {
      bb = "mixed_group";
    }
    if (isChecked4 && isChecked9) {
      bb = "other_twin_or_triplet_parents" + "," + "other_more_time_parents";
    }
    if (isChecked8 && isChecked9) {
      bb = "other_first_time_parents" + "," + "other_more_time_parents";
    }
    if (isChecked8 && isChecked10) {
      bb = "other_first_time_parents" + "," + "mixed_group";
    }
    if (isChecked9 && isChecked10) {
      bb = "other_more_time_parents" + "," + "mixed_group";
    }
    if (isChecked4 && isChecked8) {
      bb = "other_twin_or_triplet_parents" + "," + "other_first_time_parents";
    }
    if (isChecked4 && isChecked9) {
      bb = "other_twin_or_triplet_parents" + "," + "other_more_time_parents";
    }
    if (isChecked4 && isChecked9 && isChecked10) {
      bb =
        "other_twin_or_triplet_parents" +
        "," +
        "other_more_time_parents" +
        "," +
        "mixed_group";
    }

    if (isChecked8 && isChecked4 && isChecked10) {
      bb =
        "other_first_time_parents" +
        "," +
        "other_twin_or_triplet_parents" +
        "," +
        "mixed_group";
    }
    if (isChecked8 && isChecked9 && isChecked10) {
      bb =
        "other_first_time_parents" +
        "," +
        "other_more_time_parents" +
        "," +
        "mixed_group";
    }
    if (isChecked8 && isChecked9 && isChecked4) {
      bb =
        "other_first_time_parents" +
        "," +
        "other_more_time_parents" +
        "," +
        "other_twin_or_triplet_parents";
    }
    if (isChecked8 && isChecked9 && isChecked4 && isChecked10) {

      bb =
        "other_first_time_parents" +
        "," +
        "other_more_time_parents" +
        "," +
        "other_twin_or_triplet_parents" +
        "," +
        "mixed_group";
    }
    var cc = "";
    if (isChecked11 == true) {
      cc = "two_parent_home";
    }
    if (isChecked12 == true) {
      cc = "one_parent_home";
    }
    if (isChecked13 == true) {
      cc = "solo_parent";
    }
    if (isChecked21 == true) {
      cc = "rainbow_family";
    }
    if (isChecked20 == true) {
      cc = "others";
    }
    if (isChecked11 && isChecked12) {
      cc = "two_parent_home" + "," + "one_parent_home";
    }
    if (isChecked11 && isChecked13) {
      cc = "two_parent_home" + "," + "solo_parent";
    }
    if (isChecked11 && isChecked20) {
      cc = "two_parent_home" + "," + "rainbow_family";
    }
    if (isChecked11 && isChecked21) {
      cc = "one_parent_home" + "," + "others";
    }
    if (isChecked12 && isChecked13) {
      cc = "one_parent_home" + "," + "solo_parent";
    }
    if (isChecked12 && isChecked21) {
      cc = "one_parent_home" + "," + "rainbow_family";
    }
    if (isChecked12 && isChecked20) {
      cc = "one_parent_home" + "," + "others";
    }
    if (isChecked13 && isChecked20) {
      cc = "solo_parent" + "," + "others";
    }
    if (isChecked13 && isChecked21) {
      cc = "solo_parent" + "," + "rainbow_family";
    }
    if (isChecked13 && isChecked11) {
      cc = "solo_parent" + "," + "one_parent_home";
    }
    if (isChecked21 && isChecked20) {
      cc = "rainbow_family" + "," + "others";
    }

    if (isChecked11 && isChecked12 && isChecked13) {
      cc = "one_parent_home" + "," + "two_parent_home" + "," + "solo_parent";
    }
    if (isChecked11 && isChecked12 && isChecked21) {
      cc =
        "one_parent_home" + "," + "two_parent_home" + "," + "rainbow_family";
    }
    if (isChecked11 && isChecked12 && isChecked20) {
      cc = "one_parent_home" + "," + "two_parent_home" + "," + "others";
    }
    if (isChecked11 && isChecked13 && isChecked20) {
      cc = "one_parent_home" + "," + "solo_parent" + "," + "others";
    }
    if (isChecked11 && isChecked13 && isChecked21) {
      cc = "one_parent_home" + "," + "solo_parent" + "," + "rainbow_family";
    }
    if (isChecked11 && isChecked12 && isChecked21) {
      cc =
        "one_parent_home" + "," + "two_parent_home" + "," + "rainbow_family";
    }
    if (isChecked11 && isChecked20 && isChecked21) {
      cc = "one_parent_home" + "," + "others" + "," + "rainbow_family";
    }
    if (isChecked12 && isChecked20 && isChecked21) {
      cc = "two_parent_home" + "," + "others" + "," + "rainbow_family";
    }
    if (isChecked13 && isChecked20 && isChecked21) {
      cc = "solo_parent" + "," + "others" + "," + "rainbow_family";
    }
    if (isChecked12 && isChecked13 && isChecked21) {
      cc = "two_parent_home" + "," + "solo_parent" + "," + "rainbow_family";
    }
    if (isChecked12 && isChecked13 && isChecked20) {
      cc = "two_parent_home" + "," + "solo_parent" + "," + "others";
    }
    if (isChecked11 && isChecked12 && isChecked13 && isChecked20) {
      cc =
        "two_parent_home" +
        "," +
        "one_parent_home" +
        "," +
        "solo_parent" +
        "," +
        "others";
    }
    if (isChecked11 && isChecked12 && isChecked20 && isChecked21) {
      cc =
        "two_parent_home" +
        "," +
        "one_parent_home" +
        "," +
        "solo_parent" +
        "," +
        "rainbow_family";
    }
    if (isChecked11 && isChecked13 && isChecked20 && isChecked21) {
      cc =
        "two_parent_home" +
        "," +
        "solo_parent" +
        "," +
        "rainbow_family" +
        "," +
        "others";
    }
    if (isChecked12 && isChecked13 && isChecked20 && isChecked21) {
      cc =
        "one_parent_home" +
        "," +
        "solo_parent" +
        "," +
        "rainbow_family" +
        "," +
        "others";
    }
    if (isChecked11 && isChecked12 && isChecked13 && isChecked21) {
      cc =
        "two_parent_home" +
        "," +
        "one_parent_home" +
        "," +
        "solo_parent" +
        "," +
        "rainbow_family";
    }
    if (isChecked11 && isChecked12 && isChecked13 && isChecked21 && isChecked20
    ) {
      cc =
        "two_parent_home" +
        "," +
        "one_parent_home" +
        "," +
        "solo_parent" +
        "," +
        "rainbow_family" +
        "," +
        "others";
    }

    var dd = "";
    if (isChecked18 == true) {
      dd = "yes";
    }
    if (isChecked19 == true) {
      dd = "no";
    }
    var ee = "";
    if (isDanish == true) {
      ee = "Danish";
    }
    if (isEnglish == true) {
      ee = "English";
    }
    var token = await AsyncStorage.getItem("token");
    var USERID = await AsyncStorage.getItem("user_id");
    var langg = await AsyncStorage.getItem("langugae");
    var token = await AsyncStorage.getItem("token");
    var langg = await AsyncStorage.getItem("langugae")
    var USERID = await AsyncStorage.getItem("user_id");
    var lg = "";
    var kid = "";
    var home = "";
    if (isDanish) {
      lg = t("Danish");
    } else if (isEnglish) {
      lg = t("English");
    }
    if (isChecked14) {
      kid = t("Yes");
    } else if (isChecked15) {
      kid = t("No");
    }
    if (isChecked18) {
      home = t("Yes");
    } if (isChecked19) {
      home = t("No");
    }

    if (aa == "") {
      alert(t("Please choose group composition"))
    }
    else if (bb == "") {
      alert(t("Please choose family composition"))
    }
    else if (cc == "") {
      alert(t("Please choose family style"))
    }
    else if (kid == "") {
      alert(t("Please select kid's with special needs"))
    }
    else if (lg == "") {
      alert(t("Please select prefered language"))
    }
    else if (home == "") {
      alert(t("Please select  home care"))
    }
    else if (grpage == "") {
      alert(t("Please choose age group"))
    }
    else if (preZipCode == "") {
      alert(t("Please choose Zipcodes"))
    }

    else {

      setLoader(true);
      var data = new FormData();
      data.append("name", pname)
      data.append("gender", genderNew);
      data.append("dob", dobb);
      data.append("postal", postalcodess);
      data.append("relationship", relationships);
      data.append(
        "group_theme",
        THEME.toString().replace("_", / /g, "_") == undefined ? "chill,active,culture" : THEME.toString().replace("_", / /g, "_")
      );
      data.append("group_composition", aa);
      data.append("age_group", grpage.toString().replace("_", / /g, "_"));
      data.append("zip_codes", preZipCode);
      data.append("children[0][name]", childsname1);
      data.append("children[0][dob]", child1DOB);
      data.append("children[1][name]", childsname2);
      data.append("children[1][dob]", childDOB2);
      data.append("children[2][name]", childsname3);
      data.append("children[2][dob]", childDOB3);
      data.append("family_composition", bb);
      data.append("family_style", cc);
      data.append("kids_with_special_needs", kid.toString().replace("_", / /g, "_"));
      data.append("preferred_language", lg.toString().replace("_", / /g, "_"));
      data.append("home_care", home.toString().replace("_", / /g, "_"));
      data.append("save_type", 1);

      console.log("bnvbbmmbbm", data)
      // console.log("hjhjllTHEMEMEE",THEME)

      var obje = {
        group_composition: aa,
        family_composition: bb,
        family_style: cc,
        kids_with_special_needs: kid,
        preferred_language: lg,
        home_care: home,
        age_group: age,
        zip_codes: zipcode,
        SAVE: savetype,
      };

      // console.log("OBJECT=-=-=[", JSON.stringify(obje));
      var config = {
        method: "post",
        // url: "https://development.brstdev.com:5076/api/profile/setup",
        url: constants.BASE_URL + "api/profile/setup",
        headers: {
          Authorization: "Bearer " + JSON.parse(token),
          "X-localization": langg==null?"da":langg,
        },
        data: data,
      };

      axios(config)
        .then(async (response) => {
          console.log("iiiiiiiiiii", response.data);
          setLoader(false);
          if (response.data.status == true) {
            setLoader(false);

            await AsyncStorage.setItem("logged", "true");
            var Profiledetail = {
              theme: grp_theme,
              location: grp_location,
              age: grpage,
            };
            setSavetype(response.data.type)
            // console.log("uouiu",response.data.type)
            await AsyncStorage.setItem("P_DETAIL", JSON.stringify(DETAILS));
            // console.log("anshuudsfsuuuuu",DETAILS)
            await AsyncStorage.setItem("C3_DETAIL", JSON.stringify(obje));
            await AsyncStorage.setItem("C2_DETAIL", JSON.stringify(THEME))
            navigation.navigate("MyTabs");
          } else {
            await AsyncStorage.setItem("logged", "true");
            await AsyncStorage.setItem("P_DETAIL", JSON.stringify(DETAILS));
            // console.log("fhgdfds",JSON.stringify(DETAILS))
            await AsyncStorage.setItem("C2_DETAIL", JSON.stringify(THEME))
            await AsyncStorage.setItem("C3_DETAIL", JSON.stringify(obje));
            navigation.navigate("MyTabs");
          }
        })
        .catch(function (error) {
          // console.log("YESSSS", error);
          setLoader(false);
        });
    };
  }
  const onsave = async () => {
    var THEME = route.params.GROUPTHEME1;
    const data1 = await AsyncStorage.getItem("P_DETAIL");
    // console.log("hjhbnfg111ffffttt1rrrhfhd",data1)
    var data123 = JSON.parse(data1)
    var pname = data123.parent_name
    var dobb = data123.birth_date
    var postalcodess = data123.postalcode
    var relationships = data123.relations
    var childsname1 = data123.childnames
    var child1DOB = data123.childbirthdates
    var childsname2 = data123.childnames1
    var childDOB2 = data123.childbirthdates1
    var childsname3 = data123.childnames2
    var childDOB3 = data123.childbirthdates1
    var aa = "";
    if (isChecked == true) {
      aa = "other_moms";
    }
    if (isChecked1 == true) {
      aa = "other_dads";
    }
    if (isChecked2 == true) {
      aa = "mixed_gender_group";
    }
    if (isChecked && isChecked1) {
      aa = "other_moms" + "," + "other_dads";
    }
    if (isChecked1 && isChecked2) {
      aa = "other_dads" + "," + "mixed_gender_group";
    }
    if (isChecked && isChecked2) {
      aa = "other_moms" + "," + "mixed_gender_group";
    }
    if (isChecked && isChecked1 && isChecked2) {
      aa = "other_moms" + "," + "other_dads" + "," + "mixed_gender_group";
    }
    var bb = "";
    if (isChecked8 == true) {
      var bb = "other_first_time_parents";
    }
    if (isChecked9 == true) {
      bb = "other_more_time_parents";
    }
    if (isChecked4 == true) {
      bb = "other_twin_triplet parents";
    }
    if (isChecked10 == true) {
      bb = "mixed_group";
    }
    if (isChecked4 && isChecked9) {
      bb = "other_twin_or_triplet_parents" + "," + "other_more_time_parents";
    }
    if (isChecked8 && isChecked9) {
      bb = "other_first_time_parents" + "," + "other_more_time_parents";
    }
    if (isChecked8 && isChecked10) {
      bb = "other_first_time_parents" + "," + "mixed_group";
    }
    if (isChecked9 && isChecked10) {
      bb = "other_more_time_parents" + "," + "mixed_group";
    }
    if (isChecked4 && isChecked8) {
      bb = "other_twin_or_triplet_parents" + "," + "other_first_time_parents";
    }
    if (isChecked4 && isChecked9) {
      bb = "other_twin_or_triplet_parents" + "," + "other_more_time_parents";
    }
    if (isChecked4 && isChecked9 && isChecked10) {
      bb =
        "other_twin_or_triplet_parents" +
        "," +
        "other_more_time_parents" +
        "," +
        "mixed_group";
    }

    if (isChecked8 && isChecked4 && isChecked10) {
      bb =
        "other_first_time_parents" +
        "," +
        "other_twin_or_triplet_parents" +
        "," +
        "mixed_group";
    }
    if (isChecked8 && isChecked9 && isChecked10) {
      bb =
        "other_first_time_parents" +
        "," +
        "other_more_time_parents" +
        "," +
        "mixed_group";
    }
    if (isChecked8 && isChecked9 && isChecked4) {
      bb =
        "other_first_time_parents" +
        "," +
        "other_more_time_parents" +
        "," +
        "other_twin_or_triplet_parents";
    }
    if (isChecked8 && isChecked9 && isChecked4 && isChecked10) {

      bb =
        "other_first_time_parents" +
        "," +
        "other_more_time_parents" +
        "," +
        "other_twin_or_triplet_parents" +
        "," +
        "mixed_group";
    }
    var cc = "";
    if (isChecked11 == true) {
      cc = "two_parent_home";
    }
    if (isChecked12 == true) {
      cc = "one_parent_home";
    }
    if (isChecked13 == true) {
      cc = "solo_parent";
    }
    if (isChecked21 == true) {
      cc = "rainbow_family";
    }
    if (isChecked20 == true) {
      cc = "others";
    }
    if (isChecked11 && isChecked12) {
      cc = "two_parent_home" + "," + "one_parent_home";
    }
    if (isChecked11 && isChecked13) {
      cc = "two_parent_home" + "," + "solo_parent";
    }
    if (isChecked11 && isChecked20) {
      cc = "two_parent_home" + "," + "rainbow_family";
    }
    if (isChecked11 && isChecked21) {
      cc = "one_parent_home" + "," + "others";
    }
    if (isChecked12 && isChecked13) {
      cc = "one_parent_home" + "," + "solo_parent";
    }
    if (isChecked12 && isChecked21) {
      cc = "one_parent_home" + "," + "rainbow_family";
    }
    if (isChecked12 && isChecked20) {
      cc = "one_parent_home" + "," + "others";
    }
    if (isChecked13 && isChecked20) {
      cc = "solo_parent" + "," + "others";
    }
    if (isChecked13 && isChecked21) {
      cc = "solo_parent" + "," + "rainbow_family";
    }
    if (isChecked13 && isChecked11) {
      cc = "solo_parent" + "," + "one_parent_home";
    }
    if (isChecked21 && isChecked20) {
      cc = "rainbow_family" + "," + "others";
    }

    if (isChecked11 && isChecked12 && isChecked13) {
      cc = "one_parent_home" + "," + "two_parent_home" + "," + "solo_parent";
    }
    if (isChecked11 && isChecked12 && isChecked21) {
      cc =
        "one_parent_home" + "," + "two_parent_home" + "," + "rainbow_family";
    }
    if (isChecked11 && isChecked12 && isChecked20) {
      cc = "one_parent_home" + "," + "two_parent_home" + "," + "others";
    }
    if (isChecked11 && isChecked13 && isChecked20) {
      cc = "one_parent_home" + "," + "solo_parent" + "," + "others";
    }
    if (isChecked11 && isChecked13 && isChecked21) {
      cc = "one_parent_home" + "," + "solo_parent" + "," + "rainbow_family";
    }
    if (isChecked11 && isChecked12 && isChecked21) {
      cc =
        "one_parent_home" + "," + "two_parent_home" + "," + "rainbow_family";
    }
    if (isChecked11 && isChecked20 && isChecked21) {
      cc = "one_parent_home" + "," + "others" + "," + "rainbow_family";
    }
    if (isChecked12 && isChecked20 && isChecked21) {
      cc = "two_parent_home" + "," + "others" + "," + "rainbow_family";
    }
    if (isChecked13 && isChecked20 && isChecked21) {
      cc = "solo_parent" + "," + "others" + "," + "rainbow_family";
    }
    if (isChecked12 && isChecked13 && isChecked21) {
      cc = "two_parent_home" + "," + "solo_parent" + "," + "rainbow_family";
    }
    if (isChecked12 && isChecked13 && isChecked20) {
      cc = "two_parent_home" + "," + "solo_parent" + "," + "others";
    }
    if (isChecked11 && isChecked12 && isChecked13 && isChecked20) {
      cc =
        "two_parent_home" +
        "," +
        "one_parent_home" +
        "," +
        "solo_parent" +
        "," +
        "others";
    }
    if (isChecked11 && isChecked12 && isChecked20 && isChecked21) {
      cc =
        "two_parent_home" +
        "," +
        "one_parent_home" +
        "," +
        "solo_parent" +
        "," +
        "rainbow_family";
    }
    if (isChecked11 && isChecked13 && isChecked20 && isChecked21) {
      cc =
        "two_parent_home" +
        "," +
        "solo_parent" +
        "," +
        "rainbow_family" +
        "," +
        "others";
    }
    if (isChecked12 && isChecked13 && isChecked20 && isChecked21) {
      cc =
        "one_parent_home" +
        "," +
        "solo_parent" +
        "," +
        "rainbow_family" +
        "," +
        "others";
    }
    if (isChecked11 && isChecked12 && isChecked13 && isChecked21) {
      cc =
        "two_parent_home" +
        "," +
        "one_parent_home" +
        "," +
        "solo_parent" +
        "," +
        "rainbow_family";
    }
    if (isChecked11 && isChecked12 && isChecked13 && isChecked21 && isChecked20
    ) {
      cc =
        "two_parent_home" +
        "," +
        "one_parent_home" +
        "," +
        "solo_parent" +
        "," +
        "rainbow_family" +
        "," +
        "others";
    }

    var dd = "";
    if (isChecked18 == true) {
      dd = "yes";
    }
    if (isChecked19 == true) {
      dd = "no";
    }
    var ee = "";
    if (isChecked16 == true) {
      ee = "danish";
    }
    if (isChecked17 == true) {
      ee = "english";
    }
    var token = await AsyncStorage.getItem("token");
    var USERID = await AsyncStorage.getItem("user_id");

    var token = await AsyncStorage.getItem("token");

    var USERID = await AsyncStorage.getItem("user_id");
    var lg = "";
    var kid = "";
    var home = "";
    if (isDanish) {
      lg = t("Danish");
    } else if (isEnglish) {
      lg = t("English");
    }
    if (isChecked14) {
      kid = t("Yes");
    } else if (isChecked15) {
      kid = t("No");
    }
    if (isChecked18) {
      home = t("Yes");
    } if (isChecked19) {
      home = t("No");
    }

    if (aa == "") {
      alert(t("Please choose group composition"))
    }
    else if (bb == "") {
      alert("Please choose family composition")
    }
    else if (cc == "") {
      alert("Please choose family style")
    }
    else if (kid == "") {
      alert("Please select kid's with special needs")
    }
    else if (home == "") {
      alert("Please select  home care")
    }
    else if (age == "") {
      alert("Please choose age group")
    }
    else if (zipcode == "") {
      alert("Please choose Zipcodes")
    }

    else {
      var data = new FormData();
      data.append("name", pname)
      data.append("gender", genderNew);
      data.append("dob", dobb);
      data.append("postal", postalcodess);
      data.append("relationship", relationships);
      data.append(
        "group_theme",
        THEME == undefined ? "chill,active,culture" : THEME
      );
      data.append("group_composition", aa);
      data.append("age_group", grpage);
      data.append("zip_codes", preZipCode);
      data.append("children[0][name]", childsname1);
      data.append("children[0][dob]", child1DOB);
      data.append("children[1][name]", childsname2);
      data.append("children[1][dob]", childDOB2);
      data.append("children[2][name]", childsname3);
      data.append("children[2][dob]", childDOB3);
      data.append("family_composition", bb);
      data.append("family_style", cc);
      data.append("kids_with_special_needs", kid);
      data.append("preferred_language", lg);
      data.append("home_care", home);
      data.append("save_type", 0);
      data.append("page_no", 3);

      // console.log("FORMDATATATATAAT",data)
      var obje = {
        group_composition: aa,
        family_composition: bb,
        family_style: cc,
        kids_with_special_needs: kid,
        preferred_language: lg,
        home_care: home,
        age_group: age,
        zip_codes: zipcode,

      };

      // console.log("OBJECT=-=-=[", JSON.stringify(obje));
      var config = {
        method: "post",
        // url: "https://development.brstdev.com:5076/api/profile/setup",
        url: constants.BASE_URL + "api/profile/save_for_later",
        headers: {
          Authorization: "Bearer " + JSON.parse(token),
        },
        data: data,
      };

      axios(config)
        .then(async (response) => {
          // console.log("8766543edd", response.data);

          if (response.data.status == true) {
            await AsyncStorage.setItem("logged", "true");
            var Profiledetail = {
              theme: grp_theme,
              location: grp_location,
              age: grpage,
            };

            await AsyncStorage.setItem("P_DETAIL", JSON.stringify(DETAILS));
            await AsyncStorage.setItem("C3_DETAIL", JSON.stringify(obje));
            await AsyncStorage.setItem("C2_DETAIL", JSON.stringify(THEME))
            navigation.navigate("MyTabs");
          } else {
            await AsyncStorage.setItem("logged", "true");
            await AsyncStorage.setItem("P_DETAIL", JSON.stringify(DETAILS));
            await AsyncStorage.setItem("C2_DETAIL", JSON.stringify(THEME))
            await AsyncStorage.setItem("C3_DETAIL", JSON.stringify(obje));
            navigation.navigate("MyTabs");
          }
        })
        .catch(function (error) {
          // console.log("YESSSS", error.response.data);
          setLoader(false);
        });
    };
  }

  return (
    <View style={Style.MainContainer}>
      <ImageBackground
        style={Style.ImageBackground}
        source={require("../../../src/asset/Splash.png")}
      >
        {/* {profileloader == true ? (
              <ActivityIndicator size="small" color="#008080" style={{marginTop:300}} />
            ) : ( */}
        <View>
          <View style={{ height: 250 }}>
            <ImageBackground
              resizeMode="stretch"
              style={Style.ImageBackground1}
              source={require("../../../src/asset/Ellipse-bg.png")}
            >
              <View>
                <View style={{ flex: 0.2, flexDirection: "row" }}>
                  <TouchableOpacity
                    onPress={() => navigation.goBack()}
                    style={Style.backBtn}
                  >
                    <Image
                      style={Style.img}
                      source={require("../../asset/back-button.png")}
                    />
                  </TouchableOpacity>
                </View>
                <View style={Style.VieewProfile}>
                  <Text style={Style.TextProfile}>
                    {t("Complete profile")}{" "}
                  </Text>
                  <Image
                    style={Style.img1}
                    source={require("../../asset/Steps(3).png")}
                  />
                </View>
              </View>
            </ImageBackground>
          </View>
          <ScrollView style={{ marginBottom: 250, marginTop: 30 }}>

            <View style={Style.View3}>
              <Text style={Style.set}>{t("Set group preferences")}</Text>
              <Text style={Style.set2}>
                {t(
                  "Here you will be able to select your preferences for how the group should be composed"
                )}
              </Text>
              <Text style={Style.set3}>{t("Group composition")}</Text>

              <View style={Style.Check}>

                {(genderNew == t("female") || genderNew == t("other")) && (
                  <View style={Style.View4}>
                    <Checkbox
                      style={Style.Check1}
                      value={isChecked}
                      onValueChange={setisChecked}
                      color={isChecked ? "#008080" : undefined}
                    />

                    <Text style={Style.txt}>{t("Other moms")}</Text>
                  </View>
                )

                }
                {(genderNew == t("male") || genderNew == t("other")) && (
                  <View style={Style.View4}>
                    <Checkbox
                      style={Style.Check1}
                      value={isChecked1}
                      onValueChange={setisChecked1}
                      color={isChecked1 ? "#008080" : undefined}
                    />
                    <Text style={Style.txt}>{t("Other dads")}</Text>
                  </View>
                )}
                <View style={Style.View4}>
                  <Checkbox
                    style={Style.Check1}
                    value={isChecked2}
                    onValueChange={setisChecked2}
                    color={isChecked2 ? "#008080" : undefined}
                  />
                  <Text style={Style.txt}>{t("Mixed gender group")}</Text>
                </View>
              </View>


              <Text style={Style.set3}>{t("Family composition")}</Text>
              <View style={Style.Check}>
                <View style={Style.View4}>
                  <Checkbox
                    style={Style.Check1}
                    value={isChecked8}
                    onValueChange={setisChecked8}
                    color={isChecked8 ? "#008080" : undefined}
                  />
                  <Text style={Style.txt}>{t("Other first-time parents")}</Text>
                </View>
                <View style={Style.View4}>
                  <Checkbox
                    style={Style.Check1}
                    value={isChecked9}
                    onValueChange={setisChecked9}
                    color={isChecked9 ? "#008080" : undefined}
                  />
                  <Text style={Style.txt}>{t("Other more-time parents")}</Text>
                </View>

                <View style={Style.View4}>
                  <Checkbox
                    style={Style.Check1}
                    value={isChecked4}
                    onValueChange={setisChecked4}
                    color={isChecked4 ? "#008080" : undefined}
                  />
                  <Text style={Style.txt}>
                    {t("Other twin or triplet parents")}
                  </Text>
                </View>
                <View style={Style.View4}>
                  <Checkbox
                    style={Style.Check1}
                    value={isChecked10}
                    onValueChange={setisChecked10}
                    color={isChecked10 ? "#008080" : undefined}
                  />
                  <Text style={Style.txt}>{t("Mixed group")}</Text>
                </View>
              </View>

              <Text style={Style.set3}>{t("Family style")}</Text>
              <View style={Style.Check}>
                <View style={Style.View4}>
                  <Checkbox
                    style={Style.Check1}
                    value={isChecked11}
                    onValueChange={setisChecked11}
                    color={isChecked11 ? "#008080" : undefined}
                  />
                  <Text style={Style.txt}>{t("Two-parent home")}</Text>
                </View>
                <View style={Style.View4}>
                  <Checkbox
                    style={Style.Check1}
                    value={isChecked12}
                    onValueChange={setisChecked12}
                    color={isChecked12 ? "#008080" : undefined}
                  />
                  <Text style={Style.txt}>{t("One-parent home")}</Text>
                </View>
                <View style={Style.View4}>
                  <Checkbox
                    style={Style.Check1}
                    value={isChecked13}
                    onValueChange={setisChecked13}
                    color={isChecked13 ? "#008080" : undefined}
                  />
                  <Text style={Style.txt}>{t("Solo parent")}</Text>
                </View>
                <View style={Style.View4}>
                  <Checkbox
                    style={Style.Check1}
                    value={isChecked21}
                    onValueChange={setisChecked21}
                    color={isChecked21 ? "#008080" : undefined}
                  />
                  <Text style={Style.txt}>{t("Rainbow family")}</Text>
                </View>
                <View style={Style.View4}>
                  <Checkbox
                    style={Style.Check1}
                    value={isChecked20}
                    onValueChange={setisChecked20}
                    color={isChecked20 ? "#008080" : undefined}
                  />
                  <Text style={Style.txt}>{t("Others")}</Text>
                </View>
              </View>
              <Text style={Style.set3}>{t("Kids with special needs")}</Text>
              <View style={Style.Check}>
                <View style={Style.View4}>
                  <Checkbox
                    style={Style.Check1}
                    value={isChecked14}
                    onValueChange={() => { setisChecked14(true), setisChecked15(false) }}
                    color={isChecked14 ? "#008080" : undefined}
                  />
                  <Text style={Style.txt}>{t("Yes")}</Text>
                </View>

                <View style={Style.View4}>
                  <Checkbox
                    style={Style.Check1}
                    value={isChecked15}
                    onValueChange={() => { setisChecked14(false), setisChecked15(true) }}
                    color={isChecked15 ? "#008080" : undefined}
                  />
                  <Text style={Style.txt}>{t("No")}</Text>
                </View>
              </View>

              <Text style={Style.set3}>{t("Preferred language")}</Text>
              <View style={Style.Check}>
                <View style={Style.View4}>
                  <Checkbox
                    style={Style.Check1}
                    value={isDanish}
                    // isEnglish={false}
                    onValueChange={() => { setIsEnglish(false), setIsDanish(true) }}
                    color={isDanish ? "#008080" : undefined}
                  />
                  <Text style={Style.txt}>{t("Danish")}</Text>
                </View>
                <View style={Style.View4}>
                  <Checkbox
                    style={Style.Check1}
                    value={isEnglish}
                    // isDanish={false}
                    onValueChange={() => { setIsEnglish(true), setIsDanish(false) }}
                    color={isEnglish ? "#008080" : undefined}
                  />
                  <Text style={Style.txt}>{t("English")}</Text>
                </View>
              </View>

              <Text style={Style.set3}>{t("Home care")}</Text>
              <View style={Style.Check}>
                <View style={Style.View4}>
                  <Checkbox
                    style={Style.Check1}
                    value={isChecked18}
                    onValueChange={() => { setisChecked18(true), setisChecked19(false) }}
                    color={isChecked18 ? "#008080" : undefined}
                  />
                  <Text style={Style.txt}>{t("Yes")}</Text>
                </View>
                <View style={Style.View4}>
                  <Checkbox
                    style={Style.Check1}
                    value={isChecked19}
                    onValueChange={() => { setisChecked18(false), setisChecked19(true) }}
                    color={isChecked19 ? "#008080" : undefined}
                  />
                  <Text style={Style.txt}>{t("No")}</Text>
                </View>
              </View>

              <Text
                style={{
                  marginTop: 30,
                  fontSize: 14,
                  fontFamily: "Axiforma-Bold",
                  color: "#737373",
                  marginLeft: "2%",
                }}
              >
                {t("Age group")}
              </Text>

              <View style={Style.dropDownView}>
                <Dropdown
                  style={[Style.dropdown]}
                  // data={ageList}
                  data={complete_profile==false?ageList1:ageList}
                  iconColor="grey"
                  pickerStyle={{ color: "blue" }}
                  maxHeight={200}
                  labelField="name"
                  valueField="value"
                  placeholder={t("Select age")}
                  itemTextStyle={{ color: "grey" }}
                  containerStyle={{ borderRadius: 5 }}
                  selectedTextStyle={{ color: "grey" }}
                  placeholderStyle={{
                    fontFamily: "Axiforma-Regular",
                    fontSize: 13,
                    color: "grey",
                  }}
                  value={grpage}
                  onFocus={() => setIsFocus1(true)}
                  onBlur={() => setIsFocus1(false)}
                  onChange={(item) => {
                    setValue1(item.value);
                    setIsFocus1(false);
                    setAge(item.value);
                    setGrpage(item.value)
                  }}
                />


              </View>
              <Text
                style={{
                  marginTop: 10,
                  fontSize: 14,
                  fontFamily: "Axiforma-Bold",
                  color: "#737373",
                  marginLeft: "2%",
                }}
              >
                {t("Zip code(s)")}
              </Text>

              <View style={Style.dropDownView}>
                <View style={Style.container}>
                  <MultiSelect
                    style={Style.dropdown1}
                    placeholderStyle={Style.placeholderStyle}
                    selectedTextStyle={Style.selectedTextStyle}
                    inputSearchStyle={Style.inputSearchStyle1}
                    itemContainerStyle={{ backgroundColor: "" }}
                    containerStyle={{ backgroundColor: "#F9FBDB" }}
                    iconStyle={Style.iconStyle}
                    itemTextStyle={{ color: "grey" }}
                    searchPlaceholder={t("Search here")}
                    data={Zipcode}
                    labelField="zipcode"
                    valueField="zipcode"
                    placeholder={t("The bigger geographical range you choose, the higher chance of getting a group that matches on most preferences")}
                    value={preZipCode}
                    search
                    onChange={(item) => {
                      // searchFilterFunction(item)
                      setSelected(item);
                      setZipcode(item);
                      setPreZipcode(item)
                    }}
                    selectedStyle={Style.selectedStyle}
                  />

                </View>
              </View>

              <View
                style={{
                  flexDirection: "row",
                  alignItems: "flex-start",
                  marginTop: 10,
                }}
              ></View>

              <View style={Style.View10}>
                <TouchableOpacity
                  style={{ marginLeft: "5%" }}
                  onPress={toggleModal}
                >
                  <Text
                    style={{
                      fontSize: 18,
                      color: "grey",
                      fontFamily: "Axiforma-Regular",
                    }}
                  >
                    {t("Save for later")}
                  </Text>
                </TouchableOpacity>

                <TouchableOpacity
                  style={Style.View12}
                  onPress={() => Onsubmit()}
                >
                  {loader == true ? (
                    <ActivityIndicator size="small" color="white" />
                  ) : (
                    <Text style={Style.text3}>{t("Next")}</Text>
                  )}
                </TouchableOpacity>
              </View>
              {isModalVisible == true && (
                <Modal isVisible={isModalVisible}>
                  <View
                    style={{
                      justifyContent: "center",
                      backgroundColor: "white",
                      borderRadius: 15,
                      shadowColor: "#737373",
                      marginHorizontal: 20,
                      shadowOffset: { width: 2, height: 4 },
                      shadowOpacity: 0.3,
                      shadowRadius: 3,
                      elevation: 10,
                    }}
                  >
                    <View
                      style={{
                        backgroundColor: "white",
                        paddingTop: 15,
                        borderRadius: 15,
                        paddingBottom: "15%",
                        marginHorizontal: 15,
                        alignItems: "center",
                      }}
                    >
                      <TouchableOpacity
                        onPress={toggleModal}
                        style={{ marginLeft: "10%" }}
                      >
                        <Image
                          style={{ height: hp(3), width: hp(3) }}
                          resizeMode="contain"
                          source={require("../../asset/cross.png")}
                        />
                      </TouchableOpacity>
                      <TouchableOpacity
                        onPress={toggleModal}
                        style={{ alignItems: "center" }}
                      >
                        <Image
                          style={{ height: hp(15), width: hp(15) }}
                          resizeMode="contain"
                          source={require("../../asset/Ciricle.png")}
                        />
                      </TouchableOpacity>

                      <View style={{ alignItems: "center", marginTop: 5 }}>
                        <Text
                          style={{
                            fontSize: 26,
                            fontFamily: "Axiforma-Bold",
                            color: "grey",
                            lineHeight: 30,
                          }}
                        >
                          {t("Your data has been saved until you return, please be aware that until your profile has been created, you will not be able to join any groups")}
                        </Text>
                      </View>
                      <View style={{ marginTop: 30, flexDirection: "row" }}>
                        <TouchableOpacity
                          style={Style.NoBtn}
                          onPress={toggleModal}
                        >
                          <Text
                            style={{
                              alignSelf: "center",
                              color: "white",
                              fontSize: 16,
                              fontFamily: "Axiforma-Bold",
                            }}
                          >
                            {" "}
                            {t("No")}
                          </Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                          style={Style.YesBtn}
                          onPress={() => {
                            onsave(), toggleModal(false);
                          }}
                        >
                          <Text
                            style={{
                              alignSelf: "center",
                              color: "white",
                              fontSize: 16,
                              fontFamily: "Axiforma-Bold",
                            }}
                          >
                            {" "}
                            {t("Yes")}{" "}
                          </Text>
                        </TouchableOpacity>
                      </View>
                    </View>
                  </View>
                </Modal>
              )}
            </View>
          </ScrollView>
        </View>
        {/* )
            } */}
      </ImageBackground>
    </View>
  );
};
const full_app = withTranslation()(CompleteProfileStep3);
export default full_app;
const Style = StyleSheet.create({
  MainContainer: {
    flex: 1,
  },
  txt: {
    alignSelf: "center",
    marginLeft: 20,
    fontFamily: "Axiforma-Regular",
    fontSize: 13,
    color: "grey",
  },
  set: {
    fontSize: 16,
    color: "#008080",
    alignelf: "flex-Start",
    fontFamily: "Axiforma-SemiBold",
    marginLeft: "2%",
  },
  VieewProfile: {
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: "20%",
  },
  View12: {
    backgroundColor: "#008080",
    width: wp(40),
    marginLeft: "10%",
    justifyContent: "center",
    height: hp(6),
    borderRadius: 50,
  },
  set2: {
    fontSize: 12,
    color: "#737373",
    alignSelf: "flex-start",
    fontFamily: "Axiforma-Regular",
    marginTop: 5,
    marginLeft: "2%",
    lineHeight: 17,
  },
  set3: {
    fontSize: 14,
    color: "#737373",
    alignSelf: "flex-start",
    marginTop: "7%",
    fontFamily: "Axiforma-Bold",
    marginLeft: "2%",
  },

  View11: {
    paddingLeft: "3%",
    height: hp(4),
    flexDirection: "row",
    backgroundColor: "#008080",
    borderRadius: 25,
    marginLeft: "2%",
    marginEnd: "3%",
    paddingEnd: "3%",
  },
  image: {
    alignSelf: "center",
    height: hp(5),
    width: wp(5),
    resizeMode: "contain",
    marginLeft: 10,
    tintColor: "white",
  },
  image1: {
    resizeMode: "contain",
    height: hp(3),
    width: wp(10),
  },

  view1: {
    marginTop: "5%",
    fontSize: 16,
  },
  NoBtn: {
    backgroundColor: "#A6A6A6",
    width: wp(32),
    justifyContent: "center",
    height: hp(7),
    paddingHorizontal: 10,
    borderRadius: 50,
  },
  YesBtn: {
    backgroundColor: "#008080",
    width: wp(32),
    justifyContent: "center",
    height: hp(7),
    marginLeft: 15,
    borderRadius: 50,
  },

  next: {
    backgroundColor: "#008080",
    width: wp(40),
    marginLeft: "10%",
    justifyContent: "center",
    height: hp(6),
    borderRadius: 50,
  },
  View9: {
    paddingLeft: "5%",
    height: hp(5),
    flexDirection: "row",
    backgroundColor: "#008080",
    borderRadius: 25,
  },
  View10: {
    flexDirection: "row",
    alignItems: "center",
    paddingLeft: 25,
    marginTop: "10%",
    paddingEnd: 25,
    paddingBottom: "10%",
  },
  nextText: {
    alignSelf: "center",
    color: "white",
    fontSize: 14,
    fontFamily: "Axiforma-Bold",
  },

  View8: {
    alignItems: "center",
  },
  image1: {
    resizeMode: "contain",
    height: hp(10),
    width: wp(10),
    marginLeft: 10,
  },
  selectedStyle: {
    borderRadius: 12,
  },
  ImageBackground: {
    flex: 1,
    height: "100%",
    width: "100%",
    // backgroundColor:'#F9FBDB'
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
  text1: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#008080",
  },

  img1: {
    alignSelf: "center",
    marginLeft: 10,
    marginTop: 20,
    width: "50%",
    height: "40%",
    resizeMode: "contain",
  },
  img: {
    marginLeft: 40,
    width: 27,
    height: 27,
    marginTop: 30,
    resizeMode: "contain",
    tintColor: "#F9FBDB",
  },

  text: {
    fontSize: hp(2),
    color: "grey",
    alignSelf: "center",
  },

  TextProfile: {
    fontSize: 26,
    color: "#F9FBDB",
    fontFamily: "Axiforma-Bold",
  },
  ImageBackground1: {
    width: "100%",
    height: "100%",
  },
  backBtn: {
    height: hp(6),
    width: wp(10),
    justifyContent: "center",
    alignItems: "center",
    marginTop: 10,
  },
  View1: {
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: "10%",
  },
  View2: {
    marginTop: "15%",
    alignItems: "center",
    justifyContent: "center",
    padding: 20,
  },
  View3: {
    paddingLeft: 25,
    paddingEnd: 25,
    marginTop: "10%",
  },
  View4: {
    flexDirection: "row",
    marginTop: 15,
  },
  View5: {
    alignItems: "center",
    flexDirection: "row",
  },
  Btn: {
    alignSelf: "center",
    color: "white",
    fontSize: 16,
    fontFamily: "bold",
  },
  View7: {
    backgroundColor: "white",
    height: 100,
    width: 100,
    borderRadius: 5,
    alignItems: "center",
    justifyContent: "center",
  },
  iconsView: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 25,
    justifyContent: "center",
    borderColor: "White",
  },
  Check: {
    marginTop: "5%",
  },
  Check1: {
    marginLeft: "2%",
    backgroundColor: "white",
    borderWidth: 2,
    borderColor: "#DEDEDE",
  },
  dropDownView: {
    marginTop: hp(3),
    marginBottom: hp(3),
  },

  icon: {
    marginRight: 5,
  },
  label: {
    position: "absolute",
    backgroundColor: "white",
    left: 22,
    top: 8,
    zIndex: 999,
    paddingHorizontal: 8,
    fontSize: 14,
  },

  selectedTextStyle: {
    fontSize: 16,
    color: "grey",
    backgroundColor: "#008080",
  },
  iconStyle: {
    width: 20,
    height: 20,
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
  text3: {
    alignSelf: "center",
    color: "white",
    fontSize: 14,
    fontFamily: "Axiforma-Bold",
  },
  container: {},
  dropdown1: {
    height: hp(8),
    width: wp(87),
    backgroundColor: "white",
    borderRadius: 25,
    padding: 20,
    shadowColor: "red",
    marginRight: 30,
    borderWidth: 1,
    paddingTop: 25,

    borderColor: "#DFE3A3",

    shadowOffset: {},
  },
  placeholderStyle: {
    fontSize: 13,
    color: "grey",
    fontFamily: "Axiforma-Regular",
    width: 100,
    height: 50
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
});