const TelegramApi = require('node-telegram-bot-api')

const token = '5359833079:AAFEIt2-tNx32splSAbtvNk6eZ8DS9oiIk4'

const bot = new TelegramApi(token, {polling: true})

const start = () => {
    bot.on('message', async msg => {
        const text = msg.text
        const chatId = msg.chat.id

        await bot.setMyCommands([
            {command: '/start', description: 'Начальное приветствие'},
            {command: '/info', description: 'Информация о пользователе'},
        ])

        if (text === '/start') {
            await bot.sendSticker(chatId, 'https://tlgrm.ru/_/stickers/ea5/382/ea53826d-c192-376a-b766-e5abc535f1c9/7.webp')
            await bot.sendMessage(chatId, 'Добро пожаловать в телеграм бот!')
        }
        if (text === '/info') {
            await bot.sendMessage(chatId, `Тебя зовут ${msg.from.first_name} ${msg.from.last_name}!\nТвой никнейм ${msg.from.username}`)
        }
    })
}

start()

