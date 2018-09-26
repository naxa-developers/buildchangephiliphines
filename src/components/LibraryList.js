import React, { Component } from 'react';
import { ListView } from 'react-native';
import ListItem from './ListItem';


class LibraryList extends Component {
    componentWillMount() {
      console.log('Array sorring result');


      const steps = this.props.list.site_steps;

// function for dynamic sorting
function compareValues(key, order='asc') {
  return function(a, b) {
    if(!a.hasOwnProperty(key) || !b.hasOwnProperty(key)) {
      // property doesn't exist on either object
        return 0;
    }

    const varA = (typeof a[key] === 'string') ?
      a[key].toUpperCase() : a[key];
    const varB = (typeof b[key] === 'string') ?
      b[key].toUpperCase() : b[key];

    let comparison = 0;
    if (varA > varB) {
      comparison = 1;
    } else if (varA < varB) {
      comparison = -1;
    }
    return (
      (order == 'desc') ? (comparison * -1) : comparison
    );
  };
}

      console.log(steps.sort(compareValues('order', 'asc')))

        const ds = new ListView.DataSource({
            rowHasChanged: (r1, r2) => r1 !== r2
        });

        this.dataSource = ds.cloneWithRows(this.props.list.site_steps);
    }

    render() {
        return (
            <ListView
            dataSource={this.dataSource}
            renderRow={(rowData) => <ListItem item={rowData} />}
            />
        );
    }

}


export default LibraryList;
