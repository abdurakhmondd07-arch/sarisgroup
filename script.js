/* ============================================================
   SARIS GROUP — script.js
   ============================================================ */

document.addEventListener('DOMContentLoaded', function () {

  /* ── ПОЯВЛЕНИЕ БЛОКОВ ПРИ ПРОКРУТКЕ ── */
  const observer = new IntersectionObserver(function (entries) {
    entries.forEach(function (e) {
      if (e.isIntersecting) e.target.classList.add('visible');
    });
  }, { threshold: 0.1, rootMargin: '0px 0px -60px 0px' });
  document.querySelectorAll('.reveal').forEach(function (r) { observer.observe(r); });

  /* ── БУРГЕР-МЕНЮ ── */
  var burger   = document.getElementById('burger');
  var navLinks = document.getElementById('navLinks');
  if (burger && navLinks) {
    burger.addEventListener('click', function () { navLinks.classList.toggle('open'); });
    navLinks.querySelectorAll('a').forEach(function (a) {
      a.addEventListener('click', function () { navLinks.classList.remove('open'); });
    });
  }

  /* ── QR КОД — 240×240, по центру ── */
  var qrWrap = document.getElementById('qrWrap');
  if (qrWrap) {
    var s = document.createElement('script');
    s.src = 'https://cdnjs.cloudflare.com/ajax/libs/qrcodejs/1.0.0/qrcode.min.js';
    s.onload = function () {
      qrWrap.innerHTML = '';
      new QRCode(qrWrap, {
        text:         'https://www.instagram.com/sarisgroup.uz',
        width:        240,
        height:       240,
        colorDark:    '#0a0a0a',
        colorLight:   '#ffffff',
        correctLevel: QRCode.CorrectLevel.H
      });
    };
    s.onerror = function () {
      qrWrap.innerHTML = '<a href="https://www.instagram.com/sarisgroup.uz" target="_blank" style="color:#e8d5a3;font-size:.9rem;text-decoration:none;">@sarisgroup.uz</a>';
    };
    document.head.appendChild(s);
  }

});

/* ── ОТПРАВКА ЗАЯВКИ В TELEGRAM ── */
function sendToTelegram() {
  var name  = document.getElementById('fname').value.trim();
  var phone = document.getElementById('fphone').value.trim();
  var obj   = document.getElementById('fobj').value.trim();
  var msg   = document.getElementById('fmsg').value.trim();

  if (!name && !phone) {
    alert('Пожалуйста, введите имя или телефон');
    return;
  }

  var text = '🔆 Новая заявка с сайта Saris Group\n\n' +
    (name  ? '👤 Имя: '       + name  + '\n' : '') +
    (phone ? '📞 Телефон: '   + phone + '\n' : '') +
    (obj   ? '🏢 Объект: '    + obj   + '\n' : '') +
    (msg   ? '💬 Сообщение: ' + msg         : '');

  window.open('https://t.me/saris_admin?text=' + encodeURIComponent(text), '_blank');
}
