import React, { Component } from "react";
import { FlatList, Text } from "react-native";
import { Card } from "react-native-elements";
import { connect } from "react-redux";

const data = [
  {
    imageUrl: "https://loremflickr.com/g/160/160/paris",
    title: "something"
  },
  {
    imageUrl: "https://loremflickr.com/g/160/160/paris",
    title: "something two"
  },
  {
    imageUrl: "https://loremflickr.com/g/160/160/paris",
    title: "something three"
  },
  {
    imageUrl: "https://loremflickr.com/g/160/160/paris",
    title: "something four"
  },
  {
    imageUrl: "https://loremflickr.com/g/160/160/paris",
    title: "something five"
  },
  {
    imageUrl: "https://loremflickr.com/g/160/160/paris",
    title: "something six"
  }
];

class ImageList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data
    };
  }

  makeRemoteRequest = () => {
    const { page, seed } = this.state;
    const url = `https://randomuser.me/api/?seed=${seed}&page=${page}&results=20`;
    this.setState({ loading: true });
    fetch(url)
      .then(res => res.json())
      .then(res => {
        this.setState({
          data: page === 1 ? res.results : [...this.state.data, ...res.results],
          error: res.error || null,
          loading: false,
          refreshing: false
        });
      })
      .catch(error => {
        this.setState({ error, loading: false });
      });
  };

  render() {
    return (
      <FlatList
        horizontal
        data={this.state.data}
        renderItem={({ item: rowData }) => {
          return (
            <Card
              image={{ uri: rowData.imageUrl }}
              containerStyle={{ padding: 0, width: 160 }}
              imageStyle={{ width: 160, height: 160 }}
            />
          );
        }}
        keyExtractor={(item, index) => index.toString()}
      />
    );
  }
}

const mapStateToProps = state => {
  return { images: state.images };
};

export default connect(mapStateToProps)(ImageList);
