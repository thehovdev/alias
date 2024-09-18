<template>
  <div class="min-h-screen bg-gray-100 flex flex-col justify-center py-12">
    <div class="relative py-3 max-w-xl mx-auto w-[90%]">
      <div class="absolute inset-0 rounded-3xl"></div>
      <div class="relative px-4 py-10 bg-white shadow-lg rounded-3xl p-20">
        <h1 class="text-3xl font-bold mb-8 text-center text-gray-800">Alias</h1>
        <AliasGame />
        <p class="mt-6 text-xl font-semibold text-center text-gray-700" v-if="gameStore.isGameActive">
        {{ playerName }}
         / Hesab: {{ score }}
        </p>
        <Leaderboard />
      </div>
    </div>
  </div>


</template>

<script setup lang="ts">
import { useGameStore } from '~/store/game'

const gameStore = useGameStore()
const { playerName } = storeToRefs(gameStore)
const score = computed(() => gameStore.score)
</script>

<style scoped>
  div {
    overflow-x: hidden;
  }
</style>