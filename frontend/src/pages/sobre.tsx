import styles from '../../styles/home.module.scss';
import Head from 'next/head';
import Image from 'next/image';
import { Input } from '@/components/ui/Input';
import Logo from '../../public/logo.svg';

export default function sobre(){
    return(
        <div>
            <Head>
               <title>SujeitoPizza -Sobre</title>
            </Head>
            <div className={styles.containerCenter}>
                <Image src={Logo} alt='logo sujeito programador' />
            </div>
        </div>
    )



}