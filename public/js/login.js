const signUpElement = document.getElementById('signUp');
const imgLogIn = document.getElementById('imgLogIn');
const signUpBtn = document.getElementById('signUpBtn');
const signInBtn = document.getElementById('signInBtn');

document.getElementById("signInForm").onkeypress = function(e) {
    var key = e.charCode || e.keyCode || 0;     
    if (key == 13) {
        e.preventDefault();
    }
} 

document.getElementById("signUpForm").onkeypress = function(e) {
    var key = e.charCode || e.keyCode || 0;     
    if (key == 13) {
        e.preventDefault();
    }
} 

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

function validateNumber(id, value={}, idMsg){
    let validMin = true;
    let validMax = true;
    let validNumber = true;
    const element = document.getElementById(id);
    const elementMsg = document.getElementById(idMsg);
    const val = parseInt(element.value.trim());
    validNumber = !isNaN(val);
    if(value.min){
        if(val < value.min){
            validMin = false;
        }
    }
    if(value.max){
        if(val > value.max){
            validMax = false;
        }
    }
    const valid = validMin && validMax && validNumber;
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

function validateFile(id, size={}, extensions=[], idMsg){
    let validMin = true;
    let validMax = true;
    let validExtension = true;
    let allowedExtensions = ""; 
    const element = document.getElementById(id);
    const elementMsg = document.getElementById(idMsg);
    const file = element.files[0];
    const elementType = file.type;
    const elementSize = file.size;
    if(extensions.length > 0){
        allowedExtensions = '(';
        for(let extension of extensions){
            allowedExtensions += '\\'+`${extension}|`;
        }
        allowedExtensions = allowedExtensions.substring(0, allowedExtensions.length - 1);
        allowedExtensions += `)$`;
        const regExpression = new RegExp(allowedExtensions, 'i');
        console.log(regExpression);
        validExtension = regExpression.exec(elementType);
        console.log(validExtension);
    }
    if(size.min){
        if(elementSize < size.min){
            validMin = false;
        }
    }
    if(size.max){
        if(elementSize > size.max){
            validMax = false;
        }
    }
    const valid = validMin && validMax && validExtension;
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

function validateSignUp(){
    const validEmail = checkEmail('emailSignUp', 'validEmail');
    const validPassword = checkPassword('password1SignUp', 'passwordCharacter');
    const validPasswordLong = validateLong('password1SignUp', {min: 8, max: 20}, 'passwordLong');
    const validName = validateLong('name', {min: 1}, 'validName');
    const validPhone = validateNumber('phone', {min: 1000000, max: 99999999999}, 'validPhone');
    const validAddress = validateLong('address', {min: 1}, 'validAddress');
    const validAge = validateNumber('age', {min: 1}, 'validAge');
    const validImg = validateFile('userAvatar', {max: 2000000}, ['jpg', 'jpeg', 'png'], 'validUserAvatar');
    const validSamePass = validateSame(['password1SignUp', 'password2SignUp'], 'passwordSame')

    if(validEmail && validPassword && validPasswordLong && validSamePass && validName && validAddress){
        signUpBtn.classList.remove('disabled');
        document.getElementById('validPassword').classList.add('d-none');
    }else{
        signUpBtn.classList.add('disabled');
        document.getElementById('validPassword').classList.remove('d-none');
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



function signIn(){
    const data = {
        email: document.getElementById('emailSignIn').value.trim().toLowerCase(),
        name: document.getElementById('nameSignIn').value.trim().toLowerCase(),
        password: document.getElementById('passwordSignIn').value.trim()
    }
    fetch('/api/auth/signin', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    }).then(function(res) {
        return res.json();
    }).then(function(myJson) {
        console.log(myJson);
    });
}