import { updateCurrentUser } from "@/services/apiAuth.js";
import { useQueryClient, useMutation } from "@tanstack/react-query";
import toast from "react-hot-toast";

export function useUpdateUser() {
  const queryClient = useQueryClient();

  const { mutate: updateUser, isPending: isUpdating } = useMutation({
    mutationFn: updateCurrentUser,
    onSuccess: ({ user }) => {
      toast.success("User account updated sucessfully!");
      queryClient.setQueryData(["user"], user);
    },
    onError: (error) => {
      toast.error("Error! Couldn't update user account");
      console.error(error);
    },
  });
  return { updateUser, isUpdating };
}
