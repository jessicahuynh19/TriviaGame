var triviaQuestions = [{
	question: "What was the name of Hercules's horse?",
	answerList: ["Mustang", "Pegasus", "Abraxan", "Granian"],
	answer: 1
},{
	question: "What is the name of the boy who owns Buzz Lightyear in the movie Toy Story?",
	answerList: ["Andy", "Flynn Rider", "Eric", "Gaston"],
	answer: 0
},{
	question: "Which Disney princess has a raccoon as a sidekick?",
	answerList: ["Snow White", "Sleeping Beauty", "Mulan", "Pocahontas"],
	answer: 3
},{
	question: "Who was the first Pixar character added to the Disney Princess line-up?",
	answerList: ["Jessie", "Repunzel", "Merida", "Elsa"],
	answer: 2
},{
	question: "In Lady and the Tramp Jim Dear gives his wife Darling, Lady as a gift for?",
	answerList: ["Birthday", "Anniversary", "Valentine's Day", "Christmas"],
	answer: 3
},{
	question: "What is the name of Bambi's rabbit friend?",
	answerList: ["Thumper", "Mushu", "Pumbaa", "Zazu"],
	answer: 0
},{
	question: "What does Cinderella's fairy godmother turn into a carriage?",
	answerList: ["corn", "pumpkin", "squash", "eggplant"],
	answer: 1
},{
	question: "Which was the first Disney movie to receive an Oscar nomination for Best Picture?",
	answerList: ["Peter Docter", "The Jungle Book", "The Lion King", "Beauty and the Beast"],
	answer: 3
},{
	question: "In which city is the Disney movie Ratatouille based?",
	answerList: ["Milan", "Rome", "Paris", "Cannes"],
	answer: 2
},{
	question: "What instrument did the crocodile in The Princess and the Frog play?",
	answerList: ["Violin", "French Horn", "Piano", "Trumpet"],
	answer: 3
},{
	question: "What is Cinderella's slipper made of?",
	answerList: ["Plastic", "Glass", "Plexiglass", "Acrylic"],
	answer: 1
},{
	question: "What type of animal does Jasmine have for a pet in Aladdin?",
	answerList: ["Tiger", "Monkey", "Camel", "Elephant"],
	answer: 0
},{
	question: "What's Boo's real name?",
	answerList: ["Bella", "Brooklyn", "Mary", "Betty"],
	answer: 2
},{
	question: "How long was genie stuck in the lamp for?",
	answerList: ["100 years", "1000 years", "10000 years", "100000 years"],
	answer: 2
},{
	question: "In Pocahontas, what did Pocahontas see in her dream that made her believe that a change was coming?",
	answerList: ["A hawk circling her village", "A strange cloud formation", "Burning Blue Fire", "A Spinning Arrow"],
	answer: 3
}];

var gifArray = ['peg', 'toy', 'rac', 'question4', 'pup', 'bambi', 'pumpkin', 'beauty', 'rat2', 'alligator', 'glass', 'tiger', 'boo','genie','poc'];
var currentQuestion; var correctAnswer; var incorrectAnswer; var unanswered; var seconds; var time; var answered; var userSelect;
var messages = {
	correct: "Nice job, you got it!",
	incorrect: "Sorry, better luck next time.",
	endTime: "Out of time!",
	finished: "Let's see how well you did."
}

$('#startBtn').on('click', function(){
	$(this).hide();
	newGame();
});

$('#startOverBtn').on('click', function(){
	$(this).hide();
	newGame();
});

function newGame(){
	$('#finalMessage').empty();
	$('#correctAnswers').empty();
	$('#incorrectAnswers').empty();
	$('#unanswered').empty();
	currentQuestion = 0;
	correctAnswer = 0;
	incorrectAnswer = 0;
	unanswered = 0;
	newQuestion();
}

function newQuestion(){
	$('#message').empty();
	$('#correctedAnswer').empty();
	$('#gif').empty();
	answered = true;
	
	
	$('#currentQuestion').html('Question #'+(currentQuestion+1)+'/'+triviaQuestions.length);
	$('.question').html('<h2>' + triviaQuestions[currentQuestion].question + '</h2>');
	for(var i = 0; i < 4; i++){
		var choices = $('<div>');
		choices.text(triviaQuestions[currentQuestion].answerList[i]);
		choices.attr({'data-index': i });
		choices.addClass('thisChoice');
		$('.answerList').append(choices);
	}
	countdown();
	
	$('.thisChoice').on('click',function(){
		userSelect = $(this).data('index');
		clearInterval(time);
		answerPage();
	});
}

function countdown(){
	seconds = 10;
	$('#timeLeft').html('<h3>Time Remaining: ' + seconds + '</h3>');
	answered = true;

	time = setInterval(showCountdown, 1000);
}

function showCountdown(){
	seconds--;
	$('#timeLeft').html('<h3>Time Remaining: ' + seconds + '</h3>');
	if(seconds < 1){
		clearInterval(time);
		answered = false;
		answerPage();
	}
}

function answerPage(){
	$('#currentQuestion').empty();
	$('.thisChoice').empty(); 
	$('.question').empty();

	var rightAnswerText = triviaQuestions[currentQuestion].answerList[triviaQuestions[currentQuestion].answer];
	var rightAnswerIndex = triviaQuestions[currentQuestion].answer;
	$('#gif').html('<img src = "assets/images/'+ gifArray[currentQuestion] +'.gif" width = "400px">');
	
	if((userSelect == rightAnswerIndex) && (answered == true)){
		correctAnswer++;
		$('#message').html(messages.correct);
	} else if((userSelect != rightAnswerIndex) && (answered == true)){
		incorrectAnswer++;
		$('#message').html(messages.incorrect);
		$('#correctedAnswer').html('The correct answer was: ' + rightAnswerText);
	} else{
		unanswered++;
		$('#message').html(messages.endTime);
		$('#correctedAnswer').html('The correct answer was: ' + rightAnswerText);
		answered = true;
	}
	
	if(currentQuestion == (triviaQuestions.length-1)){
		setTimeout(scoreboard, 5000)
	} else{
		currentQuestion++;
		setTimeout(newQuestion, 5000);
	}	
}

function scoreboard(){
	$('#timeLeft').empty();
	$('#message').empty();
	$('#correctedAnswer').empty();
	$('#gif').empty();

	$('#finalMessage').html(messages.finished);
	$('#correctAnswers').html("Correct Answers: " + correctAnswer);
	$('#incorrectAnswers').html("Incorrect Answers: " + incorrectAnswer);
	$('#unanswered').html("Unanswered: " + unanswered);
	$('#startOverBtn').addClass('reset');
	$('#startOverBtn').show();
	$('#startOverBtn').html('Start Over?');
}