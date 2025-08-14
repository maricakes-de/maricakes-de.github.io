function showSection(sectionId, btn) {
  document.querySelectorAll('section').forEach(sec => sec.style.display = 'none');
  document.getElementById(sectionId).style.display = 'block';
  document.querySelectorAll('nav button').forEach(b => b.classList.remove('active'));
  if (btn) btn.classList.add('active');
  const bnkInfo = document.getElementById('bnkInfo');
  if (document.querySelector('label.honeypot input').value) {
    bnkInfo.innerHTML = `<p>Get in touch with us by email, Facebook, or Instagram, and we’ll send you our b`+`a`+`nk details.</p>`
  } else {
    bnkInfo.innerHTML = `
      <p>Please transfer your payment to the following account:</p>
        <li>
          <strong>Ac`+`c`+`ount type:</strong> Bu`+`siness
        </li>
        <li>
          <strong>Account name:</strong> M`+`ari`+`ko S`+`uzu`+`ki
          <button class="copy-btn" data-copy="M`+`ar`+`ik`+`o S`+`uz`+`uki" aria-label="Copy Account Name">Copy</button>
        </li>
        <li>
          <strong>I`+`BA`+`N:</strong> D`+`E0`+`2 10`+`01 100`+`1 25`+`06 44`+`91 2`+`6
          <button class="copy-btn" data-copy="D`+`E0`+`2 1`+`00`+`1 1`+`0`+`01 2`+`50`+`6 4`+`4`+`91 2`+`6" aria-label="Copy I`+`B`+`AN">Copy</button>
        </li>
      <p>After transferring, please enter your b`+`a`+`nk acc`+`ount name in the form below, and attach a copy of the pa`+`yme`+`nt confirmation to your message.</p>`
  }
}
const brownies = {
  almond:  {price:2.5, name: "Toasted almond bliss", desc: "Light and fluffy brownie topped with roasted almonds." },
  banana:  {price:2.5, name: "Carrot crunch", desc: "Carrot, almond, and cream."},
  biscoff: {price:2.5, name: "Cookies & cream fantasy", desc: "Vanilla sponge topped with cookies and chocolate drizzle." },
  caramel: {price:2.5, name: "Chocolate indulgence", desc: "Rich chocolate brownie with creamy layers." },
  choc:    {price:2.5, name: "Chocolate indulgence", desc: "Rich chocolate brownie with creamy layers." },
  chocMar: {price:2.5, name: "Chocolate indulgence", desc: "Rich chocolate brownie with creamy layers." },
  kinder:  {price:2.5, name: "Chocolate indulgence", desc: "Rich chocolate brownie with creamy layers." },
  marsh:   {price:2.5, name: "Chocolate indulgence", desc: "Rich chocolate brownie with creamy layers." },
  mocha:   {price:2.5, name: "Chocolate indulgence", desc: "Rich chocolate brownie with creamy layers." },
  oreo:    {price:2.5, name: "Chocolate indulgence", desc: "Rich chocolate brownie with creamy layers." },
  sprinkle:{price:2.5, name: "Chocolate indulgence", desc: "Rich chocolate brownie with creamy layers." },
  strawb:  {price:2.5, name: "Chocolate indulgence", desc: "Rich chocolate brownie with creamy layers." },
};
Object.entries(brownies).forEach(([id, brownie]) => {
  const boxOf6 = document.createElement('div');
  boxOf6.className = 'brownieBox';
  for (let step = 0; step < 6; step++) {
    boxOf6.innerHTML += `<img src="brownies/${id}Top.avif" alt="${brownie.name} brownie top view">`;
  }
  const boxCard = document.createElement('div');
  boxCard.appendChild(boxOf6);
  boxCard.className = 'product';
  boxCard.innerHTML += `
    <div class="textBox">
    <h2>${brownie.name} box</h2>
    ${brownie.desc}<br>
    price ${(5*brownie.price).toFixed(2)} EUR<br>
    <label>Qty:
      <input type="number" class="brownie-qty" name="B${id}" min="0" max="5" value="0">
    </label>
    </div>
  `;
  document.getElementById('brownieBoxGrid').appendChild(boxCard);
  
  const brownieCard = document.createElement('div');
  brownieCard.className = 'product';
  brownieCard.innerHTML += `
    <img src="brownies/${id}.avif" alt="${brownie.name} brownie side view">
    <div class="textBox">
    <h2>${brownie.name}</h2>
    ${brownie.desc}<br>
    price ${(brownie.price).toFixed(2)} EUR<br>
    <label>Qty:
      <input type="number" class="brownie-qty" name="A${id}" min="0" max="5" value="0">
    </label>
    </div>
  `;
  document.getElementById('browniesGrid').appendChild(brownieCard);
});
function updateOrderSummary() {
  let total = 0;
  let boxCount = 0;
  let assortedCount = 0;
  document.getElementById('assortedGrid').innerHTML = '';
  let orderedList = [];
  let boxOf6 = document.createElement('div');
  boxOf6.className = 'brownieBox';
  document.getElementById('assortedGrid').appendChild(boxOf6);
  document.querySelectorAll('.brownie-qty').forEach(input => {
    let qty = Math.min(Math.max(parseInt(input.value) || 0, 0), 5); // 0–5 only
    input.value = qty;
    if (qty > 0) {
      const brownieId = input.name.substring(1)
      if (input.name.startsWith("B")) {
        boxCount +=qty;
        orderedList.push(`${qty} x ${5*brownies[brownieId].price} EUR ${brownies[brownieId].name} box`);
        total += 5*brownies[brownieId].price * qty;
      } else {
        for (let step = 0; step < qty; step++) {
          boxOf6.innerHTML += `<img src="brownies/${brownieId}Top.avif" alt="${brownies[brownieId].name} brownie top view">`;
          assortedCount++;
          if (assortedCount%6 === 0) {
            boxOf6 = document.createElement('div');
            boxOf6.className = 'brownieBox';
            document.getElementById('assortedGrid').appendChild(boxOf6);
          }
        }
        orderedList.push(`${qty} x ${brownies[brownieId].price} EUR ${brownies[brownieId].name}`);
        total += brownies[brownieId].price * qty;
      }
    }
  });
  let fillMessage = document.createElement('span');
  fillMessage.innerHTML += 'Fill your box!';
  fillMessage.style.width = '33%'; 
  fillMessage.style.display = "inline-block";
  boxOf6.appendChild(fillMessage);
  const orderedBrownies = document.getElementById('orderedBrownies');
  orderedBrownies.textContent = orderedList.join('\n');
  document.getElementById('totalPrice').textContent = total.toFixed(2);
  document.getElementById("boxCount").textContent = boxCount;
  document.getElementById("assortedCount").textContent = Math.floor(assortedCount/6);
}
// Attach listeners
document.querySelectorAll('.brownie-qty').forEach(input => {
  input.addEventListener('input', updateOrderSummary);
});
document.querySelectorAll('label').forEach(label => {
  if (label.textContent.trim().startsWith('Preferred pick-up time')) {
    const input = label.querySelector('input[type="datetime-local"]');
    if (input) {
      const now = new Date();
      now.setDate(now.getDate() + 3);
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
document.addEventListener('click', (e) => {
  const button = e.target.closest('.copy-btn'); // supports nested elements inside button
  if (!button) return; // clicked element is not a copy button
  const form = button.closest('form');
  if (form && !form.reportValidity()) return;   
  navigator.clipboard.writeText(button.dataset.copy).then(() => {
    button.textContent = 'Copied';
    setTimeout(() => { button.textContent = 'Copy'; }, 1500);
  });
});
const form = document.getElementById("orderForm");
function buildMessage(form) {
  const lines = [];
  lines.push(document.getElementById('orderedBrownies').textContent.trim());
  lines.push("Price: " + document.getElementById('totalPrice').textContent.trim() + " EUR");
  form.querySelectorAll("label").forEach(label => {
    const control = label.control || label.querySelector("input, textarea");
    if (!control) return;
    let value = "";
    if (control.type === "checkbox") {
      value = control.checked ? "Yes" : "No";
    } else if (control.type === "datetime-local") {
      // Validate preferred pick-up time
      if (control.value) {
        const pickedTime = new Date(control.value);
        const now = new Date();
        const minTime = new Date(now.getTime() + 48 * 60 * 60 * 1000); // 48 hours later
        const maxTime = new Date(now);
        maxTime.setMonth(maxTime.getMonth() + 6); // 6 months later
        const hours = pickedTime.getHours();
        if (pickedTime < minTime) {
          control.setCustomValidity("Pick-up time must be at least 48 hours from now.");
        } else if (pickedTime > maxTime) {
          control.setCustomValidity("Pick-up time must be within 6 months from now.");
        } else if (hours < 9) {
          control.setCustomValidity("Pick-up time must be after 09:00.");
        } else if (hours >= 17) {
          control.setCustomValidity("Pick-up time must be before 17:00.");
        } else {
          control.setCustomValidity(""); // clear error
        }
      } else {
        control.setCustomValidity("Pick-up time is required.");
      }
      value = new Date(control.value).toLocaleString('en-US', {
        year: 'numeric', month: 'long', day: 'numeric',
        hour: '2-digit', minute: '2-digit', hour12: false
      });
    } else {
      value = control.value || control.placeholder || "";
    }
    if (label.textContent.trim().startsWith('Leave this field empty')) {
      if (value) {
        control.setCustomValidity("Do not fill the honeypot.");
      } else {
        control.setCustomValidity("");
        return;
      }
    }
    lines.push(label.textContent.replace(/^Your\b/, "My").trim() + " " + value.trim());
  });
  return lines.join("\n");
}
const paidCheckbox = document.querySelector('label:has(input[type="checkbox"]) input[type="checkbox"]');
paidCheckbox.addEventListener('change', () => {
  document.querySelector('label:has(input[placeholder="None"]) input[type="text"]').disabled = !paidCheckbox.checked;
});
//Reset pick up time warnings when a new pick up time is chosen
form.querySelector('input[type="datetime-local"]').addEventListener('input', (timeInput) => {
  timeInput.target.setCustomValidity('');
});
form.addEventListener('submit', e => {
  e.preventDefault(); // prevent page refresh
  const msg = buildMessage(form);
  if (!form.reportValidity()) return;
  const buttons = form.querySelectorAll('button');
  const clickedButton = e.submitter;
  if (clickedButton === buttons[0]) {
    // Open email
    const id = "maricakes"
    const mailtoLink = 
    window.location.href = `mailto:${id}@gmail.com?subject=my MariCakes order&body=${encodeURIComponent(msg)}`;
  } else if (clickedButton === buttons[1]) {
    // Copy to clipboard
    navigator.clipboard.writeText(msg);
  }
});
