import React, { Component } from 'react';
import { View, Text } from 'react-native';
import { Button } from 'react-native-elements';
import { Actions } from 'react-native-router-flux';
import { ToggleCircle, Card } from './common';
import { strings } from '../../locales/strings';

class CheckListItem extends Component {

    render() {
        const { titleStyle, } = styles;
        const name = (strings.getLanguage().trim() === 'wa') 
        ? this.props.data.localtext 
        : this.props.data.text;

        console.log(this.props.data);

        return (
            <Card style={styles.container}>

                <View >
                      <View style={{ flexDirection: 'row' }}>
                                      <ToggleCircle />

                                      <View style={{ paddingTop: 27 }}>
                                      <Text style={titleStyle} >{name}</Text>
                                      </View>
                      </View>
                                      <View style={{ paddingTop: 23 }}>
                                            <Button
                                                buttonStyle={{
                                                backgroundColor: '#6383aa',
                                                borderColor: 'transparent',
                                                borderWidth: 0,
                                                borderRadius: 5
                                                }}
                                                onPress={() => Actions.ReportForm({ checklist: this.props.data })}
                                                title='Report'
                                            />
                                        </View>
            </View>
          </Card>
       );
    }
}

const styles = {
    titleStyle: {
        fontSize: 14,
        color: '#000'
    },
    subtitleStyle: {
        paddingLeft: 12,
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

export default CheckListItem;
