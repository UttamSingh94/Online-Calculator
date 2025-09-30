let display = document.getElementById("display");
let themeToggle = document.getElementById("toggle-theme");

// Append numbers/operators
function appendValue(value) {
  display.value += value;
}

// Clear display
function clearDisplay() {
  display.value = "";
}

// Delete last digit
function deleteLast() {
  display.value = display.value.slice(0, -1);
}

// Calculate
function calculate() {
  try {
    display.value = eval(display.value);
  } catch {
    display.value = "Error";
  }
}

// Theme toggle
themeToggle.addEventListener("click", () => {
  document.body.classList.toggle("dark");
  themeToggle.textContent =
    document.body.classList.contains("dark") ? "☀️" : "🌙";
});

// Keyboard support
document.addEventListener("keydown", (e) => {
  if (!isNaN(e.key) || ["+", "-", "*", "/", "%", "."].includes(e.key)) {
    appendValue(e.key);
  } else if (e.key === "Enter") {
    calculate();
  } else if (e.key === "Backspace") {
    deleteLast();
  } else if (e.key === "Escape") {
    clearDisplay();
  }
});
