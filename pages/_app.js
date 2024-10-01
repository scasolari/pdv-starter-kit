import "@/styles/globals.css";
import {SessionProvider} from "next-auth/react";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import { store, persistor } from "@/redux";

export default function App({ Component, pageProps }) {
  return <Provider store={store}>
    <SessionProvider>
      <PersistGate loading={null} persistor={persistor}>
    <Component {...pageProps} />
      </PersistGate>
  </SessionProvider>
  </Provider>;
}
