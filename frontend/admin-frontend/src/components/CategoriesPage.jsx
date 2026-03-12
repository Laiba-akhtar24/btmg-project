import React, { useEffect, useState } from "react"; 
import axios from "axios";
import "./CategoriesPage.css";

const CategoriesPage = () => {
  const [categories, setCategories] = useState([]);
  const [name, setName] = useState("");
  const [order, setOrder] = useState("");
  const [slug, setSlug] = useState("");
  const [editingCategoryId, setEditingCategoryId] = useState(null);

  // ================= FETCH CATEGORIES =================
  const fetchCategories = async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/categories");
      setCategories(res.data);
    } catch (err) {
      console.error("Failed to fetch categories:", err);
    }
  };

  // ================= ADD / UPDATE CATEGORY =================
  const handleAddCategory = async (e) => {
    e.preventDefault();

    const trimmedName = name.trim();
    const trimmedSlug = slug.trim();
    const numericOrder = Number(order);

    if (!trimmedName || !trimmedSlug) {
      alert("Name and Slug are required");
      return;
    }

    try {
      if (editingCategoryId) {
        // UPDATE existing category
        await axios.put(
          `http://localhost:5000/api/categories/${editingCategoryId}`,
          {
            name: trimmedName,
            order: numericOrder,
            slug: trimmedSlug
          }
        );
        setEditingCategoryId(null); // exit edit mode
      } else {
        // ADD new category
        await axios.post("http://localhost:5000/api/categories", {
          name: trimmedName,
          order: numericOrder,
          slug: trimmedSlug
        });
      }

      // Reset form
      setName("");
      setOrder("");
      setSlug("");

      // Refresh category list
      fetchCategories();

    } catch (err) {
      console.error("Add/Update category error:", err.response?.data || err);
      alert(err.response?.data?.message || "Server error");
    }
  };

  // ================= DELETE CATEGORY =================
  const deleteCategory = async (id) => {
    if (!window.confirm("Are you sure you want to delete this category?")) return;

    try {
      await axios.delete(`http://localhost:5000/api/categories/${id}`);
      fetchCategories();
    } catch (err) {
      console.error("Delete category error:", err.response?.data || err);
      alert(err.response?.data?.message || "Server error");
    }
  };

  // ================= POPULATE FORM FOR EDIT =================
  const handleEditCategory = (cat) => {
    setEditingCategoryId(cat._id);
    setName(cat.name);
    setOrder(cat.order);
    setSlug(cat.slug);
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  return (
    <div className="categories-page">
      <h2>Training Categories</h2>

      {/* ADD / EDIT CATEGORY FORM */}
      <form className="add-category-form" onSubmit={handleAddCategory}>
        <input
          type="text"
          placeholder="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
        <input
          type="number"
          placeholder="Order"
          value={order}
          onChange={(e) => setOrder(e.target.value)}
          min="0"
          required
        />
        <input
          type="text"
          placeholder="Slug"
          value={slug}
          onChange={(e) => setSlug(e.target.value)}
          required
        />
        <button type="submit">
          {editingCategoryId ? "Update Category" : "Add Category"}
        </button>
        {editingCategoryId && (
          <button
            type="button"
            onClick={() => {
              setEditingCategoryId(null);
              setName("");
              setOrder("");
              setSlug("");
            }}
            style={{ marginLeft: "10px", background: "#f87171" }}
          >
            Cancel
          </button>
        )}
      </form>

      {/* CATEGORY TABLE */}
      <table className="categories-table">
        <thead>
          <tr>
            <th>Name</th>
            <th>Order</th>
            <th>Slug</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {categories.map((cat) => (
            <tr key={cat._id}>
              <td>{cat.name}</td>
              <td>{cat.order}</td>
              <td>{cat.slug}</td>
              <td>
                <button className="edit-btn" onClick={() => handleEditCategory(cat)}>Edit</button>
                <button
                  className="delete-btn"
                  onClick={() => deleteCategory(cat._id)}
                  style={{ marginLeft: "8px" }}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default CategoriesPage;     