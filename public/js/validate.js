import {signInUser, createUser} from "./services/authServices.js";
import {User, UserType} from "./model/user.js";
import {writeUserData, getCurrentUser} from "./services/databaseServices.js";

const firstName = document.querySelector('#firstName');
const uEmail = document.querySelector('#uEmail');
const major = document.querySelector('#major');
const grade = document.querySelector('#grade');
const password = document.querySelector('#password');
const signUpForm = document.querySelector('#signupForm');
const signInForm = document.querySelector('#signinForm');

const isRequired = value => value === '' ? false : true;
const isBetween = (length, min, max) => length < min || length > max ? false : true;

signUpForm.addEventListener('submit', function (e)
{
  e.preventDefault();

  //get the values of the inputs
  const firstNameValue = firstName.value.trim();
  const uEmailValue = uEmail.value.trim();
  const majorValue = major.value.trim();
  const gradeValue = grade.value.trim();
  const passwordValue = password.value.trim();

  //run through test functions for each input
  if(checkFirstName()  && checkEmail() && checkPassword() && checkMajor() && checkGrade())
  {
    var newUser  = new User(null, firstNameValue, uEmailValue, UserType.STUDENT, gradeValue, majorValue);

    createUser(uEmailValue, passwordValue).then((user) =>
    {
      if (user != null)
      {
        //User authentication was successful, push user data to database
        newUser.userId = user.uid;

        writeUserData(newUser).then( _ =>
        {
          window.alert("User successfully created!");
          window.location.href = 'StudentHome.html';
        })
      }
    })
  }
  else
  {
    alert("Please make sure the form is completely filled out.");
  }
});

// const signInEmail = document.getElementById('signInEmail');
// console.log(signInEmail)
signInForm.addEventListener('submit', function (e)
{
  e.preventDefault();

  const signInEmail = document.getElementById('signInEmail');
  const signInPassword = document.getElementById('signInPass');

  if(signInEmail && signInPassword && signInEmail.value != "" && signInPassword.value != "")
  {
    signInUser(signInEmail.value, signInPassword.value).then(async(userId) =>
    {
      if (userId != null)
      {
        var user = await getCurrentUser();

        if (user.userType == "student")
        {
          window.location.href = 'StudentHome.html';
        }
        else if (user.userType == "tutor")
        {
          window.location.href = 'TutorHome.html';
        }
        else if (user.userType == "admin")
        {
          window.location.href = 'AdminHome.html';
        }
      }
    });
  }
  else
  {
    alert("Please enter a valid email and password");
  }
});

const debounce = (fn, delay = 250) =>
{
  let timeoutId;

  return (...args) =>
  {
      if (timeoutId)
      {
        clearTimeout(timeoutId);
      }
      timeoutId = setTimeout(() => {fn.apply(null, args)}, delay);
  };
};

signUpForm.addEventListener('input', debounce(function (e)
{
  switch(e.target.id)
  {
    case 'firstName':
      checkFirstName();
      break;
    // case 'lastName':
    //   checkLastName();
    //   break;
    case 'uEmail':
      checkEmail();
      break;
    case 'password':
      checkPassword();
      break;
    case 'major':
      checkMajor();
      break;
    case 'grade':
      checkGrade();
      break;
  }
}));

const isEmailValid = (email) =>
{
  const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return re.test(email);
};

const isPasswordSecure = (password) =>
{
  //Password is required to have at least one uppercase and one lowercase letter, at least 6 characters long, and at least one number.
  const re = new RegExp("^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.{6,})");
  return re.test(password);
};

const isMajorValid = (major) =>
{
  //Name of major is required to have at least 3 characters
  const re = new RegExp("^(?=.{3,})");
  return re.test(major);
}

const isGradeValid = (grade) =>
{
  //grade is required to have one and only one number
  const re = new RegExp('^[0-9]{1,}$');
  return re.test(grade);
}

//Shows an error message
const showError = (input, message) =>
{
  const formField = input.parentElement;

  // add the error class
  formField.classList.remove('success');
  formField.classList.add('error');

  // show the error message
  const error = formField.querySelector('small');
  error.textContent = message;
};

//This is used when signup is successful
const showSuccess = (input) =>
{
  const formField = input.parentElement;

  //remove the error class
  formField.classList.remove('error');
  formField.classList.add('success');

  //hide the error message
  const error = formField.querySelector('small');
  error.textContent = '';
}

//Checks if the first name submitted is between 3 and 50 characters long
const checkFirstName = () =>
{
  let valid = false;
  const min = 3;
  const max = 50;
  const fName = firstName.value.trim();

  if(!isRequired(fName))
  {
    showError(firstName, 'This field cannot be blank.');
  }
  else if(!isBetween(fName.length, min, max))
  {
    showError(firstName, `Invalid Name`);
  }
  else
  {
    showSuccess(firstName);
    valid = true;
  }
  
  return valid;
}

//Checks if the last name submitted is between 3 and 50 characters long
// const checkLastName = () =>
// {
//   let valid = false;
//   const min = 3;
//   const max = 50;
//   const lName = lastName.value.trim();

//   if(!isRequired(lName))
//   {
//     showError(lastName, 'This field cannot be blank.');
//   }
//   else if(!isBetween(lName.length, min, max))
//   {
//     showError(lastName, `Field must be between ${min}-${max} characters.`)
//   }
//   else
//   {
//     showSuccess(lastName);
//     valid = true;
//   }
  
//   return valid;
// }

//Checks if grade submitted is valid
const checkGrade = () =>
{
  let valid = false;
  const inputGrade = grade.value.trim();

  if(!isRequired(inputGrade))
  {
    showError(grade, 'This field cannot be blank.');
  }
  else if(!isGradeValid(inputGrade))
  {
    showError(grade, 'Invalid Input');
  }
  else
  {
    showSuccess(grade);
    valid = true;
  }

  return valid;
}

//Checks if major submitted is valid
const checkMajor = () =>
{
  let valid = false;
  const inputMajor = major.value.trim();

  if(!isRequired(inputMajor))
  {
    showError(major, 'This field cannot be blank.');
  }
  else if(!isMajorValid(inputMajor))
  {
    showError(major, 'Invalid Input');
  }
  else
  {
    showSuccess(major);
    valid = true;
  }

  return valid;
}

//Checks if email submitted is valid
const checkEmail = () =>
{
  let valid = false;
  const email = uEmail.value.trim();

  if(!isRequired(email))
  {
    showError(uEmail, 'This field cannot be blank.');
  }
  else if(!isEmailValid(email) || email.slice(-4) != '.edu')
  {
    showError(uEmail, 'Invalid Email');
  }
  else
  {
    showSuccess(uEmail);
    valid = true;
  }

  return valid;
}

//

//Checks if the password submitted is valid
const checkPassword = () =>
{
  let valid = false;
  const tPassword = password.value.trim();

  if(!isRequired(tPassword))
  {
    showError(password, 'This field cannot be blank.');
  }
  else if(!isPasswordSecure(tPassword))
  {
    showError(password, 'Password must be at least 6 characters, one uppercase letter, and one number');
  }
  else
  {
    showSuccess(password);
    valid = true;
  }

  return valid;
};