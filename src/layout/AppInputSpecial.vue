<script setup lang="ts">

const props = defineProps({
  modelValue: {
    type: String,
    required: true,
    default: '',
  },
  name: {
    type: String,
    required: false,
  },
  id: {
    type: String,
    required: false,
  },
  label: {
    type: String,
    required: true,
  },
  placeholder: {
    type: String,
    required: false,
  },
  type: {
    type: String,
    required: false,
  },
})

const emit = defineEmits<{
  'update:modelValue': [string | null]
  'update:name': [string | null]
}>()

</script>

<template>
  <div class="form-group">
    <label :for="id">{{ props.label }} :</label>
    <input :id="props.id" :value="props.modelValue" @input="emit('update:modelValue', $event?.target?.value)"
      :type="props.type || 'text'" :placeholder="props.placeholder || `Entrez ${props.label}`" />
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
