$("document").ready(function(){
	
	$("#login").bind("click",formSubmit);
	
});

function readValuesFromUI()
{
	var username = $("#username").val();
	var password = $("#password").val();
	var cred = {};
	cred.username = username;
	cred.password = password;
	return cred;
}

// Begins here.
function formSubmit()
{
	var cred = readValuesFromUI(); //separate out the function which reads values from ui.
	var val = validate(cred); // separate out validations.
	if(val.isValid)
	{
		doLogin(cred); // ajax call to server
	}
	else
	{
		alert('Invalid Credentials.' + ' ' + val.reason); 
	}
}

function validate(cred)
{
	var username = cred.username;
	var password = cred.password;
	var val = {};
	if(username == '' || password == '')
	{
		val.isValid = false;
		val.reason = "Username/Password cannot be empty.";
	}
	else if(username !='admin' || password != 'admin')
	{
		val.isValid = false;
		val.reason = "Invalid Username/Password.";
	}
	else
	{
		val.isValid = true;
	}
	return val;
}

function doLogin(cred)
{
	$.ajax({
        type: 'POST',
        url: "login",
        dataType: 'text',
        data : "username="+cred.username+"&password="+cred.password,
        success: function (data) {  
        	alert('Login Success');
        },
        cache: false,
        error: function( xhr, err) { 
        	alert('Login Failed.'+ xhr.status);
        }
    });

}
