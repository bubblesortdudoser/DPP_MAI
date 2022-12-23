export const questions = [
    {
        id: '1',
        title: 'Выберите архитектурную конструкцию, которую можно использовать в рамках некоторого часто возникающего контекста:',
        description: '',
        variants: [
            {
                text: 'Алгоритм',
                right: false,
                doubt: false,
            },
            {
                text: 'Фреймворк',
                right: false,
                doubt: false,
            },
            {
                text: 'Шаблон проектирования',
                right: true,
                doubt: false,
            },
            {
                text: 'Антипатттерн',
                right: false,
                doubt: false,
            },
        ]
    },
    {
        id: '2',
        title: 'Теорема Байеса позволяет:',
        description: '',
        variants: [
            {
                text: 'Оценить неизвестный параметр путем \tмаксимализации функции правдоподобия \tпри допущении, что вся информация о \tстатистической выборке содержится в \tфункции правдоподобия',
                right: false,
                doubt: false,
            },
            {
                text: 'Вычислить градиент, который используется \tпри обновлении весов многослойного \tперцептрона',
                right: false,
                doubt: false,
            },
            {
                text: 'Определить вероятность события при \tусловии, что произошло другое статистически \tвзаимосвязанное с ним событие',
                right: true,
                doubt: false,
            },
            {
                text: 'Определить вероятность возникновения \tнекоторого событияпутем его сравнения \tс логистической кривой',
                right: false,
                doubt: false,
            },
        ]
    },
    {
        id: '3',
        title: 'Какие алгоритмы обобщают часто встречающиеся в данных последовательности, такие как серия переходов по веб-сайту или событий, зарегистрированных в журнале перед ремонтом оборудования?',
        description: '',
        variants: [
            {
                text: 'Алгоритмы сегментации',
                right: false,
                doubt: false,
            },
            {
                text: 'Анализа последовательностей',
                right: false,
                doubt: false,
            },
            {
                text: 'Классификации взаимосвязей',
                right: false,
                doubt: true,
            },
            {
                text: 'Регрессивные алгоритмы',
                right: false,
                doubt: false,
            },
        ]
    },
    {
        id: '4',
        title: 'Проанализируйте ситуацию и выберите один наиболее подходящий ответ',
        description: 'В настоящее время сотрудники многих компаний и организаций подвержены переменчивым настроениям и склонны к частой смене места работы. Деятельность значительного числа высококвалифицированных сотрудников так или иначе связана с использованием современных ИТ-инструментов коммуникации и профессиональной деятельности, в том числе личных средств интернет-коммуникации (блоги, социальные сети, в т.ч. профессиональные), что дает возможность анализа настроений сотрудников по поводу смены места работы.\n' +
            'Вы являетесь руководителем проекта по разработке и внедрению интеллектуальной системы предиктивной аналитики увольнения сотрудников (ИС ПАУС), задача первой версии которой – раннее обнаружение настроений сотрудников к смене места работы и оповещение об этом ответственных лиц. В компании работает 10-15 тыс. сотрудников. Бюджет проекта - 60 млн руб. на 1 год. Предполагается, что высококвалифицированные сотрудники работают в офисе (либо удалённо, но с использованием VPN компании для удаленного доступа к информационным ресурсам компании), используют для коммуникации корпоративную электронную почту, корпоративный мессенджер, а также ведут личные страницы в социальных сетях. У потенциальной системы нет жестких ограничений по обеспечению ее функционирования в реальном времени.\n' +
            'Вам поручили подготовить модель для анализа изменения лояльности сотрудника компании по широкому набору признаков. Какая из цепочек рассуждений кажется вам наиболее близкой?\n',
        variants: [
            {
                text: '1.Данные являются табличными 2. Для их \tобработки использую XGBoost, для увеличения \tскорости обучения воспользуюсь лишь \tважными признаками. 3. В качестве \tпредобработки данных используя \tстандартную нормализацию',
                right: false,
                doubt: false,
            },
            {
                text: '1.Данные относятся к временным рядам. \t2. Для их обработки используюрекуррентную \tнейронную сеть, для борьбы с затуханием \tи взрывом градиентов использую LayerNorm. \t3. В качестве предобработки данных \tиспользую стандартную нормализацию',
                right: false,
                doubt: false,
            },
            {
                text: '1.Данные относятся к временным рядам. \t2. Для их обработки использую рекуррентную \tнейронную сеть, для борьбы с затуханием \tи взрывом градиентов использую BatchNorm. \t3. В качестве предобработки данных \tиспользую стандартную нормализацию',
                right: false,
                doubt: false,
            },
            {
                text: '1.Данные относятся к временным рядам. \t2. Для их обработки использую SARIMA, не \tимеющую различных проблем при обучении, \tкак у нейронных сетей. 3. В качестве \tпредобработки данных использую MinMax \tнормализацию',
                right: false,
                doubt: false,
            },
            {
                text: '1. Данные относятся к временным рядам. \t2. Для их обработки использую рекуррентную \tнейронную сеть, для борьбы с затуханием \tи взрывом градиентов использую LayerNorm. \t3. В качестве предобработки данных \tиспользую MinMax нормализацию',
                right: false,
                doubt: false,
            },
            {
                text: '1. Данные являются табличными. 2. Для их \tобработки использую XGBoost, для увеличения \tскорости обучения воспользуюсь лишь \tважными признаками. 3. В качестве \tпредобработки данных использую MinMaх \tнормализацию',
                right: false,
                doubt: true,
            },
        ],
        comments: [
            'Test comm 1',
            'Test comm 2',
            'Test comm 3 аоывоаоыофво фоыво оо тест тест тест Test comm 3 аоывоаоыофво фоыво оо тест тест тест Test comm 3 аоывоаоыофво фоыво оо тест тест тест Test comm 3 аоывоаоыофво фоыво оо тест тест тест',
            'Test comm 4',
            'Test comm 5',
        ],
    },
]