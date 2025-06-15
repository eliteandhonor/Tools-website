# External Libraries

The MiniTools Universe pages include a few small libraries via public CDNs. Copy these files into the `vendor/` folder if you need full offline support, then update the tags below to point to your local copies.

## Common CDN snippets

```html
<!-- Google Fonts -->
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;600&family=Fira+Code&display=swap" rel="stylesheet">

<!-- CSS frameworks and animations -->
<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.2/dist/css/bootstrap.min.css" integrity="sha384-TNPe8tkCbZ2M1zDh/QEqplLWYwgdEN0OZK0s8AjtKoa6HgMHtYjgJv1bLvK+cvM/" crossorigin="anonymous">
<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.0/css/all.min.css">
<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/animate.css/4.1.1/animate.min.css">
<link rel="stylesheet" href="https://unpkg.com/aos@next/dist/aos.css">
<script src="https://cdn.tailwindcss.com?plugins=daisyui"></script>

<!-- UI helpers -->
<script src="https://cdn.jsdelivr.net/npm/alpinejs@3.x.x/dist/cdn.min.js" defer></script>
<script defer src="https://cdn.jsdelivr.net/npm/@alpinejs/ui@3.x.x/dist/cdn.min.js"></script>
<script type="module" src="https://cdn.jsdelivr.net/npm/instant.page@5.1.1/instantpage.mjs"></script>

<!-- Animation and graphing -->
<script type="module">
  import {gsap} from 'https://cdn.jsdelivr.net/npm/gsap@3.12.2/dist/gsap.min.js';
  import {ScrollTrigger} from 'https://cdn.jsdelivr.net/npm/gsap@3.12.2/dist/ScrollTrigger.min.js';
  gsap.registerPlugin(ScrollTrigger);
  window.gsap = gsap;
  window.ScrollTrigger = ScrollTrigger;
</script>
<script defer src="https://cdn.jsdelivr.net/npm/function-plot@1/dist/function-plot.min.js"></script>
<script defer src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.2/dist/js/bootstrap.bundle.min.js" integrity="sha384-k6ZvzLJz2GV5/C/PObbIVdQydb9h9NP7VDaRao7IhiHBpjz2uVH54camz1Dtr1cG" crossorigin="anonymous"></script>
<script defer src="https://unpkg.com/aos@next/dist/aos.js"></script>
```

Dexie.js is loaded as an ES module within `db.js`:

```javascript
import Dexie from 'https://cdn.jsdelivr.net/npm/dexie@3.2.5/dist/dexie.mjs';
```

## Best practice

When shipping for offline use, download each CDN file once during your build and store it in `vendor/`. Update the `<link>` or `<script>` tags to point to these local paths so the service worker can precache them.
