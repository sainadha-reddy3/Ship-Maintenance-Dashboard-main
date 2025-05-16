// src/components/Components/ComponentList.jsx
import React, { useContext, useState } from "react";
import { useShips } from "../../contexts/ShipsContext";

const ComponentList = ({ shipId }) => {
  const {
    ships,
    addComponentToShip,
    editComponentInShip,
    deleteComponentFromShip,
  } = useShips();

  const ship = ships.find((s) => s.id === shipId);
  const [formData, setFormData] = useState({
    name: "",
    serialNumber: "",
    installDate: "",
    lastMaintenanceDate: "",
  });
  const [editId, setEditId] = useState(null);

  if (!ship) return <p>Ship not found.</p>;

  const handleSubmit = (e) => {
    e.preventDefault();
    const componentData = {
      ...formData,
      id: editId || Date.now().toString(),
    };

    if (editId) {
      editComponentInShip(shipId, editId, formData);
    } else {
      addComponentToShip(shipId, componentData);
    }

    setFormData({
      name: "",
      serialNumber: "",
      installDate: "",
      lastMaintenanceDate: "",
    });
    setEditId(null);
  };

  const handleEdit = (component) => {
    setEditId(component.id);
    setFormData({
      name: component.name,
      serialNumber: component.serialNumber,
      installDate: component.installDate,
      lastMaintenanceDate: component.lastMaintenanceDate,
    });
  };

  return (
    <div className="p-4 border rounded">
      <h2 className="text-xl font-semibold mb-2">Components for {ship.name}</h2>
      <form onSubmit={handleSubmit} className="mb-4 space-y-2">
        <input
          type="text"
          placeholder="Component Name"
          value={formData.name}
          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
          required
        />
        <input
          type="text"
          placeholder="Serial Number"
          value={formData.serialNumber}
          onChange={(e) => setFormData({ ...formData, serialNumber: e.target.value })}
          required
        />
        <input
          type="date"
          value={formData.installDate}
          onChange={(e) => setFormData({ ...formData, installDate: e.target.value })}
          required
        />
        <input
          type="date"
          value={formData.lastMaintenanceDate}
          onChange={(e) =>
            setFormData({ ...formData, lastMaintenanceDate: e.target.value })
          }
          required
        />
        <button type="submit" className="bg-blue-500 text-white px-4 py-1 mx-3 rounded cursor-pointer">
          {editId ? "Update" : "Add"} Component
        </button>
      </form>

      <ul className="space-y-2">
        {(ship.components || []).map((comp) => (
          <li key={comp.id} className="border p-2 rounded shadow-sm">
            <p><strong>{comp.name}</strong> (SN: {comp.serialNumber})</p>
            <p>Installed: {comp.installDate}</p>
            <p>Last Maintained: {comp.lastMaintenanceDate}</p>
            <div className="space-x-2 mt-1">
              <button
                onClick={() => handleEdit(comp)}
                className="text-sm text-blue-600 underline cursor-pointer"
              >
                Edit
              </button>
              <button
                onClick={() => deleteComponentFromShip(shipId, comp.id)}
                className="text-sm text-red-600 underline cursor-pointer"
              >
                Delete
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ComponentList;
