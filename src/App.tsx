import { Suspense, lazy } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

import './assets/css/App.css';

import Header from './components/Header/Header';
import Footer from './components/Footer/Footer';

const Home = lazy(() => import('./pages/Home'));
const NotFound = lazy(() => import('./pages/NotFound'));

function App() {
  return (
    <Router>
      <div>
        {/* Header component */}
        <Header />

        {/* Wrap the main content in an Suspense */}
        <Suspense fallback={<div>Loading...</div>}>
          <Routes>

            {/* Route for the home page */}
            <Route path="/" element={<Home />} />

            {/* Fallback route for unmatched URLs */}
            <Route element={<NotFound />} />

          </Routes>
        </Suspense>

        {/* Footer component */}
        <Footer />
      </div>
    </Router>
  );
}

export default App;