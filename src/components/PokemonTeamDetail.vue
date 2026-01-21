<script setup lang="ts">
import { computed, onMounted, ref } from 'vue'
import { useRoute } from 'vue-router'
import { useTeamStore } from '@/stores/teamStore'
import type { PokemonTeam } from '@/types/pokemon'

const route = useRoute()
const teamStore = useTeamStore()


const team = ref<PokemonTeam>()


onMounted(() => {
    const foundTeam = teamStore.teams.find(t => t.id === route.params.id as string) as PokemonTeam
    if (foundTeam?.id) {
        team.value = foundTeam as PokemonTeam
    }
    else {
        // store get team from API if not found in store
    }
})







const createdDate = computed(() => {
    if (!team.value) return ''
    return new Date(team.value.createdAt).toLocaleDateString('fr-FR')
})

const updatedDate = computed(() => {
    if (!team.value || !team.value.updatedAt) return ''
    return new Date(team.value.updatedAt).toLocaleDateString('fr-FR')
})
</script>

<template>
    <div class="team-detail">
        <div v-if="!team" class="empty-state">
            <p>Équipe non trouvée</p>
        </div>

        <div v-else class="team-container">
            <!-- En-tête de l'équipe -->
            <div class="team-header">
                <h1 class="team-name">{{ team.name }}</h1>
                <p v-if="team.subname" class="team-subname">{{ team.subname }}</p>
            </div>

            <!-- Informations de l'équipe -->
            <div class="team-info">
                <div class="info-item">
                    <span class="info-label">Pokémons:</span>
                    <span class="info-value">{{ team.pokemons.length }}</span>
                </div>
                <div class="info-item">
                    <span class="info-label">Créée le:</span>
                    <span class="info-value">{{ createdDate }}</span>
                </div>
                <div v-if="team.updatedAt" class="info-item">
                    <span class="info-label">Modifiée le:</span>
                    <span class="info-value">{{ updatedDate }}</span>
                </div>
            </div>

            <!-- Liste des pokémons -->
            <div class="pokemons-section">
                <h2>Équipe Pokémon</h2>
                <div v-if="team.pokemons.length === 0" class="no-pokemons">
                    <p>Aucun pokémon dans cette équipe</p>
                </div>
                <div v-else class="pokemons-grid">
                    <div v-for="(pokemon, index) in team.pokemons" :key="pokemon.id" class="pokemon-card">
                        <div class="pokemon-position">{{ index + 1 }}</div>
                        <div class="pokemon-image">
                            <img :src="pokemon.sprite" :alt="pokemon.name" />
                        </div>
                        <div class="pokemon-info">
                            <h3 class="pokemon-name">{{ pokemon.name }}</h3>
                            <p class="pokemon-id">#{{ pokemon.pokedexId }}</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<style scoped>
.team-detail {
    width: 100%;
    padding: 2rem;
    max-width: 1200px;
    margin: 0 auto;
}

.empty-state {
    text-align: center;
    padding: 4rem 2rem;
    color: #999;
    font-size: 1.2rem;
}

.team-container {
    background: white;
    border-radius: 12px;
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
    overflow: hidden;
}

.team-header {
    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
    color: white;
    padding: 3rem 2rem;
    text-align: center;
}

.team-name {
    font-size: 2.5rem;
    font-weight: bold;
    margin: 0 0 0.5rem 0;
}

.team-subname {
    font-size: 1.1rem;
    opacity: 0.9;
    margin: 0;
}

.team-info {
    display: flex;
    gap: 2rem;
    padding: 2rem;
    background: #f9f9f9;
    border-bottom: 1px solid #e0e0e0;
    flex-wrap: wrap;
}

.info-item {
    display: flex;
    align-items: center;
    gap: 0.5rem;
}

.info-label {
    font-weight: 600;
    color: #333;
}

.info-value {
    color: #666;
}

.pokemons-section {
    padding: 2rem;
}

.pokemons-section h2 {
    margin: 0 0 1.5rem 0;
    color: #333;
    font-size: 1.5rem;
}

.no-pokemons {
    text-align: center;
    padding: 2rem;
    color: #999;
}

.pokemons-grid {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(160px, 1fr));
    gap: 1.5rem;
}

.pokemon-card {
    background: white;
    border: 2px solid #e0e0e0;
    border-radius: 12px;
    padding: 1rem;
    text-align: center;
    transition: all 0.3s ease;
    position: relative;
    overflow: hidden;
}

.pokemon-card:hover {
    border-color: #667eea;
    box-shadow: 0 8px 16px rgba(102, 126, 234, 0.2);
    transform: translateY(-4px);
}

.pokemon-position {
    position: absolute;
    top: 0.5rem;
    right: 0.5rem;
    background: #667eea;
    color: white;
    width: 28px;
    height: 28px;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 0.85rem;
    font-weight: bold;
}

.pokemon-image {
    width: 100%;
    height: 120px;
    display: flex;
    align-items: center;
    justify-content: center;
    background: #f5f5f5;
    border-radius: 8px;
    margin-bottom: 0.75rem;
    overflow: hidden;
}

.pokemon-image img {
    width: 100px;
    height: 100px;
    object-fit: contain;
}

.pokemon-info {
    padding: 0.5rem 0;
}

.pokemon-name {
    margin: 0.5rem 0 0.25rem 0;
    font-size: 1rem;
    font-weight: 600;
    color: #333;
}

.pokemon-id {
    margin: 0;
    font-size: 0.85rem;
    color: #999;
}

@media (max-width: 768px) {
    .team-detail {
        padding: 1rem;
    }

    .team-header {
        padding: 2rem 1rem;
    }

    .team-name {
        font-size: 2rem;
    }

    .team-info {
        flex-direction: column;
        gap: 1rem;
        padding: 1.5rem;
    }

    .pokemons-section {
        padding: 1.5rem;
    }

    .pokemons-grid {
        grid-template-columns: repeat(auto-fill, minmax(140px, 1fr));
        gap: 1rem;
    }
}
</style>
