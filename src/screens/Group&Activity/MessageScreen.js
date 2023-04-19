import React, { useEffect, useState, useRef } from 'react'
import { View, Text, SafeAreaView, Image, TouchableOpacity, Keyboard, ImageBackground, ScrollView, TextInput, FlatList, Dimensions, TouchableWithoutFeedback, Linking } from 'react-native'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
// import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import firestore, { firebase } from '@react-native-firebase/firestore';
// import KeyboardListener from 'react-native-keyboard-listener';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import { useTranslation, withTranslation, Trans } from 'react-i18next';
import '../translation/i18n'
import constants from "../constants/constants";
const BackArrow = require('../../../Images/Arrow-Left.png')
const send = require('../../../Images/Vector.png')
const bgimg = require('../../../Images/background.png')
const height = Dimensions.get('window').height;
const width = Dimensions.get('window').width;


const MessageScreen = ({ navigation, route }) => {
  const scrollViewRef = useRef();
  const [chatId, setChatId] = useState('')
  const [chatData, setChatData] = useState([])
  const [loading, setLoading] = useState(true)
  const [textMsg, setTextMsg] = useState('')
  const [data, setData] = useState([])
  const [userId, setUserId] = useState('')
  const [isActiveChat, setIsActiveChat] = useState(true)
  const [groupImage, setGroupImage] = useState('')
  const [groupName, setGroupName] = useState('')
  const [senderName, setSenderName] = useState('')
  const [isKeyboardOpen, setIsKeyboardOpen] = useState(false)
  const [members, setMembers] = useState('')
  const [chatbanner, setChatbanner] = useState([])
  const [chat, setchat] = useState({})
  const { t, i18n } = useTranslation();

  useEffect(() => {
    Chatbanner()
    fetchData()
    var documentId = route.params.Id;
    const subscriber = firestore()
      .collection('groups')
      .doc(documentId)
      .onSnapshot(querySnapshot => {
        const users = [];
        // console.log("Members>>>>>>>>>>", querySnapshot.data().users)

        setMembers(querySnapshot.data().users.length)
        setGroupName(querySnapshot.data().group_name)
        setGroupImage(querySnapshot.data().group_photo)
        if (querySnapshot.data() != undefined) {
          if (querySnapshot.data()?.messages) {
            querySnapshot.data()?.messages.forEach(documentSnapshot => {
              users.push({
                ...documentSnapshot,

              });
            });
            setChatData(users);
          }
          else {
            users.push(querySnapshot.data())
          }
          setData(querySnapshot.data())
          setLoading(false);
        }
        else {
        }
        setTimeout(() => {
          setLoading(false);
        }, 5000);

      });

    return () => subscriber();


  }, [])

  async function fetchData() {
    var userId = await AsyncStorage.getItem('user_id')
    setUserId(userId)

  }


  const Chatbanner = async () => {
    var token = await AsyncStorage.getItem("token");
    var TOKEN = JSON.parse(token);
    var axios = require("axios");
    var data = new FormData();
    var config = {
      method: "get",

      url: constants.BASE_URL + "api/banner/fetch",
      headers: {
        "Content-Type": "multipart/form-data",
        Authorization: "Bearer " + TOKEN,
      },
      data: data,
    };
    axios(config)
      .then(async (response) => {
        setChatbanner(response.data.data)
        
        console.log("ACCCCCfffTTTNNEEWW", response.data.data)


      })
      .catch(function (error) {
        // console.log(error);
      });
  }
  const removeBanner = (data, index) => {
    var arr = [...chatbanner]
    arr.splice(index, 1)
    setChatbanner(arr)
  }

  const renderItem = ({ item }) => {
    us_name = item.name.replace(/['"]+/g, '');
    return (
      <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
        <View>
          {
            item.userId == userId
              ?
              <View style={{ paddingLeft: '2%', paddingTop: 5, alignItems: 'flex-end' }}>
                <View style={{ flexDirection: 'row', alignItems: 'center' }}>

                  <View style={{ backgroundColor: '#B0F4E9', maxWidth: width * 0.7, borderRadius: 15, alignItems: 'center', justifyContent: 'center', paddingHorizontal: 20, paddingVertical: 10 }}>
                    <Text style={{ fontSize: 12, color: 'black' }}>
                      {item.dataText}
                    </Text>
                    <Text style={{ fontSize: 10, color: '#8D8D8D', textAlign: "right", alignSelf: 'flex-end', paddingTop: 2 }}>{item.time}</Text>
                  </View>

                </View>
              </View>
              :
              <View style={{ paddingLeft: '2%', paddingTop: 5 }}>
                <Text style={{ paddingVertical: 5, color: 'grey', paddingLeft: 10, fontSize: 16, fontFamily: "Axiforma-Regular", }}>{us_name}</Text>
                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                  <View style={{ backgroundColor: '#FFFFFF', maxWidth: width * 0.7, borderRadius: 15, alignItems: 'center', justifyContent: 'center', paddingHorizontal: 20, paddingVertical: 10, marginLeft: '2%' }}>
                    <Text style={{ fontSize: 12, color: 'grey' }}>
                      {item.dataText}
                    </Text>
                    <Text style={{ fontSize: 10, color: '#8D8D8D', textAlign: "right", alignSelf: 'flex-end', paddingTop: 2 }}>{item.time}</Text>

                  </View>

                </View>
              </View>
          }

        </View>
      </TouchableWithoutFeedback>
    );
  };



  const renderItem1 = ({ item, index }) => {

    return (
      
      <TouchableOpacity style={{ flexDirection: 'column', alignItems: 'center', alignSelf: 'center', }} onPress={() => {
        Linking.openURL(item.url);

      }}>
        <TouchableOpacity style={{ flexDirection: 'row', alignItems: 'center', alignSelf: 'center' }} onPress={() => {
          Linking.openURL(item.url);

        }}>

          <Image source={{ uri: item.image }} style={{ height: 40, width: '95%', marginHorizontal: 0, marginTop: 3, borderWidth: 1, borderColor: '#F9FBDB', }}
          />


          <TouchableOpacity
            onPress={() => removeBanner(item, index)}
            style={{

              alignItems: "flex-end",
              marginRight: -10,
            }}
          >
            <Image
              source={require("../../asset/cross.png")}
              style={{ resizeMode: "contain", height: 30, width: 30, marginLeft: -10, alignSelf: 'center', marginBottom: 22, tintColor: 'grey' }}
            />
          </TouchableOpacity>

        </TouchableOpacity>
        <View style={{ width: '100%' }}>

          <Text style={{ fontSize: 16, color: "grey", marginTop: 0, marginTop: 0, marginLeft: 0, textAlign: 'center', alignItems: 'center', alignSelf: "center" }}>{item.description}</Text>
        </View>
      </TouchableOpacity>
    );
  };
  const onSendMessage = async () => {
    var date = new Date()
    var hours = date.getHours()
    var min = date.getMinutes();
    if (min < 10) {
      var min1 = '0' + min
    } else {
      var min1 = min
    }
    if (hours > 24) {
      var hours1 = hours - 12
      var time = hours1 + ":" + min1 + " AM"
    }
    else {
      var time = hours + ":" + min1 + " PM"
    }

    var userId = await AsyncStorage.getItem('user_id')
    var name = await AsyncStorage.getItem('Name')
    if (data?.messages) {
      data.messages.unshift({ 'dataText': textMsg, 'userId': userId, 'time': time, 'name': name })
    } else {
      var Obj = [{ 'dataText': textMsg, 'userId': userId, 'time': time, 'name': name }]
      data.messages = Obj
    }


    firestore()
      .collection('groups')
      .doc(route.params.Id)
      .set(data)
      .then(() => {
      })
      .catch(error => {
      })
    setTextMsg('')
  }

var CHAT_HEIGHT=height*0.79;
// var BANNER_HEIGHT=
if(chatbanner.length>0){
   if(chatbanner.length==1){
    CHAT_HEIGHT=height*0.70
   
  }
  else if(chatbanner.length==2){
    CHAT_HEIGHT=height*0.60
  }
  else{
    CHAT_HEIGHT=height*0.55;
  }
  
}
  return (

    <ImageBackground style={{ flex: 1, marginBottom: 0 }} source={bgimg}>

      <View style={{ height: "13%", backgroundColor: "#008080" }}>
        <View style={{ paddingLeft: 10, flexDirection: "row", alignItems: "center", paddingTop: 20 }}>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <Image source={BackArrow} style={{ height: 30, width: 30, resizeMode: "contain", tintColor: '#F9FBDB' }} />
          </TouchableOpacity>



          {groupImage ? (
            <Image source={{ uri: groupImage }} style={{ height: 30, width: 30, borderRadius: 25, marginHorizontal: 10, borderWidth: 1, borderColor: '#F9FBDB', marginTop: 10 }} />
          ) : (
            <Image source={require("../../../src/asset/dummyimage.png")} style={{ height: 50, width: 50, borderRadius: 25, marginHorizontal: 10, borderWidth: 1, borderColor: '#F9FBDB', marginTop: 10 }} />
          )}
          <View style={{ flexDirection: "column" }}>
            <Text style={{ fontSize: 16, color: "#F9FBDB", marginTop: 8, width: '100%', marginTop: 10 }}>{groupName}</Text>
            <Text style={{ fontSize: 16, color: "#F9FBDB", marginTop: 2 }}>{members + " " + "Members"}</Text>
          </View>

        </View>
      </View>
      {chatbanner.length>0&&
      
      <View style={{minHeight:50,maxHeight:170 }}>
        <FlatList
          data={chatbanner}
          renderItem={renderItem1}
          contentContainerStyle={{}}

        />
      </View>
      
      }

      <KeyboardAwareScrollView extraScrollHeight={50} keyboardShouldPersistTaps={'handled'}

        style={{}}>
        <View>

        </View>
        <View style={{}}>

          <View style={{ height: CHAT_HEIGHT , justifyContent: 'flex-end' }}>

            <ScrollView style={{ marginRight: 5, marginBottom: 25 }}
              ref={scrollViewRef}
              contentContainerStyle={{ flexGrow: 1 }}
              onContentSizeChange={(contentWidth, contentHeight) => {
                scrollViewRef.current.scrollToEnd({ animated: false });
              }}
            >
              {
                chatData.length == 0
                  ?
                  <View style={{ flex: 0.92, }} />
                  :

                  <FlatList
                    data={chatData}
                    renderItem={renderItem}
                    showsVerticalScrollIndicator={false}
                    style={{ flex: 0.8 }}
                    contentContainerStyle={{}}
                    inverted={true}
                  />
              }

            </ScrollView>
          </View>
        </View>

        <View style={{ flexDirection: 'row', alignItems: 'flex-end', justifyContent: 'space-between', paddingHorizontal: 20, marginBottom: 5, marginVertical: 20, marginTop: -20, flex: 0.08 }}>
          <View style={{ backgroundColor: "#FFFFFF", minHeight: 55, maxHeight: 70, width: width * 0.75, borderRadius: 7, justifyContent: "center", marginBottom: 5, }}>
            <TextInput
              placeholderTextColor="grey"
              style={{ paddingLeft: 10, paddingBottom: 0, backgroundColor: "#FFFFFF", marginBottom: 5 }}
              placeholder={t('Write a new message')}
              value={textMsg}
              // multiline={true}
              onChangeText={(value) => setTextMsg(value)}
            />
          </View>
          {
            textMsg.replace(/\s/g, '').length == 0
              ?
              <Image resizeMode="cover" style={{ height: 30, width: 30, resizeMode: "contain", marginBottom: 18 }} source={send} />
              :
              <TouchableOpacity onPress={() => onSendMessage()}>
                <Image resizeMode="cover" style={{ height: 30, width: 30, resizeMode: "contain", marginBottom: 18 }} source={send} />
              </TouchableOpacity>
          }




        </View>



      </KeyboardAwareScrollView>
    </ImageBackground>


  )
}
const full_app = withTranslation()(MessageScreen)
export default full_app;

















