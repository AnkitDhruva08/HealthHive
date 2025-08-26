
const API_BASE_URL = "http://localhost:8000/api";

// function for fetch roles 
export const fetchRoles = async () => {
    const res = await fetch(`${API_BASE_URL}/roles`, {
    });

    const data = await res.json();
    return  data;
  };





  // Utility function to handle API responses
export const handleResponse = async <T>(res: Response): Promise<T | null> => {
  if (res.status === 401) {
    localStorage.removeItem("token");
    // window.location.href = "/login";
    return null;
  }

  if (!res.ok) {
    let errorMessage = "Something went wrong";
    try {
      const errorData = await res.json();
      errorMessage =
        errorData.detail || errorData.message || JSON.stringify(errorData);
    } catch {
      try {
        errorMessage = await res.text();
      } catch {
        errorMessage = "Unknown error";
      }
    }
    throw new Error(errorMessage);
  }

  const contentType = res.headers.get("content-type");
  if (contentType?.includes("application/json")) {
    return (await res.json()) as T;
  }

  return null;
};

// Utility function to generate authorization headers
export const getAuthHeaders = (authToken: string): HeadersInit => ({
  "Content-Type": "application/json",
  Authorization: `Bearer ${authToken}`,
});


// get current login user details 

export const fetchUserData = async(authToken : string) => {
  const res = await fetch("/api/me", {
    headers: getAuthHeaders(authToken || ""),
  });

  return await handleResponse(res);
}


// fetch dashboard data based on roles 


export const fetchDashboardData = async(authToken : string) => {
  const res = await fetch(`${API_BASE_URL}/dashboard`, {
    headers: getAuthHeaders(authToken),
  });

  return await handleResponse(res);
}
