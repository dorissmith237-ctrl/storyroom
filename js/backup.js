/* backup.js - Handles autosave and manual export to Word/JSON */

const Backup = {
  autosaveInterval: 60000, // 1 minute
  timer: null,

  start() {
    this.timer = setInterval(() => this.save(), this.autosaveInterval);
  },

  stop() {
    if (this.timer) clearInterval(this.timer);
  },

  save() {
    const currentState = App.serialize();
    if (currentState) {
      DB.set('autosave', currentState);
      DB.set('last_backup', new Date().toISOString());
    }
  },

  restore() {
    return DB.get('autosave');
  },

  async exportWord(content, filename = 'storyroom_export.docx') {
    const doc = new docx.Document({
      sections: [{
        properties: {},
        children: content.map(p => new docx.Paragraph({
          text: p,
          spacing: { after: 300 }
        }))
      }]
    });

    const buffer = await docx.Packer.toBuffer(doc);
    const blob = new Blob([buffer], { type: 'application/vnd.openxmlformats-officedocument.wordprocessingml.document' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = filename;
    a.click();
    URL.revokeObjectURL(url);
  }
};
