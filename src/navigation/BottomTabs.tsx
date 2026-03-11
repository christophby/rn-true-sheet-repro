import { createNativeBottomTabNavigator } from '@react-navigation/bottom-tabs/unstable';
import { Platform, StyleSheet } from 'react-native';
import SecondScreen from '../components/SecondScreen';
import MainStack from './MainStack';

const Tab = createNativeBottomTabNavigator();

const getTabIcon = (iosName: string, androidDrawable: string) =>
  Platform.select({
    ios: { type: 'sfSymbol' as const, name: iosName as never },
    default: { type: 'image' as const, source: { uri: androidDrawable } },
  });

function BottomTabs() {
  return (
    <Tab.Navigator
      screenOptions={{
        tabBarActiveTintColor: '#111827',
        tabBarInactiveTintColor: '#6B7280',
        tabBarLabelVisibilityMode: 'labeled',
        tabBarLabelStyle: styles.label,
      }}
    >
      <Tab.Screen
        name="Home"
        component={MainStack}
        options={{ tabBarIcon: getTabIcon('house.fill', 'tab_home') }}
      />
      <Tab.Screen
        name="Profile"
        component={SecondScreen}
        options={{ tabBarIcon: getTabIcon('person.fill', 'tab_profile') }}
      />
      <Tab.Screen
        name="Settings"
        component={SecondScreen}
        options={{ tabBarIcon: getTabIcon('gearshape.fill', 'tab_settings') }}
      />
      <Tab.Screen
        name="Notifications"
        component={SecondScreen}
        options={{ tabBarIcon: getTabIcon('bell.fill', 'tab_notifications') }}
      />
    </Tab.Navigator>
  );
}

export default BottomTabs;

const styles = StyleSheet.create({
  label: {
    fontSize: 12,
    fontWeight: '600',
  },
});
