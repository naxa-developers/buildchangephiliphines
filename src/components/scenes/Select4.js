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
import Icon from "react-native-vector-icons/FontAwesome";
import { getLocalizedText } from "../../../locales/strings";

class Select4 extends Component {
  showPdf(array, category) {
    array.forEach(ea => {
      if (ea.name === category) {
        if (ea.pdf === "") {
          Alert.alert("No pdf available for this option!");
        } else {
          if (ea.name === "CONSTRUCTION QUALITY") {
            Actions.ShowDocuments({
              path:
                "file:///storage/emulated/0/Android/data/com.naxa.buildchangephilippines/build_change_philippines/media/" +
                ea.pdf,
              value: "ram"
            });
          } else {
            Actions.ShowDocuments({
              path:
                "file:///storage/emulated/0/Android/data/com.naxa.buildchangephilippines/build_change_philippines/media/" +
                ea.pdf
            });
          }
        }
      }
    });
  }

  render() {
    return (
      <View style={styles.mainContainer}>
        <TouchableOpacity
          style={[
            styles.subContainer,
            { backgroundColor: "#8cc63f", marginBottom: 5 }
          ]}
          onPress={this.showPdf.bind(this, this.props.data, "CONFIGURATION")}
        >
          <View style={styles.backgroundContainer}>
            <Image
              style={styles.bgImage}
              source={require("../../../app_images/Configuration.jpg")}
              resizeMode={"stretch"}
            />
          </View>
          <View style={styles.contentStyle}>
            <Icon name={"info"} size={35} style={styles.iconStyle} />
            <Text style={styles.textBoldStyle}>
              {getLocalizedText("KONFIGURASYON", "Configuration")}
            </Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity
          style={[
            styles.subContainer,
            { backgroundColor: "#8cc63f", marginTop: 5 }
          ]}
          onPress={this.showPdf.bind(this, this.props.data, "CONNECTION")}
        >
          <View style={styles.backgroundContainer}>
            <Image
              style={styles.bgImage}
              source={require("../../../app_images/Connection.jpg")}
              resizeMode={"stretch"}
            />
          </View>
          <View style={styles.contentStyle}>
            <Icon name={"info"} size={35} style={styles.iconStyle} />
            <Text style={styles.textBoldStyle}>
              {getLocalizedText("KONEKSYON", "Connection")}
            </Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity
          style={[
            styles.subContainer,
            { backgroundColor: "#8cc63f", marginTop: 5 }
          ]}
          onPress={this.showPdf.bind(
            this,
            this.props.data,
            "CONSTRUCTION QUALITY"
          )}
        >
          <View style={styles.backgroundContainer}>
            <Image
              style={styles.bgImage}
              source={require("../../../app_images/construction_quality.jpg")}
              resizeMode={"stretch"}
            />
          </View>
          <View style={styles.contentStyle}>
            <Icon name={"info"} size={35} style={styles.iconStyle} />
            <Text style={styles.textBoldStyle}>
              {getLocalizedText("KALIDAD HAN PAG AYAD", "Construction Quality")}
            </Text>
          </View>
        </TouchableOpacity>
      </View>
    );
  }
}

const mapStateToProps = state => {
  return {
    data: state.guideLineCategory.data[1].build_a_house[0].my_house_strong
  };
};

export default connect(mapStateToProps)(Select4);

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    margin: 10
  },
  subContainer: {
    flex: 1,

    borderRadius: 5,
    position: "relative",
    overflow: "hidden"
  },
  iconStyle: {
    color: "rgba(0,0,0,.5)",
    fontSize: 35,
    marginBottom: 20,
    width: 70,
    height: 70,
    lineHeight: 70,
    borderRadius: 70,
    backgroundColor: "rgba(255,255,255,.9)",
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
    fontWeight: "bold"
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
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0,0,0,.1)"
  }
});
