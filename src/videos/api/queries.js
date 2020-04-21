import gql from 'graphql-tag';

export const GET_VIDEO = gql`
  query getVideo($videoId: ID!) {
    video(id: $videoId) {
      id
      title
      thumbnail
      url
    }
  }
`;

export const GET_VIDEOS = gql`
  query getVideos {
    videos {
      id
      title
      thumbnail
    }
  }
`;
