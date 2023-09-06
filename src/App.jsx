import React from 'react';
import Routes from './Routes'; // Routes.jsx dosyasını içe aktarın
import './styles/main.scss'; // Global stil dosyalarını içe aktarabilirsiniz

function App() {
  return (
    <div className="App">
      {/* Diğer bileşenleri veya yapılandırmaları burada ekleyebilirsiniz */}
      <Routes /> {/* Routes bileşenini uygulama içinde kullanın */}
    </div>
  );
}

export default App;
