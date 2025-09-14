// Header functionality

const getId = (id) => document.getElementById(id);

function menuFunction() {
  const toggleMenu = getId("toggleMenu");
  toggleMenu.classList.toggle("flex");
  toggleMenu.classList.toggle("hidden");
}




// Categories functions

const loadAllCategory = () => {
  const url = "https://openapi.programming-hero.com/api/categories";
  fetch(url)
    .then((res) => res.json())
    .then((data) => showCategory(data.categories));
};

const showCategory = datas => {

  const categoryDiv = document.querySelectorAll(".categoryDiv");

  for (const div of categoryDiv) {
    
    div.innerHTML = `<span onclick="loadAllProducts(this)" class="text-lg border border-green-300 hover:bg-green-800 hover:text-white px-3 py-1 rounded-sm block cursor-pointer active">All Trees</span>`;
  
    datas.forEach((data) => {
      div.innerHTML += `<span onclick="loadCategoryProduct('${data.category_name}',this)" class="text-lg border border-green-300 hover:bg-green-800 hover:text-white px-3 py-1 rounded-sm block cursor-pointer">${data.category_name}</span>`;
    });

  }

};

loadAllCategory();



// Loading animation functions

const loadingFun = status => {
  if(status === true){
    getId("productsDiv").innerHTML = `
    <div class="col-span-full text-center p-10">
            <span class="text-2xl">Loading<span class="loading loading-dots loading-xl"></span></span>
          </div>
    `;
  }
}



// Products functions

let allProducts = [];

const loadAllProducts = (e = "") => {
  loadingFun(true);
  const url = "https://openapi.programming-hero.com/api/plants";
  fetch(url)
    .then((res) => res.json())
    .then((datas) => {
      allProducts = datas.plants;
      showProducts(allProducts);
    });

  if (e.tagName == "SPAN") {
    const elements = e.parentNode.children;

    for (const element of elements) {
      element.classList.remove("active");
    }

    e.classList.add("active");
  }  
};

const showProducts = datas => {
  loadingFun(false);

  const productsDiv = getId("productsDiv");
  productsDiv.innerHTML = "";
  
  datas.forEach((data) => {
    productsDiv.innerHTML += `
    <div class="bg-white p-2 rounded-lg grid gap-2">
    <div class="">
    <img loading="lazy" class="rounded-lg h-56 w-full object-cover object-center"
    src="${data.image}"
    alt=""
    />
    </div>  
    <div class="flex flex-col gap-3">
              <h2 onclick="showProductDetails(${data.id})" class="font-semibold text-base cursor-pointer">${data.name}</h2>
              <p class="text-sm line-clamp-3">${data.description}</p>
              <div class="flex justify-between items-center">
              <span class="bg-green-200 text-green-950 px-3 py-1 rounded-3xl"
                  >${data.category}</span
                  >
                  <span
                  ><i class="fa-solid fa-bangladeshi-taka-sign text-sm"></i
                  >${data.price}</span
                  >
              </div>
              <button onclick="addToCart(${data.id})" class="btn bg-green-700 hover:bg-green-800 rounded-4xl border-none py-1">
                Add to Cart
                </button>
            </div>
            </div>
    `;
  });
};

loadAllProducts();




// Products by categories

const loadCategoryProduct = (catName, e) => {
  loadingFun(true);

  let category_name = catName.replace(" ", "").toLowerCase();

  let plants = allProducts.filter(product => product.category.replace(" ", "").toLowerCase() == category_name);
  
  showProducts(plants);

  const elements = e.parentNode.children;

  for (const element of elements) {
    element.classList.remove("active");
  }

  e.classList.add("active");
};





// Products details

const showProductDetails = id => {

  let plant = allProducts.find(plant=> plant.id == id)

  const productDetails = getId("productDetails");

  productDetails.innerHTML = `
        <h3 class="text-lg font-bold">${plant.name}</h3>
        <img class="rounded-lg h-60 md:h-80 w-full object-cover object-center"
              src="${plant.image}"
              alt=""
            />
        <h3 class="text-base font-medium">Category: <span class="text-sm font-normal">${plant.category}</span></h3>
        <h3 class="text-base font-medium">Price: <span class="text-sm font-normal"><i class="fa-solid fa-bangladeshi-taka-sign text-sm"></i><span>${plant.price}</span></span></h3>
        <h3 class="text-base font-medium">Description: <span class="text-sm font-normal">${plant.description}</span></h3>
        `
        
  getId("my_modal_5").showModal()

}





// Showing small cart

function showSmallCart() {
  getId("smallCartSec").classList.toggle("hidden");
}


let cart = JSON.parse(localStorage.getItem("cart")) || [];


// Products cart count

const cartCountFun = () => {
  const cartCount = getId("cartCount");
  cartCount.innerText = cart.length
}


// Products add to cart

const addToCart = id => {
  let plant = allProducts.find(plant=> plant.id == id);
  cart.push(plant);
  localStorage.setItem("cart", JSON.stringify(cart));
  showCart();
  alert(`${plant.name} has been added to the cart.`);
}


// Products showing in cart
const showCart = () => {
  let totalPrice = 0;

  const cartDivs = document.querySelectorAll(".cartDiv");
  const totalPriceSpan = document.querySelectorAll(".totalPrice");

  cartDivs.forEach(cartDiv => {

    cartDiv.innerHTML = "";

    cart.forEach((plant) => {
      

      cartDiv.innerHTML += `
    <div class="flex justify-between items-center bg-green-200 p-2">
          <div class="">
            <h2 class="text-lg font-medium">${plant.name}</h2>
            <span class="text-gray-500 text-base"
              ><i class="fa-solid fa-bangladeshi-taka-sign"></i>${plant.price}</span
            >
          </div>
          <i onclick="removeFromCart(${plant.id})" class="fa-solid fa-xmark text-gray-500 text-sm cursor-pointer"></i>
        </div>
    `
    })
    
  })

  cart.forEach(item => totalPrice += item.price)

  totalPriceSpan.forEach(span => span.innerHTML = totalPrice)

  cartCountFun();

}

showCart()


// Products remove from cart

const removeFromCart = id => {
  let index = cart.findIndex(item=>item.id == id)
  cart.splice(index,1)
  localStorage.setItem("cart", JSON.stringify(cart));
  showCart();
}