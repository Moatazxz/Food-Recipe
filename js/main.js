let allApi=['carrot','broccoli','asparagus','cauliflower','corn','cucumber',
'green pepper','lettuce','mushrooms','onion','potato','pumpkin','red pepper',
'tomato','beetroot','brussel sprouts','peas','zucchini','radish','sweet potato',
'artichoke','leek','cabbage','celery','chili','garlic','basil','coriander','parsley','dill','rosemary','oregano','cinnamon','saffron','green bean','bean','chickpea','lentil','apple','apricot','avocado','banana','blackberry','blackcurrant','blueberry','boysenberry','cherry','coconut','fig','grape','grapefruit','kiwifruit','lemon','lime','lychee','mandarin','mango','melon','nectarine','orange','papaya','passion fruit','peach','pear','pineapple','plum','pomegranate','quince','raspberry','strawberry','watermelon','salad','pizza','pasta','popcorn','lobster','steak','bbq','pudding','hamburger','pie','cake','sausage','tacos','kebab','poutine','seafood','chips','fries','masala','paella','som tam','chicken','toast','marzipan','tofu','ketchup','hummus','chili','maple syrup','parma ham','fajitas','champ','lasagna','poke','chocolate','croissant','arepas','bunny chow','pierogi','donuts','rendang','sushi','ice cream','duck','curry','beef','goat','lamb','turkey','pork','fish','crab','bacon','ham','pepperoni',
'salami','ribs'];
let allresponse=[];
let li=document.getElementById('dropDown');
let dropli=document.getElementsByClassName('dropli');
let htitle=document.getElementById('htitle');
let ptitle=document.getElementById('ptitle');
let modaltitle=document.getElementById('exampleModalLabel');
let cards=document.getElementById('cards');
let modalimg=document.getElementById('modalimg');
let modalul=document.getElementById('modalul');
let recpieDetails={};

(()=>{

    let lidiv=``;
    for(let i =0 ;i<allApi.length;i++){
        lidiv+=`<li class="dropli">${allApi[i]}</li>
        <hr class="w-75 m-auto">`;
    }
    li.innerHTML=lidiv;
})();

for(let i=0;i<allApi.length;i++){
    dropli[i].addEventListener('click',(e)=>{
    let term=e.target.innerHTML;
     htitle.innerHTML= term;
     ptitle.innerHTML= term;
  
     getRecipe(term);
    });
    
}
getRecipe('pizza');

async function getRecipe(value){

let result= await fetch(`https://forkify-api.herokuapp.com/api/search?q=${value}`)
let resp=await result.json();
allresponse=resp.recipes;
console.log(allresponse);
show();
}


function show(){
   let cardDiv=``;

   for(let i=0;i<allresponse.length;i++){
       cardDiv+=`
       <div  class="card-cont col-lg-4 col-md-6 mb-4 ">
       <div class="card shadow " >
       <img src="${allresponse[i].image_url}" class="card-img-top" alt="${allresponse[i].title}">
       <div class="card-body text-center">
         <h5 class="card-title">${allresponse[i].title}</h5>
         <p class="card-text">${allresponse[i].publisher}</p>
         <button type="button" onclick='showModal("${allresponse[i].recipe_id}")' class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#exampleModal">
           Details
         </button>
       </div>
     </div> 
     </div>`;
   }

cards.innerHTML=cardDiv;
}


async function showModal(id){
  let result= await fetch(`https://forkify-api.herokuapp.com/api/get?rId=${id}`);
  recpieDetails= await result.json();
  modal()
}

function modal(){
 let lis=``
 let length=recpieDetails.recipe.ingredients.length;
 console.log(recpieDetails);
  modaltitle.innerHTML=recpieDetails.recipe.title;
  modalimg.setAttribute("src",`${recpieDetails.recipe.image_url}`);
  modalimg.setAttribute("alt",`${recpieDetails.recipe.title}`);

  for(let i=0;i<length;i++){
    lis+=`<li>${recpieDetails.recipe.ingredients[i]} </li>`
  }
modalul.innerHTML=lis;

}
