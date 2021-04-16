// Dependencies
import React, { useState, useEffect } from "react";
import { useHistory } from 'react-router-dom';
import { TheContent, TheSidebar, TheFooter } from "./index";

// API
import useApi from "../services/api";

// Component
const TheLayout = () => {
  const api = useApi();
  const history = useHistory();

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const checkLogin = async () => {
      if(api.getToken()) {
        const result = await api.validateToken(api.getToken());
        if(result.error === '') {
          setLoading(false);
        } else {
          alert(result.error);
          history.push('/login');
        }
      } else {
        history.push('/login');
      }
    }
    checkLogin();
  }, [])

  return (
    <div className="c-app c-default-layout">
      {!loading &&
        <>
          <TheSidebar />
          <div className="c-wrapper">
            <div className="c-body">
              <TheContent />
            </div>
            <TheFooter />
          </div>
        </>
      }
    </div>
  );
};

// Export module
export default TheLayout;
