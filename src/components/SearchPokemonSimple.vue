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
  'update:id': [string],
  'update:name': [string],
}>()


// FUNCTIONS
const handleSearch = (pokemon: Pokemon | null) => {
  console.log('Pokémon recherché:', pokemon)
  selectedPokemon.value = pokemon
  if (pokemon?.name) emit('update:name', pokemon.name)
  if (pokemon?.id) emit('update:id', String(pokemon.id))
}

const handleReset = () => {
  console.log('Réinitialisation du Pokémon sélectionné')
  selectedPokemon.value = null
  emit('update:name', '')
  emit('update:id', '')
}

</script>

<template>
  <div>
    <SearchPokemonSimpleSearch @search="handleSearch" @reset="handleReset" :id="id" />
    <SearchPokemonSimpleResult v-if="selectedPokemon?.id" v-bind:pokemon="selectedPokemon" />
  </div>
</template>

<style scoped></style>
