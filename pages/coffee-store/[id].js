import React from 'react';
import { useRouter } from 'next/router';
import Link from 'next/link';
import Head from 'next/head';
import Image from 'next/image';
import styles from '../../styles/coffee-store.module.css';
import cls from 'classnames';
import { isEmpty } from '../../utils';

import { fetchCoffeeStores } from '../../lib/coffee-stores';
import { useContext, useState, useEffect } from 'react';
import { StoreContext } from '../../store/store-context';

export async function getStaticProps(staticProps) {
  const params = staticProps.params;


  const coffeeStores = await fetchCoffeeStores();
  console.log({coffeeStores})
  const findCoffeeStoreById = coffeeStores.find((coffeeStore) => {
    return coffeeStore.fsq_id.toString() === params.id; //dynamic id
  });
  return {
    props: {
      coffeeStore: findCoffeeStoreById ? findCoffeeStoreById : {},
    },
  };
}

export async function getStaticPaths() {
  const coffeeStores = await fetchCoffeeStores();
  const paths = coffeeStores.map((coffeeStore) => {
    return {
      params: {
        id: coffeeStore.fsq_id.toString(),
      },
    };
  });
  return {
    paths,
    fallback: true,
  };
}

const CoffeeStore = (initialProps) => {
  const router = useRouter();

  const id = router.query.id;

  const [coffeeStore, setCoffeeStore] = useState(initialProps.coffeeStore);

  const {
    state: {
      nearbyCoffeeStores
    }
  } = useContext(StoreContext);

  if(router.isFallback) {
    return <div>Loading...</div>
  }

  useEffect(() => {
    if(isEmpty(initialProps.coffeeStore)) {
      if(nearbyCoffeeStores.length > 0 ) {
        const coffeeStoresFromContext = nearbyCoffeeStores.find(coffeeStore => coffeeStore.fsq_id == id);
        setCoffeeStore(coffeeStoresFromContext);
      }
    }
  }, [id, initialProps.coffeeStore, coffeeStore])

    const handleUpvoteButton = () => {
    console.log("Upvote");
  }
  console.log({coffeeStore})
  const { name, location: {address, neighborhood, formatted_address}, imgUrl } = coffeeStore;

  return (
    <div className={styles.layout}>
      <Head>
        <title>{name}</title>
      </Head>
      <div className={styles.container}>
        <div className={styles.col1}>
          <div className={styles.backToHomeLink}>
            <Link href="/">
              <a>← Back to Home</a>
            </Link>
          </div>
          <div className={styles.nameWrapper}>
            <h1 className={styles.name}>{name}</h1>
          </div>
          <Image src={imgUrl || "https://images.unsplash.com/photo-1498804103079-a6351b050096?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=2468&q=80"} width={600} height={360} className={styles.storeImg} alt={name} /> 
        </div>
        <div className={cls("glass", styles.col2)}>
          <div className={styles.iconWrapper}>
            <Image src="/static/icons/places.svg" width={24} height={24} />
            <p className={styles.text}>{address || formatted_address}</p>
          </div>
          {neighborhood && (
          <div className={styles.iconWrapper}>
            <Image src="/static/icons/nearMe.svg" width={24} height={24} />
            <p className={styles.text}>{neighborhood[0]}</p>
          </div>
          )}
          <div className={styles.iconWrapper}>
            <Image src="/static/icons/star.svg" width={24} height={24} />
            <p className={styles.text}>1</p>
          </div>

          <p>
            <button className={styles.upvoteButton} onClick={handleUpvoteButton}>Up vote!</button>
          </p>
        </div>
      </div>
    </div>
  )
}

export default CoffeeStore;
