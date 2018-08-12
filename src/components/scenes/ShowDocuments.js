import React from 'react';
import { StyleSheet, Dimensions, View } from 'react-native';
import { connect } from 'react-redux';
import Pdf from 'react-native-pdf';

class ShowDocuments extends React.Component {
    render() {
      console.log('ShowDocumentsko_render_bhitra');
      console.log(this.props.selectedSchoolId);
        const source = { uri: 'http://bccms.naxa.com.np/core/api/site-documents/'+this.props.selectedSchoolId+'/', cache: true };

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
        justifyContent: 'flex-start',
        alignItems: 'center'
    },
    pdf: {
        flex: 1,
        width: Dimensions.get('window').width,
    }
});
