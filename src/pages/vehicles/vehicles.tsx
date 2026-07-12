import React, { useState } from 'react';
import { useDatabase } from '../db';
import type { Vehicle, VehicleStatus } from '../types';
import { 
  Plus, Edit2, Trash2, Search, ArrowUpDown, X, AlertCircle, Info
} from 'lucide-react';

export const VehiclesView: React.FC = () => {
  const { state, addVehicle, updateVehicle, deleteVehicle } = useDatabase();
  const currentUser = state.currentUser;
  
  // RBAC permission check: Only Fleet Manager can edit
  const canEdit = currentUser?.role === 'Fleet Manager';

  // Search & Filter state
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('All');
  const [typeFilter, setTypeFilter] = useState<string>('All');
  
  // Sorting state
  const [sortField, setSortField] = useState<keyof Vehicle>('registrationNumber');
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('asc');

  // Modal State
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingVehicle, setEditingVehicle] = useState<Vehicle | null>(null);
  const [modalError, setModalError] = useState<string | null>(null);

  // Form Fields State
  const [regNum, setRegNum] = useState('');
  const [name, setName] = useState('');
  const [type, setType] = useState<Vehicle['type']>('Heavy Duty Truck');
  const [maxLoad, setMaxLoad] = useState<number>(15000);
  const [odometer, setOdometer] = useState<number>(0);
  const [acqCost, setAcqCost] = useState<number>(50000);
  const [status, setStatus] = useState<VehicleStatus>('Available');

  // Reset form helper
  const resetForm = () => {
    setRegNum('');
    setName('');
    setType('Heavy Duty Truck');
    setMaxLoad(15000);
    setOdometer(0);
    setAcqCost(50000);
    setStatus('Available');
    setEditingVehicle(null);
    setModalError(null);
  };

  // Open modal for adding
  const handleOpenAdd = () => {
    resetForm();
    setIsModalOpen(true);
  };

  // Open modal for editing
  const handleOpenEdit = (v: Vehicle) => {
    setEditingVehicle(v);
    setRegNum(v.registrationNumber);
    setName(v.name);
    setType(v.type);
    setMaxLoad(v.maxLoadCapacity);
    setOdometer(v.odometer);
    setAcqCost(v.acquisitionCost);
    setStatus(v.status);
    setModalError(null);
    setIsModalOpen(true);
  };

  // Form Submit handler
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setModalError(null);

    // Form validation
    if (!regNum.trim()) {
      setModalError('Registration number is required.');
      return;
    }
    // Strict format check for registration numbers: alphanumeric + dashes
    const regPattern = /^[A-Z0-9-]+$/i;
    if (!regPattern.test(regNum.trim())) {
      setModalError('Registration number must contain only letters, numbers, and dashes.');
      return;
    }
    if (!name.trim()) {
      setModalError('Vehicle Name/Model is required.');
      return;
    }
    if (maxLoad <= 0) {
      setModalError('Maximum load capacity must be greater than 0.');
      return;
    }
    if (odometer < 0) {
      setModalError('Odometer reading cannot be negative.');
      return;
    }
    if (acqCost <= 0) {
      setModalError('Acquisition cost must be greater than 0.');
      return;
    }

    const vehicleData = {
      registrationNumber: regNum,
      name,
      type,
      maxLoadCapacity: maxLoad,
      odometer,
      acquisitionCost: acqCost,
      status,
    };

    if (editingVehicle) {
      // Edit
      const result = updateVehicle({
        ...editingVehicle,
        ...vehicleData
      });
      if (result.success) {
        setIsModalOpen(false);
        resetForm();
      } else {
        setModalError(result.error || 'Failed to update vehicle.');
      }
    } else {
      // Add
      const result = addVehicle(vehicleData);
      if (result.success) {
        setIsModalOpen(false);
        resetForm();
      } else {
        setModalError(result.error || 'Failed to add vehicle.');
      }
    }
  };

  const handleDelete = (id: string, reg: string) => {
    if (window.confirm(`Are you sure you want to remove vehicle ${reg} from the TransitOps registry?`)) {
      deleteVehicle(id);
    }
  };

  // Sorting handler
  const handleSort = (field: keyof Vehicle) => {
    if (sortField === field) {
      setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
    } else {
      setSortField(field);
      setSortOrder('asc');
    }
  };

  // Filter & Search & Sort Vehicles
  const filteredVehicles = state.vehicles.filter((v: Vehicle) => {
    const searchLower = searchTerm.toLowerCase();
    const matchesSearch = v.registrationNumber.toLowerCase().includes(searchLower) || 
                          v.name.toLowerCase().includes(searchLower) ||
                          v.type.toLowerCase().includes(searchLower);
    const matchesStatus = statusFilter === 'All' || v.status === statusFilter;
    const matchesType = typeFilter === 'All' || v.type === typeFilter;
    return matchesSearch && matchesStatus && matchesType;
  });

  const sortedVehicles = [...filteredVehicles].sort((a, b) => {
    const aValue = a[sortField];
    const bValue = b[sortField];

    if (typeof aValue === 'string' && typeof bValue === 'string') {
      return sortOrder === 'asc' 
        ? aValue.localeCompare(bValue) 
        : bValue.localeCompare(aValue);
    }
    
    if (typeof aValue === 'number' && typeof bValue === 'number') {
      return sortOrder === 'asc' 
        ? aValue - bValue 
        : bValue - aValue;
    }
    
    return 0;
  });

  // Badge styler helper
  const getStatusBadge = (s: VehicleStatus) => {
    switch (s) {
      case 'Available': return 'bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border-emerald-500/20';
      case 'On Trip': return 'bg-blue-500/10 text-blue-600 dark:text-blue-400 border-blue-500/20';
      case 'In Shop': return 'bg-orange-500/10 text-orange-600 dark:text-orange-400 border-orange-500/20';
      case 'Retired': return 'bg-slate-500/10 text-slate-600 dark:text-slate-400 border-slate-500/20';
    }
  };

  return (
    <div className="p-6 space-y-6">
      {/* Header and Add Trigger */}
      <div className="flex items-center justify-between border-b border-gray-100 dark:border-slate-800 pb-5">
        <div>
          <h2 className="text-2xl font-sans font-bold text-slate-900 dark:text-white tracking-tight">Vehicle Registry</h2>
          <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">Manage transport equipment profiles, fleet status, and cargo capacities.</p>
        </div>
        
        {canEdit && (
          <button
            id="add-vehicle-btn"
            onClick={handleOpenAdd}
            className="flex items-center gap-2 px-4 py-2.5 bg-teal-500 hover:bg-teal-600 text-slate-900 text-sm font-semibold rounded-xl shadow-lg shadow-teal-500/10 transition-all cursor-pointer"
          >
            <Plus size={16} className="stroke-[2.5]" />
            <span>Add Vehicle</span>
          </button>
        )}
      </div>

      {/* Access banner for read-only roles */}
      {!canEdit && (
        <div className="bg-blue-50 dark:bg-blue-500/5 text-blue-800 dark:text-blue-300 px-4 py-3 border border-blue-100 dark:border-blue-500/10 rounded-xl flex items-center gap-3 text-xs">
          <Info size={16} />
          <span>You have <strong>Read-Only Access</strong> to the Vehicle Registry based on your <strong>{currentUser?.role}</strong> role. CRUD updates are disabled.</span>
        </div>
      )}

      {/* Query Filter and Search Controls */}
      <div className="bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 rounded-2xl p-4 shadow-sm flex flex-col md:flex-row gap-4">
        {/* Search Input */}
        <div className="flex-1 relative">
          <Search size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
          <input
            id="vehicle-search"
            type="text"
            placeholder="Search by registration or model..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full text-sm bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700/80 rounded-xl pl-10 pr-4 py-2.5 focus:outline-none focus:ring-1 focus:ring-teal-500 text-slate-700 dark:text-slate-200"
          />
        </div>

        {/* Status Dropdown */}
        <div className="w-full md:w-48">
          <select
            id="vehicle-status-filter"
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="w-full text-sm bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700/80 rounded-xl px-3.5 py-2.5 focus:outline-none focus:ring-1 focus:ring-teal-500 text-slate-700 dark:text-slate-200"
          >
            <option value="All">All Statuses</option>
            <option value="Available">Available</option>
            <option value="On Trip">On Trip</option>
            <option value="In Shop">In Shop</option>
            <option value="Retired">Retired</option>
          </select>
        </div>

        {/* Type Dropdown */}
        <div className="w-full md:w-56">
          <select
            id="vehicle-type-filter"
            value={typeFilter}
            onChange={(e) => setTypeFilter(e.target.value)}
            className="w-full text-sm bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700/80 rounded-xl px-3.5 py-2.5 focus:outline-none focus:ring-1 focus:ring-teal-500 text-slate-700 dark:text-slate-200"
          >
            <option value="All">All Vehicle Types</option>
            <option value="Heavy Duty Truck">Heavy Duty Truck</option>
            <option value="Semi-Trailer">Semi-Trailer</option>
            <option value="Light Duty Truck">Light Duty Truck</option>
            <option value="Cargo Van">Cargo Van</option>
            <option value="Box Truck">Box Truck</option>
          </select>
        </div>
      </div>

      {/* Registry Table view */}
      <div className="bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 rounded-2xl shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full border-collapse text-left text-sm text-slate-600 dark:text-slate-300">
            <thead className="bg-slate-50 dark:bg-slate-950/40 border-b border-slate-100 dark:border-slate-800 font-sans font-semibold text-slate-500 dark:text-slate-400 text-xs">
              <tr>
                <th className="py-3.5 px-5">
                  <button onClick={() => handleSort('registrationNumber')} className="flex items-center gap-1.5 hover:text-slate-800 dark:hover:text-white cursor-pointer">
                    <span>REGISTRATION</span>
                    <ArrowUpDown size={12} />
                  </button>
                </th>
                <th className="py-3.5 px-5">MODEL / MODEL TYPE</th>
                <th className="py-3.5 px-5">
                  <button onClick={() => handleSort('maxLoadCapacity')} className="flex items-center gap-1.5 hover:text-slate-800 dark:hover:text-white cursor-pointer">
                    <span>CAPACITY</span>
                    <ArrowUpDown size={12} />
                  </button>
                </th>
                <th className="py-3.5 px-5">
                  <button onClick={() => handleSort('odometer')} className="flex items-center gap-1.5 hover:text-slate-800 dark:hover:text-white cursor-pointer">
                    <span>ODOMETER</span>
                    <ArrowUpDown size={12} />
                  </button>
                </th>
                <th className="py-3.5 px-5">
                  <button onClick={() => handleSort('acquisitionCost')} className="flex items-center gap-1.5 hover:text-slate-800 dark:hover:text-white cursor-pointer">
                    <span>ACQ. COST</span>
                    <ArrowUpDown size={12} />
                  </button>
                </th>
                <th className="py-3.5 px-5">STATUS</th>
                {canEdit && <th className="py-3.5 px-5 text-right">ACTIONS</th>}
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 dark:divide-slate-800/60">
              {sortedVehicles.length > 0 ? (
                sortedVehicles.map(v => (
                  <tr key={v.id} className="hover:bg-slate-50/50 dark:hover:bg-slate-800/20 transition-colors">
                    <td className="py-4 px-5 font-mono text-xs font-bold text-slate-900 dark:text-white">
                      {v.registrationNumber}
                    </td>
                    <td className="py-4 px-5">
                      <div className="font-medium text-slate-800 dark:text-slate-200">{v.name}</div>
                      <div className="text-xs text-slate-400 dark:text-slate-500 font-mono mt-0.5">{v.type}</div>
                    </td>
                    <td className="py-4 px-5 font-mono">
                      {v.maxLoadCapacity.toLocaleString()} <span className="text-xs text-slate-400">kg</span>
                    </td>
                    <td className="py-4 px-5 font-mono">
                      {v.odometer.toLocaleString()} <span className="text-xs text-slate-400">km</span>
                    </td>
                    <td className="py-4 px-5 font-mono">
                      ${v.acquisitionCost.toLocaleString()}
                    </td>
                    <td className="py-4 px-5">
                      <span className={`inline-block px-2.5 py-1 text-xs font-medium font-mono rounded-full border ${getStatusBadge(v.status)}`}>
                        {v.status}
                      </span>
                    </td>
                    {canEdit && (
                      <td className="py-4 px-5 text-right">
                        <div className="flex items-center justify-end gap-2">
                          <button
                            id={`edit-vehicle-btn-${v.id}`}
                            onClick={() => handleOpenEdit(v)}
                            className="p-1.5 text-slate-500 hover:text-teal-600 dark:hover:text-teal-400 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg transition-colors cursor-pointer"
                            title="Edit Fleet Profile"
                          >
                            <Edit2 size={14} />
                          </button>
                          
                          <button
                            id={`delete-vehicle-btn-${v.id}`}
                            onClick={() => handleDelete(v.id, v.registrationNumber)}
                            className="p-1.5 text-slate-500 hover:text-red-500 dark:hover:text-red-400 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg transition-colors cursor-pointer"
                            title="Decommission/Delete"
                          >
                            <Trash2 size={14} />
                          </button>
                        </div>
                      </td>
                    )}
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={canEdit ? 7 : 6} className="py-12 text-center text-slate-400 font-mono">
                    No vehicles found matching the active query.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* CREATE / UPDATE MODAL FORM */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-slate-950/60 backdrop-blur-xs flex items-center justify-center p-4 z-50 animate-fade-in">
          <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl w-full max-w-lg shadow-2xl flex flex-col max-h-[90vh] overflow-hidden">
            
            {/* Modal Header */}
            <div className="px-6 py-4 border-b border-gray-100 dark:border-slate-800 flex items-center justify-between">
              <h3 className="font-sans font-bold text-lg text-slate-900 dark:text-white">
                {editingVehicle ? 'Edit Vehicle Profile' : 'Register New Vehicle'}
              </h3>
              <button 
                onClick={() => setIsModalOpen(false)}
                className="p-1.5 text-slate-400 hover:text-slate-700 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg cursor-pointer"
              >
                <X size={18} />
              </button>
            </div>

            {/* Modal Error Message */}
            {modalError && (
              <div className="mx-6 mt-4 bg-red-50 dark:bg-red-500/10 border border-red-100 dark:border-red-500/20 text-red-700 dark:text-red-400 p-3.5 rounded-xl flex items-start gap-2.5 text-xs">
                <AlertCircle size={16} className="shrink-0 mt-0.5" />
                <span>{modalError}</span>
              </div>
            )}

            {/* Form */}
            <form onSubmit={handleSubmit} className="flex-1 overflow-y-auto p-6 space-y-4">
              
              <div className="grid grid-cols-2 gap-4">
                {/* Reg number */}
                <div className="col-span-1">
                  <label className="block text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider mb-1">Registration #</label>
                  <input
                    id="modal-vehicle-reg"
                    type="text"
                    placeholder="e.g., TX-123-ABC"
                    value={regNum}
                    onChange={(e) => setRegNum(e.target.value)}
                    className="w-full text-sm bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg px-3 py-2 focus:outline-none focus:ring-1 focus:ring-teal-500 text-slate-800 dark:text-white font-mono uppercase"
                    disabled={editingVehicle !== null} // Lock registration on editing to avoid mismatches
                  />
                </div>

                {/* Model Name */}
                <div className="col-span-1">
                  <label className="block text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider mb-1">Model Name</label>
                  <input
                    id="modal-vehicle-name"
                    type="text"
                    placeholder="e.g., Volvo FH16"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full text-sm bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg px-3 py-2 focus:outline-none focus:ring-1 focus:ring-teal-500 text-slate-800 dark:text-white"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                {/* Type */}
                <div>
                  <label className="block text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider mb-1">Equipment Category</label>
                  <select
                    id="modal-vehicle-type"
                    value={type}
                    onChange={(e) => setType(e.target.value as Vehicle['type'])}
                    className="w-full text-sm bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg px-3 py-2 focus:outline-none focus:ring-1 focus:ring-teal-500 text-slate-800 dark:text-white"
                  >
                    <option value="Heavy Duty Truck">Heavy Duty Truck</option>
                    <option value="Semi-Trailer">Semi-Trailer</option>
                    <option value="Light Duty Truck">Light Duty Truck</option>
                    <option value="Cargo Van">Cargo Van</option>
                    <option value="Box Truck">Box Truck</option>
                  </select>
                </div>

                {/* Max Load capacity */}
                <div>
                  <label className="block text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider mb-1">Max Load Capacity (kg)</label>
                  <input
                    id="modal-vehicle-capacity"
                    type="number"
                    value={maxLoad || ''}
                    onChange={(e) => setMaxLoad(Number(e.target.value))}
                    className="w-full text-sm bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg px-3 py-2 focus:outline-none focus:ring-1 focus:ring-teal-500 text-slate-800 dark:text-white font-mono"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                {/* Odometer */}
                <div>
                  <label className="block text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider mb-1">Odometer (km)</label>
                  <input
                    id="modal-vehicle-odometer"
                    type="number"
                    value={odometer || '0'}
                    onChange={(e) => setOdometer(Number(e.target.value))}
                    className="w-full text-sm bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg px-3 py-2 focus:outline-none focus:ring-1 focus:ring-teal-500 text-slate-800 dark:text-white font-mono"
                  />
                </div>

                {/* Acquisition cost */}
                <div>
                  <label className="block text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider mb-1">Acquisition Cost (USD)</label>
                  <input
                    id="modal-vehicle-cost"
                    type="number"
                    value={acqCost || ''}
                    onChange={(e) => setAcqCost(Number(e.target.value))}
                    className="w-full text-sm bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg px-3 py-2 focus:outline-none focus:ring-1 focus:ring-teal-500 text-slate-800 dark:text-white font-mono"
                  />
                </div>
              </div>

              {/* Status Selector */}
              <div>
                <label className="block text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider mb-1">Operational Status</label>
                <select
                  id="modal-vehicle-status"
                  value={status}
                  onChange={(e) => setStatus(e.target.value as VehicleStatus)}
                  className="w-full text-sm bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg px-3 py-2 focus:outline-none focus:ring-1 focus:ring-teal-500 text-slate-800 dark:text-white"
                >
                  <option value="Available">Available</option>
                  <option value="On Trip">On Trip</option>
                  <option value="In Shop">In Shop</option>
                  <option value="Retired">Retired</option>
                </select>
              </div>

              {/* Footer */}
              <div className="pt-4 border-t border-gray-100 dark:border-slate-800 flex justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-4 py-2 bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-300 text-sm font-semibold rounded-lg transition-colors cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  id="modal-vehicle-save"
                  type="submit"
                  className="px-5 py-2 bg-teal-500 hover:bg-teal-600 text-slate-900 text-sm font-semibold rounded-lg shadow-md transition-colors cursor-pointer"
                >
                  {editingVehicle ? 'Save Profile' : 'Register Vehicle'}
                </button>
              </div>

            </form>

          </div>
        </div>
      )}
    </div>
  );
};