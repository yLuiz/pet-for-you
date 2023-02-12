import axios from "axios";
import environment from "../environment/environment";

export default axios.create({
  baseURL: environment.REACT_APP_API,
});