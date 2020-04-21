import React from 'react';
import {
  View, StyleSheet, ImageBackground, TouchableOpacity,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import PropTypes from 'prop-types';

export default function VideoListItem({ video, children }) {
  const navigation = useNavigation();

  return (
    <TouchableOpacity onPress={() => navigation.navigate('Video', { videoId: video.id })}>
      <View style={styles.container}>
        <ImageBackground
          style={styles.imageContainer}
          imageStyle={styles.image}
          source={{ uri: video.thumbnail }}
        >
          <View style={styles.content}>
            {children}
          </View>
        </ImageBackground>
      </View>
    </TouchableOpacity>
  );
}

VideoListItem.defaultProps = {
  children: null,
};

VideoListItem.propTypes = {
  video: PropTypes.shape({
    id: PropTypes.string,
    thumbnail: PropTypes.string,
  }).isRequired,
  children: PropTypes.node,
};

const styles = StyleSheet.create({
  container: {
    borderRadius: 20,
  },
  image: {
    borderRadius: 20,
    resizeMode: 'cover',
  },
  imageContainer: {
    width: '100%',
    height: 200,
  },
  content: {
    backgroundColor: '#0000009c',
    height: '100%',
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 20,
  },
});
