//Object Constructor
function bun(boxType, flavor, price, flavor1, flavor2, quantity, image) {
  this.flavor = flavor;
  this.flavor1 = flavor1;
  this.flavor2 = flavor2;
  this.image = image;
  this.boxType = boxType;
  this.price = price;
  this.quantity = quantity;
}

//Global Variables
var selectedBun;
var shoppingCart;

//Document Load
$(document).ready(function() {

//Display Flavor Selection in Product Detail Page & Update product photo
  $("#flavorSelection").hide();
  $("#total-price").hide();
  $("input[name = 'box-type']").click(function() {
    var boxSize = $(this).val();
    if (boxSize == "6-Pack") {
      $("#flavorSelection").show();
      $("#total-price").text("Total Price: " + calcTotalPrice());
      $("#total-price").show();
      document.getElementById("product-img").src = "resources/rolls6.png";
    }
    else if (boxSize == "12-Pack"){
      $("#flavorSelection").show();
      $("#total-price").text("Total Price: " + calcTotalPrice());
      $("#total-price").show();
      document.getElementById("product-img").src = "resources/rolls12.png";
    }
    else {
      $("#flavorSelection").hide();
      $("#total-price").hide();
    }
  });

//Update total price
$("#flavorSelector1").change(function() {
  $("#total-price").text("Total Price: $" + calcTotalPrice());
});

$("#flavorSelector2").change(function() {
  $("#total-price").text("Total Price: $" + calcTotalPrice());
});

$("#quantityInput").change(function() {
  $("#total-price").text("Total Price: $" + calcTotalPrice());
});

//Calculate Total Price
function calcTotalPrice() {
  var price1 = parseInt(parseInt($("#price-of-item").text()));
  var price2 = parseInt($("#flavorSelector1 option:selected").val());
  var price3 = parseInt($("#flavorSelector2 option:selected").val());
  var quan = $("#quantityInput").val();
  var boxQuan = parseInt($("input[name = 'box-type']:checked").val());
  var totalPrice;
  if (boxQuan == 1) {
    totalPrice = price1*quan;
  } else {
    totalPrice=(price1*boxQuan/3 + price2*boxQuan/3 + price3*boxQuan/3)* quan;
  }
  return totalPrice;
}

//Add to Cart & Update Bun Choices
shoppingCart = JSON.parse(localStorage.getItem("itemInCart"));
$("#add-to-bag").click(function() {
  if ($("input[name = 'box-type']:checked").val() == 1){
    alert("Choose a pack size!");
  }
  else {
    generateBun();
  }
//Push the selected bun into local storage
  if (shoppingCart == null) {
    shoppingCart = [];
  }
  shoppingCart.push(selectedBun);
  localStorage.setItem("itemInCart", JSON.stringify(shoppingCart));
  alert("Added to Bag!");
  location.reload();
  });

//Update the shopping cart icon
function updateIcon() {
  var num;
  if (shoppingCart == null || shoppingCart.length == 0) {
    num = 0;
    $("#cart-icon-num").hide();
  } else {
    num = shoppingCart.length;
    $("#cart-icon-num").show();
  }
  $("#cart-icon-num").text(num);
}

//Create Bun Object
function generateBun() {
  var boxSize = $("input[name = 'box-type']:checked").val();
  var flavor = $("#product-name").text();
  var flavor1 = $("#flavorSelector1 option:selected").text();
  var flavor2 = $("#flavorSelector2 option:selected").text();
  var price = calcTotalPrice();
  var quan = $("#quantityInput").val();
  var image;
  if (boxSize == "6-Pack") {
    image = "resources/rolls6.png";
  } else if (boxSize == "12-Pack") {
    image = "resources/rolls12.png";
  } else {
    image = "resources/original.jpg";
  }
  selectedBun = new bun(boxSize, flavor, price, flavor1, flavor2, quan, image);
  return selectedBun;
}

updateIcon();
console.log(shoppingCart);
});