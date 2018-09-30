import React, { Component } from 'react';
import { View,
    TouchableOpacity,
    Text,
 } from 'react-native';
import { connect } from 'react-redux';
import { Actions } from 'react-native-router-flux';
import { storeCurrentSelectedSchool } from '../actions';
import { CardSection, Circle } from './common';

class PlaceholderListItem extends Component {

    onSiteTapped() {
      console.log('on_site_tapped');
      console.log(this.props.rowData);
      const { dispatch } = this.props;
      dispatch(storeCurrentSelectedSchool({ schoolId: this.props.rowData.id }));
        Actions.jump('tabbar', this.props.rowData);
    }

    render() {
      console.log('renderbhitra');
      console.log(this.props.rowData.name);
        const { titleStyle, subtitleStyle, cointainerStyle } = styles;

        const { name } = this.props.rowData;
        const firstLetter = name.charAt(0);

        return (
        <TouchableOpacity
            onPress={this.onSiteTapped.bind(this)}
        >
                <CardSection>
                    <Circle text={firstLetter} color='green' />
                    <View style={cointainerStyle}>
                        <Text numberOfLines={2} style={titleStyle} >{name}</Text>

                        <Text style={subtitleStyle} >{this.props.rowData.address}</Text>
                    </View>

                </CardSection>

        </TouchableOpacity>
       );
    }
}

const styles = {
    titleStyle: {
        paddingLeft: 16,
        fontSize: 17,
        fontWeight: 'bold',
        color: '#000'
    },
    subtitleStyle: {
        paddingLeft: 16,
        fontSize: 15,
        color: '#908989'

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
