/* app.js - Main application controller */

const App = {
  currentView: 'home',
  stories: [], // Loaded stories

  init() {
    this.setupEventListeners();
    this.navigate('home');
    Backup.start();
  },

  setupEventListeners() {
    document.querySelectorAll('.tab-btn').forEach(button => {
      button.addEventListener('click', (e) => {
        const view = button.getAttribute('data-view');
        this.navigate(view);
      });
    });
  },

  navigate(viewName) {
    this.currentView = viewName;
    
    // Update active tab button UI
    document.querySelectorAll('.tab-btn').forEach(btn => {
      btn.classList.toggle('active', btn.getAttribute('data-view') === viewName);
    });

    // Render appropriate view
    const container = document.getElementById('view-container');
    container.innerHTML = `<h1>${viewName.charAt(0).toUpperCase() + viewName.slice(1)}</h1>`;

    switch(viewName) {
      case 'reader':
        // Placeholder for initial reader view
        if(this.stories.length > 0) Reader.render(this.stories[0]);
        else container.innerHTML = '<h1>Reader</h1><p>No story loaded.</p>';
        break;
      case 'library':
        // Placeholder rendering
        container.innerHTML = '<h1>Library</h1><p>Your saved stories will appear here.</p>';
        break;
      // Other views can be handled here
    }
  },

  serialize() {
    return {
      currentView: this.currentView,
      lastSaved: new Date().toISOString()
    };
  }
};

document.addEventListener('DOMContentLoaded', () => App.init());
