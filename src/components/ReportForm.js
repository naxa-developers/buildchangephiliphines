import React, { Component } from 'react';
import { View, ScrollView, Text } from 'react-native';
import { Button, FormLabel, FormInput, } from 'react-native-elements';
import ImagePicker from 'react-native-image-picker';

class ReportForm extends Component {

    state = {
        avatarSource: null,
        comments: '',
        uploading: false,
      };

      selectPhotoTapped() {  
        const options = {
          quality: 1.0,
          maxWidth: 500,
          maxHeight: 500,
          storageOptions: {
            skipBackup: true
          }
        };
    
        ImagePicker.showImagePicker(options, (response) => {
          console.log('Response = ', response);
    
          if (response.didCancel) {
            console.log('User cancelled photo picker');
          }
          else if (response.error) {
            console.log('ImagePicker Error: ', response.error);
          }
          else if (response.customButton) {
            console.log('User tapped custom button: ', response.customButton);
          }
          else {
            let source = { uri: response.uri };
    
            // You can also display the image using data:
            // let source = { uri: 'data:image/jpeg;base64,' + response.data };
    
            this.setState({
              avatarSource: source
            });
          }
        });
      }


    toggleUploadAnim() {
        this.setState({ ...this.state, uploading: !this.state.uploading });
    }  

    render() {
        return (
            <ScrollView style={{ backgroundColor: '#fff' }} >
                <View style={{ flex: 1 }}>
                    <Text style={styles.centerHeader}>
                       Please fill up the form and send your report 
                    </Text>
                    
                    <FormLabel>Comments</FormLabel>
                    <FormInput multiline ref="comments"	onChangeText={(comments) => this.setState({ ...this.state, comments })} />

                    <Button    
                        icon={{
                            name: 'camera',
                            size: 24,
                            color: 'white'
                        }}
                        onPress={this.selectPhotoTapped.bind(this)} 
                        title="Take a photo"
                        titleStyle={{ fontWeight: '700' }}
                        containerStyle={{ marginTop: 20 }}
                    />

                    <Button
                        onPress={this.toggleUploadAnim.bind(this)}
                        loading={this.state.uploading}
                        title="Report"
                        loadingProps={{ size: 'large', color: 'rgba(111, 202, 186, 1)' }}
                        titleStyle={{ fontWeight: '700' }}
                        buttonStyle={{
                            backgroundColor: '#8CC63E',
                            marginTop: 10
                        }}
                    />
                    <Button
                        onPress={this.toggleUploadAnim.bind(this)}
                        loading={this.state.uploading}
                        title="Cancel"
                        loadingProps={{ size: 'large', color: 'rgba(111, 202, 186, 1)' }}
                        titleStyle={{ fontWeight: '700' }}
                        buttonStyle={{
                            backgroundColor: '#E8656A',
                            marginTop: 10
                        }}
                    />
                </View >
            </ScrollView>
           );
    }
}

const styles = {
    centerHeader: { marginTop: 10, fontSize: 16, alignSelf: 'center' },
    buttonStyle: {                        
        width: 200,
        height: 45,
        borderColor: 'transparent',
        borderWidth: 0,
        borderRadius: 5
    }
  };

export default ReportForm;
