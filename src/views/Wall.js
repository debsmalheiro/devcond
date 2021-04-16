// Dependencies
import React, { useState, useEffect } from "react";
import {
  CRow,
  CCol,
  CCard,
  CCardHeader,
  CButton,
  CCardBody,
} from "@coreui/react";
import CIcon from "@coreui/icons-react";

// API
import useApi from "../services/api";

// Component
export default () => {
  const api = useApi();

  const [loading, setLoading] = useState(true);
  const [list, setList] = useState([]);

  useEffect(() => {
    getList();
  }, []);

  const getList = async () => {
    setLoading(true);
    const result = await api.getWall();
    setLoading(false);
    if (result.error === "") {
      setList(result.list);
    } else {
      alert(result.error);
    }
  };

  return (
    <CRow>
      <CCol>
        <h2>Mural de Avisos</h2>

        <CCard>
          <CCardHeader>
            <CButton color="primary">
              <CIcon name="cil-check" /> Novo Aviso
            </CButton>
          </CCardHeader>
          <CCardBody>123</CCardBody>
        </CCard>
      </CCol>
    </CRow>
  );
};
