<?php


ini_set('display_errors',1);
require_once('api.php');

$api = new API();

if(isset($_GET['tag'])){
    $data = !empty($_POST) ? $_POST : json_decode(file_get_contents("php://input"),true);
    $image = !empty($_POST) ? $_FILES["image"] : $data['image'];
    
    if(isset($data['btnAddProduct'])){
        $result = $api->createProduct($data['name'],$data['description'],$data['pack_size'],$data['user_id'],$image);
        echo json_encode($result);
    }
    else if(isset($data["btnEditProduct"])){
        $data['image'] = $image;
        unset($data['btnEditProduct']);
        $result = $api->updateProduct($data);
        echo json_encode($result);
    }
    else if(isset($data["btnAddSupplier"])){
        $result = $api->createSupplier($data['name'],$data['country'],$data['phone'],$data['email'],$data['address'],$data['contact'],$data['user_id']);
        echo json_encode($result);
    }
    else if(isset($data["btnEditSupplier"])){
        $result = $api->updateSupplier($data);
        echo json_encode($result);
    }
    else if(isset($data["btnEditRep"])){
        unset($data['btnEditRep']);
        $result = $api->updateRep($data);
        echo json_encode($result);
    }
    else if(isset($data["btnAddRep"])){
        $result = $api->createRep($data['fname'],$data['lname'],$data['email'],$data['password'],$data['phone'],$data['service_area'],$data['admin'],$image);
        echo json_encode($result);
    }
    else if(isset($data['btnReceiveInventory'])){
        $data['invoice'] = !empty($_POST) ? $_FILES['invoice'] : $data['invoice'];
        $result = $api->receiveInventory($data['product'],$data['supplier'],$data['invoice_no'],$data['invoice'],$data['cif'],$data['clearing'],$data['tpri'],$data['quantity'],$data['selling_price'],$data['buying_price'],$data['admin']);
        echo json_encode($result);
    }
    else if(isset($data['btnIssueInventory'])){
        $result = $api->issueInventory($data['product'],$data['rep'],$data['invoice_no'],$data['amount'],$data['quantity'],$data['price'],$data['admin']);
        echo json_encode($result);
    }
    else if(isset($data['btnTransaction'])){
        $data = $data;
        unset($data['btnTransaction']);
        $data['file'] = $_FILES['file'];
        $result = $api->saveTransaction($data);
        echo json_encode($result);
    }
    else if(isset($data['btnAddCustomer'])){
        unset($data['btnAddCustomer']);
        $result = $api->createCustomer($data['rep'],$data);
        echo json_encode($result);
    }
    else if(isset($data['btnUpdateCustomer'])){
        $data = $data;
        $id = $data['id'];
        unset($data['id']);
        unset($data['btnUpdateCustomer']);
        $result = $api->updateCustomer($id,$data);
        echo json_encode($result);
    }
    else if(isset($_GET['uid']) && $_GET['tag'] == "products"){
        $userId = $_GET['uid'];
        $result = $api->getProducts($userId);
        echo json_encode($result);
    }
    else if(isset($_GET['uid']) && $_GET['tag'] == "reps"){
        $userId = $_GET['uid'];
        $result = $api->getReps($userId);
        echo json_encode($result);
    }
    else if(isset($_GET['uid']) && $_GET['tag'] == "suppliers"){
        $userId = $_GET['uid'];
        $result = $api->getSuppliers($userId);
        echo json_encode($result);
    }
    else if(isset($_GET['uid']) && $_GET['tag'] == "inventory"){
        $userId = $_GET['uid'];
        $result = $api->getInventory($userId);
        echo json_encode($result);
    }
    else if(isset($_GET['uid']) && $_GET['tag'] == "customers"){
        $userId = $_GET['uid'];
        $result = $api->getCustomers($userId);
        echo json_encode($result);
    }
    else if(isset($_GET['uid']) && $_GET['tag'] == "issues"){
        $userId = $_GET['uid'];
        $result = $api->getIssues($userId);
        echo json_encode($result);
    }
    else if(isset($_GET['uid']) && $_GET['tag'] == "transactions"){
        $rid = $_GET['uid'];
        if(isset($_GET['t'])) $t = 0;
        else $t =1;
        $result = $api->getTransactions($rid,$t);
        echo json_encode($result);
    }
    else{
        $result['code'] = 1;
        $result['msg'] = "Invalid request";
        $result['data'] = $data;    
        echo json_encode($result);
    }
}
else if(isset($_GET['uid'])){
    $userId = $_GET['uid'];
    $level = $_GET['level'];
    $result['products'] = $api->getProducts($userId);
    $result['reps'] = $api->getReps($userId);
    $result['suppliers'] = $api->getSuppliers($userId);
    $result['inventory'] = $api->getInventory($userId);
    $result['issues'] = $api->getIssues($userId);
    $result['transactions'] = $api->getTransactions($userId,$level);
    if($level != ADMIN){
        $result['customers'] = $api->getCustomers($userId);
    }
    echo json_encode($result);
}
else{
    $raw = file_get_contents("php://input");
    // echo $raw;
    $content = json_decode($raw);
    // echo $raw;
    //check signup form
    if(isset($content->btnSignup)){
        $fname = (isset($content->fname) && !empty($content->fname)) ? filter_var($content->fname,FILTER_SANITIZE_STRING) : null;
        $lname = (isset($content->lname) && !empty($content->lname)) ? filter_var($content->lname,FILTER_SANITIZE_STRING) : null;
        $email = (isset($content->email) && !empty($content->email)) ? filter_var($content->email,FILTER_SANITIZE_EMAIL) : null;
        $password = $content->password;
        $result = array();
        
        if($fname != null && $lname != null && $email != null){
            $result = $api->signUp($fname,$lname,$email,$password);
            echo json_encode($result);
        }
        else{
            $result['code'] = 1;
            $result['msg'] = "Fill in all required information";
            echo json_encode($result);
        }
        
    }
    
    if(isset($content->btnLogin)){
        $result = array();
        if(filter_var($content->email,FILTER_VALIDATE_EMAIL)){
            $sign = $api->signIn($content->email,$content->password);
            echo json_encode($sign);
        }
        else{
            $result['code'] = 1;
            $result['msg'] = "Invalid email address";
            echo json_encode($result);
        }
        
        
    }
   
    
}




[
    {"id":"19","invoice_no":"202201260001",
        "product":{"id":"qFQ5u","name":"Balimi","pack_size":"100ML","description":"Balimi ni dawa ya kikohozi cha nguruwe","image":"qFQ5u.jpg","user":"PJsaFZHmuyXv"},
        "rep":{"uid":"EhjKF0sC6ClB","id":"7nKZK","fname":"Ameno","lname":"Dorime","avatar":"7nKZK.jpg","service_area":"Mwanza","phone":"0787777888","email":"ameno@makdavid.com","admin":"PJsaFZHmuyXv"},
        "quantity":"100",
        "price":"2000",
        "amount":"200000",
        "date_created":"1643177442",
        "admin":"PJsaFZHmuyXv"},
    {"id":"20","invoice_no":"202201250002",
        "product":{"id":"NxEHh","name":"Roboto","pack_size":"100ML","description":"100ML Roboto dawa ya mbu wakali wanaosababisha kiherehere","image":"NxEHh.jpg","user":"PJsaFZHmuyXv"},
        "rep":{"uid":"Twcpa8aZ9Yge","id":"aqwcP","fname":"Job","lname":"Ndugai","avatar":"aqwcP.jpg","service_area":"Dodoma","phone":"0788999000","email":"job@makdavid.com","admin":"PJsaFZHmuyXv"},
        "quantity":"500",
        "price":"15000",
        "amount":"7500000",
        "date_created":"1643179457",
        "admin":"PJsaFZHmuyXv"},
    {"id":"21","invoice_no":"202201250002",
        "product":{"id":"Xjfax","name":"Roboto Max","pack_size":"1LT","description":"Roboto max is a 1L packed dawa ya kuuwa mbu wa kali","image":"Xjfax.jpg","user":"PJsaFZHmuyXv"},
        "rep":{"uid":"EhjKF0sC6ClB","id":"7nKZK","fname":"Ameno","lname":"Dorime","avatar":"7nKZK.jpg","service_area":"Mwanza","phone":"0787777888","email":"ameno@makdavid.com","admin":"PJsaFZHmuyXv"},
        "quantity":"200",
        "price":"75000",
        "amount":"15000000",
        "date_created":"1644043846",
        "admin":"PJsaFZHmuyXv"},
    {"id":"25","invoice_no":"202201260001",
        "product":{"id":"qFQ5u","name":"Balimi","pack_size":"100ML","description":"Balimi ni dawa ya kikohozi cha nguruwe","image":"qFQ5u.jpg","user":"PJsaFZHmuyXv"},
        "rep":{"uid":"Twcpa8aZ9Yge","id":"aqwcP","fname":"Job","lname":"Ndugai","avatar":"aqwcP.jpg","service_area":"Dodoma","phone":"0788999000","email":"job@makdavid.com","admin":"PJsaFZHmuyXv"},
        "quantity":"300",
        "price":"2000",
        "amount":"600000",
        "date_created":"1644218003",
        "admin":"PJsaFZHmuyXv"},
    {"id":"26","invoice_no":"202201250002",
        "product":{"id":"Xjfax","name":"Roboto Max","pack_size":"1LT","description":"Roboto max is a 1L packed dawa ya kuuwa mbu wa kali","image":"Xjfax.jpg","user":"PJsaFZHmuyXv"},
        "rep":{"uid":"Twcpa8aZ9Yge","id":"aqwcP","fname":"Job","lname":"Ndugai","avatar":"aqwcP.jpg","service_area":"Dodoma","phone":"0788999000","email":"job@makdavid.com","admin":"PJsaFZHmuyXv"},
        "quantity":"100","price":"75000","amount":"7500000","date_created":"1648386703","admin":"PJsaFZHmuyXv"},
    {"id":"27","invoice_no":"202201260001",
        "product":{"id":"qFQ5u","name":"Balimi","pack_size":"100ML","description":"Balimi ni dawa ya kikohozi cha nguruwe","image":"qFQ5u.jpg","user":"PJsaFZHmuyXv"},
        "rep":{"uid":"EhjKF0sC6ClB","id":"7nKZK","fname":"Ameno","lname":"Dorime","avatar":"7nKZK.jpg","service_area":"Mwanza","phone":"0787777888","email":"ameno@makdavid.com","admin":"PJsaFZHmuyXv"},
        "quantity":"100",
        "price":"2000",
        "amount":"200000",
        "date_created":"1648470194",
        "admin":"PJsaFZHmuyXv"}]





?>