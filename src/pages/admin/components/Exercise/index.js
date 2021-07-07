import React, { useState, useEffect } from "react";

import {
  makeStyles,
  Paper,
  Typography,
  TextField,
  List,
  ListItem,
  ListItemText,
  Button,
} from "@material-ui/core";
import { Autocomplete } from "@material-ui/lab";
import { Alert, AlertTitle } from "@material-ui/lab";

import { useFetch } from "../../../../components/hooks/useFetch";
import { useForm } from "../../../../components/hooks/useForm";
import { useStyles } from "./styles.js";

const Exercise = () => {
  const classes = useStyles();

  const [autoVal, setAutoVal] = useState("");
  const [formInputs, setFormInputs] = useForm({
    exercise_name: "",
    exercise_description: "",
  });
  const [makeRequest, setMakeRequest] = useState(false);
  const response = useFetch({
    uri: "/sports/substrings/",
    params: { sport_name: autoVal },
    makeRequest,
  });
  const [autoList, setAutoList] = useState([]);
  const [listItems, setListItems] = useState([]);

  //handle the submition
  const [exercise, setExercise] = useState({});
  const [postExercise, setPostExercise] = useState(false);
  const addExercise = useFetch({
    uri: "/exercises/resources/",
    method: "POST",
    body: exercise,
    makeRequest: postExercise,
  });
  const [postStatus, setPostStatus] = useState({
    processed: false,
    success: false,
    message: "",
  });

  // handle the time to search
  useEffect(() => {
    setMakeRequest(true);
  }, [autoVal]);

  // handle the response
  useEffect(() => {
    if (!response) {
      return;
    } else if (response.success) {
      setAutoList((curr) => response.data);
      setMakeRequest(false);
    } else if (response.error) {
      setMakeRequest(false);
    }
  }, [response]);

  useEffect(() => {
    if (!addExercise) {
      return;
    } else if (addExercise.success) {
      setPostStatus({
        processed: true,
        success: true,
        message: "Successfully inserted the exercise",
      });
      setPostExercise(false);
    } else if (response.error) {
      setPostExercise(false);
      setPostStatus({
        processed: true,
        success: false,
        message: "Error ocurred while communicating with the server",
      });
    } else {
      setPostExercise(false);
      setPostStatus({
        processed: true,
        success: false,
        message: "Exercise exists",
      });
    }
  }, [addExercise]);

  const handleSubmit = (e) => {
    e.preventDefault();
    setExercise({ ...formInputs, sports: listItems });
    setPostExercise(true);
    setPostStatus({ processed: false, success: false, message: "" });
  };

  return (
    <>
      <Paper className={classes.root}>
        <Typography variant="h4" className={classes.title}>
          Exercise
        </Typography>
        <form className={classes.form} onSubmit={handleSubmit}>
          <TextField
            variant="outlined"
            placeholder="Exercise Name"
            name="exercise_name"
            value={formInputs.exercise_name}
            onChange={setFormInputs}
            className={classes.nameInput}
          />
          <TextField
            variant="outlined"
            multiline
            rows={5}
            name="exercise_description"
            value={formInputs.exercise_desciption}
            onChange={setFormInputs}
            placeholder="Exercise Description"
            className={classes.descriptionInput}
          />
          <Paper className={classes.listContainer}>
            <List
              component="nav"
              style={{ padding: 4 }}
              className={classes.list}
            >
              <Autocomplete
                inputValue={autoVal}
                options={autoList}
                disableClearable={true}
                onChange={(e) => {
                  const idxToAppend = e.target.dataset.optionIndex;
                  setListItems((curr) => [...curr, autoList[idxToAppend]]);
                  setAutoVal((curr) => "");
                }}
                getOptionLabel={(option) => option.sport_name}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    label="Select Sports"
                    value={autoVal}
                    variant="outlined"
                    onChange={(e) => {
                      setAutoVal(e.target.value);
                    }}
                  />
                )}
              ></Autocomplete>
              {listItems.map((obj, idx) => {
                return (
                  <ListItem key={idx} button>
                    <ListItemText>{obj.sport_name}</ListItemText>
                  </ListItem>
                );
              })}
            </List>
          </Paper>
          <Button
            type="submit"
            className={classes.button}
            color="primary"
            variant="contained"
          >
            CREATE
          </Button>
        </form>
      </Paper>
      {postStatus.processed && (
        <Alert
          severity={postStatus.success ? "success" : "error"}
          className={classes.alert}
        >
          <AlertTitle>{postStatus.message}</AlertTitle>
        </Alert>
      )}
    </>
  );
};

export default Exercise;
