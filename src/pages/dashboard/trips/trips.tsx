import { useMemo, useState } from "react";
import {
  Search,
  Plus,
  Truck,
  UserRound,
  Trash2,
  X,
} from "lucide-react";

type TripStatus = "Draft" | "Dispatched" | "Completed" | "Cancelled";

type Trip = {
  id: number;
  source: string;
  destination: string;
  sourceDetail: string;
  destinationDetail: string;
  vehicle: string;
  registration: string;
  driver: string;
  driverScore: number;
  cargoWeight: number;
  distance: number;
  revenue: number;
  status: TripStatus;
  fuelConsumed?: number;
};

type TripForm = {
  source: string;
  destination: string;
  cargoWeight: string;
  distance: string;
  vehicle: string;
  driver: string;
};

const initialTrips: Trip[] = [
  {
    id: 1,
    source: "Guwahati",
    destination: "Shillong",
    sourceDetail: "Guwahati, Assam",
    destinationDetail: "Shillong, Meghalaya",
    vehicle: "Tata 407 Gold SFC",
    registration: "AS 01 NC 4821",
    driver: "Ananya Roy",
    driverScore: 72,
    cargoWeight: 5000,
    distance: 100,
    revenue: 18500,
    status: "Draft",
  },
  {
    id: 2,
    source: "Delhi",
    destination: "Jaipur",
    sourceDetail: "New Delhi, Delhi",
    destinationDetail: "Jaipur, Rajasthan",
    vehicle: "BharatBenz 3528C",
    registration: "DL 01 GC 8892",
    driver: "Arjun Sharma",
    driverScore: 92,
    cargoWeight: 18000,
    distance: 280,
    revenue: 46500,
    status: "Dispatched",
  },
  {
    id: 3,
    source: "Mumbai",
    destination: "Pune",
    sourceDetail: "Mumbai, Maharashtra",
    destinationDetail: "Pune, Maharashtra",
    vehicle: "Mahindra Bolero Pik Up",
    registration: "MH 12 RT 1124",
    driver: "Vikram Singh",
    driverScore: 95,
    cargoWeight: 2200,
    distance: 150,
    revenue: 24800,
    status: "Completed",
    fuelConsumed: 32,
  },
  {
    id: 4,
    source: "Kolkata",
    destination: "Bhubaneswar",
    sourceDetail: "Kolkata, West Bengal",
    destinationDetail: "Bhubaneswar, Odisha",
    vehicle: "Volvo FM 420",
    registration: "WB 23 E 5510",
    driver: "Priya Das",
    driverScore: 98,
    cargoWeight: 10000,
    distance: 440,
    revenue: 51750,
    status: "Cancelled",
  },
];

const vehicles = [
  {
    name: "Tata 407 Gold SFC",
    registration: "AS 01 NC 4821",
  },
  {
    name: "BharatBenz 3528C",
    registration: "DL 01 GC 8892",
  },
  {
    name: "Mahindra Bolero Pik Up",
    registration: "MH 12 RT 1124",
  },
];

const drivers = [
  {
    name: "Ananya Roy",
    score: 72,
  },
  {
    name: "Arjun Sharma",
    score: 92,
  },
  {
    name: "Vikram Singh",
    score: 95,
  },
];

const emptyForm: TripForm = {
  source: "",
  destination: "",
  cargoWeight: "2000",
  distance: "200",
  vehicle: "",
  driver: "",
};

function formatNumber(value: number) {
  return value.toLocaleString("en-IN");
}

export default function Trips() {
  const [trips, setTrips] = useState<Trip[]>(initialTrips);
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");
  const [showModal, setShowModal] = useState(false);
  const [form, setForm] = useState<TripForm>(emptyForm);

  const filteredTrips = useMemo(() => {
    return trips.filter((trip) => {
      const searchValue = search.toLowerCase();

      const matchesSearch =
        trip.source.toLowerCase().includes(searchValue) ||
        trip.destination.toLowerCase().includes(searchValue) ||
        trip.vehicle.toLowerCase().includes(searchValue) ||
        trip.driver.toLowerCase().includes(searchValue);

      const matchesStatus =
        statusFilter === "All" || trip.status === statusFilter;

      return matchesSearch && matchesStatus;
    });
  }, [trips, search, statusFilter]);

  const projectedRevenue = useMemo(() => {
    const cargoWeight = Number(form.cargoWeight) || 0;
    const distance = Number(form.distance) || 0;

    return Math.round(distance * 65 + cargoWeight * 1.5);
  }, [form.cargoWeight, form.distance]);

  function updateForm(field: keyof TripForm, value: string) {
    setForm((current) => ({
      ...current,
      [field]: value,
    }));
  }

  function createDraft() {
    if (
      !form.source.trim() ||
      !form.destination.trim() ||
      !form.vehicle ||
      !form.driver
    ) {
      return;
    }

    const selectedVehicle = vehicles.find(
      (vehicle) => vehicle.name === form.vehicle
    );

    const selectedDriver = drivers.find(
      (driver) => driver.name === form.driver
    );

    if (!selectedVehicle || !selectedDriver) {
      return;
    }

    const newTrip: Trip = {
      id: Date.now(),
      source: form.source.trim(),
      destination: form.destination.trim(),
      sourceDetail: form.source.trim(),
      destinationDetail: form.destination.trim(),
      vehicle: selectedVehicle.name,
      registration: selectedVehicle.registration,
      driver: selectedDriver.name,
      driverScore: selectedDriver.score,
      cargoWeight: Number(form.cargoWeight),
      distance: Number(form.distance),
      revenue: projectedRevenue,
      status: "Draft",
    };

    setTrips((current) => [newTrip, ...current]);
    setForm(emptyForm);
    setShowModal(false);
  }

  function updateStatus(id: number, status: TripStatus) {
    setTrips((current) =>
      current.map((trip) =>
        trip.id === id
          ? {
              ...trip,
              status,
              fuelConsumed:
                status === "Completed"
                  ? trip.fuelConsumed || Math.round(trip.distance * 0.12)
                  : trip.fuelConsumed,
            }
          : trip
      )
    );
  }

  function deleteTrip(id: number) {
    setTrips((current) => current.filter((trip) => trip.id !== id));
  }

  return (
    <div className="min-h-full bg-slate-100 px-5 py-6 text-slate-950">
      <div className="mx-auto max-w-[1450px]">
        <div className="flex flex-col gap-4 border-b border-slate-300 pb-5 sm:flex-row sm:items-start sm:justify-between">
          <div>
            <h1 className="text-2xl font-bold tracking-tight text-slate-900">
              Trip Dispatch
            </h1>

            <p className="mt-1 text-sm text-slate-500">
              Plan transport routes, assign fleet resources, and monitor trip
              status.
            </p>
          </div>

          <button
            type="button"
            onClick={() => setShowModal(true)}
            className="flex items-center justify-center gap-2 rounded-lg bg-blue-600 px-5 py-2.5 text-sm font-semibold text-white shadow-sm transition-all duration-200 hover:-translate-y-0.5 hover:bg-blue-700 hover:shadow-md active:translate-y-0"
          >
            <Plus size={18} />
            Create Draft Trip
          </button>
        </div>

        <div className="mt-6 grid gap-3 rounded-xl border border-slate-200 bg-white p-4 shadow-sm transition-shadow duration-200 hover:shadow-md lg:grid-cols-[1fr_225px]">
          <div className="flex items-center gap-3 rounded-lg border border-slate-300 bg-white px-4 transition-all duration-200 focus-within:border-blue-500 focus-within:ring-2 focus-within:ring-blue-100">
            <Search size={19} className="text-slate-400" />

            <input
              value={search}
              onChange={(event) => setSearch(event.target.value)}
              placeholder="Search by source, destination, vehicle, or driver..."
              className="h-11 w-full bg-transparent text-sm text-slate-900 outline-none placeholder:text-slate-400"
            />
          </div>

          <select
            value={statusFilter}
            onChange={(event) => setStatusFilter(event.target.value)}
            className="h-11 cursor-pointer rounded-lg border border-slate-300 bg-white px-4 text-sm text-slate-700 outline-none transition-all duration-200 hover:border-slate-400 focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
          >
            <option value="All">All Trip Statuses</option>
            <option value="Draft">Draft</option>
            <option value="Dispatched">Dispatched</option>
            <option value="Completed">Completed</option>
            <option value="Cancelled">Cancelled</option>
          </select>
        </div>

        <div className="mt-6 grid grid-cols-1 gap-5 xl:grid-cols-2">
          {filteredTrips.map((trip) => (
            <TripCard
              key={trip.id}
              trip={trip}
              onStatusChange={updateStatus}
              onDelete={deleteTrip}
            />
          ))}
        </div>

        {filteredTrips.length === 0 && (
          <div className="mt-6 rounded-xl border border-slate-200 bg-white p-12 text-center shadow-sm">
            <p className="text-sm text-slate-500">No trips found.</p>
          </div>
        )}
      </div>

      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/50 px-4 backdrop-blur-[2px]">
          <div className="w-full max-w-[560px] overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-2xl">
            <div className="flex items-center justify-between border-b border-slate-200 px-6 py-5">
              <div>
                <h2 className="text-xl font-bold text-slate-900">
                  Create Draft Trip
                </h2>

                <p className="mt-1 text-xs text-slate-500">
                  Enter route details and assign available fleet resources.
                </p>
              </div>

              <button
                type="button"
                onClick={() => setShowModal(false)}
                className="rounded-lg p-2 text-slate-400 transition-all duration-200 hover:bg-slate-100 hover:text-slate-700"
                aria-label="Close"
              >
                <X size={20} />
              </button>
            </div>

            <div className="max-h-[70vh] overflow-y-auto px-6 py-6">
              <div className="grid gap-4 sm:grid-cols-2">
                <FormField label="Source Location">
                  <input
                    value={form.source}
                    onChange={(event) =>
                      updateForm("source", event.target.value)
                    }
                    placeholder="e.g., Guwahati, Assam"
                    className={inputClass}
                  />
                </FormField>

                <FormField label="Destination">
                  <input
                    value={form.destination}
                    onChange={(event) =>
                      updateForm("destination", event.target.value)
                    }
                    placeholder="e.g., Shillong, Meghalaya"
                    className={inputClass}
                  />
                </FormField>

                <FormField label="Cargo Weight (KG)">
                  <input
                    type="number"
                    min="0"
                    value={form.cargoWeight}
                    onChange={(event) =>
                      updateForm("cargoWeight", event.target.value)
                    }
                    className={inputClass}
                  />
                </FormField>

                <FormField label="Route Distance (KM)">
                  <input
                    type="number"
                    min="0"
                    value={form.distance}
                    onChange={(event) =>
                      updateForm("distance", event.target.value)
                    }
                    className={inputClass}
                  />
                </FormField>
              </div>

              <div className="mt-5 border-t border-slate-200 pt-5">
                <FormField label="Assign Vehicle (3 Available)">
                  <select
                    value={form.vehicle}
                    onChange={(event) =>
                      updateForm("vehicle", event.target.value)
                    }
                    className={inputClass}
                  >
                    <option value="">Choose Available Vehicle</option>

                    {vehicles.map((vehicle) => (
                      <option key={vehicle.registration} value={vehicle.name}>
                        {vehicle.name} ({vehicle.registration})
                      </option>
                    ))}
                  </select>
                </FormField>

                <p className="mt-2 text-xs text-slate-500">
                  Vehicles under maintenance or assigned to active trips are
                  unavailable.
                </p>
              </div>

              <div className="mt-5">
                <FormField label="Assign Driver (3 Available)">
                  <select
                    value={form.driver}
                    onChange={(event) =>
                      updateForm("driver", event.target.value)
                    }
                    className={inputClass}
                  >
                    <option value="">Choose Available Driver</option>

                    {drivers.map((driver) => (
                      <option key={driver.name} value={driver.name}>
                        {driver.name}
                      </option>
                    ))}
                  </select>
                </FormField>

                <p className="mt-2 text-xs text-slate-500">
                  Drivers with expired licences, suspensions, or active trips
                  are unavailable.
                </p>
              </div>

              <div className="mt-5 flex items-center justify-between rounded-xl border border-slate-200 bg-slate-50 p-4">
                <div>
                  <p className="text-xs font-semibold uppercase tracking-wide text-slate-600">
                    Projected Cargo Revenue
                  </p>

                  <p className="mt-1 text-xs text-slate-500">
                    ₹65/km + ₹1.50/kg cargo
                  </p>
                </div>

                <p className="text-2xl font-bold text-emerald-600">
                  ₹{formatNumber(projectedRevenue)}
                </p>
              </div>

              <div className="mt-6 flex justify-end gap-3 border-t border-slate-200 pt-5">
                <button
                  type="button"
                  onClick={() => setShowModal(false)}
                  className="rounded-lg border border-slate-300 bg-white px-5 py-2.5 text-sm font-semibold text-slate-700 transition-all duration-200 hover:bg-slate-50 hover:shadow-sm"
                >
                  Cancel
                </button>

                <button
                  type="button"
                  onClick={createDraft}
                  className="rounded-lg bg-blue-600 px-5 py-2.5 text-sm font-semibold text-white shadow-sm transition-all duration-200 hover:-translate-y-0.5 hover:bg-blue-700 hover:shadow-md active:translate-y-0"
                >
                  Create Draft
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

function TripCard({
  trip,
  onStatusChange,
  onDelete,
}: {
  trip: Trip;
  onStatusChange: (id: number, status: TripStatus) => void;
  onDelete: (id: number) => void;
}) {
  return (
    <div className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm transition-all duration-200 hover:-translate-y-0.5 hover:shadow-md">
      <div className="flex items-start justify-between gap-4">
        <div>
          <span className="inline-flex rounded-md bg-slate-100 px-2 py-1 text-xs font-medium text-slate-500">
            Trip #{trip.id}
          </span>

          <h2 className="mt-3 text-xl font-bold text-slate-900">
            {trip.source}
            <span className="mx-3 text-blue-500">→</span>
            {trip.destination}
          </h2>

          <p className="mt-1 text-sm text-slate-500">
            {trip.sourceDetail} to {trip.destinationDetail}
          </p>
        </div>

        <div className="shrink-0 text-right">
          <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">
            Est. Revenue
          </p>

          <p className="mt-1 text-xl font-bold text-emerald-600">
            ₹{formatNumber(trip.revenue)}
          </p>
        </div>
      </div>

      <div className="mt-5 grid grid-cols-1 gap-4 rounded-xl border border-slate-200 bg-slate-50 p-4 sm:grid-cols-2">
        <div className="flex items-center gap-3">
          <div className="rounded-lg border border-slate-200 bg-white p-2.5 text-slate-500 shadow-sm">
            <Truck size={18} />
          </div>

          <div>
            <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">
              Assigned Fleet
            </p>

            <p className="mt-0.5 text-sm font-semibold text-slate-900">
              {trip.vehicle}
            </p>

            <p className="mt-0.5 text-xs text-slate-500">
              {trip.registration}
            </p>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <div className="rounded-lg border border-slate-200 bg-white p-2.5 text-slate-500 shadow-sm">
            <UserRound size={18} />
          </div>

          <div>
            <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">
              Driver
            </p>

            <p className="mt-0.5 text-sm font-semibold text-slate-900">
              {trip.driver}
            </p>

            <p className="mt-0.5 text-xs text-slate-500">
              Safety Score: {trip.driverScore}/100
            </p>
          </div>
        </div>
      </div>

      <div className="mt-5 flex flex-col gap-2 border-b border-slate-200 pb-5 text-sm sm:flex-row sm:items-center sm:justify-between">
        <p className="text-slate-500">
          Cargo Weight:{" "}
          <span className="font-semibold text-slate-900">
            {formatNumber(trip.cargoWeight)} kg
          </span>
        </p>

        <p className="text-slate-500">
          Distance:{" "}
          <span className="font-semibold text-slate-900">
            {formatNumber(trip.distance)} km
          </span>
        </p>
      </div>

      {trip.status === "Completed" && (
        <div className="mt-5 rounded-xl border border-emerald-200 bg-emerald-50 p-4 text-sm text-emerald-700">
          <div className="flex justify-between gap-4">
            <span>Trip completion record</span>
            <span className="font-semibold">Captured in logs</span>
          </div>

          <div className="mt-2 flex justify-between gap-4">
            <span>Fuel consumed</span>
            <span className="font-semibold">
              {trip.fuelConsumed} litres
            </span>
          </div>
        </div>
      )}

      <div className="mt-5">
        {trip.status === "Cancelled" ? (
          <div className="flex items-center justify-between">
            <span className="inline-flex rounded-full border border-red-200 bg-red-50 px-3 py-1 text-xs font-semibold text-red-700">
              Cancelled
            </span>

            <button
              type="button"
              onClick={() => onDelete(trip.id)}
              className="rounded-lg p-2 text-slate-400 transition-all duration-200 hover:bg-red-50 hover:text-red-600"
              aria-label="Delete trip"
            >
              <Trash2 size={17} />
            </button>
          </div>
        ) : (
          <div className="flex flex-wrap items-center justify-between gap-4">
            <StatusProgress status={trip.status} />

            <div className="flex items-center gap-2">
              {trip.status === "Draft" && (
                <button
                  type="button"
                  onClick={() => onStatusChange(trip.id, "Dispatched")}
                  className="rounded-lg bg-blue-600 px-4 py-2 text-sm font-semibold text-white shadow-sm transition-all duration-200 hover:-translate-y-0.5 hover:bg-blue-700 hover:shadow-md active:translate-y-0"
                >
                  Dispatch Trip
                </button>
              )}

              {trip.status === "Dispatched" && (
                <>
                  <button
                    type="button"
                    onClick={() => onStatusChange(trip.id, "Completed")}
                    className="rounded-lg bg-emerald-600 px-4 py-2 text-sm font-semibold text-white transition-all duration-200 hover:-translate-y-0.5 hover:bg-emerald-700 hover:shadow-md active:translate-y-0"
                  >
                    Complete
                  </button>

                  <button
                    type="button"
                    onClick={() => onStatusChange(trip.id, "Cancelled")}
                    className="rounded-lg border border-red-200 bg-white px-4 py-2 text-sm font-semibold text-red-600 transition-all duration-200 hover:bg-red-50"
                  >
                    Cancel
                  </button>
                </>
              )}

              {trip.status === "Draft" && (
                <button
                  type="button"
                  onClick={() => onDelete(trip.id)}
                  className="rounded-lg p-2 text-slate-400 transition-all duration-200 hover:bg-red-50 hover:text-red-600"
                  aria-label="Delete trip"
                >
                  <Trash2 size={17} />
                </button>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

function StatusProgress({ status }: { status: TripStatus }) {
  const statuses = ["Draft", "Dispatched", "Completed"];

  const currentIndex = statuses.indexOf(status);

  return (
    <div className="flex items-center">
      {statuses.map((item, index) => {
        const active = index <= currentIndex;

        return (
          <div key={item} className="flex items-center">
            <div className="flex items-center gap-1.5">
              <span
                className={`h-2.5 w-2.5 rounded-full ${
                  active ? "bg-blue-600" : "bg-slate-300"
                }`}
              />

              <span
                className={`text-xs font-semibold ${
                  active ? "text-blue-600" : "text-slate-400"
                }`}
              >
                {item}
              </span>
            </div>

            {index < statuses.length - 1 && (
              <div
                className={`mx-2 h-0.5 w-8 rounded ${
                  index < currentIndex ? "bg-blue-600" : "bg-slate-200"
                }`}
              />
            )}
          </div>
        );
      })}
    </div>
  );
}

function FormField({
  label,
  children,
}: {
  label: string;
  children: React.ReactNode;
}) {
  return (
    <label className="block">
      <span className="mb-1.5 block text-xs font-semibold text-slate-600">
        {label}
      </span>

      {children}
    </label>
  );
}

const inputClass =
  "h-10 w-full rounded-lg border border-slate-300 bg-white px-3 text-sm text-slate-900 outline-none transition-all duration-200 placeholder:text-slate-400 hover:border-slate-400 focus:border-blue-500 focus:ring-2 focus:ring-blue-100";