import React, { Component } from 'react';
import { Actions } from 'react-native-router-flux';
import RNFetchBlob from 'react-native-fetch-blob';
import { View,
    TouchableOpacity,
    Text,
    Image,
    Dimensions
 } from 'react-native';
import { CardSection } from './common';
import { strings, getLocalizedText } from '../../locales/strings';


class ListItem extends Component {

  constructor() {
    super();
    this.state = {
        good_photo: {},
    };
}

  componentWillMount() {
    console.log('photoData', this.props.item);
  RNFetchBlob.fs.exists('/storage/emulated/0/Android/data/com.guide/build_change_philippines')
      .then((exist) => {
          console.log(exist);
        if (exist) {
          if (this.props.item.icon === null || this.props.item.icon === '') {
            this.setState({
              good_photo: require('../../app_images/no_image.png')
            });
          } else {
            console.log('good_photo');
            this.setState({
              good_photo: { uri: 'file:///storage/emulated/0/Android/data/com.guide/build_change_philippines/media/' + this.props.item.step }
            });
          }
      }
      else if (!exist) {
        if (this.props.item.icon === null || this.props.item.icon === '') {
          this.setState({
            good_photo: require('../../app_images/no_image.png')
          });
        }
        else {
          this.setState({
            good_photo: { uri: 'http://bccms.naxa.com.np/media/' + this.props.item.icon }
          });
        }
      }
      })
      .catch(() => {
          console.log('error while checking file');
      });
}


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
      console.log('renderbhitra state ko value', this.state);
        const { titleStyle, subtitleStyle, cointainerStyle } = styles;
        const { step, local_step } = this.props.item;

        return (
        <TouchableOpacity
            onPress={this.onSiteTapped.bind(this)}
        >
            <View>
                <CardSection>
                    <Image
                      style={styles.imageStyle}
                      source={this.state.good_photo}
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
        width: Dimensions.get('window').width - 60
    },
    imageStyle: {
      height: 60,
      width: 60
    }
};

export default ListItem;
