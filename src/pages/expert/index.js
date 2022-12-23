import {useEffect, useState} from "react";
import styles from './index.module.css'
import {addQuestion, getAllQuestions, editQuestion as patchQuestion, deleteQuestion, searchQuestion} from "../../api";
import {Question} from "../home";

export const clone = (obj) => {
    return JSON.parse(JSON.stringify(obj))
}

export const DEFAULT_EDIT_QUESTIONS = {
    text: '',
    description: '',
}

export const DEFAULT_EDIT_VAR = [
    {
        text: '',
        right: false,
        doubt: false,
    },
    {
        text: '',
        right: false,
        doubt: false,
    },
    {
        text: '',
        right: false,
        doubt: false,
    },
    {
        text: '',
        right: false,
        doubt: false,
    },
]

export const ExpertPanel = (props) => {
    const {
        questions,
        fetch,
        setQuestions,
    } = props
    const [state, setState] = useState('add')
    const [question, setQuestion] = useState({
        text: '',
        description: '',
    })
    const [variants, setVariants] = useState([
        {
            text: '',
            right: false,
            doubt: false,
        },
        {
            text: '',
            right: false,
            doubt: false,
        },
        {
            text: '',
            right: false,
            doubt: false,
        },
        {
            text: '',
            right: false,
            doubt: false,
        },
    ])

    const [editQuestion, setEditQuestion] = useState(DEFAULT_EDIT_QUESTIONS)
    const [editVariants, setEditVariants] = useState(DEFAULT_EDIT_VAR)

    const [editId, setId] = useState(null)

    const handleVariantChange = (e, i) => {
        const varCopy = clone(variants)
        varCopy[i].text = e.target.value
        setVariants(varCopy)
    }

    const handleVariantRightClick = (i) => {
        const varCopy = clone(variants)
        varCopy[i].right = !varCopy[i].right
        varCopy[i].doubt = false
        setVariants(varCopy)
    }

    const handleVariantDoubtClick = (i) => {
        const varCopy = clone(variants)
        varCopy[i].right = false
        varCopy[i].doubt = !varCopy[i].doubt
        setVariants(varCopy)
    }

    const handleEditVariantChange = (e, i) => {
        const varCopy = clone(editVariants)
        varCopy[i].text = e.target.value
        setEditVariants(varCopy)
    }

    const handleEditVariantRightClick = (i) => {
        const varCopy = clone(editVariants)
        varCopy[i].right = !varCopy[i].right
        varCopy[i].doubt = false
        setEditVariants(varCopy)
    }

    const handleEditVariantDoubtClick = (i) => {
        const varCopy = clone(editVariants)
        varCopy[i].right = false
        varCopy[i].doubt = !varCopy[i].doubt
        setEditVariants(varCopy)
    }

    const handleVariantDelete = (i) => {
        const varCopy = clone(variants)
        setVariants(varCopy.filter((_, index) => index !== i))
    }

    const handleEditVariantDelete = (i) => {
        const varCopy = clone(editVariants)
        setEditVariants(varCopy.filter((_, index) => index !== i))
    }

    const selectQuestion = (q) => {
        console.log(q)
        setId(q.id)
        setEditQuestion({
            text: q.question,
            description: q.description
        })
        const answersCopy = Array.isArray(q.answers) ? q.answers[0] : q.answers
        const variants = Object.entries(answersCopy).reduce((acc, [key, value]) => {
            acc.push({
                text: key,
                right: value === 'True',
                doubt: value === 'Probably',
            })
            return acc
        }, [])
        console.log(variants)
        setEditVariants(variants)
    }
    const [searchValue, setSearch] = useState('')


    useEffect(() => {
        async function search() {
            if (!searchValue) return
            const response = await searchQuestion({
                "search_question": searchValue
            })
            setQuestions(response.data)
        }
        search()
    }, [searchValue])

    const handleSearch = (e) => {
        setSearch(e.target.value)
    }

    const content = state === 'add' ? (
        <div className={styles.expertPanelContentWrapper}>
            <h2>Добавить вопрос</h2>
            <div className={styles.expertPanelContent}>
                <div className={styles.expertPanelContentQuestionInfo}>
                    <div className={styles.input}>
                        <div className={styles.inputLabel}>Вопрос</div>
                        <div>
                            <textarea className={styles.inputTextarea} value={question.text} onChange={(e) => setQuestion(state => ({
                                ...state,
                                text: e.target.value
                            }))}/>
                        </div>
                    </div>
                    <div className={styles.input}>
                        <div className={styles.inputLabel}>Описание</div>
                        <div className={styles.inputContent}>
                            <textarea className={styles.inputTextarea} value={question.description ?? ''} onChange={(e) => setQuestion(state => ({
                                ...state,
                                description: e.target.value
                            }))}/>
                        </div>
                    </div>
                </div>
                <div>
                    <div className={styles.inpHelp}>
                        <div className={styles.sep}></div>
                        <div className={styles.Help}>✅</div>
                        <div className={styles.Help}>⚠️</div>
                    </div>
                    {variants.map((v, index) => (
                        <div className={styles.input} key={index}>
                            <div className={styles.inputLabel}>Вариант ответа {index + 1}</div>
                            <div className={styles.inputContent}>
                                <input className={styles.inputInput} value={v.text} onChange={(e) => handleVariantChange(e, index)} type="text"/>
                                <input className={styles.inputCheckbox} onChange={() => handleVariantRightClick(index)} type="checkbox" checked={v.right}/>
                                <input className={styles.inputCheckbox} onChange={() => handleVariantDoubtClick(index)} type="checkbox" checked={v.doubt}/>
                                <div onClick={() => handleVariantDelete(index)}>❌</div>
                            </div>
                        </div>
                    ))}
                    <button onClick={() => {
                        setVariants(state => [
                            ...state,
                            {
                                text: '',
                                right: false,
                                doubt: false,
                            },
                        ])
                    }}>+</button>
                    <button onClick={async () => {
                        const answers = variants.reduce((acc, item) => {
                            let type = 'None'
                            if (item.right) {
                                type = 'True'
                            }
                            if (item.doubt) {
                                type = 'Probably'
                            }
                            acc[item.text] = type
                            return acc
                        }, {})
                        if (!Object.entries(answers).length) {
                            return
                        }
                        await addQuestion({
                            question: question.text,
                            description: question.description,
                            answers,
                        })
                        await fetch()
                    }}>
                        Создать
                    </button>
                </div>
            </div>
        </div>

    ) : (
        <div className={styles.expertPanelContentWrapper}>
            <h2>Редактировать вопрос</h2>
            <div className={styles.expertPanelContent}>
                <div className={styles.expertPanelContentQuestionInfo}>
                    <div className={styles.input}>
                        <div className={styles.inputLabel}>Вопрос</div>
                        <div>
                            <textarea className={styles.inputTextarea} value={editQuestion.text} onChange={(e) => setEditQuestion(state => ({
                                ...state,
                                text: e.target.value
                            }))}/>
                        </div>
                    </div>
                    <div className={styles.input}>
                        <div className={styles.inputLabel}>Описание</div>
                        <div className={styles.inputContent}>
                            <textarea className={styles.inputTextarea} value={editQuestion.description} onChange={(e) => setEditQuestion(state => ({
                                ...state,
                                description: e.target.value
                            }))}/>
                        </div>
                    </div>
                </div>
                <div>
                    <div className={styles.inpHelp}>
                        <div className={styles.sep}></div>
                        <div className={styles.Help}>✅</div>
                        <div className={styles.Help}>⚠️</div>
                    </div>
                    {editVariants.map((v, index) => (
                        <div className={styles.input} key={index}>
                            <div className={styles.inputLabel}>Вариант ответа {index + 1}</div>
                            <div className={styles.inputContent}>
                                <input className={styles.inputInput} value={v.text ?? ''} onChange={(e) => handleEditVariantChange(e, index)} type="text"/>
                                <input className={styles.inputCheckbox} onChange={() => handleEditVariantRightClick(index)} type="checkbox" checked={v.right}/>
                                <input className={styles.inputCheckbox} onChange={() => handleEditVariantDoubtClick(index)} type="checkbox" checked={v.doubt}/>
                                <div onClick={() => handleEditVariantDelete(index)}>❌</div>
                            </div>
                        </div>
                    ))}
                    <button onClick={() => {
                        setEditVariants(state => [
                            ...state,
                            {
                                text: '',
                                right: false,
                                doubt: false,
                            },
                        ])
                    }}>+</button>
                    <button onClick={async () => {
                        const answers = editVariants.reduce((acc, item) => {
                            let type = 'None'
                            if (item.right) {
                                type = 'True'
                            }
                            if (item.doubt) {
                                type = 'Probably'
                            }
                            acc[item.text] = type
                            return acc
                        }, {})
                        console.log(answers)
                        if (!Object.entries(answers).length) {
                            return
                        }
                        if (!editId) return

                        await patchQuestion(editId, {
                            question: editQuestion.text,
                            description: editQuestion.description,
                            answers,
                        })
                        await fetch()
                    }}
                        disabled={!Boolean(editId)}
                    >
                        Изменить
                    </button>
                    <button
                        onClick={async () => {
                            if (!editId) return
                            await deleteQuestion(editId)
                            setEditVariants(DEFAULT_EDIT_VAR)
                            setEditQuestion(DEFAULT_EDIT_QUESTIONS)
                            setId(null)
                            await fetch()
                        }}
                        disabled={!Boolean(editId)}
                    >Удалить</button>
                </div>
            </div>
            <div>
                <div className={styles.search}>
                    <input type="text" value={searchValue}  onChange={(e) => handleSearch(e)} placeholder={'Поиск вопроса'}/>
                </div>
                <ol>
                    {questions.map((q) => (
                        <li
                            key={q.id}
                        >
                            <Question
                                onClick={() => selectQuestion(q)}
                                question={q}
                            >
                                {q.question}
                            </Question>
                        </li>
                    ))}
                </ol>
            </div>
        </div>
    )
    return (
        <div className={styles.expertPanel}>
            <div className={styles.expertPanelHeader}>
                <button onClick={() => setState('add')}>Добавить вопрос</button>
                <button onClick={() => setState('edit')}>Редактировать вопрос</button>
            </div>
            {content}
        </div>
    )
}

export const ExpertPage = () => {
    const [isExpert, setIsExpert] = useState(false)
    const [password, setPassword] = useState('')
    const [questions, setQuestions] = useState([])
    async function fetch() {
        const response = await getAllQuestions()
        setQuestions(response.data)
    }
    useEffect(() => {
        fetch()
    }, [])

    const onPassChange = (e) => {
        setPassword(e.target.value)
    }

    useEffect(() => {
        const diff = new Date(localStorage.getItem('delete')).getTime() - new Date().getTime()
        if (Math.ceil(diff / (1000 * 3600 * 24)) > 1) {
            localStorage.removeItem('QkhjdakdhjquwihkSKJASHDAKwqkhj')
        }
        if (localStorage.getItem('QkhjdakdhjquwihkSKJASHDAKwqkhj') === 'hihdihqhdwidoihdih') {
            setIsExpert(true)
        }
    }, [])

    const handleLogin = () => {
        if (password === '123') {
            setIsExpert(true)
            localStorage.setItem('QkhjdakdhjquwihkSKJASHDAKwqkhj', 'hihdihqhdwidoihdih')
            localStorage.setItem('delete', new Date().toString())
        }
    }

    return (
        <div>
            {!isExpert ? (
                <div className={styles.expertLogin}>
                    <h1 className={styles.expertTitle}>Войти</h1>
                    <input type="password" onChange={onPassChange} value={password}/>
                    <button onClick={handleLogin}>Login</button>
                </div>
            ) : (
                <ExpertPanel questions={questions} fetch={fetch} setQuestions={setQuestions}/>
            )}
        </div>
    );
};