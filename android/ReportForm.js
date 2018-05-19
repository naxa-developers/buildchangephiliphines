import React, { Component } from 'react';
import { View, ScrollView, Text } from 'react-native';
import { Button } from 'react-native-elements';
import ImagePicker from 'react-native-image-picker';
import { Input, CardSection } from './common';

class ReportForm extends Component {

    state = {
        avatarSource: null,
        videoSource: null,
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
            <View style={{ flex: 1 }}>
            <ScrollView
                style={{ backgroundColor: '#fff' }}
            >
        
              <Text style={styles.centerHeader}>
               Please fill up the form and send your report 
               </Text>
        
                <CardSection>
                    <Input 
                        label="Your Name" 
                    />
                </ CardSection>
                
                <CardSection>
                    <Input label="Your Comment" />
                </ CardSection>
                <CardSection>
                <Button
                 icon={{
                    name: 'camera',
                    size: 24,
                    color: 'white'
                  }}
                    onPress={this.selectPhotoTapped.bind(this)} 
                    title="Open Camera"
                    buttonStyle={{   
                        width: 200,
                        height: 45,
                        borderColor: 'transparent',
                        borderWidth: 0,
                        borderRadius: 5
                    }}
                    titleStyle={{ fontWeight: '700' }}
                    containerStyle={{ marginTop: 20 }}
                />
                </CardSection>
                <CardSection
                styles={{ marginTop: 120 }}
                >
                <Button
                    title="Cancel"
                
                    loadingProps={{ size: 'large', color: 'rgba(111, 202, 186, 1)' }}
                    titleStyle={{ fontWeight: '700' }}
                    buttonStyle={{
                        
                        width: 200,
                        height: 45,
                        borderColor: 'transparent',
                        borderWidth: 0,
                        borderRadius: 5
                    }}
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
                        width: 200,
                        height: 45,
                        borderColor: 'transparent',
                        borderWidth: 0,
                        borderRadius: 5
                    }}
                    containerStyle={{ marginTop: 20 }}
                />
                </CardSection>    
            
            </ScrollView> 
        </View >
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
