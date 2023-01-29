//changer style couleur et police de la page
const checkbox = document.getElementById('checkbox');
let togg1 = document.getElementById('a');
let togg2 = document.getElementById('b');



checkbox.addEventListener('change', ()=>{
  document.body.classList.toggle('white');
  document.body.classList.toggle('style2');
  


})
// fct pour prendre le prix total du panier
updateCartTotal();

//boutons eventListners
document.getElementById("emptycart").addEventListener("click", emptyCart);
var btns = document.getElementsByClassName('btn');
for (var i = 0; i < btns.length; i++) {
    btns[i].addEventListener('click', function() {addToCart(this);});
}
//fct pour ajouter au panier 

function addToCart(elem) {
    
    var sibs = [];
    var getprice;
    var getproductName;
    var cart = [];
     var stringCart;
    while(elem = elem.previousSibling) {
        if (elem.nodeType === 3) continue; 
        if(elem.className == "price"){
            getprice = elem.innerText;
        }
        if (elem.className == "productname") {
            getproductName = elem.innerText;
        }
        sibs.push(elem);
    }
    //product object
    var product = {
        productname : getproductName,
        price : getprice
    };
    var stringProduct = JSON.stringify(product);
    
    if(!sessionStorage.getItem('cart')){
        cart.push(stringProduct);
        stringCart = JSON.stringify(cart);
        sessionStorage.setItem('cart', stringCart);
        addedToCart(getproductName);
        updateCartTotal();
    }
    else {
       cart = JSON.parse(sessionStorage.getItem('cart'));
        cart.push(stringProduct);
        stringCart = JSON.stringify(cart);
        sessionStorage.setItem('cart', stringCart);
        addedToCart(getproductName);
        updateCartTotal();
    }
}
/* Calculer Total */
function updateCartTotal(){
    var total = 0;
    var price = 0;
    var items = 0;
    var productname = "";
    var carttable = "";
    if(sessionStorage.getItem('cart')) {
        var cart = JSON.parse(sessionStorage.getItem('cart'));
        items = cart.length;
        for (var i = 0; i < items; i++){
            var x = JSON.parse(cart[i]);
            price = parseFloat(x.price.split('$')[1]);
            productname = x.productname;
            carttable += "<tr><td>" + productname + "</td><td>$" + price.toFixed(2) + "</td></tr>";
            total += price;
        }
        
    }
    document.getElementById("total").innerHTML = total.toFixed(2);
    document.getElementById("carttable").innerHTML = carttable;
    document.getElementById("itemsquantity").innerHTML = items;
}

function addedToCart(pname) {
  var message = pname + " a été ajouté au panier avec succés";
  var alerts = document.getElementById("alerts");
  alert (message);
  alerts.innerHTML = message;
  if(!alerts.classList.contains("message")){
     alerts.classList.add("message");
  }
}

function emptyCart() {
    
    if(sessionStorage.getItem('cart')){
        sessionStorage.removeItem('cart');
        updateCartTotal();
      
      var alerts = document.getElementById("alerts");
      alerts.innerHTML = "";
      if(alerts.classList.contains("message")){
          alerts.classList.remove("message");
      }
    }
}


