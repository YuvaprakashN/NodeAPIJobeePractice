const express=require("express")

const router=express.Router()
const {applyJob,getJobs,getJob,jobStats, newjob,deleteJob,getJobsInRadius,updateJob}=require("../controller/jobsController");
const { isAuthenticatedUser, authorizeRoles } = require("../middlewares/auth");
//router.get("/jobs",getJobs)
router.route("/jobs").get(getJobs)
router.route('/job/:id/:slug').get(getJob);
router.route("/jobs/:id/appy").put(isAuthenticatedUser,authorizeRoles("user"),applyJob)

router.route("/jobs").post(isAuthenticatedUser,authorizeRoles("employeer"),newjob)
router.route('/jobs/:zipcode/:distance').get(getJobsInRadius);
router.route('/job/:id').put(isAuthenticatedUser ,updateJob)
    .delete(isAuthenticatedUser,deleteJob);
    router.route('/stats/:topic').get(jobStats);


module.exports=router