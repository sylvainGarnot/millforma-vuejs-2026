<script setup lang="ts">
import SearchPokemon from '@/components/SearchPokemon.vue'
import type { Pokemon } from './types/pokemon';


// FUNCTIONS
const handleSearch = (pokemon: Pokemon | null) => {
  console.log('Pokémon recherché:', pokemon)
}

</script>

<template>
  <div>
    <SearchPokemon @search="handleSearch" />
  </div>
</template>

<style scoped></style>
