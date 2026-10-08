let cart = [];


// ADD FOOD TO CART
function addToCart(name, price) {

    const existingFood = cart.find(item => item.name === name);

    if (existingFood) {
        existingFood.quantity++;
    } else {
        cart.push({
            name: name,
            price: price,
            quantity: 1
        });
    }

    updateCart();

    alert(name + " added to your cart! 🍔");
}


// UPDATE CART
function updateCart() {

    const cartItems = document.getElementById("cartItems");
    const cartCount = document.getElementById("cartCount");
    const cartTotal = document.getElementById("cartTotal");

    let totalItems = 0;
    let totalPrice = 0;

    cartItems.innerHTML = "";

    if (cart.length === 0) {

        cartItems.innerHTML =
            '<p class="empty-cart">Your cart is empty.</p>';

    } else {

        cart.forEach((food, index) => {

            totalItems += food.quantity;

            totalPrice +=
                food.price * food.quantity;

            const item =
                document.createElement("div");

            item.className = "cart-item";

            item.innerHTML = `
                <div>
                    <strong>${food.name}</strong>
                    <br>
                    <small>
                        ₹${food.price} × ${food.quantity}
                    </small>
                </div>

                <button
                    class="remove-btn"
                    onclick="removeFromCart(${index})">
                    Remove
                </button>
            `;

            cartItems.appendChild(item);
        });
    }

    cartCount.textContent = totalItems;

    cartTotal.textContent = totalPrice;
}


// REMOVE FOOD
function removeFromCart(index) {

    cart.splice(index, 1);

    updateCart();
}


// OPEN CART
function openCart() {

    document.getElementById("cartModal").style.display =
        "flex";

    updateCart();
}


// CLOSE CART
function closeCart() {

    document.getElementById("cartModal").style.display =
        "none";
}


// SEARCH FOOD
function searchFood() {

    const searchText =
        document
        .getElementById("searchInput")
        .value
        .toLowerCase();

    const foods =
        document.querySelectorAll(".food-card");

    foods.forEach(food => {

        const name =
            food.dataset.name.toLowerCase();

        if (name.includes(searchText)) {

            food.style.display = "block";

        } else {

            food.style.display = "none";

        }
    });
}


// FILTER CATEGORY
function filterCategory(category) {

    const foods =
        document.querySelectorAll(".food-card");

    foods.forEach(food => {

        if (
            category === "all" ||
            food.dataset.category === category
        ) {

            food.style.display = "block";

        } else {

            food.style.display = "none";

        }
    });

    document.getElementById("searchInput").value = "";
}


// CHECKOUT
function checkout() {

    if (cart.length === 0) {

        alert("Your cart is empty! 🍽️");

        return;
    }

    let total = 0;

    cart.forEach(food => {

        total +=
            food.price * food.quantity;

    });

    alert(
        "🎉 Order Placed Successfully!\n\n" +
        "Total Amount: ₹" +
        total +
        "\n\nThank you for ordering from FoodieHub! ❤️"
    );

    cart = [];

    updateCart();

    closeCart();
}


// CLOSE CART WHEN CLICKING OUTSIDE
window.onclick = function(event) {

    const modal =
        document.getElementById("cartModal");

    if (event.target === modal) {

        closeCart();
    }
};


// INITIAL CART
updateCart();
