<template>
  <div class="p-4 max-w-lg mx-auto">
    <h1 class="text-2xl font-bold mb-4 text-center">Таблица лидеров</h1>
    <div class="overflow-x-auto bg-white shadow-md rounded-lg">
      <table class="w-full table-auto">
        <thead>
          <tr class="bg-gray-200 text-gray-600 uppercase text-sm leading-normal">
            <th class="py-3 px-4 text-left">Место</th>
            <th class="py-3 px-4 text-left">Имя пользователя</th>
            <th class="py-3 px-4 text-right">Очки</th>
          </tr>
        </thead>
        <tbody class="text-gray-600 text-sm">
          <tr v-for="(player, index) in leaderboard" :key="player.user" class="border-b border-gray-200 hover:bg-gray-100">
            <td class="py-3 px-4 text-left">{{ index + 1 }}</td>
            <td class="py-3 px-4 text-left">{{ player.name }}</td>
            <td class="py-3 px-4 text-right font-bold">{{ player.score }}</td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'

interface Player {
  name: string;
  score: number;
}

const leaderboard = ref<Player[]>([])

onMounted(async () => {
  try {
    const response = await fetch('/api/log')
    const data: Player[] = await response.json()
    leaderboard.value = data.sort((a, b) => b.score - a.score)
  } catch (error) {
    console.error('Ошибка при загрузке данных таблицы лидеров:', error)
  }
})
</script>

<style scoped>
table {
  width: 100%;
  border-collapse: collapse;
}

th, td {
  border: 1px solid #ddd;
  padding: 8px;
  text-align: left;
}

th {
  background-color: #f2f2f2;
  font-weight: bold;
}
</style>
