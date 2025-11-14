<script setup>
// Componente de bienvenida con estilo Pokémon
</script>

<template>
  <div class="welcome-container">
    <div class="logo-container">
      <img alt="Vue logo" class="logo" src="@/assets/logo.svg" width="200" height="200" />
    </div>
    <div class="welcome-message">
      <h1>¡Bienvenido a la Pokédex!</h1>
      <p class="subtitle">Tu guía definitiva del mundo Pokémon</p>
    </div>
  </div>
</template>

<style scoped>
.welcome-container {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 4rem;
  max-width: 1000px;
  margin: 0 auto;
  padding: 2rem;
}

.logo-container {
  flex-shrink: 0;
}

.welcome-message {
  text-align: left;
  padding: 1rem 0;
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
  max-width: 600px;
}

h1 {
  font-size: 3rem;
  margin-bottom: 1rem;
  font-weight: 700;
  background: linear-gradient(135deg, #4a90e2, #8e44ad);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  animation: fadeIn 1s ease-in-out;
}

.subtitle {
  color: #7f8c8d;
  font-size: 1.5rem;
  margin: 0;
  font-weight: 500;
  animation: slideUp 1s ease-out;
}

@keyframes fadeIn {
  from { opacity: 0; transform: translateY(-10px); }
  to { opacity: 1; transform: translateY(0); }
}

@keyframes slideUp {
  from { opacity: 0; transform: translateY(20px); }
  to { opacity: 1; transform: translateY(0); }
}

@media (max-width: 768px) {
  .welcome-container {
    flex-direction: column;
    text-align: center;
    padding: 1rem;
  }
  
  .welcome-message {
    text-align: center;
    padding: 1rem 0;
  }
  
  h1 {
    font-size: 2.2rem;
  }
  
  .subtitle {
    font-size: 1.2rem;
  }
}
</style>
