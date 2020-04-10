//SHOP CONTROLLER
const shopController = (() => {

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

    product_0 = new Product("0", "Dreadful", 12.99, 1);
    product_1 = new Product("1", "Cat face", 13.99, 1);
    product_2 = new Product("2", "Sr. Batman", 15.99, 1);
    product_3 = new Product("3", "Black Mamba", 18.99, 1);

    const data = {
        products: [product_0, product_1, product_2, product_3],
        cart: [],
        total: 0
    }          
    
          
    return {

        towDec:  (x) => Number.parseFloat(x).toFixed(2),

        getData: () => data,

        addCart: (data, id) => {
            const cartID = data.cart.indexOf(data.products[id]);
            console.log("Index Of Product in cart", cartID);
            if (cartID < 0) {
                data.cart.push(data.products[id]);
                console.log("Data Cart after adding new product: ", data.cart);
            } else {
                console.log("Product already in cart");
                data.cart[cartID].quantity += 1;
                console.log("Data Cart after adding a product already int he cart: ", data.cart);
            }
        
        },

        addTotal: (data) => {
            data.total = 0;
            for (item of data.cart) {
                data.total += item.prodTotal();
            }
            data.total = Math.round(data.total*100)/100;
            console.log(data.total);
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
        cartContainer: 'cart-container',
        total: 'total',
        btnAdd_0: 'btn-add-0',
        btnAdd_1: 'btn-add-1',
        btnAdd_2: 'btn-add-2',
        btnAdd_3: 'btn-add-3',

    }
   
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
        renderCart: (d, ca) => {
            ca.innerHTML = '';
            for (let i = 0; i < d.cart.length; i++ ) {
                ca.innerHTML += `<div class="cart-item" id="item-${d.cart[i].id}">
                                    <img src="img/shirt_s_${d.cart[i].id}.jpg" class="cart-img" alt="item cart">
                                    <span>${d.cart[i].name}</span>
                                    <input class="cart-quantity-input" id="quantity-${d.cart[i].id}" name="quantity-${d.cart[i].id}" type="number" min="1" value="${d.cart[i].quantity}">
                                    <span class="cart-price" id="cart-price-${d.cart[i].id}">${Math.round(d.cart[i].prodTotal()*100)/100}</span>
                                    <button class="btn-remove-cart" id="btn-remove-${d.products[i].id}">X</button>
                                </div>`;

            }
        },
        
        deleteCartItem: (selectorID) => {
            console.log("SelectorID: ", selectorID);
            const el = document.getElementById(selectorID);
            el.parentNode.removeChild(el);
        },

        renderTotal: (d) => {
            total.innerHTML = `${d.total}`;

        },

        getDOMstrings: () => DOMstrings,


    };


})();

//GLOBAL APP CONTROLLER
const controller = ((shopCtrl, UICtrl) => {

    //Getting DOM strings

    const DOM = UICtrl.getDOMstrings(),
          cart = document.getElementById(DOM.cartContainer),
          products = document.getElementById(DOM.products),
          total = document.getElementsByClassName(DOM.total),
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
            shopCtrl.addCart(d, id);
            UICtrl.renderCart(d, c, id);
            shopCtrl.addTotal(d);
            UICtrl.renderTotal(d);
      
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

})(shopController, UIController);

controller.init();


