<script setup>
    defineProps(['inicio', 'fin']);
    const emit = defineEmits(['prev', 'next']);
</script>

<template>
    <button @click="emit('prev')" type="button" :disabled="!inicio">Anterior</button>
    <button @click="emit('next')" type="button" :disabled="!fin">Siguiente</button>
</template>