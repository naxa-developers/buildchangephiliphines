import { AppRegistry, Platform } from 'react-native';
import App from './App';

console.disableYellowBox = true;
AppRegistry.registerComponent(Platform.OS === 'ios' ? 'guide' : 'naxa.buildchangephilippines', () => App);
