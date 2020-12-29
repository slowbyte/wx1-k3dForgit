 // BEGIN PRIMARY FUNCTIONS FOR LOADING PAGE PP2 ===========================
 /*
 function PP2Run()  // this is code from GIT HUB one commit backwards from fucked up HEAD commit and at least it runs but needs fixing...
 {
     //alert("in PP2Run()");
     objNAVnvpp1form.style.display = "none";    
     objNAVnvpp3form.style.display = "none";
     currentPPpage = 2;
     objNAVnvmc.style.display = "flex";
     objNAVnvpp2form.style.display = "flex";
     objNAVnvmct.innerHTML = "EDIT PROFILE (PAGE 2 of 3) PREFERENCES ";
     objNAVnvmcp.innerHTML = "all items must be filled in! ( except Phone Number which is Optional )";
     objNAVnvmcp.style.color = "red";
     objNAVnvmcp.style.fontStyle = "italic";
     if(nvpp2btncreated == false)
      {
        PP2createButtons();
        nvpp2btncreated = true;
      }
      
       PP2Fill() ;
  }
 
 function PP2createButtons() 
 {
   //alert("cpp2nxt");
   button = (document.createElement('input'));
   button.type = "button"; 
   button.name = 'pp2next';  
   button.className = "butPP2";
   button.id = "nvpp2btnnxt";
   button.value = "NEXT >>";
   button.style.backgroundColor = "grey";
   nvpp2sbtn.appendChild(button);
   button.addEventListener("click", PP2BtnPreNxtClked);
 
   buttonPrv = (document.createElement('input'));
   buttonPrv.type = "button"; 
   buttonPrv.name = 'pp2previous';  
   buttonPrv.className = "butPP2";
   buttonPrv.id = "nvpp2btnprv";
   buttonPrv.value = "<< PREVIOUS";
   buttonPrv.style.backgroundColor = "grey";
   nvpp2sbtp.appendChild(buttonPrv);
   buttonPrv.addEventListener("click", PP2BtnPreNxtClked);
 }
 
 function PP2Fill() 
 {
   //alert("in PP2Fill ");
   currentPPpage = 2;
   var line1 = document.getElementById('unt');
   var line2 = document.getElementById('pwt');
   var line3 = document.getElementById('pnt');
   var line4dm = document.getElementById('pp2chk1');
   var line4plyr = document.getElementById('pp2chk2');
   var line5 = document.getElementById('byt');
 ;
   line1.value = "";
   line2.value = "";
   line3.value = "";
   line4dm.checked = false;
   line4plyr.checked = false;
   line5.value = ""; 
 
   //====below: check the correct DM and Plyr checkboxes correctly ======
   var DMPlyrNumb = 0;
   DMPlyrNumb =PP2LastDBdata[2];  
   //alert("in fill DMPlyrNumb = " +  DMPlyrNumb  );
   if(DMPlyrNumb == 1)
   {
     line4dm.checked = true;
   }
   else if(DMPlyrNumb == 2)
   {
     line4plyr.checked = true;
   }
   else if(DMPlyrNumb == 3)
   {
     line4dm.checked = true;
     line4plyr.checked = true;
   }
 //====above: check the correct DM and Plyr checkboxes correctly ======
 
   setTimeout(function() 
   {  
   line1.value =PP123LastDBdata[9].trim(); // usernameOrig
   line2.value =PP2LastDBdata[0].trim();  //pwd
   line3.value =PP2LastDBdata[1].trim();  //phone#
   //DM =    //DM was set above alrdy with line4dm and line4plyr 
   line5.value =PP2LastDBdata[3].trim(); // birthday
   }, 100);
 }
 // END PRIMARY FUNCTIONS FOR LOADING PAGE PP2=========================
 
 // BEGIN PRIMARY FUNCTIONS FOR PP2 PREVIOUS/NEXT BUTTON CLICKED ============================
 function PP2BtnPreNxtClked() //NEXT or PREVIOUS CLICKED @ PP2 page
 {
    //alert("PP2 BtnPreNxtClked() "); 
    //Prev or Nxt Clicked???
    if(this.id == "nvpp2btnnxt")
    {
      lastProfileButtonPushed = "Next";
    } 
    else if(this.id == "nvpp2btnprv")  
    {
      lastProfileButtonPushed = "Previous";  
    }
    document.getElementById('PP2ErrorBox').style.display = "none";
    objnvModal.style.display = "none";
    objNAVnvmc.style.height = objHeightnvmc;
      setTimeout(function()
      { 
         PP2EntriesPresent(); 
      },1000); 
   }
 
 function PP2EntriesPresent()
 {
   // alert("in  PP2EntriesPresent()");   
   //determine if @ least1 chkbox of either DM or Plyr is checked...
   dmplyr = "entry present"; //assume initially 1 or more is chked
 if(document.getElementById('pp2chk1').checked == false && document.getElementById('pp2chk2').checked == false)
  {
    dmplyr = "";  //no DM or Plyr checkbox is checked... so will error out this PP2EntriesPresent() fcn...
  }
 
   var line = [];
   line[0] = document.getElementById('unt').value;  //this is always filled in with logged in orig name
   line[1] = document.getElementById('pwt').value;
   line[2] = document.getElementById('pnt').value;
   line[3] = dmplyr;
   line[4] = document.getElementById('byt').value;
 
   //now chk if any lines are = "" (not filled in);
   //and save which entries are missing if any...
  var errors = false;
  var errorList = []; 
 
  //no need for i = 0 , that is usernameorig which ALWAYs must be present 
  //because you have to have gotten logged in successfully to get here...
   for(var i = 0; i < line.length; i++)  
   {
       if (line[i] == "") //if true there is a missing entry (remember phone# is optional)
       {  
           if( i != 2) // line[2] is phone# which is OPTIONAL so can never be an "error"
           {
               errors = true;
               errorList.push(PP2LastColumns[i - 1] + " ");
           }
       }      
   }
   if(errors)
   {       
     var data = [];
     data[0] = "ERROR: please correct...";
     data[1] =  "All items are required to be filled in!(phone# is optional). The following item(s) need to be filled in ... ";
     data[2] =  "error(s) for... " + errorList;
     data[3] =   ""; 
     data[4] = "PP2";
    // nvdisplayModal(data);
    PPxdisplayModal(data);   
     return false;      
   }
   else
   {
     objnvModal.style.display = "none";
     objNAVnvmc.style.height = objHeightnvmc;
     PP2PhoneNumber(line[2]);   
   }
 }
 
 function PP2PhoneNumber(phonenum)
 {  
     //chk if  (zipcode#) has exactly length 5 and all 5 digits are a number not a letter or... 
     if(phonenum == "")
     {
       //alert("No Phone Number so DONE")
       PP2ChkDataChanged()
     }
     else
   {
     phonenum = phonenum.trim();
     if(phonenum.length > 0)
     {
         if(phonenum.length < 10 || phonenum.length > 10)
          {    
           //document.getElementById('PP2ErrorBox').style.display = "none";
           //document.getElementById('PP2ErrorBox').style.border = "4px solid red";  
             var data = [];
             data[0] = "ERROR: Phone Number Length!";
             data[1] = "Phone Number must be EXACTLY 10 numbers long.";  
             data[2] =  "Please Correct...";
             data[3] =   ""; 
             data[4] = "PP2";
             PPxdisplayModal(data);   
             return false;           
          }
      }
     //now are all Phone Number characters  numbers ONLY, if not pop up ERROR msg red box...
     var Err = false;
     for ( var i = 0; i < phonenum.length; i++)
     {
        if( phonenum.charCodeAt(i)  <  48 ||  phonenum.charCodeAt(i)  > 57) // ERROR... found a non-numeric char....
        {     
            Err = true;
        }       
     }
  
       if(Err == true)
       {    
           var data = [];
           data[0] = "ERROR: Phone Number Has NON-NUMBERS!";
           data[1] =  "Phone Number must consist of ONLY numbers. Spaces and letters are not allowed!"; 
           data[2] =  "Please Correct...";
           data[3] =   ""; 
           data[4] = "PP2";
           PPxdisplayModal(data);   
           return false;                  
      } 
      else
      {
        //close any error msg displayed 
        objnvModal.style.display = "none";
        objNAVnvmc.style.height = objHeightnvmc;
        PP2ChkDataChanged();         
      }
   }
 }
 
 function PP2ChkDataChanged()
  {
     //alert("In PP2ChkDataChanged()" );
     var keys = [];
     var newData = [];
     var line = [];
     //line[0] = "";  //usernameorig will be used here below
     line[0] = document.getElementById('pwt').value.trim();
     line[1] = document.getElementById('pnt').value.trim();
     line[2] = calcDMPlyrValue();      //need the single value number here like the database uses
     line[3] = document.getElementById('byt').value.trim(); 
 
   var entryChanged = false;
   var $dataTmp = "";
   var index = 0;
 
   for (var i = 0; i < line.length; i++)
   {
     alert("b4 if I = " + i + "/" + line[i] + "/" + PP2LastDBdata[i]);
     if(line[i] != PP2LastDBdata[i].trim()) // when if is TRUE it means a particular line[x] has changed...
      {
          alert("if is true");
       $dataTmp = $dataTmp + PP2UpdateColumns[i]   + "'" + line[i] + "'" + ", ";
       keys[index] = i;
       newData[index] = line[i];
       index++;
       entryChanged = true;         
       }
       else if(line[i] == PP2LastDBdata[i].trim())
       {
           alert("if was false so we are now in the else if");
       }

   }
   var len = $dataTmp.length;
   $dataTmp = $dataTmp.slice(0, len -2); //remove the last comma at end of this string so dataBase Update works correctly in next fcn
    alert("$dataTmp Final = " + $dataTmp); 
 
   //alert("chk for changed = " + entryChanged);
   if(entryChanged == false) 
   {   
     //NO NEED TO UPDATE
         alert("Changed = false; lPBPushed = " + lastProfileButtonPushed);
         objNAVnvpp2form.style.display = "none";
         document.getElementById('PP2ErrorBox').style.display = "none";
         // goto PrevPP1 or Next PP3.....
         if( lastProfileButtonPushed == "Next")
         {
             PP3Run();
         } 
         else if(lastProfileButtonPushed == "Previous")  
        {
            PP1Run();
         }
    }
    else if (entryChanged == true)
    {
      // alert("TRUE & have to save changes to dB so call the Update fcn!");
      PP2Update($dataTmp, keys, newData);  // have to update PP2 entries because 1 or more entries have been modified by user
    }
 }
 // END CHK FOR DATA CHANGED ==========================
 
 
 // BEGIN  PP2Update =============================================================================
 function PP2Update($dataStr, keys, newData)
 {
   alert("in the PP2Update func... " + $dataStr + "/" + keys + "/"  + newData);  
   if( !(lastProfileButtonPushed == "Next" || lastProfileButtonPushed == "Previous"))
   {
     //alert("In PP2Update w/o Next or Previous clked");
     //return; //we are only allowed to update the dB if "next or previous" button clicked got us here.!!!
   } 
      currentPPpage == 2
      
       var dbHost = "localhost";
       //var dbHost = "74.207.235.136";
       var dbUser = "root";
       var dbPwd = "slowbyte1";
       var loggedUser = PP123LastDBdata[9];
       var dbName = "cf1";
       var funcName =  "pp2UPDATEwrite";       
       var dBtable = "tblProfilePg1"; 
       var dbValuesToInsert  =  $dataStr; 
       alert("dbValuesToInsert:   "  + dbValuesToInsert);
      
      $dbValues = [dbHost, dbUser, dbPwd, loggedUser, dbName, funcName, username.toLowerCase(), dbValuesToInsert , dbValuesToInsert, dBtable]; 
     // alert("dbValues = " + $dbValues);
 
      setTimeout(function()
     {     
        pp2rtnUpdate = PP2ajax($dbValues);
       // alert(pp2rtnUpdate)
       
 
       //SUCCESS CODE BEGINS ========================================================================
        //need some kind of chk for success!
    if(pp2rtnUpdate == "success")
    {    
         alert("Success & LBtn is Pushed = " + lastProfileButtonPushed );
      
        //Update PP2LastDBdata with just the changes made to the database...
        alert("--- " + PP2LastDBdata);
        //PP2LastDBdata[keys[0]]  = loggedUser;
        for(i = 0; i < keys.length; i++)
        {         
          PP2LastDBdata[keys[i]]  = newData[i];
          alert("in for loop for +++ " + i + "/" + PP2LastDBdata[keys[i]] + "/"  + newData[i])
          //alert("key column name = " + PP2UpdateColumns[keys[i] ]);
        }
        alert("+++ " + PP2LastDBdata);
          
          document.getElementById('PP1ErrorBox').style.display = "none";
          document.getElementById('PP2ErrorBox').style.display = "none";
          document.getElementById('PP3ErrorBox').style.display = "none";
          objNAVnvpp2form.style.display = "none";
 
         if( lastProfileButtonPushed == "Next")
         {
              lastProfileButtonPushed = "NONE"
              PP3Run();
         }       
         else if( lastProfileButtonPushed == "Previous")
         {
               lastProfileButtonPushed = "NONE"
               PP1Run();
         }
     }
      //SUCCESS CODE ENDS ========================================================================    
 
        else //UPDATE FAILED...
        {  
         //alert(pp2rtnUpdate);
         //Display Error that email is not available...
         document.getElementById('PP2ErrorBox').style.display = "none";
         //document.getElementById('PP2ErrorBox').style.border = "4px solid red";  
 
         data[0] = "ERROR: Update Problem; please correct...";
         data[1] =  pp2rtnUpdate ;
         data[2] =  "";
         data[3] =   ""; 
         data[4] = "PP2";
         PPxdisplayModal(data); 
         return false;                               
        }
     }, 2500);
     pp2rtnUpdate = PP2ajax($dbValues);
 }
 // END  PP2Update ==========================================================================
 // END PRIMARY FUNCTIONS FOR PP1 NEXT BUTTON CLICKED =============
 
 // BEGIN PP2 HELPER FUNCTIONS =====================================
  function calcDMPlyrValue()
  {
   dmObjState = document.getElementById('pp2chk1').checked;
   plyrObjState = document.getElementById('pp2chk2').checked;
   DMPlyrValue = 0;
   if(dmObjState == true)
   {
      DMPlyrValue = DMPlyrValue +1;
   }
   if(plyrObjState == true)
   {
     DMPlyrValue = DMPlyrValue + 2;
   }
   return DMPlyrValue;
  }
   
   ///////////////////////////////////////////////////BEGIN special test on returning both tables full data with one sql call//////////////////////////////////////////
    function returnBothTablesrow()
    {
     var dbHost = "localhost";
     //var dbHost = "74.207.235.136";
     var dbUser = "root";
     var dbPwd = "slowbyte1";
     var loggedUser = username.toLowerCase();
     var dbName = "cf1";
     var funcName = "dblTables";  
     var dBtable1 = "tblProfilePg1";
     var dBtable2 = "tblProfilePg2";
     
     var retnBothTbls = [];
     var datax = "";
     $dbValues = [dbHost, dbUser, dbPwd, loggedUser, dbName, funcName, dBtable1, dBtable2] ; 
     //alert($dbValues);
     var sizeOfExpectedRetn = 22; //FOR BOTH TABLES
    
     timeout = 1000; 
     setTimeout(function()
       {       
         retnBothTbls = PP2ajax($dbValues);
         for(var j = 0; j < sizeOfExpectedRetn;  j++)
         {         
               //datax = datax + ", " +pp1rtnSQL[j];      
               datax = datax + "\r\n " + retnBothTbls[j];    
         }
   
         if(loopRan == false)   
         {            
             loopRan = true;   
             timeout = 2000;          
             returnBothTablesrow();
         }
         else
         {    
           
             loopRan = false; 
             alert(datax);          
             //alert( retnBothTbls[13] + " ... " + retnBothTbls[0]);
             retnBothTbls = null;                        
         }       
       }, timeout);
       retnBothTbls = PP2ajax($dbValues);
   }  
 
    
   ///////////////////////////////////////////////////END special test on returning both tables full data with one sql call///////////////////////////////////////////////
 //BEGIN FUNCTION PP2ajax() ================= ===========================================
 function PP2ajax($dbValues)
 {
   //alert("DB fcn =  " +  $dbValues[5]);
   funcCalled = "NONE";
 
  //PP2 ONLY BELOW ======================================================================
   if($dbValues[5] == 'pp2UPDATEwrite')
   {
     funcCalled = "pp2UPDATEwrite";
     //alert("fcnCalled = " + funcCalled);
   }
   //PP2 ONLY ABOVE======================================================================
  
   if($dbValues[5] == 'dblTables') 
   {
     funcCalled = "dblTables";
    //alert("fcnCalled = " + funcCalled);
   }
  
 
   if(funcCalled == "NONE")
   {
     alert("PP2ajax()  CALLED = NONE\r\nCancelling" );
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
 // END FUNCTION PP2ajax() ===================================================================
 // END PP2 HELPER FUNCTIONS =====================================
 */