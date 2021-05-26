const storage = window.localStorage;
const session = window.sessionStorage;
let db = storage.getItem("db");
if(db === undefined || db === null){
    let data = {products:[],users:[],transactions:[],inventory:[],customers:[],reps:[]};
    storage.setItem("db",JSON.stringify(data));
    db = storage.getItem("db");
}

const loginForm = document.querySelector("#loginform");
if(loginForm){
    loginForm.addEventListener("submit",(event)=>{
        event.preventDefault();
        let inputs = Array.from(loginForm.elements);
        let email = inputs[0].value.trim();
        let pword = inputs[1].value.trim();
        let user = {uname:email,pword:pword};
        session.setItem("session",JSON.stringify(user));
        window.location.pathname = "/dashboard.html";
    })
}

//check if dashboard is loaded
if(window.location.pathname == "/dashboard.html"){
    let u = session.getItem("session");
    if(u !== undefined && u !== null){
        let user = JSON.parse(u);
        console.log("user: ",user);
        document.querySelector("#login").textContent = user.uname.split("@")[0];
    }
    else{
        window.location.pathname = "/index.html";
    }
}
