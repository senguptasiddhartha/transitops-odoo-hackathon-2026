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
    if (vehicle.status === "On Trip") {
      window.alert(
        "Vehicle is currently On Trip and cannot be deleted."
      );

      return;
    }

    if (vehicle.status === "In Shop") {
      window.alert(
        "Vehicle is currently In Shop and cannot be deleted."
      );

      return;
    }

    const confirmed = window.confirm(
      `Delete ${vehicle.model} (${vehicle.registrationNumber})?`
    );

    if (!confirmed) {
      return;
    }

    setVehicles((currentVehicles) =>
      currentVehicles.filter(
        (currentVehicle) =>
          currentVehicle.id !== vehicle.id
      )
    );
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
            <div className="flex flex-wrap items-center gap-3">
              <h1 className="text-3xl font-bold tracking-tight text-slate-900">
                Vehicle Registry
              </h1>

              <span className="rounded-full border border-teal-500/30 bg-teal-500/10 px-3 py-1 text-[10px] font-bold uppercase tracking-widest text-teal-600">
                Fleet Live
              </span>
            </div>

            <p className="mt-2 text-sm text-slate-500">
              Manage transport equipment profiles, fleet
              status, and cargo capacities.
            </p>
          </div>

          <button
            type="button"
            onClick={openAddModal}
            className="inline-flex items-center justify-center gap-2 rounded-xl bg-teal-500 px-5 py-3 text-sm font-bold text-slate-950 shadow-sm transition hover:bg-teal-400"
          >
            <span className="text-xl leading-none">+</span>
            Add Vehicle
          </button>
        </div>
      </section>

      <section className="mb-6 rounded-2xl bg-slate-900 p-4 shadow-lg">
        <div className="grid gap-4 lg:grid-cols-[2fr_0.7fr_0.8fr]">
          <div className="relative">
            <span className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-slate-500">
              ⌕
            </span>

            <input
              type="text"
              value={search}
              onChange={(event) =>
                setSearch(event.target.value)
              }
              placeholder="Search by registration or model..."
              className="w-full rounded-xl border border-slate-700 bg-slate-800 py-3 pl-11 pr-4 text-sm text-white outline-none transition placeholder:text-slate-500 focus:border-teal-500"
            />
          </div>

          <select
            value={statusFilter}
            onChange={(event) =>
              setStatusFilter(event.target.value)
            }
            className="rounded-xl border border-slate-700 bg-slate-800 px-4 py-3 text-sm font-medium text-white outline-none focus:border-teal-500"
          >
            <option value="All">All Statuses</option>
            <option value="Available">Available</option>
            <option value="On Trip">On Trip</option>
            <option value="In Shop">In Shop</option>
            <option value="Retired">Retired</option>
          </select>

          <select
            value={typeFilter}
            onChange={(event) =>
              setTypeFilter(event.target.value)
            }
            className="rounded-xl border border-slate-700 bg-slate-800 px-4 py-3 text-sm font-medium text-white outline-none focus:border-teal-500"
          >
            <option value="All">
              All Vehicle Types
            </option>

            {vehicleTypes.map((type) => (
              <option key={type} value={type}>
                {type}
              </option>
            ))}
          </select>
        </div>
      </section>

      <section className="overflow-hidden rounded-2xl bg-slate-900 shadow-lg">
        <div className="overflow-x-auto">
          <table className="w-full min-w-[1000px] text-left">
            <thead>
              <tr className="border-b border-slate-700 bg-slate-950/40">
                <th className="px-5 py-4 text-xs font-bold uppercase tracking-wide text-blue-300">
                  Registration
                </th>

                <th className="px-5 py-4 text-xs font-bold uppercase tracking-wide text-blue-300">
                  Model / Type
                </th>

                <th className="px-5 py-4 text-xs font-bold uppercase tracking-wide text-blue-300">
                  Capacity
                </th>

                <th className="px-5 py-4 text-xs font-bold uppercase tracking-wide text-blue-300">
                  Odometer
                </th>

                <th className="px-5 py-4 text-xs font-bold uppercase tracking-wide text-blue-300">
                  Acq. Cost
                </th>

                <th className="px-5 py-4 text-xs font-bold uppercase tracking-wide text-blue-300">
                  Status
                </th>

                <th className="px-5 py-4 text-xs font-bold uppercase tracking-wide text-blue-300">
                  Actions
                </th>
              </tr>
            </thead>

            <tbody>
              {filteredVehicles.map((vehicle) => (
                <tr
                  key={vehicle.id}
                  className="border-b border-slate-800 transition hover:bg-slate-800/60"
                >
                  <td className="px-5 py-5">
                    <span className="font-mono text-sm font-bold text-white">
                      {vehicle.registrationNumber}
                    </span>
                  </td>

                  <td className="px-5 py-5">
                    <p className="font-semibold text-white">
                      {vehicle.model}
                    </p>

                    <p className="mt-1 font-mono text-xs text-slate-500">
                      {vehicle.type}
                    </p>
                  </td>

                  <td className="px-5 py-5 font-mono text-sm text-blue-100">
                    {vehicle.capacity.toLocaleString(
                      "en-IN"
                    )}{" "}
                    <span className="text-xs text-slate-500">
                      kg
                    </span>
                  </td>

                  <td className="px-5 py-5 font-mono text-sm text-blue-100">
                    {vehicle.odometer.toLocaleString(
                      "en-IN"
                    )}{" "}
                    <span className="text-xs text-slate-500">
                      km
                    </span>
                  </td>

                  <td className="px-5 py-5 font-mono text-sm text-blue-100">
                    ₹
                    {vehicle.acquisitionCost.toLocaleString(
                      "en-IN"
                    )}
                  </td>

                  <td className="px-5 py-5">
                    <span
                      className={`inline-flex rounded-full px-3 py-1 font-mono text-xs font-semibold ${getStatusStyle(
                        vehicle.status
                      )}`}
                    >
                      {vehicle.status}
                    </span>
                  </td>

                  <td className="px-5 py-5">
                    <div className="flex items-center gap-2">
                      <button
                        type="button"
                        onClick={() =>
                          handleEdit(vehicle)
                        }
                        title="Edit vehicle"
                        className="flex h-9 w-9 items-center justify-center rounded-lg border border-slate-700 text-slate-400 transition hover:border-blue-500 hover:bg-blue-500/10 hover:text-blue-400"
                      >
                        ✎
                      </button>

                      <button
                        type="button"
                        onClick={() =>
                          handleDelete(vehicle)
                        }
                        title="Delete vehicle"
                        className="flex h-9 w-9 items-center justify-center rounded-lg border border-slate-700 text-slate-400 transition hover:border-red-500 hover:bg-red-500/10 hover:text-red-400"
                      >
                        ♲
                      </button>
                    </div>
                  </td>
                </tr>
              ))}

              {filteredVehicles.length === 0 && (
                <tr>
                  <td
                    colSpan={7}
                    className="px-6 py-16 text-center"
                  >
                    <p className="font-semibold text-slate-300">
                      No vehicles found
                    </p>

                    <p className="mt-2 text-sm text-slate-500">
                      Try changing your search or filters.
                    </p>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </section>

      <div className="mt-4 flex flex-wrap items-center justify-between gap-3 text-xs text-slate-500">
        <p>
          Showing {filteredVehicles.length} of{" "}
          {vehicles.length} fleet vehicles
        </p>

        <p>
          In Shop and Retired vehicles are blocked from
          trip dispatch.
        </p>
      </div>

      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/70 p-4 backdrop-blur-sm">
          <div className="max-h-[90vh] w-full max-w-3xl overflow-y-auto rounded-2xl border border-slate-700 bg-slate-900 shadow-2xl">
            <div className="flex items-center justify-between border-b border-slate-700 px-6 py-5">
              <div>
                <h2 className="text-xl font-bold text-white">
                  {editingId !== null
                    ? "Edit Vehicle"
                    : "Add Vehicle"}
                </h2>

                <p className="mt-1 text-sm text-slate-400">
                  Enter the transport equipment profile.
                </p>
              </div>

              <button
                type="button"
                onClick={closeModal}
                className="flex h-9 w-9 items-center justify-center rounded-lg text-xl text-slate-400 transition hover:bg-slate-800 hover:text-white"
              >
                ×
              </button>
            </div>

            <form
              onSubmit={handleSubmit}
              className="p-6"
            >
              <div className="grid gap-5 md:grid-cols-2">
                <label className="block">
                  <span className="mb-2 block text-xs font-bold uppercase tracking-wide text-slate-400">
                    Registration Number
                  </span>

                  <input
                    name="registrationNumber"
                    value={
                      formData.registrationNumber
                    }
                    onChange={handleChange}
                    placeholder="GJ01AB4523"
                    className="w-full rounded-xl border border-slate-700 bg-slate-800 px-4 py-3 text-sm text-white outline-none placeholder:text-slate-600 focus:border-teal-500"
                  />
                </label>

                <label className="block">
                  <span className="mb-2 block text-xs font-bold uppercase tracking-wide text-slate-400">
                    Vehicle Name / Model
                  </span>

                  <input
                    name="model"
                    value={formData.model}
                    onChange={handleChange}
                    placeholder="VAN-05"
                    className="w-full rounded-xl border border-slate-700 bg-slate-800 px-4 py-3 text-sm text-white outline-none placeholder:text-slate-600 focus:border-teal-500"
                  />
                </label>

                <label className="block">
                  <span className="mb-2 block text-xs font-bold uppercase tracking-wide text-slate-400">
                    Vehicle Type
                  </span>

                  <select
                    name="type"
                    value={formData.type}
                    onChange={handleChange}
                    className="w-full rounded-xl border border-slate-700 bg-slate-800 px-4 py-3 text-sm text-white outline-none focus:border-teal-500"
                  >
                    <option value="Van">Van</option>
                    <option value="Truck">Truck</option>
                    <option value="Mini">Mini</option>
                    <option value="Bus">Bus</option>
                    <option value="Trailer">
                      Trailer
                    </option>
                  </select>
                </label>

                <label className="block">
                  <span className="mb-2 block text-xs font-bold uppercase tracking-wide text-slate-400">
                    Maximum Load Capacity (kg)
                  </span>

                  <input
                    name="capacity"
                    type="number"
                    min="1"
                    value={formData.capacity}
                    onChange={handleChange}
                    placeholder="500"
                    className="w-full rounded-xl border border-slate-700 bg-slate-800 px-4 py-3 text-sm text-white outline-none placeholder:text-slate-600 focus:border-teal-500"
                  />
                </label>

                <label className="block">
                  <span className="mb-2 block text-xs font-bold uppercase tracking-wide text-slate-400">
                    Odometer (km)
                  </span>

                  <input
                    name="odometer"
                    type="number"
                    min="0"
                    value={formData.odometer}
                    onChange={handleChange}
                    placeholder="74000"
                    className="w-full rounded-xl border border-slate-700 bg-slate-800 px-4 py-3 text-sm text-white outline-none placeholder:text-slate-600 focus:border-teal-500"
                  />
                </label>

                <label className="block">
                  <span className="mb-2 block text-xs font-bold uppercase tracking-wide text-slate-400">
                    Acquisition Cost (₹)
                  </span>

                  <input
                    name="acquisitionCost"
                    type="number"
                    min="0"
                    value={
                      formData.acquisitionCost
                    }
                    onChange={handleChange}
                    placeholder="620000"
                    className="w-full rounded-xl border border-slate-700 bg-slate-800 px-4 py-3 text-sm text-white outline-none placeholder:text-slate-600 focus:border-teal-500"
                  />
                </label>

                <label className="block md:col-span-2">
                  <span className="mb-2 block text-xs font-bold uppercase tracking-wide text-slate-400">
                    Operational Status
                  </span>

                  <select
                    name="status"
                    value={formData.status}
                    onChange={handleChange}
                    className="w-full rounded-xl border border-slate-700 bg-slate-800 px-4 py-3 text-sm text-white outline-none focus:border-teal-500"
                  >
                    <option value="Available">
                      Available
                    </option>

                    <option value="On Trip">
                      On Trip
                    </option>

                    <option value="In Shop">
                      In Shop
                    </option>

                    <option value="Retired">
                      Retired
                    </option>
                  </select>
                </label>
              </div>

              {error && (
                <div className="mt-5 rounded-xl border border-red-500/30 bg-red-500/10 px-4 py-3 text-sm font-medium text-red-400">
                  ⚠ {error}
                </div>
              )}

              <div className="mt-7 flex justify-end gap-3 border-t border-slate-700 pt-5">
                <button
                  type="button"
                  onClick={closeModal}
                  className="rounded-xl border border-slate-600 px-5 py-3 text-sm font-semibold text-slate-300 transition hover:bg-slate-800"
                >
                  Cancel
                </button>

                <button
                  type="submit"
                  className="rounded-xl bg-teal-500 px-6 py-3 text-sm font-bold text-slate-950 transition hover:bg-teal-400"
                >
                  {editingId !== null
                    ? "Save Changes"
                    : "Add Vehicle"}
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