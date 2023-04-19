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
import axios from 'axios';
import constants from '../constants/constants';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useTranslation, withTranslation, Trans } from 'react-i18next';
import '../translation/i18n'
const Notification = ({ navigation }) => {
    const [isVisible3,setisVisible3]=useState(false)
    const { t, i18n } = useTranslation();
    const[data,setData]=useState([])
    const[title,setTitle]=useState("")
    const toggleModal3= () => {
        setisVisible3(!isVisible3);
      };
      useEffect(()=>{getnotifications()},[])
    const Data1 = [
        {
            id: 1,
            img: require("../../asset/ic-Chill.png"),
            img1: require("../../asset/chill.png"),
            txt1: "The high five jumpers",
            txt2: "Chill",
            txt3: "T0K 0E0",
            txt4: 'Age group: 2 years',
            img2: require("../../asset/Location.png"),
            img3: require("../../asset/Profile(2).png"),
          


        },
      
        {
            id: 1,
            img: require("../../asset/ic-Chill.png"),
            img1: require("../../asset/chill.png"),
            txt1: "Cranky yankyees",
            txt2: "Culture",
            txt3: "TS25 3AB",
            txt4: 'Age group: 2 years',
            img2: require("../../asset/Location.png"),
            img3: require("../../asset/Profile(2).png"),
            

        },
    ]
   
    const getnotifications= async()=>{
      
        var langg=await AsyncStorage.getItem("language")
        var token = await AsyncStorage.getItem("token");
        var axios = require("axios");
        var config = {
            method: 'get',
            url: constants.BASE_URL + "api/notification/fetch",
            headers: { 
              'Authorization': 'Bearer '+JSON.parse(token)
            }
          };
          
          axios(config)
          .then(async (response)=> {
if(response.data.status==true){

    setData(response.data.data)
}
else{
   
}
          
          })
          .catch(function (error) {
            // console.log(error);
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
            <Text style={mygroupsstyles.text1}>{t("Notification")}</Text>
               <Image style={mygroupsstyles.img3} resizeMode="contain"/> 
               
                 </View>
                        
<ScrollView>


                        <View style={mygroupsstyles.view4}>
                            {
                                data.length>0?
                         
                            <FlatList

                                data={data}
                                renderItem={({ item }) => {

                                    return (
                                        <View style={mygroupsstyles.view5}>
                                            <View style={mygroupsstyles.view6}>
                                                <Image style={{height: 62.9,
        width: 68}} resizeMode="contain" source={{uri:item.logo}} />

                                                <View style={mygroupsstyles.view7}>
                                                    <Text style={mygroupsstyles.text3}>{item.txt1}</Text>
                                                    <View style={mygroupsstyles.view8}>
                                                        <Image style={mygroupsstyles.img5} resizeMode="contain" />
                                                        <Text style={mygroupsstyles.text4}>
                                                            {item.group_name}
                                                        </Text>

                                                    </View>
                                                    <View style={mygroupsstyles.view8}>
                                                        <Image style={mygroupsstyles.img5} resizeMode="contain" />
                                                        <Text style={mygroupsstyles.text4}>
                                                            {item.title}
                                                        </Text>

                                                    </View>
                                                    <View style={mygroupsstyles.view8}>
                                                        <Image style={mygroupsstyles.img5} resizeMode="contain"  />
                                                        <Text style={mygroupsstyles.text4}>
                                                           {item.created_at}
                                                        </Text>
                                                    </View>
                                                    {/* <View style={mygroupsstyles.view8}>
                                                        <Image style={mygroupsstyles.img5} resizeMode="contain" source={require("../../asset/Location.png")} />
                                                        <Text style={mygroupsstyles.text4}>
                                                            {item.txt3}
                                                        </Text>

                                                    </View> */}
                                                </View>


                                            </View>
                                           

                                          
                                        
                                        </View>
                                    

                                    )
                                }}
                            />:
                            <View>
                                <Text style={{fontSize:16,textAlign:'center',alignItems:'center',color:'grey'
                            ,marginTop:250}}>
                                    No notification
                                </Text>
                            </View>
                        }
                        </View>
                        </ScrollView>
                    </View>
                    {
  isVisible3 == true && 
  <Modal isVisible={true}
  onBackdropPress={() => {
    setisVisible3(!isVisible3)
  }}
>
<View style={mygroupsstyles.notificationmodalview}>


<TouchableOpacity onPress={()=> setisVisible3(false)} style={mygroupsstyles.modalview1}>
    <Image style={mygroupsstyles.crossimg} resizeMode="contain" source={require("../../asset/cross.png")}/>

</TouchableOpacity>
<View  style={mygroupsstyles.modalview2}>
    <Image resizeMode="contain" style={mygroupsstyles.modalimg} source={require("../../asset/ic-Chill.png")} />
<Text style={mygroupsstyles.modaltxt}>Welcome to group
{'\n'}The high five jumpers</Text>
<Text style={mygroupsstyles.modaltxt1}>You are all in</Text>
<View style={mygroupsstyles.modalview3}>
    <View style={mygroupsstyles.modalview4}>
        
    <View style={mygroupsstyles.view8}>
                            <Image style={mygroupsstyles.img5} resizeMode="contain" source={require("../../asset/Location.png")}/>
                            <Text style={mygroupsstyles.text4}>TOK OEO</Text>
                    
                            </View>
    <View style={mygroupsstyles.modalview8}>
                            <Image style={mygroupsstyles.img5} resizeMode="contain" source={require("../../asset/chill.png")}/>
                            <Text style={mygroupsstyles.text4}>Chill </Text>
                    
                            </View>       
    </View>

    <View style={mygroupsstyles.modalview9}>
                            <Image style={mygroupsstyles.img5} resizeMode="contain" source={require("../../asset/Profile(2).png")}/>
                            <Text style={mygroupsstyles.text4}>
                            Age group: 2 years
                               </Text>
                    
                            </View>
                       

</View>
</View>
    
</View>
</Modal>  
}
                </ImageBackground>

            </View>
    )
}

export default Notification;
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
})
