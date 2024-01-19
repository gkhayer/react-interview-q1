import {
    Box,
    Select,
    MenuItem,
    Typography,
    TextField,
    Button,
  } from "@mui/material";
  import { getLocations, isNameValid } from "./../../mock-api/apis";
  import React, { useState, useEffect } from "react";
  import UsersTable from "./../UsersTable";
  
  const Form = () => {
    const [locations, setLocations] = useState([]);
    const [input, setInput] = useState({ name: "", location: "" });
    const [users, setUsers] = useState([]);
    const [error, setError] = useState(false);
  
    useEffect(() => {
      getLocations().then((res) => setLocations(res));
    }, []);
  
    const handleChange = async (e) => {
      setInput((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  
      // Name validation check
      if (e.target.name === "name" && e.target.value) {
        const nameValidation = await isNameValid(e.target.value);
        const isNameTakenLocal = users.some(
          (user) => user.name.toLowerCase() === e.target.value.toLowerCase()
        );
        !nameValidation || isNameTakenLocal ? setError(true) : setError(false);
      }
    };
  
    const handleSubmit = (e) => {
      e.preventDefault();
      setUsers([...users, input]);
      handleClear();
    };
  
    const handleClear = () => {
      setInput({ name: "", location: "" });
      setError(false);
    };
  
    return (
      <Box
        sx={{
          width: "30rem",
          display: "inline-flex",
          flexDirection: "column",
          color: "black",
          border: ".2rem solid",
          borderRadius: '1rem',
          padding: "2rem",
          gap: "2rem",
        }}
      >
        <form onSubmit={handleSubmit}>
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              gap: "10px",
              mb: "40px",
            }}
          >
            <Typography variant="h6" width="90px" textAlign="start">
              Name
            </Typography>
            <TextField
              name="name"
              value={input.name}
              sx={{ width: 1, border: '.2rem solid'}}
              onChange={handleChange}
              helperText={error && "this name has already been taken"} //if error state is true, then error msg will show 
              error={error}
            />
          </Box>
          <Box sx={{ display: "flex", alignItems: "center", gap: "10px" }}>
            <Typography variant="h6" width="90px">
              Location
            </Typography>
            <Select
              name="location"
              value={input.location}
              onChange={handleChange}
              displayEmpty
              sx={{ width: 1, border: '.2rem solid'}}
              align="left"
            >
              {locations.map((location, index) => (
                <MenuItem key={location + index} value={location} >
                  {location}
                </MenuItem>
              ))}
            </Select>
          </Box>
          <Box display="flex" justifyContent="flex-end" gap="10px" mt="100px">
            <Button variant="outlined" color="inherit" onClick={handleClear} sx={{border: '.2rem solid '}}>
              Clear
            </Button>
            <Button
              variant="outlined"
              color="inherit"
              type="submit"
              disabled={error || !(input.name && input.location)}
              sx={{border: '.2rem solid'}}
            >
              Add
            </Button>
          </Box>
        </form>
        <UsersTable users={users} />
      </Box>
    );
  };
  
  export default Form;
  