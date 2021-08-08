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
    function saveImage($imageFile,$filename){
        $path =UPLOAD_PATH.basename($filename);
        if(is_dir(UPLOAD_PATH)){
            if(move_uploaded_file($imageFile['tmp_name'],$path)) return true;
            else return false;
        }
        else{
            mkdir(UPLOAD_PATH,0777,true);
            if(move_uploaded_file($imageFile['tmp_name'],$path)) return true;
            else return false;
        }
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
    public function signUp($fname,$lname,$email,$password,$level=null){
        $result = array();
        $user = $this->getUserByEmail($email);
        if($level == null) $level = 0;
        
        if($user === false){
            $id = $this->generateId(ID_LENGTH);
            $hash = password_hash($password,PASSWORD_BCRYPT);
            $sql = "insert into user (id,fname,lname,email,password,level) values ('".$id."','".$fname."','".$lname."','".$email."','".$hash."',".$level.")";
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
    public function createProduct($name,$description,$packsize,$userId,$image){
        
        $result = array();
        $user = $this->getUserById($userId);
        if($user === false){
            $result['code'] = 1;
            $result['msg'] = "You need  to be logged in to perform this operation ".$userId;
        }
        else{
            $id = $this->generateId(5);
            if($image != null){
                $ext = strtolower(pathinfo(UPLOAD_PATH.basename($image["name"]),PATHINFO_EXTENSION));
                $filename = $id .".".$ext;
                $sql = "insert into products (id,name,description,pack_size,user,image) values ('".$id."','".$name."','".$description."','".$packsize."','".$userId."','".$filename."')";
                $query = $this->con->query($sql);
                if(!$query){
                    $result['code'] = 1;
                    $result['msg'] = "Could not create product record ".$this->con->error;
                    
                }
                else{
                    $result['code'] = 0;
                    $result['msg'] =  "Successful ";
                    $result['products'] = $this->getProducts($userId)['products']; 
                    if($this->saveImage($image,$filename)) $result['msg'] = "Image successfully saved";
                    else $result['msg'] = "Image could not be saved";
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
    public function updateProduct($id,$name,$description,$packsize,$userId,$image){
        $result = array();
        $user = $this->getUserById($userId);
        if($user === false){
            $result['code'] = 1;
            $result['msg'] = "You need  to be logged in to perform this operation";
        }
        else{
            
            if($image != null){
                $ext = strtolower(pathinfo(UPLOAD_PATH.basename($image["name"]),PATHINFO_EXTENSION));
                $filename = $id .".".$ext;
                
                $sql = "update products set name='".$name."',description='".$description."',pack_size='".$packsize."',image='".$filename."' where id='".$id."'";
                $query = $this->con->query($sql);
                if(!$query){
                    $result['code'] = 1;
                    $result['msg'] = "Could not update product ";
                    $result['error'] = $this->con->error;
                }
                else{
                    $result['code'] = 0;
                    $result['msg'] =  "Product successfully updated ";
                    $result['products'] = $this->getProducts($userId)['products']; 
                    if($this->saveImage($image,$filename)) $result['msg'] = "Image successfully uploaded";
                    else$result['msg'] =  "Could not upload image";
                }
            }
            else{
                $sql = "update products set name='".$name."',description='".$description."',pack_size='".$packsize."' where id='".$id."'";
                $query = $this->con->query($sql);
                if(!$query){
                    $result['code'] = 1;
                    $result['msg'] = "Could not update product ";
                    $result['error'] = $this->con->error;
                }
                else{
                    $result['code'] = 0;
                    $result['msg'] =  "Product successfully updated ";
                    $result['products'] = $this->getProducts($userId)['products']; 
                }
            }
            return $result;
        }
    }
    public function deleteProduct($pid,$userId){
        $result = array();
        $sql = "delete from products where id='".$pid."' and user='".$userId."'";
        $query = $this->con->query($sql);
        if(!$query){
            $result['code'] = 1;
            $result['msg'] = "Could not delete product";
            $result['error'] = $this->con->error;
        }
        else{
            $result['code'] = 0;
            $result['msg'] = "Successful ";
            $result['products'] = $this->getProducts($userId)['products'];
        }
        // echo json_encode($result);
        return $result;
    }
    public function createRep($fname,$lname,$area,$phone,$email,$password,$avatar,$admin){
        $result = array();
        $check = $this->getUserByEmail($email);
        if(!$check){
            $check = $this->getUserById($admin);
            if(!$check){
                $result['code'] = 1;
                $result['msg'] = "You need to be logged in as admin";
                $result['error'] = $this->con->error;
            }
            else{
                $id = $this->generateId(ID_LENGTH);
                $sql = "insert into reps (id,fname,lname,email,phone,admin,service_area) values('".$id."','".$fname."','".$lname."','".$email."','".$phone."','".$admin."','".$area."')";
                $query = $this->con->query($sql);
                if(!$query){
                    $result['code'] = 1;
                    $result['msg'] = "Could not create rep";
                    $result['error'] = $this->con->error;
                }
                else{
                    $user = $this->signUp($fname,$lname,$email,$password,1);
                    if(!$user){
                        $result['code'] = 1;
                        $result['msg'] = "Could not create user credentials";
                        $result['error'] = $this->con->error;
                    }
                    else{
                        $msg = "Successful";
                        if($avatar){
                            $ext = strtolower(pathinfo(UPLOAD_PATH.basename($avatar["name"]),PATHINFO_EXTENSION));
                            $filename = $id .".".$ext;
                            if($this->saveImage($avatar,$filename)) {
                                $up = $this->con->query("update reps set avatar='".$filename."' where id='".$id."'");
                                if(!$up){
                                    $msg = "Something went wrong while updating image info! Oops!";
                                }
                                else $msg = "Image successfully saved";
                            }
                            else $msg = "Image could not be saved";
                        }
                        $result['code'] = 0;
                        $result['msg'] = $msg;
                        $result['reps'] = $this->getReps($admin);
                    }
                }
            }
        }
        else{
            $result['code'] = 1;
            $result['msg'] = "Record already exists";
        }
        return $result;
    }
    public function updateRep($data){
        $result = array();
        $rep = $this->getRep($data['admin'],$data['id']);
        if($rep['rep'] == null){
            $result['code'] = 1;
            $result['msg'] = "Invalid rep";
            $result['response'] = $rep;
        }
        else{
            $avatar = null;
            $password = null;
            if($data['password'] != null){
                $password = $data['password'];
                unset($data['password']);
            }
            if($data['avatar'] != null) {
                $avatar = $data['avatar'];
                unset($data['avatar']);
            }
                
            $needCheck = ($rep['email'] != $data['email']);
            $check = false;
            if($needCheck) $check = $this->getUserByEmail($data['email']);
            
            if(!$check){
                $values = array_values($data);
                $keys = array_keys($data);
                $sql = "update reps set ";
                for($i=0; $i < sizeof($keys);$i++){
                    if($i == sizeof($keys) -1) $sql .= $keys[$i] .="='".$values[$i]."'";
                    else $sql .= $keys[$i] .="='".$values[$i]."',";
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
                    if($avatar != null){
                        $ext = strtolower(pathinfo(UPLOAD_PATH.basename($avatar["name"]),PATHINFO_EXTENSION));
                        $filename = $data['id'] .".".$ext;
                        if($this->saveImage($avatar,$filename)) {
                            $up = $this->con->query("update reps set avatar='".$filename."' where id='".$data['id']."'");
                            if(!$up){
                                $code = 1;
                                $msg = "Something went wrong while updating image info! Oops! ".$filename;
                                $err = $this->con->error;
                            }
                            else {
                                $code = 0;
                                $msg = "Image successfully saved";
                                $err = $this->con->error;
                            }
                        }
                        else {
                            unlink("/data/".$filename);
                            $code = 1;
                            $msg = "Image could not be saved";
                        }
                    }
                   

                    $result['code'] = $code;
                    $result['msg'] = $msg;
                    $result['error'] = $err;
                    $result['rep'] = ($data['admin'] != null) ? $this->getReps($data['admin']) : $this->getRepById($data['id']);
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
    public function getReps($userId){
        $result = array();
        $user = $this->getUserById($userId);
        if(!$user){
            $result['code'] = 1;
            $result['msg'] = "Could not find user";
            $result['error'] = $this->con->error;
        }
        else{
            $query = $this->con->query("select * from reps where admin='".$userId."'");
            if(!$query){
                $result['code'] = 1;
                $result['msg'] = "Could not get reps";
                $result['error'] = $this->con->error;
            }
            else{
                $result['code'] = 0;
                $result['msg'] = "Successful";
                $reps = array();
                while($r=$query->fetch_assoc()){
                    $reps[] = $r;
                }
                $result['reps'] = $reps;
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
                $result['msg'] = "Successful ".$repId;
                $rep = $query->fetch_assoc();
                $result['rep'] = $rep;
            }
        }
        return $result;
    }
    public function getRepById($repId){
        $result = array();
        $query = $this->con->query("select u.id as uid,u.password,r.* from user as u inner join reps as r on u.email=r.email where r.id='".$repId."'");
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
                $query2 = $this->con->query("delete from reps where id='".$rid."'");
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
}

?>