import React, { Component } from 'react';
import { View, Text } from 'react-native';
import { Button } from 'react-native-elements';
import { Actions } from 'react-native-router-flux';
import { ToggleCircle, Card } from './common';

class CheckListItem extends Component {

    render() {
        const { titleStyle, } = styles;

        console.log(this.props.data);

        return (
            <Card>

                <View style={styles.container}>
                      <View style={{ flexDirection: 'row' }}>
                                      <ToggleCircle />

                                      <View style={{ paddingTop: 27 }}>
                                      <Text style={titleStyle} >     {this.props.data.text}</Text>
                                      </View>
                      </View>
                                      <View style={{ paddingTop: 23 }}>
                                            <Button
                                                buttonStyle={{
                                                backgroundColor: 'rgba(92, 99,216, 1)',
                                                borderColor: 'transparent',
                                                borderWidth: 0,
                                                borderRadius: 5
                                                }}
                                                onPress={() => Actions.ReportForm()}
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

export default CheckListItem;
