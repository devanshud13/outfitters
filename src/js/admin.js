fetch("/data")
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
            const Id = product.id;
            const main = document.getElementById("display");
            const card = document.createElement("div");
            card.setAttribute("class", "card");
            card.innerHTML = `
<div class="card__img">
<img src="/${avtar}" draggable="false" alt="product image" class="card-image">
</div>
<div class="card__title">${productName}</div>
<div class="card__wrapper">
        <div class="card__price">₹ ${productPrice}</div>
    </div> 
<div class="buttons">
<button class="add-to-cart">Update</button>
<button type="button" class="btn btn-success" id = ${Id} onclick= "handleModal(this.id,'${product.productDescription}','${avtar}','${productName}','${productPrice}')" data-bs-toggle="modal" data-bs-target="#exampleModal">
  Delete Item
</button>
</div>`
            main.appendChild(card);

        })
    })
    .catch(function (error) {
        console.log(error);
    }
    )