import { useMemo, useState } from "react";
import {
  AlertTriangle,
  Pencil,
  Search,
  ShieldAlert,
  Trash2,
  X,
} from "lucide-react";

type DriverStatus = "Available" | "On Trip" | "Suspended" | "Off Duty";

type Driver = {
  id: number;
  name: string;
  phone: string;
  license: string;
  category: string;
  expiry: string;
  score: number;
  status: DriverStatus;
};

type DriverForm = {
  name: string;
  phone: string;
  license: string;
  category: string;
  expiry: string;
  score: string;
  status: DriverStatus;
};

const initialDrivers: Driver[] = [
  {
    id: 1,
    name: "David Miller",
    phone: "555-0105",
    license: "L-CDA-55219",
    category: "Class A CDL",
    expiry: "2027-02-15",
    score: 92,
    status: "On Trip",
  },
  {
    id: 2,
    name: "Elena Rostova",
    phone: "555-0177",
    license: "L-CDB-44122",
    category: "Class B CDL",
    expiry: "2026-07-28",
    score: 98,
    status: "Available",
  },
  {
    id: 3,
    name: "James Rogue",
    phone: "555-0129",
    license: "L-CDA-00213",
    category: "Class A CDL",
    expiry: "2026-10-10",
    score: 45,
    status: "Suspended",
  },
  {
    id: 4,
    name: "John Carter",
    phone: "555-0192",
    license: "L-CDA-11029",
    category: "Class A CDL",
    expiry: "2026-11-20",
    score: 95,
    status: "Available",
  },
  {
    id: 5,
    name: "Marcus Vance",
    phone: "555-0143",
    license: "L-CDA-88391",
    category: "Class A CDL",
    expiry: "2026-06-30",
    score: 88,
    status: "Off Duty",
  },
  {
    id: 6,
    name: "Sophia Chen",
    phone: "555-0112",
    license: "L-CDC-99211",
    category: "Class C",
    expiry: "2027-08-01",
    score: 72,
    status: "Available",
  },
];

const emptyForm: DriverForm = {
  name: "",
  phone: "",
  license: "",
  category: "Class A CDL",
  expiry: "",
  score: "100",
  status: "Available",
};

function getDaysUntilExpiry(expiry: string) {
  const today = new Date();
  const expiryDate = new Date(`${expiry}T00:00:00`);

  today.setHours(0, 0, 0, 0);

  return Math.ceil(
    (expiryDate.getTime() - today.getTime()) / (1000 * 60 * 60 * 24)
  );
}

function getScoreClass(score: number) {
  if (score >= 90) {
    return "text-emerald-400";
  }

  if (score >= 70) {
    return "text-amber-400";
  }

  return "text-red-400";
}

function getStatusClass(status: DriverStatus) {
  if (status === "Available") {
    return "border-emerald-700 bg-emerald-950/70 text-emerald-400";
  }

  if (status === "On Trip") {
    return "border-blue-700 bg-blue-950/70 text-blue-400";
  }

  if (status === "Suspended") {
    return "border-red-800 bg-red-950/70 text-red-400";
  }

  return "border-slate-700 bg-slate-800 text-slate-400";
}

export default function Drivers() {
  const [drivers, setDrivers] = useState<Driver[]>(initialDrivers);
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("All Statuses");
  const [licenseFilter, setLicenseFilter] = useState("All License Types");
  const [showModal, setShowModal] = useState(false);
  const [editingId, setEditingId] = useState<number | null>(null);
  const [form, setForm] = useState<DriverForm>(emptyForm);

  const filteredDrivers = useMemo(() => {
    const query = search.trim().toLowerCase();

    return drivers.filter((driver) => {
      const matchesSearch =
        driver.name.toLowerCase().includes(query) ||
        driver.phone.toLowerCase().includes(query) ||
        driver.license.toLowerCase().includes(query);

      const matchesStatus =
        statusFilter === "All Statuses" || driver.status === statusFilter;

      const matchesLicense =
        licenseFilter === "All License Types" ||
        driver.category === licenseFilter;

      return matchesSearch && matchesStatus && matchesLicense;
    });
  }, [drivers, search, statusFilter, licenseFilter]);

  const hasCriticalExpiry = drivers.some(
    (driver) => getDaysUntilExpiry(driver.expiry) <= 30
  );

  function openNewDriver() {
    setEditingId(null);
    setForm(emptyForm);
    setShowModal(true);
  }

  function openEditDriver(driver: Driver) {
    setEditingId(driver.id);

    setForm({
      name: driver.name,
      phone: driver.phone,
      license: driver.license,
      category: driver.category,
      expiry: driver.expiry,
      score: String(driver.score),
      status: driver.status,
    });

    setShowModal(true);
  }

  function closeModal() {
    setShowModal(false);
    setEditingId(null);
    setForm(emptyForm);
  }

  function saveDriver() {
    if (
      !form.name.trim() ||
      !form.phone.trim() ||
      !form.license.trim() ||
      !form.expiry
    ) {
      return;
    }

    const score = Math.min(100, Math.max(0, Number(form.score) || 0));

    if (editingId !== null) {
      setDrivers((current) =>
        current.map((driver) =>
          driver.id === editingId
            ? {
                ...driver,
                name: form.name.trim(),
                phone: form.phone.trim(),
                license: form.license.trim(),
                category: form.category,
                expiry: form.expiry,
                score,
                status: form.status,
              }
            : driver
        )
      );
    } else {
      const driver: Driver = {
        id: Date.now(),
        name: form.name.trim(),
        phone: form.phone.trim(),
        license: form.license.trim(),
        category: form.category,
        expiry: form.expiry,
        score,
        status: form.status,
      };

      setDrivers((current) => [driver, ...current]);
    }

    closeModal();
  }

  function deleteDriver(id: number) {
    setDrivers((current) => current.filter((driver) => driver.id !== id));
  }

  return (
    <div className="min-h-full bg-slate-100 px-5 py-6 text-slate-950">
      <div className="mx-auto max-w-[1450px]">
        <div className="flex items-start justify-between border-b border-slate-500 pb-5">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">
              Driver Management
            </h1>

            <p className="mt-1 text-sm text-slate-500">
              Monitor driver safety performance scores, shift statuses, and
              commercial licenses.
            </p>
          </div>

          <button
            type="button"
            onClick={openNewDriver}
            className="rounded-xl bg-teal-500 px-6 py-3 text-sm font-semibold text-slate-950 transition hover:bg-teal-400"
          >
            Add Driver
          </button>
        </div>

        {hasCriticalExpiry && (
          <div className="mt-6 flex gap-4 rounded-xl border border-red-300 bg-red-100/60 px-5 py-4 text-red-500">
            <ShieldAlert className="mt-1 h-5 w-5 shrink-0" />

            <div>
              <p className="text-sm font-semibold">
                Critical License Expirations Detected
              </p>

              <p className="mt-1 text-sm">
                Some active drivers have licenses that are either expired or
                expiring within 30 days. Expired license drivers are blocked
                from dispatches.
              </p>
            </div>
          </div>
        )}

        <div className="mt-6 grid gap-4 rounded-2xl bg-slate-950 p-4 shadow-sm lg:grid-cols-[1fr_190px_225px]">
          <div className="flex items-center gap-3 rounded-xl border border-slate-700 bg-slate-900 px-4">
            <Search className="h-5 w-5 text-slate-400" />

            <input
              value={search}
              onChange={(event) => setSearch(event.target.value)}
              placeholder="Search by name, license, contact..."
              className="h-12 w-full bg-transparent text-sm text-white outline-none placeholder:text-slate-500"
            />
          </div>

          <select
            value={statusFilter}
            onChange={(event) => setStatusFilter(event.target.value)}
            className="h-12 rounded-xl border border-slate-700 bg-slate-900 px-4 text-sm text-white outline-none"
          >
            <option>All Statuses</option>
            <option>Available</option>
            <option>On Trip</option>
            <option>Suspended</option>
            <option>Off Duty</option>
          </select>

          <select
            value={licenseFilter}
            onChange={(event) => setLicenseFilter(event.target.value)}
            className="h-12 rounded-xl border border-slate-700 bg-slate-900 px-4 text-sm text-white outline-none"
          >
            <option>All License Types</option>
            <option>Class A CDL</option>
            <option>Class B CDL</option>
            <option>Class C</option>
          </select>
        </div>

        <div className="mt-6 overflow-hidden rounded-2xl border border-slate-800 bg-slate-950 shadow-sm">
          <div className="overflow-x-auto">
            <table className="w-full min-w-[1050px] border-collapse">
              <thead>
                <tr className="border-b border-slate-800 text-left text-xs font-semibold uppercase text-blue-300">
                  <th className="px-5 py-4">Name</th>
                  <th className="px-5 py-4">Contact Details</th>
                  <th className="px-5 py-4">License Endorsement</th>
                  <th className="px-5 py-4">License Expiry</th>
                  <th className="px-5 py-4">Safety Score</th>
                  <th className="px-5 py-4">Status</th>
                  <th className="px-5 py-4 text-right">Actions</th>
                </tr>
              </thead>

              <tbody>
                {filteredDrivers.map((driver) => {
                  const daysUntilExpiry = getDaysUntilExpiry(driver.expiry);

                  return (
                    <tr
                      key={driver.id}
                      className="border-b border-slate-800 last:border-b-0"
                    >
                      <td className="px-5 py-5 text-sm font-semibold text-white">
                        {driver.name}
                      </td>

                      <td className="px-5 py-5 font-mono text-sm text-slate-200">
                        {driver.phone}
                      </td>

                      <td className="px-5 py-5">
                        <p className="font-mono text-sm font-semibold text-white">
                          {driver.license}
                        </p>

                        <p className="mt-1 text-[11px] uppercase text-slate-500">
                          {driver.category}
                        </p>
                      </td>

                      <td className="px-5 py-5">
                        <p className="font-mono text-sm text-white">
                          {driver.expiry}
                        </p>

                        {daysUntilExpiry < 0 ? (
                          <span className="mt-2 inline-flex items-center gap-1 rounded-md bg-red-900/70 px-2 py-1 text-[11px] font-semibold text-red-300">
                            <AlertTriangle className="h-3 w-3" />
                            Expired
                          </span>
                        ) : daysUntilExpiry <= 30 ? (
                          <span className="mt-2 inline-flex items-center gap-1 rounded-md bg-amber-900/70 px-2 py-1 text-[11px] font-semibold text-amber-300">
                            <AlertTriangle className="h-3 w-3" />
                            Expires in {daysUntilExpiry} days
                          </span>
                        ) : (
                          <p className="mt-1 text-[11px] text-slate-500">
                            Valid
                          </p>
                        )}
                      </td>

                      <td className="px-5 py-5">
                        <span
                          className={`font-mono text-base font-bold ${getScoreClass(
                            driver.score
                          )}`}
                        >
                          {driver.score}
                        </span>

                        <span className="ml-1 text-xs text-slate-300">/100</span>
                      </td>

                      <td className="px-5 py-5">
                        <span
                          className={`inline-flex rounded-full border px-3 py-1 font-mono text-xs ${getStatusClass(
                            driver.status
                          )}`}
                        >
                          {driver.status}
                        </span>
                      </td>

                      <td className="px-5 py-5">
                        <div className="flex justify-end gap-4 text-slate-500">
                          <button
                            type="button"
                            onClick={() => openEditDriver(driver)}
                            className="transition hover:text-white"
                            aria-label="Edit driver"
                          >
                            <Pencil className="h-4 w-4" />
                          </button>

                          <button
                            type="button"
                            onClick={() => deleteDriver(driver.id)}
                            className="transition hover:text-red-400"
                            aria-label="Delete driver"
                          >
                            <Trash2 className="h-4 w-4" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>

          {filteredDrivers.length === 0 && (
            <div className="px-6 py-16 text-center text-sm text-slate-500">
              No drivers found.
            </div>
          )}
        </div>
      </div>

      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/75 px-4 backdrop-blur-sm">
          <div className="w-full max-w-[510px] overflow-hidden rounded-2xl border border-slate-700 bg-slate-950 shadow-2xl">
            <div className="flex items-center justify-between border-b border-slate-800 px-6 py-5">
              <h2 className="text-xl font-bold text-white">
                {editingId === null ? "Register New Driver" : "Edit Driver"}
              </h2>

              <button
                type="button"
                onClick={closeModal}
                className="text-slate-400 transition hover:text-white"
                aria-label="Close"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            <div className="max-h-[70vh] overflow-y-auto px-6 py-6">
              <div className="grid gap-4 sm:grid-cols-2">
                <label className="block">
                  <span className="mb-1 block text-xs font-semibold uppercase text-slate-400">
                    Full Name
                  </span>

                  <input
                    value={form.name}
                    onChange={(event) =>
                      setForm({ ...form, name: event.target.value })
                    }
                    placeholder="e.g., John Doe"
                    className="h-10 w-full rounded-lg border border-slate-700 bg-slate-800 px-3 text-sm text-white outline-none focus:border-teal-500"
                  />
                </label>

                <label className="block">
                  <span className="mb-1 block text-xs font-semibold uppercase text-slate-400">
                    Contact Phone
                  </span>

                  <input
                    value={form.phone}
                    onChange={(event) =>
                      setForm({ ...form, phone: event.target.value })
                    }
                    placeholder="e.g., 555-0199"
                    className="h-10 w-full rounded-lg border border-slate-700 bg-slate-800 px-3 text-sm text-white outline-none focus:border-teal-500"
                  />
                </label>

                <label className="block">
                  <span className="mb-1 block text-xs font-semibold uppercase text-slate-400">
                    License Number
                  </span>

                  <input
                    value={form.license}
                    onChange={(event) =>
                      setForm({ ...form, license: event.target.value })
                    }
                    placeholder="e.g., L-CDA-12345"
                    className="h-10 w-full rounded-lg border border-slate-700 bg-slate-800 px-3 text-sm text-white outline-none focus:border-teal-500"
                  />
                </label>

                <label className="block">
                  <span className="mb-1 block text-xs font-semibold uppercase text-slate-400">
                    License Category
                  </span>

                  <select
                    value={form.category}
                    onChange={(event) =>
                      setForm({ ...form, category: event.target.value })
                    }
                    className="h-10 w-full rounded-lg border border-slate-700 bg-slate-800 px-3 text-sm text-white outline-none focus:border-teal-500"
                  >
                    <option value="Class A CDL">
                      Class A CDL (Commercial)
                    </option>
                    <option value="Class B CDL">
                      Class B CDL (Commercial)
                    </option>
                    <option value="Class C">Class C</option>
                  </select>
                </label>

                <label className="block">
                  <span className="mb-1 block text-xs font-semibold uppercase text-slate-400">
                    License Expiry Date
                  </span>

                  <input
                    type="date"
                    value={form.expiry}
                    onChange={(event) =>
                      setForm({ ...form, expiry: event.target.value })
                    }
                    className="h-10 w-full rounded-lg border border-slate-700 bg-slate-800 px-3 text-sm text-white outline-none focus:border-teal-500"
                  />
                </label>

                <label className="block">
                  <span className="mb-1 block text-xs font-semibold uppercase text-slate-400">
                    Safety Performance Score
                  </span>

                  <input
                    type="number"
                    min="0"
                    max="100"
                    value={form.score}
                    onChange={(event) =>
                      setForm({ ...form, score: event.target.value })
                    }
                    className="h-10 w-full rounded-lg border border-slate-700 bg-slate-800 px-3 font-mono text-sm text-white outline-none focus:border-teal-500"
                  />
                </label>
              </div>

              <label className="mt-4 block">
                <span className="mb-1 block text-xs font-semibold uppercase text-slate-400">
                  Operational Shift Status
                </span>

                <select
                  value={form.status}
                  onChange={(event) =>
                    setForm({
                      ...form,
                      status: event.target.value as DriverStatus,
                    })
                  }
                  className="h-10 w-full rounded-lg border border-slate-700 bg-slate-800 px-3 text-sm text-white outline-none focus:border-teal-500"
                >
                  <option value="Available">Available</option>
                  <option value="On Trip">On Trip</option>
                  <option value="Suspended">Suspended</option>
                  <option value="Off Duty">Off Duty</option>
                </select>
              </label>

              <div className="mt-5 border-t border-slate-800 pt-4">
                <div className="flex justify-end gap-3">
                  <button
                    type="button"
                    onClick={closeModal}
                    className="rounded-lg bg-slate-800 px-5 py-3 text-sm font-semibold text-slate-300 transition hover:bg-slate-700"
                  >
                    Cancel
                  </button>

                  <button
                    type="button"
                    onClick={saveDriver}
                    className="rounded-lg bg-teal-500 px-5 py-3 text-sm font-semibold text-slate-950 transition hover:bg-teal-400"
                  >
                    {editingId === null ? "Register Driver" : "Save Driver"}
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}