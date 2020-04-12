import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Video as ExpoVideo } from 'expo-av';
import { useRoute } from '@react-navigation/native';
import { useQuery } from "@apollo/react-hooks";
import { ScreenOrientation } from 'expo';
import { GET_VIDEO } from '../api/queries';

export default function Video() {

  const route = useRoute();
  const { data, loading, error } = useQuery(GET_VIDEO, { variables: { videoId: route.params.videoId } });

  React.useEffect(() => {
    ScreenOrientation.lockAsync(ScreenOrientation.OrientationLock.LANDSCAPE);

    return () => {
      ScreenOrientation.unlockAsync();
    }
  }, []);

  if (loading) return <Text>Loading...</Text>;
  if (error) return <Text>Error</Text>;
  if (!data) return <Text>Not found</Text>;

  return (
    <View style={styles.container}>
      <ExpoVideo
        source={{ uri: data.video.url }}
        rate={1.0}
        volume={1.0}
        isMuted={false}
        resizeMode="cover"
        shouldPlay
        useNativeControls={true}
        style={styles.video}
      />
      <Text style={styles.title}>{data.video.title}</Text>
    </View>
  )
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