import React, { Component } from "react";
import {
  View,
  ScrollView,
  Text,
  AsyncStorage,
  Alert,
  TextInput,
  Dimensions,
  Image,
  StyleSheet
} from "react-native";
import { Button } from "react-native-elements";
import { connect } from "react-redux";
import ImagePicker from "react-native-image-crop-picker";
import { Actions } from "react-native-router-flux";
import { strings } from "./../../locales/strings";
import { saveToDraftsCollection, deleteFromDraftsCollection } from "../actions";

class ReportSchool extends Component {
  state = {
    avatarSource: null,
    comments: "",
    uploading: false,
    image: null,
    images: []
  };

  componentWillMount() {
    this.getLocale();
    const filtered = this.props.drafts.filter(draft => {
      return draft.siteId === this.props.siteId;
    });
    console.log("data", filtered);
    if (filtered.length !== 0) {
      filtered.forEach(each => {
        console.log("rap song");
        if (!each.hasOwnProperty("stepId")) {
          this.setState({ comments: each.comment, uri: each.uri });
          console.log(each);
        }
      });
    }
  }

  pickSingleWithCamera(cropping, mediaType = "photo") {
    ImagePicker.openCamera({
      cropping: cropping,
      width: 500,
      height: 500,
      includeExif: true,
      mediaType
    })
      .then(image => {
        console.log("received image", image);
        this.setState({
          image: {
            uri: image.path,
            width: image.width,
            height: image.height,
            mime: image.mime
          },
          images: null
        });
      })
      .catch(e => alert(e));
  }

  pickMultiple = () => {
    ImagePicker.openPicker({
      multiple: true,
      waitAnimationEnd: false,
      includeExif: true,
      forceJpg: true
    })
      .then(images => {
        this.setState({
          image: null,
          images: images.map(i => {
            console.log("received image", i);
            return {
              uri: i.path,
              width: i.width,
              height: i.height,
              mime: i.mime
            };
          })
        });
      })
      .catch(e => alert(e));
  };

  showAlert = () => {
    Alert.alert("Select photo", null, [
      {
        text: "Cancel",
        onPress: () => console.log("Cancel Pressed"),
        style: "cancel"
      },
      {
        text: "Take a photo...",
        onPress: () => this.pickSingleWithCamera(false)
      },
      {
        text: "Choose photos...",
        onPress: () => this.pickMultiple()
      }
    ]);
  };

  renderImage = image => {
    return <Image style={styles.image} source={image} />;
  };

  async getLocale() {
    return await AsyncStorage.getItem("locale").then(value => {
      strings.setLanguage(value);
    });
  }

  uploadComment() {
    console.log("uploadCommentko_bhitra");
    console.log(this.props);

    if (!this.state.comments) {
      return;
    }
    console.log("hello check return");
    this.setState({ ...this.state, uploading: true });
    AsyncStorage.multiGet(["user_id", "token"]).then(user => {
      let userID;
      let token;

      if (user[0][0] === "user_id") {
        userID = user[0][1];
      } else if (user[1][0] === "user_id") {
        userID = user[1][1];
      }

      if (user[0][0] === "token") {
        userID = user[0][1];
      } else if (user[1][0] === "token") {
        token = user[1][1];
      }
      console.log(userID);
      console.log(token);

      const url = "http://bccms.naxa.com.np/core/api/site-report/";

      const formdata = new FormData();
      formdata.append("comment", this.state.comments);
      formdata.append("user", userID);
      formdata.append("site", this.props.siteId);
      //step ra site pani thapne
      if (this.state.uri !== null) {
        formdata.append("photo", {
          uri: this.state.uri,
          type: "image/jpeg",
          name: "comment.jpeg"
        });
      }

      const req = {
        method: "POST",
        headers: {
          Authorization: "token " + token,
          "Content-Type": "multipart/form-data"
        },

        body: formdata
      };

      fetch(url, req)
        .then(response => {
          if (response.ok) {
            console.log("response ok");
            this.setState({ ...this.state, uploading: false });
            this.setState({ ...this.state, comments: "", uri: null });
            Alert.alert(
              strings.event_upload_success_title,
              strings.event_upload_sucess_text,
              [
                {
                  text: strings.action_close,
                  onPress: () => Actions.pop(),
                  style: "cancel"
                }
              ]
            );
            this.props.deleteFromDraftsCollection({
              siteId: this.props.siteId
            });
            return response;
          }

          this.setState({ ...this.state, uploading: false });
          Alert.alert(
            strings.event_upload_failed_title,
            strings.event_no_intenet_text,
            [
              {
                text: strings.action_close,
                onPress: () => console.log("Cancel Pressed"),
                style: "cancel"
              }
            ]
          );

          console.log("response error");
          const error = new Error(response.statusText);
          error.response = response;
          throw error;
        })
        .then(response => response.json())
        .then(json => {
          console.log(json);
        })
        .catch(error => console.log(error));
      console.log(req);
    });
  }

  toggleUploadAnim() {
    this.setState({ ...this.state, uploading: !this.state.uploading });
  }

  render() {
    return (
      <ScrollView style={{ backgroundColor: "#fff" }}>
        <View style={{ flex: 1 }}>
          <Text style={styles.centerHeader}>
            Please fill up the form and send your report
          </Text>
          <View
            style={{
              margin: 15,
              borderWidth: 1,
              padding: 10,
              paddingTop: 5,
              borderColor: "rgba(0,0,0,.3)"
            }}
          >
            <TextInput
              editable
              onChangeText={comments => {
                console.log("text", comments);
                this.props.saveToDraftsCollection({
                  siteId: this.props.siteId,
                  comment: comments,
                  image: this.state.image,
                  images: this.state.images
                });
                this.setState({ ...this.state, comments });
              }}
              placeholder={strings.error_field_cannot_be_empty}
              ref="comments"
              returnKeyType="next"
              value={this.state.comments}
              autoCapitalize="none"
              underlineColorAndroid="transparent"
              style={{
                textAlignVertical: "top",
                minHeight: 100,
                lineHeight: 24,
                fontWeight: "normal",
                fontSize: 14
              }}
              multiline
              autoFocus
            />
          </View>
          <Button
            icon={{
              name: "camera",
              size: 24,
              color: "white"
            }}
            onPress={this.showAlert}
            title={strings.view_take_photo}
            titleStyle={{ fontWeight: "700" }}
            containerStyle={{ marginTop: 20 }}
          />
          {this.state.image ? this.renderImage(this.state.image) : null}

          {this.state.images
            ? this.state.images.map(i => (
                <View key={i.uri}>{this.renderImage(i)}</View>
              ))
            : null}
          <Button
            onPress={this.uploadComment.bind(this, this.props)}
            loading={this.state.uploading}
            title={strings.action_report}
            loadingProps={{ size: "large", color: "rgba(111, 202, 186, 1)" }}
            titleStyle={{ fontWeight: "700" }}
            buttonStyle={{
              backgroundColor: "#8CC63E",
              marginTop: 10
            }}
          />
          <Button
            onPress={() => Actions.pop()}
            title={strings.action_cancel}
            titleStyle={{ fontWeight: "700" }}
            buttonStyle={{
              backgroundColor: "#E8656A",
              marginTop: 10
            }}
          />
        </View>
      </ScrollView>
    );
  }
}

const mapStateToProps = state => {
  console.log("reportform bhitra", state);
  const { sites } = state.schoolList.data;
  const { selectedSchoolId } = state.currentSelectedSchool;
  const found = sites.find(function(element) {
    return element.id === selectedSchoolId;
  });
  console.log("foundKO_value");
  console.log(found);
  return {
    siteId: found.id,
    userId: state.currentUserGroup.currentUserId,
    drafts: state.drafts.drafts
  };
};

export default connect(
  mapStateToProps,
  { saveToDraftsCollection, deleteFromDraftsCollection }
)(ReportSchool);

const styles = StyleSheet.create({
  centerHeader: { marginTop: 10, fontSize: 16, marginLeft: 15 },
  buttonStyle: {
    width: 200,
    height: 45,
    borderColor: "transparent",
    borderWidth: 0,
    borderRadius: 5
  },
  image: {
    width: Dimensions.get("window").width - 30,
    height: 250,
    overflow: "visible",
    margin: 15,
    marginBottom: 10,
    borderRadius: 8
  }
});
