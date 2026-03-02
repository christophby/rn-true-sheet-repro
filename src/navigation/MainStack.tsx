import { createStackNavigator } from '@react-navigation/stack';
import AppContent from '../components/AppContent';
import SecondScreen from '../components/SecondScreen';

const Stack = createStackNavigator();

function MainStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Home" component={AppContent} />
      <Stack.Screen name="Second" component={SecondScreen} />
    </Stack.Navigator>
  );
}

export default MainStack;
