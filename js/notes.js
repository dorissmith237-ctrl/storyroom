/* notes.js - Manages annotations and notes attached to passages */

const Notes = {
  notes: {}, // Stores notes by passage index

  addNote(passageIndex, noteText) {
    this.notes[passageIndex] = {
      text: noteText,
      timestamp: new Date().toISOString()
    };
    // Update the UI to show a note indicator
    const indicator = document.querySelector(`.passage-note-indicator[data-index="${passageIndex}"]`);
    if (indicator) {
        indicator.classList.remove('hidden');
    }
  },

  getNote(passageIndex) {
    return this.notes[passageIndex];
  },

  deleteNote(passageIndex) {
    delete this.notes[passageIndex];
    const indicator = document.querySelector(`.passage-note-indicator[data-index="${passageIndex}"]`);
    if (indicator) {
        indicator.classList.add('hidden');
    }
  }
};
