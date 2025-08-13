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
  const orderedBrownies = document.getElementById('orderedBrownies');
  orderedBrownies.textContent = orderedList.join('\n');
  document.getElementById('totalPrice').value = total.toFixed(2)+" EUR";
  document.getElementById("basketCount").value = count;
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
    lines.push(`${label.textContent.trim()} ${value}`);
  });
  return lines.join("\n");
}
const paidCheckbox = document.querySelector('label:has(input[type="checkbox"]) input[type="checkbox"]');
paidCheckbox.addEventListener('change', () => {
  document.querySelector('label:has(input[placeholder="None"]) input[type="text"]').disabled = !paidCheckbox.checked;
});
//Reset pick up time warnings when a new pick up time is chosen
form.querySelector('input[type="datetime-local"]').addEventListener('input', (timeInput) => {
  timeInput.setCustomValidity('');
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
    window.location.href = `mailto:${id}@gmail.com?subject=MariCakes order&body=${encodeURIComponent(msg)}`;
  } else if (clickedButton === buttons[1]) {
    // Copy to clipboard
    navigator.clipboard.writeText(msg);
  }
});
