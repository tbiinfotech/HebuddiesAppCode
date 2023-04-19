import React,{useState,useEffect} from "react";
import { View,Text,TextInput,TouchableOpacity,ImageBackground,Image,StyleSheet,ActivityIndicator,ScrollView,Linking } from "react-native";
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import constants from "../constants/constants";
import { useTranslation, withTranslation, Trans } from 'react-i18next';
import { useIsFocused } from "@react-navigation/native";
import '../translation/i18n'
const Contactadmin=({navigation})=>{
    
    const[email,setEmail]=useState('');
    const[loader,setLoader]=useState('');
    const[subject,setSubject]=useState("")
    const[description,setdescription]=useState("")
    const {t, i18n} = useTranslation();
    const[language,setLanguage]=useState("")
    const isFocused = useIsFocused();
    useEffect(() => {
        getLanguage()
   
      
      }, [isFocused]);
    const getLanguage=(async()=>{
        var langg=await AsyncStorage.getItem("langugae")
      
        setLanguage(langg)
    })
    const contactadmin=(async()=>{
        
       
        if(subject==""){
            alert(t("Please add subject"))
        }
        else if(description==""){
            alert(t("Please add description"))
        }
        else{
            var langg =await AsyncStorage.getItem("langugae")
        var token  = await AsyncStorage.getItem('token')
         var formdata = new FormData();
         formdata.append('subject',subject);
         formdata.append('message', description);

         setLoader(true)

         axios({
             method: "post",
             url: constants.BASE_URL + "api/profile/contact_admin",
             data: formdata,
             headers: {    'Authorization': 'Bearer '+JSON.parse(token)  ,
             "X-localization": langg==null?"da":langg, },
         })
         .then(async (response) => {
                

                if (response.data.status == true) {
                    setLoader(false)
                    alert(response.data.message)
                    navigation.navigate("ProfileNavigation")
                  
                }else{
                    alert(response.data.message)
                    setLoader(false)
                }
            
                      
             })
             .catch(function (response) {
                 setLoader(false)
               
             });
            }
        }
     )

    return(
<ImageBackground source={require('../../../Images/background.png')} style={styles.Container} resizeMode='stretch' >
<ScrollView>
<View style={styles.ViewStyle} >
        <TouchableOpacity onPress={() => navigation.goBack()}>
        <Image source={require('../../../Images/Arrow-Left.png')} style={styles.IconStyle}    />
        </TouchableOpacity>
<Text style={{fontSize:24,fontFamily:'Axiforma-Bold',color:'#F9FBDB'}} >{t("Contact admin")}</Text>
<TouchableOpacity>
<Image  style={styles.IconDesign} />
</TouchableOpacity>

    </View>

    <Text style={{fontSize:14,fontFamily:"Axiforma-Medium",color:'grey',marginTop:20,marginLeft:30}}>{t("Subject")}</Text>


    <TextInput placeholder="" placeholderTextColor='grey' value={subject} underlineColor='transparent' multiline={true} style={{ paddingHorizontal:10, 
            borderRadius:25,fontFamily:"Axiforma-Medium", backgroundColor:'white',fontSize:13,width:'90%',height:90,color:'#737373',marginLeft:20,marginTop:5,
            paddingLeft:20,paddingTop:20,borderWidth:0.5,borderColor:'#DFE3A3'}} 
            onChangeText={(text) => setSubject(text)}
 />

<Text style={{fontSize:14,fontFamily:"Axiforma-Medium",color:'grey',marginTop:30,marginLeft:30}}>{t("Description")}</Text>

<TextInput placeholder="" placeholderTextColor='grey' value={description} underlineColor='transparent' multiline={true} style={{ paddingHorizontal:10, 
            borderRadius:25,fontFamily:"Axiforma-Medium", backgroundColor:'white',fontSize:13,width:'90%',height:90,color:'#737373',marginLeft:20
            ,marginTop:5,paddingLeft:20,paddingTop:20,borderWidth:0.5,borderColor:'#DFE3A3'}} 
            onChangeText={(text) => setdescription(text)}
 />
<View style={{marginTop:50,alignItems:'center',alignSelf:'center',flexDirection:'row',marginLeft:5,marginRight:5}}>
    <Text style={{color:'grey',fontFamily:"Axiforma-Medium",fontSize:14,}}>{t("For help, please visit our FAQ and contact us ")} 
    <Text style={{
            color:'#008080',fontFamily:"Axiforma-Medium",fontSize:14,lineHeight:5
           
              }}
              onPress={() => {
                Linking.openURL("https://heybuddies.dk/index.php/faq/");
              }}>{t("here")}
                </Text>
                </Text>
 
</View>
<TouchableOpacity style={{   backgroundColor: '#008080',width:wp(35),justifyContent: 'center',alignSelf:'center',height: hp(7), borderRadius: 50, 
        marginTop: 80,}} 
        onPress={()=>contactadmin()}>

     {
                                loader == true ?
                                    <ActivityIndicator  size="small" color="white"
                                    />
                                    :
                                    <Text style={{ alignSelf:'center', color: 'white', fontSize: 16, fontFamily: 'Axiforma-Bold' }} >{t("Next")}</Text>
     }
                                    </TouchableOpacity>
                                  
                                        
                                    




{/* <View style={{marginTop:20,alignItems:'center',alignSelf:'center',flexDirection:'row',width:300}}>
    <Text style={{color:'grey',fontFamily:"Axiforma-Medium",fontSize:14}}>{t("For help, please visit our FAQ and contact us ")}</Text>
    <Text style={{
            color:'grey',fontFamily:"Axiforma-Medium",fontSize:14
              }}
              onPress={() => {
                Linking.openURL("https://heybuddies.dk/index.php/faq/");
              }}>{t("here")}
                </Text>
</View> */}
                                    </ScrollView>
</ImageBackground>
    )
}
const full_app =  withTranslation()(Contactadmin)
export default full_app;
// export default Contactadmin;



const styles = StyleSheet.create({
 
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
        marginEnd:96},

        textDesign:{
            color:'#737373',
            fontFamily:'Axiforma-Regular',
            fontSize:14,
            marginStart:20,
            marginTop:40
        },


        textStyle:{
            color:'#737373',
            fontFamily:'Axiforma-Regular',
            fontSize:14,
            marginStart:20,
            marginTop:20
        },

        inputStyle:{
            backgroundColor:'#fff',
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
        }
})