import React from 'react';
import { useRouter } from 'next/router';
import Link from 'next/link';
import Head from 'next/head';
import Image from 'next/image';
import styles from '../../styles/coffee-store.module.css';
import cls from 'classnames';

import coffeeStoresData from '../../data/coffee-stores.json';

export const getStaticProps = ({params}) => {
  console.log(params)
  return {
    props: {
      coffeeStore: coffeeStoresData.find(coffeeStore => coffeeStore.id == params.id)
    }
  }
}

export const getStaticPaths = () => {
  const paths = coffeeStoresData.map(coffeeStore => {
    return {
      params: {
        id: coffeeStore.id.toString()
      }
    }
  })

  return {
    paths,
    fallback: true
  }
}

export default function CoffeeStore({coffeeStore}) {
  const router = useRouter();

  if(router.isFallback) {
    return <div>Loading...</div>
  }

  const handleUpvoteButton = () => {
    console.log("Upvote");
  }

  const { name, address, neighbourhood, imgUrl } = coffeeStore;

  return (
    <div className={styles.layout}>
      <Head>
        <title>{name}</title>
      </Head>
      <div className={styles.container}>
        <div className={styles.col1}>
          <Link href="/">
            <a>Back to Home</a>
          </Link>
          <div className={styles.nameWrapper}>
            <h1 className={styles.name}>{name}</h1>
          </div>
          <Image src={imgUrl} width={600} height={360} className={styles.storeImg} alt={name} /> 
        </div>
        <div className={cls("glass", styles.col2)}>
          <div className={styles.iconWrapper}>
            <Image src="/static/icons/places.svg" width={24} height={24} />
            <p className={styles.text}>{address}</p>
          </div>
          <div className={styles.iconWrapper}>
            <Image src="/static/icons/nearMe.svg" width={24} height={24} />
            <p className={styles.text}>{neighbourhood}</p>
          </div>
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
