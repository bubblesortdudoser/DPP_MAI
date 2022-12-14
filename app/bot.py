import os
import telebot
from markups import markups as mp
from dotenv import load_dotenv
from models.Tests import Test
from config import app
from db import conn

app.config.from_pyfile("config.py")
conn.init_app(app)
config = load_dotenv()
bot = telebot.TeleBot(os.getenv("TG_API_KEY"))

msg_id_to_delete = dict()


@bot.message_handler(commands=['start'])
def start(message) -> None:
    try:
        bot.send_message(message.chat.id, mp.start_msg, reply_markup=mp.off_markup, parse_mode='MARKDOWN')
    except Exception as e:
        bot.reply_to(message, f'{e}')


@bot.message_handler(content_types=["text"])
def text_handler(message):
    try:
        test = Test()
        output = test.find_question(qst=message.text)
        msg = ''
        i = 0
        keys = []
        for data in output:
            i += 1
            for key in data:
                keys.append(key)
                msg += f"{i}. {data[key]}\n"
        msg = bot.send_message(message.chat.id, msg, reply_markup=mp.get_inline_menu(keys), parse_mode='MARKDOWN')
        msg_id_to_delete[message.chat.id] = msg.id

    except Exception as e:
        bot.reply_to(message, f'{e}')


@bot.callback_query_handler(func=lambda call: True)
def callback_handler(call):
    bot.delete_message(call.message.chat.id, message_id=msg_id_to_delete[call.message.chat.id])
    with app.app_context():
        test = Test.query.filter_by(id=call.data).first()
        question = test.question
        right_answer = test.right_answer
        answers = test.answers
        ansmsg = ''
        rightansmsg = ''
        for rans in right_answer[0]:
            rightansmsg += str(rans) + ';'
        i = 0
        for ans in answers:
            i += 1
            ansmsg += str(i) + ". " + ans + '\n'

        msg = f'''
❓ *Вопрос:*
{question}\n
🎲 *Варианты ответов:*
{ansmsg}
✅ *Правильные ответы:*
{rightansmsg}
'''
        bot.send_message(call.message.chat.id, msg, reply_markup=mp.off_markup, parse_mode="MARKDOWN")


def main():
    bot.polling(none_stop=True)


if __name__ == "__main__":
    main()
