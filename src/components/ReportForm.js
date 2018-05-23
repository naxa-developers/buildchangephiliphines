import React, { Component } from 'react';
import { View, 
    ScrollView, 
    Text,
    AsyncStorage,
    Alert
} from 'react-native';
import { Button, FormLabel, FormInput, FormValidationMessage } from 'react-native-elements';
import ImagePicker from 'react-native-image-picker';
import { Actions } from 'react-native-router-flux';

class ReportForm extends Component {

    state = {
        avatarSource: null,
        comments: '',
        uploading: false,
        uri: null
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
            this.setState({ ...this.state, uri: response.uri });
 
            // You can also display the image using data:
            // let source = { uri: 'data:image/jpeg;base64,' + response.data };
    
            this.setState({
              avatarSource: source
            });
          }
        });
    }

    uploadComment(checklist) {
        const { id } = checklist;
      
        if (!this.state.comments || !this.state.uri) {
            return;  
        }
        
        this.setState({ ...this.state, uploading: true });
        AsyncStorage.multiGet(['user_id', 'token'])
        .then((user) => {
            
            let userID,token;
          
            if (user[0][0] === 'user_id') {
                userID = user[0][1];
            } else if (user[1][0] === 'user_id'){
                userID = user[1][1];
            }

            if (user[0][0] === 'token') {
                userID = user[0][1];
            } else if (user[1][0] === 'token'){
                token = user[1][1];
            }
            console.log(userID);
            console.log(token);
            
            const url = 'http://bccms.naxa.com.np/core/api/report/';

            const formdata = new FormData();
            formdata.append('comment', this.state.comments);
            formdata.append('user', userID);
            formdata.append('checklist', id);

            formdata.append('photo', {
                uri: this.state.uri,
                type: 'image/jpeg', 
                name: 'comment.jpeg'
              });
            
            const req = {
				method: 'POST',
				headers: {
                     Authorization: 'token ' + token,
                    'Content-Type': 'multipart/form-data',
                },
                
				body: formdata,
            };

            fetch(url, req)
            .then((response => {
				if (response.ok) {
                    console.log('response ok');
                    this.setState({ ...this.state, uploading: false });
                    this.setState({ ...this.state, comments: '' });
                    Alert.alert('Uploaded Sucess'
                        , 'Your report has been recorded. ',
                        [
                            { text: 'Close', onPress: () => Actions.pop(), style: 'cancel' },
                        ],
                    );
                    return response;
                } 
                

                this.setState({ ...this.state, uploading: false });
                Alert.alert('Uploaded Failed'
                , 'Check your internet connection and try again',
                [
                    {text: 'Close', onPress: () => console.log('Cancel Pressed'), style: 'cancel'},
                ],
                );
           
                console.log('response error');
				const error = new Error(response.statusText);
				error.response = response;
				throw error;
            }))
            .then((response) => response.json())
            .then((json) => {
                console.log(json);
            })
            .catch((error) => console.log(error));
            console.log(req);
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
                    <FormInput 
                        multiline 
                        ref="comments"	
                        onChangeText={(comments) => this.setState({ ...this.state, comments })}
                    />
                    < FormValidationMessage containerStyle={{marginBottom: 4 }}> Comments cannot be empty </FormValidationMessage>
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
                        onPress={this.uploadComment.bind(this, this.props.checklist)}
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
                        onPress={() => Actions.pop()}
                        title="Cancel"
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
