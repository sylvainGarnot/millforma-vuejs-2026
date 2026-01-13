<script setup lang="ts">
import type { Pokemon } from '../types/pokemon'


// PROPS
defineProps<{
    pokemon: Pokemon | null
}>()



</script>

<template>
    <div v-if="pokemon" class="result-container">
        <div class="result-card">
            <div class="image-wrapper">
                <img :src="pokemon.image" :alt="pokemon.name" class="pokemon-image" />
            </div>
            <div class="info-wrapper">
                <h2 class="pokemon-name">{{ pokemon.name }}</h2>
                <div class="info-grid">
                    <div class="info-item">
                        <span class="label">ID:</span>
                        <span class="value">{{ pokemon.id }}</span>
                    </div>
                    <div class="info-item">
                        <span class="label">Pokédex ID:</span>
                        <span class="value">{{ pokemon.pokedexId }}</span>
                    </div>
                </div>
                <div class="sprite-wrapper">
                    <img :src="pokemon.sprite" :alt="pokemon.name + ' sprite'" class="pokemon-sprite" />
                </div>
            </div>
        </div>
    </div>
    <div v-else class="no-result">
        <p>Aucun pokémon sélectionné</p>
    </div>
</template>

<style scoped>
.result-container {
    width: 100%;
    padding: 2rem;
}

.no-result {
    text-align: center;
    color: #999;
    font-size: 1.1rem;
    padding: 2rem;
}

.result-card {
    display: flex;
    gap: 2rem;
    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
    border-radius: 12px;
    padding: 2rem;
    box-shadow: 0 4px 15px rgba(0, 0, 0, 0.2);
    color: white;
    max-width: 600px;
    margin: 0 auto;
}

.image-wrapper {
    flex-shrink: 0;
    display: flex;
    align-items: center;
    justify-content: center;
    background: rgba(255, 255, 255, 0.1);
    border-radius: 8px;
    padding: 1rem;
    min-width: 200px;
    height: 200px;
}

.pokemon-image {
    width: 100%;
    height: 100%;
    object-fit: contain;
    filter: drop-shadow(0 0 8px rgba(255, 255, 255, 0.3));
}

.info-wrapper {
    flex: 1;
    display: flex;
    flex-direction: column;
    justify-content: center;
}

.pokemon-name {
    font-size: 2rem;
    margin: 0 0 1.5rem 0;
    text-transform: capitalize;
    font-weight: bold;
    text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.3);
}

.info-grid {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 1rem;
    margin-bottom: 1.5rem;
}

.info-item {
    display: flex;
    flex-direction: column;
    background: rgba(255, 255, 255, 0.1);
    padding: 1rem;
    border-radius: 6px;
    backdrop-filter: blur(10px);
}

.label {
    font-size: 0.875rem;
    opacity: 0.9;
    font-weight: 500;
    margin-bottom: 0.25rem;
}

.value {
    font-size: 1.25rem;
    font-weight: bold;
}

.sprite-wrapper {
    display: flex;
    justify-content: center;
    background: rgba(255, 255, 255, 0.1);
    border-radius: 6px;
    padding: 1rem;
}

.pokemon-sprite {
    width: 96px;
    height: 96px;
    object-fit: contain;
    image-rendering: pixelated;
}

@media (max-width: 600px) {
    .result-card {
        flex-direction: column;
        gap: 1rem;
    }

    .image-wrapper {
        min-width: 100%;
        height: 150px;
    }

    .pokemon-name {
        font-size: 1.5rem;
    }

    .info-grid {
        grid-template-columns: 1fr;
    }
}
</style>
