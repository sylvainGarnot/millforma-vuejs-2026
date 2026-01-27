<script setup lang="ts">
import { ref, onMounted, onUpdated, watch, inject } from 'vue'
import type { Pokemon } from '@/types/pokemon'
import AppInputSpecial from '@/layout/AppInputSpecial.vue'

// REFS
const inputId = ref('')
const inputName = ref('')

// INJECT
const id = inject('getCurrentId')


// EMITS
const emit = defineEmits<{
  search: [Pokemon | null]
  reset: []
}>()

onMounted(() => {
  console.log('HOOK MOUNTED - SearchPokemon monté', id)
  // if (id) {
  //   inputId.value = id._value as string
  //   handleSubmit()
  // }
})

onUpdated(() => {
  console.log('HOOK UPDATED - SearchPokemon mis à jour', id)
})

watch(
  id,
  (newIdValue) => {
    console.log('WATCHER - inject id changé:', newIdValue)
    inputId.value = newIdValue as string
    handleSubmit()
  }
)



// FUNCTIONS
const handleSubmit = () => {
  console.log('Soumission du formulaire avec ID:', id.value, 'et Nom:', name.value)

  fetch('https://pokebuildapi.fr/api/v1/pokemon/' + inputId.value)
    .then((response) => {
      return response.json()
    })
    .then((data) => {
      // console.log('Données reçues:', data)
      const results: Pokemon = {
        id: data.id,
        pokedexId: data.pokedexId,
        name: data.name,
        image: data.image,
        sprite: data.sprite,
        // types: data.apiTypes.map((type: PokemonType) => ({
        //   name: type.name,
        //   image: type.image,
        // })),
      }
      // console.log('Résultats formatés:', results)
      emit('search', results)
    })
    .catch((error) => {
      console.error('Erreur lors de la recherche:', error)
      // error.value = 'Erreur lors de la recherche'
      emit('search', null)
    })
    .finally(() => {
      // loading.value = false
    })
}

const handleReset = () => {
  console.log('Réinitialisation du formulaire')
  inputId.value = ''
  inputName.value = ''
  emit('reset')
}
</script>

<template>
  <div class="form-container">
    <form @submit.prevent="handleSubmit">
      <h2>Formulaire</h2>

      <!-- INPUT ID -->
      <AppInputSpecial label="ID" id="id" v-model="inputId" placeholder="Entrez l'ID" type="text" />

      <!-- INPUT NAME -->
      <AppInputSpecial label="Nom" id="name" v-model="inputName" placeholder="Entrez le nom" type="text" />

      <div class="form-actions">
        <button type="submit" class="btn btn-primary">Soumettre</button>
        <button type="button" class="btn btn-secondary" @click="handleReset">Réinitialiser</button>
      </div>
    </form>
  </div>
</template>
<style scoped>
.form-container {
  max-width: 400px;
  margin: 2rem auto;
  padding: 2rem;
  border: 1px solid #ddd;
  border-radius: 8px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
}

h2 {
  text-align: center;
  color: #333;
  margin-bottom: 1.5rem;
}

.form-group {
  margin-bottom: 1.5rem;
  display: flex;
  flex-direction: column;
}

label {
  margin-bottom: 0.5rem;
  font-weight: 500;
  color: #555;
}

input {
  padding: 0.75rem;
  border: 1px solid #ccc;
  border-radius: 4px;
  font-size: 1rem;
  transition: border-color 0.3s;
}

input:focus {
  outline: none;
  border-color: #007bff;
  box-shadow: 0 0 0 3px rgba(0, 123, 255, 0.25);
}

.form-actions {
  display: flex;
  gap: 1rem;
  justify-content: center;
}

.btn {
  padding: 0.75rem 1.5rem;
  border: none;
  border-radius: 4px;
  font-size: 1rem;
  cursor: pointer;
  transition: all 0.3s;
}

.btn-primary {
  background-color: #007bff;
  color: white;
}

.btn-primary:hover {
  background-color: #0056b3;
}

.btn-secondary {
  background-color: #6c757d;
  color: white;
}

.btn-secondary:hover {
  background-color: #545b62;
}
</style>
