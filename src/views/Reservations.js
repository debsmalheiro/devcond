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

  const [showModal, setShowModal] = useState(false);

  const [modalTitleField, setModalTitleField] = useState("");
  const [modalFileField, setModalFileField] = useState("");

  const [modalId, setModalId] = useState("");

  const [modalLoading, setModalLoading] = useState(false);

  const [modalUnitList, setModalUnitList] = useState([]);
  const [modalAreaList, setModalAreaList] = useState([]);

  const [modalUnitId, setModalUnitId] = useState(0);
  const [modalAreaId, setModalAreaId] = useState(0);
  const [modalDateField, setModalDateField] = useState("");

  const fields = [
    { label: "Unidade", key: "name_unit", sorter: false },
    { label: "Área", key: "name_area", sorter: false },
    { label: "Data da reserva", key: "reservation_date" },
    {
      label: "Ações",
      key: "actions",
      _style: { width: "1px" },
      sorter: false,
      filter: false,
    },
  ];

  useEffect(() => {
    getList();
    getUnitList();
    getAreaList();
  }, []);

  const getList = async () => {
    setLoading(true);
    const result = await api.getReservations();
    setLoading(false);
    if (result.error === "") {
      setList(result.list);
    } else {
      alert(result.error);
    }
  };

  const getUnitList = async () => {
    const result = await api.getUnits();
    if (result.error === "") {
      setModalUnitList(result.list);
    }
  };

  const getAreaList = async () => {
    const result = await api.getAreas();
    if (result.error === "") {
      setModalAreaList(result.list);
    }
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };

  const handleEditButton = (index) => {
    setModalId(list[index]["id"]);
    setModalUnitId(list[index]["id_unit"]);
    setModalAreaId(list[index]["id_area"]);
    setModalDateField(list[index]["reservation_date"]);
    setShowModal(true);
  };

  const handleRemoveButton = async (index) => {
    if (window.confirm("Tem certeza que deseja excluir?")) {
      const result = await api.removeDocument(list[index]["id"]);
      if (result.error === "") {
        getList();
      } else {
        alert(result.error);
      }
    }
  };

  const handleSaveModal = async () => {
    if (modalTitleField) {
      setModalLoading(true);
      let result;
      let data = {
        title: modalTitleField,
      };
      if (modalId === "") {
        if (modalFileField) {
          data.file = modalFileField;
          result = await api.addDocument(data);
        } else {
          alert("Selecione o arquivo");
          setModalLoading(false);
          return;
        }
      } else {
        if (modalFileField) {
          data.file = modalFileField;
        }
        result = await api.updateDocument(modalId, data);
      }
      setModalLoading(false);
      if (result.error === "") {
        setShowModal(false);
        getList();
      } else {
        alert(result.error);
      }
    } else {
      alert("Preencha os campos");
    }
  };

  const handleNewReservations = () => {
    setModalId("");
    setModalUnitId(modalUnitList[0]["id"]);
    setModalAreaId(modalAreaList[0]["id"]);
    setModalDateField("");
    setShowModal(true);
  };

  return (
    <>
      <CRow>
        <CCol>
          <h2>Reservas</h2>

          <CCard>
            <CCardHeader>
              <CButton
                color="primary"
                onClick={handleNewReservations}
                disabled={
                  modalUnitList.length === 0 || modalAreaList.length === 0
                }
              >
                <CIcon name="cil-check" /> Nova Reserva
              </CButton>
            </CCardHeader>
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
                itemsPerPage={5}
                scopedSlots={{
                  reservation_date: (item) => (
                    <td>{item.reservation_date_formatted}</td>
                  ),
                  actions: (item, index) => (
                    <td>
                      <CButtonGroup>
                        <CButton
                          color="info"
                          onClick={() => handleEditButton(index)}
                          disabled={
                            modalUnitList.length === 0 ||
                            modalAreaList.length === 0
                          }
                        >
                          Editar
                        </CButton>
                        <CButton
                          color="danger"
                          onClick={() => handleRemoveButton(index)}
                        >
                          Excluir
                        </CButton>
                      </CButtonGroup>
                    </td>
                  ),
                }}
              />
            </CCardBody>
          </CCard>
        </CCol>
      </CRow>

      <CModal show={showModal} onClose={handleCloseModal}>
        <CModalHeader closeButton>
          {modalId === "" ? "Novo" : "Editar"} Reserva
        </CModalHeader>
        <CModalBody>
          <CFormGroup>
            <CLabel htmlFor="modal-unit">Unidade</CLabel>
            <CSelect
              id="modal-unit"
              custom
              onChange={(e) => setModalUnitId(e.target.value)}
            >
              {modalUnitList.map((item, index) => (
                <option
                  key={index}
                  value={item.id}
                  selected={item.id === modalUnitId}
                >
                  {item.name}
                </option>
              ))}
            </CSelect>
          </CFormGroup>

          <CFormGroup>
            <CLabel htmlFor="modal-area">Área</CLabel>
            <CSelect
              id="modal-area"
              custom
              onChange={(e) => setModalAreaId(e.target.value)}
            >
              {modalAreaList.map((item, index) => (
                <option
                  key={index}
                  value={item.id}
                  selected={item.id === modalAreaId}
                >
                  {item.title}
                </option>
              ))}
            </CSelect>
          </CFormGroup>

          <CFormGroup>
            <CLabel htmlFor="modal-date">Data da reserva</CLabel>
            <CInput
              type="text"
              id="modal-date"
              value={modalDateField.reservation_date_formatted} /* VERIFICAR */
              onChange={(e) => setModalDateField(e.target.value)}
              disabled={modalLoading}
            />
          </CFormGroup>
        </CModalBody>
        <CModalFooter>
          <CButton
            color="primary"
            onClick={handleSaveModal}
            disabled={modalLoading}
          >
            {modalLoading ? "Carregando" : "Salvar"}
          </CButton>
          <CButton color="secondary" onClick={handleCloseModal}>
            Cancelar
          </CButton>
        </CModalFooter>
      </CModal>
    </>
  );
};
