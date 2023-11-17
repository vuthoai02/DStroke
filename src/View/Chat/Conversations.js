import React, {useContext} from 'react';
import {Image, SafeAreaView, TouchableOpacity, View} from 'react-native';
import {Text, TextInput, StyleSheet} from 'react-native';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import {useNavigation} from '@react-navigation/native';
import API_URL from '../../api/constant/index';
import axios from 'axios';
import {useEffect} from 'react';
import {useState} from 'react';
import Loading from '../../components/Loading';
import { AuthContext } from '../../context/AuthContext';

function ChatList() {
  const navigate = useNavigation();
  const [conversationList, setConversationList] = useState(null);
  const [sender, setSender] = useState([])
  const [fetching, setFetching] = useState(false)

  const {authState:{user}} = useContext(AuthContext)

  const getConversations = async () => {
    setFetching(true)
    try {
      const res = await axios.get(API_URL.CONVERSATION);
      setConversationList(res.data.data);
      setSender(res.data.sender);
      setFetching(false)
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    getConversations();
  }, []);

  //console.log(friendList);

  if(fetching === true){
    return(
      <Loading/>
    )
  }

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.searchArea}>
        <FontAwesome5
          style={{marginLeft: 10}}
          size={17}
          name={'search'}
          solid
          color="gray"
        />
        <TextInput
          style={styles.searchInput}
          placeholder="Tìm kiếm"
          placeholderTextColor={'gray'}
        />
      </View>
      <View style={styles.listFriend}>
        {conversationList?.map((friend, index) => {
          return (
            <TouchableOpacity
              key={index}
              style={styles.friend}
              onPress={() =>
                navigate.navigate('Message', {
                  members: friend.members,
                  conversationId: friend._id,
                })
              }>
              <View style={{flexDirection: 'row', alignItems: 'center'}}>
                <Image
                  style={{width: 70, height: 70, marginRight: 5}}
                  source={require('../../assets/images/avatar.png')}
                />
                <View>
                  <Text
                    style={{color: 'black', fontSize: 16, fontWeight: '600'}}>
                    {sender ? sender[index]?.fullname : 'Bệnh nhân'}
                  </Text>
                  <Text style={{color: 'gray'}}>Bạn: Test</Text>
                </View>
              </View>
              <Text>22:29</Text>
            </TouchableOpacity>
          );
        })}
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: 'white',
    paddingTop: 20,
  },
  searchArea: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderRadius: 30,
    width: '80%',
    color:'black'
  },
  searchInput: {
    height: 40,
    marginLeft: 10,
    color: 'black',
  },
  listFriend: {
    width: '100%',
    alignItems: 'center',
    marginTop: 30,
    flexDirection:'column-reverse'
  },
  friend: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: '90%',
    marginBottom: 10,
  },
});

export default ChatList;
