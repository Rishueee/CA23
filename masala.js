const searchbar = document.getElementById('search-bar');
const searchedfood = document.getElementById('searchedfood');



async function getRandomMeal() {
    const response = await fetch('https://www.themealdb.com/api/json/v1/1/random.php');
    const data = await response.json();
    return data.meals[0];
}

async function getMealIngredients(id) {
    const response = await fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`);
    const data = await response.json();
    return data.meals[0];
}

async function displayRandomMeal() {
    const randomMeal = await getRandomMeal();

    const randomMealSection = document.getElementById('meals');
    randomMealSection.innerHTML = `
    <div id = "diii">
        <h2>READY TO COOK!!</h2>
        <img class = "random" src="${randomMeal.strMealThumb}" alt="${randomMeal.strMeal}">
        
        <h6>${randomMeal.strMeal}</h6>
        <button class="rish" id="ing" onclick="displayIngredients('${randomMeal.idMeal}')">SHOW INGREDIENTS</button>
        </div>`;
}

async function displayIngredients(id) {
    try {
        const meal = await getMealIngredients(id);

        const ingredientsList = [];
        for (let i = 1; i <= 20; i++) {
            const ingredient = meal[`strIngredient${i}`];
            const measure = meal[`strMeasure${i}`];

            if (ingredient && measure) {
                ingredientsList.push(`<li>${measure} ${ingredient}</li>`);
            }
        }

        const container = document.getElementById('random-meall');
        container.innerHTML = `<ul class = "ul">${ingredientsList.join('')}</ul>`;
    } catch (error) {
        console.error('Error fetching ingredients:', error);
    }
}


searchbar.addEventListener('keyup', async function(event) {
    if (event.key === 'Enter') {
      const searchTerm = searchbar.value.trim();
      if (searchTerm !== '') {
        try {
          const response = await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?c=${searchTerm}`);
          const data = await response.json();
          displaySearchedMeals(data.meals);
        } catch (error) {
          console.error('Error fetching searched meals:', error);
        }
      }
    }
  });
  

  function displaySearchedMeals(meals) {
    if (meals) {
        searchedfood.style.display = '';
        const heading = '<h2 id = "hhh">Searched Meals</h2>';
  
      searchedfood.innerHTML = heading  + meals.map(meal => `
     
      
        <div class="meal-item" onclick="showIngredients('${meal.idMeal}')">
          <img class = "img" src="${meal.strMealThumb}" alt="${meal.strMeal}">
          <p id="pp">${meal.strMeal}</p>
        </div>
      `).join('');
    } else {
      searchedfood.style.display = 'none';
    }
  }
displayRandomMeal();
  
