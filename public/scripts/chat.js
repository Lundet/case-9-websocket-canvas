// DOM elements
// ----------------------------------------------
const messageForm = document.querySelector("#messageForm");
const message = document.querySelector("#message");
const chatHistory = document.querySelector("#chatHistory");
const user = document.querySelector("#user");
const setUser = document.querySelector("#setUser");

// dependencies
// ----------------------------------------------

// skapa en websocket i klienten
const websocket = new WebSocket("ws://localhost:8081");




// event listeners
// ----------------------------------------------
messageForm.addEventListener("submit", sendMessage);
websocket.addEventListener("message", receiveMessage);
setUser.addEventListener("click", confirmSetUser);




// event handlers
// ----------------------------------------------
function sendMessage(event) {
    event.preventDefault();
    console.log("Skicka meddelandet med ws - websocket");

    let obj = { message: message.value, user: user.value };
    websocket.send(JSON.stringify(obj));

    //rendera eget meddelandet på sidan = vänta inte på servern...
    renderMessage(obj, "");
    message.value = ""
}


function receiveMessage(event) {
    console.log("event", event);

    // omvandla event.data till JavaScript objekt
    const obj = JSON.parse(event.data);
    console.log("obj", obj);

    //rendera
    renderMessage(obj, "someone else");
}

    
function confirmSetUser() {
    console.log("Vem...");

    const name = user.value;

    //Kontrollera att det finns ett namn
    if (name.length > 2) {

        //visa chat formulär och historik
        //se till att man inte kan ändra sitt namn
        setUser.classList = "hidden";
        user.setAttribute("disabled", "disabled");
        messageForm.classList = "";
        chatHistory.classList = "";
    }
}


// functions
// ----------------------------------------------

function renderMessage(obj, other) {
    // Skapa en container
    let div = document.createElement("div");
    div.classList = "container";

    // Skapa ett element för meddelandet
    let p = document.createElement("p");
    p.textContent = obj.message;
    p.classList = "message-text";

    // Skapa ett element för username
    let span = document.createElement("span");
    span.textContent = obj.user;

    

    if (other.length > 0) {
        span.classList = "other";
    }
    else {
        span.classList = "username";
    }

    //skapa timestamp
    let timestamp = document.createElement("time");
    let date = new Date();
    timestamp.textContent = date.toLocaleTimeString().slice(0, 5);
    timestamp.datatime = date.toISOString();


    div.appendChild(p);
    div.appendChild(span);
    div.appendChild(timestamp);

    // Lägg till DOM
    chatHistory.appendChild(div);
}
