const scriptsGrid = document.querySelector('.scripts-grid');
const filterButtons = document.querySelectorAll('.filter-btn');
const currentYearElements = document.querySelectorAll('#current-year');

document.addEventListener('DOMContentLoaded', function() {
  currentYearElements.forEach(element => {
    element.textContent = new Date().getFullYear();
  });
  
  renderScripts();
  
  setupFilters();
});

function renderScripts(category = 'all') {
  scriptsGrid.innerHTML = '';
  
  const filteredScripts = category === 'all'
    ? scripts
    : scripts.filter(script => script.category.includes(category));
  
  filteredScripts.forEach((script, index) => {
    const scriptElement = createScriptCard(script, index);
    scriptsGrid.appendChild(scriptElement);
  });
}

function createScriptCard(script, index) {
  const scriptCard = document.createElement('div');
  scriptCard.className = `script-card fade-in`;
  scriptCard.style.animationDelay = `${0.1 * (index % 6)}s`;
  
  const formattedCategory = script.category.replace('Universal Script 🚀', 'Universal 🚀');
  
  scriptCard.innerHTML = `
    <a href="script.html?id=${script.id}">
      <div class="script-image-container">
        <img src="${script.image}" alt="${script.title}" class="script-image">
        <div class="script-views">
          <i class="far fa-eye"></i>
          <span>${script.views}</span>
        </div>
        <div class="script-time">
          ${script.timeAgo}
        </div>
        <div class="image-gradient"></div>
      </div>
      <div class="script-content">
        <div class="script-badges">
          <span class="badge category">${formattedCategory}</span>
          <span class="badge price">${script.price}</span>
        </div>
        <h3 class="script-title">${script.title}</h3>
        ${script.description ? `<p class="script-description">${script.description}</p>` : ''}
        <div class="script-footer">
          <div class="view-details">
            <i class="fas fa-code"></i>
            <span>View Details</span>
          </div>
          <div class="arrow-icon">
            <i class="fas fa-arrow-right"></i>
          </div>
        </div>
      </div>
    </a>
  `;
  
  return scriptCard;
}

function setupFilters() {
  filterButtons.forEach(button => {
    button.addEventListener('click', function() {
      filterButtons.forEach(btn => btn.classList.remove('active'));
      
      this.classList.add('active');
      
      const category = this.getAttribute('data-category');
      
      renderScripts(category);
    });
  });
}

function handleScrollAnimations() {
  const elements = document.querySelectorAll('.fade-in, .fade-up, .fade-down, .fade-left, .fade-right');
  
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.style.opacity = '1';
        entry.target.style.transform = 'translateY(0) translateX(0)';
      }
    });
  }, { threshold: 0.1 });
  
  elements.forEach(element => {
    observer.observe(element);
  });
}

window.addEventListener('load', handleScrollAnimations);