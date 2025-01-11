import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import { MantineProvider } from "@mantine/core";
import { emotionTransform, MantineEmotionProvider } from '@mantine/emotion';
import { Notifications } from "@mantine/notifications";
import { ModalsProvider } from "@mantine/modals";
import { DatabaseProvider } from '@/contexts/DataBaseContext';

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <MantineProvider stylesTransform={emotionTransform}>
      <MantineEmotionProvider>
        <Notifications />
        <ModalsProvider>
          {/* <DatabaseProvider> */}
            <App />
          {/* </DatabaseProvider> */}
        </ModalsProvider>
      </MantineEmotionProvider>
    </MantineProvider>
  </React.StrictMode>
)
