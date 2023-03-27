console.log("Hello, World!");

function editUserCredentials(category, firstname, lastname, email, mobile, salary){
    if(category == 'add'){
        document.querySelector("#popup-form").setAttribute("action", "/add");
        document.querySelector("#popup-email").disabled = false;
        document.querySelector("#popup-submit-btn").textContent = "Add Employee";
        document.querySelector("#popup-heading").textContent = "Create New User";
    }
    else if (category == 'delete'){
        document.querySelector("#popup-form").setAttribute("action", "/delete");
        document.querySelector("#popup-email").disabled = true;
        document.querySelector("#popup-submit-btn").textContent = "Delete";
        document.querySelector("#popup-heading").textContent = "Delete Employee Data";
    }
    else {
        document.querySelector("#popup-form").setAttribute("action", "/edit");
        document.querySelector("#popup-email").disabled = true;
        document.querySelector("#popup-submit-btn").textContent = "Save Changes";
        document.querySelector("#popup-heading").textContent = "Edit User Details";
    }
    
    document.querySelector(".popup-container").classList.add("popup-container-active");
    document.querySelector("#popup-fname").setAttribute("value", firstname);
    document.querySelector("#popup-lname").setAttribute("value", lastname);
    document.querySelector("#popup-email").setAttribute("value", email);
    document.querySelector("#popup-mobile").setAttribute("value", mobile);
    document.querySelector("#popup-salary").setAttribute("value", salary);
    console.log(firstname + lastname + email + mobile + salary);
}

function closePopupWindow(){
    document.querySelector(".popup-container").classList.remove("popup-container-active");
}