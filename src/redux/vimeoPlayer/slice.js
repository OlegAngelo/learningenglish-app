import { createSlice } from '@reduxjs/toolkit';
import Player from '@vimeo/player';

const newsSlice = createSlice({
  name: 'vimeoPlayer',
  initialState: {
    playerId: '',
    isPlaying: false,
    playbackRate: 1,
    test: false,
  },
  reducers: {
    resetVimeoPlayer: (state, action) => {
      state.playerId = '';
      state.isPlaying = false;
      state.playbackRate = 1;
    },
    setPlayerId: (state, action) => {
      state.playerId = action.payload.toString();
    },
    setIsPlaying: (state, action) => {
      state.isPlaying = action.payload;
    },
    togglePlay: (state, action) => {
      let player = new Player(state.playerId);

      if (state.isPlaying) {
        player
          .pause()
          .catch(function (error) {
            console.error(error)
            action.payload.onErrorCallback(error)
          });
      } else {
        player
          .play()
          .catch(function (error) {
            action.payload.onErrorCallback(error)
          });
      }
      state.isPlaying = action.payload.isPlaying ?? !state.isPlaying;
    },
    setPlaybackRate: (state, action) => {
      let player = new Player(state.playerId);

      player
        .setPlaybackRate(action.payload)
        .then((playbackRate) => {
          state.playbackRate = action.payload;
        })
        .catch((err) => {
          console.error(err);
        });
    },
  },
});

export const {
  resetVimeoPlayer,
  setPlayerId,
  setIsPlaying,
  togglePlay,
  setPlaybackRate,
} = newsSlice.actions;

export default newsSlice.reducer;
