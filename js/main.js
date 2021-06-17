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

//encode image
const encodeImage = (file)=>{
    var reader = new FileReader();
    reader.onload = function() {

    var arrayBuffer = this.result,
      array = new Uint8Array(arrayBuffer),
      binaryString = String.fromCharCode.apply(null, array);
      console.log(binaryString);
    }
    reader.readAsDataURL(file);
    console.log("result: ",reader.result);
    return reader.result;
}
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
        document.querySelector("#login").textContent = user.uname.split("@")[0];
        return true;
    }
}


//show toast
const showToastMessage = (message)=>{
    const msgContainer = document.createElement("div");
    msgContainer.textContent = message;
    msgContainer.classList.add("toast");
    document.body.appendChild(msgContainer);
    // msgContainer.classList.add("slideUp");
}

//load product list
const listProducts = (products)=>{
    console.log(products);
    const listContainer = document.querySelector("#list_container");
    products.forEach(p=>{
        const itemList = document.createElement("div");
        const itemData = document.createElement("div");
        const itemActions = document.createElement("div");
        const title = document.createElement("span");
        const area = document.createElement("span");
        const actionEdit = document.createElement("span");
        const actionDelete = document.createElement("span");
        const image = document.createElement("img");

        itemList.classList.add("item-list");
        image.src = (p.image) ? p.image : "/img/no_data.svg";
        image.alt = p.description;
        image.classList.add("item-image")
        itemList.appendChild(image);
        area.textContent = p.pack_size;
        title.textContent = p.name;
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

        actionDelete.addEventListener('click',(e)=>{
            confirmDelete("product",p.id);
        });

        //edit product
        actionEdit.addEventListener('click',(e)=>{
            let target = window.location.protocol+"//"+window.location.host+"/edit_product.html?pid="+p.id;
            window.location.href = target;
        })

        //item click
        itemList.addEventListener('click',(e)=>{
            let target = window.location.protocol+"//"+window.location.host+"/product_detail.html?pid="+p.id;
            window.location.href = target;
        })
    })
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

        const profile = document.createElement("img");
        itemList.classList.add("item-list");
        profile.src = rep.profile;
        profile.classList.add("item-image");
        area.textContent = rep.service_area;
        title.textContent = rep.first_name+" "+rep.last_name;
        title.classList.add("item-title");
        area.classList.add("item-focus");
        itemData.classList.add("item-data");
        itemData.appendChild(title);
        itemData.appendChild(area);
        itemList.appendChild(profile);
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

       
        actionDelete.addEventListener('click',(e)=>{
            confirmDelete("rep",rep.id);
        });

        //edit product
        actionEdit.addEventListener('click',(e)=>{
            let target = window.location.protocol+"//"+window.location.host+"/edit_rep.html?rid="+rep.id;
            window.location.href = target;
        });

         //item click
         itemList.addEventListener('click',(e)=>{
             e.preventDefault();
            let target = window.location.protocol+"//"+window.location.host+"/rep_detail.html?rid="+rep.id;
            window.location.href = target;
        });


    })
}

//generate random string id;
const randomId = (strength)=>{
    var result           = '';
    var characters       = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    for ( var i = 0; i < strength; i++ ) {
      result += characters.charAt(Math.floor(Math.random() * 
 characters.length));
   }
   return result;
}
//confirm delete
const confirmDelete = (itemType,itemId)=>{
    let message = "Are you sure you want to delete this "+itemType+"?";
    let return_page = "/dashboard.html";
    if(confirm(message)){
        switch(itemType){
            case "product":
                let products = db.products.filter(p=>{
                    return p.id !== itemId;
                });
                db.products = products;
                return_page = "/products.html";
                break;
            case "rep":
                let reps = db.reps.filter(p=>{
                    return p.id !== itemId;
                });
                db.reps = reps;
                return_page = "/reps.html";
                break;
            case "customer":
                let customers = db.customers.filter(p=>{
                    return p.id !== itemId;
                });
                db.customers = customers;
                return_page = "/customers.html";
                break;
            case "user":
                let users = db.users.filter(p=>{
                    return p.id !== itemId;
                });
                db.users = users;
                return_page = "/users.html";
                break;    
            case "supplier":
                let suppliers = db.suppliers.filter(p=>{
                    return p.id !== itemId;
                });
                db.suppliers = suppliers;
                return_page = "/suppliers.html";
                break;  
        }
        storage.setItem("db",JSON.stringify(db));
        window.location.pathname = return_page;

    }
    else{
        return;
    }
}


//update Rep
const updateRep = (rep)=>{
    var reps= db.reps.map(r=>{
        if(r.id === rep.id){
            r = rep;
        }
        return r;
    });
    
    var users = db.users.map(u=>{
        if(u.id === rep.id){
            u.password = rep.password;
        }
        return u;
    })
    db.reps = reps;
    db.users = users;
    storage.setItem('db',JSON.stringify(db));
    window.location.pathname="/reps.html";
}

//save Rep
const saveRep = (rep)=>{
    var reps= db.reps;
    rep.id = randomId(12);
    db.users.push({id:rep.id,email:rep.email,password:rep.password});
    delete rep.password;
    reps.push(rep);
    db.reps = reps;
    storage.setItem('db',JSON.stringify(db));
    window.location.pathname="/reps.html";
}
//save product
const saveProduct = (product)=>{
    var products = db.products;
    product.id = randomId(12);
    products.push(product);
    db.products = products;
    storage.setItem("db",JSON.stringify(db));
    window.location.pathname="/products.html";
}

//update product
const updateProduct = (product)=>{
    var products = db.products.map(p=>{
        if(p.id === product.id){
            p = product;
            
        }
        return p;
    })
    db.products = products;
    storage.setItem("db",JSON.stringify(db));
    window.location.pathname="/products.html";
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
           
           simulateLoad(1000,()=>{
               listReps(reps);
           });
        }
    }
}


//check if current page is products.html
if(window.location.pathname == "/products.html"){
    let login = checkLogin();
    if(login){
        let products = db.products;
        if(products.length === 0){
            simulateLoad(1000,()=>{
                window.location.pathname = "/add_product.html";
            });
            
        }
        else{
           
           simulateLoad(1000,()=>{
               listProducts(products);
           });
        }
    }
}


//check if current page is add reps
if(window.location.pathname == "/add_rep.html"){
    let login = checkLogin();
    if(login){
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
            
            let file = document.getElementById("profile_image").files[0];

            let fileData = null;
            let rep = {profile:fileData,first_name:fname,last_name:lname,email:email,phone:phone,service_area:service_area,password:password};
            
            if(file){
                let reader = new FileReader();
                reader.addEventListener('load',()=>{
                    fileData = reader.result;
                    rep.profile = fileData;
                    saveRep(rep);
                },false);
                reader.readAsDataURL(file);
            }
            else{
                console.log("no file");
                saveRep(rep);
            }

        })
    }
}
}

//check if current page is add products
if(window.location.pathname == "/add_product.html"){
    let login = checkLogin();
    if(login){
    const form = document.querySelector("#new_product_form");
    if(form){
        
        form.addEventListener('submit',(event)=>{
            event.preventDefault();
            let name = document.getElementById("name").value;
            let description = document.getElementById("description").value;
            let pack_size = document.getElementById("pack_size").value;
            let file = document.getElementById("image_file").files[0];

            let fileData = null;
            let prod = {name:name,description:description,pack_size:pack_size,image:fileData};
            if(file){
                let reader = new FileReader();
                reader.addEventListener('load',()=>{
                    fileData = reader.result;
                    prod.image = fileData;
                    saveProduct(prod);
                },false);
                reader.readAsDataURL(file);
            }
            else{
                console.log("no file");
                saveProduct(prod);
            }
           
        })
    }
}
}

//check if current page is edit product
if(window.location.pathname == "/edit_product.html"){
    let login = checkLogin();
    if(login){
    const urlObject = new URL(window.location.href);
    const params = urlObject.searchParams;
    let product = db.products.filter(p=>{
        return p.id === params.get("pid");
    });
    if(product.length == 0){
        window.location.pathname = "/not_found.html";
    }
    else{
        const form = document.querySelector("#edit_product_form");
        if(form){
            form.name.value = product[0].name;
            form.description.value = product[0].description;
            form.pack_size.value = product[0].pack_size;
            document.querySelector("#preview").src = product[0].image;
            form.addEventListener('submit',(event)=>{
                event.preventDefault();
                let name = document.getElementById("name").value;
                let description = document.getElementById("description").value;
                let pack_size = document.getElementById("pack_size").value;
                let file = document.getElementById("image_file").files[0];
                
                console.log("data: ",name+"/"+description+"/"+pack_size);
                let fileData = product[0].image;
                let prod = product[0];

                if(prod.name.toLowerCase() != name.toLowerCase()) prod.name = name;
                if(prod.description.toLowerCase() != description.toLowerCase()) prod.description = description;
                if(prod.pack_size != pack_size) prod.pack_size = pack_size;
                console.log("prod: ",prod);
                if(file){
                    let reader = new FileReader();
                    reader.addEventListener('load',()=>{
                        fileData = reader.result;
                        prod.image = fileData;
                       updateProduct(prod);
                    },false);
                    reader.readAsDataURL(file);
                }
                else{
                    console.log("no file");
                    updateProduct(prod);
                }
               
            })
        }
    }
    
}
}

//check if current page is prdoduct detail
if(window.location.pathname == "/product_detail.html"){
    let login = checkLogin();
    if(login){
    const urlObject = new URL(window.location.href);
    const params = urlObject.searchParams;
    let product = db.products.filter(p=>{
        return p.id === params.get("pid");
    });
    if(product.length == 0){
        window.location.pathname = "/not_found.html";
    }
    else{
                document.getElementById("product_name").textContent = product[0].name;
                document.getElementById("name").textContent = product[0].name;
                document.getElementById("description").textContent = product[0].description;
                document.getElementById("pack_size").textContent = product[0].pack_size;
                document.getElementById("preview").src = product[0].image;
                
        }
    }
}

//check if current page is rep detail
if(window.location.pathname == "/rep_detail.html"){
    let login = checkLogin();
    if(login){
    const urlObject = new URL(window.location.href);
    const params = urlObject.searchParams;
    console.log("reps: ",db.reps);
    console.log("rid: ",params.get("rid"));
    let rep = db.reps.filter(p=>{
        return p.id === params.get("rid");
    });
    if(rep.length == 0){
        window.location.pathname = "/not_found.html";
    }
    else{
                document.getElementById("rep_name").textContent = rep[0].first_name + " "+rep[0].last_name;
                document.getElementById("fname").textContent = rep[0].first_name;
                document.getElementById("lname").textContent = rep[0].last_name;
                document.getElementById("area").textContent = rep[0].service_area;
                document.getElementById("phone").textContent = rep[0].phone;
                document.getElementById("email").textContent = rep[0].email;
                document.getElementById("report_link").href = "rep_report.html?rid="+rep[0].id;
                document.getElementById("edit_link").href = "edit_rep.html?rid="+rep[0].id;
                document.getElementById("del_link").href = "edit_rep.html?rid="+rep[0].id;
                document.getElementById("preview").src = rep[0].profile;
                
        }
    }
}

//check if current page is edit rep
if(window.location.pathname == "/edit_rep.html"){
    let login = checkLogin();
    if(login){
    const urlObject = new URL(window.location.href);
    const params = urlObject.searchParams;
    let rep = db.reps.filter(p=>{
        return p.id === params.get("rid");
    });
    if(rep.length == 0){
        window.location.pathname = "/not_found.html";
    }
    else{
        const form = document.querySelector("#edit_rep_form");
        if(form){
            form.fname.value = rep[0].first_name;
            form.lname.value = rep[0].last_name;
            form.email.value = rep[0].email;
            form.phone.value = rep[0].phone;
            form.service_area.value = rep[0].service_area;
            document.querySelector("#preview").src = rep[0].profile;
            form.addEventListener('submit',(event)=>{
                event.preventDefault();
                let fname = document.getElementById("fname").value;
                let lname = document.getElementById("lname").value;
                let email = document.getElementById("email").value;
                let phone = document.getElementById("phone").value;
                let service_area = document.getElementById("service_area").value;
                let file = document.getElementById("profile_image").files[0];
                
                let fileData = rep[0].profile;
                let rp = rep[0];

                if(rp.first_name.toLowerCase() != fname.toLowerCase()) rp.first_name = fname;
                if(rp.last_name.toLowerCase() != lname.toLowerCase()) rp.last_name = lname;
                if(rp.email.toLowerCase() != email.toLowerCase()) rp.email = email;
                if(rp.phone != phone) rp.phone = phone;
                if(rp.service_area.toLowerCase() != service_area.toLowerCase()) rp.service_area = service_area;
                console.log("prod: ",rp);
                if(file){
                    let reader = new FileReader();
                    reader.addEventListener('load',()=>{
                        fileData = reader.result;
                        prod.image = fileData;
                       updateRep(rp);
                    },false);
                    reader.readAsDataURL(file);
                }
                else{
                    console.log("no file");
                    updateRep(rp);
                }
               
            })
        }
    }
    
}
}