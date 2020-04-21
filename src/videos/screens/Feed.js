import React, { useState } from 'react';
import {
  SafeAreaView, Text, StyleSheet, View, FlatList, Switch,
} from 'react-native';
import { Query } from 'react-apollo';
import VideoListItem from '../components/VideoListItem';
import { GET_VIDEOS } from '../api/queries';

export default function Feed() {
  const [numberOfColumns, setNumberOfColumns] = useState(1);

  const toggleSwitch = (value) => {
    setNumberOfColumns(value ? 3 : 1);
  };

  const threeColumns = numberOfColumns === 3;
  const containerStyles = StyleSheet.create({
    container: {
      width: threeColumns ? '33.33333%' : '100%',
      paddingHorizontal: threeColumns ? 3 : 10,
      paddingVertical: threeColumns ? 3 : 5,
    },
  });

  const renderVideo = (video) => (
    <View style={containerStyles.container} key={video.id}>
      <VideoListItem
        borderRadius={numberOfColumns === 3 ? 5 : 20}
        hideTitle={numberOfColumns === 3}
        video={video}
      >
        {!threeColumns && <Text style={styles.videoTitle}>{video.title}</Text>}
      </VideoListItem>
    </View>
  );

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <Query query={GET_VIDEOS}>
        {({ loading, error, data }) => {
          if (loading) return <Text testID="loading">Loading...</Text>;
          if (error) {
            return (
              <Text>
                `Error! $
                {error.message}
                `
              </Text>
            );
          }

          return (
            <View style={{ flex: 1 }}>
              <View style={styles.switchContainer}>
                <Text>Vertical list</Text>
                <Switch
                  style={styles.switch}
                  onValueChange={toggleSwitch}
                  value={numberOfColumns === 3}
                />
                <Text>Grid</Text>
              </View>
              <FlatList
                key={numberOfColumns}
                data={data.videos}
                numColumns={numberOfColumns}
                keyExtractor={(item) => item.id.toString()}
                renderItem={({ item }) => renderVideo(item)}
                style={styles.scrollView}
              />
            </View>
          );
        }}
      </Query>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  scrollView: {
    paddingVertical: 5,
    flex: 1,
  },
  switchContainer: {
    marginLeft: 10,
    flexDirection: 'row',
    alignItems: 'center',
  },
  videoTitle: {
    color: '#fff',
    fontWeight: '700',
  },
  switch: {
    marginVertical: 10,
    marginHorizontal: 20,
  },
});
