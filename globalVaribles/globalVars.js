var currentlyLoggedIn = "";
var username = "";
var loopRan =  false;
var whoCallAjax = "no one yet";
var objNAVloggedinStatus = false; // should than have a usernameOrig here...
var objNAVnvmc = null;
var  objNAVnvmct = null;
var  objNAVnvmcp = null;
var objNAVnvpp1form = null;
var objNAVnvpp2form = null;
var objNAVnvpp3form = null;
var nvpp1btncreated = false;
var nvpp2btncreated = false;
var nvpp3btncreated = false;
var  created2ChkboxesPP2 = false;
var  created2ChkboxesPP3 = false;
//var objNAVnvpp1btnnxt = null;
var objA11 = null;
var objA12 = null;
var objA13 = null;
var objA14 = null;
var objnvModal = null;
const ON = true;
const OFF = false;

//===================================================================================
var RegInputs = [];
var RegColumns1 = "( firstname, lastname, usernameorig, password, emailorig, email, username, membersince )"; //MUST ADD TBL2 COLUMNS ALSO
var RegColumns2 = "( usernamelc, gametype, gamestyle, groupsize, availability)"; 



var PP1PriorDBdata = [];
var PP2PriorDBdata = [];
var PP3PriorDBdata = [];
var PP123PriorDBdata = [];
//===========================================================================
var Login123LastDBdata = [];
var PP123LastDBdata = [];
var PP1LastDBdata = [];
var PP2LastDBdata = [];
var PP3LastDBdata = [];
//=============================================================================
var PP123UpdateColumns = [ " firstname = ", " lastname = ", " city = ", " state = ", " zipcode = ", " emailorig = ", " email = ",  
                                                 " password = ",  " phonenumber = ", " dmplayer = ", " birthyear = ",                                            
                                                 " gametype = ", " gamestyle = ", " groupsize = ", " availability = " ];  
var PP123LastColumns = [" userID = ", " firstname = ", " lastname = ", " city = ", " state = ", " zipcode = ", " emailorig = ", " email = ",  
                                             " usernameorig = ", " username = ", " password = ",  " phonenumber = ", " dmplayer = ", " birthyear = ",
                                             " lastlogin = ", " logincount = ",  " membersince = ", " usernamelc = ",
                                             " gametype = ", " gamestyle = ", " groupsize = ", " availability = " , " userIndx = "];                                                   
                                      
var PP1UpdateColumns = ["firstname = ", "lastname = ", "city = ", "state = ", "zipcode = ", "emailorig = ", "email = "];
var PP1LastColumns =      ["firstname = ", "lastname = ", "city = ", "state = " , "zipcode = ", "emailorig = " ];
 //=============================================================================
var PP2UpdateColumns = ["password = ", "phonenumber = ", "dmplayer = ", "birthyear = "];
var PP2LastColumns =      ["password = ", "phonenumber = ", "dmplayer = ", "birthyear = "];
//==============================================================================

var PP3UpdateColumns = ["gametype = ", "gamestyle = ", "groupsize = ", "availability = "];
var PP3LastColumns =      ["gametype = ", "gamestyle = ", "groupsize = ", "availability = "]; 
//==============================================================================
//*************************** these are never editable by the user/member directly in any PPx...*****************************//
var PPSpecial = [userID, email, usernameorig, username, lastlogin, logincount, membersince, usernamelc, userIndx];
//************************************************************************************************************************************//


//====================================================================================    
var objHeightnvmc = 945;
var dataBaseUpdated = false;
var currentPPpage = "0"
var callNxtFcn = false;
var nvPP2DMPlyr = 0;