/* continuity.js - Manages state and history for undo/redo */

const Continuity = {
  history: [],
  currentIndex: -1,

  saveState(state) {
    // If we're not at the end of the history, truncate the future
    if (this.currentIndex < this.history.length - 1) {
      this.history = this.history.slice(0, this.currentIndex + 1);
    }

    this.history.push(JSON.stringify(state));
    this.currentIndex++;
  },

  undo() {
    if (this.canUndo()) {
      this.currentIndex--;
      return JSON.parse(this.history[this.currentIndex]);
    }
    return null;
  },

  redo() {
    if (this.canRedo()) {
      this.currentIndex++;
      return JSON.parse(this.history[this.currentIndex]);
    }
    return null;
  },

  canUndo: () => Continuity.currentIndex > 0,
  canRedo: () => Continuity.currentIndex < Continuity.history.length - 1,

  reset() {
    this.history = [];
    this.currentIndex = -1;
  }
};
