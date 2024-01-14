import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createEditCabin } from "../../services/apiCabins";
import toast from "react-hot-toast";
export function useCreateCabin() {
  const queryClient = useQueryClient();
  const { isLoading: isCreating, mutate: createCabin } = useMutation({
    // mutationFn: newCabin=> createCabin(newCabin) //same as below line
    mutationFn: createEditCabin,
    onSuccess: () => {
      toast.success("New Cabin successfully created.");
      queryClient.invalidateQueries({
        queryKey: ["cabins"],
      });
      // reset();
    },
    onError: (err) => {
      toast.error(err.message);
    },
  });

  return { isCreating, createCabin };
}
