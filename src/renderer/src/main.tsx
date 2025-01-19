import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import { MantineProvider } from "@mantine/core";
import { emotionTransform, MantineEmotionProvider } from '@mantine/emotion';
import { Notifications } from "@mantine/notifications";
import { ModalsProvider } from "@mantine/modals";
import { PersistGate } from 'redux-persist/integration/react';
import { SessionProvider } from './contexts/SessionContext';
import { Provider as ReduxProvider } from 'react-redux';
import { persistor, store } from './redux/store';
import theme from './components/layout/AppTheme';

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <MantineProvider stylesTransform={emotionTransform} theme={theme} defaultColorScheme="dark">
      <MantineEmotionProvider>
        <Notifications />
        <ModalsProvider>
          <ReduxProvider store={store}>
            <PersistGate loading={null} persistor={persistor}>
              <SessionProvider>
                {/* <DatabaseProvider> */}
                <App />
                {/* </DatabaseProvider> */}
              </SessionProvider>
            </PersistGate>
          </ReduxProvider>
        </ModalsProvider>
      </MantineEmotionProvider>
    </MantineProvider>
  </React.StrictMode>
)
