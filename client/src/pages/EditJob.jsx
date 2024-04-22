import { FormRow, FormRowSelect, SubmitBtn } from "../components";
import Wrapper from "../assets/wrappers/DashboardFormPage";
import { useLoaderData } from "react-router-dom";
import { JOB_STATUS, JOB_TYPE } from "../../../utils/constants";
import {
  Form,
  useNavigation,
  redirect,
  useParams,
  useNavigate,
} from "react-router-dom";
import { toast } from "react-toastify";
import customFetch from "../utils/customFetch";
import axios from "axios";

export const loader = async ({ params }) => {
  try {
    const { data } = await axios.get(`/api/v1/jobs/${params.id}`);
    return data;
  } catch (error) {
    toast.error(error.response.data.msg);
    return redirect("/api/v1/dashboard/all-jobs");
  }
};
export const action = async ({ request, params }) => {
  const formData = await request.formData();
  const data = Object.fromEntries(formData);

  try {
    const result = await axios.patch(`/api/v1/jobs/${params.id}`, data);

    toast.success("Job edited successfully");
  } catch (error) {
    toast.error(error.response.data.msg);
    return error;
  }
  return redirect("/dashboard/all-jobs");
};

const EditJob = () => {
  const { job } = useLoaderData();

  return (
    <Wrapper>
      <Form method="post" className="form">
        <h4 className="form-title">edit job</h4>
        <div className="form-center">
          <FormRow type="text" name="position" defaultValue={job.position} />
          <FormRow type="text" name="company" defaultValue={job.company} />
          <FormRow
            type="text"
            labelText="job location"
            name="jobLocation"
            defaultValue={job.jobLocation}
          />

          <FormRowSelect
            name="jobStatus"
            labelText="job status"
            defaultValue={job.jobStatus}
            list={Object.values(JOB_STATUS)}
          />
          <FormRowSelect
            name="jobType"
            labelText="job type"
            defaultValue={job.jobType}
            list={Object.values(JOB_TYPE)}
          />
          <SubmitBtn formBtn />
        </div>
      </Form>
    </Wrapper>
  );
};

export default EditJob;
