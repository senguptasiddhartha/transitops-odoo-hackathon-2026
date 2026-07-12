import { useMemo, useState } from "react";

type VehicleStatus = "Available" | "On Trip" | "In Shop" | "Retired";

type Vehicle = {
  id: number;
  registrationNumber: string;
  model: string;
  type: string;
  capacity: number;
  odometer: number;
  acquisitionCost: number;
  status: VehicleStatus;
};

type VehicleFormData = {
  registrationNumber: string;
  model: string;
  type: string;
  capacity: string;
  odometer: string;
  acquisitionCost: string;
  status: VehicleStatus;
};

const initialVehicles: Vehicle[] = [
  {
    id: 1,
    registrationNumber: "GJ01AB4523",
    model: "VAN-05",
    type: "Van",
    capacity: 500,
    odometer: 74000,
    acquisitionCost: 620000,
    status: "Available",
  },
  {
    id: 2,
    registrationNumber: "GJ01AB4918",
    model: "TRUCK-11",
    type: "Truck",
    capacity: 5000,
    odometer: 182000,
    acquisitionCost: 2450000,
    status: "On Trip",
  },
  {
    id: 3,
    registrationNumber: "GJ01AB1120",
    model: "MINI-02",
    type: "Mini",
    capacity: 1000,
    odometer: 66000,
    acquisitionCost: 410000,
    status: "In Shop",
  },
  {
    id: 4,
    registrationNumber: "GJ01AB1001",
    model: "VAN-09",
    type: "Van",
    capacity: 750,
    odometer: 241000,
    acquisitionCost: 540000,
    status: "Retired",
  },
];

const emptyForm: VehicleFormData = {
  registrationNumber: "",
  model: "",
  type: "Van",
  capacity: "",
  odometer: "",
  acquisitionCost: "",
  status: "Available",
};

function Vehicles() {
  const [vehicles, setVehicles] = useState<Vehicle[]>(initialVehicles);

  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");
  const [typeFilter, setTypeFilter] = useState("All");

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingId, setEditingId] = useState<number | null>(null);

  const [formData, setFormData] =
    useState<VehicleFormData>(emptyForm);

  const [error, setError] = useState("");

  const vehicleTypes = useMemo(() => {
    return Array.from(
      new Set(vehicles.map((vehicle) => vehicle.type))
    );
  }, [vehicles]);

  const filteredVehicles = useMemo(() => {
    const query = search.trim().toLowerCase();

    return vehicles.filter((vehicle) => {
      const matchesSearch =
        query === "" ||
        vehicle.registrationNumber
          .toLowerCase()
          .includes(query) ||
        vehicle.model.toLowerCase().includes(query);

      const matchesStatus =
        statusFilter === "All" ||
        vehicle.status === statusFilter;

      const matchesType =
        typeFilter === "All" ||
        vehicle.type === typeFilter;

      return matchesSearch && matchesStatus && matchesType;
    });
  }, [vehicles, search, statusFilter, typeFilter]);

  const openAddModal = () => {
    setEditingId(null);
    setFormData(emptyForm);
    setError("");
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setEditingId(null);
    setFormData(emptyForm);
    setError("");
    setIsModalOpen(false);
  };

  const handleChange = (
    event: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement
    >
  ) => {
    const { name, value } = event.target;

    setFormData((current) => ({
      ...current,
      [name]: value,
    }));
  };
    const handleSubmit = (
    event: React.FormEvent<HTMLFormElement>
  ) => {
    event.preventDefault();

    setError("");

    const registrationNumber =
      formData.registrationNumber.trim().toUpperCase();

    const duplicateRegistration = vehicles.some(
      (vehicle) =>
        vehicle.registrationNumber.toLowerCase() ===
          registrationNumber.toLowerCase() &&
        vehicle.id !== editingId
    );

    if (duplicateRegistration) {
      setError("Registration number already exists.");
      return;
    }

    if (
      !registrationNumber ||
      !formData.model.trim() ||
      !formData.type.trim()
    ) {
      setError("Please fill in all vehicle details.");
      return;
    }

    const capacity = Number(formData.capacity);
    const odometer = Number(formData.odometer);
    const acquisitionCost = Number(
      formData.acquisitionCost
    );

    if (
      Number.isNaN(capacity) ||
      Number.isNaN(odometer) ||
      Number.isNaN(acquisitionCost) ||
      capacity <= 0 ||
      odometer < 0 ||
      acquisitionCost < 0
    ) {
      setError(
        "Capacity, odometer and acquisition cost must be valid."
      );
      return;
    }

    const vehicleData: Vehicle = {
      id: editingId ?? Date.now(),
      registrationNumber,
      model: formData.model.trim(),
      type: formData.type.trim(),
      capacity,
      odometer,
      acquisitionCost,
      status: formData.status,
    };

    if (editingId !== null) {
      setVehicles((currentVehicles) =>
        currentVehicles.map((vehicle) =>
          vehicle.id === editingId
            ? vehicleData
            : vehicle
        )
      );
    } else {
      setVehicles((currentVehicles) => [
        ...currentVehicles,
        vehicleData,
      ]);
    }

    closeModal();
  };

  const handleEdit = (vehicle: Vehicle) => {
    setEditingId(vehicle.id);

    setFormData({
      registrationNumber: vehicle.registrationNumber,
      model: vehicle.model,
      type: vehicle.type,
      capacity: String(vehicle.capacity),
      odometer: String(vehicle.odometer),
      acquisitionCost: String(
        vehicle.acquisitionCost
      ),
      status: vehicle.status,
    });

    setError("");
    setIsModalOpen(true);
  };

  const handleDelete = (vehicle: Vehicle) => {
    if (
      vehicle.status === "On Trip" ||
      vehicle.status === "In Shop"
    ) {
      window.alert(
        "Vehicle cannot be deleted while active."
      );
      return;
    }

    if (
      window.confirm(
        `Delete ${vehicle.model} (${vehicle.registrationNumber})?`
      )
    ) {
      setVehicles((currentVehicles) =>
        currentVehicles.filter(
          (currentVehicle) =>
            currentVehicle.id !== vehicle.id
        )
      );
    }
  };

  const getStatusStyle = (
    status: VehicleStatus
  ): string => {
    switch (status) {
      case "Available":
        return "border border-emerald-500/30 bg-emerald-500/10 text-emerald-400";

      case "On Trip":
        return "border border-blue-500/30 bg-blue-500/10 text-blue-400";

      case "In Shop":
        return "border border-orange-500/30 bg-orange-500/10 text-orange-400";

      case "Retired":
        return "border border-red-500/30 bg-red-500/10 text-red-400";
    }
  };

  return (
    <div className="min-h-full">
      <section className="mb-6">
        <div className="flex flex-col gap-5 border-b border-slate-300 pb-5 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <div className="flex items-center gap-3">
              <h1 className="text-3xl font-bold text-slate-900">
                Vehicle Registry
              </h1>

              <span className="rounded-full bg-teal-100 px-3 py-1 text-xs font-bold text-teal-700">
                Fleet Live
              </span>
            </div>

            <p className="mt-2 text-sm text-slate-500">
              Manage transport equipment profiles and fleet status.
            </p>
          </div>

          <button
            onClick={openAddModal}
            className="rounded-xl bg-teal-500 px-5 py-3 font-semibold text-slate-900"
          >
            + Add Vehicle
          </button>
        </div>
      </section>

      <section className="mb-6 rounded-2xl bg-slate-900 p-4">
        <div className="grid gap-4 lg:grid-cols-3">

          <input
            type="text"
            value={search}
            onChange={(e)=>setSearch(e.target.value)}
            placeholder="Search..."
            className="rounded-xl bg-slate-800 p-3 text-white"
          />

          <select
            value={statusFilter}
            onChange={(e)=>setStatusFilter(e.target.value)}
            className="rounded-xl bg-slate-800 p-3 text-white"
          >
            <option>All</option>
            <option>Available</option>
            <option>On Trip</option>
            <option>In Shop</option>
            <option>Retired</option>
          </select>

          <select
            value={typeFilter}
            onChange={(e)=>setTypeFilter(e.target.value)}
            className="rounded-xl bg-slate-800 p-3 text-white"
          >
            <option>All</option>

            {vehicleTypes.map(type=>(
              <option key={type}>{type}</option>
            ))}

          </select>

        </div>
      </section>
            <section className="overflow-hidden rounded-2xl bg-white shadow">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-slate-100">
              <tr>
                <th className="px-4 py-3 text-left">Registration</th>
                <th className="px-4 py-3 text-left">Model</th>
                <th className="px-4 py-3 text-left">Type</th>
                <th className="px-4 py-3 text-left">Capacity</th>
                <th className="px-4 py-3 text-left">Status</th>
                <th className="px-4 py-3 text-left">Actions</th>
              </tr>
            </thead>

            <tbody>
              {filteredVehicles.map((vehicle) => (
                <tr key={vehicle.id} className="border-t">
                  <td className="px-4 py-3">{vehicle.registrationNumber}</td>

                  <td className="px-4 py-3">{vehicle.model}</td>

                  <td className="px-4 py-3">{vehicle.type}</td>

                  <td className="px-4 py-3">
                    {vehicle.capacity} kg
                  </td>

                  <td className="px-4 py-3">
                    <span
                      className={`rounded-full px-3 py-1 text-xs ${getStatusStyle(
                        vehicle.status
                      )}`}
                    >
                      {vehicle.status}
                    </span>
                  </td>

                  <td className="px-4 py-3 space-x-2">
                    <button
                      onClick={() => handleEdit(vehicle)}
                      className="rounded bg-blue-500 px-3 py-1 text-white"
                    >
                      Edit
                    </button>

                    <button
                      onClick={() => handleDelete(vehicle)}
                      className="rounded bg-red-500 px-3 py-1 text-white"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}

              {filteredVehicles.length === 0 && (
                <tr>
                  <td
                    colSpan={6}
                    className="p-8 text-center text-slate-500"
                  >
                    No vehicles found
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </section>
            {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
          <div className="w-full max-w-2xl rounded-2xl bg-white p-6 shadow-2xl">

            <div className="mb-6 flex items-center justify-between">
              <h2 className="text-2xl font-bold">
                {editingId ? "Edit Vehicle" : "Add Vehicle"}
              </h2>

              <button
                onClick={closeModal}
                className="text-2xl"
              >
                ×
              </button>
            </div>

            <form
              onSubmit={handleSubmit}
              className="grid grid-cols-2 gap-4"
            >
              <input
                name="registrationNumber"
                value={formData.registrationNumber}
                onChange={handleChange}
                placeholder="Registration Number"
                className="rounded-lg border p-3"
              />

              <input
                name="model"
                value={formData.model}
                onChange={handleChange}
                placeholder="Vehicle Model"
                className="rounded-lg border p-3"
              />

              <input
                name="type"
                value={formData.type}
                onChange={handleChange}
                placeholder="Vehicle Type"
                className="rounded-lg border p-3"
              />

              <input
                name="capacity"
                type="number"
                value={formData.capacity}
                onChange={handleChange}
                placeholder="Capacity"
                className="rounded-lg border p-3"
              />

              <input
                name="odometer"
                type="number"
                value={formData.odometer}
                onChange={handleChange}
                placeholder="Odometer"
                className="rounded-lg border p-3"
              />

              <input
                name="acquisitionCost"
                type="number"
                value={formData.acquisitionCost}
                onChange={handleChange}
                placeholder="Acquisition Cost"
                className="rounded-lg border p-3"
              />

              <select
                name="status"
                value={formData.status}
                onChange={handleChange}
                className="rounded-lg border p-3 col-span-2"
              >
                <option value="Available">Available</option>
                <option value="On Trip">On Trip</option>
                <option value="In Shop">In Shop</option>
                <option value="Retired">Retired</option>
              </select>

              {error && (
                <div className="col-span-2 rounded-lg bg-red-100 p-3 text-red-700">
                  {error}
                </div>
              )}

              <div className="col-span-2 flex justify-end gap-3 pt-4">
                <button
                  type="button"
                  onClick={closeModal}
                  className="rounded-lg border px-5 py-2"
                >
                  Cancel
                </button>

                <button
                  type="submit"
                  className="rounded-lg bg-teal-500 px-5 py-2 font-semibold text-white"
                >
                  {editingId ? "Save Changes" : "Add Vehicle"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

export default Vehicles;