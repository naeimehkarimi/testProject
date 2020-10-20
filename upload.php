<?php
$valid_extensions = array('jpeg', 'jpg', 'png', 'gif', 'bmp' , 'pdf' , 'doc' , 'ppt'); // valid extensions
$path = 'uploads/'; // upload directory
if(!empty($_POST['name']) || !empty($_POST['email']) || $_FILES['image'])
{
$img = $_FILES['file']['name'];
$tmp = $_FILES['file']['tmp_name'];
// get uploaded file's extension
$ext = strtolower(pathinfo($img, PATHINFO_EXTENSION));
// can upload same image using rand function
$final_image = rand(1000,1000000).$img;
// check's valid format
if(in_array($ext, $valid_extensions)) 
{ 
$path = $path.strtolower($final_image); 
if(move_uploaded_file($tmp,$path)) 
{
$data->name = $_POST['name'];
$data->family=$_POST['family'];
$data->age=$_POST['age'];
$data->email = $_POST['email'];
$data->mobile=$_POST['mobile'];
$data->file="http://naeimehkarimi.ir//$path";
$myJSON = json_encode($data);

echo $myJSON;
//include database configuration file
echo $name;
//echo $insert?'ok':'err';
}
} 
else 
{
echo 'invalid';

}
}
?>