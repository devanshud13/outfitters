// fetch("/data")
//     .then(function (response) {
//         return response.json();
//     }
//     )
//     .then(function (data) {
//         data.forEach(function (product) {
//             const productName = product.productName;
//             const productPrice = product.productPrice;
//             const productDescription = product.productDescription;
//             const avtar = product.avtar;
//             const Id = product.id;
//             const main = document.getElementById("main");
//             const card = document.createElement("div");
//             card.setAttribute("class", "card");
//             card.innerHTML = `
// <div class="card__img">
// <img src="/${avtar}" draggable="false" alt="product image" class="card-image">
// </div>
// <div class="card__title">${productName}</div>
// <div class="card__wrapper">
//         <div class="card__price">₹ ${productPrice}</div>
//         <div class="card__counter">
//             <button class="card__btn">-</button>
//             <div class="card__counter-score">1</div>
//             <button class="card__btn card__btn-plus">+</button>
//         </div>
//     </div> 
// <div class="buttons">
// <button class="add-to-cart">Add to Cart</button>
// <button type="button" class="btn btn-success" id = ${Id} onclick= "handleModal(this.id,'${product.productDescription}','${avtar}','${productName}','${productPrice}')" data-bs-toggle="modal" data-bs-target="#exampleModal">
//   View Details
// </button>



// <div class="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
// <div class="modal-dialog">
//   <div class="modal-content">
//     <div class="modal-header">
//       <h1 class="modal-title fs-5" id="exampleModalLabel">Product Description</h1>
//       <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
//     </div>
//     <div class="modal-body">




//     <div class="card__img">
// <img src="/${avtar}" draggable="false" alt="product image" id ="pimg" class="card-image">
// </div>
// <div class="card__title" id="pname" >${productName}</div>
// <div class="card__subtitle" id="pdesc">${productDescription}</div>
// <div class="card__wrapper">
//       <div class="card__price" id="pprice" > ${productPrice}</div>
//   </div> 




//     </div>
//   </div>
// </div>
// </div>



// </div>`
//             main.appendChild(card);

//         })
//     })
//     .catch(function (error) {
//         console.log(error);
//     }
//     )




let products = []; // store all products in an array

fetch("/data")
  .then(function (response) {
    return response.json();
  })
  .then(function (data) {
    products = data; // store all products in the array
    showProducts(0, 5); // show the first five products
  })
  .catch(function (error) {
    console.log(error);
  });

function showProducts(start, end) {
  const main = document.getElementById("main");
  if (end < products.length) {
    for (let i = start; i < end; i++) {
      const product = products[i];
      const productName = product.productName;
      const productPrice = product.productPrice;
      const productDescription = product.productDescription;
      const avtar = product.avtar;
      const Id = product._id;

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
<form action="/cart?id=${Id}" method="POST">
<button type="submit" class="add-to-cart" id="cart">Add to Cart</button>
</form>
<button type="button" class="btn btn-success" id = ${Id} onclick= "handleModal(this.id,'${product.productDescription}','${avtar}','${productName}','${productPrice}')" data-bs-toggle="modal" data-bs-target="#exampleModal">
  View Details
</button>



<div class="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
<div class="modal-dialog">
  <div class="modal-content">
    <div class="modal-header">
      <h1 class="modal-title fs-5" id="exampleModalLabel">Product Description</h1>
      <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
    </div>
    <div class="modal-body">
      



    <div class="card__img">
<img src="/${avtar}" draggable="false" alt="product image" id ="pimg" class="card-image">
</div>
<div class="card__title" id="pname" >${productName}</div>
<div class="card__subtitle" id="pdesc">${productDescription}</div>
<div class="card__wrapper">
      <div class="card__price" id="pprice" >₹ ${productPrice}</div>
  </div> 




    </div>
  </div>
</div>
</div>



</div>`
      main.appendChild(card);
    }
  }
  else {
    const temp = end - products.length;
    end = end - temp;
    for (let i = start; i < end; i++) {
      const product = products[i];
      const productName = product.productName;
      const productPrice = product.productPrice;
      const productDescription = product.productDescription;
      const avtar = product.avtar;
      const Id = product._id;

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
<form action="/cart?id=${Id}" method="POST">
<button type="submit" class="add-to-cart" id="cart">Add to Cart</button>
</form>

<button type="button" class="btn btn-success" id = ${Id} onclick= "handleModal(this.id,'${product.productDescription}','${avtar}','${productName}','${productPrice}')" data-bs-toggle="modal" data-bs-target="#exampleModal">
  View Details
</button>



<div class="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
<div class="modal-dialog">
  <div class="modal-content">
    <div class="modal-header">
      <h1 class="modal-title fs-5" id="exampleModalLabel">Product Description</h1>
      <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
    </div>
    <div class="modal-body">
      



    <div class="card__img">
<img src="/${avtar}" draggable="false" alt="product image" id ="pimg" class="card-image">
</div>
<div class="card__title" id="pname" >${productName}</div>
<div class="card__subtitle" id="pdesc">${productDescription}</div>
<div class="card__wrapper">
      <div class="card__price" id="pprice" >₹ ${productPrice}</div>
  </div> 




    </div>
  </div>
</div>
</div>



</div>`
      main.appendChild(card);
    }
  }
  // add a button to load more products
  loadmore(start, end);

}
function loadmore(start, end) {
  if (end < products.length) {
    const main = document.getElementById("main");
    const btn = document.createElement("button");
    btn.setAttribute("id", "loadmore");
    btn.addEventListener("click", function () {
      showProducts(end, end + 5);
      btn.remove();
    });
    btn.innerHTML = `<button id="btnlogout"> Load More</button>`
    btn.style.backgroundColor = "transparent";
    btn.style.border = "none";
    main.appendChild(btn);
  }
  else {
    document.getElementById("loadmore").style.backgroundColor = "red";
  }
}
function handleModal(id, productDescription, avtar, productName, productPrice) {
  const desc = document.getElementById("pdesc");
  const name = document.getElementById("pname");
  const price = document.getElementById("pprice");
  const av = document.getElementById("pimg");
  desc.innerText = productDescription;
  name.innerText = productName;
  price.innerText = "₹ " + productPrice;
  av.src = avtar;
}