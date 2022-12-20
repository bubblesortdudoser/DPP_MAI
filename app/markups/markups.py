import os
from telebot import types
from dotenv import load_dotenv

config = load_dotenv()
off_markup = types.ReplyKeyboardRemove(selective=False)

start_msg = '*Привет👋 \nЭто бот-скат ДПП*\n\n📝 Просто введите начало вопроса, и бот найдет нужный вопрос c ответами!\n\n❗️U.P.D:В случае если бот не нашел нужный вопрос по нескольким словам - расширьте поисковый запрос\n\n/help - если бот не смог найти нужный вопрос'

help_msg = "По [ЭТОЙ ССЫЛКЕ](https://docs.google.com/document/d/1OAmK6HZ1le7EPm1sdc_FSlBAsJ68p6NeEIV3wbOXU4I/edit#heading=h.dkbwuitxp4ij) находится файл *СКАТ ДПП* со всеми вопросами и ответами к тестам.\nОткрой файл, нажми 'ctrl + f' и вбей текст вопроса."

help_mp = types.InlineKeyboardMarkup(row_width=3)
itembtn1 = types.InlineKeyboardButton(text='ДПП скат GoogleDoc', url='https://docs.google.com/document/d/1OAmK6HZ1le7EPm1sdc_FSlBAsJ68p6NeEIV3wbOXU4I/edit#heading=h.dkbwuitxp4ij')
help_mp.add(itembtn1)

def get_inline_menu(answers) -> types.InlineKeyboardMarkup:
    inline_menu = types.InlineKeyboardMarkup(row_width=3)
    itembtn1 = types.InlineKeyboardButton(text='1', callback_data=answers[0])
    itembtn2 = types.InlineKeyboardButton(text='2', callback_data=answers[1])
    itembtn3 = types.InlineKeyboardButton(text='3', callback_data=answers[2])
    inline_menu.add(itembtn1, itembtn2,itembtn3)
    return inline_menu