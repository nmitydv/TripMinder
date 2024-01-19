import React from 'react';
import ReactDOM from 'react-dom/client';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'rsuite/dist/rsuite.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import './index.css';   
import App from './App.tsx';
<>
    <script src="https://code.jquery.com/jquery-3.6.0.min.js"></script>
    <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.5.0/dist/js/bootstrap.bundle.min.js"></script>
</>;
import { store } from './redux/store.tsx';
import { Provider } from 'react-redux';
import { FirebaseProvider } from './context/Firebase/Firebase.tsx';
import './context/Firebase/Firebase.tsx';

import global_en from './translations/en/global.json';
import global_hi from './translations/hi/global.json';
import i18next from 'i18next';
import { I18nextProvider } from 'react-i18next';

i18next.init({
    interpolation: { escapeValue: false },
    lng: localStorage.getItem('language') || 'en',
    resources: {
        en: {
            global: global_en,
        },
        hi: {
            global: global_hi,
        },
    },
});

ReactDOM.createRoot(document.getElementById('root')!).render(
    // <React.StrictMode>
        <Provider store={store}>
            <I18nextProvider i18n={i18next}>
                <FirebaseProvider>
                    <App />
                </FirebaseProvider>
            </I18nextProvider>
        </Provider>
    // </React.StrictMode>
);
