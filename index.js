import { initializeApp } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-app.js";
import { getDatabase, ref, onValue, push } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-database.js";


const appSettings = {
    databaseURL: "https://champions-scrimba-default-rtdb.asia-southeast1.firebasedatabase.app/"
}

const app = initializeApp(appSettings);
const database = getDatabase(app);
const endorsementsInDB = ref(database, "endorsements");



const writeEndorsementEl = document.getElementById("write-endorsement");
const publishBtnEl = document.getElementById("publish-btn");
const endorsementsEl = document.getElementById("endorsements")
const emptyErrorEl = document.getElementById("empty-error");



publishBtnEl.addEventListener("click", function(){
    emptyErrorEl.textContent = ""

    if(writeEndorsementEl.value){

        // renderEndorsement(writeEndorsementEl.value)
        sendEndorsementToDB(writeEndorsementEl.value);

        //clear textarea after publish
        writeEndorsementEl.value=""
    }else{
        emptyErrorEl.textContent = "Please publish a written endorsement."
    }
});


onValue(endorsementsInDB, function(snapshot){

    if(snapshot.exists()){
        const endorsementsList = Object.values(snapshot.val());
        console.log(endorsementsList)
    
        let renderingHtml = ''
    
        for(let i=0; i <endorsementsList.length; i++){
            renderingHtml +=`<li> ${endorsementsList[i]} </li>`
            renderEndorsement(renderingHtml);
        }
    }
    
})


function sendEndorsementToDB(writtenEndorsement){
    push(endorsementsInDB, writtenEndorsement);
}

function renderEndorsement(htmlToRender){
    endorsementsEl.innerHTML = htmlToRender;
}