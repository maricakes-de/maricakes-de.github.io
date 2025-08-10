function showSection(sectionId, btn) {
  document.querySelectorAll('.section').forEach(sec => sec.style.display = 'none');
  document.getElementById(sectionId).style.display = 'block';
  document.querySelectorAll('.tab-nav button').forEach(b => b.classList.remove('active'));
  if (btn) btn.classList.add('active');
}
const paidCheckbox = document.getElementById('paidCheckbox');
const payerAccount = document.getElementById('payerAccount');
paidCheckbox.addEventListener('change', () => {
  payerAccount.disabled = !paidCheckbox.checked;
  if (!paidCheckbox.checked) {
    payerAccount.value = ''; // clear input when unchecked
  }
});
const deliveryCheckbox = document.getElementById('dhlDelivery');
const addressInput = document.getElementById('deliveryAddress');
deliveryCheckbox.addEventListener('change', () => {
  if (deliveryCheckbox.checked) {
    addressInput.disabled = false;
  } else {
    addressInput.disabled = true;
  }
});
const brownies = [
  { name: "Toasted Almond Bliss", desc: "Light and fluffy brownie topped with roasted almonds.", img: "brownie.jpg" },
  { name: "Carrot Crunch", desc: "Carrot, almond, and cream.", img: "brownie.jpg" },
  { name: "Cookies & Cream Fantasy", desc: "Vanilla sponge topped with cookies and chocolate drizzle.", img: "brownie.jpg" },
  { name: "Chocolate Indulgence", desc: "Rich chocolate brownie with creamy layers.", img: "brownie.jpg" },
];
const pricePerCake = 2.5;
const browniesContainer = document.getElementById('browniesContainer');
const orderedCakesTextarea = document.getElementById('orderedCakes');
const totalSpan = document.getElementById('orderTotal');
// Generate brownie cards
brownies.forEach(brownie => {
  const div = document.createElement('div');
  div.className = 'brownie';
  div.innerHTML = `
    <h3>${brownie.name}</h3>
    <p>${brownie.desc}</p>
    <img src="${brownie.img}" alt="${brownie.name}">
    <label>Qty:
      <input type="number" class="brownie-qty" data-name="${brownie.name}" min="0" max="10" value="0">
    </label>
  `;
  browniesContainer.appendChild(div);
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
      orderedList.push(`${name} x${qty}`);
      total += qty * pricePerCake;
    }
  });
  // Add DHL delivery cost if selected
  const dhlDeliveryChecked = document.getElementById('dhlDelivery').checked;
  const addressInput = document.getElementById('deliveryAddress');
  addressInput.disabled = !dhlDeliveryChecked;
  if (dhlDeliveryChecked) {
    total += 8.50;
  } else {
    addressInput.value = ''; // Clear address if not delivering
  }
  orderedCakesTextarea.value = orderedList.join('\n');
  document.getElementById('totalPrice').value = total.toFixed(2);
  document.getElementById("basketCount").textContent = count;
}
// Attach listeners
document.querySelectorAll('.brownie-qty').forEach(input => {
  input.addEventListener('input', updateOrderSummary);
});
document.getElementById('dhlDelivery').addEventListener('change', updateOrderSummary);
document.querySelectorAll('.copy-btn').forEach(button => {
  button.addEventListener('click', () => {
    navigator.clipboard.writeText(button.dataset.copy).then(() => {
      button.classList.add('copied');
      setTimeout(() => button.classList.remove('copied'), 1500);
    });
  });
});
document.getElementById('orderForm').addEventListener('submit', function(e) {
  e.preventDefault();
  const form = e.target;
  // Validate pickup date (at least 1 day ahead, no more than 1 year)
  const pickupTime = new Date(form.pickupTime.value);
  const now = new Date();
  const minTime = new Date(now);
  minTime.setDate(now.getDate() + 1);
  const maxTime = new Date(now);
  maxTime.setFullYear(now.getFullYear() + 1);
  console.log('min',minTime)
  console.log('pick',pickupTime)
  console.log('max',maxTime)
  if (pickupTime < minTime) {
    alert('Pick-up time must be at least 1 day in the future.');
    return;
  }
  if (pickupTime > maxTime) {
    alert('Pick-up time must be within 1 year.');
    return;
  }
  const hour = pickupTime.getHours();
  if (hour < 9) {
    alert('Pick-up time must be later than 9:00.');
    return;
  }
  const minute = pickupTime.getMinutes();
  if (hour > 16 && minute > 0) {
    alert('Pick-up time must be earlier than 9:00.');
    return;
  }
  // Collect all input, textarea, and select elements except the submit button
  const fields = form.querySelectorAll('input:not([type="submit"]), textarea, select');
  let bodyLines = [];
  fields.forEach(field => {
    // Ignore disabled fields (e.g. payerAccount when disabled)
    if (field.disabled) return;
    let label = '';
    // Try to find label text for the field
    const labelElem = form.querySelector(`label[for="${field.id}"]`) || field.closest('label');
    if (labelElem) {
      // Remove the input element text from label, just get text content
      label = labelElem.textContent.replace(field.value, '').trim();
    } else {
      label = field.name || field.id || 'Field';
    }
    let value;
    if (field.type === 'checkbox') {
      value = field.checked ? 'Yes' : 'No';
    } else {
      value = field.value.trim();
    }
    if (!value) return; 
    console.log('val',value)
    bodyLines.push(`${label} ${value}`);
  });
  const subject = encodeURIComponent('MariCakes order');
  const body = encodeURIComponent(bodyLines.join('\n'));
  const mailtoLink = `mailto:maricakes@gmail.com?subject=${subject}&body=${body}`;
  window.location.href = mailtoLink;
});
