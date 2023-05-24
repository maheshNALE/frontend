// console.log("hii")
let data = []
fetch('http://localhost:8000/cart')
    .then((res) => res.json())
    .then((res) => {
        
        data = res
        displaydata(res)
    })
    .catch((err) => console.log(err))


function displaydata(data) {
    

    document.querySelector("#append").innerHTML = null

    data.forEach(function (el) {

        // console.log(el)
        let div = document.createElement("div")


        let image = document.createElement("img")
        image.setAttribute("src", el.image)
        image.setAttribute("id", "productimage")


        let productname = document.createElement("span")
        productname.innerText = el.tital
        productname.setAttribute("id", "productname")
       

        let qty = document.createElement("span")
        qty.innerText = 1

    

        let price = document.createElement("h3")
        price.innerText = "$"+ el.price
        // '₹' 

    
        div.append(image, productname, price,qty)
        document.querySelector("#append").append(div)



        // let apdiv = document.querySelector("#append")
        //    apdiv.style.display="flex";


    })

}


   


