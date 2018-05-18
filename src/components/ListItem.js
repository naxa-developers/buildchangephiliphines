import React, { Component } from 'react';
import { View,
    TouchableOpacity,
    Text
 } from 'react-native';
import { CardSection, Circle } from './common';

class ListItem extends Component {

    render() {
        const { titleStyle, subtitleStyle, cointainerStyle } = styles;
        const { id, name } = this.props.item;

        return (
        <TouchableOpacity>
            <View>
                <CardSection>
                    <Circle text={id} />
                    <View style={cointainerStyle}>
                        <Text style={titleStyle} >{name}</Text>
                        <Text style={subtitleStyle} >{name}</Text>
                    </View>
                </CardSection>

            </View>
        </TouchableOpacity>
       );
    }
}

const styles = {
    titleStyle: {
        paddingLeft: 16,
        fontSize: 20,
        color: '#000'
    },
    subtitleStyle: {
        paddingLeft: 16,
        fontSize: 18,
        color: '#ddd'

    },
    cointainerStyle: {
        justifyContent: 'center',
        borderBottomWidth: 0,
        backgroundColor: '#fff',
        flexDirection: 'column',
        position: 'relative'
    }
};

export default ListItem;
