let choice = false ;
let firstpalyer='',leelavalue=0,bendervalue=0;
let occupiedBoxes=[];
let boardArr = ['-','-','-','-','-','-','-','-','-'];
overallvalue=boardArr.length;
//let leelaArr =[], benderArr=[];
let winner='none';


const setPlayers = function(event) {
  event.preventDefault();
  if($('.set-players').hasClass('first-palyer-chosen'))
  {
    $(event.target).off();
  }
  else{
    if($(event.target).parent().hasClass('leela'))
  {
        //console.log('Leela has been chosen'); 
        choice = true;
        firstpalyer='leela';
        $(event.target).parent().parent().addClass('first-palyer-chosen');
        $('#player-name').text('First Player is Leela');
    }
  else if($(event.target).parent().hasClass('bender'))
  {
        //console.log('Bender has been chosen'); 
        choice = false;
        firstpalyer='bender';
        $(event.target).parent().parent().addClass('first-palyer-chosen');
        $('#player-name').text('First Player is Bender');
    }
  }  
};

const clickReset = function(event) {
    location.reload();
};
const PlayBoard =function(event){

    if($(event.target).parent().hasClass('locked'))
    {
        $(event.target).off();
    }
    else{
            if(choice)
            {$(event.target).attr('src','./img/Leela.png');
            $(event.target).parent().addClass('locked leela');
            choice = false;
            leelavalue+=1;
            overallvalue-=1;
            $('#player-name').text('Current Player is Leela');
            occupiedBoxes.push($(event.target).parent().attr('id'));
            boardArr[$(event.target).parent().attr('id')]='l';
            //leelaArr.push($(event.target).parent().attr('id'));
            if(checkGame(boardArr)=='l')
            {
                displayWinner('Leela');
                
            }
            
        }
////modified here 
        else
        {
            $(event.target).attr('src','./img/bender.png');
            $(event.target).parent().addClass('locked bender');
            choice = true;
            bendervalue+=1;
            $('#player-name').text('Current Player is Bender');
            occupiedBoxes.push($(event.target).parent().attr('id'));
            boardArr[$(event.target).parent().attr('id')]='b';
            overallvalue-=1;
            //benderArr.push($(event.target).parent().attr('id'));
            if(checkGame(boardArr)=='b')
            {
                displayWinner('Bender');
                
            }
            
        }
        
    }
};

$('.button').on('click',clickReset);
$('.set-players span img').on('click',setPlayers);
$('.box li img').on('click',PlayBoard);    
   

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
        checkTie(boardArr);
    }
}

const displayWinner = function (winner)
{
    $('.box li img').off('click');
    $('#player-name').text('The winner is '+winner);
   
}

const checkTie =function(boardArr)
{
   
   $('.box li img').off('click');
   $('#player-name').text('It is a Tie');
    
}