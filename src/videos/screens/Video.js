import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Query } from 'react-apollo';
import { Video as ExpoVideo } from 'expo-av';
import { useRoute } from '@react-navigation/native';
import * as ScreenOrientation from 'expo-screen-orientation';
import { GET_VIDEO } from '../api/queries';

export default function Video() {
  const route = useRoute();
  React.useEffect(() => {
    ScreenOrientation.lockAsync(ScreenOrientation.OrientationLock.LANDSCAPE);
    return () => ScreenOrientation.unlockAsync();
  }, []);

  return (
    <Query query={GET_VIDEO} variables={{ videoId: route.params.videoId }}>
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
          <View style={styles.container}>
            <ExpoVideo
              source={{ uri: data.video.url }}
              rate={1.0}
              volume={1.0}
              isMuted={false}
              resizeMode="cover"
              shouldPlay
              useNativeControls
              style={styles.video}
            />
            <Text style={styles.title}>{data.video.title}</Text>
          </View>
        );
      }}
    </Query>

  );
}

const styles = StyleSheet.create({
  container: {
    padding: 10,
  },
  video: {
    width: '100%',
    height: 300,
    borderRadius: 20,
  },
  title: {
    fontSize: 20,
    marginTop: 15,
  },
});
