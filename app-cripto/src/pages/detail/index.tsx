import { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'

import { AxiosDetail } from '../../services/Api'
import { CoinProps } from '../home'
import styles from './detail.module.css'

interface ResponseData {
  data: CoinProps
}

interface ErrorData {
  error: string
}

type DataProps = ResponseData | ErrorData

export default function Detail() {
  const { cripto } = useParams()
  const [detail, setDetail] = useState<CoinProps | undefined>(undefined)
  const [isLoading, setIsLoading] = useState(false)

  const navigate = useNavigate()

  useEffect(() => {
    getDetail(cripto!)
  }, [cripto])

  async function getDetail(cripto: string) {
    setIsLoading(true)
    try {
      const api = AxiosDetail(cripto)
      const response = await api.get<DataProps>('/')

      if ('data' in response.data) {
        // Verifica se o campo 'data' existe
        const coinsData = response.data.data

        // Processamento dos dados...

        const price = Intl.NumberFormat('en-US', {
          style: 'currency',
          currency: 'USD',
        })

        const priceCompact = Intl.NumberFormat('en-US', {
          style: 'currency',
          currency: 'USD',
          notation: 'compact',
        })
        const formatedResult = {
          ...coinsData,
          formatedPrice: price.format(Number(coinsData.priceUsd)),
          formatedMarket: priceCompact.format(Number(coinsData.marketCapUsd)),
          formatedVolume: priceCompact.format(Number(coinsData.volumeUsd24Hr)),
        }

        setDetail(formatedResult)
      } else {
        console.error('Erro na estrutura dos dados:', response.data)
      }
    } catch (error) {
      console.log(error)
      alert('Ops ocorreu um erro')
      navigate('/')
      setIsLoading(false)
    } finally {
    }
  }
  return (
    <>
      <div className={styles.container}>
        {isLoading && detail ? (
          <>
            <h1>{detail.name.toLocaleUpperCase()}</h1>
            <h2>{detail.symbol}</h2>

            <div className={styles.info}>
              <img
                src={`https://assets.coincap.io/assets/icons/${detail.symbol.toLowerCase()}2@2x.png`}
                alt="Logo Cript"
                className={styles.logo}
              />
              <h3>
                {detail.name} | {detail.symbol}
              </h3>

              <span>Preço: {detail.formatedPrice}</span>
              <span>Mercado: {detail.formatedMarket}</span>
              <span>Volume: {detail.formatedVolume}</span>
              <span>
                Mudança 24h:{' '}
                <span
                  className={
                    Number(detail.changePercent24Hr) > 0
                      ? styles.tdProfit
                      : styles.tdLoss
                  }
                >
                  {Number(detail.changePercent24Hr).toFixed(3)}{' '}
                </span>
              </span>
              <button className={styles.btnBack} onClick={() => navigate('/')}>
                Voltar
              </button>
            </div>
          </>
        ) : (
          <div className={styles.load}>
            <h2>Carregando...</h2>
          </div>
        )}
      </div>
    </>
  )
}
