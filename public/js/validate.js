const firstName = document.querySelector('#firstName');
const lastName = document.querySelector('#lastName');
const uEmail = document.querySelector('#uEmail');
const password = document.querySelector('#password');
const form = document.querySelector('#signupForm');

const isRequired = value => value === '' ? false : true;
const isBetween = (length, min, max) => length < min || length > max ? false : true;

const debounce = (fn, delay = 500) =>
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

form.addEventListener('input', debounce(function (e)
{
  switch(e.target.id)
  {
    case 'firstName':
      checkFirstName();
      break;
    case 'lastName':
      checkLastName();
      break;
    case 'uEmail':
      checkEmail();
      break;
    case 'password':
      checkPassword();
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
    showError(firstName, `Field must be between ${min}-${max} characters.`)
  }
  else
  {
    showSuccess(firstName);
    valid = true;
  }
  
  return valid;
}

//Checks if the last name submitted is between 3 and 50 characters long
const checkLastName = () =>
{
  let valid = false;
  const min = 3;
  const max = 50;
  const lName = lastName.value.trim();

  if(!isRequired(lName))
  {
    showError(lastName, 'This field cannot be blank.');
  }
  else if(!isBetween(lName.length, min, max))
  {
    showError(lastName, `Field must be between ${min}-${max} characters.`)
  }
  else
  {
    showSuccess(lastName);
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
  else if(!isEmailValid(email))
  {
    showError(uEmail, 'Email is not valid.')
  }
  else
  {
    showSuccess(uEmail);
    valid = true;
  }

  return valid;
}

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