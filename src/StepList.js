import React from 'react';
import { View, ScrollView, Text } from 'react-native';
import LibraryList from './components/LibraryList';
import ImageList from './components/ImageList';

const StepList = (props) => {
return (
    <View style={{ flex: 1 }}>
    <ScrollView>
        <LibraryList list={props} />
        <Text style={styles.centerHeader}>Some Recent Photograph</Text>
        <ImageList />
    </ScrollView>
</View >
);
};

const styles = {
    centerHeader: { marginTop: 10, fontSize: 16, alignSelf: 'center' }
};

export default StepList;
