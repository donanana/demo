const search = document.getElementById('search');
const submit = document.getElementById('submit');
const hitsEl = document.getElementById('hits');
const resultHeading = document.getElementById('result-heading');
const single_songEl = document.getElementById('single-song');


// Search hit and fetch from API
function searchSong(e) {
  e.preventDefault();

  // clear single hit
  single_songEl.innerHTML = '';

  // Get Search term
  const term = search.value;

  // Check for empty
  if (term.trim()) {
    // const localTerm = getLocalURL(term);
    // console.log('localTerm', localTerm);
    fetch(`https://genius.p.rapidapi.com/search?q=${term}`, {
      method: 'GET',
      headers: {
        'x-rapidapi-host': 'genius.p.rapidapi.com',
        'x-rapidapi-key': '331ac100ccmsh24e4d453efce040p13517bjsneb818e4f2035',
      },
    })      // fetch(`${localTerm[0].localJsonUrl}`)
    .then(data => data.json())
    .then(response => {
      console.log(response.response);
      resultHeading.innerHTML = `<h2>Search Results for '${term}':</h2>`;

      if (response.response.hits.length === 0) {
        resultHeading.innerHTML = 
        '<p>The are no search results. Try again!</p>';
      } else {
        hitsEl.innerHTML = response.response.hits
        .map(
          hit => `

            <div class="col s4 m4 l4">
              <div class="card" style="overflow: auto;">
                <div class="card-image waves-effect waves-block waves-light">
                  <img class="activator" src="${hit.result.header_image_thumbnail_url}">
                </div>
                <div class="card-text">
                  <h4>${hit.result.primary_artist.name}</h4>
                  <p>${hit.result.title_with_featured}</p>
                  <a href="${hit.result.url}" target="_blank">Song Preview</a>
                </div>
              </div>
            </div> 
          `
        )
        .join('');
      }
    })
        //clear search text
        search.value = '';
    // .catch(err => {
    //   console.log(err);
    // });
  } else {    
    alert('Please enter a search term');  
  }
}


// Fetch hit by ID
// const getSongById = (hitID) => {
//   fetch(`https://genius.p.rapidapi.com/artists/${artistId}/songs`, {
//     method: 'GET',
//     headers: {
//       'x-rapidapi-host': 'genius.p.rapidapi.com',
//       'x-rapidapi-key': 'd5ab9a4c29msh97e64377924214dp1d883cjsn88e4efcd2770',
//     },
//   })    .then(res => res.json())
//     .then(data => {
//       console.log(data);
//       // const hit = data.meals[0];

//       addSongToDOM(hit);
//     });
// };

// Fetch random hit from API
// const getRandomSong = () => {
//   // Clear hits and heading
//   hitsEl.innerHTML = '';
//   resultHeading.innerHTML = '';
//   fetch(`https://www.themealdb.com/api/json/v1/1/random.php`)
//     .then((res) => res.json())
//     .then((data) => {
//       console.log(data);
//       // const hit = data.meals[0];
//       addSongToDOM(hit);
//     });
// };

// Add hit to DOM
// const addSongToDOM = (hit) => {
//   const ingredients = [];

//   for (let i = 1; i <= 20; i++) {
//     if (hit[`strIngredient${i}`]) {
//       ingredients.push(
//         `${hit[`strIngredient${i}`]} ~ ${hit[`strMeasure${i}`]}`
//       );
//     } else {
//       break;
//     }
//   }

//   console.log('ingredients', ingredients);

//   single_hitEl.innerHTML = `    
//     <div class="single-hit">
//         <h4> ${hit.strMeal} </h4>     
//         <img src="${hit.strMealThumb}" alt="${hit.strMeal}"/>      
//         <div class="single-hit-info">        
//             ${hit.strCategory ? `<p>${hit.strArea}</p>` : ''}     
//             ${hit.strArea ? `<p>${hit.strArea}<p>` : ''} 
//         </div>      
//         <div class="main">        
//             <p> ${hit.strInstructions} </p>        
//             <h5>Ingredients</h5>        
//             <ul>          
//                 ${ingredients.map(ing => `<li>${ing}</li>`).join('')}        
//             </ul>      
//         </div>    
//      </div>  
//      `;
// };

// Event Listeners
submit.addEventListener('submit', searchSong);

// random.addEventListener('click', getRandomSong);

// hitsEl.addEventListener('click', (e) => {
//   // console.log('e.path', e.path);
//   const hitInfo = e.path.find((item) => {
//     // console.log('hitEl', item);
//     if (item.classList.contains('hit-info')) {
//       console.log('item', item);
//       return item;
//     } else {
//       return false;
//     }
//   });
//   // console.log('hitInfo', hitInfo);
//   if (hitInfo) {
//     const hitID = hitInfo.getAttribute('response-hitId');
//     // console.log(hitID);
//     getSongById(hitID);
//   }
// });