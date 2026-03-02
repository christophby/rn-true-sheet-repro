import { View, Text } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

function SecondScreen() {
  const insets = useSafeAreaInsets();
  return (
    <View style={{ paddingTop: insets.top }}>
      <Text>Second Screen</Text>
    </View>
  );
}

export default SecondScreen;
