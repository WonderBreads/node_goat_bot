const { Telegraf, Context } = require("telegraf")
const bot = new Telegraf(process.env.TELEGRAM_TEST_GOAT_BOT_API_KEY)

// Start Command
bot.start((context) => context.reply("Welcome little bitch. If you need assistance use the /help command. For all other inquiries or if you want to give suggestions for new features; join @goatbotsupport"))

// Help Command
bot.help((context) => context.reply(`
This is an interactive bot to add to your dumb ass group chats. Currently, you can do the following commands:

/speed - A game used to determine who can write a word correctly and the fastest.
/taboo - A game that is like charades
/Scramble = A game centered around players correctly unscambling a scrambled words correct form.
/leaderboard - A Command used to show leaderboard
`))

bot.launch();

process.once("SIGINT", () => bot.stop("SIGINT"));
process.once("SIGTERM", () => bot.stop("SIGTERM"));