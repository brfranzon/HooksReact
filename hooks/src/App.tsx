import { Button, Input, Theme, Typography } from "@mui/material";
import React from "react";
import { makeStyles } from "@mui/styles";
import "./App.css";
import { useJoke } from "./hooks/use-joke";
import { Box, flexbox, typography } from "@mui/system";
import { useState } from "react";
import { useRef } from "react";

const useStyles = makeStyles((theme: Theme) => ({
  container: {
    height: "100vh",
    maxWidth: "100%",
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-around",
    alignItems: "center",
  },
  form: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
    minHeight: 200,
  },
}));

const App = () => {
  const classes = useStyles();

  const firstNameRef = useRef(null);
  const lastNameRef = useRef(null);

  const [firstName, setFirstName] = useState("Bruno");
  const [lastName, setLastName] = useState("Franzon");

  const { jokesList, loading } = useJoke(firstName, lastName);

  type FormType = {
    firstName: string;
    lastName: string;
  };

  const handleSubmit = (e: any) => {
    e.preventDefault();
    firstNameRef?.current && setFirstName((firstNameRef?.current as HTMLInputElement)?.value);
    lastNameRef?.current && setLastName((lastNameRef?.current as HTMLInputElement)?.value);
  };

  return (
    <div className={classes.container}>
      <form className={classes.form} onSubmit={handleSubmit}>
        <Input placeholder="first name" inputRef={firstNameRef} />
        <Input placeholder="last name" inputRef={lastNameRef} />
        <Button type="submit"> Generate </Button>
      </form>

      <Typography>{firstName}</Typography>

      {loading ? (
        <Typography>Loading...</Typography>
      ) : (
        <Box>{jokesList?.value?.joke}</Box>
      )}
    </div>
  );
};

export default App;
