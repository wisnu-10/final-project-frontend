  "use client";

  import SubmitButton from "@/components/button";
  import ErrorMessage from "@/components/errorMessage";
  import Loading from "@/components/loading";
  import PageError from "@/components/pageError";
  import { useCreateAdress } from "@/features/address-customer/hooks/useCreateAddress";
  import { useGetAddress } from "@/features/address-customer/hooks/useGetAddress";
  import { useGetIdAddress } from "@/features/address-customer/hooks/useGetIdAddress";
  import { useUpdateAddress } from "@/features/address-customer/hooks/useUpdateAddress";
  import { Briefcase, Home, MapPinned } from "lucide-react";
  import { useParams } from "next/navigation";
import FormUpdateAddress from "../component/formUpdateAddress";

  export default function updateAddressPage() {
    const params = useParams();
    const id = params.id as string;


    const { data, isLoading: isUpdating, error } = useGetIdAddress(id);

    
    console.log("DATA ID:", id)

    if (isUpdating) {
      return <Loading />;
    }

    if (error || !data) {
      return <PageError />;
    }

    return (
      <FormUpdateAddress
        key={id}
        initialData={data}
      />
    );
  }
