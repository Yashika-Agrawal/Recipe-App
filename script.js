const search=document.querySelector('form');
const result=document.querySelector('.result');
const container=document.querySelector('.container');
let recipe='';
const id='6ea92e45';
const key='eedc9336fb3111d2a84b22faeb6a6669';


search.addEventListener('submit',(e)=>{
   e.preventDefault(); //prevent default beahviour of form ie to submit to the server and reloads page 
   recipe=e.target.querySelector('input').value;
   fetchApi();
});
async function fetchApi (){
   const url=`https://api.edamam.com/search?q=${recipe}&app_id=${id}&app_key=${key}&to=20`;
   const response=await fetch(url);
   const data=await response.json();
   generateHTML(data.hits);
   console.log(data);

}
function generateHTML(results){
   let generatedHTML='';
   results.map(result=>{
    generatedHTML += 
    `<div class="item">
    <img src="${result.recipe.image}" alt="">
    <div class="flex-container">
      <h1 class="title">${result.recipe.label}</h1>
      <a class="button" href="${result.recipe.url}"target="_blank">View Recipe</a>
    </div>
    <p class="item-data">Calories: ${result.recipe.calories.toFixed(2)}</p>
    <p class="item-data">Health Label: ${result.recipe.healthLabels.length > 0 ? result.recipe.dietLabels: 'No Data Found'}</p>
    <p class="item-data">Diet Label: ${result.recipe.dietLabels}</p>
  </div>`
   })
   result.innerHTML=generatedHTML;
}