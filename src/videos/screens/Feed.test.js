import React from 'react';
import { MockedProvider } from '@apollo/react-testing';
import { GET_VIDEOS } from '../api/queries';
import Feed from './Feed';
import wait from 'waait';
import { mount } from 'enzyme';
import { act } from 'react-dom/test-utils';

jest.mock('@react-navigation/native', () => ({
  useNavigation: jest.fn(),
}));

it('should render dog', async () => {

  await act(async () => {
    const mock = {
      request: {
        query: GET_VIDEOS,
      },
      result: {
        data: { videos: [{ id: 1, thumbnail: 'Buck', title: 'poodle' }] },
      },
    };
  
    const component = mount(
      <MockedProvider mocks={[mock]} addTypename={false}>
        <Feed />
      </MockedProvider>,
    );
  
    await wait(0); // wait for response
  });
  
});
