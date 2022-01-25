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
                $result['msg'] =  "Successful ".$userId;
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
                $ext = strtolower(pathinfo(UPLOAD_PATH.basename($image["name"]),PATHINFO_EXTENSION));
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
               
                    if(move_uploaded_file($image['tmp_name'],$path)){
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
    public function updateProduct($data){
        $result = array();
        $user = $this->getUserById($data['user_id']);
        $image = $data['image'];
        if($user === false){
            $result['code'] = 1;
            $result['msg'] = "You need  to be logged in to perform this operation";
            $result['u'] = $data['user_id'];
        }
        else{
            $id = $data['id'];
            $sql = "update products set ";
            if($image != null){
                $ext = strtolower(pathinfo(UPLOAD_PATH.basename($image["name"]),PATHINFO_EXTENSION));
                $filename = $id .".".$ext;
                $path = UPLOAD_PATH.$filename;
                $sql .= "image='".$filename."', ";//(id,name,description,pack_size,user,image) values ('".$id."','".$name."','".$description."','".$packsize."','".$userId."','".$filename."')";
            }
            $sql .= "name='".$data['name']."',description='".$data['description']."',pack_size='".$data['pack_size']."' where id='".$id."'";
            $query = $this->con->query($sql);
            if(!$query){
                $result['code'] = 1;
                $result['msg'] = "Could not update product";
                
            }
            else{
                $result['code'] = 0;
                $result['msg'] =  "Successful";
                $result['products'] = $this->getProducts($data['user_id'])['products']; 
            
                if(move_uploaded_file($data['image']['tmp_name'],$path)){
                    $result['msg'] = "Image successfully uploaded";
                }
                else{
                    $result['msg'] =  "Could not upload image";
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
                $ext = strtolower(pathinfo(UPLOAD_PATH.basename($avatar["name"]),PATHINFO_EXTENSION));
                $filename = $id .".".$ext;
                $path = UPLOAD_PATH.$filename;
                
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
    //get reps
    public function getReps($userId){
        $result = array();
        $user = $this->getUserById($userId);
        if(!$user){
            $result['code'] = 1;
            $result['msg'] = "You need  to be logged in to perform this operation";
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
}






?>