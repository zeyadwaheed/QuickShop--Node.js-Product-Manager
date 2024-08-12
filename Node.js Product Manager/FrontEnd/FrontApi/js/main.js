let productList = [];
let currId;
let product_name, product_price, product_desc;

fetchData();

function displayData() {
    let holder = '';
    productList.forEach(product => {
        holder += `
        <tr>
            <td>${product.name}</td>
            <td>${product.price}</td>
            <td>${product.description}</td>
            <td>
                <button class="btn btn-danger" onclick="deleteAPI(${product.id})">Delete</button>
                <button class="btn btn-warning" onclick="getToUpdate(${product.id})">Update</button>
            </td>
        </tr>`;
    });
    document.getElementById("tbody").innerHTML = holder;
}

// generic API fetch function
function fetchAPI(method, endPoint, data) {
    fetch(`http://localhost:3000/${endPoint}`, {
        // Adding method type
        method,
        // Adding body or contents to send
        body: JSON.stringify(data),
        // Adding headers to the request
        headers: {
            "Content-type": "application/json"
        }
    })
    .then(response => response.json())
    // Displaying results to console
    .then(res => {
        if (res.message === "success") {
            fetchData();
        }
    })
    .catch(error => console.error('Error:', error));
}

// get API
function fetchData() {
    fetch("http://localhost:3000/")
    .then(response => response.json())
    .then(res => {
        if (res.message === "success") {
            productList = res.data;
            displayData();
        }
    })
    .catch(error => console.error('Error:', error));
}

// add API
function addProduct() {
    getData();
    const productObj = {
        name: product_name,
        description: product_desc,
        price: product_price
    };
    console.log("Product Object:", productObj);
    fetchAPI("POST", "addProduct", productObj);
    clearFields();
}

// delete API
function deleteAPI(id) {
    fetchAPI("DELETE", "deleteProduct", { id: id });
}

// update API
function getToUpdate(id) {
    currId = id;
    const currItem = productList.find(ele => ele.id === id);
    document.getElementById("productName").value = currItem.name;
    document.getElementById("productPrice").value = currItem.price;
    document.getElementById("productDesc").value = currItem.description;
    document.getElementById("add").classList.add("d-none");
    document.getElementById("update").classList.add("d-block");
}

function updateAPI() {
    getData();
    const productObj = {
        name: product_name,
        description: product_desc,
        price: product_price,
        id: currId
    };
    fetchAPI("PUT", "updateProduct", productObj);
    clearFields();
}

// utility functions
function clearFields() {
    document.getElementById("productName").value = "";
    document.getElementById("productPrice").value = "";
    document.getElementById("productDesc").value = "";
    document.getElementById("add").classList.remove("d-none");
    document.getElementById("update").classList.remove("d-block");
}

function getData() {
    product_name = document.getElementById("productName").value;
    product_price = document.getElementById("productPrice").value;
    product_desc = document.getElementById("productDesc").value;
}