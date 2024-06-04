// import { useSession } from 'next-auth/react';
// import useSWR, { SWRConfiguration } from 'swr';

// const fetcher = async (method: string, url: string, token: string, body: any | null = null) => {

//     const fetchOptions = {
//         method: method,
//         headers: {
//             Authorization: `Bearer ${token}`,
//         },
//     }

//     if (body) {
//         fetchOptions.body = JSON.stringify(body);
//     }

//     const res = await fetch(url, fetchOptions);


//     if (!res.ok) {
//         throw new Error('Failed to fetch sessions');
//     }

//     return res.json();
// };

// export const useGeneric = (uri: string): any => {
//     const { data: session, status } = useSession();
//     const token = session?.googleIdToken;

//     const { data, error } = useSWR(
//         ["GET", `http://localhost:8080/${uri}`, token],
//         ([method, url, token]) => fetcher(method, url, token ?? '')
//     )

//     return {
//         data: data,
//         isLoading: status === 'loading',
//         isError: error,
//     };
// };

// export const useSessions = () => {
//     return useGeneric("sessions")
// };

// export const useHalls = () => {
//     return useGeneric("halls")
// };

// export const useSessionTypes = () => {
//     return useGeneric("session-types")
// };


// function useFetchSessionUser(sessionId: string, userId: string, token: string) {
//     const { data, error, mutate, } = useSWR(
//       ['GET', `http://localhost:8080/sessions/${sessionId}/users/${userId}`, token],
//       ([method, url, token]) => fetcher(method, url, token ?? '')
//     );

//     const isLoading = !data && !error;

//     const registerUser = async (body: object) => {
//       await fetcher('POST', `http://localhost:8080/sessions/${sessionId}/users/${userId}`, token, body);
//       mutate();
//     };

//     return {
//       data,
//       isLoading,
//       isError: !!error,
//       mutate,
//       registerUser,
//     };
//   }




import { useSession } from 'next-auth/react';
import { useState, useEffect } from 'react';

const fetcher = async (method: string, url: string, token: string, body: any | null = null) => {
    const fetchOptions = {
        method: method,
        headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": 'application/json'
        },
    };

    if (body) {
        fetchOptions.body = JSON.stringify(body);
    }

    const res = await fetch(url, fetchOptions);

    if (!res.ok) {
        throw new Error((await res.json()).error);
    }

    return res.json();
};

const useGeneric = (uri: string, onLoad: boolean = true) => {
    const [data, setData] = useState(null);
    const [error, setError] = useState(null);
    const [isLoading, setIsLoading] = useState(false);

    const request = (currentUri: string) => {
        setIsLoading(true);
        setError(null);

        fetcher('GET', `http://localhost:8080/${currentUri}`, "")
            .then(data => {
                setData(data);
                setIsLoading(false);
            })
            .catch(error => {
                setError(error);
                setIsLoading(false);
            });
    }

    const get = async (currentUri: string) => {
        request(currentUri);
    };

    useEffect(() => {
        if (onLoad === true) {
            request(uri);
        }
    }, [uri]);

    return {
        data,
        isLoading,
        isError: Boolean(error),
        error,
        get
    };
};

export const useSessions = () => {
    return useGeneric('sessions');
};

export const useHalls = () => {
    return useGeneric('halls');
};

export const useSessionTypes = () => {
    return useGeneric('session-types');
};

export const useOneSession = (id: string, onLoad: boolean = true) => {
    return useGeneric(`sessions/${id}`, onLoad);
};

export const useRegisterUserToSession = () => {
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);
    const [data, setData] = useState(null);


    const registerUserToSession = async (sessionId: number, userId: number) => {
        setIsLoading(true);
        setError(null);

        try {
            const response = await fetcher(
                'POST',
                `http://localhost:8080/sessions/${sessionId}/users/${userId}`,
                '',
                null
            );

            setData(response);
            setIsLoading(false);
        } catch (error) {
            setError(error);
            setIsLoading(false);
        }
    };

    return {
        data,
        isLoading,
        error,
        registerUserToSession,
    };
};


export const useUnregisterUserFromSession = () => {
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);
    const [data, setData] = useState(null);

    const unregisterUserFromSession = async (sessionId: number, userId: number) => {
        console.log(sessionId, userId)
        setIsLoading(true);
        setError(null);

        try {
            const response = await fetcher(
                'DELETE',
                `http://localhost:8080/sessions/${sessionId}/users/${userId}`,
                '',
                null
            );

            setData(response);
            setIsLoading(false);
        } catch (error) {
            setError(error);
            setIsLoading(false);
        }
    };

    return {
        data,
        isLoading,
        error,
        unregisterUserFromSession,
    };
};

export const useSearchUser = () => {
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);
    const [data, setData] = useState(null);

    const searchUser = async (username: string) => {
        setIsLoading(true);
        setError(null);

        try {
            const response = await fetcher(
                'GET',
                `http://localhost:8080/users?username=${username}`,
                '',
                null
            );

            setData(response);
            setIsLoading(false);
        } catch (error) {
            setError(error);
            setIsLoading(false);
        }
    };

    return {
        data,
        isLoading,
        error,
        searchUser,
    };
};

export const updateSessionMieux = async (sessionId: number, body: any): Promise<{ error: any, data: any }> => {
    try {
      const response = await fetcher(
        'PUT',
        `http://localhost:8080/sessions/${sessionId}`,
        '',
        body
      );
  
      if (response.error) {
        console.log(response.error);
        return { error: response.error, data: null };
      } else {
        console.log(response);
        return { error: null, data: response };
      }
    } catch (error) {
      console.log(error.message);
      return { error: error.message, data: null };
    }
  };


export const useUpdateSession = () => {
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);
    const [data, setData] = useState(null);


    const updateSession = async (sessionId: number, body: any) => {
        setIsLoading(true);
        setError(null);

        try {
            const response = await fetcher(
                'PUT',
                `http://localhost:8080/sessions/${sessionId}`,
                '',
                body
            );

            console.log(response)

            if (response.error) {
                // console.log(response.error)
                // setError(response.error);
            } else {
                setData(response);
            }
            setIsLoading(false);
        } catch (error) {
            console.log(error.message)
            setError(error.message);
            setIsLoading(false);
        }
    };

    useEffect(() => {
        console.log(error)
    }, [error])

    return {
        data,
        isLoading,
        error,
        updateSession,
    };
};

export const useCreateSession = () => {
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);
    const [data, setData] = useState(null);


    const createSession = async (body: any) => {
        setIsLoading(true);
        setError(null);

        try {
            const response = await fetcher(
                'POST',
                `http://localhost:8080/sessions/`,
                '',
                body
            );

            setData(response);
            setIsLoading(false);
        } catch (error) {
            setError(error);
            setIsLoading(false);
        }
    };

    return {
        data,
        isLoading,
        error,
        createSession,
    };
};