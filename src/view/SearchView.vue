<script setup lang="ts">
import { onMounted, ref } from 'vue'
import SearchPokemonSimple from '@/components/SearchPokemonSimple.vue'
import { useRouter } from 'vue-router'

const router = useRouter()

// REFS
const id = ref<string>('')


// FUNCTIONS
const handleUpdateName = (name: string) => {
  if (!name) {
    router.push({ name: 'search' })
    id.value = ''
    return
  }
  router.push({ query: { name } })
}

const handleUpdateId = (id: string) => {
  if (!id) {
    router.push({ name: 'search' })
    return
  }
  router.push({ params: { id } })
}

onMounted(() => {
  console.log('SearchView monté', router.currentRoute.value.params.id)
  const idParam = router.currentRoute.value.params.id
  if (idParam) id.value = idParam as string
})


</script>

<template>
  <div>
    <!-- router.back() -->
    <SearchPokemonSimple @update:name="handleUpdateName" @update:id="handleUpdateId" :id="id" />
  </div>
</template>

<style scoped></style>
