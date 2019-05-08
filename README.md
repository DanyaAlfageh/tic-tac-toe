# tic-tac-toe
tic tac toe project

# Planning and Development Process

I saterted by setting up the page and game. I then moved to making sure when every position is occupied it is not allowed to be taken again. I then started to buil a function to check winning. Then I started to solve how to stop the game once a player won. Finally I bulit the function to check the tie.
after all the above was working perfectly I added possibility to choose the first player. This led to the need to give default values in case none were chosen and also led to editing my previous code to accept switching players according to choic.

After all that was working properly I went ahead with trying to create the AI Opponenet
I decided on the easiet way is to add to the following position. but found out based on the way my current code works the easiest way is to make the computer play the first empty position hence. once i figured that out I went ahead and tried to add it to my current play board function but that did not work so I created a new function to set and return the computer position all this doen in one click.

# Unfixed problems

I have face two major issues:
- Restarts button : the issue was the toughest as I need to go through a lot of scenrios to get the error. the restet was working fine if it was done after someone won and only if one position is played it the reset it would cause a huge proble. I have resorted to Mike who told me what is the reason and led to solve the issue by adding an off function before settining the functions on again
- making all the options work togehter: 
my game allows the user two choises:
- player character : (leela / bender)
- game mode : (one player - two players)
I initally had only one of the possible so it did not cause many issues I allowed players to choose then blocked the choice if one is chosen. When I added Computer mode this showed an issue as the user could still choose a player while the game is goin on in case he didn't initally choose nay. So I solved by blocking the choice when the game started.

# The Winner function

My winner function was very straight forward it has 8 if statement thay checkes the contents of the the array positions that represent the winning combos if one of the if is correct it will return a key with the winner's value

# Favorite function

my favorite function is the computerGame as it was the one I was excited to bulid the moment I learned about the project.
