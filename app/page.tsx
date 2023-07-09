import Image from 'next/image'
import { Inter } from 'next/font/google'
import styles from './page.module.css'
import Monitor from './monitor/page'

const inter = Inter({ subsets: ['latin'] })

export default function Home() {
  return (
    <main className={styles.main}>
          <div className={styles.center}>
        <Image
          className={styles.logo}
          src="/ft.png"
          alt="Fenotec Logo"
          width={180}
          height={37}
          priority
        />
      
      </div>
  
        <div className='w-100'>
          <h2>Monitor</h2>
          <Monitor />
        </div>
    
  
    </main>
  )
}
