
const storage = window.localStorage;
const session = window.sessionStorage;

const signout = ()=>{
    if(confirm("Are you sure you want to sign out?")){
        window.localStorage.clear();
        session.clear();
        var urlObj = new URL(window.location.href);
        Array.from(urlObj.searchParams.keys()).forEach(key=>urlObj.searchParams.delete(key));
       for(let i=0;i<window.history.length;i++) {
           window.history.pushState({},{title:"Signout",url:"/"})
        //    window.location.replace("/");
       }
       window.location.replace("/");
    }
    
}
const countryList = [
    "Afghanistan",
    "Åland Islands",
    "Albania",
    "Algeria",
    "American Samoa",
    "Andorra",
    "Angola",
    "Anguilla",
    "Antarctica",
    "Antigua and Barbuda",
    "Argentina",
    "Armenia",
    "Aruba",
    "Australia",
    "Austria",
    "Azerbaijan",
    "Bahamas (the)",
    "Bahrain",
    "Bangladesh",
    "Barbados",
    "Belarus",
    "Belgium",
    "Belize",
    "Benin",
    "Bermuda",
    "Bhutan",
    "Bolivia (Plurinational State of)",
    "Bonaire, Sint Eustatius and Saba",
    "Bosnia and Herzegovina",
    "Botswana",
    "Bouvet Island",
    "Brazil",
    "British Indian Ocean Territory (the)",
    "Brunei Darussalam",
    "Bulgaria",
    "Burkina Faso",
    "Burundi",
    "Cabo Verde",
    "Cambodia",
    "Cameroon",
    "Canada",
    "Cayman Islands (the)",
    "Central African Republic (the)",
    "Chad",
    "Chile",
    "China",
    "Christmas Island",
    "Cocos (Keeling) Islands (the)",
    "Colombia",
    "Comoros (the)",
    "Congo (the Democratic Republic of the)",
    "Congo (the)",
    "Cook Islands (the)",
    "Costa Rica",
    "Croatia",
    "Cuba",
    "Curaçao",
    "Cyprus",
    "Czechia",
    "Côte d'Ivoire",
    "Denmark",
    "Djibouti",
    "Dominica",
    "Dominican Republic (the)",
    "Ecuador",
    "Egypt",
    "El Salvador",
    "Equatorial Guinea",
    "Eritrea",
    "Estonia",
    "Eswatini",
    "Ethiopia",
    "Falkland Islands (the) [Malvinas]",
    "Faroe Islands (the)",
    "Fiji",
    "Finland",
    "France",
    "French Guiana",
    "French Polynesia",
    "French Southern Territories (the)",
    "Gabon",
    "Gambia (the)",
    "Georgia",
    "Germany",
    "Ghana",
    "Gibraltar",
    "Greece",
    "Greenland",
    "Grenada",
    "Guadeloupe",
    "Guam",
    "Guatemala",
    "Guernsey",
    "Guinea",
    "Guinea-Bissau",
    "Guyana",
    "Haiti",
    "Heard Island and McDonald Islands",
    "Holy See (the)",
    "Honduras",
    "Hong Kong",
    "Hungary",
    "Iceland",
    "India",
    "Indonesia",
    "Iran (Islamic Republic of)",
    "Iraq",
    "Ireland",
    "Isle of Man",
    "Israel",
    "Italy",
    "Jamaica",
    "Japan",
    "Jersey",
    "Jordan",
    "Kazakhstan",
    "Kenya",
    "Kiribati",
    "Korea (the Democratic People's Republic of)",
    "Korea (the Republic of)",
    "Kuwait",
    "Kyrgyzstan",
    "Lao People's Democratic Republic (the)",
    "Latvia",
    "Lebanon",
    "Lesotho",
    "Liberia",
    "Libya",
    "Liechtenstein",
    "Lithuania",
    "Luxembourg",
    "Macao",
    "Madagascar",
    "Malawi",
    "Malaysia",
    "Maldives",
    "Mali",
    "Malta",
    "Marshall Islands (the)",
    "Martinique",
    "Mauritania",
    "Mauritius",
    "Mayotte",
    "Mexico",
    "Micronesia (Federated States of)",
    "Moldova (the Republic of)",
    "Monaco",
    "Mongolia",
    "Montenegro",
    "Montserrat",
    "Morocco",
    "Mozambique",
    "Myanmar",
    "Namibia",
    "Nauru",
    "Nepal",
    "Netherlands (the)",
    "New Caledonia",
    "New Zealand",
    "Nicaragua",
    "Niger (the)",
    "Nigeria",
    "Niue",
    "Norfolk Island",
    "Northern Mariana Islands (the)",
    "Norway",
    "Oman",
    "Pakistan",
    "Palau",
    "Palestine, State of",
    "Panama",
    "Papua New Guinea",
    "Paraguay",
    "Peru",
    "Philippines (the)",
    "Pitcairn",
    "Poland",
    "Portugal",
    "Puerto Rico",
    "Qatar",
    "Republic of North Macedonia",
    "Romania",
    "Russian Federation (the)",
    "Rwanda",
    "Réunion",
    "Saint Barthélemy",
    "Saint Helena, Ascension and Tristan da Cunha",
    "Saint Kitts and Nevis",
    "Saint Lucia",
    "Saint Martin (French part)",
    "Saint Pierre and Miquelon",
    "Saint Vincent and the Grenadines",
    "Samoa",
    "San Marino",
    "Sao Tome and Principe",
    "Saudi Arabia",
    "Senegal",
    "Serbia",
    "Seychelles",
    "Sierra Leone",
    "Singapore",
    "Sint Maarten (Dutch part)",
    "Slovakia",
    "Slovenia",
    "Solomon Islands",
    "Somalia",
    "South Africa",
    "South Georgia and the South Sandwich Islands",
    "South Sudan",
    "Spain",
    "Sri Lanka",
    "Sudan (the)",
    "Suriname",
    "Svalbard and Jan Mayen",
    "Sweden",
    "Switzerland",
    "Syrian Arab Republic",
    "Taiwan (Province of China)",
    "Tajikistan",
    "Tanzania, United Republic of",
    "Thailand",
    "Timor-Leste",
    "Togo",
    "Tokelau",
    "Tonga",
    "Trinidad and Tobago",
    "Tunisia",
    "Turkey",
    "Turkmenistan",
    "Turks and Caicos Islands (the)",
    "Tuvalu",
    "Uganda",
    "Ukraine",
    "United Arab Emirates (the)",
    "United Kingdom of Great Britain and Northern Ireland (the)",
    "United States Minor Outlying Islands (the)",
    "United States of America (the)",
    "Uruguay",
    "Uzbekistan",
    "Vanuatu",
    "Venezuela (Bolivarian Republic of)",
    "Viet Nam",
    "Virgin Islands (British)",
    "Virgin Islands (U.S.)",
    "Wallis and Futuna",
    "Western Sahara",
    "Yemen",
    "Zambia",
    "Zimbabwe"
  ];
const DATA_COUNT = 12;
const NUMBER_CFG = {count: DATA_COUNT, min: 0, max: 100};
let db = storage.getItem("db");
if(db === undefined || db === null){
    let data = {products:[],users:[],transactions:[],customers:[],reps:[],issues:[]};
    storage.setItem("db",JSON.stringify(data));
    db = storage.getItem("db");
}
db = JSON.parse(db);
var mySession = JSON.parse(session.getItem("session"));
if(db.products === undefined){
    db.products = [];
    storage.setItem("db",JSON.stringify(db));
    db = JSON.parse(storage.getItem("db"));
}
if(db.customers === undefined){
    db.customers = [];
    storage.setItem("db",JSON.stringify(db));
    db = JSON.parse(storage.getItem("db"));
}

if(db.users === undefined){
    db.users = [];
    storage.setItem("db",JSON.stringify(db));
    db = JSON.parse(storage.getItem("db"));
}
if(db.transactions === undefined){
    db.transactions = [];
    storage.setItem("db",JSON.stringify(db));
    db = JSON.parse(storage.getItem("db"));
}
if(db.issues === undefined){
    db.issues = [];
    storage.setItem("db",JSON.stringify(db));
    db = JSON.parse(storage.getItem("db"));
}

//Functions start
const thousandSeparator =(x)=> {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}
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
const showHideSpinner=(flag)=>{
    if(flag ==0) document.querySelector('#spinner').classList.add("hidden");
    else  document.querySelector('#spinner').classList.remove("hidden");
}
//simulate page load
const simulateLoad =(waitTime,followFunction)=>{
    setTimeout(()=>{
        document.querySelector('#spinner').style.display = 'none';
        followFunction();
    },waitTime);
}
const generateRandomData = (count)=>{
    var result = [];
    for(let i=0; i<count;i++){
        let random = Math.floor(Math.random() * (NUMBER_CFG.max - NUMBER_CFG.min + 1)) + NUMBER_CFG.min;
        result.push(random);
    }
    return result;
}
const generateChart = ()=>{
    let chartArea = document.getElementById("chart-area");
    while(chartArea.hasChildNodes()){
        chartArea.removeChild(chartArea.childNodes[0]);
    }
    const canvas = document.createElement("canvas");
    // canvas.getContext("2d");
    chartArea.appendChild(canvas);
    
    const labels = ["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"];
    let data = {
        labels: labels,
        datasets: [
            {
            label: 'Sales',
            data: generateRandomData(NUMBER_CFG.count),
            borderColor: "#cc9900",
            backgroundColor: "#045e13",
            },
            
        ]
    }
    let config = {
        type: 'line',   
        data: data,
        options: {
          responsive: true,
          plugins: {
        
            title: {
              display: true,
              text: 'Annual Sales'
            }
          }
        },
    }
    return new Chart(config,canvas);
    
}


//check login 
const checkLogin = ()=>{
    let u = mySession;
    if(u === undefined || u === null){
        window.location.pathname = "/index.html";
        return false;        
    }
    else{
        // let user = JSON.parse(u);
        document.querySelector("#login").textContent = u.fname;
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


//show summary
const showInventorySummary = ()=>{
    const summaryContainer = document.querySelector("#summary");
    let products = db.products;
    let inventories = db.inventory;
    if(products.length == 0 || inventories.length ==0){
        const p = document.createElement("p");
        p.textContent = "No data";
        summaryContainer.appendChild(p);
    }
    else{
        if(db.issues.length > 0){
            inventories = db.inventory.map(inv=>{
                let invNew = inv;
                db.issues.forEach(tx=>{
                    if(tx.invoice_no === inv.invoice_no && inv.product.id == tx.product.id){
                        invNew.quantity -= tx.quantity;
                    }
                });
                return invNew;
            })
        }
       
        inventories.forEach(inventory=>{
            const holder = document.createElement("DIV");
            holder.classList.add("my-2");
            const pname = document.createElement("label");
            pname.textContent = inventory.product.name+", "+inventory.product.pack_size;
            const inv = document.createElement("a");
            inv.id="invoice";
            inv.href="view.html?id="+inventory.id;
            inv.target='_blank';
            inv.textContent = "Inv. No: "+inventory.invoice_no;
            const qtty = document.createElement("span");
            qtty.id="quantity";
            qtty.textContent = inventory.quantity+" cartons, Tsh."+thousandSeparator(inventory.quantity * inventory.selling_price);
            holder.appendChild(pname);
            holder.appendChild(inv);
            holder.appendChild(qtty);
            summaryContainer.appendChild(holder);
        })
        
       
    }
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
    let return_page ="/sp/";
    var userId =mySession.uid;
    var options = {
        body:JSON.stringify({type:itemType,user_id:userId,id:itemId,btnDelete:"delete"}),
        method:"POST",headers:{'Content-type':'application/json'}
    }
    if(confirm(message)){
        switch(itemType){
            case "product":
                fetch("/backend/",options)
                .then(res=>res.json())
                .then(result=>{
                    console.log("results:",result);
                    db.products = result.products;
                    return_page = "/products.html";
                    showFeedback(result.code,result.msg);
                })
                .catch(e=>{
                    console.log("results:",e);
                    showFeedback(1,e);
                })
                
                break;
            case "rep":
                fetch("/backend/",options)
                .then(res=>res.json())
                .then(result=>{
                    console.log("results:",result);
                    db.reps = result.reps;
                    return_page = "/reps.html";
                    storage.setItem("db",JSON.stringify(db));
                    // window.location.pathname = return_page;
                    showFeedback(result.code,result.msg);
                })
                .catch(e=>{
                    console.log("results:",e);
                    showFeedback(1,e);
                })
                
                break;
            case "customer":
                fetch("/backend/",options)
                .then(res=>res.json())
                .then(result=>{
                    console.log("results:",result);
                    db.customers = result.customers;
                    return_page = "/sp/customers.html";
                    storage.setItem("db",JSON.stringify(db));
                    // window.location.pathname = return_page;
                    showFeedback(result.code,result.msg);
                })
                .catch(e=>{
                    console.log("results:",e);
                    showFeedback(1,e);
                })
                
                break;
            case "user":
                let users = db.users.filter(p=>{
                    return p.id !== itemId;
                });
                db.users = users;
                return_page = "/users.html";
                break;    
            case "supplier":
                fetch("/backend/",options)
                .then(res=>res.json())
                .then(result=>{
                    console.log("results:",result);
                    db.suppliers = result.suppliers;
                    return_page = "/suppliers.html";
                    storage.setItem("db",JSON.stringify(db));
                    showFeedback(result.code,result.msg);
                })
                .catch(e=>{
                    console.log("results:",e);
                    showFeedback(1,e);
                })
                
                break;  
        }
        // storage.setItem("db",JSON.stringify(db));
        window.location.pathname = return_page;

    }
    else{
        return;
    }
}

//save transaction
const saveIssue=(issue)=>{
    var formData = new FormData();
    formData.append("product",issue.product);
    formData.append("rep",issue.rep);
    formData.append("invoice_no",issue.invoice_no);
    formData.append("quantity",issue.quantity);
    formData.append("amount",issue.amount);
    formData.append("admin",issue.admin);
    formData.append("btnIssueInventory","IssueInventory");
   
    
    var options = {
        method:"POST",
        body:formData,
        
    }
    fetch("/backend/?tag=issues",options)
    .then(res=>res.json())
    .then(result=>{
        console.log("result: ",result);
        if(result.code == 0){
            db.issues = result.issues;
            storage.setItem("db",JSON.stringify(db));
            window.location.pathname="/inventory.html";
        }
        else showFeedback(result.code,result.msg);
        
    })
    .catch(err=>{
        console.log("err: ",err);
        showFeedback(1,"Something went wrong! Please try again later");
    })
}
//save transaction
const saveTransaction=(transaction)=>{
    var formData = new FormData();
    formData.append("product",transaction.product);
    formData.append("rep",transaction.rep);
    formData.append("invoice_no",transaction.invoice_no);
    formData.append("quantity",transaction.quantity);
    formData.append("cost",transaction.amount);
    formData.append("customer",transaction.customer);
    formData.append("price",transaction.price);
    formData.append("type",transaction.type);
    if(transaction.file) formData.append("file",transaction.file);
    formData.append("btnTransaction","transaction");
   
    
    var options = {
        method:"POST",
        body:formData,
        
    }
    fetch("/backend/?tag=transaction",options)
    .then(res=>res.json())
    .then(result=>{
        console.log("result: ",result);
        if(result.code == 0){
            db.transactions = result.transactions;
            storage.setItem("db",JSON.stringify(db));
            window.location.pathname="/sp/";
        }
        else showFeedback(result.code,result.msg);
        
    })
    .catch(err=>{
        console.log("err: ",err);
        showFeedback(1,"Something went wrong! Please try again later");
    })
}
//save inventory
const saveInventory = (inv,option=null)=>{
    
    var formData = new FormData();
    if(option == null){
        formData.append("product",inv.product);
        formData.append("supplier",inv.supplier);
        formData.append("invoice_no",inv.invoice_no);
        formData.append("invoice",inv.invoice);
        formData.append("cif",inv.cif);
        formData.append("clearing",inv.clearing);
        formData.append("tpri",inv.tpri);
        formData.append("quantity",inv.quantity);
        formData.append("selling_price",inv.selling_price);
        formData.append("buying_price",inv.buying_price);
        formData.append("admin",inv.admin);
        formData.append("btnReceiveInventory","ReceiveInventory");
    }
    else{
        Object.keys(supplier).forEach((key,i)=>{
            formData.append(key,Object.values(inv)[i]);
        });
        formData.append("id",inv.id);
        formData.append("btnUpdateInventory","updateInventory");
    }
    
    var options = {
        method:"POST",
        body:formData,
        
    }
    fetch("/backend/?tag=inventory",options)
    .then(res=>res.json())
    .then(result=>{
        console.log("result: ",result);
        if(result.code == 0){
            db.inventory = result.inventory;
            storage.setItem("db",JSON.stringify(db));
            window.location.pathname="/inventory.html";
        }
        else showFeedback(result.code,result.msg);
        
    })
    .catch(err=>{
        console.log("err: ",err);
        showFeedback(1,"Something went wrong! Please try again later");
    })
}
//update supplier
const updateSupplier = (supplier)=>{
    var suppliers= db.suppliers.map(s=>{
        if(s.id === supplier.id){
            s = supplier;
        }
        return s;
    });
    

    db.suppliers = suppliers;
    storage.setItem('db',JSON.stringify(db));
    window.location.pathname="/suppliers.html";
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

//save Supplier
const saveSupplier = (supplier,option=null)=>{
   
    var formData = new FormData();
    if(option == null){
        formData.append("name",supplier.name);
        formData.append("country",supplier.country);
        formData.append("phone",supplier.phone);
        formData.append("email",supplier.email);
        formData.append("address",supplier.address);
        formData.append("contact",supplier.contact);
        formData.append("admin",supplier.admin);
        formData.append("btnAddSupplier","addSupplier");
    }
    else{
        Object.keys(supplier).forEach((key,i)=>{
            formData.append(key,Object.values(supplier)[i]);
        });
        formData.append("id",supplier.id);
        formData.append("btnUpdateSupplier","updateSupplier");
    }
    
    var options = {
        method:"POST",
        body:formData,
        
    }
    fetch("/backend/?tag=supplier",options)
    .then(res=>res.json())
    .then(result=>{
        console.log("result: ",result);
        if(result.code == 0){
            db.suppliers = result.suppliers;
            storage.setItem("db",JSON.stringify(db));
            window.location.pathname="/suppliers.html";
        }
        else showFeedback(result.code,result.msg);
        
    })
    .catch(err=>{
        console.log("err: ",err);
        showFeedback(1,"Something went wrong! Please try again later");
    })
}

//save Rep
const saveCustomer = (customer,option=null)=>{
    console.log("prods: ",customer);
    var formData = new FormData();
    if(option == null){
        formData.append("name",customer.name);
        formData.append("address",customer.address);
        formData.append("email",customer.email);
        formData.append("phone",customer.phone);
        formData.append("rep",customer.rep);
        formData.append("btnAddCustomer","addCustomer");
    }
    else{
        Object.keys(customer).forEach((key,i)=>{
            // if(key == "avatar") formData.append("'"+key+"'",Object.values(rep))
            formData.append(key,Object.values(customer)[i])
        })
        formData.append("btnUpdateCustomer","updateCustomer");
    }
    console.log("formdata: ",formData);
    var options = {
        method:"POST",
        body:formData,
        
    }
    fetch("/backend/?tag=customer",options)
    .then(res=>res.json())
    .then(result=>{
        console.log("result: ",result);
        if(result.code == 0){
            db.customers = result.customers;
            storage.setItem("db",JSON.stringify(db));
            showFeedback(result.code,result.msg);
            window.location.pathname = "/sp/customers.html";
        }
        else showFeedback(result.code,result.msg);
        
    })
    .catch(err=>{
        console.log("err: ",err);
        showFeedback(1,"Something went wrong! Please try again later");
    })
}
//save product
const saveProduct = (product,tag=null)=>{
    console.log("prods: ",product);
    var formData = new FormData();
    formData.append("name",product.name);
    formData.append("description",product.description);
    formData.append("pack_size",product.pack_size);
    formData.append("user_id",product.user_id);
    if(product.image) formData.append("image",product.image);
    if(tag == null || tag.toLowerCase() == "add"){
        formData.append("btnAddProduct","addProduct");
    }
    else{
        formData.append("id",product.id);
        formData.append("user_id",product.user_id);
        formData.append("btnUpdateProduct","updateProduct");
    }
    // console.log("formdata: ",JSON.stringify(formData));
    var options = {
        method:"POST",
        body:formData,
        
    }
    fetch("/backend/?tag=product",options)
    .then(res=>res.json())
    .then(result=>{
        console.log("result: ",result);
        if(result.code == 0){
            db.products = result.products;
            storage.setItem("db",JSON.stringify(db));
            window.location.pathname="/products.html";
        }
        else showFeedback(result.code,result.msg);
        
    })
    .catch(err=>{
        console.log("err: ",err);
        showFeedback(1,"Something went wrong! Please try again later");
    })
}
//show feedback
const showFeedback = (tag,msg)=>{
    var holder = document.getElementById("form-feedback");
    holder.classList.remove("hidden");
    if(tag == 0) holder.classList.add("alert-success");
    else holder.classList.add("alert-danger");
    holder.textContent = msg;
}
//update product
const updateProduct = (products)=>{
    db.products = products;
    storage.setItem("db",JSON.stringify(db));
    window.location.pathname="/products.html";
}


//load reps listCustomers
const listCustomers = (customers)=>{
    const listContainer = document.querySelector("#list_container");
    customers.forEach(customer=>{
        const itemList = document.createElement("div");
        const itemData = document.createElement("div");
        const itemActions = document.createElement("div");
        const title = document.createElement("span");
        const address = document.createElement("span");
        const actionEdit = document.createElement("span");
        const actionDelete = document.createElement("span");

        address.textContent = customer.address+", "+customer.phone;
        title.textContent = customer.name;
        title.classList.add("item-title");
        address.classList.add("item-focus");
        itemData.classList.add("item-data");
        itemData.appendChild(title);
        itemData.appendChild(address);
        itemList.appendChild(itemData);
        itemList.classList.add("item-list");
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
            confirmDelete("customer",customer.id);
        });

        //edit product
        actionEdit.addEventListener('click',(e)=>{
            let target = window.location.protocol+"//"+window.location.host+"/sp/edit_customer.html?cid="+customer.id;
            window.location.href = target;
        });

         //item click
         itemData.addEventListener('click',(e)=>{
             e.preventDefault();
            let target = window.location.protocol+"//"+window.location.host+"/sp/customer_detail.html?cid="+customer.id;
            window.location.href = target;
        });


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
        let user = {email:email,password:pword,btnLogin:"login"};
        var options = {
            body:JSON.stringify(user),
            method:"POST",headers:{'Content-type':'application/json'}
        }
        fetch("/backend/",options)
        .then(res=>res.json())
        .then(result=>{
            if(result.code == 1){
                var feedback = document.querySelector("#feedback");
                feedback.textContent = result.msg;
                feedback.classList.remove("hidden");
            }
            else{
                session.setItem("session",JSON.stringify(result.user));
                window.location.pathname = (result.user.level == 0) ? "/dashboard.html" :"/sp/";
            }
        })
        .catch(e=>{
            console.log(e);
            var feedback = document.querySelector("#feedback");
                feedback.textContent = "Something went wrong";
                feedback.classList.remove("hidden");
        })
        
    })
}

//process signup form
const signupForm = document.querySelector("#signupform");
if(signupForm){
    let inputs = Array.from(signupForm.elements);
    let fname = inputs[0];
    let lname = inputs[1];
    let email = inputs[2];
    let pword = inputs[3];
    let cpword = inputs[4];
    const err = document.querySelector("#error");
    cpword.addEventListener('input',(e)=>{
        if(e.target.value !== pword.value){
            err.textContent = "Passwords do not match";
            err.classList.remove("hidden");
        }
        else{
            err.textContent = "";
            err.classList.add("hidden");
        }
    })
    signupForm.addEventListener("submit",(event)=>{
        event.preventDefault();
        let data = {btnSignup:"signup",fname:fname.value,lname:lname.value,email:email.value,password:pword.value}
        var options = {
            body:JSON.stringify(data),
            method:"POST",headers:{'Content-type':'application/json'}
        }
        fetch("/backend/",options)
        .then(res=>res.json())
        .then(result=>{
            if(result.code == 1){
                var feedback = document.querySelector("#feedback");
                feedback.textContent = result.msg;
                feedback.classList.remove("hidden");
            }
            else{
                console.log("result: ",result);
                session.setItem("session",JSON.stringify(result.user));
                window.location.pathname = "/dashboard.html";
            }
        })
        .catch(e=>{
            console.log(e);
        })
    })
}


//check if dashboard is loaded
if(window.location.pathname == "/sp/"){
  var login = checkLogin();
  if(login){
    var userId = mySession.uid;
    fetch("/backend/?tag=products&uid="+userId,{
        method:"GET"
    }).then(res=>res.json())
    .then(result=>{
        let products = result.products;
        console.log("result: ",result);
        db.products = products;
        storage.setItem("db",JSON.stringify(db));
        db = JSON.parse(storage.getItem("db"));
    }).catch(e=>{console.log(e)});
    
    fetch("/backend/?tag=issues&uid="+userId,{
        method:"GET"
    }).then(res=>res.json())
    .then(result=>{
        console.log("rs: ",result);
        db.issues = result.issues;
        storage.setItem("db",JSON.stringify(db));
        db = JSON.parse(storage.getItem("db"));
        
    }).catch(e=>{console.log(e)})
    
    fetch("/backend/?tag=transactions&uid="+mySession.id,{
        method:"GET"
    }).then(res=>res.json())
    .then(result=>{
        console.log("result: ",result);
        db.transactions = result.transactions;
        storage.setItem("db",JSON.stringify(db));
        db = JSON.parse(storage.getItem("db"));
        
    }).catch(e=>{console.log(e)})

    fetch("/backend/?tag=customers&uid="+userId,{
        method:"GET"
    }).then(res=>res.json())
    .then(result=>{
        console.log("result: ",result);
        db.customers = result.customers;
        storage.setItem("db",JSON.stringify(db));
        db = JSON.parse(storage.getItem("db"));
        
    }).catch(e=>{console.log(e)})
  }
}

//check if current page eis "sales page"
if(window.location.pathname == "/sp/sale.html"){
    let login = checkLogin();
    if(login){
        var quantityEl = document.getElementById("quantity");
        var invoiceEl = document.getElementById("invoice");
        var priceEl = document.getElementById("price");
        var amountEl = document.getElementById("amount");
        var myCustomers = db.customers.filter(c=>c.rep == mySession.uid);
        const customerEl = document.getElementById("customer");
        Array.from(customerEl.children).forEach((c,i)=>{
            if(i>0) customerEl.removeChild(c);
        });
        myCustomers.forEach(c=>{
            customerEl.options.add(new Option(c.name,c.id));
        })

        var myProducts = db.products.filter(p=>p.user == mySession.admin);
        const productEl = document.getElementById("product");
        Array.from(productEl.children).forEach((c,i)=>{
            if(i>0) productEl.removeChild(c);
        });
        myProducts = myProducts.filter(p=>{
            var nP = p;
            nP.invoices = [];
            db.issues.forEach(i=>{
                if(i.product.id == p.id){
                    if(nP.invoices.includes(i.invoice_no)) {
                        console.log("gotcha: ",nP.quantity);
                        nP.quantity += parseInt(i.quantity);
                    }
                    else {
                        nP.quantity = parseInt(i.quantity);
                        nP.invoices.push(i.invoice_no);
                    }
                       
                }
            })
            db.transactions.forEach(t=>{
                if(t.product == p.id && nP.invoices.includes(t.invoice_no)){
                   nP.quantity -= parseInt(t.quantity);
                   
                }
            })
            return nP;
            
        })
        console.log("P: ",myProducts);
        myProducts.forEach(p=>{
            productEl.options.add(new Option(p.name+" ("+p.pack_size+")",p.id));
        });
        productEl.addEventListener("change",(e)=>{
            let val = e.target.value;
            let prod = myProducts.filter(p=>p.id == val)[0];
            quantityEl.value = prod.quantity;
            quantityEl.setAttribute("max",prod.quantity);

            Array.from(invoiceEl.children).forEach(c=>invoiceEl.removeChild(c));
            prod.invoices.forEach(inv=>{
                invoiceEl.options.add(new Option(inv));
            });
            let myIssue = db.issues.filter(i=>i.invoice_no == invoiceEl.value);
                console.log("mi: ",myIssue);
                priceEl.value = myIssue[0].price;
                amountEl.value = thousandSeparator(myIssue[0].price * quantityEl.value);
            invoiceEl.addEventListener("change",(e)=>{
                let ivNo = e.target.value;
                let myIssue = db.issues.filter(i=>i.invoice_no == ivNo);
                console.log("mi: ",myIssue);
                priceEl.value = myIssue[0].price;
                amountEl.value = thousandSeparator(myIssue[0].price * quantityEl.value);
            })
        });

        quantityEl.addEventListener("input",(e)=>{
            let qt = parseInt(e.target.value);
            amountEl.value = thousandSeparator(qt * priceEl.value);
        })
        priceEl.addEventListener("input",(e)=>{
            let price = parseFloat(e.target.value);
            amountEl.value = thousandSeparator(price * quantityEl.value);
        });
        const fileInput = document.getElementById("document_file");
        const form = document.getElementById("sale_form");
        if(form){
            form.addEventListener("submit",(e)=>{
                e.preventDefault();
                let type = parseInt(form.transaction_type.value);
                let customer = form.customer.value;
                let product = form.product.value;
                let invoice = form.invoice.value;
                let quantity = parseInt(form.quantity.value);
                let price = form.price.value;
                let amount = price * quantity;

                let transaction = {type:type,customer:customer,product:product,invoice_no:invoice,quantity:quantity,price:price,amount:amount};
                transaction.rep = mySession.id;
                if(fileInput.files[0]){
                    transaction.file = fileInput.files[0];
                }
                saveTransaction(transaction);
            })
        }
    }
}
//check if current page is customers.html
if(window.location.pathname == "/sp/customers.html"){
    let login = checkLogin();
    if(login){
        var userId = mySession.uid;
        fetch("/backend/?tag=customers&uid="+userId,{
            method:"GET"
        }).then(res=>res.json())
        .then(result=>{
            console.log("result: ",result);
            db.customers = result.customers;
            storage.setItem("db",JSON.stringify(db));
            db = JSON.parse(storage.getItem("db"));
            if(db.customers.length === 0){
                simulateLoad(1000,()=>{
                    window.location.pathname = "/sp/add_customer.html";
                });
            }
            
        }).catch(e=>{console.log(e)})
        .finally(()=>{
            showHideSpinner(0);
            listCustomers(db.customers);
        })
    }
}

//check if current page is products.html
if(window.location.pathname == "/products.html"){
    let login = checkLogin();
    if(login){
        showHideSpinner(1);
        var userId = mySession.uid;
        fetch("/backend/?tag=products&uid="+userId,{
            method:"GET"
        }).then(res=>res.json())
        .then(result=>{
            let products = result.products;
            console.log("result: ",result);
            db.products = products;
            storage.setItem("db",JSON.stringify(db));
            db = JSON.parse(storage.getItem("db"));
            if(products.length === 0){
                simulateLoad(1000,()=>{
                    window.location.pathname = "/add_product.html";
                });
            }
            
        }).catch(e=>{console.log(e)})
        .finally(()=>{
            showHideSpinner(0);
            listProducts(db.products);
        })
        
    }
}



//check if current page is issue.html
if(window.location.pathname == "/issue.html"){
    let login = checkLogin();
    if(login){
    const form = document.querySelector("#issue_form");
    if(form){
        if(db.reps.length ==0 ){
            if(confirm("There are no reps to issue to. Please register a sales rep")){
                window.location.pathname = "/add_rep.html";
            }
        }
        else if(db.products.length == 0){
            if(confirm("There are no products. Please register a product")){
                window.location.pathname = "/add_product.html";
            }
            
        }
        else{
            let products = [];
            db.inventory.forEach(inv=>{
                if(!products.includes(inv.product.id)) products.push(inv.product);
            })
            products.sort((p1,p2)=>{
                if(p1.name < p2.name) return -1; else return 1
            })
            products.forEach(p=>{
                form.product.options.add(new Option(p.name+" ("+p.pack_size+")",p.id));
            });
        
            let inventory = db.inventory.filter(inv=>{
                return inv.product.id == products[0].id;
            });
            form.invoice.options.add(new Option(inventory[0].invoice_no));
            form.quantity.setAttribute("max",inventory[0].quantity);
            form.product.addEventListener('change',(e)=>{
                let pd = products.filter(p=>{
                    return p.id === e.target.value;
                });
                let inventory = db.inventory.filter(inv=>{
                    return inv.product.id == pd[0].id;
                });
                while(form.invoice.hasChildNodes()){
                    form.invoice.removeChild(form.invoice.childNodes[0]);
                }
                inventory.forEach(inv=>{
                    form.invoice.options.add(new Option(inv.invoice_no));
                })
            });
            form.invoice.addEventListener('change',(e)=>{
                let inventory = db.inventory.filter(inv=>{
                    return inv.invoice_no == e.target.value;
                });
                form.quantity.setAttribute("max",inventory[0].quantity);
            })
            form.quantity.addEventListener('change',(e)=>{
                let quantity = parseInt(e.target.value);
                
            });
            db.reps.forEach(rep=>{
                form.rep.options.add(new Option(rep.fname+" "+rep.lname,rep.id));
            })
        
        
        form.addEventListener('submit',(e)=>{
            e.preventDefault();
            let productId = form.product.options[form.product.options.selectedIndex].value;
            let repId = form.rep.options[form.rep.options.selectedIndex].value;
            let repName = form.rep.options[form.rep.options.selectedIndex].text;
            let product = db.products.filter(p=>{
                return p.id === productId;
            });
            let rep = db.reps.filter(s=>{
                return s.id === repId;
            })
            let quantity = parseInt(form.quantity.value);
            let invoice_no = form.invoice.options[form.invoice.options.selectedIndex].value;
            let inv = db.inventory.filter(inv=>{
                return inv.invoice_no == invoice_no && inv.product.id == productId;
            });
            let amount = inv[0].selling_price * quantity;
            let issue = {rep:repId,rep_name:repName,product:productId,invoice_no:invoice_no,quantity:quantity,amount:amount};
            let userId = mySession.uid;
            issue.admin = userId;
            saveIssue(issue);
        })
    }
}
    }
}

//check if current page is add reps
if(window.location.pathname == "/sp/add_customer.html"){
    let login = checkLogin();
    if(login){
    const form = document.querySelector("#new_customer_form");
    if(form){
        form.addEventListener('submit',(event)=>{
            event.preventDefault();
            let name = document.getElementById("name").value;
            let address = document.getElementById("address").value;
            let phone = document.getElementById("phone").value;
            let email = document.getElementById("email").value;
            
            let user_id = mySession.uid;
            let customer = {name:name,address:address,email:email,phone:phone,rep:user_id};
            saveCustomer(customer);

        })
    }
}
}


//check if current page is rep detail
if(window.location.pathname == "/sp/customer_detail.html"){
    let login = checkLogin();
    if(login){
    const urlObject = new URL(window.location.href);
    const params = urlObject.searchParams;
    let customer = db.customers.filter(p=>{
        return p.id === params.get("cid");
    });
    if(customer.length == 0){
        window.location.pathname = "/sp/not_found.html";
    }
    else{
                document.getElementById("customer_name").textContent = customer[0].name;
                document.getElementById("name").textContent = customer[0].name;
                document.getElementById("address").textContent = customer[0].address;
                document.getElementById("phone").textContent = customer[0].phone;
                document.getElementById("email").textContent = customer[0].email;
                document.getElementById("report_link").href = "customer_report.html?cid="+customer[0].id;
                // document.getElementById("preview").src = "/data/"+rep[0].avatar;
                
        }
    }
}
//check if current page is supplier detail
if(window.location.pathname == "/supplier_detail.html"){
    let login = checkLogin();
    if(login){
    const urlObject = new URL(window.location.href);
    const params = urlObject.searchParams;
    
    let supplier = db.suppliers.filter(p=>{
        return p.id === params.get("sid");
    });
    if(supplier.length == 0){
        window.location.pathname = "/not_found.html";
    }
    else{
                document.getElementById("rep_name").textContent = supplier[0].name;
                document.getElementById("name").textContent = supplier[0].name;
                document.getElementById("country").textContent = supplier[0].country;
                document.getElementById("contact").textContent = supplier[0].contact;
                document.getElementById("address").textContent = supplier[0].address;
                document.getElementById("phone").textContent = supplier[0].phone;
                document.getElementById("email").textContent = supplier[0].email;
                document.getElementById("report_link").href = "supplier_report.html?sid="+supplier[0].id;
          
                
        }
    }
}

//check if current page is edit supplier
if(window.location.pathname == "/edit_supplier.html"){
    let login = checkLogin();
    if(login){
    const urlObject = new URL(window.location.href);
    const params = urlObject.searchParams;
    let supplier = db.suppliers.filter(p=>{
        return p.id === params.get("sid");
    });
    if(supplier.length == 0){
        window.location.pathname = "/not_found.html";
    }
    else{
        const form = document.querySelector("#edit_supplier_form");
        if(form){
            form.name.value = supplier[0].name;
            form.contact.value = supplier[0].contact_person;
            form.email.value = supplier[0].email;
            form.phone.value = supplier[0].phone;
            form.address.value = supplier[0].address;
            var countrySelect= document.getElementById("country");
            let selectedCountryIndex = 0;
            countryList.forEach((country,index)=>{
                countrySelect.options.add(new Option(country));
                if(country.toLowerCase() == supplier[0].country.toLowerCase()) selectedCountryIndex = index;
            })
            countrySelect.options.selectedIndex = selectedCountryIndex;
            form.addEventListener('submit',(event)=>{
                event.preventDefault();
                let name = document.getElementById("name").value;
                let contact = document.getElementById("contact").value;
                let country = countrySelect.options[countrySelect.options.selectedIndex].value;
                let email = document.getElementById("email").value;
                let phone = document.getElementById("phone").value;
                let address = document.getElementById("address").value;
                
                let sp = supplier[0];

                if(sp.name.toLowerCase() != name.toLowerCase()) sp.name = name;
                if(sp.contact_person.toLowerCase() != contact.toLowerCase()) sp.contact_person = contact;
                if(sp.country.toLowerCase() != country.toLowerCase()) sp.country = country;
                if(sp.email.toLowerCase() != email.toLowerCase()) sp.email = email;
                if(sp.phone != phone) sp.phone = phone;
                if(sp.address.toLowerCase() != address.toLowerCase())sp.address = address;
                
                saveSupplier(sp,"edit");
              
               
            })
        }
    }
    
}
}
//check if current page is edit rep
if(window.location.pathname == "/sp/edit_customer.html"){
    let login = checkLogin();
    if(login){
    const urlObject = new URL(window.location.href);
    const params = urlObject.searchParams;
    let customer = db.customers.filter(p=>{
        return p.id === params.get("cid");
    });
    
    if(customer.length == 0){
        window.location.pathname = "/not_found.html";
    }
    else{
        const form = document.querySelector("#edit_customer_form");
        if(form){
            form.name.value = customer[0].name;
            form.address.value = customer[0].address;
            form.email.value = customer[0].email;
            form.phone.value = customer[0].phone;
            
            form.addEventListener('submit',(event)=>{
                event.preventDefault();
                let name = document.getElementById("name").value;
                let address = document.getElementById("address").value;
                let email = document.getElementById("email").value;
                let phone = document.getElementById("phone").value;
    
                let rp = {id:customer[0].id,rep:customer[0].rep};
                if(customer[0].name.toLowerCase() != name.toLowerCase()) rp.name = name;
                if(customer[0].address.toLowerCase() != address.toLowerCase()) rp.address = address;
                if(customer[0].email.toLowerCase() != email.toLowerCase()) rp.email = email;
                if(customer[0].phone != phone) rp.phone = phone;
                console.log("prod: ",rp);
                
                saveCustomer(rp,"edit");
               
               
            })
        }
    }
    
}
}
if(window.location.pathname == "/view.html"){
    var urlObject = new URL(window.location.href);
    var params = urlObject.searchParams;
    var id = params.get("id");
    var inv = db.inventory.filter(inv=>{
        return inv.id == id;
    })
    document.title = "Invoice number "+inv[0].invoice_no;
    document.getElementById("image_viewer").src = "/data/"+inv[0].invoice;
}