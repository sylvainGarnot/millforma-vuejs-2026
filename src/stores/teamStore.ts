import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import axios from 'axios'
import type { PokemonTeam, Pokemon } from '@/types/pokemon'

export const useTeamStore = defineStore('team', () => {
  // STATE (variables réactives)
  const teams = ref<PokemonTeam[]>([])
  const currentTeam = ref<PokemonTeam | null>(null)
  
  // Pagination state
  const teams_pagination_pages = ref(0)
  const teams_pagination_items = ref(0)
  const teams_pagination_next = ref(0)
  const teams_pagination_prev = ref(0)

  // GETTERS (variables calculées)
  const teamCount = computed(() => {
    return teams.value.length
  })
  const pokemonCount = computed(() => {
    return teams.value.reduce((total, team) => total + team.pokemons.length, 0)
  })
  const currentTeamPokemonsCount = computed(() => {
    return currentTeam.value ? currentTeam.value.pokemons.length : 0
  })
  const teamsPaginationCurrent = computed(() => {
    return teams_pagination_prev.value ? teams_pagination_prev.value + 1 : teams_pagination_next.value ? teams_pagination_next.value - 1 : 1
  })

  // MUTATIONS (SETTERS)
  function setTeams(newTeams: PokemonTeam[]) {
    teams.value = newTeams
  }
  function setCurrentTeam(team: PokemonTeam | null) {
    currentTeam.value = team
  }

  // ACTIONS (api calls, logique metier, ...)
  function apiGetTeams(page: number = 1, perPage: number = 2) {
    console.log(`Appel API pour récupérer les équipes de pokémons (page ${page}, ${perPage} par page)`) // TEST

    return axios
      .get('http://localhost:3000/teams', {
        params: {
          _page: page,
          _per_page: perPage
        }
      })
      .then((response) => {
        console.log('Données reçues:', response) // TEST

        const data = response.data.data || response.data
        teams_pagination_pages.value = response.data.pages || 1
        teams_pagination_items.value = response.data.items || data.length
        teams_pagination_next.value = response.data.next || null
        teams_pagination_prev.value = response.data.prev || null

        setTeams(
          data.map((teamData: PokemonTeam) => {
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
        throw error
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
        setCurrentTeam({
          id: response.data.id || '',
          name: response.data.name || '',
          subname: response.data.subname || '',
          pokemons: response.data.pokemons as Pokemon[],
          createdAt: response.data.createdAt || '',
          updatedAt: response.data.updatedAt || '',
        } as PokemonTeam)
      })
      .catch((error) => {
        console.error("Erreur lors de la création de l'équipe:", error)
      })
  }

  function apiUpdateTeam(updatedTeam: PokemonTeam) {
    console.log(`Appel API pour mettre à jour l'équipe de pokémons avec l'ID ${updatedTeam.id}`) // TEST

    return axios
      .put(`http://localhost:3000/teams/${updatedTeam.id}`, updatedTeam as PokemonTeam)
      .then((response) => {
        console.log('Équipe mise à jour:', response.data) // TEST
        setCurrentTeam({
          id: response.data.id || '',
          name: response.data.name || '',
          subname: response.data.subname || '',
          pokemons: response.data.pokemons as Pokemon[],
          createdAt: response.data.createdAt || '',
          updatedAt: response.data.updatedAt || '',
        } as PokemonTeam)
      })
      .catch((error) => {
        console.error("Erreur lors de la mise à jour de l'équipe:", error)
      })
  }

  function apiDeleteTeam(teamId: string) {
    // TODO
  }

  return {
    // state
    teams,
    currentTeam,
    teams_pagination_items,
    teams_pagination_pages,
    teams_pagination_next,
    teams_pagination_prev,

    // getters
    teamCount,
    pokemonCount,
    currentTeamPokemonsCount,
    teamsPaginationCurrent,

    // actions
    apiGetTeams,
    apiGetTeamById,
    apiCreateTeam,
    apiUpdateTeam,
    apiDeleteTeam,
  }
})
