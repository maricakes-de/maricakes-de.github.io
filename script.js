const marble = new Image();
marble.src = 'marble.avif';
marble.onload = () => {
  document.body.classList.add('loaded');
  document.querySelectorAll('nav button').forEach(btn => {
    btn.classList.add('loaded');
  });
};
function showSection(sectionId, btn) {
  const fillMessage = document.getElementById("fillMessage");
  if (fillMessage) {
    fillMessage.classList.add("flash");
    alert('Fill your box!');
  } else {
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
}
const brownies = {
  choc: {
    price: 1.8,
    name: "Choco chip crunch",
    desc: "Fudgy brownie with velvety chocolate cream topped with crunchy choco chips.",
    ingredients: ["chocolate cream", "chocolate chips"]
  },
  almond: {
    price: 1.8,
    name: "Nutty indulgence",
    desc: "Fudgy brownie with rich chocolate drizzle and roasted hazelnuts for a simple, nutty delight.",
    ingredients: ["chocolate syrup", "hazelnuts"]
  },
  banana: {
    price: 1.8,
    name: "Nutty monkey",
    desc: "Fudgy brownie with creamy peanut butter and sweet banana slices, a classic duo.",
    ingredients: ["peanut butter", "banana"]
  },
  sprinkle: {
    price: 1.8,
    name: "Party pop",
    desc: "Fudgy brownie with a chocolate drizzle and colorful sprinkles.",
    ingredients: ["chocolate syrup", "sprinkles"]
  },
  caramel: {
    price: 1.8,
    name: "Golden duo",
    desc: "Fudgy brownie with swirls of caramel and chocolate drizzles, a rich and balanced pairing.",
    ingredients: ["caramel", "chocolate syrup", "cornstarch"]
  },
  mocha: {
    price: 1.8,
    name: "Mocha magic",
    desc: "Fudgy brownie with smooth chocolate cream and chocolate-coated mocha beans for a rich coffee kick.",
    ingredients: ["chocolate cream", "coffee"]
  },
  kinder: {
    price: 2.4,
    name: "Kinder dream",
    desc: "Fudgy brownie with luscious Kinder cream and a crispy Kinder Bueno topping.",
    ingredients: ["kinder cream", "kinder bueno"]
  },
  biscoff: {
    price: 2.4,
    name: "Lotus luxe",
    desc: "Fudgy brownie with creamy Biscoff spread and a Lotus cookie for a spiced caramel twist.",
    ingredients: ["biscoff spread", "lotus biscuit"]
  },
  oreo: {
    price: 2.4,
    name: "Cookies & dream",
    desc: "Fudgy brownie with whipped cream and crushed Oreos, the perfect cookies & cream fix.",
    ingredients: ["cream", "oreo", "gelatin"]
  },
  strawb: {
    price: 2.4,
    name: "Berry bliss",
    desc: "Fudgy brownie with silky cream and fresh strawberry slices for a fruity, dreamy bite.",
    ingredients: ["cream", "strawberries", "gelatin"]
  },
  marsh: {
    price: 2.4,
    name: "Caramel carnival",
    desc: "Fudgy brownie with rainbow-twisted marshmallows, crunchy hazelnuts, and gooey caramel drizzle.",
    ingredients: ["marshmallows", "hazelnuts", "caramel"]
  },
  chocMar: {
    price: 2.4,
    name: "Choco carnival",
    desc: "Fudgy brownie with rainbow marshmallows, roasted hazelnuts, and rich chocolate drizzle.",
    ingredients: ["marshmallows", "hazelnuts", "chocolate syrup"]
  }
};
Object.entries(brownies).forEach(([id, brownie]) => {
  const boxOf6 = document.createElement('div');
  boxOf6.className = 'brownieBox';
  boxOf6.classList.add('mouseOverBright');
  for (let step = 0; step < 6; step++) {
    const img = document.createElement('img');
    img.src = `brownies/${id}Top.avif`;
    img.alt = `${brownie.name} brownie top view`;
    boxOf6.appendChild(img);
  }
  const boxCard = document.createElement('div');
  boxCard.className = 'product brownie';
  boxCard.appendChild(boxOf6);
  const txtBox6 = document.createElement('div');
  txtBox6.className = 'textBox';
  const title = document.createElement('h2');
  title.textContent = `${brownie.name} box`;
  txtBox6.appendChild(title);
  const desc6 = document.createElement('span');
  desc6.innerHTML = `
    ${brownie.desc}<br>
    <p class="ingredients">
      <span class="toggle-ing">Ingredients</span>
      <span class="short-ing"></span>
      <span class="full-ing">:
        ${brownie.ingredients.join(', ')}, wheat flour, eggs, sugar, cocoa, butter, vanilla, salt, vegetable oil
      </span>
    </p>
    <p>Box of six : ${(5 * brownie.price).toFixed(2)} EUR.</p>
  `;
  txtBox6.appendChild(desc6);
  const toggle6 = desc6.querySelector('.toggle-ing');
  const shortIng6 = desc6.querySelector('.short-ing');
  const fullIng6 = desc6.querySelector('.full-ing');
  fullIng6.style.display = "none"; // hide full list initially
  toggle6.addEventListener('click', function () {
    if (fullIng6.style.display === "none") {
      fullIng6.style.display = "inline";
      shortIng6.style.display = "none";
    } else {
      fullIng6.style.display = "none";
      shortIng6.style.display = "inline";
    }
  });
  const label6 = document.createElement('label');
  label6.className = 'quantityLbl';
  label6.textContent = 'Quantity: ';
  const quantity = document.createElement('span');
  quantity.className = 'quantity';
  quantity.textContent = `0`;
  const space = document.createElement('span');
  space.textContent = ` `;
  const minusBtn = document.createElement('button');
  minusBtn.type = 'button';
  minusBtn.textContent = '−';
  minusBtn.addEventListener('click', () => {
    if (parseInt(input6.value, 10) > parseInt(input6.min, 10)) {
      input6.value = parseInt(input6.value, 10) - 1;
      input6.dispatchEvent(new Event('input'));
    }
  });
  const input6 = document.createElement('input');
  input6.type = 'number';
  input6.className = 'brownie-input';
  input6.name = `B${id}`;
  input6.min = 0;
  input6.max = 5;
  input6.value = 0;
  label6.appendChild(quantity);
  label6.appendChild(space);
  label6.appendChild(minusBtn);
  label6.appendChild(input6);
  txtBox6.appendChild(label6);
  boxCard.appendChild(txtBox6);
  const increaseQty6 = () => {
    if (parseInt(input6.value, 10) < parseInt(input6.max, 10)) {
      input6.value = parseInt(input6.value, 10) + 1;
      input6.dispatchEvent(new Event('input'));
    }
  };
  boxOf6.addEventListener('click', increaseQty6);
  document.getElementById('brownieBoxGrid').appendChild(boxCard);
});
Object.entries(brownies).forEach(([id, brownie]) => {
  const brownieCard = document.createElement('div');
  brownieCard.className = 'product brownie';
  const img = document.createElement('img');
  img.src = `brownies/${id}.avif`;
  img.alt = `${brownie.name} brownie side view`;
  brownieCard.appendChild(img);
  const textBox = document.createElement('div');
  textBox.className = 'textBox';
  const h2 = document.createElement('h2');
  h2.textContent = brownie.name;
  textBox.appendChild(h2);
  const desc = document.createElement('div');
  desc.innerHTML = `
    ${brownie.desc}<br>
    <p class="ingredients">
      <span class="toggle-ing">Ingredients</span>
      <span class="short-ing"></span>
      <span class="full-ing">:
        ${brownie.ingredients.join(', ')}, wheat flour, eggs, sugar, cocoa, butter, vanilla, salt, vegetable oil
      </span>
    </p>
    <p>Individual price: ${brownie.price.toFixed(2)} EUR.</p>
  `;
  textBox.appendChild(desc);
  const toggle = desc.querySelector('.toggle-ing');
  const shortIng = desc.querySelector('.short-ing');
  const fullIng = desc.querySelector('.full-ing');
  fullIng.style.display = "none"; // hide full list initially
  toggle.addEventListener('click', function () {
    if (fullIng.style.display === "none") {
      fullIng.style.display = "inline";
      shortIng.style.display = "none";
    } else {
      fullIng.style.display = "none";
      shortIng.style.display = "inline";
    }
  });
  const input = document.createElement('input');
  input.type = 'number';
  input.className = 'brownie-input';
  input.name = `A${id}`;
  input.min = 0;
  input.max = 5;
  input.value = 0;
  textBox.appendChild(input);
  brownieCard.appendChild(textBox);
  const increaseQty = () => {
    if ( parseInt(input.value, 10) < parseInt(input.max, 10) ) {
      input.value = parseInt(input.value, 10) + 1;
      input.dispatchEvent(new Event('input')); // trigger input listeners if any
    }
  };
  img.addEventListener('click', increaseQty);
  img.classList.add('mouseOverBright');
  document.getElementById('browniesGrid').appendChild(brownieCard);
});
function updateOrderSummary() {
  let total = 0;
  let boxCount = 0;
  let assortedCount = 0;
  document.getElementById('assortedGrid').innerHTML = '';
  let orderedList = [];
  let boxOf6;
  document.querySelectorAll('.brownie-input').forEach(input => {
    let qty = Math.min(Math.max(parseInt(input.value) || 0, 0), 5); // 0–5 only
    input.value = qty;
    const boxCard = input.closest('.product');
    if (boxCard) {
      const quantity= boxCard.querySelector('.quantity');
      if (quantity) {
        quantity.textContent = qty;
      }
    }
    if (qty > 0) {
      const brownieId = input.name.substring(1)
      if (input.name.startsWith("B")) {
        boxCount +=qty;
        orderedList.push(`${qty} x ${5*brownies[brownieId].price} EUR ${brownies[brownieId].name} box`);
        total += 5*brownies[brownieId].price * qty;
      } else {
        const decreaseQty = () => {
          if ( 0 < parseInt(input.value, 10) ) {
            input.value = parseInt(input.value, 10) - 1;
            input.dispatchEvent(new Event('input')); // trigger input listeners if any
          }
        };
        for (let step = 0; step < qty; step++) {
          if (assortedCount%6 === 0) {
            boxOf6 = document.createElement('div');
            boxOf6.className = 'brownieBox';
            document.getElementById('assortedGrid').appendChild(boxOf6);
          }
          //boxOf6.innerHTML += `<img src="brownies/${brownieId}Top.avif" alt="${brownies[brownieId].name} brownie top view">`;
          const img = document.createElement('img');
          img.src = `brownies/${brownieId}Top.avif`;
          img.alt = `${brownies[brownieId].name} brownie top view`;
          img.addEventListener('click', decreaseQty);
          img.classList.add('mouseOverBright');
          boxOf6.appendChild(img);
          assortedCount++;
        }
        orderedList.push(`${qty} x ${brownies[brownieId].price} EUR ${brownies[brownieId].name}`);
        total += brownies[brownieId].price * qty;
      }
    }
  });
  if (!assortedCount) {
    boxOf6 = document.createElement('div');
    boxOf6.className = 'brownieBox';
    boxOf6.innerHTML = 'Your box is empty';
    document.getElementById('assortedGrid').appendChild(boxOf6);
  } else if (assortedCount%6) {
    let fillMessage = document.createElement('div');
    fillMessage.className = 'textBox'; 
    fillMessage.id = 'fillMessage'; 
    fillMessage.innerHTML = 'Fill your box!';
    boxOf6.appendChild(fillMessage);
  }
  const orderedBrownies = document.getElementById('orderedBrownies');
  orderedBrownies.textContent = orderedList.join('\n');
  document.querySelectorAll('.totalPrice').forEach(el => el.textContent = total.toFixed(2));
  document.getElementById("boxCount").textContent = boxCount;
  document.getElementById("assortedCount").textContent = (assortedCount/6).toFixed(1);
}
// Attach listeners
updateOrderSummary();
document.querySelectorAll('.brownie-input').forEach(input => {
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
  lines.push("Price: " + document.querySelector('.totalPrice').textContent.trim() + " EUR");
  form.querySelectorAll("label").forEach(label => {
    const control = label.control || label.querySelector("input, textarea");
    if (!control) return;
    let value = "";
    if (control.type === "checkbox") {
      value = control.checked ? "Yes" : "No";
    } else if (control.type === "datetime-local") {
      value = new Date(control.value).toLocaleString('en-US', {
        year: 'numeric', month: 'long', day: 'numeric',
        hour: '2-digit', minute: '2-digit', hour12: false
      });
    } else if (label.textContent.trim().startsWith('Leave this field empty')) {
      if (value) {
        control.setCustomValidity("Do not fill the honeypot.");
      } else {
        control.setCustomValidity("");
        return;
      }
    } else if (control.id === "assortedCount") {
      return;
    } else {
      value = control.value || control.placeholder || "";
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
form.querySelector('input[type="datetime-local"]').addEventListener('input', (event) => {
  // Validate preferred pick-up time
  const timeInput = event.target;
  if (timeInput.value) {
    const pickedTime = new Date(timeInput.value);
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
