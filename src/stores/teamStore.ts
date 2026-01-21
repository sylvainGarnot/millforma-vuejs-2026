import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import axios from 'axios'
import type { PokemonTeam, Pokemon } from '@/types/pokemon'

export const useTeamStore = defineStore('team', () => {
  // STATE
  const teams = ref<PokemonTeam[]>([])

  // GETTERS (variables calculées)
  const teamCount = computed(() => {
    return teams.value.length
  })

  const pokemonCount = computed(() => {
    return teams.value.reduce((total, team) => total + team.pokemons.length, 0)
  })

  // MUTATIONS (SETTERS)
  function setTeams(newTeams: PokemonTeam[]) {
    teams.value = newTeams
  }

  // ACTIONS (api calls, logique metier, ...)
  function apiGetTeams() {
    console.log('Appel API pour récupérer les équipes de pokémons') // TEST

    axios
      .get('http://localhost:3000/teams')
      .then((response) => {
        console.log('Données reçues:', response) // TEST

        setTeams(
          response.data.map((teamData: PokemonTeam) => {
            return {
              id: teamData.id || '',
              name: teamData.name || '',
              subname: teamData.subname || '',
              pokemons: teamData.pokemons || ([] as Pokemon[]),
              createdAt: teamData.createdAt || '',
              updatedAt: teamData.updatedAt || '',
            } as PokemonTeam
          }),
        )
      })
      .catch((error) => {
        console.error('Erreur:', error)
        // throw error
      })
  }

  // Get a single team by ID
  function apiGetTeamById(teamId: string) {
    console.log(`Appel API pour récupérer l'équipe de pokémons avec l'ID ${teamId}`) // TEST

    return axios
      .get(`http://localhost:3000/teams/${teamId}`)
      .then((response) => {
        console.log('Données reçues:', response) // TEST

        return {
          id: response.data.id || '',
          name: response.data.name || '',
          subname: response.data.subname || '',
          pokemons: response.data.pokemons || ([] as Pokemon[]),
          createdAt: response.data.createdAt || '',
          updatedAt: response.data.updatedAt || '',
        } as PokemonTeam
      })
      .catch((error) => {
        console.error('Erreur:', error)
        throw error
      })
  }

  function apiCreateTeam(newTeam: PokemonTeam) {
    console.log('Appel API pour créer une nouvelle équipe de pokémons') // TEST

    return axios
      .post('http://localhost:3000/teams', newTeam as PokemonTeam)
      .then((response) => {
        console.log('Équipe créée:', response.data) // TEST
      })
      .catch((error) => {
        console.error("Erreur lors de la création de l'équipe:", error)
      })
  }

  function apiUpdateTeam(updatedTeam: PokemonTeam) {
    // TODO
  }

  function apiDeleteTeam(teamId: string) {
    // TODO
  }

  return {
    teams,
    teamCount,
    pokemonCount,
    apiGetTeams,
    apiGetTeamById,
    apiCreateTeam,
    apiUpdateTeam,
    apiDeleteTeam,
  }
})
