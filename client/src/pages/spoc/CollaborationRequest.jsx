import { useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useDispatch, useSelector } from "react-redux";
import { getCollaborationsByUniversityId, acceptCollaboration, rejectCollaboration } from "../../redux/actions/collaborationActions";

function CollaborationRequest() {
	const dispatch = useDispatch();
	const user = useSelector((state) => state.user.user);
	const studentCollabReq = useSelector((state) => state.collaboration.collaborations);
	const loadingCollaborations = useSelector((state) => state.collaboration.loading);
	const errCollaborations = useSelector((state) => state.collaboration.err);

	useEffect(() => {
		dispatch(getCollaborationsByUniversityId(user.university));
	}, [dispatch, user])

	const acceptCollaborationRequest = (collaboration) => {
		dispatch(acceptCollaboration(collaboration._id));
	}

	const rejectCollaborationRequest = (collaboration) => {
		dispatch(rejectCollaboration(collaboration._id));
	}

	return (
		<>
			<p className="text-2xl font-semibold pl-5 mb-4 text-slate-600">Verify Collaboration Requests</p>
			<div className="w-full flex flex-wrap gap-3 p-2">
				{
					loadingCollaborations && <div className="flex justify-center items-center">
						<FontAwesomeIcon icon="spinner" className="text-4xl text-blue-500 animate-spin" />
					</div>
				}
				{
					errCollaborations && <div className="flex justify-center items-center">
						Error Occured &nbsp;
						<FontAwesomeIcon icon="exclamation-circle" className="text-4xl text-red-500" />
					</div>
				}
				{
					studentCollabReq.length === 0 && !loadingCollaborations && !errCollaborations && <div className="flex justify-center items-center">
						No Collaboration Requests
					</div>
				}
				{
					!loadingCollaborations && !errCollaborations && studentCollabReq.length > 0 && (
						studentCollabReq.map((item, index) => {
							return (
								<div key={index} className="w-[49%] p-3 rounded-xl shadow ">
									<p className="mb-2 text-lg font-bold">From: </p>
									<div className="flex gap-3 pl-10 py-2 rounded-lg bg-violet-500 cursor-pointer">
										<img className="rounded-full w-[50px] h-[50px]" src={item.sender.profilePhoto} alt="N/A" />
										<div>
											<h1 className="text-lg font-semibold  text-white">{item.sender.name}</h1>
											<h1 className=" text-sm font-normal text-white">{item.sender.university}</h1>
										</div>
									</div>
									<p className="mb-2 my-2 text-lg font-bold">For Project: </p>
									<div className="p-3 bg-violet-100 rounded-lg">
										<table className="w-full">
											<tbody>
												<tr>
													<td className="p-1 align-top w-1/3 font-semibold text-slate-500">Project ID: </td>
													<td className="p-1 align-top">AMITY2378</td>
												</tr>
												<tr class="active-row">
													<td className="p-1 align-top w-1/3 font-semibold text-slate-500">Title: </td>
													<td className="p-1 align-top">Online Voting System</td>
												</tr>
												<tr class="active-row">
													<td className="p-1 align-top w-1/3 font-semibold text-slate-500">Description: </td>
													<td className="p-1 align-top">
														Asecureand efficient online voting system for democratic elections.
													</td>
												</tr>
												<tr class="active-row">
													<td className="p-1 align-top w-1/3 font-semibold text-slate-500">Owner: </td>
													<td className="p-1 align-top">Ashutosh Verma</td>
												</tr>
											</tbody>
										</table>
									</div>

									<p className="mb-2 my-2 text-lg font-bold">Message:</p>
									<p className="p-3  mb-2 bg-violet-100 rounded-lg">
										I have recently learned Blockchain technology, I want some hands-on experience by working on
										some project. Therefore I want to collaborate
									</p>

									<div className="w-full">
										<div className="flex justify-start">
											<button onClick={(e) => acceptCollaborationRequest(item)} className="  active:scale-95 w-fit m-2 px-4 py-2 font-semibold text-sm bg-green-500 hover:bg-green-600 text-white rounded-md shadow-sm">
												Accept
											</button>
											<button onClick={(e) => rejectCollaborationRequest(item)} className=" active:scale-95 w-fit m-2 px-4 py-2 font-semibold text-sm bg-slate-400 hover:bg-red-500 text-white rounded-md shadow-sm">
												Reject
											</button>
										</div>
									</div>
								</div>
							);
						})
					)
				}
			</div>
		</>
	);
}
export default CollaborationRequest;
