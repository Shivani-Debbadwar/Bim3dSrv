
@impl:'./util-service.js'
service UtilSecuredService @(requires: 'authenticated-user') { 
	function getUser () returns String;
    function getUserRole() returns String;
    function getUserAttr() returns array of String;
}