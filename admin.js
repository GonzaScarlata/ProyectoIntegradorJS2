const formAddProduct = document.getElementById('formAddProduct');
const productNameInput = document.getElementById('productName');
const productBrandInput = document.getElementById('productBrand');
const productDescriptionInput = document.getElementById('productDescription');
const productPriceInput = document.getElementById('productPrice');
const productsTable = document.getElementById('productsTable');
console.log("🚀 ~ file: admin.js ~ line 7 ~ productsTable", productsTable)

const generateId = function () {
    return '_' + Math.random().toString(36).substr(2, 9);
};


formAddProduct.onsubmit = (event) => {
    const products = JSON.parse(localStorage.getItem('products')) || [];
    event.preventDefault();
    const productName = productNameInput.value;
    const productBrand = productBrandInput.value;
    const productDescription = productDescriptionInput.value;
    const productPrice = productPriceInput.value;

    products.push({
        productName,
        productBrand,        
        productDescription,
        productPrice,       
        id: generateId(),
        createdAt: Date.now(),
    })
    const productsJson = JSON.stringify(products);
    localStorage.setItem('products', productsJson);
    formAddProduct.reset();
    displayAllProducts()
}

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
                                <p>Producto registrado el día: ${createdAt.toLocaleString()}</p>
                                <p>Última modificación: ${lastUpdate}</p>
                            </div>
                            <div class="modal-footer">
                                <button type="button" class="btn btn-secondary" data-dismiss="modal">Cerrar</button>
                            </div>
                        </div>
                    </div>
                </div>
            `
}


function displayProducts(products) {
    
    const rows = [];

    for (let index = 0; index < products.length; index++) {
        const product = products[index];

        const tr = `
                        <tr class = "w-100">
                            <th scope="row">${index + 1}</th>
                            <td>${product.productName}</td>
                            <td>${product.productBrand}</td>
                            <td>${product.productDescription}</td>
                            <td>${product.productPrice}</td>
                            <td>
                                ${getModal(product)}
                                <!-- Button trigger modal -->
                                <!-- Button trigger modal edit -->
                                <button type="button" class="btn btn-warning text-white" data-toggle="modal" data-target="#editModal" onclick="loadForm('${product.id}')"><i class="far fa-edit"></i></button>
                                <button onclick="deleteTask('${product.id}')" class="btn btn-danger"><i class="fas fa-trash-alt"></i></button>
                            </td>
                        </tr>
                    `   ;
        rows.push(tr);
    }
    productsTable.innerHTML = rows.join('');
    $('#addProductModal').modal('hide');
}

function displayAllProducts() {
    const products = JSON.parse(localStorage.getItem('products')) || [];

    displayProducts(products);
}