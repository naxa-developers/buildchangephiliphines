import { AppRegistry, Platform, YellowBox } from "react-native";
import App from "./App";

console.disableYellowBox = true;
YellowBox.ignoreWarnings([
  "Warning: isMounted(...) is deprecated",
  "Module RCTImageLoader"
]);

AppRegistry.registerComponent(
  Platform.OS === "ios" ? "guide" : "naxa.buildchangephilippines",
  () => App
);
