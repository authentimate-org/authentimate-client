import { createSlice, PayloadAction, createAsyncThunk } from "@reduxjs/toolkit";
// import { User } from "firebase/auth";
import { auth } from "../../config/firebase";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  sendEmailVerification,
  User as FirebaseUser,
} from "firebase/auth";
import axios from "axios";

interface User {
  uid: string;
  email: string | null;
}
interface AuthState {
  user: User | null;
  token: string | null;
  loading: boolean;
  error: string | null;
  isAuthenticated: boolean;
  authStatus: "AUTHENTICATED" | "VERIFIED" | "ONBOARDED" | null
}

const initialState: AuthState = {
  user: null,
  token: null,
  loading: false,
  error: null,
  isAuthenticated: false,
  authStatus:null
};

export const registerUser = createAsyncThunk(
  "auth/registerUser",
  async (
    { email, password }: { email: string; password: string },
    { rejectWithValue }
  ) => {
    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      const token = await userCredential.user.getIdToken();
      const user = userCredential.user as FirebaseUser;
      await axios.post(
        import.meta.env.VITE_BACKEND_API_BASE_URL_DEV + "/issuer/signUp",
        {
          email: user.email,
          uid: user.uid,
        }
      );
      const userData = {
        uid: user.uid,
        email: user.email,
        emailVerified: user.emailVerified,
      };
      return { user: userData, token };
    } catch (error: any) {
      return rejectWithValue(error.message);
    }
  }
);

export const loginUser = createAsyncThunk(
  "auth/loginUser",
  async (
    { email, password }: { email: string; password: string },
    { rejectWithValue }
  ) => {
    try {
      const userCredential = await signInWithEmailAndPassword(
        auth,
        email,
        password
      );
      const user = userCredential.user as FirebaseUser;
      const token = await user.getIdToken();
      const userData = {
        uid: user.uid,
        email: user.email,
        emailVerified: user.emailVerified,
      };
      return { user: userData, token };
    } catch (error: any) {
      return rejectWithValue(error.message);
    }
  }
);
export const verifyEmail = createAsyncThunk(
  "auth/verifyEmail",
  async (_, { rejectWithValue }) => {
    try {
      const currentUser = auth.currentUser;
      if (currentUser && !currentUser.emailVerified) {
        await sendEmailVerification(currentUser);
      } else if (!currentUser) {
        throw new Error("No user is logged in");
      }
    } catch (error) {
      return rejectWithValue((error as Error).message);
    }
  }
);

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setAuth: (
      state,
      action: PayloadAction<{
        uid?: string;
        email?: string | null;
        token?: string;
        authStatus?:"AUTHENTICATED" | "VERIFIED" | "ONBOARDED" | null
      }>
    ) => {
      state.user = {
        uid: action.payload.uid??state.user?.uid??"",
        email: action.payload.email??state.user?.email??"",
      };
      state.token = action.payload.token??state.token;
      state.authStatus=action.payload.authStatus??state.authStatus
    },
    setAuthStatus:(state,action)=>{
      state.authStatus=action.payload
    },
    logoutUser: (state) => {
      state.user = null;
      state.token = null;
      state.loading = false;
      state.error = null;
      state.authStatus=null
    },
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.loading = action.payload;
    },
    setError: (state, action: PayloadAction<string | null>) => {
      state.error = action.payload;
      state.loading = false;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(registerUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(registerUser.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload.user;
        state.token = action.payload.token;
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      .addCase(loginUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.user = {
          uid: action.payload.user.uid,
          email: action.payload.user.email,
        };
        state.loading = false;
        state.token = action.payload.token;
        state.isAuthenticated = true;
        state.error = null;
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
        state.isAuthenticated = false;
      })
      .addCase(verifyEmail.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(verifyEmail.fulfilled, (state) => {
        state.loading = false;
      })
      .addCase(verifyEmail.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export const { setAuth, logoutUser, setLoading, setError,setAuthStatus } = authSlice.actions;

export default authSlice.reducer;
