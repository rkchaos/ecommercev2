let span=document.querySelector('span') 
// let a=document.querySelector('#learn') 
const mainImage = document.querySelector('#mainImage');

const colorArray = ['#005b35', '#e6bbbd', '#a2266d']
function changeMainImage(value){
    
if(value==2){
    // span.style.color="skyblue";
    span.style.color="green";

    mainImage.setAttribute('src', "../assets/slide"+value+".png");

}
else{
    span.style.color="skyblue";
    mainImage.setAttribute('src', "../assets/slide"+value+".png");
} 
}



