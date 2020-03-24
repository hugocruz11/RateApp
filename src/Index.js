import React, {Component} from 'react';
import RateScreen from './screens/RateScreen';

export default class Index extends Component {
  render() {
    return <RateScreen navigation={this.props.navigation} />;
  }
}
