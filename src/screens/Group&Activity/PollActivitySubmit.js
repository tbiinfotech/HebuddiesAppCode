import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  Image,
  ImageBackground,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  FlatList,
  Alert
} from "react-native";
import DatePicker from "react-native-date-picker";
import Checkbox from "expo-checkbox";
import { useTranslation, withTranslation, Trans } from "react-i18next";
import AsyncStorage from "@react-native-async-storage/async-storage";
import "../translation/i18n";
import { ActivityIndicator } from "react-native-paper";
import constants from "../constants/constants";
const PollActivitySubmit = ({ navigation, route }) => {
  const { DATA, GROUP_ID, meet, new_activity, userID, TIME_SLOTS, ACTIVITY_ARR, IS_POLL } = route.params;
//   console.log("ooppppppwdwcmcvmcmcmdklsmclsmdlcmsdlcmdsklcmdklscmdklsmkl=-=-=-=-=-", userID, "DWdwd", DATA.created_by,"SDCdsfdsfdsf",IS_POLL);
//  console.log("TIME_SLOTS",TIME_SLOTS)
  const [toggleCheckBox, setToggleCheckBox] = useState(false);
  const [check, setCheck] = useState(false);
  const [check2, setCheck2] = useState(false);
  const [check3, setCheck3] = useState(false);
  const [check4, setCheck4] = useState(false);

  const [check5, setCheck5] = useState(false);
  const [check6, setCheck6] = useState(false);
  const [check7, setCheck7] = useState(false);
  const [check8, setCheck8] = useState(false);
  const [check9, setCheck9] = useState(false);
  const [check10, setCheck10] = useState(false);
  const [check11, setCheck11] = useState(false);
  const [check12, setCheck12] = useState(false);
  const [check13, setCheck13] = useState(false);
  const [check14, setCheck14] = useState(false);
  const [check15, setCheck15] = useState(false);
  const [check16, setCheck16] = useState(false);
  const [check17, setCheck17] = useState(false);
  const [check18, setCheck18] = useState(false);
  const [check19, setCheck19] = useState(false);
  const [check20, setCheck20] = useState(false);
  const [check21, setCheck21] = useState(false);
  const [check22, setCheck22] = useState(false);
  const [check23, setCheck23] = useState(false);
  const [check24, setCheck24] = useState(false);
  const [check25, setCheck25] = useState(false);
  const [check26, setCheck26] = useState(false);
  const [check27, setCheck27] = useState(false);
  const [check28, setCheck28] = useState(false);
  const [check29, setCheck29] = useState(false);
  const [check30, setCheck30] = useState(false);
  const [check31, setCheck31] = useState(false);
  const [check32, setCheck32] = useState(false);
  const [check33, setCheck33] = useState(false);
  const [check34, setCheck34] = useState(false);
  const [check35, setCheck35] = useState(false);
  const [check36, setCheck36] = useState(false);
  const [check37, setCheck37] = useState(false);
  const [check38, setCheck38] = useState(false);
  const [check39, setCheck39] = useState(false);
  const [check40, setCheck40] = useState(false);
  const [check41, setCheck41] = useState(false);
  const [check42, setCheck42] = useState(false);

  const [lastdate, setlastdate] = useState("");
  const [tick, setTick] = useState(false);
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());
  const [open, setOpen] = useState(false);

  const [date1, setDate1] = useState(new Date());
  const [open1, setOpen1] = useState(false);
  const [createLoader, setCreateLoader] = useState(false);
  const [datesList, setDatesList] = useState([]);
  const [selectedSolts, setSelectedSlots] = useState([]);
  const { t, i18n } = useTranslation();
  var month_name = function (date) {
    const mlist = [
      "Jan",
      "Feb",
      "March",
      "April",
      "May",
      "Jun",
      "Jul",
      "Aug",
      "Sept",
      "Oct",
      "Nov",
      "Dec",
    ];
    return mlist[date.getMonth()];
  };
  const dates = () => {
    var arr = TIME_SLOTS
    setDatesList(arr)
  };
  useEffect(() => {
    dates();
    
  }, []);

  const onSelectSlots = (item, index, value) => {
    var arr = [...datesList];
    var sArr = [...selectedSolts];

    if (value == true) {
      arr[index].check = true;
      var ob = {
        date: item.time_slots,
        zone: item.zone,
        index: index,
        check: true,
      };
      sArr.push(ob);
    } else {
      arr[index].check = false;

    }
    setSelectedSlots(sArr);
    setDatesList(arr);
    return false;
    var arr = [...datesList];
    var sArr = [...selectedSolts];
    if (sArr.length < 5 || value == false) {
      if (type == "Morning") {
        arr[index].isMorningCheck = !arr[index].isMorningCheck;
        if (arr[index].isMorningCheck) {
          var ob = {
            date: arr[index].date.toLocaleDateString(),
            zone: "Morning",
            index: index,
          };
          sArr.push(ob);
        } else {
          sArr.splice(index, 1);
        }
        console.log("DATESS", arr[index].isMorningCheck);
      } else if (type == "Noon") {
        arr[index].isNoon = !arr[index].isNoon;
        if (arr[index].isNoon) {
          var ob = {
            date: arr[index].date.toLocaleDateString(),
            zone: "Noon",
            index: index,
          };
          sArr.push(ob);
        } else {
          sArr.splice(index, 1);
        }
      } else if (type == "Afternoon") {
        arr[index].isAfternoonCheck = !arr[index].isAfternoonCheck;
        if (arr[index].isAfternoonCheck) {
          var ob = {
            date: arr[index].date.toLocaleDateString(),
            zone: "Afternoon",
            index: index,
          };
          sArr.push(ob);
        } else {
          sArr.splice(index, 1);
        }
      } else if (type == "Evening") {
        arr[index].isEveningCheck = !arr[index].isEveningCheck;
        if (arr[index].isEveningCheck) {
          var ob = {
            date: arr[index].date.toLocaleDateString(),
            zone: "Evening",
            index: index,
          };
          sArr.push(ob);
        } else {
          sArr.splice(index, 1);
        }
      }
      setSelectedSlots(sArr);
      setDatesList(arr);
    } else {
      alert("You can  select only 5 slots");
    }
  };
  const _logout = async () => {
    
    Alert.alert(
      t("Success"),
     t("Thank you for voting, now we're waiting for the rest of the group to vote and then you'll be ready to meet"),
      
    );
  };
  var day_name = function (date) {
    var days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
    var d = new Date(date);
    var dayName = days[d.getDay()];
    return dayName;
  };
  const RenderSlots = (item, index) => {
    // console.log("ghghhgghh",DATA.created_by == DATA.user_id)
    // console.log("yryrr", DATA.created_by)
    var daa = item.date;
    var Deate = new Date(daa).getDate();
    var month = new Date(daa).getMonth();
    var Color = ""
    var value=false
    if (DATA.created_by !== parseInt(userID) && !IS_POLL) {
      if (item.check) {
        Color = "#008080"
      } else {
        Color = undefined
      }
    } else {
      Color = "#008080"
    }
    // console.log("ueowifuoeuwofueiowuf",typeof DATA.created_by !== parseInt(userID)  )
    if (DATA.created_by !== parseInt(userID) ) {
    

      // console.log("CRETED_BY",DATA.created_by ,"=-=-dcfdcdcd=---",userID)
      value=item.check
    } else {
     
      value = true
    }
    return (
      <View style={{}}>
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            marginTop: 26,
            paddingHorizontal: 10,
          }}
        >
          <View style={{ flex: 0.4, alignItems: "center", marginTop: 5 }}>
            <Text style={styles.textDesign}>{month_name(new Date(daa))}</Text>
            <Text style={styles.TextView}>{Deate}</Text>
            <Text style={styles.TextView}>{day_name(new Date(daa))}</Text>
          </View> 
          <View
            style={{
              flex: 0.8,
              flexDirection: "row",
              justifyContent: "center",
            }}
          >
            <View
              pointerEvents={(DATA.created_by !== parseInt(userID) && !IS_POLL) ? "auto" : "none"}
              style={{
                alignItems: "center",
                marginStart: 10,
                marginHorizontal: 5,

                justifyContent: "center",
              }}
            >
              <Checkbox
                style={{
                  height: 30,
                  width: 30,
                  backgroundColor: "white",
                  borderWidth: 0.3,
                  borderColor: "#DEDEDE",
                }}
                value={value}
                onValueChange={(value) => {
                  onSelectSlots(item, index, value);
                }}
                color={Color}
              />
            </View>
            <View style={{ flex: 1, paddingHorizontal: 10 }}>
              <Text style={styles.textEdit}>{item.zone}</Text>
            </View>
          </View>
        </View>

        <View
          style={{
            backgroundColor: "#E4E4E4",
            width: "90%",
            height: 1,
            alignSelf: "center",
            marginTop: 21,
          }}
        />
      </View>
    );
  };

  var month_name = function (date) {
    const mlist = [
      "Jan",
      "Feb",
      "March",
      "April",
      "May",
      "Jun",
      "Jul",
      "Aug",
      "Sept",
      "Oct",
      "Nov",
      "Dec",
    ];
    return mlist[date.getMonth()];
  };
  var day_name = function (date) {
    var days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
    var d = new Date(date);
    var dayName = days[d.getDay()];
    return dayName;
  };
  const createActivity = async () => {
    var found = false;
    for (var i = 0; i < datesList.length; i++) {
      if (datesList[i].check == true) {
        found = true;
        break;
      }
    }

    if (!found) {
      alert(t("Please select slot"));
    } else {
      setCreateLoader(true);
      var token = await AsyncStorage.getItem("token");
      // console.log("opoppop", token);
      var axios = require("axios");
      var data = new FormData();
      var arr = []
      for (let i = 0; i < datesList.length; i++) {
        var obj = { "time_slots": datesList[i].date, "index": 0, "zone": datesList[i].zone, "check": datesList[i].check }

        arr.push(obj)
      }
      console.log("terv isdsdsc ", arr)
      data.append("activities", JSON.stringify(ACTIVITY_ARR));
      data.append("time_slots", JSON.stringify(arr));
      data.append("activity_id", DATA.activity_id);
      data.append("new_activity", new_activity);
      data.append("meet", meet);
      console.log("Snewactiviyyyyrtrrtycreatedata",data);
      var config = {
        method: "post",
        url: constants.BASE_URL + "api/activity/save",
        headers: {
           Authorization: "Bearer " + JSON.parse(token),
        
        },
        data: data,
      };

      axios(config)
        .then(function (response) {
          console.log("iuyiyiyiyiyioylo",response.data)
          setCreateLoader(false);
          _logout()
          navigation.navigate("GroupDetails", {
            Groupp_id: GROUP_ID,
          });
        })
        .catch(function (error) {
          setCreateLoader(false);
          // console.log(error);
        });
    }
  };
  return (
    <ImageBackground
      source={require("../../../Images/background.png")}
      style={styles.Container}
    >
      <View style={styles.ViewStyle}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Image
            source={require("../../../Images/Arrow-Left.png")}
            style={styles.IconStyle}
          />
        </TouchableOpacity>
        <Text style={styles.headerText}>{t("Poll activity")}</Text>
      </View>


      <Text
        style={{
          color: "grey",
          marginStart: 20,
          marginTop: 20,
          fontSize: 18,
          fontFamily: "Axiforma-SemiBold",
        }}
      >
        {DATA.created_by !== parseInt(userID) ? t("Choose date") : t("Selected date")}




      </Text>

      <Text
        style={{
          color: "#737373",
          marginStart: 20,
          fontSize: 12,
          fontFamily: "Axiforma-Regular",
          marginTop: 5,
          marginEnd: 40,
        }}
      >
        {DATA.created_by !== parseInt(userID) &&

          t("choose preferred meetup date(s) -")
        }

      </Text>
      <FlatList
        data={datesList}
        renderItem={({ item, index }) => RenderSlots(item, index)}
        nestedScrollEnabled
        style={{ flex: 1 }}
        extraData={datesList}
        keyExtractor={(item, index) => item.key}
        showsVerticalScrollIndicator={false}
        showsHorizontalScrollIndicator={false}
      />



      {(DATA.created_by !== parseInt(userID) && !IS_POLL) &&
        <TouchableOpacity
          style={styles.ButtonStyle}
          onPress={() => createActivity()}
        >
          {createLoader ?
            <ActivityIndicator
              animating={createLoader}
              size="small"
              color="white"
            />
            :
            <Text style={styles.ButtonText}>{t("Poll Activity")}</Text>
          }
        </TouchableOpacity>
      }
    </ImageBackground>
  );
};
const full_app = withTranslation()(PollActivitySubmit);
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
  },

  IconStyle: {
    tintColor: "#F9FBDB",
    height: 27,
    width: 27,
  },

  headerText: {
    fontSize: 24,
    fontFamily: "Axiforma-Bold",
    color: "#F9FBDB",
    marginStart: 70,
  },

  textStyle: {
    color: "#737373",
    fontSize: 16,
    fontFamily: "Axiforma-Medium",
  },

  textDesign: {
    color: "grey",
    fontFamily: "Axiforma-Bold",
    fontSize: 20,
  },

  ViewEdit: {
    alignItems: "center",
  },

  textEdit: {
    color: "#737373",
    fontFamily: "Axiforma-Medium",
    fontSize: 16,
    marginVertical: 10,
  },

  ButtonStyle: {
    backgroundColor: "#008080",
    borderRadius: 50,
    position: "absolute", bottom: 10, right: 6, width: 160, height: 50, alignItems: "center", justifyContent: "center"
  },

  ButtonText: { color: "#fff", fontSize: 18, fontFamily: "Axiforma-Bold", textAlign: "center" },

  TextView: {
    fontFamily: "Axiforma-Bold",
    color: "#737373",
    fontSize: 20,
  },
});
