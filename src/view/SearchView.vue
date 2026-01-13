<script setup lang="ts">
import { onMounted, ref } from 'vue'
import SearchPokemonSimple from '@/components/SearchPokemonSimple.vue'
import { useRouter } from 'vue-router'

const router = useRouter()

// REFS
const id = ref<string>('')


// FUNCTIONS
const handleUpdateName = (name: string) => {
  router.push({ query: { name } })
}

onMounted(() => {
  console.log('SearchView monté', router.currentRoute.value.params)
  const idParam = router.currentRoute.value.params.id
  if (idParam) id.value = idParam as string
})


</script>

<template>
  <div>
    <!-- router.back() -->
    <SearchPokemonSimple @update:name="handleUpdateName" :id="id" />
  </div>
</template>

<style scoped></style>
