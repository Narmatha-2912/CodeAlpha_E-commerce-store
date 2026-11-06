const products = [
    {
        id: 1,
        name: "Classic Beige Blazer",
        category: "Clothing",
        price: 2499,
        tag: "BESTSELLER",
        image: "https://images.unsplash.com/photo-1591047139829-d91aecb6caea?w=700&auto=format&fit=crop&q=85"
    },
    {
        id: 2,
        name: "Minimal Leather Handbag",
        category: "Bags",
        price: 1899,
        tag: "NEW",
        image: "https://images.unsplash.com/photo-1584917865442-de89df76afd3?w=700&auto=format&fit=crop&q=85"
    },
    {
        id: 3,
        name: "Elegant Gold Earrings",
        category: "Accessories",
        price: 799,
        tag: "POPULAR",
        image: "https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?w=700&auto=format&fit=crop&q=85"
    },
    {
        id: 4,
        name: "Everyday Classic Heels",
        category: "Shoes",
        price: 2199,
        tag: "NEW",
        image: "https://images.unsplash.com/photo-1543163521-1bf539c55dd2?w=700&auto=format&fit=crop&q=85"
    },
    {
        id: 5,
        name: "Premium White Shirt",
        category: "Clothing",
        price: 1499,
        tag: "TRENDING",
        image: "https://images.unsplash.com/photo-1598554747436-c9293d6a588f?w=700&auto=format&fit=crop&q=85"
    },
    {
        id: 6,
        name: "Structured Shoulder Bag",
        category: "Bags",
        price: 2799,
        tag: "EXCLUSIVE",
        image: "https://images.unsplash.com/photo-1590874103328-eac38a683ce7?w=700&auto=format&fit=crop&q=85"
    },
    {
        id: 7,
        name: "Timeless Gold Watch",
        category: "Accessories",
        price: 3299,
        tag: "PREMIUM",
        image: "https://images.unsplash.com/photo-1524592094714-0f0654e20314?w=700&auto=format&fit=crop&q=85"
    },
    {
        id: 8,
        name: "Urban White Sneakers",
        category: "Shoes",
        price: 1999,
        tag: "POPULAR",
        image: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=700&auto=format&fit=crop&q=85"
    }
];

let cart = JSON.parse(localStorage.getItem("luxeCart")) || [];
let wishlist = JSON.parse(localStorage.getItem("luxeWishlist")) || [];
let currentFilter = "All";
let searchTerm = "";

const productGrid = document.getElementById("productGrid");
const cartPanel = document.getElementById("cartPanel");
const wishlistPanel = document.getElementById("wishlistPanel");
const overlay = document.getElementById("overlay");
const toast = document.getElementById("toast");

function formatPrice(price) {
    return "₹" + price.toLocaleString("en-IN");
}

function saveData() {
    localStorage.setItem("luxeCart", JSON.stringify(cart));
    localStorage.setItem("luxeWishlist", JSON.stringify(wishlist));
}

function showToast(message) {
    toast.textContent = message;
    toast.classList.add("show");

    clearTimeout(showToast.timer);
    showToast.timer = setTimeout(() => {
        toast.classList.remove("show");
    }, 2500);
}

function renderProducts() {
    let filtered = products.filter(product => {
        const matchesCategory =
            currentFilter === "All" || product.category === currentFilter;

        const matchesSearch =
            product.name.toLowerCase().includes(searchTerm) ||
            product.category.toLowerCase().includes(searchTerm);

        return matchesCategory && matchesSearch;
    });

    const sort = document.getElementById("sortSelect").value;

    if (sort === "low") {
        filtered.sort((a, b) => a.price - b.price);
    } else if (sort === "high") {
        filtered.sort((a, b) => b.price - a.price);
    } else if (sort === "name") {
        filtered.sort((a, b) => a.name.localeCompare(b.name));
    }

    document.getElementById("productTotal").textContent =
        `${filtered.length} PRODUCTS`;

    if (filtered.length === 0) {
        productGrid.innerHTML =
            `<div class="no-products">No products found. Try another search.</div>`;
        return;
    }

    productGrid.innerHTML = filtered.map(product => `
        <article class="product-card">
            <div class="product-image">
              <img src="${product.image}"
                     alt="${product.name}"
                     loading="lazy"
                     onerror="this.onerror=null;this.src='https://placehold.co/600x700/f1eee8/333333?text=LUXE+Collection'">

                <span class="product-tag">${product.tag}</span>

                <button
                    class="wishlist-btn ${wishlist.includes(product.id) ? "liked" : ""}"
                    onclick="toggleWishlist(${product.id})"
                    aria-label="Add ${product.name} to wishlist">
                    ${wishlist.includes(product.id) ? "♥" : "♡"}
                </button>

                <button class="add-btn" onclick="addToCart(${product.id})">
                    ADD TO BAG +
                </button>
            </div>

            <div class="product-info">
                <h3>${product.name}</h3>
                <p class="product-category">${product.category}</p>
                <p class="product-price">${formatPrice(product.price)}</p>
            </div>
        </article>
    `).join("");
}

function addToCart(id) {
    const existing = cart.find(item => item.id === id);

    if (existing) {
        existing.quantity++;
    } else {
        cart.push({ id, quantity: 1 });
    }

    saveData();
    updateCart();
    showToast("Added to your shopping bag!");
}

function changeQuantity(id, change) {
    const item = cart.find(item => item.id === id);

    if (!item) return;

    item.quantity += change;

    if (item.quantity <= 0) {
        cart = cart.filter(item => item.id !== id);
    }

    saveData();
    updateCart();
}

function removeFromCart(id) {
    cart = cart.filter(item => item.id !== id);
    saveData();
    updateCart();
    showToast("Product removed from bag");
}

function updateCart() {
    const totalItems = cart.reduce(
        (sum, item) => sum + item.quantity, 0
    );

    const subtotal = cart.reduce((sum, item) => {
        const product = products.find(p => p.id === item.id);
        return sum + (product ? product.price * item.quantity : 0);
    }, 0);

    document.getElementById("cartCount").textContent = totalItems;
    document.getElementById("cartSubtotal").textContent =
        formatPrice(subtotal);

    const cartItems = document.getElementById("cartItems");

    if (cart.length === 0) {
        cartItems.innerHTML =
            `<div class="empty-message">Your shopping bag is empty.<br>Discover something beautiful!</div>`;
        return;
    }

    cartItems.innerHTML = cart.map(item => {
        const product = products.find(p => p.id === item.id);

        if (!product) return "";

        return `
            <div class="cart-row">
                <img src="${product.image}" alt="${product.name}">
                <div class="cart-row-info">
                    <h3>${product.name}</h3>
                    <p>${formatPrice(product.price)}</p>

                    <div class="quantity-control">
                        <button onclick="changeQuantity(${product.id}, -1)">−</button>
                        <span>${item.quantity}</span>
                        <button onclick="changeQuantity(${product.id}, 1)">+</button>
                    </div>

                    <button class="remove-btn"
                        onclick="removeFromCart(${product.id})">
                        REMOVE
                    </button>
                </div>
            </div>
        `;
    }).join("");
}

function toggleWishlist(id) {
    if (wishlist.includes(id)) {
        wishlist = wishlist.filter(item => item !== id);
        showToast("Removed from wishlist");
    } else {
        wishlist.push(id);
        showToast("Added to wishlist ♥");
    }

    saveData();
    updateWishlist();
    renderProducts();
}

function updateWishlist() {
    document.getElementById("wishCount").textContent = wishlist.length;

    const wishlistItems = document.getElementById("wishlistItems");

    const savedProducts = wishlist
        .map(id => products.find(product => product.id === id))
        .filter(Boolean);

    if (savedProducts.length === 0) {
        wishlistItems.innerHTML =
            `<div class="empty-message">Your wishlist is empty.<br>Save the pieces you love!</div>`;
        return;
    }

    wishlistItems.innerHTML = savedProducts.map(product => `
        <div class="cart-row">
            <img src="${product.image}" alt="${product.name}">
            <div class="cart-row-info">
                <h3>${product.name}</h3>
                <p>${formatPrice(product.price)}</p>
                <button class="wishlist-add"
                    onclick="addToCart(${product.id})">
                    ADD TO BAG
                </button>
                <button class="remove-btn"
                    onclick="toggleWishlist(${product.id})">
                    REMOVE
                </button>
            </div>
        </div>
    `).join("");
}

function openPanel(panel) {
    cartPanel.classList.remove("open");
    wishlistPanel.classList.remove("open");

    panel.classList.add("open");
    overlay.classList.add("show");
    document.body.style.overflow = "hidden";
}

function closePanels() {
    cartPanel.classList.remove("open");
    wishlistPanel.classList.remove("open");
    overlay.classList.remove("show");
    document.body.style.overflow = "";
}

document.getElementById("cartToggle").addEventListener("click", () => {
    openPanel(cartPanel);
});

document.getElementById("wishlistToggle").addEventListener("click", () => {
    updateWishlist();
    openPanel(wishlistPanel);
});

document.querySelectorAll(".close-panel").forEach(button => {
    button.addEventListener("click", closePanels);
});

overlay.addEventListener("click", closePanels);

document.getElementById("filterButtons").addEventListener("click", event => {
    const button = event.target.closest("[data-filter]");
    if (!button) return;

    currentFilter = button.dataset.filter;

    document.querySelectorAll(".filter-btn").forEach(btn => {
        btn.classList.toggle("active", btn === button);
    });

    renderProducts();
});

document.querySelectorAll(".category-card").forEach(button => {
    button.addEventListener("click", () => {
        currentFilter = button.dataset.category;

        document.querySelectorAll(".filter-btn").forEach(btn => {
            btn.classList.toggle(
                "active",
                btn.dataset.filter === currentFilter
            );
        });

        document.getElementById("shop").scrollIntoView({
            behavior: "smooth"
        });

        renderProducts();
    });
});

document.getElementById("sortSelect").addEventListener("change", renderProducts);

document.getElementById("searchToggle").addEventListener("click", () => {
    document.getElementById("searchPanel").classList.toggle("show");
    document.getElementById("searchInput").focus();
});

document.getElementById("closeSearch").addEventListener("click", () => {
    document.getElementById("searchPanel").classList.remove("show");
});

document.getElementById("searchInput").addEventListener("input", event => {
    searchTerm = event.target.value.trim().toLowerCase();
    currentFilter = "All";

    document.querySelectorAll(".filter-btn").forEach(btn => {
        btn.classList.toggle("active", btn.dataset.filter === "All");
    });

    renderProducts();
    document.getElementById("shop").scrollIntoView({ behavior: "smooth" });
});

document.getElementById("checkoutBtn").addEventListener("click", () => {
    if (cart.length === 0) {
        showToast("Your shopping bag is empty!");
        return;
    }

    const subtotal = cart.reduce((sum, item) => {
        const product = products.find(p => p.id === item.id);
        return sum + (product ? product.price * item.quantity : 0);
    }, 0);

    const confirmed = confirm(
        `Demo Checkout\n\nYour order total is ${formatPrice(subtotal)}.\n\nThis is a demonstration store. No real payment will be made.\n\nContinue?`
    );

    if (confirmed) {
        cart = [];
        saveData();
        updateCart();
        closePanels();
        showToast("Demo order placed successfully! Thank you.");
    }
});

document.getElementById("newsletterForm").addEventListener("submit", event => {
    event.preventDefault();

    const email = document.getElementById("newsletterEmail").value.trim();

    if (!email) return;

    showToast("Thank you for subscribing!");
    event.target.reset();
});

document.getElementById("menuToggle").addEventListener("click", () => {
    document.querySelector(".nav").classList.toggle("show");
});

document.querySelectorAll(".nav a").forEach(link => {
    link.addEventListener("click", () => {
        document.querySelector(".nav").classList.remove("show");
    });
});

// Initial page setup
renderProducts();
updateCart();
updateWishlist();

console.log("LUXE 2.0 E-commerce Store loaded successfully!");