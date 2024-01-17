import { Router } from "express";
import * as rh from "./request-handler.js";
import auth from "./auth.js";


const router=Router();
router.route("/register").post(rh.register);
router.route("/login").post(rh.login);
router.route("/").get(rh.test);
router.route("/profile").get(auth,rh.profile);
router.route("/upload").post(rh.upload);
router.route("/view").get(rh.view);
router.route("/vblog").get(auth,rh.vblog);
export default router