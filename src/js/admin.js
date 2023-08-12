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
            const productQuantity = product.productQuantity;
            const avtar = product.avtar;
            const Id = product._id;
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
<button class="add-to-cart" id="${Id}" onclick="handleUpdate(this.id,'${productName}','${productDescription}','${productPrice}','${productQuantity}')" >Update</button>
<form id="${Id}" action="/deleteproduct?id=${Id}" method="POST">
<button type="submit" class="btn btn-success"  >
  Delete Item
</button>
</form>
</div>`
            main.appendChild(card);

        })
    })
    .catch(function (error) {
        console.log(error);
    }
    )
function handleUpdate(id, productName, productDescription, productPrice, productQuantity) {
    const pName = document.getElementById("product-name");
    const pPrice = document.getElementById("product-price");
    const pDescription = document.getElementById("product-description");
    const pQuantity = document.getElementById("product-quantity");
    pName.value = productName;
    pPrice.value = productPrice;
    pDescription.value = productDescription;
    pQuantity.value = productQuantity;
    document.getElementById("Addbtn").innerText = "Update";
    document.getElementById("form-update").action = `/updateProduct?id=${id}`;

}









const display = document.getElementById("main");
const crd = document.createElement("div");
const productName = document.getElementById("product-name");
const productPrice = document.getElementById("product-price");
const productDescription = document.getElementById("product-description");
const productImage = document.getElementById("product-image");
function updateProductDetails() {
    const cardTitle = crd.querySelector(".card__title");
    const cardSubtitle = crd.querySelector(".card__subtitle");
    const cardPrice = crd.querySelector(".card__price");
    const cardImage = crd.querySelector(".card-image");

    cardTitle.textContent = productName.value;
    cardSubtitle.textContent = productDescription.value;
    cardPrice.textContent = `₹ ${productPrice.value}`;
    cardImage.src = URL.createObjectURL(productImage.files[0]);

}
productName.addEventListener("input", updateProductDetails);
productDescription.addEventListener("input", updateProductDetails);
productPrice.addEventListener("input", updateProductDetails);
productImage.addEventListener("change", updateProductDetails);
crd.setAttribute("class", "card");
crd.innerHTML = `

      <div class="card__img">
        <img id="hello" src="${productImage.value}" draggable="false" alt="product image" class="card-image">
      </div>
      <div class="card__title">${productName.value}</div>
      <div class="card__subtitle" id="pdesc">${productDescription.value}</div>
      <div class="card__wrapper">
        <div class="card__price">₹ ${productPrice.value}</div>
      </div>
<div class="buttons">
<button type="submit" class="add-to-cart" id="cart">Add to Cart</button>
<button type="button" class="btn btn-success" id ="ko"  data-bs-toggle="modal" data-bs-target="#exampleModal">
  View Details
</button>
</div>`
display.appendChild(crd);


const btn = document.getElementById("Addbtn");

btn.addEventListener("click", function (e) {
    const productImage = document.getElementById("product-image");
    const alerts = document.getElementById("alerts");
    const allowedTypes = ["image/jpeg", "image/jpg", "image/png"];
    if (!allowedTypes.includes(productImage.files[0].type)) {
        e.preventDefault();
        alerts.innerText = "File type should be .jpeg, .jpg, or .png";
        alerts.style.color = "red";
    } else if (productImage.files[0].size < 5000 || productImage.files[0].size > 1000000) {
        e.preventDefault();
        alerts.innerText = "File size should be between 5 KB and 250 KB";
        alerts.style.color = "red";
    }
})