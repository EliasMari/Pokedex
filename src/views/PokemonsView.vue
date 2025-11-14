<script setup>
    import { ref, onMounted, computed } from 'vue';
    import { useGetData } from '@/composables/useGetData';
    import Paginacion from '@/components/Paginacion.vue';
    import NumPost from '@/components/NumPost.vue';

    const { getData, datos, error, cargando } = useGetData();
    const searchQuery = ref('');
    const offset = ref(0);
    const limit = ref(20);
    const allPokemons = ref([]);
    const isSearching = ref(false);

    onMounted(async () => {
        await fetchAllPokemons();
        fetchPokemons();
    });

    const fetchAllPokemons = async () => {
        try {
            const response = await fetch('https://pokeapi.co/api/v2/pokemon?limit=1000');
            const data = await response.json();
            allPokemons.value = data.results;
        } catch (err) {
            console.error('Error fetching all pokemons:', err);
        }
    };

    const fetchPokemons = () => {
        getData(`https://pokeapi.co/api/v2/pokemon?offset=${offset.value}&limit=${limit.value}`);
    };

    const next = () => {
        offset.value += limit.value;
        fetchPokemons();
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    const prev = () => {
        if (offset.value >= limit.value) {
            offset.value -= limit.value;
            fetchPokemons();
            window.scrollTo({ top: 0, behavior: 'smooth' });
        }
    };

    const cambio = (num) => {
        limit.value = parseInt(num);
        offset.value = 0;
        fetchPokemons();
    };

    const filteredPokemons = computed(() => {
        if (!datos.value?.results) return [];
        
        if (searchQuery.value.trim() === '') {
            return datos.value.results;
        }
        
        const query = searchQuery.value.toLowerCase();
        return allPokemons.value.filter(pokemon => 
            pokemon.name.toLowerCase().includes(query)
        );
    });
</script>

<template>
    <div class="pokedex-container">
        <div class="pokedex-header">
            <h1>Pokédex</h1>
            <div class="search-container">
                <input 
                    type="text" 
                    v-model="searchQuery" 
                    placeholder="Buscar Pokémon..."
                    class="search-input"
                >
            </div>
            <div class="controls">
                <div class="controls-left">
                    <NumPost @cambio="cambio" />
                </div>
                <div class="controls-right">
                    <Paginacion 
                        @next="next"
                        @prev="prev"
                        :inicio="datos?.previous"
                        :fin="datos?.next"
                    />
                </div>
            </div>
        </div>

        <div v-if="cargando" class="loading">
            <div class="spinner"></div>
            <p>Cargando Pokémons...</p>
        </div>
        
        <div v-else-if="error" class="error">
            <p>Error al cargar los Pokémons. Inténtalo de nuevo más tarde.</p>
        </div>   
        
        <div v-else class="pokemon-grid">
            <router-link 
                v-for="poke in filteredPokemons" 
                :key="poke.name"
                :to="`/pokemons/${poke.name}`"
                class="pokemon-card"
            >
                <div class="pokemon-image">
                    <img 
                        :src="`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${poke.url.split('/')[6]}.png`" 
                        :alt="poke.name"
                        @error="$event.target.src='https://via.placeholder.com/150?text=?'"
                    >
                </div>
                <div class="pokemon-info">
                    <h3>{{ poke.name.charAt(0).toUpperCase() + poke.name.slice(1) }}</h3>
                    <span class="pokemon-number">#{{ ('000' + poke.url.split('/')[6]).slice(-3) }}</span>
                </div>
            </router-link>
        </div>
    </div>
</template>

<style scoped>
.pokedex-container {
    width: 100%;
    max-width: 100%;
    margin: 0;
    padding: 20px;
}

.pokedex-header {
    text-align: center;
    margin-bottom: 30px;
}

h1 {
    color: #e2e8f0;
    font-size: 2.5rem;
    margin-bottom: 20px;
    position: relative;
    padding-bottom: 1rem;
    text-transform: uppercase;
    letter-spacing: 2px;
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

.search-container {
    margin: 20px 0;
}

.search-input {
    width: 100%;
    max-width: 400px;
    padding: 12px 20px;
    font-size: 1rem;
    background-color: #2d3748;
    color: #e2e8f0;
    border: 2px solid #4a5568;
    border-radius: 25px;
    outline: none;
    transition: all 0.3s ease;
}

.search-input:focus {
    border-color: #63b3ed;
    box-shadow: 0 0 0 3px rgba(99, 179, 237, 0.3);
    background-color: #2d3748;
}

.search-input::placeholder {
    color: #a0aec0;
}

.controls {
    display: flex;
    justify-content: space-between;
    align-items: center;
    flex-wrap: wrap;
    gap: 15px;
    margin: 20px 0;
    width: 100%;
}

.controls-left {
    margin-right: auto;
}

.controls-right {
    display: flex;
    gap: 10px;
    margin-left: auto;
}

.pokemon-grid {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
    gap: 20px;
    padding: 20px;
    width: 100%;
    max-width: 1600px;
    margin: 0 auto;
}

.pokemon-card {
    background: #2d3748;
    border-radius: 15px;
    overflow: hidden;
    box-shadow: 0 4px 15px rgba(0, 0, 0, 0.2);
    transition: transform 0.3s ease, box-shadow 0.3s ease, background 0.3s ease;
    text-decoration: none;
    color: #f7fafc;
    display: flex;
    flex-direction: column;
    height: 100%;
    border: 1px solid #4a5568;
}

.pokemon-card:hover {
    transform: translateY(-5px);
    box-shadow: 0 10px 20px rgba(0, 0, 0, 0.3);
    background: #3c4a62;
    border-color: #63b3ed;
}

.pokemon-image {
    background: #1a202c;
    padding: 20px;
    display: flex;
    justify-content: center;
    align-items: center;
    height: 180px;
    border-bottom: 1px solid #4a5568;
}

.pokemon-image img {
    width: 100%;
    height: 100%;
    object-fit: contain;
    transition: transform 0.3s ease;
}

.pokemon-card:hover .pokemon-image img {
    transform: scale(1.1);
}

.pokemon-info {
    padding: 20px 15px;
    text-align: center;
    background: #2d3748;
    position: relative;
}

.pokemon-info h3 {
    margin: 0 0 8px 0;
    color: #f7fafc;
    font-size: 1.1rem;
    text-transform: capitalize;
    font-weight: 600;
}

.pokemon-number {
    display: inline-block;
    background: #1a202c;
    color: #a0aec0;
    padding: 4px 12px;
    border-radius: 15px;
    font-size: 0.8rem;
    margin-top: 4px;
    border: 1px solid #4a5568;
    font-weight: 500;
}

.loading {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    padding: 40px;
    color: #e2e8f0;
}

.spinner {
    width: 50px;
    height: 50px;
    border: 4px solid #2d3748;
    border-top: 4px solid #63b3ed;
    border-radius: 50%;
    animation: spin 1s linear infinite;
    margin-bottom: 20px;
}

@keyframes spin {
    0% { transform: rotate(0deg); }
    100% { transform: rotate(360deg); }
}

.error {
    text-align: center;
    color: #feb2b2;
    padding: 20px;
    background: #742a2a;
    border: 1px solid #f56565;
    border-radius: 10px;
    margin: 20px 0;
}

@media (max-width: 768px) {
    .pokemon-grid {
        grid-template-columns: repeat(auto-fill, minmax(150px, 1fr));
    }
    
    .controls {
        flex-direction: column;
        gap: 10px;
    }
}
</style>