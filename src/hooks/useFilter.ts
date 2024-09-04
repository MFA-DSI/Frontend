import { useState, useContext } from 'react';
import { useAuth } from '../providers';// Suppose que vous avez un AuthContext qui stocke le token de l'utilisateur

export const useFilter = () => {
  const [filterPeriod, setFilterPeriod] = useState('weekly'); // Ou 'monthly', 'quarter'
  const [filterDirection, setFilterDirection] = useState<string | undefined>(undefined);
  const [dateRange, setDateRange] = useState<{ startDate?: string; month?: number; quarter?: number; year?: number }>({});
  
  const { directionId } = useAuth(); 

  const userDirectionId = directionId;

  return {
    filterPeriod,
    setFilterPeriod,
    filterDirection,
    setFilterDirection,
    dateRange,
    setDateRange,
    userDirectionId,
  };
};
