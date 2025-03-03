import { SalesPerson } from '@/types/sales-person';
import { useReducer } from 'react';


export type FormState = 'initial' | 'create' | 'edit';


export interface TerritoriesFormState {
  formState: FormState;
  selectedPerson: SalesPerson | null;
  isDialogOpen: boolean;
}


type FormAction = 
  | { type: 'OPEN_CREATE_FORM' }
  | { type: 'OPEN_EDIT_FORM'; person: SalesPerson }
  | { type: 'CLOSE_FORM' }
  | { type: 'RESET' };


const initialState: TerritoriesFormState = {
  formState: 'initial',
  selectedPerson: null,
  isDialogOpen: false,
};

function territoriesFormReducer(state: TerritoriesFormState, action: FormAction): TerritoriesFormState {
  switch (action.type) {
    case 'OPEN_CREATE_FORM':
      return {
        ...state,
        formState: 'create',
        selectedPerson: null,
        isDialogOpen: true,
      };
    case 'OPEN_EDIT_FORM':
      return {
        ...state,
        formState: 'edit',
        selectedPerson: action.person,
        isDialogOpen: true,
      };
    case 'CLOSE_FORM':
      return {
        ...state,
        isDialogOpen: false,
      };
    case 'RESET':
      return initialState;
    default:
      return state;
  }
}

// Custom hook
export function useTerritoriesForm() {
  const [state, dispatch] = useReducer(territoriesFormReducer, initialState);

  const openCreateForm = () => dispatch({ type: 'OPEN_CREATE_FORM' });
  const openEditForm = (person: SalesPerson) => dispatch({ type: 'OPEN_EDIT_FORM', person });
  const closeForm = () => dispatch({ type: 'CLOSE_FORM' });
  const resetForm = () => dispatch({ type: 'RESET' });

  return {
    state,
    openCreateForm,
    openEditForm,
    closeForm,
    resetForm,
  };
}