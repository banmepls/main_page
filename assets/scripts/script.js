// Site behaviour: mobile menu, copy buttons, scroll reveal, counting figures, recommendations
// that open in place and case-study drawers.
// No dependencies; every page loads this file at the end of <body>.

const nav = document.querySelector(".global_nav");
const navToggle = document.querySelector(".global_nav_toggle");

if (nav && navToggle) {
  const setMenuOpen = (open) => {
    nav.classList.toggle("is_open", open);
    navToggle.setAttribute("aria-expanded", String(open));
  };

  navToggle.addEventListener("click", () => setMenuOpen(!nav.classList.contains("is_open")));
  nav.querySelectorAll("a").forEach((link) => link.addEventListener("click", () => setMenuOpen(false)));
  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape" && nav.classList.contains("is_open")) {
      setMenuOpen(false);
      navToggle.focus();
    }
  });
}

// <button data-copy="text"> copies its text and confirms in place: the label rolls up to the
// result and back. The rolling labels are for the eye; screen readers get the current one.
document.querySelectorAll("[data-copy]").forEach((button) => {
  const label = button.textContent.trim();
  const roll = document.createElement("span");
  const current = document.createElement("span");
  const result = document.createElement("span");
  const spoken = document.createElement("span");
  roll.className = "copy_roll";
  roll.setAttribute("aria-hidden", "true");
  current.textContent = label;
  result.textContent = "Copied";   // filled from the start, so the button keeps one width
  spoken.className = "visually_hidden";
  spoken.textContent = label;
  roll.append(current, result);
  button.replaceChildren(roll, spoken);
  let timer;

  button.addEventListener("click", async () => {
    let text = "Copied";
    try {
      await navigator.clipboard.writeText(button.dataset.copy);
    } catch {
      text = "Copy failed";
    }
    result.textContent = spoken.textContent = text;
    button.classList.add("is_done");
    clearTimeout(timer);
    timer = setTimeout(() => {
      button.classList.remove("is_done");
      spoken.textContent = label;
    }, 2000);
  });
});

// .reveal elements rise into place as they scroll into view. Section titles rise from behind
// their own bottom edge (.reveal_mask), and their introductions follow.
const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

if (!reduceMotion) {
  document.querySelectorAll(".section_title, .section_head .lead").forEach((el) => {
    if (el.closest(".reveal")) return;   // already arrives with its block
    el.classList.add("reveal");
    if (el.matches(".section_title")) el.classList.add("reveal_mask");
  });
}

const revealItems = document.querySelectorAll(".reveal");

// The observed area reaches far above the screen, so anything scrolled past counts as seen:
// a fast scroll can carry an element from below the screen to above it between two frames,
// and it must never stay hidden. Below the screen, the area starts a little early.
const seenArea = (bottom) => `100000px 0px ${bottom} 0px`;

if (revealItems.length && "IntersectionObserver" in window && !reduceMotion) {
  document.documentElement.classList.add("reveal_ready");

  // once arrived, an element goes back to its own styles (its hover transitions, for one)
  const settle = (el) => {
    el.classList.remove("reveal", "reveal_mask", "is_visible");
    el.style.removeProperty("--reveal-delay");
  };

  const observer = new IntersectionObserver(
    (entries) => {
      // things that come into view together arrive 70 ms apart, in page order; things a jump
      // carried past (already above the screen) are simply shown, and don't take a turn
      let turn = 0;
      entries
        .filter((entry) => entry.isIntersecting)
        .sort((a, b) => (a.target.compareDocumentPosition(b.target) & Node.DOCUMENT_POSITION_FOLLOWING ? -1 : 1))
        .forEach((entry) => {
          const el = entry.target;
          const passed = entry.boundingClientRect.bottom <= 0;
          const delay = passed ? 0 : Math.min(turn++, 4) * 70;
          el.style.setProperty("--reveal-delay", `${delay}ms`);
          el.classList.add("is_visible");
          observer.unobserve(el);
          setTimeout(() => settle(el), delay + 1600);
        });
    },
    { rootMargin: seenArea("12%") }
  );

  revealItems.forEach((item) => observer.observe(item));
}

// Key numbers on Home: one row that scrolls sideways. The two buttons move it a page at a time and
// switch off at either end (handing focus to the other button); touch and trackpad scrolling work
// as usual. The row's ends fade only while they cut a figure (--stats-fade): fully while the row
// moves fast, then by as much as it is still away from resting on whole figures as it slows down,
// so the fade clears with the movement itself and is gone the moment the row lands.
const statsRow = document.querySelector(".stats");
const statsPrev = document.querySelector("[data-stats-prev]");
const statsNext = document.querySelector("[data-stats-next]");

if (statsRow && statsPrev && statsNext) {
  const gap = () => parseFloat(getComputedStyle(statsRow).columnGap) || 0;
  const wide = window.matchMedia("(min-width: 1024px)");

  const updateButtons = () => {
    const end = statsRow.scrollWidth - statsRow.clientWidth - 1;
    [[statsPrev, statsRow.scrollLeft <= 1, statsNext], [statsNext, statsRow.scrollLeft >= end, statsPrev]]
      .forEach(([button, off, other]) => {
        if (off && document.activeElement === button) other.focus();
        button.disabled = off;
      });
  };
  // speed in px per ms; 60 ms of travel at the current speed keeps the fade up between figures
  const paintFade = (speed) => {
    const step = statsRow.firstElementChild.offsetWidth + gap();
    const offset = statsRow.scrollLeft % step;
    const away = Math.min(offset, step - offset);
    const landed = away < 1 && speed < 0.2;   // resting on whole figures, or all but
    const fade = landed ? 0 : Math.min(wide.matches ? 64 : 40, Math.max(away, speed * 60));
    statsRow.style.setProperty("--stats-fade", `${fade.toFixed(1)}px`);
  };
  const page = (direction) => {
    statsRow.scrollBy({ left: direction * (statsRow.clientWidth + gap()), behavior: reduceMotion ? "auto" : "smooth" });
  };

  let frame = 0;
  let still;
  let last = { x: statsRow.scrollLeft, t: performance.now() };
  statsPrev.addEventListener("click", () => page(-1));
  statsNext.addEventListener("click", () => page(1));
  statsRow.addEventListener("scroll", () => {
    frame ||= requestAnimationFrame((now) => {
      frame = 0;
      const speed = Math.abs(statsRow.scrollLeft - last.x) / Math.max(1, now - last.t);
      last = { x: statsRow.scrollLeft, t: now };
      updateButtons();
      paintFade(speed);
      // once the row stops (scrollend, or no movement for a moment), the fade clears
      clearTimeout(still);
      still = setTimeout(() => paintFade(0), 100);
    });
  }, { passive: true });
  statsRow.addEventListener("scrollend", () => paintFade(0));
  window.addEventListener("resize", () => {
    updateButtons();
    paintFade(0);
  });
  updateButtons();
  paintFade(0);
}

// Key figures count up from zero the first time they scroll into view. Only the visible digits
// move: the final value stays in the page for screen readers, and nothing changes without
// scripts or with reduced motion. Values that aren't a single number ("$0", "PSD2",
// "5–450 h") are left as they are.
const countItems = [...document.querySelectorAll(".stat_value, .pcard_stats strong")]
  .map((el) => {
    const match = el.textContent.trim().match(/^([^\d\p{L}]*)(\d[\d,]*(?:\.\d+)?)(\D*)$/u);
    if (!match) return null;
    const [, prefix, digits, suffix] = match;
    const target = parseFloat(digits.replace(/,/g, ""));
    if (!target) return null;
    return {
      el,
      prefix,
      suffix,
      target,
      decimals: (digits.split(".")[1] || "").length,
      grouped: digits.includes(","),
    };
  })
  .filter(Boolean);

const formatCount = (item, value) => {
  const [whole, fraction] = value.toFixed(item.decimals).split(".");
  const wholeText = item.grouped ? Number(whole).toLocaleString("en-US") : whole;
  return item.prefix + wholeText + (fraction ? "." + fraction : "") + item.suffix;
};

if (countItems.length && "IntersectionObserver" in window && !reduceMotion) {
  const duration = 1100;
  const easeOut = (t) => 1 - Math.pow(1 - t, 4);
  const items = new Map();

  countItems.forEach((item) => {
    const finalText = item.el.textContent;
    const spoken = document.createElement("span");
    spoken.className = "visually_hidden";
    spoken.textContent = finalText;
    item.shown = document.createElement("span");
    item.shown.className = "count_value";
    item.shown.setAttribute("aria-hidden", "true");
    item.shown.textContent = formatCount(item, 0);
    item.el.replaceChildren(item.shown, spoken);
    // figures in view together start one after another (four at most are in view at once)
    const row = item.el.closest("ul");
    item.delay = row ? ([...row.children].indexOf(item.el.closest("li")) % 4) * 90 : 0;
    items.set(item.el, item);
  });

  const count = (item) => {
    let start = null;
    const step = (now) => {
      start ??= now + item.delay;
      const progress = Math.min(Math.max((now - start) / duration, 0), 1);
      item.shown.textContent = formatCount(item, item.target * easeOut(progress));
      if (progress < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  };

  // (figures off to the side in the Home row count when the row brings them into view)
  const counter = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        counter.unobserve(entry.target);
        count(items.get(entry.target));
      });
    },
    { rootMargin: seenArea("-10%") }
  );

  items.forEach((item) => counter.observe(item.el));
}

// Recommendations on Home show an excerpt; the button under each swaps in the full text and back,
// and so does a click anywhere on the card (the button stays the control for keyboards and screen readers).
document.querySelectorAll(".quote_toggle").forEach((button) => {
  const quote = button.closest(".quote");
  const excerpt = quote.querySelector(".quote_excerpt");

  let morph = null;

  quote.addEventListener("click", (event) => {
    if (button.contains(event.target)) return;          // the button handles its own clicks
    if (window.getSelection()?.toString()) return;      // selecting words to copy isn't a click on the card
    button.click();
  });
  const full = document.getElementById(button.getAttribute("aria-controls"));
  const label = button.querySelector(".quote_toggle_label");

  button.addEventListener("click", () => {
    const open = button.getAttribute("aria-expanded") !== "true";
    const from = quote.getBoundingClientRect().height;
    morph?.cancel();

    button.setAttribute("aria-expanded", String(open));
    if (open) quote.classList.add("is_open");
    full.hidden = !open;
    excerpt.hidden = open;
    label.textContent = open ? "Show less" : "Read the full recommendation";

    // the card grows or shrinks to its new height instead of jumping; while it shrinks it stays
    // marked open, so the card beside it doesn't stretch to it on the way
    const to = quote.getBoundingClientRect().height;
    const done = () => {
      if (!open) quote.classList.remove("is_open");
    };
    if (reduceMotion || from === to) {
      morph = null;
      done();
    } else {
      quote.style.overflow = "hidden";
      morph = quote.animate([{ height: `${from}px` }, { height: `${to}px` }], {
        duration: 500,
        easing: "cubic-bezier(0.16, 1, 0.3, 1)",
      });
      morph.addEventListener("finish", () => {
        quote.style.removeProperty("overflow");
        done();
      });
      morph.addEventListener("cancel", () => quote.style.removeProperty("overflow"));
    }

    // closing a long recommendation can leave its card above the screen: bring it back below the bar
    if (!open) {
      const top = quote.getBoundingClientRect().top - (nav?.offsetHeight ?? 0) - 16;
      if (top < 0) window.scrollBy({ top, behavior: reduceMotion ? "auto" : "smooth" });
    }
  });
});

// Case studies open in a drawer from the right: <a data-drawer="id"> opens <dialog class="drawer" id="id">.
// Esc, the close button or a click on the dimmed page closes it; the address shows #id while it is
// open, so a case study can be linked to (e.g. from the home page) and opens on load.
const drawers = document.querySelectorAll("dialog.drawer");

if (drawers.length) {
  const page = document.documentElement;

  const openDrawer = (drawer) => {
    if (drawer.open) return;
    drawers.forEach((other) => other.open && other.close());   // one case study at a time
    drawer.showModal();
    page.classList.add("drawer_open");
    history.replaceState(null, "", `#${drawer.id}`);
  };

  const closeDrawer = (drawer) => {
    if (!drawer.open || drawer.classList.contains("is_closing")) return;
    const finish = () => {
      drawer.classList.remove("is_closing");
      drawer.close();
    };
    if (reduceMotion) return finish();
    drawer.classList.add("is_closing");
    const onEnd = (event) => {
      if (event.target !== drawer) return;   // the content's own arrivals end inside it too
      drawer.removeEventListener("animationend", onEnd);
      finish();
    };
    drawer.addEventListener("animationend", onEnd);
  };

  drawers.forEach((drawer) => {
    drawer.addEventListener("cancel", (event) => {
      event.preventDefault();
      closeDrawer(drawer);
    });
    drawer.addEventListener("click", (event) => {
      if (event.target === drawer) closeDrawer(drawer);
    });
    drawer.querySelector("[data-drawer-close]")?.addEventListener("click", () => closeDrawer(drawer));
    drawer.addEventListener("close", () => {
      page.classList.remove("drawer_open");
      history.replaceState(null, "", location.pathname + location.search);
    });
  });

  document.querySelectorAll("[data-drawer]").forEach((link) => {
    const drawer = document.getElementById(link.dataset.drawer);
    if (!drawer) return;
    link.addEventListener("click", (event) => {
      event.preventDefault();
      openDrawer(drawer);
    });
  });

  const openFromAddress = () => {
    const linked = location.hash && document.getElementById(location.hash.slice(1));
    if (linked && linked.matches("dialog.drawer")) openDrawer(linked);
  };
  openFromAddress();
  window.addEventListener("hashchange", openFromAddress);
}
