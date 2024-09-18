import { defineStore } from 'pinia'

interface Word {
  id: number
  word: string
  description: string
  options: string[]
}

export const useWordsStore = defineStore('words', {
  state: () => ({
    words: [] as Word[],
    currentWordIndex: 0,
  }),
  actions: {
    async fetchWords() {
      this.words = [
        {
          id: 1,
          word: 'Pişik',
          description: 'Mırıldayan ev heyvanı',
          options: ['İt', 'Pişik', 'Dələ', 'Tutuquşu'],
        },
        {
          id: 2,
          word: 'Kompüter',
          description: 'Məlumatları emal edən elektron cihaz',
          options: ['Telefon', 'Kompüter', 'Televizor', 'Planşet'],
        },
        {
          id: 3,
          word: 'Kitab',
          description: 'Mətn və/və ya şəkilləri olan çap nəşri',
          options: ['Jurnal', 'Qəzet', 'Kitab', 'Broşür'],
        },
        {
          id: 4,
          word: 'Velosiped',
          description: 'Motorsuz iki təkərli nəqliyyat vasitəsi',
          options: ['Motosiklet', 'Skuter', 'Velosiped', 'Skeytbord'],
        },
        {
          id: 5,
          word: 'Pizza',
          description: 'Dairəvi yastı çörək üzərində içlik olan İtalyan yeməyi',
          options: ['Pasta', 'Pizza', 'Lazanya', 'Rizotto'],
        },
        {
          id: 6,
          word: 'Gitara',
          description: 'Simli musiqi aləti',
          options: ['Skripka', 'Piano', 'Gitara', 'Fleyta'],
        },
        {
          id: 7,
          word: 'Günəş',
          description: 'Günəş sisteminin mərkəzindəki ulduz',
          options: ['Ay', 'Mars', 'Günəş', 'Yupiter'],
        },
        {
          id: 8,
          word: 'Okean',
          description: 'Yer səthində nəhəng su sahəsi',
          options: ['Dəniz', 'Göl', 'Çay', 'Okean'],
        },
        {
          id: 9,
          word: 'Təyyarə',
          description: 'Qanadları olan hava nəqliyyat vasitəsi',
          options: ['Vertolyot', 'Təyyarə', 'Dirijabı', 'Raket'],
        },
        {
          id: 10,
          word: 'Saat',
          description: 'Vaxtı ölçən cihaz',
          options: ['Kompas', 'Termometr', 'Saat', 'Barometr'],
        },
      ].sort(() => Math.random() - 0.5);
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