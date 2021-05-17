// Dependencies
import React, { useState, useEffect } from "react";
import {
  CRow,
  CCol,
  CCard,
  CButton,
  CCardBody,
  CDataTable,
  CSwitch,
} from "@coreui/react";

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

  const handleSwitchClick = () => {

  }

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
                  'photos': (item) => (
                    <td>
                      ...
                    </td>
                  ),
                  'datecreated': (item) => (
                    <td>
                      {item.datecreated_formatted}
                    </td>
                  ),
                  'status': (item) => (
                    <td>
                      <CSwitch
                        color="success"
                        checked={item.status === "RESOLVED"}
                        onChange={(e) => handleSwitchClick(e, item)}
                      />
                    </td>
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
