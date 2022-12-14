import os
from telebot import types
from dotenv import load_dotenv

config = load_dotenv()
off_markup = types.ReplyKeyboardRemove(selective=False)

start_msg = '*Привет👋 \nЭто бот-скат ДПП*\n\n❓_Какое-то описание..._\n\n📝 Просто введите начало вопроса, и бот найдет нужный вопрос c ответами!\n\n❗️U.P.D:В случае если бот не нашел нужный вопрос по нескольким словам - расширьте поисковый запрос'


def get_inline_menu(answers) -> types.InlineKeyboardMarkup:
    inline_menu = types.InlineKeyboardMarkup(row_width=3)
    itembtn1 = types.InlineKeyboardButton(text='1', callback_data=answers[0])
    itembtn2 = types.InlineKeyboardButton(text='2', callback_data=answers[1])
    itembtn3 = types.InlineKeyboardButton(text='3', callback_data=answers[2])
    inline_menu.add(itembtn1, itembtn2,itembtn3)
    return inline_menu