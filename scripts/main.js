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