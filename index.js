const cardShowed = document.getElementById('cardShowed');
const products = JSON.parse(localStorage.getItem('products')) || [];

function createProduct() {
    //Traer los productos de local storage
    const products = JSON.parse(localStorage.getItem('products')) || [];
    const cardsProducts = [];
    
    for (let i = 0; i < products.length; i++) {
        const product = products[i];
        const card = `
        <div class="card">
            <img class="imgProduct" src="${product.productImg}" alt="...">
                <div class="card-body">
                    <h5 class="card-title">${product.productName}</h5>
                    <p class="card-text">${product.productDescription}</p>
                </div>
        </div>
        `


        cardsProducts.unshift(card);
        
    }
    cardShowed.innerHTML = cardsProducts.join('');
}
createProduct();