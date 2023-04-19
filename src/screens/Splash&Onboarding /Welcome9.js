import React, { useState } from 'react'
import { SafeAreaView, Text, View,ImageBackground, Switch, ScrollView,TouchableOpacity } from 'react-native'
import Checkbox from 'expo-checkbox';
import ToggleSwitch from 'toggle-switch-react-native'
import DropDownPicker from 'react-native-dropdown-picker';
import { Dropdown } from 'react-native-element-dropdown';
import ReadMore from "@fawazahmed/react-native-read-more";
import { useTranslation, withTranslation, Trans } from 'react-i18next';
import '../translation/i18n'
const Welcome9 = ({navigation}) => {
    const {t, i18n} = useTranslation();
    const [isChecked,setisChecked]=useState(true)
    
    const [on, seton] = useState(true)
    const [on1, seton1] = useState(true)
    const [visible, setvisible] = useState(false)
    const [toggleCheckBox, setToggleCheckBox] = useState(false)
    

    const [date, setDate] = useState(new Date())
    const [isFocus, setIsFocus] = useState(false);
    const [open, setOpen] = useState(false);
    const [value, setValue] = useState(null);
    const data = [
      {label: 'Once', value: 'English'},
      {label: 'Always', value: 'Danish'}
  ];
  
  const Toggle_Switch2=()=>{
   
    if(visible == true){
        setvisible(false)
      
    }
    if(visible== false){
        setvisible(true)
    }
    }
    
const Toggle_Switch=()=>{
   
if(on == true){
    seton(false)
}
if(on== false){
    seton(true)
}
}
const Toggle_Switch1=()=>{
   
    if(on1== true){
        seton1(false)
    }
    if(on1== false){
        seton1(true)
    }
    }
    const user=(()=>{
        if(isChecked==""){
            alert("Please accept all cookies")
        }
        else{
            navigation.navigate("Login")
        }
    })

    return (
           <ScrollView>
           <View style={{flex:1}}>
<ImageBackground style={{ height:'100%',width:'100%', }} source={require("../../asset/Splash.png")}>
        <View style={{paddingTop:50,padding:20,}}>
        <Text style={{fontSize:28, color:'#008080',textAlign:'center',fontFamily:"Axiforma-Bold"}}>{t("DU bestemmer over dine data!")}
        </Text>
        <View >

       
        <Text style={{fontSize:17,fontFamily:"Axiforma-Regular",color:'#000000',lineHeight:32,textAlign:'center',marginTop:15,color:'grey'}}>{t("Vi bruger cookies og teknologier til at indsamle information om dig, der giver dig den allerbedste oplevelse med app’en. Desuden vil data blive brugt i tracking-, statistik- og markedsføringsøjemed")}</Text>
<Text  style={{fontSize:17,fontFamily:"Axiforma-Regular",color:'#000000',lineHeight:32,textAlign:'center',marginTop:15,color:'grey'}}>
{t("Ved at trykke ‘accepter alle’ giver du samtykke til brugen af dette.Du kan ogsa indikere hvilke formal du giver samtykke til ved at ved at bruge check boxene nedenfor.Du kan til enhver tid tilbagetraekke dit samtykke, og du kan laese merre om vores cookie-politik og brug af personlig data i linket nedenfor.")}</Text>

</View>
        </View>
        <View style={{flexDirection:'row',alignItems:'center',padding:20}}>
        <Checkbox
          style={{marginLeft:10,marginRight:20,backgroundColor:'white',borderWidth:0.3,borderColor:'#DEDEDE'}}
          value={isChecked}
          onValueChange={setisChecked}
          color={isChecked ? '#008080' : undefined}
        />

            <Text style={{color:'black',fontSize:17,fontFamily:'Axiforma-Medium',color:'grey'}}>{t("Accept all cookies & privacy")}</Text>
            
        </View>
        {visible==true &&
 <TouchableOpacity onPress={()=>  {Toggle_Switch2()}}>
 <Text style={{fontFamily:"Axiforma-Bold",color:'#008080',textDecorationLine:'underline',marginLeft:70,fontSize:17}}>{t("se mindre")}</Text>

</TouchableOpacity>
        }
             {!visible==true &&
 <TouchableOpacity onPress={()=>  {Toggle_Switch2()}}>
 <Text style={{fontFamily:"Axiforma-Bold",color:'#008080',textDecorationLine:'underline',marginLeft:70,fontSize:17}}>{t("Vis mere")}</Text>

</TouchableOpacity>
        }
       
         {/* <TouchableOpacity onPress={()=>  {Toggle_Switch2()}}>
                <ReadMore
                  numberOfLines={3}
                  style={{fontFamily:"Axiforma-Bold",color:'#008080',textDecorationLine:'underline',marginLeft:70,fontSize:17}}
                  seeMoreText="Read More"
                  seeLessText="Read less"
                  seeLessStyle={{
                    fontSize: 16,
                    color: "#008080",
                    fontFamily: "Axiforma-SemiBold",
                    marginRight: 20,
                  }}
                  seeMoreStyle={{
                    fontSize: 16,
                    color: "#008080",
                    fontFamily: "Axiforma-SemiBold",
                    marginRight: 30,
                  }}
                >
                 
                </ReadMore>
              </TouchableOpacity> */}
{
    visible == true && 
    <View style={{paddingLeft:20}} >

       
    <Text style={{fontSize:17,fontFamily:"Axiforma-Regular",color:'grey',lineHeight:32,marginTop:10,textAlign:'center'}}>{t("Dine data ejes af heybuddies og kan i visse tilfælde deles med tredjepart")}
</Text>
<Text style={{fontSize:17,fontFamily:"Axiforma-Regular",color:'grey',lineHeight:32,marginTop:10,textAlign:'center',paddingRight:10}}>
{t("Dine data gemmes så længe du er aktiv på app’en og op til 1 år efter du har slettet din profil")}
</Text>
<Text style={{fontSize:17,fontFamily:"Axiforma-Regular",color:'grey',lineHeight:32,marginTop:10,textAlign:'center',paddingRight:10}}>
{t("Nødvendige cookies: gør hjemmesiden brugbar")}
</Text>
<Text style={{fontSize:17,fontFamily:"Axiforma-Regular",color:'grey',lineHeight:32,marginTop:10,textAlign:'center',paddingRight:10}}>
{t("Funktionelle cookies: oplysninger om foretrukne indstillinger")}
</Text>
<Text style={{fontSize:17,fontFamily:"Axiforma-Regular",color:'grey',lineHeight:32,marginTop:10,textAlign:'center',paddingRight:10}}>
{t("Statistiske cookies: oplysninger om hvordan du interagerer med app’en")}</Text>


    </View>
}

        <View style={{flexDirection:'row',alignItems:'center',padding:20,justifyContent:'space-between',width:'96%'}}>
       

            <Text style={{color:'black',fontSize:15,fontFamily:'Axiforma-Medium',color:'grey'}}>{t("Allow app notifications")}</Text>
            <ToggleSwitch
isOn={on}
onColor='#008080'
offColor="#EDEDED"
size="medium"
onToggle={()=> Toggle_Switch()}
/>
            
        </View>
        <View style={{flexDirection:'row',alignItems:'center',justifyContent:'space-between',paddingHorizontal:20,width:'90%'}}>
       

       <Text style={{color:'black',fontSize:15,fontFamily:'Axiforma-Medium',lineHeight:22,color:'grey'}}>{t("Receive newsletters, good offers & marketing materials")}</Text>
       <ToggleSwitch
       style={{marginLeft:30}}
isOn={on1}
onColor='#008080'
offColor="#EDEDED"
size="medium"
onToggle={()=> Toggle_Switch1()}
/>
       
   </View>
   {/* <View style={{flexDirection:'row',alignItems:'center',padding:20,justifyContent:'space-between'}}>
       

       <Text style={{color:'black',fontSize:15,fontFamily:'Axiforma-Medium',lineHeight:22,color:'grey'}}>Receive newsletters, good {'\n'}offers & marketing materials</Text>

       <Dropdown
          style={{width:110,borderRadius:25,borderColor:'#DFE3A3',backgroundColor:'white',paddingHorizontal:10}}

data={data}
          
          maxHeight={200}
          labelField="label"
          valueField="value"
          placeholder={"Once"}
          containerStyle={{borderRadius:5}}
          placeholderStyle={{fontFamily:'Axiforma-Regular',fontSize:13,color:'grey'}}
          selectedTextStyle={{color:"grey"}}

          value={value}
          onFocus={() => setIsFocus(true)}
          onBlur={() => setIsFocus(false)}
          onChange={item => {
            setValue(item.value);
            setIsFocus(false);
          }}
          />
    
       
   </View> */}
   <TouchableOpacity onPress={()=> user()} style={{height:49,width:177,backgroundColor:'#008080',borderRadius:120,alignItems:'center',justifyContent:'center',alignSelf:'center',marginTop:20,marginBottom:60}}>
               <Text style={{color:'white',fontSize:16,fontFamily:'Axiforma-Bold'}}>{t("Accept")}</Text>
             </TouchableOpacity>

       
       
               </ImageBackground>
           </View>
           </ScrollView>
    )
}
const full_app =  withTranslation()(Welcome9)
export default full_app;
// export default Welcome9