<?php
require_once('config.php');
class Dbio{

    public function writeLog($msg){
            $f = fopen(TEMPPATH.QUERYLOG.date("Ymd").'.txt',"a");
            fwrite($f,"----------------------------------------------------------------------------------".PHP_EOL);
            fwrite($f,date("Ymd h:i:s a").PHP_EOL);
            //fwrite($f,$_SESSION["sesschecktime"].PHP_EOL);
            //fwrite($f,$_SERVER['HTTP_REFERER'].PHP_EOL);
            fwrite($f,(getenv('HTTP_CLIENT_IP')?:getenv('HTTP_X_FORWARDED_FOR')?:getenv('HTTP_X_FORWARDED')?:getenv('HTTP_FORWARDED_FOR')?:getenv('HTTP_FORWARDED')?:getenv('REMOTE_ADDR')).PHP_EOL);
            fwrite($f,$msg.PHP_EOL);
            fwrite($f,"----------------------------------------------------------------------------------".PHP_EOL);
            fclose($f);
    }


    function getConn(){
        $connection_string = "host=".HOST." port=".PORT." dbname=".$_SESSION["DBNAME"]." user=".USER." password=".PASS." ";
        return pg_connect($connection_string);
    }

    function getApiConn(){
        $connection_string = "host=".HOST." port=".PORT." dbname=".FINDBNAME." user=".USER." password=".PASS." ";
        return pg_connect($connection_string);
    }

    function getConnUser(){
        $connection_string = "host=".HOST." port=".PORT." dbname=".DBNAMEUSER." user=".USER." password=".PASS." ";
        return pg_connect($connection_string);
    }

    function closeConn($dbconn){
        pg_close($dbconn);
    }

    function getSelect($dbconn,$sql){
        $this->writeLog($sql);
        return pg_query($dbconn, $sql);
    }

    function batchQueries($dbconn,$sql){
        $this->writeLog($sql);
        return pg_query($sql);
        //return mysqli_multi_query($dbconn,$sql);
    }

    function getSelectNoLog($dbconn,$sql){
        return pg_query($dbconn,$sql);
    }

    function validateSession($session){
        if(isset($_SESSION["sessionId"]) ){
            $ok = true;
            
            if( (date("His") - $_SESSION["sesschecktime"])>200 ){
                $sql = " update temp_user_session set s_lutime = now() where s_sid = '".$_SESSION["sessionId"]."' and s_active = 1;";
                $dbconn = $this->getConnUser();
                $result = $this->batchQueries($dbconn,$sql);
                $sql=" select s_active ,case when s_dbg=1 then 'Y' else 'N' end from temp_user_session where s_sid = '".$_SESSION["sessionId"]."' ; ";
                $result = $this->getSelect($dbconn,$sql);
                if(pg_num_rows($result)>0){
                    $row = pg_fetch_row($result);
                    if($row[0]==0){
                        $ok = false;
                    }else{
                        $_SESSION["debug"] = $row[1];
                        $_SESSION["sesschecktime"] = date("His");
                    }
                }else{
                    $ok = false;
                }
                $this->closeConn($dbconn);
            }    
            
            if($_SESSION["sessionId"] == $session and $ok ){
                $i=0;
                foreach($_POST as $key => $value){
                    $_POST[$key] = str_replace('^^and^^','&',$_POST[$key]);
                    $_POST[$key] = str_replace('^^hash^^','#',$_POST[$key]);
                    $_POST[$key] = str_replace('^^plus^^','+',$_POST[$key]);
                    $_POST[$key] = str_replace('^^mod^^','%',$_POST[$key]);
                    $_POST[$key] = str_replace('=','',$_POST[$key]);
                    $r = strtoupper($_POST[$key]);
                    if(strpos($r,' ALTER ')==true or strpos($r,' DROP ')==true or strpos($r,' TRUNCATE ') ==true or strpos($r,' DELETE ') ==true or strpos($r,' UPDATE ') ==true ){
                        $i=1;
                    }
                }
                if($i==0){
                    return true;
                }else{
                    return false;
                }                
            }else{
                return false;
            }   
        }else{
            return false;
        }        
    }
    function encryptString($str){
        return openssl_encrypt($str, CIPHERING,ENCRYPTION_KEY, OPTIONS, ENCRYPTION_IV);
    }
    function decryptString($str){
        return openssl_decrypt ($str, CIPHERING,ENCRYPTION_KEY, OPTIONS, ENCRYPTION_IV);
    } 

    function getRandomString($n) { 
        $characters = '0123456789abcdefghijklmnoqrstuvwxyzABCDEFGHIJKLMNOQRSTUVWXYZ'; 
        $randomString = ''; 
      
        for ($i = 0; $i < $n; $i++) { 
            $index = rand(0, strlen($characters) - 1); 
            $randomString .= $characters[$index]; 
        } 
      
        return $randomString; 
    } 

    function validatePostRequest(){
        $flag = true;
        foreach($_POST as $key => $value){
            $_POST[$key] = str_replace('^^and^^','&',$_POST[$key]);
            $_POST[$key] = str_replace('^^hash^^','#',$_POST[$key]);
            $_POST[$key] = str_replace('^^plus^^','+',$_POST[$key]);
            $_POST[$key] = str_replace('^^mod^^','%',$_POST[$key]);
            $value = strtoupper($value);
            if(
                strpos(strtoupper($value),' DROP ') 
                || strpos(strtoupper($value),' ALTER ') 
                || strpos(strtoupper($value),' UPDATE ') 
                || strpos(strtoupper($value),' TRUNCATE ') 
                || strpos(strtoupper($value),' DELETE ') 

            ){
                $flag = false;
            } 
        }
        return $flag;
    }

    function getNewSrNo($loc,$type){
        $qry = " select getnewsrno(".$loc.",'".$type."') ";
        $dbconn = $this->getConn();
        $result = $this->getSelect($dbconn,$qry);
        $row = pg_fetch_row($result);
        $this->closeConn($dbconn);
        return $row[0];
    }
    // function getNewSrNo($loc, $type)
    // {
    //     global $dbconn;  // Declare the global connection
    //     $is_connection = false;
    //     $qry = " select getnewsrno(" . $loc . ",'" . $type . "') ";
    //     if (!$dbconn || !pg_ping($dbconn)) { //if connection is not created than create 
    //         $is_connection = true;
    //         $dbconn = $this->getConn();
    //     }
    //     $result = $this->getSelect($dbconn, $qry);
    //     $row = pg_fetch_row($result);
    //     if ($is_connection) { //if we creat connection in this method than close it
    //         $this->closeConn($dbconn);
    //     }
    //     return $row[0];
    // }

    function correctControlNumber(){
        $qry = "-- Region
        update master_control_number set mcn_last_srno 
        = (select COALESCE(max(mr_srno),0) from master_region )
        where mcn_voucher_type = 'REGN' and mcn_location = 0;
        -- country class
        update master_control_number set mcn_last_srno 
        = (select COALESCE(max(class_id),0) from master_class where class_id <9999  )
        where mcn_voucher_type = 'MCC' and mcn_location = 0;
        -- country master MCNT
        update master_control_number set mcn_last_srno 
        = (select COALESCE(max(cnt_srno),0) from master_country )
        where mcn_voucher_type = 'MCNT' and mcn_location = 0;
        -- State 
        update master_control_number set mcn_last_srno 
        = (select COALESCE(max(state_id),0) from master_state )
        where mcn_voucher_type = 'MSTAT' and mcn_location = 0;
        -- District MAster MDST
        update master_control_number set mcn_last_srno 
        = (select COALESCE(max(dist_srno),0) from master_district )
        where mcn_voucher_type = 'MDST' and mcn_location = 0;
        -- Ctiy Master MCITY
        update master_control_number set mcn_last_srno 
        = (select COALESCE(max(city_id),0) from master_city )
        where mcn_voucher_type = 'MCITY' and mcn_location = 0;
        -- Division master MDVSN
        update master_control_number set mcn_last_srno 
        = (select COALESCE(max(md_srno),0) from master_division )
        where mcn_voucher_type = 'MDVSN' and mcn_location = 0;
        -- Risk Master MRISK
        update master_control_number set mcn_last_srno 
        = (select COALESCE(max(mr_srno),0) from master_risk )
        where mcn_voucher_type = 'MRISK' and mcn_location = 0;
        -- Business NAture MBN
        update master_control_number set mcn_last_srno 
        = (select COALESCE(max(mn_srno),0) from master_business_nature )
        where mcn_voucher_type = 'MBN' and mcn_location = 0;
        -- Master legal entity MLGET
        update master_control_number set mcn_last_srno 
        = (select COALESCE(max(mle_srno),0) from master_legal_entity )
        where mcn_voucher_type = 'MLGET' and mcn_location = 0;
        -- Master Cost Center
        update master_control_number set mcn_last_srno 
        = (select COALESCE(max(cc_srno),0) from master_cost_center )
        where mcn_voucher_type = 'MCSC' and mcn_location = 0;
        -- Master GST Classification
        update master_control_number set mcn_last_srno 
        = (select COALESCE(max(mgc_srno),0) from master_gst_classification )
        where mcn_voucher_type = 'MGSTC' and mcn_location = 0;
        -- Master MSME    MMSME
        update master_control_number set mcn_last_srno 
        = (select COALESCE(max(mm_srno),0) from master_msme )
        where mcn_voucher_type = 'MMSME' and mcn_location = 0;
        -- Master designation   MDESG
        update master_control_number set mcn_last_srno 
        = (select COALESCE(max(md_srno),0) from master_designation )
        where mcn_voucher_type = 'MDESG' and mcn_location = 0;
        -- Master executive MEXEC
        update master_control_number set mcn_last_srno 
        = (select COALESCE(max(me_srno),0) from master_executive )
        where mcn_voucher_type = 'MEXEC' and mcn_location = 0; " ;
    }

    function calcGSTTaxableValue($fxamnt, $totchrg){
        $GSTTaxableValslab = [250, 60000, 100000, 1000000, 0.01, 0.005, 0.001, 1000, 5500];
        $policy = 2;
        $TaxableVal = 0;
        if ($fxamnt > 0 and $fxamnt <= $GSTTaxableValslab[2]) {
            $TaxableVal = round(($fxamnt) * $GSTTaxableValslab[4] * 100) / 100;
        } else if ($fxamnt > $GSTTaxableValslab[2] and $fxamnt <= $GSTTaxableValslab[3]) {
            $TaxableVal = $GSTTaxableValslab[7] + round(($fxamnt - $GSTTaxableValslab[2]) * $GSTTaxableValslab[5] * 100) / 100;
        } else if ($fxamnt > $GSTTaxableValslab[3]) {
            $TaxableVal = $GSTTaxableValslab[8] + round(($fxamnt - $GSTTaxableValslab[3]) * $GSTTaxableValslab[6] * 100) / 100;
        }
        if ($TaxableVal < $GSTTaxableValslab[0])
        $TaxableVal = $GSTTaxableValslab[0];
        if ($TaxableVal > $GSTTaxableValslab[1])
            $TaxableVal = $GSTTaxableValslab[1];
        if ($policy == 2) {
            $TaxableVal += $totchrg;
        }
        return (round($TaxableVal * 100) / 100);
    }
    
    function getIndianCurrency(float $number){
        $decimal = round($number - ($no = floor($number)), 2) * 100;
        $hundred = null;
        $digits_length = strlen($no);
        $i = 0;
        $str = array();
        $words = array(0 => '', 1 => 'one', 2 => 'two',
            3 => 'three', 4 => 'four', 5 => 'five', 6 => 'six',
            7 => 'seven', 8 => 'eight', 9 => 'nine',
            10 => 'ten', 11 => 'eleven', 12 => 'twelve',
            13 => 'thirteen', 14 => 'fourteen', 15 => 'fifteen',
            16 => 'sixteen', 17 => 'seventeen', 18 => 'eighteen',
            19 => 'nineteen', 20 => 'twenty', 30 => 'thirty',
            40 => 'forty', 50 => 'fifty', 60 => 'sixty',
            70 => 'seventy', 80 => 'eighty', 90 => 'ninety');
        $digits = array('', 'hundred','thousand','lakh', 'crore');
        while( $i < $digits_length ) {
            $divider = ($i == 2) ? 10 : 100;
            $number = floor($no % $divider);
            $no = floor($no / $divider);
            $i += $divider == 10 ? 1 : 2;
            if ($number) {
                $plural = (($counter = count($str)) && $number > 9) ? 's' : null;
                $hundred = ($counter == 1 && $str[0]) ? ' and ' : null;
                $str [] = ($number < 21) ? $words[$number].' '. $digits[$counter]. $plural.' '.$hundred:$words[floor($number / 10) * 10].' '.$words[$number % 10]. ' '.$digits[$counter].$plural.' '.$hundred;
            } else $str[] = null;
        }
        $Rupees = implode('', array_reverse($str));
        $paise = ($decimal > 0) ? "." . ($words[$decimal / 10] . " " . $words[$decimal % 10]) . ' Paise' : '';
        return ($Rupees ? 'Rupees ' .$Rupees . 'Only ' : '') . $paise;
    }


    /*
    function validatePanList($panlist){
        $result = "";
        $url =NSDLPANVALIDATION."?PAN=".trim($panlist);
        $options = array(
                'ssl' => array(
                    'verify_peer' => false,
                    'verify_peer_name' => false,
                    'cafile' => PHPCERTPATH // Path to trusted CA certificate bundle
                )
        );
        $context = stream_context_create($options);
        $res = file_get_contents($url, false, $context);
        $r = explode('^',$res);
        $panIndex = 1;
        $operativeIndex = 2;
        $panLinkIndex = 9;

        while($panLinkIndex<count($r)){
            if($r[$operativeIndex]!="E" or $r[$panLinkIndex]!="Y"){
                $result = $result." ".$r[$panIndex]; 
            }
            $panIndex = $panIndex+10;
            $operativeIndex = $operativeIndex+10;
            $panLinkIndex = $panLinkIndex+10;
        }
        
        return $result; 
    }

    function validatePan($pan,$panName,$purpose){
        // NSDLPANVALIDATION

        if(trim($pan)!=""  ){
            // $res = file_get_contents(NSDLPANVALIDATION.trim($v));
            // http://localhost:1011/Pan_validation.aspx?PAN=BCHPS2899P
            // http://localhost:1011/Pan_validation.aspx?PAN=BCHPS2899P
            // $url = NSDLPANVALIDATION.trim($pan) ; 
            $url =NSDLPANVALIDATION."?PAN=".trim($pan);
            $options = array(
                'ssl' => array(
                    'verify_peer' => false,
                    'verify_peer_name' => false,
                    'cafile' => PHPCERTPATH // Path to trusted CA certificate bundle
                )
            );
            $context = stream_context_create($options);
            $res = file_get_contents($url, false, $context);


            $r = explode('^',$res);
            $nameAsPerNsdl = strtoupper($r[4]." ".$r[5]." ".$r[3]) ;  // 4 5 3 

            $nameAsPerNsdl = str_replace("&","",$nameAsPerNsdl);
            $nameAsPerNsdl = str_replace("(","",$nameAsPerNsdl);
            $nameAsPerNsdl = str_replace(")","",$nameAsPerNsdl);
            $nameAsPerNsdl = str_replace("  "," ",$nameAsPerNsdl);
            $nameAsPerNsdl = str_replace("  "," ",$nameAsPerNsdl);
            $nameAsPerNsdl = str_replace("  "," ",$nameAsPerNsdl);
           
            $nameAsPerNsdl=trim($nameAsPerNsdl);

            $nameAsPerNsdl2 = strtoupper(trim($r[8])); 
            $nameAsPerNsdl2 = str_replace("&","",$nameAsPerNsdl2);
            $nameAsPerNsdl2 = str_replace("(","",$nameAsPerNsdl2);
            $nameAsPerNsdl2 = str_replace(")","",$nameAsPerNsdl2);
            $nameAsPerNsdl2 = str_replace("  "," ",$nameAsPerNsdl2);
            $nameAsPerNsdl2 = str_replace("  "," ",$nameAsPerNsdl2);
            $nameAsPerNsdl2 = str_replace("  "," ",$nameAsPerNsdl2);
            
            // 1^ALAPD8219P^E^DHARIA^PARDEEP^KUMAR^Shri^06/04/2021^^R^
            // 1^ALAPD8219P^E^DHARIA^PARDEEP^KUMAR^Shri^06/04/2021^^R^
            // 1^MKGPS2308D^E^SAHAANA^RAMAKRISHNAN^^Kumari^04/11/2019^SAHAANA R^Y^
           // 1^ADVFS4429D^E^SHARMILA TOURS & TRAVELS^^^M/s^17/10/2019^SHARMILA TOURS & TRAVELS^NA^

            //if($r[0]==1 and $r[2]=="E" and ($r[9]=='Y' or $r[9]=="NA" ) and ( trim($panName)=="" or strtoupper(trim($panName)) == $nameAsPerNsdl ) ){
                // and ( trim($panName)=="" or     ( strtoupper(trim($panName)) == $nameAsPerNsdl   ) or ( strtoupper(trim($panName)) == $nameAsPerNsdl2 )  ) 
            
            $isOk = false ;

            if( $r[0]==1 and $r[2]=="E" and ($r[9]=='Y' or $r[9]=="NA" )  ){
                if($purpose==13){
                    if( trim($panName)=="" or     ( strtoupper(trim($panName)) == $nameAsPerNsdl   ) or ( strtoupper(trim($panName)) == $nameAsPerNsdl2 ) ){
                        $isOk = true;
                        return "OK";    
                    }
                }else{
                    $isOk = true;
                    return "OK";
                }
               
            }

            if($isOk == false){
                if($r[0]!=1){
                    return "Unable to validate PAN : ".$pan;
                }else if($r[2]!="E"){
                    return "Not a valid PAN : ".$pan;
                }else if($r[9]!='Y' && $r[9]!='NA' ){
                    return "PAN : ".$pan." not linked with AADHAR";
                }else if($r[0]=="ERROR"){
                    return "PAN : ".$pan." validation attempt fail";
                }else if( trim($panName)!="" and strtoupper(trim($panName)) != $nameAsPerNsdl  ){
                    return "PAN : ".$pan." Name : ".strtoupper($panName)." does not match with NSDL Name : ".$nameAsPerNsdl." or ".$nameAsPerNsdl2 ;
                }else{
                    return "PAN : ".$pan." Name : ".strtoupper($panName)." PAN VALIDATION ERROR : ".$nameAsPerNsdl." or ".$nameAsPerNsdl2 ;
                }
            }

        }else{
            return "OK";
        }
    }
    */
}
?>