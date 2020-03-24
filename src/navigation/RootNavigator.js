import {createSwitchNavigator, createAppContainer} from 'react-navigation';
import StackApp from './StackApp';

const AppSwitchNavigator = createSwitchNavigator(
  {
    StackApp: {screen: StackApp},
  },
  {
    initialRouteName: 'StackApp',
  },
);

export default createAppContainer(AppSwitchNavigator);
