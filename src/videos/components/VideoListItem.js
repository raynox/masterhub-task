import React from 'react';
import { View, StyleSheet, Text, ImageBackground, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';

export default function VideoListItem({ video, borderRadius = 20, hideTitle = false }) {

  const navigation = useNavigation();

  return (
    <TouchableOpacity onPress={() => navigation.navigate('Video', { videoId: video.id })}>
      <View style={[styles.container, { borderRadius }]}>
        <ImageBackground
          style={styles.image}
          imageStyle={{ borderRadius, resizeMode: 'cover' }}
          source={{ uri: video.thumbnail }}>
          <View style={[styles.content, { borderRadius }]}>
            {!hideTitle && <Text style={styles.title}>{video.title}</Text>}
          </View>
        </ImageBackground>
      </View>
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  image: {
    width: '100%',
    height: 200,
  },
  content: {
    backgroundColor: '#0000009c',
    height: '100%',
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    color: '#fff',
    fontWeight: '700',
  },
});