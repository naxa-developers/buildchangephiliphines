import React, { Component } from 'react';
import { View, Text } from 'react-native';
import { List, ListItem } from 'react-native-elements';
import { Actions } from 'react-native-router-flux';

class HouseParts extends Component {
  render() {
    const list = [
  {
    name: 'Foundation'
  },
  {
    name: 'Floor Slab'
  },
  {
    name: 'Column'
  },
  {
    name: 'Walls'
  },
  {
    name: 'Beams'
  },
  {
    name: 'Roof'
  }
];
    return (
      <List containerStyle={{ marginBottom: 20 }}>
  {
    list.map((l) => (
      <ListItem
        onPress={() => Actions.MaterialPhoto()}
        key={l.name}
        title={l.name}
      />
    ))
  }
</List>
    );
  }
}

export default HouseParts;
