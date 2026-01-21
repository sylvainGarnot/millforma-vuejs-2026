<script setup lang="ts">
import PokemonTeamCreate from '@/components/PokemonTeamCreate.vue'
import { useRouter } from 'vue-router'

const router = useRouter()
</script>

<template>
  <div>
    <h2>Nommage de l'équipe</h2>
    <PokemonTeamCreate @team-created="router.push({ name: 'createTeamAddPokemon' })" />
  </div>
</template>
