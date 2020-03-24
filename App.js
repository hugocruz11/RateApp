import React, {Component} from 'react';
import {Root} from 'native-base';
import RootNavigator from './src/navigation/RootNavigator';

console.disableYellowBox = true;

export default class App extends Component {
  render() {
    return (
      <Root>
        <RootNavigator />
      </Root>
    );
  }
}
