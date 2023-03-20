import { useContext, useState } from 'react';

import Head from 'next/head';
import styles from '../../styles/home.module.scss';
import Image from 'next/image';
import {Input} from '../components/ui/Input'
import { Button } from '../components/ui/Button';
import Link from 'next/link';

import { AuthContext} from '../contexts/AuthContext';

import logoImg from '../../public/logo.svg';
import { FormEvent } from 'react';

export default function Home() {

  const { signIn } = useContext(AuthContext);

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const[loading, setLoading] = useState(false);
  
  async function handleLogin(event: FormEvent){
    event.preventDefault();

    if(email === "" || password === ""){
      alert("PREENCHA OS DADOS")
      return;
    }
    
    setLoading(true);

    let data = {
      email,
      password
    }

    await signIn(data)
    setLoading(false);
  }

  return (
    <div>
      <Head>
      <title>SujeitoPizza - Faça seu login</title>
      </Head>
      <div className={styles.containerCenter}>
        <Image  src={logoImg} alt='logoImage'  />
      
      <div className={styles.login}>
        <form onSubmit={handleLogin}>
          <Input 
          placeholder='Digite seu login'
          type='text'
          onChange={(e) => setEmail(e.target.value) }
          />

         <Input 
         placeholder="Digite sua senha"
         type='password' 
         onChange={(e) => setPassword(e.target.value) }
         />

         <Button
         type='submit'
         Loading={loading}
         >
          Login
         </Button>
        </form>

       <Link className={styles.text} href="/signup"> 
        Não possui um cadastro? Cadastre-se
       </Link>
      </div>
      </div>
    </div>
  )
}
