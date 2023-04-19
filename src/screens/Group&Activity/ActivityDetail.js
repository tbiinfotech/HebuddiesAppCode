import React from "react";
import { View,Text,TouchableOpacity,Image,ImageBackground ,StyleSheet, ScrollView } from "react-native";


const ActivityDetail=({navigation})=>{
    return(
 
        <ImageBackground source={require('../../../Images/background.png')} style={styles.Container}  >
<View style={styles.ViewStyle}   >
        <TouchableOpacity onPress={()=>navigation.goBack()} >
        <Image source={require('../../../Images/Arrow-Left.png')} style={styles.IconStyle}   />
        </TouchableOpacity>
<Text style={{fontSize:24,fontFamily:'Axiforma-Bold',color:'#F9FBDB'}} >Activity Details</Text>
<TouchableOpacity>
<Image  style={styles.IconDesign} />
</TouchableOpacity>

    </View>
<ScrollView>
    <Text style={{color:'grey',fontSize:24,fontFamily:'Axiforma-Bold',marginTop:26,marginStart:20}}  >Go to sam's cafe</Text>
    <View style={styles.ViewDesing} >
        <Image source={require('../../../Images/Profile.png')} style={styles.ProfileImage} />
        <Text style={styles.textStyle} >Created by : Ahmed ndiaye</Text>

        
    </View>
    <Text style={{fontFamily:'Axiforma-Medium',color:'grey',fontSize:18,marginStart:20,marginTop:23}} >July, 14 - Wednesday</Text>

    <View  style={styles.ViewEdit} >
        <View style={{alignItems:'center'}} >
        <Text style={styles.NumberText} >8-9</Text>

        <TouchableOpacity style={{marginTop:10}} >
            <Image source={require('../../../Images/Tick.png')}  style={{height:40,width:67}} />
            </TouchableOpacity>

            <View style={{flexDirection:'row',alignItems:'center',marginTop:11}} >
                <Image source={require('../../../Images/fa6-solid_user-group.png')} style={{height:16,width:19}}  />
                <Text style={{fontSize:16,fontFamily:'Axiforma-Medium',color:'#737373',marginStart:7}} >2</Text>
            </View>
        </View>

        <View style={{alignItems:'center'}} >
        <Text style={styles.NumberText} >11-12</Text>
        <TouchableOpacity style={{marginTop:10}} >
            <Image source={require('../../../Images/UnTick.png')} style={{height:40,width:67}}   />
            </TouchableOpacity>

            <View style={{flexDirection:'row',alignItems:'center',marginTop:11}} >
                <Image source={require('../../../Images/fa6-solid_user-group.png')} style={{height:16,width:19}}  />
                <Text style={{fontSize:16,fontFamily:'Axiforma-Medium',color:'#737373',marginStart:7}} >0</Text>
            </View>
        </View>

        <View style={{alignItems:'center'}} >
        <Text style={styles.NumberText} >12-13</Text>
        <TouchableOpacity style={{marginTop:10}} >
            <Image source={require('../../../Images/UnTick.png')} style={{height:40,width:67}}   />
            </TouchableOpacity>

            <View style={{flexDirection:'row',alignItems:'center',marginTop:11}} >
                <Image source={require('../../../Images/fa6-solid_user-group.png')} style={{height:16,width:19}}  />
                <Text style={{fontSize:16,fontFamily:'Axiforma-Medium',color:'#737373',marginStart:7}} >1</Text>
            </View>
        </View>

        <View style={{alignItems:'center'}} >
        <Text style={styles.NumberText} >13-14</Text>
        <TouchableOpacity style={{marginTop:10}}  >
            <Image source={require('../../../Images/UnTick.png')} style={{height:40,width:67}}   />
            </TouchableOpacity>

            <View style={{flexDirection:'row',alignItems:'center',marginTop:11}} >
                <Image source={require('../../../Images/fa6-solid_user-group.png')} style={{height:16,width:19}}  />
                <Text style={{fontSize:16,fontFamily:'Axiforma-Medium',color:'#737373',marginStart:7}} >0</Text>
            </View>
        </View>
    </View>


<View style={{backgroundColor:'#E4E4E4',height:1,width:'90%',alignSelf:'center',marginTop:27}} />


    <Text style={{fontFamily:'Axiforma-Medium',color:'grey',fontSize:18,marginStart:20,marginTop:26}} >July, 15 - Thursday</Text>

<View style={styles.ViewEdit} >
    <View style={{alignItems:'center'}} >
    <Text style={styles.NumberText}>8-9</Text>

    <TouchableOpacity style={{marginTop:10}} >
        <Image source={require('../../../Images/Tick.png')}  style={{height:40,width:67}} />
        </TouchableOpacity>

        <View style={{flexDirection:'row',alignItems:'center',marginTop:11}} >
            <Image source={require('../../../Images/fa6-solid_user-group.png')} style={{height:16,width:19}}  />
            <Text style={{fontSize:16,fontFamily:'Axiforma-Medium',color:'#737373',marginStart:7}} >2</Text>
        </View>
    </View>

    <View style={{alignItems:'center'}} >
    <Text style={styles.NumberText} >11-12</Text>
    <TouchableOpacity style={{marginTop:10}} >
        <Image source={require('../../../Images/UnTick.png')} style={{height:40,width:67}}   />
        </TouchableOpacity>

        <View style={{flexDirection:'row',alignItems:'center',marginTop:11}} >
            <Image source={require('../../../Images/fa6-solid_user-group.png')} style={{height:16,width:19}}  />
            <Text style={{fontSize:16,fontFamily:'Axiforma-Medium',color:'#737373',marginStart:7}} >0</Text>
        </View>
    </View>

    <View style={{alignItems:'center'}} >
    <Text style={styles.NumberText} >12-13</Text>
    <TouchableOpacity style={{marginTop:10}} >
        <Image source={require('../../../Images/UnTick.png')} style={{height:40,width:67}}   />
        </TouchableOpacity>

        <View style={{flexDirection:'row',alignItems:'center',marginTop:11}} >
            <Image source={require('../../../Images/fa6-solid_user-group.png')} style={{height:16,width:19}}  />
            <Text style={{fontSize:16,fontFamily:'Axiforma-Medium',color:'#737373',marginStart:7}} >1</Text>
        </View>
    </View>

    <View style={{alignItems:'center'}} >
    <Text style={styles.NumberText}>13-14</Text>
    <TouchableOpacity style={{marginTop:10}}  >
        <Image source={require('../../../Images/UnTick.png')} style={{height:40,width:67}}   />
        </TouchableOpacity>

        <View style={{flexDirection:'row',alignItems:'center',marginTop:11}} >
            <Image source={require('../../../Images/fa6-solid_user-group.png')} style={{height:16,width:19}}  />
            <Text style={{fontSize:16,fontFamily:'Axiforma-Medium',color:'#737373',marginStart:7}} >0</Text>
        </View>
    </View>
</View>


<View style={{backgroundColor:'#E4E4E4',height:1,width:'90%',alignSelf:'center',marginTop:27}} />

<TouchableOpacity style={styles.ButtonStyle} onPress={()=>navigation.navigate('ActivityDetail1')}  >
    <Text style={styles.ButtonText} >Join</Text>
</TouchableOpacity>
</ScrollView>
    
        </ImageBackground>
    )
}
export default ActivityDetail


const styles = StyleSheet.create({

    Container:{
        flex:1,

    },

    IconStyle: {
        height: 27,
        width: 27,
        tintColor:'#F9FBDB'

    },

    IconDesign: {
        height: 18.4,
        width: 4.4
    },

    ViewStyle: {
        backgroundColor: '#008080',
        justifyContent: 'space-between',
        flexDirection: 'row',
        alignItems: 'center',
        paddingTop: 52,
        paddingBottom: 21,
        paddingHorizontal: 17
    },

    ProfileImage:{
        height:15.83,
        width:12.67
    },

    textStyle:{
        fontFamily:'Axiforma-Regular',
        fontSize:16,
        color:'#737373',
        marginStart:10.17
    },

    ViewDesing:{
        flexDirection:'row',
        marginStart:22.17,
        alignItems:'center',
        marginTop:2.14
    },

    NumberText:{color:'#737373',
    fontSize:16,
    fontFamily:'Axiforma-Regular'},

    ViewEdit:{flexDirection:'row',
    justifyContent:'space-evenly',
    marginTop:12},

    ButtonStyle:{backgroundColor:'#008080',
    paddingVertical:16,
    width:119,
    borderRadius:50,
    justifyContent:'center',
    alignItems:'center',
    marginTop:30,
    alignSelf:'flex-end',
    marginBottom:10,
    marginEnd:20},


    ButtonText:{color:'#fff',
    fontSize:18,
    fontFamily:'Axiforma-Bold'}
})
