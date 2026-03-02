import { createNativeBottomTabNavigator } from '@react-navigation/bottom-tabs/unstable';
import AppContent from '../components/AppContent';
import SecondScreen from '../components/SecondScreen';
import MainStack from './MainStack';

const Tab = createNativeBottomTabNavigator();

function BottomTabs() {
  return (
    <Tab.Navigator>
      <Tab.Screen name="Home" component={MainStack} />
      <Tab.Screen name="Profile" component={SecondScreen} />
      <Tab.Screen name="Settings" component={SecondScreen} />
      <Tab.Screen name="Notifications" component={SecondScreen} />
    </Tab.Navigator>
  );
}

export default BottomTabs;
