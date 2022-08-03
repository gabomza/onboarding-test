import React from 'react'
import Link from 'next/link'

const HomePage = () => {
  return (
    <div>
      <ul className="homePageList">
        <li>
          <Link href="/onboarding/cust1">Customer 1</Link>
        </li>
        <li>
          <Link href="/onboarding/cust2">Customer 2</Link>
        </li>
      </ul>
    </div>
  )
}

export default HomePage
