import {createAppContainer} from 'react-navigation';
import {createStackNavigator} from 'react-navigation-stack';

import MainGit from './pages/MainGit';
import User from './pages/User';
import Initial from './pages/Initial';
import Benchmark from './pages/Benchmark';
import Camera from './pages/Camera';
import PageCamera from './pages/PageCamera';

const Routes = createAppContainer(
  createStackNavigator(
    {
      Initial,
      MainGit,
      User,
      Benchmark,
      Camera,
      PageCamera,
    },
    {
      headerLayoutPreset: 'center',
      headerBackTitleVisible: false,
    }
  )
);

export default Routes;
