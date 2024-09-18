<template>
  <div class="font-sans text-gray-900 antialiased bg-gray-100 min-h-screen">
    <NuxtPage />
  </div>
</template>

<script setup lang="ts">
useHead({
  title: 'Alias Game',
  meta: [
    { name: 'description', content: 'A word guessing game in English' },
    { name: 'viewport', content: 'width=device-width, initial-scale=1' }
  ],
  link: [
    { rel: 'stylesheet', href: 'https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap' }
  ]
})
</script>

<style>
body {
  font-family: 'Inter', sans-serif;
}
</style>
