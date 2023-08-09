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
            const avtar = product.avtar;
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
                <button class="card__btn">-</button>
                <div class="card__counter-score">2</div>
                <button class="card__btn card__btn-plus">+</button>
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
        cartTotal += parseFloat(price); // Add the price of the product to the total
        const totalElement = document.getElementById("total"); // Replace with the actual ID of your total display element
        totalElement.textContent = `₹ ${cartTotal.toFixed(2)}`; // Display the total with 2 decimal places
    }