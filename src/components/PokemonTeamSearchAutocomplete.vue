<script setup lang="ts">
import { ref } from 'vue'
import { useTeamStore } from '@/stores/teamStore'
import type { PokemonTeam } from '@/types/pokemon'


// Store
const teamStore = useTeamStore()

// State
const searchQuery = ref('')
const resultTeams = ref<PokemonTeam[]>([])
const loading = ref(false)

// Fonction de recherche avec debounce
async function onSearchUpdate(query: string) {

  if (!query || query.trim().length < 2) {
    resultTeams.value = []
    return
  }

  loading.value = true

  try {
    resultTeams.value = await teamStore.apiGetPokemonTeamsAutocomplete(query)
  } catch (error) {
    console.error('Erreur lors de la recherche:', error)
    resultTeams.value = []
  } finally {
    loading.value = false
  }
}

</script>

<template>
  <v-autocomplete v-model="searchQuery" :items="resultTeams" :loading="loading" label="Rechercher une équipe"
    placeholder="Tapez pour rechercher..." item-title="name" item-value="id" return-object clearable no-filter
    @update:search="onSearchUpdate">

    <template #item="{ item }">
      <v-list-item :title="item.raw.name" :subtitle="item.raw.subname">
        <template #append>
          <v-avatar v-for="pokemon in item.raw.pokemons" :key="pokemon.id" color="grey" size="40">
            <img :src="pokemon.sprite" :alt="pokemon.name" />
          </v-avatar>
        </template>
      </v-list-item>
    </template>

  </v-autocomplete>
</template>


<style scoped>
/* Styles personnalisés si nécessaire */
</style>
