import { RouterProvider } from "react-router-dom";
import { Provider } from "react-redux";
import { router } from "./router";
import store from "./store/store";

export function App(): JSX.Element {
  return (
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
  )
}