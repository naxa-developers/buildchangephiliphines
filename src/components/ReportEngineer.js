import React, { Component } from "react";
import {
  View,
  ScrollView,
  Text,
  AsyncStorage,
  Alert,
  TextInput,
  Image,
  Dimensions,
  Picker
} from "react-native";
import { Button } from "react-native-elements";
import { connect } from "react-redux";
import ImagePicker from "react-native-image-picker";
import { Actions } from "react-native-router-flux";
import { strings } from "./../../locales/strings";
import { saveToDraftsCollection, deleteFromDraftsCollection } from "../actions";

class ReportEngineer extends Component {
  state = {
    avatarSource: null,
    category: "progress",
    type: "urgent",
    comment: "",
    uploading: false,
    saving: false,
    image: {},
    images: []
  };

  componentWillMount() {
    this.getLocale();
    const filtered = this.props.drafts.filter(draft => {
      return (
        draft.subStepId === this.props.substep &&
        draft.stepId === this.props.stepId &&
        draft.siteId === this.props.siteId
      );
    });
    if (filtered.length !== 0) {
      // this.setState({ comments: filtered[0].comment, uri: filtered[0].uri });
      this.setState({
        comment: filtered[0].comment,
        image: filtered[0].image,
        images: filtered[0].images
      });
    }
  }

  // selectPhotoTapped() {
  //   const options = {
  //     quality: 1.0,
  //     maxWidth: 500,
  //     maxHeight: 500,
  //     storageOptions: {
  //       skipBackup: true
  //     }
  //   };

  //   ImagePicker.showImagePicker(options, response => {
  //     if (response.didCancel) {
  //       console.log("User cancelled photo picker");
  //     } else if (response.error) {
  //       console.log("ImagePicker Error: ", response.error);
  //     } else if (response.customButton) {
  //       console.log("User tapped custom button: ", response.customButton);
  //     } else {
  //       let source = { uri: response.uri };
  //       this.props.saveToDraftsCollection({
  //         siteId: this.props.siteId,
  //         stepId: this.props.stepId,
  //         subStepId: this.props.substep,
  //         comment: this.state.comments,
  //         uri: response.uri
  //       });
  //       this.setState({ ...this.state, uri: response.uri });

  //       // You can also display the image using data:
  //       // let source = { uri: 'data:image/jpeg;base64,' + response.data };

  //       this.setState({
  //         avatarSource: source
  //       });
  //     }
  //   });
  // }

  async getLocale() {
    try {
      const value = await AsyncStorage.getItem("locale");
      if (value) {
        strings.setLanguage(value);
      }
    } catch (error) {
      console.log("error", error);
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
        this.props.saveToDraftsCollection({
          draftUserId: this.props.currentUserId,
          siteId: this.props.siteId,
          stepId: this.props.stepId,
          subStepId: this.props.substep.id,
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
      maxFiles: 5,
      waitAnimationEnd: false,
      includeExif: true,
      forceJpg: true
    })
      .then(images => {
        this.props.saveToDraftsCollection({
          draftUserId: this.props.currentUserId,
          siteId: this.props.siteId,
          stepId: this.props.stepId,
          subStepId: this.props.substep.id,
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

  uploadComment(checklist) {
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

      const url = "http://bccms.naxa.com.np/core/api/report/";

      const formdata = new FormData();
      formdata.append("comment", this.state.comment);
      formdata.append("user", userID);
      formdata.append("substep", this.props.substep);
      formdata.append("site", this.props.siteId);
      formdata.append("step", this.props.stepId);
      formdata.append("category", this.state.category);
      formdata.append("type", this.state.type);

      if (this.state.images.length > 0) {
        this.state.images.forEach((image, i) => {
          formdata.append(`image${i}`, {
            uri: image.uri,
            type: "image/jpeg",
            name: "comment.jpeg"
          });
        });
      }

      if (this.state.image && Object.keys(this.state.image).length > 0) {
        formdata.append(`image0`, {
          uri: this.state.image.uri,
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
            this.setState({
              ...this.state,
              uploading: false,
              comment: "",
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
              draftUserId: this.props.currentUserId,
              subStepId: this.props.substep
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
          console.log(json);
        })
        .catch(error => console.log(error));
    });
  }

  toggleUploadAnim() {
    this.setState({ ...this.state, uploading: !this.state.uploading });
  }

  deleteDraft = () => {
    const { id, currentUserId } = this.props.substep;
    this.props.deleteFromDraftsCollection({
      draftUserId: currentUserId,
      subStepId: id
    });
    Actions.pop();
    showMessage({
      message: "Report Deleted",
      type: "danger"
    });
  };

  handleTextChange = comment => {
    this.props.saveToDraftsCollection({
      draftUserId: this.props.currentUserId,
      siteId: this.props.siteId,
      stepId: this.props.stepId,
      subStepId: this.props.substep.id,
      comment: comment,
      image: this.state.image,
      images: this.state.images
    });
    this.state.comment.length > 1
      ? this.setState({ ...this.state, comment, saving: true })
      : this.setState({ ...this.state, comment, saving: false });
  };

  renderImage = image => {
    return <Image style={styles.image} source={{ uri: image.uri }} />;
  };

  render() {
    console.log("ReportEngineer Rendered");
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
              onChangeText={comment => this.handleTextChange(comment)}
              onBlur={() => this.setState({ saving: false })}
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
                fontSize: 16
              }}
              multiline
              autoFocus
            />
            {this.state.saving && (
              <Text style={{ color: "#777", fontSize: 12, marginTop: 5 }}>
                {" "}
                Saving...
              </Text>
            )}
          </View>

          <View style={{ marginLeft: 15 }}>
            <Text>Report Category</Text>
            <Picker
              selectedValue={this.state.category}
              style={{ height: 50, width: "100%" }}
              onValueChange={(itemValue, itemIndex) =>
                this.setState({ category: itemValue })
              }
            >
              <Picker.Item label="Progress Update" value="progress" />
              <Picker.Item label="Issues and Concerns" value="issues" />
              <Picker.Item label="Questions Queries" value="queries" />
            </Picker>
          </View>

          <View style={{ marginLeft: 15 }}>
            <Text>Report Type</Text>
            <Picker
              selectedValue={this.state.type}
              style={{ height: 50, width: "100%" }}
              onValueChange={(itemValue, itemIndex) =>
                this.setState({ type: itemValue })
              }
            >
              <Picker.Item label="Urgent" value="urgent" />
              <Picker.Item label="Alert" value="alert" />
              <Picker.Item label="Update" value="update" />
            </Picker>
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
            onPress={
              this.props.inDraft ? this.deleteDraft : () => Actions.pop()
            }
            title={
              this.props.inDraft ? strings.action_delete : strings.action_cancel
            }
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

  saveToDraft = () => {
    const imageArray = Object.keys(this.state.image);
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
  };
  componentWillUnmount() {
    if (!this.props.inDraft) {
      this.saveToDraft();
    }
  }
}

const styles = {
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
    height: 200,
    overflow: "visible",
    margin: 15,
    marginBottom: 0
  }
};

const mapStateToProps = state => {
  const { sites } = state.schoolList.data;
  const { selectedSchoolId } = state.currentSelectedSchool;
  const { currentUserId } = state.currentUserGroup;

  const found = sites.find(function(element) {
    return element.id === selectedSchoolId;
  });

  return {
    siteId: found.id,
    userId: state.currentUserGroup.currentUserId,
    drafts: state.drafts.drafts,
    currentUserId
  };
};

export default connect(
  mapStateToProps,
  { saveToDraftsCollection, deleteFromDraftsCollection }
)(ReportEngineer);
