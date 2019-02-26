import React, { Component } from 'react';
import { connect } from 'react-redux';
import RNFetchBlob from 'react-native-fetch-blob';

export default (ChildComponent) => {
  class ComposedComponent extends Component {

    constructor() {
      super();
      this.state = {
        assetsExist: null
      };
    }

    componentWillMount() {
      RNFetchBlob.fs.exists(this.props.pathForExtracted)
          .then((exist) => {
            if (exist) {
              this.setState({ assetsExist: exist });
          } else if (!exist) {
            this.setState({ assetsExist: !exist });
          }
          })
          .catch(() => {
              console.log('error while checking file');
          });
    }
    render() {
      return (
        <ChildComponent assetsExist={this.state.assetsExist} {...this.props} />
      );
    }
  }

  const mapStateToProps = (state) => {
    return {
      pathForExtracted: state.downloadInfo.pathForExtracted,
    };
  };

  return connect(mapStateToProps)(ComposedComponent);
};
