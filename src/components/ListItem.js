import React, { Component } from 'react';
import { Actions } from 'react-native-router-flux';
import { View,
    TouchableOpacity,
    Text
 } from 'react-native';
import { CardSection, Circle } from './common';
import { strings, getLocalizedText } from '../../locales/strings';


class ListItem extends Component {
  onSiteTapped() {
    Actions.CheckList({ title: strings.title_checklist, item: this.props.item });
  }

    render() {
        const { titleStyle, subtitleStyle, cointainerStyle } = styles;
        const { id } = this.props.item;


        const name = (strings.getLanguage().trim() === 'wa')
        ? this.props.item.localname
        : this.props.item.name;

        const firstLetter = name.charAt(0);

        return (
        <TouchableOpacity
            onPress={this.onSiteTapped.bind(this)}
        >
            <View>
                <CardSection>
                    <Circle text={firstLetter} />
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
        fontSize: 14,
        color: '#000'
    },
    subtitleStyle: {
        paddingLeft: 16,
        fontSize: 12,
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
