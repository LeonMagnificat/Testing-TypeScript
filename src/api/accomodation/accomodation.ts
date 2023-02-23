import express from "express";
import AccomodationsModel from "./model";
import { loginFirstMiddleware, UserRequest } from "../../library/Auth/JWTAuth";
import { hostsOnlyMiddleware } from "../../library/Auth/HostsAuth";
import createHttpError from "http-errors";
import UsersModel from "../user/model";
import { AccomodationToken } from "./types";
import { AccomodationRequest } from "../../library/Tools/tools";

const accomodationRouter = express.Router();

accomodationRouter.post("/", loginFirstMiddleware, hostsOnlyMiddleware, async (req: UserRequest, res, next) => {
  try {
    const newAccomodation = new AccomodationsModel(req.body);
    const { _id } = await newAccomodation.save();
    const host = await UsersModel.findByIdAndUpdate(req.user?._id, { $push: { accomodation: _id } }, { new: true, runValidators: true });
    const Accomodation = await AccomodationsModel.findByIdAndUpdate(_id, { $push: { host: req.user!._id } }, { new: true, runValidators: true });
    res.status(201).send({ Accomodation, host });
  } catch (error) {
    next(error);
  }
});

accomodationRouter.get("/", loginFirstMiddleware, hostsOnlyMiddleware, async (req: AccomodationRequest, res, next) => {
  try {
    const Accomodations = await AccomodationsModel.find();
    res.status(201).send(Accomodations);
  } catch (error) {
    next(error);
  }
});
accomodationRouter.get("/:accomodationId", loginFirstMiddleware, async (req, res, next) => {
  try {
    const accomodation = await AccomodationsModel.findById(req.params.accomodationId);
    if (accomodation) {
      res.send(accomodation);
    } else {
      createHttpError(404, "User not found");
    }
  } catch (error) {
    next(error);
  }
});

accomodationRouter.put("/:accomodationId", loginFirstMiddleware, hostsOnlyMiddleware, async (req, res, next) => {
  try {
    const accomodation = await AccomodationsModel.findByIdAndUpdate(req.params.accomodationId, req.body, { new: true, runValidators: true });
    res.send(accomodation);
  } catch (error) {
    next(error);
  }
});
accomodationRouter.delete("/:accomodationId", loginFirstMiddleware, hostsOnlyMiddleware, async (req: UserRequest, res, next) => {
  const user = await UsersModel.findById(req.user!._id);
  const accomodations = user!.accomodations;
});

export default accomodationRouter;
//const accomodation = await AccomodationsModel.findByIdAndDelete(req.params.accomodationId);
//const remaining = accomodations.filter((accomodation) => accomodation._id !== req.params.accomodationId);
//accomodations.filter((accomodation) => {console.log(accomodation)}
//await UsersModel.save();
//res.send(remaining);
