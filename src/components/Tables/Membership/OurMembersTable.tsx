import React, { useMemo, useState } from "react";
import { useQuery } from "react-query";
import { useMediaQuery } from "react-responsive";
import { Hooks } from "react-table";
import { ourMembersGetAll } from "../../../axios/api-calls";
import { FormError } from "../../../globals/styles/forms.styles";
import Loading from "../../Loading/Loading";
import OffCanvas from "../../OffCanvas/OffCanvas";
import Tables from "../Tables";
import { TableView, TableReject } from "../Tables.styles";
import OurMembersEdit from "../../Modals/OurMembers/OurMembersEdit";
import OurMembersDelete from "../../Modals/OurMembers/OurMembersDelete";

const OurMembersTable = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);
  const [id, setId] = useState(0);
  const [delId, setDelId] = useState(0);
  const isMobileScreen = useMediaQuery({ maxWidth: 600 });

  const closeSlider = () => {
    setIsOpen(!isOpen);
  };
  const closeDeleteSlider = () => {
    setIsDeleteOpen(!isDeleteOpen);
  };

  const { isLoading, isError, data, isFetching } = useQuery(
    "all-members",
    ourMembersGetAll,
    {
      select: (data) => data.data,
      refetchOnWindowFocus: false,
    }
  );

  const columns = [
    {
      Header: "S/N",
      accessor: "id",
    },
    {
      Header: "Name",
      accessor: "name",
    },
  ];

  const tableHooks = (hooks: Hooks) => {
    hooks.visibleColumns.push((columns) => [
      ...columns,
      {
        id: "website",
        Header: "Website Url",
        Cell: ({ row }) => (
          //@ts-ignore
          <a href={`${row.original["website"]}`}>{row.original["website"]}</a>
        ),
      },
      {
        id: "Click to Edit",
        Header: "Click to Edit",
        Cell: ({ row }) => (
          <TableView
            onClick={() => {
              setId(row.values.id);
              closeSlider();
            }}
          >
            Edit
          </TableView>
        ),
      },
      {
        id: "Click to Delete",
        Header: "Click to Delete",
        Cell: ({ row }) => (
          <TableReject
            onClick={() => {
              setDelId(row.values.id);
              closeDeleteSlider();
            }}
          >
            Delete
          </TableReject>
        ),
      },
    ]);
  };

  return (
    <>
      <OffCanvas
        size={isMobileScreen ? 100 : 50}
        btnClick={() => null}
        setIsOpen={setIsOpen}
        isOpen={isOpen}
      >
        <OurMembersEdit closefn={closeSlider} memId={id} />
      </OffCanvas>
      <OffCanvas
        size={isMobileScreen ? 100 : 50}
        btnClick={() => null}
        setIsOpen={setIsDeleteOpen}
        isOpen={isDeleteOpen}
      >
        <OurMembersDelete closefn={closeDeleteSlider} whyId={delId} />
      </OffCanvas>

      {isFetching || isLoading ? (
        <Loading loading={isFetching || isLoading} />
      ) : !isError ? (
        <Tables
          tableColumn={columns}
          tableData={data}
          customHooks={[tableHooks]}
        />
      ) : (
        <FormError>Can't Fetch Why Join Data</FormError>
      )}
    </>
  );
};

export default OurMembersTable;
