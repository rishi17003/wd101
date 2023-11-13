let Name= document.getElementById("name");
Name.addEventListener('input',() => validateName(Name));
let EmailId= document.getElementById("email");
EmailId.addEventListener('input',() => validateEmail(EmailId));
let Password= document.getElementById("password");
Password.addEventListener('input',() => validatePassword(Password));
let DOB=document.getElementById("dob");
DOB.addEventListener('input',() => validateDob(DOB));

function validateName(element){
    if(element.value.length<5){
        element.setCustomValidity("The Name should be atleast 5 characters long");
        element.reportValidity();
    }else{
        element.setCustomValidity('');
    }
}

function validateEmail(element){
    if(element.validity.typeMismatch){
        element.setCustomValidity("The Email is not in the right format!!");
        element.reportValidity();
    }else{
        element.setCustomValidity('');
    }
}

function validatePassword(element){
    if(element.value.length<6){
        element.setCustomValidity("The password should be atleat 6 characters long");
        element.reportValidity();
    }else{
        element.setCustomValidity('');
    }
}

function validateDob(element){
    let today = new Date();
    let inputDate = new Date(element.value);
    let age = today.getFullYear() - inputDate.getFullYear();
    if (age < 18 || age > 55) {
        element.setCustomValidity("Age must be between 18 and 55.");
        element.reportValidity();
    } else {
        element.setCustomValidity('');
    }
}


 let userForm=document.getElementById("user-form");
 const retrieveEntries=() => {
    let entries =localStorage.getItem("user-entries");
    if(entries){
        entries=JSON.parse(entries);
    }else{
        entries=[];
    }
    return entries;
 }
 let userEntries=retrieveEntries();
 const displayEntries=()=>{
    const entries=retrieveEntries();
    const tableEntries=entries.map((entry) => {
        const nameCell= `<td>${entry.name}</td>`;
        const emailCell= `<td>${entry.email}</td>`;
        const passwordCell= `<td>${entry.password}</td>`;
        const dobCell= `<td>${entry.dob}</td>`;
        const acceptCell= `<td>${entry.acceptedTermsAndConditions}</td>`;

        const row = `<tr>${nameCell} ${emailCell} ${passwordCell} ${dobCell} ${acceptCell}</tr>`;
        return row;
    }).join("\n");


    const table =`<table class = "input-box"><tr> <th class = "input-field" style="width:20%; text-align:center;">Name</th> <th class = "input-field" style="width:20%; text-align:center;">Email</th> <th class = "input-field" style="width:20%; text-align:center;">Password</th><th class = "input-field" style="width:20%; text-align:center;">Dob</th> <th class = "input-field" style="width:20%; text-align:center;">Accepted terms?</th></tr>${tableEntries}</table>` ;

    let details = document.getElementById("user-entries");
    details.innerHTML=table;
 }

 const saveUserForm=(event) =>{
    event.preventDefault();
    const name=document.getElementById("name").value;
    const email=document.getElementById("email").value;
    const password=document.getElementById("password").value;
    const dob=document.getElementById("dob").value;
    const acceptedTermsAndConditions=document.getElementById("accept-check").checked;
    const entry={ 
        name,
        email,
        password,
        dob,
        acceptedTermsAndConditions
    };
    userEntries.push(entry);
    localStorage.setItem("user-entries",JSON.stringify(userEntries));
    displayEntries();
 }
 userForm.addEventListener("submit", saveUserForm);
 displayEntries();