<script setup lang="ts">
import { ref } from 'vue'

// REF
const inputs = ref([
  // { id: 1, value: '', type: 'text', event1: 'change' },
  // { id: 2, value: '', type: 'password', event1: 'click' },
])

function handleEvent1(event: Event) {
  console.log(`Event on input`, event)
  inputs.value.push(
    { id: inputs.value.length + 1, value: '', type: 'text', event1: 'change' })
}

function handleClick(event: Event) {
  console.log('Input clicked:', event)
}

function handleChange(event: Event) {
  console.log('Input changed:', event)
}


</script>

<template>
  <div>
    <div v-for="input in inputs" :key="input.id">

      <AppInputSpecial v-model="input.value" />

      <!-- <input v-bind:type="input.type" v-model="input.value" :placeholder="`Input ${input.id}`"
        v-on:[input.event1]="handleEvent1" /> -->
    </div>
  </div>
</template>

<style scoped></style>
