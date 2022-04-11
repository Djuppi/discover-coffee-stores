import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Home.module.css'
import Banner from '../components/banner';
import Card from '../components/card';
import { fetchCoffeeStores } from '../lib/coffee-stores';

export const getStaticProps = async () => {
  
  const coffeeStores = await fetchCoffeeStores();

  return {
    props: {
      coffeeStores,
    }
  }
} 

export default function Home({coffeeStores}) {

  const handleOnBannerBtnClick = () => {
    console.log("Hey banner button");
  }
  
  return (
    <div className={styles.container}>
      <Head>
        <title>Coffee Connoisseur</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <Banner buttonText="View shops nearby" handleOnClick={handleOnBannerBtnClick} />
        <figure className={styles.heroImage}>
          <Image src="/static/hero-image__small.png" width="600" height="400"/>
        </figure>
        
        {coffeeStores.length > 0 && (
          <>
            <h2 className={styles.heading2}>Toronto Coffee Stores</h2>
            <div className={styles.cardLayout}>
              {coffeeStores.map(coffeeStore => {
                return (
                <Card
                  key={coffeeStore.fsq_id}
                  className={styles.card} 
                  name={coffeeStore.name} 
                  imgUrl={coffeeStore.imgUrl || "https://images.unsplash.com/photo-1498804103079-a6351b050096?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=2468&q=80"}
                  href={`/coffee-store/${coffeeStore.fsq_id}`} 
                />
                )
              })}
            </div>
          </>
        )}
      </main>
    </div>
  )
}
