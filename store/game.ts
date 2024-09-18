import { defineStore } from 'pinia';

export const useGameStore = defineStore('game', {
  state: () => ({
    score: 0,
    playerName: '',
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

      // Отправляем запрос на сервер с результатами игры
      if (this.playerName) {
        try {
          fetch(`/api/log?name=${encodeURIComponent(this.playerName)}&score=${this.score}`, {
            method: 'GET',
          });
        } catch (error) {
          console.error('Ошибка при отправке результатов:', error);
        }
      }
    },
    decrementTime() {
      if (this.timeLeft > 0) {
        this.timeLeft--;
      }
      if (this.timeLeft === 0) {
        this.endGame();
      }
    },
    setPlayerName(name: string) {
      this.playerName = name;
    },
  },
});