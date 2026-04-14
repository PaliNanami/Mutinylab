/**
 * Portfolio script.js — image-background version
 */

// ── Gentle parallax on mouse move (moves the background image)
document.addEventListener('mousemove', (e) => {
  const cx = window.innerWidth / 2;
  const cy = window.innerHeight / 2;
  const dx = (e.clientX - cx) / cx; // -1 to 1
  const dy = (e.clientY - cy) / cy;

  const bg = document.querySelector('.scene-bg');
  if (bg) {
    const offsetX = 50 + dx * 1.5; // % from center
    const offsetY = 50 + dy * 1.2;
    bg.style.backgroundPosition = `${offsetX}% ${offsetY}%`;
  }

  // Floating clicks react
  document.querySelectorAll('.mouse-click').forEach((c, i) => {
    const f = (i + 1) * 3;
    c.style.transform = `translate(${dx * f}px, ${dy * -f * .4}px)`;
  });

  // Float labels subtle lift
  document.querySelectorAll('.float-label.btn-hover-target').forEach((lbl, i) => {
    const f = .4 + i * .15;
    lbl.style.transform = `${lbl.dataset.base || ''} translate(${dx * f * -1}px, ${dy * f * -1}px)`;
  });
});

// ── Service item hover → glow corresponding zone
document.querySelectorAll('.service-item').forEach(item => {
  const zone = item.dataset.zone;
  // Map service zones to building zones
  const buildingMap = {
    arch: 'espacios', render: 'espacios', diagram: 'espacios', model: 'espacios',
    ui: 'interfaces', system: 'interfaces', proto: 'interfaces', ux: 'interfaces'
  };
  const target = buildingMap[zone];

  item.addEventListener('mouseenter', () => {
    if (target) {
      const el = document.getElementById(`zone-${target}`);
      if (el) el.classList.add('glow');
      const lbl = document.getElementById(`lbl-${target}`);
      if (lbl) lbl.style.borderColor = 'var(--purple-mid)';
    }
    item.classList.add('active');
  });
  item.addEventListener('mouseleave', () => {
    if (target) {
      const el = document.getElementById(`zone-${target}`);
      if (el) el.classList.remove('glow');
      const lbl = document.getElementById(`lbl-${target}`);
      if (lbl) lbl.style.borderColor = '';
    }
    item.classList.remove('active');
  });
});

// ── Map node
function highlightZone(zone) {
  const lbl = document.getElementById(`lbl-${zone}`);
  if (lbl) {
    lbl.style.transform = `${lbl.style.transform} scale(1.06)`;
    lbl.style.borderColor = 'var(--purple-mid)';
    lbl.style.boxShadow = '0 12px 40px rgba(147,51,234,.32)';
    setTimeout(() => {
      lbl.style.borderColor = '';
      lbl.style.boxShadow = '';
      lbl.style.transform = '';
    }, 900);
  }
  document.querySelectorAll('.map-node').forEach(n => n.classList.remove('active'));
  const activeNode = document.querySelector(`.map-node[onclick*="${zone}"]`);
  if (activeNode) activeNode.classList.add('active');
}

// ── Page fade-in + stagger
window.addEventListener('load', () => {
  document.body.style.opacity = '0';
  document.body.style.transition = 'opacity .7s ease';
  requestAnimationFrame(() => requestAnimationFrame(() => {
    document.body.style.opacity = '1';
  }));

  document.querySelectorAll('#list-left .service-item').forEach((item, i) => {
    item.style.opacity = '0';
    item.style.transform = 'translateX(-14px)';
    item.style.transition = `opacity .4s ease ${i * .12}s, transform .4s ease ${i * .12}s, border-color .2s, box-shadow .2s`;
    setTimeout(() => { item.style.opacity = '1'; item.style.transform = 'translateX(0)'; }, 300 + i * 120);
  });

  document.querySelectorAll('#list-right .service-item').forEach((item, i) => {
    item.style.opacity = '0';
    item.style.transform = 'translateX(14px)';
    item.style.transition = `opacity .4s ease ${i * .12 + .2}s, transform .4s ease ${i * .12 + .2}s, border-color .2s, box-shadow .2s`;
    setTimeout(() => { item.style.opacity = '1'; item.style.transform = 'translateX(0)'; }, 400 + i * 120);
  });

  // Float labels entrance
  document.querySelectorAll('.float-label').forEach((lbl, i) => {
    lbl.style.opacity = '0';
    lbl.style.transform = 'translateY(-12px)';
    lbl.style.transition = `opacity .5s ease ${.3 + i * .15}s, transform .5s ease ${.3 + i * .15}s`;
    setTimeout(() => { lbl.style.opacity = '1'; lbl.style.transform = 'translateY(0)'; }, 500 + i * 150);
  });
});
