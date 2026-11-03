/* ======================================================================
   INTERACTIONS — content belongs in data.js; motion and rendering live here.
   No framework or build step required.
   ====================================================================== */
(() => {
  "use strict";
  const $ = (selector, scope = document) => scope.querySelector(selector);
  const $$ = (selector, scope = document) => [...scope.querySelectorAll(selector)];
  const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const touchDevice = window.matchMedia("(hover: none)").matches;

  const escapeHTML = (value = "") => String(value).replace(/[&<>"']/g, ch => ({ "&":"&amp;", "<":"&lt;", ">":"&gt;", '"':"&quot;", "'":"&#39;" }[ch]));

  function setText(id, value) {
    const node = document.getElementById(id);
    if (node && value !== undefined && value !== null) node.textContent = value;
  }

  function animateWord(element, value) {
    if (!element) return;
    element.innerHTML = [...String(value)].map((char, index) =>
      `<span class="hero-title-char" style="--i:${index}">${char === " " ? "&nbsp;" : escapeHTML(char)}</span>`
    ).join("");
  }

  function renderProfile() {
    animateWord($("#heroFirst"), PROFILE.firstName.toUpperCase());
    animateWord($("#heroLast"), PROFILE.lastName.toUpperCase());
    setText("heroSurname", PROFILE.surnameExtra.toUpperCase());
    setText("heroStatus", PROFILE.status);
    setText("contactStatus", PROFILE.status);
    setText("heroRole", PROFILE.role);
    setText("heroTagline", PROFILE.tagline);
    setText("footName", PROFILE.fullName.toUpperCase());
    document.title = `${PROFILE.fullName} — Portfolio`;
    const email = $("#contactEmail");
    if (email) { email.href = `mailto:${PROFILE.email}`; email.innerHTML = `${escapeHTML(PROFILE.email)} <span>↗</span>`; }
    const allRepos = $("#allReposLink");
    if (allRepos) allRepos.href = PROFILE.github;
    const socials = $("#heroSocial");
    const footerLinks = $("#footerLinks");
    const icon = { github: "◉", email: "✉", cv: "↗" };
    const socialHTML = SOCIAL_LINKS.map(item => {
      const target = item.type === "email" ? "" : ' target="_blank" rel="noopener"';
      return `<a class="social-link" href="${escapeHTML(item.href)}"${target}><i class="social-dot"></i>${escapeHTML(item.label)} <span>${icon[item.type] || "↗"}</span></a>`;
    }).join("");
    if (socials) socials.innerHTML = socialHTML;
    if (footerLinks) footerLinks.innerHTML = SOCIAL_LINKS.map(item => `<a href="${escapeHTML(item.href)}"${item.type === "email" ? "" : ' target="_blank" rel="noopener"'}>${escapeHTML(item.label)}</a>`).join("");
  }

  function visualMarkup(type) {
    const commonStart = `<div class="project-visual visual--${escapeHTML(type || "commerce")}"><span class="project-visual__label">SELECTED BUILD / 2026</span>`;
    const mark = `<span class="project-visual__mark">${({commerce:"WEB",mobile:"APP",robot:"BOT",sensors:"IOT",dashboard:"DATA","mobile-alt":"UI",shop:"SHOP",apps:"TOOLS"})[type] || "BUILD"}</span>`;
    let scene = "";
    if (type === "mobile" || type === "mobile-alt") {
      scene = `<div class="phone-stack">${[0,1,2].map((n) => `<div class="phone"><div class="phone__pill"></div><div class="phone__circle"></div><div class="phone__line"></div><div class="phone__line short"></div><div class="phone__tile"></div><div class="phone__line"></div></div>`).join("")}</div>`;
    } else if (type === "robot") {
      scene = `<div class="robot-orbit"></div><div class="robot-core"></div><div class="robot-leg robot-leg--a"></div><div class="robot-leg robot-leg--b"></div>`;
    } else if (type === "sensors") {
      scene = `<div class="sensor-map"><i class="sensor-point"></i><i class="sensor-point"></i><i class="sensor-point"></i></div>`;
    } else if (type === "dashboard") {
      scene = `<div class="chart-area">${[28,42,36,58,47,65,50,78,59,70,88,64,77,94,71,82,100,74,87,61].map(h => `<i style="--h:${h}%"></i>`).join("")}</div>`;
    } else {
      scene = `<div class="project-visual__window"><div class="window-bar"><i></i><i></i><i></i></div><div class="window-lines"><i></i><i></i><i></i></div><div class="window-blocks"><i></i><i></i><i></i></div></div>`;
    }
    return `${commonStart}${scene}${mark}</div>`;
  }

  function renderWork() {
    const chips = $("#chips");
    const grid = $("#grid");
    if (!chips || !grid) return;
    const categories = ["all", ...new Set(PROJECTS.map(project => project.category))];
    chips.innerHTML = categories.map((category, index) =>
      `<button class="filter-chip${index === 0 ? " is-active" : ""}" type="button" data-filter="${escapeHTML(category)}" aria-pressed="${index === 0}">${escapeHTML(CATEGORY_META[category]?.label || category)}</button>`
    ).join("");

    grid.innerHTML = PROJECTS.map((project, index) => `
      <article class="project-card reveal" tabindex="0" role="button" aria-label="View details for ${escapeHTML(project.title)}" data-project="${escapeHTML(project.id)}" data-category="${escapeHTML(project.category)}" style="--delay:${Math.min(index % 2, 1) * 110}ms">
        <div class="project-card__top"><span>${String(index + 1).padStart(2, "0")} / ${escapeHTML(project.year)}</span><span class="project-status">${escapeHTML(project.status)}</span></div>
        ${visualMarkup(project.visual)}
        <div class="project-card__content">
          <div><h3 class="project-card__title">${escapeHTML(project.title)}</h3><p class="project-card__subtitle">${escapeHTML(project.subtitle)}</p></div>
          <span class="project-card__year">${escapeHTML(project.year)}</span>
          <p class="project-card__description">${escapeHTML(project.description)}</p>
          <div class="project-card__bottom"><ul class="project-tags">${project.tags.map(tag => `<li>${escapeHTML(tag)}</li>`).join("")}</ul><span class="project-open" aria-hidden="true">↗</span></div>
        </div>
      </article>`).join("");

    chips.addEventListener("click", event => {
      const button = event.target.closest("[data-filter]");
      if (!button) return;
      const filter = button.dataset.filter;
      $$("[data-filter]", chips).forEach(chip => {
        const active = chip === button;
        chip.classList.toggle("is-active", active);
        chip.setAttribute("aria-pressed", String(active));
      });
      $$(".project-card", grid).forEach(card => {
        const show = filter === "all" || card.dataset.category === filter;
        card.hidden = !show;
        if (show && !reduceMotion) {
          card.classList.remove("is-visible");
          card.style.setProperty("--replay", "1");
          // Force a style boundary so a filtered card reliably replays its entrance.
          void card.offsetWidth;
          requestAnimationFrame(() => {
            card.classList.add("is-visible");
            card.style.removeProperty("--replay");
          });
        } else if (show) {
          card.classList.add("is-visible");
        }
      });
    });

    grid.addEventListener("click", event => {
      const card = event.target.closest("[data-project]");
      if (card) openProject(card.dataset.project);
    });
    grid.addEventListener("keydown", event => {
      const card = event.target.closest("[data-project]");
      if (card && (event.key === "Enter" || event.key === " ")) {
        event.preventDefault();
        openProject(card.dataset.project);
      }
    });
  }

  function renderSkills() {
    const accordion = $("#acc");
    if (!accordion) return;
    accordion.innerHTML = SKILLS.map((skill, index) => `
      <section class="skill-item${index === 0 ? " is-open" : ""}">
        <button class="skill-head" type="button" aria-expanded="${index === 0}" aria-controls="skill-panel-${escapeHTML(skill.id)}">
          <span class="skill-number">${escapeHTML(skill.number || String(index + 1).padStart(2,"0"))}</span>
          <span><span class="skill-title">${escapeHTML(skill.title)}</span></span>
          <span class="skill-toggle" aria-hidden="true">+</span>
        </button>
        <div class="skill-panel" id="skill-panel-${escapeHTML(skill.id)}"><div><div class="skill-panel__inner"><p>${escapeHTML(skill.description || skill.summary)}</p><ul class="skill-tags">${skill.tools.map(tool => `<li>${escapeHTML(tool)}</li>`).join("")}</ul></div></div></div>
      </section>`).join("");
    accordion.addEventListener("click", event => {
      const button = event.target.closest(".skill-head");
      if (!button) return;
      const item = button.closest(".skill-item");
      const wasOpen = item.classList.contains("is-open");
      $$(".skill-item", accordion).forEach(other => {
        other.classList.remove("is-open");
        $(".skill-head", other).setAttribute("aria-expanded", "false");
      });
      if (!wasOpen) {
        item.classList.add("is-open");
        button.setAttribute("aria-expanded", "true");
      }
    });
    const cloud = $("#toolCloud");
    if (cloud) cloud.innerHTML = `<span class="tool-cloud__label">OTHER TOOLS / TECHNOLOGIES</span>${OTHER_TOOLS.map(tool => `<span>${escapeHTML(tool)}</span>`).join("")}`;
  }

  function renderAchievements() {
    setText("statNumber", ACHIEVEMENTS.statNumber);
    const statLabel = $("#statLabel");
    if (statLabel) statLabel.innerHTML = escapeHTML(ACHIEVEMENTS.statLabel).replace(/\n/g, "<br>");
    const medals = $("#medals");
    if (!medals) return;
    medals.innerHTML = ACHIEVEMENTS.medals.map((medal, index) => `
      <article class="medal-card reveal" style="--delay:${index * 110}ms">
        <div class="medal-card__top"><span>AWARD / ${escapeHTML(medal.number || String(index + 1).padStart(2,"0"))}</span><span>${escapeHTML(medal.year)}</span></div>
        <div class="medal-coin">${escapeHTML(medal.mark || "★")}</div>
        <h3>${escapeHTML(medal.title)}</h3>
        <p class="medal-card__event">${escapeHTML(medal.event)}</p>
        <div class="medal-card__foot"><span>${escapeHTML(medal.note || "Award")}</span><strong>${escapeHTML(medal.year)}</strong></div>
      </article>`).join("");
  }

  function openProject(id) {
    const project = PROJECTS.find(item => item.id === id);
    const dialog = $("#projectDialog");
    if (!project || !dialog) return;
    setText("dialogMeta", `${project.category.toUpperCase()}  /  ${project.year}  /  ${project.status.toUpperCase()}`);
    setText("dialogTitle", project.title);
    setText("dialogDescription", project.description);
    $("#dialogVisual").innerHTML = visualMarkup(project.visual);
    $("#dialogTags").innerHTML = project.tags.map(tag => `<li>${escapeHTML(tag)}</li>`).join("");
    const link = $("#dialogLink");
    if (project.link) {
      link.hidden = false;
      link.href = project.link;
    } else {
      link.hidden = true;
      link.removeAttribute("href");
    }
    dialog.showModal();
  }

  function initDialog() {
    const dialog = $("#projectDialog");
    $("#dialogClose")?.addEventListener("click", () => dialog.close());
    dialog?.addEventListener("click", event => {
      if (event.target === dialog) dialog.close();
    });
  }

  function initReveal() {
    const targets = $$(".reveal");
    if (!targets.length) return;
    if (reduceMotion || !("IntersectionObserver" in window)) {
      targets.forEach(el => el.classList.add("is-visible"));
      return;
    }

    let observer;
    try {
      observer = new IntersectionObserver((entries, currentObserver) => {
        entries.forEach(entry => {
          if (!entry.isIntersecting) return;
          entry.target.classList.add("is-visible");
          currentObserver.unobserve(entry.target);
        });
      }, { threshold: 0.01, rootMargin: "0px 0px -5% 0px" });

      targets.forEach((el, index) => {
        el.style.setProperty("--delay", `${Math.min(index % 4, 3) * 65}ms`);
        observer.observe(el);
      });
      // Only enable hidden entrance states after the observer is successfully installed.
      document.documentElement.classList.add("motion-ready");
    } catch (error) {
      targets.forEach(el => el.classList.add("is-visible"));
      return;
    }

    // Scroll fallback: a fast scroll can jump past an IO callback on some devices.
    // Reveal anything currently visible or already passed so no section stays hidden.
    let fallbackFrame = 0;
    const revealPassedAndVisible = () => {
      fallbackFrame = 0;
      const viewHeight = window.innerHeight || document.documentElement.clientHeight;
      targets.forEach(el => {
        if (el.classList.contains("is-visible")) return;
        const rect = el.getBoundingClientRect();
        if (!rect.width && !rect.height) return; // filtered/hidden card
        if (rect.bottom < 0 || (rect.top < viewHeight && rect.bottom > 0)) {
          el.classList.add("is-visible");
          observer.unobserve(el);
        }
      });
    };
    const queueRevealCheck = () => {
      if (!fallbackFrame) fallbackFrame = requestAnimationFrame(revealPassedAndVisible);
    };
    window.addEventListener("scroll", queueRevealCheck, { passive: true });
    window.addEventListener("resize", queueRevealCheck, { passive: true });
    queueRevealCheck();

    // Last-resort safety net for browser tabs that suspend observer callbacks.
    window.setTimeout(() => {
      targets.forEach(el => {
        if (!el.classList.contains("is-visible")) {
          el.classList.add("is-visible");
          observer.unobserve(el);
        }
      });
    }, 2600);
  }

  function initMotionVisibility() {
    const targets = [...$$(".project-card, .medal-card"), $("#heroStage")].filter(Boolean);
    if (!targets.length || !("IntersectionObserver" in window)) {
      targets.forEach(card => card.classList.add("is-in-view"));
      return;
    }
    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => entry.target.classList.toggle("is-in-view", entry.isIntersecting));
    }, { rootMargin: "120px 0px 120px 0px", threshold: 0.01 });
    targets.forEach(card => observer.observe(card));
  }

  function initTilt() {
    if (reduceMotion || touchDevice || !window.matchMedia("(pointer: fine)").matches) return;

    $$(".project-card, .medal-card").forEach(card => {
      let frame = 0;
      let active = false;
      let currentX = 0, currentY = 0;
      let targetX = 0, targetY = 0;
      let pointerX = 50, pointerY = 50;

      const update = () => {
        frame = 0;
        currentX += (targetX - currentX) * 0.28;
        currentY += (targetY - currentY) * 0.28;

        if (Math.abs(currentX) < 0.015) currentX = 0;
        if (Math.abs(currentY) < 0.015) currentY = 0;

        card.style.setProperty("--tilt-x", `${currentX.toFixed(3)}deg`);
        card.style.setProperty("--tilt-y", `${currentY.toFixed(3)}deg`);
        card.style.setProperty("--pointer-x", `${pointerX.toFixed(1)}%`);
        card.style.setProperty("--pointer-y", `${pointerY.toFixed(1)}%`);

        const stillMoving = Math.abs(targetX - currentX) > 0.025 || Math.abs(targetY - currentY) > 0.025;
        if (stillMoving) {
          frame = requestAnimationFrame(update);
        } else if (!active) {
          card.classList.remove("is-tilting");
          card.style.setProperty("--tilt-x", "0deg");
          card.style.setProperty("--tilt-y", "0deg");
        }
      };
      const schedule = () => { if (!frame) frame = requestAnimationFrame(update); };

      card.addEventListener("pointerenter", () => {
        active = true;
        card.classList.add("is-tilting");
      }, { passive: true });

      card.addEventListener("pointermove", event => {
        const rect = card.getBoundingClientRect();
        if (!rect.width || !rect.height) return;
        const x = Math.max(0, Math.min(1, (event.clientX - rect.left) / rect.width));
        const y = Math.max(0, Math.min(1, (event.clientY - rect.top) / rect.height));
        targetX = (0.5 - y) * 4.2;
        targetY = (x - 0.5) * 5.5;
        pointerX = x * 100;
        pointerY = y * 100;
        schedule();
      }, { passive: true });

      const reset = () => {
        active = false;
        targetX = 0;
        targetY = 0;
        pointerX = 50;
        pointerY = 50;
        if (frame) cancelAnimationFrame(frame);
        frame = 0;
        card.style.setProperty("--tilt-x", "0deg");
        card.style.setProperty("--tilt-y", "0deg");
        card.style.setProperty("--pointer-x", "50%");
        card.style.setProperty("--pointer-y", "50%");
        card.classList.remove("is-tilting");
      };
      card.addEventListener("pointerleave", reset, { passive: true });
      card.addEventListener("blur", reset, true);
    });
  }

  function initHeroMotion() {
    const stage = $("#heroStage");
    const portrait = $("#portraitWrap");
    const first = $("#heroFirst");
    const last = $("#heroLast");
    if (!stage || reduceMotion || touchDevice || !window.matchMedia("(pointer: fine)").matches) return;

    let frame = 0;
    let active = false;
    let currentX = 0, currentY = 0;
    let targetX = 0, targetY = 0;

    const update = () => {
      frame = 0;
      currentX += (targetX - currentX) * 0.24;
      currentY += (targetY - currentY) * 0.24;
      if (Math.abs(currentX) < 0.0015) currentX = 0;
      if (Math.abs(currentY) < 0.0015) currentY = 0;

      stage.style.setProperty("--hero-x", `${(currentX * 13).toFixed(2)}px`);
      stage.style.setProperty("--hero-y", `${(currentY * 9).toFixed(2)}px`);
      if (portrait) {
        portrait.style.setProperty("--photo-x", `${(currentX * -13).toFixed(2)}px`);
        portrait.style.setProperty("--photo-pointer-y", `${(currentY * -8).toFixed(2)}px`);
        portrait.style.setProperty("--photo-ry", `${(currentX * 5.5).toFixed(2)}deg`);
        portrait.style.setProperty("--photo-rx", `${(currentY * -3.5).toFixed(2)}deg`);
      }
      if (first) first.style.transform = `translate3d(${(currentX * -7).toFixed(2)}px,${(currentY * -4).toFixed(2)}px,0) rotateY(${(currentX * -2.5).toFixed(2)}deg)`;
      if (last) last.style.transform = `translate3d(${(currentX * 7).toFixed(2)}px,${(currentY * 4).toFixed(2)}px,12px) rotateY(${(currentX * 2.5).toFixed(2)}deg)`;

      const stillMoving = Math.abs(targetX - currentX) > 0.002 || Math.abs(targetY - currentY) > 0.002;
      if (stillMoving) frame = requestAnimationFrame(update);
      else if (!active) {
        if (first) first.style.transform = "";
        if (last) last.style.transform = "";
      }
    };
    const schedule = () => { if (!frame) frame = requestAnimationFrame(update); };

    stage.addEventListener("pointermove", event => {
      const rect = stage.getBoundingClientRect();
      if (!rect.width || !rect.height) return;
      active = true;
      stage.classList.add("is-pointer-moving");
      targetX = Math.max(-0.5, Math.min(0.5, (event.clientX - rect.left) / rect.width - 0.5));
      targetY = Math.max(-0.5, Math.min(0.5, (event.clientY - rect.top) / rect.height - 0.5));
      schedule();
    }, { passive: true });

    stage.addEventListener("pointerleave", () => {
      active = false;
      targetX = 0;
      targetY = 0;
      if (frame) cancelAnimationFrame(frame);
      frame = 0;
      stage.classList.remove("is-pointer-moving");
      stage.style.setProperty("--hero-x", "0px");
      stage.style.setProperty("--hero-y", "0px");
      if (portrait) {
        portrait.style.setProperty("--photo-x", "0px");
        portrait.style.setProperty("--photo-pointer-y", "0px");
        portrait.style.setProperty("--photo-ry", "0deg");
        portrait.style.setProperty("--photo-rx", "0deg");
      }
      if (first) first.style.transform = "";
      if (last) last.style.transform = "";
    }, { passive: true });
  }

  function initScrollEffects() {
    const progress = $("#scrollProgress");
    const nav = $("#nav");
    const portrait = $("#portraitWrap");
    let ticking = false;
    const update = () => {
      const max = document.documentElement.scrollHeight - innerHeight;
      if (progress) progress.style.width = `${max > 0 ? (scrollY / max) * 100 : 0}%`;
      nav?.classList.toggle("is-scrolled", scrollY > 40);
      if (portrait && !reduceMotion) {
        portrait.style.setProperty("--photo-scroll-y", `${Math.min(Math.max(scrollY, 0) * .045, 34)}px`);
      }
      ticking = false;
    };
    addEventListener("scroll", () => {
      if (!ticking) { requestAnimationFrame(update); ticking = true; }
    }, { passive: true });
    update();
  }

  function initCursorAura() {
    if (reduceMotion || touchDevice) return;
    const aura = $("#cursorAura");
    if (!aura) return;
    let x = innerWidth / 2, y = innerHeight / 2, tx = x, ty = y, raf = 0;
    addEventListener("pointermove", event => { tx = event.clientX; ty = event.clientY; if (!raf) animate(); }, { passive: true });
    function animate() {
      x += (tx - x) * .16;
      y += (ty - y) * .16;
      aura.style.left = `${x}px`;
      aura.style.top = `${y}px`;
      if (Math.abs(tx - x) + Math.abs(ty - y) > .5) raf = requestAnimationFrame(animate);
      else raf = 0;
    }
  }

  function initMagnetic() {
    if (reduceMotion || touchDevice) return;
    $$(".magnetic").forEach(element => {
      element.addEventListener("pointermove", event => {
        const rect = element.getBoundingClientRect();
        const x = event.clientX - rect.left - rect.width / 2;
        const y = event.clientY - rect.top - rect.height / 2;
        element.style.transform = `translate(${x * .12}px,${y * .18}px)`;
      });
      element.addEventListener("pointerleave", () => { element.style.transform = "translate(0,0)"; });
    });
  }

  function initMobileMenu() {
    const toggle = $("#menuToggle");
    const navLinks = $(".nav__links");
    if (!toggle || !navLinks) return;
    toggle.addEventListener("click", () => {
      const open = navLinks.classList.toggle("is-open");
      toggle.setAttribute("aria-expanded", String(open));
      toggle.setAttribute("aria-label", open ? "Close navigation" : "Open navigation");
    });
    navLinks.addEventListener("click", event => {
      if (event.target.closest("a")) {
        navLinks.classList.remove("is-open");
        toggle.setAttribute("aria-expanded", "false");
      }
    });
  }

  renderProfile();
  renderWork();
  renderSkills();
  renderAchievements();
  initDialog();
  initReveal();
  initMotionVisibility();
  initTilt();
  initHeroMotion();
  initScrollEffects();
  initCursorAura();
  initMagnetic();
  initMobileMenu();
  setText("yr", new Date().getFullYear());
})();
