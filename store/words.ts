    
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
      const shuffledWords = [...words]
      for (let i = shuffledWords.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1))
        ;[shuffledWords[i], shuffledWords[j]] = [shuffledWords[j], shuffledWords[i]]
      }
      this.words = shuffledWords
    },
    nextWord() {
      if (this.currentWordIndex < this.words.length - 1) {
        this.currentWordIndex++
      }
    }
  },
  getters: {
    currentWord: (state) => state.words[state.currentWordIndex],
  },
})