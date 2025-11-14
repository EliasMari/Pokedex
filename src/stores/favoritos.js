import { defineStore } from "pinia";
import { ref } from "vue"

export const useFavoritosStore = defineStore('favoritos',()=>{
        const favoritos=ref([]);
        const anyadir = (poke)=>{
            favoritos.value.push(poke.name);
        }
        const eliminar = (poke)=>{
            favoritos.value.splice(favoritos.value.indexOf(poke),1);
        }
    return {
        favoritos,
        anyadir,
        eliminar
    }
})