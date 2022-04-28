const TelegramApi = require('node-telegram-bot-api')
const {gameOptions, againOptions} = require('./options')

const token = '5359833079:AAFEIt2-tNx32splSAbtvNk6eZ8DS9oiIk4'

const bot = new TelegramApi(token, {polling: true})

const chats = {}

const startGame = async (chatId) => {
    await bot.sendMessage(chatId, 'Отгадай число от 0 до 9')
    chats[chatId] = String(Math.floor(Math.random() * 10))
    await bot.sendMessage(chatId, 'Отгадывай', gameOptions)
}


const start = () => {
    bot.on('message', async msg => {
        const text = msg.text
        const chatId = msg.chat.id

        await bot.setMyCommands([
            {command: '/start', description: 'Начальное приветствие'},
            {command: '/info', description: 'Информация о пользователе'},
            {command: '/game', description: 'Игра!'},
        ])

        if (text === '/start') {
            await bot.sendSticker(chatId, 'https://tlgrm.ru/_/stickers/ea5/382/ea53826d-c192-376a-b766-e5abc535f1c9/7.webp')
            return  bot.sendMessage(chatId, 'Добро пожаловать в телеграм бот!')
        }
        if (text === '/info') {
            return  bot.sendMessage(chatId, `Тебя зовут ${msg.from.first_name} ${msg.from.last_name}!\nТвой никнейм ${msg.from.username}`)
        }
        if (text === '/game') {
            return startGame(chatId)
        }
        return bot.sendMessage(chatId, 'Я тебя не понимаю, попробуй еще раз!)')
    })
    bot.on('callback_query', async msg => {
        const data = msg.data
        const chatId = msg.message.chat.id
        if (data === '/again') {
            return startGame(chatId)
        }
        if (data === chats[chatId]) {
            return  bot.sendMessage(chatId, `Поздравляю! Ты отгадал цифру - ${chats[chatId]}`, againOptions)
        } else {
            return  bot.sendMessage(chatId, `Ты не отгадал! Была загадана цифра - ${chats[chatId]}`, againOptions)
        }
    })
}

start()

