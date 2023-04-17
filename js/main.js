var productNameInput = document.getElementById("productName");
var productPriceInput = document.getElementById("productPrice");
var productCateoryInput = document.getElementById("productCateory");
var productDiscInput = document.getElementById("productDisc");
var productsContainer = [];
if (localStorage.getItem("ourProducts") != null) {
  productsContainer = JSON.parse(localStorage.getItem("ourProducts"));
  displayProduct();
}

function addProduct() {
  if (validateProductName() == true) {
    var product = {
      name: productNameInput.value,
      price: productPriceInput.value,
      category: productCateoryInput.value,
      desc: productDiscInput.value,
    };
    productsContainer.push(product);
    localStorage.setItem("ourProducts", JSON.stringify(productsContainer));
    clearForm();
    displayProduct();
  }
}

function clearForm() {
  productNameInput.value = "";
  productPriceInput.value = "";
  productCateoryInput.value = "";
  productDiscInput.value = "";
}

function deleteProduct(index) {
  productsContainer.splice(index, 1);
  localStorage.setItem("ourProducts", JSON.stringify(productsContainer));
  displayProduct();
}
function displayProduct() {
  var cartona = ``;
  for (var i = 0; i < productsContainer.length; i++) {
    cartona += `   <tr>
        <td>${i}</td>
        <td>${productsContainer[i].name}</td>
        <td>${productsContainer[i].price}</td>
        <td>${productsContainer[i].category}</td>
        <td>${productsContainer[i].desc}</td>
        <td><button class="btn btn-outline-info" onclick = 'updateProduct(${i})'>Update</button></td>
        <td><button class="btn btn-outline-danger"  
        onclick = 'deleteProduct(${i})'>Delete</button></td>
    </tr>`;
  }

  document.getElementById("tableBody").innerHTML = cartona;
}

function searchProduct(term) {
  var cartona = ``;
  for (var i = 0; i < productsContainer.length; i++) {
    if (
      productsContainer[i].name.toLowerCase().includes(term.toLowerCase()) ==
      true
    ) {
      cartona += `   <tr>
        <td>${i}</td>
        <td>${productsContainer[i].name}</td>
        <td>${productsContainer[i].price}</td>
        <td>${productsContainer[i].category}</td>
        <td>${productsContainer[i].desc}</td>
        <td><button class="btn btn-outline-info" onclick = 'updateProduct(${i})'>Update</button></td>
        <td><button class="btn btn-outline-danger"  
        onclick = 'deleteProduct(${i})'>Delete</button></td>
    </tr>`;
    }
  }

  document.getElementById("tableBody").innerHTML = cartona;
}

function updateProduct(prd) {
  productNameInput.value = productsContainer[prd].name;
  productPriceInput.value = productsContainer[prd].price;
  productCateoryInput.value = productsContainer[prd].category;
  productDiscInput.value = productsContainer[prd].desc;
  document.getElementById("addProduct").innerHTML = "Update";

  productsContainer.splice(prd, 1);
  localStorage.setItem("ourProducts", JSON.stringify(productsContainer));
  displayProduct();
}

function validateProductName() {
  var regex = /^[A_Z][a-z]{2,5}$/;
  if (regex.test(productNameInput.value) == true) {
    return true;
  } else {
    return false;
  }
}
