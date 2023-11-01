

function querySearch(){
    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);
    let card = db.collection("hikes").doc(urlParams.get('docID'));
    
    card.get("name").then(doc => {
        document.querySelector("#hikeName").innerHTML = (doc.data())["name"];
        document.querySelector(".hike-img").setAttribute(`src`, `../images/${(doc.data())["code"]}.jpg`)
        document.querySelector("#hikeName").innerHTML = (doc.data())["name"];
    });
}
querySearch();