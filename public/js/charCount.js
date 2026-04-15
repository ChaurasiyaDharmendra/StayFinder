document.querySelectorAll("textarea").forEach((textarea) => {
  const counter = textarea.parentElement.querySelector(".charCount");
  if (!counter) return;

  counter.textContent = `${textarea.value.length} / ${textarea.maxLength}`;

  textarea.addEventListener("input", () => {
    counter.textContent = `${textarea.value.length} / ${textarea.maxLength}`;
  });
});
