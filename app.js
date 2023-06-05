const signUpForm = document.getElementById("signup");
const icon = document.getElementById("toggle")
const icon2= document.getElementById("toggle2")
const icon3= document.getElementById("toggle3")
const password = document.getElementById("password")
const retypePassword = document.getElementById("retype-password")
const countrySelect = document.getElementById("countrySelect");
const button = document.getElementById('submitButton');

// The username should be more than three letters
const checkUsernameLength = () =>{
    const username = document.getElementById("username").value;
    const usernameMessage = document.getElementById("username-message")
    const correctIcon = document.getElementById("check-icon")

    if (username.length ===0) {
        usernameMessage.style.display = "none";
        correctIcon.style.display = "none";
        button.disabled = false;
    }else if (username.length <4 ) {
        usernameMessage.innerHTML = "Username should be more than 3 letters";
        usernameMessage.classList.add('error');
        usernameMessage.style.display ="block";
        correctIcon.style.display = "none";
        button.disabled = false;
    }
     else {
        correctIcon.style.display = "block";
        usernameMessage.style.display = "none";
        button.disabled = true
    }
}

// Toggling the passwords icons
const toggleIcon = () => {
    const type = password.getAttribute("type") === "password" ? "text" : "password";
    password.setAttribute("type", type);    
    icon.classList.toggle("fa-eye");
}
const toggleIcon2= () => {
    const type = retypePassword.getAttribute("type") === "password" ? "text" : "password";
    retypePassword.setAttribute("type", type);    
    icon2.classList.toggle("fa-eye");
}
icon.addEventListener("click" ,toggleIcon);
icon2.addEventListener("click" ,toggleIcon2);

// Checking Password is the same
const checkPasswordMatch =() =>{
  const passwordValue = password.value;
  const confirmPasswordValue = retypePassword.value;
  const passwordMatchMessage = document.getElementById('error-message');

  if (passwordValue === confirmPasswordValue || confirmPasswordValue.length ===0) {
    passwordMatchMessage.innerHTML = "Passwords match";
    passwordMatchMessage.classList.remove('match');
    passwordMatchMessage.classList.remove('error');
    passwordMatchMessage.style.display ="none";

    button.disabled = false;
  }else {
    passwordMatchMessage.innerHTML = "Passwords do not match";
    passwordMatchMessage.classList.add('error');
    passwordMatchMessage.classList.remove('match');
    passwordMatchMessage.style.display ="block";
    button.disabled = true;
  }
}

// Checking password strenght
const  checkPasswordStrength=() => {
    const passwordValue = password.value;
    const strenghtMessage = document.getElementById('strenght-message');
    const correctIcon = document.getElementById("checked-icon")
    
    // Testing against the values
    const minLength = 8;
    const maxLength = 16;

    // Validate the password based on the rules
    if (passwordValue.length === 0) {
        correctIcon.style.display = "none";
        strenghtMessage.style.display = "none";
        button.disabled = false; 
    }else if (passwordValue.length < minLength || passwordValue.length > maxLength) {
        strenghtMessage.innerHTML = `Password must be between ${minLength} and ${maxLength} characters long.`;
        strenghtMessage.classList.add('error');
        strenghtMessage.style.display = "block"
        correctIcon.style.display = "none";
        button.disabled =false;
    }else {
        correctIcon.style.display = "block";
        strenghtMessage.style.display = "none"
        button.disabled = false;
    }
  }

// Using API to create the select tag
fetch("https://restcountries.com/v3.1/all")
  .then(response => response.json())
  .then(data => {
    const countries = data.map(country => {
      return {
        code: country.cca2,
        name: country.name.common,
        id:country.cca2
      };
    });

    countries.sort((a, b) => a.name.localeCompare(b.name));

    countries.forEach(country => {
      const option = document.createElement("option");
      option.value = country.name;
      option.textContent = country.name;
      option.setAttribute("name", country.name);
      countrySelect.appendChild(option);
    });
  })
  .catch(error => {
    console.error("Error:", error);
  });



// Saving the form details and creating a dynamic div to display the userDetails
const formSignUp = (e) =>{
    e.preventDefault() ; 

    // Creating variables to hold the form details
    const signUpFname = document.getElementById("fname").value
    const signUpLname = document.getElementById("lname").value
    const signUpUsername = document.getElementById("username").value
    const signUpEmail = document.getElementById("mail-input").value
    const signUpPassword = document.getElementById("password").value
    const signUpCountry = document.getElementById("countrySelect").value
    const signUpGender = document.querySelector('input[name="gender"]:checked').value

    // Using the user details to create a new web page
    const newPageContent = `
      <html>
      <head>
        <title>User Details</title>
        <link rel="stylesheet" href="./styles.css">
      </head>
      <body class="signin-body">
        <div class="container user-details" id="user-details">
          <h1>Your Details</h1>
          <p>First Name: ${signUpFname}</p>
          <p>Last Name: ${signUpLname}</p>
          <p>Username: ${signUpUsername}</p>
          <p>Email: ${signUpEmail}</p>
          <p>Password: ${signUpPassword}</p>
          <p>Country: ${signUpCountry}</p>
          <p>Gender: ${signUpGender}</p>
        </div>
      </body>
      </html>
    `
      // Opening the details on a new page
      document.open();
      document.write(newPageContent);
      document.close();
}

signUpForm.addEventListener("submit" , formSignUp)

