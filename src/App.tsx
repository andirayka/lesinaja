import React, { FC } from "react";
import {
  BrowserRouter as Router,
  Redirect,
  Route,
  Switch,
} from "react-router-dom";
import { enableFirebaseConfig } from "@utils";
import AppProvider from "@context";

// Global setting for dayjs
import "dayjs/locale/id";
import dayjs from "dayjs";
// Buat dayjs agar bahasa indonesia dan gunakan plugin
dayjs.locale("id");

// Inisialisasi agar fitur firebase bisa digunakan
enableFirebaseConfig();

const App: FC = () => {
  return (
    <AppProvider>
      <Router>
        <div>ok</div>
      </Router>
    </AppProvider>
  );
};

export default App;
