const products = [
  { id: 1, name: "Labial velvet matte", price: 3200, img:"img/labial2.jpg.jpeg" },
  { id: 2, name: "Gloss Brillante", price: 3500, img: "img/labiallipoglos.jpg.jpeg" },
  { id: 3, name: "Delineador", price: 2000, img: "img/delineador.jpg.jpeg" },
  { id: 4, name: "Máscara de Pestañas", price: 3600, img: "img/pestañas.jpg.jpeg" },
  { id: 5, name: "Corrector en barra Tei", price: 6000, img: "img/pinturas.jpg.jpeg" },
  { id: 6, name: "Brochas", price: 2000, img: "img/pincel.jpg.jpeg" },
  { id: 7, name: "Mascara para puntos negros", price: 1000, img: "img/mascarapuntos.jpg.jpeg" },
  { id: 8, name: "Gloss labial hidratante", price: 2500, img: "img/GlosHidra.jpg.jpeg" },
  { id: 9, name: "Cepillo para cejas y pestañas", price: 300, img: "img/Cepillocejas.jpg.jpeg" },
  { id: 10, name: "Labial liquido TEI", price: 3000, img: "img/labialliquido.jpg.jpeg" },
  { id: 11, name: "Gloss edy", price: 4200, img: "img/Glossedy.jpg.jpeg" },
  { id: 12, name: "Sombra meow trendy", price: 7000, img: "img/sombra.jpg.jpeg" },
  { id: 13, name: "Mascara de pestañas", price: 3600, img: "img/mascaraa.jpg.jpeg" },
  { id: 14, name: "Arqueadores", price: 1200, img: "img/arqueador.jpg.jpeg" },
  { id: 15, name: "Bálasamo de frutilla", price: 2800, img: "img/frutilla.jpg.jpeg" },
  { id: 16, name: "Polvo de hadas", price: 2500, img: "img/polvo.jpg.jpeg" },
  { id: 17, name: "Base Fit ME", price: 3000, img: "img/basefit.jpg.jpeg" },
  { id: 18, name: "Tinta", price: 4000, img: "img/tintaa.jpg.jpeg" },
  { id: 19, name: "Mascara de pestañas azul", price: 3600, img: "img/azul.jpg.jpeg" },
  { id: 20, name: "Corrector de ojeras", price: 3800, img: "img/CorrectorO.jpg.jpeg" },
  { id: 21, name: "Sombra eyeshadow", price: 3800, img: "img/sombra2.jpg.jpeg" },
  { id: 22, name: "Tinta de labios", price: 3200, img: "img/tinta.jpg.jpeg" },
  { id: 23, name: "Esponja TEI", price: 1800, img: "img/Esponja.jpg.jpeg" }
];

const productList = document.getElementById("product-list");
const cartBtn = document.getElementById("cart-btn");
const cart = document.getElementById("cart");
const closeCart = document.getElementById("close-cart");
const cartItems = document.getElementById("cart-items");
const cartTotal = document.getElementById("cart-total");
const cartCount = document.getElementById("cart-count");
const whatsappBtn = document.getElementById("whatsapp-btn");

let cartData = [];

// 👉 Agregar frase llamativa arriba del catálogo
const banner = document.createElement("div");
banner.classList.add("banner");
document.querySelector("main").insertBefore(banner, productList);

// Mostrar productos
products.forEach(p => {
  const div = document.createElement("div");
  div.classList.add("product");
  div.innerHTML = `
    <img src="${p.img}" alt="${p.name}">
    <h3>${p.name}</h3>
    <p>$${p.price}</p>
    <button class="add-to-cart">Agregar</button>
  `;
  div.querySelector("button").addEventListener("click", () => addToCart(p));
  productList.appendChild(div);
});

function addToCart(product) {
  const item = cartData.find(i => i.id === product.id);
  if (item) {
    item.qty++;
  } else {
    cartData.push({ ...product, qty: 1 });
  }
  updateCart();
}

function removeFromCart(id) {
  cartData = cartData.filter(i => i.id !== id);
  updateCart();
}

function updateCart() {
  cartItems.innerHTML = "";
  let total = 0;
  let count = 0;
  cartData.forEach(i => {
    total += i.price * i.qty;
    count += i.qty;
    const li = document.createElement("li");
    li.innerHTML = `
      ${i.name} x${i.qty} - $${i.price * i.qty}
      <button class="remove-btn">❌</button>
    `;
    li.querySelector(".remove-btn").addEventListener("click", () => removeFromCart(i.id));
    cartItems.appendChild(li);
  });
  cartTotal.textContent = total;
  cartCount.textContent = count;
}

// Abrir / cerrar carrito
cartBtn.addEventListener("click", () => cart.classList.add("open"));
closeCart.addEventListener("click", () => cart.classList.remove("open"));

// Enviar a WhatsApp
whatsappBtn.addEventListener("click", () => {
  if(cartData.length === 0) {
    alert("Tu carrito está vacío.");
    return;
  }

  let message = "Hola, quiero hacer este pedido:\n";
  cartData.forEach(i => {
    message += `- ${i.name} (x${i.qty}) $${i.price * i.qty}\n`;
  });
  message += `Total: $${cartTotal.textContent}`;
  const phone = "3825417160"; // 👉 poné tu número de WhatsApp con código de país
  const url = `https://wa.me/${phone}?text=${encodeURIComponent(message)}`;
  window.open(url, "_blank");
});




