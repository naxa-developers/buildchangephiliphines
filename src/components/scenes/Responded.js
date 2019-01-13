import React, { Component } from 'react';
import { ScrollView, Text } from 'react-native';
import { Card, List } from 'react-native-elements';
import { connect } from 'react-redux';

class Responded extends Component {

  render() {
    return (
      <ScrollView>
      <List containerStyle={{ marginTop: 0 }}>
      {
        this.props.reports.map((l, i) => (
          <Card
          title={l.comment}
          image={l.photo? { uri: l.photo } : require('../../../app_images/no_image.png')}
          >
          <Text style={{ marginBottom: 10 }}>
          The feedback text will be shown here. This is just for testing purposes.
          </Text>
          </Card>
        ))
      }
      </List>
      </ScrollView>
    );
  }

}

const mapStateToProps = (state) => {

  console.log('inside responded page');
  console.log('state', state.schoolList.data.sites);
  const reports = [];
  state.schoolList.data.sites.forEach((each) => {
    each.site_steps.forEach((ea) => {
      ea.reports.forEach((e) => {
        if (e.user === state.currentUserGroup.currentUserId && e.status === 'Responded') {
          reports.push(e);
        }
      })
    });
  });

  state.schoolList.data.sites.forEach((each) => {
    each.site_reports.forEach((e) => {
      if (e.user === state.currentUserGroup.currentUserId && e.status === 'Responded') {
          reports.push(e);
      }
    })
  });
  console.log('site reports', reports);
  return { reports: reports };
}

export default connect(mapStateToProps)(Responded);
