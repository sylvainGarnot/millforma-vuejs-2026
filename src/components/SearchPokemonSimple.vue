<script setup lang="ts">
import { ref } from 'vue'
import SearchPokemonSimpleSearch from '@/components/SearchPokemonSimpleSearch.vue'
import SearchPokemonSimpleResult from '@/components/SearchPokemonSimpleResult.vue'
import type { Pokemon } from '@/types/pokemon';

// STATE
const selectedPokemon = ref<Pokemon | null>(null)

// FUNCTIONS
const handleSearch = (pokemon: Pokemon | null) => {
  console.log('Pokémon recherché:', pokemon)
  selectedPokemon.value = pokemon
}

</script>

<template>
  <div>
    <SearchPokemonSimpleSearch @search="handleSearch" />
    <SearchPokemonSimpleResult v-bind:pokemon="selectedPokemon" />
  </div>
</template>

<style scoped></style>
