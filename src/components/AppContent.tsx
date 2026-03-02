import {
  Button,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';
import { TrueSheet } from '@lodev09/react-native-true-sheet';
import { useRef, useState } from 'react';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

function AppContent() {
  const safeAreaInsets = useSafeAreaInsets();
  const sheetRef = useRef<TrueSheet>(null);
  const [rows, setRows] = useState<number[]>(
    Array.from({ length: 100 }).map((_, index) => index),
  );
  const [selectedRow, setSelectedRow] = useState<number | null>(null);
  const [searchQuery, setSearchQuery] = useState('');

  const onPressRow = (row: number) => {
    setRows(prevRows => [row, ...prevRows.filter(value => value !== row)]);
    setSelectedRow(row);
  };
  const normalizedQuery = searchQuery.trim().toLowerCase();
  const filteredRows = rows.filter(row =>
    `row ${row}`.toLowerCase().includes(normalizedQuery),
  );

  return (
    <View style={{ backgroundColor: 'white', flex: 1 }}>
      <View style={[styles.container, { paddingTop: safeAreaInsets.top + 16 }]}>
        <Button
          title="Open TrueSheet"
          onPress={() => sheetRef.current?.present()}
        />
        <TrueSheet ref={sheetRef} scrollable>
          <ScrollView
            nestedScrollEnabled
            keyboardShouldPersistTaps="handled"
            contentContainerStyle={styles.scrollViewContent}
          >
            <Text style={styles.heading}>Heading 1</Text>

            <TextInput
              style={styles.searchInput}
              placeholder="Search..."
              value={searchQuery}
              onChangeText={setSearchQuery}
            />
            <View style={styles.sheetContent}>
              {filteredRows.map(row => (
                <Pressable
                  key={row}
                  style={[styles.item, selectedRow === row && styles.selectedItem]}
                  onPress={() => onPressRow(row)}
                >
                  <Text style={styles.text}>Row {row}</Text>
                </Pressable>
              ))}
            </View>
          </ScrollView>
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
  heading: {
    fontSize: 24,
    fontWeight: 'bold',
    marginVertical: 16,
  },
  item: {
    paddingVertical: 4,
    paddingHorizontal: 16,
    borderBottomWidth: 1,
    borderBottomColor: 'gray',
  },
  selectedItem: {
    backgroundColor: '#D9EBFF',
  },
  text: {
    fontSize: 16,
  },
  description: {
    fontSize: 16,
    marginVertical: 16,
  },
  searchInput: {
    borderWidth: 1,
    borderColor: 'gray',
    padding: 16,
    marginVertical: 16,
    borderRadius: 8,
  },
  scrollViewContent: {
    flexGrow: 1,
    padding: 16,
  },
});

export default AppContent;
