const baseUrl = "https://api.b7web.com.br/devcond/api/admin";

const request = async (method, endpoint, params, token = null) => {
  method = method.toLowerCase();
  let fullUrl = `${baseUrl}${endpoint}`;
  let body = null;

  switch (method) {
    case "get":
      let queryString = new URLSearchParams(params).toString();
      fullUrl += `?${queryString}`;
      break;
    case "post":
    case "put":
    case "delete":
      body = JSON.stringify(params);
      break;
  }
  // Fazendo a requisição

  let headers = { "Content-Type": "application/json" };
  if (token) {
    headers.Authorization = `Bearer ${token}`;
  }
  let req = await fetch(fullUrl, { method, headers, body });

  // Receber a requisição e transformar em JSON

  let json = await req.json();
  return json;
};

export default () => {
  return {
    // Pegar o token
    getToken: () => {
      return localStorage.getItem("token");
    },
    // Validar o token
    validateToken: async () => {
      let token = localStorage.getItem("token");
      let json = await request("post", "/auth/validate", {}, token);
      return json;
    },
    // Fazer o login
    login: async (email, password) => {
      let json = await request("post", "/auth/login", { email, password });
      return json;
    },
    // Fazer logout
    logout: async () => {
      let token = localStorage.getItem("token");
      let json = await request("post", "/auth/logout", {}, token);
      localStorage.removeItem("token");
      return json;
    },

    // Consultar o backend e pegar os avisos do mural
    getWall: async () => {
      let token = localStorage.getItem("token");
      let json = await request("get", "/walls", {}, token);
      return json;
    },

    updateWall: async (id, data) => {
      let token = localStorage.getItem("token");
      let json = await request("put", `/wall/${id}`, data, token);
      return json;
    },

    addWall: async (data) => {
      let token = localStorage.getItem("token");
      let json = await request("post", `/walls`, data, token);
      return json;
    },

    removeWall: async (id) => {
      let token = localStorage.getItem("token");
      let json = await request("delete", `/wall/${id}`, {}, token);
      return json;
    },

    // Listar os documentos
    getDocuments: async () => {
      let token = localStorage.getItem("token");
      let json = await request("get", "/docs", {}, token);
      return json;
    },

    addDocument: async (data) => {
      let token = localStorage.getItem("token");

      let formData = new FormData();
      formData.append('title', data.title);
      if(data.file) {
        formData.append('file', data.file);
      }

      let req = await fetch(`${baseUrl}/docs`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`
        },
        body: formData,
      });
      
      let json = await req.json();
      return json;
    },

    updateDocument: async (id, data) => {
      let token = localStorage.getItem("token");

      let formData = new FormData();
      formData.append('title', data.title);
      if(data.file) {
        formData.append('file', data.file);
      }

      let req = await fetch(`${baseUrl}/doc/${id}`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`
        },
        body: formData,
      });
      
      let json = await req.json();
      return json;
    },

    removeDocument: async (id) => {
      let token = localStorage.getItem("token");
      let json = await request("delete", `/doc/${id}`, {}, token);
      return json;
    },

    // Pegar a lista de Reservas para
    getReservations: async () => {
      let token = localStorage.getItem("token");
      let json = await request("get", `/reservations`, {}, token);
      return json;
    },

    
  };
};
