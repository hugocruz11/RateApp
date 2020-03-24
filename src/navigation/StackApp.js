import {createStackNavigator} from 'react-navigation';

import Index from '../Index';
import DateForm from '../screens/DateForm';

const StackApp = createStackNavigator(
  {
    Index: Index,
    DateForm,
  },
  {
    initialRouteName: 'Index',
    headerMode: 'none',
  },
);

export default StackApp;
