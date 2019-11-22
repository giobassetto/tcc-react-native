import {createAppContainer} from 'react-navigation';
import {createStackNavigator} from 'react-navigation-stack';

import MainGit from './pages/MainGit';
import User from './pages/User';
import Initial from './pages/Initial';
import Benchmark from './pages/Benchmark';
import PageCamera from './pages/PageCamera';
import Mapa from './pages/Mapa';

const Routes = createAppContainer(
  createStackNavigator(
    {
      Initial,
      MainGit,
      User,
      Benchmark,
      PageCamera,
      Mapa,
    },
    {
      headerLayoutPreset: 'center',
      headerBackTitleVisible: false,
    }
  )
);

export default Routes;
