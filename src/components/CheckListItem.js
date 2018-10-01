// import React, { Component } from 'react';
// import { View, StyleSheet, TouchableOpacity, Text } from 'react-native';
// import { CheckBox } from 'react-native-elements';
// import { connect } from 'react-redux';
// import { Actions } from 'react-native-router-flux';
// import _ from 'lodash';
// import { getLocalizedText } from '../../locales/strings';
// import { requestPerson } from '../actions';
//
// class CheckListItem extends Component {
//   constructor() {
//     console.log('constructor');
//     super();
//     this.state = {
//       checked: false
//     };
//   }
//   componentDidMount() {
//     if (!_.isEmpty(this.props.data.last_submission)) {
//       this.setState({ checked: this.props.data.last_submission.report_status });
//     }
// }
//
//   showConditionalJSX() {
//     console.log('showConditionalJSXko_bhitra');
//     console.log(this.props);
//     const name = getLocalizedText(
//       this.props.data.localtext,
//       this.props.data.text
//     );
//     if (this.props.currentUserGroup === 'Field Engineer') {
//       return (
//           <CheckBox
//             title={name}
//             checkedIcon='check-square-o'
//             uncheckedIcon='square-o'
//             uncheckedColor='red'
//             onPress={() => {
//               this.props.dispatch(requestPerson({ checklistItemData: this.props.data, checklistItemValue: !this.state.checked }));
//               this.setState({ checked: !this.state.checked });
//             }}
//             checked={this.state.checked}
//             containerStyle={{ padding: 20, margin: 0, marginRight: 0, marginLeft: 0, backgroundColor: 'white' }}
//             textStyle={{ fontSize: 16 }}
//           />
//         );
//     }
//     return (
//       <Text style={{ padding: 20, margin: 0, marginRight: 0, marginLeft: 0, backgroundColor: 'white', fontSize: 16, textAlign: 'center' }}>{name}</Text>
//     );
//  }
//
//   render() {
//     console.log('render_bhitra');
//     console.log('render_bhitra_last_submissionko_value');
//     console.log(this.props.data.last_submission);
//     console.log(this.state.checked);
//
//     return (
//       <View style={styles.container}>
//         {
//           this.showConditionalJSX()
//         }
//
//         <TouchableOpacity
//           onPress={() => Actions.ReportForm(this.props.data)}
//           style={{ backgroundColor: '#FAFAFA', height: 40, borderWidth: 0, alignItems: 'center', justifyContent: 'center' }}
//         >
//           <Text style={{ textAlign: 'center', fontSize: 16, fontWeight: 'bold' }}>Report</Text>
//         </TouchableOpacity>
//       </View>
//     );
//   }
// }
//
// const mapStateToProps = (state) => {
//   console.log('CHECKLISTKO_mapStateToPropsko_bhitra');
//   console.log(state);
//   return {
//     currentUserGroup: state.currentUserGroup.currentUserGroup,
//   };
// };
//
// const styles = StyleSheet.create({
//   container: {
//     margin: 10,
//     flexDirection: 'column',
//     flex: 1,
//     borderWidth: 1,
//     borderColor: 'rgba(0,0,0,0.2)'
//   }
// });
//
// export default connect(mapStateToProps)(CheckListItem);





import React, { Component } from 'react';
import { View, StyleSheet, Text } from 'react-native';
import { CheckBox } from 'react-native-elements';
import { connect } from 'react-redux';
import { getLocalizedText } from '../../locales/strings';
import { requestPerson } from '../actions';

class CheckListItem extends Component {
  constructor() {
    console.log('constructor');
    super();
    this.state = {
      checked: false
    };
  }
  componentDidMount() {
      this.setState({ checked: this.props.data.status });
}


  render() {
    console.log('********');
    console.log(this.props.data);
    console.log('**********');
    console.log(this.state.checked);
    const name = getLocalizedText(
      this.props.data.localtext,
      this.props.data.text
    );

    return (
      <View style={styles.container}>
      <CheckBox
        title={name}
        checkedIcon='check-square-o'
        uncheckedIcon='square-o'
        uncheckedColor='red'
        onPress={() => {
          this.props.dispatch(requestPerson({ checklistItemData: this.props.data, checklistItemValue: !this.state.checked, userId: this.props.currentUserId }));
          this.setState({ checked: !this.state.checked });
        }}
        checked={this.state.checked}
        containerStyle={{ padding: 20, margin: 0, marginRight: 0, marginLeft: 0, backgroundColor: 'white' }}
        textStyle={{ fontSize: 16 }}
      />
      </View>
    );
  }
}

const mapStateToProps = (state) => {
  console.log('CHECKLISTKO_mapStateToPropsko_bhitra');
  console.log(state);
  return {
    currentUserGroup: state.currentUserGroup.currentUserGroup,
    currentUserId: state.currentUserGroup.currentUserId,
  };
};

const styles = StyleSheet.create({
  container: {
    margin: 10,
    flexDirection: 'column',
    flex: 1,
    borderWidth: 1,
    borderColor: 'rgba(0,0,0,0.2)'
  }
});

export default connect(mapStateToProps)(CheckListItem);
