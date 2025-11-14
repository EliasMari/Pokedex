<script setup>
    import VolverPokemons from '@/components/VolverPokemons.vue';
    import { useRoute, useRouter, RouterLink } from 'vue-router';
    import { useGetData } from '@/composables/useGetData';
    import { useFavoritosStore } from '@/stores/favoritos';
    import { storeToRefs, mapState } from 'pinia';
    import { ref, computed, watch } from 'vue';

    const useFavorito = useFavoritosStore();
    const { anyadir } = useFavorito;
    const { favoritos } = storeToRefs(useFavorito);

    const route = useRoute();
    const router = useRouter();
    const activeTab = ref('about');
    const { getData, datos, error, cargando } = useGetData();

    getData(`https://pokeapi.co/api/v2/pokemon/${route.params.nombre}`);

    const typeColors = {
        normal: '#A8A77A',
        fire: '#EE8130',
        water: '#6390F0',
        electric: '#F7D02C',
        grass: '#7AC74C',
        ice: '#96D9D6',
        fighting: '#C22E28',
        poison: '#A33EA1',
        ground: '#E2BF65',
        flying: '#A98FF3',
        psychic: '#F95587',
        bug: '#A6B91A',
        rock: '#B6A136',
        ghost: '#735797',
        dragon: '#6F35FC',
        dark: '#705746',
        steel: '#B7B7CE',
        fairy: '#D685AD',
    };

    const primaryColor = computed(() => {
        if (!datos.value?.types) return '#777';
        return typeColors[datos.value.types[0].type.name] || '#777';
    });

    const stats = computed(() => {
        if (!datos.value?.stats) return [];
        return [
            { name: 'HP', value: datos.value.stats[0].base_stat },
            { name: 'Attack', value: datos.value.stats[1].base_stat },
            { name: 'Defense', value: datos.value.stats[2].base_stat },
            { name: 'Sp. Atk', value: datos.value.stats[3].base_stat },
            { name: 'Sp. Def', value: datos.value.stats[4].base_stat },
            { name: 'Speed', value: datos.value.stats[5].base_stat },
        ];
    });

    const showNotification = ref(false);
    const notificationMessage = ref('');

    const addToFavorites = () => {
        anyadir(datos.value);
        notificationMessage.value = `¡${datos.value.name} se ha añadido a favoritos!`;
        showNotification.value = true;
        
        setTimeout(() => {
            showNotification.value = false;
        }, 3000);
    };

    const isFavorite = computed(() => {
        return favoritos.value.some(pokemon => pokemon.name === datos.value?.name);
    });
</script>

<template>
    <div class="notification" v-if="showNotification">
        {{ notificationMessage }}
    </div>
    <div class="pokemon-detail" :style="{ '--primary-color': primaryColor }">
        <div class="back-button">
            <RouterLink to="/pokemons" class="back-link">
                &larr; Volver a la Pokédex
            </RouterLink>
        </div>

        <div v-if="cargando" class="loading">
            <div class="spinner"></div>
            <p>Cargando información del Pokémon...</p>
        </div>

        <div v-else-if="error" class="error">
            <p>No se pudo cargar la información del Pokémon.</p>
            <RouterLink to="/pokemons" class="back-link">Volver a la Pokédex</RouterLink>
        </div>   

        <div v-else class="pokemon-container">
            <div class="pokemon-header">
                <div class="pokemon-info">
                    <h1 class="pokemon-name">
                        {{ datos.name.charAt(0).toUpperCase() + datos.name.slice(1) }}
                    </h1>
                    <div class="pokemon-types">
                        <span 
                            v-for="type in datos.types" 
                            :key="type.slot"
                            class="type-badge"
                            :style="{ backgroundColor: typeColors[type.type.name] || '#777' }"
                        >
                            {{ type.type.name }}
                        </span>
                    </div>
                    <div class="pokemon-number">
                        #{{ ('000' + datos.id).slice(-3) }}
                    </div>
                </div>
                <div class="pokemon-image-container">
                    <img 
                        :src="datos.sprites.other['official-artwork'].front_default || datos.sprites.front_default" 
                        :alt="datos.name"
                        class="pokemon-main-image"
                        @error="$event.target.src='https://via.placeholder.com/400?text=Pokémon+no+encontrado'"
                    >
                </div>
            </div>

            <div class="pokemon-content">
                <div class="tabs">
                    <button 
                        :class="['tab-button', { active: activeTab === 'about' }]"
                        @click="activeTab = 'about'"
                    >
                        Acerca de
                    </button>
                    <button 
                        :class="['tab-button', { active: activeTab === 'stats' }]"
                        @click="activeTab = 'stats'"
                    >
                        Estadísticas
                    </button>
                    <button 
                        :class="['tab-button', { active: activeTab === 'moves' }]"
                        @click="activeTab = 'moves'"
                    >
                        Movimientos
                    </button>
                </div>

                <div class="tab-content">
                    <div v-if="activeTab === 'about'" class="about-tab">
                        <div class="info-row">
                            <span class="info-label">Altura:</span>
                            <span class="info-value">{{ (datos.height / 10).toFixed(1) }} m</span>
                        </div>
                        <div class="info-row">
                            <span class="info-label">Peso:</span>
                            <span class="info-value">{{ (datos.weight / 10).toFixed(1) }} kg</span>
                        </div>
                        <div class="info-row">
                            <span class="info-label">Habilidades:</span>
                            <div class="abilities">
                                <RouterLink 
                                    v-for="ability in datos.abilities" 
                                    :key="ability.ability.name"
                                    :to="`/pokemons/ability/${ability.ability.name}`"
                                    class="ability-link"
                                >
                                    {{ ability.ability.name.replace('-', ' ') }}
                                </RouterLink>
                            </div>
                        </div>
                    </div>

                    <div v-else-if="activeTab === 'stats'" class="stats-tab">
                        <div v-for="stat in stats" :key="stat.name" class="stat-row">
                            <span class="stat-name">{{ stat.name }}</span>
                            <div class="stat-bar-container">
                                <div 
                                    class="stat-bar" 
                                    :style="{ 
                                        width: `${Math.min(100, (stat.value / 255) * 100)}%`,
                                        backgroundColor: primaryColor 
                                    }"
                                ></div>
                            </div>
                            <span class="stat-value">{{ stat.value }}</span>
                        </div>
                    </div>

                    <div v-else-if="activeTab === 'moves'" class="moves-tab">
                        <div class="moves-grid">
                            <span 
                                v-for="(move, index) in datos.moves.slice(0, 20)" 
                                :key="index"
                                class="move-tag"
                            >
                                {{ move.move.name.replace('-', ' ') }}
                            </span>
                        </div>
                    </div>
                </div>
            </div>

            <button 
                @click="addToFavorites" 
                class="favorite-button"
                :class="{ 'is-favorite': isFavorite }"
            >
                {{ isFavorite ? '★ En favoritos' : '☆ Añadir a favoritos' }}
            </button>
        </div>
    </div>
</template>

<style scoped>
.pokemon-detail {
    width: 100%;
    max-width: 100%;
    margin: 0;
    padding: 20px;
    color: #f7fafc;
    box-sizing: border-box;
}

.back-button {
    margin-bottom: 20px;
}

.back-link {
    display: inline-flex;
    align-items: center;
    color: #63b3ed;
    text-decoration: none;
    font-weight: 500;
    padding: 8px 16px;
    border-radius: 8px;
    transition: all 0.2s ease;
    background-color: #2d3748;
    border: 1px solid #4a5568;
}

.back-link:hover {
    background-color: #3c4a62;
    transform: translateX(-4px);
    color: #ebf8ff;
}

.loading, .error {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    min-height: 300px;
    text-align: center;
}

.spinner {
    width: 50px;
    height: 50px;
    border: 5px solid #f3f3f3;
    border-top: 5px solid var(--primary-color, #3b82f6);
    border-radius: 50%;
    animation: spin 1s linear infinite;
    margin-bottom: 20px;
}

@keyframes spin {
    0% { transform: rotate(0deg); }
    100% { transform: rotate(360deg); }
}

.pokemon-container {
    background: #2d3748;
    border-radius: 16px;
    overflow: hidden;
    box-shadow: 0 10px 30px rgba(0, 0, 0, 0.3);
    width: 100%;
    max-width: 100%;
    margin: 0;
    box-sizing: border-box;
    border: 1px solid #4a5568;
}

.pokemon-header {
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 30px 20px;
    background: linear-gradient(135deg, var(--primary-color, #3b82f6) 0%, #1e40af 100%);
    color: white;
    position: relative;
}

.pokemon-info {
    text-align: center;
    margin-bottom: 20px;
    z-index: 1;
}

.pokemon-name {
    font-size: 2.5rem;
    margin: 0 0 10px;
    text-transform: capitalize;
    text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.2);
}

.pokemon-types {
    display: flex;
    gap: 10px;
    justify-content: center;
    margin-bottom: 15px;
}

.type-badge {
    padding: 5px 15px;
    border-radius: 20px;
    font-size: 0.9rem;
    font-weight: 600;
    text-transform: capitalize;
    color: white;
    text-shadow: 1px 1px 2px rgba(0, 0, 0, 0.2);
}

.pokemon-number {
    font-size: 1.2rem;
    font-weight: 600;
    opacity: 0.8;
}

.pokemon-image-container {
    width: 100%;
    max-width: 300px;
    margin: 0 auto;
    position: relative;
    z-index: 1;
}

.pokemon-main-image {
    width: 100%;
    height: auto;
    filter: drop-shadow(0 10px 15px rgba(0, 0, 0, 0.3));
    transition: transform 0.3s ease;
}

.pokemon-main-image:hover {
    transform: scale(1.05);
}

.pokemon-content {
    padding: 30px;
    background-color: #2d3748;
    color: #f7fafc;
}

.tabs {
    display: flex;
    border-bottom: 1px solid #4a5568;
    margin-bottom: 20px;
}

.tab-button {
    padding: 10px 20px;
    background: none;
    border: none;
    font-size: 1rem;
    font-weight: 600;
    color: #a0aec0;
    cursor: pointer;
    position: relative;
    transition: all 0.2s ease;
}

.tab-button:hover {
    color: #ebf8ff;
    background-color: rgba(99, 179, 237, 0.1);
}

.tab-button.active {
    color: #63b3ed;
}

.tab-button.active::after {
    content: '';
    position: absolute;
    bottom: -1px;
    left: 0;
    right: 0;
    height: 3px;
    background-color: #63b3ed;
    border-radius: 3px 3px 0 0;
}

.info-row {
    display: flex;
    margin-bottom: 15px;
    align-items: flex-start;
}

.info-label {
    width: 120px;
    font-weight: 600;
    color: #a0aec0;
}

.info-value {
    flex: 1;
    color: #f7fafc;
}

.abilities {
    display: flex;
    flex-wrap: wrap;
    gap: 8px;
}

.ability-link {
    display: inline-block;
    padding: 4px 12px;
    background-color: #1a202c;
    color: #a0aec0;
    border: 1px solid #4a5568;
    border-radius: 4px;
    text-decoration: none;
    transition: all 0.2s ease;
    text-transform: capitalize;
}

.ability-link:hover {
    background-color: #2d3748;
    color: #63b3ed;
    border-color: #63b3ed;
}
    
.stats-tab {
    display: flex;
    flex-direction: column;
    gap: 12px;
}

.stat-row {
    display: flex;
    align-items: center;
    margin-bottom: 15px;
}

.stat-name {
    width: 100px;
    font-weight: 600;
    color: #a0aec0;
}

.stat-bar-container {
    flex: 1;
    height: 8px;
    background-color: #1a202c;
    border-radius: 4px;
    margin: 0 15px;
    overflow: hidden;
    border: 1px solid #4a5568;
}

.stat-bar {
    height: 100%;
    border-radius: 2px;
}

.stat-value {
    width: 40px;
    text-align: right;
    font-weight: 600;
    color: #f7fafc;
}

.moves-grid {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(120px, 1fr));
    gap: 10px;
}

.move-tag {
    background-color: #1a202c;
    padding: 5px 10px;
    border-radius: 20px;
    font-size: 0.9rem;
    text-align: center;
    color: #a0aec0;
    text-transform: capitalize;
    border: 1px solid #4a5568;
    transition: all 0.2s ease;
}

.move-tag:hover {
    background-color: #2d3748;
    color: #63b3ed;
    border-color: #63b3ed;
}

.favorite-button {
    display: block;
    width: calc(100% - 60px);
    margin: 20px auto;
    padding: 12px;
    font-size: 1rem;
    font-weight: 600;
    color: #f7fafc;
    background-color: #2d3748;
    border: 2px solid #4a5568;
    border-radius: 8px;
    cursor: pointer;
    transition: all 0.3s ease;
    text-align: center;
}

.favorite-button:hover {
    transform: translateY(-2px);
    background-color: #3c4a62;
    border-color: #63b3ed;
    color: #63b3ed;
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.2);
}

.favorite-button.is-favorite {
    background-color: #2c5282;
    border-color: #63b3ed;
    color: #63b3ed;
}

.favorite-button:disabled {
    background-color: #4a5568;
    color: #a0aec0;
    cursor: not-allowed;
    transform: none;
    box-shadow: none;
    border-color: #4a5568;
}

.notification {
    position: fixed;
    top: 20px;
    left: 50%;
    transform: translateX(-50%);
    background-color: #2f855a;
    color: white;
    padding: 12px 24px;
    border-radius: 8px;
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.2);
    z-index: 1000;
    animation: slideIn 0.3s ease-out forwards;
    font-weight: 500;
    display: flex;
    align-items: center;
    gap: 8px;
}

@keyframes slideIn {
    from {
        transform: translate(-50%, -100%);
        opacity: 0;
    }
    to {
        transform: translate(-50%, 0);
        opacity: 1;
    }
}

.notification::before {
    content: '★';
    font-size: 1.2em;
}

@media (max-width: 768px) {
    .pokemon-header {
        padding: 20px 15px;
    }
    
    .pokemon-name {
        font-size: 2rem;
    }
    
    .pokemon-content {
        padding: 20px 15px;
    }
    
    .tab-button {
        padding: 8px 12px;
        font-size: 0.9rem;
    }
    
    .info-row {
        flex-direction: column;
        gap: 5px;
    }
    
    .info-label {
        width: 100%;
    }
    
    .moves-grid {
        grid-template-columns: repeat(auto-fill, minmax(100px, 1fr));
    }
}

@media (max-width: 480px) {
    .pokemon-name {
        font-size: 1.8rem;
    }
    
    .moves-grid {
        grid-template-columns: repeat(auto-fill, minmax(80px, 1fr));
    }
    
    .move-tag {
        font-size: 0.8rem;
        padding: 4px 8px;
    }
}
</style>