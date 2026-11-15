const year = document.querySelector('#year');
year.textContent = new Date().getFullYear();

const menuButton = document.querySelector('.menu-toggle');
const nav = document.querySelector('.nav');
menuButton.addEventListener('click', () => {
  const open = menuButton.getAttribute('aria-expanded') !== 'true';
  menuButton.setAttribute('aria-expanded', String(open));
  menuButton.setAttribute('aria-label', open ? 'Close navigation' : 'Open navigation');
  nav.classList.toggle('open', open);
});
nav.querySelectorAll('a').forEach(link => link.addEventListener('click', () => {
  nav.classList.remove('open');
  menuButton.setAttribute('aria-expanded', 'false');
}));

document.querySelector('#contact-form').addEventListener('submit', event => {
  event.preventDefault();
  const data = new FormData(event.currentTarget);
  const body = `${data.get('message')}\n\nFrom: ${data.get('name')} (${data.get('email')})`;
  const note = document.querySelector('#form-note');
  if (navigator.clipboard && window.isSecureContext) {
    navigator.clipboard.writeText(body).then(() => { note.textContent = 'Message copied. You can paste it into a LinkedIn message.'; }).catch(() => { note.textContent = body; });
  } else {
    note.textContent = body;
  }
});
