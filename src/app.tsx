import { Provider } from 'react-redux'
import { Footer } from '@/components/footer'
import { ErrorBoundary } from '@/components/error-boundary'
import { HomePage } from '@/pages/home-page/home-page'

import { store } from '@/store'

import '@/styles/global.scss'
import styles from './app.module.scss'

export const App = () => {
  return (
    <ErrorBoundary>
      <Provider store={store}>
        <div className={styles.root}>
          <main className={styles.main}>
            <HomePage />
          </main>
          <Footer />
        </div>
      </Provider>
    </ErrorBoundary>
  )
}
