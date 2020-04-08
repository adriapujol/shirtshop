//SHOP CONTROLLER
const shopController = (() => {

    class Product {
        constructor(id, name, price, quantity) {
            this.id = id;
            this.name = name;
            this.price = price;
            this.quantity = quantity;
        }
    }

    product_0 = new Product("0", "Dreadful", 12.99, 1);
    product_1 = new Product("1", "Cat face", 13.99, 1);
    product_2 = new Product("2", "Sr. Batman", 15.99, 1);
    product_3 = new Product("3", "Black Mamba", 18.99, 1);

    // const products = [product_0, product_1, product_2, product_3],
    //       cart = [];

    const data = {
        products: [product_0, product_1, product_2, product_3],
        cart: [],
        total: 0
    }          
    
          
    return {

        towDec:  (x) => Number.parseFloat(x).toFixed(2),

        getData: () => data,
        // getProducts: () => products,
         
        // getCart: () => cart,

        addCart: (data, id) => {
            data.cart.push(data.products[id]);
            data.total += data.products[id].price;
            console.log(data.cart);
            // if (data.cart.indexOf(data.products[id]) > -1) {
            //     console.log('WORKS', data.cart.indexOf(data.products[id]));
            //     data.cart[0].quantity += 1;
            //     console.log(data.cart[0].quantity);
            // } else {
            //     data.cart.push(data.products[id]);
            //     data.total += data.products[id].price;
            //     console.log(data.cart);

            
                // if (data.cart.indexOf(data.products[id])) {
                //     data.cart[id].quantity += 1;
                //     console.log(data.cart);
                // } else {
                // }

            },
        
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

    const DOMstrings = {
        products: 'products',
        cart: 'cart',
        btnAdd_0: 'btn-add-0',
        btnAdd_1: 'btn-add-1',
        btnAdd_2: 'btn-add-2',
        btnAdd_3: 'btn-add-3',

    }

    // const elementsHTML = {
    //     container: document.getElementById(DOMstrings.products),
    //     cartHTML: document.getElementById(DOMstrings.cart)  
    // }
    
    return {

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

        // renderCart: (prod, cart) => {
        //     cart.innerHTML += `<div class="cart-item" id="item-${prod.id}">
        //                             <img src="img/shirt_s_${prod.id}.jpg" class="cart-img" alt="item cart">
        //                             <span>${prod.name}</span>
        //                             <input class="cart-quantity-input" id="quantity-${prod.id}" type="number" min="1" value="1">
        //                             <span class="cart-price">${prod.price * prod.cart.quantity}</span>
        //                             <button class="btn-remove-cart" id="btn-remove-${item.id}">X</button>
        //                         </div>`
        //                         ;
        // },
        renderCart: (d, ca, i) => {
            ca.innerHTML += `<div class="cart-item" id="item-${d.products[i].id}">
                                    <img src="img/shirt_s_${d.products[i].id}.jpg" class="cart-img" alt="item cart">
                                    <span>${d.products[i].name}</span>
                                    <input class="cart-quantity-input" id="quantity-${d.products[i].id}" name="quantity-${d.products[i].id}" type="number" min="1" value="${d.cart[d.cart.indexOf(d.products[i])].quantity}">
                                    <span class="cart-price" id="cart-price-${d.products[i].id}">${d.products[i].price}</span>
                                    <button class="btn-remove-cart" id="btn-remove-${d.products[i].id}">X</button>
                                </div>`
                                ;
        },
        
        deleteCartItem: (selectorID) => {
            const el = document.getElementById(selectorID);
            el.parentNode.removeChild(el);
        },

        getDOMstrings: () => DOMstrings,

        // getHTML: () => elementsHTML




    };


})();

//GLOBAL APP CONTROLLER
const controller = ((shopCtrl, UICtrl) => {

    //Getting DOM strings

    const DOM = UICtrl.getDOMstrings(),
          cart = document.getElementById(DOM.cart),
          products = document.getElementById(DOM.products),
        //   elHTML = UICtrl.getHTML(),
    // const prods = shopCtrl.getProducts();
    // const cart = shopCtrl.getCart();
          data = shopCtrl.getData();
   
    //Setting up event listeners

    const setupeEventListeners = () => {

        //Display products

        UICtrl.renderProducts(data.products, products);

        //Add event listeners to each "add to cart" button

        document.getElementById(DOM.btnAdd_0).addEventListener('click', ()=>{
            addItemCart(data, cart, 0);
        });
        document.getElementById(DOM.btnAdd_1).addEventListener('click', ()=>{
            addItemCart(data, cart, 1);
        });
        document.getElementById(DOM.btnAdd_2).addEventListener('click', ()=>{
            addItemCart(data, cart, 2);
        });
        document.getElementById(DOM.btnAdd_3).addEventListener('click', ()=>{
            addItemCart(data, cart, 3); 
        });

          cart.addEventListener('click', delItemCart);

    };

    // Add item to cart

    const addItemCart = (d, c, id) => {
        // shopCtrl.addCart(d, id);
        // UICtrl.renderCart(d.products[id], c);
        // console.log(d.total);

        //Check if item is already in the cart

        if (d.cart.indexOf(d.products[id]) > -1) {
            const cartID = d.cart.indexOf(d.products[id]);
            console.log('WORKS', d.cart.indexOf(d.products[id]));
            // 1. Update quantity of product in the cart
            d.cart[cartID].quantity += 1;
            console.log(d.cart[cartID].quantity);
            // 2. Display and update value of input
            document.getElementById(`quantity-${id}`).value = d.cart[cartID].quantity;
            // 3. Update the price of the item in the cart depending on the quantity of items added
            document.getElementById(`cart-price-${id}`).innerHTML = d.cart[cartID].price * d.cart[cartID].quantity;
            console.log('is this working?',document.getElementById(`quantity-${id}`).value);
            // 4. Add to total

            // 5. Update total UI
            
        } else {

            // 1. Add item to cart
            shopCtrl.addCart(d, id);

            // 2. Update Cart UI
            UICtrl.renderCart(d, c, id);
            console.log(d.total);

            // 4. Add to total

            // 5. Update total UI
        }
    };    

    // Delete item from cart
        const delItemCart = (event) => {
            const itemID = event.target.parentNode.id,
                  splitID = itemID.split('-'),
                  numID = splitID[1],
                  targetID = event.target.id;
                  console.log(targetID);
            console.log(numID);
            console.log(event.target.parentNode);
            console.log(itemID);
            
            if (itemID && targetID===`btn-remove-${numID}`) {
                    // 1. Remove item from data cart
                    shopCtrl.removeCart(data.cart, data.products[numID]);
                    console.log(data.cart);
                    // // 2. Remove item from UI
                    UICtrl.deleteCartItem(itemID);


            }
        };
    // const delItemCart = (c, p) => {

    
    // }

    console.log(data);

    return {
        init: function() {
            console.log("Application has started.");
            setupeEventListeners();
        },

        test: () => {
            console.log(shopCtrl.getCart());
        }
    }
    // setupeEventListeners();



})(shopController, UIController);

controller.init();


