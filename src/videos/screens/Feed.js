import React, { useState } from 'react';
import { SafeAreaView, Text, StyleSheet, View, FlatList, Switch } from 'react-native';
import VideoListItem from '../components/VideoListItem';
import { GET_VIDEOS } from '../api/queries';
import { Query } from 'react-apollo';

export default function Feed() {

  const [numberOfColumns, setNumberOfColumns] = useState(1);

  const toggleSwitch = value => {
    setNumberOfColumns(value ? 3 : 1);
  };

  const getImageContainerStyles = () => ({
    width: numberOfColumns === 3 ? '33.33333%' : '100%',
    paddingHorizontal: numberOfColumns === 3 ? 3 : 10,
    paddingVertical: numberOfColumns === 3 ? 3 : 5,
  });

  const renderVideo = video => {
    return <View style={getImageContainerStyles()} key={video.id}>
      <VideoListItem
        borderRadius={numberOfColumns === 3 ? 5 : 20}
        hideTitle={numberOfColumns === 3}
        video={video} />
    </View>
  }

  return <SafeAreaView>
    <Query query={GET_VIDEOS}>
      {({ loading, error, data }) => {
        if (loading) return <Text testID="loading">Loading...</Text>;
        if (error) return <Text>`Error! ${error.message}`</Text>;

        return (
          <View>
            <View style={styles.switchContainer}>
              <Text>Vertical list</Text>
              <Switch
                style={styles.switch}
                onValueChange={toggleSwitch}
                value={numberOfColumns === 3} />
              <Text>Grid</Text>
            </View>
            <FlatList
              data={data.videos}
              numColumns={numberOfColumns}
              keyExtractor={item => item.id.toString()}
              renderItem={({ item }) => renderVideo(item)}
              style={styles.scrollView} />
          </View>
        );
      }}
    </Query>
  </SafeAreaView>;
}

const styles = StyleSheet.create({
  scrollView: {
    paddingVertical: 5,
  },
  switchContainer: {
    marginLeft: 10,
    flexDirection: 'row',
    alignItems: 'center',
  },
  switch: {
    marginVertical: 10,
    marginHorizontal: 20,
  },
});