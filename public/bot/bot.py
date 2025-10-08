from telegram import Update
from telegram.ext import Application, CommandHandler
import logging

# Настройка логов
logging.basicConfig(
    format='%(asctime)s - %(name)s - %(levelname)s - %(message)s',
    level=logging.INFO
)
logger = logging.getLogger(__name__)

async def start(update: Update, context):
    args = context.args
    if args:
        try:
            phone, code = args[0].split('_')
            await update.message.reply_text(f"Пожалуйста вернитесь на сайт и введите код: {code}")
        except:
            await update.message.reply_text("❌ Неверный формат. Используйте: /start номер_код")
    else:
        await update.message.reply_text("ℹ️ Для получения кода перейдите по ссылке с сайта")

def main():
    # Создаем Application вместо Updater
    application = Application.builder().token("7593935798:AAH_FdAKsBmj-5Mp1D0rkjFA5A5Wpx8PmmI").build()

    # Регистрируем обработчики
    application.add_handler(CommandHandler("start", start))

    # Запускаем бота
    application.run_polling()
    logger.info("Бот запущен")

if __name__ == "__main__":
    main()