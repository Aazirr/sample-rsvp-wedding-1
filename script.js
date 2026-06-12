const themeButtons = document.querySelectorAll("[data-theme-option]");
const typeButtons = document.querySelectorAll("[data-type-option]");
const body = document.body;
const form = document.getElementById("rsvpForm");
const successBox = document.getElementById("formSuccess");

function setActiveButton(buttons, activeButton) {
  buttons.forEach((button) => {
    button.classList.toggle("is-active", button === activeButton);
  });
}

themeButtons.forEach((button) => {
  button.addEventListener("click", () => {
    body.dataset.theme = button.dataset.themeOption;
    setActiveButton(themeButtons, button);
  });
});

typeButtons.forEach((button) => {
  button.addEventListener("click", () => {
    body.dataset.type = button.dataset.typeOption;
    setActiveButton(typeButtons, button);
  });
});

form.addEventListener("submit", (event) => {
  event.preventDefault();

  const data = Object.fromEntries(new FormData(form).entries());
  localStorage.setItem("sampleWeddingRsvp", JSON.stringify(data));
  successBox.hidden = false;
  form.reset();
  window.requestAnimationFrame(() => {
    successBox.scrollIntoView({ behavior: "smooth", block: "nearest" });
  });
});
