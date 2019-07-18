import React from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  ActivityIndicator,
  AsyncStorage,
  Alert
} from "react-native";
import { Actions } from "react-native-router-flux";
import { connect } from "react-redux";
import Icon from "react-native-vector-icons/FontAwesome";
import { checkInternetConnection } from "react-native-offline";
import {
  storeAddress,
  openedAddressScene,
  getNotifications
} from "../../actions";
import { getLocalizedText } from "../../../locales/strings";

class Address extends React.Component {
  componentDidMount() {
    checkInternetConnection()
      .then(res => {
        if (res) {
          AsyncStorage.getItem("token").then(token => {
            this.props.openedAddressScene(token);
            this.props.getNotifications(token);
          });
        } else if (!res) {
          Alert.alert("No internet connection!");
        }
      })
      .catch(error => {
        console.log(error);
      });
  }

  render() {
    if (this.props.isLoading) {
      return (
        <View style={{ flex: 1, paddingTop: 20 }}>
          <ActivityIndicator />
        </View>
      );
    }

    return (
      <View style={styles.mainContainer}>
        <View style={styles.optionsContainer}>
          <TouchableOpacity
            style={styles.reportContainer}
            onPress={() => Actions.DraftList()}
          >
            <Icon name={"file-text"} style={styles.iconStyle} />
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.option, { marginBottom: 10 }]}
            onPress={() => {
              this.props.storeAddress({ selectedAddress: "Daram" });
              Actions.Successful_Login();
            }}
          >
            <Text style={styles.textStyle}>Daram, Samar</Text>
            <Image
              style={styles.image}
              source={require("../../../app_images/daram.jpg")}
              resizeMode={"stretch"}
            />
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.option, { marginBottom: 10 }]}
            onPress={() => {
              this.props.storeAddress({ selectedAddress: "Zumarraga" });

              Actions.Successful_Login();
            }}
          >
            <Text style={styles.textStyle}>Zumarraga, Samar</Text>
            <Image
              style={styles.image}
              source={require("../../../app_images/zumarraga.jpg")}
              resizeMode={"stretch"}
            />
          </TouchableOpacity>
          {this.props.currentUserGroup === "Community Member" && (
            <TouchableOpacity
              style={styles.pdfOption}
              onPress={() =>
                Actions.ShowDocuments({
                  title: "Standard Dep Ed School Design",
                  path:
                    "file:///storage/emulated/0/Android/data/com.naxa.buildchangephilippines/build_change_philippines/media/" +
                    this.props.pdf[0].pdf
                })
              }
            >
              <Text style={styles.optionTextStyle}>
                {getLocalizedText(
                  "GUSTO KO MAKIT.AN PLANO",
                  "I want to look at a"
                )}
              </Text>
              <Text style={[styles.optionTextStyle, { fontWeight: "bold" }]}>
                {getLocalizedText(
                  "HIT USA KA ESKWELAHAN NA MAY KALIDAD",
                  "Standard School Design"
                )}
              </Text>
            </TouchableOpacity>
          )}
        </View>
      </View>
    );
  }
}

const mapStateToProps = state => {
  return {
    isLoading: state.pdf.isLoading,
    currentUserGroup: state.currentUserGroup.currentUserGroup,
    pdf: state.pdf.data
  };
};

export default connect(
  mapStateToProps,
  { openedAddressScene, storeAddress, getNotifications }
)(Address);

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    backgroundColor: "white",
    padding: 8
  },
  promptContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center"
  },
  optionsContainer: {
    backgroundColor: "white",
    flex: 10,
    justifyContent: "space-between"
  },
  option: {
    backgroundColor: "#5184ac",
    flex: 2,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 5,
    overflow: "hidden",
    position: "relative"
  },
  pdfOption: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "rgba(0,0,0,.1)",

    backgroundColor: "#8cc63f",
    borderRadius: 5
  },
  textStyle: {
    textAlign: "center",
    fontWeight: "bold",
    color: "#FFFFFF",
    fontSize: 24,
    position: "absolute",
    zIndex: 2,
    textShadowColor: "rgba(0, 0, 0, .5)",
    textShadowOffset: { width: 0, height: 1 },
    textShadowRadius: 10
  },
  optionTextStyle: {
    textAlign: "center",
    color: "white",
    fontSize: 18
  },
  image: {
    flex: 1,
    alignSelf: "stretch",
    width: undefined,
    height: undefined
  },
  imageOverlay: {
    backgroundColor: "rgba(0,0,0,.1)",
    position: "absolute",
    left: 0,
    top: 0,
    right: 0,
    bottom: 0,
    zIndex: 1
  },
  headingText: {
    textAlign: "center",
    fontWeight: "bold",
    fontSize: 20
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
  }
});
