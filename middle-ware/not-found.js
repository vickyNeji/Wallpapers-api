import { StatusCodes } from "http-status-codes";
const routeNotFound = (req, res) => {
  return res.status(StatusCodes.NOT_FOUND).send("Route doesn't exist");
};

export default routeNotFound;
