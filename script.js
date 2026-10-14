// VELOURA — katalog dan pemesanan
// Ganti nomor di bawah dengan nomor WhatsApp bisnis kamu, format internasional tanpa tanda +.
const WHATSAPP_NUMBER = "6281234567890"; // GANTI DENGAN NOMOR BISNIS

const products = [
  {
    id: "serena",
    name: "Serena Stiletto",
    category: "The Signature",
    price: 489000,
    tag: "BESTSELLER",
    image: "https://images.unsplash.com/photo-1543163521-1bf539c55dd2?auto=format&fit=crop&w=900&q=85",
    alt: "Serena Stiletto — sepatu high heels elegan"
  },
  {
    id: "celeste",
    name: "Celeste Heels",
    category: "The Evening Edit",
    price: 559000,
    tag: "EVENING WEAR",
    image: "https://images.unsplash.com/photo-1515347619252-60a4bf4fff4f?auto=format&fit=crop&w=900&q=85",
    alt: "Celeste Heels — inspirasi sepatu untuk acara spesial"
  },
  {
    id: "elara",
    name: "Elara Slingback",
    category: "The Modern Classic",
    price: 529000,
    tag: "NEW ARRIVAL",
    image: "https://images.unsplash.com/photo-1514989940723-e8e51635b782?auto=format&fit=crop&w=900&q=85",
    alt: "Elara Slingback — sepatu heels modern"
  }
];


const rupiah = (value) => new Intl.NumberFormat("id-ID", {
  style: "currency", currency: "IDR", maximumFractionDigits: 0
}).format(value);

const productGrid = document.getElementById("productGrid");
const productSelect = document.getElementById("productSelect");
const quantityInput = document.getElementById("quantity");
const estimatedTotal = document.getElementById("estimatedTotal");
const form = document.getElementById("orderForm");
const formError = document.getElementById("formError");

function renderProducts() {
  productGrid.innerHTML = products.map((product) => `
    <article class="product-card">
      <div class="product-image">
        <img src="${product.image}" alt="${product.alt}" loading="lazy">
        <span class="product-tag">${product.tag}</span>
        <button class="quick-order" type="button" data-product="${product.id}">Choose this pair ↗</button>
      </div>
      <div class="product-info">
        <div><h3>${product.name}</h3><p>${product.category}</p></div>
        <span class="product-price">${rupiah(product.price)}</span>
      </div>
    </article>
  `).join("");

  productSelect.innerHTML = '<option value="">Pilih produk</option>' + products.map((product) =>
    `<option value="${product.id}">${product.name} — ${rupiah(product.price)}</option>`
  ).join("");
}

function selectedProduct() {
  return products.find((product) => product.id === productSelect.value);
}

function updateTotal() {
  const product = selectedProduct();
  const quantity = Math.max(1, Number(quantityInput.value) || 1);
  estimatedTotal.textContent = product ? rupiah(product.price * quantity) : rupiah(0);
}

productGrid.addEventListener("click", (event) => {
  const button = event.target.closest("[data-product]");
  if (!button) return;
  productSelect.value = button.dataset.product;
  updateTotal();
  document.getElementById("order").scrollIntoView({ behavior: "smooth" });
});

productSelect.addEventListener("change", updateTotal);
quantityInput.addEventListener("input", updateTotal);

form.addEventListener("submit", (event) => {
  event.preventDefault();
  formError.textContent = "";

  if (!form.reportValidity()) return;
  if (WHATSAPP_NUMBER === "6281234567890") {
    formError.textContent = "Sebelum digunakan, ganti WHATSAPP_NUMBER di script.js dengan nomor WhatsApp bisnis kamu.";
    return;
  }

  const product = selectedProduct();
  if (!product) {
    formError.textContent = "Silakan pilih produk terlebih dahulu.";
    return;
  }

  const name = document.getElementById("customerName").value.trim();
  const phone = document.getElementById("customerPhone").value.trim();
  const size = document.getElementById("shoeSize").value;
  const quantity = Math.max(1, Number(quantityInput.value) || 1);
  const notes = document.getElementById("orderNotes").value.trim();
  const total = product.price * quantity;

  const message = [
    "Halo VELOURA, saya ingin melakukan pemesanan high heels.",
    "",
    `Nama: ${name}`,
    `Nomor WhatsApp: ${phone}`,
    `Produk: ${product.name}`,
    `Ukuran: ${size}`,
    `Jumlah: ${quantity}`,
    `Estimasi total: ${rupiah(total)}`,
    notes ? `Catatan: ${notes}` : "",
    "",
    "Mohon info ketersediaan produk dan langkah pembayaran. Terima kasih!"
  ].filter(Boolean).join("\n");

  const url = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
  window.open(url, "_blank", "noopener,noreferrer");
});

const menuToggle = document.getElementById("menuToggle");
const navLinks = document.getElementById("navLinks");
menuToggle.addEventListener("click", () => {
  const open = navLinks.classList.toggle("open");
  menuToggle.setAttribute("aria-expanded", String(open));
  menuToggle.setAttribute("aria-label", open ? "Tutup navigasi" : "Buka navigasi");
  menuToggle.textContent = open ? "×" : "☰";
});
navLinks.querySelectorAll("a").forEach((link) => {
  link.addEventListener("click", () => {
    navLinks.classList.remove("open");
    menuToggle.setAttribute("aria-expanded", "false");
    menuToggle.textContent = "☰";
  });
});

document.getElementById("year").textContent = new Date().getFullYear();
renderProducts();
updateTotal();
