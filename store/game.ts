import { defineStore } from 'pinia';

export const useGameStore = defineStore('game', {
  state: () => ({
    score: 0,
    timeLeft: 60, // 60 секунд = 1 минута
    isGameActive: false,
  }),
  actions: {
    incrementScore() {
      this.score++;
    },
    resetScore() {
      this.score = 0;
    },
    startGame() {
      this.isGameActive = true;
      this.timeLeft = 60;
      this.score = 0;
    },
    endGame() {
      this.isGameActive = false;
    },
    decrementTime() {
      if (this.timeLeft > 0) {
        this.timeLeft--;
      }
      if (this.timeLeft === 0) {
        this.endGame();
      }
    },
  },
});