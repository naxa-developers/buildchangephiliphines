import React, { Component } from 'react';
import { View,
    TouchableOpacity,
    Text,
 } from 'react-native';
import { connect } from 'react-redux';
import { Actions } from 'react-native-router-flux';
import { CardSection, Circle } from './common';

class PlaceholderListItem extends Component {

    onSiteTapped(){
        Actions.StepList(this.props.rowData);
    }

    render() {
        const { titleStyle, subtitleStyle, cointainerStyle } = styles;

        const { name, } = this.props.rowData;
        const firstLetter = name.charAt(0);

        return (
        <TouchableOpacity
            onPress={this.onSiteTapped.bind(this)}
        >
                <CardSection>
                    <Circle text={firstLetter} color='green' />
                    <View style={cointainerStyle}>
                        <Text style={titleStyle} >{name}</Text>
                        <Text style={subtitleStyle} >Contains {this.props.rowData.steps.length} steps </Text>
                    </View>

                </CardSection>

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
        marginTop: 16,
        marginBottom: 16,
        justifyContent: 'center',
        borderBottomWidth: 0,
        backgroundColor: '#fff',
        flexDirection: 'column',
        position: 'relative'
    }
};

export default connect(null)(PlaceholderListItem);
