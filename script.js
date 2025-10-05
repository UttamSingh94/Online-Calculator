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
    let expr = display.value;

    // Handle percentage based on operator
    expr = expr.replace(/(\d+)([+\-*/])(\d+)%/g, (match, a, op, b) => {
      a = parseFloat(a);
      b = parseFloat(b);

      if (op === '+' || op === '-') {
        // Percentage of the first number (e.g., 8+5% = 8 + 8*5/100)
        return `${a}${op}(${a}*${b}/100)`;
      } else {
        // For * or /, just use percentage as (b/100)
        return `${a}${op}(${b}/100)`;
      }
    });

    // Handle standalone percentages (e.g., "50%")
    expr = expr.replace(/(\d+)%/g, "($1/100)");

    display.value = eval(expr);
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
