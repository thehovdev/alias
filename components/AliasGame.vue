<template>
  <div class="alias-game max-w-md mx-auto p-1">
    <!-- <h2 class="text-2xl font-bold mb-4 text-center">təsvirdən sözü təxmin et</h2> -->
    <div v-if="!gameStore.isGameActive" class="text-center">
      <div v-if="!gameStore.playerName" class="mb-4">
        <input
          v-model.trim="name" 
          placeholder="Adınızı daxil edin" 
          class="border rounded py-2 px-3 w-full mb-2"
        />
        <button 
          @click="playerName = name"
          class="bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded w-full"
        >
          Təsdiq et
        </button>
      </div>
      <div v-else>
        <button 
          @click="startGame" 
          class="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded w-full"
        >
          Oyuna başla
        </button>
      </div>
    </div>
    <div v-else>
      <div class="text-center mb-4">
        <span class="text-xl font-bold">Vaxt: {{ gameStore.timeLeft }} saniyə</span>
      </div>
      <div v-if="currentWord" class="bg-white shadow-md rounded-lg p-6">
        <p class="text-lg mb-4">{{ currentWord.description }}</p>
        <div class="grid grid-cols-1 gap-2">
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
    </div>
    <div v-if="gameStore.isGameActive === false && gameStore.timeLeft === 0" class="text-center text-xl font-bold mt-8">
      Oyun bitdi! Sizin xalınız: {{ gameStore.score }}
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, watch, computed } from 'vue'
import { useWordsStore } from '~/store/words'
import { useGameStore } from '~/store/game'

const wordsStore = useWordsStore()
const gameStore = useGameStore()
const { playerName } = storeToRefs(gameStore)


const currentWord = computed(() => wordsStore.currentWord)
const selectedOption = ref<string | null>(null)
const name = ref('') 

let timer: number | null = null


function startGame() {
  if (gameStore.playerName) {
    gameStore.startGame()
    wordsStore.fetchWords()
    timer = setInterval(() => {
      gameStore.decrementTime()
      if (gameStore.timeLeft === 0) {
        clearInterval(timer!)
      }
    }, 1000)
  }
}

function checkAnswer(option: string) {
  if (selectedOption.value || !gameStore.isGameActive) return
  selectedOption.value = option
  if (option === currentWord.value.word) {
    gameStore.incrementScore()
  }
  
  setTimeout(() => {
    selectedOption.value = null
    wordsStore.nextWord()
  }, 1000)
}

watch(() => wordsStore.currentWordIndex, () => {
  selectedOption.value = null
})

onMounted(() => {
  name.value = playerName.value || ''
})

onUnmounted(() => {
  if (timer) {
    clearInterval(timer)
  }
})
</script>