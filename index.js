const cardShowed = document.getElementById("cardShowed");
const products = JSON.parse(localStorage.getItem("products")) || [];
const cartModalContent = document.getElementById("cartModalContent");
const price = document.getElementById("price");


const getModal = (product) => {
    const createdAt = new Date(product.createdAt);
    let lastUpdate = (product.lastUpdate) || '-';
    if (lastUpdate !== '-') {
        lastUpdate = new Date(lastUpdate).toLocaleString();   
    }

    return `    <!-- Button trigger modal -->
                <button type="button" class="btn btn-info" data-toggle="modal" data-target="#modal${product.id}">
                    Mostrar
                </button>
                              
                <!-- Modal -->
                <div class="modal fade" id="modal${product.id}" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                    <div class="modal-dialog">
                        <div class="modal-content">
                            <div class="modal-header">
                                <h5 class="modal-title" id="exampleModalLabel">${product.productName}</h5>
                                <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                                    <span aria-hidden="true">&times;</span>
                                </button>
                            </div>
                            <div class="modal-body">
                                <div><p>Descripción: ${product.productDescription}</p></div>
                                <div><p>Marca: ${product.productBrand}</p></div>
                                <p>Precio del producto: ${product.productPrice}</p>
                                <p>Producto ingresado el día: ${createdAt.toLocaleString()}</p>
                                <p>Última modificación de catálogo: ${lastUpdate}</p>
                                <img src="${product.productImg}" class="card-img-top" alt="Esta es una imágen del producto">
                            </div>
                            <div class="modal-footer">
                                <button type="button" class="btn btn-secondary" data-dismiss="modal">Cerrar</button>
                            </div>
                        </div>
                    </div>
                </div>
            `
}

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
                    ${getModal(product)}

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
    showTheCart();
}

function totalPrice() {
    const cartProducts = JSON.parse(localStorage.getItem('cartProducts')) || [];
    let counter = 0;
    let total = ``;
    
    if (cartProducts === []) {
        total = `El carrito de compras está vacío.`;
    } else {
    for (i = 0; i < cartProducts.length; i ++) {
        const cartProduct = cartProducts[i];
        counter = counter + parseInt(cartProduct.productPrice);
        total = `<th scope="row"><i class="fas fa-angle-double-right"></i></th>
        <td>El precio total de la compra es: $${counter}</td>
        `;
    }}
    const totalPrice = [total];
    price.innerHTML = totalPrice.join('');
}
function deleteProduct(productId) {
    // Traer la lista de Productos de localStorage.
    const products = JSON.parse(localStorage.getItem('cartProducts')) || [];
    // Eliminar un Producto, usando filter() para filtrar el Producto
    // que coincide con el id recibido por parámetros.
    const filteredProducts = products.filter((product) => product.id !== productId);
    // Guardar lista de Productos en localStorage.
    const productsJson = JSON.stringify(filteredProducts);
    localStorage.setItem('cartProducts', productsJson);
    // Actualizar la tabla en el html llamando a la función displayProduct(). 
   showTheCart();
   totalPrice();
}
function showTheCart() {
    const cartProducts = JSON.parse(localStorage.getItem('cartProducts')) || [];
    const showedProducts = [];

    for (let i = 0; i < cartProducts.length ; i++) {
        const cartProduct = cartProducts[i];
        const cart = `
                <tr class = "w-100">
                    <th scope="row">${i + 1}</th>
                    <td>${cartProduct.productName}</td>
                    <td>$${cartProduct.productPrice}</td>
                    <td class="d-flex justify-content-end">
                    <!-- Button trigger modal -->
                        <button type="button" class="btn btn-info" data-toggle="modal" data-target="#modal${cartProduct.id}">
                            Mostrar
                        </button>
                        <!-- Button trigger modal edit -->
                        <button onclick="deleteProduct('${cartProduct.id}')" class="btn btn-danger ml-1"><i class="fas fa-trash-alt"></i></button>
                    </td>
                </tr>
        `;
        showedProducts.push(cart);

    }
    cartModalContent.innerHTML = showedProducts.join('');
}
showTheCart();
/*
<button type="button" class="btn btn-warning text-white" data-toggle="modal" data-target="#editModal" onclick="loadForm('${product.id}')"><i class="far fa-edit"></i></button>

 */