import axios, { AxiosError } from "axios";
import { User } from "../zustand/store";
import privateRequest from "./axios-utils";
import { ServicePageCreationType } from "../components/Modals/ServicePageModals/ServicePageModals";

const BASE_URL = "https://web-production-9688.up.railway.app/api";
// const BASE_URL = "http://127.0.0.1:8000/api";

//LOGIN
export const loginUser = async (user: { email: string; password: string }) => {
  try {
    const loginURL = `${BASE_URL}/auth/login`;
    const res = await axios.post(loginURL, user);
    return res.data;
  } catch (error: any) {
    if (!error?.response) {
      throw new Error("No Server Response");
    } else if (error?.response.status === 400) {
      throw new Error("Invalid Credentials");
    } else if (error?.response.status === 401) {
      throw new Error("Unauthorized");
    } else {
      throw new Error("Login Failed");
    }
  }
};

//LOG OUT
export const logoutUser = async (payload: { refresh: string }) => {
  try {
    const res = await privateRequest.post("/auth/token/blacklist/", payload);
    return res.data;
  } catch (e: any) {
    throw new AxiosError(e);
  }
};

//PUBLICATIONS
export const publicationCreate = async (payload: any) => {
  try {
    const res = await privateRequest.post("/publications/", payload);
    return res.data;
  } catch (e: any) {
    throw new AxiosError(e);
  }
};

export const publicationGetAll = async () => {
  try {
    const res = await privateRequest.get("/publications/");
    return res.data;
  } catch (e: any) {
    throw new AxiosError(e);
  }
};

export const publicationRetrieve = async (pubid: number) => {
  try {
    const res = await privateRequest.get(`/publications/${pubid}`);
    return res.data;
  } catch (e: any) {
    throw new AxiosError(e);
  }
};

export const publicationUpdate = async (data: {
  pubid: number;
  FormDataHandler: any;
}) => {
  const { pubid, FormDataHandler } = data;
  try {
    const res = await privateRequest.put(
      `/publications/${pubid}`,
      FormDataHandler
    );
    return res.data;
  } catch (e: any) {
    throw new AxiosError(e);
  }
};

export const publicationDelete = async (id: number) => {
  try {
    const res = await privateRequest.delete(`/publications/${id}`);
    return res.data;
  } catch (e: any) {
    throw new AxiosError(e);
  }
};

export const publicationTypesGetAll = async () => {
  try {
    const res = await privateRequest.get(`/publications/type`);
    return res.data;
  } catch (e: any) {
    throw new AxiosError(e);
  }
};

export const publicationTypesRename = async (payload: any) => {
  const { id, ...data } = payload;
  try {
    const res = await privateRequest.patch(`/publications/type/${id}`, data);
    return res.data;
  } catch (e: any) {
    throw new AxiosError(e);
  }
};

export const publicationTypesDelete = async (id: any) => {
  try {
    const res = await privateRequest.delete(`/publications/type/${id}`);
    return res.data;
  } catch (e: any) {
    throw new AxiosError(e);
  }
};

export const publicationTypesCreate = async (payload: any) => {
  try {
    const res = await privateRequest.post(`/publications/type`, payload);
    return res.data;
  } catch (e: any) {
    throw new AxiosError(e);
  }
};

//NEWS
export const newsCreate = async (payload: any) => {
  try {
    const res = await privateRequest.post(`/news/`, payload);
    return res.data;
  } catch (e: any) {
    throw new AxiosError(e);
  }
};

export const newsGetAll = async () => {
  try {
    const res = await privateRequest.get(`/news/`);
    return res.data;
  } catch (e: any) {
    throw new AxiosError(e);
  }
};

export const newsRetrieve = async (newsId: number) => {
  try {
    const res = await privateRequest.get(`/news/${newsId}`);
    return res.data;
  } catch (e: any) {
    throw new AxiosError(e);
  }
};

export const newsUpdate = async (payload: any) => {
  const { newsId, FormDataHandler } = payload;
  try {
    const res = await privateRequest.put(`/news/${newsId}`, FormDataHandler);
    return res.data;
  } catch (e: any) {
    throw new AxiosError(e);
  }
};

export const newsDelete = async (newsId: number) => {
  try {
    const res = await privateRequest.delete(`/news/${newsId}`);
    return res.data;
  } catch (e: any) {
    throw new AxiosError(e);
  }
};

//REPORTS
export const reportsCreate = async (payload: any) => {
  try {
    const res = await privateRequest.post(`/reports/`, payload);
    return res.data;
  } catch (e: any) {
    throw new AxiosError(e);
  }
};

export const reportsGetAll = async () => {
  try {
    const res = await privateRequest.get(`/reports/`);
    return res.data;
  } catch (e: any) {
    throw new AxiosError(e);
  }
};

export const reportsRetrieve = async (reportsId: number) => {
  try {
    const res = await privateRequest.get(`/reports/${reportsId}`);
    return res.data;
  } catch (e: any) {
    throw new AxiosError(e);
  }
};

export const reportsUpdate = async (payload: any) => {
  const { reportId, FormDataHandler } = payload;
  try {
    const res = await privateRequest.put(
      `/reports/${reportId}`,
      FormDataHandler
    );
    return res.data;
  } catch (e: any) {
    throw new AxiosError(e);
  }
};

export const reportsDelete = async (reportsId: number) => {
  try {
    const res = await privateRequest.delete(`/reports/${reportsId}`);
    return res.data;
  } catch (e: any) {
    throw new AxiosError(e);
  }
};

//EVENTS
export const eventsCreate = async (payload: any) => {
  try {
    const res = await privateRequest.post(`/events/`, payload);
    return res.data;
  } catch (e: any) {
    throw new AxiosError(e);
  }
};

export const eventsGetAll = async () => {
  try {
    const res = await privateRequest.get(`/events/`);
    return res.data;
  } catch (e: any) {
    throw new AxiosError(e);
  }
};

export const eventsRetrieve = async (eventsId: number) => {
  try {
    const res = await privateRequest.get(`/events/${eventsId}`);
    return res.data;
  } catch (e: any) {
    throw new AxiosError(e);
  }
};

export const eventsUpdate = async (payload: any) => {
  const { eventsId, FormDataHandler } = payload;
  try {
    const res = await privateRequest.put(
      `/events/${eventsId}`,
      FormDataHandler
    );
    return res.data;
  } catch (e: any) {
    throw new AxiosError(e);
  }
};

export const eventsDelete = async (eventsId: number) => {
  try {
    const res = await privateRequest.delete(`/events/${eventsId}`);
    return res.data;
  } catch (e: any) {
    throw new AxiosError(e);
  }
};

//TRAININGS
export const trainingsCreate = async (payload: any) => {
  try {
    const res = await privateRequest.post(`/trainings/`, payload);
    return res.data;
  } catch (e: any) {
    throw new AxiosError(e);
  }
};

export const trainingsGetAll = async () => {
  try {
    const res = await privateRequest.get(`/trainings/`);
    return res.data;
  } catch (e: any) {
    throw new AxiosError(e);
  }
};

export const trainingsRetrieve = async (trainingsId: number) => {
  try {
    const res = await privateRequest.get(`/trainings/${trainingsId}`);
    return res.data;
  } catch (e: any) {
    throw new AxiosError(e);
  }
};

export const trainingsUpdate = async (payload: any) => {
  const { trainingsId, FormDataHandler } = payload;
  try {
    const res = await privateRequest.put(
      `/trainings/${trainingsId}`,
      FormDataHandler
    );
    return res.data;
  } catch (e: any) {
    throw new AxiosError(e);
  }
};

export const trainingsDelete = async (trainingsId: number) => {
  try {
    const res = await privateRequest.delete(`/trainings/${trainingsId}`);
    return res.data;
  } catch (e: any) {
    throw new AxiosError(e);
  }
};

//ABOUT US
//HISTORY
export const historyUpdate = async (payload: any) => {
  try {
    const res = await privateRequest.put(`/aboutus/history`, payload);
    return res.data;
  } catch (e: any) {
    throw new AxiosError(e);
  }
};

export const historyRetrieve = async () => {
  try {
    const res = await privateRequest.get(`/aboutus/history`);
    return res.data;
  } catch (e: any) {
    throw new AxiosError(e);
  }
};

//ADVOCACY
export const advocacyUpdate = async (payload: any) => {
  try {
    const res = await privateRequest.put(`/aboutus/advocacy`, payload);
    return res.data;
  } catch (e: any) {
    throw new AxiosError(e);
  }
};

export const advocacyRetrieve = async () => {
  try {
    const res = await privateRequest.get(`/aboutus/advocacy`);
    return res.data;
  } catch (e: any) {
    throw new AxiosError(e);
  }
};

//AFFILLIATES
export const affilliatesUpdate = async (payload: any) => {
  try {
    const res = await privateRequest.put(`/aboutus/affilliate`, payload);
    return res.data;
  } catch (e: any) {
    throw new AxiosError(e);
  }
};

export const affilliatesRetrieve = async () => {
  try {
    const res = await privateRequest.get(`/aboutus/affilliate`);
    return res.data;
  } catch (e: any) {
    throw new AxiosError(e);
  }
};

//HOW WE WORK
export const howWeWorkUpdate = async (payload: any) => {
  try {
    const res = await privateRequest.put(`/aboutus/how-we-work`, payload);
    return res.data;
  } catch (e: any) {
    throw new AxiosError(e);
  }
};

export const howWeWorkRetrieve = async () => {
  try {
    const res = await privateRequest.get(`/aboutus/how-we-work`);
    return res.data;
  } catch (e: any) {
    throw new AxiosError(e);
  }
};

//How We Operate
export const howWeOperateUpdate = async (payload: any) => {
  try {
    const res = await privateRequest.put(`/aboutus/how-we-operate`, payload);
    return res.data;
  } catch (e: any) {
    throw new AxiosError(e);
  }
};

export const howWeOperateRetrieve = async () => {
  try {
    const res = await privateRequest.get(`/aboutus/how-we-operate`);
    return res.data;
  } catch (e: any) {
    throw new AxiosError(e);
  }
};

//OPERATE OFFICE
export const operateOfficeCreate = async (payload: any) => {
  try {
    const res = await privateRequest.post(
      `/aboutus/how-we-operate/office`,
      payload
    );
    return res.data;
  } catch (e: any) {
    throw new AxiosError(e);
  }
};

export const operateOfficeGetAll = async () => {
  try {
    const res = await privateRequest.get(`/aboutus/how-we-operate/office`);
    return res.data;
  } catch (e: any) {
    throw new AxiosError(e);
  }
};

export const operateOfficeRetrieve = async (id: any) => {
  try {
    const res = await privateRequest.get(
      `/aboutus/how-we-operate/office/${id}`
    );
    return res.data;
  } catch (e: any) {
    throw new AxiosError(e);
  }
};

export const operateOfficeUpdate = async (payload: any) => {
  const { id, data } = payload;
  try {
    const res = await privateRequest.put(
      `/aboutus/how-we-operate/office/${id}`,
      data
    );
    return res.data;
  } catch (e: any) {
    throw new AxiosError(e);
  }
};

export const operateOfficeDelete = async (id: any) => {
  try {
    const res = await privateRequest.delete(
      `/aboutus/how-we-operate/office/${id}`
    );
    return res.data;
  } catch (e: any) {
    throw new AxiosError(e);
  }
};

//OPERATE BRANCH
export const operateBranchCreate = async (payload: any) => {
  try {
    const res = await privateRequest.post(
      `/aboutus/how-we-operate/branch`,
      payload
    );
    return res.data;
  } catch (e: any) {
    throw new AxiosError(e);
  }
};

export const operateBranchGetAll = async () => {
  try {
    const res = await privateRequest.get(`/aboutus/how-we-operate/branch`);
    return res.data;
  } catch (e: any) {
    throw new AxiosError(e);
  }
};

export const operateBranchRetrieve = async (id: any) => {
  try {
    const res = await privateRequest.get(
      `/aboutus/how-we-operate/branch/${id}`
    );
    return res.data;
  } catch (e: any) {
    throw new AxiosError(e);
  }
};

export const operateBranchUpdate = async (payload: any) => {
  const { id, data } = payload;
  try {
    const res = await privateRequest.put(
      `/aboutus/how-we-operate/branch/${id}`,
      data
    );
    return res.data;
  } catch (e: any) {
    throw new AxiosError(e);
  }
};

export const operateBranchDelete = async (id: any) => {
  try {
    const res = await privateRequest.delete(
      `/aboutus/how-we-operate/branch/${id}`
    );
    return res.data;
  } catch (e: any) {
    throw new AxiosError(e);
  }
};

//CONTACT
export const contactGetAll = async () => {
  try {
    const res = await privateRequest.get(`/aboutus/contact`);
    return res.data;
  } catch (e: any) {
    throw new AxiosError(e);
  }
};
export const contactDelete = async (id: any) => {
  try {
    const res = await privateRequest.delete(`/aboutus/contact/${id}`);
    return res.data;
  } catch (e: any) {
    throw new AxiosError(e);
  }
};

//WHY JOIN
export const whyJoinCreate = async (payload: any) => {
  try {
    const res = await privateRequest.post(`/membership/why-join`, payload);
    return res.data;
  } catch (e: any) {
    throw new AxiosError(e);
  }
};

export const whyJoinGetAll = async () => {
  try {
    const res = await privateRequest.get(`/membership/why-join`);
    return res.data;
  } catch (e: any) {
    throw new AxiosError(e);
  }
};

export const whyJoinRetrieve = async (id: any) => {
  try {
    const res = await privateRequest.get(`/membership/why-join/${id}`);
    return res.data;
  } catch (e: any) {
    throw new AxiosError(e);
  }
};

export const whyJoinUpdate = async (payload: any) => {
  const { id, data } = payload;
  try {
    const res = await privateRequest.put(`/membership/why-join/${id}`, data);
    return res.data;
  } catch (e: any) {
    throw new AxiosError(e);
  }
};

export const whyJoinDelete = async (id: any) => {
  try {
    const res = await privateRequest.delete(`/membership/why-join/${id}`);
    return res.data;
  } catch (e: any) {
    throw new AxiosError(e);
  }
};

//JOIN STEP
export const joinStepCreate = async (payload: any) => {
  try {
    const res = await privateRequest.post(`/membership/join-step`, payload);
    return res.data;
  } catch (e: any) {
    throw new AxiosError(e);
  }
};

export const joinStepGetAll = async () => {
  try {
    const res = await privateRequest.get(`/membership/join-step`);
    return res.data;
  } catch (e: any) {
    throw new AxiosError(e);
  }
};

export const joinStepRetrieve = async (id: any) => {
  try {
    const res = await privateRequest.get(`/membership/join-step/${id}`);
    return res.data;
  } catch (e: any) {
    throw new AxiosError(e);
  }
};

export const joinStepUpdate = async (payload: any) => {
  const { id, data } = payload;
  try {
    const res = await privateRequest.put(`/membership/join-step/${id}`, data);
    return res.data;
  } catch (e: any) {
    throw new AxiosError(e);
  }
};

export const joinStepDelete = async (id: any) => {
  try {
    const res = await privateRequest.delete(`/membership/join-step/${id}`);
    return res.data;
  } catch (e: any) {
    throw new AxiosError(e);
  }
};

//FAQ
export const faqCreate = async (payload: any) => {
  try {
    const res = await privateRequest.post(`/membership/faq`, payload);
    return res.data;
  } catch (e: any) {
    throw new AxiosError(e);
  }
};

export const faqGetAll = async () => {
  try {
    const res = await privateRequest.get(`/membership/faq`);
    return res.data;
  } catch (e: any) {
    throw new AxiosError(e);
  }
};

export const faqRetrieve = async (id: any) => {
  try {
    const res = await privateRequest.get(`/membership/faq/${id}`);
    return res.data;
  } catch (e: any) {
    throw new AxiosError(e);
  }
};

export const faqUpdate = async (payload: any) => {
  const { id, data } = payload;
  try {
    const res = await privateRequest.put(`/membership/faq/${id}`, data);
    return res.data;
  } catch (e: any) {
    throw new AxiosError(e);
  }
};

export const faqDelete = async (id: any) => {
  try {
    const res = await privateRequest.delete(`/membership/faq/${id}`);
    return res.data;
  } catch (e: any) {
    throw new AxiosError(e);
  }
};

//OUR MEMBERS
export const ourMembersCreate = async (payload: any) => {
  try {
    const res = await privateRequest.post(`/membership/our-members`, payload);
    return res.data;
  } catch (e: any) {
    throw new AxiosError(e);
  }
};

export const ourMembersGetAll = async () => {
  try {
    const res = await privateRequest.get(`/membership/our-members`);
    return res.data;
  } catch (e: any) {
    throw new AxiosError(e);
  }
};

export const ourMembersRetrieve = async (id: any) => {
  try {
    const res = await privateRequest.get(`/membership/our-members/${id}`);
    return res.data;
  } catch (e: any) {
    throw new AxiosError(e);
  }
};

export const ourMembersUpdate = async (payload: any) => {
  const { id, data } = payload;
  try {
    const res = await privateRequest.put(`/membership/our-members/${id}`, data);
    return res.data;
  } catch (e: any) {
    throw new AxiosError(e);
  }
};

export const ourMembersDelete = async (id: any) => {
  try {
    const res = await privateRequest.delete(`/membership/our-members/${id}`);
    return res.data;
  } catch (e: any) {
    throw new AxiosError(e);
  }
};

//GALLERY
export const galleryGetAll = async () => {
  try {
    const res = await privateRequest.get(`/gallery/`);
    return res.data;
  } catch (e: any) {
    throw new AxiosError(e);
  }
};

export const galleryCreate = async (payload: any) => {
  try {
    const res = await privateRequest.post(`/gallery/`, payload);
    return res.data;
  } catch (e: any) {
    throw new AxiosError(e);
  }
};

export const galleryRetrieve = async (id: number) => {
  try {
    const res = await privateRequest.get(`/gallery/${id}`);
    return res.data;
  } catch (e: any) {
    throw new AxiosError(e);
  }
};

export const galleryDelete = async (id: number) => {
  try {
    const res = await privateRequest.delete(`/gallery/${id}`);
    return res.data;
  } catch (e: any) {
    throw new AxiosError(e);
  }
};

export const galleryItemDelete = async (id: number) => {
  try {
    const res = await privateRequest.delete(`/gallery/gallery-item/${id}`);
    return res.data;
  } catch (e: any) {
    throw new AxiosError(e);
  }
};

export const galleryItemAdd = async (payload: any) => {
  try {
    const res = await privateRequest.post(`/gallery/gallery-item/add`, payload);
    return res.data;
  } catch (e: any) {
    throw new AxiosError(e);
  }
};

export const galleryItemRetrieve = async (id: number) => {
  try {
    const res = await privateRequest.get(`/gallery/gallery-item/${id}`);
    return res.data;
  } catch (e: any) {
    throw new AxiosError(e);
  }
};

export const galleryItemUpdate = async (payload: any) => {
  const { id, ...data } = payload;
  try {
    const res = await privateRequest.patch(`/gallery/gallery-item/${id}`, data);
    return res.data;
  } catch (e: any) {
    throw new AxiosError(e);
  }
};

export const galleryRename = async (payload: any) => {
  const { id, ...data } = payload;
  try {
    const res = await privateRequest.post(`/gallery/rename/${id}`, data);
    return res.data;
  } catch (e: any) {
    throw new AxiosError(e);
  }
};

//SERVICE REQUEST
export const serviceRequestGetAll = async () => {
  try {
    const res = await privateRequest.get(`/services/request-service`);
    return res.data;
  } catch (e: any) {
    throw new AxiosError(e);
  }
};

//NEWS LETTER SUBSCRIPTIONS
export const newLetterGetAll = async () => {
  try {
    const res = await privateRequest.get(`/services/newsletter-subscription`);
    return res.data;
  } catch (e: any) {
    throw new AxiosError(e);
  }
};

//PAYMENTS
export const publicationPayments = async () => {
  try {
    const res = await privateRequest.get(`/payments/publications`);
    return res.data;
  } catch (e: any) {
    throw new AxiosError(e);
  }
};

export const eventTrainingPaymentRegistration = async () => {
  try {
    const res = await privateRequest.get(
      `/payments/event-training-registration`
    );
    return res.data;
  } catch (e: any) {
    throw new AxiosError(e);
  }
};

export const agmPaymentRegistration = async () => {
  try {
    const res = await privateRequest.get(`/payments/agm-registration`);
    return res.data;
  } catch (e: any) {
    throw new AxiosError(e);
  }
};

// service
type ServiceResponseType = {
  id: number;
  image: any;
  name: string;
  description: null | string;
  type: "CORE" | "MRC" | "MPDCL" | "OTHERS";
  created_at: string;
  updated_at: string;
  writer: number;
};
export const createService = async (
  data: ServicePageCreationType
): Promise<ServiceResponseType> => {
  const form = new FormData();
  form.append("name", data.name);
  form.append("type", data.type);
  form.append("description", data.description);
  form.append("image", data.image[0]);

  const res = await privateRequest.post("/services/all-services", form);
  return res.data;
};

export const getServices = async (): Promise<ServiceResponseType[]> => {
  const res = await privateRequest.get("/services/all-services");
  return res.data.data;
};

export const deleteServiceApi = async (id: number): Promise<any> => {
  const res = await privateRequest.delete(`/services/all-services/${id}`);
  return res.data;
};

export const updateServiceApi = async ({
  data,
  id,
}: {
  data: ServicePageCreationType;
  id: number;
}): Promise<ServiceResponseType> => {
  const form = new FormData();
  form.append("name", data.name);
  form.append("type", data.type);
  form.append("description", data.description);
  if (typeof data.image !== "string") {
    form.append("image", data.image[0]);
  }
  const res = await privateRequest.put(`/services/all-services/${id}`, form);
  return res.data;
};

// mrc service
type createMrcApiProp = {
  name: string;
  description: string;
  small_text: string;
  items: string[];
  id?: number;
};
export const createMrcApi = async (data: createMrcApiProp) => {
  const res = await privateRequest.post(`/structure/mrc-service`, data);
  return res.data;
};

export const getMrcApi = async (): Promise<createMrcApiProp[]> => {
  const res = await privateRequest.get(`/structure/mrc-service`);
  return res.data.data;
};

export const deleteMrcApi = async (id: number): Promise<any> => {
  const res = await privateRequest.delete(`/structure/mrc-service/${id}`);
  return res.data.data;
};

export const updateMrcApi = async (data: createMrcApiProp): Promise<any> => {
  const res = await privateRequest.put(
    `/structure/mrc-service/${data.id}`,
    data
  );
  return res.data;
};
