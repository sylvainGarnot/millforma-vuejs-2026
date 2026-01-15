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
    console.log('Appel API pour récupérer les équipes de pokémons'); // TEST

    axios.get('http://localhost:3000/teams')
      .then(response => {
        console.log('Données reçues:', response); // TEST

        setTeams(response.data.map(
          (teamData: PokemonTeam) => {
            return {
              id: teamData.id || '',
              name: teamData.name || '',
              subname: teamData.subname || '',
              pokemons: teamData.pokemons || [] as Pokemon[],
              createdAt: teamData.createdAt || '',
              updatedAt: teamData.updatedAt || ''
            } as PokemonTeam
          }
        ));
      })
      .catch(error => {
        console.error('Erreur:', error)
        // throw error
      })
  }


  return {
    teams,
    teamCount,
    pokemonCount,
    apiGetTeams
  }
})