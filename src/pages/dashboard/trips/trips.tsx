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
    source: "Houston",
    destination: "Dallas",
    sourceDetail: "Houston, TX",
    destinationDetail: "Dallas, TX",
    vehicle: "Isuzu NPR HD",
    registration: "IL 309 BOX",
    driver: "Sophia Chen",
    driverScore: 72,
    cargoWeight: 5000,
    distance: 380,
    revenue: 934,
    status: "Draft",
  },
  {
    id: 2,
    source: "Los Angeles",
    destination: "Las Vegas",
    sourceDetail: "Los Angeles, CA",
    destinationDetail: "Las Vegas, NV",
    vehicle: "Freightliner Cascadia",
    registration: "CA 889 XTR",
    driver: "David Miller",
    driverScore: 92,
    cargoWeight: 18000,
    distance: 430,
    revenue: 1674,
    status: "Dispatched",
  },
  {
    id: 3,
    source: "Miami",
    destination: "Orlando",
    sourceDetail: "Miami, FL",
    destinationDetail: "Orlando, FL",
    vehicle: "Mercedes Benz Sprinter",
    registration: "FL 112 MTR",
    driver: "John Carter",
    driverScore: 95,
    cargoWeight: 2200,
    distance: 380,
    revenue: 794,
    status: "Completed",
    fuelConsumed: 110,
  },
  {
    id: 4,
    source: "Seattle",
    destination: "Portland",
    sourceDetail: "Seattle, WA",
    destinationDetail: "Portland, OR",
    vehicle: "Volvo FH16",
    registration: "TX 551 CDL",
    driver: "Elena Rostova",
    driverScore: 98,
    cargoWeight: 10000,
    distance: 285,
    revenue: 1013,
    status: "Cancelled",
  },
];

const vehicles = [
  {
    name: "Isuzu NPR HD",
    registration: "IL 309 BOX",
  },
  {
    name: "Freightliner Cascadia",
    registration: "CA 889 XTR",
  },
  {
    name: "Mercedes Benz Sprinter",
    registration: "FL 112 MTR",
  },
];

const drivers = [
  {
    name: "Sophia Chen",
    score: 72,
  },
  {
    name: "David Miller",
    score: 92,
  },
  {
    name: "John Carter",
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
  return value.toLocaleString("en-US");
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

    return Math.round(distance * 1.8 + cargoWeight * 0.05);
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
                  ? trip.fuelConsumed || Math.round(trip.distance * 0.29)
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
    <div className="min-h-full">
      <div className="mb-6 flex items-start justify-between border-b border-slate-400 pb-5">
        <div>
          <h1 className="text-3xl font-bold text-slate-900">
            Trip Dispatch Center
          </h1>

          <p className="mt-2 text-sm text-slate-500">
            Plan commercial dispatches, manage cargo weights, and track trip
            status lifecycles.
          </p>
        </div>

        <button
          onClick={() => setShowModal(true)}
          className="flex items-center gap-2 rounded-xl bg-teal-500 px-5 py-3 font-semibold text-slate-950 transition hover:bg-teal-400"
        >
          <Plus size={20} />
          Create Draft Trip
        </button>
      </div>

      <div className="mb-6 flex gap-4 rounded-2xl bg-slate-900 p-4 shadow">
        <div className="flex flex-1 items-center gap-3 rounded-xl border border-slate-700 bg-slate-800 px-4">
          <Search size={20} className="text-slate-400" />

          <input
            value={search}
            onChange={(event) => setSearch(event.target.value)}
            placeholder="Search trips by source, destination, truck, or driver name..."
            className="w-full bg-transparent py-3 text-sm text-white outline-none placeholder:text-slate-400"
          />
        </div>

        <select
          value={statusFilter}
          onChange={(event) => setStatusFilter(event.target.value)}
          className="min-w-56 rounded-xl border border-slate-700 bg-slate-800 px-5 text-sm font-medium text-white outline-none"
        >
          <option value="All">All Trip Statuses</option>
          <option value="Draft">Draft</option>
          <option value="Dispatched">Dispatched</option>
          <option value="Completed">Completed</option>
          <option value="Cancelled">Cancelled</option>
        </select>
      </div>

      <div className="grid grid-cols-1 gap-5 xl:grid-cols-2">
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
        <div className="rounded-2xl bg-white p-12 text-center shadow">
          <p className="text-slate-500">No trips found.</p>
        </div>
      )}

      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/70 p-5 backdrop-blur-sm">
          <div className="max-h-[88vh] w-full max-w-lg overflow-y-auto rounded-2xl border border-slate-700 bg-slate-900 text-white shadow-2xl">
            <div className="sticky top-0 flex items-center justify-between border-b border-slate-700 bg-slate-900 px-6 py-5">
              <h2 className="text-xl font-bold">Create Draft Trip</h2>

              <button
                onClick={() => setShowModal(false)}
                className="text-slate-400 transition hover:text-white"
              >
                <X size={22} />
              </button>
            </div>

            <div className="space-y-5 p-6">
              <div className="grid grid-cols-2 gap-4">
                <FormField label="Source Location">
                  <input
                    value={form.source}
                    onChange={(event) =>
                      updateForm("source", event.target.value)
                    }
                    placeholder="e.g., Houston, TX"
                    className={inputClass}
                  />
                </FormField>

                <FormField label="Destination">
                  <input
                    value={form.destination}
                    onChange={(event) =>
                      updateForm("destination", event.target.value)
                    }
                    placeholder="e.g., Dallas, TX"
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

              <div className="border-t border-slate-800 pt-4">
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

                <p className="mt-2 text-xs text-slate-400">
                  Decommissioned, in shop, or already dispatched vehicles are
                  hidden.
                </p>
              </div>

              <div>
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

                <p className="mt-2 text-xs text-slate-400">
                  Drivers with expired commercial licenses, suspensions, or
                  active shifts are locked out.
                </p>
              </div>

              <div className="flex items-center justify-between rounded-xl border border-slate-700 bg-slate-950/50 p-4">
                <div>
                  <p className="text-xs font-semibold uppercase tracking-wider text-slate-400">
                    Projected Cargo Revenue
                  </p>

                  <p className="mt-1 text-xs text-slate-500">
                    $1.80/km + $0.05/kg cargo
                  </p>
                </div>

                <p className="text-2xl font-bold text-teal-400">
                  ${formatNumber(projectedRevenue)}
                </p>
              </div>

              <div className="flex justify-end gap-3 border-t border-slate-800 pt-4">
                <button
                  onClick={() => setShowModal(false)}
                  className="rounded-lg bg-slate-800 px-5 py-3 font-semibold text-slate-300 transition hover:bg-slate-700"
                >
                  Cancel
                </button>

                <button
                  onClick={createDraft}
                  className="rounded-lg bg-teal-500 px-5 py-3 font-semibold text-slate-950 transition hover:bg-teal-400"
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
    <div className="rounded-2xl bg-slate-900 p-5 text-white shadow">
      <div className="flex items-start justify-between">
        <div>
          <span className="rounded bg-slate-800 px-2 py-1 text-xs text-slate-400">
            ID: {trip.id}
          </span>

          <h2 className="mt-3 text-xl font-bold">
            {trip.source}
            <span className="mx-3 text-teal-400">→</span>
            {trip.destination}
          </h2>

          <p className="mt-1 text-sm text-slate-500">
            {trip.sourceDetail} to {trip.destinationDetail}
          </p>
        </div>

        <div className="text-right">
          <p className="text-xs uppercase tracking-wider text-slate-400">
            Est. Revenue
          </p>

          <p className="mt-1 text-xl font-bold text-teal-400">
            ${formatNumber(trip.revenue)}
          </p>
        </div>
      </div>

      <div className="mt-5 grid grid-cols-2 gap-4 rounded-xl border border-slate-700 bg-slate-950/40 p-4">
        <div className="flex items-center gap-3">
          <div className="rounded-lg border border-slate-700 bg-slate-800 p-2 text-slate-400">
            <Truck size={18} />
          </div>

          <div>
            <p className="text-xs uppercase tracking-wider text-slate-400">
              Assigned Fleet
            </p>

            <p className="font-semibold">{trip.vehicle}</p>

            <p className="text-xs text-slate-500">{trip.registration}</p>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <div className="rounded-lg border border-slate-700 bg-slate-800 p-2 text-slate-400">
            <UserRound size={18} />
          </div>

          <div>
            <p className="text-xs uppercase tracking-wider text-slate-400">
              Operator
            </p>

            <p className="font-semibold">{trip.driver}</p>

            <p className="text-xs text-slate-500">
              Score: {trip.driverScore}/100
            </p>
          </div>
        </div>
      </div>

      <div className="mt-5 flex items-center justify-between font-mono text-sm">
        <p className="text-slate-400">
          Cargo Weight:{" "}
          <span className="font-bold text-white">
            {formatNumber(trip.cargoWeight)} kg
          </span>
        </p>

        <p className="text-slate-400">
          Distance:{" "}
          <span className="font-bold text-white">
            {formatNumber(trip.distance)} km
          </span>
        </p>
      </div>

      {trip.status === "Completed" && (
        <div className="mt-5 rounded-xl border border-teal-900 bg-teal-950/30 p-4 font-mono text-sm text-teal-400">
          <div className="flex justify-between">
            <span>Completed Odo Reading:</span>
            <span>Captured in Logs</span>
          </div>

          <div className="mt-2 flex justify-between">
            <span>Fuel Consumed:</span>
            <span>{trip.fuelConsumed} Liters</span>
          </div>
        </div>
      )}

      <div className="mt-5 border-t border-slate-800 pt-4">
        {trip.status === "Cancelled" ? (
          <div className="flex items-center justify-between">
            <p className="font-mono font-semibold text-red-400">
              Cancelled / Aborted
            </p>

            <button
              onClick={() => onDelete(trip.id)}
              className="text-slate-500 transition hover:text-red-400"
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
                  onClick={() => onStatusChange(trip.id, "Dispatched")}
                  className="rounded-lg bg-blue-500 px-4 py-2 text-sm font-semibold transition hover:bg-blue-400"
                >
                  Dispatch Trip
                </button>
              )}

              {trip.status === "Dispatched" && (
                <>
                  <button
                    onClick={() => onStatusChange(trip.id, "Completed")}
                    className="rounded-lg bg-teal-500 px-4 py-2 text-sm font-semibold text-slate-950 transition hover:bg-teal-400"
                  >
                    Complete
                  </button>

                  <button
                    onClick={() => onStatusChange(trip.id, "Cancelled")}
                    className="rounded-lg border border-red-800 bg-red-950/40 px-4 py-2 text-sm font-semibold text-red-400 transition hover:bg-red-950"
                  >
                    Cancel
                  </button>
                </>
              )}

              {trip.status === "Draft" && (
                <button
                  onClick={() => onDelete(trip.id)}
                  className="text-slate-500 transition hover:text-red-400"
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
                className={`h-3 w-3 rounded-full ${
                  active ? "bg-teal-400" : "bg-slate-600"
                }`}
              />

              <span
                className={`text-xs font-semibold ${
                  active ? "text-teal-400" : "text-slate-400"
                }`}
              >
                {item}
              </span>
            </div>

            {index < statuses.length - 1 && (
              <div
                className={`mx-2 h-1 w-10 rounded ${
                  index < currentIndex ? "bg-teal-400" : "bg-slate-700"
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
      <span className="mb-2 block text-xs font-semibold uppercase tracking-wide text-slate-400">
        {label}
      </span>

      {children}
    </label>
  );
}

const inputClass =
  "w-full rounded-lg border border-slate-600 bg-slate-800 px-4 py-3 text-sm text-white outline-none transition focus:border-teal-400";