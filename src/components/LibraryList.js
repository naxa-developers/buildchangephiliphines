import React, { Component } from 'react';
import { ListView } from 'react-native';
import ListItem from './ListItem';


class LibraryList extends Component {
    componentWillMount() {
        const ds = new ListView.DataSource({
            rowHasChanged: (r1, r2) => r1 !== r2
        });

        this.dataSource = ds.cloneWithRows(this.props.list.steps);
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
