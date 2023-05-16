

// ==================================================================================================
AOS.init();

$(document).ready(function(){

  // --- slick slider--------------------
  $('.autoplay').slick({
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 2000,
    arrows:false,
    dots:true
  });

});

// =========== navbar background =======================================================
let nav = document.querySelector("nav");
let up_btn = document.querySelector("#up-btn");
window.addEventListener("scroll", changeNavBg);

$('body' , 'html').animate({scrollTop : '0px'} , 3000);
// ------------------------
function changeNavBg() {
  let windowScroll = window.scrollY;
  if (windowScroll > 30) {
    nav.style.backgroundColor = "var(--container-color)";
    up_btn.style.display = "flex";
  } else {
    nav.style.backgroundColor = "transparent";
    up_btn.style.display = "none";
  }
  cart_sec.style.top = `${windowScroll + nav.offsetHeight}px`;
}

// ======= cart show / hidden =================================================

let shop_icon = document.querySelector("#shopping-icon>i");
let cart_sec = document.getElementById("cart");

shop_icon.addEventListener("click", openCart);

function openCart() {
  let windowScroll = window.scrollY;

  cart_sec.style.right = 0;
  cart_sec.style.top = `${windowScroll + nav.offsetHeight}px`;
}

let close_icon = document.querySelector("#close-icon>i");
close_icon.addEventListener("click", closeCart);
function closeCart() {
  let windowScroll = window.scrollY;

  cart_sec.style.right = "-100%";

  cart_sec.style.top = `${windowScroll + nav.offsetHeight}px`;
 
}


// =========== up btn ==============================================
up_btn.addEventListener("click", toUpPage);

function toUpPage() {
  if (scrollY > 50) {
    window.scrollTo({
      left: 0,
      top: 0,
      behavior: "smooth",
    });
  }
}

// ======== document ready function  ============================================

if (document.readyState == "loading") {
  document.addEventListener("DOMContentLoaded", ready);
} else {
  ready();
}

function ready() {
  getProduct();
  productSection();
  change_icon();
  updateCart();
  calc_total_count();
  calc_total_price();
  displayNewProducts();
}
// ======= at start check  ======================================
let cart = localStorage.watchProducts? JSON.parse(localStorage.getItem("watchProducts")) : [];
let products_container = document.querySelector(".featured-content");
let cart_container = document.getElementById("cart-container");
let cart_icon = document.getElementById("cart-count");
let delete_all_btn = document.getElementById("delete-all-btn");
let total_count_elem = document.getElementById("total-cont");
let total_price_elem = document.getElementById("total-price");
let total_cart_price;

let productData = [
  {
    id: "JAZZMASTER",
    name: "JAZZMASTER",
    price: "1050",
    img: "img/featured1.png",
  },
  {
    id: "Ingersoll",
    name: "Ingersoll",
    price: "850",
    img: "img/featured2.png",
  },
  {
    id: "blackIngo",
    name: "black ingo",
    price: "2000",
    img: "img/featured3.png",
  },
  {
    id: "dreyfussgold",
    name: "Dreyfuss gold",
    price: "1250",
    img: "img/featured1.png",
  },
];
console.log(cart , 'cart at first');
cart.length===0 ? document.getElementById("cart").style.height = "30vh":document.getElementById("cart").style.height = "75vh";

// ===== featured-content ===================================
function getProduct() {
  return (products_container.innerHTML = productData.map((value) => {
      let { name, price, img, id } = value;

      let search = cart.find((prod) => prod.id === id);
      return `<div class="product-box " id='product-${id}'>
          <div>
          <span class="sale-flag">SALE</span>
          <div>
              <img src=${img} alt="">
          </div>

          <h6 class="product-name">${name}</h6>
          <span class="price">$ ${price}</span>

          <div class="add-to-cart">
          <div class="count-icons">
           <i onclick='increment(${id})' class='bx bx-plus cart-add'></i>
           <small id='${id}' class='cart-amount'>${search === undefined ? 0 : search.count}</small> 
           <i onclick="decrement(${id})" class='bx bx-minus cart-remove'></i>
          </div>
          </div>
          </div>

  </div>  `; }).join(""));

    
}

// // =============== increment ==================================
function increment(id) {
  let selectedProduct = id;
  console.log(id , 'search incree');

  let search = cart.find((x) => x.id === selectedProduct.id);

console.log(search ,'search incree');

  if (search === undefined) {
    cart.push({
      id: selectedProduct.id,
      count: 1
    });
  } else {
    search.count += 1;
  }

  change_icon();
  updateCount(selectedProduct.id);
  localStorage.setItem("watchProducts", JSON.stringify(cart));

  updateCart();
  calc_total_count();
  calc_total_price();
  document.getElementById("cart").style.height = "75vh";
}

// // // ========= decrement ===============================
function decrement(id) {
  let selectedProduct = id;
  // console.log(id , 'search dec ');
  let search = cart.find((x) => x.id === selectedProduct.id);

  if (search === undefined || search.count === 0) {
    return;
  } else if (search != undefined && search.count >= 1) {
    search.count -= 1;
  }

  updateCount(selectedProduct.id);

  cart = cart.filter((prod) => prod.count != 0);

  change_icon();
  localStorage.setItem("watchProducts", JSON.stringify(cart));
  updateCart();
  calc_total_count();
  calc_total_price();
cart.length===0 ? document.getElementById("cart").style.height = "30vh":document.getElementById("cart").style.height = "75vh";
  
}

// // ======== update count on product  ====================================
function updateCount(id) {
  let search = cart.find((prod) => prod.id === id);
  document.getElementById(id).innerHTML = search.count;
}

// // ========= change total amount of products on cart icon ======================================
function change_icon() {
  cart_icon.style.display = "block";
  cart_icon.innerHTML = cart.map((prod) => prod.count).reduce((x, y) => x + y, 0);
  if (cart_icon.innerHTML == 0) {
    cart_icon.style.display = "none";
  }
  cart.length === 0? (delete_all_btn.style.display = "none"): (delete_all_btn.style.display = "block");
}

// // ========= cart container =====================================

function updateCart() {
  if(cart.length != 0){

  return (cart_container.innerHTML = cart.map((prod) => {
    let { id, count } = prod;

    let search=[] ;
     productData.find((prodList) =>{
      if(prodList.id === id){
        search=prodList;
      }
     } );
     oldProducts.map(prod=>{
      if(prod.id ===id){
      search=prod
      }});
     newProducts.map(prod=>{
      if(prod.id ===id){
      search=prod
      }});

    return `<div class="item" >
    <div class="cart-img">
    <img src='${search.img}' alt="">
     </div>
  
   <div class='product-details'>

      <div>
      <h6 class="product-name">${search.name}</h6> <span class="price">$ ${search.price}</span>
      </div>
      
      <div>
      <span class="price">$ ${search.price * count}</span>
    
      <div class="count-icons">
      <i onclick='increment(${id})' class='bx bx-plus cart-add'></i>
      <small class='cart-amount'>${count}</small>
      <i onclick='decrement(${id})' class='bx bx-minus cart-remove'></i>
      </div>
     
      </div>

   </div>
   <div onclick='deleteProd(${id})' id="delete-icon">
     <i class='bx bx-trash-alt'></i>
  </div>
  </div>`;
  }).join(''));
}else{
  return cart_container.innerHTML=``;
}

}

// ======== delete-all-btn =================================

delete_all_btn.addEventListener("click", delete_all);

function delete_all() {
  localStorage.removeItem('watchProducts');
  cart = [];
  updateCart();
  calc_total_count();
  calc_total_price();
  change_icon();
  getProduct();
  document.getElementById("cart").style.height = "30vh";
  cart.length === 0? (delete_all_btn.style.display = "none"): (delete_all_btn.style.display = "block");
}

// ============ delete current Product =================================
function deleteProd(id) {
  let selectedProduct = id;
  let search = cart.find((prod) => prod.id === selectedProduct.id);

  cart.map((prod) => {
    if (prod.id === search.id) {
      cart.splice(cart.indexOf(search), 1);
      localStorage.setItem("watchProducts", JSON.stringify(cart));
      updateCart();
      cart.length === 0
        ? (delete_all_btn.style.display = "none")
        : (delete_all_btn.style.display = "block");

      calc_total_price();
      calc_total_count();
      updateCart();
      getProduct();
    }
  });
cart.length===0 ? document.getElementById("cart").style.height = "30vh":document.getElementById("cart").style.height = "75vh";

}
// ==== total count  ============================================
function calc_total_count() {
  let total_count = cart.map((prod) => prod.count).reduce((x, y) => x + y, 0);
  cart.length === 0
    ? (total_count_elem.innerHTML = "0 Items")
    : (total_count_elem.innerHTML = `${total_count} Items`);
}

// ========== total price =====================================
function calc_total_price() {
  let total = 0;
  productData.map((prod) => {
    cart.map((x) => {
      if (prod.id === x.id) {
        total += x.count * prod.price;
      }
    });
  });

  oldProducts.map( (prod)=>{
    cart.map((x)=>{
if(prod.id=== x.id){
  total += x.count * prod.price;
}
    })
  })

  total === 0 ?  total_price_elem.innerHTML = "$ 0" : total_price_elem.innerHTML = `$ ${total}`;
  change_icon();
}

// ==== display old products ====================================
let products_content = document.getElementById('products-content');
let oldProducts=[
  {
    id: "SpritRose",
    name: "SPIRIT ROSE",
    price: "1000",
    img: "img/product1.png",
  },
  {
    id: "KhakiPilot",
    name: "Khaki pilot",
    price: "1300",
    img: "img/product2.png",
  }
  ,
  {
    id: "JubileeBlack",
    name: "Jubilee black",
    price: "2500",
    img: "img/product3.png",
  },
  {
    id: "FosilMe3",
    name: "Fosil me3",
    price: "1700",
    img: "img/product4.png",
  },{
    id: "Duchen",
    name: "Duchen",
    price: "2100",
    img: "img/product5.png",
  },{
    id: "Longines",
    name: "Longines",
    price: "1950",
    img: "img/product1.png",
  }
];

function productSection(){
return (products_content.innerHTML = oldProducts.map(product=>{
  
  let {id , name , price , img} = product;
  return`
  <div class="product-box" data-aos="flip-left"
  data-aos-easing="ease-out-cubic"
  data-aos-duration="2000">
                    <div class="products-img">
                        <img src="${img}" alt="">
                    </div>
                    <h6 class="product-name">${name}</h6>
                    <span class="price">$ ${price}</span>
                    <div class="product-icon add-to-cart" onclick="addToCart(${id})"}>
                    <i class='bx bx-cart-add' id=${id}  ></i>
                    </div>
                </div>`;}).join('')
)
};

// ====== addToCart ===================================
function addToCart(id){
  let selectedProduct = id;

let search = cart.find(x=> x.id == selectedProduct.id);

if( search == undefined){
  cart.push({
    id:selectedProduct.id,
    count:1
  })
}
localStorage.setItem('watchProducts' , JSON.stringify(cart));
updateCart();

change_icon();
  calc_total_count();
  calc_total_price();
  document.getElementById("cart").style.height = "75vh";
}

// ======= display new products ========================================
let newProduct_contanier = document.getElementsByClassName('new-container');
let newProducts=[
  {
    id: "LonginesRose",
    name: "Longines rose",
    price: "980",
    img: "img/new1.png"
  },
  {
    id: "RaymondWeil",
    name: "Raymond weil",
    price: "760",
    img: "img/new2.png"
  },
  {
    id: "RoundAnalog",
    name: "Round Analog",
    price: "1100",
    img: "img/new3.png"
  },
  {
    id: "Analogue",
    name: "Analogue",
    price: "880",
    img: "img/new4.png"
  }


];

function displayNewProducts(){
return (newProduct_contanier[0].innerHTML= newProducts.map(prod=>{
let {id , name , price , img} = prod;
    return `<div class="product-box" id=${id}>
                        <div class="new-flag">new</div>
                         <div class="new-img">
                            <img src='${img}' alt="">
                        </div>
                        <h6 class="product-name">${name}</h6>
                        <span class="price">$ ${price}</span>
                        <button onclick='addToCart(${id})'>ADD TO CART</button>
                    </div>`;
                  }).join('')
)};

