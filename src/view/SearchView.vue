<script setup lang="ts">
import { onMounted, ref, provide } from 'vue'
import SearchPokemonSimple from '@/components/SearchPokemonSimple.vue'
import { useRouter } from 'vue-router'

const router = useRouter()

// REFS
const id = ref<string>('')


// PROVIDED FUNCTIONS
// provide('getCurrentId', () => id.value)
provide('getCurrentId', id)



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
    <SearchPokemonSimple @update:name="handleUpdateName" @update:id="handleUpdateId" />
  </div>
</template>

<style scoped></style>
