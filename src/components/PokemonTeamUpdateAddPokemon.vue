<script setup lang="ts">
import { useTeamStore } from '@/stores/teamStore'
import { ref, computed } from 'vue'
import SearchPokemonSimple from '@/components/SearchPokemonSimple.vue'
import type { Pokemon, PokemonTeam } from '@/types/pokemon'

// STORE
const teamStore = useTeamStore()

// DATA & STORE
const currentTeam = computed(() => teamStore.currentTeam)
const searchResult = ref<Pokemon | null>(null)
const alertMessage = ref('')
const loading = ref(false)

// FUNCTIONS
function handleSearchResult(result: Pokemon | null) {
  searchResult.value = result as Pokemon
  alertMessage.value = ''
}

function handleAddPokemonToTeam() {
  loading.value = true
  alertMessage.value = ''

  if (!currentTeam.value) {
    alertMessage.value = 'Aucune équipe sélectionnée.'
    return
  }
  if (!searchResult.value) {
    alertMessage.value = 'Aucun Pokémon sélectionné à ajouter.'
    return
  }
  if (teamStore.currentTeamPokemonsCount >= 6) {
    alertMessage.value = "L'équipe ne peut pas contenir plus de 6 Pokémons."
    return
  }
  const exists = currentTeam.value.pokemons.find((p) => p.id === searchResult.value?.id)
  if (exists) {
    alertMessage.value = 'Ce Pokémon est déjà dans l’équipe.'
    return
  }

  teamStore
    .apiUpdateTeam({
      ...currentTeam.value,
      pokemons: [...currentTeam.value.pokemons, searchResult.value] as Pokemon[],
    } as PokemonTeam)
    .then(() => {
      alertMessage.value = `${searchResult?.value?.name} ajouté à l'équipe!`
    })
    .catch(() => {
      // Error handling
    })
    .finally(() => {
      loading.value = false
      setTimeout(() => {
        alertMessage.value = ''
      }, 2500)
    })
}
</script>

<template>
  <div>
    <div class="add-pokemon-container">
      <!-- Section recherche -->
      <div class="search-section">
        <h2>Ajouter un Pokémon</h2>
        <SearchPokemonSimple @update:result="handleSearchResult" />
        <div v-if="alertMessage" class="alert-message" :class="{ success: alertMessage.includes('ajouté') }">
          {{ alertMessage }}
        </div>
        <!-- add pokemon to team -->
        <div v-if="searchResult" class="search-result-wrapper">
          <button @click="handleAddPokemonToTeam" class="btn-primary">Ajouter</button>
        </div>
      </div>
    </div>
  </div>
</template>

<style>
.add-pokemon-container {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 2rem;
  width: 100%;
  box-sizing: border-box;
  min-width: 0;
}

.search-section {
  background-color: white;
  padding: 1.5rem;
  border-radius: 8px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  display: flex;
  flex-direction: column;
  gap: 1rem;
  box-sizing: border-box;
  min-width: 0;
}

.alert-message {
  padding: 1rem;
  border-radius: 8px;
  background-color: #fee;
  color: #c33;
  font-weight: 500;

  &.success {
    background-color: #e8f5e9;
    color: #2e7d32;
  }
}

.search-result-wrapper {
  display: flex;
  gap: 1rem;
  align-items: center;
  justify-content: flex-end;
  margin-top: 0.5rem;
  flex-wrap: wrap;
}

:deep(.search-result-wrapper .result) {
  flex: 1;
  margin-top: 0;
  margin-bottom: 0;
  min-width: 200px;
}

.team-section {
  background-color: white;
  padding: 1.5rem;
  border-radius: 8px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  box-sizing: border-box;
  min-width: 0;
}

.pokemons-container {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.empty-message {
  text-align: center;
  color: #999;
  padding: 2rem 1rem;
  font-size: 0.95rem;
}

.pokemon-item {
  display: flex;
  gap: 1rem;
  align-items: center;
}

:deep(.pokemon-item .result) {
  flex: 1;
  margin-top: 0;
  margin-bottom: 0;
}

.remove-button {
  padding: 0.5rem 1rem;
  background-color: #fee;
  color: #c33;
  border: 1px solid #ddd;
  border-radius: 8px;
  cursor: pointer;
  font-weight: 600;
  white-space: nowrap;
  transition: all 0.2s;

  &:hover {
    background-color: #fcc;
    border-color: #c33;
  }
}

main>.btn-primary {
  align-self: center;
  width: 100%;
  margin-top: 2rem;
}
</style>
