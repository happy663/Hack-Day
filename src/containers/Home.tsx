import React from 'react';
import {
  StyleSheet,
  TextInput,
  View,
  FlatList,
  Dimensions,
  ViewToken,
} from 'react-native';
import { QuestionCard, PopPlayer } from 'src/components';
import { theme, globalStyles } from 'src/utils/theme';
import { useQuestions } from 'src/hooks/hook';

export const Home = () => {
  const { questions, setCurrentQuestion } = useQuestions();
  const viewabilityConfig = React.useRef({
    waitForInteraction: true,
    minimumViewTime: 300,
    viewAreaCoveragePercentThreshold: 50,
  });
  const onViewableItemsChanged = React.useRef(
    ({
      viewableItems,
    }: {
      viewableItems: Array<ViewToken>;
      changed: Array<ViewToken>;
    }) => {
      viewableItems.forEach((viewableItem) => {
        setCurrentQuestion({ ...viewableItem.item });
      });
    }
  );

  return (
    <View style={{ flex: 1 }}>
      <View style={{ height: 30, ...styles.containerItem }}>
        <TextInput style={styles.searchBar} />
      </View>
      <View style={{ flex: 1, ...styles.containerItem }}>
        <FlatList
          horizontal
          data={questions}
          renderItem={({ item }) => <QuestionCard {...item} />}
          viewabilityConfig={viewabilityConfig.current}
          onViewableItemsChanged={onViewableItemsChanged.current}
          keyExtractor={(item) => item.question_id}
          snapToAlignment="start"
          decelerationRate={'normal'}
          snapToInterval={Dimensions.get('window').width}
        />
      </View>
      <View style={{ height: 180, ...styles.containerItem }}>
        <PopPlayer />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  containerItem: {
    marginTop: 20,
    ...globalStyles.flexRowCenter,
  },
  searchBar: {
    flex: 0.85,
    paddingHorizontal: 16,
    borderRadius: 100,
    backgroundColor: theme.colors.white,
    ...globalStyles.boxShadow,
  },
});
