const componentError = document.getElementById("componentError");
const componentSlots = document.querySelectorAll("[data-component]");

async function loadComponents() {
  await Promise.all(
    [...componentSlots].map(async (slot) => {
      const response = await fetch(slot.dataset.component);
      if (!response.ok) {
        throw new Error(`Komponen gagal dimuat: ${slot.dataset.component}`);
      }
      slot.outerHTML = await response.text();
    })
  );
}

function initializePage() {
  const form = document.querySelector("#reservationForm");
  const status = document.querySelector("#formStatus");
  const backToTop = document.querySelector("#backToTop");
  const currentDate = document.querySelector("#currentDate");
  const today = new Date();
  const formattedDate = new Intl.DateTimeFormat("id-ID", {
    day: "2-digit",
    month: "long",
    year: "numeric"
  }).format(today);

  currentDate.textContent = formattedDate;
  currentDate.dateTime = today.toISOString().split("T")[0];

  form.addEventListener("submit", (event) => {
    event.preventDefault();
    const name = form.elements.name.value.trim();
    const guests = form.elements.guests.value;
    status.textContent = `Siap, ${name}. Kami catat untuk ${guests}. Sampai ketemu di Kafe Djomok.`;
    form.reset();
  });

  window.addEventListener("scroll", () => {
    backToTop.classList.toggle("visible", window.scrollY > 400);
  });

  backToTop.addEventListener("click", () => {
    document.querySelector("#beranda").scrollIntoView({ behavior: "smooth" });
  });
}

loadComponents()
  .then(initializePage)
  .catch((error) => {
    console.error(error);
    componentError.hidden = false;
  });
