import Head from 'next/head';
import styles from '../../styles/home.module.scss';
import Image from 'next/image';
import {Input} from '../components/ui/Input'
import { Button } from '../components/ui/Button';
import Link from 'next/link';

import logoImg from '../../public/logo.svg';

export default function Home() {
  return (
    <div>
      <Head>
      <title>SujeitoPizza - Faça seu login</title>
      </Head>
      <div className={styles.containerCenter}>
        <Image  src={logoImg} alt='logoImage'  />
      
      <div className={styles.login}>
        <form>
          <Input 
          placeholder='Digite seu login'
          type='text'
          />

         <Input 
         placeholder="Digite sua senha"
         type='password' 
         />

         <Button
         type='submit'
         Loading={false}
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
