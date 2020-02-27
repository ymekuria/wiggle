import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import axios from 'axios';
import dadJokes from '../api/dadJokes';

export default () => {
  const getJoke = async () => {
    try {
      let joke = await dadJokes.get('/');
    } catch (e) {
      console.log('error', e.messege);
    }
  };
};
