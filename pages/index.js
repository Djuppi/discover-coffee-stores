import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Home.module.css'
import Banner from '../components/banner';
import Card from '../components/card';

import coffeeStoresData from '../data/coffee-stores.json';
export const getStaticProps = async () => {

  return {
    props: {
      coffeeStores: coffeeStoresData,
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
                  key={coffeeStore.id}
                  className={styles.card} 
                  name={coffeeStore.name} 
                  imgUrl={coffeeStore.imgUrl}
                  href={`/coffee-store/${coffeeStore.id}`} 
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
