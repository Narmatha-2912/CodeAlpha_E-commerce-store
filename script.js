const products = [
    {
        id: 1,
        name: "The Signature Handbag",
        category: "Bags",
        price: 2499,
        oldPrice: 2999,
        badge: "BESTSELLER",
        image: "https://images.unsplash.com/photo-1584917865442-de89df76afd3?w=600"
    },
    {
        id: 2,
        name: "Minimalist Watch",
        category: "Watches",
        price: 1899,
        oldPrice: 2299,
        badge: "POPULAR",
        image: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=600"
    },
    {
        id: 3,
        name: "Everyday Sneakers",
        category: "Shoes",
        price: 1599,
        oldPrice: 1999,
        badge: "NEW",
        image: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=600"
    },
    {
        id: 4,
        name: "Classic Sunglasses",
        category: "Accessories",
        price: 799,
        oldPrice: 999,
        badge: "TRENDING",
        image: "https://images.unsplash.com/photo-1511499767150-a48a237f0083?w=600"
    },
    {
        id: 5,
        name: "Luxury Shoulder Bag",
        category: "Bags",
        price: 3299,
        oldPrice: 3799,
        badge: "NEW",
        image: "https://images.unsplash.com/photo-1590874103328-eac38a683ce7?w=600"
    },
    {
        id: 6,
        name: "Classic Timepiece",
        category: "Watches",
        price: 2799,
        oldPrice: 3199,
        badge: "POPULAR",
        image: "https://images.unsplash.com/photo-1524592094714-0f0654e20314?w=600"
    },
    {
        id: 7,
        name: "Premium Leather Shoes",
        category: "Shoes",
        price: 2199,
        oldPrice: 2599,
        badge: "BESTSELLER",
        image: "https://images.unsplash.com/photo-1549298916-b41d501d3772?w=600"
    },
    {
        id: 8,
        name: "Modern Accessories",
        category: "Accessories",
        price: 999,
        oldPrice: 1299,
        badge: "NEW",
        image: "https://images.unsplash.com/photo-1617038220319-276d3cfab638?w=600"
    }
];

let cart = JSON.parse(localStorage.getItem("luxeCart") || "[]");
let wishlist = JSON.parse(localStorage.getItem("luxeWishlist") || "[]");
let selectedCategory = "All";
let showWishlistOnly = false;

const productList = document.getElementById("product-list");
const searchInput = document.getElementById("search");
const cartDrawer = document.getElementById("cart-drawer");
const overlay = document.getElementById("overlay");

const money = amount =>
    "₹" + amount.toLocaleString("en-IN");

function saveData() {
    localStorage.setItem("luxeCart", JSON.stringify(cart));
    localStorage.setItem("luxeWishlist", JSON.stringify(wishlist));
}

function showToast(message) {
    const toast = document.getElementById("toast");
    toast.textContent = message;
    toast.classList.add("show");

    setTimeout(() => {
        toast.classList.remove("show");
    }, 2200);
}

// DISPLAY PRODUCTS

function displayProducts() {
    let filtered = products.filter(product => {
        const matchesCategory =
            selectedCategory === "All" ||
            product.category === selectedCategory;

        const matchesSearch =
            product.name.toLowerCase().includes(
                searchInput.value.toLowerCase()
            );

        const matchesWishlist =
            !showWishlistOnly || wishlist.includes(product.id);

        return matchesCategory && matchesSearch && matchesWishlist;
    });

    const sortValue = document.getElementById("sort").value;

    if (sortValue === "low") {
        filtered.sort((a, b) => a.price - b.price);
    }

    if (sortValue === "high") {
        filtered.sort((a, b) => b.price - a.price);
    }

    if (filtered.length === 0) {
        productList.innerHTML =
            '<p class="no-results">No products found. Try another search.</p>';
        return;
    }

    productList.innerHTML = filtered.map(product => `
    DIL1
`).join("");}
