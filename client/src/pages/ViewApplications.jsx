import React, { useContext, useState, useEffect } from "react";
import { assets } from "../assets/assets";
import { AppContext } from "../context/AppContext";
import Loading from "../components/Loading";
import { toast } from "react-toastify";
import axios from "axios";

const ViewApplications = () => {
  const { backendUrl, companyToken } = useContext(AppContext);
  const [applications, setApplications] = useState([]);
  const [loading, setLoading] = useState(true);

  // ✅ Fetch company job applications
  const fetchCompanyJobApplications = async () => {
    try {
      setLoading(true);
      const { data } = await axios.get(`${backendUrl}/api/company/applicants`, {
        headers: { token: companyToken },
      });

      // ✅ Check for correct key name returned from backend
      if (data.success && Array.isArray(data.applications)) {
        setApplications(data.applications.slice().reverse());
      } else {
        setApplications([]);
        toast.error(data.message || "No applications found");
      }
    } catch (error) {
      toast.error(error.response?.data?.message || error.message);
    } finally {
      setLoading(false);
    }
  };

  // ✅ Change job application status
  const changeJobApplicationStatus = async (id, status) => {
    try {
      const { data } = await axios.post(
        `${backendUrl}/api/company/change-status`,
        { id, status },
        { headers: { token: companyToken } }
      );

      if (data.success) {
        toast.success(`Application ${status} ✅`);
        fetchCompanyJobApplications();
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.response?.data?.message || error.message);
    }
  };

  useEffect(() => {
    if (companyToken) {
      fetchCompanyJobApplications();
    }
  }, [companyToken]);

  if (loading) return <Loading />;

  if (!applications.length)
    return (
      <div className="flex items-center justify-center h-[70vh]">
        <p className="text-xl sm:text-2xl">No Applications Available</p>
      </div>
    );

  return (
    <div className="container mx-auto p-4">
      <div>
        <table className="w-full max-w-5xl bg-white border border-gray-200 text-sm sm:text-base">
          <thead>
            <tr className="border-b bg-gray-50">
              <th className="py-2 px-4 text-left">#</th>
              <th className="py-2 px-4 text-left">User Name</th>
              <th className="py-2 px-4 text-left">Job Title</th>
              <th className="py-2 px-4 text-left max-sm:hidden">Location</th>
              <th className="py-2 px-4 text-left">Resume</th>
              <th className="py-2 px-4 text-left">Action</th>
            </tr>
          </thead>
          <tbody>
            {applications
              .filter((item) => item.jobId && item.userId)
              .map((applicant, index) => (
                <tr key={applicant._id} className="border-b hover:bg-gray-50">
                  <td className="py-2 px-4 text-center">{index + 1}</td>
                  <td className="py-2 px-4 flex items-center gap-3 flex-wrap">
                    <img
                      className="w-10 h-10 rounded-full hidden sm:block"
                      src={applicant.userId.image}
                      alt="user"
                    />
                    <span className="">{applicant.userId.name}</span>
                  </td>
                  <td className="py-2 px-4">{applicant.jobId.title}</td>
                  <td className="py-2 px-4 max-sm:hidden">
                    {applicant.jobId.location}
                  </td>
                  <td className="py-2 px-4">
                    <a
                      href={applicant.userId.resume}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="bg-blue-50 text-blue-500 px-3 py-1 rounded inline-flex gap-2 items-center"
                    >
                      Resume
                      <img src={assets.resume_download_icon} alt="icon" />
                    </a>
                  </td>
                  <td className="py-2 px-4 text-center">
                    {applicant.status === "pending" ? (
                      <div className="relative inline-block text-left group">
                        <button className="text-gray-500 px-2">⋮</button>
                        <div className="hidden absolute right-0 mt-2 w-32 bg-white border border-gray-200 rounded shadow group-hover:block">
                          <button
                            onClick={() =>
                              changeJobApplicationStatus(
                                applicant._id,
                                "Accepted"
                              )
                            }
                            className="block w-full text-left px-4 py-2 text-green-500 hover:bg-gray-100"
                          >
                            Accept
                          </button>
                          <button
                            onClick={() =>
                              changeJobApplicationStatus(
                                applicant._id,
                                "Rejected"
                              )
                            }
                            className="block w-full text-left px-4 py-2 text-red-500 hover:bg-gray-100"
                          >
                            Reject
                          </button>
                        </div>
                      </div>
                    ) : (
                      <span>{applicant.status}</span>
                    )}
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ViewApplications;
