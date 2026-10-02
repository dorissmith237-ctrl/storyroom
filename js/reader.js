/* reader.js - Handles reading view, text rendering, and highlighting */

const Reader = {
  activeChapter: null,
  highlights: {}, // Stores highlights by passage index

  render(chapter) {
    this.activeChapter = chapter;
    const container = document.getElementById('view-container');
    container.innerHTML = `
      <div class="reader-wrapper">
        <h1 style="text-align: center; margin-bottom: 1.5em;">${chapter.title}</h1>
        <div id="reader-content"></div>
      </div>
    `;

    this._renderPassages(chapter.content);
  },

  _renderPassages(passages) {
    const content = document.getElementById('reader-content');
    content.innerHTML = passages.map((passage, index) => {
      const cls = this.highlights[index] ? `reader-highlight ${this.highlights[index]}` : '';
      return `
        <div class="reader-passage">
          <span class="${cls}" data-index="${index}" onclick="Reader._showAnnotationBar(event, ${index})">${passage}</span>
          ${this._renderNoteIndicator(index)}
        </div>
      `;
    }).join('');
  },

  _renderNoteIndicator(index) {
    // Basic placeholder for a note indicator
    return '';
  },

  highlight(index, colorClass) {
    this.highlights[index] = colorClass;
    this._renderPassages(this.activeChapter.content);
    // Hide annotation bar after highlighting
    document.getElementById('annotation-bar').classList.add('hidden');
  },

  _showAnnotationBar(event, index) {
     const bar = document.getElementById('annotation-bar');
     bar.classList.remove('hidden');
     // Position bar near the clicked element
     const rect = event.target.getBoundingClientRect();
     bar.style.top = `${rect.top + window.scrollY}px`;
     bar.style.left = `${rect.left + (rect.width/2) + window.scrollX}px`;

     // Update highlight function with current index
     window._currentHighlightIndex = index;
  }
};
