import { updateBooking } from "@/services/apiBookings.js";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

function useCheckin() {
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  const { mutate: checkin, isPending: isCheckingIn } = useMutation({
    mutationFn: ({ bookingId, breakfast }) => {
      updateBooking(bookingId, {
        status: "checked-in",
        isPaid: true,
        ...breakfast,
      });
    },
    onSuccess: (data) => {
      toast.success(`Booking #${data?.id} successfully checked in`);
      queryClient.invalidateQueries({ active: true });
      navigate("/");
    },

    onError: () => {
      toast.error("There was an error while checking in");
    },
  });

  return { checkin, isCheckingIn };
}

export default useCheckin;
