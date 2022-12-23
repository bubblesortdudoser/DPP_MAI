import styles from './index.module.css'
import {Link} from "react-router-dom";

export const Header = () => {
    return (
        <div className={styles.header}>
            <Link to={'/'}>Вопросы</Link>
            <Link to={'/expert'}>Войти как эксперт</Link>
        </div>
    );
};