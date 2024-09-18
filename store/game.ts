import { defineStore } from 'pinia';
import { ref } from 'vue';
import { useLocalStorage } from '@vueuse/core';

export const useGameStore = defineStore('game', () => {
  const key = ref(1)
  const score = ref(0);
  const playerName = useLocalStorage('playerName', localStorage.getItem('playerName') || '');
  const timeLeft = ref(60); // 60 секунд = 1 минута
  const isGameActive = ref(false);

  function incrementScore() {
    score.value++;
  }

  function resetScore() {
    score.value = 0;
  }

  function startGame() {
    isGameActive.value = true;
    timeLeft.value = 60;
    score.value = 0;
  }

  function endGame() {
    isGameActive.value = false;

    // Отправляем запрос на сервер с результатами игры
    if (playerName.value && process.client) {
      try {
          fetch(`/api/log?name=${encodeURIComponent(playerName.value)}&score=${score.value}`, {
            method: 'GET',
          });

         setTimeout(() => {
          key.value++
         }, 3000)
          
        } catch (error) {
        console.error('Ошибка при отправке результатов:', error);
      }
    }
  }

  function decrementTime() {
    if (timeLeft.value > 0) {
      timeLeft.value--;
    }
    if (timeLeft.value === 0) {
      endGame();
    }
  }

  function setPlayerName(name: string) {
    playerName.value = name;
    if (process.client) {
      localStorage.setItem('playerName', name);
    }
  }

  return {
    key,
    score,
    playerName,
    timeLeft,
    isGameActive,
    incrementScore,
    resetScore,
    startGame,
    endGame,
    decrementTime,
    setPlayerName,
  };
});