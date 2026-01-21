<script setup lang="ts">
import { onMounted } from 'vue'
import { useRouter } from 'vue-router'
import PokemonTeamMultiple from '@/components/PokemonTeamMultiple.vue'
import { useTeamStore } from '@/stores/teamStore'

// ROUTER
const router = useRouter()

// STORE
// const { teams, apiGetTeams } = useTeamStore()
const teamStore = useTeamStore()

// MOUNTED
onMounted(() => {
  teamStore.apiGetTeams()
  // apiGetTeams()
})

// FUNCTIONS
</script>

<template>
  <div class="home-view">
    <div class="container">
      <div class="content">
        <h1 class="title">Pokédex</h1>
        <p class="subtitle">Bienvenue dans votre assistant Pokémon</p>

        <div class="features">
          <div class="feature-card">
            <div class="feature-icon">🔍</div>
            <h3>Recherche</h3>
            <p>Trouvez tous les pokémons rapidement et facilement</p>
          </div>
          <div class="feature-card">
            <div class="feature-icon">📊</div>
            <h3>Informations</h3>
            <p>Consultez les détails complets de chaque pokémon</p>
          </div>
          <div class="feature-card">
            <div class="feature-icon">⚡</div>
            <h3>Rapide</h3>
            <p>Accédez aux données en temps réel</p>
          </div>
        </div>

        <router-link :to="{ name: 'search' }" class="cta-button">Commencer la recherche</router-link>

        <!-- <button class="cta-button" @click="() => { router.push({ name: 'searchById', params: { id: '9' } }) }">
          Commencer la recherche
        </button> -->

        <div class="teams-section">
          <h2>Mes équipes</h2>
          <PokemonTeamMultiple :teams="teamStore.teams" />
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.home-view {
  width: 100%;
  min-height: 100vh;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 2rem 1rem;
}

.container {
  width: 100%;
  max-width: 900px;
}

.content {
  text-align: center;
  color: white;
}

.title {
  font-size: 4rem;
  font-weight: bold;
  margin-bottom: 1rem;
  text-shadow: 3px 3px 6px rgba(0, 0, 0, 0.3);
  animation: slideDown 0.8s ease-out;
}

.subtitle {
  font-size: 1.5rem;
  margin-bottom: 3rem;
  opacity: 0.95;
  animation: fadeIn 1s ease-out;
}

.features {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 2rem;
  margin-bottom: 3rem;
  animation: slideUp 0.8s ease-out;
}

.feature-card {
  background: rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(10px);
  padding: 2rem;
  border-radius: 12px;
  border: 1px solid rgba(255, 255, 255, 0.2);
  transition:
    transform 0.3s,
    box-shadow 0.3s;
}

.feature-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 8px 20px rgba(0, 0, 0, 0.2);
}

.feature-icon {
  font-size: 3rem;
  margin-bottom: 1rem;
}

.feature-card h3 {
  font-size: 1.3rem;
  margin-bottom: 0.5rem;
  font-weight: 600;
}

.feature-card p {
  font-size: 0.95rem;
  opacity: 0.9;
}

.cta-button {
  background: white;
  color: #667eea;
  padding: 1rem 2.5rem;
  font-size: 1.1rem;
  font-weight: bold;
  border: none;
  border-radius: 50px;
  cursor: pointer;
  transition: all 0.3s;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.2);
  animation: scaleIn 0.8s ease-out;
}

.cta-button:hover {
  transform: scale(1.05);
  box-shadow: 0 6px 20px rgba(0, 0, 0, 0.3);
}

.cta-button:active {
  transform: scale(0.98);
}

@keyframes slideDown {
  from {
    opacity: 0;
    transform: translateY(-30px);
  }

  to {
    opacity: 1;
    transform: translateY(0);
  }
}

@keyframes fadeIn {
  from {
    opacity: 0;
  }

  to {
    opacity: 1;
  }
}

@keyframes slideUp {
  from {
    opacity: 0;
    transform: translateY(30px);
  }

  to {
    opacity: 1;
    transform: translateY(0);
  }
}

@keyframes scaleIn {
  from {
    opacity: 0;
    transform: scale(0.9);
  }

  to {
    opacity: 1;
    transform: scale(1);
  }
}

@media (max-width: 768px) {
  .title {
    font-size: 2.5rem;
  }

  .subtitle {
    font-size: 1.2rem;
  }

  .features {
    grid-template-columns: 1fr;
    gap: 1.5rem;
  }

  .cta-button {
    padding: 0.875rem 2rem;
    font-size: 1rem;
  }
}

.teams-section {
  margin-top: 3rem;
  background: rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(10px);
  padding: 2rem;
  border-radius: 12px;
  border: 1px solid rgba(255, 255, 255, 0.2);
}

.teams-section h2 {
  color: white;
  margin-bottom: 1.5rem;
  font-size: 1.8rem;
}
</style>
