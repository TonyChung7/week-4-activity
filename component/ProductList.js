"use client";

import React, { useEffect } from "react";
import Product from "./Product";

const LIST_STYLE_ID = "product-list-styles-6col-v1";

function injectListStylesOnce() {
  if (typeof document === "undefined") return;
  if (document.getElementById(LIST_STYLE_ID)) return;

  const style = document.createElement("style");
  style.id = LIST_STYLE_ID;
  style.textContent = `
    .productListWrap {
      width: 100%;
    }

    .productListHeader {
      display: flex;
      align-items: baseline;
      justify-content: space-between;
      gap: 12px;
      margin: 0 0 12px;
      font-family: system-ui, -apple-system, Segoe UI, Roboto, Arial, sans-serif;
      color: #0f1111;
    }

    .productListTitle {
      font-size: 20px;
      font-weight: 800;
      margin: 0;
    }

    .productListCount {
      font-size: 13px;
      color: #565959;
      margin: 0;
      white-space: nowrap;
    }

    .productGrid {
      display: grid;
      gap: 10px;
      align-items: start;
      grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
    }

    @media (min-width: 800px) {
      .productGrid {
        grid-template-columns: repeat(3, minmax(0, 1fr));
      }
    }

    @media (max-width: 1000px) {
      .productGrid {
        grid-template-columns: 1fr;
      }
    }

    .productGrid > * {
      justify-self: center;
    }
  `;
  document.head.appendChild(style);
}

export default function ProductList({
  products = [],
  title = "Valentine Picks",
  showCount = true,
}) {
  useEffect(() => {
    injectListStylesOnce();
  }, []);

  return (
    <section className="productListWrap">
      <div className="productListHeader">
        <h2 className="productListTitle">{title}</h2>
        {showCount ? (
          <p className="productListCount">{products.length} items</p>
        ) : null}
      </div>

      <div className="productGrid">
        {products.map((p) => (
          <Product key={p.asin || p.id} product={p} />
        ))}
      </div>
    </section>
  );
}
