
let quan=document.querySelector(".quantity")
let incr=document.querySelector(".increment")
let decr=document.querySelector(".decrement")
let totalelement=document.querySelector(".total")
let priceElement=document.querySelector(".price")



const pricePerItem = parseFloat(priceElement.textContent);

function updateTotal(){
let currentQuantity=parseInt(quan.textContent)
let total =pricePerItem * currentQuantity;
totalelement.innerHTML = total
}

incr.addEventListener("click", function() {
    let currentQuantity = parseInt(quan.textContent);
        quan.textContent = currentQuantity + 1;
        // updateTotal();
  });
  decr.addEventListener("click",()=>{

    let currentQuantity = parseInt(quan.textContent);
    if(quan.textContent>1){
    quan.textContent = currentQuantity - 1;
    // updateTotal();
}
  });




