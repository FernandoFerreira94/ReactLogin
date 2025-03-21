import styles from './home.module.css'
import { Link } from 'react-router-dom'
import { BsSearch } from 'react-icons/bs'
export default function Home() {
  return (
    <>
      <main className={styles.container}>
        <form action="" className={styles.form}>
          <input type="text" placeholder="Digite a moeda... Ex: bitcoins" />

          <button type="submit">
            <BsSearch size={30} color="#fff" />
          </button>
        </form>

        <table>
          <thead>
            <tr>
              <th scope="col">Moeda</th>
              <th scope="col">Valor mercado</th>
              <th scope="col">Preço</th>
              <th scope="col">Volume</th>
              <th scope="col">Mudança 24h</th>
            </tr>
          </thead>

          <tbody>
            <tr className={styles.tr}>
              <td className={styles.tdLabel} data-label="Moeda">
                <div className={styles.name}>
                  <Link to={'/detail/bitcoins'}>
                    <span> Bitcoins</span> | BTC
                  </Link>{' '}
                </div>
              </td>

              <td className={styles.tdLabel} data-label="Valor mercado">
                1T
              </td>

              <td className={styles.tdLabel} data-label="Preço">
                8.000
              </td>

              <td className={styles.tdLabel} data-label="Volume">
                2B
              </td>

              <td className={styles.tdLabel} data-label="Mudança 24h">
                <span>1.20</span>
              </td>
            </tr>
          </tbody>
        </table>
      </main>
    </>
  )
}
