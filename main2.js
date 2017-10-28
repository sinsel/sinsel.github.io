//Global Variables
var shoppingCart;

//Document Load
$(document).ready(function() {
//Read elements from local storage
shoppingCart = JSON.parse(localStorage.getItem("itemInCart"));
//Update shopping cart page
displayTable();
updateShoppingCartTable();
updateIcon();

$(".remove-button").click(function(){
  console.log(shoppingCart);
  var arrayPosition = $(this).attr("id");
  console.log(arrayPosition);
  shoppingCart.splice(arrayPosition, 1);
  localStorage.setItem("itemInCart", JSON.stringify(shoppingCart));
  location.reload();
});

});

//Toggle between no items in cart vs items in cart views
function displayTable() {
  if (shoppingCart == null || shoppingCart.length == 0) {
    $("#empty-cart-message").show();
    $("#shopping-cart-content").hide();
    $("#checkout-button").hide();
    $("#checkout-button2").hide();
  } else {
    $("#empty-cart-message").hide();
    $("#shopping-cart-content").show();
    $("#checkout-button").show();
    $("#checkout-button2").show();
  }
};

//update Shopping Cart Table
function updateShoppingCartTable() {

//Pull Data From Local Storage for each item
  for (var i = 0 ; i < shoppingCart.length; i++) {
    var item1 = shoppingCart[i].flavor;
    var item2;
    var item3;
    var details = shoppingCart[i].boxType;
    var quan = shoppingCart[i].quantity;
    var price = shoppingCart[i].price;
    var imgLink = shoppingCart[i].image;
    var img = document.createElement("img");
    img.src = imgLink;
    img.className = "sc-image";
    var removeButton = document.createElement("button");
    removeButton.innerHTML = "X";
    removeButton.className = "remove-button";
    removeButton.id = i;
    var cartTable = $("#shopping-cart-content")[0];

    if (shoppingCart[i].flavor1 == "Please select flavor" || details == "1-Pack") {
      item2 = " ";
    } else {item2 = shoppingCart[i].flavor1;}
    if (shoppingCart[i].flavor2 == "Please select flavor" || details == "1-Pack") {
      item3 = " ";
    } else {item3 = shoppingCart[i].flavor2;}

//Populate Shopping Cart Table
    var tblBody = document.createElement("tbody");
    var tr = document.createElement("tr");
    var td1 = document.createElement("td");
    var td2 = document.createElement("td");
    var td3 = document.createElement("td");
    var td4 = document.createElement("td");
    var td5 = document.createElement("td");
    var td6 = document.createElement("td");

    td1.append(img);
    td2.append(item1 + "\n" + item2 + "\n"+ item3);
    td3.append(details);
    td4.append(quan);
    td5.append(price);
    td6.append(removeButton);
    tr.append(td1, td2, td3, td4, td5, td6);
    tblBody.appendChild(tr);
    cartTable.appendChild(tblBody);
  }
 }

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




