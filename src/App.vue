<script setup lang="ts">
import { ref } from 'vue'
import SearchPokemon from '@/components/SearchPokemon.vue'
import SearchPokemonResult from '@/components/SearchPokemonResult.vue'
import type { Pokemon } from './types/pokemon';

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
    <SearchPokemon @search="handleSearch" />
    <SearchPokemonResult v-bind:pokemon="selectedPokemon" />
  </div>
</template>

<style scoped></style>
