fetch("/carddata")
    .then(function (response) {
        return response.json();
    }
    )
    .then(function (data) {
        data.forEach(function (product) {
            const productName = product.productName;
            const productPrice = product.productPrice;
            const productDescription = product.productDescription;
            const count = product.count;
            const avtar = product.avtar;
            const Id = product._id;
            const main = document.getElementById("main-cart");
            const card = document.createElement("div");
            card.setAttribute("class", "card");
            card.innerHTML = `
            <div class="cart-item">
            <img src=${avtar} alt="Product Image">
            <div>
                <h3>${productName}</h3>
                <p>${productDescription}</p>
                <div class="card__counter">
                <form action="/sub?id=${Id}" method="POST">
                <button class="card__btn"  type="submit" id="${Id}s">-</button>
                </form>
                <div class="card__counter-score" id="counter">${count}</div>
                <form action="/add?id=${Id}" method="POST">
                <button class="card__btn card__btn-plus" type="submit" id="${Id}a">+</button>
                </form>
                <form action="/deleteitem?id=${Id}" method="POST">
                <button class="card__btn card__btn-plus" type="submit" id="${Id}b" ">Delete</button>
                </form>
            </div>
            </div>
            <div class="price">₹ ${productPrice}</div>
            </div>
            `;
            main.appendChild(card);
            total(productPrice);
        })
    })
    .catch(function (error) {
        console.log(error);
    }
    )
    let cartTotal = 0;

    function total(price) {
        cartTotal += parseFloat(price); 
        const totalElement = document.getElementById("total"); 
        totalElement.textContent = `₹ ${cartTotal.toFixed(2)}`; 
    }