import React, { useState,useEffect} from 'react'
import {
    StyleSheet,
    Text, View,
    ImageBackground,
    ScrollView,
    Image,
    TouchableOpacity,
    FlatList,
    Linking
} from 'react-native'
import { useIsFocused } from "@react-navigation/native";
import DatePicker from 'react-native-date-picker';
import { useTranslation, withTranslation, Trans } from "react-i18next";
import "../translation/i18n";
import axios from 'axios';
import constants from '../constants/constants';
import AsyncStorage from '@react-native-async-storage/async-storage';

const ActivityDetail1 = ({ navigation,route }) => {

    const isFocused = useIsFocused();
    const [visible, setvisible] = useState(true)
    const [visible1, setvisible1] = useState(false)
    const [visible2, setvisible2] = useState(true)
    const [visible3, setvisible3] = useState(false)
    const [date, setDate] = useState(new Date())
    const [open, setOpen] = useState(false);
    const [time, settime] = useState(new Date())
    const [open1, setOpen1] = useState(false);
    const [grpid, setgrpid] = useState("");
    const[discount,setDiscount]=useState("")
const[activityname,setActivityname]=useState("")
const[zipcode,setzipcode]=useState("")
const[address,setAddress]=useState("")
const[description,setDescription]=useState("")
const[accepted,setAccepted]=useState()
const[declined,setDeclined]=useState()
const[accepted_user,setAccepted_user]=useState([])
const[declined_user,setDeclined_user]=useState([])
const[datee,setDatee]=useState("")
const { t, i18n } = useTranslation();
const [suggestionList, setSuggestionList] = useState([]);
const[activity_des,setActivity_des]=useState("")
const[activity_website,setActivity_website]=useState("")

const[activity_theme,setActivity_theme]=useState("")
const [selectedDate, setSelectedDate] = useState(new Date());
    useEffect(() => {
        var IDD = route.params.activity_id;
        setgrpid(IDD);
        var name=route.params.activity_name
        setActivityname(name)
       var date=route.params.activity_date
        setDatee(date)
        var zip_code=route.params.activity_zipcode
        setzipcode(zip_code)
        var descriptions=route.params.activity_des
        setActivity_des(descriptions)
        var links=route.params.activity_website
        setActivity_website(links)
       var themes=route.params.actyvity_themes
       setActivity_theme(themes)
       var dis_count=route.params.activity_discount;
       setDiscount(dis_count)
        getSuggestions();
        getActivity()
        onDayChange()
      }, [isFocused]);
      const onDayChange = async (date) => {
        var DATE = new Date(date);
        setSelectedDate(DATE);
    
        getActivity(DATE.toLocaleDateString());
      };
      const getActivity = async () => {
        var token = await AsyncStorage.getItem("token");
        var axios = require("axios");
        var data = new FormData();
        data.append("activity_id",route.params.activity_id);
     
    
        var config = {
          method: "post",
          url: constants.BASE_URL + "api/activity/list/detail",
          headers: {
            Authorization: "Bearer " + JSON.parse(token),
          },
          data: data,
        };
    
        axios(config)
      
          .then(async (response)=>{
       

         
            if(response.data.status==true){
                setAccepted(response.data.data.accepted)
              
                setAccepted_user(response.data.data.accepted_users)
                
                setDeclined(response.data.data.declined)
                setDeclined_user(response.data.data.declined_users)
            }
          })
          .catch(function (error) {
           
           
          });
      };
     const getSuggestions = async () => {
       var axios = require("axios");
       var FormData = require("form-data");
       var data = new FormData();
   
       var token = await AsyncStorage.getItem("token");
        data.append("group_id", GROUP_ID);
       var config = {
         method: "post",
         url: constants.BASE_URL + "api/activity/suggestion",
         headers: {
           Authorization: "Bearer " + JSON.parse(token),
         },
         data: data,
       };
   
       axios(config)
         .then(function (response) {
           setSuggestionList(response.data.data);
           setAccepted(response.data.accepted_users)
           setUserName(response.data.name);
           setUserID(response.data.user_id);

         })
         .catch(function (error) {
      
         });
     };

    return (

        <View style={groupdetailstyle.Main}>
            <ImageBackground style={groupdetailstyle.ImageBackground} source={require("../../../src/asset/Splash.png")}>
                <View style={groupdetailstyle.View1}>
                    <View style={groupdetailstyle.view2}>
                        <TouchableOpacity onPress={() => navigation.goBack()}>
                            <Image style={groupdetailstyle.img3} resizeMode="contain" source={require("../../../src/asset/Arrow-Left.png")} />
                        </TouchableOpacity>
                        <Text style={groupdetailstyle.text1}>{t("Activity Details")}</Text>
                        <TouchableOpacity >
                            <Image style={groupdetailstyle.img3} resizeMode="contain" />
                        </TouchableOpacity>
                    </View>
                    <View style={{ padding: 5,

        // marginTop: 10,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        }}>
                        <Text style={groupdetailstyle.text2}>{activityname}</Text>
                    </View>
                    <View style={{ marginTop: '5%', paddingLeft: 20, flex: 1, }}>
                        <View style={{ flexDirection: 'row', }}>
                      
                        </View>
                        <ScrollView>
                              <View style={{ flexDirection: 'row', marginTop: '5%' }}>
                            <View style={{ flexDirection: 'row' }}>
                                <Image  source={require("../../asset/chill.png")} style={groupdetailstyle.IconStyle} />
                                <Text style={{ alignSelf: 'center', fontSize: 16, color: 'grey',marginLeft:10 }}>{activity_theme}</Text>
                            </View>
                        
                        </View>
                        <View style={{ flexDirection: 'row', marginTop: '5%' }}>
                            <View style={{ flexDirection: 'row' }}>
                                <Image source={require('../../../src/asset/Location.png')} style={groupdetailstyle.IconStyle} />
                                <Text style={{ alignSelf: 'center', fontSize: 16, color: 'grey' }}>{zipcode}</Text>
                            </View>
                        
                        </View>
                
                       
                        <View style={{ flexDirection: 'row', marginTop: '5%' }}>
                            <View style={{ flexDirection: 'row' }}>
                            <Image
              source={require("../../../Images/msg.png")}
              style={groupdetailstyle.IconStyle}
            />
                              
                                <Text style={{ alignSelf: 'center', fontSize: 16, color: 'grey',marginRight:10 }}>{activity_des}</Text>
                            </View>
                        
                        </View>
                        <View style={{ flexDirection: 'row', marginTop: '5%' }}>
                            <View style={{ flexDirection: 'row' }}>
                               <Image
            source={require("../../asset/link.png")}
              style={{  height: 20,
                width: 20,
                borderRadius: 20 / 2,tintColor:"#008080"}}
            />
                                <TouchableOpacity  onPress={() => {
          Linking.openURL(activity_website)}}>
                                <Text style={{ alignSelf: 'center', fontSize: 16, color: '#008080',marginLeft:20 }}>{t("link")}</Text>
                                </TouchableOpacity>
                            </View>
                            </View>
                        </ScrollView>
                    </View>
                    <Text style={{ fontSize: 20, fontWeight: '600', marginTop: '0%', paddingLeft: 20, color: 'grey' }}>
                        {t("Votes")}
</Text>
                    <View style={{ flexDirection: 'row', alignItems: 'center', width: '100%', justifyContent: 'space-between', padding: 20, backgroundColor: 'white', marginTop: 25 }}>
                        <TouchableOpacity style={{ width: 170 }} onPress={() => { setvisible(true), setvisible1(false), setvisible2(true), setvisible3(false) }}>
                            {
                                visible2 == true ?
                                    <View style={{ alignItems: 'center' }}>
                                        <Text style={{ fontSize: 26, fontWeight: '700', color: "#008080" }}>{accepted}</Text>
                                        <Text style={{ fontSize: 18, fontWeight: '700', color: "#008080" }}>{t("Accepted")}</Text>
                                    </View>
                                    :
                                    <View style={{ alignItems: 'center' }}>
                                        <Text style={{ fontSize: 26, fontWeight: '700', color: "#737373" }}>{accepted}</Text>
                                        <Text style={{ fontSize: 18, fontWeight: '700', color: "#737373" }}>{t("Accepted")}</Text>
                                    </View>
                            }
                        </TouchableOpacity>
                        <TouchableOpacity style={{ width: 170 }} onPress={() => { setvisible1(true), setvisible(false), setvisible2(false), setvisible3(true) }}>
                            {
                                visible3 == true ?
                                    <View style={{ alignItems: 'center' }}>
                                        <Text style={{ fontSize: 26, fontWeight: '700', color: "#008080" }}>{declined}</Text>
                                        <Text style={{ fontSize: 18, fontWeight: '700', color: "#008080" }}>{t("Declined")}</Text>

                                    </View>
                                    :
                                    <View style={{ alignItems: 'center' }}>
                                        <Text style={{ fontSize: 26, fontWeight: '700', color: "#737373" }}>{declined}</Text>
                                        <Text style={{ fontSize: 18, fontWeight: '700', color: "#737373" }}>{t("Declined")}</Text>

                                    </View>
                            }

                        </TouchableOpacity>


                    </View>
                    {
                        visible2 == true &&

                        <View style={{ width: 190, borderWidth: 2, borderColor: '#008080' }}>

                        </View>
                    }
                    {
                        visible3 == true &&

                        <View style={{ width: 190, borderWidth: 2, borderColor: '#008080', alignSelf: 'flex-end' }}>

                        </View>
                    }
                    {
                        visible == true &&

                        <View style={{ flex: 1, }}>
                            <FlatList

                                data={accepted_user}
                                renderItem={({ item }) => {

                                    return (
                                        <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: 30, paddingHorizontal: 15, width: '90%' }}>
                                            <Image style={{ width: 34, height: 34 ,borderRadius:100}} source={{uri:item.image}} />
                                            <Text style={{ fontSize: 16, fontWeight: '400', marginLeft: 15, color: 'gray' }}>{item.name}</Text>
                                        </View>

                                    )
                                }}
                            />


                        </View>
                    }
                    {
                        visible1 == true &&

                        <View style={{ flex: 1,  }}>
                            <FlatList

                                data={declined_user}
                                renderItem={({ item }) => {

                                    return (
                                        <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: 25, paddingHorizontal: 15, width: '90%' }}>
                                            <Image style={{ width: 34, height: 34,borderRadius:100 }} source={{uri:item.image}} />
                                            <Text style={{ fontSize: 16, fontWeight: '400', marginLeft: 15 }}>{item.name}</Text>
                                        </View>


                                    )
                                }}
                            />

                        </View>
                    }
                </View>
            </ImageBackground>
        </View>


    )
}

export default ActivityDetail1
    ;
const groupdetailstyle = StyleSheet.create({
    Main: {
        flex: 1,
    },
    ImageBackground: {
        height: '100%',
        width: '100%',
    },
    View1: {
        flex: 1,


    },
    IconStyle: {
        height: 20,
        width: 20,
        borderRadius: 20 / 2
    },
    view2: {
        backgroundColor: '#008080',
        width: '100%',
        padding: 10,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingTop: 47
    },
    text1: {
        color: '#F9FBDB',
        fontSize: 24,
        fontWeight: '700'

    },
    view3: {
        padding: 20,
        // marginTop: 10,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
      
    },
    text2: {
        color: 'grey',
        fontSize: 24,
        fontWeight: '700'

    },
    img3: {
        width: 25,
        height: 25,
        tintColor: '#F9FBDB'

    },
    view4: {
        padding: 15,
        flex: 1


    },
    view5: {
        width: '100%',
        backgroundColor: 'white',
        borderRadius: 10,
        padding: 15,
        marginTop: 15


    },
    view6: {

        width: '100%',
        flexDirection: 'row'
    },
    img4: {
        height: 62.9,
        width: 68
    },
    text3: {
        fontSize: 18,
        fontWeight: '700',
        color: 'black'
    },
    view8: {
        flexDirection: 'row',
        alignItems: 'center',

    },
    img5: {
        height: 17,
        width: 15
    },
    text4: {
        color: '#737373',
        fontSize: 16,
        marginLeft: 5,
        fontWeight: '400'

    },
    text5: {
        fontSize: 16,
        fontWeight: '600',
        textAlign: 'right',
        color: '#008080'
    },
    view9: {

        width: "100%",



    },
    button: {
        height: 49,
        width: 177,
        backgroundColor: '#008080',
        borderRadius: 120,
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 20
    },
    buttontxt: {
        color: 'white',
        fontSize: 16,
        fontWeight: '600'
    },
    modalview: {
        backgroundColor: 'white',
        width: '100%',
        borderRadius: 16, padding: 20
    },
    modalview1: {
        width: '100%',
        alignItems: 'flex-end'
    },
    crossimg: {
        height: 25,
        width: 25
    },
    modalview2: {
        alignItems: 'center',
        width: '100%',

    },

    modalimg: {
        height: 92,
        width: 99
    },
    modaltxt: {
        fontSize: 24,
        fontWeight: '700',
        textAlign: 'center', lineHeight: 25,
        color: 'black'
    },
    modaltxt1: {
        fontSize: 17,
        fontWeight: '400',
        textAlign: 'center',
        color: '#737373', marginTop: 5,
        lineHeight: 25
    },
    modalview4: {
        flexDirection: 'row',
        paddingTop: 15,
    },
    modalview8: {
        flexDirection: 'row',
        alignItems: 'center',
        marginLeft: 15
    },
    modalview9: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingTop: 15
    },
    modalbutton: {
        height: 58, width: 177, backgroundColor: '#008080', borderRadius: 120, alignItems: 'center', justifyContent: 'center', marginTop: 20
    },
    view7: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        width: '75%',
        paddingHorizontal: 20
    },
    view10: {
        paddingTop: 15,
        flexDirection: 'row',
        paddingHorizontal: 20
    },
    view11: {
        alignItems: 'center',
        paddingHorizontal: 20,
        paddingTop: 25,
        flexDirection: 'row',
        alignItems: "center"
    },
    text7: {
        fontSize: 16,
        fontWeight: '400',

    },
    view12: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',

        paddingHorizontal: 80,
        paddingTop: 30
    },
    view13: {
        alignItems: "center",

    }, text8: {
        fontSize: 18,
        fontWeight: '700',
        color: 'black'
    },

    img7: {
        height: 58,
        width: 58
    }
})