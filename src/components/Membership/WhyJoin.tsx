import React, { useState } from "react";
import Button from "../Button/Button";
import OffCanvas from "../OffCanvas/OffCanvas";
import { useMediaQuery } from "react-responsive";
import WhyjoinTable from "../Tables/Membership/WhyjoinTable";
import WhyJoinCreate from "../Modals/Memership/WhyJoinCreate";

const WhyJoin = () => {
  const [isOpen, setIsOpen] = useState(false);
  const isMobileScreen = useMediaQuery({ maxWidth: 600 });

  return (
    <>
      <OffCanvas
        size={isMobileScreen ? 100 : 50}
        btnClick={() => null}
        setIsOpen={setIsOpen}
        isOpen={isOpen}
      >
        <WhyJoinCreate closefn={() => setIsOpen(!isOpen)} />
      </OffCanvas>

      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          marginTop: "20px",
        }}
      >
        <Button styleType={"sec"} onClick={() => setIsOpen(!isOpen)}>
          Create New
        </Button>
      </div>
      <WhyjoinTable />
    </>
  );
};

export default WhyJoin;
