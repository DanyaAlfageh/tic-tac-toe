let choice = true ;
let position;
let firstplayer='leela',secondplayer='bender',leelavalue=0,bendervalue=0;
let firstplayerkey='l',secondplayerkey='b' ;
let firstplayerimage='./img/leela.png', secondplayerimage='./img/bender.png';
let occupiedBoxes=[];
let emptypositions=['empty','empty','empty','empty','empty','empty','empty','empty','empty']
let boardArr = ['-','-','-','-','-','-','-','-','-'];
let overallvalue=boardArr.length;
let firstplayerwins=0, secondplayerwins=0;
let winner='none';
let gameMode = 0;
let resertflag=false;

const setPlayers = function(event) {
  event.preventDefault();
  if($(event.target).parent().hasClass('leela'))
  {
        //console.log('Leela has been chosen'); 
        //choice = true;
        firstplayer='leela';
        firstplayerkey='l';
        firstplayerimage='./img/leela.png';
        secondplayer='bender';
        secondplayerkey='b';
        secondplayerimage='./img/bender.png';

        $(event.target).parent().parent().addClass('first-palyer-chosen');
        $('#player-name').text('First Player is '+firstplayer);
    }
  else if($(event.target).parent().hasClass('bender'))
  {
        //console.log('Bender has been chosen'); 
        //choice = false;
        firstplayer='bender';
        firstplayerkey='b';
        firstplayerimage='./img/bender.png';
        secondplayer='leela';
        secondplayerkey='l';
        secondplayerimage='./img/leela.png';
        
        $(event.target).parent().parent().addClass('first-palyer-chosen');
        $('#player-name').text('First Player is '+firstplayer);
    }

};

const setGame = function(event)
{
    event.preventDefault();
   if($(event.target).hasClass('comp-game'))
    {
        $(event.target).addClass('after-click');    
        $('#player-name').text('Computer Mode selected');
        gameMode=1;
        preventClick('.comp-game');
        preventClick('.original-game');
    
        }
    else if($(event.target).hasClass('original-game'))
    {
        $(event.target).addClass('after-click');    
        $('#player-name').text('Two Players mode Selected'); 
        preventClick('.comp-game');
        preventClick('.original-game');
        
        }
 
}

const clickReset = function(event) {

    resetflag=true;
    choice=true;
    $('.box li img').attr('src','./img/white.png');
    occupiedBoxes=[];
    emptypositions=['empty','empty','empty','empty','empty','empty','empty','empty','empty'];
    boardArr = ['-','-','-','-','-','-','-','-','-'];
    overallvalue=boardArr.length;
    winner='none';
    gameMode = 0;
    $('#player-name').text('');
    $('.set-players span img').off('click');
    $('.set-players span img').on('click',setPlayers);
    $('.box li img').off('click'); 
    $('.box li img').on('click',PlayBoard);
    $('#players-count a').off('click');      
    $('#players-count a').on('click',setGame);  
}
//let rand = (Math.floor(Math.random()*8)+1);

const computerGame = function(emptypositions,boardArr,occupiedBoxes)
{
    let firstEMpty=emptypositions.indexOf('empty');
    occupiedBoxes.push(firstEMpty);
    boardArr[firstEMpty]=secondplayerkey;
    emptypositions[firstEMpty]='Taken';
    $('#'+firstEMpty+' img').off();
    if(firstEMpty==0)
    return 0
    else
    return firstEMpty;
}
const preventClick = function(id)
{
    $(id).off('click');
}

const PlayBoard =function(event){
   // event.preventDefault();
    //console.log(firstpalyer);
    
    $('#players-count a').off('click',setGame);
    $('.set-players span img').off('click',setPlayers); 
    if(gameMode==1)
    {
        console.log(firstplayer);
        $(event.target).attr('src',firstplayerimage);
        occupiedBoxes.push($(event.target).parent().attr('id'));
        boardArr[$(event.target).parent().attr('id')]=firstplayerkey;
        emptypositions[$(event.target).parent().attr('id')]='Taken';
        if($(event.target).attr('src')!='./img/white.png')
        {preventClick($(event.target));}
        let position= computerGame(emptypositions,boardArr,occupiedBoxes);
        $('#'+position+' img').attr('src',secondplayerimage);
        let win=checkGame(boardArr);
        if(win==firstplayerkey) 
        { 
            firstplayerwins+=1;
            displayWinner(firstplayer); 
        }
        else if(win==secondplayerkey) 
        { 
            secondplayerwins+=1; 
            displayWinner(secondplayer); 
        }
        //console.log('occupied '+occupiedBoxes);
        //console.log('board '+boardArr);
        //console.log('empty '+emptypositions);
        //console.log('bender '+benderposition);
    
    }
    else if(gameMode==0)
    { 
        if(choice)
        {
            $('#players-count a').off('click',setGame); 
            //console.log('occupied '+occupiedBoxes);
            //console.log('board '+boardArr);
            //console.log('empty '+emptypositions);
            $(event.target).attr('src',firstplayerimage);
            overallvalue-=1;
            $('#player-name').text('Current Player is '+firstplayer);

            preventClick($(event.target));
            occupiedBoxes.push($(event.target).parent().attr('id'));
            boardArr[$(event.target).parent().attr('id')]=firstplayerkey;
            if(checkGame(boardArr)==firstplayerkey)
            {
                firstplayerwins+=1;
                displayWinner(firstplayer);
                
            }
            choice = false;
            //console.log(firstplayer+' '+choice+' first if');
            //console.log(firstplayerimage+' first if image');
            //console.log('occupied if '+occupiedBoxes);
            //console.log('board if '+boardArr);
    }
    ////modified here 
        else
        {
            
            $(event.target).attr('src',secondplayerimage);
            $('#player-name').text('Current Player is '+secondplayer);

            preventClick($(event.target));
            occupiedBoxes.push($(event.target).parent().attr('id'));
            boardArr[$(event.target).parent().attr('id')]=secondplayerkey;
            overallvalue-=1;
            
            if(checkGame(boardArr)==secondplayerkey)
            {
                secondplayerwins+=1;
                displayWinner(secondplayer); 
            }
            choice = true;
            //preventClick($(event.target));
            //console.log('=================================')
            //console.log('occupied else '+occupiedBoxes);
            //console.log('board else '+boardArr);
            //console.log(secondplayerimage+' second else image');
            //console.log('empty '+emptypositions);
            //console.log(secondplayer+'second player else body');
            //console.log('else body ');
        }
            
    }/////


  
};


$('.set-players span img').on('click',setPlayers);
$('.box li img').on('click',PlayBoard);    
$('#players-count a').on('click',setGame);    
$('.button').on('click',clickReset);  

const checkGame = function(boardArr){

    if(winner=='none')
    {
        //check rows
        if((boardArr[0]!='-'||boardArr[1]!='-'||boardArr[2]!='-')&&(boardArr[0]==boardArr[1])&&boardArr[1]==boardArr[2])
            return winner=boardArr[0];
        else if((boardArr[4]!='-'||boardArr[5]!='-'||boardArr[3]!='-')&&(boardArr[4]==boardArr[5])&&boardArr[5]==boardArr[3])
            return winner=boardArr[4];
        else if((boardArr[6]!='-'||boardArr[7]!='-'||boardArr[8]!='-')&&(boardArr[6]==boardArr[7])&&boardArr[6]==boardArr[8])
            return winner=boardArr[6];
        //check columns
        else if((boardArr[0]!='-'||boardArr[3]!='-'||boardArr[6]!='-')&&(boardArr[0]==boardArr[3])&&boardArr[3]==boardArr[6])
            return winner=boardArr[0];
        else if((boardArr[1]!='-'||boardArr[4]!='-'||boardArr[7]!='-')&&(boardArr[1]==boardArr[4])&&boardArr[4]==boardArr[7])
            return winner=boardArr[1];
        else if((boardArr[2]!='-'||boardArr[5]!='-'||boardArr[8]!='-')&&(boardArr[2]==boardArr[5])&&boardArr[5]==boardArr[8])
            return winner=boardArr[2];         
        //check diagonal
        else if((boardArr[0]!='-'||boardArr[4]!='-'||boardArr[8]!='-')&&(boardArr[0]==boardArr[4])&&boardArr[4]==boardArr[8])
            return winner=boardArr[0];  
        else if((boardArr[2]!='-'||boardArr[4]!='-'||boardArr[6]!='-')&&(boardArr[2]==boardArr[4])&&boardArr[4]==boardArr[6])
            return winner=boardArr[2];
        else 
        if(overallvalue==0)
        checkTie();
    }
}

const displayWinner = function (winner)
{
    $('.box li img').off('click');
    $('#player-name').text('The winner is '+winner);
    countWins();
}

const checkTie =function()
{
   $('.box li img').off('click');
   $('#player-name').text('It is a Tie');
  
}

const countWins = function(){
    $('.leela-wins').text(firstplayerwins);
    $('.bender-wins').text(secondplayerwins);
}