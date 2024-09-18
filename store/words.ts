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
      // Здесь должен быть запрос к API или загрузка из файла
      this.words = [
        {
          id: 1,
          word: 'Кот',
          description: 'Домашнее животное, которое мурлычет',
          options: ['Собака', 'Кот', 'Хомяк', 'Попугай'],
        },
        {
          id: 2,
          word: 'Компьютер',
          description: 'Электронное устройство для обработки информации',
          options: ['Телефон', 'Компьютер', 'Телевизор', 'Планшет'],
        },
        {
          id: 3,
          word: 'Книга',
          description: 'Печатное издание с текстом и/или изображениями',
          options: ['Журнал', 'Газета', 'Книга', 'Брошюра'],
        },
        {
          id: 4,
          word: 'Велосипед',
          description: 'Двухколесное транспортное средство без мотора',
          options: ['Мотоцикл', 'Самокат', 'Велосипед', 'Скейтборд'],
        },
        {
          id: 5,
          word: 'Пицца',
          description: 'Итальянское блюдо в виде круглой лепешки с начинкой',
          options: ['Паста', 'Пицца', 'Лазанья', 'Ризотто'],
        },
        {
          id: 6,
          word: 'Гитара',
          description: 'Струнный музыкальный инструмент',
          options: ['Скрипка', 'Фортепиано', 'Гитара', 'Флейта'],
        },
        {
          id: 7,
          word: 'Солнце',
          description: 'Звезда в центре Солнечной системы',
          options: ['Луна', 'Марс', 'Солнце', 'Юпитер'],
        },
        {
          id: 8,
          word: 'Океан',
          description: 'Огромное водное пространство на поверхности Земли',
          options: ['Море', 'Озеро', 'Река', 'Океан'],
        },
        {
          id: 9,
          word: 'Самолет',
          description: 'Воздушное транспортное средство с крыльями',
          options: ['Вертолет', 'Самолет', 'Дирижабль', 'Ракета'],
        },
        {
          id: 10,
          word: 'Часы',
          description: 'Прибор для измерения времени',
          options: ['Компас', 'Термометр', 'Часы', 'Барометр'],
        },
      ]
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