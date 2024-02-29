import React from 'react';
import ReactDOM from 'react-dom/client';
import Catalog from './components/Catalog/Catalog';
import "slick-carousel/slick/slick.css"; 
import "slick-carousel/slick/slick-theme.css";

let blockId = 'root'
eval(`
  if (typeof CATALOG_PARAMS !== 'undefined' && CATALOG_PARAMS && "blockId" in CATALOG_PARAMS) blockId = CATALOG_PARAMS.blockId
`)

const root = ReactDOM.createRoot(document.getElementById(blockId));
root.render(
  <React.StrictMode>
    <Catalog />
  </React.StrictMode>
);
