const signUpElement = document.getElementById('signUp');
const imgLogIn = document.getElementById('imgLogIn');
const signUpBtn = document.getElementById('signUpBtn');
const signInBtn = document.getElementById('signInBtn');

function showSignUp(){
    imgLogIn.classList.remove("signin");
    signUpElement.classList.remove("h-0");
    signUpElement.classList.add("h-75");
    imgLogIn.classList.add("signup");
}

function showSignIn(){
    imgLogIn.classList.remove("signup");
    signUpElement.classList.remove("h-75");
    signUpElement.classList.add("h-0");
    imgLogIn.classList.add("signin");
}

function checkEmail(id, idMsg){
    const validRegex = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g;
    //const validRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-]/;
    const email = document.getElementById(id);
    const emailMsg = document.getElementById(idMsg);
    if(email.value.trim().match(validRegex)){
        if(idMsg){
            emailMsg.classList.add('d-none');
        }
        return true;
    }else{
        if(idMsg){
            emailMsg.classList.remove('d-none');
        }
        return false;
    }
}

function checkPassword(id, idMsg){
    const validRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])/;
    const password = document.getElementById(id);
    const passwordMsg = document.getElementById(idMsg);
    if(password.value.trim().match(validRegex)){
        if(idMsg){
            passwordMsg.classList.add('d-none');
        }
        return true;
    }else{
        if(idMsg){
            passwordMsg.classList.remove('d-none');
        }
        return false;
    }
}

function validateLong(id, long={}, idMsg){
    let validMin = true;
    let validMax = true;
    const element = document.getElementById(id);
    const elementMsg = document.getElementById(idMsg);
    if(long.min){
        if(element.value.trim().length < long.min){
            validMin = false;
        }
    }
    if(long.max){
        if(element.value.trim().length > long.max){
            validMax = false;
        }
    }
    const valid = validMin && validMax;
    if(valid){
        if(idMsg){
            elementMsg.classList.add('d-none');
        }
        return true;
    }else{
        if(idMsg){
            elementMsg.classList.remove('d-none');
        }
        return false;
    }
}

function validateSame(ids=[], idMsg){
    const elementMsg = document.getElementById(idMsg);
    let pass = '';
    for(let id in ids){
        const val = document.getElementById(ids[id]);
        if(id > 0){
            if(val.value.trim() != pass){
                if(idMsg){
                    elementMsg.classList.remove('d-none');
                }
                return false;
            }
        }else{
            pass = val.value.trim();
        }
    }
    if(idMsg){
        elementMsg.classList.add('d-none');
    }
    return true;
}

function validateSignUp(){
    const validEmail = checkEmail('emailSignUp', 'validEmail');
    const validName = validateLong('name', {min: 1}, 'validName');
    const validPhone = validateLong('phone', {min: 7}, 'validPhone');
    const validPassword = checkPassword('password1SignUp', 'passwordCharacter');
    const validPasswordLong = validateLong('password1SignUp', {min: 8, max: 20}, 'passwordLong');
    const validSamePass = validateSame(['password1SignUp', 'password2SignUp'], 'passwordSame')

    if(validPassword && validPasswordLong && validSamePass){
        document.getElementById('validPassword').classList.add('d-none');
    }else{
        document.getElementById('validPassword').classList.remove('d-none');
    }

    if(validEmail && validName && validPassword && validPasswordLong && validSamePass){
        signUpBtn.classList.remove('disabled');
    }else{
        signUpBtn.classList.add('disabled');
    }
}

function validateSignIn(){
    const validEmail = checkEmail('emailSignIn');
    const validPasswordLong = validateLong('passwordSignIn', {min: 1});
    if(validEmail && validPasswordLong){
        signInBtn.classList.remove('disabled');
    }else{
        signInBtn.classList.add('disabled');
    }
}

function signUp(){
    event.preventDefault();
    const data = {
        username: document.getElementById('emailSignUp').value.trim().toLowerCase(),
        password: document.getElementById('password1SignUp').value.trim(),
        name: document.getElementById('name').value.trim(),
        phone: document.getElementById('phone').value.trim(),
    }
    fetch('/api/auth/register', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    }).then(function(res) {
        return res.json();
    }).then(function(myJson){
        if(myJson.success){
            Swal.fire({
                icon: 'success',
                text: myJson.data.message,
                timer: 4500,
                confirmButtonText: 'Continue',
                didClose: () => {
                    window.location.href = "/products";
                }
            })
        }else{
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: myJson.message,
                timer: 4500,
                confirmButtonText: 'Continue',
                didClose: () => {
                    $('#signupForm').trigger("reset");
                }
            })
        }
    });
}

function signIn(){
    event.preventDefault();
    const data = {
        username: document.getElementById('emailSignIn').value.trim().toLowerCase(),
        password: document.getElementById('passwordSignIn').value.trim()
    }
    fetch('/api/auth/login', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    }).then(function(res) {
        return res.json();
    }).then(function(myJson) {
        if(myJson.success){
            Swal.fire({
                icon: 'success',
                text: myJson.data.message,
                timer: 4500,
                confirmButtonText: 'Continue',
                didClose: () => {
                    window.location.href = "/products";
                }
            })
        }else{
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: 'Invalid user or password',
                timer: 4500,
                confirmButtonText: 'Continue',
                didClose: () => {
                    $('#signinForm').trigger("reset");
                }
            })
        }
    });
}