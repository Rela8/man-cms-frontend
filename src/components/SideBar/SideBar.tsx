import { FC } from "react";
import {
  SideBarContainer,
  SideBtn,
  SideBtnCon,
  SideLogo,
} from "./SideBar.style";
import {
  MdGroups2,
  MdCardMembership,
  MdEmojiEvents,
  MdRoundaboutLeft,
  MdOnDeviceTraining,
} from "react-icons/md";
import { AiFillSetting } from "react-icons/ai";
import { TbReportSearch } from "react-icons/tb";
import { BiLogOut, BiNews } from "react-icons/bi";
import Logo from "../../assets/Vector.png";
import { useAuthStore } from "../../zustand/store";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useMutation } from "react-query";
import { logoutUser } from "../../axios/api-calls";
import Loading from "../Loading/Loading";
import { CustomSideBarNavLinks } from "../../globals/styles/CustomNavLinks";

type Props = {
  show?: boolean;
};

const SideBar: FC<Props> = ({ show }) => {
  const deleteUserHandler = useAuthStore.getState().delUser;
  const userData = useAuthStore.getState().user;
  const navigate = useNavigate();

  const { mutate, isLoading } = useMutation(
    (data: { refresh: string }) => logoutUser(data),
    {
      onSuccess: () => {
        toast.success("Logout successful", {
          progressClassName: "toastProgress",
          icon: false,
        });
        deleteUserHandler();
        navigate("/login");
      },
      onError: () => {
        toast.error("Logout failed", {
          progressClassName: "toastProgress",
          icon: false,
        });
      },
    }
  );

  const deleteUserFn = () => {
    if (userData?.token.refresh) {
      const payload = { refresh: userData?.token.refresh };
      mutate(payload);
    }
  };

  return (
    <>
      <Loading loading={isLoading} />
      <SideBarContainer show={show}>
        <SideLogo>
          <img alt="" src={Logo} />
        </SideLogo>

        <SideBtnCon>
          {/* <SideBtn>
          <MdDashboard />
          DashBoard
        </SideBtn> */}

          <CustomSideBarNavLinks where="/publications">
            <MdGroups2 />
            Publications
          </CustomSideBarNavLinks>

          <CustomSideBarNavLinks where="/prospective-members">
            <MdCardMembership />
            Prospective Members
          </CustomSideBarNavLinks>

          <CustomSideBarNavLinks where="/certificate-issuing">
            <MdCardMembership />
            Certificate Issuing
          </CustomSideBarNavLinks>

          <CustomSideBarNavLinks where="/news">
            <BiNews />
            News
          </CustomSideBarNavLinks>

          <CustomSideBarNavLinks where="/reports">
            <TbReportSearch />
            Reports
          </CustomSideBarNavLinks>

          <CustomSideBarNavLinks where="/">
            <AiFillSetting />
            Gallery
          </CustomSideBarNavLinks>

          <CustomSideBarNavLinks where="/events">
            <MdEmojiEvents />
            Events
          </CustomSideBarNavLinks>

          <CustomSideBarNavLinks where="/trainings">
            <MdOnDeviceTraining />
            Trainings
          </CustomSideBarNavLinks>

          <CustomSideBarNavLinks where="/about-us">
            <MdRoundaboutLeft />
            About Us
          </CustomSideBarNavLinks>

          <CustomSideBarNavLinks where="/membership">
            <MdRoundaboutLeft />
            Membership
          </CustomSideBarNavLinks>

          <SideBtn onClick={deleteUserFn}>
            <BiLogOut />
            Logout
          </SideBtn>
        </SideBtnCon>
      </SideBarContainer>
    </>
  );
};

export default SideBar;
