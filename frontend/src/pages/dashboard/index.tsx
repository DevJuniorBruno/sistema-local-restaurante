import styles from './styles.module.scss'
import { canSSRAuth} from '../../utils/canSSRAuth';
import Head from 'next/head';
import { Header } from '../../components/Header';
import { FiRefreshCcw } from 'react-icons/fi';
import { setupAPIClient } from '@/services/api';
import { useState } from 'react';
import Modal from 'react-modal';
import {ModalOrder} from '../../components/ModalOrder';

type OrdersProps ={

    id: string;
    table: number | string;
    status: boolean,
    draft: boolean,
    name: string | null
}

interface HomeProps{
    orders: OrdersProps[];
}

export type OrderItemProps = {
    id: string;
    amount: number;
    order_id: string;
    product_id: string;
    product:{
        id: string;
        name: string;
        price: string;
        description: string;
        banner: string;
        }
    order: {
        id:string;
        table: number | string;
        status: boolean;
        name: string | null;
    }
}

export default function Dashboard({orders}:HomeProps){

    const [orderList, setOrderList] = useState(orders || []);

    const [modalItem, setModalItem] = useState<OrderItemProps[]>()
    const [modalVisible, setModalVisible] = useState(false);


    function handleCLoseModal(){
        setModalVisible(false);
        
        
    }

    async function handleOpenModal(id:string){

        const apiClient = setupAPIClient();

        const response = await apiClient.get("/order/detail",{
            params:{
                order_id: id,
            }
        })

        


        setModalItem(response.data);
        setModalVisible(true);

    }

    async function handleFinishItem(id:string){
        const apiClient = setupAPIClient();
        await apiClient.put("/order/finish",{
            order_id: id
        });

        const response = await apiClient.get('/orders');

        setModalVisible(false);

        setOrderList(response.data);

    }

    async function handleRefreshList(){
        const apiCLient = setupAPIClient();

        const response = await apiCLient.get("/orders");

        setOrderList(response.data);

    }

    Modal.setAppElement('#__next');


    return (
        <>
        <Head>
            <title>Painel - Dashboard</title>
        </Head>

        <div>

        <Header/>

    <main className={styles.container}>
        <div className={styles.containerHeader} > 
                <h1>Ùltimos pedidos</h1>
                <button onClick={ () => {handleRefreshList()} } >
                    <FiRefreshCcw size={25} color="#3fffa3"/>
                </button>
        </div>

        <article className={styles.listOrders}>

            {orderList.length === 0 &&(
                <span>
                    <p>Não ha mesas abertas</p> 
                </span>
            )}

        {orderList.map( item => (
          
            <section key={item.id} className={styles.orderItem} >
                <button onClick={ () => handleOpenModal(item.id)} >
                    <div className={styles.tag}></div>
                    <span>Mesa {item.table}</span>
                </button>
            </section>
            
             
        ))}
            
      
        </article>

        
    </main>

    { modalVisible &&(
        <ModalOrder
            isOpen={modalVisible}
            onRequestClose={handleCLoseModal}
            order={modalItem}
            handleFinishOrder={handleFinishItem}
        />
    ) }
       
        </div>
        
        </>
    )
}

export const getServerSideProps = canSSRAuth(async (ctx) =>{

    const apiClient = setupAPIClient(ctx);

    const response = await apiClient.get("/orders")

    return {
        props: { 
            orders: response.data
         }
    }
})