using com.lntinfotech.integration.p6Creation as p6creation from '../db/p6creation';


//@impl:'./p6creation-service.js'
// @(requires: 'authenticated-user') 
service p6CreationServicetest  @(requires:'authenticated-user') {
	entity p6Creationtest as projection on p6creation.p6Creation;
//	entity p6Creationcounttest as projection on p6creation.p6Creationcount;
	
/*	function ReqUname(projectid:String) returns Reqname;
	type Reqname{
		result : String;
	}*/
	
/*	function p6CreatCount(number:Integer) returns Count;
	type Count{
	icon : String(500); 
	info : String(50); 
	infoState : String(50); 
	number : Integer; 
	numberDigits : Integer; 
	numberFactor : String(50);
	stateArrow : String(50);
	subtitle : String(50);
	 title : String(50);
	}*/
}

