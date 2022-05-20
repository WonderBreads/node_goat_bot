const { Telegraf, Context } = require("telegraf")
const bot = new Telegraf("")

const words = ["blue", "red"]
let randomWord;
let chatMap = {
    
}

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
    randomWord = words[Math.floor(Math.random() * words.length)]
    let chatId = context.chat.id
    let scrambledWord = randomWord.shuffle();

    chatMap[chatId] = randomWord

    context.reply("What is " + scrambledWord + " unscrambled?")
    console.log("Current Chat map:")
    console.log(chatMap)
})

bot.on('text', (ctx) => {

    if (ctx.message.text === chatMap[ctx.chat.id]) {
        ctx.reply(`Congrats! ${ctx.from.first_name} guessed the word correctly. it was: ${randomWord}`)
        chatMap[ctx.chat.id] = ""
    }

})

bot.launch();

process.once("SIGINT", () => bot.stop("SIGINT"));
process.once("SIGTERM", () => bot.stop("SIGTERM"));