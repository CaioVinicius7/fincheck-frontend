import { Routes, Route, BrowserRouter } from "react-router-dom";

import { AuthGuard } from "./AuthGuard";

export function Router() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<AuthGuard isPrivate={false} />}>
          <Route path="/login" element={<h2>Login</h2>} />
          <Route path="/register" element={<h2>Register</h2>} />
        </Route>

        <Route element={<AuthGuard isPrivate />}>
          <Route path="/" element={<h2>Dashboard</h2>} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
