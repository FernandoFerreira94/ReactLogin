import React, { useState, FormEvent, useEffect } from 'react'

import styles from './home.module.css'
import { Link, useNavigate } from 'react-router-dom'
import { BsSearch } from 'react-icons/bs'

import api from '../../services/api'

interface CoinProps {
  // item vindo da api
  id: string
  name: string
  symbol: string
  priceUsd: string
  vwap24Hr: string
  changePercent24Hr: string
  rank: string
  supply: string
  marketCapUsd: string
  maxSupply: string
  volumeUsd24Hr: string
  explorer: string
  // item acrecentado
  formatedPrice?: string
  formatedMarket?: string
  formateVolume?: string
}

interface DataProps {
  data: CoinProps[]
}

export default function Home() {
  const [input, setInput] = useState<string>('')
  const [coins, setCoins] = useState<CoinProps[]>([])

  useEffect(() => {
    getData()
  }, [])

  async function getData() {
    try {
      const response: DataProps = await api.get<DataProps>()

      const coinsData = response.data.data

      const price = Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD',
      })

      const priceCompact = Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD',
        notation: 'compact',
      })
      const formatedResult: CoinProps[] = coinsData.map((item: CoinProps) => {
        const formated = {
          ...item,
          formatedPrice: price.format(Number(item.priceUsd)),
          formatedMarket: priceCompact.format(Number(item.marketCapUsd)),
          formateVolume: priceCompact.format(Number(item.volumeUsd24Hr)),
        }
        return formated
      })
      console.log(formatedResult)
      setCoins(formatedResult)
    } catch (error) {
      console.log(error)
    }
  }

  const navigate = useNavigate()

  function handleSubmit(e: FormEvent) {
    e.preventDefault()

    if (input === '') return

    navigate(`/detail/${input}`)
  }

  function handleGetMore() {}
  return (
    <>
      <main className={styles.container}>
        <form action="" className={styles.form} onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Digite a moeda... Ex: bitcoins"
            value={input}
            onChange={(e) => setInput(e.target.value)}
          />

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
            {coins.length > 0 &&
              coins.map((item, index) => (
                <tr className={styles.tr} key={index}>
                  <td className={styles.tdLabel} data-label="Moeda">
                    <div className={styles.name}>
                      <img
                        src={`https://assets.coincap.io/assets/icons/${item.symbol.toLowerCase()}2@2x.png`}
                        alt="Logo Cript"
                        className={styles.logo}
                      />
                      <Link
                        to={`/detail/${item.id}`}
                        target="_blank"
                        className={styles.linkCoins}
                        rel="noopener noreferrer"
                      >
                        <span> {item.name}</span> | {item.symbol}
                      </Link>{' '}
                    </div>
                  </td>

                  <td className={styles.tdLabel} data-label="Valor mercado">
                    {item.formatedMarket}
                  </td>

                  <td className={styles.tdLabel} data-label="Preço">
                    {item.formatedPrice}
                  </td>

                  <td className={styles.tdLabel} data-label="Volume">
                    {item.formateVolume}
                  </td>

                  <td
                    className={
                      Number(item.changePercent24Hr) > 0
                        ? styles.tdProfit
                        : styles.tdLoss
                    }
                    data-label="Mudança 24h"
                  >
                    <span>{Number(item.changePercent24Hr).toFixed(3)}</span>
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
        <button className={styles.btnMore} onClick={handleGetMore}>
          Carregar mais...
        </button>
      </main>
    </>
  )
}
