const translations = {
  id: {
    'nav.projects':'Proyek', 'nav.blog':'Blog', 'nav.about':'Tentang',
    'hero.available':'Tersedia untuk proyek pilihan', 'hero.line1':'Membangun pengalaman', 'hero.line2':'digital yang tenang.',
    'hero.description':'Saya seorang desainer & pengembang yang membuat antarmuka berpikir, produk berguna, dan cerita dari ujung internet.',
    'hero.explore':'Lihat karya saya', 'hero.contact':'Mari bicara',
    'projects.kicker':'Karya pilihan', 'projects.title':'Proyek', 'projects.all':'Lihat semua proyek', 'projects.brand':'Pengalaman Brand', 'projects.motion':'Platform Gerak',
    'blog.kicker':'Catatan & pemikiran', 'blog.title':'Dari blog', 'blog.search':'Cari artikel', 'blog.tag.design':'Desain', 'blog.tag.dev':'Pengembangan', 'blog.tag.notes':'Catatan',
    'post.one.title':'Mengapa sistem yang baik terasa hampir tak terlihat', 'post.two.title':'Membuat web terasa sedikit lebih manusiawi', 'post.three.title':'Eksperimen kecil, praktik kreatif yang lebih baik',
    'about.kicker':'Sedikit tentang saya', 'about.title1':'Penasaran secara alami.', 'about.title2':'Sengaja dalam pilihan.',
    'about.description':'Saya bekerja di titik temu desain dan teknologi—mengubah ide kompleks menjadi pengalaman yang jelas, ekspresif, dan bermakna. Jauh dari layar, saya mungkin sedang mengumpulkan referensi atau mencari kopi yang enak.', 'about.more':'Lebih lanjut tentang saya',
    'contact.kicker':'Hubungi saya', 'contact.title':'Ada proyek dalam pikiran?', 'contact.name':'Nama', 'contact.message':'Pesan', 'contact.send':'Kirim pesan'
  },
  en: {
    'nav.projects':'Projects', 'nav.blog':'Blog', 'nav.about':'About',
    'hero.available':'Available for selected projects', 'hero.line1':'Building calm', 'hero.line2':'digital experiences.',
    'hero.description':'I’m a designer & developer crafting thoughtful interfaces, useful products, and stories from the edge of the internet.',
    'hero.explore':'Explore my work', 'hero.contact':'Let’s talk',
    'projects.kicker':'Selected work', 'projects.title':'Projects', 'projects.all':'View all projects', 'projects.brand':'Brand Experience', 'projects.motion':'Motion Platform',
    'blog.kicker':'Notes & thoughts', 'blog.title':'From the blog', 'blog.search':'Search articles', 'blog.tag.design':'Design', 'blog.tag.dev':'Development', 'blog.tag.notes':'Notes',
    'post.one.title':'Why good systems feel almost invisible', 'post.two.title':'Making the web feel a little more human', 'post.three.title':'Small experiments, better creative practice',
    'about.kicker':'A little about me', 'about.title1':'Curious by nature.', 'about.title2':'Intentional by choice.',
    'about.description':'I work where design and technology meet—turning complex ideas into clear, expressive, and meaningful experiences. Away from the screen, I’m probably collecting references or looking for the next good coffee.', 'about.more':'More about me',
    'contact.kicker':'Get in touch', 'contact.title':'Have a project in mind?', 'contact.name':'Name', 'contact.message':'Message', 'contact.send':'Send message'
  }
};

const savedTheme = localStorage.getItem('xelz-theme');
const preferredTheme = savedTheme || (matchMedia('(prefers-color-scheme: light)').matches ? 'light' : 'dark');
document.documentElement.dataset.theme = preferredTheme;

const savedLang = localStorage.getItem('xelz-lang') || 'id';
function setLanguage(lang) {
  document.documentElement.lang = lang;
  document.querySelectorAll('[data-i18n]').forEach(el => {
    const value = translations[lang][el.dataset.i18n];
    if (value) el.textContent = value;
  });
  document.querySelectorAll('[data-i18n-placeholder]').forEach(el => {
    el.placeholder = translations[lang][el.dataset.i18nPlaceholder];
  });
  document.getElementById('languageLabel').textContent = lang === 'id' ? 'EN' : 'ID';
  localStorage.setItem('xelz-lang', lang);
}
setLanguage(savedLang);

document.getElementById('languageToggle').addEventListener('click', () => {
  setLanguage(document.documentElement.lang === 'id' ? 'en' : 'id');
});
document.getElementById('themeToggle').addEventListener('click', () => {
  const next = document.documentElement.dataset.theme === 'dark' ? 'light' : 'dark';
  document.documentElement.dataset.theme = next;
  localStorage.setItem('xelz-theme', next);
});

const menu = document.querySelector('.menu-toggle');
const navLinks = document.querySelector('.nav-links');
menu.addEventListener('click', () => {
  const open = navLinks.classList.toggle('open');
  menu.setAttribute('aria-expanded', String(open));
});
navLinks.querySelectorAll('a').forEach(a => a.addEventListener('click', () => navLinks.classList.remove('open')));

const search = document.getElementById('articleSearch');
search.addEventListener('input', () => {
  const query = search.value.trim().toLowerCase();
  document.querySelectorAll('.post').forEach(post => {
    post.classList.toggle('hidden', !post.dataset.search.includes(query) && !post.textContent.toLowerCase().includes(query));
  });
});

const observer = new IntersectionObserver(entries => {
  entries.forEach(entry => { if (entry.isIntersecting) entry.target.classList.add('visible'); });
}, { threshold: 0.12 });
document.querySelectorAll('.reveal').forEach(el => observer.observe(el));

const form = document.getElementById('contactForm');
const toast = document.getElementById('toast');
form.addEventListener('submit', event => {
  event.preventEvent();
});
form.addEventListener('submit', event => {
  event.preventDefault();
  const lang = document.documentElement.lang;
  toast.textContent = lang === 'id' ? 'Pesan siap dikirim — terima kasih!' : 'Message ready — thank you!';
  toast.classList.add('show');
  form.reset();
  setTimeout(() => toast.classList.remove('show'), 3000);
});
