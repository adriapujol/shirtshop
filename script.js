//SHOP CONTROLLER
const shopController = (() => {


//Create the class for products
    class Product {
        constructor(id, name, price, quantity) {
            this.id = id;
            this.name = name;
            this.price = price;
            this.quantity = quantity;
        }
        prodTotal() {
            return (this.quantity * this.price);
        }    

    }

//Create the products
    product_0 = new Product("0", "Dreadful", 12.99, 1);
    product_1 = new Product("1", "Sphynx Cat", 13.99, 1);
    product_2 = new Product("2", "Sr. Batman", 15.99, 1);
    product_3 = new Product("3", "Black Mamba", 18.99, 1);
    product_4 = new Product("4", "White Snake", 16.99, 1);
    product_5 = new Product("5", "Saturno Chips", 14.99, 1);
    product_6 = new Product("6", "Eastar Bunny", 15.99, 1);
    product_7 = new Product("7", "Adam & Eve", 19.99, 1);
    product_8 = new Product("8", "Ghostrider", 21.99, 1);
    product_9 = new Product("9", "Purple Butt", 16.99, 1);

// Data structure of the app
    const data = {
        products: [product_0, product_1, product_2, product_3, product_4, product_5, product_6, product_7, product_8, product_9],
        cart: [],
        discount: 'cheap20',
        disQuant: 0.2,
        disOn: false,
        total: 0
    }          
    
          
    return {

        //Shared methods

        //Access the data

        getData: () => data,


        //Add product to cart: check if it already exsit in cart. If so, increase quantity. If not, add product.
        addCart: (data, id) => {
            const cartID = data.cart.indexOf(data.products[id]);
            // console.log("Index Of Product in cart", cartID);
            if (cartID < 0) {
                data.cart.push(data.products[id]);
                // console.log("Data Cart after adding new product: ", data.cart);
            } else {
                // console.log("Product already in cart");
                data.cart[cartID].quantity += 1;
                // console.log("Data Cart after adding a product already int he cart: ", data.cart);
            }
        
        },

        // Calculate the total value of the products in the cart

        addTotal: (data) => {
            data.total = 0;
            for (item of data.cart) {
                data.total += item.prodTotal();
            }
            data.total = Math.round(data.total*100)/100;
            // console.log(data.total);
        },

        // Apply the discount to the total value of the cart

        addDiscount: (data) => {
            data.total = Math.round(data.total * (1- data.disQuant) * 100)/100;
            // console.log('discount total', data.total);
        },

        // Count how many items are in the cart

        countQuantityCart: (data) => {            

                let count = 0;
                for (item of data.cart) {
                    count += item.quantity;
                }
                return count;

            
        },

        // Clear the cart

        clearCart: (d)=> {
            data.cart = [];
        },

        // Remove product from cart

        removeCart: (cart, prod) => {
            const index = cart.indexOf(prod);
            if (index > -1) {
                cart.splice(index, 1);
            }
        }
        
    };

})();

//UI CONTROLLER
const UIController = (() => {

    //Declare Dom strings to be shared

    const DOMstrings = {
        products: 'products',
        cart: 'cart',
        cartContainer: 'cart-container',
        total: 'total',
        inputDisc: 'discount',
        discountON: 'discount-on',
        discSign: 'disc-sign',
        btnBuy: 'btn-buy',
        btnDisc: 'btn-disc',
        btnAddList: ['btn-add-0', 'btn-add-1', 'btn-add-2', 'btn-add-3', 'btn-add-4', 'btn-add-5', 'btn-add-6', 'btn-add-7', 'btn-add-8', 'btn-add-9'],

    }
   
    return {

        // Display every product

        renderProducts: (list, container) => {
            for (item of list) {
                container.innerHTML += `<div class="product">
                                        <img src="img/shirt_${item.id}.jpg" class="product-${item.id}" alt="shirt">
                                        <div class="item-info">
                                            <span class="item-name" id="item-name-${item.id}">${item.name}</span>
                                            <span class="price" id="price-${item.id}">${item.price}</span>
                                            <button class="btn-add" id="btn-add-${item.id}">add to cart</button>
                                        </div>
                                    </div>`
                                    ;
            };
        },

        // Display the Cart


        renderCart: (d, ca) => {
            ca.innerHTML = '';
            for (let i = 0; i < d.cart.length; i++ ) {
                ca.innerHTML += `<div class="cart-item" id="item-${d.cart[i].id}">
                                    <img src="img/shirt_s_${d.cart[i].id}.jpg" class="cart-img" alt="item cart">
                                    <span class="prod-name-cart">${d.cart[i].name}</span>
                                    <input class="cart-quantity-input" id="quantity-${d.cart[i].id}" name="quantity-${d.cart[i].id}" type="number" min="1" value="${d.cart[i].quantity}">
                                    <span class="cart-price" id="cart-price-${d.cart[i].id}">${Math.round(d.cart[i].prodTotal()*100)/100}</span>
                                    <button class="btn-remove-cart" id="btn-remove-${d.cart[i].id}">X</button>
                                </div>`;

            }
        },

        // Display total

        renderTotal: (d) => {
            total.innerHTML = `${d.total}`;

        },

        //Share DOM strings

        getDOMstrings: () => DOMstrings,


    };


})();

//GLOBAL APP CONTROLLER
const controller = ((shopCtrl, UICtrl) => {

    //Getting DOM strings

    const DOM = UICtrl.getDOMstrings(),
          cart = document.getElementById(DOM.cartContainer),
          products = document.getElementById(DOM.products),
          data = shopCtrl.getData();
          
    //Setting up event listeners

    const setupeEventListeners = () => {

        //Display products

        UICtrl.renderProducts(data.products, products);

        //Add event listeners to each "add to cart" button

        for (let i = 0; i < DOM.btnAddList.length; i++) {
            createListener(i);
        }
        
        // Add event to change quantity with tiny arrows

        cart.addEventListener('change', addQuantity);

        // Add event to delete item from Cart

        cart.addEventListener('click', delItemCart);

        // Add event to buy the products from the car

        document.getElementById(DOM.btnBuy).addEventListener('click', buy);

        // add event to apply Discount

        document.getElementById(DOM.btnDisc).addEventListener('click', discApply);
          

    };


    // Create EventListeners for 'add to cart' buttons

    const createListener = (btnID) => {
        document.getElementById(DOM.btnAddList[btnID]).addEventListener('click', () => {
            addItemCart(btnID);
        })
    }

    // Add item to cart checking if there is a discount or not and updating UI accordingly

    const addItemCart = (id) => {
        if (data.cart.disOn) {
            shopCtrl.addCart(data, id);
            updateCartDisc();
        } else {

            shopCtrl.addCart(data, id);
            updateCart();
        }
     
    };    

    // Delete item from cart. Reset the quantity to 1 just because
    const delItemCart = (event) => {

        const targetID = event.target.id,
                splitID = targetID.split('-'),
                numID = splitID[2];
        // console.log("Event Target ID: ", targetID);
        // console.log("ID after splitting", numID);
        // console.log("Event target Parent Node: ", event.target.parentNode);
        // console.log("Event Target Parent Node ID: ", itemID);
        
        if (targetID === `btn-remove-${numID}`) {

                // 1. Resert quantity to 1
                
                data.cart[data.cart.indexOf(data.products[numID])].quantity = 1;    ;
                
                // 2. Remove item from data cart

                shopCtrl.removeCart(data.cart, data.products[numID]);

                // 3. Update Data and UI

                updateCart();
               
                // console.log(data.cart);
                
        };


        
    };

    // Change quantity with input arrows and typing

    const addQuantity = (event) => {
        const input = event.target,
                inputID = input.id.split('-')[1],
                cartID = data.cart.indexOf(data.products[inputID]);
        // console.log(`input listener with ID ${inputID} and content: __>  ${input}`);
        // console.log('HTML input addquantity: ', input);

        // Check if value is negative or invalid and reset it to 1 in that case
        if (isNaN(input.value) || input.value < 1) {
            input.value = 1;

        // Check if there is a discount, update quantity and display UI with discount on            
        } else if (data.cart.disOn) {
            data.cart[cartID].quantity = parseInt(input.value);
            updateCartDisc();

        // If no discount update quantity and display UI normal
        } else {
            data.cart[cartID].quantity = parseInt(input.value);
            // console.log('cart after changing input', data.cart);
            updateCart();
        }

    };

    //Buy product

    const buy = () => {

        //Check if cart is empty and alert

        if (data.cart.length < 1) {
            alert('Your cart is empty!');
        } else {
            //Count the quantity of products they bought and the price and alert

            let count = shopCtrl.countQuantityCart(data);
            alert(`Congratulations, you've purchased ${count} products for ${data.total}€!`);

            // Reset quantities to 1, because if not there was this memory problem where it remembered the last quantity
            for (item of data.cart) {
                item.quantity = 1;
            }
            // Clear cart, update Data and UI and remove discount class
            shopCtrl.clearCart(data);
            updateCart();
            document.getElementById(DOM.discSign).classList.remove(DOM.discountON);

        }
    };

    //Apply discount

    const discApply = () => {
        let discInp = document.getElementById(DOM.inputDisc).value;

        // Check if the code is correct and the discount hasn't already been used
        if (discInp === data.discount && !data.cart.disOn) {
            //Add discount
            shopCtrl.addDiscount(data);
            // Display total with discount
            UICtrl.renderTotal(data);
            // Discount check TRUE
            data.cart.disOn = true;
            // Add discount class and alert of success
            document.getElementById(DOM.discSign).classList.add(DOM.discountON);
            alert("Discount applied!");
        } else if (data.cart.disOn){
            alert('Discount code already used');
        } else {    
           alert("This code doesn\'t exist");
        }
        //Clear discount field
        document.getElementById(DOM.inputDisc).value = '';
    };


    // Update cart Data and UI calling bundle of functions
    const updateCart = () => {

        shopCtrl.addTotal(data);
        UICtrl.renderCart(data, cart);
        UICtrl.renderTotal(data);

    };

    // Update cart Data and UI with Discount calling bundle of functions

    const updateCartDisc = () => {

        shopCtrl.addTotal(data);
        UICtrl.renderCart(data, cart);
        shopCtrl.addDiscount(data);
        UICtrl.renderTotal(data);

    };
    

    // console.log(data);

    return {
        init: function() {
            console.log("Application has started.");
            setupeEventListeners();
        }
    }

})(shopController, UIController);

controller.init();


