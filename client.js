import readline from "readline";
import axios from "axios";

const apiurl = process.env.API_URL || "http://localhost:3000/api";

//create a readline interface
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

//function to keep asking user input

function ask() {
  rl.question("> ", async (input) => {
    const cmd = input.trim();

    if (cmd === "exit") {
      rl.close();
      return;
    }
    if (cmd == "clear") {
      console.clear();
      return ask();
    }
    if (cmd == "help") {
      console.log("Commands: exit, clear, help");
      return ask();
    }

    try {
      const res = await axios.post(`${apiurl}/chat`, {
        message: input,
      });

      console.log(res.data.reply);
    } catch (err) {
      console.log("Error: ", err.message);
    }

    ask();
  });
}

ask();
