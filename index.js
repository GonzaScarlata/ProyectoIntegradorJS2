const cardShowed = document.getElementById("cardShowed");
const products = JSON.parse(localStorage.getItem("products")) || [];
const cartModalContent = document.getElementById("cartModalContent");

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
    const products = JSON.parse(localStorage.getItem('products')) || [];
    const cartProduct = products.find(element => element.id === Id);

    cartProducts.push(cartProduct);
    
    const cartProductJson = JSON.stringify(cartProducts);
    localStorage.setItem('cartProducts', cartProductJson);
}

function showTheCart() {
    const cartProducts = JSON.parse(localStorage.getItem('cartProducts')) || [];
    const showedProducts = [];

    for (let i = 0; i < cartProducts.length ; i++) {
        cartProduct = cartProducts[i];
        cart = `
                <tr class = "w-100">
                    <th scope="row">${i + 1}</th>
                    <td>${cartProduct.productName}</td>
                    <td>$${cartProduct.productPrice}</td>
                </tr>
        `;
        showedProducts.push(cart);
    }
    cartModalContent.innerHTML = showedProducts.join('');
}
showTheCart();
/*
                    <td>
                        ${getModal(cartProduct)}
                        <!-- Button trigger modal -->
                        <!-- Button trigger modal edit -->
                        <button type="button" class="btn btn-warning text-white" data-toggle="modal" data-target="#editModal" onclick="loadForm('${product.id}')"><i class="far fa-edit"></i></button>
                        <button onclick="deleteProduct('${cartProduct.id}')" class="btn btn-danger"><i class="fas fa-trash-alt"></i></button>
                    </td>
                    */