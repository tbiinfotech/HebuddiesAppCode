import React from 'react'
import { SafeAreaView, StyleSheet, View ,ImageBackground,Image,Text,FlatList,TouchableOpacity, ScrollView} from 'react-native'

const Plans = ({navigation}) => {

    const PlanData=[
        {
            id:1,
            IMAGE:require("../../asset/Left(2).png"),
            TEXT:"Basic",
            TEXT1:"- Lorem Ipsum is simply dummy",
            TEXT2:"- Dummy text ever since the 1500s,",
            TEXT3:"- Dummy text ever since the 1500s,",
            TEXT4:"- Lorem Ipsum is simply dummy",
            TEXT5:"Purchase plan"
        },
        {
            id:1,
            IMAGE:require("../../asset/Left(3).png"),
            TEXT:"Advanced",
            TEXT1:"- Lorem Ipsum is simply dummy",
            TEXT2:"- Dummy text ever since the 1500s,",
            TEXT3:"- Dummy text ever since the 1500s,",
            TEXT4:"- Lorem Ipsum is simply dummy",
            TEXT5:"Purchase plan"
        },
        {
            id:1,
            IMAGE:require("../../asset/Left(4).png"),
            TEXT:"Premium",
            TEXT1:"- Lorem Ipsum is simply dummy",
            TEXT2:"- Dummy text ever since the 1500s,",
            TEXT3:"- Dummy text ever since the 1500s,",
            TEXT4:"- Lorem Ipsum is simply dummy",
            TEXT5:"Purchase plan"

        },
    ]
    return (       
   <View style={plansstyle.main}>
   <ImageBackground style={plansstyle.ImageBackground} source={require("../../asset/Splash.png")}>  
    
             <View style={plansstyle.View1}>
             <View style={plansstyle.view2}>
                <TouchableOpacity onPress={()=>navigation.goBack()}>
                 <Image style={plansstyle.img3} resizeMode="contain" source={require('../../../Images/Arrow-Left.png')} />
            </TouchableOpacity>
            <Text style={plansstyle.text1}>Plans</Text>
                <Image style={plansstyle.img3} resizeMode="contain"/>
                 </View>
                 <ScrollView>
                 <View style={plansstyle.view3}>
                 <Text style={plansstyle.text2}>Please choose the plan</Text>
                 </View>
                 <View style={plansstyle.view4}>

                
                 <FlatList
                data={PlanData}
                renderItem={({ item }) => {
                
                  return (
                    <View style={plansstyle.view5}>
                    <View style={plansstyle.view6}>
                        <Image style={plansstyle.img4} resizeMode="contain" source={item.IMAGE}/>
                    
                        <View style={plansstyle.view7}>
                            <Text style={plansstyle.text3}>{item.TEXT}</Text>
                            <View style={{marginStart:18,}}>
                                <Text style={{  fontFamily:"Axiforma-Regular",marginRight:10,color:'grey'}}>
                                    {item.TEXT1}
                                </Text>
                                <Text  style={{  fontFamily:"Axiforma-Regular",marginRight:10,color:'grey'}}>
                                    {item.TEXT2}
                                </Text>
                                <Text  style={{  fontFamily:"Axiforma-Regular",marginRight:10,color:'grey'}}>
                                    {item.TEXT3}
                                </Text>
                                <Text   style={{  fontFamily:"Axiforma-Regular",marginRight:10,color:'grey'}}>
                                    {item.TEXT4}
                                </Text>
                                </View>    
                    </View>
                    </View>
                    <View style={plansstyle.view9}>
                        <View style={plansstyle.view10}>
                        <TouchableOpacity  style={plansstyle.button}>
                        <Text style={plansstyle.buttontxt}>{item.TEXT5}</Text>
                       </TouchableOpacity>
                        </View>
                        </View>             
</View>  
                  )}}
                     />
                     </View>
                     </ScrollView>
                 </View>
             
                 </ImageBackground>

</View>
     
    )
}

export default Plans;
const plansstyle= StyleSheet.create({
    main:{
        flex:1
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
    img3:{
        width:27,
        height:27,
        tintColor:'#F9FBDB'
    },
    text1:{
        color:'#F9FBDB',
        fontSize:24,
        fontFamily:"Axiforma-Bold"

    },
    view3:{
       marginStart:20,
        marginTop:35,
        flexDirection:'row',
        justifyContent:'space-between',
        alignItems:'center'
      },
      text2:{
          color:'#737373',
          fontSize:16,
          fontWeight:'400'
  
      },
      view4:{
       
        width:'100%',
      alignItems:'center',
      marginBottom:20,marginTop:10

    },
    view5:{
        
        backgroundColor:'white',
        borderRadius:10,
      marginTop:15,
      color:'grey'
       

    },
    view6:{
       alignItems:'center',
       marginStart:18,
    marginTop:19,
        flexDirection:'row'
    },
    img4:{
        height:62.9,
        width:68,
          
    },
    text3:{
        fontSize:18,
        fontFamily:"Axiforma-Bold",
        color:'grey',marginStart:18,
        
    },
    view8:{
        flexDirection:'row',
        alignItems:'center',
      
    },
    img5:{
height:17,
width:15
    },
    text4:{
        color:'#737373',
        fontSize:16,
        marginLeft:5,
        fontWeight:'500'
      
    },
    text5:{
        fontSize:16,
        fontWeight:'400'
    },
    view9:{
        flexDirection:'row',alignItems:'center',
        width:"90%",
        justifyContent:'space-between'


    },
    button:{
        height:49,width:177,backgroundColor:'#008080',borderRadius:120,alignItems:'center',justifyContent:'center',marginTop:20,alignSelf:'center',marginStart:60
    },
    buttontxt:{
        color:'white',fontSize:16,  fontFamily:"Axiforma-SemiBold"
    },
    modalview:{
        backgroundColor:'white',
        width:'100%',
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

    modalimg:{
       height:92,
       width:99
    },
    modaltxt:{
        fontSize:24,
        fontWeight:'700',
        textAlign:'center',lineHeight:25,
        color:'black'
    },
    modaltxt1:{
        fontSize:17,
        fontWeight:'400',
        textAlign:'center',
        color:'#737373',marginTop:5,
        lineHeight:25
    },
    modalview4:{
        flexDirection:'row',
        paddingTop:15,
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
        height:58,width:177,backgroundColor:'#008080',borderRadius:120,alignItems:'center',justifyContent:'center',marginTop:20
    },
    view10:{
        alignItems:'center',
        width:"100%",
        paddingBottom:19
    },
    ViewStyle:{backgroundColor:'#008080',
    paddingStart:17,
    flexDirection:'row',
    alignItems:'center',
    paddingTop:52,
    paddingBottom:21,
    
    },
    
    IconStyle:{
        height:27,
        width:27
    },

    headerText:{fontSize:24,
        fontFamily:'Axiforma-Bold',
        color:'#F9FBDB',
        marginStart:130
        },


})

