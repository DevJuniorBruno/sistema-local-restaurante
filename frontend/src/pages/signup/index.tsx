
import Head from 'next/head';
import styles from "../../../styles/home.module.scss";
import Image from 'next/image';
import {Input} from '../../components/ui/Input'
import { Button } from '../../components/ui/Button';
import Link from 'next/link';

import logoImg from '../../../public/logo.svg';

export default function SignUp() {
  return (
    <div>
      <Head>
      <title>Faça seu cadastro agora</title>
      </Head>
      <div className={styles.containerCenter}>
        <Image  src={logoImg} alt='logoImage'  />
      
      <div className={styles.login}>

        <h1>Faça seu cadastro</h1>

        <form>

        <Input 
          placeholder='Digite seu nome'
          type='text'
          />

          <Input 
          placeholder='Digite seu login'
          type='text'
          />

         <Input 
         placeholder="Crie sua senha"
         type='password' 
         />

         <Button
         type='submit'
         Loading={false}
         >
          Login
         </Button>
        </form>

       <Link className={styles.text} href="/"> 
        Já possui um cadastro? Faça login!
       </Link>
      </div>
      </div>
    </div>
  )
}
