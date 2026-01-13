<script setup lang="ts">
import { ref } from 'vue'
import SearchPokemonSimpleSearch from '@/components/SearchPokemonSimpleSearch.vue'
import SearchPokemonSimpleResult from '@/components/SearchPokemonSimpleResult.vue'
import type { Pokemon } from '@/types/pokemon';

// STATE
const selectedPokemon = ref<Pokemon | null>(null)


// PROPS
defineProps<{
  id: string
}>()


// EMITS
const emit = defineEmits<{
  'update:name': [string],
}>()


// FUNCTIONS
const handleSearch = (pokemon: Pokemon | null) => {
  console.log('Pokémon recherché:', pokemon)
  selectedPokemon.value = pokemon
  if (pokemon?.name) emit('update:name', pokemon.name)
}

</script>

<template>
  <div>
    <SearchPokemonSimpleSearch @search="handleSearch" :id="id" />
    <SearchPokemonSimpleResult v-bind:pokemon="selectedPokemon" />
  </div>
</template>

<style scoped></style>
