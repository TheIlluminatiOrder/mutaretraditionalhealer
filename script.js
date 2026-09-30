const menu = document.querySelector('.menu-toggle');
const nav = document.querySelector('.nav');
menu?.addEventListener('click', () => { const open = menu.getAttribute('aria-expanded') !== 'true'; menu.setAttribute('aria-expanded', String(open)); nav.classList.toggle('open', open); });
document.addEventListener('keydown', event => { if (event.key === 'Escape' && nav?.classList.contains('open')) { nav.classList.remove('open'); menu.setAttribute('aria-expanded', 'false'); menu.focus(); } });
const reduced = window.matchMedia('(prefers-reduced-motion: reduce)');
const motionButton = document.querySelector('.motion-toggle');
let paused = reduced.matches;
try { paused = paused || localStorage.getItem('mutare-motion') === 'paused'; } catch {}
function applyMotion() { document.documentElement.classList.toggle('motion-off', paused); motionButton.textContent = paused ? 'Enable motion' : 'Pause motion'; motionButton.setAttribute('aria-pressed', String(paused)); }
applyMotion();
motionButton.addEventListener('click', () => { paused = !paused; applyMotion(); try { localStorage.setItem('mutare-motion', paused ? 'paused' : 'enabled'); } catch {} });
if ('IntersectionObserver' in window && !reduced.matches) { const observer = new IntersectionObserver(entries => { entries.forEach(entry => { if (entry.isIntersecting) { entry.target.classList.add('visible'); observer.unobserve(entry.target); } }); }, { threshold: 0.08 }); document.querySelectorAll('[data-reveal]').forEach(el => { el.classList.add('reveal-ready'); observer.observe(el); }); }
