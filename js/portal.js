const loadCategories = () => {
  fetch("https://openapi.programming-hero.com/api/news/categories")
    .then((res) => res.json())
    .then((data) => displayCategories(data.data));
};

loadCategories();

const displayCategories = (categories) => {
  // console.log(categories);
  categories.news_category.forEach((category) => {
    // console.log(category.category_name);
    const categoriesField = document.getElementById("categories-field");
    const categoriesDiv = document.createElement("div");
    categoriesDiv.classList.add("col", "text-center");
    categoriesDiv.innerHTML = `
           <button onClick="loadNews('${category.category_id}')" href=""> ${category.category_name}</button>`;
    categoriesField.appendChild(categoriesDiv);
  });
};

const loadNews = (categoryId) => {
  console.log("id hoilo : " + categoryId);

  let url = `https://openapi.programming-hero.com/api/news/category/${categoryId}`;
  fetch(url)
    .then((res) => res.json())
    .then((data) => displayNews(data.data));

  const newsField = document.getElementById("news-cards");
  newsField.innerHTML = "";
};
loadNews();

const displayNews = (newsData) => {
  console.log(newsData);

  newsData.forEach((news) => {
    //clear text
    const newsField = document.getElementById("news-cards");
    const newsCardDiv = document.createElement("div");
    // newsField.innerHTML='';
    // newsField.appendChild(newsCardDiv);
    console.log("length: " + news.length);
    if (
      news.length === 0 ||
      news.length === undefined ||
      news.length === null ||
      news === []
    ) {
      newsCardDiv.innerHTML = `
            <h1>No News Found</h1>
        `;
    }
    newsCardDiv.innerHTML = `
    <div>   
        <div class="row my-3">
            <div class="col-4 my-5">
                <img class="w-75" src="${news.image_url}">
            </div>
            <div class="col-8">
                <div>
                    <h6>${news.title}</h6>
                    <p>${news.details.slice(0, 200)}...</p>
                </div>
                <div class="">
                    <div class="row justify-content-around">
                        <div class="col-3">
                            <img class="author-img" src = "${news.author.img}">
                        </div>
                        <div class="col-3">
                            <h6>${
                              news.author.name
                                ? news.author.name
                                : "No data found"
                            }</h6>
                            <p>${
                              news.author.published_date
                                ? news.author.published_date
                                : "No data found"
                            }</p>
                        </div>
                        <div  class="col-3">
                            <p>View:${news.total_view}</p>    
                        </div>
                        <div  class="col-3">
                            <button  type="button"
                            class="btn btn-primary"
                            data-bs-toggle="modal"
                            data-bs-target="#newsDetailsModal">Show Details</button>    
                        </div>
                    </div>                    
                </div>
            </div>
        </div>
    </div> 
    `;
    newsField.appendChild(newsCardDiv);
  });
};
