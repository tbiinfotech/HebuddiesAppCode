import React, { useState,useRef,useEffect ,useCallback} from 'react'
import { SafeAreaView, StyleSheet, Text, View, ImageBackground, Image, TouchableOpacity, ScrollView } from 'react-native'
import Swiper from 'react-native-swiper'
import { Dropdown } from 'react-native-element-dropdown';
import { useTranslation, withTranslation, Trans } from 'react-i18next';
import '../translation/i18n'
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useIsFocused } from "@react-navigation/native";
const SwiperScreen = ({ navigation }) => {
  
  const swiperRef =useRef();
  const [indx, setindx] = useState(0)
  const [open, setOpen] = useState(false);
  const [slideFirst, slideFirstChange] = useState(true);
  const [value, setValue] = useState("");
  const [show, setshow] = useState(false);
  const [show1, setshow1] = useState(true);
  const [ValSwiper,setValSwiper] =useState('')
  const [isFocus, setIsFocus] = useState(false);

  const data = [
    { label: 'English', value: 'English' },
    { label: 'Danish', value: 'Danish' }
    // { label: t('Danish'), value: t('Danish') }
  ];

  
  
const {t, i18n} = useTranslation();
const isFocused = useIsFocused();
  const [currentLanguage,setLanguage] =useState("Danish");
  
  const changeLanguage = async lang => {
   
    i18n
      .changeLanguage(lang)
      .then( async() => setLanguage("Danish"))
      await AsyncStorage.setItem("langugae",lang)
    //  alert(lang)
      .catch(err => console.log(err));
  }; 
  useEffect(() => {
    languages()
   
  }, [isFocused]); 
  const languages=async()=>{
    var langg=await AsyncStorage.getItem("langugae")

    changeLanguage(langg)
    
  }
  const onNext=()=>{
    swiperRef.current.scrollBy(1)
    if(ValSwiper==3){
      navigation.navigate("Login")
    }
  }
  const skip=()=>{
    swiperRef.current.scrollBy(-1)
  }
  const setSwiperIndex = (index) => {
    if(index == 0){
      slideFirstChange(true);
    } 
    else {
      slideFirstChange(false);
    }  
  }
  const setSwiperIndex2 = (index) => {
  
    if(index == 3){
      slideFirstChange(true);
      navigation.navigate("Login")
    } 
  }
  const ondropdownchange=async(value)=>{
    
    if (value== "Danish") {
        setshow1(true)
        setshow(false)  
       
    }
    else if (value== "English"){
        setshow1(false)
        setshow(true)
     
    }
          }
  return (
 
      <View>
        <ImageBackground style={swiperstyle.ImageBackground} source={require("../../asset/Splash.png")}>

          <View style={{flex:1, marginBottom: 15, }}>


            <Swiper style={swiperstyle.wrapper} showsButtons={false}
          onIndexChanged={index => {setSwiperIndex(index),setValSwiper(index)}} loop={false}
            ref={swiperRef}
            autoplay={false}
              dot={<View style={{ backgroundColor: 'rgba(0,0,0,.2)', width: 8, height: 8, borderRadius: 4, marginLeft: 3, marginRight: 3, marginTop: 3, marginBottom: 3, }} />}
              activeDot={<View style={{ backgroundColor: '#008080', width: 8, height: 8, borderRadius: 4, marginLeft: 3, marginRight: 3, marginTop: 3, marginBottom: 3, }} />}
            >
                 <ScrollView style={{flex:1,marginBottom:52}}>
              <View style={swiperstyle.slide1}>

            
              <View style={{  marginTop: 40, borderWidth: 0.5,borderRadius: 20, alignItems: 'flex-start', justifyContent: 'center',backgroundColor:'#F9FBDB',borderColor:'#DCDFA5',paddingHorizontal:10,paddingVertical:10, width:150 }}>
                  <View style={{ flexDirection: 'row', alignItems: 'center',  }} >

                  {
          show1 &&
          <Image style={{ height: 20, width: 20, marginTop: 3, }} source={require("../../asset/denmark.png")} />
        }

{
  show &&
  <Image style={{ height: 20, width: 20, marginTop: 3, }} source={require("../../asset/kingdomflag.png")} />
}
<View style={{marginLeft:60}}>

  <Dropdown
          data={data}
          maxHeight={300}
          labelField="label"
          valueField="value"
          placeholder={currentLanguage}

          style={{ alignSelf:'center', borderWidth: 0, backgroundColor: 'transparent', width: 100, marginBottom: 30, marginTop: -15 ,position:"absolute"}}
          placeholderStyle={{ fontSize: 15, color: "black",fontFamily:'Axiforma-Bold',marginLeft:10 }}
          containerStyle={{ height: 100,marginTop:5, }}
          itemTextStyle={{color:'grey'}}
          selectedTextStyle={{color:'grey'}}
          value={value}
          onFocus={() => setIsFocus(true)}
          onBlur={() =>  setIsFocus(false)}
          onChange={item => {
            setValue(item.value);
            setIsFocus(false);
            ondropdownchange(lang=item.value)
            changeLanguage(item.value)
            if(item.value=="Danish"){
              changeLanguage("da")
              setLanguage("da")
            }
            if(item.value=="English"){
              changeLanguage("en")
              setLanguage("en")
            }
           
            // console.log("khjhk",item.value)
          }}
        /> 
        </View>
                  </View>
                </View>
                <Image style={[{ marginTop: open ? 40 : 0, height: 347, width: '100%', }]} resizeMode="stretch" source={require("../../asset/Backgroun-pattern.png")} />

                <Text style={swiperstyle.slider1text1}>{t('Welcome to heybuddies')}</Text>
                {console.lolo}
                <Text style={swiperstyle.slider1text2}>{t('heybuddies is a community for parents and their children that makes it easy to join groups and meet others in your local area based on shared interests')}</Text>
              </View>
              </ScrollView>
          
              <View style={swiperstyle.slide2}>
                <Image style={swiperstyle.slider1img1} resizeMode="stretch" source={require("../../asset/Group108.png")} />

                <Text style={swiperstyle.slider1text1}>{t("Enter your information and preferences")}</Text>

                <Text style={swiperstyle.slider1text2}>{t("Simply enter your key information and preferences about you and your kid(s) for groups and activities")}</Text>
              </View>
          
             
              <View style={swiperstyle.slide3}>
                <Image style={swiperstyle.slider1img2} resizeMode="stretch" source={require("../../asset/Group109.png")} />

                <Text style={swiperstyle.slider1text1}>{t("Get matched with other parents")}</Text>

                <Text style={swiperstyle.slider1text2}>{t("The algorithm matches you effortlessly with a group of 3-5 like-minded parents")}</Text>

              </View>
                <View style={swiperstyle.slide4}>
                  

                <ScrollView style={{flex:1,marginBottom:52}}>
                
                  <Image style={swiperstyle.slider1img3} resizeMode="stretch" source={require("../../asset/Group107.png")} />
                  <Text style={swiperstyle.slider1text5}>{t("Vote on time slot and activity and enjoy")}</Text>
                  <Text style={swiperstyle.slider1text2}>{t("Use the big activity catalogue and easy scheduling option to quickly set up your meeting")}</Text>
                <TouchableOpacity onPress={() => navigation.navigate("Login")} style={{ height: 49, width: 170, backgroundColor: '#008080', borderRadius: 120, alignItems: 'center', justifyContent: 'center', alignSelf: 'center', marginTop: 20 }}>

                  <Text style={{ color: 'white', fontSize: 16, fontWeight: '700' }}>{t("Get Started")}</Text>
                  </TouchableOpacity>
                  </ScrollView>
                </View>
               

         

            </Swiper>
           {!slideFirst &&
              <TouchableOpacity style={{width:100,height:50,marginTop:-50,}} onPress={()=>{skip(),navigation.navigate("Login")}}>
              <Text style={swiperstyle.skiptext}>{t("Skip")}</Text>
              </TouchableOpacity>
           }
           
            <TouchableOpacity style={{width:100,height:50,alignSelf:"flex-end"
            ,alignItems:'center',marginTop:-50}} onPress={()=>{onNext()}}>
            <Text style={swiperstyle.nexttext}>{t("Next")}</Text>
            </TouchableOpacity>
            
          </View>

        </ImageBackground>
      </View>
  
  )
}
const full_app =  withTranslation()(SwiperScreen)
export default full_app;
const swiperstyle = StyleSheet.create({
  Maincontainer: {
    flex: 1,
    
  },
  ImageBackground: {
    height: '100%',
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center'
  },
  wrapper: {

  },
  slide1: {
    flex: 1,

    alignItems: 'center',

  },
  slide2: {
    flex: 1,

    alignItems: 'center',

  },
  slide3: {
    flex: 1,

    alignItems: 'center',

  },
  slide4: {
    flex: 1,

    alignItems: 'center',

  },
  text: {
    color: '#fff',
    fontSize: 30,
    fontWeight: 'bold'
  },
  nexttext: {
  
    
    color: '#008080',
    fontSize: 20,
    marginRight: 10,
    fontFamily: "Axiforma-SemiBold",
  },
  skiptext: {
  
    fontFamily: "Axiforma-Regular",
    color: '#737373',
    fontSize: 20,
    marginLeft: 20.68,
    
  }, slider1img: {
    height: 347,
    width: '100%',

  },
  slider1img1: {
    height: 347,
    width: '100%', marginTop: 60
  },
  slider1img2: {
    height: 347,
    width: '100%',
    marginTop: 60
  },
  slider1img3: {
    height: 347,
    width: '100%',
    marginTop: 55,
    
  },
  slider1text1: {
    textAlign: 'center',
    color: '#008080',
    fontSize: 28,
    lineHeight: 37,
    marginHorizontal: 20,
    
    fontFamily: "Axiforma-Bold"
  },
  slider1text5: {
    textAlign: 'center',
    color: '#008080',
    fontSize: 28,
    lineHeight: 37,
    marginHorizontal: 20,
  
    fontFamily: "Axiforma-Bold"
  },
  slider1text2: {
    fontSize: 17,
    marginHorizontal: 20,
    textAlign: 'center',
    fontFamily: 'Axiforma-Regular',
marginTop:13,
marginBottom:10,
    lineHeight: 32,
    color:'gray'


  },
  view3: {
    width: '100%',

  },
  view2: {
    marginTop: 25,
    padding: 10,
    width: '100%',
    alignItems: 'center'
  }
})



