<?php
ini_set("display_errors",0);
require_once('config.php');
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
        if($user === false){
            $result['code'] = 1;
            $result['msg'] = "Could not log you in";
        }
        else{
            $user = $user['user'];
            if(password_verify($password,$user['password'])){
                $result['code'] = 0;
                $result['msg'] = "Successful";
                unset($user['password']);
                $result['user'] = $user;
                
            }
            else{
                $result['code'] = 1;
                $result['msg'] = "Please provide a valid password";
                
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

        if(!$user){
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
            
        }
        
    }
    public function getProducts($userId){
        $result = array();
        $user = $this->getUserById($userId);
        if(!$user){
            $result['code'] = 1;
            $result['msg'] = "You need  to be logged in to perform this operation";
        }
        else{
            $sql = "select * from products where user='".$userId."' order by name asc";
            $query = $this->con->query($sql);
            if(!$query){
                $result['code'] = 1;
                $result['msg'] = "Could not get product listfor user";
                
            }
            else{
                $result['code'] = 0;
                $result['msg'] =  "Successful";
                $products = array();
                while($row = $query->fetch_assoc()) {
                    $products[] = $row;
                }
                $result['products'] = $products; 
            }
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
                $ext = strtolower(pathinfo(UPLOAD_PATH."prodcuts/".basename($image["name"]),PATHINFO_EXTENSION));
                $filename = $id .".".$ext;
                $path = UPLOAD_PATH.$filename;
                $sql = "insert into products (id,name,description,pack_size,user,image) values ('".$id."','".$name."','".$description."','".$packsize."','".$userId."','".$filename."')";
                $query = $this->con->query($sql);
                if(!$query){
                    $result['code'] = 1;
                    $result['msg'] = "Could not create product record ".$this->con->error;
                    
                }
                else{
                    $result['code'] = 0;
                    $result['msg'] =  "Successful";
                    $result['products'] = $this->getProducts($userId)['products']; 
               
                    if(move_uploaded_file($filename,$path)){
                        $result['msg'] = "Image successfully uploaded";
                    }
                    else{
                        $result['msg'] =  "Could not upload image";
                    }
                }
            }
            else{
                $result['code'] = 1;
                $result['msg'] =  "No image";
                $result['products'] = $this->getProducts($user); 
            }
        }
        return $result;
    }
}






?>