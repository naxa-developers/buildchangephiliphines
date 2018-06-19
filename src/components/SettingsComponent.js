import React, { Component } from "react";
import {
  SettingsCategoryHeader,
  SettingsPicker
} from "react-native-settings-components";
import { ScrollView, Platform, AsyncStorage, Alert } from "react-native";
import { Button } from "react-native-elements";
import { strings } from "./../../locales/strings";
import { Actions } from "react-native-router-flux";

export default class SettingsScene extends Component {
  constructor() {
    super();
    this.state = {
      locale: "",
      gender: ""
    };
  }

  componentDidMount() {
    let value;

    switch (strings.getLanguage().trim()) {
      case "ne":
        value = "Nepali";
        break;
      default:
        value = "English";
        break;
    }

    this.setState({
      locale: value
    });
  }

  async userLogout() {
    try {
      await AsyncStorage.removeItem("token");
      Actions.SecondPage();
    } catch (error) {
      console.log(error.message);
    }
  }

  render() {
    return (
      <ScrollView
        style={{
          flex: 1,
          backgroundColor:
            Platform.OS === "ios" ? colors.iosSettingsBackground : colors.white
        }}
      >
        <SettingsCategoryHeader
          title={"Settings"}
          textStyle={Platform.OS === "android" ? { color: colors.monza } : null}
        />

        <SettingsPicker
          title="Language"
          dialogDescription={"Choose your language."}
          possibleValues={[
            { label: "...", value: "..." },
            { label: "English", value: "English" },
            { label: "Nepali", value: "Nepali" }
          ]}
          negativeButtonTitle={"Cancel"}
          positiveButtonTitle={"Save"}
          onSaveValue={value => {
            console.log("locale:", value);

            switch (value) {
              case "Nepali":
                AsyncStorage.setItem("locale", "wa");
                break;
              default:
                AsyncStorage.setItem("locale", "en");
                break;
            }

            this.setState({
              locale: value
            });

            Alert.alert("App restart required to change langugage");
          }}
          value={this.state.locale}
          styleModalButtonsText={{ color: colors.monza }}
        />

        <Button
          onPress={this.userLogout.bind(this)}
          style={{ width: 10 }}
          title="LOGOUT"
        />
      </ScrollView>
    );
  }
}

const colors = {
  iosSettingsBackground: "rgb(235,235,241)",
  white: "#FFFFFF",
  monza: "#C70039",
  switchEnabled: Platform.OS === "android" ? "#C70039" : null,
  switchDisabled: Platform.OS === "android" ? "#efeff3" : null,
  switchOnTintColor: Platform.OS === "android" ? "rgba(199, 0, 57, 0.6)" : null,
  blueGem: "#27139A"
};
