
import Head from 'next/head';
import {useState, FormEvent, useContext} from 'react';
import styles from "../../../styles/home.module.scss";
import Image from 'next/image';
import {Input} from '../../components/ui/Input'
import { Button } from '../../components/ui/Button';
import Link from 'next/link';
import { AuthContext } from '../../contexts/AuthContext';
import { toast } from 'react-toastify';

import logoImg from '../../../public/logo.svg';

export default function SignUp() {

  const { signUp} = useContext(AuthContext);

  const [name,setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("")

  const [loading, setLoading] = useState(false);

  async function handleSingUp(event: FormEvent){
    event.preventDefault();

    if(name === "" || email === "" || password === ""){
        toast.error("Preencha todos os campos!")
    }

    setLoading(true);

    console.log(name, email, password)

    let data ={
      name,
      email,
      password
    }

    await signUp(data);

    setLoading(false);

  }

  return (
    <div>
      <Head>
      <title>Faça seu cadastro agora</title>
      </Head>
      <div className={styles.containerCenter}>
        <Image  src={logoImg} alt='logoImage'  />
      
      <div className={styles.login}>

        <h1>Faça seu cadastro</h1>

        <form onSubmit={handleSingUp}>
        <Input 
          placeholder='Digite seu nome'
          type='text'
          value={name}
          onChange={ (e) => setName(e.target.value) }
          />

          <Input 
          placeholder='Digite seu login'
          type='text'
          value={email}
          onChange={ (e) => setEmail(e.target.value) }
          />

         <Input 
         placeholder="Crie sua senha"
         type='password' 
         value={password}
          onChange={ (e) => setPassword(e.target.value) }
         />

         <Button
         type='submit'
         Loading={loading}
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
