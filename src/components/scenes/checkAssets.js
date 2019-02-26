import React, { Component } from 'react';
import { connect } from 'react-redux';
import RNFetchBlob from 'react-native-fetch-blob';

export default (ChildComponent) => {
  class ComposedComponent extends Component {

    constructor() {
      super();
      this.state = {
        source: {}
      };
    }

    componentWillMount() {
      RNFetchBlob.fs.exists(this.props.pathForExtracted)
          .then((exist) => {
              console.log(exist);
            if (exist) {
              this.setState({
                source: { uri: this.props.path, cache: true }
              });
          } else if (!exist) {
            console.log('chiana');
            this.setState({
              source: { uri: this.props.path.replace(`file://${this.props.pathForExtracted}`, 'http://bccms.naxa.com.np'), cache: true }
            });
          }
          })
          .catch(() => {
              console.log('error while checking file');
          });
    }
    render() {
      return (
        <ChildComponent source={this.state.source} value={this.props.value} />
      )
    }
  }

  const mapStateToProps = (state) => {
    console.log('hare');
    console.log(state);
    return {
      pathForExtracted: state.downloadInfo.pathForExtracted,
    };
  };

  return connect(mapStateToProps)(ComposedComponent);
};
