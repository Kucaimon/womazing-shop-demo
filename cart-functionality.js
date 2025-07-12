// Cart functionality for Womazing store

// Cart storage key
const CART_STORAGE_KEY = 'womazing_cart';

// Get cart from localStorage
function getCart() {
    const cart = localStorage.getItem(CART_STORAGE_KEY);
    return cart ? JSON.parse(cart) : [];
}

// Save cart to localStorage
function saveCart(cart) {
    localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(cart));
}

// Add item to cart
function addToCart(product) {
    const cart = getCart();
    
    // Check if item already exists in cart
    const existingItemIndex = cart.findIndex(item => 
        item.id === product.id && 
        item.size === product.size && 
        item.color === product.color
    );
    
    if (existingItemIndex > -1) {
        // If item exists, increase quantity
        cart[existingItemIndex].quantity += product.quantity || 1;
    } else {
        // If item doesn't exist, add new item
        cart.push({
            id: product.id,
            name: product.name,
            price: product.price,
            image: product.image,
            size: product.size,
            color: product.color,
            quantity: product.quantity || 1
        });
    }
    
    saveCart(cart);
    updateCartCount();
    
    // Show success message
    showAddToCartMessage();
}

// Remove item from cart
function removeFromCart(itemId, size, color) {
    let cart = getCart();
    cart = cart.filter(item => 
        !(item.id === itemId && item.size === size && item.color === color)
    );
    saveCart(cart);
    updateCartCount();
    
    // Reload cart page if we're on it
    if (window.location.pathname.includes('cart.html')) {
        displayCartItems();
    }
}

// Update item quantity in cart
function updateCartItemQuantity(itemId, size, color, newQuantity) {
    const cart = getCart();
    const itemIndex = cart.findIndex(item => 
        item.id === itemId && item.size === size && item.color === color
    );
    
    if (itemIndex > -1) {
        if (newQuantity <= 0) {
            removeFromCart(itemId, size, color);
        } else {
            cart[itemIndex].quantity = newQuantity;
            saveCart(cart);
            updateCartCount();
            
            // Update cart display if we're on cart page
            if (window.location.pathname.includes('cart.html')) {
                displayCartItems();
            }
        }
    }
}

// Get cart total
function getCartTotal() {
    const cart = getCart();
    return cart.reduce((total, item) => {
        return total + (parseFloat(item.price) * item.quantity);
    }, 0);
}

// Get cart item count
function getCartItemCount() {
    const cart = getCart();
    return cart.reduce((count, item) => count + item.quantity, 0);
}

// Update cart count in header
function updateCartCount() {
    const cartCountElements = document.querySelectorAll('.cart-count');
    const count = getCartItemCount();
    
    cartCountElements.forEach(element => {
        element.textContent = count;
        element.style.display = count > 0 ? 'inline' : 'none';
    });
}

// Show add to cart success message
function showAddToCartMessage() {
    // Create and show a temporary success message
    const message = document.createElement('div');
    message.className = 'cart-success-message';
    message.textContent = 'Товар добавлен в корзину!';
    message.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: #4CAF50;
        color: white;
        padding: 15px 20px;
        border-radius: 5px;
        z-index: 1000;
        font-family: 'Manrope', sans-serif;
        box-shadow: 0 2px 10px rgba(0,0,0,0.2);
        animation: slideIn 0.3s ease-out;
    `;
    
    // Add animation styles
    const style = document.createElement('style');
    style.textContent = `
        @keyframes slideIn {
            from { transform: translateX(100%); opacity: 0; }
            to { transform: translateX(0); opacity: 1; }
        }
        @keyframes slideOut {
            from { transform: translateX(0); opacity: 1; }
            to { transform: translateX(100%); opacity: 0; }
        }
    `;
    document.head.appendChild(style);
    
    document.body.appendChild(message);
    
    // Remove message after 3 seconds
    setTimeout(() => {
        message.style.animation = 'slideOut 0.3s ease-out';
        setTimeout(() => {
            if (message.parentNode) {
                message.parentNode.removeChild(message);
            }
        }, 300);
    }, 3000);
}

// Display cart items on cart page
function displayCartItems() {
    const cart = getCart();
    const cartContainer = document.querySelector('.cart-container');
    
    if (!cartContainer) return;
    
    // Clear existing items (except header)
    const existingItems = cartContainer.querySelectorAll('.cart-item');
    existingItems.forEach(item => item.remove());
    
    if (cart.length === 0) {
        // Show empty cart message
        const emptyMessage = document.createElement('div');
        emptyMessage.className = 'empty-cart-message';
        emptyMessage.innerHTML = `
            <div style="text-align: center; padding: 40px; color: #666;">
                <h3>Ваша корзина пуста</h3>
                <p>Добавьте товары из каталога</p>
                <a href="shop.html" style="display: inline-block; margin-top: 20px; padding: 10px 20px; background: #6366f1; color: white; text-decoration: none; border-radius: 5px;">Перейти в магазин</a>
            </div>
        `;
        cartContainer.appendChild(emptyMessage);
        
        // Hide cart actions
        const cartActions = document.querySelector('.cart-actions');
        if (cartActions) cartActions.style.display = 'none';
        
        return;
    }
    
    // Show cart actions
    const cartActions = document.querySelector('.cart-actions');
    if (cartActions) cartActions.style.display = 'flex';
    
    // Add cart items
    cart.forEach((item, index) => {
        const cartItem = document.createElement('div');
        cartItem.className = 'cart-item';
        cartItem.setAttribute('data-item-id', item.id);
        cartItem.setAttribute('data-size', item.size || '');
        cartItem.setAttribute('data-color', item.color || '');
        
        const itemTotal = (parseFloat(item.price) * item.quantity).toFixed(0);
        
        cartItem.innerHTML = `
            <button class="remove-btn" onclick="removeCartItem('${item.id}', '${item.size || ''}', '${item.color || ''}')" title="Удалить товар">×</button>
            
            <div class="product-info">
                <img src="${item.image}" alt="${item.name}" class="product-image" />
                <div class="product-details">
                    <h3>${item.name}</h3>
                    ${item.size ? `<p>Размер: ${item.size}</p>` : ''}
                    ${item.color ? `<p>Цвет: ${item.color}</p>` : ''}
                </div>
            </div>
            
            <div class="product-price">${item.price} руб</div>
            
            <div class="quantity-controls">
                <button class="quantity-btn" onclick="updateQuantity('${item.id}', '${item.size || ''}', '${item.color || ''}', ${item.quantity - 1})">−</button>
                <input type="number" class="quantity-input" value="${item.quantity}" min="1" onchange="updateQuantity('${item.id}', '${item.size || ''}', '${item.color || ''}', this.value)" />
                <button class="quantity-btn" onclick="updateQuantity('${item.id}', '${item.size || ''}', '${item.color || ''}', ${item.quantity + 1})">+</button>
            </div>
            
            <div class="total-price">${itemTotal} руб</div>
            
            <!-- Мобильная версия -->
            <div class="mobile-row" style="display: none">
                <span class="mobile-label">Цена:</span>
                <span class="product-price">${item.price} руб</span>
            </div>
            <div class="mobile-row" style="display: none">
                <span class="mobile-label">Всего:</span>
                <span class="total-price">${itemTotal} руб</span>
            </div>
        `;
        
        // Insert after cart header
        const cartHeader = cartContainer.querySelector('.cart-header');
        if (cartHeader) {
            cartHeader.insertAdjacentElement('afterend', cartItem);
        } else {
            cartContainer.appendChild(cartItem);
        }
    });
    
    // Update totals
    updateCartTotals();
}

// Update cart totals
function updateCartTotals() {
    const total = getCartTotal();
    const subtotalElement = document.getElementById('subtotal');
    const totalElement = document.getElementById('total');
    
    if (subtotalElement) subtotalElement.textContent = `${total.toFixed(0)} руб`;
    if (totalElement) totalElement.textContent = `${total.toFixed(0)} руб`;
}

// Global functions for cart page
window.removeCartItem = function(itemId, size, color) {
    removeFromCart(itemId, size, color);
};

window.updateQuantity = function(itemId, size, color, newQuantity) {
    updateCartItemQuantity(itemId, size, color, parseInt(newQuantity));
};

// Initialize cart on page load
document.addEventListener('DOMContentLoaded', function() {
    updateCartCount();
    
    // If we're on the cart page, display cart items
    if (window.location.pathname.includes('cart.html')) {
        displayCartItems();
    }
});

// Export functions for use in other files
window.cartFunctions = {
    addToCart,
    removeFromCart,
    updateCartItemQuantity,
    getCart,
    getCartTotal,
    getCartItemCount,
    updateCartCount,
    displayCartItems
};

