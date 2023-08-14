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
            card.setAttribute("id", "card"+Id);
            card.innerHTML = `
            <div class="cart-item">
            <img src=${avtar} alt="Product Image">
            <div>
                <h3>${productName}</h3>
                <div class="card__counter">
                <button class="card__btn" id="${Id}" onclick="handleSub(this.id, '${count}')">-</button>
                <div class="card__counter-score" id="counter+${Id}">${count}</div>
                <button class="card__btn card__btn-plus" id="${Id}" onclick="handleAdd(this.id, '${productPrice}')">+</button>
                <button class="card__btn card__btn-plus"  id="${Id}" onclick="handleDelete(this.id, '${count}')" >Delete</button>
            </div>
            </div>
            <div class="price" id="pprice+${Id}">₹ ${productPrice}</div>
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

function handleAdd(id,price) {

    fetch("/add?id=" + id, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        }
    })
        .then(function (response) {
            fetch("/cardData")
                .then(function (response) {
                    return response.json();
                }
                )
                .then(function (data) {
                     const count = data.find(function (product) {
                        return product._id === id;
                    })
                    cartCount = count.count;
                    cartPrice = count.productPrice;
                    const finalPrice = data.reduce(function (total, product) {
                        return total + parseFloat(product.productPrice);
                      }, 0);
                    const counterScore = document.getElementById("counter+" + id);
                    counterScore.textContent = cartCount;
                    const price = document.getElementById("pprice+"+id);
                    price.textContent = `₹ ${cartPrice}`;
                    const totalElement = document.getElementById("total");
                    totalElement.textContent = `₹ ${finalPrice.toFixed(2)}`;
                })
        })

}
function handleSub(id,count) {

    fetch("/sub?id=" + id, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        }
    })
        .then(function (response) {
            fetch("/cardData")
                .then(function (response) {
                    return response.json();
                }
                )
                .then(function (data) {
                     const count = data.find(function (product) {
                        return product._id === id;
                    })
                    cartCount = count.count;
                    cartPrice = count.productPrice;
                    if(cartCount === 0){
                        const card = document.getElementById("card"+id);
                        card.remove();
                        handleDelete(id,count);
                        const finalPrice = data.reduce(function (total, product) {
                            return total + parseFloat(product.productPrice);
                          }, 0);
                          const totalElement = document.getElementById("total");
                          totalElement.textContent = `₹ ${finalPrice.toFixed(2)}`;
                    }
                    const finalPrice = data.reduce(function (total, product) {
                        return total + parseFloat(product.productPrice);
                      }, 0);
                    const counterScore = document.getElementById("counter+" + id);
                    counterScore.textContent = cartCount;
                    const price = document.getElementById("pprice+"+id);
                    price.textContent = `₹ ${cartPrice}`;
                    const totalElement = document.getElementById("total");
                    totalElement.textContent = `₹ ${finalPrice.toFixed(2)}`;
                })
        })

}
function handleDelete(id,count) {
    
        fetch("/deleteitem?id=" + id, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            }
        })
            .then(function (response) {
                fetch("/cardData")
                    .then(function (response) {
                        return response.json();
                    }
                    )
                    .then(function (data) {
                        const finalPrice = data.reduce(function (total, product) {
                            return total + parseFloat(product.productPrice);
                        }, 0);
                        const card = document.getElementById("card"+id);
                        card.remove();
                        const totalElement = document.getElementById("total");
                        totalElement.textContent = `₹ ${finalPrice.toFixed(2)}`;
                    })
            })
    
    }