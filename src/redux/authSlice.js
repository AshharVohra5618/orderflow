

// // import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
// // import api from "../services/api";

// // export const fetchCurrentUser = createAsyncThunk(
// //   "auth/fetchCurrentUser",
// //   async (_, { rejectWithValue }) => {
// //     try {
// //       const response = await api.get("/auth/me");
// //       return response.data.user;
// //     } catch (error) {
// //       return rejectWithValue(
// //         error.response?.data?.message || "User fetch failed"
// //       );
// //     }
// //   }
// // );

// // const authSlice = createSlice({
// //   name: "auth",

// //   initialState: {
// //     user: null,
// //     isAuthenticated: Boolean(localStorage.getItem("token")),
// //     loading: false,
// //   },

// //   reducers: {
// //     setCredentials: (state, action) => {
// //       state.user = action.payload.user;
// //       state.isAuthenticated = true;
// //     },

// //     logout: (state) => {
// //       state.user = null;
// //       state.isAuthenticated = false;
// //       localStorage.removeItem("token");
// //     },
// //   },

// //   extraReducers: (builder) => {
// //     builder
// //       .addCase(fetchCurrentUser.pending, (state) => {
// //         state.loading = true;
// //       })
// //       .addCase(fetchCurrentUser.fulfilled, (state, action) => {
// //         state.loading = false;
// //         state.user = action.payload;
// //         state.isAuthenticated = true;
// //       })
// //       .addCase(fetchCurrentUser.rejected, (state) => {
// //         state.loading = false;
// //         state.user = null;
// //         state.isAuthenticated = false;
// //         localStorage.removeItem("token");
// //       });
// //   },
// // });

// // export const { setCredentials, logout } = authSlice.actions;
// // export default authSlice.reducer;



// import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
// import api from "../services/api";

// export const fetchCurrentUser = createAsyncThunk(
//   "auth/fetchCurrentUser",
//   async (_, { rejectWithValue }) => {
//     try {
//       const response = await api.get("/auth/me");
//       return response.data.user;
//     } catch (error) {
//       return rejectWithValue(
//         error.response?.data?.message || "User fetch failed"
//       );
//     }
//   }
// );

// const authSlice = createSlice({
//   name: "auth",

//   initialState: {
//     user: null,
//     isAuthenticated: Boolean(localStorage.getItem("token")),
//     loading: false,
//   },

//   reducers: {
//     setCredentials: (state, action) => {
//       state.user = action.payload.user;
//       state.isAuthenticated = true;
//     },

//     updateUser: (state, action) => {
//       if (state.user) {
//         state.user = {
//           ...state.user,
//           name: action.payload.name,
//           businessName: action.payload.businessName,
//         };
//       }
//     },

//     logout: (state) => {
//       state.user = null;
//       state.isAuthenticated = false;
//       localStorage.removeItem("token");
//     },
//   },

//   extraReducers: (builder) => {
//     builder
//       .addCase(fetchCurrentUser.pending, (state) => {
//         state.loading = true;
//       })
//       .addCase(fetchCurrentUser.fulfilled, (state, action) => {
//         state.loading = false;
//         state.user = action.payload;
//         state.isAuthenticated = true;
//       })
//       .addCase(fetchCurrentUser.rejected, (state) => {
//         state.loading = false;
//         state.user = null;
//         state.isAuthenticated = false;
//         localStorage.removeItem("token");
//       });
//   },
// });

// export const { setCredentials, updateUser, logout } =
//   authSlice.actions;

// export default authSlice.reducer;



import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import api from "../services/api";

// Logged-in user ka data backend se fetch karna
export const fetchCurrentUser = createAsyncThunk(
  "auth/fetchCurrentUser",
  async (_, { rejectWithValue }) => {
    try {
      const response = await api.get("/api/auth/me");
      return response.data.user;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "User fetch failed"
      );
    }
  }
);

const authSlice = createSlice({
  name: "auth",

  initialState: {
    user: null,
    isAuthenticated: Boolean(localStorage.getItem("token")),
    loading: false,
  },

  reducers: {
    // Login ke baad user data save karna
    setCredentials: (state, action) => {
      state.user = action.payload.user;
      state.isAuthenticated = true;
    },

    // Settings se name aur business name update karna
    updateUser: (state, action) => {
      state.user = {
        ...(state.user || {}),
        ...action.payload,
      };

      state.isAuthenticated = true;
    },

    // Logout
    logout: (state) => {
      state.user = null;
      state.isAuthenticated = false;
      localStorage.removeItem("token");
    },
  },

  extraReducers: (builder) => {
    builder
      .addCase(fetchCurrentUser.pending, (state) => {
        state.loading = true;
      })

      .addCase(fetchCurrentUser.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload;
        state.isAuthenticated = true;
      })

      .addCase(fetchCurrentUser.rejected, (state) => {
        state.loading = false;
        state.user = null;
        state.isAuthenticated = false;
        // localStorage.removeItem("token");
      });
  },
});

export const { setCredentials, updateUser, logout } =
  authSlice.actions;

export default authSlice.reducer;
