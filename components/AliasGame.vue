<template>
  <div class="alias-game max-w-md mx-auto p-4">
    <h2 class="text-2xl font-bold mb-4 text-center">Алиас: Угадай слово</h2>
    <div v-if="currentWord" class="bg-white shadow-md rounded-lg p-6">
      <p class="text-lg mb-4">{{ currentWord.description }}</p>
      <div class="grid grid-cols-2 gap-4">
        <button
          v-for="option in currentWord.options"
          :key="option"
          @click="checkAnswer(option)"
          :class="[
            'font-bold py-2 px-4 rounded transition duration-200',
            {
              'bg-blue-500 hover:bg-blue-600 text-white': !selectedOption,
              'bg-green-500 text-white': selectedOption && option === currentWord.word,
              'bg-red-500 text-white': selectedOption && option === selectedOption && option !== currentWord.word,
              'bg-gray-300 cursor-not-allowed': selectedOption && option !== selectedOption
            }
          ]"
          :disabled="!!selectedOption"
        >
          {{ option }}
        </button>
      </div>
    </div>
    <div v-else class="text-center text-xl font-bold mt-8">
      Игра завершена!
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, watch } from 'vue'
import { useWordsStore } from '~/store/words'
import { useGameStore } from '~/store/game'

const wordsStore = useWordsStore()
const gameStore = useGameStore()

const currentWord = computed(() => wordsStore.currentWord)
const selectedOption = ref<string | null>(null)

onMounted(() => {
  wordsStore.fetchWords()
})

function checkAnswer(option: string) {
  if (selectedOption.value) return
  selectedOption.value = option
  if (option === currentWord.value.word) {
    gameStore.incrementScore()
  }
  
  // Переход к следующему вопросу через 1 секунду
  setTimeout(() => {
    selectedOption.value = null
    wordsStore.nextWord()
  }, 1000)
}

// Сброс выбранного ответа при изменении слова
watch(() => wordsStore.currentWordIndex, () => {
  selectedOption.value = null
})
</script>