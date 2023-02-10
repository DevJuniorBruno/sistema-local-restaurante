import Head from 'next/head';
import styles from '../../styles/home.module.scss';
import Image from 'next/image';
import {Input} from '../components/ui/input'
import { TextArea } from '../components/ui/input';

import logoImg from '../../public/logo.svg';

export default function Home() {
  return (
    <div>
      <Head>
      <title>SujeitoPizza - Faça seu login</title>
      </Head>
      <div className={styles.containerCenter}>
        <Image  src={logoImg} alt='logoImage'  />
      </div>
      <div>
        <form>
          <Input
          placeholder='Digite seu login'
          />

          <TextArea  
            placeholder='Digite sua senha'
          />
        </form>
      </div>
    </div>
  )
}
