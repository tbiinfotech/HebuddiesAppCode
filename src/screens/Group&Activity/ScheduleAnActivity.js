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
} from "react-native";
import DatePicker from "react-native-date-picker";
import axios from "axios";
import constants from "../constants/constants";
import Checkbox from "expo-checkbox";
import { useTranslation, withTranslation, Trans } from "react-i18next";
import AsyncStorage from "@react-native-async-storage/async-storage";
import "../translation/i18n";
import { ActivityIndicator } from "react-native-paper";
const ScheduleAnActivity = ({ navigation, route }) => {
  const { ACTIVITY_ARR, GROUP_ID, new_activity, meet } = route.params;
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
  const dates1 = () => {
    let today = new Date();
    today.setDate(today.getDate() + 1);
    let date = new Date(today);
 setStartDate(date)
    // console.log("DATES__LIST", datesList);
  };
  const dates = () => {
    let today = new Date();
    today.setDate(today.getDate() + 7);
    let date = new Date(today);
 
    setlastdate(date);

    setEndDate(date);

    for (let i = 1; i <= 7; i++) {
      let today  = new Date();
      var dd = today.setDate(today.getDate() + i);
      let date = new Date(today);
      var obj = {
        date: date,
        isMorningCheck: false,
        isNoon: false,
        isEveningCheck: false,
        isAfternoonCheck: false,
      };
      datesList.push(obj);
    }
    // console.log("DATES__LIST", datesList);
  };
  useEffect(() => {
    dates();
    dates1()
  }, []);

  const onSelectSlots = (item, index, type, value) => {
    var arr = [...datesList];
    var sArr = [...selectedSolts];

    if (selectedSolts.length < 5 || value == false) {
      // console.log("jghjg", selectedSolts.length);
      if (type == "Morning") {
        arr[index].isMorningCheck = !arr[index].isMorningCheck;
        if (arr[index].isMorningCheck) {
          var ob = {
            time_slots: arr[index].date,
            zone: "Morning",
            index: index,
            check: true,
          };
          sArr.push(ob);
        } else {
          var idd=sArr.indexOf(index)
          sArr.splice(idd, 1);
        }
        // console.log("DATESS", arr[index].isMorningCheck);
      } else if (type == "Noon") {
        arr[index].isNoon = !arr[index].isNoon;
        if (arr[index].isNoon) {
          var ob = {
            time_slots: arr[index].date,
            zone: "Noon",
            index: index,
            check: true,
          };
          sArr.push(ob);
        } else {
          var idd=sArr.indexOf(index)
          sArr.splice(idd, 1);
        }
      } else if (type == "Afternoon") {
        arr[index].isAfternoonCheck = !arr[index].isAfternoonCheck;
        if (arr[index].isAfternoonCheck) {
          var ob = {
            time_slots: arr[index].date,
            zone: "Afternoon",
            index: index,
            check: true,
          };
          sArr.push(ob);
        } else {
          var idd=sArr.indexOf(index)
          sArr.splice(idd, 1);
        }
      } else if (type == "Evening") {
        arr[index].isEveningCheck = !arr[index].isEveningCheck;
        if (arr[index].isEveningCheck) {
          var ob = {
            time_slots: arr[index].date,
            zone: "Evening",
            index: index,
            check: true,
          };
          // console.log("tytrteerdd",sArr)
          sArr.push(ob);
        } else {
          var idd=sArr.indexOf(index)
          sArr.splice(idd, 1);
        }
      }
      setSelectedSlots(sArr);
      setDatesList(arr);
    } else {
      alert("You can  select only 5 slots");
    }

    // console.log("DATESS", sArr);
  };
  const RenderSlots = (item, index) => {
    var d = new Date(item.date);
    var date = d.getDate();
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
          <View style={{ flex: 0.2, alignItems: "center", marginTop: 5 }}>
            <Text style={styles.TextView}>{month_name(new Date(d))}</Text>
            <Text style={styles.textDesign}>{date}</Text>
            <Text style={styles.textStyle}>{day_name(new Date(d))}</Text>
          </View>
          <View
            style={{
              flex: 0.8,
              flexDirection: "row",
              justifyContent: "space-between",
            }}
          >
            <View
              style={{
                alignItems: "center",
                marginStart: 10,
                marginHorizontal: 5,
              }}
            >
              <Checkbox
                style={{
                  marginLeft: 10,
                  marginRight: 20,
                  backgroundColor: "white",
                  borderWidth: 0.3,
                  borderColor: "#DEDEDE",
                }}
                value={item.isMorningCheck}
                onValueChange={(value) => {
                  onSelectSlots(item, index, "Morning", value);
                }}
                color={item.isMorningCheck ? "#008080" : undefined}
              />
              <Text style={styles.textEdit}>Morning</Text>
            </View>
            <View style={{ alignItems: "center", marginHorizontal: 5 }}>
              <Checkbox
                style={{
                  marginLeft: 10,
                  marginRight: 20,
                  backgroundColor: "white",
                  borderWidth: 0.3,
                  borderColor: "#DEDEDE",
                }}
                value={item.isNoon}
                onValueChange={(value) => {
                  onSelectSlots(item, index, "Noon", value);
                }}
                color={item.isNoon ? "#008080" : undefined}
              />
              <Text style={styles.textEdit}>Noon</Text>
            </View>
            <View style={{ alignItems: "center" }}>
              <Checkbox
                style={{
                  marginLeft: 10,
                  marginRight: 20,
                  backgroundColor: "white",
                  borderWidth: 0.3,
                  borderColor: "#DEDEDE",
                }}
                value={item.isAfternoonCheck}
                onValueChange={(value) => {
                  onSelectSlots(item, index, "Afternoon", value);
                }}
                color={item.isAfternoonCheck ? "#008080" : undefined}
              />
              <Text style={styles.textEdit}>Afternoon</Text>
            </View>

            <View style={{ alignItems: "center", marginEnd: 6 }}>
              <Checkbox
                style={{
                  marginLeft: 10,
                  marginRight: 20,
                  backgroundColor: "white",
                  borderWidth: 0.3,
                  borderColor: "#DEDEDE",
                }}
                value={item.isEveningCheck}
                onValueChange={(value) => {
                  onSelectSlots(item, index, "Evening", value);
                }}
                color={item.isEveningCheck ? "#008080" : undefined}
              />
              <Text style={styles.textEdit}> Evening</Text>
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
  // const createActivity = async () => {

  //   if (selectedSolts.length < 1) {
  //     alert(t("Please select slot"));
  //   } else {
  //     setCreateLoader(true);
  //     var langg=await AsyncStorage.getItem("langugae")
  //     var token = await AsyncStorage.getItem("token");
      
  //     // console.log("TOKEMN", token);
  //     var axios = require("axios");
  //     var data = new FormData();
  //     data.append("activities", JSON.stringify(ACTIVITY_ARR));
  //     data.append("time_slots", JSON.stringify(selectedSolts));
  //     data.append("group_id", GROUP_ID);
  //     data.append("new_activity", new_activity);
  //     data.append("meet", meet);

  //  console.log("newwwsarrarar",data)
  //     // console.log("FORM_DATA=-=-=1", JSON.stringify(data));
  //     var config = {
  //       method: "post",
  //       url: constants.BASE_URL + "api/activity/create",
  //       headers: {
  //          "X-localization": langg,
  //         "Content-Type": "multipart/form-data",
  //         Authorization: "Bearer " + JSON.parse(token),
  //       },
  //       data: data,
  //     };

  //     axios(config)
  //       .then(function (response) {
  //     alert("okkk")
  //        console.log("hjkhkhdfgkf",response.data)
  //        return false
  //         if (response.data.status == true) {
  //           alert("Activity Created");
  //           setCreateLoader(false);
  //           // console.log("CREATEDOPjopjopjn", JSON.stringify(response));
  //           navigation.navigate("GroupDetails", { Groupp_id: GROUP_ID });
  //         }
  //         else{
  //           alert(response.data.message)
  //         }
  //       })
  //       .catch(function (error) {
  //         setCreateLoader(false);
  //         // console.log(error);
  //       });
  //   }
  // };
  const createActivity = async () => {

    if (selectedSolts.length < 1) {
      alert(t("Please select slot"));
    } else {
      setCreateLoader(true);
      var langg=await AsyncStorage.getItem("langugae")
      var token = await AsyncStorage.getItem("token");
      // console.log("TOKEMN", token);
      var axios = require("axios");
      var data = new FormData();
      data.append("activities", JSON.stringify(ACTIVITY_ARR));
      data.append("time_slots", JSON.stringify(selectedSolts));
      data.append("group_id", GROUP_ID);
      data.append("new_activity", new_activity);
      data.append("meet", meet);

      console.log("newwwsarrarar",data)
      console.log("FORM_DATA=-=-=1", JSON.stringify(data));
     
      var config = {
        method: "post",
        url: constants.BASE_URL + "api/activity/create",
        headers: {
           "X-localization": langg,
          "Content-Type": "multipart/form-data",
          Authorization: "Bearer " + JSON.parse(token),
        },
        data: data,
      };

      axios(config)
        .then(function (response) {
      
   
         console.log("hjkhkhdfgkf",response.data)
          if (response.data.status == true) {
            alert(t("Activity Created"));
            setCreateLoader(false);
            // console.log("CREATEDOPjopjopjn", JSON.stringify(response));
            navigation.navigate("GroupDetails", { Groupp_id: GROUP_ID });
          }
          else{
            alert("okk")
          }
        })
        .catch(function (error) {
          setCreateLoader(false);
        console.log("gdg65655666ddydyy",error.response.data);
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
        <Text style={styles.headerText}>{t("Schedule an activity")}</Text>
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
        {t("Choose date")}
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
        {t("Choose up to 5 dates/time slots")}
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
        {t("that your group can vote on for meeting up")}
      </Text>

      <View style={{ flexDirection: "row", marginStart: 20, marginTop: 23 }}>
        <Text
          style={{
            fontFamily: "Axiforma-Regular",
            fontSize: 14,
            color: "#737373",
            flex: 0.5,
          }}
        >
          {t("Start Date")}
        </Text>

        <Text
          style={{
            fontFamily: "Axiforma-Regular",
            fontSize: 14,
            color: "#737373",
            flex: 0.5,
          }}
        >
          {t("End Date")}
        </Text>
      </View>

      <View style={{ flexDirection: "row", marginTop: 11 }}>
        <View style={{ flex: 0.5 }}>
          <View
            style={{
              backgroundColor: "#fff",
              flexDirection: "row",
              justifyContent: "space-between",
              paddingHorizontal: 20,
              height: 51,
              alignItems: "center",
              borderRadius: 50,
              marginHorizontal: 20,
              borderWidth: 1,
              borderColor: "#DFE3A3",
            }}
          >
            <Text
              style={{
                fontFamily: "Axiforma-Regular",
                color: "#737373",
                fontSize: 14,
              }}
            >
              {startDate.toLocaleDateString()}
            </Text>
            <View>
              <Image
                source={require("../../../Images/Calendar.png")}
                style={{ height: 20, width: 19, tintColor: "grey" }}
              />
            </View>
          </View>
        </View>

        {/* <DatePicker
          modal
          open={open1}
          date={date1}
          onConfirm={(date) => {
            setOpen1(false);
            setDate1(date);
          }}
          onCancel={() => {
            setOpen1(false);
          }}
          mode={"date"}
          onDateChange={(date) => {
            setDate(date);
          }}
        /> */}

        <View style={{ flex: 0.5 }}>
          <View
            style={{
              backgroundColor: "#fff",
              flexDirection: "row",
              justifyContent: "space-between",
              paddingHorizontal: 20,
              height: 51,
              alignItems: "center",
              borderRadius: 50,
              marginEnd: 20,
              borderWidth: 1,
              borderColor: "#DFE3A3",
            }}
          >
            <Text
              style={{
                fontFamily: "Axiforma-Regular",
                color: "#737373",
                fontSize: 14,
              }}
            >
              {endDate.toLocaleDateString()}
            </Text>
            <View>
              <Image
                source={require("../../../Images/Calendar.png")}
                style={{ height: 20, width: 19, tintColor: "grey" }}
              />
            </View>

            {/* <DatePicker
              modal
              open={open}
              date={date}
              onConfirm={(date) => {
                setOpen(false);
                setDate(date);
              }}
              onCancel={() => {
                setOpen(false);
              }}
              mode={"date"}
            /> */}
          </View>
        </View>
      </View>
      {/* <ScrollView> */}
      <FlatList
        data={datesList}
        renderItem={({ item, index }) => RenderSlots(item, index)}
        nestedScrollEnabled
        style={{ flex: 1 }}
        extraData={datesList}
        keyExtractor={(item, index) => item.key}
        // horizontal={true}
        showsVerticalScrollIndicator={false}
        showsHorizontalScrollIndicator={false}

        //  style={{ marginTop: 19 }}
      />

      {/* </ScrollView> */}

      <TouchableOpacity
        style={styles.ButtonStyle}
        onPress={() => createActivity()}
      >
        {createLoader ? (
          <ActivityIndicator
            animating={createLoader}
            size="small"
            color="white"
          />
        ) : (
          <Text style={styles.ButtonText}>{t("Create Activity")}</Text>
        )}
      </TouchableOpacity>
    </ImageBackground>
  );
};
const full_app = withTranslation()(ScheduleAnActivity);
export default full_app;
//  export default ScheduleAnActivity;

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
    marginStart: 38,
  },

  textStyle: {
    color: "#737373",
    fontSize: 16,
    fontFamily: "Axiforma-Medium",
  },

  textDesign: {
    color: "grey",
    fontFamily: "Axiforma-Bold",
    fontSize: 28,
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
    paddingVertical: 16,
    paddingHorizontal: 30,
    borderRadius: 50,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 20,
    alignSelf: "flex-end",
    marginBottom: 5,
    marginEnd: 20,
  },

  ButtonText: { color: "#fff", fontSize: 18, fontFamily: "Axiforma-Bold" },

  TextView: {
    fontFamily: "Axiforma-Medium",
    color: "#737373",
    fontSize: 16,
  },
});
