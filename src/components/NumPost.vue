<script setup>
    const emit = defineEmits(["cambio"]);
</script>

<template>
    <select @change="emit('cambio', tam)" v-model="tam">
        <option disabled value="">Seleccciona nº post</option>
        <option>10</option>
        <option>15</option>
        <option>20</option>
    </select>
</template>