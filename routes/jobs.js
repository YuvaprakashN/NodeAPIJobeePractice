const express=require("express")

const router=express.Router()
const {getJobs,getJob,jobStats, newjob,deleteJob,getJobsInRadius,updateJob}=require("../controller/jobsController")
//router.get("/jobs",getJobs)
router.route("/jobs").get(getJobs)
router.route('/job/:id/:slug').get(getJob);

router.route("/jobs").post(newjob)
router.route('/jobs/:zipcode/:distance').get(getJobsInRadius);
router.route('/job/:id').put( updateJob)
    .delete(deleteJob);
    router.route('/stats/:topic').get(jobStats);


module.exports=router