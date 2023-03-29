let title = document.getElementById("title");
let price = document.getElementById("price");
let taxes = document.getElementById("taxes");
let ads = document.getElementById("ads");
let discount = document.getElementById("discount");
let total = document.getElementById("total");
let count = document.getElementById("count");
let category = document.getElementById("category");
let submit = document.getElementById("submit");
let mood = "create";
let tmp;

/* -------------------------------- Get Total ------------------------------- */
function getTotal() {
  if (price.value != "") {
    let result = +price.value + +taxes.value + +ads.value - +discount.value;
    total.innerHTML = result;
    total.style.background = "#633ad4";
  } else {
    total.innerHTML = "";
    total.style.background = "#0a49f6";
  }
}
/* ------------------------------- Clear Input ------------------------------ */
function clearInputs() {
  title.value = "";
  price.value = "";
  taxes.value = "";
  ads.value = "";
  discount.value = "";
  count.value = "";
  total.innerHTML = "";
  category.value = "";
}
/* ---------------------------- localStorage Test --------------------------- */
var productsList;
if (localStorage.getItem("products") == null) {
  //new user
  productsList = [];
} else {
  //lw fe data fe localstorage w 3wzen n3rdha
  productsList = JSON.parse(localStorage.getItem("products"));
  showData(productsList);
}
/* ---------------------------------- START CRUDS --------------------------------- */
/* ---------------------------------- Creat --------------------------------- */
submit.onclick = function () {
  var products = {
    title: title.value,
    price: price.value,
    taxes: taxes.value,
    ads: ads.value,
    discount: discount.value,
    total: total.innerHTML,
    category: category.value,
    count: count.value,
  };
  if (
    title.value != "" &&
    price.value != "" &&
    category.value != "" &&
    products.count < 100
  ) {
    if (mood === "create") {
      if (products.count > 1) {
        for (let i = 0; i < products.count; i++) {
          productsList.push(products);
        }
      } else {
        productsList.push(products);
      }
    } else {
      productsList[tmp] = products;
      mood = "create";
      submit.innerHTML = "Create";
      count.style.display = "block";
    }
    clearInputs();
  }
  showData(productsList);
  localStorage.setItem("products", JSON.stringify(productsList));
  getTotal();
};
/* ---------------------------------- Read ---------------------------------- */
function showData(productsContainer) {
  var table = ``;
  for (var i = 0; i < productsContainer.length; i++) {
    table += `<tr>
        <td>${i + 1}</td>
        <td>${productsContainer[i].title}</td>
        <td>${productsContainer[i].price}</td>
        <td>${productsContainer[i].taxes}</td>
        <td>${productsContainer[i].ads}</td>
        <td>${productsContainer[i].discount}</td>
        <td>${productsContainer[i].total}</td>
        <td>${productsContainer[i].category}</td>
        <td><button class="update" onclick="upadteProduct(${i})">Update</button></td>
        <td><button class="delete" onclick="deleteElement(${i})">Delete</button></td>
        </tr>`;
  }
  document.getElementById("tbody").innerHTML = table;
  // Delete All
  var deleteall = document.getElementById("deleteAll");
  if (productsList.length > 0) {
    deleteall.innerHTML = `<button onclick="deleteAll()">Delete All (${productsList.length})</button>`;
  } else {
    deleteall.innerHTML = ``;
  }
}
/* --------------------------------- Update --------------------------------- */
function upadteProduct(productIndex) {
  title.value = productsList[productIndex].title;
  price.value = productsList[productIndex].price;
  taxes.value = productsList[productIndex].taxes;
  ads.value = productsList[productIndex].ads;
  discount.value = productsList[productIndex].discount;
  category.value = productsList[productIndex].category;
  title.value = productsList[productIndex].title;
  submit.innerHTML = "Update";
  count.style.display = "none";
  mood = "update";
  tmp = productIndex;
  scroll({
    top: 0,
    behavior: "smooth",
  });
  getTotal();
}
/* --------------------------------- Delete --------------------------------- */
function deleteElement(productIndex) {
  productsList.splice(productIndex, 1);
  //new list in localstorage -update-
  localStorage.setItem("products", JSON.stringify(productsList));
  showData(productsList);
}
// Delete All
function deleteAll() {
  productsList.splice(0);
  localStorage.clear();
  showData(productsList);
}
/* --------------------------------- Search --------------------------------- */
function searchProducts(letter) {
  var searchProducts = [];
  for (var i = 0; i < productsList.length; i++) {
    if (
      productsList[i].title.toLowerCase().includes(letter.toLowerCase()) == true
    ) {
      searchProducts.push(productsList[i]);
    }
  }
  showData(searchProducts);
}
