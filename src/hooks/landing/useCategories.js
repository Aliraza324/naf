import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import { GET_CATEGORIES_API } from '../../api/landingRoute';

const fetchCategories = async () => {
  const response = await axios.get(GET_CATEGORIES_API, {
    headers: {
      'ngrok-skip-browser-warning': 'true',
    },
  });
  return response.data;
};

export const useCategories = () => {
  return useQuery({
    queryKey: ['categories'],
    queryFn: fetchCategories,
  });
};
