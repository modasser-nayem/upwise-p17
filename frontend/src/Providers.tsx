"use client";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import { store } from "./redux/store";

import { persistStore } from "redux-persist";

const persister = persistStore(store);

export default function Providers({ children }: { children: React.ReactNode }) {
	return (
		<Provider store={store}>
			<PersistGate loading={null} persistor={persister}>
				{children}
			</PersistGate>
		</Provider>
	);
}
