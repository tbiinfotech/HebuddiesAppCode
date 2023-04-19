// import React, { useRef, useState, useEffect, useCallback,Fragment } from "react";
// import {
//   TextInput,
//   TouchableOpacity,
//   ImageBackground,
//   SafeAreaView,
//   StyleSheet,
//   Text,
//   View,
//   Image,
//   FlatList,
//   Dimensions,
//   ActivityIndicator
// } from "react-native";
// import axios from "axios";
// // import constants from "../constants/constants";
// import {
//   widthPercentageToDP as wp,
//   heightPercentageToDP as hp,
// } from "react-native-responsive-screen";
// import { useTranslation, withTranslation, Trans } from 'react-i18next';
// import '../translation/i18n'
// import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
// import DatePicker from "react-native-date-picker";
// import ImagePicker from "react-native-image-crop-picker";
// import Modal from "react-native-modal";
// import { Dropdown, MultiSelect } from "react-native-element-dropdown";
// import AsyncStorage from "@react-native-async-storage/async-storage";
// import { useIsFocused } from "@react-navigation/native";
// import { AutocompleteDropdown } from 'react-native-autocomplete-dropdown';
// import { t } from "i18next";
// import constants from "../constants/constants";
// import { add } from "react-native-reanimated";
// import SearchableDropdown from 'react-native-searchable-dropdown';
// import { ScrollView } from "react-native-gesture-handler";

// const CompleteProfile = ({ navigation, route }) => {
//   const {t, i18n} = useTranslation();
//   const isFocused = useIsFocused();
//   const [isModalVisible, setModalVisible] = useState(false);
//   const [isModalVisible1, setModalVisible1] = useState(false);
//   const [isVisible, setisVisible] = useState(false);
//   const [userToken, setUserToken] = useState("");
//   const [Zipcode, setZIP_code] = useState([]);
//   const [minimum_child_date, setMiniumum_child_date] = useState();
//   const [searchlist, setSearchlist] = useState([]);
//   const [searchT, setSearchT] = useState(false)
//   const [filteredDataSource, setFilteredDataSource] = useState([]);
//   const[searchTerm,setsearchTerm]=useState("")
//   const [selectedValues, setSelectedValues] = useState([]);
//   const [placeholder_val,setplaceholder_val] =useState('Placeholder')
//   const [selectedItems, setSelectedItems] = useState([]);
//   const [infovisible1, setinfovisible1] = useState(false);
//   const [selectedItem, setSelectedItem] = useState(null);
//   const [suggestionsList, setSuggestionsList] = useState([])
//   const [loading, setLoading] = useState(false)
//   const[loader,setLoader]=useState(false)
//   const searchRef = useRef(null)
//   const dropdownController = useRef(null)
//   const items = [
//     // name key is must. It is to show the text in front
//     {id: 1, name: 'angellist'},
//     {id: 2, name: 'codepen'},
//     {id: 3, name: 'envelope'},
//     {id: 4, name: 'etsy'},
//     {id: 5, name: 'facebook'},
//     {id: 6, name: 'foursquare'},
//     {id: 7, name: 'github-alt'},
//     {id: 8, name: 'github'},
//     {id: 9, name: 'gitlab'},
//     {id: 10, name: 'instagram'},
//   ];
//   const addItem = (item) => {
//     setSelectedItems(item)
// }
//   const toggleModal2 = () => {
//     setisVisible(!isVisible);
//   };
//   const searchUpdated=(item)=>{
//     setZIP_code(item)
//     setsearchTerm({item})
//   }
//   useEffect(() => {
//     const d = new Date();
//     setMiniumum_child_date(new Date(d.setFullYear(d.getFullYear()-5)))
//     getToken();
//   }, [isFocused]);
//   const getToken = async () => {
//     var token = await AsyncStorage.getItem("token");

//     setUserToken(JSON.parse(token));
//     Zip_code(JSON.parse(token));
//   };
//   const toggleModal = () => {
//     setModalVisible(!isModalVisible);
//   };
//   const toggleModal1 = () => {
//     setModalVisible1(!isModalVisible1);
//   };
//   const [myImage, setMyImage] = useState("");

//   const openGallery = (response) => {
//     ImagePicker.openPicker({
//       width: 300,
//       height: 400,
//       cropping: true,
//     }).then((image) => {
//       setMyImage(image.path);
//       setisVisible(false);
//       uploadimage(image.path);
//     });
//   };
//   const OpenCamera = (response) => {
//     ImagePicker.openCamera({
//       width: 300,
//       height: 400,
//       cropping: true,
//     }).then((image) => {
//       setMyImage(image.path);
//       setisVisible(false);
//       uploadimage(image.path);

//     });
//   };
//   const getSuggestions = useCallback(async q => {
//     const filterToken = q.toLowerCase()
//     // console.log('getSuggestions', q)
//     if (typeof q !== 'string' || q.length < 3) {
//       setZIP_code()
//       return
//     }
//     setLoading(true)
//     const response = await fetch('https://jsonplaceholder.typicode.com/posts')
//     const items = await response.json()
//     const suggestions = items
//     // console.log("ggjjgjdg",suggestions)
//       .filter(item => item.title.toLowerCase().includes(filterToken))
//       .map(item => ({
//         id: item.id,
//         title: item.title,
//       }))
//     setSuggestionsList(suggestions)
//     setLoading(false)
//   }, [])
//   const onClearPress = useCallback(() => {
//     setZIP_code(null)
//   }, [])
//   const onOpenSuggestionsList = useCallback(isOpened => {}, [])
//   const [value, setValue] = useState(null);
//   const [isFocus, setIsFocus] = useState(false);
//   const [open, setOpen] = useState(false);
//   const [time, setTime] = useState(false);
//   const [time1, setTime1] = useState(false);
//   const [date, setDate] = useState(new Date());
//   const [date1, setDate1] = useState(new Date());
//   const [time2, setTime2] = useState(false);
//   const [date2, setDate2] = useState(new Date());
//   const [date3, setDate3] = useState(new Date());
//   const [child1, setchild1] = useState(false);
//   const [child2, setchild2] = useState(false);
//   const [child3, setchild3] = useState(false);
//   const [dob, setdob] = useState("");
//   const [dob1, setdob1] = useState("");
//   const [dob2, setdob2] = useState("");
//   const [dob3, setdob3] = useState("");
//   const [open2, setOpen2] = useState(false);
//   const [open3, setOpen3] = useState(false);
//   const [value2, setValue2] = useState(false);
//   const [open1, setOpen1] = useState(false);
//   const [value1, setValue1] = useState(false);
//   const [value3, setValue3] = useState(null);
//   const [isFocus2, setIsFocus2] = useState(false);
  
//   const data = [
//     { label1:t("Male"), value1: t("Male") },
//     { label1: t("Female"), value1: t("Female") },
//     { label1: t("Other"), value1: t("Other") },
//   ];
//   const data1 = [
//     { label: t("Partnered"), value:t("Partnered") },
//     { label: t("Single"), value: t("Single") },
//     { label: t("Rainbow"), value: t("Rainbow") },
//     { label: t("Other"), value: t("Other")},
//   ];
//   const [parentname, setParentName] = useState("");
//   const [gender, setGender] = useState("");
//   const [birthdate, setBirthdate] = useState(new Date());
//   const [emailaddress, setEmailaddress] = useState("");
//   const [postalcode1, setPopstalcode1] = useState("");
//   const [relation, setRelation] = useState("");
//   const [childname, setChildname] = useState("");
//   const [childname1, setChildname1] = useState("");
//   const [childname2, setChildname2] = useState("");
//   const [childbirthdate, setChildbirthdate] = useState("");
//   const [childbirthdate1, setChildbirthdate1] = useState("");
//   const [childbirthdate2, setChildbirthdate2] = useState("");
//   const [save, setSave] = useState("");
//   const [image, setImage] = useState();
//   const [search, setSearch] = useState('');
//   const[loader1,setLoader1]=useState(false)
//   const Add = () => {
//      if(child2 == false) {
//       setchild2(true);
//     } else if (child3 == false) {
//       setchild3(true);
//     }
 
//   };

//   const sub = () => {
//     if (child3 == true) {
//     setchild3(false);
//   } else if (child2 == true) {
//     setchild2(false);
//   }
  
// };
// const ItemView = ({item}) => {
//   return (
//     // Flat List Item
//     <Text>{item.zipcode}
//     </Text>
//   );
// };

// const onsave = async () => {
//   var Name1 = parentname.replace(/\s/g, "");
//   var Gender1 = gender;
//   var Dateofbirth = birthdate.toLocaleDateString();
//   var postal = postalcode1;
//   var Relation1 = relation;
//   var CHILD = childname;
//   var CHILD1 = childname1;
//   var CHILD2 = childname2;
//   var CHILDBIRTH = childbirthdate == "" ? "" : childbirthdate.toLocaleDateString();
//   var CHILDBIRTH1 = childbirthdate1 == '' ? "" : childbirthdate1.toLocaleDateString();
//   var CHILDBIRTH2 = childbirthdate2 == "" ? "" : childbirthdate2.toLocaleDateString();

//   var New_Profiledetail = {
//     parent_name: Name1,
//     genders: Gender1,
//     birth_date: Dateofbirth,
//     postalcode: postal,
//     relations: Relation1,
//     childnames: CHILD,
//     childnames1: CHILD1,
//     childnames2: CHILD2,
//     childbirthdates: CHILDBIRTH,
//     childbirthdates1: CHILDBIRTH1,
//     childbirthdates2: CHILDBIRTH2,

//   };

//   var token = await AsyncStorage.getItem("token");
//   var USERID = await AsyncStorage.getItem("user_id");
   
//       setLoader(true)
//       var data = new FormData();
//       data.append("name",Name1);
//       data.append("gender",Gender1);
//       data.append("dob",Dateofbirth);
//       data.append("postal",postal );
//       data.append("relationship",Relation1 );
//       data.append("children[0][name]", CHILD);
//       data.append("children[0][dob]", CHILDBIRTH);
//       data.append("children[1][name]",CHILD1);
//       data.append("children[1][dob]",CHILDBIRTH1);
//       data.append("children[2][name]", CHILD2);
//       data.append("children[2][dob]",CHILDBIRTH2);
//       data.append("page_no", 1);
    
//       //  console.log("completeprofileeeeee",data)
//       var config = {
//         method: "post",
//         url: constants.BASE_URL + "api/profile/save_for_later",
//         headers: {
//           Authorization: "Bearer " + JSON.parse(token),
//         },
//         data: data,
//       };
  
//       axios(config)
//         .then(async (response) => {
//           // console.log("ghhghghgjgjgjj", response.data);
//           await AsyncStorage.setItem("P_DETAIL", JSON.stringify(New_Profiledetail));
//           // console.log("fffffeeee",JSON.stringify(New_Profiledetail))
//           await AsyncStorage.setItem("COMPLETE_PROFILE",JSON.stringify(response.data.complete_profile))
       
        
//           // setLoader(false)
//             navigation.navigate("MyTabs");
       
//         })
//         .catch(function (error) {
//           // setLoader(false)
//           // console.log("YESSSS", error);
//         });

  
//     }

//   const Zip_code = async (tokkken) => {
//     var requestOptions = {
//       method: "GET",
//       headers: new Headers({
//         Authorization: `Bearer ${tokkken}`,
//       }),
//       redirect: "follow",
//     };
//     fetch(constants.BASE_URL + "api/zipcodes", requestOptions)
//       .then((response) => response.text())
//       .then((result) => {
//         // console.log(result);
//         var data = JSON.parse(result);
//         setZIP_code(data.data);
        
//       })
//       .catch((error) => console.log("error", error));
//   };
//   const Onsubmit = async () => {
//     setLoader1(true)
//     var Name1 = parentname.replace(/\s/g, "");
//     var Gender1 = gender;
//     var Dateofbirth = birthdate.toLocaleDateString();
//     var postal = postalcode1;
//     var Relation1 = relation;
//     var CHILD = childname;
//     var CHILD1 = childname1;
//     var CHILD2 = childname2;
//     var CHILDBIRTH = childbirthdate == "" ? "" : childbirthdate.toLocaleDateString();
//     var CHILDBIRTH1 = childbirthdate1 == '' ? "" : childbirthdate1.toLocaleDateString();
//     var CHILDBIRTH2 = childbirthdate2 == "" ? "" : childbirthdate2.toLocaleDateString();

//     var Profiledetail = {
//       parent_name: Name1,
//       genders: Gender1,
//       birth_date: Dateofbirth,
//       postalcode: postal,
//       relations: Relation1,
//       childnames: CHILD,
//       childnames1: CHILD1,
//       childnames2: CHILD2,
//       childbirthdates: CHILDBIRTH,
//       childbirthdates1: CHILDBIRTH1,
//       childbirthdates2: CHILDBIRTH2,
//       save:1
//     };
//     if (Name1 == "") {
//       alert (t("Please fill name"));
//     }
//     else if (Gender1 == "") {
//       alert (t("Please fill gender"));
//     }
//     else if (Dateofbirth == "") {
//       alert (t("Please fill Dateofbirth"));
//     }
//     else if (postal == "") {
//       alert(t("Please fill Zip code"));
//     }
//     else if (Relation1 == "") {
//       alert(t("Please fill your relationship status"));
//     }
//     else if (childname !== "" && childbirthdate == "") {
//       alert(t("Please fill child Date of birth"));

//     }
//     else if (childname1 !== "" && childbirthdate1 == "") {
//       alert(t("Please fill child Date of birth"));
//     }
//     else if (childname2 !== "" && childbirthdate2 == "") {
//       alert(t("Please fill child Date of birth"));
//     }
//     else if (childname == "" && childbirthdate !== "") {
//       alert(t("Please fill child name"));

//     }
//     else if (childname1 == "" && childbirthdate1 !== "") {
//       alert(t("Please fill child name"));
//     }
//     else if (childname2 == "" && childbirthdate2 !== "") {
//       alert(t("Please fill child name"));
//     }
//     else {

//       await AsyncStorage.setItem("P_DETAIL", JSON.stringify(Profiledetail));
//       // console.log("jjjfgffhiouihu",JSON.stringify(Profiledetail))
//       // console.log("completeetet",Profiledetail)
//       setLoader1(false)
//       navigation.navigate("CompleteProfileStep2");

//     }
//   };
 
//   const uploadimage = async (myImage) => {
//     var token = await AsyncStorage.getItem("token");
//     let filename = myImage.split("/").pop();
//     let match = /\.(\w+)$/.exec(filename);

//     let fileType = filename.split(".").pop();
//     var obj = {
//       uri: myImage,
//       name: filename,
//       type: `image/${fileType}`,
//     };

//     var axios = require("axios");
//     var FormData = require("form-data");

//     var formdata = new FormData();
//     formdata.append("image", obj);
//     var config = {
//       method: "post",
//       url: constants.BASE_URL + "api/profile/image",

//       headers: {
//         Authorization: "Bearer" + JSON.parse(token),
//         "Content-Type": "multipart/form-data",
//       },
//       data: formdata,
//     };

//     axios(config)
//       .then(async (response) => {
//         setImage(response.data.data);
//         await AsyncStorage.setItem("Image", response.data.data);
//         await AsyncStorage.setItem("Childdetail", response.data.data[0].dob);
//         await AsyncStorage.setItem("Childdetail2", response.data.data[2].name);
//       })
//       .catch(function (error) {

//       });
//   };

//   return (
//     <View style={Style.MainContainer}>
//       <ImageBackground
//         style={Style.ImageBackground}
//         source={require("../../asset/Splash.png")}
//       >
//         <View style={{ height: 250 }}>
//           <ImageBackground
//             resizeMode="stretch"
//             style={Style.ImageBackground1}
//             source={require("../../asset/Ellipse-bg.png")}
//           >
//             <View>
//               <View>
//                 <View style={{ flex: 0.2, flexDirection: "row", marginTop: 10 }}>
//                   <TouchableOpacity
//                     onPress={() => navigation.navigate("Login")}
//                     style={Style.backBtn}
//                   >
//                     <Image
//                       style={Style.img}
//                       source={require("../../asset/back-button.png")}
//                     />
//                   </TouchableOpacity>
//                 </View>
//                 <View style={Style.View1}>
//                   <Text style={Style.TextProfile}> {t("Complete profile")} </Text>
//                   <Image
//                     style={Style.img1}
//                     source={require("../../asset/Steps.png")}
//                   />
//                 </View>
//               </View>
//             </View>
//             {myImage ? (
//               <View style={Style.View3}>
//                 <View
//                   style={{
//                     borderColor: "#F9FBDB",
//                     borderWidth: 10,
//                     height: 130,
//                     width: 130,
//                     borderRadius: 130 / 2,
//                     flexDirection: "row",
//                     alignItems: "center",
//                     justifyContent: "center",
//                   }}
//                 >
//                   <Image style={Style.img2} source={{ uri: myImage }} />
//                 </View>
//                 <TouchableOpacity onPress={toggleModal2}>
//                   <Image
//                     style={Style.edit}
//                     source={require("../../asset/Edit.png")}
//                   />
//                 </TouchableOpacity>
//               </View>
//             ) : (
//               <View style={Style.View3}>
//                 <View
//                   style={{
//                     borderColor: "#F9FBDB",
//                     borderWidth: 10,
//                     height: 130,
//                     width: 130,
//                     borderRadius: 130 / 2,
//                     flexDirection: "row",
//                     alignItems: "center",
//                     justifyContent: "center",
//                   }}
//                 >
//                   <Image
//                     style={Style.img2}
//                     source={require("../../asset/image28.png")}
//                   />
//                 </View>
//                 <TouchableOpacity onPress={toggleModal2}>
//                   <Image
//                     style={Style.edit}
//                     source={require("../../asset/Edit.png")}
//                   />
//                 </TouchableOpacity>
//               </View>
//             )}
//           </ImageBackground>
//         </View>
//         <KeyboardAwareScrollView style={{ marginTop: 60 }}>
//           <View style={Style.View2}>
//             <View style={Style.TextFieldView}>
//               <TextInput
//                 placeholderTextColor="grey"
//                 underlineColor="transparent"
//                 style={Style.textInput}
//                 placeholder={t("Parent name")}
//                 onChangeText={(text) => setParentName(text)}
//               />
//               <Image
//                 source={require("../../asset/Profile.png")}
//                 style={Style.imgIcon}
//               />
//             </View>
//             <View style={Style.View4}>
//               <Dropdown
//                 style={[Style.dropdown]}
//                 data={data}
//                 textStyle={{ color: "red" }}
//                 maxHeight={300}
//                 labelField="label1"
//                 valueField="value1"
//                 maxSelect={3}
//                 placeholder={t("Gender")}
//                 containerStyle={{ borderRadius: 5 }}
//                 selectedTextStyle={{ color: "grey" }}
//                 itemTextStyle={{ color: "grey" }}
//                 placeholderStyle={{
//                   fontFamily: "Axiforma-Regular",
//                   fontSize: 13,
//                   color: "grey",
//                 }}
//                 value={value3}
//                 onFocus={() => setIsFocus(true)}
//                 onBlur={() => setIsFocus(false)}
//                 onChange={(item) => {
//                   setValue3(item.value1);
//                   setIsFocus(false);
//                   setGender(item.value1);
//                 }}
//               />
//             </View>
        
//    <TouchableOpacity onPress={() => setOpen(true)}>
//    <View
//      style={{
//        paddingLeft: "7%",
//        height: hp(7),
//        width: wp(85),
//        flexDirection: "row",
//        alignItems: "center",
//        borderRadius: 25,
//        padding: wp(2),
//        marginTop: open2 ? "35%" : "0%",
//        backgroundColor: "white",
//        borderColor: "#DFE3A3",
//        borderWidth: 1,
//        justifyContent: "space-between",
//      }}
//    >
//      {dob == "" ? (
//        <Text
//          style={{
//            fontFamily: "Axiforma-Regular",
//            color: "#737373",
//            fontSize: 13,
//          }}
//        >
//          {t("Date of birth")}
//        </Text>
//      ) : (
//        <Text
//          style={{
//            fontFamily: "Axiforma-Regular",
//            color: "#737373",
//            fontSize: 13,
//          }}
//        >
//          {dob == "" ? "" : dob.toLocaleDateString()}
//        </Text>
//      )}
//      <TouchableOpacity onPress={() => Add()}>
//        <Image
//          source={require("../../asset/Calendar.png")}
//          style={Style.imgIcon}
//        />
//      </TouchableOpacity>

//      <DatePicker
//        modal
//        open={open}
//        date={date}
//        title="Birthday"
//        placeholder="Birthday"
//        // minimumDate={}
//        format="MM/DD/YYYY"
//        maximumDate={new Date()}
//        onConfirm={(date) => {
//          setOpen(false);
//          setdob(date);
//          setBirthdate(date);
//        }}
//        onCancel={() => {
//          setOpen(false);
//        }}
//        mode={"date"}
//      />
//    </View>
//  </TouchableOpacity>
//             <View style={Style.View4}>
//               <View style={{height:0,}}>
//               {/* <AutocompleteDropdown
//           ref={searchRef}
//           controller={controller => {
//             dropdownController.current = controller
//           }}
//           // initialValue={'1'}
//           direction={Platform.select({ ios: 'down' })}
//           dataSet={suggestionsList}
//           onChangeText={getSuggestions}
//           onSelectItem={item => {
//              item && setPopstalcode1(item.zipcode)
//           }}
//           debounce={600}
//           onClear={onClearPress}
//           onOpenSuggestionsList={onOpenSuggestionsList}
//           loading={loading}
//           useFilter={false} 
//           textInputProps={{
//             placeholder: 'Type here',
//             autoCorrect: false,
//             autoCapitalize: 'none',
//             style: {
//               borderRadius: 25,
//               backgroundColor: '#383b42',
//               color: '#fff',
//               paddingLeft: 18,
//             },
//           }}
//           rightButtonsContainerStyle={{
//             right: 8,
//             height: 30,

//             alignSelf: 'center',
//           }}
//           inputContainerStyle={{
//             backgroundColor: '#383b42',
//             borderRadius: 25,
//           }}
//           suggestionsListContainerStyle={{
//             backgroundColor: '#383b42',
//           }}
        
//           containerStyle={{ flexGrow: 1, flexShrink: 1 }}
//           renderItem={(item, searchText) => <Text style={{ color: '#fff', padding: 15 }}>{item.zipcode}</Text>}
//           inputHeight={50}
//           showChevron={false}
//           closeOnBlur={false}
//           //  showClear={false}
//         /> */}
      
//               {/* <SearchableDropdown
//           onTextChange={(text) => {console.log(text)}}
//           onItemSelect={(item) => {alert(JSON.stringify(item))}}
//           containerStyle={{padding: 5}}
//           textInputStyle={{
//             padding: 12,
//             borderWidth: 1,
//             borderColor: '#ccc',
//             backgroundColor: '#FAF7F6',
//           }}
//           itemStyle={{
//             padding: 10,
//             marginTop: 2,
//             backgroundColor: '#FAF9F8',
//             borderColor: '#bbb',
//             borderWidth: 1,
//           }}
//           itemTextStyle={{
//             color: '#222',
//           }}
//           itemsContainerStyle={{
//             maxHeight: '50%',
//           }}
//           items={Zipcode}
//           defaultIndex={2}
//           placeholder="placeholder"
//           resetValue={false}
//           underlineColorAndroid="transparent"
//         /> */}
   
//               </View>
        
//               <Dropdown
//                 style={[Style.dropdown]}
//                 data={Zipcode}
//                 textStyle={{ color: "grey" }}
//                 maxHeight={300}
//                 labelField="zipcode"
//                 valueField="zipcode"
//                 maxSelect={3}
//                 placeholder={t("Zip code")}
//                 containerStyle={{ borderRadius: 5 }}
//                 selectedTextStyle={{ color: "grey" }}
//                 itemTextStyle={{ color: "grey" }}
//                 inputSearchStyle={{color:'grey0'}}
//                 search
//                 searchPlaceholder={t("Search here")}
//                 placeholderStyle={{
//                   fontFamily: "Axiforma-Regular",
//                   fontSize: 13,
//                   color: "grey",
//                 }}
//                 value={value2}
//                 onFocus={() => setIsFocus2(true)}
//                 onBlur={() => setIsFocus2(false)}
//                 onChange={(item) => {
//                   setValue2(item.zipcode);
//                   setPopstalcode1(item.zipcode);
//                   //  searchFilterFunction(item.zipcode)
               
//                 }}
//               />
//               {/* {console.log("hjfgfjkghytt",Zipcode)} */}
//             </View>

//             <View style={Style.View44}>
//               <View style={Style.dropDownView}>
//                 <Dropdown
//                   style={[Style.dropdown]}
//                   data={data1}
//                   maxHeight={300}
//                   labelField="label"
//                   valueField="value"
//                   placeholder={t("Relationship status")}
//                   containerStyle={{ borderRadius: 5 }}
//                   selectedTextStyle={{ color: "grey" }}
//                   itemTextStyle={{ color: "grey" }}
//                   placeholderStyle={{
//                     fontFamily: "Axiforma-Regular",
//                     fontSize: 13,
//                     color: "grey",
//                   }}
//                   value={value}
//                   onFocus={() => setIsFocus(true)}
//                   onBlur={() => setIsFocus(false)}
//                   onChange={(item) => {
//                     setValue(item.value);
//                     setIsFocus(false);
//                     setRelation(item.value);
//                   }}
//                 />
//               </View>
//             </View>
//             {/* <TouchableOpacity onPress={() => Add()} style={Style.Addchild}>
//               <Text style={Style.addchildtext}>{t("Add Child")}</Text>
//               <Image
//                 source={require("../../asset/Group-add.png")}
//                 style={Style.plusimg}
//               />
//             </TouchableOpacity> */}

//             <View>
//               <View
//                 style={{
//                   justifyContent: "flex-start",
//                   alignSelf: "flex-start",
//                   marginTop: open1 ? "35%" : 20,
//                 }}
//               >
//                 <Text style={Style.text1}> {t("Child 1 details")}</Text>
//               </View>
              
//               <View style={Style.TextFieldView1}>
//                 <TextInput
//                   placeholderTextColor="grey"
//                   underlineColor="transparent"
//                   style={Style.textInput}
//                   placeholder={t("Child's name ")}
//                   onChangeText={(text) => { setChildname(text)}}
//                 />
//                 <Image
//                   source={require("../../asset/Profile.png")}
//                   style={Style.imgIcon}
//                 />
//               </View>

//               <View style={Style.View7}>
//                 <View style={Style.TextFieldView2}>
//                   {dob1 == "" ? (
//                     <Text
//                       style={{
//                         fontFamily: "Axiforma-Regular",
//                         color: "#737373",
//                         fontSize: 13,
//                       }}
//                     >
//                       {t("Date of birth")}
//                     </Text>
//                   ) : (
//                     <Text
//                       style={{
//                         fontFamily: "Axiforma-Regular",
//                         color: "#737373",
//                         fontSize: 13,
//                       }}
//                     >
//                       {dob1 == "" ? "" : dob1.toLocaleDateString()}
//                     </Text>
//                   )}
//                   <TouchableOpacity onPress={() => setOpen1(true)}>
//                     <Image
//                       source={require("../../asset/Calendar.png")}
//                       style={Style.imgIcon11}
//                     />
//                   </TouchableOpacity>
//                   <DatePicker
//                     modal
//                     open={open1}
//                     date={date2}
//                     title="Birthday"
//                     placeholder="Birthday"
//                     // minimumDate={minimum_child_date}
//                     maximumDate={new Date()}
//                     format="MM/DD/YYYY"
//                     onConfirm={(date) => {
//                       setOpen1(false);
//                       setdob1(date);
//                       setChildbirthdate(date);
//                     }}
//                     onCancel={() => {
//                       setOpen1(false);
//                     }}
//                     mode={"date"}
//                   />

//                   <View style={{ flexDirection: "row", marginHorizontal:5 }}>
//                  {!child2==false&&(
//                   <TouchableOpacity onPress={() =>sub()}>
//                   <Image
//                     source={require("../../asset/Group-sub.png")}
//                     style={{resizeMode: "contain",
//                     height: hp(13),
//                     width: wp(13),
//                     marginLeft: 19,}}
//                   />
//                 </TouchableOpacity>
//                  )}
                    
//                     <TouchableOpacity onPress={() =>Add()}>
//                       <Image
//                         source={require("../../asset/Group-add.png")}
//                         style={{resizeMode: "contain",
//                         height: hp(13),
//                         width: wp(13),
//                         marginLeft: 10,}}
//                       />
//                     </TouchableOpacity>
//                   </View>
//                 </View>
//               </View>
//               {/* <TouchableOpacity onPress={() => Add()} style={{    backgroundColor: "#008080",
//     width: wp(40),
//     alignItems: "center",
//     justifyContent: "center",
//     flexDirection: "row",
//     borderColor: "#008080",
//     borderRadius: 50,
//     borderWidth: 1,marginTop:20}}>
//               <Text style={{ fontSize: 14,
//     color: "#fff",
//     fontFamily: "Axiforma-SemiBold",
//     textAlign: "center",
//     marginTop: 2,}}>{t("Add Child")}</Text>
//               <Image
//                 source={require("../../asset/Group-add.png")}
//                 style={Style.plusimg}
//               />
//             </TouchableOpacity> */}
//             </View>

//             {child2 == true && (
//               <View>
//                 <View
//                   style={{
//                     justifyContent: "flex-start",
//                     alignSelf: "flex-start",
//                     marginTop: open1 ? "35%" : 20,
//                   }}
//                 >
//                   <Text style={Style.text1}>{t("Child 2 details")}</Text>
//                 </View>
//                 <View style={Style.TextFieldView1}>
//                   <TextInput
//                     placeholderTextColor="grey"
//                     underlineColor="transparent"
//                     style={Style.textInput}
//                     placeholder={t("Child's name ")}
//                     onChangeText={(text) => setChildname1(text)}
//                   />
//                   <Image
//                     source={require("../../asset/Profile.png")}
//                     style={Style.imgIcon}
//                   />
//                 </View>

//                 <View style={Style.View7}>
//                   <View style={Style.TextFieldView2}>
//                     {dob2 == "" ? (
//                       <Text
//                         style={{
//                           fontFamily: "Axiforma-Regular",
//                           color: "#737373",
//                           fontSize: 13,
//                         }}
//                       >
//                         {t("Date of birth")}
//                       </Text>
//                     ) : (
//                       <Text
//                         style={{
//                           fontFamily: "Axiforma-Regular",
//                           color: "#737373",
//                           fontSize: 13,
//                         }}
//                       >
//                         {dob2 == "" ? "" : dob2.toLocaleDateString()}
//                       </Text>
//                     )}

//                     <TouchableOpacity onPress={() => setOpen2(true)}>
//                       <Image
//                         source={require("../../asset/Calendar.png")}
//                         style={Style.imgIcon1}
//                       />
//                     </TouchableOpacity>

//                     <DatePicker
//                       modal
//                       open={open2}
//                       date={date2}
//                       title="Birthday"
//                       placeholder="Birthday"
//                       // minimumDate={minimum_child_date}
//                       maximumDate={new Date()}
//                       format="MM/DD/YYYY"
//                       onConfirm={(date) => {
//                         setOpen2(false);
//                         setdob2(date);
//                         setChildbirthdate1(date);
//                       }}
//                       onCancel={() => {
//                         setOpen(false);
//                       }}
//                       mode={"date"}
//                     />
//                     <View style={{ flexDirection: "row", marginHorizontal:5}}>
//                       <TouchableOpacity onPress={() => sub()}>
//                         <Image
//                           source={require("../../asset/Group-sub.png")}
//                           style={{resizeMode: "contain",
//                           height: hp(13),
//                           width: wp(13),
//                           marginLeft: 19,}}
//                         />
//                       </TouchableOpacity>
//                       <TouchableOpacity onPress={() => setchild3(true)}>
//                         <Image
//                           source={require("../../asset/Group-add.png")}
//                           style={Style.image1}
//                         />
//                       </TouchableOpacity>
//                     </View>
//                   </View>
//                 </View>
//               </View>
//             )}
//             {child3 == true && (
//               <View>
//                 <View
//                   style={{
//                     justifyContent: "flex-start",
//                     alignSelf: "flex-start",
//                     marginTop: open1 ? "35%" : 20,
//                   }}
//                 >
//                   <Text style={Style.text1}> {t("Child 3 details")}</Text>
//                 </View>
//                 <View style={Style.TextFieldView1}>
//                   <TextInput
//                     placeholderTextColor="grey"
//                     underlineColor="transparent"
//                     style={Style.textInput}
//                     placeholder={t("Child's name ")}
//                     onChangeText={(text) => setChildname2(text)}
//                   />
//                   <Image
//                     source={require("../../asset/Profile.png")}
//                     style={Style.imgIcon1}
//                   />
//                 </View>

//                 <View style={Style.View7}>
//                   <View style={Style.TextFieldView2}>
//                     {/* {/ <Image source={require("../../assets/recruiter/Vector-1.png")} style={{resizeMode:'contain',height:hp(2.5),width:wp(10)}}/> /} */}
//                     {dob3 == "" ? (
//                       <Text
//                         style={{
//                           fontFamily: "Axiforma-Regular",
//                           color: "#737373",
//                           fontSize: 14,
//                         }}
//                       >
//                         {t("Date of birth")}
//                       </Text>
//                     ) : (
//                       <Text
//                         style={{
//                           fontFamily: "Axiforma-Regular",
//                           color: "#737373",
//                           fontSize: 14,
//                         }}
//                       >
//                         {dob3 == "" ? "" : dob3.toLocaleDateString()}
//                       </Text>
//                     )}
//                     <TouchableOpacity onPress={() => setOpen3(true)}>
//                       <Image
//                         source={require("../../asset/Calendar.png")}
//                         // style={Style.imgIconss1}
//                         style={{   resizeMode: "contain",
//                         height: hp(2.5),
//                         width: wp(13),
//                         marginLeft: 67,}}
//                       />
//                     </TouchableOpacity>

//                     <DatePicker
//                       modal
//                       open={open3}
//                       date={date3}
//                       title="Birthday"
//                       placeholder="Birthday"
//                       // minimumDate={minimum_child_date}
//                       maximumDate={new Date()}
//                       format="MM-DD-YYYY"
//                       onConfirm={(date) => {
//                         setOpen3(false);
//                         setdob3(date);
//                         setChildbirthdate2(date);
//                       }}
//                       onCancel={() => {
//                         setOpen(false);
//                       }}
//                       mode={"date"}
                   
//                     />
                 

//                     <View style={{ flexDirection: "row", marginHorizontal:0 }}>
//                       <TouchableOpacity onPress={() => sub()}>
//                         <Image
//                           source={require("../../asset/Group-sub.png")}
//                           style={{resizeMode: "contain",
//                           height: hp(13),
//                           width: wp(13),
//                           marginLeft: 19,}}
//                         />
//                       </TouchableOpacity>
//                       {/* <TouchableOpacity>
//                         <Image
//                           source={require("../../asset/Group-add.png")}
//                           style={Style.image1}
//                         />
//                       </TouchableOpacity> */}
//                     </View>
//                   </View>
//                 </View>
//               </View>
//             )}
//             {!child3 == true&&(
//               <TouchableOpacity onPress={() => Add()} style={{    backgroundColor: "#008080",
//     width: wp(40),
//     height:hp(7),
//     alignItems: "center",
//     justifyContent: "center",
//     flexDirection: "row",
//     borderColor: "#008080",
//     borderRadius: 50,
//     borderWidth: 1,marginTop:20}}>
//               <Text style={{ fontSize: 14,
//     color: "#fff",
//     fontFamily: "Axiforma-SemiBold",
//     textAlign: "center",
//     marginTop: 2,}}>{t("Add Child")}</Text>
//               <Image
//                 source={require("../../asset/Group-add.png")}
//                 style={Style.plusimg}
//               />
//             </TouchableOpacity>
//             )

//             }
  
//             <View style={Style.View8}>
//               <TouchableOpacity
//                 style={{ marginLeft: "10%" }}
//                 onPress={toggleModal}
//               >
//                 <Text style={{ fontSize: 18, color: "grey" }}>
//                   {t("Save for later")}
//                 </Text>
//               </TouchableOpacity>
//               <TouchableOpacity
//                 style={Style.next}
//                 onPress={() => Onsubmit()}
//               >
//                  {loading == true ? (
//                     <ActivityIndicator size="small" color="white" style={{paddingTop:12}} />
//                   ) : (
//                 <Text style={Style.nextText}>{t("Next")} </Text>
//                   )}
//               </TouchableOpacity>
//             </View>
//             <View style={{ flexDirection: "row" }}></View>
//             {isModalVisible == true && (
//               <Modal isVisible={isModalVisible}>
//                 <View style={Style.modalView}>
//                   <View style={Style.modalView1}>
//                     <TouchableOpacity
//                       onPress={toggleModal}
//                       style={{ marginLeft: "10%" }}
//                     >
//                       <Image
//                         style={Style.crossIcon}
//                         resizeMode="contain"
//                         source={require("../../asset/cross.png")}
//                       />
//                     </TouchableOpacity>
//                     <TouchableOpacity
//                       onPress={toggleModal}
//                       style={{ alignItems: "center" }}
//                     >
//                       <Image
//                         style={Style.modalImg}
//                         resizeMode="contain"
//                         source={require("../../asset/Ciricle.png")}
//                       />
//                     </TouchableOpacity>

//                     <View style={Style.View9}>
//                       <Text style={Style.modaltext}>
//                         {t("Your data has been saved until you return, please be aware that until your profile has been created, you will not be able to join any groups")}
//                       </Text>

//                     </View>
//                     <View style={Style.View10}>
//                       <TouchableOpacity
//                         style={Style.NoBtn}
//                         onPress={() => toggleModal(false)}
//                       >
//                         <Text style={Style.Btn}>{t("No")}</Text>
//                       </TouchableOpacity>
//                       <TouchableOpacity
//                         style={Style.YesBtn}
//                         onPress={() => {
//                       //  saveforlater(),
//                        toggleModal(false),onsave()
//                         }}
                        
//                       >
//  {/* {loader == true ? (
//                     <ActivityIndicator size="small" color="white" style={{paddingTop:12}} />
//                   ) : ( */}
//                         <Text style={Style.Btn}> {t("Yes")} </Text>
//                   {/* )} */}
//                       </TouchableOpacity>
//                     </View>
//                   </View>
//                 </View>
//               </Modal>
//             )}
//             {isModalVisible1 == true && (
//               <Modal isVisible={isModalVisible1}>
//                 <View styleju={Style.modalView}>
//                   <View style={Style.modalView1}>
//                     <TouchableOpacity
//                       onPress={toggleModal1}
//                       style={Style.View11}
//                     >
//                       <Image
//                         style={Style.crossIcon}
//                         resizeMode="contain"
//                         source={require("../../asset/cross.png")}
//                       />
//                     </TouchableOpacity>
//                     <TouchableOpacity
//                       onPress={toggleModal1}
//                       style={{ alignItems: "center" }}
//                     >
//                       <Image
//                         style={Style.modalImg}
//                         resizeMode="contain"
//                         source={require("../../asset/wait-icon.png")}
//                       />
//                     </TouchableOpacity>

//                     <View style={Style.View9}>
//                       <Text style={Style.modaltext} te>
//                         {t("Please wait ...")}
//                       </Text>
//                       <Text style={Style.modaltext1}>
//                         {t("We are searching for the groups that")}
//                       </Text>
//                       <Text style={Style.modaltext1}>
//                         matches your preferences.
//                       </Text>
//                     </View>
//                   </View>
//                 </View>
//               </Modal>
//             )}
//             {isVisible == true && (
//               <Modal
//                 isVisible={true}
//                 onBackdropPress={() => {
//                   setisVisible(!isVisible);
//                 }}
//               >
//                 <View
//                   style={{
//                     backgroundColor: "white",
//                     borderRadius: 20,
//                     paddingBottom: 10,
//                     marginHorizontal: 20,
//                   }}
//                 >
//                   <TouchableOpacity
//                     onPress={() => setisVisible(false)}
//                     style={{
//                       marginTop: 10,
//                       alignItems: "flex-end",
//                       marginRight: 25,
//                     }}
//                   >
//                     <Image
//                       source={require("../../asset/cross.png")}
//                       style={{ resizeMode: "contain", height: 35, width: 35 }}
//                     />
//                   </TouchableOpacity>
//                   <View
//                     style={{
//                       height: 100,
//                       width: "100%",
//                       flexDirection: "row",
//                       alignItems: "center",
//                       justifyContent: "center",
//                     }}
//                   >
//                     <TouchableOpacity
//                       onPress={() => OpenCamera()}
//                       style={{
//                         backgroundColor: "#008080",
//                         justifyContent: "center",
//                         alignItems: "center",
//                         height: 52,
//                         borderRadius: 50,
//                         width: 120,
//                         marginHorizontal: 10,
//                         flexDirection: "row",
//                       }}
//                     >
//                       <Image
//                         source={require("../../asset/camera-icon.png")}
//                         style={{ height: 22, width: 35, tintColor: "white" }}
//                       />
//                       <Text style={{ color: "white", fontSize: 16 }}>
//                         Camera
//                       </Text>
//                     </TouchableOpacity>
//                     <TouchableOpacity
//                       onPress={() => openGallery()}
//                       style={{
//                         backgroundColor: "#008080",
//                         justifyContent: "center",
//                         alignItems: "center",
//                         height: 52,
//                         marginHorizontal: 5,
//                         borderRadius: 50,
//                         marginHorizontal: 10,
//                         width: 120,
//                         flexDirection: "row",
//                       }}
//                     >
//                       <Image
//                         resizeMode="contain"
//                         source={require("../../asset/gallery.png")}
//                         style={{ height: 22, width: 35, tintColor: "white" }}
//                       />
//                       <Text style={{ color: "white", fontSize: 16 }}>
//                         Gallery
//                       </Text>
//                     </TouchableOpacity>
//                   </View>
//                 </View>
//               </Modal>
//             )}
          
//           </View>
//         </KeyboardAwareScrollView>
//       </ImageBackground>
//     </View>
//   );
// };
// const full_app =  withTranslation()(CompleteProfile)
// export default full_app;
// // export default CompleteProfile;
// const Style = StyleSheet.create({
//   MainContainer: {
//     flex: 1,
//     // backgroundColor:'#F9FBDB'
//   },
//   crossIcon: {
//     height: hp(3),
//     width: hp(3),
//   },
//   modaltext1: {
//     alignSelf: "center",
//     fontSize: 14,
//     color: "black",
//     alignSelf: "center",
//     fontFamily: "Axiforma-Medium",
//     marginHorizontal: 18,
//     marginTop: 3,
//   },
//   View11: {
//     width: "15%",
//     alignSelf: "flex-end",
//   },
//   modalImg: {
//     height: hp(15),
//     width: hp(15),
//   },
//   image: {
//     resizeMode: "contain",
//     height: hp(13),
//     width: wp(13),
//     marginLeft: 15,
//   },
//   NoBtn: {
//     backgroundColor: "#A6A6A6",
//     width: wp(32),
//     justifyContent: "center",
//     height: hp(7),
//     paddingHorizontal: 10,
//     borderRadius: 50,
//   },
//   YesBtn: {
//     backgroundColor: "#008080",
//     width: wp(32),
//     justifyContent: "center",
//     height: hp(7),
//     marginLeft: 15,
//     borderRadius: 50,
//   },

//   next: {
//     backgroundColor: "#008080",
//     width: wp(40),
//     marginLeft: "10%",
//     justifyContent: "center",
//     height: hp(6),
//     borderRadius: 50,
//   },
//   Addchild: {
//     backgroundColor: "#fff",
//     width: wp(85),
//     alignItems: "center",
//     justifyContent: "center",
//     flexDirection: "row",
//     borderColor: "#008080",
//     borderRadius: 50,
//     borderWidth: 1,
//   },
//   View9: {
//     alignItems: "center",
//     marginTop: 5,
//   },
//   View10: {
//     marginTop: 30,
//     flexDirection: "row",
//   },
//   nextText: {
//     alignSelf: "center",
//     color: "white",
//     fontSize: 16,
//     fontFamily: "Axiforma-Medium",
//   },
//   modalView: {
//     justifyContent: "center",
//     backgroundColor: "white",
//     borderRadius: 15,
//     shadowColor: "#737373",
//     marginHorizontal: 10,
//     shadowOffset: { width: 2, height: 4 },
//     shadowOpacity: 0.3,
//     shadowRadius: 3,
//     elevation: 10,
//   },
//   modalView1: {
//     backgroundColor: "white",
//     paddingTop: 15,
//     borderRadius: 15,
//     paddingBottom: "15%",
//     marginHorizontal: 25,
//     alignItems: "center",
//   },
//   modalView2: {},
//   modaltext: {
//     fontSize: 27,
//     fontFamily: "Axiforma-Bold",
//     color: "grey",
//     lineHeight: 30,
//   },
//   View8: {
//     flexDirection: "row",
//     alignItems: "center",
//     paddingLeft: 25,
//     paddingEnd: 25,
//     marginTop: "15%",
//     paddingBottom: "5%",
//   },
//   image1: {
//     resizeMode: "contain",
//     height: hp(13),
//     width: wp(13),
//     marginLeft: 8,
//   },
//   image2: {
//     resizeMode: "contain",
//     height: hp(13),
//     width: wp(13),
//     marginLeft: 8,
//   },
//   ImageBackground: {
//     flex: 1,
//     height: "100%",
//     width: "100%",
//     // backgroundColor:'#F9FBDB'
//   },
//   text1: {
//     fontSize: 15,
//     fontFamily: "Axiforma-SemiBold",
//     color: "#008080",
//   },
//   addchildtext: {
//     fontSize: 14,
//     color: "#008080",
//     fontFamily: "Axiforma-SemiBold",
//     textAlign: "center",
//     marginTop: 2,
//   },

//   img1: {
//     alignSelf: "center",
//     marginLeft: 10,
//     marginTop: 20,
//     width: "50%",
//     height: "30%",
//     resizeMode: "contain",
//   },
//   img: {
//     marginLeft: 40,
//     width: 27,
//     height: 27,
//     marginTop: 30,
//     resizeMode: "contain",
//     tintColor: "#F9FBDB",
//   },
//   img2: {
//     alignSelf: "center",
//     width: 110,
//     height: 110,
//     borderRadius: 110 / 2,
//     borderColor: "#F9FBDB",
//   },
//   text: {
//     fontSize: hp(2),
//     color: "grey",
//     alignSelf: "center",
//   },

//   imgIcon: {
//     resizeMode: "contain",
//     height: hp(2.5),
//     width: wp(10),
//   },
//   imgIcon1: {
//     resizeMode: "contain",
//     height: hp(2.5),
//     width: wp(10),
//     marginLeft: 80,
//   },
//   imgIconss1: {
//     resizeMode: "contain",
//     height: hp(2.5),
//     width: wp(10),
//     marginLeft: 63,
//   },
//   imgIcon11: {
//     resizeMode: "contain",
//     height: hp(2.5),
//     width: wp(10),
//     marginLeft: 80,
//   },

//   TextProfile: {
//     fontSize: 26,
//     color: "#F9FBDB",
//     fontFamily: "Axiforma-Bold",
//     marginTop: 15,
//   },
//   ImageBackground1: {
//     width: "100%",
//     height: "100%",
//   },
//   backBtn: {
//     height: hp(6),
//     width: wp(10),
//     justifyContent: "center",
//     alignItems: "center",
//     marginTop: 10,
//   },
//   View1: {
//     justifyContent: "space-between",
//     alignItems: "center",
//     marginTop: "10%",
//   },
//   View2: {
//     alignItems: "center",
//     justifyContent: "center",
//     padding: 20,
//   },
//   View3: {
//     flexDirection: "row",
//     alignItems: "center",
//     justifyContent: "center",
//   },
//   View4: {
//     marginTop: hp(3),
//     marginBottom: hp(3),
//   },
//   View44: {
//     marginTop: hp(0),
//     marginBottom: hp(3),
//   },

//   View7: {
//     flexDirection: "row",
//     alignItems: "flex-start",
//   },
//   Btn: {
//     alignSelf: "center",
//     color: "white",
//     fontSize: 16,
//     fontFamily: "Axiforma-Bold",
//   },

//   TextFieldView: {
//     paddingLeft: "7%",
//     height: hp(7),
//     width: wp(85),
//     flexDirection: "row",
//     alignItems: "center",
//     borderRadius: 25,
//     padding: wp(2),
//     backgroundColor: "white",
//     borderColor: "#DFE3A3",
//     borderWidth: 1,
//   },
//   TextFieldView1: {
//     paddingLeft: "7%",
//     height: hp(7),
//     width: wp(85),
//     flexDirection: "row",
//     alignItems: "center",
//     borderRadius: 25,
//     padding: wp(2),
//     marginTop: hp(3),
//     backgroundColor: "white",
//     borderColor: "#DFE3A3",
//     borderWidth: 1,
//     justifyContent: "space-between",
//   },
//   TextFieldView2: {
//     paddingRight: "7%",
//     paddingLeft: "7%",
//     height: hp(7),
//     width: 220,
//     marginEnd: "32%",
//     flexDirection: "row",
//     alignItems: "center",
//     borderRadius: 25,
//     padding: wp(2),
//     marginTop: hp(3),
//     borderColor: "#DFE3A3",
//     borderWidth: 1,
//     backgroundColor: "white",
//     justifyContent: "space-between",
//   },
//   textInput: {
//     backgroundColor: "white",
//     fontSize: 13,
//     width: wp(65),
//     height: hp(6),
//     fontFamily: "Axiforma-Regular",
//     color: "#737373",
//   },
//   textInput1: {
//     backgroundColor: "white",
//     fontSize: hp(2),
//     width: wp(35),
//     height: hp(6),
//     color: "#737373",
//   },

//   edit: {
//     alignSelf: "center",
//     marginBottom: 60,
//     marginLeft: -25,
//     width: 30,
//     height: 30,
//   },

//   dropdown: {
//     alignSelf: "center",
//     borderColor: "#DFE3A3",
//     borderWidth: 1,
//     height: hp(7),
//     width: wp(85),
//     borderRadius: 25,
//     paddingLeft: "8%",
//     paddingEnd: "7%",
//     backgroundColor: "white",
//   },
//   icon: {
//     marginRight: 5,
//   },
//   label: {
//     position: "absolute",
//     backgroundColor: "white",
//     left: 22,
//     top: 8,
//     zIndex: 999,
//     paddingHorizontal: 8,
//     fontSize: 14,
//   },
//   placeholderStyle: {
//     fontSize: 16,
//   },
//   selectedTextStyle: {
//     fontSize: 16,
//   },
//   iconStyle: {
//     width: 20,
//     height: 20,
//   },
//   inputSearchStyle: {
//     height: 40,
//     fontSize: 16,
//   },
//   plusimg: {
//     resizeMode: "contain",
//     height: hp(5),
//     width: wp(5),
//     marginLeft: 8,
//   },
//   dropdownItem: {
//     color: "red",
//   },
//   container: {
//         flex: 1,
//         backgroundColor: 'white',
//         padding: 10,
//       },
//       titleText: {
//         padding: 8,
//         fontSize: 16,
//         textAlign: 'center',
//         fontWeight: 'bold',
//       },
//       headingText: {
//         padding: 8,
//       },
//       textInputStyle: {
//         height: 40,
//         borderWidth: 1,
//         paddingLeft: 20,
//         margin: 5,
//         borderColor: '#009688',
//         backgroundColor: '#FFFFFF',
//       }
// });










import React, { useRef, useState, useEffect, useCallback,Fragment } from "react";
import {
  TextInput,
  TouchableOpacity,
  ImageBackground,
  SafeAreaView,
  StyleSheet,
  Text,
  View,
  Image,
  FlatList,
  Dimensions,
  ActivityIndicator
} from "react-native";
import axios from "axios";

import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import { useTranslation, withTranslation, Trans } from 'react-i18next';
import '../translation/i18n'
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import DatePicker from "react-native-date-picker";
import ImagePicker from "react-native-image-crop-picker";
import Modal from "react-native-modal";
import { Dropdown, MultiSelect } from "react-native-element-dropdown";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useIsFocused } from "@react-navigation/native";
import { AutocompleteDropdown } from 'react-native-autocomplete-dropdown';
import { t } from "i18next";
import constants from "../constants/constants";
import { add } from "react-native-reanimated";
import SearchableDropdown from 'react-native-searchable-dropdown';
import { ScrollView } from "react-native-gesture-handler";
import moment from "moment";
const CompleteProfile = ({ navigation, route }) => {
  const {t, i18n} = useTranslation();
  const isFocused = useIsFocused();
  const [isModalVisible, setModalVisible] = useState(false);
  const [isModalVisible1, setModalVisible1] = useState(false);
  const [isVisible, setisVisible] = useState(false);
  const [userToken, setUserToken] = useState("");
  const [Zipcode, setZIP_code] = useState([]);
  const [minimum_child_date, setMiniumum_child_date] = useState();
  const [searchlist, setSearchlist] = useState([]);
  const [searchT, setSearchT] = useState(false)
  const [filteredDataSource, setFilteredDataSource] = useState([]);
  const[searchTerm,setsearchTerm]=useState("")
  const [selectedValues, setSelectedValues] = useState([]);
  const [placeholder_val,setplaceholder_val] =useState('Placeholder')
  const [selectedItems, setSelectedItems] = useState([]);
  const [infovisible1, setinfovisible1] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);
  const [suggestionsList, setSuggestionsList] = useState([])
  const [loading, setLoading] = useState(false)
  const[loader,setLoader]=useState(false)
  const searchRef = useRef(null)
  const dropdownController = useRef(null)
 
  const addItem = (item) => {
    setSelectedItems(item)
}
  const toggleModal2 = () => {
    setisVisible(!isVisible);
  };
  const searchUpdated=(item)=>{
    setZIP_code(item)
    setsearchTerm({item})
  }
  useEffect(() => {
    const d = new Date();
    setMiniumum_child_date(new Date(d.setFullYear(d.getFullYear()-5)))
    getToken();
  }, [isFocused]);
  const getToken = async () => {
    var token = await AsyncStorage.getItem("token");

    setUserToken(JSON.parse(token));
    Zip_code(JSON.parse(token));
  };
  const toggleModal = () => {
    setModalVisible(!isModalVisible);
  };
  const toggleModal1 = () => {
    setModalVisible1(!isModalVisible1);
  };
  const [myImage, setMyImage] = useState("");

  const openGallery = (response) => {
    ImagePicker.openPicker({
      width: 300,
      height: 400,
      cropping: true,
    }).then((image) => {
      setMyImage(image.path);
      setisVisible(false);
      uploadimage(image.path);
    });
  };
  const OpenCamera = (response) => {
    ImagePicker.openCamera({
      width: 300,
      height: 400,
      cropping: true,
    }).then((image) => {
      setMyImage(image.path);
      setisVisible(false);
      uploadimage(image.path);

    });
  };
  const getSuggestions = useCallback(async q => {
    const filterToken = q.toLowerCase()
    // console.log('getSuggestions', q)
    if (typeof q !== 'string' || q.length < 3) {
      setZIP_code()
      return
    }
    setLoading(true)
    const response = await fetch('https://jsonplaceholder.typicode.com/posts')
    const items = await response.json()
    const suggestions = items
    // console.log("ggjjgjdg",suggestions)
      .filter(item => item.title.toLowerCase().includes(filterToken))
      .map(item => ({
        id: item.id,
        title: item.title,
      }))
    setSuggestionsList(suggestions)
    setLoading(false)
  }, [])
  const onClearPress = useCallback(() => {
    setZIP_code(null)
  }, [])
  const onOpenSuggestionsList = useCallback(isOpened => {}, [])
  const [value, setValue] = useState(null);
  const [isFocus, setIsFocus] = useState(false);
  const [open, setOpen] = useState(false);
  const [time, setTime] = useState(false);
  const [time1, setTime1] = useState(false);
  const [date, setDate] = useState(new Date());
  const [date1, setDate1] = useState(new Date());
  const [time2, setTime2] = useState(false);
  const [date2, setDate2] = useState(new Date());
  const [date3, setDate3] = useState(new Date());
  const [child1, setchild1] = useState(false);
  const [child2, setchild2] = useState(false);
  const [child3, setchild3] = useState(false);
  const [dob, setdob] = useState("");
  const [dob1, setdob1] = useState("");
  const [dob2, setdob2] = useState("");
  const [dob3, setdob3] = useState("");
  const [open2, setOpen2] = useState(false);
  const [open3, setOpen3] = useState(false);
  const [value2, setValue2] = useState(false);
  const [open1, setOpen1] = useState(false);
  const [value1, setValue1] = useState(false);
  const [value3, setValue3] = useState(null);
  const [isFocus2, setIsFocus2] = useState(false);
  
  const data = [
    { label1:t("Male"), value1: t("Male") },
    { label1: t("Female"), value1: t("Female") },
    { label1: t("Other"), value1: t("Other") },
  ];
  const data1 = [
    { label: t("Partnered"), value:t("Partnered") },
    { label: t("Single"), value: t("Single") },
    { label: t("Rainbow"), value: t("Rainbow") },
    { label: t("Other"), value: t("Other")},
  ];
  const [parentname, setParentName] = useState("");
  const [gender, setGender] = useState("");
  const [birthdate, setBirthdate] = useState(new Date());
  const [emailaddress, setEmailaddress] = useState("");
  const [postalcode1, setPopstalcode1] = useState("");
  const [relation, setRelation] = useState("");
  const [childname, setChildname] = useState("");
  const [childname1, setChildname1] = useState("");
  const [childname2, setChildname2] = useState("");
  const [childbirthdate, setChildbirthdate] = useState("");
  const [childbirthdate1, setChildbirthdate1] = useState("");
  const [childbirthdate2, setChildbirthdate2] = useState("");
  const [save, setSave] = useState("");
  const [image, setImage] = useState();
  const [search, setSearch] = useState('');
  const[loader1,setLoader1]=useState(false)
  const Add = () => {
     if(child2 == false) {
      setchild2(true);
    } else if (child3 == false) {
      setchild3(true);
    }
 
  };

  const sub = () => {
    if (child3 == true) {
    setchild3(false);
  } else if (child2 == true) {
    setchild2(false);
  }
  
  
};
const ItemView = ({item}) => {
  return (
    // Flat List Item
    <Text>{item.zipcode}
    </Text>
  );
};

const onsave = async () => {
  var Name1 = parentname.replace(/\s/g, "");
  var Gender1 = gender;
  // var Dateofbirth = birthdate.toLocaleDateString();
  var Dateofbirth=moment(Dateofbirth).format('DD/MM/YYYY')
  var postal = postalcode1;
  var Relation1 = relation;
  var CHILD = childname;
  var CHILD1 = childname1;
  var CHILD2 = childname2;
  var CHILDBIRTH = childbirthdate == "" ? "" :moment(childbirthdate).format('DD/MM/YYYY') ;
  // var CHILDBIRTH = childbirthdate == "" ? "" : childbirthdate.toLocaleDateString();
  var CHILDBIRTH1 = childbirthdate1 == "" ? "" :moment(childbirthdate1).format('DD/MM/YYYY') ;
  var CHILDBIRTH2 = childbirthdate2 == "" ? "" :moment(childbirthdate2).format('DD/MM/YYYY') ;

  var New_Profiledetail = {
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

  var token = await AsyncStorage.getItem("token");
  var USERID = await AsyncStorage.getItem("user_id");
   
      setLoader(true)
      var data = new FormData();
      data.append("name",Name1);
      data.append("gender",Gender1);
      data.append("dob",Dateofbirth);
      data.append("postal",postal );
      data.append("relationship",Relation1 );
      data.append("children[0][name]", CHILD);
      data.append("children[0][dob]", CHILDBIRTH);
      data.append("children[1][name]",CHILD1);
      data.append("children[1][dob]",CHILDBIRTH1);
      data.append("children[2][name]", CHILD2);
      data.append("children[2][dob]",CHILDBIRTH2);
      data.append("page_no", 1);
   

      //  console.log("completeprofileeeeee",data)
      var config = {
        method: "post",
        url: constants.BASE_URL + "api/profile/save_for_later",
        headers: {
          Authorization: "Bearer " + JSON.parse(token),
        },
        data: data,
      };
  
      axios(config)
        .then(async (response) => {
          // console.log("ghhghghgjgjgjj", response.data);
          await AsyncStorage.setItem("P_DETAIL", JSON.stringify(New_Profiledetail));
          // console.log("fffffeeee",JSON.stringify(New_Profiledetail))
          await AsyncStorage.setItem("COMPLETE_PROFILE",JSON.stringify(response.data.complete_profile))
       
        
          // setLoader(false)
            navigation.navigate("MyTabs");
       
        })
        .catch(function (error) {
          // setLoader(false)
          // console.log("YESSSS", error);
        });

  
    }

  const Zip_code = async (tokkken) => {
    var requestOptions = {
      method: "GET",
      headers: new Headers({
        Authorization: `Bearer ${tokkken}`,
      }),
      redirect: "follow",
    };
    fetch(constants.BASE_URL + "api/zipcodes", requestOptions)
      .then((response) => response.text())
      .then((result) => {
        // console.log(result);
        var data = JSON.parse(result);
        setZIP_code(data.data);
        
      })
      .catch((error) => console.log("error", error));
  };
  const Onsubmit = async () => {
    setLoader1(true)
    var Name1 = parentname.replace(/\s/g, "");
    var Gender1 = gender;
    var Dateofbirth = birthdate.toLocaleDateString();
    var postal = postalcode1;
    var Relation1 = relation;
    var CHILD = childname;
    var CHILD1 = childname1;
    var CHILD2 = childname2;
    var CHILDBIRTH = childbirthdate == "" ? "" : childbirthdate;
    var CHILDBIRTH1 = childbirthdate1 == '' ? "" : childbirthdate1.toLocaleDateString();
    var CHILDBIRTH2 = childbirthdate2 == "" ? "" : childbirthdate2.toLocaleDateString();

    var Profiledetail = {
      parent_name: Name1,
      genders: Gender1,
      // birth_date: Dateofbirth,
      birth_date:moment(Dateofbirth).format('DD/MM/YYYY'),
      postalcode: postal,
      relations: Relation1,
      childnames: CHILD,
      childnames1: CHILD1,
      childnames2: CHILD2,
      // childbirthdates: CHILDBIRTH,
      childbirthdates: moment(CHILDBIRTH).format('DD/MM/YYYY'),
      // childbirthdates1: CHILDBIRTH1,
      childbirthdates1: moment(CHILDBIRTH1).format('DD/MM/YYYY'),
      // childbirthdates2: CHILDBIRTH2,
      childbirthdates2: moment(CHILDBIRTH2).format('DD/MM/YYYY'),
      save:1
    };
    if (Name1 == "") {
      alert (t("Please fill name"));
    }
    else if (Gender1 == "") {
      alert (t("Please fill gender"));
    }
    else if (Dateofbirth == "") {
      alert (t("Please fill Dateofbirth"));
    }
    else if (postal == "") {
      alert(t("Please fill Zip code"));
    }
    else if (Relation1 == "") {
      alert(t("Please fill your relationship status"));
    }
    else if (childname !== "" && childbirthdate == "") {
      alert(t("Please fill child Date of birth"));

    }
    else if (childname1 !== "" && childbirthdate1 == "") {
      alert(t("Please fill child Date of birth"));
    }
    else if (childname2 !== "" && childbirthdate2 == "") {
      alert(t("Please fill child Date of birth"));
    }
    else if (childname == "" && childbirthdate !== "") {
      alert(t("Please fill child name"));

    }
    else if (childname1 == "" && childbirthdate1 !== "") {
      alert(t("Please fill child name"));
    }
    else if (childname2 == "" && childbirthdate2 !== "") {
      alert(t("Please fill child name"));
    }
    else {

      await AsyncStorage.setItem("P_DETAIL", JSON.stringify(Profiledetail));
    
      // console.log("jjjfgffhiouihu",JSON.stringify(Profiledetail))
      // console.log("completeetet",Profiledetail)
      setLoader1(false)
     
      navigation.navigate("CompleteProfileStep2");

    }
  };
 
  const uploadimage = async (myImage) => {
    var token = await AsyncStorage.getItem("token");
    let filename = myImage.split("/").pop();
    let match = /\.(\w+)$/.exec(filename);

    let fileType = filename.split(".").pop();
    var obj = {
      uri: myImage,
      name: filename,
      type: `image/${fileType}`,
    };

    var axios = require("axios");
    var FormData = require("form-data");

    var formdata = new FormData();
    formdata.append("image", obj);
    var config = {
      method: "post",
      url: constants.BASE_URL + "api/profile/image",

      headers: {
        Authorization: "Bearer" + JSON.parse(token),
        "Content-Type": "multipart/form-data",
      },
      data: formdata,
    };

    axios(config)
      .then(async (response) => {
        setImage(response.data.data);
        await AsyncStorage.setItem("Image", response.data.data);
        await AsyncStorage.setItem("Childdetail", response.data.data[0].dob);
        await AsyncStorage.setItem("Childdetail2", response.data.data[2].name);
      })
      .catch(function (error) {

      });
  };

  return (
    <View style={Style.MainContainer}>
      <ImageBackground
        style={Style.ImageBackground}
        source={require("../../asset/Splash.png")}
      >
        <View style={{ height: 250 }}>
          <ImageBackground
            resizeMode="stretch"
            style={Style.ImageBackground1}
            source={require("../../asset/Ellipse-bg.png")}
          >
            <View>
              <View>
                <View style={{ flex: 0.2, flexDirection: "row", marginTop: 10 }}>
                  <TouchableOpacity
                    onPress={() => navigation.navigate("Login")}
                    style={Style.backBtn}
                  >
                    <Image
                      style={Style.img}
                      source={require("../../asset/back-button.png")}
                    />
                  </TouchableOpacity>
                </View>
                <View style={Style.View1}>
                  <Text style={Style.TextProfile}> {t("Complete profile")} </Text>
                  <Image
                    style={Style.img1}
                    source={require("../../asset/Steps.png")}
                  />
                </View>
              </View>
            </View>
            {myImage ? (
              <View style={Style.View3}>
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
                  <Image style={Style.img2} source={{ uri: myImage }} />
                </View>
                <TouchableOpacity onPress={toggleModal2}>
                  <Image
                    style={Style.edit}
                    source={require("../../asset/Edit.png")}
                  />
                </TouchableOpacity>
              </View>
            ) : (
              <View style={Style.View3}>
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
                    style={Style.img2}
                    source={require("../../asset/image28.png")}
                  />
                </View>
                <TouchableOpacity onPress={toggleModal2}>
                  <Image
                    style={Style.edit}
                    source={require("../../asset/Edit.png")}
                  />
                </TouchableOpacity>
              </View>
            )}
          </ImageBackground>
        </View>
        <KeyboardAwareScrollView style={{ marginTop: 60 }}>
          <View style={Style.View2}>
            <View style={Style.TextFieldView}>
              <TextInput
                placeholderTextColor="grey"
                underlineColor="transparent"
                style={Style.textInput}
                placeholder={t("Parent name")}
                onChangeText={(text) => setParentName(text)}
              />
              <Image
                source={require("../../asset/Profile.png")}
                style={Style.imgIcon}
              />
            </View>
            <View style={Style.View4}>
              <Dropdown
                style={[Style.dropdown]}
                data={data}
                textStyle={{ color: "red" }}
                maxHeight={300}
                labelField="label1"
                valueField="value1"
                maxSelect={3}
                placeholder={t("Gender")}
                containerStyle={{ borderRadius: 5 }}
                selectedTextStyle={{ color: "grey" }}
                itemTextStyle={{ color: "grey" }}
                placeholderStyle={{
                  fontFamily: "Axiforma-Regular",
                  fontSize: 13,
                  color: "grey",
                }}
                value={value3}
                onFocus={() => setIsFocus(true)}
                onBlur={() => setIsFocus(false)}
                onChange={(item) => {
                  setValue3(item.value1);
                  setIsFocus(false);
                  setGender(item.value1);
                }}
              />
            </View>
        
   <TouchableOpacity onPress={() => setOpen(true)}>
   <View
     style={{
       paddingLeft: "7%",
       height: hp(7),
       width: wp(85),
       flexDirection: "row",
       alignItems: "center",
       borderRadius: 25,
       padding: wp(2),
       marginTop: open2 ? "35%" : "0%",
       backgroundColor: "white",
       borderColor: "#DFE3A3",
       borderWidth: 1,
       justifyContent: "space-between",
     }}
   >
     {dob == "" ? (
       <Text
         style={{
           fontFamily: "Axiforma-Regular",
           color: "#737373",
           fontSize: 13,
         }}
       >
         {t("Date of birth")}
       </Text>
     ) : (
       <Text
         style={{
           fontFamily: "Axiforma-Regular",
           color: "#737373",
           fontSize: 13,
         }}
       >
        {moment(dob).format('DD/MM/YYYY')}
         {/* {dob == "" ? "" : dob.toLocaleDateString()} */}
       </Text>
     )}
     <TouchableOpacity onPress={() => Add()}>
       <Image
         source={require("../../asset/Calendar.png")}
         style={Style.imgIcon}
       />
     </TouchableOpacity>

     <DatePicker
       modal
       open={open}
       date={date}
       title="Birthday"
       placeholder="Birthday"
       // minimumDate={}
       format="MM/DD/YYYY"
       maximumDate={new Date()}
       onConfirm={(date) => {
         setOpen(false);
         setdob(date);
         setBirthdate(date);
       }}
       onCancel={() => {
         setOpen(false);
       }}
       mode={"date"}
     />
   </View>
 </TouchableOpacity>
            <View style={Style.View4}>
              <View style={{height:0,}}>
   
              </View>
        
              <Dropdown
                style={[Style.dropdown]}
                data={Zipcode}
                textStyle={{ color: "grey" }}
                maxHeight={300}
                labelField="zipcode"
                valueField="zipcode"
                maxSelect={3}
                placeholder={t("Zip code")}
                containerStyle={{ borderRadius: 5 }}
                selectedTextStyle={{ color: "grey" }}
                itemTextStyle={{ color: "grey" }}
                inputSearchStyle={{color:'grey'}}
               
                search
                searchPlaceholder={t("Search here")}
                placeholderStyle={{
                  fontFamily: "Axiforma-Regular",
                  fontSize: 13,
                  color: "grey",
                }}
                value={value2}
                onFocus={() => setIsFocus2(true)}
                onBlur={() => setIsFocus2(false)}
                onChange={(item) => {
                  setValue2(item.zipcode);
                  setPopstalcode1(item.zipcode);
                  //  searchFilterFunction(item.zipcode)
               
                }}
              />
              {/* {console.log("hjfgfjkghytt",Zipcode)} */}
            </View>

            <View style={Style.View44}>
              <View style={Style.dropDownView}>
                <Dropdown
                  style={[Style.dropdown]}
                  data={data1}
                  maxHeight={300}
                  labelField="label"
                  valueField="value"
                  placeholder={t("Relationship status")}
                  containerStyle={{ borderRadius: 5 }}
                  selectedTextStyle={{ color: "grey" }}
                  itemTextStyle={{ color: "grey" }}
                  placeholderStyle={{
                    fontFamily: "Axiforma-Regular",
                    fontSize: 13,
                    color: "grey",
                  }}
                  value={value}
                  onFocus={() => setIsFocus(true)}
                  onBlur={() => setIsFocus(false)}
                  onChange={(item) => {
                    setValue(item.value);
                    setIsFocus(false);
                    setRelation(item.value);
                  }}
                />
              </View>
            </View>
 

            <View>
              <View
                style={{
                  justifyContent: "flex-start",
                  alignSelf: "flex-start",
                  marginTop: open1 ? "35%" : 20,
                }}
              >
                <Text style={Style.text1}> {t("Child 1 details")}</Text>
              </View>
              
              <View style={Style.TextFieldView1}>
                <TextInput
                  placeholderTextColor="grey"
                  underlineColor="transparent"
                  style={Style.textInput}
                  placeholder={t("Child's name ")}
                  onChangeText={(text) => { setChildname(text)}}
                />
                <Image
                  source={require("../../asset/Profile.png")}
                  style={Style.imgIcon}
                />
              </View>

              <View style={Style.View7}>
                <View style={Style.TextFieldView2}>
                  {dob1 == "" ? (
                    <Text
                      style={{
                        fontFamily: "Axiforma-Regular",
                        color: "#737373",
                        fontSize: 13,
                      }}
                    >
                      {t("Date of birth")}
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
                      
                      {/* {dob1 == "" ? "" : dob1.toLocaleDateString()} */}
                    </Text>
                  )}
                  <TouchableOpacity onPress={() => setOpen1(true)}>
                    <Image
                      source={require("../../asset/Calendar.png")}
                      style={Style.imgIcon11}
                    />
                  </TouchableOpacity>
                  <DatePicker
                    modal
                    open={open1}
                    date={date2}
                    title="Birthday"
                    placeholder="Birthday"
                    // minimumDate={minimum_child_date}
                    maximumDate={new Date()}
                    // format="MM/DD/YYYY"
                    onConfirm={(date) => {
                     var datee= moment(birthdate).format('DD/MM/YYYY')
                  
                      setOpen1(false);
                      setdob1(date);
                      setChildbirthdate(date);
                    }}
                    onCancel={() => {
                      setOpen1(false);
                    }}
                    mode={"date"}
                  />

                  <View style={{ flexDirection: "row", marginHorizontal:5 }}>
                 {!child2==false&&(
                  <TouchableOpacity onPress={() =>sub()}>
                  <Image
                    source={require("../../asset/Group-sub.png")}
                    style={{resizeMode: "contain",
                    height: hp(13),
                    width: wp(13),
                    marginLeft:child2 ? 13 : 25}}
                  />
                </TouchableOpacity>
                 )}
                    
                    <TouchableOpacity onPress={() =>Add()}>
                      <Image
                        source={require("../../asset/Group-add.png")}
                        style={{resizeMode: "contain",
                        height: hp(13),
                        width: wp(13),
                        marginLeft:child2 ? 10 : 15,
                      
                        // marginTop: open1 ? "35%" : 20,
                      }}
                      />
                    </TouchableOpacity>
                  </View>
                </View>
              </View>
            
            </View>

            {child2 == true && (
              <View>
                <View
                  style={{
                    justifyContent: "flex-start",
                    alignSelf: "flex-start",
                    marginTop: open1 ? "35%" : 20,
                  }}
                >
                  <Text style={Style.text1}>{t("Child 2 details")}</Text>
                </View>
                <View style={Style.TextFieldView1}>
                  <TextInput
                    placeholderTextColor="grey"
                    underlineColor="transparent"
                    style={Style.textInput}
                    placeholder={t("Child's name ")}
                    onChangeText={(text) => setChildname1(text)}
                  />
                  <Image
                    source={require("../../asset/Profile.png")}
                    style={Style.imgIcon}
                  />
                </View>

                <View style={Style.View7}>
                  <View style={Style.TextFieldView2}>
                    {dob2 == "" ? (
                      <Text
                        style={{
                          fontFamily: "Axiforma-Regular",
                          color: "#737373",
                          fontSize: 13,
                        }}
                      >
                        {t("Date of birth")}
                      </Text>
                    ) : (
                      <Text
                        style={{
                          fontFamily: "Axiforma-Regular",
                          color: "#737373",
                          fontSize: 13,
                        }}
                      >
                        {moment(dob2).format('DD/MM/YYYY')}
                        {/* {dob2 == "" ? "" : dob2.toLocaleDateString()} */}
                      </Text>
                    )}

                    <TouchableOpacity onPress={() => setOpen2(true)}>
                      <Image
                        source={require("../../asset/Calendar.png")}
                        style={Style.imgIcon1}
                      />
                    </TouchableOpacity>

                    <DatePicker
                      modal
                      open={open2}
                      date={date2}
                      title="Birthday"
                      placeholder="Birthday"
                      // minimumDate={minimum_child_date}
                      maximumDate={new Date()}
                      format="MM/DD/YYYY"
                      onConfirm={(date) => {
                        setOpen2(false);
                        setdob2(date);
                        setChildbirthdate1(date);
                      }}
                      onCancel={() => {
                        setOpen(false);
                      }}
                      mode={"date"}
                    />
                    <View style={{ flexDirection: "row", marginHorizontal:5}}>
                      <TouchableOpacity onPress={() => sub()}>
                        <Image
                          source={require("../../asset/Group-sub.png")}
                          style={{resizeMode: "contain",
                          height: hp(13),
                          width: wp(13),
                          marginLeft: 5,}}
                        />
                      </TouchableOpacity>
                      <TouchableOpacity onPress={() => setchild3(true)}>
                        <Image
                          source={require("../../asset/Group-add.png")}
                          style={Style.image1}
                        />
                      </TouchableOpacity>
                    </View>
                  </View>
                </View>
              </View>
            )}
            {child3 == true && (
              <View>
                <View
                  style={{
                    justifyContent: "flex-start",
                    alignSelf: "flex-start",
                    marginTop: open1 ? "35%" : 20,
                  }}
                >
                  <Text style={Style.text1}> {t("Child 3 details")}</Text>
                </View>
                <View style={Style.TextFieldView1}>
                  <TextInput
                    placeholderTextColor="grey"
                    underlineColor="transparent"
                    style={Style.textInput}
                    placeholder={t("Child's name ")}
                    onChangeText={(text) => setChildname2(text)}
                  />
                  <Image
                    source={require("../../asset/Profile.png")}
                    style={Style.imgIcon1}
                  />
                </View>

                <View style={Style.View7}>
                  <View style={Style.TextFieldView2}>
                    {/* {/ <Image source={require("../../assets/recruiter/Vector-1.png")} style={{resizeMode:'contain',height:hp(2.5),width:wp(10)}}/> /} */}
                    {dob3 == "" ? (
                      <Text
                        style={{
                          fontFamily: "Axiforma-Regular",
                          color: "#737373",
                          fontSize: 14,
                        }}
                      >
                        {t("Date of birth")}
                      </Text>
                    ) : (
                      <Text
                        style={{
                          fontFamily: "Axiforma-Regular",
                          color: "#737373",
                          fontSize: 14,
                        }}
                      >
                        {moment(dob3).format('DD/MM/YYYY')}
                        {/* {dob3 == "" ? "" : dob3.toLocaleDateString()} */}
                      </Text>
                    )}
                    <TouchableOpacity onPress={() => setOpen3(true)}>
                      <Image
                        source={require("../../asset/Calendar.png")}
                        // style={Style.imgIconss1}
                        style={{   resizeMode: "contain",
                        height: hp(2.5),
                        width: wp(13),
                        marginLeft: 67,}}
                      />
                    </TouchableOpacity>

                    <DatePicker
                      modal
                      open={open3}
                      date={date3}
                      title="Birthday"
                      placeholder="Birthday"
                      // minimumDate={minimum_child_date}
                      maximumDate={new Date()}
                      format="MM-DD-YYYY"
                      onConfirm={(date) => {
                        setOpen3(false);
                        setdob3(date);
                        setChildbirthdate2(date);
                      }}
                      onCancel={() => {
                        setOpen(false);
                      }}
                      mode={"date"}
                   
                    />
                 

                    <View style={{ flexDirection: "row", marginHorizontal:2 }}>
                      <TouchableOpacity onPress={() => sub()}>
                        <Image
                          source={require("../../asset/Group-sub.png")}
                          style={{resizeMode: "contain",
                          height: hp(13),
                          width: wp(13),
                          marginLeft: 5,}}
                        />
                      </TouchableOpacity>
                      {/* <TouchableOpacity>
                        <Image
                          source={require("../../asset/Group-add.png")}
                          style={Style.image1}
                        />
                      </TouchableOpacity> */}
                    </View>
                  </View>
                </View>
              </View>
            )}
            {!child3 == true&&(
              <TouchableOpacity onPress={() => Add()} style={{    backgroundColor: "#008080",
    width: wp(40),
    height:hp(7),
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "row",
    borderColor: "#008080",
    borderRadius: 50,
    borderWidth: 1,marginTop:20}}>
              <Text style={{ fontSize: 14,
    color: "#fff",
    fontFamily: "Axiforma-SemiBold",
    textAlign: "center",
    marginTop: 2,}}>{t("Add Child")}</Text>
              <Image
                source={require("../../asset/Group-add.png")}
                style={Style.plusimg}
              />
            </TouchableOpacity>
            )

            }
  
            <View style={Style.View8}>
              <TouchableOpacity
                style={{ marginLeft: "10%" }}
                onPress={toggleModal}
              >
                <Text style={{ fontSize: 18, color: "grey" }}>
                  {t("Save for later")}
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={Style.next}
                onPress={() => Onsubmit()}
              >
                 {loading == true ? (
                    <ActivityIndicator size="small" color="white" style={{paddingTop:12}} />
                  ) : (
                <Text style={Style.nextText}>{t("Next")} </Text>
                  )}
              </TouchableOpacity>
            </View>
            <View style={{ flexDirection: "row" }}></View>
            {isModalVisible == true && (
              <Modal isVisible={isModalVisible}>
                <View style={Style.modalView}>
                  <View style={Style.modalView1}>
                    <TouchableOpacity
                      onPress={toggleModal}
                      style={{ marginLeft: "10%" }}
                    >
                      <Image
                        style={Style.crossIcon}
                        resizeMode="contain"
                        source={require("../../asset/cross.png")}
                      />
                    </TouchableOpacity>
                    <TouchableOpacity
                      onPress={toggleModal}
                      style={{ alignItems: "center" }}
                    >
                      <Image
                        style={Style.modalImg}
                        resizeMode="contain"
                        source={require("../../asset/Ciricle.png")}
                      />
                    </TouchableOpacity>

                    <View style={Style.View9}>
                      <Text style={Style.modaltext}>
                        {t("Your data has been saved until you return, please be aware that until your profile has been created, you will not be able to join any groups")}
                      </Text>

                    </View>
                    <View style={Style.View10}>
                      <TouchableOpacity
                        style={Style.NoBtn}
                        onPress={() => toggleModal(false)}
                      >
                        <Text style={Style.Btn}>{t("No")}</Text>
                      </TouchableOpacity>
                      <TouchableOpacity
                        style={Style.YesBtn}
                        onPress={() => {
                      //  saveforlater(),
                       toggleModal(false),onsave()
                        }}
                        
                      >
 {/* {loader == true ? (
                    <ActivityIndicator size="small" color="white" style={{paddingTop:12}} />
                  ) : ( */}
                        <Text style={Style.Btn}> {t("Yes")} </Text>
                  {/* )} */}
                      </TouchableOpacity>
                    </View>
                  </View>
                </View>
              </Modal>
            )}
            {isModalVisible1 == true && (
              <Modal isVisible={isModalVisible1}>
                <View styleju={Style.modalView}>
                  <View style={Style.modalView1}>
                    <TouchableOpacity
                      onPress={toggleModal1}
                      style={Style.View11}
                    >
                      <Image
                        style={Style.crossIcon}
                        resizeMode="contain"
                        source={require("../../asset/cross.png")}
                      />
                    </TouchableOpacity>
                    <TouchableOpacity
                      onPress={toggleModal1}
                      style={{ alignItems: "center" }}
                    >
                      <Image
                        style={Style.modalImg}
                        resizeMode="contain"
                        source={require("../../asset/wait-icon.png")}
                      />
                    </TouchableOpacity>

                    <View style={Style.View9}>
                      <Text style={Style.modaltext} te>
                        {t("Please wait ...")}
                      </Text>
                      <Text style={Style.modaltext1}>
                        {t("We are searching for the groups that")}
                      </Text>
                      <Text style={Style.modaltext1}>
                        matches your preferences.
                      </Text>
                    </View>
                  </View>
                </View>
              </Modal>
            )}
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
                        style={{ height: 22, width: 35, tintColor: "white" }}
                      />
                      <Text style={{ color: "white", fontSize: 16 }}>
                        Camera
                      </Text>
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
                      <Text style={{ color: "white", fontSize: 16 }}>
                        Gallery
                      </Text>
                    </TouchableOpacity>
                  </View>
                </View>
              </Modal>
            )}
          
          </View>
        </KeyboardAwareScrollView>
      </ImageBackground>
    </View>
  );
};
const full_app =  withTranslation()(CompleteProfile)
export default full_app;
// export default CompleteProfile;
const Style = StyleSheet.create({
  MainContainer: {
    flex: 1,
    // backgroundColor:'#F9FBDB'
  },
  crossIcon: {
    height: hp(3),
    width: hp(3),
  },
  modaltext1: {
    alignSelf: "center",
    fontSize: 14,
    color: "black",
    alignSelf: "center",
    fontFamily: "Axiforma-Medium",
    marginHorizontal: 18,
    marginTop: 3,
  },
  View11: {
    width: "15%",
    alignSelf: "flex-end",
  },
  modalImg: {
    height: hp(15),
    width: hp(15),
  },
  image: {
    resizeMode: "contain",
    height: hp(13),
    width: wp(13),
    marginLeft: 15,
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
  Addchild: {
    backgroundColor: "#fff",
    width: wp(85),
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "row",
    borderColor: "#008080",
    borderRadius: 50,
    borderWidth: 1,
  },
  View9: {
    alignItems: "center",
    marginTop: 5,
  },
  View10: {
    marginTop: 30,
    flexDirection: "row",
  },
  nextText: {
    alignSelf: "center",
    color: "white",
    fontSize: 16,
    fontFamily: "Axiforma-Medium",
  },
  modalView: {
    justifyContent: "center",
    backgroundColor: "white",
    borderRadius: 15,
    shadowColor: "#737373",
    marginHorizontal: 10,
    shadowOffset: { width: 2, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 3,
    elevation: 10,
  },
  modalView1: {
    backgroundColor: "white",
    paddingTop: 15,
    borderRadius: 15,
    paddingBottom: "15%",
    marginHorizontal: 25,
    alignItems: "center",
  },
  modalView2: {},
  modaltext: {
    fontSize: 27,
    fontFamily: "Axiforma-Bold",
    color: "grey",
    lineHeight: 30,
  },
  View8: {
    flexDirection: "row",
    alignItems: "center",
    paddingLeft: 25,
    paddingEnd: 25,
    marginTop: "15%",
    paddingBottom: "5%",
  },
  image1: {
    resizeMode: "contain",
    height: hp(13),
    width: wp(13),
    marginLeft: 8,
  },
  image2: {
    resizeMode: "contain",
    height: hp(13),
    width: wp(13),
    marginLeft: 8,
  },
  ImageBackground: {
    flex: 1,
    height: "100%",
    width: "100%",
    // backgroundColor:'#F9FBDB'
  },
  text1: {
    fontSize: 15,
    fontFamily: "Axiforma-SemiBold",
    color: "#008080",
  },
  addchildtext: {
    fontSize: 14,
    color: "#008080",
    fontFamily: "Axiforma-SemiBold",
    textAlign: "center",
    marginTop: 2,
  },

  img1: {
    alignSelf: "center",
    marginLeft: 10,
    marginTop: 20,
    width: "50%",
    height: "30%",
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
  img2: {
    alignSelf: "center",
    width: 110,
    height: 110,
    borderRadius: 110 / 2,
    borderColor: "#F9FBDB",
  },
  text: {
    fontSize: hp(2),
    color: "grey",
    alignSelf: "center",
  },

  imgIcon: {
    resizeMode: "contain",
    height: hp(2.5),
    width: wp(10),
  },
  imgIcon1: {
    resizeMode: "contain",
    height: hp(2.5),
    width: wp(10),
    marginLeft: 80,
  },
  imgIconss1: {
    resizeMode: "contain",
    height: hp(2.5),
    width: wp(10),
    marginLeft: 63,
  },
  imgIcon11: {
    resizeMode: "contain",
    height: hp(2.5),
    width: wp(10),
    marginLeft: 80,
  },

  TextProfile: {
    fontSize: 26,
    color: "#F9FBDB",
    fontFamily: "Axiforma-Bold",
    marginTop: 15,
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
    alignItems: "center",
    justifyContent: "center",
    padding: 20,
  },
  View3: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
  View4: {
    marginTop: hp(3),
    marginBottom: hp(3),
  },
  View44: {
    marginTop: hp(0),
    marginBottom: hp(3),
  },

  View7: {
    flexDirection: "row",
    alignItems: "flex-start",
  },
  Btn: {
    alignSelf: "center",
    color: "white",
    fontSize: 16,
    fontFamily: "Axiforma-Bold",
  },

  TextFieldView: {
    paddingLeft: "7%",
    height: hp(7),
    width: wp(85),
    flexDirection: "row",
    alignItems: "center",
    borderRadius: 25,
    padding: wp(2),
    backgroundColor: "white",
    borderColor: "#DFE3A3",
    borderWidth: 1,
  },
  TextFieldView1: {
    paddingLeft: "7%",
    height: hp(7),
    width: wp(85),
    flexDirection: "row",
    alignItems: "center",
    borderRadius: 25,
    padding: wp(2),
    marginTop: hp(3),
    backgroundColor: "white",
    borderColor: "#DFE3A3",
    borderWidth: 1,
    justifyContent: "space-between",
  },
  TextFieldView2: {
    paddingRight: "7%",
    paddingLeft: "7%",
    height: hp(7),
    width: 220,
    marginEnd: "32%",
    flexDirection: "row",
    alignItems: "center",
    borderRadius: 25,
    padding: wp(2),
    marginTop: hp(3),
    borderColor: "#DFE3A3",
    borderWidth: 1,
    backgroundColor: "white",
    justifyContent: "space-between",
  },
  textInput: {
    backgroundColor: "white",
    fontSize: 13,
    width: wp(65),
    height: hp(6),
    fontFamily: "Axiforma-Regular",
    color: "#737373",
  },
  textInput1: {
    backgroundColor: "white",
    fontSize: hp(2),
    width: wp(35),
    height: hp(6),
    color: "#737373",
  },

  edit: {
    alignSelf: "center",
    marginBottom: 60,
    marginLeft: -25,
    width: 30,
    height: 30,
  },

  dropdown: {
    alignSelf: "center",
    borderColor: "#DFE3A3",
    borderWidth: 1,
    height: hp(7),
    width: wp(85),
    borderRadius: 25,
    paddingLeft: "8%",
    paddingEnd: "7%",
    backgroundColor: "white",
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
  placeholderStyle: {
    fontSize: 16,
  },
  selectedTextStyle: {
    fontSize: 16,
  },
  iconStyle: {
    width: 20,
    height: 20,
  },
  inputSearchStyle: {
    height: 40,
    fontSize: 16,
  },
  plusimg: {
    resizeMode: "contain",
    height: hp(5),
    width: wp(5),
    marginLeft: 8,
  },
  dropdownItem: {
    color: "red",
  },
  container: {
        flex: 1,
        backgroundColor: 'white',
        padding: 10,
      },
      titleText: {
        padding: 8,
        fontSize: 16,
        textAlign: 'center',
        fontWeight: 'bold',
      },
      headingText: {
        padding: 8,
      },
      textInputStyle: {
        height: 40,
        borderWidth: 1,
        paddingLeft: 20,
        margin: 5,
        borderColor: '#009688',
        backgroundColor: '#FFFFFF',
      }
});

























