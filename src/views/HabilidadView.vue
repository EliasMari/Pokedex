<script setup>
    import VolverPokemons from '@/components/VolverPokemons.vue';
    import axios from 'axios';
    import { ref } from 'vue';
    import { useRoute } from 'vue-router';

    const route = useRoute();
    const pokemons = ref([]);

    const getData = async () => {
        try {
            const { data } = await axios.get(`https://pokeapi.co/api/v2/ability/${route.params.habilidad}`);
            console.log(data);
            pokemons.value = data.pokemon.map((item) => item.pokemon);
        } catch (error) {
            console.error('Error fetching Pokémon:', error);
        }
    };

    getData();
</script>

<template>
    <div class="habilidad-container">
        <h1 class="titulo-habilidad">Pokémon con la habilidad: <span class="nombre-habilidad">{{ route.params.habilidad }}</span></h1>
        <div class="pokemon-grid">
            <RouterLink 
                v-for="(poke, index) in pokemons" 
                :key="index"
                :to="`/pokemons/${poke.name}`"
                class="pokemon-item"
            >
                {{ poke.name }}
            </RouterLink>
        </div>
        <VolverPokemons />
    </div>
</template>

<style scoped>
.habilidad-container {
    width: 100%;
    margin: 0 auto;
    padding: 3rem 2rem;
    text-align: center;
}

.titulo-habilidad {
    color: #293851;
    margin-bottom: 2rem;
    font-size: 2.5rem;
    font-weight: 700;
    text-transform: capitalize;
    letter-spacing: 0.5px;
}

.nombre-habilidad {
    color: #10b981;
    font-weight: 700;
    text-shadow: 0 1px 2px rgba(0, 0, 0, 0.1);
}

.pokemon-grid {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
    gap: 1.5rem;
    margin: 3rem 0;
    padding: 0;
}

.pokemon-item {
    background: #2d3748;
    border: 1px solid #4a5568;
    border-radius: 14px;
    padding: 1.5rem;
    text-align: center;
    text-decoration: none;
    color: #f7fafc;
    font-weight: 600;
    font-size: 1.1rem;
    text-transform: capitalize;
    transition: all 0.3s ease;
    box-shadow: 0 4px 10px rgba(0, 0, 0, 0.05);
    position: relative;
    overflow: hidden;
}

.pokemon-item::before {
    content: '';
    position: absolute;
    top: 0;
    left: -100%;
    width: 100%;
    height: 100%;
    background: linear-gradient(90deg, rgba(16,185,129,0.15), rgba(16,185,129,0));
    transition: all 0.4s ease;
}

.pokemon-item:hover::before {
    left: 100%;
}

.pokemon-item:hover {
    transform: translateY(-6px);
    border-color: #10b981;
    box-shadow: 0 8px 20px rgba(16,185,129,0.15);
    color: #10b981;
}

@media (max-width: 768px) {
    .titulo-habilidad {
        font-size: 2rem;
    }

    .pokemon-grid {
        grid-template-columns: repeat(auto-fill, minmax(150px, 1fr));
    }
}

/* Animaciones suaves */
@keyframes fadeIn {
    from {
        opacity: 0;
        transform: translateY(15px);
    }
    to {
        opacity: 1;
        transform: translateY(0);
    }
}
</style>
