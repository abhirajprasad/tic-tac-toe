let boxes = document.querySelectorAll(".box");
let resetBtn = document.querySelector("#reset-btn");
let newBtn = document.querySelector("#new-btn");
let msgContainer = document.querySelector(".msg-container");
let msg = document.querySelector("#msg");

//for tracking player's turn
let turn = true; //player0

//winnig patterns array
const winPatterns = [
    [0, 1, 2],
    [0, 3, 6],
    [0, 4, 8],
    [1, 4, 7],
    [2, 5, 8],
    [2, 4, 6],
    [3, 4, 5],
    [6, 7, 8]
];

const resetGame = () => {
    turn = true;
    enableBoxes();
    msgContainer.classList.add("hide");
};

let count = 0;

boxes.forEach((box) => {
    box.addEventListener("click", () => {
        
        console.log(`box was clicked ${count}`);
        if(turn === true){
            box.innerHTML = "<span style='color: red;'>X</span>";
            turn = false;
        }else {
            box.innerText = "O";
            turn = true;
        } 
        count++;
        box.disabled = true; // so that overwrite could not happen

        checkWinner();
        if(count === 9){
            draw();

        };
        
    });
});

const disableBoxes = () => {
    for(let box of boxes) {
        box.disabled = true;
    }
};

const enableBoxes = () => {
    for(let box of boxes) {
        box.disabled = false;
        box.innerText = "";
    }
};

const showWinner = (winner) => {
    msg.innerText = `Congratulations, Winner is ${winner}`;
    msgContainer.classList.remove("hide");
    disableBoxes();
};
const draw = () => {
    msg.innerText = `Sorry, it's a tie`;
    msgContainer.classList.remove("hide");
    disableBoxes();
}
const checkWinner = () => {
    for(let pattern of winPatterns ) {       
        let pos1Val = boxes[pattern[0]].innerText; 
        let pos2Val = boxes[pattern[1]].innerText; 
        let pos3Val = boxes[pattern[2]].innerText;

        
        if(pos1Val != "" && pos2Val != "" && pos3Val != "") {
            if(pos1Val === pos2Val && pos2Val === pos3Val ) {
                showWinner(pos1Val);
            }
        }
    }
};


newBtn.addEventListener("click", resetGame);
resetBtn.addEventListener("click", resetGame);
