const storage = window.localStorage;
const session = window.sessionStorage;
let db = storage.getItem("db");
if(db === undefined || db === null){
    let data = {products:[],users:[],transactions:[],inventory:[],customers:[],reps:[]};
    storage.setItem("db",JSON.stringify(data));
    db = storage.getItem("db");
}

db = JSON.parse(db);
//Functions start


//simulate page load
const simulateLoad =(waitTime,followFunction)=>{
    setTimeout(()=>{
        document.querySelector('#spinner').style.display = 'none';
        followFunction();
    },waitTime);
}
//check login 
const checkLogin = ()=>{
    let u = session.getItem("session");
    if(u === undefined || u === null){
        window.location.pathname = "/index.html";
        return false;        
    }
    else{
        let user = JSON.parse(u);
    console.log("user: ",user);
    document.querySelector("#login").textContent = user.uname.split("@")[0];
    return true;
    }
}

//load reps listReps
const listReps = (reps)=>{
    const listContainer = document.querySelector("#list_container");
    reps.forEach(rep=>{
        const itemList = document.createElement("div");
        const itemData = document.createElement("div");
        const itemActions = document.createElement("div");
        const title = document.createElement("span");
        const area = document.createElement("span");
        const actionEdit = document.createElement("span");
        const actionDelete = document.createElement("span");

        itemList.classList.add("item-list");

        area.textContent = rep.service_area;
        title.textContent = rep.first_name+" "+rep.last_name;
        title.classList.add("item-title");
        area.classList.add("item-focus");
        itemData.classList.add("item-data");
        itemData.appendChild(title);
        itemData.appendChild(area);

        itemList.appendChild(itemData);
        itemActions.classList.add("action-buttons");
        actionEdit.classList.add("material-icons");
        actionEdit.textContent ="edit";
        actionDelete.classList.add("material-icons");
        actionDelete.textContent ="delete";

        itemActions.appendChild(actionEdit);
        itemActions.appendChild(actionDelete);
        itemList.appendChild(itemActions);

        listContainer.appendChild(itemList);

    })
}

//Functions end

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
  checkLogin();
}


//check if current page is reps.html
if(window.location.pathname == "/reps.html"){
    let login = checkLogin();
    if(login){
        let reps = db.reps;
        if(reps.length === 0){
            simulateLoad(1000,()=>{
                window.location.pathname = "/add_rep.html";
            });
            
        }
        else{
           
           simulateLoad(1000,(resps)=>{
               listReps(reps);
           });
        }
    }
}

//check if current page is add reps
if(window.location.pathname == "/add_rep.html"){
    const form = document.querySelector("#new_rep_form");
    if(form){
        
        let reps = db.reps;
        form.addEventListener('submit',(event)=>{
            event.preventDefault();
            let fname = document.getElementById("fname").value;
            let lname = document.getElementById("lname").value;
            let phone = document.getElementById("phone").value;
            let service_area = document.getElementById("service_area").value;
            let email = document.getElementById("email").value;
            let password = document.getElementById("password").value;
            let id = reps.length;
            let rep = {id:id,first_name:fname,last_name:lname,email:email,phone:phone,service_area:service_area,password:password};
            reps.push(rep);
            db.reps = reps;
            storage.setItem('db',JSON.stringify(db));
            window.location.pathname="/reps.html";
        })
    }
}