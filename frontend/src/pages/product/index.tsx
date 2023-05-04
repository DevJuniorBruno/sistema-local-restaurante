import {ChangeEvent, FormEvent, useState} from 'react';
import {canSSRAuth} from '../../utils/canSSRAuth';
import Head from 'next/head';
import{ Header} from '../../components/Header';
import styles from './styles.module.scss';
import { FiUpload } from 'react-icons/fi';
import {setupAPIClient } from '../../services/api';
import { toast } from 'react-toastify';


type ItemProps = {
    id:string;
    name: string;
}

interface CategoryProps{
    categoryList: ItemProps[];
}

export default function Product({categoryList}:CategoryProps){

const[name, setName] = useState("");
const[price, setPrice] = useState("");
const[description, setDescription]= useState("");





const [avatarUrl, setAvatarUrl] = useState('');
const [imageAvatar, setImageAvatar] = useState(null);

const [categories, setCategories] = useState(categoryList || [] );
const [categorySelected, setCategorySelected] = useState(undefined);


function handleFile(e: ChangeEvent<HTMLInputElement>){
    
    if(!e.target.files){
        return;
    }
    
    const image = e.target.files[0];
    
    if(!image){
        console.log("Algo de errado não está certo")
        toast.error("!image")
        return;
    }
    
    if(image.type === 'image/jpeg' || image.type === "image/png"){
        setImageAvatar(image);
        setAvatarUrl(URL.createObjectURL(e.target.files[0]));
        
    }
}

function handleCategoriesSelected(event){

    setCategorySelected(event.target.value);

    
}

async function handleProductRegistration(event:FormEvent){
    event.preventDefault();



    try{

        let data = new FormData()
    
        if(name === "" || price === "" || description === "" || imageAvatar === null){
            toast.error("Preencha todos os campos!")
        }

        data.append('name', name);
        data.append('price', price);
        data.append('description', description);
        data.append('file', imageAvatar);
        data.append('category_id', categories[categorySelected].id)

        const apiClient = setupAPIClient();
        await apiClient.post('/product', data);
        toast.success("Produto cadastrado com sucesso!")
        

    } catch(err){

    console.log(err)
    toast.error("Erro ao cadastrar!")

        
    }
  
}

return(
    <>

        <Head>
            <title>Cadastro de Produtos</title>
        </Head>
        <Header/> 
        <div >
            
            <main className={styles.container}>
            <h1>Novo produto</h1>
            <form className={styles.form} onSubmit={handleProductRegistration} >

            <label className={styles.labelAvatar}>
                <span >
                    <FiUpload size={28} color="#fff" />
                </span>
    
                <input 
                type='file'
                accept='image/png, image/jpg'
                onChange={handleFile}
                />

               {avatarUrl && (
                <img 
                className={styles.preview}
                src={avatarUrl}
                alt="Foto do produto"
                width={250}
                height={250}
                />
               )}
                 
            </label>

                <select value={undefined} className={styles.select} onChange={handleCategoriesSelected} > 

                {/*option-bottom is category selected to  "Selecione uma categoria"*/}

                <option value={undefined} >Selecione uma categoria</option> 


                  {categories.map( (item, index)=>{
                    return(
                        <option key={item.id} value={index}>
                            {item.name}
                        </option>
                    )
                  } )}
                
                </select>

                <input 
                placeholder = 'nome do item'
                className = { styles.input }
                value={name}
                onChange = { (e) => setName (e.target.value) }
                />

                <input 
                placeholder = 'valor'
                className = { styles.input }
                value={price}
                onChange = { (e) => setPrice (e.target.value) }

                />
                <textarea
                placeholder='Descrição'
                className={styles.textarea}
                value={description}
                onChange = { (e) => setDescription (e.target.value) }

                />

            <button 
            type="submit" 
            className={styles.buttonAdd}
            >
                Cadastrar
            </button>

            </form>
            </main>
        </div>
        </>
    )

}






//isso mantem a aplicação segura e so deixara a url ser acessada a partir da validação programada em ./utils
export const getServerSideProps = canSSRAuth(async(ctx)=>{
  
    const apiClient = setupAPIClient(ctx);

        const response = await apiClient.get("/category")
       // console.log(response.data)

    return{
        props:{
            categoryList: response.data
        }
    }
})