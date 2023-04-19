import React, { useState,useEffect } from 'react'
import {
    SafeAreaView,
    StyleSheet,
    Text, View,
    ImageBackground,
    ScrollView,
    Image,
    TouchableOpacity,
    FlatList
} from 'react-native'
import Modal from "react-native-modal";
import { useTranslation, withTranslation, Trans } from 'react-i18next';
import '../translation/i18n'
import ToggleSwitch from "toggle-switch-react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import constants from '../constants/constants';
const Notification1 = ({ navigation }) => {
    const {t, i18n} = useTranslation();
    const [isVisible3,setisVisible3]=useState(false)
    const [on, seton] = useState(true);
    const [on2, seton2] = useState(true);
    const [on1, seton1] = useState(true);
    const [activity, setActivity] = useState(false);
    const [groups, setGroups] = useState(false);
    const [message, setmessage] = useState(false);
    const toggleModal3= () => {
        setisVisible3(!isVisible3);
      };
      const Toggle_Switch1 = () => {
        if (1 == true) {
          seton1(false);
        }
        if (on1 == false) {
          seton1(true);
        }
      };
      const Toggle_Switch = () => {
        if (1 == true) {
          seton(false);
        }
        if (on == false) {
          seton(true);
        }
      };
      const Toggle_Switch2= () => {
        if (1 == true) {
          seton2(false);
        }
        if (on2 == false) {
          seton2(true);
        }
      };
    React.useEffect(() => {
        const unsubscribe = navigation.addListener('focus', () => {
            get_notification()
        });
    })
const get_notification= async()=>{
  var langg=await AsyncStorage.getItem("langugae")
    var token = await AsyncStorage.getItem("token");


var config = {
  method: 'get',
  url: constants.BASE_URL + "api/activity/notification/status",
  headers: {
            Authorization: "Bearer " + JSON.parse(token),
            "X-localization": langg,
          },
};

axios(config)
.then(function (response) {
  // console.log("GETRESPONSE",JSON.stringify(response.data));
})
.catch(function (error) {
  // console.log(error);
});

}



 const push_notification= async () => {
    var token = await AsyncStorage.getItem("token");
    var data = new FormData();
    data.append('activity', on1==false?0:1);
    data.append('group', on2==false?0:1);
    data.append('message', on==false?0:1);
    // console.log("daddadada",data);
   
    var config = {
      method: 'post',
      // url: 'https://development.brstdev.com:5076/api/activity/pushNotification',
      url: constants.BASE_URL + "api/activity/pushNotification",
      headers: {
        Authorization: "Bearer " + JSON.parse(token),
        // "X-localization": langg,
      },
      data : data
    };
    
    axios(config)
    .then(function (response) {
        
        // alert(response.data.message)
      // console.log("newresponserrrr,",JSON.stringify(response.data));
    })
    .catch(function (error) {
      console.log(error);
    });
    
 }
    return (
            <View style={mygroupsstyles.Main}>
                <ImageBackground style={mygroupsstyles.ImageBackground} source={require("../../asset/Splash.png")}>

                    <View style={mygroupsstyles.View1}>
                    <View style={mygroupsstyles.view2}>
                    <TouchableOpacity onPress={()=>navigation.goBack()}>
                 <Image style={mygroupsstyles.img3} resizeMode="contain"  source={require('../../../Images/Arrow-Left.png')} />
                 </TouchableOpacity >
            <Text style={mygroupsstyles.text1}>{t("Push notification")}</Text>
               <Image style={mygroupsstyles.img3} resizeMode="contain"/> 
               
                 </View>
                        
 <ScrollView>
 <View style={mygroupsstyles.viewDesign}>
          <Text style={mygroupsstyles.TextButton}>{t("Activity")}</Text>
          <ToggleSwitch
            isOn={on1}
            onColor="#008080"
            offColor="#EDEDED"
            size="medium"
            onToggle={() => {Toggle_Switch1(),push_notification()}}
          />
        </View>
        <View style={mygroupsstyles.viewDesign}>
          <Text style={mygroupsstyles.TextButton}>{t("Message")}</Text>
          <ToggleSwitch
            isOn={on}
            onColor="#008080"
            offColor="#EDEDED"
            size="medium"
            onToggle={() => {Toggle_Switch(),push_notification()}}
          />
        </View>
        <View style={mygroupsstyles.viewDesign}>
          <Text style={mygroupsstyles.TextButton}>{t("Groups")}</Text>
          <ToggleSwitch
            isOn={on2}
            onColor="#008080"
            offColor="#EDEDED"
            size="medium"
            onToggle={() => {Toggle_Switch2(),push_notification()}}
          />
        </View>

                   
                        </ScrollView> 
                    </View>

                </ImageBackground>

            </View>
    )
}

export default Notification1;
const mygroupsstyles = StyleSheet.create({
    Main: {
        flex: 1,
    },
    ImageBackground: {
        height: '100%',
        width: '100%',
    },
    View1: {
        flex: 1,


    },
    view2: {
        backgroundColor: '#008080',
        width: '100%',
        padding: 10,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingTop: 55
    },
    text1:{
        color:'#F9FBDB',
        fontSize:24,
       fontFamily:"Axiforma-Bold"

    },
    view3: {
        padding: 20,
        marginTop: 10,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center'
    },
    text2: {
        color: '#737373',
        fontSize: 16,
        fontWeight: '400'

    },
    img3: {
        width: 27,
        height: 27,
        tintColor:'#F9FBDB'
    },
    view4: {
        padding: 15,
        width: '100%',

    },
    view5: {
        flex:1
        ,        backgroundColor:'white',
                borderRadius:10,
              padding:15,
              marginTop:15


    },
    view6: {
        alignItems: 'center',

        flexDirection: 'row'
    },
    img4: {
        height: 62.9,
        width: 68
    },
    text3: {
        fontSize: 18,
        fontFamily:"Axiforma-Bold",
        color: 'grey'
    },
    view8:{
        flexDirection:'row',
        alignItems:'center',
        marginTop:10
      
    },
    img5: {
        height: 17,
        width: 15
    },
    text4: {
        color:'#737373',
        fontSize:16,
        marginLeft:10,
        fontFamily:"Axiforma-Regular",
      
    },
    text5: {
        fontSize: 16,
        fontFamily:"Axiforma-SemiBold",
        textAlign: 'right',
        color: '#008080'
    },
    view9: {

        width: "100%",



    },
    button: {
        height: 49, 
        width: 177,
        backgroundColor: '#008080',
        borderRadius: 120,
         alignItems: 'center', 
         justifyContent: 'center', 
         marginTop: 20
    },
    buttontxt: {
        color: 'white', 
        fontSize: 16,
         fontWeight: '600'
    },
    modalview: {
        backgroundColor: 'white',
        width: '100%',
        borderRadius: 16, padding: 20
    },
    modalview1: {
        width: '100%',
        alignItems: 'flex-end'
    },
    crossimg: {
        height: 25,
        width: 25
    },
    modalview2: {
        alignItems: 'center',
        width: '100%',

    },

    modalimg: {
        height: 92,
        width: 99
    },
    modaltxt: {
        fontSize: 24,
        fontWeight: '700',
        textAlign: 'center', lineHeight: 25,
        color: 'black'
    },
    modaltxt1: {
        fontSize: 17,
        fontWeight: '400',
        textAlign: 'center',
        color: '#737373', marginTop: 5,
        lineHeight: 25
    },
    modalview4: {
        flexDirection: 'row',
        paddingTop: 15,
    },
    modalview8: {
        flexDirection: 'row',
        alignItems: 'center',
        marginLeft: 15
    },
    modalview9: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingTop: 15
    },
    modalbutton: {
        height: 58, width: 177, backgroundColor: '#008080', borderRadius: 120, alignItems: 'center', justifyContent: 'center', marginTop: 20
    },
    view7:{
        marginLeft:20
     },
     IconStyle:{
        height:27,
        width:27,
        tintColor:'#F9FBDB'
    },
    crossimg:{
        height:25,
        width:25
    },
    modalview2:{
        alignItems:'center',
        width:'100%',
        
       
   
    },
    modalview3:{
       alignItems:'center',
       width:'100%',
   },
   
       modalimg:{
          height:90,
          width:95
       },
       modalview2:{
        alignItems:'center',
        width:'100%',
        
       
   
    },
    modalview3:{
        alignItems:'center',
        width:'100%',
    },
    modalview1:{
        width:'100%',
        alignItems:'flex-end'
    },
    modalview:{
        backgroundColor:'white',
        width:326,
        borderRadius:16,padding:20,
        marginBottom:350,
        marginTop:100,
       marginLeft:35

      
    },
    modalimg:{
        height:90,
        width:95
     },
     modaltxt:{
         fontSize:24,
        
         textAlign:'center',lineHeight:25,
         color:'grey',marginTop:14,fontFamily:"Axiforma-Bold"
     },
     modaltxt1:{
         fontSize:17,
         fontFamily:"Axiforma-Regular",
         textAlign:'center',
         color:'#737373',marginTop:5,
         lineHeight:25
     },
     modaltxt2:{
         fontSize:17,
         fontFamily:"Axiforma-Regular",
         textAlign:'center',
         color:'#737373',marginTop:10,
         lineHeight:25
     },
     modalview4:{
         flexDirection:'row',
         paddingTop:10,
         },
     modalview8:{
         flexDirection:'row',
         alignItems:'center',
         marginLeft:15
     },
     modalview9:{
         flexDirection:'row',
         alignItems:'center',
         paddingTop:15
     },
     modalbutton:{
         height:56,width:170,backgroundColor:'#008080',borderRadius:120,alignItems:'center',justifyContent:'center',marginTop:15,marginBottom:5,
         
     },
     view7:{
        marginLeft:20
     },
     notificationmodalview:{
        backgroundColor:'white',
        width:326,
        borderRadius:16,padding:20,
        marginBottom:350,
        marginTop:120,
       marginLeft:25

      
    },

  viewDesign: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingVertical: 30,
    paddingHorizontal: 15,
    borderWidth: 1,
    borderTopWidth: 0,
    borderColor: "#DFE3A3",
    alignItems: "center",
  },
  TextButton: {
    color: "#737373",
    fontSize: 16,
    fontFamily: "Axiforma-Regular",
    marginStart: 11,
    marginEnd: 50,
    flex: 0.9,
  },
})
