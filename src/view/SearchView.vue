<script setup lang="ts">
import SearchPokemonSimple from '@/components/SearchPokemonSimple.vue'
import { useRouter } from 'vue-router'

const router = useRouter()

// FUNCTIONS
const handleUpdateName = (name: string) => {
  router.push({ query: { name } })
}

</script>

<template>
  <div>
    <SearchPokemonSimple @update:name="handleUpdateName" />
  </div>
</template>

<style scoped></style>
