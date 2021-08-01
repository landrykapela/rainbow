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
}
else if(isset($_GET['uid'])){
    $userId = $_GET['uid'];
    $result = $api->getProducts($userId);
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










?>