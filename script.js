const panels = document.querySelectorAll(".dashboard-panel");
const reservationForm = document.querySelector("#reservationForm");
const formStatus = document.querySelector("#formStatus");
const mobileMenuLinks = document.querySelectorAll(".mobile-menu a");
const menuToggle = document.querySelector(".menu-toggle");
const mobileLinks = document.querySelector(".mobile-links");
const mobileScreen = window.matchMedia("(max-width: 700px)");

function resizeParentFrameset() {
  try {
    const parentLayout = parent.document.querySelector("frameset");
    if (parentLayout) {
      parentLayout.setAttribute("cols", mobileScreen.matches ? "0,*" : "220,*");
      const contentLayout = parentLayout.querySelector("frameset");
      contentLayout.setAttribute("rows", mobileScreen.matches ? "0,*,0" : "52,*,70");
    }
  } catch {
    // The content can also be opened directly outside the frameset.
  }
}

function getSidebarLinks() {
  try {
    return parent.frames.sidebarFrame.document.querySelectorAll(".side nav a");
  } catch {
    return [];
  }
}

function showPanel() {
  const activeId = window.location.hash.slice(1) || "beranda";

  panels.forEach((panel) => {
    panel.hidden = panel.id !== activeId;
  });

  getSidebarLinks().forEach((link) => {
    link.classList.toggle("active", link.hash.slice(1) === activeId);
  });

  mobileMenuLinks.forEach((link) => {
    link.classList.toggle("active", link.hash.slice(1) === activeId);
  });
}

window.addEventListener("hashchange", showPanel);
resizeParentFrameset();
mobileScreen.addEventListener("change", resizeParentFrameset);
showPanel();

menuToggle.addEventListener("click", () => {
  const isOpen = menuToggle.getAttribute("aria-expanded") === "true";
  menuToggle.setAttribute("aria-expanded", String(!isOpen));
  mobileLinks.classList.toggle("open", !isOpen);
});

mobileMenuLinks.forEach((link) => {
  link.addEventListener("click", () => {
    menuToggle.setAttribute("aria-expanded", "false");
    mobileLinks.classList.remove("open");
  });
});

reservationForm.addEventListener("submit", (event) => {
  event.preventDefault();

  const name = reservationForm.elements.name.value.trim();
  const guests = reservationForm.elements.guests.value;
  formStatus.textContent = `Oke, ${name}. Meja untuk ${guests} orang kami catat.`;
  reservationForm.reset();
});
