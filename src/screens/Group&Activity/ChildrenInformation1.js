import React,{useState,useEffect}from "react";
import { View,Text,TouchableOpacity,Image,ImageBackground,TextInput,StyleSheet, SliderBase ,ActivityIndicator} from "react-native";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';
import Modal from "react-native-modal";
import ImagePicker from 'react-native-image-crop-picker';
import axios from "axios";
import constants from "../constants/constants";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { ScrollView } from "react-native-gesture-handler";
import { resolvePlugin } from "@babel/core";
import { useIsFocused } from "@react-navigation/native";
import { useTranslation, withTranslation, Trans } from 'react-i18next';
import DatePicker from "react-native-date-picker";
import moment from "moment";
import '../translation/i18n'
const ChildInformation1=({navigation,route})=>{
  const {t, i18n} = useTranslation();
    const [isVisible, setisVisible] = useState(false)
  
    const[birthdate,setBirthdate]=useState("")
    const[image,setImage]=useState("")
   
    const[birthdate1,setBirthdate1]=useState("")
    const[image1,setImage1]=useState("")

    const[birthdate2,setBirthdate2]=useState("")
    const[image2,setImage2]=useState("")
   
    const[age,setAge]=useState([])
    const[namee,setNamee]=useState("")

    const[Childid,setChildID]=useState("")
    const[name,setName]=useState("")
    const[name1,setName1]=useState("")
    const[name2,setName2]=useState("")
    const[dob,setDob]=useState("")
    const[dob1,setDob1]=useState("")
    const[dob2,setDob2]=useState("")
    const [date, setDate] = useState(new Date());
    const[id1,setId1]=useState("")
    const[id2,setId2]=useState("")
    const[age1,setage1]=useState("")
    const[age2,setage2]=useState("")
    const[age3,setage3]=useState("")
    const[loader,setLoader]=useState(false)
   const[id,setid]=useState("")
   const [open, setOpen] = useState(false);
    const toggleModal2 = () => {
        setisVisible(!isVisible);
      };
      function hasOneDigit(val) {
        var newVlaue = 0;
        var valu = String(Math.abs(val)).charAt(0) == val;
        if (valu) {
          newVlaue = "0" + val;
        } else {
          newVlaue = val;
        }
        return newVlaue;
      }
      function monthName (date) {
    
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
    const [myImage, setMyImage] = useState("")

    
    const openGallery = () => {
      ImagePicker.openPicker({
        width: 300,
        height: 400,
        cropping: true
      }).then(image => {
        setMyImage(image.path)
        setisVisible(false)
        uploadimage(image.path)
      });
    }
    const OpenCamera = () => {          
      ImagePicker.openCamera({
        width: 300,
        height: 400,
        cropping: true,
      }).then(image => {
        setMyImage(image.path)
        setisVisible(false)
        uploadimage(image.path)
      });
    }
    useEffect(()=>{
     getdetails()
     FetchChildInfo()
      
  },[])
  const getdetails=(async()=>{
    var imgg=await AsyncStorage.getItem("Imagee")
    setMyImage(imgg)
    var id1=route.params.child_id
    setid(id1)
    var namee=route.params.child_name
    setName(namee)
    var dob=route.params.Child_birthdate
   
    setBirthdate(dob)
    var age=route.params.child_age
    setage2(age)
    var childage=age.replace(/^"(.*)"$/, "$1")
    var dateofbirth=dob.replace(/^"(.*)"$/, "$1")
    var IDD = route.params.Groupp_id;
    setChildID(IDD)
  })

    const Updatechildren=(async()=>{
      
      var token  = await AsyncStorage.getItem('token')
     
      // if(name==""){
      //   alert("Please fill child name")
      // }
      // else if(birthdate==""){
      //   alert("Please fill child Date of birth" )
      // }
      // else{
        setLoader(true)
        var dateess=moment(birthdate).format('DD/MM/YYYY')
        var data = new FormData();
        data.append('name',name );
        // data.append('dob', dateess==""?"":birthdate);
        data.append('dob', dateess);
        data.append('child_id',id);
        console.log('eklrukwur8573593rt895729577 392572389',data)
      // console.log('eklrukwur8573593rt895729577 392572389',data)
      var config = {
        method: 'post',
      url: constants.BASE_URL + "api/profile/children/info/update",
        headers: {                                           
          'Authorization': 'Bearer '+JSON.parse(token),
          "Content-Type": "multipart/form-data",
        },
       
        data : data
      };
      
      axios(config)
      .then(function (response) {
        // console.log("888988888888888888",JSON.stringify(response.data));
        if(response.data.status==true){
          alert(response.data.message)
          setAge(response.data.age)
          setName(response.data.data.name)
          setDob(response.data.data.dob)
          setMyImage(response.data.data.image)
          setLoader(false)
          navigation.navigate("Profile")
        
        }
      
        else{
          setLoader(false)
          alert(response.data.message)
        }

      })
    
      .catch(function (error) {
        setLoader(false)
      
      });
    // }
    })

  
const uploadimage=(async(Image)=>{
  var token  = await AsyncStorage.getItem('token')
  var langg =await AsyncStorage.getItem("langugae")
  let filename = Image.split("/").pop();
  let match = /\.(\w+)$/.exec(filename);
  let fileType = filename.split(".").pop();
  var obj = {
    uri: Image,
    name: filename,
    type: `image/${fileType}`,
  };
var data=new FormData()
data.append('image',obj );
data.append('child_id',id );
var config = {
  method: 'post',
     url: constants.BASE_URL + "api/profile/children/image",
  headers: { 
    'X-localization': langg, 
    'Authorization': 'Bearer '+ JSON.parse(token), 
    "Content-Type": "multipart/form-data",
  },
  data : data
};
axios(config)
.then(async (response)=> {
  if(response.data.status==true){
    setMyImage(response.data.data)
    alert(response.data.message)
    await AsyncStorage.setItem("Imagee",response.data.data)
  }

})
.catch(function (error) {

});
})
const FetchChildInfo=( async()=>{
  var token  = await AsyncStorage.getItem('token')
  var data = new FormData();
  data.append('child_id',route.params.child_id);
  var config = {
    method: 'post',
  url: constants.BASE_URL + "api/profile/child/info",
    headers: {                                           
      'Authorization': 'Bearer '+JSON.parse(token),
    },
    data : data
  };
  axios(config)
  .then(function (response) {
    if(response.data.status){
setMyImage(response.data.data.image)
    }
  })
  .catch(function (error) {
    
  });
})
    
    return(
<ImageBackground source={require('../../../Images/background.png')} style={styles.Container} resizeMode='stretch'  > 

<View style={styles.ViewStyle}   >
        <TouchableOpacity onPress={() => navigation.goBack()}>
        <Image source={require('../../../Images/Arrow-Left.png')} style={styles.IconStyle}    />
        </TouchableOpacity>
<Text style={{fontSize:24,fontFamily:'Axiforma-Bold',color:'#F9FBDB'}} >{t("Children information ")}</Text>
<TouchableOpacity>
<Image  style={styles.IconDesign}/>
</TouchableOpacity>

    </View>
<KeyboardAwareScrollView>

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
                    source={{uri: myImage }}
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
<ScrollView>
<View style={{justifyContent:'flex-start',alignSelf:'flex-start' ,marginTop:'5%'}}>
    <Text style={{  fontSize:15, fontFamily:"Axiforma-SemiBold",color:'#008080',marginLeft:10}}>{t("Child details")}</Text>
</View>

<Text style={styles.TextStyle} >{t("Name")}</Text>

<TextInput placeholder="Sheman carry"  value={name}style={styles.inputStyle}  onChangeText={(text) => setName(text)}/>
<Text style={styles.TextStyle} >{t("Date of birth")}</Text>

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
         {birthdate}
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
     <TouchableOpacity onPress={() => setOpen(true)} >
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
       value={birthdate}
       onConfirm={(date) => {
         setOpen(false);
         setDob1(date);
         setBirthdate(date.toLocaleDateString());
       }}
       onCancel={() => {
         setOpen(false);
       }}
       mode={"date"}
     />

      </TouchableOpacity>
   </View>
 </TouchableOpacity> */}

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
        {birthdate}
       {/* {/ {moment(birthdate).format('DD/MM/YYYY')} /} */}
      
       </Text>
     ) : (
       <Text
         style={{
           fontFamily: "Axiforma-Regular",
           color: "#737373",
           fontSize: 13,
         }}
       >
        
        {moment(birthdate).format('DD/MM/YYYY')}
       </Text>
     )}
     <TouchableOpacity onPress={() => setOpen(true)} >
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
       maximumDate={new Date()}
      //  value={moment(birthdate).format('DD/MM/YYYY')}
       value={birthdate}
       onConfirm={(date) => {
        var dd=moment(date).format('DD/MM/YYYY')
         setOpen(false);
         setDob1(date);
         setBirthdate(date.toLocaleDateString());
       }}
       onCancel={() => {
         setOpen(false);
       }}
       mode={"date"}
     />

      </TouchableOpacity>
   </View>
 </TouchableOpacity>

<View style={{flexDirection:'row'}}>
<Text style={styles.TextDesign} >{t("Age")} :</Text>
<Text style={styles.TextDesign1} >{age2}</Text>
</View>

</ScrollView>
{
        isVisible == true &&
        <Modal isVisible={true}
          onBackdropPress={() => {
            setisVisible(!isVisible)
            
          }}
        >
          <View style={{backgroundColor:'white',borderRadius:20,paddingBottom:10,marginHorizontal:20}}>
          <TouchableOpacity onPress={()=> setisVisible(false)} style={{marginTop:10,alignItems:'flex-end',marginRight:25}}>
      <Image source={require("../../asset/cross.png")} style={{resizeMode:'contain',height:35,width:35}}/>
      </TouchableOpacity>
          <View style={{ height: 100, width: '100%', flexDirection: 'row',alignItems:'center', justifyContent: 'center' }}>

            <TouchableOpacity onPress={() => OpenCamera()} style={{ backgroundColor: '#008080', justifyContent: 'center', alignItems: 'center', height: 52, borderRadius: 50,  width: 120,marginHorizontal:10, flexDirection: 'row' }}>
            
              <Image source={require('../../asset/camera-icon.png')} style={{height: 22, width: 35,tintColor:'white', }} />
              <Text style={{ color: "white", fontSize: 16, }}>{t("Camera")}</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => openGallery()} style={{ backgroundColor: '#008080', justifyContent: 'center', alignItems: 'center', height: 52, marginHorizontal: 5, borderRadius: 50,marginHorizontal:10, width: 120, flexDirection: 'row' }}>
              <Image resizeMode="contain" source={require("../../asset/gallery.png")} style={{ height: 22, width: 35, tintColor: 'white' }} />
              <Text style={{ color: "white", fontSize: 16, }}>{t("Gallery")}</Text>
            </TouchableOpacity>
          </View>
       
          </View>
        </Modal>
      }
      <TouchableOpacity style={{marginTop:'10%',width:150,height:50,backgroundColor:'#008080',alignSelf:'center',alignItems:'center',borderRadius:25,marginBottom:30}} 
      onPress={()=>Updatechildren()}>
         {loader == true ? (
                    <ActivityIndicator size="small" color="white" style={{paddingTop:12}} />
                  ) : (
      <Text style={{fontSize:16,color:'white',textAlign:'center',paddingTop:17,fontFamily:'Axiforma-Bold',}}>{t("Next")}</Text>
                  )}
      
      </TouchableOpacity>
  </KeyboardAwareScrollView>

  </ImageBackground>
    )
}
export default ChildInformation1
const styles=StyleSheet.create({
 
    Container:{
        flex:1
    },

    ViewStyle:{backgroundColor:'#008080',
    paddingStart:17,
    flexDirection:'row',
    alignItems:'center',
    paddingTop:52,
    paddingBottom:21,
    justifyContent:'space-between'
    },
    
    IconStyle:{
        height:27,
        width:27,
        tintColor:'#F9FBDB'
    },

    headerText:{fontSize:24,
        fontFamily:'Axiforma-Bold',
        color:'#F9FBDB',
        marginEnd:79},

        ImageView:{marginTop:42,
            marginStart:20,
            height:136,
            width:136,
            },
        
            ImageProfile:{height:136,
                width:136,borderRadius:136/2},
        
                ProfileEdit:{height:34,
                    width:34,
                   },
        
                   IconButton:{ position:'absolute',
                  alignSelf:'flex-end',
                   marginTop:10,
                   marginEnd:10},

                   TextStyle:{
                    fontSize:14,
                    fontFamily:'Axiforma-Regular',
                    color:'#737373',
                    marginStart:20,
                    marginTop:20
                   },

                   inputStyle:{
                    backgroundColor:'red',
    borderWidth:1,
    borderColor:'#DFE3A3',
    fontSize:14,
    fontFamily:'Axiforma-Regular',
    color:'#737373',
    paddingHorizontal:20,
    marginHorizontal:20,
    borderRadius:50,
    marginTop:8
    , backgroundColor:'white',fontSize:13,width:wp(90),height:hp(6),
                   },

                   TextDesign:{
                    fontSize:14,
                    fontFamily:'Axiforma-Regular',
                    color:'#737373',
                    marginStart:20,
                    marginTop:8
                   },
                   TextDesign1:{
                    fontSize:14,
                    fontFamily:'Axiforma-Regular',
                    color:'#737373',
                    marginStart:5,
                    marginTop:8
                   },

})
