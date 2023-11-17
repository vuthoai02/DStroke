import React, {useContext, useRef} from 'react';
import {io} from 'socket.io-client';
import {useEffect} from 'react';
import {useState} from 'react';
import {
  Image,
  SafeAreaView,
  TouchableOpacity,
  View,
  ScrollView,
  Keyboard,
} from 'react-native';
import Icons from '../../assets/icons/index';
import {Text, TextInput, StyleSheet} from 'react-native';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import {AuthContext} from '../../context/AuthContext';
import API_URL from '../../api/constant/index';
import axios from 'axios';
import Loading from '../../components/Loading/index';

function Message({route}) {
  const {conversationId, members} = route.params;
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState([]);
  const scrollViewRef = useRef();
  const socket = useRef();
  const [fetching, setFetching] = useState(false);
  const {
    authState: {user},
  } = useContext(AuthContext);

  useEffect(() => {
    socket.current = io('https://startpu.herokuapp.com/');
    //socket.current = io('http://192.168.1.102:5555');
    socket.current.on('getMessage', data => {
      const newMessage = {
        sender: data.senderId,
        text: data.text,
      };
      setMessages(pre => [...pre, newMessage]);
    });
    return () => {
      socket.current.disconnect();
    };
  }, []);
  useEffect(() => {
    socket.current.emit('addUser', user._id);
  }, [user]);

  const sendMessage = async () => {
    if (message === '') {
      return;
    }

    messages.push({sender: user._id, text: message});
    setMessage('');

    const receiverId = members.filter(e => e !== user._id);
    const newMessage = {
      senderId: user._id,
      text: message,
      receiverId: receiverId[0],
    };

    //console.log(newMessage);
    socket.current.emit('sendMessage', newMessage);

    try {
      await axios.post(API_URL.CREATE_MESSAGE, {
        conversationId: conversationId,
        sender: user._id,
        text: message,
      });
    } catch (err) {
      console.log(err);
    }
  };
  const scrollToBottom = h => {
    scrollViewRef.current.scrollTo({y: h, animated: true});
  };

  useEffect(() => {
    getMessages();
  }, []);

  const getMessages = async () => {
    setFetching(true);
    try {
      const res = await axios.get(`${API_URL.GET_MESSAGE}/${conversationId}`);
      setMessages(res.data.data);
      setFetching(false);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      {fetching === true ? (
        <Loading />
      ) : (
        <ScrollView
          style={{...styles.displayMessage}}
          ref={scrollViewRef}
          onContentSizeChange={(w, h) => scrollToBottom(h)}>
          {messages?.map((message, index) => {
            if (message.sender === user._id) {
              return (
                <View
                  key={index}
                  style={{
                    width: '100%',
                    alignItems: 'flex-end',
                    marginBottom: 20,
                  }}>
                  <Text
                    style={{
                      maxWidth: '80%',
                      backgroundColor: '#0084FF',
                      textAlign: 'right',
                      borderRadius: 30,
                      marginRight: 15,
                      fontSize: 17,
                      color: 'white',
                      padding: 10,
                    }}>
                    {message.text}
                  </Text>
                </View>
              );
            }
            return (
              <View
                key={index}
                style={{
                  width: '100%',
                  alignItems: 'baseline',
                  marginBottom: 20,
                }}>
                <Image
                  source={Icons.Doctor}
                  style={{width: 20, height: 20, borderRadius: 100}}
                />
                <Text
                  style={{
                    maxWidth: '80%',
                    backgroundColor: '#E4E6EB',
                    textAlign: 'left',
                    borderRadius: 30,
                    marginLeft: 15,
                    fontSize: 17,
                    color: 'black',
                    padding: 10,
                  }}>
                  {message.text}
                </Text>
              </View>
            );
          })}
        </ScrollView>
      )}
      <View style={styles.inputArea}>
        <TextInput
          value={message}
          onChangeText={text => setMessage(text)}
          style={styles.input}
          placeholder="Nhắn tin"
        />
        <TouchableOpacity onPress={sendMessage}>
          <FontAwesome5
            style={{marginRight: 7}}
            name="paper-plane"
            size={30}
            color="#0084FF"
          />
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  inputArea: {
    position: 'absolute',
    bottom: 0,
    flexDirection: 'row',
    width: '100%',
    justifyContent: 'space-around',
    alignItems: 'center',
    height: '10%',
  },
  input: {
    width: '85%',
    borderWidth: 0.5,
    borderRadius: 30,
    height: '80%',
    paddingLeft: 15,
    color: 'black',
  },
  displayMessage: {
    flexDirection: 'column',
    marginBottom: 120,
    paddingTop: 20,
  },
});

export default Message;
