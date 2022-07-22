<?php

require_once('config.php');

use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\SMTP;
use PHPMailer\PHPMailer\Exception;

require_once("vendor/autoload.php");
class API{

    private $con;
    function __construct(){
        $this->con = new mysqli(HOST,USER,PWD,DB);
        
    }

    function test(){
        echo "hello";
    }
    function generateId($length){
        $charSet = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
        $result = "";
        if(is_null($length)) $length = 8;
        for($i=0;$i<$length;$i++){
            $result .= $charSet[rand(0, strlen($charSet) -1)];
        }
        return $result;
    }
    function saveImage($imageFile,$options){
        $uploaded_file = __DIR__+"/data/"+$options['tag']+"/".basename($imageFile['name']);
        move_uploaded_file($options['name'],$upload_dir);
    }
    public function signIn($email,$password){
        
        $result = array();
        $user = $this->getUserByEmail($email);
        if($user == false){
            $result['code'] = 1;
            $result['msg'] = "Could not log you in with this email: ".$email;
        }
        else{
            $u = $user['user'];
            if(password_verify($password,$u['password'])){
                $result['code'] = 0;
                $result['msg'] = "Successful";
                unset($u['password']);
                if(intval($u['level']) == 1) $u['detail'] = $this->getRepByEmail($u['email'])['rep'];
                $result['user'] = $u;
                
            }
            else{
                $result['code'] = 1;
                $result['msg'] = "Please provide a valid password ";
                
            }
        }
        return $result;
    }
    public function getUserByEmail($email){
        $sql = "select * from user where email='".$email."' limit 1";
        $query = $this->con->query($sql);
        if(!$query) return false;
        else{
            if($query->num_rows > 0){
                $result['code'] = 0;
                $result['msg'] = 'Successful';
                $result['user'] = $query->fetch_assoc();
                return $result;
            }
            else return false;
        }
    }
    public function getUserById($id){
        if(gettype($id) == "string"){
            $sql = "select * from user where id='".$id."' limit 1";
            $query = $this->con->query($sql);
            if(!$query){
                return false;
            }
            else{
                if($query->num_rows > 0){
                    $result['code'] = 0;
                    $result['msg'] = 'Successful';
                    $result['user'] = $query->fetch_assoc();
                    return $result;
                }
                return false;
            }
        }
        return false;
        
    }
    public function signUp($fname,$lname,$email,$password){
        $result = array();
        $user = $this->getUserByEmail($email);

        if($user === false){
            $id = $this->generateId(ID_LENGTH);
            $hash = password_hash($password,PASSWORD_BCRYPT);
            $sql = "insert into user (id,fname,lname,email,password) values ('".$id."','".$fname."','".$lname."','".$email."','".$hash."')";
            $query = $this->con->query($sql);
            if(!$query){
                $result['code'] = 1;
                $result['msg'] = "Something went wrong, please try again later ".$this->con->error;
                return $result;
            }
            else{
                $result['code'] = 0;
                $result['msg'] = "Successful";
                $result['user'] = $this->getUserByEmail($email)['user'];
                
                return $result;
                
            }
        }
        else{
            $result['code'] = 1;
            $result['msg'] = "User already exists, please login";
            return $result;
        }
        
    }
    public function updateAvatar($id,$avatar){
        $user = $this->getUserById($id);
        $result = array();
        if($user === false){
            $result['code'] = 1;
            $result['msg'] = 'You need to be logged in to perform this operation';
        }
        else{
            if(isset($avatar) && !is_null($avatar)){
                $ext = 'png';
                if(isset($avatar['name'])){
                    $ext = strtolower(pathinfo(UPLOAD_PATH.basename($avatar["name"]),PATHINFO_EXTENSION));
                }
                $filename = $id .".".$ext;
                $path = UPLOAD_PATH.$filename;
                
                $sql = "update user set avatar='".$filename."' where id='".$id."'";
                $query = $this->con->query($sql);
                if(!$query){
                    $result['code'] = 1;
                    $result['msg'] = 'Sorry, could not update user data';
                    
                }
                else{
                    if(isset($avatar['name'])){
                        move_uploaded_file($avatar['tmp_name'],$path);
                    }
                    else{
                        file_put_contents($path,base64_decode(str_replace(" ","+",$avatar),true));
                    }
                   
                    $result['code'] = 0;
                    $result['msg'] = 'Successful';
                    $y = $this->getUserById($id)['user'];
                    unset($y['password']);
                    if(intval($user['user']['level']) === NORMAL){
                        $u = $this->getRepByEmail($user['user']['email']);
                        $y['detail'] = $u['rep'];
                    }
                    $result['user'] = $y;
                    $q = $this->con->query("update reps set avatar='".$filename."' where email='".$user['user']['email']."'");
                    if(!$q){
                        $result['msg'] = "Could not update rep data: ".$q;
                        $result['error'] = $this->con->error;
                    }
                }
            }
            else{
                $result['code'] = 1;
                $result['msg'] = 'Sorry, there was no image uploaded';
            }
        }
        return $result;
    }
    public function updateUser($data){
        $result = array();
        
        $id = $data['uid'];
        unset($data['image']);
        $email = $data['email'];
        $level = $data['level'];
        unset($data['uid']);
        unset($data['email']);
        unset($data['level']);
        $user = $this->getUserById($id);
        if($user === false){
            $result['code'] = 1;
            $result['msg'] = "You need to be logged in to perform this operation: ";
        }
        else{
            $sql ="update user set ";
            $values = array_values($data);
            $keys = array_keys($data);
            if(sizeof($keys) > 0){
                for($i=0; $i < sizeof($keys);$i++){
                    $val = $values[$i];
                    $key = $keys[$i];
                    
                    if($key == "password"){
                        $newval = password_hash($val,PASSWORD_BCRYPT);
                        $val = $newval;
                    }
                    if($key == "service_area") continue;
                    if($i == sizeof($keys) -1) $sql .= $key .="='".$val."'";
                    else $sql .= $key .="='".$val."',";
                }
                $sql .= " where id='".$id."'";
                unset($data['password']);
                $query = $this->con->query($sql);
                if(!$query){
                    $result['code'] = 1;
                    $result['msg'] = "Sorry, could not update user data ".$sql;
                    $result['error'] = $this->con->error;
                }
                else{
                    if(intval($user['user']['level']) === NORMAL) {    
                        $rep = $this->getRepByEmail($email)['rep'];
                    
                        if(is_null($rep)){
                            $result['code'] = 1;
                            $result['msg'] = "Sorry, could not find rep data";
                        }
                        else{
                            
                            $sql2 ="update reps set ";
                            $values2 = array_values($data);
                            $keys2 = array_keys($data);
                            if(sizeof($keys2) > 0){
                                for($i=0; $i < sizeof($keys2);$i++){
                                    $val = $values2[$i];
                                    $key = $keys2[$i];
                                    
                                    if($i == sizeof($keys2) -1) $sql2 .= $key .="='".$val."'";
                                    else $sql2 .= $key .="='".$val."',";
                                }
                                $sql2 .= " where id='".$rep['id']."'";
                    
                                $query2 = $this->con->query($sql2);

                                if(!$query2){
                                    $result['code'] = 1;
                                    $result['msg'] = "Sorry, could not update rep data ".$sql2;
                                    $result['error'] = $this->con->error;
                                }
                                else{
                                    $u = $this->getUserByEmail($email)['user'];
                                    $result['code'] = 0;
                                    $result['msg'] = "Successful";
                                    $u['detail'] = $this->getRepByEmail($email)['rep'];
                                    unset($u['password']);
                                    $result['user'] = $u;
                                }
                            }
                            else{
                                $u = $this->getUserByEmail($email)['user'];
                                $result['code'] = 0;
                                $result['msg'] = "Successful";
                                $u['detail'] = $this->getRepByEmail($email)['rep'];
                                unset($u['password']);
                                $result['user'] = $u;
                            }
                        }
                    }
                    else{
                        $u = $this->getUserByEmail($email)['user'];
                        unset($u['password']);
                        $result['code'] = 0;
                        $result['msg'] = "Successful";
                        $result['user'] = $u;
                    }
                }           
            }
            else{
                $u = $this->getUserByEmail($email)['user'];
                unset($u['password']);
                $result['code'] = 0;
                $result['msg'] = "Successful";
                $result['user'] = $u;
            }
        }
        return $result;
    }
    public function resetPassword($email){
        $user = $this->getUserByEmail($email);
        $result = array();
        if($user === false){
            $result['code'] = 1;
            $result['msg'] = "Sorry, this account does not exist";
            return $result;
        }
        else{
            $password = $this->generateId(8);
            $hash= password_hash($password,PASSWORD_BCRYPT);
            $sql = "update user set password='".$hash."' where email='".$email."'";
            $query = $this->con->query($sql);
            if(!$query){
                $result['code'] = 1;
                $result['msg'] = "Sorry, could not reset your password";
                return $result;
            }
            else{
                
                $data = array();
                $data['email'] = $email;
                $data['password'] = $password;
                $data['name'] = $user['user']['fname'];
                if($this->sendResetPasswordEmail($data)){
                    $result['code'] = 0;
                    $result['msg'] = "Password has been reset. Check your email for instructions";
                    return $result;
                }
                else{
                    $result['code'] = 0;
                    $result['msg'] = "Password has been reset. But failed to send email";
                    return $result;
                }
            }

        }
      
    }
    public function getProducts($userId){
        $result = array();
        $user = $this->getUserById($userId);
        if($user === false){
            $result['code'] = 1;
            $result['msg'] = "You need to be logged in to perform this operation: ".$userId;
        }
        else{
            if(intval($user['user']['level']) == ADMIN) {
                $sql = "select * from products where user='".$userId."' order by name asc";
                $query = $this->con->query($sql);
                if(!$query){
                    $result['code'] = 1;
                    $result['msg'] = "Could not get product list for user";
                    
                }
                else{
                    $result['code'] = 0;
                    $result['msg'] =  "Successful ";
                    $products = array();
                    while($row = $query->fetch_assoc()) {
                        $products[] = $row;
                    }
                    $result['products'] = $products; 
                }
            }
            else{
                $rep = $this->getRepByEmail($user['user']['email']);
                $result = $this->getProductsForRep($rep['rep']['id']);
            
            }
            
        }
        return $result;
    }
    public function getProductsForRep($repId){
        $result = array();
        $rep = $this->getRepById($repId);
        if($rep['rep'] == null){
            $result['code'] = 1;
            $result['msg'] = "You need to be logged in to perform this operation: ";
            
        }
        else{
            $sql = "SELECT p.*,iss.product from products as p inner join issues as iss on p.id=iss.product where iss.rep='".$repId."'";
            $query = $this->con->query($sql);
            if(!$query){
                $result['code'] = 1;
                $result['msg'] = "Could not get product list for user";
                
            }
            else{
                $result['code'] = 0;
                $result['msg'] =  "Successful ";
                $products = array();
                while($row = $query->fetch_assoc()) {
                    $products[] = $row;
                }
                $result['products'] = $products; 
            }
        }
        return $result;
    }
    public function getProduct($productId){
        $result = array();
        $sql = "select * from products where id='".$productId."' order by name asc limit 1";
        $query = $this->con->query($sql);
        if(!$query){
            $result['code'] = 1;
            $result['msg'] = "Could not get product detail";
            $result['product'] = null;
        }
        else{
            $result['code'] = 0;
            $result['msg'] =  "Successful ";
            $result['product'] = $query->fetch_assoc();
        }
        
        return $result;
    }
    public function createProduct($name,$description,$packsize,$userId,$image){
        $result = array();
        $user = $this->getUserById($userId);
        if($user === false){
            $result['code'] = 1;
            $result['msg'] = "You need  to be logged in to perform this operation";
        }
        else{
            $id = $this->generateId(5);
            if($image != null){
                if(base64_decode($image,true) == false){
                $ext = strtolower(pathinfo(UPLOAD_PATH.basename($image["name"]),PATHINFO_EXTENSION));
                }
                else $ext = "png";
                $filename = $id .".".$ext;
                $path = UPLOAD_PATH.$filename;
                $sql = "insert into products (id,name,description,pack_size,user,image) values ('".$id."','".$name."','".$description."','".$packsize."','".$userId."','".$filename."')";
                $query = $this->con->query($sql);
                if(!$query){
                    $result['code'] = 1;
                    $result['msg'] = "Could not create product record ";
                    $result['error'] = $this->con->error;
                    
                }
                else{
                    $result['code'] = 0;
                    $result['msg'] =  "Successful";
                    $result['products'] = $this->getProducts($userId)['products']; 
                    
                    if(base64_decode($image,true) == false){
                        move_uploaded_file($image['tmp_name'],$path);
                    }
                    else{
                        file_put_contents($path,base64_decode($image,true));
                    }
                    
                }
            }
            else{
                $result['code'] = 1;
                $result['msg'] =  "No image uploaded";
                $result['products'] = $this->getProducts($user); 
            }
        }
        return $result;
    }
    public function deleteProduct($data){
        $result = array();
        $user = $this->getUserById($data['user_id']);
        if($user === false){
            $result['code'] = 1;
            $result['msg'] = "You need  to be logged in to perform this operation";
            
        }
        else{
            $id = $data['id'];
            $sql = "update products set status=1 where id='".$id."'";
            $query = $this->con->query($sql);
            if(!$query){
                $result['code'] = 1;
                $result['msg'] = "Could not update product ";
                
            }
            else{
                $result['code'] = 0;
                $result['msg'] =  "Successful";
                $result['products'] = $this->getProducts($data['user_id'])['products']; 
            }
        }
        return $result;
}
    public function updateProduct($data){
        $result = array();
        $user = $this->getUserById($data['user_id']);
        $image = $data['image'];
        if($user === false){
            $result['code'] = 1;
            $result['msg'] = "You need  to be logged in to perform this operation";
            
        }
        else{
            $id = $data['id'];
            $sql = "update products set ";
            if($image != null && $image != "undefined" && $image != "null"){
                if(base64_decode($image,true) == false){
                    $ext = strtolower(pathinfo(UPLOAD_PATH.basename($image["name"]),PATHINFO_EXTENSION));
                }
                else $ext = "png";
                $filename = $id .".".$ext;
                $path = UPLOAD_PATH.$filename;
                $sql .= "image='".$filename."', ";//(id,name,description,pack_size,user,image) values ('".$id."','".$name."','".$description."','".$packsize."','".$userId."','".$filename."')";
            }
            $sql .= "status='".$data['status']."',name='".$data['name']."',description='".$data['description']."',pack_size='".$data['pack_size']."' where id='".$id."'";
            $query = $this->con->query($sql);
            if(!$query){
                $result['code'] = 1;
                $result['msg'] = "Could not update product ".$this->con->error;
                
            }
            else{
                $result['code'] = 0;
                $result['msg'] =  "Successful";
                $result['products'] = $this->getProducts($data['user_id'])['products']; 
            
                if(base64_decode($image,true) ==false){
                    move_uploaded_file($data['image']['tmp_name'],$path);
                }
                else{
                    file_put_contents($path,base64_decode($image,true));
                }
                
            }
        }
            
        return $result;
    }
    //create supplier
    public function createSupplier($name,$country,$phone,$email,$address,$contact,$admin){
        $result = array();
        $user = $this->getUserById($admin);
        if($user === false){
            $result['code'] = 1;
            $result['msg'] = "You need  to be logged in to perform this operation";
        }
        else{
            $id = $this->generateId(5);
           
                $sql = "insert into suppliers (id,name,country,contact_person,email,phone,address,admin) values 
                ('".$id."','".$name."','".$country."','".$contact."','".$email."','".$phone."','".$address."','".$admin."')";
                $query = $this->con->query($sql);
                if(!$query){
                    $result['code'] = 1;
                    $result['msg'] = "Could not create supplier record ".$this->con->error;
                    
                }
                else{
                    $result['code'] = 0;
                    $result['msg'] =  "Successful";
                    $result['suppliers'] = $this->getSuppliers($admin)['suppliers']; 
               
                }
           
        }
        return $result;
    }
    public function getSupplierById($sid){
        $result = array();
        $query = $this->con->query("select * from suppliers where id='".$sid."'");
        if(!$query){
            $result['code'] = 1;
            $result['msg'] = "Could not get supplier";
            $result['error'] = $this->con->error;
            $result['supplier'] = null;
        }
        else{
            $result['code'] = 0;
            $result['msg'] = "Successful";
            $supplier = $query->fetch_assoc();
            $result['supplier'] = $supplier;
        }
        return $result;
    }
    //list suppliers
    public function getSuppliers($userId){
        $result = array();
        $user = $this->getUserById($userId);
        if(!$user){
            $result['code'] = 1;
            $result['msg'] = "You need  to be logged in to perform this operation";
        }
        else{
            $sql = "select * from suppliers where admin='".$userId."' order by name asc";
            $query = $this->con->query($sql);
            if(!$query){
                $result['code'] = 1;
                $result['msg'] = "Could not get supplier list for user";
                
            }
            else{
                $result['code'] = 0;
                $result['msg'] =  "Successful ".$userId;
                $suppliers = array();
                while($row = $query->fetch_assoc()) {
                    $suppliers[] = $row;
                }
                $result['suppliers'] = $suppliers; 
            }
        }
        return $result;
    }

    //delete supplier
    public function deleteSupplier($data){
        $result = array();
        $user = $this->getUserById($data['user_id']);
        if($user === false){
            $result['code'] = 1;
            $result['msg'] = "You need  to be logged in to perform this operation";
        }
        else{
            $id = $data['id'];  
            $sql = "update suppliers set status=1 where id='".$id."' and admin='".$data['user_id']."'"; 
            $query = $this->con->query($sql);
                if(!$query){
                    $result['code'] = 1;
                    $result['msg'] = "Could not update supplier record ";
                    
                }
                else{
                    $result['code'] = 0;
                    $result['msg'] =  "Successful";
                    $result['suppliers'] = $this->getSuppliers($data['user_id'])['suppliers']; 
               
                }
            }
            return $result;
    }
    //update supplier
    public function updateSupplier($data){
        $result = array();
        $user = $this->getUserById($data['user_id']);
        if($user === false){
            $result['code'] = 1;
            $result['msg'] = "You need  to be logged in to perform this operation";
            $result['user'] = $data['user_id']; 
        }
        else{
            $id = $data['id'];          
                $sql = "update suppliers set name ='".$data['name']."',country='".$data['country']."',contact_person='".$data['contact']."',email='".$data['email']."',phone='".$data['phone']."',address='".$data['address']."'
                WHERE id='".$id."' AND admin='".$data['user_id']."'"; 
                
                $query = $this->con->query($sql);
                if(!$query){
                    $result['code'] = 1;
                    $result['msg'] = "Could not update supplier record ".$this->con->error;
                    
                }
                else{
                    $result['code'] = 0;
                    $result['msg'] =  "Successful";
                    $result['suppliers'] = $this->getSuppliers($data['user_id'])['suppliers']; 
               
                }
           
        }
        return $result;
    }
    //create rep
    public function createRep($fname,$lname,$email,$password,$phone,$area,$admin,$avatar){
        $result = array();
        $user = $this->getUserById($admin);
        if($user === false){
            $result['code'] = 1;
            $result['msg'] = "You need  to be logged in to perform this operation";
        }
        else{
            $id = $this->generateId(5);
            if($avatar != null){
                if(base64_decode($avatar) == false){
                    $ext = strtolower(pathinfo(UPLOAD_PATH.basename($avatar["name"]),PATHINFO_EXTENSION));
                    $filename = $id .".".$ext;
                    $path = UPLOAD_PATH.$filename;   
                    if(move_uploaded_file($avatar['tmp_name'],$path)){
                        $result['msg'] = "Image successfully uploaded";
                    }
                    else{
                        $result['msg'] =  "Could not upload image";
                    }        
                }
                else{
                    // $parts = explode(";base64,",$avatar);
                    // if(sizeof($parts) > 0){
                        $ext = "png";//strtolower(explode("/",$parts[0])[1]);
                        $filename = $id .".".$ext;
                        $path = UPLOAD_PATH.$filename;
                        file_put_contents($path,base64_decode($avatar));
                    // }
                    // else{

                    // }
                    
                }
                
                
                $sql = "insert into reps (id,fname,lname,email,phone,service_area,admin,avatar) values 
                ('".$id."','".$fname."','".$lname."','".$email."','".$phone."','".$area."','".$admin."','".$filename."')";
                $query = $this->con->query($sql);
                if(!$query){
                    $result['code'] = 1;
                    $result['msg'] = "Could not create rep record ";
                
                }
                else{
                    $uid = $this->generateId(ID_LENGTH);
                    $hash = password_hash($password,PASSWORD_BCRYPT);
                    $sql2 = "insert into user (id,fname,lname,email,password,level) values('".$uid."','".$fname."','".$lname."','".$email."','".$hash."',1)";
                    $q = $this->con->query($sql2);
                    if($q){
                        $result['code'] = 0;
                        $result['msg'] =  "Successful";
                        
                    }
                    else{
                        $this->con->query("delete from reps where id='".$id."'");
                        $result['code'] = 1;
                        $result['msg'] =  "Sorry, could not create rep ".$email;
                        unlink($path);
                    }

                    $result['reps'] = $this->getReps($admin)['reps']; 
                }
               
            }
            else{
                $sql = "insert into reps (id,fname,lname,email,phone,service_area,admin,avatar) values 
                ('".$id."','".$fname."','".$lname."','".$email."','".$phone."','".$area."','".$admin."','".$filename."')";
                $query = $this->con->query($sql);
                if(!$query){
                    $result['code'] = 1;
                    $result['msg'] = "Could not create rep record ";
                
                }
                else{
                    $uid = $this->generateId(ID_LENGTH);
                    $hash = password_hash($password,PASSWORD_BCRYPT);
                    $sql2 = "insert into user (id,fname,lname,email,password,level) values('".$uid."','".$fname."','".$lname."','".$email."','".$hash."',1)";
                    $q = $this->con->query($sql2);
                    if($q){
                        $result['code'] = 0;
                        $result['msg'] =  "Successful";
                        if(move_uploaded_file($avatar['tmp_name'],$path)){
                            $result['msg'] = "Image successfully uploaded";
                        }
                        else{
                            $result['msg'] =  "Could not upload image";
                        } 
                    }
                    else{
                        $this->con->query("delete from reps where id='".$id."'");
                        $result['code'] = 1;
                        $result['msg'] =  "Sorry, could not create rep ".$email;
                    }

                    $result['reps'] = $this->getReps($admin)['reps']; 
                }
            }
        }
        return $result;
    }
    //update rep
    public function updateRep($data){
        $result = array();
        $rep = $this->getRepById($data['id']);
        if($rep['rep'] == null){
            $result['code'] = 1;
            $result['msg'] = "Invalid rep";
        }
        else{
            $avatar = null;
            $password = null;
            if($data['password'] != null){
                $password = password_hash($data['password'],PASSWORD_BCRYPT);
                unset($data['password']);
            }
            else{
                unset($data['password']);
            }
            if(isset($data['image']) && $data['image'] != null && $data['image'] !="null" && $data["image"] !="undefined") {
                $avatar = $data['image'];
                // unset($data['image']);
                
                
                if(gettype($avatar) == "string"){
                    $filename = ($rep['rep']['avatar']) ? $rep['rep']['avatar']:$rep['rep']['id'].".png";
                    $path = UPLOAD_PATH.$filename;
                    file_put_contents($path,base64_decode($avatar));
                }
                else{
                    $ext = strtolower(pathinfo(UPLOAD_PATH.basename($avatar["name"]),PATHINFO_EXTENSION));
                    $filename = ($rep['rep']['avatar']) ? $rep['rep']['avatar']:$rep['rep']['id'].".".$ext;
                    $path = UPLOAD_PATH.$filename;
                    move_uploaded_file($avatar['tmp_name'],$path);
                }
                
            }
            else unset($data['image']);
            $needCheck = ($rep['rep']['email'] != $data['email']);
            $check = false;
            if($needCheck) $check = $this->getUserByEmail($data['email']);            
            if(!$check){
                $values = array_values($data);
                $keys = array_keys($data);
                $sql = "update reps set ";
                for($i=0; $i < sizeof($keys);$i++){
                    $val = $values[$i];
                    $key = $keys[$i];
                    if($key == "image" && isset($data['image'])){
                        $key = "avatar";
                        $val = $filename;
                    }
                    if($i == sizeof($keys) -1) $sql .= $key .="='".$val."'";
                    else $sql .= $key .="='".$val."',";
                }
                $sql .= " where id='".$data['id']."'";
                // $result['msg'] = $sql;
                $query = $this->con->query($sql);
                if(!$query){
                    $result['code'] = 1;
                    $result['msg'] = "Could not update rep";
                    $result['error'] = $this->con->error;
                }
                else{
                    $q = "update user set";
                    if(!empty($password)){
                        $p = " password = '".$password."'";
                    }
                    if($needCheck){
                        $e = " email='".$data['email']."'";
                    }
                    if(!empty($p) || !empty($e)){
                        if(!empty($p)) {
                            $q .= $p;
                            if(!empty($e)) $q .= ", ".$e;
                        }
                        else{
                            if(!empty($e)) $q.=$e;
                        }
                        $q .=" where id='".$rep['rep']['uid']."'";
                        $sql2 = $this->con->query($q);
                    }
                    
                    $result['code'] = 0;
                    $result['msg'] = "Successful";
                    $result['error'] = $this->con->error;
                    $result['reps'] = $this->getReps($data['admin'])['reps'];//$data['admin'] != null) ? $this->getReps($data['admin']) : $this->getRepById($data['id']);
                }
            }
            else{
                $result['code'] = 1;
                $result['msg'] = "You cannot use this email address";
                $result['error'] = "E-mail address already registered";
            }
        }
       
        return $result;
    }
    //get reps
    public function getReps($userId){
        $result = array();
        $user = $this->getUserById($userId);
        if(!$user){
            $result['code'] = 1;
            $result['msg'] = "You need to be logged in to perform this operation";
        }
        else{
            $sql = "select * from reps where admin='".$userId."' order by fname asc";
            $query = $this->con->query($sql);
            if(!$query){
                $result['code'] = 1;
                $result['msg'] = "Could not get reps list for user";
                
            }
            else{
                $result['code'] = 0;
                $result['msg'] =  "Successful ";
                $reps = array();
                while($row = $query->fetch_assoc()) {
                    $reps[] = $row;
                }
                $result['reps'] = sizeof($reps)>0 ? $reps:array(); 
            }
        }
        return $result;
    }
    public function getRep($userId,$repId){
        $result = array();
        $user = $this->getUserById($userId);
        if(!$user){
            $result['code'] = 1;
            $result['msg'] = "Could not find user";
            $result['error'] = $this->con->error;
            $result['rep'] = null;
        }
        else{
            $query = $this->con->query("select u.id as uid,u.password,r.* from user as u inner join reps as r on u.email=r.email where r.admin='".$userId."' and r.id='".$repId."'");
            if(!$query){
                $result['code'] = 1;
                $result['msg'] = "Could not get reps";
                $result['error'] = $this->con->error;
                $result['rep'] = null;
            }
            else{
                $result['code'] = 0;
                $result['msg'] = "Successful ";
                $rep = $query->fetch_assoc();
                $result['rep'] = $rep;
            }
        }
        return $result;
    }
    public function getRepById($repId){
        $result = array();
        $query = $this->con->query("select u.id as uid,r.* from user as u inner join reps as r on u.email=r.email where r.id='".$repId."'");
        if(!$query){
            $result['code'] = 1;
            $result['msg'] = "Could not get rep";
            $result['error'] = $this->con->error;
            $result['rep'] = null;
        }
        else{
            $result['code'] = 0;
            $result['msg'] = "Successful";
            $rep = $query->fetch_assoc();
            unset($rep['password']);
            $result['rep'] = $rep;
        }
        return $result;
    }
    public function getRepByEmail($email){
        $result = array();
        $query = $this->con->query("select u.id as uid,u.level,r.* from user as u inner join reps as r on u.email=r.email where r.email='".$email."'");
        if(!$query){
            $result['code'] = 1;
            $result['msg'] = "Could not get rep";
            $result['error'] = $this->con->error;
            $result['rep'] = null;
        }
        else{
            $result['code'] = 0;
            $result['msg'] = "Successful";
            $rep = $query->fetch_assoc();
            unset($rep['password']);
            $result['rep'] = $rep;
        }
        return $result;
    }
    public function deleteRep($rid,$userId){
        $this->con->autocommit(false);
        $result = array();
        $rep = $this->getRepById($rid);
        if($rep['rep'] == null){
            $result['code'] = 1;
            $result['msg'] = "Invalid rep";
            $result['error'] = $this->con->error;
        }
        else{
            $sql = "delete from user where id='".$rep['rep']['uid']."'";
            $query = $this->con->query($sql);
            if(!$query){
                $result['code'] = 1;
                $result['msg'] = "Could not delete rep";
                $result['error'] = $this->con->error;
            }
            else{
                $query2 = $this->con->query("update reps set status=1 where id='".$rid."'");
                if(!$query2){
                    $this->con->rollback();
                    $result['code'] = 1;
                    $result['msg'] = "Could not delete rep";
                    $result['error'] = $this->con->error;
                }
                else{
                    if($this->con->commit()){
                        $result['code'] = 0;
                        $result['msg'] = "Successful ";
                        $result['reps'] = $this->getReps($userId)['reps'];
                    }
                    else{
                        $result['code'] = 1;
                        $result['msg'] = "Could not save changes";
                        $result['reps'] = $this->getReps($userId)['reps'];
                    }
                }
            }
        }
        $this->con->close();
        // echo json_encode($result);
        return $result;
    }
    public function sameInventory($userId,$invoiceNo,$product){
     
        $query = $this->con->query("select * from inventory where admin='".$userId."' and invoice_no='".$invoiceNo."' and product='".$product."'");
        if(!$query) return false;
        else{
            
            $invoices = array();
            while($r=$query->fetch_assoc()){
                if(isset($r['product'])) $r['product'] = $this->getProduct($r['product'])['product'];
                if(isset($r['supplier'])) $r['supplier'] = $this->getSupplierById($r['supplier'])['supplier'];
                $invoices[] = $r;
            }
            if(sizeof($invoices) > 0) return true;
        }
       
    }
    public function receiveInventory($product,$supplier,$invoice_no,$invoice,$cif,$clearing,$tpri,$quantity,$selling_price,$buying_price,$admin){
        $result = array();
        $sql = "insert into inventory (product,supplier,invoice_no,cif,clearing,tpri,quantity,selling_price,buying_price,admin,date_created) values('".$product."','".$supplier."','".$invoice_no."','".$cif."','".$clearing."','".$tpri."',".$quantity.",'".$selling_price."','".$buying_price."','".$admin."',".time().")";
        
        $user = $this->getUserById($admin);
        if(!$user){
            $result['code'] = 1;
            $result['msg'] = "You need to login";
            $result['error'] = $this->con->error;
        }
        else{
            if($this->sameInventory($admin,$invoice_no,$product)){
                $result['code'] = 1;
                $result['msg'] = "This seems to be a duplicate. Verify that you are entering correct information";
                $result['error'] = "";
            }
            else{
                $query = $this->con->query($sql);
                if(!$query){
                    $result['code'] = 1;
                    $result['msg'] = "Could not create inventory record";
                    $result['error']= $this->con->error;
                }
                else{
                    $msg = "Successful but no invoice uploaded";
                    if($invoice != null){
                        if(base64_decode($invoice) == false){
                           $ext = strtolower(pathinfo(UPLOAD_PATH.basename($invoice["name"]),PATHINFO_EXTENSION));
                         
                        }
                        else $ext = "pdf";
                        $filename = $invoice_no.".".$ext;
                        $path = __DIR__ ."/".UPLOAD_PATH.$filename;
        
                        $sql = "update inventory set invoice='".$filename."' where invoice_no='".$invoice_no."'";
                        if($this->con->query($sql)) {
                            if(base64_decode($invoice) == false){
                                if(move_uploaded_file($invoice['name'],$path)){
                                $msg = "Successful and invoice was uploaded to ".$path;
                                }
                                else $msg = "Could not upload to path".$path;
                            }
                            else {
                                file_put_contents($path,base64_decode($invoice));
                            $msg = "Successful and invoice was uploaded";
                            }
                        }
                        $result['code'] = 0;
                        $result['msg'] = $msg;
                        $result['inventory'] = $this->getInventory($admin)['inventory'];
                    }
                }  
            }
        }
        return $result;
    }
    public function issueInventory($product,$rep,$invoice_no,$amount,$quantity,$price,$admin){
        $sql = "insert into issues (product,rep,invoice_no,amount,quantity,price,admin,date_created) values('".$product."','".$rep."','".$invoice_no."','".$amount."',".$quantity.",'".$price."','".$admin."',".time().")";
        $user = $this->getUserById($admin);
        if(!$user){
            $result['code'] = 1;
            $result['msg'] = "Could not find user";
            $result['error'] = $this->con->error;
        }
        else{
            $query = $this->con->query($sql);
            if(!$query){
                $result['code'] = 1;
                $result['msg'] = "Could not issue inventory";
                $result['error']= $this->con->error;
            }
            else{
                $result['code'] = 0;
                $result['msg'] = "Successful";
                $result['issues'] = $this->getIssues($admin)['issues'];
            }
        }
        return $result;
    }
    public function getInventory($userId){
        $result = array();
        $user = $this->getUserById($userId);
        if(!$user){
            $result['code'] = 1;
            $result['msg'] = "Could not find user";
            $result['error'] = $this->con->error;
        }
        else{
            $query = $this->con->query("select * from inventory where admin='".$userId."' order by date_created desc");
            if(!$query){
                $result['code'] = 1;
                $result['msg'] = "Could not get inventory";
                $result['error'] = $this->con->error;
            }
            else{
                $result['code'] = 0;
                $result['msg'] = "Successful";
                $inventory = array();
                while($r=$query->fetch_assoc()){
                    if(isset($r['product'])) $r['product'] = $this->getProduct($r['product'])['product'];
                    if(isset($r['supplier'])) $r['supplier'] = $this->getSupplierById($r['supplier'])['supplier'];
                    $inventory[] = $r;
                }
                $result['inventory'] = $inventory;
            }
        }
        return $result;
    }
    public function getIssues($userId){
        $result = array();
        $user = $this->getUserById($userId);
        if(!$user){
            $result['code'] = 1;
            $result['msg'] = "Could not find user";
            $result['error'] = $this->con->error;
        }
        else{
            if($user['user']['level'] == ADMIN){
                $sql = "select * from issues where admin='".$userId."'";
            }
            else{
                $rep = $this->getRepByEmail($user['user']['email'])['rep'];
                $sql = "select * from issues where rep='".$rep['id']."'";
            }
            
            $query = $this->con->query($sql);
            if(!$query){
                $result['code'] = 1;
                $result['msg'] = "Could not get inventory ";
                $result['error'] = $this->con->error;
            }
            else{
                $result['code'] = 0;
                $result['msg'] = "Successful";
                $issues = array();
                while($r=$query->fetch_assoc()){
                    if(isset($r['product'])) $r['product'] = $this->getProduct($r['product'])['product'];
                    if(isset($r['rep'])) $r['rep'] = $this->getRepById($r['rep'])['rep'];
                    $issues[] = $r;
                }
                $result['issues'] = $issues;
            }
        }
        return $result;
    }
    public function getCustomer($id){
        $result = array();
        $user = $this->getUserById($id);
        
        $query = $this->con->query("select * from customers where id='".$id."' limit 1");
        if(!$query){
            $result['code'] = 1;
            $result['msg'] = "Could not get customer";
            $result['error'] = $this->con->error;
        }
        else{
            $result['code'] = 0;
            $result['msg'] = "Successful";
            $customer = null;
            while($r=$query->fetch_assoc()){
                $customer = $r;
            }
            $result['customer'] = $customer;
        }     
        return $result; 
    }
    public function getCustomers($userId){
        $result = array();
        $user = $this->getUserById($userId);
        if(!$user){
            $result['code'] = 1;
            $result['msg'] = "Could not find user";
            $result['error'] = $this->con->error;
        }
        else{
            $query = $this->con->query("select * from customers where rep='".$userId."'");
            if(!$query){
                $result['code'] = 1;
                $result['msg'] = "Could not get customer";
                $result['error'] = $this->con->error;
            }
            else{
                $result['code'] = 0;
                $result['msg'] = "Successful";
                $customers = array();
                while($r=$query->fetch_assoc()){
                    $customers[] = $r;
                }
                $result['customers'] = $customers;
            }
        }
        return $result; 
    }
    public function createCustomer($userId,$data){
        
        $result = array();
        $user = $this->getUserById($userId);
        if(!$user){
            $result['code'] = 1;
            $result['msg'] = "Could not find user";
            $result['error'] = $this->con->error;
        }
        else{
            $id = $this->generateId(12);
            $data['id'] = $id;
            $image = $data['image'];
            unset($data['image']);
            $hasImage = false;
            if(isset($image)){
                $hasImage = true;
                if(base64_decode($image,true) == false){
                    $ext = strtolower(pathinfo(UPLOAD_PATH.basename($image["name"]),PATHINFO_EXTENSION));
                }
                else $ext = "png";
                $filename = $id .".".$ext;
                $path = UPLOAD_PATH.$filename;
            }
            $sql = "insert into customers (";
            $cols = "";
            for($i=0;$i<sizeof(array_keys($data));$i++){
                $cols .= array_keys($data)[$i].", ";
            }
            
            $vals = "";
            for($i=0;$i<sizeof(array_values($data));$i++){
                $vals .= "'".array_values($data)[$i]."', ";
            }
            if($hasImage){
                if(base64_decode($image,true) == false){
                    move_uploaded_file($image['tmp_name'],$path);
                }
                else{
                    file_put_contents($path,base64_decode($image,true));
                }
                $cols .= 'image,';
                $vals .="'".$filename."',";
            }
            $cols .= "date_created) values (";
            $vals .= time().")";

            $sql .= $cols . $vals;
            
            $query = $this->con->query($sql);
            if(!$query){
                $result['code'] = 1;
                $result['msg'] = "Could not create customer";
                $result['error'] = $this->con->error;
            }
            else{
                $result['code'] = 0;
                $result['msg'] = "Successful ".$sql;
                $result['customers'] = $this->getCustomers($userId)['customers'];
            }
        }
        return $result; 
    }
    public function updateCustomer($cid,$data){
        
        $result = array();
        $user = $this->getUserById($data['rep']);
        if(!$user){
            $result['code'] = 1;
            $result['msg'] = "Could not find user";
            $result['error'] = $this->con->error;
        }
        else{
            $image = $data['image'];
            unset($data['image']);
            $hasImage = false;
            if(isset($image)){
                $hasImage = true;
                if(base64_decode($image,true) == false){
                    $ext = strtolower(pathinfo(UPLOAD_PATH.basename($image["name"]),PATHINFO_EXTENSION));
                }
                else $ext = "png";
                $filename = $cid .".".$ext;
                $path = UPLOAD_PATH.$filename;
                $data['image'] = $filename;
            }
            if(sizeof(array_keys($data)) > 0){
                $sql = "update customers set ";
                for($i=0;$i<sizeof(array_keys($data));$i++){
                    $sql .= array_keys($data)[$i]."= '".array_values($data)[$i]."'";
                    if($i < sizeof(array_values($data)) -1) $sql .=", ";
                }
               
                $sql .= " where id='".$cid."'";


                $query = $this->con->query($sql);
                if(!$query){
                    $result['code'] = 1;
                    $result['msg'] = "Could not update customer";
                    $result['error'] = $this->con->error;
                }
                else{
                    if($hasImage){
                        if(base64_decode($image,true) == false){
                            move_uploaded_file($image['tmp_name'],$path);
                        }
                        else file_put_contents($path,base64_decode($image,true));
                    }
                    $result['code'] = 0;
                    $result['msg'] = "Successful ".$sql;
                    $result['customers'] = $this->getCustomers($data['rep'])['customers'];
                }
            }
            else{
                $result['code'] = 0;
                $result['msg'] = "There is nothing to update";
                $result['customers'] = $this->getCustomers($data['rep'])['customers'];
            }
            
        }
        return $result; 
    }
    public function deleteCustomer($cid,$rep){
        $result = array();
        $user = $this->getUserById($rep);
        if(!$user){
            $result['code'] = 1;
            $result['msg'] = "Could not find user";
            $result['error'] = $this->con->error;
        }
        else{
            $sql = "update customers set status=1 where id='".$cid."' and rep='".$rep."'";
            $query = $this->con->query($sql);
            if(!$query){
                $result['code'] = 1;
                $result['msg'] = "Could not delete customer";
                $result['error'] = $this->con->error;
            }
            else{
                $result['code'] = 0;
                $result['msg'] = "Successful";
                $result['customers'] = $this->getCustomers($rep)['customers'];
            }
            
        }
        return $result; 
    }
    public function saveTransaction($data){
        $result = array();
        $rep = $this->getRepById($data['rep'])['rep'];
        if($rep == null){
            $result['code'] = 1;
            $result['msg'] = "Please login to use this feature";
            
        }
        else{
            $id = $this->generateId(16);
            $file = $data['file'];
            // $result['d'] = $data;
            unset($data['file']);
            $sql = "insert into transactions (id,";
            for($i=0;$i<sizeof(array_keys($data));$i++){
                $sql .= array_keys($data)[$i].", ";
            }
            if($file != null) $sql .= "file, ";
            $sql .= "date_created) values ('".$id."',";

            for($i=0;$i<sizeof(array_values($data));$i++){
                if(gettype(array_values($data)[$i]) == "string") $sql .= "'".array_values($data)[$i]."',";
                else $sql .= array_values($data)[$i].",";
            }
            if($file != null){
                if(base64_decode($file,true) == false){
                    $ext = strtolower(pathinfo(UPLOAD_PATH.basename($file["name"]),PATHINFO_EXTENSION));
                    $filename = $id.".".$ext;
                    move_uploaded_file($file['tmp_name'],UPLOAD_PATH.$filename);
                }
                else{
                    $ext = "png";
                    $filename = $id.".".$ext;
                    $path = UPLOAD_PATH.$filename;
                    file_put_contents($path,base64_decode($file,true));
                }
                $sql .= "'".$filename."',";

            }
            $sql .= time().")";
            $query = $this->con->query($sql);
            if(!$query){
                $result['code'] = 1;
                $result['msg'] = "Could not record transaction";
                $result['error'] = $this->con->error;
            }
            else{
                $result['code'] = 0;
                $result['msg'] = "Success";
                $result['transactions'] = $this->getTransactions($rep['uid'])['transactions'];
            }
        }    
        return $result;
    }
    public function getTransactions($owner){
        $result = array();
        $user = $this->getUserById($owner);
        if($user == false){
            $result['code'] = 1;
            $result['msg'] = "You must login to send this request";
        }
        else{
            if($user['user']['level'] == ADMIN){
               $sql = "select * from transactions where admin='".$owner."' order by date_created desc";
            }
            else{
                $rep = $this->getRepByEmail($user['user']['email'])['rep'];
                $sql = "select * from transactions where rep='".$rep['id']."' order by date_created desc";
            }
            $query = $this->con->query($sql);
            if(!$query){
                $result['code'] = 1;
                $result['msg'] = "Could not get transactions";
                $result['error'] = $this->con->error;
            }   
            else{
                $result['code'] = 0;
                $result['msg'] = "Successful";
                $transactions = array();
                while($r=$query->fetch_assoc()){
                    $r['rep'] = $this->getRepById($r['rep'])['rep'];
                    $r['product_detail'] = $this->getProduct($r['product'])['product'];
                    $r['customer_detail'] = $this->getCustomer($r['customer'])['customer'];
                    $transactions[] = $r;
                }
                $result['transactions'] = $transactions;
                
            }
        }
        return $result;
    }
    
     //send reset password email
     function sendResetPasswordEmail($data){
        $html = '<html lang="en">
        <head>
            <meta charset="utf-8" />
            <meta name="viewport" content="width=device-width, initial-scale=1" />
            <meta name="theme-color" content="#000000" />
            <meta
            name="description"
            content="Rainbow Distribution Management System"
            />
            
            <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.0.0-beta2/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-BmbxuPwQa2lc/FVzBcNJ7UAyJxM6wuqIj61tLrc4wSX0szH/Ev+nYRRuWlolflfl" crossorigin="anonymous">
            <link href="https://fonts.googleapis.com/icon?family=Material+Icons"
            rel="stylesheet">
            <title>Rainbow Distribution Management System</title>
        </head>
        <body>
        <main class="m-4">
        
        <div class="col-md-8 col-lg-8 col-sm-10 offset-2" >
            <div class="primary-text my-3 fs-3 text-center">Password Reset</div>
            <div class="form-group my-2 col-md-6 col-lg-6 col-sm-10 offset-lg-3 offset-md-3 offset-sm-1">
            <p>Dear <span class="text-capitalize">'.$data['name'].',</span></p>
                <p>A password reset was requested using this email address. If it is not you, please ignore this message</p>
                <p>Your new password is: <strong>'.$data['password'].'</strong>
            </div>
            
            
        </div>

        </main></body></html>';     

        $to = "info@mak-david.com";//$this->email;

        $subject = SERVICE;

        $mail = new PHPMailer(true);
        $mail->isSMTP();
        $mail->Host = SMTP;
        $mail->SMTPAuth=true;
        $mail->SMTPSecure= "ssl";
        $mail->Port = 465;
        $mail->Username = EMAIL;
        $mail->Password = SECRET;
        $mail->From = EMAIL;
        $mail->FromName = SERVICE;
        $mail->isHTML(true);
        $mail->addAddress($to);
        // $mail->addAddress($data['email']);
        $mail->Subject =$subject;
        $mail->Body = $html;
        try{
            $mail->send();
            
            return true;
        }
        catch(Exception $e){
            
            return $mail->ErrorInfo;
        }
    }
}






?>