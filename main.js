const { Telegraf, Context } = require("telegraf")
const bot = new Telegraf(process.env.TELEGRAM_TEST_GOAT_BOT_API_KEY)

const words = ["blue", "red"]

String.prototype.shuffle = function () {
    let a = this.split(""),
        n = a.length;

    for (var i = n - 1; i > 0; i--) {
        let j = Math.floor(Math.random() * (i + 1));
        let tmp = a[i];
        a[i] = a[j];
        a[j] = tmp;
    }
    return a.join("");
}

// Start Command
bot.start((context) => context.reply("Welcome little bitch. If you need assistance use the /help command. For all other inquiries or if you want to give suggestions for new features; join @goatbotsupport"))

// Help Command
bot.help((context) => context.reply(`
This is an interactive bot to add to your dumb ass group chats. Currently, you can do the following commands:

/speed - A game used to determine who can write a word correctly and the fastest.
/taboo - A game that is like charades
/scramble = A game centered around players correctly unscambling a scrambled words correct form.
/leaderboard - A Command used to show leaderboard
`))

bot.hears("/scramble", context => {
    let a = words[Math.floor(Math.random() * words.length)]
    let b = a.shuffle();
    context.reply("What is " + b + " unscrambled?")
    while (context.chat != a && context.chat != "exit") {
        context.reply("That answer was incorrect " + context.from.username + ".")
    }
    if (context.chat == "exit") {
        context.reply("Thanks for playing, you have not exited the game.")
    }
    else
        context.reply(context.from.username + " you are the winner, the answer was " + a + ". To play again type /scramble again.")

})


bot.launch();

process.once("SIGINT", () => bot.stop("SIGINT"));
process.once("SIGTERM", () => bot.stop("SIGTERM"));