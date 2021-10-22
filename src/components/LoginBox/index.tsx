import { useContext } from 'react';
import style from './style.module.scss';
import { VscGithubInverted } from 'react-icons/vsc';
import { AuthContext } from '../../contexts/auth';

export function LoginBox() {
  const { signInurl, user } = useContext(AuthContext);

  console.log(user);

  return (
    <div className={style.loginBoxWrapper}>
      <strong>Entre e compartilhe sua mensagem</strong>
      <a href={signInurl} className={style.signGitgub}>
        <VscGithubInverted size="24" />
        Entrar com github
      </a>
    </div>
  );
}

