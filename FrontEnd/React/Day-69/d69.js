// Day-69

// Completed ep 15 part 001, 15 002, 16 001, 16 002.

// ________________________________________________


// Date: 05/06/2026
// Task: Completed ep 15 part 001, 15 002, 16 001, 16 002.
// - Solved a bug of not showing logout button after singup/singin, need to refresh the page for that, so used redux and subscribe the state so the header component re-renders on state change.
// - Another bug solved that user not stays loggedIn if he refreshes the page, solved with localstorage in intial state of redux slice state object.
// - Also solved redirecting issues.
// - Learned about how to change language of text written with using constants and also how to store secrets inside .env for react-app.
// - Learned about memoizing that how can we prevent multiple api calls on re-renders.