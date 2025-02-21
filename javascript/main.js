let topRatedContainerSeries = [] ; 
let baseUrl = `https://image.tmdb.org/t/p/w500/` ; 

async function getTopRatedSeries()
{
    let result = await fetch(`https://api.themoviedb.org/3/tv/top_rated?api_key=58d950e9118a63dcbe31f2a9bf0bd084`)
    let finalResult = await result.json() ;
    topRatedContainerSeries = finalResult.results ;
    displayTopRated() ; 
    console.log('topRatedContainer' , topRatedContainerSeries) ; 
}

getTopRatedSeries(); 


function displayTopRated() {
    let box = ``;
    for (let i = 0; i < topRatedContainerSeries.length; i++) {
        let vote = Math.floor(topRatedContainerSeries[i].vote_average); 

        box += ` 
            <div class="col-md-3 mt-3">
                <img class="w-100" src="${baseUrl + topRatedContainerSeries[i].poster_path}" alt="tv show">
                <h4 class="text-warning">${vote} &#9733;</h4>  <!-- Unicode Star -->
                <h3 class="text-danger">${topRatedContainerSeries[i].name}</h3>
                <p class="text-muted">${topRatedContainerSeries[i].overview}</p>
            </div>`;
    }
    document.getElementById('posts').innerHTML = box;
}


async function searchMovies(query) {
    if (query.trim() === "") return; 

    let result = await fetch(`https://api.themoviedb.org/3/search/multi?api_key=58d950e9118a63dcbe31f2a9bf0bd084&query=${query}`);
    let finalResult = await result.json();
    
    displaySearchResults(finalResult.results);
}


function displaySearchResults(results) {
    let box = ``;

    for (let i = 0; i < results.length; i++) {
        let item = results[i];
        let title = item.title || item.name || "Unknown";
        let imageUrl = item.poster_path || item.profile_path ? baseUrl + (item.poster_path || item.profile_path) : "https://via.placeholder.com/500";
        let overview = item.overview || "No description available.";
        let vote = item.vote_average ? Math.floor(item.vote_average) + " &#9733;" : "N/A"; 

        box += ` 
            <div class="col-md-3 mt-3">
                <img class="w-100" src="${imageUrl}" alt="${title}">
                <h4 class="text-warning">${vote}</h4>
                <h3 class="text-danger">${title}</h3>
                <p class="text-muted">${overview}</p>
            </div>`;
    }

    document.getElementById('posts').innerHTML = box;
}




document.getElementById("searchInput").addEventListener("input", function () {
    let query = this.value;
    searchMovies(query);
});
