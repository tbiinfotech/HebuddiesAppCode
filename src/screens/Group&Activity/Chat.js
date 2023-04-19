
import React,{useState,useEffect} from "react";
import { View,Text,TouchableOpacity,TextInput,Image,ImageBackground,StyleSheet,FlatList,ActivityIndicator } from "react-native";
import Modal from "react-native-modal";
import firestore from '@react-native-firebase/firestore';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useIsFocused } from "@react-navigation/native";
import { useTranslation, withTranslation, Trans } from 'react-i18next';
import axios from "axios";
import constants from "../constants/constants";
import '../translation/i18n'
var loader1=true;
const Chat=({navigation})=>{
     const isFocused = useIsFocused();
    const [visible3,setvisible3]=useState(false)
    const [groupArray,setGroupArray]=useState([])
    const [loader,setLoader]=useState(true)
    const[image,setImage]=useState("")
    const[data,setData]=useState([])   
 const {t, i18n} = useTranslation();
    useEffect(()=>{
       if(isFocused){
        fetchData();
        var date = new Date();
        // console.log("434343434334343",data.getFullYear())
       }
        
      
     },[isFocused])

    

     async function fetchData(){
        
      var userId  = await AsyncStorage.getItem('user_id')
       
        const subscriber = firestore()
        .collection('groups')
        .onSnapshot(querySnapshot => {
        // console.log("dsddddsdsquerySnapshotdsdsds->>>>>>>>>>>>>>>>>>>",querySnapshot)
          var Arr=[]
          querySnapshot.docs.map((item,index)=>{
                // console.log("itemiouuuoououuadsfadadsa",item)
        
            if(item.data().users!=[]){
                
                item.data().users.map((item1,index1)=>{
                    
                //  console.log('item------>++++kkjkk===>>>>'+item1.userId+"item<<<<<----------"+userId);
                    if(item1.userId==userId){                    
                            var lastMsg='';
                            var lastmsgTime=''  
                            var senderName=''
                        if(item.data()?.messages){
                            
                                 var length=item.data().messages.length
                                  var lastMsg=item.data().messages[0].dataText;
                                  var lastmsgTime = item.data().messages[0].time;
                                  var senderName = item.data().messages[0].name;
                            
                                //  console.log(">>>>>>324233>>>ddffdfdf>>>>>>>>>", lastmsgTime)
                                //   console.log("AAAAAAAAAAAA",lastMsg)
                                
                            }
                       
                            var obj={
                                "groupName":item.data().group_name,
                                "groupImage":item.data().group_photo,
                                 "Id":item.data().firebaseGroupId,
                                 "lastMsg":lastMsg,
                                 "time":lastmsgTime,
                                // "senderName" :senderName.replaceAll('"', '')
                                "senderName" :senderName.replace(/['"]+/g, '')
                        
                            }
                            
                            // console.log("fgfgfhhdjdjdjvvv",item.data().group_photo)
                        Arr.push(obj)
                    }
                    
                 
                })
            }
            
             })
             
                setGroupArray(Arr)
               
                // console.log("32323232323232",Arr)
                 loader1='false';
           
              
             setTimeout(() => {
                setLoader(false)
             }, 1000);
             
          });
        
          return () => subscriber();
    }

    return(
<ImageBackground source={require("../../asset/Splash.png")} resizeMode='stretch' style={styles.Container} >

<View style={styles.view2}>
                    <TouchableOpacity onPress={()=>navigation.goBack()}>
                 <Image style={styles.img3} resizeMode="contain"  source={require('../../../Images/Arrow-Left.png')} />
                 </TouchableOpacity>
            <Text style={styles.text1}>{t("Chat")}</Text>
            <TouchableOpacity onPress={()=>navigation.navigate("Notification1")}>
            <Image style={styles.img3} resizeMode="contain" source={require("../../asset/Notification.png")}/>
            </TouchableOpacity>
                 </View>
               
                 {
                    loader==true ?
                    <ActivityIndicator style={{ justifyContent: 'center', alignItems: 'center', alignSelf: 'center',marginTop:50,color:'#008080' }} size="small" color="#008080" />

                    :
                    // <View style={{flex:0.9}} >
                     <View style={{height:'90%'}}>
                        {
                            groupArray.length!=0 ?
                            <FlatList
                      data={groupArray}
                      renderItem={({ item })=>{
                        // console.log('asdasdadsasdasdasd', item);
                        return(
                          
                       
                            <View>
                        
                        <View style={{marginStart:20,marginTop:40}}>
    <TouchableOpacity style={{justifyContent:'space-between',flexDirection:'row',}} onPress={()=> navigation.navigate("MessageScreen",{"Id":item.Id})} >
    
    <View style={{flexDirection:"row"}} >
    {item.groupImage ? (
        <Image source={{uri:item.groupImage}} style={{height:50,width:50,borderRadius:25,borderWidth:1,borderColor:'grey'}} />
        ) : (
            <Image    source={require("../../../src/asset/dummyimage.png")} style={{height:50,width:50,borderRadius:25,borderWidth:1,borderColor:'grey'}} />
            )}
        <View style={{flexDirection:'column',marginStart:15}}>
        <Text style={{fontWeight:'500',fontSize:18,color:'grey',marginTop:5,width:'65%'}} >{item.groupName}</Text>
        <View style={{flexDirection:'row'}} >
        <Text numberOfLines={1} style={{fontFamily:'Axiforma-Regular',fontSize:14,color:'#737373',width:"15%",marginTop:5}} >{item.senderName=='' ? item.senderName : item.senderName  +  ": "}</Text>
        <Text numberOfLines={1}  style={{fontFamily:'Axiforma-Regular',fontSize:14,color:'#737373',marginLeft:5,width:"35%",marginTop:5}} >{item.lastMsg}</Text>
       <Text style={{fontFamily:'Axiforma-Regular',fontSize:14,color:'#737373',marginLeft:0}} >{item.time}</Text>
        </View>
        </View>
    </View>

</TouchableOpacity>
                         </View>
       
                          </View>
                       
                        )
                      
                      }}
                      />
                      :
                      <View style={{}}>
                        <Text style={{color:'grey',marginTop:200,textAlign:'center',alignSelf:"center",fontSize:16,fontFamily:'Axiforma-Regular'}}>
                        {t("You need to join a group to use the chat feature")}
                        </Text>
                      </View>
                        }
                      
                    {/* </View> */}
                    </View>
                 }
                
                


    
    {
  visible3 == true && 
  <Modal isVisible={true}
  onBackdropPress={() => {
    setvisible3(!visible3)
  }}
>
<View style={styles.notificationmodalview}>


<TouchableOpacity onPress={()=> setvisible3(false)} style={styles.modalview1}>
    <Image style={styles.crossimg} resizeMode="contain" source={require("../../asset/cross.png")}/>

</TouchableOpacity>
<View  style={styles.modalview2}>
    <Image resizeMode="contain" style={styles.modalimg} source={require("../../asset/ic-Chill.png")} />
<Text style={styles.modaltxt}>Welcome to group
{'\n'}The high five jumpers</Text>
<Text style={styles.modaltxt1}>You are all in</Text>
<View style={styles.modalview3}>
    <View style={styles.modalview4}>
        
    <View style={styles.view8}>
                            <Image style={styles.img5} resizeMode="contain" source={require("../../asset/Location.png")}/>
                            <Text style={styles.text4}>TOK OEO</Text>
                    
                            </View>
    <View style={styles.modalview8}>
                            <Image style={styles.img5} resizeMode="contain" source={require("../../asset/chill.png")}/>
                            <Text style={styles.text4}>Chill </Text>
                    
                            </View>
                            
    </View>

    <View style={styles.modalview9}>
                            <Image style={styles.img5} resizeMode="contain" source={require("../../asset/Profile(2).png")}/>
                            <Text style={styles.text4}>
                            Age group: 2 years
                               </Text>
                    
                            </View>
                       

</View>
</View>
    
</View>
</Modal>  
}
    <View style={{backgroundColor:'#D9D9D9',height:1,width:280,alignSelf:'flex-end',marginEnd:20,marginTop:12}} />


</ImageBackground>
    )
}
export default Chat;


const styles=StyleSheet.create({

    Container:{
        flex:1
    },

    IconStyle:{
        height:27,
        width:27,
        tintColor:'#F9FBDB'
    },
    
    IconDesign:{
        height:25,
        width:25
     
    },
    
    ViewStyle:{backgroundColor:'#008080',
    justifyContent:'space-between',
    flexDirection:'row',
    alignItems:'center',
    paddingTop:52,
    paddingBottom:21,
    paddingHorizontal:17},
    view2:{
        backgroundColor:'#008080',
        width:'100%',
        padding:10,
        flexDirection:'row',
        justifyContent:'space-between',
        alignItems:'center',
        paddingTop:55
    },
    text1:{
        color:'#F9FBDB',
        fontSize:24,
       fontFamily:"Axiforma-Bold"

    },
    img3:{
        width:25,
        height:25,
        tintColor:'#F9FBDB',

    },
    view2:{
        backgroundColor:'#008080',
        width:'100%',
        padding:10,
        flexDirection:'row',
        justifyContent:'space-between',
        alignItems:'center',
        paddingTop:55
    },
    text1:{
        color:'#F9FBDB',
        fontSize:24,
       fontFamily:"Axiforma-Bold"

    },
  
       

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
    paddingTop:55
},
text1:{
    color:'#F9FBDB',
    fontSize:24,
   fontFamily:"Axiforma-Bold"

},
view3:{
  padding:20,
  marginTop:10,
  flexDirection:'row',
  justifyContent:'space-between',
  alignItems:'center'
},
text2:{
    color:'#737373',
    fontSize:16,
    fontFamily:"Axiforma-Regular"

},

view4:{
    paddingLeft:15,
    paddingRight:15,
    width:'100%',
  alignItems:'center',marginBottom:20
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
    color:'grey',
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
    color:'grey'
},
view9:{
    flexDirection:'row',alignItems:'center',
    width:"90%",
    justifyContent:'space-between'


},
button:{
    height:40,width:120,backgroundColor:'#008080',borderRadius:120,alignItems:'center',justifyContent:'center',marginTop:20,marginRight:10,marginStart:20
},
buttontxt:{
    color:'white',fontSize:16,fontFamily:"Axiforma-SemiBold"
},
modalview:{
    backgroundColor:'white',
    width:326,
    borderRadius:16,padding:20,
    marginBottom:250,
    marginLeft:35

  
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

modalimg:{
   height:92,
   width:99
},
modaltxt:{
    fontSize:24,
   
    textAlign:'center',lineHeight:25,
    color:'grey',marginTop:17,fontFamily:"Axiforma-Bold"
},
modaltxt1:{
    fontSize:17,
    fontFamily:"Axiforma-Regular",
    textAlign:'center',
    color:'#737373',marginTop:5,
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
    height:58,width:170,backgroundColor:'#008080',borderRadius:120,alignItems:'center',justifyContent:'center',marginTop:40,marginBottom:33,
    
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
   marginLeft:35
},
})