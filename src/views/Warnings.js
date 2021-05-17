// Dependencies
import React, { useState, useEffect } from "react";
import {
  CRow,
  CCol,
  CCard,
  CCardHeader,
  CButton,
  CCardBody,
  CDataTable,
  CButtonGroup,
  CModal,
  CModalHeader,
  CModalBody,
  CModalFooter,
  CFormGroup,
  CLabel,
  CInput,
  CSelect,
} from "@coreui/react";
import CIcon from "@coreui/icons-react";

// API
import useApi from "../services/api";

// Component
export default () => {
  const api = useApi();

  const [loading, setLoading] = useState(true);
  const [list, setList] = useState([]);



  const fields = [
    { label: "Resolvido", key: "status", filter: false},
    { label: "Unidade", key: "name_unit", sorter: false},
    { label: "Título", key: "title", sorter: false},
    { label: "Fotos", key: "photos", sorter: false, filter: false},
    { label: "Data", key: "datecreated"},

  ];

  useEffect(() => {
    getList();
  }, []);

  const getList = async () => {
    setLoading(true);
    const result = await api.getWarnings();
    setLoading(false);
    if (result.error === "") {
      setList(result.list);
    } else {
      alert(result.error);
    }
  };

  return (
    <>
      <CRow>
        <CCol>
          <h2>Ocorrências</h2>

          <CCard>
            <CCardBody>
              <CDataTable
                items={list}
                fields={fields}
                loading={loading}
                noItemsViewSlot=" "
                columnFilter
                sorter
                hover
                striped
                bordered
                pagination
                itemsPerPage={10}
                scopedSlots={{
                  reservation_date: (item) => (
                    <td>{item.reservation_date_formatted}</td>
                  )
                }}
              />
            </CCardBody>
          </CCard>
        </CCol>
      </CRow>
    </>
  );
};
