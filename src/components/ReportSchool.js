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
import { showMessage, hideMessage } from "react-native-flash-message";
import { Actions } from "react-native-router-flux";
import { strings } from "./../../locales/strings";
import { saveToDraftsCollection, deleteFromDraftsCollection } from "../actions";

class ReportSchool extends Component {
  state = {
    avatarSource: null,
    comment: "",
    uploading: false,
    image: {},
    images: []
  };

  componentWillMount() {
    this.getLocale();
    const filteredSite = this.props.drafts.filter(draft => {
      return draft.siteId === this.props.siteId;
    });
    if (filteredSite.length > 0) {
      filteredSite.forEach(site => {
        if (!site.hasOwnProperty("stepId")) {
          this.setState({
            comment: site.comment,
            image: site.image,
            images: site.images
          });
        }
      });
    }
    // this.setState({
    //   comment: filteredSite.comment,
    //   image: filteredSite.image,
    //   images: filteredSite.images
    // });
    // if (filtered.length !== 0) {
    //   filtered.forEach(each => {
    //     console.log("rap song");
    //     if (!each.hasOwnProperty("stepId")) {
    //       this.setState({ comments: each.comment, uri: each.uri });
    //       console.log(each);
    //     }
    //   });
    // }
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
        this.props.saveToDraftsCollection({
          siteId: this.props.siteId,
          comment: this.state.comment ? this.state.comment : "",
          image: {
            uri: image.path,
            width: image.width,
            height: image.height,
            mime: image.mime
          },
          images: []
        });
        this.setState({
          image: {
            uri: image.path,
            width: image.width,
            height: image.height,
            mime: image.mime
          },
          images: []
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
        this.props.saveToDraftsCollection({
          siteId: this.props.siteId,
          comment: this.state.comment ? this.state.comment : "",
          image: {},
          images: images.map(i => {
            return {
              uri: i.path,
              width: i.width,
              height: i.height,
              mime: i.mime
            };
          })
        });
        this.setState({
          image: {},
          images: images.map(i => {
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
        text: "Take Photo...",
        onPress: () => this.pickSingleWithCamera(false)
      },
      {
        text: "Choose from Library...",
        onPress: () => this.pickMultiple()
      }
    ]);
  };

  renderImage = image => {
    return <Image style={styles.image} source={{ uri: image.uri }} />;
  };

  async getLocale() {
    return await AsyncStorage.getItem("locale").then(value => {
      strings.setLanguage(value);
    });
  }

  uploadComment() {
    if (!this.state.comment) {
      return;
    }

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

      const url = "http://bccms.naxa.com.np/core/api/site-report/";

      const formdata = new FormData();
      formdata.append("comment", this.state.comment);
      formdata.append("user", userID);
      formdata.append("site", this.props.siteId);

      if (this.state.images.length > 0) {
        this.state.images.forEach((image, i) => {
          formdata.append(`photo${i}`, {
            uri: image.uri,
            type: "image/jpeg",
            name: "comment.jpeg"
          });
        });
      }

      if (this.state.image && Object.keys(this.state.image).length > 0) {
        formdata.append(`photo`, {
          uri: this.state.image.uri,
          type: "image/jpeg",
          name: "comment.jpeg"
        });
      }

      console.log("ReportSchool formdata", formdata);

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
            // this.setState({ ...this.state, uploading: false });
            // this.setState({ ...this.state, comments: "", uri: null });
            this.setState({
              ...this.state,
              comment: "",
              uploading: false,
              image: {},
              images: []
            });
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

          const error = new Error(response.statusText);
          error.response = response;
          throw error;
        })
        .then(response => response.json())
        .then(json => {
          console.log("json in comment upload", json);
        })
        .catch(error => console.log(error));
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
              onChangeText={comment => {
                this.props.saveToDraftsCollection({
                  siteId: this.props.siteId,
                  comment: comment,
                  image: this.state.image,
                  images: this.state.images
                });
                this.setState({ ...this.state, comment });
              }}
              placeholder={strings.error_field_cannot_be_empty}
              ref="comments"
              returnKeyType="next"
              value={this.state.comment}
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
          {Object.keys(this.state.image).length > 0
            ? this.renderImage(this.state.image)
            : null}

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
  componentWillUnmount() {
    const imageArray = this.state.image
      ? Object.keys(this.state.image)
      : Object.keys({});
    // const imageArray = Object.keys(this.state.image);
    if (
      this.state.comment.length > 0 ||
      this.state.images.length > 0 ||
      imageArray.length > 0
    ) {
      showMessage({
        message: "Report Saved to Drafts",
        type: "info"
      });
    }
  }
}

const mapStateToProps = state => {
  const { sites } = state.schoolList.data;
  const { selectedSchoolId } = state.currentSelectedSchool;
  const found = sites.find(function(element) {
    return element.id === selectedSchoolId;
  });

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
