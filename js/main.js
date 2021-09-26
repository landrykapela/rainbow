
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
    "Korea",
    "Korea (North)",
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
    "Saint Helena",
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
    "South Georgia ",
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
    "United Kingdom",
    "United States of America",
    "Uruguay",
    "Uzbekistan",
    "Vanuatu",
    "Venezuela",
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
let dbString = storage.getItem("db");
if(dbString === undefined || dbString === null){
    let data = {issues:[],suppliers:[],products:[],users:[],transactions:[],inventory:[],customers:[],reps:[]};
    storage.setItem("db",JSON.stringify(data));
    dbString = storage.getItem("db");
}
let db = JSON.parse(dbString);
var mySession = JSON.parse(session.getItem("session"));
if(db.suppliers === undefined){
    db.suppliers = [];
    storage.setItem("db",JSON.stringify(db));
}
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
if(db.inventory === undefined){
    db.inventory = [];
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
    let u = session.getItem("session");
    if(u === undefined || u === null){
        window.location.pathname = "/index.html";
        return false;        
    }
    else{
        let user = JSON.parse(u);
        document.querySelector("#login").textContent = user.fname;
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
    // console.log("p: ",products);
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
        image.src = (p.image) ? "/data/"+p.image : "/img/no_data.svg";
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
            e.preventDefault();
            let target = window.location.protocol+"//"+window.location.host+"/edit_product.html?pid="+p.id;
            window.location.href = target;
        })

        //item click
        title.addEventListener('click',(e)=>{
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
        profile.src = rep.avatar ? "/data/"+rep.avatar : "/img/reps.svg";
        profile.classList.add("item-image");
        area.textContent = rep.service_area;
        title.textContent = rep.fname+" "+rep.lname;
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
         itemData.addEventListener('click',(e)=>{
             e.preventDefault();
            let target = window.location.protocol+"//"+window.location.host+"/rep_detail.html?rid="+rep.id;
            window.location.href = target;
        });


    })
}

//load suppliers
const listSuppliers = (suppliers)=>{
    const listContainer = document.querySelector("#list_container");
    suppliers.forEach(supplier=>{
        const itemList = document.createElement("div");
        itemList.classList.add("item-list");
        const itemData = document.createElement("div");
        const itemActions = document.createElement("div");
        const title = document.createElement("span");
        const area = document.createElement("span");
        const actionEdit = document.createElement("span");
        const actionDelete = document.createElement("span");

        area.textContent = supplier.address+", "+supplier.country;
        title.textContent = supplier.name;
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
            confirmDelete("supplier",supplier.id);
        });

        //edit product
        actionEdit.addEventListener('click',(e)=>{
            let target = window.location.protocol+"//"+window.location.host+"/edit_supplier.html?sid="+supplier.id;
            window.location.href = target;
        });

         //item click
         itemData.addEventListener('click',(e)=>{
             e.preventDefault();
            let target = window.location.protocol+"//"+window.location.host+"/supplier_detail.html?sid="+supplier.id;
            window.location.href = target;
        });


    })
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
    let return_page ="/dashboard.html";
    var userId = JSON.parse(session.getItem("session")).id;
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
    formData.append("price",issue.price);
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
const saveRep = (rep,option=null)=>{
    console.log("prods: ",rep);
    var formData = new FormData();
    if(option == null){
        formData.append("fname",rep.fname);
        formData.append("lname",rep.lname);
        formData.append("email",rep.email);
        formData.append("service_area",rep.service_area);
        formData.append("phone",rep.phone);
        formData.append("password",rep.password);
        formData.append("admin",rep.admin);
        formData.append("avatar",rep.avatar);
        formData.append("btnAddRep","addRep");
    }
    else{
        Object.keys(rep).forEach((key,i)=>{
            // if(key == "avatar") formData.append("'"+key+"'",Object.values(rep))
            formData.append(key,Object.values(rep)[i])
        })
        formData.append("btnUpdateRep","updateRep");
    }
    console.log("formdata: ",formData);
    var options = {
        method:"POST",
        body:formData,
        
    }
    fetch("/backend/?tag=rep",options)
    .then(res=>res.json())
    .then(result=>{
        console.log("result: ",result);
        if(result.code == 0){
            db.reps = result.reps;
            storage.setItem("db",JSON.stringify(db));
            window.location.pathname="/reps.html";
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

const showTransactionList = (data,container,title,headRow)=>{
    container.classList.remove("hidden");
    document.getElementById("chart_container").classList.add("hidden");
    var repTitle = document.getElementById("report_title");
    repTitle.textContent = title;
    let source = data.filter(d=>true);
    Array.from(container.children).forEach((c,i)=>{if(i>0)container.removeChild(c);});
    const search = document.getElementById("search_report");
    if(search){
        search.addEventListener("input",(e)=>{
            var keyword = e.target.value;
            var filteredData;
            if(keyword.length > 0){
                keyword = keyword.toLowerCase();
                filteredData = source.filter(d=>{
                    return (d.product_detail.name.toLowerCase().includes(keyword) || 
                    d.rep.fname.toLowerCase().includes(keyword) ||
                    d.rep.lname.toLowerCase().includes(keyword))
                }
                );
                console.log("fd: ",filteredData);
                console.log("d: ",data);
                showTransactionList(filteredData,container,title,headRow);
            }
            else {
                showTransactionList(filteredData,container,title,headRow);
            }
        })
    }
    var heading = document.createElement("div");
    heading.id = "heading";
    heading.className = "row col-lg-12 col-md-12 my-2 bg-secondary";
    headRow.forEach(head=>{
        const item = document.createElement("span");
        item.className = (head.align.includes("right") || head.text.toLowerCase().includes("action") || head.text.toLowerCase().includes("date") || head.text.toLowerCase().includes("type")) ? "col-md-1 col-lg-1 col-sm-12 bold" :"col-md-2 col-lg-2 col-sm-12 bold";
        item.classList.add(head.align);
        if(head.text.includes("Cost")) item.className = "col-md-2 col-lg-2 col-sm-12 bold text-right";
        item.textContent = head.text;
        heading.appendChild(item);
    })
    container.appendChild(heading);
    if(data && data.length > 0){
        data.forEach((d,i)=>{
            
            const row = document.createElement("div");
            row.className ="row my-2 col-lg-12 col-md-12 list_item";
            if(i%2==0) row.classList.add("bg-light");

            const dateSpan = document.createElement("span");
            dateSpan.className = "col-md-1 col-lg-1 col-sm-12";
            var date = new Date(parseInt(d.date_created)*1000);
            dateSpan.textContent = date.getDate()+"/"+(date.getMonth()+1)+"/"+date.getFullYear();
            row.appendChild(dateSpan);

            if(!title.includes("Inventory")){
                const custSpan = document.createElement("span");
                custSpan.className = "col-md-2 col-lg-2 col-sm-12";
                custSpan.textContent = d.rep.fname+" "+d.rep.lname;
                row.appendChild(custSpan);
            }
            
            const productSpan = document.createElement("span");
            productSpan.className = "col-md-2 col-lg-2 col-sm-12";
            var product = (!title.includes("Inventory")) ? d.product_detail : d.product;
            productSpan.textContent = product.name+"("+product.pack_size+")";
            row.appendChild(productSpan);
    
            const qttySpan = document.createElement("span");
            qttySpan.className = "col-md-1 col-lg-1 col-sm-12 text-right";
            qttySpan.textContent = d.quantity;
            row.appendChild(qttySpan);
    
            const costSpan = document.createElement("span");
            costSpan.className = "col-md-2 col-lg-2 col-sm-12 text-right";
            costSpan.textContent = (title.includes("Inventory")) ? thousandSeparator(d.selling_price * d.quantity) : thousandSeparator(d.quantity * d.price);
            row.appendChild(costSpan);
            if(!title.includes("Inventory")){
            const typeSpan = document.createElement("span");
            typeSpan.className = "col-md-1 col-lg-1 col-sm-12";
            var type = (d.type == 0) ? "Cash" : "Credit";
            typeSpan.textContent = type;
            row.appendChild(typeSpan); 
            }
            const invSpan = document.createElement("span");
            invSpan.className = "col-md-2 col-lg-2 col-sm-12";
            invSpan.textContent = d.invoice_no;
            row.appendChild(invSpan);

            if(!title.includes("Inventory")){
            const invLink = document.createElement("a");
            invLink.className = "col-md-1 col-lg-1 col-sm-12 text-left";

            if(d.file == null){
                invLink.textContent = "no data"
            }
            else{
                invLink.target = "_blank";
                invLink.href = "/data/"+d.file;
                invLink.textContent = "view"
            }
            row.appendChild(invLink);
        }
            container.appendChild(row);
        })
    }
    else{
        const row = document.createElement("div");
            row.className ="row my-2 col-lg-12 col-md-12 list_item";
        const noSpan = document.createElement("span");
            noSpan.className = "col-md-12 col-lg-12 col-sm-12 text-center";
            noSpan.textContent = "No data";
            row.appendChild(noSpan);
            
            container.appendChild(row);
    }
   
}

const showGroupedTransactionList = (data,container,title,headRow,groupBy)=>{
    container.classList.remove("hidden");
    document.getElementById("chart_container").classList.add("hidden");
    var repTitle = document.getElementById("report_title");
    repTitle.textContent = title;
    Array.from(container.children).forEach((c,i)=>{if(i>0)container.removeChild(c);});
    const search = document.getElementById("search_report");
    
    var heading = document.createElement("div");
    heading.id = "heading";
    heading.className = "row col-lg-12 col-md-12 my-2 bg-secondary";
    headRow.forEach(head=>{
        const item = document.createElement("span");
        item.className = (head.align.includes("right") || head.text.toLowerCase().includes("action") || head.text.toLowerCase().includes("date") || head.text.toLowerCase().includes("type")) ? "col-md-1 col-lg-1 col-sm-12 bold" :"col-md-2 col-lg-2 col-sm-12 bold";
        item.classList.add(head.align);
        if(head.text.includes("Cost") || head.text.includes("date")) item.className = "col-md-2 col-lg-2 col-sm-12 bold text-right";
        item.textContent = head.text;
        heading.appendChild(item);
    })
    container.appendChild(heading);
    var keys = Object.keys(data);
    var values = Object.values(data);
    console.log("keys: ",values);
    if(keys && keys.length > 0){
        keys.forEach((key,i)=>{
            const hRow = document.createElement("div");
            hRow.className = "row my-2 px-1 col-lg-12 col-md-12 list_item bg-success";
            var title;
            var head;
            switch(groupBy){
                case "rep":
                    head = db.reps.filter(r=>r.id == key)[0];
                    title = head.fname + " "+head.lname;
                    break;
                case "product":
                    head = db.products.filter(p=>p.id == key)[0];
                    title = head.name+" - "+head.pack_size;
                    break;
                case "invoice_no":
                    title = key;
                    break;

            }
            hRow.textContent = title;
            container.appendChild(hRow);
            values[i].forEach((d,k)=>{
                const row = document.createElement("div");
                row.className ="row my-2 col-lg-12 col-md-12 list_item";
                if(k%2==0) row.classList.add("bg-light");
    
                const dateSpan = document.createElement("span");
                dateSpan.className = "col-md-1 col-lg-1 col-sm-12";
                var date = new Date(parseInt(d.date_created)*1000);
                dateSpan.textContent = date.getDate()+"/"+(date.getMonth()+1)+"/"+date.getFullYear();
                row.appendChild(dateSpan);
    
                if(!title.includes("Inventory")){
                    const custSpan = document.createElement("span");
                    custSpan.className = "col-md-2 col-lg-2 col-sm-12";
                    custSpan.textContent = d.rep.fname+" "+d.rep.lname;
                    row.appendChild(custSpan);
                }
                
                const productSpan = document.createElement("span");
                productSpan.className = "col-md-2 col-lg-2 col-sm-12";
                var product = (!title.includes("Inventory")) ? d.product_detail : d.product;
                productSpan.textContent = product.name+"("+product.pack_size+")";
                row.appendChild(productSpan);
        
                const qttySpan = document.createElement("span");
                qttySpan.className = "col-md-1 col-lg-1 col-sm-12 text-right";
                qttySpan.textContent = d.quantity;
                row.appendChild(qttySpan);
        
                const costSpan = document.createElement("span");
                costSpan.className = "col-md-2 col-lg-2 col-sm-12 text-right";
                costSpan.textContent = (title.includes("Inventory")) ? thousandSeparator(d.selling_price * d.quantity) : thousandSeparator(d.quantity * d.price);
                row.appendChild(costSpan);
                if(!title.includes("Inventory")){
                const typeSpan = document.createElement("span");
                typeSpan.className = "col-md-1 col-lg-1 col-sm-12";
                var type = (d.type == 0) ? "Cash" : "Credit";
                typeSpan.textContent = type;
                row.appendChild(typeSpan); 
                }
                const invSpan = document.createElement("span");
                invSpan.className = "col-md-2 col-lg-2 col-sm-12";
                invSpan.textContent = d.invoice_no;
                row.appendChild(invSpan);
    
                if(!title.includes("Inventory")){
                const invLink = document.createElement("a");
                invLink.className = "col-md-1 col-lg-1 col-sm-12 text-left";
    
                if(d.file == null){
                    invLink.textContent = "no data"
                }
                else{
                    invLink.target = "_blank";
                    invLink.href = "/data/"+d.file;
                    invLink.textContent = "view"
                }
                row.appendChild(invLink);
            }
                container.appendChild(row);
            })
           
        })
    }
    else{
        const row = document.createElement("div");
            row.className ="row my-2 col-lg-12 col-md-12 list_item";
        const noSpan = document.createElement("span");
            noSpan.className = "col-md-12 col-lg-12 col-sm-12 text-center";
            noSpan.textContent = "No data";
            row.appendChild(noSpan);
            
            container.appendChild(row);
    }
   
}

const showLineChart = (data,container,title)=>{
    document.getElementById("report_container").classList.add("hidden");
    container.classList.remove("hidden");
    while(container.hasChildNodes()){
        container.removeChild(container.childNodes[0]);
    }
    data = summarizeData(data,"transactions");
    var products = [...new Set(data.map(d=>d.product))];
    var mydata = [];
    products.forEach(p=>{
        var dt = data.filter(d=>d.product == p && d.quantity > 0)
        if(dt.length > 0){
            mydata.push({name:dt[0].product_detail.name+"("+dt[0].product_detail.pack_size+")",quantity:dt[0].quantity})
        }
    })
    
    var ctx = document.createElement("canvas");
    container.appendChild(ctx);
    ctx.width = 400;
    const chartData = {
        labels: mydata.map(d=>d.name),
        datasets: [{
          label:title,
          data: mydata.map(d=>d.quantity),
          hoverOffset: 4,
          fill:false,
          backgroundColor:"#fa8e00",
          borderColor:"#fa8e00"
        }]
      };
   var options = {
        type:'line',
        data:chartData,
    }
    var chart = new Chart(ctx,options);
   
}
const showPieChart = (data,container,title,groupBy=null)=>{
    document.getElementById("report_container").classList.add("hidden");
    container.classList.remove("hidden");
    while(container.hasChildNodes()){
        container.removeChild(container.childNodes[0]);
    }
    var options = {
        type:'pie',
        plugins:{
            legend:{
                display:true,
                position:'left'
            }
        }
       
    }
    var ctx = document.createElement("canvas");
    container.appendChild(ctx);
    ctx.width = 300;
    ctx.height = 300;
    if(groupBy == null){
        var cash = 0;
        data.filter(d=>d.type == 0).forEach(d=>cash += parseInt(d.cost));
        var credit = 0;
        data.filter(d=>d.type == 1).forEach(d=>credit += parseInt(d.cost));
        var all = 0;
        data.forEach(d=>all +=parseInt(d.cost));
        const mydata = {
            labels: [
            'Cash Sales',
            'Credit Sales',
            'All Sales'
            ],
            datasets: [{
            label:title,
            data: [cash,credit,all],
            backgroundColor: [
                'rgb(255, 99, 132)',
                'rgb(54, 162, 235)',
                'rgb(255, 205, 86)'
            ],
            hoverOffset: 4
            }]
        };
        options.data = mydata;
    }
    else{
        var keys = Object.keys(data);
        var vals = Object.values(data);
        var labels = [];
        var sums = [];
        var backgroundColors = [];
        
        keys.forEach((key,i)=>{
            var randomColor = "#"+Math.floor(Math.random()*16777215).toString(16);
            backgroundColors.push(randomColor);
            var item;
            var head;
            let sum = 0;
            switch(groupBy){
                case "rep":
                    item = db.reps.filter(r=>r.id == key)[0];
                    head = item.fname+" "+item.lname;
                    break;
                case "product":
                    item = db.products.filter(p=>p.id == key)[0];
                    head = item.name+"("+item.pack_size+")";
                    break;
                case "invoice_no":
                    head = key;
                    break;
            }
            labels.push(head);
            vals[i].forEach(v=>{
                sum += parseInt(v.cost);
            });
            sums.push(sum);
        });
        const mydata = {
            labels: labels,
            datasets: [{
            label:title,
            data: sums,
            backgroundColor: backgroundColors,
            hoverOffset: 4
            }]
        };
        options.data = mydata;
        console.log("pie d: ",mydata);
    }
    var chart = new Chart(ctx,options);
   
}
//summarize trx data
const summarizeData = (txData,groupBy=null)=>{
    console.log("summarizing...: ",groupBy)
    let data = [];
    var sourceData = txData;
    
    for(let i=0;i<sourceData.length;i++){
        let issue = sourceData[i];
        var productId = issue.product.id;
        let idx = data.findIndex(d=>d.product.id == productId && d.invoice_no == issue.invoice_no && d.rep.uid == issue.rep.uid);
        if(idx === -1){
            data.push(issue);
        }    
        else{
            let d = data[idx];
            let qt = d.quantity + issue.quantity;
            d.quantity = qt;
            data[idx] = d;
        }
        
    }
    var result = data;
    if(groupBy != null) {
        result = (groupBy == "invoice_no") ?   _.groupBy(data,d=>d.invoice_no) :_.groupBy(data,d=>d[groupBy]);
        if(groupBy == "rep") result = _.groupBy(data,d=>d.rep.id);
        console.log("re: ",result);
        var keys = Object.keys(result);
        keys.forEach((key,i)=>{
            console.log("r: ",result[key]);
        })
    }
    return result;
}
const showRepInventory = (title)=>{
    let invs = db.inventory.filter(i=>i.admin == mySession.id).map(i=>{
        i.quantity = parseInt(i.quantity);
        return i;
    });
    let issues = db.issues.filter(i=>i.admin == mySession.id).map(i=>{
        i.quantity = parseInt(i.quantity);
        return i;
    });
   
    let sumInvs = summarizeData(invs);
    let sumIssues = summarizeData(issues);
    
    var summary = sumInvs.map((i=>{
        let issue = i;
        let qtty = parseInt(i.quantity);
        let tx = sumIssues.filter(t=>t.product.id == i.product.id && t.invoice_no == i.invoice_no);
        console.log("tx: ",tx);
        if(tx.length > 0){
            tx.forEach(x=>{
                console.log("qtty: "+x.quantity,qtty);
                qtty -= parseInt(x.quantity);
                console.log("iq: ",qtty);
             })
             issue.quantity = qtty;
        }
        else{
            issue.quantity = qtty;
        }
        return issue;
    }))
    console.log("rep inv: ",summary);
    var heads=[{text:"Date",align:"text-left"},{text:"Product",align:"text-left"},{text:"Stock (Tsh.)",align:"text-right"},{text:"Value",align:"text-right"},{text:"Invoice",align:"text-left"}];
            
    showTransactionList(summary,document.getElementById("report_container"),title,heads);
}

//show rport
const showReport = (options)=>{
    var container = document.getElementById("report_container");
    let title = "User Report: Transactions";
    var data = db.transactions;
    var transactions = data.map(d=>{
        let nd = d;
        nd.quantity = parseInt(d.quantity);
        nd.product_detail = db.products.filter(p=>p.id == d.product)[0];
        nd.customer_detail = db.customers.filter(c=>c.id == d.customer)[0];
        return nd;
    })
    
    switch(options.repType.toLowerCase()){
        case "all sales":
            title = "User Report: Transactions";
            break;
        case "cash sales":
            title = "User Report: Cash Transactions";
            transactions = transactions.filter(t=>parseInt(t.type) == 0);
            break;
        case "credit sales":
            console.log("in: ",transactions);
            title = "User Report: Credit Transactions";
            transactions = transactions.filter(t=>parseInt(t.type) == 1);
            console.log("txn: ",transactions);
            break;
        case "issues":
            title = "Report Inventory";
            showRepInventory(title);
            break;
        case "stock":
            title = "Issued Stock Report";
            showRepInventory(title);
            break;
    }
    
    let format = options.repFormat.toLowerCase();
    let groupBy = options.groupBy.toLowerCase() == 0 ? null:options.groupBy.toLowerCase();
    switch(format){
        case "list":
            var heads=[{text:"Date",align:"text-left"},{text:"Rep's Name",align:"text-left"},{text:"Product",align:"text-left"},{text:"Quantity",align:"text-right"},{text:"Cost (Tsh)",align:"text-right"},{text:"Type",align:"text-left"},{text:"Invoice",align:"text-left"},{text:"Action",align:"text-left"},];
            if(options.repType.toLowerCase() !== "stock" && options.repType.toLowerCase() != "issues") {
                if(groupBy != null){
                    showGroupedTransactionList(summarizeData(transactions,groupBy),container,title,heads,groupBy);
                }
                else showTransactionList(summarizeData(transactions,groupBy),container,title,heads);
            }
            break;
        case "pie":
            if(groupBy == null) showPieChart(transactions,document.getElementById("chart_container"),title);
            else showPieChart(summarizeData(transactions,groupBy),document.getElementById("chart_container"),title,groupBy);
            
            break;
        case "line":
            showLineChart(transactions,document.getElementById("chart_container"),title);
            
            break;
    }

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
            console.log("result: ",result);
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
if(window.location.pathname == "/dashboard.html"){
  var login = checkLogin();
  if(login){
    var userId = JSON.parse(session.getItem("session")).id;
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
    
    fetch("/backend/?tag=reps&uid="+userId,{
        method:"GET"
    }).then(res=>res.json())
    .then(result=>{
        db.reps = result.reps;
        storage.setItem("db",JSON.stringify(db));
        db = JSON.parse(storage.getItem("db"));
        
    }).catch(e=>{console.log(e)})
    
    fetch("/backend/?tag=suppliers&uid="+userId,{
        method:"GET"
    }).then(res=>res.json())
    .then(result=>{
        console.log("result: ",result);
        db.suppliers = result.suppliers;
        storage.setItem("db",JSON.stringify(db));
        db = JSON.parse(storage.getItem("db"));
        if(db.suppliers.length === 0){
            simulateLoad(1000,()=>{
                window.location.pathname = "/add_supplier.html";
            });
        }
        
    }).catch(e=>{console.log(e)})

    fetch("/backend/?tag=issues&uid="+userId,{
        method:"GET"
    }).then(res=>res.json())
    .then(result=>{
        console.log("result: ",result);
        db.issues = result.issues;
        storage.setItem("db",JSON.stringify(db));
        db = JSON.parse(storage.getItem("db"));
        
        
    }).catch(e=>{console.log(e)})

    fetch("/backend/?tag=transactions&uid="+userId+"&t=0",{
        method:"GET"
    }).then(res=>res.json())
    .then(result=>{
        console.log("result tx: ",result);
        db.transactions = result.transactions;
        storage.setItem("db",JSON.stringify(db));
        db = JSON.parse(storage.getItem("db"));
        
    }).catch(e=>{console.log(e)})


    fetch("/backend/?tag=inventory&uid="+userId+"&t=0",{
        method:"GET"
    }).then(res=>res.json())
    .then(result=>{
        console.log("result iv: ",result);
        db.inventory = result.inventory;
        storage.setItem("db",JSON.stringify(db));
        db = JSON.parse(storage.getItem("db"));
        
    }).catch(e=>{console.log(e)})

  }
}


//check if current page is reps.html
if(window.location.pathname == "/reps.html"){
    let login = checkLogin();
    if(login){
        var userId = JSON.parse(session.getItem("session")).id;
        fetch("/backend/?tag=reps&uid="+userId,{
            method:"GET"
        }).then(res=>res.json())
        .then(result=>{
            console.log("result: ",result);
            db.reps = result.reps;
            storage.setItem("db",JSON.stringify(db));
            db = JSON.parse(storage.getItem("db"));
            if(db.reps.length === 0){
                simulateLoad(1000,()=>{
                    window.location.pathname = "/add_rep.html";
                });
            }
            
        }).catch(e=>{console.log(e)})
        .finally(()=>{
            showHideSpinner(0);
            listReps(db.reps);
        })
    }
}

//check if current page is reports.html
if(window.location.pathname == "/reports.html"){
    let login = checkLogin();
    if(login){
        
        var userId = mySession.id;
        var repType= document.getElementById("report_type");
        var repGroup= document.getElementById("report_group");
        var repFormat= document.getElementById("report_format");
        var startDate= document.getElementById("start_date");
        var endDate= document.getElementById("end_date");
        const container = document.getElementById("report_container");
        
        var options = {repFormat:repFormat.value,repType:repType.value,groupBy:repGroup.value};
        showReport(options);
        repType.addEventListener("change",(e)=>{
            options.repType = e.target.value;
            showReport(options);
        })
        repGroup.addEventListener("change",(e)=>{
            options.groupBy = e.target.value;
            showReport(options);
        })
        repFormat.addEventListener("change",(e)=>{
            options.repFormat = e.target.value;
            showReport(options)
        })
        startDate.addEventListener("change",(e)=>{
            container.textContent = e.target.value;
        })
        endDate.addEventListener("change",(e)=>{
            container.textContent = e.target.value;
        })

       
    }
}


//check if current page is suppliers.html
if(window.location.pathname == "/suppliers.html"){
    let login = checkLogin();
    if(login){
        var userId = JSON.parse(session.getItem("session")).id;
        fetch("/backend/?tag=suppliers&uid="+userId,{
            method:"GET"
        }).then(res=>res.json())
        .then(result=>{
            console.log("result: ",result);
            db.suppliers = result.suppliers;
            storage.setItem("db",JSON.stringify(db));
            db = JSON.parse(storage.getItem("db"));
            if(db.suppliers.length === 0){
                simulateLoad(1000,()=>{
                    window.location.pathname = "/add_supplier.html";
                });
            }
            
        }).catch(e=>{console.log(e)})
        .finally(()=>{
            showHideSpinner(0);
            listSuppliers(db.suppliers);
        })
    }
}

//check if current page is products.html
if(window.location.pathname == "/products.html"){
    let login = checkLogin();
    if(login){
        showHideSpinner(1);
        var userId = JSON.parse(session.getItem("session")).id;
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

//check if current page is inventory.html
if(window.location.pathname == "/inventory.html"){
    let login = checkLogin();
    if(login){
        // showHideSpinner(1);
        var userId = JSON.parse(session.getItem("session")).id;
        fetch("/backend/?tag=inventory&uid="+userId,{
            method:"GET"
        }).then(res=>res.json())
        .then(result=>{
            console.log("result: ",result);
            db.inventory = result.inventory;
            storage.setItem("db",JSON.stringify(db));
            db = JSON.parse(storage.getItem("db"));
            
            
        }).catch(e=>{console.log(e)})
        .finally(()=>{
            // showHideSpinner(0);
            showInventorySummary()
        })
        
    }
    
}

//check if current page is receive.html
if(window.location.pathname == "/receive.html"){
    let login = checkLogin();
    if(login){
    const form = document.querySelector("#receive_form");
    if(form){
        if(db.products.length == 0){
            if(confirm("There are no products. Please register a product")){
                window.location.pathname = "/add_product.html";
            }
            
        }
        else{
            db.products.sort((p1,p2)=>{
                return (p1.name < p2.name) ? -1:1
            }).forEach(p=>{
                form.product.options.add(new Option(p.name+" ("+p.pack_size+")",p.id));
            });
            db.suppliers.forEach(s=>{
                form.supplier.options.add(new Option(s.name,s.id));
            });
        
            form.cif.addEventListener('input',(e)=>{
                // form.cif.value = thousandSeparator(e.target.value);

                let cif = parseFloat(e.target.value);
                let tpri = (form.tpri.value) ? parseFloat(form.tpri.value) : 0;
                let clearing = (form.clearing.value) ? parseFloat(form.clearing.value) : 0;
                let quantity = (form.quantity.value && form.quantity.value > 0) ? parseInt(form.quantity.value) : 1;

                let price = (cif + tpri + clearing)/quantity;
                form.buying_price.value = price;
            });
            form.tpri.addEventListener('input',(e)=>{
                let tpri = parseFloat(e.target.value);
                let cif = (form.cif.value) ? parseFloat(form.cif.value) : 0;
                let clearing = (form.clearing.value) ? parseFloat(form.clearing.value) : 0;
                let quantity = (form.quantity.value && form.quantity.value > 0) ? parseInt(form.quantity.value) : 1;

                let price = (cif + tpri + clearing)/quantity;
                console.log("check: ",quantity+"/"+tpri+"/"+clearing+"/"+cif+"/"+price);
                form.buying_price.value = price;
            });
            form.clearing.addEventListener('input',(e)=>{
                let clearing = parseFloat(e.target.value);
                let tpri = (form.tpri.value) ? parseFloat(form.tpri.value) : 0;
                let cif = (form.cif.value) ? parseFloat(form.cif.value) : 0;
                let quantity = (form.quantity.value && form.quantity.value > 0) ? parseInt(form.quantity.value) : 1;

                let price = (cif + tpri + clearing)/quantity;
                console.log("check: ",quantity+"/"+tpri+"/"+clearing+"/"+cif+"/"+price);
                form.buying_price.value = price;
            });
            form.quantity.addEventListener('input',(e)=>{
                let quantity = parseInt(e.target.value);
                let tpri = (form.tpri.value) ? parseFloat(form.tpri.value) : 0;
                let clearing = (form.clearing.value) ? parseFloat(form.clearing.value) : 0;
                let cif = (form.cif.value ) ? parseFloat(form.cif.value) : 0;
                let price = (cif + tpri + clearing)/quantity;
                console.log("check: ",quantity+"/"+tpri+"/"+clearing+"/"+cif+"/"+price);
                form.buying_price.value = price;
            });
            form.addEventListener('submit',(e)=>{
                e.preventDefault();
                let productId = form.product[form.product.options.selectedIndex].value;
                let supplierId = form.supplier[form.supplier.options.selectedIndex].value;
                let product = db.products.filter(p=>{
                    return p.id === productId;
                });
                let supplier = db.suppliers.filter(s=>{
                    return s.id === supplierId;
                })
                
                let quantity = parseInt(form.quantity.value);
                let invoice_no = form.invoice.value;
                let cif = parseFloat(form.cif.value);
                let tpri=parseFloat(form.tpri.value);
                let clearing = parseFloat(form.clearing.value);
                let b_price = parseFloat(form.buying_price.value);
                let s_price =parseFloat(form.selling_price.value);
                let invoice_file =form.invoice_file.files[0];
                let inventory = {product:productId,supplier:supplierId,invoice_no:invoice_no,quantity:quantity,cif:cif,tpri:tpri,clearing:clearing,buying_price:b_price,selling_price:s_price,invoice:invoice_file};
                var userId = JSON.parse(session.getItem("session")).id;
                inventory.admin = userId;
                if(invoice_file){
                    inventory.invoice = invoice_file;
                    saveInventory(inventory);
                }
                else{
                    saveInventory(inventory);
                }

            })
    }
}
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
            var inventories = [];
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
            else inventories = db.inventory;
            inventories.forEach(inv=>{
                if(parseInt(inv.quantity) > 0) products.push(inv.product);
            })
            products.sort((p1,p2)=>{
                if(p1.name < p2.name) return -1; else return 1
            }) 
            var productIds = products.map(p=>p.id).filter((p,i,self)=>self.indexOf(p) === i);
            console.log("p: ",productIds);
            products = productIds.map((p)=>{
                let np = products.filter(x=>x.id == p)[0]
                return np;
            });
            console.log("p1: ",products);
            Array.from(form.product.children).forEach((c,i)=>{
                if(i>0) form.product.removeChild(c);
            })
            products.forEach(p=>{
                form.product.options.add(new Option(p.name+" ("+p.pack_size+")",p.id));
            });
        
            // let inventory = inventories.filter(inv=>{
            //     return inv.product.id == products[0].id;
            // });
            
            // form.quantity.setAttribute("max",inventory[0].quantity);
            form.product.addEventListener('change',(e)=>{
                if(e.target.value != "-1"){
                    let pd = products.filter(p=>{
                        return p.id === e.target.value;
                    });
                    let inventory = inventories.filter(inv=>{
                        return inv.product.id == pd[0].id;
                    });
                    Array.from(form.invoice.children).forEach((c,i)=>{
                        if(i>0)form.invoice.removeChild(c);
                    })
                    
                    inventory.forEach(inv=>{
                        form.invoice.options.add(new Option(inv.invoice_no));
                    });

                    var inv = inventory.filter(inv=>inv.invoice_no == form.invoice.value && inv.product.id == form.product.value);
                    form.quantity.value = inv[0].quantity;
                    form.quantity.setAttribute("max",inv[0].quantity);
                    form.price.value = inv[0].selling_price;
                    form.amount.value = thousandSeparator(form.price.value * form.quantity.value);
                }
               
            });
            form.invoice.addEventListener('change',(e)=>{
                let inventory = db.inventory.filter(inv=>{
                    return inv.invoice_no == e.target.value;
                });
                form.quantity.setAttribute("max",inventory[0].quantity);
                form.quantity.value=inventory[0].quantity;
                form.price.value = inventory[0].selling_price;
                form.amount.value = thousandSeparator(form.price.value * form.quantity.value);
            })
            form.quantity.addEventListener('input',(e)=>{
                let quantity = parseInt(e.target.value);
                form.amount.value = thousandSeparator(quantity * form.price.value);
            });
            form.price.addEventListener("input",(e)=>{
                let price = parseFloat(e.target.value);
                form.amount.value = thousandSeparator(price * form.quantity.value);
            })
            db.reps.forEach(rep=>{
                form.rep.options.add(new Option(rep.fname+" "+rep.lname,rep.id));
            })
        
        
        form.addEventListener('submit',(e)=>{
            e.preventDefault();
            let productId = form.product.options[form.product.options.selectedIndex].value;
            let repId = form.rep.options[form.rep.options.selectedIndex].value;
            let repName = form.rep.options[form.rep.options.selectedIndex].text;
            let price = form.price.value;
            let quantity = parseInt(form.quantity.value);
            let invoice_no = form.invoice.options[form.invoice.options.selectedIndex].value;
            
            let amount = parseFloat(price) * quantity;
            let issue = {rep:repId,rep_name:repName,product:productId,invoice_no:invoice_no,quantity:quantity,amount:amount,price:price};
            let userId = JSON.parse(session.getItem("session")).id;
            issue.admin = userId;
            saveIssue(issue);
        })
    }
}
    }
}

//check if current page is add supplier
if(window.location.pathname == "/add_supplier.html"){
    let login = checkLogin();
    if(login){
    const form = document.querySelector("#new_supplier_form");

    if(form){
        countryList.forEach(country=>{
            let opt = new Option(country);
            form.country.options.add(opt);
        });
        form.addEventListener('submit',(event)=>{
            event.preventDefault();
            let name = document.getElementById("name").value;
            let country = document.getElementById("country").value;
            let phone = document.getElementById("phone").value;
            let contact_person = document.getElementById("contact").value;
            let email = document.getElementById("email").value;
            let address = document.getElementById("address").value;
            
            let admin = JSON.parse(session.getItem("session")).id;
            let sup = {name:name,country:country,email:email,phone:phone,address:address,contact:contact_person,admin:admin};
            
           saveSupplier(sup);

        })
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
            let user_id = JSON.parse(session.getItem("session")).id;
            let fileData = null;
            let rep = {avatar:fileData,fname:fname,lname:lname,email:email,phone:phone,service_area:service_area,password:password,admin:user_id};
            
            if(file){
                let reader = new FileReader();
                reader.addEventListener('load',()=>{
                    fileData = reader.result;
                    rep.avatar = file;
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

            var userId = JSON.parse(session.getItem("session")).id;
            let prod = {name:name,description:description,pack_size:pack_size,image:file,user_id:userId};
            saveProduct(prod);
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
            document.querySelector("#preview").src = "/data/"+product[0].image;
            form.image_file.addEventListener('change',(e)=>{
                if(e.target.files[0]){
                    let reader = new FileReader();
                    reader.addEventListener('load',()=>{
                        fileData = reader.result;
                        var url = URL.createObjectURL(e.target.files[0]);
                        document.getElementById("preview").src = url;
                    },false);
                    reader.readAsDataURL(e.target.files[0]);
                }
                
            })
            form.addEventListener('submit',(event)=>{
                event.preventDefault();
                let name = document.getElementById("name").value;
                let description = document.getElementById("description").value;
                let pack_size = document.getElementById("pack_size").value;
                let file = document.getElementById("image_file").files[0];
                
                let prod = product[0];
                
                if(prod.name.toLowerCase() != name.toLowerCase()) prod.name = name;
                if(prod.description.toLowerCase() != description.toLowerCase()) prod.description = description;
                if(prod.pack_size != pack_size) prod.pack_size = pack_size;
                let user_id = JSON.parse(session.getItem("session")).id;
                prod.user_id = user_id;
                console.log("prod: ",prod);
                if(file){
                    prod.image = file;
                }
                saveProduct(prod,"edit");
               
                
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
                document.getElementById("preview").src = "/data/"+product[0].image;
                
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
                document.getElementById("rep_name").textContent = rep[0].fname + " "+rep[0].lname;
                document.getElementById("fname").textContent = rep[0].fname;
                document.getElementById("lname").textContent = rep[0].lname;
                document.getElementById("area").textContent = rep[0].service_area;
                document.getElementById("phone").textContent = rep[0].phone;
                document.getElementById("email").textContent = rep[0].email;
                document.getElementById("report_link").href = "rep_report.html?rid="+rep[0].id;
                document.getElementById("preview").src = "/data/"+rep[0].avatar;
                
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
            form.fname.value = rep[0].fname;
            form.lname.value = rep[0].lname;
            form.email.value = rep[0].email;
            form.phone.value = rep[0].phone;
            form.service_area.value = rep[0].service_area;
            const preview = document.querySelector("#preview");
            preview.src = rep[0].avatar ? "/data/"+ rep[0].avatar : "/img/reps.svg";

            let fileInput = document.getElementById("profile_image");
            fileInput.addEventListener("change",(e)=>{
                if(e.target.files[0] != null){
                    var url = URL.createObjectURL(e.target.files[0]);
                    preview.src = url;
                }
            })
            form.addEventListener('submit',(event)=>{
                event.preventDefault();
                let fname = document.getElementById("fname").value;
                let lname = document.getElementById("lname").value;
                let email = document.getElementById("email").value;
                let phone = document.getElementById("phone").value;
                let password = document.getElementById("password").value;
                let service_area = document.getElementById("service_area").value;
                let file = fileInput.files[0];
    
                let rp = {id:rep[0].id};
                rp.email = rep[0].email;
                rp.admin = JSON.parse(session.getItem("session")).id;
                if(file != null) rp.avatar = file;
                if(rep[0].fname.toLowerCase() != fname.toLowerCase()) rp.fname = fname;
                if(rep[0].lname.toLowerCase() != lname.toLowerCase()) rp.lname = lname;
                if(rep[0].email.toLowerCase() != email.toLowerCase()) rp.email = email;
                if(rep[0].phone != phone) rp.phone = phone;
                if(rep[0].service_area.toLowerCase() != service_area.toLowerCase()) rp.service_area = service_area;
                if(password) rp.password = password;
                console.log("prod: ",rp);
                
                saveRep(rp,"edit");
               
               
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