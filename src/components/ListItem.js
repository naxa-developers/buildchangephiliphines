import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Actions } from 'react-native-router-flux';
import { View,
    TouchableOpacity,
    Text,
    Image
 } from 'react-native';
import { CardSection, Circle } from './common';
import { strings, getLocalizedText } from '../../locales/strings';


class ListItem extends Component {
  onSiteTapped() {
    if (this.props.currentUserGroup !== 'Field Engineer') {
      Actions.SubStepsList({ sub_steps: this.props.item.sub_steps, stepId: this.props.item.id, image: this.props.item.image });
    }
    if (this.props.currentUserGroup === 'Field Engineer') {
      //Actions.CheckList({ title: strings.title_checklist, item: this.props.item });
      Actions.Category({ sub_steps: this.props.item.sub_steps, stepId: this.props.item.id, image: this.props.item.image, item: this.props.item });
    }
  }

    render() {
      console.log('listitendlsfjkslkdfjsa bhitra');
      console.log('item', this.props.item);

        const { titleStyle, subtitleStyle, cointainerStyle } = styles;
        const { step, local_step } = this.props.item;

        const firstLetter = getLocalizedText(local_step, step).charAt(0);

        return (
        <TouchableOpacity
            onPress={this.onSiteTapped.bind(this)}
        >
            <View>
                <CardSection>
                    <Image
                      style={styles.imageStyle}
                      source={require('../../app_images/Electrical1.png')}
                    />
                    <View style={cointainerStyle}>
                        <Text style={titleStyle} >{getLocalizedText(local_step, step)}</Text>
                        <Text style={subtitleStyle} >{getLocalizedText(local_step, step)}</Text>
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
        fontSize: 15,
        color: '#000'
    },
    subtitleStyle: {
        paddingLeft: 16,
        fontSize: 12,
        color: 'rgba(0,0,0,.6)'

    },
    cointainerStyle: {
        justifyContent: 'center',
        borderBottomWidth: 0,
        backgroundColor: '#fff',
        flexDirection: 'column',
        position: 'relative'
    },
    imageStyle: {
      height: 60,
      width: 60

    }
};

const mapStateToProps = (state) => {
  console.log('eachstep');
  console.log(state);
  return {
    currentUserGroup: state.currentUserGroup.currentUserGroup,
    currentUserId: state.currentUserGroup.currentUserId,
  };
};

export default connect(mapStateToProps)(ListItem);
