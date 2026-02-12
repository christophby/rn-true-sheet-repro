import { Button, FlatList, StyleSheet, Text, View } from 'react-native';
import { TrueSheet } from '@lodev09/react-native-true-sheet';
import { useRef } from 'react';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

function AppContent() {
  const safeAreaInsets = useSafeAreaInsets();
  const sheetRef = useRef<TrueSheet>(null);

  return (
    <View style={{ backgroundColor: 'white', flex: 1 }}>
      <View style={[styles.container, { paddingTop: safeAreaInsets.top + 16 }]}>
        <Button
          title="Open TrueSheet"
          onPress={() => sheetRef.current?.present()}
        />
        <TrueSheet ref={sheetRef} scrollable>
          <View style={styles.sheetContent}>
            <FlatList
              nestedScrollEnabled
              data={Array.from({ length: 100 }).map((_, index) => ({ index }))}
              keyExtractor={item => item.index.toString()}
              renderItem={({
                item: { index },
              }: {
                item: { index: number };
              }) => (
                <View style={styles.item}>
                  <Text style={styles.text}>Row {index}</Text>
                </View>
              )}
            />
          </View>
        </TrueSheet>
      </View>
      <View>
        {Array.from({ length: 50 }).map((_, index) => (
          <View
            key={index}
            style={{ padding: 4, borderWidth: 1, borderColor: '#dbdbdb' }}
          >
            <Text style={styles.text}>B{index}</Text>
          </View>
        ))}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 16,
    borderWidth: 1,
    borderColor: 'blue',
    marginRight: 32,
  },
  sheetContent: {
    flexGrow: 1,
    paddingTop: 16,
    borderWidth: 1,
    borderColor: 'red',
    backgroundColor: '#FA0',
  },
  item: {
    paddingVertical: 4,
    paddingHorizontal: 16,
    borderBottomWidth: 1,
    borderBottomColor: 'gray',
  },
  text: {
    fontSize: 16,
  },
});

export default AppContent;
