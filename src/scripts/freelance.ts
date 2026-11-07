type GsapTarget = string | Element | Element[] | NodeListOf<Element> | HTMLCollection;
type GsapVars = Record<string, unknown>;

interface GsapTimeline {
  set(target: GsapTarget, vars: GsapVars): this;
  to(target: GsapTarget, vars: GsapVars): this;
}

interface ScrollTriggerConfig {
  trigger?: Element;
  start?: string;
  end?: string;
  once?: boolean;
  scrub?: boolean | number;
  onEnter?: () => void;
  onUpdate?: (self: { getVelocity(): number }) => void;
}

interface FreelanceWindow extends Window {
  Lenis?: new (options: { lerp: number; smoothWheel: boolean }) => {
    raf(time: number): void;
    scrollTo(target: string, options: { offset: number; duration: number }): void;
  };
  gsap?: {
    registerPlugin(plugin: unknown): void;
    from(target: GsapTarget, vars: GsapVars): void;
    to(target: GsapTarget, vars: GsapVars): void;
    timeline(): GsapTimeline;
  };
  ScrollTrigger?: {
    create(config: ScrollTriggerConfig): void;
  };
}

(() => {
  const runtimeWindow = window as FreelanceWindow;
  const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  const ls = document.createElement('script');
  ls.src = 'https://unpkg.com/lenis@1.1.18/dist/lenis.min.js';
  ls.onload = initLenis;
  ls.onerror = initLenis;
  document.head.appendChild(ls);

  function initLenis() {
    const Lenis = runtimeWindow.Lenis;
    if (reduce || !Lenis) return;
    const lenis = new Lenis({ lerp: 0.09, smoothWheel: true });

    (function raf(time: number) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    })(performance.now());

    document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
      anchor.addEventListener('click', (event) => {
        const id = anchor.getAttribute('href');
        if (id && id.length > 1 && document.querySelector(id)) {
          event.preventDefault();
          lenis.scrollTo(id, { offset: -10, duration: 1.2 });
        }
      });
    });
  }

  const cursor = document.getElementById('cursor');
  const cursorDot = document.getElementById('cursorDot');
  let mouseX = innerWidth / 2;
  let mouseY = innerHeight / 2;
  let cursorX = mouseX;
  let cursorY = mouseY;

  if (cursorDot) {
    addEventListener('mousemove', (event) => {
      mouseX = event.clientX;
      mouseY = event.clientY;
      cursorDot.style.transform = `translate(${mouseX - 3}px,${mouseY - 3}px)`;
    });
  }

  if (cursor) {
    (function loop() {
      cursorX += (mouseX - cursorX) * 0.16;
      cursorY += (mouseY - cursorY) * 0.16;
      cursor.style.transform = `translate(${cursorX - 20}px,${cursorY - 20}px)`;
      requestAnimationFrame(loop);
    })();

    document.querySelectorAll('[data-hover]').forEach((element) => {
      element.addEventListener('mouseenter', () => cursor.classList.add('hovered'));
      element.addEventListener('mouseleave', () => cursor.classList.remove('hovered'));
    });
  }

  if (!reduce) {
    document.querySelectorAll<HTMLElement>('.magnetic').forEach((element) => {
      const inner = element.querySelector<HTMLElement>('.mag-inner') || element;
      element.addEventListener('mousemove', (event) => {
        const rect = element.getBoundingClientRect();
        inner.style.transform = `translate(${(event.clientX - rect.left - rect.width / 2) * 0.28}px,${(event.clientY - rect.top - rect.height / 2) * 0.28}px)`;
      });
      element.addEventListener('mouseleave', () => {
        inner.style.transition = 'transform .4s cubic-bezier(.2,.7,.2,1)';
        inner.style.transform = 'translate(0,0)';
        setTimeout(() => {
          inner.style.transition = '';
        }, 400);
      });
    });
  }

  if (!reduce) {
    document.querySelectorAll<HTMLElement>('[data-tilt]').forEach((card) => {
      card.addEventListener('mousemove', (event) => {
        const rect = card.getBoundingClientRect();
        const rotateX = ((event.clientY - rect.top) / rect.height - 0.5) * -7;
        const rotateY = ((event.clientX - rect.left) / rect.width - 0.5) * 7;
        card.style.transform = `rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-6px)`;
      });
      card.addEventListener('mouseleave', () => {
        card.style.transform = '';
      });
    });
  }

  const progressBar = document.getElementById('progressBar');
  if (progressBar) {
    addEventListener(
      'scroll',
      () => {
        const html = document.documentElement;
        progressBar.style.transform = `scaleX(${html.scrollTop / (html.scrollHeight - html.clientHeight)})`;
      },
      { passive: true },
    );
  }

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.12 },
  );
  document.querySelectorAll('.reveal').forEach((element) => observer.observe(element));

  const gsap = runtimeWindow.gsap;
  const ScrollTrigger = runtimeWindow.ScrollTrigger;
  if (!reduce && gsap && ScrollTrigger) {
    gsap.registerPlugin(ScrollTrigger);

    gsap.from('[data-hero]', { opacity: 0, y: 30, duration: 0.9, stagger: 0.09, ease: 'power3.out', delay: 0.15 });
    gsap.from('.hero .mask > span', { yPercent: 110, duration: 1, stagger: 0.12, ease: 'power4.out', delay: 0.25 });
    gsap.from('.photo', { opacity: 0, scale: 0.94, y: 40, duration: 1.1, ease: 'power3.out', delay: 0.5 });

    gsap.to('.photo', { y: -60, ease: 'none', scrollTrigger: { trigger: '.hero', start: 'top top', end: 'bottom top', scrub: 1 } });
    gsap.to('.hero-copy', { y: -30, opacity: 0.4, ease: 'none', scrollTrigger: { trigger: '.hero', start: 'top top', end: 'bottom top', scrub: 1 } });

    const wipePanels = document.querySelectorAll('.wipe i');
    ['.about', '#services', '#work', '#process', '#packages', '.contact'].forEach((selector) => {
      const element = document.querySelector(selector);
      if (!element) return;
      ScrollTrigger.create({
        trigger: element,
        start: 'top 85%',
        once: true,
        onEnter: () => {
          const timeline = gsap.timeline();
          timeline
            .set(wipePanels, { transformOrigin: 'top' })
            .to(wipePanels, { scaleY: 1, duration: 0.35, stagger: 0.08, ease: 'power3.inOut' })
            .set(wipePanels, { transformOrigin: 'bottom' })
            .to(wipePanels, { scaleY: 0, duration: 0.35, stagger: 0.08, ease: 'power3.inOut' });
        },
      });
    });

    document.querySelectorAll('.sec-head').forEach((heading) => {
      gsap.from(heading.children, {
        x: -40,
        opacity: 0,
        duration: 0.8,
        stagger: 0.1,
        ease: 'power3.out',
        scrollTrigger: { trigger: heading, start: 'top 82%' },
      });
    });

    gsap.from('.chit', {
      y: 60,
      opacity: 0,
      rotate: 2,
      duration: 0.8,
      stagger: 0.12,
      ease: 'back.out(1.4)',
      scrollTrigger: { trigger: '.chits', start: 'top 80%' },
    });

    const works = document.querySelectorAll('.work');
    works.forEach((work, index) => {
      const nextWork = works[index + 1];
      if (!nextWork) return;
      gsap.to(work, {
        scale: 0.93,
        opacity: 0.55,
        filter: 'saturate(.6)',
        ease: 'none',
        scrollTrigger: { trigger: nextWork, start: 'top bottom', end: 'top top+=120', scrub: true },
      });
    });

    gsap.from('[data-step]', {
      x: 50,
      opacity: 0,
      duration: 0.7,
      stagger: 0.15,
      ease: 'power3.out',
      scrollTrigger: { trigger: '.paper', start: 'top 75%' },
    });
    document.querySelectorAll('[data-step] .box').forEach((box, index) => {
      gsap.from(box, {
        scale: 0,
        rotate: -30,
        duration: 0.5,
        delay: index * 0.1,
        ease: 'back.out(2.5)',
        scrollTrigger: { trigger: '.paper', start: 'top 75%' },
      });
    });

    gsap.from('.tagwrap', {
      y: 80,
      opacity: 0,
      duration: 0.8,
      stagger: 0.14,
      ease: 'power3.out',
      scrollTrigger: { trigger: '.tags', start: 'top 80%' },
    });
    gsap.from('.contact h2', {
      y: 60,
      opacity: 0,
      duration: 1,
      ease: 'power3.out',
      scrollTrigger: { trigger: '.contact', start: 'top 75%' },
    });

    ScrollTrigger.create({
      onUpdate(self) {
        const velocity = Math.min(Math.abs(self.getVelocity()) / 120, 4);
        const track = document.querySelector<HTMLElement>('.marquee-track');
        if (track) track.style.animationDuration = `${22 / (1 + velocity * 0.6)}s`;
      },
    });
  }
})();
