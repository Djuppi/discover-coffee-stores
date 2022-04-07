import React from 'react';
import { useRouter } from 'next/router';
import Link from 'next/Link';

export default function CoffeeStore() {
  const router = useRouter();
  return (
    <div>{router.query.id}
      <Link href="/">
        <a>Back to Home</a>
      </Link>
      <Link href="/coffee-store/dynamic">
        <a>Back to page dynamic</a>
      </Link>
    </div>
  )
}
