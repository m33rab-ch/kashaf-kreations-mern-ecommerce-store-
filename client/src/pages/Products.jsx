import { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import axios from "axios";
import ProductCard from "../components/ProductCard";
import { FiSearch, FiFilter, FiX } from "react-icons/fi";

const CATEGORIES = [
  { value: "", label: "All Products" },
  { value: "crochet", label: "🧶 Crochet" },
  { value: "jewelry", label: "💎 Jewellery" },
];

const SUBCATEGORIES = {
  crochet: ["bag", "keychain", "scrunchie"],
  jewelry: ["earrings", "necklace", "bracelet", "ring"],
};

const PRICE_RANGES = [
  { label: "All Prices", min: "", max: "" },
  { label: "Under Rs. 500", min: "", max: 500 },
  { label: "Rs. 500 – 1000", min: 500, max: 1000 },
  { label: "Rs. 1000 – 1500", min: 1000, max: 1500 },
  { label: "Above Rs. 1500", min: 1500, max: "" },
];

export default function Products() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");

  // Active filters
  const [activeCategory, setActiveCategory] = useState(searchParams.get("category") || "");
  const [activeSubcat, setActiveSubcat] = useState("");
  const [activePriceIdx, setActivePriceIdx] = useState(0);

  const fetchProducts = async () => {
    setLoading(true);
    try {
      const params = new URLSearchParams();
      if (activeCategory) params.append("category", activeCategory);
      if (activeSubcat) params.append("subcategory", activeSubcat);
      const range = PRICE_RANGES[activePriceIdx];
      if (range.min !== "") params.append("minPrice", range.min);
      if (range.max !== "") params.append("maxPrice", range.max);

      const res = await axios.get(`/api/products?${params}`);
      let data = res.data.products;

      // Client-side search filter
      if (search.trim()) {
        const q = search.toLowerCase();
        data = data.filter(
          (p) =>
            p.name.toLowerCase().includes(q) ||
            p.description.toLowerCase().includes(q) ||
            p.subcategory.toLowerCase().includes(q)
        );
      }

      setProducts(data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { fetchProducts(); }, [activeCategory, activeSubcat, activePriceIdx]);

  // Debounced search
  useEffect(() => {
    const timer = setTimeout(fetchProducts, 350);
    return () => clearTimeout(timer);
  }, [search]);

  const resetFilters = () => {
    setActiveCategory("");
    setActiveSubcat("");
    setActivePriceIdx(0);
    setSearch("");
  };

  const hasFilters = activeCategory || activeSubcat || activePriceIdx > 0 || search;

  return (
    <div>
      {/* Page Hero */}
      <div className="page-hero">
        <h1>Our Shop</h1>
        <div className="divider" />
        <p>Handmade crochet & artificial jewellery, crafted with love 🌸</p>
      </div>

      <div className="container section">
        <div style={{ display: "grid", gridTemplateColumns: "240px 1fr", gap: "32px" }}>

          {/* ── SIDEBAR FILTERS ─────────────────────────────────── */}
          <aside>
            <div
              style={{
                background: "var(--white)",
                borderRadius: "16px",
                padding: "24px",
                border: "1px solid var(--border)",
                position: "sticky",
                top: "calc(var(--nav-height) + 16px)",
              }}
            >
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "20px" }}>
                <h3 style={{ fontSize: "1rem", display: "flex", alignItems: "center", gap: "6px" }}>
                  <FiFilter style={{ color: "var(--rose)" }} /> Filters
                </h3>
                {hasFilters && (
                  <button
                    onClick={resetFilters}
                    style={{ background: "none", border: "none", cursor: "pointer", color: "var(--rose)", fontSize: "0.8rem", display: "flex", alignItems: "center", gap: "4px" }}
                  >
                    <FiX /> Clear
                  </button>
                )}
              </div>

              {/* Search */}
              <div style={{ marginBottom: "24px" }}>
                <label style={{ fontSize: "0.8rem", fontWeight: 600, color: "var(--dark)", display: "block", marginBottom: "8px" }}>
                  Search
                </label>
                <div style={{ position: "relative" }}>
                  <FiSearch style={{ position: "absolute", left: "12px", top: "50%", transform: "translateY(-50%)", color: "var(--text-light)" }} />
                  <input
                    type="text"
                    placeholder="Search products..."
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    style={{
                      width: "100%",
                      padding: "10px 12px 10px 36px",
                      border: "1.5px solid var(--border)",
                      borderRadius: "10px",
                      fontSize: "0.85rem",
                      outline: "none",
                      fontFamily: "var(--font-body)",
                    }}
                  />
                </div>
              </div>

              {/* Category Filter */}
              <div style={{ marginBottom: "24px" }}>
                <label style={{ fontSize: "0.8rem", fontWeight: 600, color: "var(--dark)", display: "block", marginBottom: "10px" }}>
                  Category
                </label>
                {CATEGORIES.map((cat) => (
                  <button
                    key={cat.value}
                    onClick={() => { setActiveCategory(cat.value); setActiveSubcat(""); }}
                    style={{
                      display: "block",
                      width: "100%",
                      textAlign: "left",
                      padding: "10px 14px",
                      borderRadius: "10px",
                      border: "none",
                      cursor: "pointer",
                      marginBottom: "4px",
                      fontFamily: "var(--font-body)",
                      fontSize: "0.9rem",
                      background: activeCategory === cat.value ? "var(--rose-pale)" : "transparent",
                      color: activeCategory === cat.value ? "var(--rose)" : "var(--text)",
                      fontWeight: activeCategory === cat.value ? 600 : 400,
                      transition: "var(--transition)",
                    }}
                  >
                    {cat.label}
                  </button>
                ))}
              </div>

              {/* Subcategory Filter */}
              {activeCategory && SUBCATEGORIES[activeCategory] && (
                <div style={{ marginBottom: "24px" }}>
                  <label style={{ fontSize: "0.8rem", fontWeight: 600, color: "var(--dark)", display: "block", marginBottom: "10px", textTransform: "capitalize" }}>
                    {activeCategory} Type
                  </label>
                  <button
                    onClick={() => setActiveSubcat("")}
                    style={{
                      display: "block", width: "100%", textAlign: "left",
                      padding: "8px 14px", borderRadius: "8px", border: "none", cursor: "pointer",
                      marginBottom: "4px", fontFamily: "var(--font-body)", fontSize: "0.85rem",
                      background: activeSubcat === "" ? "var(--rose-pale)" : "transparent",
                      color: activeSubcat === "" ? "var(--rose)" : "var(--text)",
                    }}
                  >
                    All
                  </button>
                  {SUBCATEGORIES[activeCategory].map((sub) => (
                    <button
                      key={sub}
                      onClick={() => setActiveSubcat(sub)}
                      style={{
                        display: "block", width: "100%", textAlign: "left",
                        padding: "8px 14px", borderRadius: "8px", border: "none", cursor: "pointer",
                        marginBottom: "4px", fontFamily: "var(--font-body)", fontSize: "0.85rem",
                        textTransform: "capitalize",
                        background: activeSubcat === sub ? "var(--rose-pale)" : "transparent",
                        color: activeSubcat === sub ? "var(--rose)" : "var(--text)",
                      }}
                    >
                      {sub}
                    </button>
                  ))}
                </div>
              )}

              {/* Price Filter */}
              <div>
                <label style={{ fontSize: "0.8rem", fontWeight: 600, color: "var(--dark)", display: "block", marginBottom: "10px" }}>
                  Price Range
                </label>
                {PRICE_RANGES.map((range, i) => (
                  <button
                    key={i}
                    onClick={() => setActivePriceIdx(i)}
                    style={{
                      display: "block", width: "100%", textAlign: "left",
                      padding: "8px 14px", borderRadius: "8px", border: "none", cursor: "pointer",
                      marginBottom: "4px", fontFamily: "var(--font-body)", fontSize: "0.85rem",
                      background: activePriceIdx === i ? "var(--rose-pale)" : "transparent",
                      color: activePriceIdx === i ? "var(--rose)" : "var(--text)",
                      fontWeight: activePriceIdx === i ? 600 : 400,
                    }}
                  >
                    {range.label}
                  </button>
                ))}
              </div>
            </div>
          </aside>

          {/* ── PRODUCTS GRID ────────────────────────────────────── */}
          <div>
            {/* Results count */}
            <div style={{ marginBottom: "20px", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
              <p style={{ fontSize: "0.9rem" }}>
                {loading ? "Loading..." : `${products.length} product${products.length !== 1 ? "s" : ""} found`}
              </p>
            </div>

            {loading ? (
              <div className="loader"><div className="spinner" /></div>
            ) : products.length === 0 ? (
              <div className="empty-state">
                <div className="empty-icon">🔍</div>
                <h3>No products found</h3>
                <p>Try adjusting your filters</p>
                <button className="btn btn-outline" onClick={resetFilters} style={{ marginTop: "16px" }}>
                  Reset Filters
                </button>
              </div>
            ) : (
              <div className="grid-4">
                {products.map((p) => <ProductCard key={p._id} product={p} />)}
              </div>
            )}
          </div>
        </div>
      </div>

      <style>{`
        @media (max-width: 768px) {
          .container > div { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </div>
  );
}
