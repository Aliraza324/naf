import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { get, post, patch, del } from "../../api/service";
import toast from "../../utils/toast";
import { DEALERS_API, GET_DEALER_DETAIL_API, BLOCK_DEALER_API, UNBLOCK_DEALER_API, DELETE_DEALER_API, GET_DEALERS_STATS_API } from "../../api/landingRoute";

// 1. Get All Dealers
export const useGetDealers = () => {
    return useQuery({
        queryKey: ["dealers"],
        queryFn: async () => {
            const response = await get(DEALERS_API);
            console.log("Dealers API response:", response);
            return response?.dealers || [];
        },
    });
};

export const useGetDealersStats = () => {
    return useQuery({
        queryKey: ["dealers-stats"],
        queryFn: async () => {
            const response = await get(GET_DEALERS_STATS_API);
            return response || null;
        },
    });
};

// 2. Get Single Dealer Detail
export const useGetDealerDetail = (dealerId) => {
    return useQuery({
        queryKey: ["dealer", dealerId],
        queryFn: async () => {
            if (!dealerId) return null;
            const response = await get(GET_DEALER_DETAIL_API(dealerId));
            return response?.dealer || null;
        },
        enabled: !!dealerId,
    });
};

// 3. Add Dealer
export const useAddDealer = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: async (dealerData) => {
            const payload = {
                ...dealerData,
                email: dealerData.email ? dealerData.email.toLowerCase() : dealerData.email
            };
            const response = await post(DEALERS_API, payload);
            return response;
        },
        onSuccess: (data) => {
            if (data.success) {
                toast.success(data.message || "Dealer created successfully");
                queryClient.invalidateQueries({ queryKey: ["dealers"] });
            } else {
                toast.error(data.message || "Failed to create dealer");
            }
        },
        onError: (error) => {
            console.error("Add dealer error:", error);
        },
    });
};

// 4. Block Dealer
export const useBlockDealer = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: async (dealerId) => {
            const response = await patch(BLOCK_DEALER_API(dealerId), {});
            return response;
        },
        onSuccess: (data, dealerId) => {
            if (data.success) {
                toast.success(data.message || "Dealer blocked successfully");
                queryClient.invalidateQueries({ queryKey: ["dealers"] });
                queryClient.invalidateQueries({ queryKey: ["dealer", dealerId] });
            } else {
                toast.error(data.message || "Failed to block dealer");
            }
        },
        onError: (error) => {
            console.error("Block dealer error:", error);
        },
    });
};

// 5. Unblock Dealer
export const useUnblockDealer = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: async (dealerId) => {
            const response = await patch(UNBLOCK_DEALER_API(dealerId), {});
            return response;
        },
        onSuccess: (data, dealerId) => {
            if (data.success) {
                toast.success(data.message || "Dealer unblocked successfully");
                queryClient.invalidateQueries({ queryKey: ["dealers"] });
                queryClient.invalidateQueries({ queryKey: ["dealer", dealerId] });
            } else {
                toast.error(data.message || "Failed to unblock dealer");
            }
        },
        onError: (error) => {
            console.error("Unblock dealer error:", error);
        },
    });
};

// 6. Delete Dealer
export const useDeleteDealer = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: async (dealerId) => {
            const response = await del(DELETE_DEALER_API(dealerId));
            return response;
        },
        onSuccess: (data) => {
            if (data.success) {
                toast.success(data.message || "Dealer deleted successfully");
                queryClient.invalidateQueries({ queryKey: ["dealers"] });
            } else {
                toast.error(data.message || "Failed to delete dealer");
            }
        },
        onError: (error) => {
            console.error("Delete dealer error:", error);
        },
    });
};
