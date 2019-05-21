import React, { Component } from "react";
import { Card } from "react-native-elements";

export default class ImageCard extends Component {
  render() {
    return (
      <Card
        title="Nishon"
        image={{ url: "http://via.placeholder.com/160x160" }}
        containerStyle={{ padding: 0, width: 160 }}
      />
    );
  }
}
