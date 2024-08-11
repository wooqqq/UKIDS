import { create } from 'zustand';
import api from '../util/api';

interface TreeState {
  treeData: any | null;
  fetchTreeData: (familyId: number) => Promise<void>;
  updateTree: (treeData: any) => Promise<void>;
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

  updateTree: async (treeData) => {
    try {
      await api.put(`/tree`, treeData);
      set({ treeData: { ...treeData } });
    } catch (error: any) {
      set({ error: error.message });
    }
  },
}));
