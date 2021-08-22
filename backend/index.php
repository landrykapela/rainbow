<?php

// echo $myvar;
// echo phpinfo();

ini_set('display_errors',1);
require_once('api.php');

$api = new API();
//ok
if(isset($_GET['tag'])){
    if(isset($_POST['btnAddProduct'])){
        $data = $_POST;
        $image = $_FILES["image"];
        // $result['posts'] = $data;
        $result = $api->createProduct($data['name'],$data['description'],$data['pack_size'],$data['user_id'],$image);
        echo json_encode($result);
    }
    if(isset($_POST['btnUpdateProduct'])){
        $data = $_POST;
        $image = ($_FILES == null) ? null : $_FILES["image"];
        // $result['posts'] = $data;
        // $result['files'] = $_FILES;
        $result = $api->updateProduct($data['id'],$data['name'],$data['description'],$data['pack_size'],$data['user_id'],$image);
        echo json_encode($result);
    }
    if(isset($_POST['btnAddRep'])){
        $data = $_POST;
        $data['avatar'] = $_FILES['avatar'];
        $result = $api->createRep($data['fname'],$data['lname'],$data['service_area'],$data['phone'],$data['email'],$data['password'],$data['avatar'],$data['admin']);
        echo json_encode($result);
    }
    if(isset($_POST['btnUpdateRep'])){
        $data = $_POST;
        unset($data['btnUpdateRep']);
        $data['avatar'] = $_FILES['avatar'];
        $result = $api->updateRep($data);
        echo json_encode($result);
    }
    if(isset($_POST['btnAddSupplier'])){
        $data = $_POST;
        $result = $api->createSupplier($data['name'],$data['country'],$data['contact'],$data['phone'],$data['email'],$data['address'],$data['admin']);
        echo json_encode($result);
    }
    if(isset($_POST['btnUpdateSupplier'])){
        $data = $_POST;
        unset($data['btnUpdateSupplier']);
        $result = $api->updateSupplier($data);
        echo json_encode($result);
    }
    if(isset($_POST['btnReceiveInventory'])){
        $data = $_POST;
        $data['invoice'] = $_FILES['invoice'];
        $result = $api->receiveInventory($data['product'],$data['supplier'],$data['invoice_no'],$data['invoice'],$data['cif'],$data['clearing'],$data['tpri'],$data['quantity'],$data['selling_price'],$data['buying_price'],$data['admin']);
        echo json_encode($result);
    }
    if(isset($_POST['btnIssueInventory'])){
        $data = $_POST;
        $result = $api->issueInventory($data['product'],$data['rep'],$data['invoice_no'],$data['amount'],$data['quantity'],$data['price'],$data['admin']);
        echo json_encode($result);
    }
    if(isset($_POST['btnTransaction'])){
        $data = $_POST;
        unset($data['btnTransaction']);
        $data['file'] = $_FILES['file'];
        $result = $api->saveTransaction($data);
        echo json_encode($result);
    }
    if(isset($_POST['btnAddCustomer'])){
        $data = $_POST;
        unset($data['btnAddCustomer']);
        $result = $api->createCustomer($data['rep'],$data);
        echo json_encode($result);
    }
    if(isset($_POST['btnUpdateCustomer'])){
        $data = $_POST;
        $id = $data['id'];
        unset($data['id']);
        unset($data['btnUpdateCustomer']);
        $result = $api->updateCustomer($id,$data);
        echo json_encode($result);
    }
    if(isset($_GET['uid']) && $_GET['tag'] == "products"){
        $userId = $_GET['uid'];
        $result = $api->getProducts($userId);
        echo json_encode($result);
    }
    if(isset($_GET['uid']) && $_GET['tag'] == "reps"){
        $userId = $_GET['uid'];
        $result = $api->getReps($userId);
        echo json_encode($result);
    }
    if(isset($_GET['uid']) && $_GET['tag'] == "suppliers"){
        $userId = $_GET['uid'];
        $result = $api->getSuppliers($userId);
        echo json_encode($result);
    }
    if(isset($_GET['uid']) && $_GET['tag'] == "inventory"){
        $userId = $_GET['uid'];
        $result = $api->getInventory($userId);
        echo json_encode($result);
    }
    if(isset($_GET['uid']) && $_GET['tag'] == "customers"){
        $userId = $_GET['uid'];
        $result = $api->getCustomers($userId);
        echo json_encode($result);
    }
    if(isset($_GET['uid']) && $_GET['tag'] == "issues"){
        $userId = $_GET['uid'];
        $result = $api->getIssues($userId);
        echo json_encode($result);
    }
    if(isset($_GET['uid']) && $_GET['tag'] == "transactions"){
        $rid = $_GET['uid'];
        $result = $api->getTransactions($rid);
        echo json_encode($result);
    }
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
   
    //delete items
    if(isset($content->btnDelete)){
        $id = $content->id;
        $user = $content->user_id;
        $type = $content->type;
        switch($type){
            case "product":
                $delete = $api->deleteProduct($id,$user);
                break;
            case "rep":
                $delete = $api->deleteRep($id,$user);
                break;
            case "supplier":
                $delete = $api->deleteSupplier($id,$user);
                break;
            case "customer":
                $delete = $api->deleteCustomer($id,$user);
                break;
        }
       
        echo json_encode($delete);
    }
    
}










?>