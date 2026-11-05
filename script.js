const panels = document.querySelectorAll(".dashboard-panel");
const reservationForm = document.querySelector("#reservationForm");
const formStatus = document.querySelector("#formStatus");

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
}

window.addEventListener("hashchange", showPanel);
showPanel();

reservationForm.addEventListener("submit", (event) => {
  event.preventDefault();

  const name = reservationForm.elements.name.value.trim();
  const guests = reservationForm.elements.guests.value;
  formStatus.textContent = `Oke, ${name}. Meja untuk ${guests} orang kami catat.`;
  reservationForm.reset();
});
