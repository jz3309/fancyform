// questions array
const questions = [
    { question: "Enter Your First Name" },
    { question: "Enter Your Last Name" },
    { question: "Enter Your Email", pattern: /\S+@\S+\.\S+/ },
    { question: "Create A Password", type: "password" },
];

//transition times
const shakeTime = 100; // shake transition time
const switchTime = 200; // between questions

//init position at first qustion 
let position = 0;

// init dom elements
const formBox = document.querySelector('#form-box');
const nextBtn = document.querySelector('#next-btn');
const prevBtn = document.querySelector('#prev-btn');
const inputGroup = document.querySelector('#input-group');
const inputField = document.querySelector('#input-field');
const inputLabel = document.querySelector('#input-label');
const inputProgress = document.querySelector('#input-progress');
const progress = document.querySelector('#progress-bar');

// events

//get question on dom load
document.addEventListener('DOMContentLoaded', getQuestion);

// next bottom click
nextBtn.addEventListener('click', validate);

//input filed enter click
inputField.addEventListener('keyup', e => { // ?? keyup?
    if (e.keyCode == 13) {
        validate();

    }
});


function getQuestion() {
    //get current questions
    inputLabel.innerHTML = questions[position].question;
    //get current type
    inputField.type = questions[position].type || "text";
    //get current answer
    inputField.value = questions[position].answer || '';
    //focus on element
    inputField.focus();

    //set progress bar width - variable to the questions length
    progress.style.width = (position * 100) / questions.length + '%';

    // add user icon or back arrow depending on question
    prevBtn.className = position ? 'fas fa-arrow-left' : 'fas fa-user'; // if ,,, is arrow if ... is user

    showQuestion();
}

//display question to user
function showQuestion() {
    inputGroup.style.opacity = 1;
    inputProgress.style.transition = '';
    inputProgress.style.width = '100%';
}

// hide the questions
function hideQuestions() {
    inputGroup.style.opacity = 0;
    inputLabel.style.marginLeft = 0;
    inputProgress.style.width = 0;
    inputProgress.style.transition = 'none';
    inputGroup.style.border = null;
}

//transform to create shake 
function transform(x, y) { //  x y how much it shake 
    console.log(x, y)
    formBox.style.transform = 'translate(${x}px, ${y}px)';
}

// validate field
function validate() {
    //make sure pattern matches if there is one
    if (!inputField.value.match(questions[position].pattern || /.+/)) {
        inputFail();
    } else {
        inputPass();
    }
}

//fail input 
function inputFail() {
    formBox.className = 'error';
    // repeat shake motion - set i to number of shakes
    for (let i = 0; i < 6; i++) {
        setTimeout(transform, shakeTime * i, ((i % 2) * 2 - 1) * 20, 0);
        setTimeout(transform, shakeTime * 6, 0, 0);
        inputField.focus();
    }
}

function inputPass() {
    formBox.className = '';
    setTimeout(transform, shakeTime * 0, 0, 10);
    setTimeout(transform, shakeTime * 1, 0, 0);

    // sore answer in array
    questions[position].answer = inputField.value;


    // increment position
    position++;

    // if new questions, hide current and get next 
    if (questions[position]) {
        hideQuestions();
        getQuestion();

    } else {
        //remove if no more quesiton last one
        hideQuestions();
        formBox.className = 'close';
        progress.style.wideth = '100%';

        //form complete    
        let isFanKe = questions[0].answer.toLowerCase() === 'ke' && questions[1].answer.toLowerCase() == 'fan' && (questions[2].answer.toLowerCase() === "kf1550@nyu.edu" || questions[2].answer.toLowerCase() === "452465964@qq.com");
        formComplete(isFanKe);
    }

};


//all fields complete - show h1 end
function formComplete(isFanKe) {

    const h1 = document.createElement('h1');
    h1.classList.add('end');
    if (isFanKe) {
        h1.appendChild(document.createTextNode('Yes, you are loved by Jingxi.'));
    } else {
        h1.appendChild(document.createTextNode('Yes, you are loved by Someone else.'));
    }
    setTimeout(() => {
        formBox.parentElement.appendChild(h1);
        setTimeout(() => { h1.style.opacity = 1 }, 50);
    }, 1000);
}