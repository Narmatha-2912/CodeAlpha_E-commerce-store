const products = [
    {
        name: "Classic Handbag",
        price: 1299,
        image: "https://images.unsplash.com/photo-1584917865442-de89df76afd3?w=500"
    },
    {
        name: "Elegant Watch",
        price: 1899,
        image: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=500"
    },
    {
        name: "Stylish Shoes",
        price: 1599,
        image: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=500"
    },
    {
        name: "Sunglasses",
        price: 799,
        image: "https://images.unsplash.com/photo-1511499767150-a48a237f0083?w=500"
    }
];

let cartCount = 0;

const productList = document.getElementById("product-list");

function displayProducts(items) {
    productList.innerHTML = "";

    if (items.length === 0) {
        productList.innerHTML = "<p>No products found.</p>";
        return;
    }

    items.forEach(product => {
        productList.innerHTML += `
            <div class="product">
                <img src="${product.image}" alt="${product.name}">
                <h3>${product.name}</h3>
                <p>₹${product.price}</p>
                <button onclick="addToCart()">
                    Add to Cart
                </button>
            </div>
        `;
    });
}

function addToCart() {
    cartCount++;
    document.getElementById("cart-count").textContent = cartCount;
    alert("Product added to cart!");
}

document.getElementById("search").addEventListener("input", function() {
    const searchValue = this.value.toLowerCase();

    const filteredProducts = products.filter(product =>
        product.name.toLowerCase().includes(searchValue)
    );

    displayProducts(filteredProducts);
});

displayProducts(products);