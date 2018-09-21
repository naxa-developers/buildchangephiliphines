import React, { Component } from 'react';
import { ListView, Text } from 'react-native';
import ListItem from './ListItem';
import Page1 from '../test/page1';


class SubStepsList extends Component {
    componentWillMount() {
        const ds = new ListView.DataSource({
            rowHasChanged: (r1, r2) => r1 !== r2
        });

        this.dataSource = ds.cloneWithRows(this.props.sub_steps);
    }

    render() {
        return (
            <ListView
            dataSource={this.dataSource}
            renderRow={(rowData) => (<Page1 substep={rowData} />)
            }
            />
        );
    }

}


export default SubStepsList;
