document.addEventListener('DOMContentLoaded', () => {
    // 1. Sticky Navigation Logic
    const nav = document.querySelector('nav');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            nav.classList.add('scrolled');
        } else {
            nav.classList.remove('scrolled');
        }
    });

    // 2. Scroll Reveal Animation
    const observerOptions = {
        threshold: 0.1
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
            }
        });
    }, observerOptions);

    document.querySelectorAll('.reveal').forEach(el => observer.observe(el));

    // 3. Animated Counters
    const counters = document.querySelectorAll('.counter');
    const speed = 200;

    const startCounter = (entry) => {
        const target = +entry.target.getAttribute('data-target');
        const count = +entry.target.innerText;
        const increment = target / speed;

        if (count < target) {
            entry.target.innerText = Math.ceil(count + increment);
            setTimeout(() => startCounter(entry), 1);
        } else {
            entry.target.innerText = target + '+';
        }
    };

    const counterObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                startCounter(entry);
                counterObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 1.0 });

    counters.forEach(c => counterObserver.observe(c));

    // 4. Form Handling simulation
    const forms = document.querySelectorAll('form');
    forms.forEach(form => {
        form.addEventListener('submit', (e) => {
            e.preventDefault();
            const btn = form.querySelector('.btn-submit');
            const originalText = btn.innerText;
            btn.innerText = 'Sending...';
            btn.disabled = true;

            setTimeout(() => {
                alert('Thank you for your inquiry. A Velora representative will contact you shortly.');
                btn.innerText = originalText;
                btn.disabled = false;
                form.reset();
            }, 2000);
        });
    });
});
