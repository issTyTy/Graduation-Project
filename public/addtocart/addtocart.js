// const product = [
//     {
//         id: 0,
//         image: '/addtocart/image/gg-1.jpg',
//         title: 'Gmaing1',
//         price: 15000,
//     },
//     {
//         id: 1,
//         image: '/addtocart/image/hh-2.jpg',
//         title: 'Gmaing2',
//         price: 17000,
//     },
//     {
//         id: 2,
//         image: '/addtocart/image/ee-3.jpg',
//         title: 'Gmaing3',
//         price: 19000,
//     },
//     {
//         id: 3,
//         image: '/addtocart/image/aa-1.jpg',
//         title: 'Gmaing4',
//         price: 22000,
//     },
//     {
//         id: 4,
//         image: '/addtocart/image/aa-1.jpg',
//         title: 'Gmaing5',
//         price: 23000,
//     },
//     {
//         id: 5,
//         image: '/addtocart/image/aa-1.jpg',
//         title: 'Gmaing6',
//         price: 28000,
//     },
//     {
//         id: 6,
//         image: '/addtocart/image/aa-1.jpg',
//         title: 'Gmaing6',
//         price: 28000,
//     },
//     {
//         id: 7,
//         image: '/addtocart/image/aa-1.jpg',
//         title: 'Gmaing7',
//         price: 28000,
//     },
//     {
//         id: 8,
//         image: '/addtocart/image/aa-1.jpg',
//         title: 'Gmaing6',
//         price: 28000,
//     },
//     {
//         id: 9,
//         image: '/addtocart/image/aa-1.jpg',
//         title: 'Gmaing6',
//         price: 28000,
//     }
// ];
// const categories = [...new Set(product.map((item)=>
//     {return item}))]
//     let i=0;
// document.getElementById('root').innerHTML = categories.map((item)=>
// {
//     var {image, title, price} = item;
//     return(
//         `<div class='box'>
//             <div class='img-box'>
//                 <img class='images' src=${image}></img>
//             </div>
//         <div class='bottom'>
//         <p>${title}</p>
//         <h2>LE ${price}.00</h2>`+
//         "<button onclick='addtocart("+(i++)+")'>Add to cart</button>"+
//         `</div>
//         </div>`
//     )
// }).join('')

// var cart =[];

// function addtocart(a){
//     cart.push({...categories[a]});
//     displaycart();
// }
// function delElement(a){
//     cart.splice(a, 1);
//     displaycart();
// }

// function displaycart(){
//     let j = 0, total=0;
//     document.getElementById("count").innerHTML=cart.length;
//     if(cart.length==0){
//         document.getElementById('cartItem').innerHTML = "Your cart is empty";
//         document.getElementById("total").innerHTML = "LE "+0+".00";
//     }
//     else{
//         document.getElementById("cartItem").innerHTML = cart.map((items)=>
//         {
//             var {image, title, price} = items;
//             total=total+price;
//             document.getElementById("total").innerHTML = "LE "+total+".00";
//         }).join('');
//     }

    
// }