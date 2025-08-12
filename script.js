function showSection(sectionId, btn) {
  document.querySelectorAll('.section').forEach(sec => sec.style.display = 'none');
  document.getElementById(sectionId).style.display = 'block';
  document.querySelectorAll('.tab-nav button').forEach(b => b.classList.remove('active'));
  if (btn) btn.classList.add('active');
}
const brownies = [
  { name: "Toasted Almond Bliss", desc: "Light and fluffy brownie topped with roasted almonds.", img: "brownie.png" },
  { name: "Carrot Crunch", desc: "Carrot, almond, and cream.", img: "brownie.png" },
  { name: "Cookies & Cream Fantasy", desc: "Vanilla sponge topped with cookies and chocolate drizzle.", img: "brownie.png" },
  { name: "Chocolate Indulgence", desc: "Rich chocolate brownie with creamy layers.", img: "brownie.png" },
];
const orderedBrownies= document.getElementById('orderedBrownies');
// Generate brownie cards
brownies.forEach(brownie => {
  const div = document.createElement('div');
  div.className = 'brownie';
  div.innerHTML = `
    <img src="${brownie.img}" alt="${brownie.name}">
    <div class="textBox">
    <h3>${brownie.name}</h3>
    <p>${brownie.desc}</p>
    <label>Qty:
      <input type="number" class="brownie-qty" data-name="${brownie.name}" min="0" max="10" value="0">
    </label>
    </div>
  `;
  document.getElementById('browniesContainer').appendChild(div);
});
function updateOrderSummary() {
  let total = 0;
  let count = 0;
  let orderedList = [];
  document.querySelectorAll('.brownie-qty').forEach(input => {
    let qty = Math.min(Math.max(parseInt(input.value) || 0, 0), 10); // 0–10 only
    input.value = qty;
    let name = input.dataset.name;
    if (qty > 0) {
      count += qty;
      orderedList.push(`${qty} ${name}`);
      total += 2.5 * qty;
    }
  });
  orderedBrownies.textContent = orderedList.join('\n');
  document.getElementById('totalPrice').textContent= total.toFixed(2)+" EUR";
  document.getElementById("basketCount").textContent = count;
}
// Attach listeners
document.querySelectorAll('.brownie-qty').forEach(input => {
  input.addEventListener('input', updateOrderSummary);
});
document.querySelectorAll('.copy-btn').forEach(button => {
  button.addEventListener('click', () => {
    navigator.clipboard.writeText(button.dataset.copy).then(() => {
      button.textContent = 'Copied';
      setTimeout(() => {button.textContent = 'Copy'}, 1500);
    });
  });
});
document.querySelectorAll('label').forEach(label => {
  if (label.textContent.trim().startsWith('Preferred pick-up time')) {
    const input = label.querySelector('input[type="datetime-local"]');
    if (input) {
      const now = new Date();
      now.setDate(now.getDate() + 2);
      now.setHours(16, 0, 0, 0);
      const yyyy = now.getFullYear();
      const mm = String(now.getMonth() + 1).padStart(2, '0');
      const dd = String(now.getDate()).padStart(2, '0');
      const hh = String(now.getHours()).padStart(2, '0');
      const min = String(now.getMinutes()).padStart(2, '0');
      input.value = `${yyyy}-${mm}-${dd}T${hh}:${min}`;
    }
  }
});
const form = document.getElementById("orderForm");
function buildMessage() {
  const lines = [];
  form.querySelectorAll("label").forEach(label => {
    if (label.textContent.trim().startsWith('Leave this field empty')) return;
    const control = label.control || label.querySelector("input, textarea");
    if (!control) return;
    let value = "";
    if (control.type === "checkbox") {
      value = control.checked ? "Yes" : "No";
    } else if (control.type === "datetime-local" && control.value) {
      value = new Date(control.value).toLocaleString('en-US', {
        year: 'numeric', month: 'long', day: 'numeric',
        hour: '2-digit', minute: '2-digit', hour12: false
      });
    } else {
      value = control.value || control.placeholder || "";
    }
    lines.push(`${label.textContent.trim()} ${value}`);
  });
  return lines.join("\n");
}
const timeInput = form.querySelector('input[type="datetime-local"]');
timeInput.addEventListener('input', () => {
  timeInput.setCustomValidity('');
});
form.addEventListener('submit', e => {
  e.preventDefault(); // prevent page refresh
  // Validate preferred pick-up time
  const timeValue = timeInput.value;
  if (timeValue) {
    const pickedTime = new Date(timeValue);
    const now = new Date();
    const minTime = new Date(now.getTime() + 48 * 60 * 60 * 1000); // 48 hours later
    const maxTime = new Date(now);
    maxTime.setMonth(maxTime.getMonth() + 6); // 6 months later
    const hours = pickedTime.getHours();
    if (pickedTime < minTime) {
      timeInput.setCustomValidity("Pick-up time must be at least 48 hours from now.");
    } else if (pickedTime > maxTime) {
      timeInput.setCustomValidity("Pick-up time must be within 6 months from now.");
    } else if (hours < 9) {
      timeInput.setCustomValidity("Pick-up time must be after 09:00.");
    } else if (hours >= 17) {
      timeInput.setCustomValidity("Pick-up time must be before 17:00.");
    } else {
      timeInput.setCustomValidity(""); // clear error
    }
  } else {
    timeInput.setCustomValidity("Pick-up time is required.");
  }
  if (!form.reportValidity()) return;
  const buttons = form.querySelectorAll('button');
  const clickedButton = e.submitter;
  if (clickedButton === buttons[0]) {
    // Open email
    const id = "maricakes"
    const mailtoLink = 
    window.location.href = `mailto:${id}@gmail.com?subject=MariCakes order&body=${encodeURIComponent(buildMessage())}`;
  } else if (clickedButton === buttons[1]) {
    // Copy to clipboard
    navigator.clipboard.writeText(buildMessage());
  }
});
