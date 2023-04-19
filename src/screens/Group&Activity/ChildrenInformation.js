import React,{useState,useEffect,useCallback} from "react";
import {View,Text,TouchableOpacity,ImageBackground,Image,StyleSheet,FlatList,ScrollView}from 'react-native'
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useTranslation, withTranslation, Trans } from 'react-i18next';
import { useIsFocused } from "@react-navigation/native";
import axios from "axios";
import constants from "../constants/constants";
import '../translation/i18n'
const ChildrenInformation=({navigation})=>{
    const isFocused = useIsFocused();
    const[name,setName]=useState("")
    const[name1,setName1]=useState("")
    const[name2,setName2]=useState("")
    const[dob,setDob]=useState("")
    const[dob1,setDob1]=useState("")
    const[dob2,setDob2]=useState("")
    const[id,setId]=useState("")
    const[id1,setId1]=useState("")
    const[id2,setId2]=useState("")
    const[age1,setage1]=useState("")
    const[age2,setage2]=useState("")
    const[age3,setage3]=useState("")
    const[childimage,setChildimage]=useState("")
    const[data,setData]=useState([])
    const {t, i18n} = useTranslation();

    useEffect(() => {
        getchildinfo()
      }, [isFocused]);
 
    const getchildinfo=(async()=>{
        var token  = await AsyncStorage.getItem('token')
       var config = {
       method: 'get',
       url: constants.BASE_URL + "api/profile/children/info",
       headers: {                                           
        'Authorization': 'Bearer '+JSON.parse(token)    
      },
    };
    axios(config)
    .then(async (response)=> {
     
  console.log("gfgfnewwwchilddddinfffooo",response.data.data)
  setData(response.data.data)
setId(response.data.data[0].id)
setName(response.data.data[0].name)
setDob(response.data.data[0].dob)
setage1(response.data.data[0].age)

setId1(response.data.data[1].id)
setName1(response.data.data[1].name)
setDob1(response.data.data[1].dob)
setage2(response.data.data[1].age)
setId2(response.data.data[2].id)
setName2(response.data.data[2].name)
setDob2(response.data.data[2].dob)
setage3(response.data.data[2].age)
        
        

      if(response.data.status==true){

      }
      else{
        alert(response.data.message)
      }
  })
  .catch(function (error) {
  
  });
      })
    return(
<ImageBackground source={require('../../../Images/background.png')} style={styles.Container} resizeMode='stretch' >

<View style={styles.ViewStyle}   >
        <TouchableOpacity onPress={() => navigation.goBack()}>
        <Image source={require('../../../Images/Arrow-Left.png')} style={styles.IconStyle}    />
        </TouchableOpacity>
<Text style={{fontSize:24,fontFamily:'Axiforma-Bold',color:'#F9FBDB'}} >{t("Children Information")}</Text>
<TouchableOpacity>
<Image  style={styles.IconDesign} />
</TouchableOpacity>

    </View>
    <ScrollView>
                           {/* { data.length!=0 ? */}
<FlatList
                      data={data}
                      renderItem={({ item })=>{
                        console.log('asdasdadsasdasdasd', item);
                        return(
                          
                       
                            <View>
                        
                        <View style={{marginStart:0,marginTop:10}}>
<TouchableOpacity  onPress={()=>navigation.navigate('ChildrenInformation1',
{child_id:item.id, child_name:item.name,Child_birthdate:item.dob,child_age:item.age,child_img:item.Image})} style={styles.ButtonDesign} >

    <Text style={styles.TextStyle} >  
   {item.name}
    </Text>
    <Image source={require('../../../Images/next.png')}  style={{height:15,width:10}}/>
</TouchableOpacity>
                         </View>
       
                          </View>
                       
                        )
                      
                      }
                    }
                      />
                      {/* :
                      <View style={{}}>
                        <Text style={{color:'grey',marginTop:200,textAlign:'center',alignSelf:"center",fontSize:16,fontFamily:'Axiforma-Regular'}}>
                        {t("No children")}
                        </Text>
                      </View>
                        } */}

<View style={{flex:1,justifyContent:'flex-end',alignItems:'flex-end',marginBottom:20,marginEnd:27}} >
<TouchableOpacity onPress={()=>navigation.navigate('ChildInformation2')} >
    <Image source={require('../../../Images/plus.png')} style={{height:68,width:68,marginTop:10}}  />
</TouchableOpacity>


</View>
</ScrollView>
</ImageBackground>
    )
}
const full_app =  withTranslation()(ChildrenInformation)
export default full_app;
// export default ChildrenInformation


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
        marginEnd:78},

        TextStyle:{
            fontSize:16,
            color:'#737373',
            fontFamily:'Axiforma-Regular'
        },

        buttonStyle:{borderWidth:1,
            borderColor:'#DFE3A3',
            paddingVertical:34,
            flexDirection:'row',
            justifyContent:'space-between',
            paddingHorizontal:20},

            ButtonDesign:{
                borderWidth:1,
            borderColor:'#DFE3A3',
            paddingVertical:34,
            flexDirection:'row',
            justifyContent:'space-between',
            paddingHorizontal:20,
            borderTopWidth:0
            }
    
  
})