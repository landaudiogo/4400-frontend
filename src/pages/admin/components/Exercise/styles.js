import { makeStyles } from "@material-ui/core";

export const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
    height: "100%",
    minHeight: 700,
    alignItems: "center",
    justifyContent: "center",
    display: "flex",
    flexDirection: "column",
  },
  title: {
    margin: `${theme.spacing(1)}px 0px`,
    justifyContent: "center",
  },
  form: {
    flexGrow: 1,
    width: "100%",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
  },
  nameInput: {
    width: "80%",
  },
  descriptionInput: {
    margin: `${theme.spacing(2)}px 0px`,
    width: "80%",
    "& .MuiInputBase-root": {
      height: "100%",
      alignItems: "flex-start",
      overflow: "auto",
      maxHeight: "100%",
    },
    "& .MuiInputBase-input": {
      height: "100%",
      alignItems: "flex-start",
      overflow: "auto",
      maxHeight: "100%",
    },
  },
  listContainer: {
    flexGrow: 1,
    marginBottom: theme.spacing(2),
    width: "80%",
    backgroundColor: "#353535",
    overflow: "auto",
    maxHeight: "40%",
  },
  button: {
    height: 40,
    marginBottom: theme.spacing(2),
  },
}));
