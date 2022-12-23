import styles from './index.module.css'
import {questions} from "../../db";
import {Link} from "react-router-dom";
import {useEffect, useState} from "react";
import {getAllQuestions, searchQuestion} from "../../api";
export const Question = (props) => {
    const {
        question,
        onClick,
    } = props
    return (
        <div className={styles.question} onClick={onClick}>
            <div className={styles.questionTitle}>{question.question}</div>
            {question.description ? (
                <div className={styles.questionDescription}>{question.description}</div>
            ) : null}
        </div>
    )
}

export const HomePage = () => {
    const [questions, setQuestions] = useState(null)
    const [searchValue, setSearch] = useState('')
    useEffect(() => {
        async function fetch() {
            const response = await getAllQuestions()
            setQuestions(response.data)
        }
        fetch()
    }, [])

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

    return (
        <div className={styles.HomePage}>
            <h1 className={styles.title}>
                Список вопросов
            </h1>
            <div className={styles.search}>
                <input type="text" value={searchValue}  onChange={(e) => handleSearch(e)} placeholder={'Поиск вопроса'}/>
            </div>
            <ol className={styles.questionsList}>
                {questions ? (
                    questions.map((question) => (
                        <Link className={styles.link} to={`/questions/${question.id}`} key={question.id}>
                            <li>
                                <Question
                                    question={question}
                                />
                            </li>
                        </Link>
                    ))
                ) : null}
            </ol>
        </div>
    );
};