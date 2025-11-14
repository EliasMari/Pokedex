<script setup>
    import { storeToRefs } from "pinia";
    import { useFavoritosStore } from '@/stores/favoritos';
    import { ref, onMounted } from 'vue';

    const useFavoritos = useFavoritosStore();
    const { eliminar } = useFavoritos;
    const { favoritos } = storeToRefs(useFavoritos);
    const pokemons = ref([]);

    const cargarFavoritos = async () => {
        pokemons.value = []; // Limpiar el array antes de cargar
        for (const name of favoritos.value) {
            try {
                const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${name.toLowerCase()}`);
                const data = await response.json();
                pokemons.value.push({
                    name: data.name,
                    image: data.sprites.other['official-artwork'].front_default || data.sprites.front_default,
                    id: data.id
                });
            } catch (error) {
                console.error(`Error cargando datos de ${name}:`, error);
            }
        }
    };

    const eliminarFavorito = async (pokemonName) => {
        eliminar(pokemonName);
        await cargarFavoritos(); // Recargar la lista después de eliminar
    };

    onMounted(cargarFavoritos);
</script>

<template>
    <div class="favoritos-container">
        <h1>Mis Pokémon Favoritos</h1>
        <div v-if="pokemons.length === 0" class="empty-state">
            <p>No tienes ningún Pokémon en favoritos</p>
        </div>
        <div v-else class="pokemon-grid">
            <div v-for="pokemon in pokemons" :key="pokemon.name" class="pokemon-card">
                <RouterLink :to="`/pokemons/${pokemon.name}`" class="pokemon-link">
                    <img :src="pokemon.image" :alt="pokemon.name" class="pokemon-image" />
                    <h3 class="pokemon-name">{{ pokemon.name.charAt(0).toUpperCase() + pokemon.name.slice(1) }}</h3>
                    <p class="pokemon-id">#{{ String(pokemon.id).padStart(3, '0') }}</p>
                </RouterLink>
                <button @click="eliminarFavorito(pokemon.name)" class="remove-button" @click.stop.prevent>
                    <span class="material-icons">♡</span> Quitar de favoritos
                </button>
            </div>
        </div>
    </div>
</template>

<style scoped>
.favoritos-container {
    width: 100%;
    margin: 0 auto;
    padding: 20px;
}

h1 {
    text-align: center;
    margin-bottom: 30px;
    position: relative;
    padding-bottom: 1rem;
    font-size: 2.5rem;
    color: #2563eb;
}

h1::after {
  content: '';
  position: absolute;
  bottom: 0;
  left: 50%;
  transform: translateX(-50%);
  width: 80px;
  height: 4px;
  background: linear-gradient(90deg, #3b82f6, #10b981);
  border-radius: 2px;
}
.empty-state {
    text-align: center;
    padding: 40px 20px;
    color: #6c757d;
    font-size: 1.2rem;
}

.pokemon-grid {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
    gap: 25px;
    padding: 20px 0;
}

.pokemon-card {
    background: white;
    border-radius: 15px;
    overflow: hidden;
    box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1);
    transition: transform 0.3s ease, box-shadow 0.3s ease;
    display: flex;
    flex-direction: column;
}

.pokemon-card:hover {
    transform: translateY(-5px);
    box-shadow: 0 10px 20px rgba(0, 0, 0, 0.15);
}

.pokemon-link {
    text-decoration: none;
    color: inherit;
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 20px 10px;
    flex-grow: 1;
}

.pokemon-image {
    width: 120px;
    height: 120px;
    object-fit: contain;
    margin-bottom: 15px;
    transition: transform 0.3s ease;
}

.pokemon-card:hover .pokemon-image {
    transform: scale(1.1);
}

.pokemon-name {
    margin: 5px 0;
    color: #2c3e50;
    font-size: 1.2rem;
    text-align: center;
}

.pokemon-id {
    color: #7f8c8d;
    font-size: 0.9rem;
    margin: 5px 0;
}

.remove-button {
    width: 100%;
    padding: 10px;
    background-color: #ff6b6b;
    color: white;
    border: none;
    border-top: 1px solid #eee;
    cursor: pointer;
    font-size: 0.9rem;
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 5px;
    transition: background-color 0.2s;
}

.remove-button:hover {
    background-color: #ff5252;
}

.remove-button .material-icons {
    font-size: 1.1rem;
}

@media (max-width: 768px) {
    .pokemon-grid {
        grid-template-columns: repeat(auto-fill, minmax(150px, 1fr));
        gap: 15px;
    }
    
    .pokemon-image {
        width: 100px;
        height: 100px;
    }
}
</style>