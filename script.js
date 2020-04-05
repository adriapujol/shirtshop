const shopController = (() => {

    class Product {
        constructor(id, name, price) {
            this.id = id;
            this.name = name;
            this.price = price;
        }
    }

    product_0 = new Product("0", "Dreadful", 12.99);
    product_1 = new Product("1", "Cat face", 13.99);
    product_2 = new Product("2", "Sr. Batman", 15.99);
    product_3 = new Product("3", "Black Mamba", 18.99);

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
            },
        
        removeCart: (cart, prod) => {
            const index = cart.indexOf(prod);
            if (index > -1) {
                cart.splice(index, 1);
            }
        }
        
    };

})();


const UIController = (() => {

    const DOMstrings = {
        products: 'products',
        cart: 'cart',
        btnAdd_0: 'btn-add-0',
        btnAdd_1: 'btn-add-1',
        btnAdd_2: 'btn-add-2',
        btnAdd_3: 'btn-add-3',

    }

    const elementsHTML = {
        container: document.getElementById(DOMstrings.products),
        cartHTML: document.getElementById(DOMstrings.cart)  
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

        renderCart: (prod, cart) => {
            cart.innerHTML += `<div class="cart-item" id="item-${prod.id}">
                                    <img src="img/shirt_s_${prod.id}.jpg" class="cart-img" alt="item cart">
                                    <span>${prod.name}</span>
                                    <input class="cart-quantity-input" type="number" min="1" max="20" value="1">
                                    <span class="cart-price">${prod.price}</span>
                                    <button class="btn-remove-cart" id="btn-remove-${item.id}">X</button>
                                </div>`
                                ;
        },

        getDOMstrings: () => DOMstrings,

        getHTML: () => elementsHTML




    };


})();


const controller = ((shopCtrl, UICtrl) => {

    const DOM = UICtrl.getDOMstrings();
    const elHTML = UICtrl.getHTML();
    // const prods = shopCtrl.getProducts();
    // const cart = shopCtrl.getCart();
    const data = shopCtrl.getData();
   

    const setupeEventListeners = () => {

        UICtrl.renderProducts(data.products, elHTML.container);

        document.getElementById(DOM.btnAdd_0).addEventListener('click', ()=>{
            shopCtrl.addCart(data, 0);
            UICtrl.renderCart(data.products[0], elHTML.cartHTML);
            console.log(data.total);
        });
        document.getElementById(DOM.btnAdd_1).addEventListener('click', ()=>{
            shopCtrl.addCart(data, 1);
            UICtrl.renderCart(data.products[1], elHTML.cartHTML);
            console.log(data.total);
        });
        document.getElementById(DOM.btnAdd_2).addEventListener('click', ()=>{
            shopCtrl.addCart(data, 2);
            UICtrl.renderCart(data.products[2], elHTML.cartHTML);
            console.log(data.total);
        });
        document.getElementById(DOM.btnAdd_3).addEventListener('click', ()=>{
            shopCtrl.addCart(data, 3);
            UICtrl.renderCart(data.products[3], elHTML.cartHTML);
            console.log(data.total);
            
        });

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
    // setupeEventListeners();



})(shopController, UIController);

controller.init();

// window.onload = function ready() {
  
//     product_0 = new Product("0", "Dreadful", 12.99);
//     product_1 = new Product("1", "Cat face", 13.99);
//     product_2 = new Product("2", "Sr. Batman", 15.99);
//     product_3 = new Product("3", "Black Mamba", 18.99);
//     const products = [product_0, product_1, product_2, product_3],
//           cart = [],
//           container = document.getElementById("products"),
//           cartHTML = document.getElementById("cart");  

//     renderProduct(products, container);

//     const btnAdd_0 = document.getElementById("btn-add-0"),
//           btnAdd_1 = document.getElementById("btn-add-1"),
//           btnAdd_2 = document.getElementById("btn-add-2"),
//           btnAdd_3 = document.getElementById("btn-add-3");


//     console.log(cart);
    // btnAdd_0.addEventListener('click', ()=>{
    //     addCart(cart, product_0);
    //     renderCart(product_0, cartHTML);
    // });
//     btnAdd_1.addEventListener('click', ()=>{
//         addCart(cart, product_1, cartHTML);
//         renderCart(product_1, cartHTML);
//     });
//     btnAdd_2.addEventListener('click', ()=>{
//         addCart(cart, product_2, cartHTML);
//         renderCart(product_2, cartHTML);
//     });
//     btnAdd_3.addEventListener('click', ()=>{
//         addCart(cart, product_3, cartHTML);
//         renderCart(product_3, cartHTML);
//     });



// };



// class Product {
//     constructor(id, name, price) {
//         this.id = id;
//         this.name = name;
//         this.price = price;
//     }
// }

// const addCart = (cart, item) => {
//     cart.push(item);
//     console.log(cart);
// };

// const removeCart = (cart, item) => {
    


// }

// const renderProduct = (list, container) => {
//     for (item of list) {
//         container.innerHTML += `<div class="product">
//                                 <img src="img/shirt_${item.id}.jpg" class="product-${item.id}" alt="shirt">
//                                 <div class="item-info">
//                                     <span class="item-name" id="item-name-${item.id}">${item.name}</span>
//                                     <span class="price" id="price-${item.id}">${item.price}</span>
//                                     <button class="btn-add" id="btn-add-${item.id}">add to cart</button>
//                                 </div>
//                             </div>`
//                             ;
//     };
// };    

// const renderCart = (prod, cart) => {
//     cart.innerHTML += `<div class="cart-item" id="item-${prod.id}">
//                             <img src="img/shirt_s_${prod.id}.jpg" class="cart-img" alt="item cart">
//                             <span>${prod.name}</span>
//                             <input class="cart-quantity-input" type="number" min="1" max="20" value="1">
//                             <span class="cart-price">${prod.price}</span>
//                             <button class="btn-remove-cart" id="btn-remove-${item.id}">X</button>
//                         </div>`
//                         ;
// };    


