<template>
  <div class="about-container">
    <div class="about-content">
      <h1 class="title">Sobre este Proyecto</h1>
      
      <div class="section">
        <h2>👨‍💻 Una Pokédex Moderna</h2>
        <p>Esta aplicación web es el resultado de un proyecto de desarrollo que combina la pasión por Pokémon con el aprendizaje de tecnologías web modernas. Desarrollada como parte de mi portafolio personal, esta Pokédex interactiva demuestra habilidades en el consumo de APIs, diseño responsivo y creación de interfaces de usuario atractivas.</p>
      </div>

      <div class="divider"></div>
      
      <div class="section">
        <h2>🛠️ Tecnologías Utilizadas</h2>
        <div class="fun-facts">
          <div class="fact">
            <h3>Frontend Avanzado</h3>
            <p>• Vue.js 3 con Composition API para una arquitectura reactiva y mantenible<br>
            • Tailwind CSS para un diseño moderno y completamente responsive<br>
            • Vue Router para una navegación fluida entre vistas<br>
            • Pinia para la gestión del estado global de la aplicación</p>
          </div>
          <div class="fact">
            <h3>Integración con API</h3>
            <p>• Consumo de la PokéAPI, una API RESTful con información detallada de Pokémon<br>
            • Implementación de llamadas asíncronas con Axios<br>
            • Manejo de estados de carga y errores para una mejor experiencia de usuario</p>
          </div>
        </div>
      </div>

      <div class="divider"></div>
      
      <div class="section">
        <h2>🚀 Objetivos y Futuro</h2>
        <p>Este proyecto nació con el objetivo de profundizar en el desarrollo frontend moderno, implementando buenas prácticas y patrones de diseño. Entre los logros se encuentran:</p>
        <ul class="goals-list">
          <li>Consumo eficiente de APIs RESTful</li>
          <li>Diseño responsive que funciona en cualquier dispositivo</li>
          <li>Optimización de rendimiento</li>
          <li>Implementación de un sistema de búsqueda y filtrado</li>
        </ul>
        <p class="mt-4"><strong>Próximas características:</strong> Sistema de favoritos, comparador de estadísticas, modo oscuro, y más funcionalidades interactivas para los entrenadores más exigentes.</p>
      </div>

      <div class="divider"></div>

      <div class="quote">
        <p class="quote-text">"En el mundo de la programación, como en el de Pokémon, cada línea de código es un paso más en tu viaje de aprendizaje. ¡Sigue evolucionando y alcanzando nuevos niveles!"</p>
      </div>

      <div class="final-message">
        <p>Este proyecto está en constante evolución, al igual que los Pokémon. Siéntete libre de explorar el código fuente, sugerir mejoras o simplemente disfrutar de la experiencia. ¡Gracias por visitar mi Pokédex!</p>
        <p class="catchphrase">¡El viaje del desarrollo web es tan emocionante como una aventura Pokémon! 💻✨</p>
      </div>
    </div>
  </div>
</template>

<style scoped>
.about-container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 2rem;
  color: #1a1a1a;
  min-height: calc(100vh - 4rem);
  display: flex;
  flex-direction: column;
  justify-content: center;
}

.about-content {
  border-radius: 16px;
  padding: 3rem;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.08);
  max-width: 900px;
  margin: 0 auto;
  width: 100%;
}

.title {
  text-align: center;
  color: #2563eb;
  margin-bottom: 2.5rem;
  font-size: 2.5rem;
  position: relative;
  padding-bottom: 1rem;
}

.title::after {
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

.section {
  margin-bottom: 2.5rem;
}

h2 {
  color: #ffffff;
  margin-bottom: 1.5rem;
  font-size: 1.8rem;
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

h2::before {
  content: '•';
  color: #2563eb;
}

p {
  line-height: 1.8;
  margin-bottom: 1.5rem;
  font-size: 1.1rem;
  color: #ffffff;
}

.divider {
  height: 1px;
  background: #e2e8f0;
  margin: 2.5rem 0;
  position: relative;
}

.divider::after {
  content: '⚡';
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  background: transparent;
  padding: 0 1rem;
  font-size: 1.2rem;
}

.fun-facts {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 2rem;
  margin-top: 2rem;
}

.fact {
  background: transparent;
  border: 1px solid #e5e7eb;
  padding: 1.5rem;
  border-radius: 12px;
  border-left: 4px solid #3b82f6;
  transition: transform 0.3s ease, box-shadow 0.3s ease;
}

.fact:hover {
  transform: translateY(-3px);
  box-shadow: 0 10px 20px rgba(0, 0, 0, 0.05);
}

.fact h3 {
  color: #2563eb;
  margin-bottom: 1rem;
  font-size: 1.3rem;
}

.quote {
  text-align: center;
  margin: 3rem 0;
  padding: 2rem;
  background: transparent;
  border: 1px solid #e5e7eb;
  border-radius: 12px;
  border-left: 4px solid #10b981;
}

.quote-text {
  font-size: 1.4rem;
  font-style: italic;
  color: #e4e4e4;
  margin-bottom: 1rem;
  line-height: 1.6;
}

.quote-author {
  color: #f1f2f4;
  font-weight: 500;
  margin-top: 1rem;
  margin-bottom: 0;
}

.goals-list {
  list-style-type: none;
  padding-left: 1.5rem;
  margin: 1.5rem 0;
}

.goals-list li {
  color: #e4e4e4;
  margin-bottom: 0.75rem;
  position: relative;
  padding-left: 1.5rem;
  line-height: 1.6;
}

.goals-list li::before {
  content: '•';
  color: #3b82f6;
  font-size: 1.5rem;
  position: absolute;
  left: 0;
  top: -0.2rem;
}

.final-message {
  text-align: center;
  margin-top: 3rem;
  padding-top: 2rem;
  border-top: 1px solid #e2e8f0;
}

.catchphrase {
  font-size: 1.5rem;
  font-weight: 700;
  color: #2563eb;
  margin-top: 1rem;
  animation: pulse 2s infinite;
}

@keyframes pulse {
  0% { transform: scale(1); }
  50% { transform: scale(1.05); }
  100% { transform: scale(1); }
}

@media (max-width: 768px) {
  .about-content {
    padding: 2rem 1.5rem;
  }
  
  .title {
    font-size: 2rem;
  }
  
  h2 {
    font-size: 1.5rem;
  }
  
  .quote-text {
    font-size: 1.2rem;
  }
  
  .fun-facts {
    grid-template-columns: 1fr;
  }
}
</style>
