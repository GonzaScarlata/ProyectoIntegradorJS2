const cardShowed = document.getElementById("cardShowed");
const products = JSON.parse(localStorage.getItem("products")) || [];

function createProduct() {
  //Traer los productos de local storage
  const products = JSON.parse(localStorage.getItem("products")) || [];
  const cardsProducts = [];

  for (let i = 0; i < products.length; i++) {
    const product = products[i];
    const card = `
        <div class="card text-center mb-2 p-2 d-flex align-content-between flex-wrap" style="width: 18rem;">
            <div class="text-center">
                <img src="${product.productImg}" class="card-img-top" style="width: 18rem; height: 190px;" alt="imágen del producto">
            </div>
            <div class="card-body ">
                <h5 class="card-title">${product.productName}</h5>
                <p class="card-text">Precio: $${product.productPrice}</p>
            </div>
            <div>
                <div class="card-text text-center">
                    <button type="button" id="${product.id}" class="btn btn-primary" onclick="addProductToCart('${product.id}')">Agregar al carrito</button>
                    
                </div>
            </div>
        </div>
        `;
    cardsProducts.unshift(card);
  }
  cardShowed.innerHTML = cardsProducts.join("");
}
createProduct();

function addProductToCart(Id) {
    const cartProducts = JSON.parse(localStorage.getItem('cartProducts')) || [];
    console.log("🚀 ~ file: index.js ~ line 36 ~ addProductToCart ~ cartProducts", cartProducts)
    //console.log("🚀 ~ file: index.js ~ line 36 ~ addProductToCart ~ cartProducts", cartProducts)
    const products = JSON.parse(localStorage.getItem('products')) || [];
    const cartProduct = products.find(element => element.id === Id);
    //console.log("🚀 ~ file: index.js ~ line 39 ~ addProductToCart ~ cartProduct", cartProduct)

    cartProducts.push(cartProduct);
    console.log("🚀 ~ file: index.js ~ line 42 ~ addProductToCart ~ cartProducts", cartProducts)
    
    
    const cartProductJson = JSON.stringify(cartProducts);
    localStorage.setItem('cartProducts', cartProductJson);
}