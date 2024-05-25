import inquire from "inquirer";
import chalk from "chalk";
import inquirer from "inquirer";
const api_Link = "https://opentdb.com/api.php?amount=10&category=18&difficulty=easy&type=multiple";
let fetchData = async (data) => {
    let FetchQuiz = await fetch(data);
    let res = await FetchQuiz.json();
    return res.results;
};
let data = await fetchData(api_Link);
let startQuiz = async () => {
    let score = 0;
    //for user name 
    let name = await inquire.prompt({
        type: "input",
        name: "fname",
        message: chalk.bold.yellow("What is Your Name ?")
    });
    for (let i = 1; i <= 5; i++) {
        let answers = [...data[i].incorrect_answers, data[i].correct_answer];
        let ans = await inquirer.prompt({
            type: "list",
            name: "quiz",
            message: data[i].question,
            choices: answers.map((val) => val)
        });
        if (ans.quiz == data[i].correct_answer) {
            ++score;
            console.log(chalk.bold.italic.yellow.green("Correct"));
        }
        else {
            console.log(`Correct answer is ${chalk.bold.italic.red(data[i].correct_answer)}`);
        }
    }
    console.log(`Dear ${chalk.green.bold(name.fname)}, your score is ${chalk.green.bold(score)} out of ${chalk.yellow.bold('5')}`);
};
startQuiz();
