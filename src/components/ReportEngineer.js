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
import ImagePicker from "react-native-image-crop-picker";
import { Actions } from "react-native-router-flux";
import { showMessage } from "react-native-flash-message";
import GestureRecognizer from "react-native-swipe-gestures";
import { strings } from "./../../locales/strings";
import { saveToDraftsCollection, deleteFromDraftsCollection } from "../actions";

class ReportEngineer extends Component {
  state = {
    avatarSource: null,
    category: "0",
    type: "Urgent",
    comment: "",
    uploading: false,
    saving: false,
    images: []
  };

  componentDidMount() {
    this.getLocale();
    const filtered = this.props.drafts.filter(draft => {
      return (
        draft.subStepId === this.props.substep &&
        draft.stepId === this.props.stepId &&
        draft.siteId === this.props.siteId
      );
    });
    if (filtered.length !== 0) {
      this.setState({
        comment: filtered[0].comment,
        category: filtered[0].category ? filtered[0].category : "0",
        type: filtered[0].type ? filtered[0].type : "Urgent",
        images: filtered[0].images
      });
    }
  }

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

  askForMorePhoto = () => {
    Alert.alert("Do you want to take more photos ?", null, [
      { text: "Yes", onPress: () => this.pickSingleWithCamera(false) },
      {
        text: "No",
        onPress: () => console.log("Cancel Pressed"),
        style: "cancel"
      }
    ]);
  };

  pickSingleWithCamera(cropping, mediaType = "photo") {
    if (this.state.images.length >= 5) {
      showMessage({
        message: "You can only select 5 images.",
        type: "info"
      });
      return;
    }
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
          category: this.state.category,
          type: this.state.type,
          images: [
            ...this.state.images,
            {
              uri: image.path,
              width: image.width,
              height: image.height,
              mime: image.mime
            }
          ]
        });
        this.setState(
          {
            images: [
              ...this.state.images,
              {
                uri: image.path,
                width: image.width,
                height: image.height,
                mime: image.mime
              }
            ]
          },
          () => this.askForMorePhoto()
        );
      })
      .catch(e => alert(e));
  }

  pickMultiple = () => {
    if (this.state.images.length >= 5) {
      showMessage({
        message: "You can only select 5 images.",
        type: "info"
      });
      return;
    }
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
          category: this.state.category,
          type: this.state.type,
          images: images
            .map(i => {
              return {
                uri: i.path,
                width: i.width,
                height: i.height,
                mime: i.mime
              };
            })
            .concat(this.state.images)
            .filter((image, i) => i < 5)
        });
        this.setState({
          images: images
            .map(i => {
              return {
                uri: i.path,
                width: i.width,
                height: i.height,
                mime: i.mime
              };
            })
            .concat(this.state.images)
            .filter((image, i) => i < 5)
        });
      })
      .catch(e => alert(e));
  };

  selectPhoto = () => {
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

      // const url = "http://bccms.naxa.com.np/core/api/report/";
      const url = "http://bccms.naxa.com.np/core/api/report-image";

      const formdata = new FormData();
      formdata.append("comment", this.state.comment);
      formdata.append("user", userID);
      formdata.append("substep", this.props.substep);
      formdata.append("site", this.props.siteId);
      formdata.append("step", this.props.stepId);
      formdata.append("category", this.state.category);
      formdata.append("type", this.state.type);

      if (this.state.images.length > 0) {
        this.state.images.forEach(image => {
          formdata.append(`image`, {
            uri: image.uri,
            type: "image/jpeg"
          });
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

      // for (var value of formdata.values()) {
      //   console.log(value);
      // }

      fetch(url, req)
        .then(response => {
          if (response.ok) {
            this.setState({
              ...this.state,
              uploading: false,
              comment: "",
              category: "0",
              type: "Urgent",
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
        .catch(error => console.log("error", error));
    });
  }

  toggleUploadAnim() {
    this.setState({ ...this.state, uploading: !this.state.uploading });
  }

  deleteDraft = () => {
    const {
      substep: { id },
      userId
    } = this.props;
    this.props.deleteFromDraftsCollection({
      draftUserId: userId,
      subStepId: id
    });
    Actions.pop();
    showMessage({
      message: "Report Deleted",
      type: "danger"
    });
  };

  handleTextChange = event => {
    const { text } = event.nativeEvent;
    this.props.saveToDraftsCollection({
      draftUserId: this.props.currentUserId,
      siteId: this.props.siteId,
      stepId: this.props.stepId,
      subStepId: this.props.substep.id,
      comment: text,
      category: this.state.category,
      type: this.state.type,
      images: this.state.images
    });
    text.trim().length > 0
      ? this.setState({ ...this.state, comment: text, saving: true })
      : this.setState({ ...this.state, comment: text, saving: false });
  };

  askForDelete = i => {
    Alert.alert("Do you want delete the photo ?", null, [
      { text: "Yes", onPress: () => this.deleteImg(i) },
      {
        text: "No",
        onPress: () => console.log("Cancel Pressed"),
        style: "cancel"
      }
    ]);
  };

  deleteImg = i => {
    const filteredImages = this.state.images.filter((image, ind) => i !== ind);
    this.setState({
      images: filteredImages
    });
  };

  renderImage = (image, i) => {
    return (
      <GestureRecognizer
        onSwipeLeft={() => this.askForDelete(i)}
        onSwipeRight={() => this.askForDelete(i)}
      >
        <Image style={styles.image} source={{ uri: image.uri }} />
      </GestureRecognizer>
    );
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
              onChange={this.handleTextChange}
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
              <Picker.Item label="Progress Update" value="0" />
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
              <Picker.Item label="Urgent" value="Urgent" />
              <Picker.Item label="Alert" value="Alert" />
              <Picker.Item label="Update" value="Update" />
            </Picker>
          </View>
          <Button
            icon={{
              name: "camera",
              size: 24,
              color: "white"
            }}
            onPress={this.selectPhoto}
            title={strings.view_take_photo}
            titleStyle={{ fontWeight: "700" }}
            containerStyle={{ marginTop: 20 }}
          />

          {this.state.images
            ? this.state.images.map((img, i) => (
                <View key={img.uri}>{this.renderImage(img, i)}</View>
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
    if (this.state.comment.length > 0) {
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
