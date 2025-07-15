import React from "react";
import { COLUMN_COLORS } from "../constants";
import "./CategoryGrid.css";

const WIKI_BASE = "/wiki";

export default function CategoryGrid({ tree }) {
  return (
    <div className="grid-container">
      {Object.entries(tree).map(([mainCat, midMap], idx) => {
        const color = COLUMN_COLORS[idx % COLUMN_COLORS.length];
        // 대분류 → /wiki/home/:mainCat
        const mainPath = `${WIKI_BASE}/home/${mainCat}`;

        return (
          <div
            className="column"
            key={mainCat}
            style={{ "--col-color": color }}
          >
            <h2 className="main-title">
              <a href={mainPath} className="main-link">
                {mainCat.replace(/_/g, " ")}
              </a>
            </h2>

            <div className="content">
              {/* 대→소 분류 (_default) */}
              {midMap._default && midMap._default.length > 0 && (
                <ul className="sub-list">
                  {midMap._default.map(({ subTitle, subPath }) => (
                    <li key={subPath}>
                      <a
                        href={`${WIKI_BASE}/${subPath}`}
                        className="sub-link"
                      >
                        {subTitle.replace(/_/g, " ")}
                      </a>
                    </li>
                  ))}
                </ul>
              )}

              {/* 중분류 → 소분류 */}
              {Object.entries(midMap)
                .filter(([mid]) => mid !== "_default")
                .map(([midCat, subs]) => {
                  // 중분류 → /wiki/home/:mainCat/:midCat
                  const midPath = `${WIKI_BASE}/home/${mainCat}/${midCat}`;
                  return (
                    <div className="mid-block" key={midCat}>
                      <h3 className="mid-title">
                        <a href={midPath} className="mid-link">
                          {midCat.replace(/_/g, " ")}
                        </a>
                      </h3>
                      <ul className="sub-list">
                        {subs.map(({ subTitle, subPath }) => (
                          <li key={subPath}>
                            <a
                              href={`${WIKI_BASE}/${subPath}`}
                              className="sub-link"
                            >
                              {subTitle.replace(/_/g, " ")}
                            </a>
                          </li>
                        ))}
                      </ul>
                    </div>
                  );
                })}
            </div>
          </div>
        );
      })}
    </div>
  );
}