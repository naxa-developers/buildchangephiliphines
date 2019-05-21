import React, { Component } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Alert,
  Image
} from "react-native";
import { connect } from "react-redux";
import { Actions } from "react-native-router-flux";
import LinearGradient from "react-native-linear-gradient";
import Icon from "react-native-vector-icons/FontAwesome";
import { getLocalizedText } from "../../../locales/strings";

class Select5 extends Component {
  onSecondOptionPressed(user) {
    if (user === "Field Engineer") {
      Actions.StepList({
        title: getLocalizedText(
          "PINDOTA AN PAMAAGI PARA MAS MABARUAN AN PROSESO",
          "What Construction Step Do You Want to Check?"
        )
      });
    } else {
      Actions.StepList({
        title: getLocalizedText(
          "PINDOTA AN PAMAAGI PARA MAS MABARUAN AN PROSESO",
          "Click on the Stage to Learn More"
        )
      });
    }
  }

  render() {
    console.log("Select 5 render");
    return (
      <View style={styles.mainContainer}>
        <TouchableOpacity
          style={styles.reportContainer}
          onPress={() => Actions.ReportSchool()}
        >
          <Icon name={"file-text"} style={styles.iconStyle} />
        </TouchableOpacity>
        <TouchableOpacity
          style={[
            styles.subContainer,
            { backgroundColor: "#8cc63f", marginBottom: 5 }
          ]}
          onPress={() => Actions.DocumentList()}
        >
          <View style={styles.backgroundContainer}>
            <LinearGradient
              colors={["rgba(0,0,0,.7)", "rgba(255,255,255,.3)"]}
              style={styles.darkOverlay}
            />
            <Image
              style={styles.bgImage}
              source={require("../../../app_images/blueprint.jpg")}
              resizeMode={"stretch"}
            />
          </View>
          <View style={styles.contentStyle}>
            <Text style={styles.textBoldStyle}>
              {getLocalizedText(
                "GUSTO KO MAKITA AN PLANO",
                "I WANT TO LOOK AT THE BLUEPRINT"
              )}
            </Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity
          style={[
            styles.subContainer,
            { backgroundColor: "#8cc63f", marginTop: 5 }
          ]}
          onPress={this.onSecondOptionPressed.bind(this, this.props.user)}
        >
          <View style={styles.backgroundContainer}>
            <LinearGradient
              colors={["rgba(0,0,0,.7)", "rgba(255,255,255,.3)"]}
              style={styles.darkOverlay}
            />
            <Image
              style={styles.bgImage}
              source={require("../../../app_images/construction_stages.jpg")}
              resizeMode={"stretch"}
            />
          </View>
          <View style={styles.contentStyle}>
            <Text style={styles.textBoldStyle}>
              {getLocalizedText(
                "GUSTO KO MAKITA AN MGA PAMAAGI HAN PAG AYAD",
                "I WANT TO SEE THE CONSTRUCTION STAGES"
              )}
            </Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity
          style={[
            styles.subContainer,
            { backgroundColor: "#8cc63f", marginTop: 5 }
          ]}
          onPress={() => Actions.ShowMap()}
        >
          <View style={styles.backgroundContainer}>
            <LinearGradient
              colors={["rgba(0,0,0,.7)", "rgba(255,255,255,.3)"]}
              style={styles.darkOverlay}
            />
            <Image
              style={styles.bgImage}
              source={require("../../../app_images/map.jpg")}
              resizeMode={"stretch"}
            />
          </View>
          <View style={styles.contentStyle}>
            <Text style={styles.textBoldStyle}>
              {getLocalizedText(
                "GUSTO KO MAKITA AN AKON ESKWELAHAN HA MAPA",
                "I WANT TO SEE MY SCHOOL ON A MAP"
              )}
            </Text>
          </View>
        </TouchableOpacity>
      </View>
    );
  }
}

const mapStateToProps = state => {
  return {
    user: state.currentUserGroup.currentUserGroup
  };
};

export default connect(mapStateToProps)(Select5);

const styles = StyleSheet.create({
  darkOverlay: {
    position: "absolute",
    left: 0,
    top: 0,
    right: 0,
    bottom: 0,
    zIndex: 1
  },

  reportContainer: {
    position: "absolute",
    bottom: 10,
    right: 10,
    zIndex: 3,
    backgroundColor: "green",
    borderRadius: 40,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.8,
    shadowRadius: 5,
    elevation: 5
  },
  mainContainer: {
    flex: 1,
    margin: 10,
    position: "relative"
  },
  subContainer: {
    flex: 1,

    borderRadius: 5,
    position: "relative",
    overflow: "hidden"
  },
  iconStyle: {
    //color: 'rgba(0,0,0,.5)',
    color: "white",
    fontSize: 24,
    width: 60,
    height: 60,
    lineHeight: 60,
    borderRadius: 30,
    //backgroundColor: 'rgba(255,255,255,.9)',
    backgroundColor: "green",
    textAlign: "center",
    justifyContent: "center"
  },
  textStyle: {
    color: "white",
    fontSize: 18
  },
  textBoldStyle: {
    color: "white",
    fontSize: 22,
    fontWeight: "bold",
    textAlign: "center"
  },
  backgroundContainer: {
    position: "absolute",
    left: 0,
    top: 0,
    right: 0,
    bottom: 0
  },
  bgImage: {
    flex: 1,
    alignSelf: "stretch",
    width: undefined,
    height: undefined
  },
  contentStyle: {
    flex: 1,
    padding: 20,
    justifyContent: "flex-start",
    backgroundColor: "rgba(0,0,0,.1)",
    position: "relative",
    zIndex: 3
  }
});
