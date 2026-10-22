/**
 * Browser-side motion helpers shared by the page scripts: scroll reveal,
 * count-up figures and eased scroll progress.
 *
 * Every helper is a no-op unless `motionAllowed()` is true, so content is
 * never hidden from visitors without JavaScript or with reduced motion.
 */

/** True when the visitor allows motion and the browser can observe scrolling. */
export function motionAllowed(): boolean {
  return !window.matchMedia('(prefers-reduced-motion: reduce)').matches && 'IntersectionObserver' in window;
}

interface RevealOptions {
  rootMargin: string;
  threshold: number;
  /**
   * Custom property set to each element's place among those arriving
   * together (capped at 6), for CSS stagger. Omit when the markup sets its
   * own delay.
   */
  stagger?: string;
  /** Runs once per element as it arrives. */
  onIn?: (el: HTMLElement) => void;
}

/**
 * Adds `is-in` to each matching element the first time it scrolls into view,
 * then stops watching it.
 */
export function reveal(targets: Iterable<Element>, { rootMargin, threshold, stagger, onIn }: RevealOptions): void {
  const observer = new IntersectionObserver(
    (entries) => {
      // Stagger only what arrives together, so an item low in a list never
      // waits on its place in it.
      entries
        .filter((entry) => entry.isIntersecting)
        .forEach((entry, order) => {
          const el = entry.target as HTMLElement;
          if (stagger) el.style.setProperty(stagger, String(Math.min(order, 6)));
          el.classList.add('is-in');
          onIn?.(el);
          observer.unobserve(el);
        });
    },
    { rootMargin, threshold },
  );
  for (const el of targets) observer.observe(el);
}

/**
 * Prepares a figure such as "30+" to count up from 0 and returns the
 * function that starts it. The final text stays in the DOM for screen
 * readers; only an aria-hidden copy animates. Returns null for figures with
 * no leading number, or zero.
 */
export function countUp(el: HTMLElement, duration = 1400): (() => void) | null {
  const final = el.textContent?.trim() ?? '';
  const match = /^(\D*)(\d+)(.*)$/.exec(final);
  if (!match || Number(match[2]) === 0) return null;
  const [, before = '', digits = '0', after = ''] = match;
  const target = Number(digits);

  const shown = document.createElement('span');
  shown.setAttribute('aria-hidden', 'true');
  shown.textContent = `${before}0${after}`;
  const spoken = document.createElement('span');
  spoken.className = 'visually-hidden';
  spoken.textContent = final;
  el.replaceChildren(shown, spoken);

  return () => {
    const start = performance.now();
    const tick = (now: number) => {
      const t = Math.min(1, (now - start) / duration);
      shown.textContent = `${before}${Math.round(target * (1 - Math.pow(1 - t, 3)))}${after}`;
      if (t < 1) requestAnimationFrame(tick);
    };
    requestAnimationFrame(tick);
  };
}

/**
 * Sets `--p` on each element from 0 as it enters to 1 once settled, using
 * the page's own measure of progress. `--p` eases toward the scroll position
 * rather than jumping to it, so a stepped mouse wheel still reads as one
 * glide. The page itself scrolls natively; only `--p` is smoothed. Listens
 * to scroll and resize for the life of the page.
 */
export function scrollProgress(
  elements: readonly HTMLElement[],
  progress: (rect: DOMRect, viewportHeight: number) => number,
): void {
  const shown = elements.map(() => -1);
  let queued = false;

  const update = () => {
    queued = false;
    const vh = window.innerHeight;
    let settling = false;
    elements.forEach((el, i) => {
      const target = Math.min(1, Math.max(0, progress(el.getBoundingClientRect(), vh)));
      const from = shown[i]!;
      const next = from < 0 || Math.abs(target - from) < 0.001 ? target : from + (target - from) * 0.14;
      if (next !== target) settling = true;
      if (next !== from) el.style.setProperty('--p', next.toFixed(4));
      shown[i] = next;
    });
    if (settling) request();
  };

  const request = () => {
    if (queued) return;
    queued = true;
    requestAnimationFrame(update);
  };

  window.addEventListener('scroll', request, { passive: true });
  window.addEventListener('resize', request);
  update();
}
