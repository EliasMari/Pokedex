<script setup>
import WelcomeItem from './WelcomeItem.vue'
import DocumentationIcon from './icons/IconDocumentation.vue'
import ToolingIcon from './icons/IconTooling.vue'
import EcosystemIcon from './icons/IconEcosystem.vue'
import CommunityIcon from './icons/IconCommunity.vue'
import SupportIcon from './icons/IconSupport.vue'

// Contenido de la Pokédex
</script>

<template>
  <WelcomeItem>
    <template #icon>
      <DocumentationIcon />
    </template>
    <template #heading>Pokédex</template>

    Explora nuestra completa base de datos de Pokémon. Encuentra información detallada
    sobre cada criatura, incluyendo sus estadísticas, tipos, habilidades y evoluciones.
  </WelcomeItem>

  <WelcomeItem>
    <template #icon>
      <ToolingIcon />
    </template>
    <template #heading>Búsqueda Avanzada</template>

    Filtra Pokémon por tipo, región, generación o estadísticas. Encuentra exactamente
    el Pokémon que estás buscando con nuestras herramientas de búsqueda avanzada.
  </WelcomeItem>

  <WelcomeItem>
    <template #icon>
      <EcosystemIcon />
    </template>
    <template #heading>Tipos y Efectividades</template>

    Aprende sobre las fortalezas y debilidades de cada tipo de Pokémon. Nuestra guía
    de efectividad te ayudará a crear el equipo perfecto para tus batallas.
  </WelcomeItem>

  <WelcomeItem>
    <template #icon>
      <CommunityIcon />
    </template>
    <template #heading>Movimientos y Habilidades</template>

    Explora la lista completa de movimientos y habilidades de Pokémon. Marca tus favoritos
    para acceder rápidamente a los que más utilizas en tus estrategias de combate.
  </WelcomeItem>

  <WelcomeItem>
    <template #icon>
      <SupportIcon />
    </template>
    <template #heading>Mis Favoritos</template>

    Guarda tus Pokémon favoritos para acceder rápidamente a ellos. Organiza tus Pokémon preferidos en listas personalizadas para un acceso rápido y fácil.
  </WelcomeItem>
</template>
