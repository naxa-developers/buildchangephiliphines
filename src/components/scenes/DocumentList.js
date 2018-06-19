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
      <List containerStyle={{ marginBottom: 20 }}>
{
  list.map((l, i) => (
    <ListItem
      roundAvatar
      avatar={require('../../../app_images/pdf.png')}
      onPressRightIcon={() => Actions.ShowDocuments()}
      key={i}
      title={l.name}
    />
  ))
}
</List>
      </View>
    );
  }
}
