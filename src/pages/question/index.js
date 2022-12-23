import {useParams} from "react-router-dom";
import styles from './index.module.css'
import {useState, useEffect} from "react";
import {getCommentsFromQuestion, getQuestion, postComment} from "../../api";

export const Question = (props) => {
    const {
        question
    } = props

    if (!question) return null
    const answersCopy = Array.isArray(question.answers) ? question.answers[0] : question.answers
    return (
        <div className={styles.question}>
            <div className={styles.questionTitle}>
                {question.question}
            </div>
            {
                question.description ? (
                    <div className={styles.questionDescription}>
                        {question.description}
                    </div>
                ) : null
            }
            <div className={styles.variantsTitle}>
                Варианты ответов
            </div>
            <ul>
                {
                    Object.entries(answersCopy).map(([key, value], index) => (
                        <li className={[
                            styles.questionVariant,
                            value === 'True' && styles.questionVariantRight,
                            value === 'Probably' && styles.questionVariantDoubt,
                        ].join(' ')}
                            key={index}
                        >
                            {key}
                        </li>
                    ))
                }
            </ul>
        </div>
    )
}

export const Comments = (props) => {
    const {
        comments,
        id,
        text,
        whenTextChange,
        fetchComments,
    } = props

    if (!comments) return null

    return  (
        <div>
            <div className={styles.variantsTitle}>Комментарии</div>
            <textarea className={styles.commentsTextarea} value={text} onChange={(e) => whenTextChange(e)}/>
            <button className={styles.commentsButton} onClick={async () => {
                await postComment({
                    "question_id": id,
                    "comment": text,
                })
                await fetchComments()
            }}>
                Отправить
            </button>
            {comments.length ? (
                <div className={styles.commentList}>
                    {comments.slice(0).reverse().map((c, index) => (
                        <div className={styles.comment} key={index}>
                            {c}
                        </div>
                    ))}
                </div>) : null}
        </div>

    )
}

export const QuestionPage = () => {
    const { id } = useParams();
    const [question, setQuestion] = useState(null)
    const [comments, setComments] = useState([])
    const [text, setText] = useState('')

    async function fetchQuestions() {
        const question = await getQuestion(id)
        setQuestion(question.data)
    }

    async function fetchComments() {
        const comments = await getCommentsFromQuestion(id)
        setComments(comments.data)
    }

    useEffect(() => {
        fetchQuestions()
        fetchComments()
    }, [])
    return (
        <div>
            <Question
                question={question}
            />
            <Comments
                comments={comments.reverse()}
                id={id}
                text={text}
                whenTextChange={(e) => setText(e.target.value)}
                fetchComments={() => fetchComments()}
            />
        </div>
    );
};