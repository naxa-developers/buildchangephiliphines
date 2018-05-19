import React, { Component } from 'react';
import { View, 
    TouchableWithoutFeedback, 
    Text,
    Alert
 } from 'react-native';
import { connect } from 'react-redux';
import { Icon, Button } from 'react-native-elements';
import { Actions } from 'react-native-router-flux';
import { CardSection, ToggleCircle, Card } from './common';

class CheckListItem extends Component {
    
    render() {
        const { titleStyle, cointainerStyle } = styles;
        //const { id, title } = this.props.rowItem;
        
        return (     
        <TouchableWithoutFeedback
            onPress={() => Alert.alert('duck')}
        >         
            <View>
                <CardSection>    
                    <ToggleCircle />
                    <View style={cointainerStyle}>
                        <Text style={titleStyle} >{this.props.rowData.text}</Text>
                    </View>
                </CardSection>
                <Card>
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
                    <Button
                          buttonStyle={{  
                            marginTop: 5,  
                            backgroundColor: 'rgba(92, 99,216, 1)',
                            borderColor: 'transparent',
                            borderWidth: 0,
                            borderRadius: 5
                          }}
                        onPress={() => Alert.alert('Downloading')}
                        title='Materials'
                    />
                    </Card>

            </View>
        </TouchableWithoutFeedback>
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

export default connect(null)(CheckListItem); 
