/* global Fuse */
document.addEventListener('DOMContentLoaded', () => {
  const searchInput = document.getElementById('search');
  if (!searchInput) return;
  fetch('search-index.json')
    .then(r => r.json())
    .then(data => {
      const fuse = new Fuse(data, { keys: ['name', 'desc'], threshold: 0.4 });
      searchInput.addEventListener('input', () => {
        const q = searchInput.value.trim();
        const results = q ? fuse.search(q).map(r => r.item.url) : [];
        document.querySelectorAll('.tool-card').forEach(card => {
          const url = card.getAttribute('href');
          card.style.display = !q || results.includes(url) ? '' : 'none';
        });
      });
    });
});
