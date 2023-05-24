// console.log("hii")
 let data = []
fetch('http://localhost:8000/product')
    .then((res) => res.json())
    .then((res) => {
        
        data = res
        displaydata(res)
    })
    .catch((err) => console.log(err))


   function displaydata(data) {
    

    document.querySelector("#append").innerHTML = null

    data.forEach(function (el) {

        console.log(el)
        let div = document.createElement("div")

        let newbt = document.createElement("button")
        newbt.innerText = "New"
        newbt.setAttribute("id", "newbt")

        let image = document.createElement("img")
        image.setAttribute("src", el.image)
        image.setAttribute("id", "productimage")


        let productname = document.createElement("span")
        productname.innerText = el.tital
        productname.setAttribute("id", "productname")
       

        let rating = document.createElement("h3")
        rating.innerText = "⭐"+" "+" "+(el.rating)

    

        let price = document.createElement("span")
        price.innerText = "$"+ el.price
        // '₹' 

        let wish = document.createElement("img")
        wish.src = "https://t4.ftcdn.net/jpg/01/25/83/03/240_F_125830316_m9Grtzjlt2I5Gp4qpDQq5G5BSXR5d9ZF.jpg"
        wish.setAttribute("id", "wish")

        wish.addEventListener("click", function () {
            wish.src = "https://img.freepik.com/free-vector/heart_53876-25531.jpg"

            let wishlistdata = JSON.parse(localStorage.getItem("wishlist"))
            if (wishlistdata == null)
                wishlistdata = []
            let already = false;
            for (let i = 0; i < wishlistdata.length; i++) {
                if (wishlistdata[i].links === el.links) {
                    already = true;
                    break;
                }
            }
            if (already === true) {
                alert("product already in wishlist")
            }
            else {
                wishlistdata.push(el)
                localStorage.setItem("wishlist", JSON.stringify(wishlistdata))
                alert("product added to wishlist")
            }

        })
        
        let addcart = document.createElement("button")
        addcart.innerText = "Add To Cart"
        addcart.setAttribute("id", "addcart")


        addcart.addEventListener("click", function () {
            const payload={ image:el.image,tital:el.tital,price:el.price}
           
              try {
                fetch("http://localhost:8000/cartadd",{
                    method:"POST",
                    headers:{
                        "content-Type":"application/json"},
                       body: JSON.stringify(payload)
                    
                })
                alert("product added to cart")
              } catch (error) {
                console.log(error)
              }
           
            
        })




        div.append(newbt,wish,image, productname, rating, price,addcart)
        document.querySelector("#append").append(div)



        // let apdiv = document.querySelector("#append")
        //    apdiv.style.display="flex";


    })

}

document.querySelector("select").addEventListener("change",function(){
    {
        let selected = document.querySelector("select").value
        if(selected == ""){
         displaydata(data)
        }
        else if(selected == "htl"){
         data.sort((a,b)=>b.price - a.price)
         displaydata(data)
        }
        else{
         data.sort((a,b)=>a.price - b.price)
         displaydata(data)
        }
       
     }
})



 document.querySelector("#searchproducts").addEventListener("input",function(){
     let q = document.querySelector("#searchproducts").value
     console.log(q)
     let newdata = data.filter(function(el){
        return el.tital.toLowerCase().includes(q.toLowerCase())
        if(document.querySelector("#searchproducts").value == ""){
            window.location.reload
         }

     })
     
    //  console.log(newdata)
      displaydata(newdata)
    
    })



     document.querySelector("#priceone").addEventListener("click", function () {

        let filterdproduct = data.filter(function (el) {
            
            if(el.price<49){
                return el
            }   
        })
        displaydata(filterdproduct)
    
    })

    document.querySelector("#pricetwo").addEventListener("click", function () {

        let filterdproduct = data.filter(function (el) {
            
            if(el.price>49 && el.price<299.99){
                return el
            }   
        })
        displaydata(filterdproduct)
    
    })

    document.querySelector("#pricethree").addEventListener("click", function () {

        let filterdproduct = data.filter(function (el) {
            
            if(el.price>299.99 && el.price<499.99){
                return el
            }   
        })
        displaydata(filterdproduct)
    
    })

  
    document.querySelector("#pricethree").addEventListener("click", function () {

        let filterdproduct = data.filter(function (el) {
            
            if(el.price>500){
                return el
            }   
        })
        displaydata(filterdproduct)
    
    })

   
module.exports={
    displaydata
}

