import React from "react";
import {
  StyleSheet,
  Dimensions,
  View,
  Text,
  TouchableOpacity
} from "react-native";
import { connect } from "react-redux";
import Pdf from "react-native-pdf";
import Icon from "react-native-vector-icons/FontAwesome";
import { Actions } from "react-native-router-flux";
import RNFetchBlob from "react-native-fetch-blob";

class SitePlan extends React.Component {
  constructor() {
    super();
    this.state = {
      source: {}
    };
  }

  componentWillMount() {
    RNFetchBlob.fs
      .exists(
        "/storage/emulated/0/Android/data/com.naxa.buildchangephilippines/build_change_philippines"
      )
      .then(exist => {
        console.log(exist);
        if (exist) {
          this.setState({
            source: {
              uri: this.props.path.replace(
                "http://bccms.naxa.com.np",
                "file:///storage/emulated/0/Android/data/com.naxa.buildchangephilippines/build_change_philippines"
              ),
              cache: true
            }
          });
        } else if (!exist) {
          console.log("chiana");
          this.setState({
            source: {
              uri: this.props.path.replace(
                "file:///storage/emulated/0/Android/data/com.naxa.buildchangephilippines/build_change_philippines",
                "http://bccms.naxa.com.np"
              ),
              cache: true
            }
          });
        }
      })
      .catch(() => {
        console.log("error while checking file");
      });
  }
  render() {
    console.log("SitePlan Render");

    return (
      <View style={styles.container}>
        <Pdf
          source={this.state.source}
          onLoadComplete={numberOfPages => {
            console.log(`number of pages: ${numberOfPages}`);
          }}
          onPageChanged={page => {
            console.log(`current page: ${page}`);
          }}
          onError={error => {
            console.log(error);
          }}
          style={styles.pdf}
        />
        {this.props.value !== undefined && (
          <TouchableOpacity
            style={styles.button}
            onPress={() => Actions.GuidelineCategoryScene()}
          >
            <Icon name={"th-large"} size={35} style={styles.iconStyle} />
            <Text style={styles.subtext}>Navigate To</Text>
            <Text style={styles.text}>Construction Materials</Text>
          </TouchableOpacity>
        )}
      </View>
    );
  }
}

const mapStateToProps = state => {
  console.log("ShowDocumentsko_mapstatetoprops_bhitra");
  console.log(state);
  return {
    selectedSchoolId: state.currentSelectedSchool.selectedSchoolId
  };
};

export default connect(mapStateToProps)(SitePlan);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "flex-start"
  },
  pdf: {
    flex: 1,
    width: Dimensions.get("window").width
  },
  button: {
    margin: 15,
    paddingTop: 15,
    paddingBottom: 15,
    paddingRight: 20,
    backgroundColor: "#8cc63f",
    position: "relative",
    paddingLeft: 60
  },
  text: {
    fontWeight: "bold",
    fontSize: 16,
    color: "white"
  },
  subtext: {
    color: "white"
  },
  iconStyle: {
    position: "absolute",
    left: 15,
    top: 20,
    color: "white"
  }
});
