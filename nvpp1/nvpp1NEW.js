// BEGIN PRIMARY FUNCTIONS FOR LOADING PAGE PP1 ================================================
function PP1Run()
 {
    //alert("PP1Run()  ");
    objNAVnvpp2form.style.display = "none";
    objNAVnvpp3form.style.display = "none";
    currentPPpage = 1;
    objNAVnvmc.style.display = "flex";
    objNAVnvpp1form.style.display = "flex";
    objNAVnvmct.innerHTML = "EDIT PROFILE PAGE (1 of 3) PREFERENCES ";
    objNAVnvmcp.innerHTML = "all items must be filled in!";
    objNAVnvmcp.style.color = "red";
    objNAVnvmcp.style.fontStyle = "italic";
    if (nvpp1btncreated == false)
    {
      PP1createButtons();
       nvpp1btncreated = true;    
    }
   
    PP1Fill(); 
  }

  function PP1createButtons()
   {
    //alert("cpp1nxtbtn_1");
    button = (document.createElement('input'));
    button.type = "button";
    button.name = 'pp1next';
    button.className = "PP1btn";
    button.id = "nvpp1btnnxt";
    button.value = "NEXT >>";
    button.style.backgroundColor = "grey";  
    nvpp1sbtn.appendChild(button);
    button.addEventListener("click", PP1BtnNxtClked);
  }

  function PP1Fill()
 {  
   // alert("In FillPP1");
    currentPPpage = 1;
    var line1 = document.getElementById('fn');
    var line2 = document.getElementById('ln');
    var line3 = document.getElementById('ci');
    var line4 = document.getElementById('st');
    var line5 = document.getElementById('zc');
    var line6 = document.getElementById('em');
  
    line1.value = "";
    line2.value = "";
    line3.value = "";
    line4.value = "";
    line5.value = "";
    line6.value = "";
  
    setTimeout(function ()
     {
      //new on 11/4/2020 way of doing it
      line1.value = PP1LastDBdata[0].trim();
      line2.value = PP1LastDBdata[1].trim();
      line3.value = PP1LastDBdata[2].trim();
      line4.value = PP1LastDBdata[3].trim();
      line5.value = PP1LastDBdata[4].trim();
      line6.value = PP1LastDBdata[5].trim();// changed 9/4/20 to show dB coln emailorig instead of coln email
    }, 10);
  }
// END PRIMARY FUNCTIONS FOR LOADING PAGE PP1=====================================

// BEGIN PRIMARY FUNCTIONS FOR PP1 NEXT BUTTON CLICKED ============================
function PP1BtnNxtClked()
{
   //alert("PP1BtnNxt Clked() ");
   document.getElementById('PP1ErrorBox').style.display = "none";
   lastProfileButtonPushed = "Next";
   objnvModal.style.display = "none";
   objNAVnvmc.style.height = objHeightnvmc;
   setTimeout(function()
   { 
      PP1EntriesPresent(); 
   },1000);       
 }

 function PP1EntriesPresent()
 {
 // alert("In  PP1EntriesPresent()");
 ///////////////////////////////////// var columns = ['userID', 'firstname', 'lastname', 'city', 'state', 'zipcode', 'email'];
  var line = [];
  line[0] = document.getElementById('fn').value;
  line[1] = document.getElementById('ln').value;
  line[2] = document.getElementById('ci').value;
  line[3] = document.getElementById('st').value;
  line[4] = document.getElementById('zc').value;
  line[5] = document.getElementById('em').value;
  //now chk if any lines are = "" (not filled in);
  //and save which entries are missing if any...
  var errors = false;
  var errorList = [];
  for (var i = 0; i < line.length; i++) // ignore i = 0 (line[0]) which is userID
   {
    if (line[i] == "")
     {
      errors = true;
      //alert("line[" + i + "] = " + line[i]);
      errorList.push(PP1LastColumns[i] + " ");
    }
  }
  if (errors) {
    //document.getElementById('PP1ErrorBox').style.border = "4px solid red"; 
    var data = [];
    data[0] = "ERROR: please correct...<br>";
    data[1] = "All items are required to be filled in! The following item(s) need to be filled in ... ";
    data[2] = errorList;
    data[3] = "";
    data[4] = "PP1";
    //alert( "ERROR: All items are required for Registration!\n\rThe following item(s) need to be corrected ... <br>" + errorList);
    PPxdisplayModal(data); ///ERROR: All items are required to be filled  in!\n\rThe following item(s) need to be corrected ... <br>" + errorList);
    return;
  }
   else {
    //close any error msg displayed
    objnvModal.style.display = "none";
    objNAVnvmc.style.height = objHeightnvmc;
   //alert("else");
    PP1ZipCodeEntry(line[4]);
  }
}

function PP1ZipCodeEntry(zpcd)
{
 //alert("chking nvChkPP1ZipCodeEntry();... " + zpcd);
 // alert("Val Entries" + zpcd.length);
 //chk if  (zipcode#) has exactly length 5 and all 5 digits are a number not a letter or... 
 zpcd = zpcd.trim();
 if (zpcd.length > 0 ) 
 {
   if (zpcd.length < 5 || zpcd.length > 5) {
    document.getElementById('PP1ErrorBox').style.border = "4px solid red";
     var data = [];
     data[0] = "ERROR: Zip Code Number Length!";
     data[1] = " Zip Code must be EXACTLY 5 numbers long.";
     data[2] = "Please Correct...";
     data[3] = "";
     data[4] = "PP1";
     PPxdisplayModal(data);
     return false;
   }
 }
 //now are all Zip Code characters  numbers ONLY, if not pop up ERROR msg red box...
 var Err = false;

 for (var i = 0; i < zpcd.length; i++) {
   if (zpcd.charCodeAt(i) < 48 || zpcd.charCodeAt(i) > 57) // ERROR... found a non-numeric char....
   {
     Err = true;
   }
 }
 if (Err == true) {
  document.getElementById('PP1ErrorBox').style.border = "4px solid red";
   var data = [];
   data[0] = "ERROR: Zip Code Has NON-NUMBERS!";
   data[1] = "Zip Code must consist of ONLY numbers.<br>Spaces and letters are not allowed!";
   data[2] = "Please Correct...";
   data[3] = "";
   data[4] = "PP1";
   PPxdisplayModal(data);
   return false;
 }
  else
   {
   //close any error msg displayedl 
   objnvModal.style.display = "none";
   objNAVnvmc.style.height = objHeightnvmc;
   PP1IsEmailEntryAvail();
  }
}

function PP1IsEmailEntryAvail() 
{
   //alert("EmailChk");
    var dbHost = "localhost";
    //var dbHost = "74.207.235.136";
    var dbUser = "root";
    var dbPwd = "slowbyte1";
    //var loggedUser = username.toLowerCase();  //changed 11/5/2020 morning to new method on next line
    var loggedUser = PP123LastDBdata[9];  // using Original username column from database
    //alert(JSON.stringify(PP2LastDBdata));
    //alert("currently logged in = " + loggedUser);
    var dbName = "cf1";
    var funcName = "pp1EMAILrow";  
    var dBtable = "tblProfilePg1";
    var whichSQL = "email";  //email or "username is OK to use here"
    var findThisEmail = document.getElementById('em').value.trim().toLowerCase();
  
   //alert("who is logged in = " + username);
    //objnvModal.style.display = "none";
    
      //===============new procedure below for getting back an Ajax* retn value=======================
    //FINALLY WORKS 8/21/2020 AND IT WORKS EXCELLENTLY.... FML
    var datax = "";
    $dbValues = [dbHost, dbUser, dbPwd, loggedUser, dbName, funcName, dBtable, whichSQL, findThisEmail] ; 
    //alert($dbValues);
   
     /////THIS NEEDS TO HAVE THE FOR LOOP FIX TO ACCOUNT WHETHER ITS A username OR email TYPE BEING REQUESTED
    var sizeOfExpectedRetn = 20; //FOR USER NAME ITS A 15
    timeout = 1000; 
    setTimeout(function()
      {       
        //pp1rtnSQL = PP1ajax($dbValues);
        //alert("setTOut = ");
        /*for(var j = 0; j < sizeOfExpectedRetn;  j++)
        {         
              datax = datax + "\r\n " + pp1rtnEmail[j];    
        }
        */
  
        if(loopRan == false)   
        {            
            loopRan = true;   
            timeout = 2000;  
            //alert(" PP1IsEmailEntryAvail() fcn being called 2nd time now")   ;
            PP1IsEmailEntryAvail(); 
        }
        else
        {    
            //alert("2nd call has returned here, good");            
            loopRan = false;
            //alert("datax = " + datax);
            //alert("pp1rtnEmail = " + pp1rtnEmail);
            if (pp1rtnEmail == "BeingUsed")
            {
              //PP1ChkDataChanged("BeingUsed");
             //Display Error that email is not available...
            // PP1ChkDataChanged = "BeingUsed";
            document.getElementById('PP1ErrorBox').style.border = "4px solid red";
             var data = [];
             data[0] = "ERROR: Chosen Email Is NOT Available!";
             data[1] = "You must request a unique Email that no other member is using!";
             data[2] = "Please Correct...";
             data[3] = "";
             data[4] = "PP1";
             PPxdisplayModal(data);
            return false;
           }
           
            else if (pp1rtnEmail == "Not  Used")                 // && lastProfileButtonPushed == "next")  
           {
             //alert("Not  Used from Email Fcn");
             //alert("end of Email Chk is "NotUsed" Calling CHK DATACHANGED");
            PP1ChkDataChanged("Not  Used");
           }
           else if (pp1rtnEmail == "IOwnEmail" )             // && lastProfileButtonPushed == "profile")  
           {
            //alert("IOwnEmail from Email Fcn");
            // alert("end of Email Chk @ IOE Calling CHK DATACHANGED fcn");
            PP1ChkDataChanged("IOwnEmail");        
           }
           else
           {
            PP1ChkDataChanged("else FUBAR");
            //alert("Error PHP = FUBAR");
            //nvChkPP1ForDataChanged();
            //return;  // what happens if we are here ????
           }                   
        } //end of main else...       
      }, timeout);
      pp1rtnEmail = PP1ajax($dbValues);  
}

function PP1ChkDataChanged()
{  //working OK 12/20/2020 @ 7:10pm
   //alert("chking PP1ChkDataChanged() ");
    var keys = [];
    var newData = [];
    var line = [];

    line[0] = document.getElementById('fn').value.trim();
    line[1] = document.getElementById('ln').value.trim();
    line[2] = document.getElementById('ci').value.trim();
    line[3] = document.getElementById('st').value.trim();
    line[4] = document.getElementById('zc').value.trim();
    line[5] = document.getElementById('em').value.trim();
    line[6] = line[5].toLowerCase();
  
     entryChanged = false;
     $dataTmp = "";
     var index = 0;
     //alert("PP1LastDBdata = " + JSON.stringify(PP1LastDBdata));
     for(var i = 0; i < line.length; i++)  
     {      
       if(line[i] != PP1LastDBdata[i].trim())
       {              
         $dataTmp = $dataTmp + PP1UpdateColumns[i]   + "'" + line[i] + "'" + ", ";
         keys[index] = i;
         newData[index] = line[i];
         index++;
         entryChanged = true; 
         //alert("here1 = " + PP1LastDBdata[i]);        
       }
     }
      var len = $dataTmp.length;
      $dataTmp = $dataTmp.slice(0, len -2);
    //  alert("$dataTmp Final = " + $dataTmp); 
     
     if(entryChanged == false)  
     {  //No changes so no update needed!
       // alert("Changed = false; lPBPushed = " + lastProfileButtonPushed);
        objNAVnvpp1form.style.display = "none";
        document.getElementById('PP1ErrorBox').style.display = "none";
       if( lastProfileButtonPushed == "Next")
       {
         // alert("finished with last profile page PP1 onward to PP2");
          PP2Run();
       }        
    }
   else if(entryChanged == true)
   {      
     //alert("entry change is true... goto Update fcn");
      PP1Update($dataTmp, keys, newData);
   }
}

   function PP1Update($dataStr, keys, newData)
{
  //alert("in the PP1Update func \n\r" + $dataStr + "\n\r" + keys + "\n\r" + newData);
  if( !(lastProfileButtonPushed == "Next" ))
  {
    //alert("In PP1Update w/o Next clked");
    //return; //we are only allowed to update the dB if "Next" button clicked got us here.!!!
  } 
     currentPPpage == 1
     
      var dbHost = "localhost";
      //var dbHost = "74.207.235.136";
      var dbUser = "root";
      var dbPwd = "slowbyte1";
      var loggedUser =  PP123LastDBdata[9];  ///////////////////////usernameorig;
      var dbName = "cf1";
      var funcName =  "pp1UPDATEwrite"; 
      var dBtable = "tblProfilePg1"; 
      var dbValuesToInsert  =  $dataStr;           
     // alert("dbValuesToInsert:   "  + dbValuesToInsert);
     
     $dbValues = [dbHost, dbUser, dbPwd, loggedUser, dbName, funcName, username.toLowerCase(), dbValuesToInsert, dBtable]; 
     //alert("dbValues = " + $dbValues);

     setTimeout(function()
    {     
       pp1rtnUpdate = PP1ajax($dbValues);
      // alert(pp1rtnUpdate)

      // ( if ) SUCCESS CODE BEGINS ========================================================================
       //need some kind of chk for success!
   if(pp1rtnUpdate == "success")
   {    
        //alert("Success & LBtn Pushed = " + lastProfileButtonPushed );
     
       //Update PP1LastDBdata with ONLY the changes just made to the database...
       alert("==== " + PP1LastDBdata);  //original data b4 the Update
      // for(i = 1; i < keys.length; i++)
       for(i = 0; i < keys.length; i++)
       {    
         PP1LastDBdata[keys[i]]  = newData[i];
         //alert("key column name = " + PP1UpdateColumns[keys[i] ]);
       }
       alert("+++ " + PP1LastDBdata); //new data after the Update
  
         document.getElementById('PP1ErrorBox').style.display = "none";
         document.getElementById('PP2ErrorBox').style.display = "none";
         document.getElementById('PP3ErrorBox').style.display = "none";
         objNAVnvpp1form.style.display = "none";

        if( lastProfileButtonPushed == "Next")
        {
             lastProfileButtonPushed = "NONE"
             PP2Run();             
        }       
   
    } 
     // ( if ) SUCCESS CODE ENDS ========================================================================    

       else // UPDATE FAILED...
       {  
        //alert(pp1rtnUpdate);
        //Display Error that email is not available...
        document.getElementById('PP2ErrorBox').style.display = "none";
        document.getElementById('PP3ErrorBox').style.display = "none";
        //document.getElementById('PP2ErrorBox').style.border = "4px solid red";  
        var data = [];
        data[0] = "ERROR: Update Problem; please correct...";
        data[1] =  pp1rtnUpdate ;
        data[2] =  "";
        data[3] =   ""; 
        data[4] = "PP1";
        PPxdisplayModal(data); 
        return false;                               
       }
    }, 2500);
    pp1rtnUpdate = PP1ajax($dbValues);
}
// END PRIMARY FUNCTIONS FOR PP1 NEXT BUTTON CLICKED =============

// BEGIN PP1 HELPER FUNCTIONS =====================================

function PP1ajax($dbValues)
{
  //alert("DB fcn =  " +  $dbValues[5]);
  funcCalled = "NONE";

 //PP1 ONLY BELOW ==================================================
 if($dbValues[5] == 'pp1SQLrow')       
  {
    funcCalled = "pp1SQLrow";
    //alert("fcnCalled = " + funcCalled);
  }

  else if($dbValues[5] == 'pp1EMAILrow')       
  {
    funcCalled = "pp1EMAILrow";
    //alert("fcnCalled @ PP1ajax() = " + funcCalled);
  }

  else if($dbValues[5] == 'pp1UPDATEwrite')
  {
    funcCalled = "pp1UPDATEwrite";
   // alert("fcnCalled = " + funcCalled);
  }
  //PP1 ONLY ABOVE===================================================

  if(funcCalled == "NONE")
  {
    alert("AjaxtesDBt FUNCTION CALLED = NONE\r\nCancelling" );
    return;
  }
   //alert("Ajax FUNCTION CALLED = " + funcCalled);
   //alert("AJAX dbval = " + $dbValues);
	jQuery.ajax({type: "POST", url: "nvpp1/testDB.php", dataType: 'json', data: {functionname: funcCalled, arguments: [$dbValues, 'blank'] },
		success: function (obj, textstatus)
				   {           
					  if( !('error' in obj) )
					  {
              $yourVariable = obj.result;
              //alert(obj.result);
               if(funcName == "updateDB")
               {
               alert(textstatus); //do this only when WRITTING TO DB NOT WHEN READING FROM DB
               }
					  }
					  else
					  {
              alert(obj.error);
              alert('fuckME');
						  //console.log(obj.error);
					  }
           }
          });
return $yourVariable;
} 
// END PP1 HELPER FUNCTIONS =======================================











  
