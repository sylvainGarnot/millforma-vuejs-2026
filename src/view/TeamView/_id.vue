<script setup lang="ts">
import PokemonTeamDetail from '@/components/PokemonTeamDetail.vue'
import { useRouter } from 'vue-router'

const router = useRouter()
</script>

<template>
  <div>
    <PokemonTeamDetail :id="router.currentRoute.value.params.id?.toString()" />
  </div>
</template>

<style scoped></style>
