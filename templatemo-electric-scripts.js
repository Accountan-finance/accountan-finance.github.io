// ============================
// PARTICLES
// ============================
function createParticles() {
  const container = document.getElementById('particles');
  if (!container) return;

  for (let i = 0; i < 30; i++) {
    const p = document.createElement('div');
    p.className = 'particle';
    p.style.left = Math.random() * 100 + '%';
    p.style.animationDelay = Math.random() * 10 + 's';
    p.style.animationDuration = 15 + Math.random() * 10 + 's';
    container.appendChild(p);
  }
}
createParticles();

// ============================
// MOBILE MENU
// ============================
const menuToggle = document.getElementById('menuToggle');
const navLinks = document.getElementById('navLinks');

if (menuToggle && navLinks) {
  menuToggle.addEventListener('click', () => {
    menuToggle.classList.toggle('active');
    navLinks.classList.toggle('active');
  });
}

// ============================
// HERO TEXT ROTATION
// ============================
const textSets = document.querySelectorAll('.text-set');
let currentIndex = 0;

function wrapText(el) {
  const text = el.textContent;
  el.innerHTML = text
    .split('')
    .map(
      (c, i) =>
        `<span class="char" style="animation-delay:${i * 0.04}s">${
          c === ' ' ? '&nbsp;' : c
        }</span>`
    )
    .join('');
}

textSets.forEach((set, i) => {
  const h1 = set.querySelector('h1');
  wrapText(h1);
  set.classList.toggle('active', i === 0);
});

setInterval(() => {
  textSets[currentIndex].classList.remove('active');
  currentIndex = (currentIndex + 1) % textSets.length;
  textSets[currentIndex].classList.add('active');

  const h1 = textSets[currentIndex].querySelector('h1');
  wrapText(h1);
}, 4000);

fetch("https://cbu.uz/oz/arkhiv-kursov-valyut/json/")
  .then(res => res.json())
  .then(data => {
    const usd = data.find(v => v.Ccy === "USD");
    const eur = data.find(v => v.Ccy === "EUR");
    const rub = data.find(v => v.Ccy === "RUB");

    document.getElementById("usd").innerText = `USD: ${usd.Rate} so‘m`;
    document.getElementById("eur").innerText = `EUR: ${eur.Rate} so‘m`;
    document.getElementById("rub").innerText = `RUB: ${rub.Rate} so‘m`;
  });



fetch('https://sheetdb.io/api/v1/yozez32tnbpdj')
  .then(response => response.json())
  .then(data => {
    const container = document.getElementById('news-container');
    if (!container) return;

    container.innerHTML = '';

    data.reverse().forEach(item => {
      const card = document.createElement('div');
      card.className = 'news-card';

      card.innerHTML = `
        <h4>${item.title}</h4>
        <p>${item.text}</p>
        <div class="news-footer">
          <span class="news-date">${item.date}</span>
          ${item.link ? `<a href="${item.link}" target="_blank">Batafsil →</a>` : ''}
        </div>
      `;

      container.appendChild(card);
    });
  })
  .catch(error => {
    console.error(error);
    document.getElementById('news-container').innerHTML =



