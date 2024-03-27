import axios from "axios";
import { LOGIN_REQUEST } from "./action-types"

const url = 'https://nice-bee-leg-warmers.cyclic.app';

export const getEmployees = (token) => {
    const axiosConfig = {
        headers: {
          Authorization: `Bearer ${token}`
        }
      };
    return async (dispatch) => {
        axios.get(`${url}/emp/employees`,axiosConfig)
            .then(res => {
                console.log('All employees', Response.data.employees);
            })
            .catch(error => {
                console.log(error);
            })
    }
}