const loadCategories = () => {
  fetch("https://openapi.programming-hero.com/api/news/categories")
    .then((res) => res.json())
    .then((data) => displayCategories(data.data))
    .catch((error) => console.log(error));
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
           <button class="btn btn-primary" onClick="loadNews('${category.category_id}')" href=""> ${category.category_name}</button>`;
    categoriesField.appendChild(categoriesDiv);
  });
  // console.log(categories);
};

//spinner
const toggoleSpinner = (isLoading) => {
  const loaderSection = document.getElementById("loader");
  if (isLoading) {
    loaderSection.classList.remove("d-none");
  } else {
    loaderSection.classList.add("d-none");
  }
};

const loadNews = (categoryId) => {
  toggoleSpinner(true);

  // console.log("id hoilo : " + categoryId);

  let url = `https://openapi.programming-hero.com/api/news/category/${categoryId}`;
  fetch(url)
    .then((res) => res.json())
    .then((data) => displayNews(data.data))
    .catch((error) => console.log(error));

  const newsField = document.getElementById("news-cards");
  newsField.innerHTML = "";
};
loadNews();

const displayNews = (newsData) => {
  console.log(newsData);
  const numberSpan = document.getElementById("news-number");
  document.getElementById("news-number-container").style.display = "block";
  numberSpan.innerText = `${newsData.length}`;
  newsData.forEach((news) => {
    //clear text
    const newsField = document.getElementById("news-cards");
    const newsCardDiv = document.createElement("div");
    // newsField.innerHTML='';
    // newsField.appendChild(newsCardDiv);
    // console.log("length: " + newsData);
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
        <div class="row my-3 border border-white-50">
            <div class="col-4 my-auto">
                <img class="w-100 h-100" src="${news.image_url}">
            </div>
            <div class="col-8 py-4 px-5">
                <div>
                    <h5 clas="my-2">${news.title}</h5>
                    <p>${news.details.slice(0, 200)}...</p>
                </div>
                <div class="d-flex justify-content-between my-3">
                    <div>
                        <div class="d-flex">
                            <div>
                                <img class="author-img" src = "${
                                  news.author.img
                                }">
                            </div>
                            <div class="mx-3">
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
                        </div>
                    </div>                                            
                    <div>
                        <strong><i class="fa-regular fa-eye mx-2"></i>${
                          news.total_view
                        }</strong>    
                    </div>
                    <div>
                        <button onClick="loadNewsDetails('${
                          news._id
                        }')"  type="button"
                        class="btn btn-primary"
                        data-bs-toggle="modal"
                        data-bs-target="#newsDetailsModal">Read More</button>    
                    </div>                   
                </div>
            </div>
        </div>
    </div> 
    `;
    newsField.appendChild(newsCardDiv);
  });
  toggoleSpinner(false);
};

const loadNewsDetails = (newsId) => {
  const url = `https://openapi.programming-hero.com/api/news/${newsId}`;
  // console.log("my news id " + newsId);
  fetch(url)
    .then((res) => res.json())
    .then((data) => displayNewsDetails(data.data))
    .catch((error) => console.log(error));
};

// loadNewsDetails();

const displayNewsDetails = (newsDetails) => {
  // console.log(newsDetails);
  const newsDetailsModal = document.getElementById("newsDetailsModal");
  //   const modalDiv = document.createElement("div");
  newsDetailsModal.innerHTML = `
         <div class="bg-white w-75 my-4 mx-auto p-5">
            <img class="img img-fluid w-100 mx-auto" src="${newsDetails[0].image_url}">
            <h3 class="my-4">${newsDetails[0].title} </h3>
            <p></p>${newsDetails[0].details}</p           
        </div>
    `;
  //   newsDetailsModal.appendChild(modalDiv);
};
