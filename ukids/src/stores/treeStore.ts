import { create } from 'zustand';
import api from '../util/api';

interface TreeState {
  treeData: any | null;
  fetchTreeData: (familyId: number) => Promise<void>;
  updateTreeExp: (familyId: number, point: number) => Promise<void>;
  error: string | null;
}

export const useTreeStore = create<TreeState>((set) => ({
  treeData: null,
  error: null,

  fetchTreeData: async (familyId) => {
    try {
      const response = await api.get(`/tree/${familyId}`);
      set({ treeData: response.data });
    } catch (error: any) {
      set({ error: error.message });
    }
  },

  updateTreeExp: async (familyId, point) => {
    try {
      // Update tree experience points
      await api.put(`/tree`, { familyId, point });

      // Fetch updated tree data
      // Call fetchTreeData directly
      const response = await api.get(`/tree/${familyId}`);
      set({ treeData: response.data });
    } catch (error: any) {
      set({ error: error.message });
    }
  },
}));