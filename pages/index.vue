<template>
  <div class="min-h-screen bg-gray-100 py-6 flex flex-col justify-center sm:py-12">
    <div class="relative py-3 sm:max-w-xl sm:mx-auto">
      <div class="absolute inset-0 bg-gradient-to-r from-cyan-400 to-light-blue-500 shadow-lg transform -skew-y-6 sm:skew-y-0 sm:-rotate-6 sm:rounded-3xl"></div>
      <div class="relative px-4 py-10 bg-white shadow-lg sm:rounded-3xl sm:p-20">
        <h1 class="text-4xl font-bold mb-8 text-center text-gray-800">Добро пожаловать в Алиас!</h1>
        <AliasGame />
        <p class="mt-6 text-xl font-semibold text-center text-gray-700">Ваш текущий счет: {{ score }}</p>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useGameStore } from '~/store/game'

const gameStore = useGameStore()
const score = computed(() => gameStore.score)
</script>