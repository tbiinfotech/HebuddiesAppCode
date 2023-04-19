import React,{useState} from "react";
import {View,Text,TouchableOpacity,TextInput,Image,ImageBackground,ScrollView,StyleSheet,FlatList}from 'react-native'
import Checkbox from 'expo-checkbox';


const SelectTimeSlot=({navigation})=>{

    const Data1 = [
        {
            id: 1,
           month:"Aug",
           date:"25",
           day:"Thursday"
        },
        {
            id: 2,
           month:"Aug",
           date:"26",
           day:"Friday"
        },
        {
            id: 3,
           month:"Aug",
           date:"27",
           day:"Saturday"
        },
        {
            id: 4,
           month:"Aug",
           date:"28",
           day:"Sunday"
        },
        {
            id: 5,
           month:"Aug",
           date:"29",
           day:"Monday"
        },
        {
            id: 5,
           month:"Aug",
           date:"30",
           day:"Tuesday"
        },
        {
            id: 5,
           month:"Aug",
           date:"31",
           day:"Wednesday"
        },
        {
            id: 5,
           month:"Sep",
           date:"01",
           day:"Thursday"
        },
        {
            id: 5,
           month:"Sep",
           date:"02",
           day:"Friday"
        },
        {
            id: 5,
           month:"Sep",
           date:"03",
           day:"Saturday"
        },
        {
            id: 5,
           month:"Sep",
           date:"04",
           day:"Sunday"
        },
        {
            id: 5,
           month:"Sep",
           date:"05",
           day:"Monday"
        },
        {
            id: 5,
           month:"Sep",
           date:"06",
           day:"Tuesday"
        },
        {
            id: 5,
           month:"Sep",
           date:"07",
           day:"Wednesday"
        },
        {
            id: 5,
           month:"Sep",
           date:"08",
           day:"Thursday"
        },

    ]

    const [toggleCheckBox, setToggleCheckBox] = useState(false)
    const [check, setCheck] = useState(false)
    const [check2, setCheck2] = useState(false)
    const [check3, setCheck3] = useState(false)
    const [check4, setCheck4] = useState(false)
    const [check5, setCheck5] = useState(false)
    const [check6, setCheck6] = useState(false)
    const [check7, setCheck7] = useState(false)
    const [tick, setTick] = useState(false)
    return(

<ImageBackground source={require('../../../Images/background.png')} style={styles.Container}  >

<View style={styles.ViewStyle}   >
        <TouchableOpacity onPress={()=>navigation.goBack()} >
        <Image source={require('../../../Images/Arrow-Left.png')} style={styles.IconStyle}   />
        </TouchableOpacity>
<Text style={styles.headerText} >Select time slot</Text>

    </View>
<ScrollView>

<View style={{flexDirection:'row',marginTop:32}} >
    <View style={{flex:0.4,justifyContent:'center',alignItems:'center'}} >
    <Text style={styles.textStyle} >Timeslot</Text>
    </View>
    <View style={{flexDirection:'row',flex:0.6,justifyContent:'space-between',marginHorizontal:25,marginEnd:0}} >
    <FlatList style={{}}

data={Data1}
horizontal={true}
showsHorizontalScrollIndicator={false}
renderItem={({ item }) => {

    return (
        <View style={{alignItems:"center",marginRight:42}}>
           <Text style={styles.textStyle} >{item.month}</Text>
           <Text style={styles.textDesign} >{item.date}</Text>
           <Text style={styles.textStyle} >{item.day}</Text>
            </View>
    )
}
}/>

    </View>
</View>

<View style={{backgroundColor:'#E4E4E4',height:1,marginTop:11}} />

<View style={{flexDirection:'row',alignItems:'center',marginTop:20}} >
    <View style={{flex:0.4,justifyContent:'center',alignItems:'center'}} >
        <Text style={styles.textStyle}>8-9</Text>
    </View>

    <View style={{flexDirection:'row',flex:0.6,justifyContent:'space-between',paddingHorizontal:20}} >
       <TouchableOpacity>
        <Image source={require('../../../Images/Tick.png')} style={{height:40,width:67}} />
        </TouchableOpacity>
        
        <TouchableOpacity>
        <Image source={require('../../../Images/UnTick.png')} style={{height:40,width:67}} />
        </TouchableOpacity>
    </View>
</View>


<View style={{backgroundColor:'#E4E4E4',height:1,marginTop:11}} />

<View style={{flexDirection:'row',alignItems:'center',marginTop:20}} >
    <View style={{flex:0.4,justifyContent:'center',alignItems:'center'}} >
        <Text style={styles.textStyle}>9-10</Text>
    </View>

    <View style={{flexDirection:'row',flex:0.6,justifyContent:'space-between',paddingHorizontal:20}} >
        <TouchableOpacity>
        <Image source={require('../../../Images/Tick.png')} style={{height:40,width:67}} />
        </TouchableOpacity>
        <TouchableOpacity>
        <Image source={require('../../../Images/UnTick.png')} style={{height:40,width:67}} />
        </TouchableOpacity>
    </View>
</View>

<View style={{backgroundColor:'#E4E4E4',height:1,marginTop:11}} />

<View style={{flexDirection:'row',alignItems:'center',marginTop:20}} >
    <View style={{flex:0.4,justifyContent:'center',alignItems:'center'}} >
        <Text style={styles.textStyle}>10-11</Text>
    </View>

    <View style={{flexDirection:'row',flex:0.6,justifyContent:'space-between',paddingHorizontal:20}} >
        <TouchableOpacity>
        <Image source={require('../../../Images/Tick.png')} style={{height:40,width:67}} />
        </TouchableOpacity>
        <TouchableOpacity>
        <Image source={require('../../../Images/UnTick.png')} style={{height:40,width:67}} />
        </TouchableOpacity>
    </View>
</View>

<View style={{backgroundColor:'#E4E4E4',height:1,marginTop:11}} />

<View style={{flexDirection:'row',alignItems:'center',marginTop:20}} >
    <View style={{flex:0.4,justifyContent:'center',alignItems:'center'}} >
        <Text style={styles.textStyle}>11-12</Text>
    </View>

    <View style={{flexDirection:'row',flex:0.6,justifyContent:'space-between',paddingHorizontal:20}} >
        <TouchableOpacity>
        <Image source={require('../../../Images/Tick.png')} style={{height:40,width:67}} />
        </TouchableOpacity>
        <TouchableOpacity>
        <Image source={require('../../../Images/UnTick.png')} style={{height:40,width:67}} />
        </TouchableOpacity>
    </View>
</View>


<View style={{backgroundColor:'#E4E4E4',height:1,marginTop:11}} />

<View style={{flexDirection:'row',alignItems:'center',marginTop:20}} >
    <View style={{flex:0.4,justifyContent:'center',alignItems:'center'}} >
        <Text style={styles.textStyle}>12-13</Text>
    </View>

    <View style={{flexDirection:'row',flex:0.6,justifyContent:'space-between',paddingHorizontal:20}} >
        <TouchableOpacity>
        <Image source={require('../../../Images/UnTick.png')} style={{height:40,width:67}} />
        </TouchableOpacity>
        <TouchableOpacity>
        <Image source={require('../../../Images/Tick.png')} style={{height:40,width:67}} />
        </TouchableOpacity>
    </View>
</View>

<View style={{backgroundColor:'#E4E4E4',height:1,marginTop:11}} />

<View style={{flexDirection:'row',alignItems:'center',marginTop:20}} >
    <View style={{flex:0.4,justifyContent:'center',alignItems:'center'}} >
        <Text style={styles.textStyle}>13-14</Text>
    </View>

    <View style={{flexDirection:'row',flex:0.6,justifyContent:'space-between',paddingHorizontal:20}} >
        <TouchableOpacity>
        <Image source={require('../../../Images/UnTick.png')} style={{height:40,width:67}} />
        </TouchableOpacity>
        <TouchableOpacity>
        <Image source={require('../../../Images/Tick.png')} style={{height:40,width:67}} />
        </TouchableOpacity>
    </View>
</View>


<TouchableOpacity style={styles.ButtonStyle}   >

    <Text style={styles.ButtonText} >Create activity</Text>
</TouchableOpacity>


</ScrollView>
        </ImageBackground>
    )
}
export default SelectTimeSlot


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
  
    },
    
    IconStyle:{
        height:27,
        width:27,
        tintColor:'#F9FBDB'

    },
    
    headerText:{fontSize:24,
        fontFamily:'Axiforma-Bold',
        color:'#F9FBDB',
        marginStart:68},

        textStyle:{
            fontFamily:'Axiforma-Medium',
            fontSize:16,
            color:'#737373'
        },

        textStyle:{
            color:'#737373',
            fontSize:16,
            fontFamily:'Axiforma-Medium'
        },

          textDesign:{
            color:'grey',
            fontFamily:'Axiforma-Bold',
            fontSize:28,
            marginTop:5

        },
        ButtonStyle:{backgroundColor:'#008080',
        paddingVertical:14,
       paddingHorizontal:23,
        borderRadius:50,
        justifyContent:'center',
        alignItems:'center',
        marginTop:20,
        alignSelf:'flex-end',
        marginEnd:20,marginBottom:40},
    
        ButtonText:{color:'#fff',
        fontSize:18,
        fontFamily:'Axiforma-Bold'}

})
