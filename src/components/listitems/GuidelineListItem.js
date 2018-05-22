import React, { Component } from 'react';
import { View, Text } from 'react-native';
import { Button } from 'react-native-elements';
import { Actions } from 'react-native-router-flux';


class GuideLineListItem extends Component {

    render() {
        return (
            <Text> Hi </Text>
       );
    }
}

const styles = {
    titleStyle: {
        fontSize: 20,
        color: '#000'
    },
    subtitleStyle: {
        paddingLeft: 16,
        fontSize: 18,
        color: '#ddd'

    },
    cointainerStyle: {
        justifyContent: 'space-between',
        borderBottomWidth: 0,
        backgroundColor: '#fff',
        flexDirection: 'row',
        position: 'relative'
    },
    container: {
      flexDirection: 'row',
      justifyContent: 'space-between'
    }

};

export default GuideLineListItem;
