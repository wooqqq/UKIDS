import { create } from 'zustand';
import api from '../util/api';

interface TreeState {
  treeData: any | null;
  fetchTreeData: (familyId: number) => Promise<void>;
  updateTreeExp: (familyId: number, point: number) => Promise<void>;
  error: string | null;
}

export const useTreeStore = create<TreeState>((set) => {
  const getSelectedFamilyId = () => {
    const familyId = localStorage.getItem('selectedFamilyId');
    return familyId ? parseInt(familyId, 10) : null;
  };

  const initializeTreeData = async () => {
    const familyId = getSelectedFamilyId();
    if (familyId !== null) {
      await fetchTreeData(familyId);
    }
  };

  const fetchTreeData = async (familyId: number) => {
    try {
      const response = await api.get(`/tree/${familyId}`);
      set({ treeData: response.data });
    } catch (error: any) {
      set({ error: error.message });
    }
  };

  const updateTreeExp = async (familyId: number, point: number) => {
    try {
      await api.put(`/tree`, { familyId, point });

      const response = await api.get(`/tree/${familyId}`);
      set({ treeData: response.data });
    } catch (error: any) {
      set({ error: error.message });
    }
  };

  initializeTreeData();

  return {
    treeData: null,
    fetchTreeData,
    updateTreeExp,
    error: null,
  };
});
