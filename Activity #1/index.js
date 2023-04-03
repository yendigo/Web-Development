let question;
let form;
let res;
let qno;
let score;

const questions = [
    {
        title : 'What is the capital of Russia?',
        options : [
            'Chernobyl', 
            'Lithuania', 
            'Kiev', 
            'Moscow'
        ],
        answer : '3',
        score : 1
    },
    {
        title : 'What year did the Berlin Wall come down?',
        options : [
            '1991',
            '1989',
            '1992',
            '1975'
        ],
        answer : '1',
        score : 1
    },
    {
        title : 'Which was Not a Cause of the Fall of the Soviet Union?',
        options : [
            'U.S. defeat of Russia',
            'Nationalism in the Soviet Block',
            'Fall of Berlin Wall',
            'Soviet Economic Collapse'
        ],
        answer : '0',
        score : 1
    },
    {
        title : 'Sputnik was a satellite created by what country?',
        options : [
            'China',
            'Korea',
            'Soviet Union',
            'Japan'
        ],
        answer : '2',
        score : 1
    },
    {
        title : 'What type of economic system was used in the USSR, China and North Korea?',
        options : [
            'Capitalism',
            'Command Economy',
            'Mercantilism',
            'Mixed Economy'
        ],
        answer : '1',
        score : 1
    },
    {
        title : 'Contaiment is a Cold War term which means to stop the spread of Communism',
        options : [
            'True',
            'False',
        ],
        answer : '0',
        score : 1
    },
    {
        title : 'What kind of government did the Soviet Union have?',
        options : [
            'Dictatorship',
            'Democracy',
            'Monarchy',
            'Anarchy'
        ],
        answer : '0',
        score : 1
    },
    {
        title : 'What was the main goal of the Soviet Union during the Cold War?',
        options : [
            'To eliminate the nation of Germany',
            'To spread communism to other countries',
            'To contain the spread of communism',
            'To strengthen bonds with China and Germany'
        ],
        answer : '1',
        score : 1
    },
    {
        title : 'What two nations were in competition with each other during the Cold War?',
        options : [
            'Spain and Portugal',
            'Germany and Italy',
            'United States and Soviet Union',
            'England and France'
        ],
        answer : '2',
        score : 1
    },
    {
        title : 'When did the Soviet Union collapse?',
        options : [
            '1919',
            '1945',
            '2017',
            '1991'
        ],
        answer : '3',
        score : 1
    }
];

const audio = new Audio();
audio.src = './ussr.mp3';


const audio2 = new Audio();
audio2.src = './sad.mp3';

function off() {
    document.getElementById("overlay").style.display = "none";
}
function off2() {
    document.getElementById("overlay2").style.display = "none";
}

function restartScreen() {
    document.querySelector('.quiz-heading').innerHTML = `Score : ${score}`
    const card = document.querySelector('.question-card');
    card.innerHTML = "<ul>";
    questions.forEach((ques) => {
        const html = `
        <li>${ques.title} <div class="answer-label">${ques.options[ques.answer]}</div></li>
        `;
        card.innerHTML += html;
    });
    card.innerHTML += "</ul>";
    document.querySelector('.answer-key').style.display ='block';
    document.querySelector('button').style.display ='block';
}

function resetradio() {
    document.querySelectorAll('[type="radio"]').forEach((radio) => {
        radio.removeAttribute("disabled");
    });
    res.setAttribute("class","idle");
    res.innerHTML = "Empty";
}

function evaluate() {
    if(form.op.value == questions[qno].answer) {
        res.setAttribute("class","correct");
        res.innerHTML = "Correct";
        score += questions[qno].score;
        document.querySelector("#overlay").style.display = "block";
        audio.volume = 0.1;
        audio.play();


    } 
    else {
        res.setAttribute("class","incorrect");
        res.innerHTML = "Incorrect";
        audio2.volume = 0.2;
        audio2.play();
        document.querySelector("#overlay2").style.display = "block";
        
    }
    document.querySelectorAll('[type="radio"]').forEach((radio) => {
        radio.setAttribute("disabled","");
    })
}

function getNextQuestion() {
    qno++;
    ques = questions[qno];
    question.innerHTML = ques.title;
    const labels = document.querySelectorAll('label');
    labels.forEach((label, idx) => {
        label.innerHTML = ques.options[idx];
    }); 

    audio.pause();
    audio.currentTime = 0;

    audio2.pause();
    audio2.currentTime = 0;
}


function handleSubmit(e) {
    e.preventDefault();
    if(!form.op.value) {
        alert('Please select an option');
    }
    else if(form.submit.classList.contains('submit')) {
        evaluate();
        form.submit.classList.remove('submit');
        form.submit.value = "Next"
        form.submit.classList.add('next');

        
        
        
    }
    else if(qno < questions.length - 1 && form.submit.classList.contains('next')) {

        getNextQuestion();
        resetradio();
        form.submit.classList.remove('next');
        form.submit.value = "Submit"
        form.submit.classList.add('submit');
        form.reset();
    }
    else if(form.submit.classList.contains('next')) {
        restartScreen();
        form.submit.classList.remove('next');
        form.submit.value = "Submit"
        form.submit.classList.add('submit');
        form.reset();
    }
}

function init() {
   question = document.querySelector('#question');
   form = document.querySelector('form');
   res = document.querySelector('#res');
   qno = -1;
   score = 0;
   form.addEventListener('submit', handleSubmit);
   document.querySelector('button').addEventListener('click', init);
   getNextQuestion();
}
document.querySelector('button').addEventListener('click', init);
init();


