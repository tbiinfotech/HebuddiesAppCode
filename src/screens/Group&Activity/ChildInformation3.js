import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  ImageBackground,
  TextInput,
  StyleSheet,
} from "react-native";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import Modal from "react-native-modal";
import ImagePicker from "react-native-image-crop-picker";
import axios from "axios";
import constants from "../constants/constants";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { ScrollView } from "react-native-gesture-handler";

const ChildInformation2 = ({ navigation,route }) => {
  const [isVisible, setisVisible] = useState(false);
  const [name, setName] = useState("");
  const [birthdate, setBirthdate] = useState("");
  const [image, setImage] = useState("");
  const [name1, setName1] = useState("");
  const [birthdate1, setBirthdate1] = useState("");
  const [image1, setImage1] = useState("");
  const [name2, setName2] = useState("");
  const [birthdate2, setBirthdate2] = useState("");
  const [image2, setImage2] = useState("");
  const [age1, setage1] = useState("");
  const [age2, setage2] = useState("");
  const [age, setAge] = useState("");
  const[id,setid]=useState("")
  const[Childid,setChildID]=useState("")
  const toggleModal2 = () => {
    setisVisible(!isVisible);
  };

  const [myImage, setMyImage] = useState("");
  const openGallery = () => {
    ImagePicker.openPicker({
      width: 300,
      height: 400,
      cropping: true,
    }).then((image) => {
      setMyImage(image.path);
      setisVisible(false);
      // console.log(image.path);
    });
  };
  const OpenCamera = () => {
    ImagePicker.openCamera({
      width: 300,
      height: 400,
      cropping: true,
    }).then((image) => {
      setMyImage(image.path);
      setisVisible(false);
      // console.log(image.path);
    });
  };
  // useEffect(() => {
  //   getchildinfo();
  // }, []);
  useEffect(()=>{
    var id1=route.params.child_id
setid(id1)

    var namee=route.params.child_name
    var dob=route.params.Child_birthdate
    var age=route.params.child_age
    var childage=age.replace(/^"(.*)"$/, "$1")
    var dateofbirth=dob.replace(/^"(.*)"$/, "$1")
    setBirthdate(dateofbirth)
    setage2(childage)
    setName1(namee)

    var IDD = route.params.Groupp_id;
    setChildID(IDD)
    getchildinfo()   
},[])
  const getchildinfo=(async()=>{
     
    var token  = await AsyncStorage.getItem('token')
   var config = {
   method: 'get',
   url: constants.BASE_URL + "profile/children/info",
   headers: {                                           
    'Authorization': 'Bearer '+JSON.parse(token)    
  },  
};

axios(config)
.then(async (response)=> {
  // console.log("secondchild",response.data)
  setName1(response.data.data[2].name)
  setBirthdate(response.data.data[2].dob)
  setage2(response.data.data[2].age)
})
.catch(function (error) {

});
  })
   const Updatechildren=(async()=>{
    var token  = await AsyncStorage.getItem('token')
    var child_id=await AsyncStorage.getItem("ChildId")
    var data = new FormData();
    data.append('name',name1);
    data.append('dob', birthdate);
    data.append('child_id', id);
 
    // console.log("09099",data)
    
    var config = {
      method: 'post',
      // url: 'https://development.brstdev.com:5076/api/profile/children/info/update',
      url: constants.BASE_URL + "api/profile/children/info/update",
      headers: {                                           
        'Authorization': 'Bearer '+JSON.parse(token)    
      },
     
      data : data
    };
    
    axios(config)
    .then(function (response) {

      // console.log("tututyuyuyyy",JSON.stringify(response.data));
      if(response.data.status==true){
        alert(response.data.message)
      }
      else{
        alert(response.data.message)
      }

    })
    .catch(function (error) {
      // console.log(error);
    });
    
  })

  return (
    <ImageBackground
      source={require("../../../Images/background.png")}
      style={styles.Container}
      resizeMode="stretch"
    >
      <View style={styles.ViewStyle}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Image
            source={require("../../../Images/Arrow-Left.png")}
            style={styles.IconStyle}
          />
        </TouchableOpacity>
        <Text
          style={{
            fontSize: 24,
            fontFamily: "Axiforma-Bold",
            color: "#F9FBDB",
          }}
        >
          {t("Children Information")}
        </Text>
        <TouchableOpacity>
          <Image style={styles.IconDesign} />
        </TouchableOpacity>
      </View>
      <KeyboardAwareScrollView>
        {myImage ? (
          <View style={styles.ImageView}>
            <View
              style={{
                borderColor: "#F9FBDB",
                borderWidth: 10,
                height: 130,
                width: 130,
                borderRadius: 130 / 2,
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <Image
                source={require("../../../Images/child-profile.png")}
                style={styles.ImageProfile}
              />
            </View>
            <TouchableOpacity onPress={toggleModal2} style={styles.IconButton}>
              <Image style={styles.ProfileEdit} />
            </TouchableOpacity>
          </View>
        ) : (
          <View style={styles.ImageView}>
            <View
              style={{
                borderColor: "#F9FBDB",
                borderWidth: 10,
                height: 130,
                width: 130,
                borderRadius: 130 / 2,
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <Image
                source={require("../../../src/asset/dummyimage.png")}
                style={styles.ImageProfile}
              />
            </View>
            <TouchableOpacity onPress={toggleModal2} style={styles.IconButton}>
              <Image
                source={require("../../../Images/edit.png")}
                style={styles.ProfileEdit}
              />
            </TouchableOpacity>
          </View>
        )}
        <ScrollView>
          <View>
            <Text
              style={{
                fontSize: 15,
                fontFamily: "Axiforma-SemiBold",
                color: "#008080",
                marginLeft: 10,
              }}
            >
              {" "}
              {t("Child 3 details")}
            </Text>
          </View>

          <Text style={styles.TextStyle}>{t("Name")}</Text>

          <TextInput
            placeholder="Sheman carry"
            value={name1}
            style={styles.inputStyle}
            onChangeText={(text) => setName1(text)}
          />

          <Text style={styles.TextStyle}>{t("Date of birth")}</Text>

          <TextInput
            placeholder="31 May, 2018"
            value={birthdate}
            style={styles.inputStyle}
            onChangeText={(text) => setBirthdate(text)}
          />

          <View style={{ flexDirection: "row" }}>
            <Text style={styles.TextDesign}>{t("Age")}:</Text>
            <Text style={styles.TextDesign1}>{age2}</Text>
          </View>
        </ScrollView>
        {isVisible == true && (
          <Modal
            isVisible={true}
            onBackdropPress={() => {
              setisVisible(!isVisible);
            }}
          >
            <View
              style={{
                backgroundColor: "white",
                borderRadius: 20,
                paddingBottom: 10,
                marginHorizontal: 20,
              }}
            >
              <TouchableOpacity
                onPress={() => setisVisible(false)}
                style={{
                  marginTop: 10,
                  alignItems: "flex-end",
                  marginRight: 25,
                }}
              >
                <Image
                  source={require("../../asset/cross.png")}
                  style={{ resizeMode: "contain", height: 35, width: 35 }}
                />
              </TouchableOpacity>
              <View
                style={{
                  height: 100,
                  width: "100%",
                  flexDirection: "row",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <TouchableOpacity
                  onPress={() => OpenCamera()}
                  style={{
                    backgroundColor: "#008080",
                    justifyContent: "center",
                    alignItems: "center",
                    height: 52,
                    borderRadius: 50,
                    width: 120,
                    marginHorizontal: 10,
                    flexDirection: "row",
                  }}
                >
                  <Image
                    source={require("../../asset/camera-icon.png")}
                    style={{ height: 22, width: 35, tintColor: "white" }}
                  />
                  <Text style={{ color: "white", fontSize: 16 }}>{t("Camera")}</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={() => openGallery()}
                  style={{
                    backgroundColor: "#008080",
                    justifyContent: "center",
                    alignItems: "center",
                    height: 52,
                    marginHorizontal: 5,
                    borderRadius: 50,
                    marginHorizontal: 10,
                    width: 120,
                    flexDirection: "row",
                  }}
                >
                  <Image
                    resizeMode="contain"
                    source={require("../../asset/gallery.png")}
                    style={{ height: 22, width: 35, tintColor: "white" }}
                  />
                  <Text style={{ color: "white", fontSize: 16 }}>{t("Gallery")}</Text>
                </TouchableOpacity>
              </View>
            </View>
          </Modal>
        )}
        <TouchableOpacity
          style={{
            marginTop: "10%",
            width: 150,
            height: 50,
            backgroundColor: "#008080",
            alignSelf: "center",
            alignItems: "center",
            borderRadius: 25,
            marginBottom: 30,
          }}
          onPress={()=>Updatechildren()}
        >
          <Text
            style={{
              fontSize: 16,
              color: "white",
              textAlign: "center",
              paddingTop: 17,
              fontFamily: "Axiforma-Bold",
            }}
          >
            {t("Next")}
          </Text>
        </TouchableOpacity>
      </KeyboardAwareScrollView>
    </ImageBackground>
  );
};
export default ChildInformation2;

const styles = StyleSheet.create({
  Container: {
    flex: 1,
  },

  ViewStyle: {
    backgroundColor: "#008080",
    paddingStart: 17,
    flexDirection: "row",
    alignItems: "center",
    paddingTop: 52,
    paddingBottom: 21,
    justifyContent: "space-between",
  },

  IconStyle: {
    height: 27,
    width: 27,
    tintColor: "#F9FBDB",
  },

  headerText: {
    fontSize: 24,
    fontFamily: "Axiforma-Bold",
    color: "#F9FBDB",
    marginEnd: 79,
  },

  ImageView: { marginTop: 42, marginStart: 20, height: 136, width: 136 },

  ImageProfile: { height: 136, width: 136,borderRadius:136/2 },

  ProfileEdit: { height: 34, width: 34 },

  IconButton: {
    position: "absolute",
    alignSelf: "flex-end",
    marginTop: 10,
    marginEnd: 10,
  },

  TextStyle: {
    fontSize: 14,
    fontFamily: "Axiforma-Regular",
    color: "#737373",
    marginStart: 20,
    marginTop: 20,
  },

  inputStyle: {
    backgroundColor: "#fff",
    borderWidth: 1,
    borderColor: "#DFE3A3",
    fontSize: 14,
    fontFamily: "Axiforma-Regular",
    color: "#737373",
    paddingHorizontal: 20,
    marginHorizontal: 20,
    borderRadius: 50,
    marginTop: 8,
    backgroundColor: "white",
    fontSize: 13,
    width: wp(90),
    height: hp(6),
  },

  TextDesign: {
    fontSize: 14,
    fontFamily: "Axiforma-Regular",
    color: "#737373",
    marginStart: 20,
    marginTop: 8,
  },
  TextDesign1: {
    fontSize: 14,
    fontFamily: "Axiforma-Regular",
    color: "#737373",
    marginStart: 5,
    marginTop: 8,
  },
});
