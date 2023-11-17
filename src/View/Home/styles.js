import {StyleSheet, Dimensions} from 'react-native';

const WIDTH = Dimensions.get('window').width;
const HEIGHT = Dimensions.get('window').height;

export const styles = StyleSheet.create({
  header: {
    height: HEIGHT * 0.19,
  },
  headerBgImage: {
    opacity: 0.9,
    width: '100%',
    height: 200,
  },
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  text: {
    color: '#000',
    textAlign: 'center',
    fontWeight: '600',
    fontSize: 16,
  },
  body: {
    backgroundColor: 'white',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    width: '100%',
    alignItems: 'center',
    position: 'relative',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 12,
    },
    shadowOpacity: 0.8,
    shadowRadius: 16.0,
    elevation: 24,
    paddingBottom: 10,
    flexDirection:'column'
  },
  call: {
    marginTop: '-10%',
    borderRadius: 50,
  },
  textCall: {
    color: '#000',
    textAlign: 'center',
    marginTop: 60,
    fontWeight: '900',
    fontSize: 20,
  },
  followBtn: {
    position: 'absolute',
    left: '3%',
    top: 21,
    width: 165,
    height: 40,
    zIndex: 2,
    backgroundColor: '#1E90FF',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 50,
    flexDirection: 'row',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 12,
    },
    shadowOpacity: 0.8,
    shadowRadius: 16.0,
    elevation: 24,
  },
  messBtn: {
    position: 'absolute',
    width: 45,
    height: 45,
    right: '19%',
    top: 21,
    zIndex: 2,
    borderRadius: 50,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(52, 52, 52, 0.2)',
  },
  bellBtn: {
    position: 'absolute',
    width: 45,
    height: 45,
    right: '5%',
    top: 21,
    zIndex: 2,
    borderRadius: 50,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(52, 52, 52, 0.2)',
  },
  services: {
    flexDirection:'row',
    flexWrap:'wrap',
    justifyContent:'space-between',
    alignItems:'center',
    width:'85%',
    marginBottom:10
  },
  serviceBtn: {
    width: 100,
    height: 100,
    alignItems: 'center',
    backgroundColor: '#fff',
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 12,
    },
    shadowOpacity: 0.8,
    shadowRadius: 16.0,
    elevation: 12,
    marginBottom:20,
    paddingTop:9
  },
  serviceImg: {
    width: 60,
    height: 60,
  },
  serviceBanner: {
    width: '100%',
    height: 200,
    position: 'absolute',
    bottom: 0,
    zIndex: -1,
    opacity: 0.8,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
  },
});
