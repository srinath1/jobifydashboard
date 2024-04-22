import React from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { redirect } from "react-router-dom";

export const action = async ({ params }) => {
  try {
    await axios.delete(`/api/v1/jobs/${params.id}`);
    toast.success("Deleted successfully");
  } catch (error) {
    toast.error(error?.response?.data?.msg);
  }
  return redirect("/dashboard/all-jobs");
};
