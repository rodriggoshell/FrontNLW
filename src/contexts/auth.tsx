import { createContext, ReactNode, useEffect, useState } from 'react';
import { api } from '../services/api.ts';

type User = {
  id: string;
  name: string;
  login: string;
  atavar_url: string;
}


type AuthContextData = {
  user: User | null;
  signInUrl: string;
  signOut: () => void;
}

export const AuthContext = createContext({} as AuthContextData);

type AuthProvider = {
  children: ReactNode;
}

type AuthResponse = {
  tonke: string;
  user: {
    id: string;
    avatar_url: string;
    name: string;
    login: string;
  }
}


export function AuthProvider(props: AuthProvider) {
  const [user, setUser] = useState<User | null>(null)

  const signInurl = `https://github.com/login/oauth/authorize?scope=user&client_id=c577eb203979b7bf33b0`;

  async function signIn(githubCode: string) {
    const response = await api.post<AuthResponse>('authenticate', {
      code: githubCode,
    })

    const { token, user } = response.data;

    localStorage.setItem('@dowhile:token', token);

    setUser(user)
  }

  function signOut() {
    setUser(null)
    localStorage.removeItem('@dowhile:tonek')
  }


  useEffect(() => {
    const token = localStorage.getItem('@dowhile:token');

    if (token) {
      api.defaults.headers.common.authorization = `Bearer ${token}`;

      api.get<User>('profile').then(response => {
        setUser(response.data);
      })
    }
  }, []);


  useEffect(() => {
    const url = window.location.href;
    const hasGithubCode = url.includes('?code=')

    if (hasGithubCode) {
      const [urlWithoutCode, githubCode] = url.split('?code=')
      window.history.pushState({}, '', urlWithoutCode);
      signIn(githubCode)
    }
  }, []);


  return (
    <AuthContext.Provider value={{ signInurl, user, signOut }}>
      {props.children}
    </AuthContext.Provider>
  );
}
