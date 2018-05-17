import React from 'react';
import { View, ScrollView, Text } from 'react-native';
import { Header } from './components/common';
import LibraryList from './components/LibraryList';
import ImageList from './components/ImageList';

const StepList = () => {
return (
    <View style={{ flex: 1 }}>
    <ScrollView>
        <LibraryList />
        <Text style={styles.centerHeader}> Recent Photographs Submitted </Text>
        <ImageList />
    </ScrollView>
</View >
);
};

const styles = {
    centerHeader: { marginTop: 10, fontSize: 16, alignSelf: 'center' }
  };

export default StepList;
