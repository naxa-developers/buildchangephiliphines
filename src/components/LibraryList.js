import React, { Component } from 'react';
import { ListView } from 'react-native';
import { connect } from 'react-redux';
import ListItem from './ListItem';


class LibraryList extends Component {
    componentWillMount() {
      const steps = this.props.steps;

// function for dynamic sorting
function compareValues(key, order = 'asc') {
  return function (a, b) {
    if (!a.hasOwnProperty(key) || !b.hasOwnProperty(key)) {
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

      console.log('Array sorring result', steps.sort(compareValues('order', 'asc')));

        const ds = new ListView.DataSource({
            rowHasChanged: (r1, r2) => r1 !== r2
        });

        this.dataSource = ds.cloneWithRows(steps.sort(compareValues('order', 'asc')));
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

const mapStateToProps = (state) => {
  console.log('ShowMapko_mapstatetoprops_bhitra');
  const { sites } = state.schoolList.data;
  const { selectedSchoolId } = state.currentSelectedSchool;

const found = sites.find(function(element) {
  return element.id === selectedSchoolId;
});

console.log('foundKO_value');
console.log(found);
return {
  steps: found.site_steps
};
};


export default connect(mapStateToProps)(LibraryList);
