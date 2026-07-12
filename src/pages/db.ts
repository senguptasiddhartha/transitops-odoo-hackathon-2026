import { useState } from 'react';
import type { Vehicle, AppState } from './types';

// Mock initial data
const initialVehicles: Vehicle[] = [
  {
    id: '1',
    registrationNumber: "GJ01AB4523",
    name: "Volvo FH16",
    type: "Heavy Duty Truck",
    maxLoadCapacity: 15000,
    odometer: 74000,
    acquisitionCost: 62000,
    status: "Available",
  }
];

export const useDatabase = () => {
  const [state, setState] = useState<AppState>({
    vehicles: initialVehicles,
    currentUser: { role: 'Fleet Manager' }
  });

  const addVehicle = (vehicleData: Omit<Vehicle, 'id'>) => {
    const newVehicle: Vehicle = {
      ...vehicleData,
      id: Math.random().toString(36).substr(2, 9),
    };
    setState(prev => ({ ...prev, vehicles: [...prev.vehicles, newVehicle] }));
    return { success: true, error: null };
  };

  const updateVehicle = (updatedVehicle: Vehicle) => {
    setState(prev => ({
      ...prev,
      vehicles: prev.vehicles.map(v => v.id === updatedVehicle.id ? updatedVehicle : v)
    }));
    return { success: true, error: null };
  };

  const deleteVehicle = (id: string) => {
    setState(prev => ({
      ...prev,
      vehicles: prev.vehicles.filter(v => v.id !== id)
    }));
    return { success: true, error: null };
  };

  return { state, addVehicle, updateVehicle, deleteVehicle };
};
