import { useEffect, useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import AdminLayout from "./AdminLayout";
import { FiPlus, FiEdit2, FiTrash2, FiX, FiUpload } from "react-icons/fi";

const EMPTY_FORM = {
  name: "",
  description: "",
  price: "",
  category: "crochet",
  subcategory: "bag",
  stock: "10",
  isFeatured: "false",
  tags: "",
  image: null,
};

const SUBCATS = {
  crochet: ["bag", "keychain", "scrunchie"],
  jewelry: ["earrings", "necklace", "bracelet", "ring"],
};

const PLACEHOLDER = "https://placehold.co/80x80/F7ECEC/C9848A?text=No+Img";

export default function ManageProducts() {
  const token = localStorage.getItem("kashaf_admin_token");
  const authHeaders = { headers: { Authorization: `Bearer ${token}` } };

  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [modalOpen, setModalOpen] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [form, setForm] = useState(EMPTY_FORM);
  const [imagePreview, setImagePreview] = useState(null);
  const [saving, setSaving] = useState(false);
  const [filterCat, setFilterCat] = useState("");

  const fetchProducts = async () => {
    setLoading(true);
    try {
      const url = filterCat ? `/api/products?category=${filterCat}` : "/api/products";
      const res = await axios.get(url);
      setProducts(res.data.products);
    } catch (err) {
      toast.error("Failed to load products");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { fetchProducts(); }, [filterCat]);

  const openAdd = () => {
    setForm(EMPTY_FORM);
    setImagePreview(null);
    setEditingId(null);
    setModalOpen(true);
  };

  const openEdit = (product) => {
    setForm({
      name: product.name,
      description: product.description,
      price: product.price.toString(),
      category: product.category,
      subcategory: product.subcategory,
      stock: product.stock.toString(),
      isFeatured: product.isFeatured.toString(),
      tags: product.tags?.join(", ") || "",
      image: null,
    });
    setImagePreview(
      product.image
        ? product.image.startsWith("http")
          ? product.image
          : `http://localhost:5000${product.image}`
        : null
    );
    setEditingId(product._id);
    setModalOpen(true);
  };

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === "image" && files[0]) {
      setForm((p) => ({ ...p, image: files[0] }));
      setImagePreview(URL.createObjectURL(files[0]));
    } else {
      setForm((p) => ({ ...p, [name]: value }));
      // Reset subcategory when category changes
      if (name === "category") {
        setForm((p) => ({ ...p, category: value, subcategory: SUBCATS[value][0] }));
      }
    }
  };

  const handleSave = async () => {
    if (!form.name || !form.description || !form.price || !form.subcategory) {
      toast.error("Please fill all required fields");
      return;
    }
    setSaving(true);
    try {
      const data = new FormData();
      Object.entries(form).forEach(([key, val]) => {
        if (key === "image" && val) data.append("image", val);
        else if (key !== "image") data.append(key, val);
      });

      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "multipart/form-data",
        },
      };

      if (editingId) {
        await axios.put(`/api/products/${editingId}`, data, config);
        toast.success("Product updated! ✅");
      } else {
        await axios.post("/api/products", data, config);
        toast.success("Product added! 🌸");
      }
      setModalOpen(false);
      fetchProducts();
    } catch (err) {
      toast.error(err.response?.data?.message || "Save failed");
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (id, name) => {
    if (!window.confirm(`Delete "${name}"? This cannot be undone.`)) return;
    try {
      await axios.delete(`/api/products/${id}`, authHeaders);
      toast.success("Product deleted");
      fetchProducts();
    } catch {
      toast.error("Delete failed");
    }
  };

  return (
    <AdminLayout>
      <div style={{ maxWidth: "1100px" }}>
        {/* Header Row */}
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "24px", flexWrap: "wrap", gap: "12px" }}>
          <div>
            <h1 style={{ fontSize: "1.5rem", marginBottom: "2px" }}>Products</h1>
            <p>{products.length} product{products.length !== 1 ? "s" : ""}</p>
          </div>
          <div style={{ display: "flex", gap: "12px", alignItems: "center" }}>
            {/* Category Filter */}
            <select
              value={filterCat}
              onChange={(e) => setFilterCat(e.target.value)}
              style={{ padding: "10px 14px", borderRadius: "10px", border: "1.5px solid var(--border)", fontFamily: "var(--font-body)", fontSize: "0.9rem", outline: "none", cursor: "pointer" }}
            >
              <option value="">All Categories</option>
              <option value="crochet">🧶 Crochet</option>
              <option value="jewelry">💎 Jewellery</option>
            </select>
            <button className="btn btn-primary" onClick={openAdd}>
              <FiPlus /> Add Product
            </button>
          </div>
        </div>

        {/* Products Table */}
        {loading ? (
          <div className="loader"><div className="spinner" /></div>
        ) : products.length === 0 ? (
          <div className="empty-state">
            <div className="empty-icon">📦</div>
            <h3>No products yet</h3>
            <p>Click "Add Product" to add your first product!</p>
          </div>
        ) : (
          <div style={{ background: "var(--white)", borderRadius: "16px", border: "1px solid var(--border)", overflow: "hidden" }}>
            <div style={{ overflowX: "auto" }}>
              <table style={{ width: "100%", borderCollapse: "collapse" }}>
                <thead>
                  <tr style={{ background: "#F8F4F0" }}>
                    {["Image", "Name", "Category", "Price", "Stock", "Featured", "Actions"].map((h) => (
                      <th key={h} style={{ padding: "12px 16px", textAlign: "left", fontSize: "0.78rem", fontWeight: 600, color: "var(--text-light)", textTransform: "uppercase", letterSpacing: "0.05em", whiteSpace: "nowrap" }}>
                        {h}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {products.map((p) => {
                    const imgSrc = p.image
                      ? p.image.startsWith("http") ? p.image : `http://localhost:5000${p.image}`
                      : PLACEHOLDER;
                    return (
                      <tr key={p._id} style={{ borderTop: "1px solid var(--border)" }}>
                        <td style={{ padding: "12px 16px" }}>
                          <img src={imgSrc} alt={p.name} onError={(e) => { e.target.src = PLACEHOLDER; }}
                            style={{ width: "52px", height: "52px", objectFit: "cover", borderRadius: "10px", background: "var(--rose-pale)" }} />
                        </td>
                        <td style={{ padding: "12px 16px" }}>
                          <p style={{ fontWeight: 600, color: "var(--dark)", fontSize: "0.9rem" }}>{p.name}</p>
                          <p style={{ fontSize: "0.75rem", textTransform: "capitalize" }}>{p.subcategory}</p>
                        </td>
                        <td style={{ padding: "12px 16px" }}>
                          <span className={`badge badge-${p.category === "crochet" ? "rose" : "gold"}`} style={{ textTransform: "capitalize" }}>
                            {p.category === "crochet" ? "🧶" : "💎"} {p.category}
                          </span>
                        </td>
                        <td style={{ padding: "12px 16px", fontWeight: 600, color: "var(--dark)", whiteSpace: "nowrap" }}>
                          Rs. {p.price.toLocaleString()}
                        </td>
                        <td style={{ padding: "12px 16px" }}>
                          <span style={{ fontWeight: 600, color: p.stock === 0 ? "#E53935" : p.stock < 5 ? "#E65100" : "#2E7D32" }}>
                            {p.stock === 0 ? "Out of Stock" : p.stock}
                          </span>
                        </td>
                        <td style={{ padding: "12px 16px" }}>
                          <span style={{ fontSize: "1.1rem" }}>{p.isFeatured ? "⭐" : "—"}</span>
                        </td>
                        <td style={{ padding: "12px 16px" }}>
                          <div style={{ display: "flex", gap: "8px" }}>
                            <button onClick={() => openEdit(p)}
                              style={{ background: "var(--cream)", border: "none", borderRadius: "8px", padding: "8px", cursor: "pointer", color: "var(--dark)", display: "flex", transition: "var(--transition)" }}
                              onMouseEnter={(e) => e.currentTarget.style.background = "var(--rose-pale)"}
                              onMouseLeave={(e) => e.currentTarget.style.background = "var(--cream)"}
                            >
                              <FiEdit2 />
                            </button>
                            <button onClick={() => handleDelete(p._id, p.name)}
                              style={{ background: "#FFEBEE", border: "none", borderRadius: "8px", padding: "8px", cursor: "pointer", color: "#C62828", display: "flex", transition: "var(--transition)" }}
                              onMouseEnter={(e) => e.currentTarget.style.background = "#FFCDD2"}
                              onMouseLeave={(e) => e.currentTarget.style.background = "#FFEBEE"}
                            >
                              <FiTrash2 />
                            </button>
                          </div>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>

      {/* ── ADD / EDIT MODAL ──────────────────────────────────── */}
      {modalOpen && (
        <div
          style={{ position: "fixed", inset: 0, background: "rgba(61,32,32,0.5)", zIndex: 1000, display: "flex", alignItems: "center", justifyContent: "center", padding: "20px" }}
          onClick={(e) => { if (e.target === e.currentTarget) setModalOpen(false); }}
        >
          <div
            style={{ background: "var(--white)", borderRadius: "20px", padding: "32px", width: "100%", maxWidth: "560px", maxHeight: "90vh", overflowY: "auto", animation: "fadeUp 0.25s ease" }}
          >
            {/* Modal Header */}
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "24px" }}>
              <h3 style={{ fontFamily: "var(--font-display)", fontSize: "1.3rem" }}>
                {editingId ? "Edit Product" : "Add New Product"}
              </h3>
              <button onClick={() => setModalOpen(false)}
                style={{ background: "none", border: "none", cursor: "pointer", fontSize: "1.2rem", color: "var(--text-light)" }}>
                <FiX />
              </button>
            </div>

            {/* Image Upload */}
            <div style={{ marginBottom: "20px" }}>
              <label style={{ fontSize: "0.85rem", fontWeight: 600, color: "var(--dark)", display: "block", marginBottom: "8px" }}>
                Product Image
              </label>
              <label
                style={{ display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: "8px", padding: "20px", border: "2px dashed var(--border)", borderRadius: "12px", cursor: "pointer", background: "var(--cream)", transition: "var(--transition)" }}
                onMouseEnter={(e) => e.currentTarget.style.borderColor = "var(--rose)"}
                onMouseLeave={(e) => e.currentTarget.style.borderColor = "var(--border)"}
              >
                {imagePreview ? (
                  <img src={imagePreview} alt="Preview" style={{ width: "100px", height: "100px", objectFit: "cover", borderRadius: "10px" }} />
                ) : (
                  <>
                    <FiUpload style={{ fontSize: "1.5rem", color: "var(--rose)" }} />
                    <span style={{ fontSize: "0.85rem", color: "var(--text-light)" }}>Click to upload image (JPG, PNG, WEBP · max 5MB)</span>
                  </>
                )}
                <input type="file" name="image" accept="image/*" onChange={handleChange} style={{ display: "none" }} />
              </label>
            </div>

            {/* Form Fields */}
            <div className="form-group">
              <label>Product Name *</label>
              <input name="name" value={form.name} onChange={handleChange} placeholder="e.g. Dusty Rose Crochet Bag" />
            </div>

            <div className="form-group">
              <label>Description *</label>
              <textarea name="description" value={form.description} onChange={handleChange} placeholder="Describe the product..." />
            </div>

            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "16px" }}>
              <div className="form-group">
                <label>Category *</label>
                <select name="category" value={form.category} onChange={handleChange}>
                  <option value="crochet">🧶 Crochet</option>
                  <option value="jewelry">💎 Jewellery</option>
                </select>
              </div>
              <div className="form-group">
                <label>Subcategory *</label>
                <select name="subcategory" value={form.subcategory} onChange={handleChange}>
                  {SUBCATS[form.category].map((s) => (
                    <option key={s} value={s} style={{ textTransform: "capitalize" }}>{s}</option>
                  ))}
                </select>
              </div>
            </div>

            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "16px" }}>
              <div className="form-group">
                <label>Price (Rs.) *</label>
                <input name="price" value={form.price} onChange={handleChange} placeholder="e.g. 850" type="number" min="0" />
              </div>
              <div className="form-group">
                <label>Stock Quantity *</label>
                <input name="stock" value={form.stock} onChange={handleChange} placeholder="e.g. 10" type="number" min="0" />
              </div>
            </div>

            <div className="form-group">
              <label>Tags <span style={{ fontWeight: 400, color: "var(--text-light)" }}>(comma separated)</span></label>
              <input name="tags" value={form.tags} onChange={handleChange} placeholder="e.g. handmade, gift, aesthetic" />
            </div>

            <div className="form-group">
              <label>Featured on Homepage?</label>
              <select name="isFeatured" value={form.isFeatured} onChange={handleChange}>
                <option value="false">No</option>
                <option value="true">⭐ Yes — Show on Homepage</option>
              </select>
            </div>

            {/* Buttons */}
            <div style={{ display: "flex", gap: "12px", marginTop: "8px" }}>
              <button onClick={() => setModalOpen(false)} className="btn btn-outline" style={{ flex: 1, justifyContent: "center" }}>
                Cancel
              </button>
              <button onClick={handleSave} disabled={saving} className="btn btn-primary" style={{ flex: 1, justifyContent: "center" }}>
                {saving ? "Saving..." : editingId ? "Save Changes" : "Add Product"}
              </button>
            </div>
          </div>
        </div>
      )}
    </AdminLayout>
  );
}
