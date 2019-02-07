// import React from 'react';
// import { ListView, View, Text, TouchableOpacity } from 'react-native';
// import { Actions } from 'react-native-router-flux';
// import { CardSection, Circle } from './common';
// import { strings, getLocalizedText } from '../../locales/strings';
//
// class Category extends React.Component {
//
//   componentWillMount() {
//     const ds = new ListView.DataSource({
//         rowHasChanged: (r1, r2) => r1 !== r2
//     });
//     this.dataSource = ds.cloneWithRows(this.props.sub_steps);
//     console.log('item', this.props.item);
//   }
//   onSiteTapped(subStepId) {
//     console.log('filtered data', this.props.item.checklists.filter(element => subStepId === element.substep));
//     Actions.CheckList({ title: strings.title_checklist, item: this.props.item.checklists.filter(element => subStepId === element.substep) });
//   }
//
//   render() {
//     console.log('data', this.props.item);
//     const { titleStyle, subtitleStyle, cointainerStyle } = styles;
//       return (
//           <ListView
//           dataSource={this.dataSource}
//           renderRow={(rowData) => <TouchableOpacity onPress={this.onSiteTapped.bind(this, rowData.id)}>
//               <View>
//                   <CardSection>
//                       <Circle text={getLocalizedText(rowData.local_title, rowData.title).charAt(0)} />
//                       <View style={cointainerStyle}>
//                           <Text style={titleStyle} >{getLocalizedText(rowData.local_title, rowData.title)}</Text>
//                           <Text style={subtitleStyle} >{getLocalizedText(rowData.local_title, rowData.title)}</Text>
//                       </View>
//                   </CardSection>
//
//               </View>
//           </TouchableOpacity>}
//           />
//       );
//   }
// }
//
// const styles = {
//     titleStyle: {
//         paddingLeft: 16,
//         fontSize: 14,
//         color: '#000',
//         fontWeight: 'bold'
//
//     },
//     subtitleStyle: {
//         paddingLeft: 16,
//         fontSize: 12,
//         color: 'rgba(0,0,0,0.6)'
//     },
//     cointainerStyle: {
//         justifyContent: 'center',
//         borderBottomWidth: 0,
//         backgroundColor: '#fff',
//         flexDirection: 'column',
//         position: 'relative'
//     }
// };
// export default Category;


import React from 'react';
import { ListView, View, Text, TouchableOpacity } from 'react-native';
import { Actions } from 'react-native-router-flux';
import { CardSection, Circle } from './common';
import { strings, getLocalizedText } from '../../locales/strings';

class Category extends React.Component {

  componentWillMount() {
    const ds = new ListView.DataSource({
        rowHasChanged: (r1, r2) => r1 !== r2
    });
    this.dataSource = ds.cloneWithRows(this.props.sub_steps);
    console.log('item', this.props.item);
  }
  onSiteTapped(subStepId) {
    console.log('filtered data', this.props.item.new_checklists.filter(element => subStepId === element.sub_checklists[0].substep));
    Actions.CheckList({ title: strings.title_checklist, item: this.props.item.new_checklists.filter(element => subStepId === element.sub_checklists[0].substep) });
  }

  render() {
    console.log('data', this.props.item);
    const { titleStyle, subtitleStyle, cointainerStyle } = styles;
      return (
          <ListView
          dataSource={this.dataSource}
          renderRow={(rowData) => <TouchableOpacity onPress={this.onSiteTapped.bind(this, rowData.id)}>
              <View>
                  <CardSection>
                      <Circle text={getLocalizedText(rowData.local_title, rowData.title).charAt(0)} />
                      <View style={cointainerStyle}>
                          <Text style={titleStyle} >{getLocalizedText(rowData.local_title, rowData.title)}</Text>
                          <Text style={subtitleStyle} >{getLocalizedText(rowData.local_title, rowData.title)}</Text>
                      </View>
                  </CardSection>

              </View>
          </TouchableOpacity>}
          />
      );
  }
}

const styles = {
    titleStyle: {
        paddingLeft: 16,
        fontSize: 14,
        color: '#000',
        fontWeight: 'bold'

    },
    subtitleStyle: {
        paddingLeft: 16,
        fontSize: 12,
        color: 'rgba(0,0,0,0.6)'
    },
    cointainerStyle: {
        justifyContent: 'center',
        borderBottomWidth: 0,
        backgroundColor: '#fff',
        flexDirection: 'column',
        position: 'relative'
    }
};
export default Category;
