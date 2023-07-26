import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface UserState {
  displayName: string | null;
  email: string | null;
}

const initialState: UserState = {
  displayName: "",
  email: "",
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUserData: (state, action: PayloadAction<UserState>) => {
      console.log(action.payload, "dikjdskbfbsdfsb");
      return action.payload;
    },
  },
});

export const { setUserData } = userSlice.actions;
export default userSlice.reducer;
