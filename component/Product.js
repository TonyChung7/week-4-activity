"use client";

import React, { useEffect, useMemo } from "react";

const STYLE_ID = "product-card-styles-v1";

function injectStylesOnce() {
  if (typeof document === "undefined") return;
  if (document.getElementById(STYLE_ID)) return;

  const style = document.createElement("style");
  style.id = STYLE_ID;
  style.textContent = `
    .productCard {
      width: 320px;
      height: 400px;
      background: #fff;
      border: 1px solid #e6e6e6;
      border-radius: 12px;
      overflow: hidden;
      box-shadow: 0 6px 16px rgba(0,0,0,0.08);
      font-family: system-ui, -apple-system, Segoe UI, Roboto, Arial, sans-serif;
      color: #111;
    }

    .productImageWrap {
      background: #fafafa;
      display: flex;
      justify-content: center;
      padding: 8px
    }

    .productImage {
      width: 220px;
      height: 220px;
      object-fit: contain;
      border-radius: 6px;
    }

    .productBody {
      padding: 12px;
    }

    .productBadge {
      display: inline-block;
      font-size: 12px;
      padding: 4px;
      border-radius: 999px;
      background: #fef3c7;
      color: #92400e;
      margin-bottom: 8px;
    }

    .productTitle {
      margin: 0;
      font-size: 20px;
      line-height: 1.25;
      font-weight: 700;
      color: #0f1111;
      display: -webkit-box;
      -webkit-line-clamp: 2;
      -webkit-box-orient: vertical;
      overflow: hidden;
    }

    .productTitle:hover {
      color: #c7511f;
      cursor: pointer;
    }

    .productByline {
      margin-top: 6px;
      font-size: 14px;
      color: #565959;
    }

    .productAuthor {
      color: #0f1111;
      font-weight: 600;
    }

    .productRatingRow {
      margin-top: 6px;
      display: flex;
      align-items: center;
      gap: 6px;
    }

    .pr-stars {
      color: #f59e0b;
      letter-spacing: 1px;
      font-size: 16px;
      line-height: 1;
    }

    .productReviews {
      color: #007185;
      font-size: 14px;
    }

    .productReviews:hover {
      text-decoration: underline;
      cursor: pointer;
    }

    .productFormat {
      margin-top: 8px;
      font-size: 14px;
      color: #007185;
      font-weight: 600;
    }

    .productPriceRow {
      margin-top: 10px;
      display: flex;
      align-items: flex-start;
      gap: 2px;
    }

    .productCurrency {
      font-size: 16px;
      line-height: 1;
      margin-top: 6px;
    }

    .productDollars {
      font-size: 34px;
      font-weight: 800;
      line-height: 1;
    }

    .productCents {
      font-size: 16px;
      font-weight: 700;
      line-height: 1;
      margin-top: 6px;
    }

    .productDelivery {
      margin-top: 10px;
      font-size: 14px;
      color: #0f1111;
    }

    .productArrive {
      margin-top: 4px;
      font-size: 14px;
      color: #007600;
      font-weight: 700;
    }
  `;
  document.head.appendChild(style);
}

function parsePrice(priceStr) {
  if (!priceStr) return { dollars: "", cents: "" };
  const cleaned = String(priceStr).replace(/[^0-9.]/g, "");
  const [d, c = ""] = cleaned.split(".");
  return {
    dollars: d || "",
    cents: (c + "00").slice(0, 2),
  };
}

function clamp(n, min, max) {
  return Math.max(min, Math.min(max, n));
}

function StarRating({ rating = 0, max = 5 }) {
  const safe = clamp(Number(rating) || 0, 0, max);
  const full = Math.floor(safe);
  const hasHalf = safe - full >= 0.5;
  const empty = max - full - (hasHalf ? 1 : 0);

  return (
    <span className="pr-stars" aria-label={`Rating ${safe} out of ${max}`}>
      {"★".repeat(full)}
      {hasHalf ? "☆" : ""}
      {"☆".repeat(empty)}
    </span>
  );
}

export default function Product({ product }) {
  useEffect(() => {
    injectStylesOnce();
  }, []);

  const { title, image, price, meta = {} } = product || {};
  const {
    author,
    rating,
    reviews,
    format,
    deliveryText,
    arriveText,
    badgeText,
  } = meta || {};

  const { dollars, cents } = useMemo(() => parsePrice(price), [price]);

  return (
    <article className="productCard" role="article">
      <div className="productImageWrap">
        <img
          className="productImage"
          src={image}
          alt={title || "Product image"}
          loading="lazy"
        />
      </div>

      <div className="productBody">
        {badgeText ? <div className="productBadge">{badgeText}</div> : null}

        <h3 className="productTitle" title={title}>
          {title}
        </h3>

        {author ? (
          <div className="productByline">
            by <span className="productAuthor">{author}</span>
          </div>
        ) : null}

        {rating || reviews ? (
          <div className="productRatingRow">
            {rating ? <StarRating rating={rating} /> : null}
            {reviews ? (
              <span className="productReviews">({reviews})</span>
            ) : null}
          </div>
        ) : null}

        {format ? <div className="productFormat">{format}</div> : null}

        {dollars ? (
          <div className="productPriceRow" aria-label={`Price ${price}`}>
            <span className="productCurrency">$</span>
            <span className="productDollars">{dollars}</span>
            <span className="productCents">{cents}</span>
          </div>
        ) : null}

        {deliveryText ? (
          <div className="productDelivery">{deliveryText}</div>
        ) : null}

        {arriveText ? <div className="productArrive">{arriveText}</div> : null}
      </div>
    </article>
  );
}
