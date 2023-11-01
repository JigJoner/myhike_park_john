function getNameFromAuth() {
    firebase.auth().onAuthStateChanged(user => {
        // Check if a user is signed in:
        if (user) {
            // Do something for the currently logged-in user here: 
            console.log(user.uid); //print the uid in the browser console
            console.log(user.displayName);  //print the user name in the browser console
            userName = db.collection("users").doc(user.uid).get().then(
                profile => {
                    document.getElementById("name-goes-here").innerText = userName;   
                }
            )
            //db.collection("users").doc(user.uid).get().name;
            //method #1:  insert with JS
             

            // $("#name-goes-here").text(userName); //using jquery

            // //method #3:  insert using querySelector
            // document.querySelector("#name-goes-here").innerText = userName
            
        } else {
            // No user is signed in.
        }
    });
}
getNameFromAuth(); //run the function

// Function to read the quote of the day from Firestore "quotes" collection
// Input param is the String representing the day of the week, aka, the document name
function readQuote(day) {
    let days = ["sunday", "monday", "tuesday", "wednesday", "thursday", "friday", "saturday"];
    let date = new Date();
    db.collection("quotes").doc(days[date.getDay()])                                                      //name of the collection and documents should matach excatly with what you have in Firestore
      .onSnapshot(dayDoc => {                                                               //arrow notation
           console.log("current document data: " + dayDoc.data());                          //.data() returns data object
           document.getElementById("quote-goes-here").innerHTML = dayDoc.data().quote;      //using javascript to display the data on the right place
           
           //Here are other ways to access key-value data fields
           //$('#quote-goes-here').text(dayDoc.data().quote);         //using jquery object dot notation
           //$("#quote-goes-here").text(dayDoc.data()["quote"]);      //using json object indexing
		       //document.querySelector("#quote-goes-here").innerHTML = dayDoc.data().quote;
      })
}
readQuote(0);        //calling the function

function loadCards(){
    let cardTemplate = document.getElementById("hikeCardTemplate");
    db.collection("hikes").get().then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
            let hikeContainer = $("#hikes-go-here");
            // const temp = document.querySelector("#hikeCardTemplate");
            // let tempContent = document.createElement("div");
            // tempContent = temp.innerHTML;
            
            let currentCard = cardTemplate.content.cloneNode(true);

            //querySelector finds the first instance of it 
            //so each time I prepend, the first card in line gets new data
            let data = doc.data()
            currentCard.querySelector("#image").setAttribute("src", `../images/${data.code}.jpg`);
            currentCard.querySelector(".card-title").innerHTML = data["name"];
            currentCard.querySelector(".card-length").innerHTML = data["level"];
            currentCard.querySelector(".card-text").innerHTML = data["details"];
            currentCard.querySelector("a").setAttribute("href", `eachHike.html?docID=${doc["id"]}`)

            hikeContainer.append(currentCard);

        });
    });
}
loadCards();


function writeHikes() {
    //define a variable for the collection you want to create in Firestore to populate data
    var hikesRef = db.collection("hikes");

    hikesRef.add({
        code: "BBY01",
        name: "Burnaby Lake Park Trail", //replace with your own city?
        city: "Burnaby",
        province: "BC",
        level: "easy",
				details: "A lovely place for lunch walk",
        length: 10,          //number value
        hike_time: 60,       //number value
        lat: 49.2467097082573,
        lng: -122.9187029619698,
        last_updated: firebase.firestore.FieldValue.serverTimestamp()  //current system time
    });
    hikesRef.add({
        code: "AM01",
        name: "Buntzen Lake Trail", //replace with your own city?
        city: "Anmore",
        province: "BC",
        level: "moderate",
        details: "Close to town, and relaxing",
        length: 10.5,      //number value
        hike_time: 80,     //number value
        lat: 49.3399431028579,
        lng: -122.85908496766939,
        last_updated: firebase.firestore.Timestamp.fromDate(new Date("March 10, 2022"))
    });
    hikesRef.add({
        code: "NV01",
        name: "Mount Seymour Trail", //replace with your own city?
        city: "North Vancouver",
        province: "BC",
        level: "hard",
        details:  "Amazing ski slope views",
        length: 8.2,        //number value
        hike_time: 120,     //number value
        lat: 49.38847101455571,
        lng: -122.94092543551031,
        last_updated: firebase.firestore.Timestamp.fromDate(new Date("January 1, 2023"))
    });
}