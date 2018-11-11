import React from 'react';
import { StyleSheet, Dimensions, View, Text, TouchableOpacity } from 'react-native';
import { connect } from 'react-redux';
import Pdf from 'react-native-pdf';
import Icon from 'react-native-vector-icons/FontAwesome';
import { Actions } from 'react-native-router-flux';


class ShowDocuments extends React.Component {
    render() {
      console.log('pdf bhitra', this.props.value);

        const source = { uri: this.props.path, cache: true };

        //const source = require('./test.pdf');  // ios only
        //const source = {uri:'bundle-assets://test.pdf'};

        //const source = {uri:'file:///sdcard/test.pdf'};
        //const source = {uri:"data:application/pdf;base64,..."};

        return (
            <View style={styles.container}>
                <Pdf
                    source={source}
                    onLoadComplete={(numberOfPages) => {
                        console.log(`number of pages: ${numberOfPages}`);
                    }}
                    onPageChanged={(page) => {
                        console.log(`current page: ${page}`);
                    }}
                    onError={(error) => {
                        console.log(error);
                    }}
                    style={styles.pdf}
                />
                {this.props.value !== undefined &&
                  <TouchableOpacity style={styles.button} onPress={() => Actions.GuidelineCategoryScene()}>
                    <Icon name={'th-large'} size={35} style={styles.iconStyle} />
                    <Text style={styles.subtext}>Navigate To</Text>
                    <Text style={styles.text}>Construction Materials</Text>
                  </TouchableOpacity>
                }
            </View>
        );
  }
}

const mapStateToProps = (state) => {
  console.log('ShowDocumentsko_mapstatetoprops_bhitra');
  console.log(state);
return {
  selectedSchoolId: state.currentSelectedSchool.selectedSchoolId
};
};

export default connect(mapStateToProps)(ShowDocuments);

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'flex-start'
    },
    pdf: {
        flex: 1,
        width: Dimensions.get('window').width,
    },
    button: {
      margin: 15,
      paddingTop: 15,
      paddingBottom: 15,
      paddingRight: 20,
      backgroundColor: '#8cc63f',
      position: 'relative',
      paddingLeft: 60
    },
    text: {
      fontWeight: 'bold',
      fontSize: 16,
      color: 'white'
    },
    subtext: {
      color: 'white'
    },
    iconStyle: {
      position: 'absolute',
      left: 15,
      top: 20,
      color: 'white'
    }
});
