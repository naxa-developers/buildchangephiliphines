import React, { Component } from 'react';
import { View } from 'react-native';
import { Actions } from 'react-native-router-flux';
import { List, ListItem } from 'react-native-elements';

export default class DocumentList extends Component {


  render() {
    const list = [
  {
    name: 'First Document',
    avatar_url: 'https://developers.zamzar.com/assets/app/img/convert/pdf.png',
    subtitle: 'Vice President'
  },
  {
    name: 'Second Document',
    avatar_url: 'https://developers.zamzar.com/assets/app/img/convert/pdf.png',
    subtitle: 'Vice Chairman'
  },
  {
    name: 'Third Document',
    avatar_url: 'https://developers.zamzar.com/assets/app/img/convert/pdf.png',
    subtitle: 'Vice President'
  },
  {
    name: 'Fourth Document',
    avatar_url: 'https://developers.zamzar.com/assets/app/img/convert/pdf.png',
    subtitle: 'Vice Chairman'
  },
  {
    name: 'Fifth Document',
    avatar_url: 'https://developers.zamzar.com/assets/app/img/convert/pdf.png',
    subtitle: 'Vice President'
  }

];
    return (
      <View>
      <List containerStyle={{ borderTopWidth: 0, marginBottom: 20, marginLeft: 10, marginRight: 10, borderWidth: 0 }}>
{
  list.map((l, i) => (
    <ListItem
      roundAvatar
      avatar={require('../../../app_images/pdf.png')}
      onPressRightIcon={() => Actions.ShowDocuments()}
      key={i}
      title={l.name}
      containerStyle={{ paddingTop: 20, paddingBottom: 20, paddingLeft: 15, paddingRight: 15, borderColor: '#EFEFF4', borderWidth: 10, borderBottomWidth: 0}}

    />
  ))
}
</List>
      </View>
    );
  }
}
