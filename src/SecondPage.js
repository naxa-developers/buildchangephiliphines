import React from 'react';
import { View, Button, Text } from 'react-native';
import Header from './Header';

const Secondpage = () => {

  const { mainContainer, subContainer, textStyle, buttonStyle } = styles;
  return (
    <View style={mainContainer}>
              <Header headerText={'Construction Monitoring App'} />


                        <View
                        style={subContainer}
                        >

                                <Button
                                title='Continue Without Login'
                                color='#90C341'
                                style={buttonStyle}
                                />

                                <Text style={textStyle}>IF YOU ARE A COMMUNITY MEMBER</Text>

                        </View>

                        <View
                        style={subContainer}
                        >

                                <Button
                                title='Login'
                                color='#4B84B2'
                                style={buttonStyle}
                                />

                                <Text style={textStyle}>IF YOU ARE AN AUTHORIZED ENGINEER</Text>

                        </View>
    </View>
  );
};

export default Secondpage;

const styles = {
  mainContainer: {
    flex: 1,
    justifyContent: 'space-between',
  },
  subContainer: {
    marginLeft: 10,
    marginRight: 10

  },
  textStyle: {
    fontSize: 20,
    textAlign: 'center'
  },

};
