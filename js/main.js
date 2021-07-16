
const storage = window.localStorage;
const session = window.sessionStorage;
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
let db = storage.getItem("db");
if(db === undefined || db === null){
    let data = {suppliers:[],products:[],users:[],transactions:[],inventory:[],customers:[],reps:[]};
    storage.setItem("db",JSON.stringify(data));
    db = storage.getItem("db");
}
db = JSON.parse(db);
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
        if(db.transactions.length > 0){
            inventories = db.inventory.map(inv=>{
                let invNew = inv;
                db.transactions.forEach(tx=>{
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

//save transaction
const saveTransaction=(transaction)=>{
    transaction.id = randomId(12);
    let transactions = db.transactions;
    transactions.push(transaction);
    db.transactions = transactions;
    storage.setItem("db",JSON.stringify(db));
    window.location.pathname = "/inventory.html";
}

//save inventory
const saveInventory = (inv)=>{
    inv.id = randomId(12);
    let inventory = db.inventory;
    inventory.push(inv);
    db.inventory = inventory;
    storage.setItem("db",JSON.stringify(db));
    window.location.pathname = "/inventory.html";
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
const saveSupplier = (supplier)=>{
    var suppliers = db.suppliers;
    supplier.id = randomId(12);
    suppliers.push(supplier);
    db.suppliers = suppliers;
    storage.setItem('db',JSON.stringify(db));
    window.location.pathname="/suppliers.html";
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

//check if current page is suppliers.html
if(window.location.pathname == "/suppliers.html"){
    let login = checkLogin();
    if(login){
        let suppliers = db.suppliers;
        if(suppliers.length === 0){
            simulateLoad(1000,()=>{
                window.location.pathname = "/add_supplier.html";
            });
            
        }
        else{
           
           simulateLoad(1000,()=>{
               listSuppliers(suppliers);
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

//check if current page is inventory.html
if(window.location.pathname == "/inventory.html"){
    let login = checkLogin();
    if(login){
    showInventorySummary();
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
                let file = form.invoice_file.files[0];
                let invoice_file = null;
                let inventory = {product:product[0],supplier:supplier[0],invoice_no:invoice_no,quantity:quantity,cif:cif,tpri:tpri,clearing:clearing,buying_price:b_price,selling_price:s_price,invoice:invoice_file};

                if(file){
                    var reader = new FileReader();
                    reader.addEventListener('load',()=>{
                        invoice_file = reader.result;
                        inventory.invoice = invoice_file;
                        saveInventory(inventory);
                    },false);
                    reader.readAsDataURL(file)
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
                form.rep.options.add(new Option(rep.first_name+" "+rep.last_name,rep.id));
            })
        
        
        form.addEventListener('submit',(e)=>{
            e.preventDefault();
            let productId = form.product[form.product.options.selectedIndex].value;
            let repId = form.rep[form.rep.options.selectedIndex].value;
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
            let transaction = {rep:repId,rep_name:rep[0].first_name+" "+rep[0].last_name,product:product[0],invoice_no:invoice_no,quantity:quantity,amount:amount};
            saveTransaction(transaction);
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
            
         
            let sup = {name:name,country:country,email:email,phone:phone,address:address,contact:contact_person};
            
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
                // document.getElementById("edit_link").href = "edit_rep.html?rid="+rep[0].id;
                // document.getElementById("del_link").href = "edit_rep.html?rid="+rep[0].id;
                document.getElementById("preview").src = rep[0].profile;
                
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
            form.contact.value = supplier[0].contact;
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
                let country = countrySelect.value;
                let email = document.getElementById("email").value;
                let phone = document.getElementById("phone").value;
                let address = document.getElementById("address").value;
                
                let sp = supplier[0];

                if(sp.name.toLowerCase() != name.toLowerCase()) sp.name = name;
                if(sp.contact.toLowerCase() != contact.toLowerCase()) sp.contact = contact;
                if(sp.country.toLowerCase() != country.toLowerCase()) sp.country = country;
                if(sp.email.toLowerCase() != email.toLowerCase()) sp.email = email;
                if(sp.phone != phone) sp.phone = phone;
                if(sp.address.toLowerCase() != address.toLowerCase())sp.address = address;
                
                    updateSupplier(sp);
              
               
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
                        rp.profile = fileData;
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
if(window.location.pathname == "/view.html"){
    var urlObject = new URL(window.location.href);
    var params = urlObject.searchParams;
    var id = params.get("id");
    console.log("my image: ",id);
    var inv = db.inventory.filter(inv=>{
        return inv.id == id;
    })
    document.title = "Invoice number "+inv[0].invoice_no;
    document.getElementById("image_viewer").src = inv[0].invoice;
}