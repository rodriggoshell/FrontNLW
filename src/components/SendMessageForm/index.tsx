import { useContext } from 'react';
import { VscSignOut } from 'react-icons/vsc';
import { VscGithubInverted } from 'react-icons/vsc';
import { AuthContext } from '../../contexts/auth';
import style from './style.module.scss';

export function SendMessageForm() {
  const { user, signOut } = useContext(AuthContext);

  return (
    <div className={style.sendMessageFormWrapper}>
      <button onClick={signOut} className={style.signOutButton}>
        <VscSignOut size="32" />
      </button>

      <header className={style.userInformation}>
        <div className={style.userImage}>
          <img src={user?.avatar_url} alt={user?.name} />
        </div>
        <strong className={style.userName}>{user?.name}</strong>
        <span className={style.userGithub}>
          <VscGithubInverted size="16" />
          {user?.login}
        </span>
      </header>

      <form className={style.sendMessageForm}>
        <label htmlFor="message">Mensagem</label>
        <textarea
          name="message"
          id="message"
          placeholder="Qual sua expectativa para o evento?"
        />
        <button type="submit">Enviar mensagem</button>
      </form>
    </div>
  );
}
