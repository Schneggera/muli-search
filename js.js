document.getElementById("searchBtn").addEventListener("click", function () {
  let searchValue = document.getElementById("searchIn").value;
  let combineValues = document
    .getElementById("searchCombineIn")
    .value.split(",");

  combineValues.forEach((combine) => {
    let theUrl = `https://www.googleapis.com/customsearch/v1?key=AIzaSyBOFDvgmLHEpdPJWPrj384MSl6gq73aXRI&cx=d07c534584dba9130&q=${searchValue}+${combine}`;
    httpGetAsync(theUrl, hndlr, combine);
  });

  
});

function hndlr(response, combine) {
  document.getElementById(
    "content"
  ).innerHTML += `<br><br><b>${combine}</b>`
  for (var i = 0; i < response.items.length; i++) {
    var item = response.items[i];
    // in production code, item.htmlTitle should have the HTML entities escaped.
    document.getElementById(
      "content"
    ).innerHTML += `<br><a href='${item.link}'>${item.htmlTitle}</a><br>${item.snippet}`;
  }
}

function httpGetAsync(theUrl, callback, combine) {
  var xmlHttp = new XMLHttpRequest();
  xmlHttp.onreadystatechange = function () {
    if (this.readyState == 4 && this.status == 200) {
      let arr = JSON.parse(this.responseText);
      callback(arr, combine);
    }
  };
  xmlHttp.open("GET", theUrl, true); // true for asynchronous
  xmlHttp.send(null);
}
//
