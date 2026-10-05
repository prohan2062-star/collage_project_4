document.getElementById('tg').onclick = () => document.getElementById('menu').classList.toggle('open');
document.querySelectorAll('#menu a').forEach(a => a.onclick = () => document.getElementById('menu').classList.remove('open'));
document.getElementById('f').onsubmit = e => {
    e.preventDefault();
    document.getElementById('ok').textContent = 'Message sent. We will reply soon.';
    e.target.reset()
};
// counters
const io = new IntersectionObserver(es => es.forEach(en => {
    if (!en.isIntersecting) return;
    io.unobserve(en.target);
    const t = +en.target.dataset.n;
    let s = null;
    const step = ts => {
        s = s || ts;
        const p = Math.min((ts - s) / 1500, 1);
        en.target.textContent = Math.floor(t * p) + (p >= 1 ? '+' : '');
        if (p < 1) requestAnimationFrame(step)
    };
    requestAnimationFrame(step)
}), {
    threshold: .6
});
document.querySelectorAll('[data-n]').forEach(n => io.observe(n));
// hero network animation
(() => {
    const c = document.getElementById('cv'),
        x = c.getContext('2d'),
        still = matchMedia('(prefers-reduced-motion:reduce)').matches;
    let w, h, P = [];

    function rs() {
        w = c.width = c.offsetWidth;
        h = c.height = c.offsetHeight;
        P = Array.from({
            length: Math.min(70, w / 14)
        }, () => ({
            x: Math.random() * w,
            y: Math.random() * h,
            vx: (Math.random() - .5) * .5,
            vy: (Math.random() - .5) * .5
        }))
    }

    function dr() {
        x.clearRect(0, 0, w, h);
        P.forEach((p, i) => {
            if (!still) {
                p.x += p.vx;
                p.y += p.vy;
                if (p.x < 0 || p.x > w) p.vx *= -1;
                if (p.y < 0 || p.y > h) p.vy *= -1
            }
            x.fillStyle = '#F2A900';
            x.beginPath();
            x.arc(p.x, p.y, 2, 0, 6.3);
            x.fill();
            for (let j = i + 1; j < P.length; j++) {
                const q = P[j],
                    d = Math.hypot(p.x - q.x, p.y - q.y);
                if (d < 120) {
                    x.strokeStyle = 'rgba(60,200,193,' + (1 - d / 120) * .5 + ')';
                    x.beginPath();
                    x.moveTo(p.x, p.y);
                    x.lineTo(q.x, q.y);
                    x.stroke()
                }
            }
        });
        if (!still) requestAnimationFrame(dr)
    }
    addEventListener('resize', rs);
    rs();
    dr()
})();