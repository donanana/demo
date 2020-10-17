const search = document.getElementById('search');
const submit = document.getElementById('submit');
const mealsEl = document.getElementById('meals');
const resultHeading = document.getElementById('result-heading');
const single_mealEl = document.getElementById('single-meal');

const random = document.getElementById('random');

const data = [
    {
        search:"salad",
        localJsonUrl:"./data/salad.json",
    },
    {
        search:"steak",
        localJsonUrl:"./data/steak.json",
    },
    {
        search:"chicken",
        localJsonUrl:"./data/chicken.json",
    },
];

function getLocalURL(search){
    return data.filter(term => term.search === search);
}

// Search meal and fetch from API
function searchMeal(e) {
    e.preventDefault();

    // clear single meal  
    single_mealEl.innerHTML = '';

    // Get Search term  
    const term = search.value;

    // Check for empty  
    if (term.trim()) {
        const localTerm = getLocalURL(term);
        console.log('localTerm',localTerm);
        fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${term}`)
        // fetch(`${localTerm[0].localJsonUrl}`)
            .then(res => res.json())
            .then(data => {
                console.log(data);
                resultHeading.innerHTML = `<h2>Search Results for '${term}':</h2>`;

                if (data.meals === null) {
                    resultHeading.innerHTML = 
                    '<p>The are no search results. Try again!</p>';
                } else {
                    mealsEl.innerHTML = data.meals
                        .map(
                            meal => `
                    <div class="meal">
                    <img src="${meal.strMealThumb}" alt="${meal.strMeal}" />
                    <div class="meal-info" data-mealID="${meal.idMeal}">
                    <h5> ${meal.strMeal} </h5>
                    </div>
                    </div>
                `
                        )
                        .join('');
                }
            });
        //clear search text
        search.value = '';
    } else {
        alert('Please enter a search term');
    }
}
// Fetch meal by ID

const getMealById = mealID => {
    fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${mealID}`)
        .then(res => res.json())
        .then(data => {
            // console.log(data);
            const meal = data.meals[0];

            addMealToDOM(meal);
        });
};

// Fetch random meal from API
const getRandomMeal = () => {
    // Clear meals and heading  
    mealsEl.innerHTML = '';
    resultHeading.innerHTML = '';
    fetch(`https://www.themealdb.com/api/json/v1/1/random.php`)
        .then(res => res.json())
        .then(data => {
            // console.log(data);      
            const meal = data.meals[0];
            addMealToDOM(meal);
        });
};

// Add meal to DOM
const addMealToDOM = meal => {
    const ingredients = [];

    for (let i = 1; i <= 20; i++) {
        if (meal[`strIngredient${i}`]) {
            ingredients.push(
                `${meal[`strIngredient${i}`]} ~ ${meal[`strMeasure${i}`]}`
            );
        } else {
            break;
        }
    }

    console.log('ingredients', ingredients);

    single_mealEl.innerHTML = `    
    <div class="single-meal">
        <h4> ${meal.strMeal} </h4>     
        <img src="${meal.strMealThumb}" alt="${meal.strMeal}"/>      
        <div class="single-meal-info">        
            ${meal.strCategory ? `<p>${meal.strArea}</p>` : ''}     
            ${meal.strArea ? `<p>${meal.strArea}<p>` : ''} 
        </div>      
        <div class="main">        
            <p> ${meal.strInstructions} </p>        
            <h5>Ingredients</h5>        
            <ul>          
                ${ingredients.map(ing => `<li>${ing}</li>`).join('')}        
            </ul>      
        </div>    
     </div>  
     `;
};

// Event Listeners
submit.addEventListener('submit', searchMeal);

random.addEventListener('click', getRandomMeal);

mealsEl.addEventListener('click', e => {
    // console.log('e.path', e.path);  
    const mealInfo = e.path.find(item => {
        // console.log('mealEl', item);    
        if (item.classList.contains('meal-info')) {
            console.log('item', item);
            return item;
        } else {
            return false;
        }
    });
    // console.log('mealInfo', mealInfo);  
    if (mealInfo) {
        const mealID = mealInfo.getAttribute('data-mealid');
        // console.log(mealID);    
        getMealById(mealID);
    }
});