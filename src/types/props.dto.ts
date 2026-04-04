export interface BackLinkProps {
  link: string;
  page: string;
}

export interface SubmitButtonProps {
  isLoading: boolean;
  isValid: boolean;
  cta: string;
  ctaLoading: string;
}

interface FormAddressProps {
  setShowAddForm: (value: boolean) => void;
}