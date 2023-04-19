import React, { useState } from 'react'
import { SafeAreaView, StyleSheet, Text, View ,ImageBackground, ScrollView,Image,TouchableOpacity, FlatList} from 'react-native'
import * as Progress from 'react-native-progress';
import {svg} from "react-native-svg"
import Modal from "react-native-modal";
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';

const ExploreMatch2 = ({navigation}) => {

    return (
      <SafeAreaView style={Explorestyles.Main}>
         <View style={Explorestyles.Main}>
         <ImageBackground style={Explorestyles.ImageBackground} source={require("../../asset/Splash.png")}>     
             <View style={Explorestyles.View1}>
                 <View style={Explorestyles.view2}>
                 <Image style={Explorestyles.img3} resizeMode="contain" source={require("../../asset/menu.png")}/>
            <Text style={Explorestyles.text1}>Match</Text>
                <Image style={Explorestyles.img3} resizeMode="contain" source={require("../../asset/Notification.png")}/>
                 </View>
                 <View style={Explorestyles.view3}>
                 <Image style={{height:200,width:200}} resizeMode="contain" source={require("../../asset/match.png")}/>
                 <View style={{paddingHorizontal:25,alignItems:'center'}}>
                    <Text style={{fontSize:14,fontFamily:'Axiforma-Regular',lineHeight:24}}>
Currently there are no matching groups in 
</Text>
<Text style={{fontSize:14,fontFamily:'Axiforma-Regular',lineHeight:24}}>
your area - if you’re up for it, go back and
</Text>
<Text style={{fontSize:14,fontFamily:'Axiforma-Regular',lineHeight:24}}>
 change your preferences and the algorithm
</Text>
<Text style={{fontSize:14,fontFamily:'Axiforma-Regular',lineHeight:24}}>
will search for new, cool groups
</Text>
</View>
<TouchableOpacity style={{ backgroundColor: '#008080',width:wp(60),
        justifyContent: 'center',
alignSelf:'center',        height: hp(7),
        borderRadius: 50,
        marginTop: 30,}}
    onPress={()=>navigation.navigate('ExploreMatch2')}>
                        <Text style={{ alignSelf:'center', color: 'white', fontSize: 16, fontFamily: 'Axiforma-Bold' }} > Update preferences </Text>
                    </TouchableOpacity>
                </View>
                
              
                
                               </View>           
        
           </ImageBackground>

         </View>
      </SafeAreaView>
    )
}

export default ExploreMatch2;
const Explorestyles= StyleSheet.create({
    Main:{
        flex:1,
    },
    ImageBackground:{
        height:'100%',
        width:'100%',
        
    },
    View1:{
        flex:1,
     
        
    },
    view2:{
        backgroundColor:'#008080',
        width:'100%',
        padding:10,
        flexDirection:'row',
        justifyContent:'space-between',
        alignItems:'center',
        paddingTop:47
    },
    text1:{
        color:'#F9FBDB',
        fontSize:24,
       fontFamily:"Axiforma-Bold"

    },
    view3:{
      flex:0.9,
      justifyContent:'center',
      alignItems:'center',
    },
    text2:{
        color:'#737373',
        fontSize:16,
        fontFamily:"Axiforma-Regular"

    },
    img3:{
        width:25,
        height:25
    },
    view4:{
        padding:15,
        width:'100%',
      alignItems:'center'
    },
    view5:{
        flex:1
,        backgroundColor:'white',
        borderRadius:10,
      padding:15,
      marginTop:15
       

    },
    view6:{
        alignItems:'center',
   
        flexDirection:'row'
    },
    img4:{
        height:62.9,
        width:68
    },
    text3:{
        fontSize:18,
        fontFamily:"Axiforma-Bold",
        color:'black',
    },
    view8:{
        flexDirection:'row',
        alignItems:'center',
        marginTop:10
      
    },
    img5:{
height:17,
width:15
    },
    text4:{
        color:'#737373',
        fontSize:16,
        marginLeft:10,
        fontFamily:"Axiforma-Regular",
      
    },
    text5:{
        fontSize:16,
        fontWeight:'400',
        marginBottom:10,
        fontFamily:"Axiforma-Regular",
    },
    view9:{
        flexDirection:'row',alignItems:'center',
        width:"90%",
        justifyContent:'space-between'


    },
    button:{
        height:40,width:130,backgroundColor:'#008080',borderRadius:120,alignItems:'center',justifyContent:'center',marginTop:20,marginRight:21,marginStart:20
    },
    buttontxt:{
        color:'white',fontSize:16,fontFamily:"Axiforma-SemiBold"
    },
    modalview:{
        backgroundColor:'white',
        width:326,
        borderRadius:16,padding:20
    },
    modalview1:{
      
        width:'100%',
        alignItems:'flex-end'
    },
    crossimg:{
        height:25,
        width:25
    },
 modalview2:{
     alignItems:'center',
     width:'100%',
    

 },

    modaltxt:{
        fontSize:24,
        fontWeight:'700',
        textAlign:'center',lineHeight:25,
        color:'black',marginTop:23
    },
  
})
