import { useMemo, useState } from 'react';
import {
  FlatList,
  StyleSheet,
  Text,
  useWindowDimensions,
  View,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import {
  SceneRendererProps,
  TabBar,
  TabBarProps,
  TabView,
} from 'react-native-tab-view';

type Route = {
  key: string;
  title: string;
};

type TabRow = {
  id: string;
  title: string;
  subtitle: string;
  tags: string[];
  metrics: number[];
};

function TabScene({ routeKey, title }: { routeKey: string; title: string }) {
  const rows = useMemo<TabRow[]>(
    () =>
      Array.from({ length: 100 }, (_, index) => ({
        id: `${routeKey}-${index}`,
        title: `${title} item ${index + 1}`,
        subtitle: `Heavy row payload for ${routeKey} - ${
          (index % 12) + 1
        } tags`,
        tags: Array.from({ length: 8 }, (_unusedTag, tagIndex) => {
          return `tag-${routeKey}-${(index + tagIndex) % 24}`;
        }),
        metrics: Array.from({ length: 10 }, (_unusedMetric, metricIndex) => {
          return ((index + metricIndex * 7) % 100) + 1;
        }),
      })),
    [routeKey, title],
  );

  return (
    <FlatList
      data={rows}
      keyExtractor={item => item.id}
      contentContainerStyle={styles.sceneList}
      initialNumToRender={180}
      maxToRenderPerBatch={180}
      windowSize={24}
      updateCellsBatchingPeriod={0}
      renderItem={({ item }) => (
        <View style={styles.sceneItem}>
          <Text style={styles.sceneItemTitle}>{item.title}</Text>
          <Text style={styles.sceneItemSubtitle}>{item.subtitle}</Text>
          <View style={styles.metricRow}>
            {item.metrics.map(metric => (
              <View
                key={`${item.id}-metric-${metric}`}
                style={[styles.metricBar, { height: 8 + metric / 4 }]}
              />
            ))}
          </View>
          <View style={styles.tagRow}>
            {item.tags.map(tag => (
              <View key={`${item.id}-${tag}`} style={styles.tagPill}>
                <Text style={styles.tagText}>{tag}</Text>
              </View>
            ))}
          </View>
        </View>
      )}
    />
  );
}

function SecondScreen() {
  const insets = useSafeAreaInsets();
  const layout = useWindowDimensions();
  const [index, setIndex] = useState(0);
  const [routes] = useState<Route[]>([
    { key: 'overview', title: 'Overview' },
    { key: 'details', title: 'Details View' },
    { key: 'activity', title: 'Activities' },
    { key: 'stats', title: 'Statistics' },
    { key: 'files', title: 'Files' },
    { key: 'settings', title: 'Settings' },
  ]);

  const routeTitleByKey = useMemo(
    () =>
      routes.reduce<Record<string, string>>((accumulator, route) => {
        accumulator[route.key] = route.title;
        return accumulator;
      }, {}),
    [routes],
  );

  const renderLabel = ({
    route,
    focused,
  }: {
    route: Route;
    focused: boolean;
    color?: string;
  }) => (
    <Text style={[styles.tabLabel, focused && styles.tabLabelFocused]}>
      {route.title}
    </Text>
  );

  const tabOptions = useMemo(
    () =>
      routes.reduce<Record<string, { label: typeof renderLabel }>>(
        (accumulator, route) => {
          accumulator[route.key] = { label: renderLabel };
          return accumulator;
        },
        {},
      ),
    [routes],
  );

  const renderTabBar = (
    props: SceneRendererProps & {
      navigationState: { index: number; routes: Route[] };
    },
  ) => (
    <TabBar
      {...(props as TabBarProps<Route>)}
      scrollEnabled
      style={styles.tabBar}
      indicatorStyle={styles.indicator}
      tabStyle={{ width: 'auto' }}
      contentContainerStyle={styles.tabBarContent}
      options={tabOptions}
      {...({
        commonOptions: { label: renderLabel },
      } as unknown as Record<string, unknown>)}
    />
  );

  const renderScene = ({ route }: { route: Route }) => (
    <TabScene
      routeKey={route.key}
      title={routeTitleByKey[route.key] ?? route.title}
    />
  );

  return (
    <View style={[styles.container, { paddingTop: insets.top }]}>
      <TabView
        navigationState={{ index, routes }}
        renderScene={renderScene}
        renderTabBar={renderTabBar}
        onIndexChange={setIndex}
        initialLayout={{ width: layout.width }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F4F6FA',
  },
  tabBar: {
    backgroundColor: '#FFFFFF',
    elevation: 0,
    shadowOpacity: 0,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: '#D9DEE8',
  },
  tabBarContent: {
    paddingHorizontal: 6,
  },
  indicator: {
    backgroundColor: '#246BFD',
    height: 3,
    borderRadius: 3,
  },
  tabLabel: {
    color: '#c4c4c4',
    fontSize: 18,
    fontWeight: '600',
    textTransform: 'none',
  },
  tabLabelFocused: {
    color: '#102A43',
  },
  sceneList: {
    paddingHorizontal: 12,
    paddingTop: 12,
    paddingBottom: 20,
  },
  sceneItem: {
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: '#CBD2DF',
    backgroundColor: '#FFFFFF',
    borderRadius: 10,
    paddingHorizontal: 14,
    paddingVertical: 12,
    marginBottom: 10,
  },
  sceneItemTitle: {
    color: '#102A43',
    fontSize: 16,
    fontWeight: '600',
  },
  sceneItemSubtitle: {
    color: '#627086',
    fontSize: 13,
    marginTop: 4,
  },
  metricRow: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    marginTop: 10,
  },
  metricBar: {
    width: 8,
    backgroundColor: '#9CB9FF',
    borderRadius: 2,
    marginRight: 3,
  },
  tagRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginTop: 10,
  },
  tagPill: {
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#D7DEEB',
    backgroundColor: '#F0F3FA',
    paddingHorizontal: 8,
    paddingVertical: 3,
    marginRight: 6,
    marginBottom: 6,
  },
  tagText: {
    fontSize: 11,
    color: '#4C5D79',
    fontWeight: '500',
  },
});

export default SecondScreen;
