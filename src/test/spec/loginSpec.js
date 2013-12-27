describe('Rules to test function - readValuesFromUI', function() {
	
	it('1. Test where input values are not empty', function() {
		spyOn($.fn, 'val').andReturn('admin');
		var cred = readValuesFromUI();
		expect(cred).not.toBe(null);		
	});
	
	it('2. Test where input values are empty', function() {
		spyOn($.fn, 'val').andReturn('');
		var cred = readValuesFromUI();
		expect(cred.username).toBe('');		
		expect(cred.password).toBe('');
	});
	
});
describe('Rules to test function - validate', function() {
	
	var data = getJSONFixture('login.json');
	
	it('1. Test where user name is empty', function() {
		var cred = data.loginCredentials.user_name_empty;
		var retValue = validate(cred);
		expect(retValue.isValid).toBe(false);
		expect(retValue.reason).toBe("Username/Password cannot be empty.");
	});
	
	it('2. Test where password is empty', function() {
		var cred = data.loginCredentials.password_empty;
		var retValue = validate(cred);
		expect(retValue.isValid).toBe(false);
		expect(retValue.reason).toBe("Username/Password cannot be empty.");
	});
	
	it('3. Test where user name is invalid', function() {
		var cred = data.loginCredentials.user_name_invalid;
		var retValue = validate(cred);
		expect(retValue.isValid).toBe(false);
		expect(retValue.reason).toBe("Invalid Username/Password.");
	});
	
	it('4. Test where password is invalid', function() {
		var cred = data.loginCredentials.password_invalid;
		var retValue = validate(cred);
		expect(retValue.isValid).toBe(false);
		expect(retValue.reason).toBe("Invalid Username/Password.");
	});
	
	it('5. Test where password is invalid', function() {
		var cred = data.loginCredentials.valid;
		var retValue = validate(cred);
		expect(retValue.isValid).toBe(true);		
	});
	
});

describe('Rules to test function - formSubmit', function() {
	
	it('1. Test where function validate returns true', function() {
		var fakeReadValuesFromUI = jasmine.createSpy();
		var fakeValidate = jasmine.createSpy();
		var fakeDoLogin = jasmine.createSpy();
		var fakeAlert = jasmine.createSpy();
		var cred = {};
		cred.isValid = true;
		spyOn(window,'readValuesFromUI').andCallFake(fakeReadValuesFromUI);
		spyOn(window,'validate').andReturn(cred);
		spyOn(window,'doLogin').andCallFake(fakeDoLogin);
		spyOn(window,'alert').andCallFake(fakeAlert);
		formSubmit();
		expect(fakeReadValuesFromUI).toHaveBeenCalled();
		expect(fakeDoLogin).toHaveBeenCalled();
		expect(fakeAlert).not.toHaveBeenCalled();
		
	});
	
	it('2. Test where function validate returns false', function() {
		
		var fakeReadValuesFromUI = jasmine.createSpy();
		var fakeValidate = jasmine.createSpy();
		var fakeDoLogin = jasmine.createSpy();
		var fakeAlert = jasmine.createSpy();
		var cred = {};
		cred.isValid = false;
		cred.reason = 'reason';
		spyOn(window,'readValuesFromUI').andCallFake(fakeReadValuesFromUI);
		spyOn(window,'validate').andReturn(cred);
		spyOn(window,'doLogin').andCallFake(fakeDoLogin);
		spyOn(window,'alert').andCallFake(fakeAlert);
		formSubmit();
		expect(fakeReadValuesFromUI).toHaveBeenCalled();
		expect(fakeDoLogin).not.toHaveBeenCalled();
		expect(fakeAlert).toHaveBeenCalled();
	});
	
});

describe('Rules to test function - doLogin', function() {
	
	it('1. Test ajax success..', function() {
		var data = '';
		spyOn($, "ajax").andCallFake(function(options) {
	        ajaxCall = true;            
	        options.success(data);             
	    });
		doLogin('');
		expect(ajaxCall).toBe(true);
	});
	it('2. Test ajax failure..', function() {
			spyOn($, "ajax").andCallFake(function(options) {
		        ajaxCall = true;            
		        options.error('','');             
		    });
			doLogin('');
			expect(ajaxCall).toBe(true);
		});
});