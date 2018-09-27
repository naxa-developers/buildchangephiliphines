import React, { Component } from 'react';
import { ListView, Text } from 'react-native';
import ListItem from './ListItem';
import Page1 from '../test/page1';


class SubStepsList extends Component {
    componentWillMount() {
        const ds = new ListView.DataSource({
            rowHasChanged: (r1, r2) => r1 !== r2
        });

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

        this.dataSource = ds.cloneWithRows(this.props.sub_steps.sort(compareValues('order', 'asc')));
    }

    render() {
        return (
            <ListView
            dataSource={this.dataSource}
            renderRow={(rowData) => (<Page1 substep={rowData} stepId={this.props.stepId} />)
            }
            />
        );
    }

}


export default SubStepsList;
