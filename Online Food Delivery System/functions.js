let foodarray = [];
let cart = [];
let pricearray = [];
function login()
{
    if (document.getElementById("emailtxt").value == "" || document.getElementById("pastxt").value =="" || document.getElementById("pastxt").value == " ")
    {
        alert("Please enter Username or Password")
    }
    else
    {
    var email = document.getElementById("emailtxt").value;
    var pass = document.getElementById("pastxt").value;
    var savedEmail = localStorage.getItem("email");
    var savedpassword = localStorage.getItem("password");
    document.getElementsByClassName("error")[0].innerHTML = "";
    if(email !== savedEmail || pass !== savedpassword)
    {
        var newtag = document.createElement("h6")
        var content = document.createTextNode("Invalid Email or Password! Please register if you are a new user.")
        newtag.appendChild(content)
        document.getElementsByClassName("error")[0].appendChild(newtag);
    }
    else{
    setTimeout(function () {alert("Login Successful!");}, 10);
    window.location.href = "index.html";
    }
    }
}

function redirect()
{
    window.location.href = "register.html";
}

function Register()
{
    var email = document.getElementById("emailid").value;
    var password = document.getElementById("pasword").value;
    var firstname = document.getElementById("fname").value;
    var address = document.getElementById("add").value;
    if (email == "" || password == "" || firstname == "" || address == "")
    {
        alert("First Name, Email ID, Password and Address are mandatory fields. Please fill them to register successfully!")
    }
    else
    {
    localStorage.setItem("email", email);
    localStorage.setItem("password", password);
    localStorage.setItem("firstname", firstname);
    alert("Registration Successful!")
    window.location.href = "homepage.html";
    }
}

function fooddetails()
{
    var firstname = localStorage.getItem("firstname");
    if (firstname) 
    {
        var h1 = document.querySelector(".heading h1");
        if (h1) 
        {
            h1.innerText = "Thank you for logging in " + firstname+"!";
        }
    }
    loadfooddetails();
}

function loadfooddetails()
{
    fetch("https://dummyjson.com/recipes").then(result=>result.json())
    .then(result=>{
        let foodinfo = result.recipes;
        foodarray = foodinfo;
        console.log(foodinfo);
        let output = "";
        for(let i=0; i<foodarray.length; i++)
        {
            let foodname = foodarray[i].name;
            let info = document.createElement("div")
            info.setAttribute("class", "fd")
            info.innerHTML = 
            `
            <img src=${foodarray[i].image} width="100px" height="100px">
            <div class="name-block"><b>${foodarray[i].name}</b></div>
            <div class="meal-type">Meal Type: ${foodarray[i].mealType}</div>
            <div class="servings">Cuisine: ${foodarray[i].cuisine}</div>
            <div class="price">Price: Rs.${foodarray[i].reviewCount}</div>
            <button class="btn btn-outline-dark btn-sm" data-foodname="${foodname}" data-price="${foodarray[i].reviewCount}" onclick="buttonchange(this)">Add to Cart</button>
            `
            // document.body.appendChild(info);
            document.querySelector(".food-container").appendChild(info);
        }
    })
}

function buttonchange(buttonElement)
{
    let foodname = buttonElement.getAttribute("data-foodname");
    let price = buttonElement.getAttribute("data-price");
    if(buttonElement.innerText === "Add to Cart")
    {
        buttonElement.innerText = "Added to Cart";
        buttonElement.classList.remove("btn-outline-dark");
        buttonElement.classList.add("btn", "btn-warning", "btn-sm");
        addtocart(foodname, price);
    }
    else
    {
        buttonElement.innerText = "Add to Cart";
        buttonElement.classList.remove("btn-warning");
        buttonElement.classList.add("btn", "btn-outline-dark", "btn-sm");
        removefromcart(foodname, price);
    }
}

var x=0;
function addtocart(foodname, price)
{
    console.log("Items added to cart", foodname);
    x = x+1;
    console.log("Items added to cart", x);
    cart.push(foodname);
    pricearray.push(price);
    console.log("Item" +cart+"Price"+price);
    document.getElementById("cartcount").innerText = x;
}

function removefromcart(foodname, price)
{
    cart.pop(foodname);
    pricearray.pop(price)
    console.log("Item" +cart+"Price"+price)
    x=x-1;
    console.log("Items added to cart", x);
    document.getElementById("cartcount").innerText = x;
}

function cartpage()
{
    if (x==0)
    {
        alert("Please add item to cart")
    }
    else
    {
        localStorage.setItem("carts", JSON.stringify(cart));
        localStorage.setItem("prices", JSON.stringify(pricearray));
        window.location.href = "cartpage.html";
    }
}

function test()
{
    let carts = JSON.parse(localStorage.getItem("carts"));
    let prices = JSON.parse(localStorage.getItem("prices"));
    let items = carts.length;
    // let total = 0;
    console.log("length is " +items)
    for (let y=0; y<items; y++)
    {
        let eachitem = 1;
        let cartpage = document.createElement("div")
        cartpage.setAttribute("class", "cart-item")
        cartpage.innerHTML = 
        `
        <div class="name-block">Name: ${carts[y]}</div>
        <div class="name-block">Rs.<span class="priceact">${prices[y]}</div></span>
        <button button class="btn btn-outline-dark btn-sm"><span class="plusbtn"><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-plus-lg" viewBox="0 0 16 16">
        <path fill-rule="evenodd" d="M8 2a.5.5 0 0 1 .5.5v5h5a.5.5 0 0 1 0 1h-5v5a.5.5 0 0 1-1 0v-5h-5a.5.5 0 0 1 0-1h5v-5A.5.5 0 0 1 8 2"/>
        </svg></button></span>
        <button button class="btn btn-outline-dark btn-sm"><span class="minusbtn"><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-dash-lg" viewBox="0 0 16 16">
        <path fill-rule="evenodd" d="M2 8a.5.5 0 0 1 .5-.5h11a.5.5 0 0 1 0 1h-11A.5.5 0 0 1 2 8"/>
        </svg></button></span><hr>
        <div class="name">Quantity: ${eachitem}</div>
        `
        document.querySelector(".cart-container").appendChild(cartpage);
        let priceactual = cartpage.querySelector(".priceact");
        let quantityactual = cartpage.querySelector(".name");
        let plusbutton = cartpage.querySelector(".plusbtn");
        let minusbutton = cartpage.querySelector(".minusbtn");
        // total += Number(prices[y]);

        plusbutton.onclick = () => 
        {
            eachitem++;
            quantityactual.innerText = "Quantity: " +eachitem;
            priceactual.innerText = prices[y]*eachitem;
            Updatedtotal();
        }

        minusbutton.onclick = () =>
        {
            if(eachitem >= 1)
            {
            eachitem--;
            quantityactual.innerText = "Quantity: " +eachitem;
            priceactual.innerText = prices[y]*eachitem;
            Updatedtotal();
            }
        }
    }
    Updatedtotal()
}

function Updatedtotal()
{
    let total=0;
    // console.log("Total is "+ total);
    // let total_text = document.getElementsByClassName("total")[0];
    // total_text.innerText = "Total is Rs. "+total;
    document.querySelectorAll(".priceact").forEach(p => {
    total += Number(p.innerText);
    });
    document.querySelector(".total").innerText = "Total is Rs. " + total;
}

function indexredirect()
{
    window.location.href = "index.html";
}

function payment()
{
    window.location.href = "payment.html";
}

function paymentfinal()
{
    let cash = document.getElementById("cash").checked;
    let card = document.getElementById("card").checked;
    if (cash)
    {
        alert("Order successfully placed!")
        window.location.href = "index.html";
    }
    else if (card)
    {
        window.location.href = "carddetails.html";
    }
    else
    {
        alert("Please select a payment method");
    }
}

function paymentfinalcard()
{
    let crnum = document.getElementById("crdnum").value;
    let expdate = document.getElementById("date").value;
    let cvv = document.getElementById("cvv").value;
    if(crnum == "" || expdate === "" || cvv === "")
    {
        alert("Please fill all the details!");
    }
    else
    {
        alert("Order successfully placed!");
        window.location.href = "index.html";
    }
}

function logout()
{
    var confirmed = confirm("Do you really want to log out of the app?")
    if(confirmed)
    {
        window.location.href = "homepage.html";
    }   
}

function Reset()
{
    document.getElementById("emailid").value = "";
    document.getElementById("pasword").value = "";
    document.getElementById("fname").value = "";
    document.getElementById("lname").value = "";
    document.getElementById("add").value = "";
}