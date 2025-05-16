import React, { useState, useContext, useEffect } from "react";
import { useShips } from "../../contexts/ShipsContext";

import { useNavigate, useParams } from "react-router-dom";

const ShipForm = () => {
  const { ships, addShip, updateShip } = useShips();
  const navigate = useNavigate();
  const { id } = useParams();

  const isEdit = Boolean(id);
  const existing = ships.find((s) => s.id === id);

  const [form, setForm] = useState({
    name: "",
    imo: "",
    flag: "",
    status: "Active",
  });

  useEffect(() => {
    if (existing) setForm(existing);
  }, [existing]);

  const handleSubmit = (e) => {
    e.preventDefault();

    // Validation
    if (!form.name || !form.imo || !form.flag) {
      alert("Please fill in all required fields.");
      return;
    }

    if (!/^\d+$/.test(form.imo)) {
      alert("IMO Number must be numeric.");
      return;
    }

    if (isEdit) {
      updateShip(id, form); // Pass id and form as separate arguments
    } else {
      addShip({ ...form, id: `s${Date.now()}` });
    }
    navigate("/ships");
  };

  return (
    <form onSubmit={handleSubmit} className="p-4">
      {/* <h2>{isEdit ? "Edit Ship" : "Add Ship"}</h2> */}
      <input
        value={form.name}
        onChange={(e) => setForm({ ...form, name: e.target.value })}
        placeholder="Name"
        required
      />
      <input
        value={form.imo}
        onChange={(e) => setForm({ ...form, imo: e.target.value })}
        placeholder="IMO Number"
        required
      />
      <input
        value={form.flag}
        onChange={(e) => setForm({ ...form, flag: e.target.value })}
        placeholder="Flag"
        required
      />
      <select
        value={form.status}
        onChange={(e) => setForm({ ...form, status: e.target.value })}
      >
        <option value="Active">Active</option>
        <option value="Under Maintenance">Under Maintenance</option>
      </select>
      <button type="submit">Save</button>
    </form>
  );
};

export default ShipForm;
