import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import axios from 'axios';
import dadJokes from '../api/dadJokes';

export default () => {
  const getJoke = async () => {
    try {
      let result = await dadJokes.get('/');
      return result.joke;
    } catch (e) {
      console.log('error', e.messege);
    }
  };

  const joke = getJoke();

  return [joke];
};
