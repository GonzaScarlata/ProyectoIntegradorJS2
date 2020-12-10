const cardShowed = document.getElementById("cardShowed");
const products = JSON.parse(localStorage.getItem("products")) || [];

function createProduct() {
  //Traer los productos de local storage
  const products = JSON.parse(localStorage.getItem("products")) || [];
  const cardsProducts = [];

  for (let i = 0; i < products.length; i++) {
    const product = products[i];
    const card = `
        <div class="card text-center mb-2 p-2 d-flex align-content-around flex-wrap" style="width: 18rem;">
            <div class="text-center">
                <img src="${product.productImg}" class="card-img-top" style="width: 18rem; height: 190px;" alt="imágen del producto">
            </div>
            <div class="card-body ">
                <h5 class="card-title">${product.productName}</h5>
                <p class="card-text">${product.productDescription}</p>
            </div>
            <div>
                <div class="card-text text-center">
                    <button type="button" id="${product.id}" class="btn btn-primary" onclick="addProductToCart(${product.id})">Agregar al carrito</button>
                    
                </div>
            </div>
        </div>
        `;
        console.log("🚀 ~ file: index.js ~ line 23 ~ createProduct ~ product.id", product.id)
    cardsProducts.unshift(card);
  }
  cardShowed.innerHTML = cardsProducts.join("");
}
createProduct();

function addProductToCart(Id) {
    const products = JSON.parse(localStorage.getItem('products')) || [];
    console.log("🚀 ~ file: index.js ~ line 37 ~ addProductToCart ~ products", products)
    const product = products.filter((element) => element.id === Id);
    console.log("🚀 ~ file: index.js ~ line 38 ~ addProductToCart ~ product", product)
    const productsJson = JSON.stringify(product);
    localStorage.setItem('cartProducts', productsJson);
  
}