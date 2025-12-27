// JavaScript for World Hope Worship Center Website

// Toggle sidebar
function toggleSidebar() {
    const sidebar = document.getElementById('sidebar');
    sidebar.classList.toggle('active');
}

// Toggle mobile nav
function toggleNav() {
    const wrapper = document.getElementById('navLinks');
    const btn = document.querySelector('.nav-toggle');
    const expanded = btn.getAttribute('aria-expanded') === 'true';
    if (wrapper) wrapper.classList.toggle('open');
    btn.setAttribute('aria-expanded', (!expanded).toString());
}

// Form submission handlers
function submitForm(event) {
    event.preventDefault();
    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const message = document.getElementById('message').value;

    // Simple validation
    if (name && email && message) {
        alert('Thank you for your message, ' + name + '! We will get back to you soon.');
        // Reset form
        event.target.reset();
    } else {
        alert('Please fill in all fields.');
    }
    return false;
}

function signup(event) {
    event.preventDefault();
    const name = document.getElementById('signupName').value;
    const email = document.getElementById('signupEmail').value;
    const password = document.getElementById('signupPassword').value;

    if (name && email && password) {
        alert('Thank you for signing up, ' + name + '!');
        event.target.reset();
    } else {
        alert('Please fill in all fields.');
    }
    return false;
}

function signin(event) {
    event.preventDefault();
    const email = document.getElementById('signinEmail').value;
    const password = document.getElementById('signinPassword').value;

    if (email && password) {
        alert('Welcome back!');
        event.target.reset();
    } else {
        alert('Please enter your email and password.');
    }
    return false;
}

  const slides = document.querySelectorAll('.slides');
  const dots = document.querySelectorAll('.dot');
  let currentSlide = 0;

  function showSlide(index) {
    slides.forEach(slide => slide.classList.remove('active'));
    dots.forEach(dot => dot.classList.remove('active'));

    slides[index].classList.add('active');
    dots[index].classList.add('active');
  }

  function nextSlide() {
    currentSlide = (currentSlide + 1) % slides.length;
    showSlide(currentSlide);
  }

  dots.forEach((dot, index) => {
    dot.addEventListener('click', () => {
      currentSlide = index;
      showSlide(currentSlide);
    });
  });

  setInterval(nextSlide, 5000); // change every 5 seconds

// Back to top button
const backToTopBtn = document.getElementById('back-to-top');

window.addEventListener('scroll', () => {
    if (window.pageYOffset > 300) {
        backToTopBtn.style.display = 'block';
    } else {
        backToTopBtn.style.display = 'none';
    }
});

// Cart functionality
let cart = [];
let cartTotal = 0;

function toggleCart() {
    const cartModal = document.getElementById('cartModal');
    cartModal.classList.toggle('active');
}

function addToCart(productName, price, imageSrc, size, color) {
    const existingItem = cart.find(item => 
        item.name === productName && 
        item.size === size && 
        item.color === color
    );
    
    if (existingItem) {
        existingItem.quantity += 1;
    } else {
        cart.push({
            name: productName,
            price: parseFloat(price),
            image: imageSrc,
            size: size,
            color: color,
            quantity: 1
        });
    }
    
    updateCartDisplay();
    updateCartCount();
    // Show success message
    showNotification(`${productName} added to cart!`);
}

function updateCartDisplay() {
    const cartItems = document.getElementById('cartItems');
    const cartTotalElement = document.getElementById('cartTotal');
    
    if (cart.length === 0) {
        cartItems.innerHTML = '<p class="empty-cart">Your cart is empty</p>';
        cartTotal = 0;
    } else {
        cartTotal = 0;
        cartItems.innerHTML = cart.map((item, index) => {
            const itemTotal = item.price * item.quantity;
            cartTotal += itemTotal;
            return `
                <div class="cart-item">
                    <img src="${item.image}" alt="${item.name}">
                    <div class="cart-item-details">
                        <h4>${item.name}</h4>
                        <p>Size: ${item.size} | Color: ${item.color}</p>
                        <p>$${item.price.toFixed(2)} each</p>
                        <div class="cart-item-quantity">
                            <button class="quantity-btn" onclick="updateQuantity(${index}, -1)">-</button>
                            <span>${item.quantity}</span>
                            <button class="quantity-btn" onclick="updateQuantity(${index}, 1)">+</button>
                        </div>
                    </div>
                    <div>
                        <p style="color: #4CAF50; font-weight: bold;">$${itemTotal.toFixed(2)}</p>
                        <button class="cart-item-remove" onclick="removeFromCart(${index})">
                            <i class="bi bi-trash"></i>
                        </button>
                    </div>
                </div>
            `;
        }).join('');
    }
    
    cartTotalElement.textContent = cartTotal.toFixed(2);
}

function updateQuantity(index, change) {
    cart[index].quantity += change;
    if (cart[index].quantity <= 0) {
        cart.splice(index, 1);
    }
    updateCartDisplay();
    updateCartCount();
}

function removeFromCart(index) {
    cart.splice(index, 1);
    updateCartDisplay();
    updateCartCount();
}

function updateCartCount() {
    const cartCount = document.getElementById('cartCount');
    const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
    cartCount.textContent = totalItems;
}

function proceedToCheckout() {
    if (cart.length === 0) {
        alert('Your cart is empty!');
        return;
    }
    
    // Scroll to checkout section and show order summary
    const checkoutSection = document.querySelector('.checkout-section');
    const checkoutSummary = document.getElementById('checkoutSummary');
    const orderItems = document.getElementById('orderItems');
    const orderTotal = document.getElementById('orderTotal');
    
    // Populate order summary
    orderItems.innerHTML = cart.map(item => 
        `<p>${item.quantity}x ${item.name} (${item.size}, ${item.color}) - $${(item.price * item.quantity).toFixed(2)}</p>`
    ).join('');
    orderTotal.textContent = cartTotal.toFixed(2);
    
    // Show summary
    checkoutSummary.style.display = 'block';
    
    document.getElementById('products').scrollIntoView({ behavior: 'smooth' });
    toggleCart();
    
    // Scroll to checkout section
    setTimeout(() => {
        checkoutSection.scrollIntoView({ behavior: 'smooth' });
    }, 300);
}

function handleCheckout(event) {
    event.preventDefault();
    
    if (cart.length === 0) {
        alert('Your cart is empty! Please add items before checkout.');
        return false;
    }
    
    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const phone = document.getElementById('phone').value;
    const address = document.getElementById('address').value;
    const city = document.getElementById('city').value;
    const zipcode = document.getElementById('zipcode').value;
    const cardNumber = document.getElementById('cardNumber').value;
    const expiry = document.getElementById('expiry').value;
    const cvv = document.getElementById('cvv').value;
    
    if (!name || !email || !phone || !address || !city || !zipcode || !cardNumber || !expiry || !cvv) {
        alert('Please fill in all fields.');
        return false;
    }
    
    // Basic card validation
    if (cardNumber.replace(/\s/g, '').length < 13 || cardNumber.replace(/\s/g, '').length > 19) {
        alert('Please enter a valid card number.');
        return false;
    }
    
    if (!/^\d{2}\/\d{2}$/.test(expiry)) {
        alert('Please enter expiry date in MM/YY format.');
        return false;
    }
    
    if (cvv.length < 3 || cvv.length > 4) {
        alert('Please enter a valid CVV.');
        return false;
    }
    
    // Simulate payment processing
    const orderSummary = cart.map(item => 
        `${item.quantity}x ${item.name} (${item.size}, ${item.color}) - $${(item.price * item.quantity).toFixed(2)}`
    ).join('\n');
    
    alert(`🎉 Payment Successful! 🎉\n\nThank you ${name}!\n\nOrder Summary:\n${orderSummary}\n\nTotal: $${cartTotal.toFixed(2)}\n\nShipping to: ${address}, ${city} ${zipcode}\n\nA confirmation email has been sent to ${email}.\n\nYour order will be processed within 2-3 business days.`);
    
    // Clear cart and form
    cart = [];
    updateCartDisplay();
    updateCartCount();
    event.target.reset();
    document.getElementById('checkoutSummary').style.display = 'none';
    
    return false;
}

function showNotification(message) {
    // Create notification element
    const notification = document.createElement('div');
    notification.className = 'notification';
    notification.textContent = message;
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: #4CAF50;
        color: white;
        padding: 15px 20px;
        border-radius: 8px;
        box-shadow: 0 4px 12px rgba(0,0,0,0.3);
        z-index: 10000;
        font-weight: 500;
        animation: slideIn 0.3s ease;
    `;
    
    document.body.appendChild(notification);
    
    // Remove after 3 seconds
    setTimeout(() => {
        notification.style.animation = 'slideOut 0.3s ease';
        setTimeout(() => {
            document.body.removeChild(notification);
        }, 300);
    }, 3000);
}

// Add click handlers to "Add to Cart" buttons
document.addEventListener('DOMContentLoaded', function() {
    const addToCartButtons = document.querySelectorAll('.add-to-cart');
    addToCartButtons.forEach(button => {
        button.addEventListener('click', function() {
            const productCard = this.closest('.product-card');
            const productName = productCard.querySelector('h3').textContent;
            const priceText = productCard.querySelector('.price').textContent;
            const price = parseFloat(priceText.replace('$', ''));
            const imageSrc = productCard.querySelector('.product-image').src;
            
            // Get selected variations
            const sizeSelect = productCard.querySelector('#size1, #size2, #size3');
            const colorSelect = productCard.querySelector('#color1, #color2, #color3');
            
            const size = sizeSelect ? sizeSelect.value : 'N/A';
            const color = colorSelect ? colorSelect.value : 'N/A';
            
            addToCart(productName, price, imageSrc, size, color);
        });
    });
});

backToTopBtn.addEventListener('click', () => {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
});

// Handle checkout form submission
function handleCheckout(event) {
    event.preventDefault();
    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const address = document.getElementById('address').value;
    const cardNumber = document.getElementById('cardNumber').value;
    const expiry = document.getElementById('expiry').value;
    const cvv = document.getElementById('cvv').value;

    // Simple validation
    if (name && email && address && cardNumber && expiry && cvv) {
        alert('Thank you for your purchase, ' + name + '! Your order has been processed.');
        // Reset form
        event.target.reset();
    } else {
        alert('Please fill in all fields.');
    }
    return false;
}

