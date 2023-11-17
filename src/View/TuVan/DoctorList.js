import React, { useEffect, useState, useContext } from "react";
import { Text, View, Image, StyleSheet, ScrollView, TouchableOpacity } from "react-native";
import API_URL from '../../api/constant/index'
import axios from "axios";
import Icons from '../../assets/icons/index'
import { useNavigation } from "@react-navigation/native";
import { AuthContext } from "../../context/AuthContext";
import Loading from "../../components/Loading";

function DoctorList({route, navigation}) {
  const navigate = useNavigation();
  const {hospitalName} = route.params;
  const [doctors, setDoctors] = useState([])
  const {authState:{user}} = useContext(AuthContext)
  const [fetching, setFetching] = useState(false);

  const getDoctors = async ()=>{
    setFetching(true);
    try{
      const res = await axios.post(
        API_URL.GET_DOCTORS,
        {hospitalName},
      );
      setDoctors(res.data.data)
      setFetching(false);
    }catch(err){
      console.log(err);
    }
  }

  useEffect(()=>{
    getDoctors();
  },[])

  const goToChat = async (doctor)=>{
    const members = [user._id, doctor._id]
    try{
      const res = await axios.post(API_URL.CONVERSATION, {
        senderId: user._id,
        receiverId: doctor._id,
      });
      navigate.navigate('Message', {
        members: members,
        conversationId: res.data.conversationId,
      });
    }catch(err){
      console.log(err);
    }
    
  }
  
  if(fetching === true){
    return(
      <Loading/>
    )
  }

  if(!doctors){
    return(
      <Text style={{textAlign:'center', color:'black'}}>Bệnh viện này chưa có bác sĩ đăng kí</Text>
    )
  }
  return (
    <ScrollView style={styles.container} contentContainerStyle={{alignItems:'center'}}>
      {doctors.map((doctor, index) => {
        if(doctor._id === user._id) return
        return (
          <TouchableOpacity onPress={()=>goToChat(doctor)} key={index} style={styles.doctorCard}>
            <Image
              style={{width: 100, height: 100, marginBottom: 10}}
              source={Icons.Doctor}
            />
            <Text style={{color: 'black'}}>Bác sĩ {doctor.fullname}</Text>
          </TouchableOpacity>
        );
      })}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  doctorCard: {
    backgroundColor: 'white',
    marginTop:20,
    width: '60%',
    height: 200,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 5,
    },
    shadowOpacity: 0.36,
    shadowRadius: 6.68,

    elevation: 11,
    marginBottom:5
  },
});

export default DoctorList;