    
import { defineStore } from 'pinia'
import { words } from '~/data/words'
import type { Word } from '~/data/words'

export const useWordsStore = defineStore('words', {
  state: () => ({
    words: [] as Word[],
    currentWordIndex: 0,
  }),
  actions: {
    async fetchWords() {
      this.words = words.sort(() => Math.random() - 0.5)
    },
    nextWord() {
      if (this.currentWordIndex < this.words.length - 1) {
        this.currentWordIndex++
      }
    },
  },
  getters: {
    currentWord: (state) => state.words[state.currentWordIndex],
  },
})