/* search.js - Provides full-text search capability across stories */

const Search = {
  search(query, storyContent) {
    if (!query.trim()) return [];
    
    const results = [];
    const lowerQuery = query.toLowerCase();

    storyContent.forEach((passage, index) => {
      if (passage.toLowerCase().includes(lowerQuery)) {
        results.push({
          index: index,
          text: passage
        });
      }
    });

    return results;
  }
};
