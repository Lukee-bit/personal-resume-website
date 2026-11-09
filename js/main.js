(() => {
  const year = document.getElementById("year");
  if (year) year.textContent = String(new Date().getFullYear());

  const toggle = document.querySelector(".menu-toggle");
  const panel = document.getElementById("mobile-menu");

  const setMenu = (open) => {
    if (!toggle || !panel) return;
    toggle.setAttribute("aria-expanded", String(open));
    toggle.setAttribute("aria-label", open ? "Close menu" : "Open menu");
    panel.classList.toggle("open", open);
    panel.hidden = !open;
  };

  toggle?.addEventListener("click", () => {
    const open = toggle.getAttribute("aria-expanded") !== "true";
    setMenu(open);
  });

  panel?.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", () => setMenu(false));
  });

  const sectionIds = [
    "about",
    "experience",
    "projects",
    "education",
    "coursework",
    "skills",
    "leadership",
    "credentials",
    "contact",
  ];
  const navLinks = Array.from(document.querySelectorAll('.nav-links a[href^="#"]'));
  const navHrefById = {
    about: "#about",
    experience: "#experience",
    projects: "#projects",
    education: "#education",
    coursework: "#coursework",
    skills: "#skills",
    leadership: "#leadership",
    credentials: "#credentials",
    contact: "#contact",
  };
  const sections = sectionIds
    .map((id) => document.getElementById(id))
    .filter(Boolean);

  const setCurrent = (id) => {
    const href = navHrefById[id];
    navLinks.forEach((link) => {
      if (link.getAttribute("href") === href) link.setAttribute("aria-current", "true");
      else link.removeAttribute("aria-current");
    });
  };

  const onScrollSpy = () => {
    const marker = window.scrollY + window.innerHeight * 0.28;
    const about = document.getElementById("about");
    if (!about || marker < about.offsetTop - 40) {
      navLinks.forEach((link) => link.removeAttribute("aria-current"));
      return;
    }
    let current = sectionIds[0];
    for (const section of sections) {
      if (section.offsetTop <= marker) current = section.id;
    }
    setCurrent(current);
  };

  window.addEventListener("scroll", onScrollSpy, { passive: true });
  onScrollSpy();

  const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const reveals = document.querySelectorAll(".reveal");

  if (reduceMotion || !("IntersectionObserver" in window)) {
    reveals.forEach((el) => el.classList.add("in"));
    return;
  }

  const observer = new IntersectionObserver(
    (entries) => {
      for (const entry of entries) {
        if (entry.isIntersecting) {
          entry.target.classList.add("in");
          observer.unobserve(entry.target);
        }
      }
    },
    { threshold: 0.16, rootMargin: "0px 0px -8% 0px" }
  );

  reveals.forEach((el) => observer.observe(el));
})();
