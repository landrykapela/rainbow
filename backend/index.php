<?php
header("Access-Control-Allow-Origin: *");
header('Access-Control-Allow-Headers: Content-type'); 
header('Access-Control-Method: POST'); 

ini_set('display_errors',1);
require_once('api.php');

$api = new API();

if(isset($_GET['tag'])){
    $data = !empty($_POST) ? $_POST : json_decode(file_get_contents("php://input"),true);
    $image = null;
    if(!empty($_POST) && isset($_FILES['image'])){
        $image = $_FILES['image'];
    }
    else{
        if(!is_null($data) && isset($data['image'])) $image = $data['image'];
    }
    if(isset($data['btnUpdateUser'])){
        unset($data['btnUpdateUser']);
        $data['image'] = $image;
        $result = $api->updateUser($data);
        echo json_encode($result);
    }
    else if(isset($data['updateAvatar'])){
        $id = $data['id'];
        $result = $api->updateAvatar($id,$image);
        echo json_encode($result);
    }
    else if(isset($data['btnReset'])){
        $result = $api->resetPassword($data['email']);
        echo json_encode($result);
    }
    else if(isset($data['btnAddProduct'])){
        $result = $api->createProduct($data['name'],$data['description'],$data['pack_size'],$data['user_id'],$image);
        echo json_encode($result);
    }
    else if(isset($data["btnEditProduct"])){
        $data['image'] = $image;
        unset($data['btnEditProduct']);
        $result = $api->updateProduct($data);
        echo json_encode($result);
    }
    else if(isset($data["btnDeleteProduct"])){
        unset($data['btnEditProduct']);
        $result = $api->deleteProduct($data);
        echo json_encode($result);
    }
    else if(isset($data["btnDeleteSupplier"])){
        unset($data['btnDeleteSupplier']);
        $result = $api->deleteSupplier($data);
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
        $data['image'] = $image;
        $result = $api->updateRep($data);
        echo json_encode($result);
    }
    else if(isset($data["btnDeleteRep"])){
        unset($data['btnDeleteRep']);
        $result = $api->deleteRep($data['id'],$data['user_id']);
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
        unset($data['btnTransaction']);
        $data['file'] = !empty($_POST) ? $_FILES['file'] : $data['file'];
        $data['status'] = ($data['type'] == 0) ?1:0;
        $result = $api->saveTransaction($data);
        echo json_encode($result);
    }
    else if(isset($data['btnAddCustomer'])){
        unset($data['btnAddCustomer']);
        $data['image'] = $image;//!empty($_POST) ? $_FILES['image'] : $data['image'];
        $result = $api->createCustomer($data['rep'],$data);
        echo json_encode($result);
    }
    else if(isset($data['btnUpdateCustomer'])){
        $data['image'] = $image;
        $id = $data['id'];
        unset($data['id']);
        unset($data['btnUpdateCustomer']);
        $result = $api->updateCustomer($id,$data);
        echo json_encode($result);
    }
    else if(isset($data['btnDeleteCustomer'])){
        $result = $api->deleteCustomer($data['id'],$data['rep']);
        echo json_encode($result);
    }
    else if(isset($data['btnRegPayment'])){
        $data['file'] = !empty($_POST) ? $_FILES['file'] : $data['file'];
        unset($data['btnRegPayment']);
        $result = $api->registerPayment($data);
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
        $uid = $_GET['uid'];
        $result = $api->getTransactions($uid);
        echo json_encode($result);
    }
    else if(isset($_GET['uid']) && $_GET['tag'] == "payments"){
        $uid = $_GET['uid'];
        $result = $api->getPayments($uid);
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
    $result['customers'] = intval($level) == ADMIN ? $api->getAllCustomers($userId) : $api->getCustomers($userId);
    $result['issues'] = $api->getIssues($userId);
    $result['transactions'] = $api->getTransactions($userId,$level);
    $result['products'] = $api->getProducts($userId);
    $result['payments'] = $api->getPayments($userId);
    if(intval($level) == ADMIN){
        $result['inventory'] = $api->getInventory($userId);
        $result['suppliers'] = $api->getSuppliers($userId);
        $result['reps'] = $api->getReps($userId);
    }
    echo json_encode($result);
}
else{
    $result = array();
    $raw = file_get_contents("php://input");
    $content = json_decode($raw);

    // //check signup form
    if(isset($content->btnSignup)){
        $fname = (isset($content->fname) && !empty($content->fname)) ? filter_var($content->fname,FILTER_SANITIZE_STRING) : null;
        $lname = (isset($content->lname) && !empty($content->lname)) ? filter_var($content->lname,FILTER_SANITIZE_STRING) : null;
        $email = (isset($content->email) && !empty($content->email)) ? filter_var($content->email,FILTER_SANITIZE_EMAIL) : null;
        $password = $content->password;
        
        
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
    else if(isset($content->btnLogin)){
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
    else{
        $result['code'] = 1;
        $result['msg'] = "Invalid Request";
        echo json_encode($result);
    }
    
}










?>