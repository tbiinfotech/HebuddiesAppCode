import React,{useState,useRef} from "react";
import { View,Text,TextInput,TouchableOpacity,ImageBackground,Image,StyleSheet ,ActivityIndicator} from "react-native";
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';
import { useTranslation, withTranslation, Trans } from 'react-i18next';
import '../translation/i18n'
import axios from "axios";
import constants from "../constants/constants";
import AsyncStorage from "@react-native-async-storage/async-storage";

const Verifypass=({navigation,route})=>{
    const {t, i18n} = useTranslation();
    const [email,setEmail]=useState("")
    const [otp,setOtp]=useState("")
    const [otp1, setOtp1] = useState();
    const [otp2, setOtp2] = useState();
    const [otp3, setOtp3] = useState();
    const [otp4, setOtp4] = useState();
    const [msg , setmsg]  = useState(); 
    const [clr, setClr]   = useState(false);
    const [confirm, setConfirm] = useState(false);
    const [flag, setFlag] = useState(false);
    const [loader, setLoader] = useState(false);
    const inputRef1 = useRef();
    const inputRef2 = useRef();
    const inputRef3 = useRef();
    const inputRef4 = useRef();
    const Verifyotp=(async()=>{
    var langg=await AsyncStorage.getItem("langugae")
        var formdata = new FormData();
        formdata.append('email', route.params.emails)
        formdata.append('otp',otp1+otp2+otp3+otp4)
        // console.log("formdataaaa",formdata)
        setLoader(true)

        axios({
            method: "post",
            url: constants.BASE_URL + "api/verify_otp",
            data: formdata,
            headers: { 'X-localization': langg},
        })
        .then(async (response) => {
               if (response.data.status == true) {
                   navigation.navigate("Updatepassword",{email:response.data.email})
                   setLoader(false)
                 
               }else{
                   alert(response.data.message)
                   setLoader(false)
               }
           
                     
            })
            .catch(function (response) {
                setLoader(false)
              
            });
    })
    
    return(
<ImageBackground source={require('../../../Images/background.png')} style={styles.Container} resizeMode='stretch' >

<View style={styles.ViewStyle}   >
        <TouchableOpacity onPress={() => navigation.navigate("Forgotpassword")}>
        <Image source={require('../../../Images/Arrow-Left.png')} style={styles.IconStyle}    />
        </TouchableOpacity>
<Text style={{fontSize:24,fontFamily:'Axiforma-Bold',color:'#F9FBDB'}} >{t("Verify password")}</Text>
<TouchableOpacity>
<Image  style={styles.IconDesign} />
</TouchableOpacity>

    </View>


    <View  style={{flexDirection:'row',justifyContent:'space-around',alignItems:'center',marginHorizontal:20,marginTop:0}}>
    <View style={{flex:1,marginLeft:10,}}>
<TextInput  style={{height:60,width:60,textAlign:'center', fontFamily: 'Axiforma-Bold', color: 'grey', 
       fontSize: 22 ,borderColor:'#008080',borderWidth: 2,borderRadius:10, backgroundColor: '#F9FBDB' , fontSize:25,fontFamily:'Axiforma-Bold',marginTop:50}}
      
       maxLength={1}
               keyboardType={'numeric'}
               value={otp1}
               ref={inputRef1}
               onChangeText={otp1 => {
                 setOtp1(otp1)
                 if (otp1) inputRef2.current.focus(),setOtp(otp)}}
               
                 />
                    </View>
                    <View style={{flex:1}}>
       <TextInput
              style={{ height:60,width:60,textAlign:'center',  fontFamily: 'Axiforma-Bold', backgroundColor: '#F9FBDB', color: 'grey',
               fontSize: 22 ,borderColor:'#008080',borderWidth: 2,borderRadius:10,fontFamily:'Axiforma-Bold',marginTop:50}}
              maxLength={1}
              keyboardType={'numeric'}
              value={otp2}
               ref={inputRef2}
              onChangeText={otp2 => {
                 setOtp2(otp2)
                 if (otp2) inputRef3.current.focus(),setOtp(otp) }}  /></View> 
                   <View style={{flex:1}}>
        <TextInput
              style={{ height:60,width:60,textAlign:'center',  fontFamily: 'Axiforma-Bold', backgroundColor: '#F9FBDB', color: 'grey',
              fontSize: 22 ,borderColor:'#008080',borderWidth: 2,borderRadius:10,fontFamily:'Axiforma-Bold',marginTop:50}}
               maxLength={1}
               keyboardType={'numeric'}
              value={otp3}
              ref={inputRef3}
               onChangeText={otp3 => {
                 setOtp3(otp3)
                 if (otp3) inputRef4.current.focus(),setOtp(otp)
             
               }}
             /></View>
             <View style={{flex:1}}>
         <TextInput   style={{height:60,width:60,textAlign:'center',  fontFamily: 'Axiforma-Bold', backgroundColor: '#F9FBDB', color: 'grey',
              fontSize: 22 ,borderColor:'#008080',borderWidth: 2,borderRadius:10,fontFamily:'Axiforma-Bold',marginTop:50}}
              maxLength={1}
               keyboardType={'numeric'}
               value={otp4}
               ref={inputRef4}
               onChangeText={otp4 => {                
                    setOtp4(otp4)
                 if (otp4) inputRef4.current.focus(),setOtp(otp)
                setClr(false) }}/>
                </View>
  </View>
    





<TouchableOpacity style={{   backgroundColor: '#008080',width:wp(35),
        justifyContent: 'center',
alignSelf:'center',height: hp(6),
        borderRadius: 50,
        marginTop: 150,}} onPress={()=>Verifyotp()} >
               {
                                loader == true ?
                                    <ActivityIndicator  size="small" color="white"
                                    />
                                    :
    
                                    <Text style={{ alignSelf:'center', color: 'white', fontSize: 16, fontFamily: 'Axiforma-Bold' }} >{t("Next")} </Text>
               }
                                    </TouchableOpacity>


</ImageBackground>
    )
}
const full_app =  withTranslation()(Verifypass)
export default full_app;
// export default Verifypass;



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
