const scriptTitle = document.getElementById('script-title');
const scriptDescription = document.getElementById('script-description');
const scriptImage = document.getElementById('script-image');
const scriptCategory = document.querySelector('.script-category');
const viewsCount = document.getElementById('views-count');
const timeAgo = document.getElementById('time-ago');
const categoryName = document.getElementById('category-name');
const scriptPrice = document.getElementById('script-price');
const scriptCode = document.getElementById('script-code');
const wallhopNote = document.getElementById('wallhop-note');
const currentYearElements = document.querySelectorAll('#current-year');

const toggleCodeBtn = document.getElementById('toggle-code-btn');
const codeContainer = document.getElementById('code-container');

const copyCodeBtn = document.getElementById('copy-code-btn');
const mobileCopyCodeBtn = document.getElementById('mobile-copy-code-btn');

const relatedScriptsGrid = document.querySelector('.related-scripts-grid');

document.addEventListener('DOMContentLoaded', function() {
  currentYearElements.forEach(element => {
    element.textContent = new Date().getFullYear();
  });
  
  const urlParams = new URLSearchParams(window.location.search);
  const scriptId = urlParams.get('id');
  
  if (scriptId) {
    loadScriptDetails(scriptId);
  } else {
    window.location.href = 'index.html';
  }
  
  setupCodeToggle();
  
  setupCopyButtons();
});

function loadScriptDetails(scriptId) {
  const script = scripts.find(s => s.id === scriptId);
  
  if (!script) {
    window.location.href = 'index.html';
    return;
  }
  
  document.title = `${script.title} - lyraEz`;
  
  scriptTitle.textContent = script.title;
  scriptDescription.textContent = script.description || '';
  scriptImage.src = script.image;
  scriptImage.alt = `${script.title} Preview`;
  scriptCategory.textContent = script.category;
  viewsCount.textContent = script.views;
  timeAgo.textContent = script.timeAgo;
  categoryName.textContent = script.category.replace('🚀', '');
  scriptPrice.textContent = script.price;
  scriptCode.textContent = script.code;
  
  if (script.title === 'Wallhop') {
    wallhopNote.style.display = 'block';
  }
  
  if (typeof Prism !== 'undefined') {
    Prism.highlightElement(scriptCode);
  }
  
  loadRelatedScripts(scriptId);
}

function loadRelatedScripts(currentScriptId) {
  relatedScriptsGrid.innerHTML = '';
  
  const relatedScripts = scripts
    .filter(script => script.id !== currentScriptId)
    .slice(0, 3);
  
  relatedScripts.forEach((script, index) => {
    const scriptElement = createRelatedScriptCard(script, index);
    relatedScriptsGrid.appendChild(scriptElement);
  });
}

function createRelatedScriptCard(script, index) {
  const scriptCard = document.createElement('div');
  scriptCard.className = 'script-card fade-up';
  scriptCard.style.animationDelay = `${0.4 + (index * 0.1)}s`;
  
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
          <span class="badge category">${script.category.replace('Universal Script 🚀', 'Universal 🚀')}</span>
          <span class="badge price">${script.price}</span>
        </div>
        <h3 class="script-title">${script.title}</h3>
      </div>
    </a>
  `;
  
  return scriptCard;
}

function setupCodeToggle() {
  toggleCodeBtn.addEventListener('click', function() {
    const isVisible = codeContainer.style.display !== 'none';
    
    if (isVisible) {
      codeContainer.style.display = 'none';
      toggleCodeBtn.innerHTML = 'Show Code <i class="fas fa-chevron-down"></i>';
    } else {
      codeContainer.style.display = 'block';
      toggleCodeBtn.innerHTML = 'Hide Code <i class="fas fa-chevron-up"></i>';
      
      if (typeof Prism !== 'undefined') {
        Prism.highlightElement(scriptCode);
      }
    }
  });
}

function setupCopyButtons() {
  const copyFunctions = [copyCodeBtn, mobileCopyCodeBtn];
  
  copyFunctions.forEach(button => {
    button.addEventListener('click', function() {
      const textToCopy = scriptCode.textContent;
      
      navigator.clipboard.writeText(textToCopy)
        .then(() => {
          const originalText = this.textContent;
          this.textContent = 'Copied!';
          this.style.backgroundColor = '#22c55e';
          
          setTimeout(() => {
            this.textContent = originalText;
            this.style.backgroundColor = '';
          }, 2000);
        })
        .catch(err => {
          console.error('Error copying text: ', err);
          const originalText = this.textContent;
          this.textContent = 'Failed to copy';
          
          setTimeout(() => {
            this.textContent = originalText;
          }, 2000);
        });
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