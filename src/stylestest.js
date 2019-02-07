
import { StyleSheet, Dimensions } from 'react-native';
const window = Dimensions.get('window');

export const IMAGE_HEIGHT = window.width / 2;
export const IMAGE_HEIGHT_SMALL = window.width / 7;

export default StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  input: {
    height: 50,
    backgroundColor: '#fff',
    marginHorizontal: 10,
    marginVertical: 5,
   // paddingVertical: 5,
    // paddingHorizontal: 15,
    width: window.width - 30,
  },
  logo: {
    height: IMAGE_HEIGHT,
    resizeMode: 'contain',
    marginBottom: 10,
    padding: 10,
    marginTop: 40
  },
  register: {
    marginBottom: 20,
    width: window.width - 100,
    alignItems: 'center',
    justifyContent: 'center',
    height: 50,
    backgroundColor: '#ffae',
  },
  buttonWrapper: {
    marginTop: 30,
    backgroundColor: '#003860',
    width: 300,
    alignSelf: 'center'
  },
  buttonText: {
    color: 'white',
    fontSize: 20,
    padding: 10,
    textAlign: 'center'
  },
  form: {
  }
});
